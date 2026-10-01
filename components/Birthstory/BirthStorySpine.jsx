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

  /* MEASURED IN PIXELS, NOT RATIOS.

     This used to run on an IntersectionObserver with `threshold: [0.15, …]`,
     which silently fails on a tall section: a chapter 5,477px tall can only
     ever fill ~0.11 of a viewport shrunk by the rootMargin, so it never crosses
     0.15, no callback ever fires, and the whole spine hides itself. Merging
     Research and Architecture made chapter 02 exactly that tall and blanked the
     bar for a fifth of the page — Iteration was already failing the same way
     and had been masked by sharing a node with a short section.

     A ratio also punishes a long chapter for being long. Visible PIXELS inside
     the reading band is the honest measure, it needs no thresholds, and it
     cannot be outgrown. */
  useEffect(() => {
    // a node can cover several DOM sections (e.g. Identity = voice + brand);
    // track every covered section and resolve it back to its node
    const map = {}
    sections.forEach((s) => (s.ids || [s.id]).forEach((sid) => { map[sid] = s.id }))
    const ids = Object.keys(map)
    if (!ids.length) return

    let frame = 0
    const read = () => {
      frame = 0
      const vh = window.innerHeight
      // the band a reader is actually reading in: clear of the chrome at the
      // top, short of the fold at the foot (what the old rootMargin meant)
      const bandTop = vh * 0.1
      const bandBottom = vh * 0.75
      let best = null
      let most = 0
      for (const sid of ids) {
        const el = document.getElementById(sid)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const visible = Math.min(r.bottom, bandBottom) - Math.max(r.top, bandTop)
        if (visible > most) { most = visible; best = map[sid] }
      }
      setActive(most > 0 ? best : null)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
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
        {sections.map((s) => (
          <li key={s.id} className={styles.item}>
            <button
              className={`${styles.node} ${active === s.id ? styles.on : ''} ${s.num ? '' : styles.unnumbered}`}
              onClick={() => jump(s.id)}
              aria-current={active === s.id ? 'true' : undefined}
            >
              {/* the product act is deliberately unnumbered — the numerals belong
                  to the process chapters, which is what makes the two acts read
                  as different registers rather than one long sequence */}
              {s.num && <span className={styles.num} aria-hidden="true">{s.num}</span>}
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
