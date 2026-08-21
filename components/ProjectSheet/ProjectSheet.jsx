'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
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
/* Tab height as a fraction of width. FileStack: 64 tall in a 1600-wide
   viewBox at 3 slots = one slot's width x 0.12, i.e. 0.04 of the whole. */
const TAB_H_RATIO = 0.04
const TAB_GAP = 40        /* clears two junction sweeps, as her slot padding does */
const TAB_PAD_X = 22
const TAB_RAD = 14
const TAB_JOIN = 16
/* Below this the tab row can't hold three labels. */
const NARROW = 720

const lerp = (a, b, t) => a + (b - a) * t

/** One body, N tabs on top. Tabs must be ordered left to right. */
function folderPath(W, H, tabs, r, flushBottom) {
  const bodyTop = Math.max(...tabs.map(t => t.h), 0)
  const br = flushBottom ? 0 : r
  const d = [`M ${r} ${bodyTop}`]
  tabs.forEach(t => {
    const top = bodyTop - t.h
    d.push(
      `L ${t.l - t.j} ${bodyTop}`,
      `Q ${t.l} ${bodyTop} ${t.l} ${bodyTop - t.j}`,
      `L ${t.l} ${top + t.rad}`,
      `Q ${t.l} ${top} ${t.l + t.rad} ${top}`,
      `L ${t.r - t.rad} ${top}`,
      `Q ${t.r} ${top} ${t.r} ${top + t.rad}`,
      `L ${t.r} ${bodyTop - t.j}`,
      `Q ${t.r} ${bodyTop} ${t.r + t.j} ${bodyTop}`,
    )
  })
  d.push(
    `L ${W - r} ${bodyTop}`, `Q ${W} ${bodyTop} ${W} ${bodyTop + r}`,
    `L ${W} ${H - br}`, br ? `Q ${W} ${H} ${W - br} ${H}` : `L ${W} ${H}`,
    `L ${br} ${H}`, br ? `Q 0 ${H} 0 ${H - br}` : `L 0 ${H}`,
    `L 0 ${bodyTop + r}`, `Q 0 ${bodyTop} ${r} ${bodyTop}`, 'Z',
  )
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
    const sx = Math.max(20, Math.min(56, window.innerWidth * 0.035))
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
   * Natural tab widths, measured from the rendered labels.
   *
   * Below NARROW the labels are hidden by CSS and the tabs carry only
   * their numeral — three full labels lay out ~780px wide, which put two
   * of the three off a phone screen entirely.
   */
  const measureTabs = useCallback(W => {
    const row = tabsRef.current
    if (!row) return
    const kids = [...row.children]
    kids.forEach(b => { b.style.width = ''; b.style.height = '' })
    const { left, right } = contentBox(W)
    const narrow = W <= NARROW
    const gap = narrow ? 14 : TAB_GAP
    let x = left
    targetsRef.current = kids.map(b => {
      const natural = Math.ceil(b.scrollWidth) + TAB_PAD_X * 2
      /* Never let the row exceed the content column. */
      const cap = (right - left - gap * (kids.length - 1)) / kids.length
      const w = narrow ? Math.max(52, Math.min(natural, cap)) : natural
      const t = { l: x, r: x + w }
      x += w + gap
      return t
    })
  }, [contentBox])

  /**
   * @param t 0 = the folder as it sits in the stack, 1 = fully open.
   */
  const paint = useCallback((t, W, H, originSlots, activeIndex) => {
    const targets = targetsRef.current
    if (!targets || !svgRef.current) return
    const tabH = W * TAB_H_RATIO

    const tabs = targets.map((target, i) => {
      /* Only the active tab exists at t=0; siblings grow out of their own
         slots, so the folder visibly sprouts the rest of its tabs. */
      const grown = i === activeIndex ? 1 : t
      const s = originSlots[i]
      const mid = (s.l + s.r) / 2
      const l0 = lerp(mid, s.l, grown) * W
      const r0 = lerp(mid, s.r, grown) * W
      const l = lerp(l0, target.l, t)
      const r = lerp(r0, target.r, t)
      const h = tabH * grown
      /* Radii must fit the tab, or the path folds back through itself. */
      const half = Math.max(0, (r - l) / 2.5)
      return {
        l, r, h,
        rad: Math.min(lerp(s.rad * W, TAB_RAD, t) * grown, half, h / 2),
        j: Math.min(lerp(s.j * W, TAB_JOIN, t) * grown, half, h * 0.4),
      }
    })
    /* Neighbouring junction sweeps share the gap between them. */
    for (let i = 0; i < tabs.length - 1; i++) {
      const cap = Math.max(0, (tabs[i + 1].l - tabs[i].r) / 2)
      tabs[i].j = Math.min(tabs[i].j, cap)
      tabs[i + 1].j = Math.min(tabs[i + 1].j, cap)
    }

    const r = lerp(BODY_RADIUS * (W / VB_W), 20, t)
    const d = folderPath(W, H, tabs, r, t > 0.5)
    svgRef.current.setAttribute('viewBox', `0 0 ${W} ${H}`)
    fillRef.current.setAttribute('d', d)
    strokeRef.current.setAttribute('d', d)

    tabsRef.current.style.height = `${tabH}px`
    bodyRef.current.style.top = `${tabH}px`
    if (closeRef.current) {
      closeRef.current.style.top = `${tabH + 38}px`
      closeRef.current.style.right = `${W - contentBox(W).right}px`
    }
    ;[...tabsRef.current.children].forEach((b, i) => {
      b.style.left = `${tabs[i].l}px`
      b.style.width = `${tabs[i].r - tabs[i].l}px`
      b.style.height = `${tabs[i].h}px`
      b.style.opacity = i === activeIndex ? '' : String(t)
    })
  }, [contentBox])

  /* ── open / close ─────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!open) return
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const from = origin?.el?.getBoundingClientRect()
    const activeIndex = origin?.index ?? 0
    const slots = origin?.slots || []
    if (!sheet || !from || !slots.length) return

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
      paint(1, to.width, to.height, slots, activeIndex)
      land()
      return
    }

    setRect(from)
    paint(0, from.width, from.height, slots, activeIndex)

    const state = { t: 0, w: from.width, h: from.height, x: from.left, y: from.top }
    const tween = gsap.to(state, {
      t: 1, w: to.width, h: to.height, x: to.left, y: to.top,
      duration: 0.6,
      ease: 'power1.inOut',
      onUpdate: () => {
        setRect({ left: state.x, top: state.y, width: state.w, height: state.h })
        paint(state.t, state.w, state.h, slots, activeIndex)
      },
      onComplete: land,
    })
    return () => tween.kill()
  }, [open, getOrigin, measureTabs, paint])

  const requestClose = useCallback(() => {
    const sheet = sheetRef.current
    const origin = getOrigin?.()
    const to = origin?.el?.getBoundingClientRect()
    const activeIndex = origin?.index ?? 0
    const slots = origin?.slots || []
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
        paint(state.t, state.w, state.h, slots, activeIndex)
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
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey, true)
    return () => {
      document.body.style.overflow = prev
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
      paint(1, r.width, r.height, origin?.slots || [], origin?.index ?? 0)
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
