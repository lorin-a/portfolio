'use client'

import { useEffect, useRef, useState } from 'react'
import s from './SheetMotionLibrary.module.css'

/* FS216: the dashboard as a playlist that deepens with engagement: at a
   glance, with a tap, in depth. One large clip plays at a time; the cards
   beneath are the obvious way in (thumbnail, play mark, “Now playing”).
   Each clip plays once, silent, then the next begins. Plays only in view.
   Reduced motion: nothing plays on its own; cards and the play control
   still work. */
export default function SheetMotionLibrary({ items = [], intro }) {
  const [active, setActive] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [chosen, setChosen] = useState(false)
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
    if (inView && (!reduced || chosen)) { v.play().then(() => setPlaying(true)).catch(() => {}) }
    else { v.pause(); setPlaying(false) }
  }, [active, inView, reduced, chosen])

  const choose = (i) => { setChosen(true); setActive(i) }
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
          preload="metadata" onEnded={next} aria-label={`${it.depth}: ${it.title}`} />
        <button type="button" className={s.play} onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'} data-playing={playing || undefined}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {playing
              ? <path d="M5 3h2v10H5zM9 3h2v10H9z" fill="currentColor" />
              : <path d="M5 3l8 5-8 5z" fill="currentColor" />}
          </svg>
        </button>
      </div>

      <p className={s.hint} id="dash-hint">Choose a view</p>
      <ol className={s.cards} aria-describedby="dash-hint">
        {items.map((x, i) => (
          <li key={x.title}>
            <button type="button" className={s.card} onClick={() => choose(i)}
              aria-current={i === active ? 'true' : undefined}
              aria-label={`${x.depth}: ${x.title}${i === active ? ', now playing' : ''}`}>
              <span className={s.thumb}>
                <img src={x.poster} alt="" loading="lazy" />
                <span className={s.mark} aria-hidden="true">
                  {i === active && playing ? 'Now playing' : (
                    <svg viewBox="0 0 16 16"><path d="M5 3l8 5-8 5z" fill="currentColor" /></svg>
                  )}
                </span>
                {i === active && <span className={s.progress} data-run={playing || undefined}
                  style={{ '--dur': `${x.duration || 14}s` }} aria-hidden="true" />}
              </span>
              <span className={s.cardDepth}>{x.depth}</span>
              <span className={s.cardTitle}>{x.title}</span>
            </button>
          </li>
        ))}
      </ol>

      <div className={s.now}>
        <p className={s.nowDepth}>{it.depth} · <span>{it.audience}</span></p>
        <p className={s.purpose} aria-live="polite">{it.purpose}</p>
      </div>

    </div>
  )
}
