'use client'

import { useEffect, useRef, useState } from 'react'
import s from './SheetMotionLibrary.module.css'

/* FS215: the dashboard as a guided tour through Lorin's own framework, the
   three registers (Surface · Structure · Substance), one large clip at a
   time. The active clip plays once, silent, then the tour moves on; any
   step can be chosen. Plays only while in view. Reduced motion: nothing
   plays on its own; the active clip shows its poster with a play control. */
export default function SheetMotionLibrary({ items = [], intro }) {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [playing, setPlaying] = useState(false)
  const wrap = useRef(null)
  const video = useRef(null)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.4 })
    if (wrap.current) io.observe(wrap.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    v.currentTime = 0
    if (inView && !reduced) { v.play().then(() => setPlaying(true)).catch(() => {}) }
    else { v.pause(); setPlaying(false) }
  }, [active, inView, reduced])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { v.play().catch(() => {}); setPlaying(true) } else { v.pause(); setPlaying(false) }
  }
  const next = () => { if (!reduced) setActive((a) => (a + 1) % items.length) }
  const it = items[active]
  if (!it) return null

  return (
    <div ref={wrap} className={s.tour}>
      {intro && <p className={s.intro}>{intro}</p>}

      <div className={s.frame}>
        <video ref={video} key={it.src} src={it.src} poster={it.poster} muted playsInline
          preload="metadata" onEnded={next} aria-label={`${it.register}: ${it.title}`} />
        <button type="button" className={s.play} onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'} data-playing={playing || undefined}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {playing
              ? <path d="M5 3h2v10H5zM9 3h2v10H9z" fill="currentColor" />
              : <path d="M5 3l8 5-8 5z" fill="currentColor" />}
          </svg>
        </button>
      </div>

      <ol className={s.steps}>
        {items.map((x, i) => (
          <li key={x.title}>
            <button type="button" className={s.step} aria-current={i === active ? 'step' : undefined}
              onClick={() => setActive(i)}>
              <span className={s.reg}>{String(i + 1).padStart(2, '0')} · {x.register}</span>
              <span className={s.stepTitle}>{x.title}</span>
              {i === active && <span className={s.progress} data-run={playing || undefined}
                style={{ '--dur': `${x.duration || 14}s` }} aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>

      <p className={s.purpose} aria-live="polite">{it.purpose}</p>
    </div>
  )
}
