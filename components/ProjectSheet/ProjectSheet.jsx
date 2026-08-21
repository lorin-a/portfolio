'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import styles from './ProjectSheet.module.css'

/**
 * ProjectSheet — the folder, opened.
 *
 * The stack's active card grows into a single folder that carries a tab
 * for every contribution. Those tabs are the sheet's section nav: they
 * scroll to their section and follow the reader's position, so the tabs
 * you grazed with become the tabs you navigate depth with.
 *
 * Geometry is FileStack's, generalised. `buildSilhouettePath` draws one
 * tab at a fixed x-slot; `folderPath` here draws N tabs at arbitrary
 * bounds, in real pixel space rather than a stretched viewBox — a
 * 1600x1100 viewBox scaled to screen aspect pulls every corner radius
 * and the tab height out of true.
 *
 * The sheet is INSET, not full-bleed. A folder that fills the whole
 * viewport has no room to be a folder: its tabs collide with the top
 * edge and its outline hugs the browser chrome, which reads as a
 * rendering fault rather than an object lifted out of the stack.
 */

/* Body radius and tab proportion carried over from FileStack so the
   shape is continuous across the expand. */
const BODY_RADIUS = 16
const VB_W = 1600
/* Side tabs: a fixed band each, stacked down the left edge. Fixed rather
   than viewport-scaled — at 2000px a width-scaled tab grew to 76px tall,
   which is what made a row of them read as teeth. */
const TAB_H = 54
const TAB_TOP = 96        /* clears the body's top corner radius */
const TAB_GAP = 18        /* also caps the junction sweeps between neighbours */
const TAB_PAD_X = 20
const TAB_RAD = 12
const TAB_JOIN = 14
/* Below this the tab row can't hold three labels. */
const NARROW = 720

const lerp = (a, b, t) => a + (b - a) * t

/**
 * One body with N tabs down its LEFT edge — the folder turned on its side,
 * the way index dividers sit in a binder.
 *
 * Three tabs along the top edge read as teeth: three tall shapes in a row
 * with deep junction sweeps between them is a comb, not a folder. Down the
 * side they read as what they are, a contents list, and the top edge is
 * freed for the close control and the site nav behind it.
 *
 * Drawn clockwise from the body's top-left. `tabs` must be ordered top to
 * bottom; the left edge is traversed upward, so they are consumed in
 * reverse.
 */
