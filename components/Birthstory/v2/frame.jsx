'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from '../kit'
import s from './v2.module.css'

/* Shared V2 frame primitives — used by the score (BirthStoryV2) and the deep
   plane (DeepPlane). Play-once reveal; reduced motion shows the composed frame. */

export function useSeen(threshold = 0.2) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold })
    o.observe(el)
    return () => o.disconnect()
  }, [threshold])
  return [ref, seen]
}

export function Frame({ id, tone = 'paper', kicker, threshold = 0.18, className = '', children }) {
  const [ref, seen] = useSeen(threshold)
  return (
    <section ref={ref} id={id} className={`${s.frame} ${s[tone] || ''} ${seen ? s.in : ''} ${className}`}>
      <div className={s.inner}>
        {kicker && <p className={`${s.kicker} ${s.up}`}>{kicker}</p>}
        {children}
      </div>
    </section>
  )
}

export function Phone({ src, alt, cap, capClass }) {
  return (
    <figure className={s.shot}>
      <span className={sys.phone} style={{ width: '100%' }}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      {cap && <figcaption className={capClass || s.shotCap}>{cap}</figcaption>}
    </figure>
  )
}
