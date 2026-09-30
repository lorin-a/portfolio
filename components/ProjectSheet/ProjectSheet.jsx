'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import SheetContent from './SheetContent'
import styles from './ProjectSheet.module.css'

/**
 * ProjectSheet — the folder, opened.
 *
 * A tab is identity, not navigation. On a real folder it exists so you can
 * find the folder while it is filed among others, and it carries the
 * folder's name. One folder has one tab. Several tabs mean several
 * dividers, which is to say several documents — which is why every
 * multi-tab version of this read wrong: along the top edge they made a
 * comb, down the side they made three files sharing one body. The sections
 * are a contents list, and a contents list is not a tab.
 *
 * So: one tab, carrying the project's name, and the sections live as a
 * sticky contents strip inside the body.
 *
 * One tab is also what makes the expansion honest. The card in the stack
 * has one tab and the opened folder has one tab, so the silhouette
 * genuinely morphs — same topology at both ends, every number lerped.
 *
 * Geometry is FileStack's, in real pixel space rather than a stretched
 * viewBox: a 1600x1100 viewBox scaled to screen aspect pulls every corner
 * radius and the tab height out of true.
 *
 * The sheet is INSET, not full-bleed. A folder that fills the whole
 * viewport has no room to be a folder — its tab collides with the top edge
 * and its outline hugs the browser chrome, which reads as a rendering
 * fault rather than an object lifted out of the stack.
 */

const BODY_RADIUS = 16
const VB_W = 1600
/* FileStack's tab is 64 tall in an 1100-tall viewBox. */
const CARD_TAB_RATIO = 64 / 1100

const TAB_H = 52
const TAB_PAD_X = 24
const TAB_RAD = 12
const TAB_JOIN = 14
const NARROW = 720

const lerp = (a, b, t) => a + (b - a) * t

/** One body, one tab. Drawn clockwise from the tab's top-left. */
function folderPath(W, H, tab, r, flushBottom) {
  const br = flushBottom ? 0 : r
  const { l, right, h, rad, j } = tab
  return [
    `M ${l + rad} 0`,
    `L ${right - rad} 0`,
    `Q ${right} 0 ${right} ${rad}`,
    `L ${right} ${h - j}`,
    `Q ${right} ${h} ${right + j} ${h}`,
    `L ${W - r} ${h}`,
    `Q ${W} ${h} ${W} ${h + r}`,
    `L ${W} ${H - br}`,
    br ? `Q ${W} ${H} ${W - br} ${H}` : `L ${W} ${H}`,
    `L ${br} ${H}`,
    br ? `Q 0 ${H} 0 ${H - br}` : `L 0 ${H}`,
    `L 0 ${h + r}`,
    `Q 0 ${h} ${r} ${h}`,
    `L ${l - j} ${h}`,
    `Q ${l} ${h} ${l} ${h - j}`,
    `L ${l} ${rad}`,
    `Q ${l} 0 ${l + rad} 0`,
    'Z',
  ].join(' ')
}

function ExpandCorners({ inward = false }) {
  const d = inward
    ? ['M1.5 5.5H6V1', 'M14.5 5.5H10V1', 'M14.5 10.5H10V15', 'M1.5 10.5H6V15']
    : ['M6 1.5H1.5V6', 'M10 1.5H14.5V6', 'M14.5 10V14.5H10', 'M1.5 10V14.5H6']
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" stroke="currentColor"
      strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {d.map((p, i) => <path key={i} className={styles[`c${i + 1}`]} d={p} />)}
    </svg>
  )
}

