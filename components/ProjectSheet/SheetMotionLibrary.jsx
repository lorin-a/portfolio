'use client'

import { useEffect, useRef, useState } from 'react'
import s from './SheetMotionLibrary.module.css'

/* FS220: one view toggle above, one caption below, nothing else. The
   toggle reads as the dashboard's own lens switch; the caption says who
   the view serves and why. Each clip plays once (silent) and the next
   view follows; any view can be chosen. Plays only in view. Reduced
   motion: nothing plays on its own; choosing a view plays it. */

/* FS230: user-flow glyphs, one per view (stroke icons, UX diagram idiom) */
const GLYPH = {
  'At a glance': <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  'With a tap': <><circle cx="12" cy="9" r="2.2" /><path d="M7.5 9a4.5 4.5 0 0 1 9 0" /><path d="M5 9a7 7 0 0 1 14 0" opacity=".55" /><path d="M12 11.5v8M9.5 17l2.5 2.5 2.5-2.5" /></>,
  'In depth': <><path d="M3.5 20.5h17" /><path d="M6 20.5v-6M10.5 20.5v-11M15 20.5v-8M19.5 20.5v-4" /></>,
  'Over time': <><path d="M3.5 3.5v17h17" /><path d="M6.5 15l4-4.5 3 3 6-6.5" /><circle cx="19.5" cy="7" r="1.2" /></>,
}

export default function SheetMotionLibrary({ items = [], nav = 'toggle' }) {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [chosen, setChosen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const wrap = useRef(null)
  const video = useRef(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.currentTime = 0
    /* a chosen view always plays; the automatic tour only while in view */
    if ((inView && !reduced) || chosen) v.play().then(() => setPlaying(true)).catch(() => {})
    else { v.pause(); setPlaying(false) }
  }, [active, inView, reduced, chosen])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }
  const it = items[active]
  if (!it) return null
  const go = (i) => { setChosen(true); setActive((i + items.length) % items.length) }
  const total = items.reduce((a, x) => a + x.duration, 0)
  const bar = (i, x) => i === active && <span className={s.progress} data-run={playing || undefined}
    style={{ '--dur': `${x.duration}s` }} aria-hidden="true" />

  return (
    <div ref={wrap} className={s.player}>
      {nav === 'toggle' && <div className={s.toggle} role="tablist" aria-label="Dashboard views">
        {items.map((x, i) => (
          <button key={x.view} type="button" role="tab" className={s.tab}
            aria-selected={i === active} aria-controls="dash-view"
            onClick={() => { setChosen(true); setActive(i) }}>
            {x.view}
            {i === active && <span className={s.progress} data-run={playing || undefined}
              style={{ '--dur': `${x.duration}s` }} aria-hidden="true" />}
          </button>
        ))}
      </div>}

      <div className={nav === 'ladder' ? s.withLadder : undefined}>
      <div id="dash-view" role="tabpanel" className={s.frame}>
        <video ref={video} key={it.src} src={it.src} poster={it.poster} muted playsInline
          preload="metadata" onEnded={() => { if (!reduced) setActive((a) => (a + 1) % items.length) }}
          aria-label={`${it.view}: ${it.caption}`} />
        <button type="button" className={s.play} onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'} data-playing={playing || undefined}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {playing ? <path d="M5 3h2v10H5zM9 3h2v10H9z" fill="currentColor" />
              : <path d="M5 3l8 5-8 5z" fill="currentColor" />}
          </svg>
        </button>
        {nav === 'arrows' && <>
          <button type="button" className={`${s.arrow} ${s.prev}`} onClick={() => go(active - 1)} aria-label="Previous view">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10 3L5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </button>
          <button type="button" className={`${s.arrow} ${s.next}`} onClick={() => go(active + 1)} aria-label="Next view">
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </button>
        </>}
      </div>

      {nav === 'ladder' && (
        <ol className={s.ladder} role="tablist" aria-label="Dashboard views, from overview to depth">
          {items.map((x, i) => (
            <li key={x.view} style={{ '--step': i }}>
              <button type="button" role="tab" aria-selected={i === active} className={s.rung} onClick={() => go(i)}>
                <span className={s.rungNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={s.rungView}>{x.view}</span>
                {bar(i, x)}
              </button>
            </li>
          ))}
          <li className={s.ladderAxis} aria-hidden="true">Deeper engagement ↓</li>
        </ol>
      )}
      </div>

      {nav === 'flow' && (
        <ol className={s.flow} role="tablist" aria-label="Dashboard views, as a user flow">
          {items.map((x, i) => (
            <li key={x.view} className={s.flowStep}>
              <button type="button" role="tab" aria-selected={i === active} className={s.node} onClick={() => go(i)}>
                <span className={s.glyph} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{GLYPH[x.view]}</svg>
                  {bar(i, x)}
                </span>
                <span className={s.nodeView}>{x.view}</span>
              </button>
              {i < items.length - 1 && (
                <span className={s.edge} aria-hidden="true">
                  <span className={s.edgeLabel}>{x.next}</span>
                  <svg viewBox="0 0 60 10" preserveAspectRatio="none"><path d="M1 5h54" /><path d="M51 1.5l4.5 3.5-4.5 3.5" /></svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      )}

      {nav === 'chapters' && (
        <div className={s.chapters}>
          <div className={s.chapterRow} role="tablist" aria-label="Dashboard views">
            {items.map((x, i) => (
              <button key={x.view} type="button" role="tab" aria-selected={i === active}
                className={s.chapter} style={{ flexGrow: x.duration / total }} onClick={() => go(i)}>
                <span className={s.track}>{bar(i, x)}</span>
                <span className={s.chapterView}>{x.view}</span>
              </button>
            ))}
          </div>
          <p className={s.axis} aria-hidden="true"><span>Overview</span><span>Deeper engagement →</span></p>
        </div>
      )}

      {nav === 'arrows' && (
        <div className={s.dots}>
          {items.map((x, i) => (
            <button key={x.view} type="button" className={s.dot} aria-label={x.view}
              aria-current={i === active || undefined} onClick={() => go(i)} />
          ))}
          <span className={s.dotLabel}>{String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')} · {it.view}</span>
        </div>
      )}

      <p className={s.caption} aria-live="polite">
        <span className={s.who}>{it.audience}.</span> {it.caption}
      </p>
    </div>
  )
}
