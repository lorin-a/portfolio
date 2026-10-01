'use client'

import { useEffect, useRef, useState } from 'react'
import s from './MotionLibrary.module.css'

/* FS212: a 2 × 2 library of dashboard interactions. Each tile rests on its
   first frame and plays on hover or keyboard focus; on touch, a tap plays
   and pauses. Reduced motion: nothing autoplays, a visible play control
   stays. Every clip is silent. */
function Tile({ item }) {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const play = () => { const v = ref.current; if (!v) return; v.play().catch(() => {}); setPlaying(true) }
  const stop = () => { const v = ref.current; if (!v) return; v.pause(); v.currentTime = 0; setPlaying(false) }
  const toggle = () => (playing ? stop() : play())

  return (
    <figure className={s.tile}
      onMouseEnter={reduced ? undefined : play}
      onMouseLeave={reduced ? undefined : stop}>
      <button type="button" className={s.frame} onClick={toggle}
        onFocus={reduced ? undefined : play} onBlur={reduced ? undefined : stop}
        aria-label={`${playing ? 'Pause' : 'Play'}: ${item.title}`} aria-pressed={playing}>
        <video ref={ref} src={item.src} poster={item.poster} muted loop playsInline
          preload="metadata" aria-hidden="true" tabIndex={-1} />
        <span className={s.badge} data-playing={playing || undefined} aria-hidden="true">
          {playing ? 'Playing' : 'Hover to play'}
        </span>
      </button>
      <figcaption className={s.caption}>
        <span className={s.kind}>{item.kind}</span>
        <span className={s.title}>{item.title}</span>
        <span className={s.text}>{item.text}</span>
      </figcaption>
    </figure>
  )
}

export default function MotionLibrary({ items = [] }) {
  return (
    <div className={s.grid}>
      {items.map((it) => <Tile key={it.title} item={it} />)}
    </div>
  )
}
