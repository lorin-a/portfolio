'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BirthStorySpine.module.css'

/* ============================================================================
   BirthStorySpine — the case study's backbone. A slim fixed rail (desktop)
   that lists the beats, tracks where you are as you scroll, and lets you jump.
   It gives the document a visible structure and a sense of the whole — the
   "spine" the editorial beats hang from. Hidden on narrow viewports (the
   centered column has no room); the content stays fully navigable without it.
   ============================================================================ */

export default function BirthStorySpine({ sections }) {
  const [active, setActive] = useState(null)
  const ratios = useRef({})

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { ratios.current[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0 })
        // the most-visible tracked section wins
        let best = null, top = 0
        for (const [id, r] of Object.entries(ratios.current)) {
          if (r > top) { top = r; best = id }
        }
        setActive(best)
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

  return (
    <nav className={`${styles.spine} ${active ? styles.shown : ''}`} aria-label="Case study sections">
      <ol className={styles.list}>
        {sections.map((s, i) => (
          <li key={s.id} className={styles.item}>
            <button
              className={`${styles.node} ${active === s.id ? styles.on : ''}`}
              onClick={() => jump(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.num} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.label}>{s.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
