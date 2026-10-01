'use client'

import { useEffect, useRef, useState } from 'react'
import s from './SheetMotionLibrary.module.css'

/* FS220: one view toggle above, one caption below, nothing else. The
   toggle reads as the dashboard's own lens switch; the caption says who
   the view serves and why. Each clip plays once (silent) and the next
   view follows; any view can be chosen. Plays only in view. Reduced
   motion: nothing plays on its own; choosing a view plays it. */
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

  return (
    <div ref={wrap} className={s.player}>
      <div className={s.toggle} role="tablist" aria-label="Dashboard views">
        {items.map((x, i) => (
          <button key={x.view} type="button" role="tab" className={s.tab}
            aria-selected={i === active} aria-controls="dash-view"
            onClick={() => { setChosen(true); setActive(i) }}>
            {x.view}
            {i === active && <span className={s.progress} data-run={playing || undefined}
              style={{ '--dur': `${x.duration}s` }} aria-hidden="true" />}
          </button>
        ))}
      </div>

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

      <p className={s.caption} aria-live="polite">
        <span className={s.who}>{it.audience}.</span> {it.caption}
      </p>
    </div>
  )
}
