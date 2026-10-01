'use client'

import { useEffect, useRef, useState } from 'react'
import s from './SheetMotionLibrary.module.css'

/* FS233–FS235: the clip and a chevron flow track of views, in one glass
   container. (FS220's toggle and the FS226 variants were retired.) The
   toggle reads as the dashboard's own lens switch; the caption says who
   the view serves and why. Each clip plays once (silent) and the next
   view follows; any view can be chosen. Plays only in view. Reduced
   motion: nothing plays on its own; choosing a view plays it. */

/* FS230: user-flow glyphs, one per view (stroke icons, UX diagram idiom) */
const GLYPH = {
  'At a glance': <><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" /><circle cx="12" cy="12" r="3" /></>,
  /* a pointing hand (after Lucide's pointer, ISC), tapping */
  'With a tap': <><path d="M22 14a8 8 0 0 1-8 8" /><path d="M18 11v-1a2 2 0 0 0-4 0" /><path d="M14 10V9a2 2 0 0 0-4 0v1" /><path d="M10 9.5V4a2 2 0 0 0-4 0v10" /><path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" /></>,
  'In depth': <><path d="M3.5 20.5h17" /><path d="M6 20.5v-6M10.5 20.5v-11M15 20.5v-8M19.5 20.5v-4" /></>,
  'Over time': <><path d="M3.5 3.5v17h17" /><path d="M6.5 15l4-4.5 3 3 6-6.5" /><circle cx="19.5" cy="7" r="1.2" /></>,
}

export default function SheetMotionLibrary({ items = [] }) {
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

  return (
    <div ref={wrap} className={`${s.player} ${s.glass}`}>
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
      </div>

      <div className={s.flowWrap}>
          <p className={s.flowHint} aria-hidden="true">
            Select a view
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
          </p>
          <ol className={s.chev} role="tablist" aria-label="Dashboard views, from overview to depth">
            {items.map((x, i) => (
              <li key={x.view} style={{ '--depth': i }}>
                <button type="button" role="tab" aria-selected={i === active} className={s.seg}
                  aria-label={`${x.view}. ${x.audience}. ${x.caption}`} onClick={() => go(i)}>
                  {i === active && <span className={s.segFill} data-run={playing || undefined}
                    style={{ '--dur': `${x.duration}s` }} aria-hidden="true" />}
                  <svg className={s.segIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPH[x.view]}</svg>
                  <span className={s.segView}>{x.view}</span>
                </button>
              </li>
            ))}
          </ol>
      </div>
    </div>
  )
}
