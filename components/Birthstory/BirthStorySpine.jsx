'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BirthStorySpine.module.css'

/* ============================================================================
   BirthStorySpine — the case study's backbone. A horizontal progress bar that
   sits after the metadata and sticks to the top (below the nav) as you scroll,
   tracking which beat you're in and letting you jump. Horizontal so the left
   gutter is free for content. A fill at its base shows how far through you are.
   ============================================================================ */

export default function BirthStorySpine({ sections }) {
  const [active, setActive] = useState(null) // the active NODE id
  const ratios = useRef({})
  const idToNode = useRef({})

  useEffect(() => {
    // a node can cover several DOM sections (e.g. Structure = architecture +
    // iteration); observe every covered section and map it back to its node
    const map = {}
    sections.forEach((s) => (s.ids || [s.id]).forEach((sid) => { map[sid] = s.id }))
    idToNode.current = map
    const els = Object.keys(map).map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { ratios.current[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0 })
        // the most-visible tracked section wins; resolve it to its node
        let best = null, top = 0
        for (const [id, r] of Object.entries(ratios.current)) {
          if (r > top) { top = r; best = id }
        }
        setActive(best ? idToNode.current[best] : null)
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-10% 0px -25% 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [sections])

  const jump = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  const activeIndex = sections.findIndex((s) => s.id === active)
  const pct = activeIndex >= 0 ? ((activeIndex + 1) / sections.length) * 100 : 0

  return (
    <nav className={`${styles.spine} ${active ? '' : styles.hidden}`} aria-label="Case study sections" aria-hidden={active ? undefined : 'true'}>
      <ol className={styles.list}>
        {sections.map((s, i) => (
          <li key={s.id} className={styles.item}>
            <button
              className={`${styles.node} ${active === s.id ? styles.on : ''}`}
              onClick={() => jump(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className={styles.track} aria-hidden="true">
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>
    </nav>
  )
}
