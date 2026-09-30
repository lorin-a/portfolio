'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { sheetImg, stillFor } from './SheetMedia'
import styles from './CoverLab.module.css'

/**
 * COVER LAB — three cover treatments to compare in place (her note FS57:
 * "Show me 3 options I could not have thought of myself"). Lab only: the
 * sheet renders these when the page URL carries ?coverlab, with a switcher
 * pinned to the sheet. The shipped cover is untouched until she picks.
 *
 *   ambient  — A · the photo's own colour spreads into the page as a soft
 *              light behind the whole cover; photo crisp, text on its glow.
 *   strip    — B · the five components as tall slices: a visual contents.
 *              Hover widens a slice; click jumps to its section.
 *   lens     — C · the cover in Groundswell purple, the photo in a purple
 *              duotone; a soft circle of true colour follows the cursor.
 *   settle   — D · the first screen is the photo alone across the grid;
 *              scrolling glides it into the right two thirds as the name
 *              and facts arrive on the left.
 *   prints   — E · three photographs stacked like prints in the folder;
 *              hover fans them, click brings one to the front.
 *
 * Round one's "name, made of the place" was rejected (FS58) and removed.
 */

function Facts({ meta, className }) {
  if (!meta?.length) return null
  return (
    <dl className={className}>
      {meta.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd className={v?.todo ? styles.todo : undefined}>
            {v?.todo ? <b>Lorin to write</b> : null}
            {v?.todo || v}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function CoverLab({ variant, sheet, num, title, tagline, titleId, onImage }) {
  const hero = sheet.hero
  const heroSrc = hero && sheetImg(hero.key, 2000)
  const meta = sheet.meta || []

  if (variant === 'ambient') {
    return (
      <header className={`${styles.cover} ${styles.ambient}`}>
        {heroSrc && (
          <span className={styles.glow} aria-hidden="true"
            style={{ '--glow': `url(${heroSrc})` }} />
        )}
        <div className={styles.ambientText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.facts} />
        </div>
        {heroSrc && (
          <button type="button" className={styles.ambientPhoto}
            onClick={(e) => onImage?.(hero.key, e.currentTarget)}
            aria-label={`View full screen: ${hero.alt}`}>
            <img src={heroSrc} alt="" />
          </button>
        )}
      </header>
    )
  }

  if (variant === 'strip') {
    const slices = (sheet.components || []).map((c, i) => ({
      key: c.key,
      n: String(i + 1).padStart(2, '0'),
      name: c.name,
      src: stillFor(c.media),
      gated: c.gated,
    }))
    const go = (key) => {
      const el = document.getElementById(`sheet-${key}`)
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    }
    return (
      <header className={`${styles.cover} ${styles.strip}`}>
        <div className={styles.stripText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.facts} />
        </div>
        <nav className={styles.slices} aria-label={`${title}: the five components`}>
          {slices.map((s) => (
            <button key={s.key} type="button" className={styles.slice}
              data-gated={s.gated || undefined} onClick={() => go(s.key)}
              aria-label={`${s.n} ${s.name}: go to this component`}>
              {s.src && <img src={s.src} alt="" loading="lazy" />}
              <span className={styles.sliceLabel}>
                <span className={styles.sliceNum}>{s.n}</span>
                <span className={styles.sliceName}>{s.name}</span>
              </span>
            </button>
          ))}
        </nav>
      </header>
    )
  }

  if (variant === 'lens') return <LensCover {...{ sheet, num, title, tagline, titleId, onImage, heroSrc, meta }} />
  if (variant === 'settle') return <SettleCover {...{ sheet, num, title, tagline, titleId, onImage, heroSrc, meta }} />
  if (variant === 'prints') return <PrintsCover {...{ sheet, num, title, tagline, titleId, onImage, meta }} />

  return null
}

function TextRail({ num, title, tagline, titleId, meta, className }) {
  return (
    <div className={className}>
      <span className={styles.num}>{num}</span>
      <h2 id={titleId} className={styles.title}>{title}</h2>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
      <Facts meta={meta} className={styles.facts} />
    </div>
  )
}

/* C · COLOUR RETURNS ─────────────────────────────────────────────────── */
function LensCover({ sheet, num, title, tagline, titleId, onImage, heroSrc, meta }) {
  const boxRef = useRef(null)
  const [on, setOn] = useState(false)
  const move = (e) => {
    const r = boxRef.current.getBoundingClientRect()
    boxRef.current.style.setProperty('--x', `${e.clientX - r.left}px`)
    boxRef.current.style.setProperty('--y', `${e.clientY - r.top}px`)
  }
  return (
    <header className={`${styles.cover} ${styles.lens}`}>
      <span className={styles.lensField} aria-hidden="true" />
      <TextRail {...{ num, title, tagline, titleId, meta }} className={styles.lensText} />
      <div
        ref={boxRef}
        className={styles.lensPhoto}
        data-on={on || undefined}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') { move(e); setOn(true) } }}
        onPointerMove={(e) => { if (e.pointerType === 'mouse') move(e) }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setOn(false) }}
      >
        <img className={styles.lensDuo} src={heroSrc} alt="" />
        <img className={styles.lensTrue} src={heroSrc} alt="" />
        <button type="button" className={styles.lensTap}
          aria-pressed={on} onClick={(e) => {
            if (e.nativeEvent.pointerType !== 'touch' && e.nativeEvent.pointerType !== 'pen') { onImage?.(sheet.hero.key, e.currentTarget); return }
            setOn((v) => !v)
          }}
          aria-label={`${sheet.hero.alt} Tap to bring back the colour.`} />
      </div>
    </header>
  )
}

/* D · SETTLE ON SCROLL ──────────────────────────────────────────────── */
function SettleCover({ sheet, num, title, tagline, titleId, onImage, heroSrc, meta }) {
  const trackRef = useRef(null)
  const headRef = useRef(null)
  const slotRef = useRef(null)
  const photoRef = useRef(null)
  const textRef = useRef(null)
  const RANGE = 320   /* px of scroll the glide takes, while the cover holds */

  const scroller = () => {
    let sc = trackRef.current?.parentElement
    while (sc && getComputedStyle(sc).overflowY !== 'auto') sc = sc.parentElement
    return sc
  }

  const paint = useCallback(() => {
    const track = trackRef.current, head = headRef.current, slot = slotRef.current
    const photo = photoRef.current, text = textRef.current
    if (!track || !head || !slot || !photo) return
    const sc = scroller()
    const active = window.matchMedia('(min-width: 1000px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    /* The track is the cover's height plus the glide's scroll distance, so
       the cover holds (sticky) while the photo settles, then releases. */
    track.style.height = active ? `${head.offsetHeight + RANGE}px` : ''
    const pin = parseFloat(getComputedStyle(head).top) || 0
    const scTop = sc ? sc.getBoundingClientRect().top : 0
    const hr = head.getBoundingClientRect(), sr = slot.getBoundingClientRect()
    const end = { l: sr.left - hr.left, t: 0, w: sr.width, h: sr.height }
    const visible = sc ? sc.getBoundingClientRect().bottom - (scTop + pin) - 24 : end.h
    const start = { l: 0, t: 0, w: sr.right - hr.left, h: Math.max(end.h, visible) }
    const travelled = (scTop + pin) - track.getBoundingClientRect().top
    const p = active ? Math.min(1, Math.max(0, travelled / RANGE)) : 1
    const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2
    const L = (a, b) => a + (b - a) * e
    Object.assign(photo.style, {
      left: `${L(start.l, end.l)}px`, top: `${L(start.t, end.t)}px`,
      width: `${L(start.w, end.w)}px`, height: `${L(start.h, end.h)}px`,
    })
    if (text) {
      text.style.opacity = String(Math.min(1, Math.max(0, (e - 0.35) / 0.65)))
      text.style.transform = `translateX(${(1 - e) * -24}px)`
    }
    head.style.setProperty('--hint', String(1 - Math.min(1, p * 4)))
  }, [])

  useEffect(() => {
    const sc = scroller()
    let raf = 0
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(paint) }
    paint()
    sc?.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    /* The folder is still growing open when this mounts: re-measure
       whenever the cover's size changes, not just on scroll. */
    const ro = new ResizeObserver(on)
    if (slotRef.current) ro.observe(slotRef.current)
    return () => { sc?.removeEventListener('scroll', on); window.removeEventListener('resize', on); ro.disconnect(); cancelAnimationFrame(raf) }
  }, [paint])

  return (
    <div ref={trackRef} className={styles.settleTrack}>
      <header ref={headRef} className={`${styles.cover} ${styles.settle}`}>
        <div ref={textRef} className={styles.settleText}>
          <TextRail {...{ num, title, tagline, titleId, meta }} />
        </div>
        <span ref={slotRef} className={styles.settleSlot} aria-hidden="true" />
        <button ref={photoRef} type="button" className={styles.settlePhoto}
          onClick={(e) => onImage?.(sheet.hero.key, e.currentTarget)}
          aria-label={`View full screen: ${sheet.hero.alt}`}>
          <img src={heroSrc} alt="" />
          <span className={styles.settleHint} aria-hidden="true">Scroll</span>
        </button>
      </header>
    </div>
  )
}

/* E · THE PRINTS ────────────────────────────────────────────────────── */
const PRINT_KEYS = [
  { key: 'gs-hero', alt: 'The Groundswell Garden and the Restorative Pod in the hallway.' },
  { key: 'gs-pod-detail-01', alt: 'Two staff members at the table inside the pod.' },
  { key: 'gs-cards', alt: 'Hands sorting the Groundswell Reflection Cards on a table.' },
]
function PrintsCover({ sheet, num, title, tagline, titleId, onImage, meta }) {
  const [order, setOrder] = useState([0, 1, 2])
  const prints = PRINT_KEYS.map((p) => ({ ...p, src: sheetImg(p.key, 1400) })).filter((p) => p.src)
  const front = (i) => setOrder((o) => [i, ...o.filter((x) => x !== i)])
  return (
    <header className={`${styles.cover} ${styles.prints}`}>
      <TextRail {...{ num, title, tagline, titleId, meta }} className={styles.printsText} />
      <div className={styles.printStack}>
        {prints.map((p, i) => {
          const depth = order.indexOf(i)
          return (
            <button key={p.key} type="button" className={styles.print}
              data-depth={depth} style={{ '--depth': depth, zIndex: 10 - depth }}
              onClick={(e) => depth === 0 ? onImage?.(p.key, e.currentTarget) : front(i)}
              aria-label={depth === 0 ? `View full screen: ${p.alt}` : `Bring to front: ${p.alt}`}>
              <img src={p.src} alt="" />
            </button>
          )
        })}
      </div>
    </header>
  )
}

/** The lab's switcher: pinned to the sheet, only in lab mode. */
export function CoverLabSwitch({ value, onChange }) {
  const opts = [
    ['current', 'Current'],
    ['ambient', 'A · Ambient bleed'],
    ['strip', 'B · Ecosystem'],
    ['lens', 'C · Colour returns'],
    ['settle', 'D · Settle on scroll'],
    ['prints', 'E · The prints'],
  ]
  return (
    <div className={styles.switch} role="radiogroup" aria-label="Cover option">
      {opts.map(([v, label]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v}
          className={styles.switchBtn} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  )
}