function folderPath(W, H, bodyLeft, tabs, r, flushBottom) {
  const br = flushBottom ? 0 : r
  const d = [`M ${bodyLeft + r} 0`, `L ${W - r} 0`, `Q ${W} 0 ${W} ${r}`]
  d.push(
    `L ${W} ${H - br}`,
    br ? `Q ${W} ${H} ${W - br} ${H}` : `L ${W} ${H}`,
    `L ${bodyLeft + br} ${H}`,
    br ? `Q ${bodyLeft} ${H} ${bodyLeft} ${H - br}` : `L ${bodyLeft} ${H}`,
  )
  ;[...tabs].reverse().forEach(t => {
    const x = bodyLeft - t.w          /* outer edge of the tab */
    d.push(
      `L ${bodyLeft} ${t.b + t.j}`,
      `Q ${bodyLeft} ${t.b} ${bodyLeft - t.j} ${t.b}`,
      `L ${x + t.rad} ${t.b}`,
      `Q ${x} ${t.b} ${x} ${t.b - t.rad}`,
      `L ${x} ${t.t + t.rad}`,
      `Q ${x} ${t.t} ${x + t.rad} ${t.t}`,
      `L ${bodyLeft - t.j} ${t.t}`,
      `Q ${bodyLeft} ${t.t} ${bodyLeft} ${t.t - t.j}`,
    )
  })
  d.push(`L ${bodyLeft} ${r}`, `Q ${bodyLeft} 0 ${bodyLeft + r} 0`, 'Z')
  return d.join(' ')
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
  facets = [],
  meta = [],
  statements = [],
  href,
  hrefLabel,
}) {
  const sheetRef = useRef(null)
  const svgRef = useRef(null)
  const fillRef = useRef(null)
  const strokeRef = useRef(null)
  const tabsRef = useRef(null)
  const bodyRef = useRef(null)
  const closeRef = useRef(null)
  const targetsRef = useRef(null)
  const sectionsRef = useRef([])
  const [landed, setLanded] = useState(false)
  const [current, setCurrent] = useState(0)

  const prefersReduced = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Inset — sides and top only. The folder runs off the bottom edge, so
     the reading area isn't cut short by a gap under a scrolling region. */
  const insetRect = () => {
    const sx = Math.max(16, Math.min(40, window.innerWidth * 0.022))
    const sy = Math.max(16, Math.min(40, window.innerHeight * 0.03))
    return {
      left: sx, top: sy,
      width: window.innerWidth - sx * 2,
      height: window.innerHeight - sy,
    }
  }

  /* Content column, so the tabs sit above the text rather than adrift. */
  const contentBox = useCallback(W => {
    const col = Math.min(1024, W)
    const pad = Math.max(24, Math.min(48, W * 0.04))
    return { left: (W - col) / 2 + pad, right: (W + col) / 2 - pad }
  }, [])

  /**
   * Tab column width, measured from the widest label, and each tab's
   * vertical band. One shared width so the outer edge is a straight line —
   * ragged tabs would read as an accident.
   *
   * Below NARROW the labels are hidden by CSS and the tabs keep only their
   * numeral, so the column collapses to a slim gutter.
   */
  const measureTabs = useCallback(W => {
    const col = tabsRef.current
    if (!col) return
    const kids = [...col.children]
    kids.forEach(b => { b.style.width = ''; b.style.height = '' })
    const narrow = W <= NARROW
    const widest = Math.max(...kids.map(b => Math.ceil(b.scrollWidth)))
    const w = narrow ? 46 : Math.min(widest + TAB_PAD_X * 2, Math.round(W * 0.22))
    let y = TAB_TOP
    targetsRef.current = {
      w,
      bands: kids.map(() => {
        const band = { t: y, b: y + TAB_H }
        y += TAB_H + TAB_GAP
        return band
      }),
    }
  }, [])

  /**
   * @param t 0 = the folder as it sits in the stack, 1 = fully open.
   */
  const paint = useCallback((t, W, H) => {
    const targets = targetsRef.current
    if (!targets || !svgRef.current) return

    /* The tabs sprout from the body's edge as the sheet lands. The origin
       folder's own tab sits on the TOP edge, so there is no honest lerp
       between the two topologies — the rect FLIP carries the continuity
       and the side tabs grow out of the edge they belong to. */
    const colW = targets.w * t
    const bodyLeft = colW
    const tabs = targets.bands.map(band => {
      const h = band.b - band.t
      const w = Math.max(0, colW)
      const fit = Math.min(TAB_RAD, w / 2.5, h / 2.5)
      return {
        t: band.t, b: band.b, w,
        rad: fit,
        j: Math.min(TAB_JOIN, w / 2, TAB_GAP / 2, h * 0.4),
      }
    })

    const r = lerp(BODY_RADIUS * (W / VB_W), 20, t)
    const d = folderPath(W, H, bodyLeft, tabs, r, t > 0.5)
    svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`)
    fillRef.current.setAttribute('d', d)
    strokeRef.current.setAttribute('d', d)

    tabsRef.current.style.width = `${colW}px`
    bodyRef.current.style.left = `${bodyLeft}px`
    if (closeRef.current) closeRef.current.style.opacity = t > 0.9 ? '' : '0'
    ;[...tabsRef.current.children].forEach((b, i) => {
      const band = targets.bands[i]
      b.style.top = `${band.t}px`
      b.style.height = `${band.b - band.t}px`
      b.style.width = `${colW}px`
      b.style.opacity = String(t)
    })
  }, [])

  /* ── open / close ─────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const from = origin?.el?.getBoundingClientRect()
    if (!sheet || !from) return

    const to = insetRect()
    const setRect = r => {
      sheet.style.left = `${r.left}px`
      sheet.style.top = `${r.top}px`
      sheet.style.width = `${r.width}px`
      sheet.style.height = `${r.height}px`
    }

    /* Measure at final size — labels report 0 while the sheet is hidden. */
    setRect(to)
    measureTabs(to.width)

    const land = () => { setLanded(true); closeRef.current?.focus() }

    if (prefersReduced()) {
      paint(1, to.width, to.height)
      land()
      return
    }

    setRect(from)
    paint(0, from.width, from.height)

    const state = { t: 0, w: from.width, h: from.height, x: from.left, y: from.top }
    const tween = gsap.to(state, {
      t: 1, w: to.width, h: to.height, x: to.left, y: to.top,
      duration: 0.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        setRect({ left: state.x, top: state.y, width: state.w, height: state.h })
        paint(state.t, state.w, state.h)
      },
      onComplete: land,
    })
    return () => tween.kill()
  }, [open, getOrigin, measureTabs, paint])

  const requestClose = useCallback(() => {
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const to = origin?.el?.getBoundingClientRect()
    setLanded(false)

    if (!sheet || !to || prefersReduced()) { onClose?.(); return }

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
        paint(state.t, state.w, state.h)
      },
      onComplete: () => onClose?.(),
    })
  }, [getOrigin, onClose, paint])

  /* Escape, scroll lock, and focus containment. */
  useEffect(() => {
    if (!open) return
    const onKey = e => {
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
     *    Lock the root.
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

  /* The tab follows the reader — without this the tabs still read as a
     flip-between rather than as sections of one document. */
  useEffect(() => {
    if (!open || !landed) return
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setCurrent(Number(e.target.dataset.index))
      })
    }, { root: bodyRef.current, rootMargin: '0px 0px -65% 0px', threshold: 0 })
    sectionsRef.current.filter(Boolean).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [open, landed])

  useEffect(() => {
    if (!open) return
    const onResize = () => {
      const origin = getOrigin?.()
      const r = insetRect()
      const sheet = sheetRef.current
      if (!sheet) return
      sheet.style.left = `${r.left}px`; sheet.style.top = `${r.top}px`
      sheet.style.width = `${r.width}px`; sheet.style.height = `${r.height}px`
      measureTabs(r.width)
      paint(1, r.width, r.height)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [open, getOrigin, measureTabs, paint])

  if (!open) return null

  const titleId = `sheet-title-${num}`

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
      >
        <svg ref={svgRef} className={styles.frame} preserveAspectRatio="none" aria-hidden="true">
          <path ref={fillRef} className={styles.frameFill} />
          <path ref={strokeRef} className={styles.frameStroke} vectorEffect="non-scaling-stroke" />
        </svg>

        <div ref={tabsRef} className={styles.tabs} role="tablist" aria-label={`${title} sections`}>
          {facets.map((f, i) => (
            <button
              key={f.label}
              type="button"
              role="tab"
              aria-selected={i === current}
              className={styles.tab}
              onClick={() => {
                setCurrent(i)
                sectionsRef.current[i]?.scrollIntoView({
                  behavior: prefersReduced() ? 'auto' : 'smooth',
                  block: 'start',
                })
              }}
            >
              <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.tabLabel}>{f.label}</span>
            </button>
          ))}
        </div>

        <button ref={closeRef} type="button" className={styles.close} onClick={requestClose}>
          <ExpandCorners inward />
          Close <span className={styles.esc}>esc</span>
        </button>

        <div ref={bodyRef} className={styles.body}>
          <div className={styles.inner}>
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
                    {/* No "Lorin to write" badge here — with four fields and
                        four statements it fired eight times on one screen.
                        The quiet tone carries it; the statements keep the
                        explicit marker. */}
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

            {href && (
              <div className={styles.deeper}>
                <span className={styles.deeperLabel}>Go further</span>
                <a href={href}>{hrefLabel || `Read the full ${title} case study`}</a>
              </div>
            )}
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
