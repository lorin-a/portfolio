'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BirthStoryHero.module.css'

/* ============================================================================
   Birth Story — hero. Mode B: a hook + a LIVE component, not a screenshot.
   The Care Pod orbit assembles over the brand gradient — loved ones drift into
   rings around "You," and a support message arrives — the product's thesis
   moving, not described. It signals a process story, not a product pitch:
   the meta strip names the work, the role, the six weeks.
   Reduced motion: composed, still; the message sits in place, nothing loops.
   ============================================================================ */

const MEMBERS = [
  { r: 1, a: -30, tint: 'blush' },
  { r: 1, a: 90, tint: 'peri' },
  { r: 1, a: 210, tint: 'lav' },
  { r: 2, a: 30, tint: 'peri' },
  { r: 2, a: 160, tint: 'blush' },
  { r: 2, a: 275, tint: 'lav' },
]

export default function BirthStoryHero() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section ref={ref} className={`${styles.hero} ${on ? styles.on : ''}`}>
      <div className={styles.inner}>
        <div className={styles.lead}>
          <p className={styles.meta}>
            <span>Birth Story</span><span>UX research &amp; design</span><span>6-week studio · CMU</span>
          </p>
          <h1 className={styles.hook}>A birth, <em>pieced together</em> by everyone who lived it.</h1>
          <p className={styles.sub}>
            How a six-week graduate studio turned interviews and three rounds of wireframes into a calm
            app for documenting birth — and a Care Pod to hold the people around it.
          </p>
          <span className={styles.cue} aria-hidden="true">the process ↓</span>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.orbit}>
            <span className={`${styles.ring} ${styles.ring1}`} />
            <span className={`${styles.ring} ${styles.ring2}`} />
            <span className={styles.rotor}>
              {MEMBERS.map((m, i) => (
                <span
                  key={i}
                  className={`${styles.member} ${styles[m.tint]}`}
                  style={{ '--r': m.r, '--a': `${m.a}deg`, '--i': i }}
                />
              ))}
            </span>
            <span className={styles.you}>You</span>
            <span className={styles.bubble}>We’re here. ♥</span>
          </div>
        </div>
      </div>
    </section>
  )
}
