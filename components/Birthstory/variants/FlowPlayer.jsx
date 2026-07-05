'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from '../kit'
import s from './FlowPlayer.module.css'

/* Auto-advancing screen flow inside a device — the direction studies' "video"
   register, honest about being screens. Plays while in view, pauses on hover;
   reduced motion shows the first frame with the dots as manual buttons. */
export default function FlowPlayer({ frames, name }) {
  const [i, setI] = useState(0)
  const [live, setLive] = useState(false)
  const hostRef = useRef(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return
    const io = new IntersectionObserver(
      ([en]) => setLive(en.isIntersecting),
      { threshold: 0.4 }
    )
    if (hostRef.current) io.observe(hostRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setI((v) => (v + 1) % frames.length), 2400)
    return () => clearInterval(t)
  }, [live, frames.length])

  return (
    <div
      className={s.flow}
      ref={hostRef}
      onMouseEnter={() => setLive(false)}
      onMouseLeave={() => { if (!reduced.current) setLive(true) }}
    >
      <span className={`${sys.phone} ${s.flowDevice}`}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={`${sys.phoneScreen} ${s.flowScreen}`}>
          {frames.map(([src, alt], j) => (
            <img
              key={src}
              src={src}
              alt={alt}
              loading="lazy"
              draggable="false"
              className={j === i ? s.frameOn : s.frameOff}
              aria-hidden={j !== i}
            />
          ))}
        </span>
      </span>
      <div className={s.dots} role="group" aria-label={`${name} flow steps`}>
        {frames.map(([src, alt], j) => (
          <button
            key={src}
            type="button"
            className={j === i ? s.dotOn : s.dot}
            aria-label={alt}
            aria-current={j === i}
            onClick={() => { setLive(false); setI(j) }}
          />
        ))}
      </div>
    </div>
  )
}
