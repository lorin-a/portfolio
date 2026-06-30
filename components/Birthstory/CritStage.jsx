'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import c from './CritStage.module.css'

/* Tester-feedback annotation — the crit voice. Reuses the onboarding tour's
   pin + measured leader, but styled as a distinct "a tester said" margin note
   (warm terracotta, not the product's teal). Wraps a single artifact (a screen
   mockup or a line of copy) as children; pins a marker at %coords over it and
   floats the verbatim tester quote to one side, joined by a leader line.
   Reveals once in view. Reduced motion: shown still. Narrow: stacks, no leader. */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

export default function CritStage({ pin, side = 'right', align = 'center', quote, who = 'Parent tester', cap, children }) {
  const [seen, setSeen] = useState(false)
  const [lead, setLead] = useState(null)

  const stageRef = useRef(null)
  const artRef = useRef(null)
  const pinRef = useRef(null)
  const cardRef = useRef(null)
  const reduce = useRef(false)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce.current) { setSeen(true); return }
    const el = stageRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.35 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  // measure the leader from the pin to the nearest edge of the crit card
  useIso(() => {
    const measure = () => {
      const stage = stageRef.current, art = artRef.current, pinEl = pinRef.current, card = cardRef.current
      if (!stage || !art || !pinEl || !card) return
      const sb = stage.getBoundingClientRect()
      const ab = art.getBoundingClientRect()
      const pb = pinEl.getBoundingClientRect()
      const cb = card.getBoundingClientRect()
      // stacked layout (card sits below the artifact): no leader
      const overlapX = Math.min(cb.right, ab.right) - Math.max(cb.left, ab.left)
      if (overlapX > Math.min(cb.width, ab.width) * 0.5) { setLead(null); return }
      const x1 = pb.left + pb.width / 2 - sb.left
      const y1 = pb.top + pb.height / 2 - sb.top
      const onRight = cb.left > pb.left
      const x2 = (onRight ? cb.left : cb.right) - sb.left
      const y2 = cb.top + Math.min(cb.height / 2, 30) - sb.top
      setLead({ x1, y1, x2, y2 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', measure)
    const id = setTimeout(measure, 320)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(id) }
  }, [seen])

  return (
    <div ref={stageRef} className={`${c.stage} ${c[side]} ${align === 'start' ? c.start : ''} ${seen ? c.in : ''}`}>
      <div className={c.artCol}>
        <div ref={artRef} className={c.art}>
          {children}
          <span ref={pinRef} className={c.pin} style={{ left: `${pin.x}%`, top: `${pin.y}%` }} aria-hidden="true" />
        </div>
        {cap && <p className={c.cap}>{cap}</p>}
      </div>

      <svg className={c.leads} aria-hidden="true">
        {lead && <line x1={lead.x1} y1={lead.y1} x2={lead.x2} y2={lead.y2} />}
      </svg>

      <figure ref={cardRef} className={c.card}>
        <figcaption className={c.kicker}>a tester said</figcaption>
        <p className={c.quote}>“{quote}”</p>
        <p className={c.who}>{who}</p>
      </figure>
    </div>
  )
}