export default function ProjectSheet({
  open,
  onClose,
  getOrigin,
  num,
  title,
  tagline,
  tabLabel,
  /* New content shape: frame + components + close. When absent the
     sheet falls back to the original facets/statements body. */
  sheet = null,
  facets = [],
  meta = [],
  statements = [],
  href,
  hrefLabel,
  /* Press citation for an href that is a real editorial feature: the
     block renders as a publication credit instead of a bare link.
     Shape: { publisher, publication, title }. */
  press = null,
  external = false,
}) {
  const sheetRef = useRef(null)
  const svgRef = useRef(null)
  const fillRef = useRef(null)
  const strokeRef = useRef(null)
  const tabRef = useRef(null)
  const bodyRef = useRef(null)
  const closeRef = useRef(null)
  const tabWRef = useRef(0)
  const sectionsRef = useRef([])
  const [landed, setLanded] = useState(false)
  const [current, setCurrent] = useState(0)

  const label = tabLabel || title

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Sides and top only. The folder runs off the bottom edge, so the reading
     area isn't cut short by a gap under a scrolling region. */
  const insetRect = () => {
    const sx = Math.max(16, Math.min(40, window.innerWidth * 0.022))
    const sy = Math.max(16, Math.min(40, window.innerHeight * 0.03))
    return {
      left: sx, top: sy,
      width: window.innerWidth - sx * 2,
      height: window.innerHeight - sy,
    }
  }

  /* The tab sits at the folder's LEFT, like a filed manila folder, on the
     same gutter as the content (the CSS --gutter: clamp(1.25rem, 4vw, 4rem)),
     so tab, title, and every text edge share one left line. */
  const tabLeft = useCallback(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1440
    return Math.max(20, Math.min(64, vw * 0.04))
  }, [])

  /** Natural tab width, measured from its label once the sheet is shown. */
  const measureTab = useCallback(W => {
    const el = tabRef.current
    if (!el) return
    el.style.width = ''
    el.style.height = ''
    const natural = Math.ceil(el.scrollWidth) + TAB_PAD_X * 2
    tabWRef.current = Math.max(120, Math.min(natural, Math.round(W * 0.42)))
  }, [])

  /** @param t 0 = the card as it sits in the stack, 1 = fully open. */
  const paint = useCallback((t, W, H, slot) => {
    if (!svgRef.current || !slot) return

    const tabH = lerp(H * CARD_TAB_RATIO, TAB_H, t)
    const x0 = tabLeft(W)
    const l = lerp(slot.l * W, x0, t)
    const right = lerp(slot.r * W, x0 + tabWRef.current, t)
    /* Radii must fit the tab, or the path folds back through itself. */
    const half = Math.max(0, (right - l) / 2.5)
    const tab = {
      l, right, h: tabH,
      rad: Math.min(lerp(slot.rad * W, TAB_RAD, t), half, tabH / 2),
      j: Math.min(lerp(slot.j * W, TAB_JOIN, t), half, tabH * 0.45),
    }

    const r = lerp(BODY_RADIUS * (W / VB_W), 20, t)
    const d = folderPath(W, H, tab, r, t > 0.5)
    svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`)
    fillRef.current.setAttribute('d', d)
    strokeRef.current.setAttribute('d', d)

    const el = tabRef.current
    el.style.left = `${l}px`
    el.style.width = `${right - l}px`
    el.style.height = `${tabH}px`
    bodyRef.current.style.top = `${tabH}px`
    if (closeRef.current) closeRef.current.style.opacity = t > 0.85 ? '' : '0'
  }, [tabLeft])

  /* ── open ─────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const from = origin?.el?.getBoundingClientRect()
    const slot = origin?.slots?.[origin.index ?? 0]
    if (!sheet || !from || !slot) return

    const to = insetRect()
    const setRect = r => {
      sheet.style.left = `${r.left}px`
      sheet.style.top = `${r.top}px`
      sheet.style.width = `${r.width}px`
      sheet.style.height = `${r.height}px`
    }

    /* Measure at final size — the label reports 0 while the sheet is
       hidden, which silently produced a tab narrower than it was tall. */
    setRect(to)
    measureTab(to.width)

    const land = () => { setLanded(true); closeRef.current?.focus() }

    if (prefersReduced()) {
      paint(1, to.width, to.height, slot)
      land()
      return
    }

    setRect(from)
    paint(0, from.width, from.height, slot)

    const state = { t: 0, w: from.width, h: from.height, x: from.left, y: from.top }
    const tween = gsap.to(state, {
      t: 1, w: to.width, h: to.height, x: to.left, y: to.top,
      duration: 0.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        setRect({ left: state.x, top: state.y, width: state.w, height: state.h })
        paint(state.t, state.w, state.h, slot)
      },
      onComplete: land,
    })
    return () => tween.kill()
  }, [open, getOrigin, measureTab, paint])

  const requestClose = useCallback(() => {
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const to = origin?.el?.getBoundingClientRect()
    const slot = origin?.slots?.[origin.index ?? 0]
    setLanded(false)

    if (!sheet || !to || !slot || prefersReduced()) { onClose?.(); return }

    const from = insetRect()
    const state = { t: 1, w: from.width, h: from.height, x: from.left, y: from.top }
    gsap.to(state, {
      t: 0, w: to.width, h: to.height, x: to.left, y: to.top,
      duration: 0.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        sheet.style.left = `${state.x}px`
        sheet.style.top = `${state.y}px`
        sheet.style.width = `${state.w}px`
        sheet.style.height = `${state.h}px`
        paint(state.t, state.w, state.h, slot)
      },
      onComplete: () => onClose?.(),
    })
  }, [getOrigin, onClose, paint])

  /* Escape, scroll lock, focus containment. */
  useEffect(() => {
    if (!open) return
    const onKey = e => {
      /* An image lightbox opened from the sheet owns its own keys — ESC
         closes IT, not the sheet, and its focus stays its business. */
      if (e.target instanceof Element && e.target.closest('[aria-label="Image lightbox"]')) return
      if (e.key === 'Escape') { e.stopPropagation(); requestClose(); return }
      if (e.key !== 'Tab') return
      const f = sheetRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      if (!f?.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    /* THE SCROLL LOCK NEEDS BOTH HALVES.
     *
     * 1. The homepage runs `ScrollTrigger.normalizeScroll(true)` (set in
     *    HeroScatter). That intercepts wheel and touch at the document and
     *    drives the page programmatically, which both steals the wheel
     *    before it can reach this sheet AND scrolls straight past
     *    `overflow: hidden`. It has to be suspended while the sheet is up.
     * 2. globals.css sets `overflow-x: clip` on html, and a root whose
     *    overflow is not fully `visible` stops propagating the body's
     *    overflow to the viewport — so locking `body` alone does nothing.
     */
    const normalizer = ScrollTrigger.normalizeScroll()
    normalizer?.disable()

    const root = document.documentElement
    const prevRoot = root.style.overflow
    const prevBody = document.body.style.overflow
    root.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey, true)
    return () => {
      normalizer?.enable()
      root.style.overflow = prevRoot
      document.body.style.overflow = prevBody
      document.removeEventListener('keydown', onKey, true)
    }
  }, [open, requestClose])

  /* The contents strip follows the reader. Without this it reads as a menu
     you clicked rather than a place you are. */
  useEffect(() => {
    if (!open || !landed) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setCurrent(Number(e.target.dataset.index))
      })
    }, { root: bodyRef.current, rootMargin: '0px 0px -70% 0px', threshold: 0 })
    sectionsRef.current.filter(Boolean).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [open, landed])

  useEffect(() => {
    if (!open) return
    const onResize = () => {
      const origin = getOrigin?.()
      const slot = origin?.slots?.[origin.index ?? 0]
      const r = insetRect()
      const sheet = sheetRef.current
      if (!sheet || !slot) return
      sheet.style.left = `${r.left}px`; sheet.style.top = `${r.top}px`
      sheet.style.width = `${r.width}px`; sheet.style.height = `${r.height}px`
      measureTab(r.width)
      paint(1, r.width, r.height, slot)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, getOrigin, measureTab, paint])

  if (!open) return null

  const titleId = `sheet-title-${num}`
  /* One article or several: always a list. */
  const pressList = !press ? [] : (Array.isArray(press) ? press : [{ ...press, href }]).filter((a) => a?.href)

  return (
    <>
      <div className={styles.scrim} data-on={landed} onClick={requestClose} aria-hidden="true" />
      <div
        ref={sheetRef}
        className={styles.sheet}
        data-landed={landed}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-paper="glass"
      >
        <svg ref={svgRef} className={styles.frame} preserveAspectRatio="none" aria-hidden="true">
          <path ref={fillRef} className={styles.frameFill} />
          <path ref={strokeRef} className={styles.frameStroke} vectorEffect="non-scaling-stroke" />
        </svg>

        {/* The folder's own tab. Identity, not a control — it names the
            folder the way a tab on a filed folder does. */}
        <div ref={tabRef} className={styles.folderTab} aria-hidden="true">
          <span className={styles.folderTabText}>{label}</span>
        </div>

        <button ref={closeRef} type="button" className={styles.close} onClick={requestClose}
          aria-label="Close project">
          <ExpandCorners inward />
          <span className={styles.closeLabel}>Close</span>
          <span className={styles.esc} aria-hidden="true">esc</span>
        </button>

        <div ref={bodyRef} className={styles.body}>
          <div className={styles.inner}>
            {sheet ? (
              <SheetContent sheet={sheet} num={num} title={title}
                tagline={tagline} titleId={titleId} />
            ) : (
              <LegacyContent num={num} title={title} tagline={tagline}
                titleId={titleId} meta={meta} statements={statements}
                facets={facets} current={current} setCurrent={setCurrent}
                sectionsRef={sectionsRef} prefersReduced={prefersReduced}
                styles={styles} />
            )}
            {pressList.length > 0 ? (
              /* Featured articles: a row of three on the sheet's grid. Each
                 card is one link: the page as published under a faded
                 overlay carrying where it ran, the headline, and the call. */
              <section className={styles.press} aria-labelledby={`${titleId}-press`}>
                {/* FS127: set as press, unmistakably. A heading that says so,
                    then each article as a glass clipping: the page itself in
                    full colour, the publication as its masthead, the date,
                    the headline, the call. */}
                <div className={styles.pressHeadRow}>
                  <span className={styles.pressKicker}>Press</span>
                  <h3 id={`${titleId}-press`} className={styles.pressHead}>Featured in</h3>
                </div>
                <ul className={styles.pressRow}>
                  {pressList.map((a) => (
                    <li key={a.href}>
                      <a className={styles.pressCard} href={a.href}
                        target="_blank" rel="noopener noreferrer">
                        {a.preview && (
                          <span className={styles.pressMedia}>
                            <img className={styles.pressImg} src={a.preview} alt="" loading="lazy" />
                          </span>
                        )}
                        <span className={styles.pressBody}>
                          <span className={styles.pressMasthead}>{a.publication}</span>
                          <span className={styles.pressMeta}>
                            {a.publisher && <span>{a.publisher}</span>}
                            {a.date && <span>{a.date}</span>}
                          </span>
                          <span className={styles.pressTitle}>{a.title}</span>
                          <span className={styles.pressCta}>
                            Read the article<span aria-hidden="true"> ↗</span>
                            <span className={styles.srOnly}>, opens in a new tab</span>
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ) : href ? (
              <div className={styles.deeper}>
                <span className={styles.deeperLabel}>Go further</span>
                <a href={href}>{hrefLabel || `Read the full ${title} case study`}</a>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

function Media({ item, gated }) {
  const cls = gated ? `${styles.media} ${styles.mediaGated}` : styles.media
  return (
    <div className={styles.mediaBox}>
      {item.type === 'video' ? (
        <video src={item.src} muted loop playsInline preload="metadata"
          className={cls} aria-label={item.alt} />
      ) : (
        <img src={item.src} alt={item.alt || ''} className={cls} loading="lazy" />
      )}
    </div>
  )
}


/**
 * The original body: metadata, four statements, and the contribution
 * facets. Still in use by every project that has no `sheet` content yet.
 */
function LegacyContent({ num, title, tagline, titleId, meta, statements,
  facets, current, setCurrent, sectionsRef, prefersReduced }) {
  return (
    <>
          <header className={styles.masthead}>
            <span className={styles.num}>{num}</span>
            <h2 id={titleId} className={styles.title}>{title}</h2>
            {tagline && <p className={styles.tagline}>{tagline}</p>}
          </header>

          {meta.length > 0 && (
            <dl className={styles.meta}>
              {meta.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd className={v.todo ? styles.todo : undefined}>{v.todo || v}</dd>
                </div>
              ))}
            </dl>
          )}

          {statements.length > 0 && (
            <div className={styles.statements}>
              {statements.map(s => (
                <section key={s.label} className={styles.statement}>
                  <h3 className={styles.statementLabel}>{s.label}</h3>
                  <p className={s.todo ? `${styles.statementBody} ${styles.todo}` : styles.statementBody}>
                    {s.todo && <b>Lorin to write</b>}
                    {s.todo || s.body}
                  </p>
                </section>
              ))}
            </div>
          )}

          {/* Contents. Sticks to the top of the reading area once the work
              starts, so you always know which section you are in. */}
          {facets.length > 1 && (
            <nav className={styles.contents} aria-label={`${title} contents`}>
              {facets.map((f, i) => (
                <button
                  key={f.label}
                  type="button"
                  className={styles.contentsItem}
                  aria-current={i === current ? 'true' : undefined}
                  onClick={() => {
                    setCurrent(i)
                    sectionsRef.current[i]?.scrollIntoView({
                      behavior: prefersReduced() ? 'auto' : 'smooth',
                      block: 'start',
                    })
                  }}
                >
                  <span className={styles.contentsNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.contentsLabel}>{f.label}</span>
                </button>
              ))}
            </nav>
          )}

          {facets.map((f, i) => {
            const items = f.gallery || []
            const [lead, ...rest] = items
            return (
              <section
                key={f.label}
                ref={el => { sectionsRef.current[i] = el }}
                data-index={i}
                className={styles.facet}
              >
                <div className={styles.facetHead}>
                  <h3>{f.label}</h3>
                  <span className={styles.count}>
                    {items.length} {items.length === 1 ? 'item' : 'items'}
                    {f.gated && ` · ${f.gatedLabel || 'Confidential'}`}
                  </span>
                </div>

                {lead && (
                  <figure className={styles.lead}>
                    <Media item={lead} gated={f.gated} />
                    {f.gated && <p className={styles.gatedNote}>{f.gatedNote || 'Available on request'}</p>}
                    {lead.alt && <figcaption>{lead.alt}</figcaption>}
                  </figure>
                )}

                {rest.length > 0 && (
                  <div className={styles.grid}>
                    {rest.map((item, j) => (
                      <figure key={j}>
                        <Media item={item} gated={f.gated} />
                        {item.alt && <figcaption>{item.alt}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )}
              </section>
            )
          })}

    </>
  )
}
