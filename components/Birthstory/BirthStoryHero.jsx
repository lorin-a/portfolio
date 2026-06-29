'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './BirthStoryHero.module.css'

/* Birth Story — hero. Mode B: a hook + the real app, framed as a question.
   The home screen sits in the brand gradient with the Care Pod orbiting it —
   the actual product, alive — while the copy opens on the inquiry the whole
   case study answers. Reduced motion: composed, still. */

const MEMBERS = [
  { a: -20, tint: 'blush' }, { a: 70, tint: 'peri' }, { a: 165, tint: 'lav' }, { a: 255, tint: 'blush' },
]

export default function BirthStoryHero() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`${styles.hero} ${on ? styles.on : ''}`}>
      <div className={styles.inner}>
        <div className={styles.lead}>
          <p className={styles.meta}><span>Birth Story</span><span>UX research &amp; design</span><span>CMU · 6-week studio</span></p>
          <h1 className={styles.hook}>A birth, <em>pieced together</em> by everyone who lived it.</h1>
          <p className={styles.sub}>
            A six-week graduate studio, and one question underneath all of it: how do you hold the
            hardest, most disorienting day — <em>without getting in the way</em>?
          </p>
          <span className={styles.cue} aria-hidden="true">the thinking ↓</span>
        </div>

        <div className={styles.stage} aria-hidden="true">
          <div className={styles.orbit}>
            <span className={styles.ring} />
            <span className={styles.rotor}>
              {MEMBERS.map((m, i) => (
                <span key={i} className={`${styles.member} ${styles[m.tint]}`} style={{ '--a': `${m.a}deg`, '--i': i }} />
              ))}
            </span>
            <span className={styles.phone}>
              <span className={styles.notch} />
              <span className={styles.screen}><img src="/images/birthstory/bs-home.png" alt="" /></span>
            </span>
          </div>
          <span className={styles.bubble}>We’re here. ♥</span>
        </div>
      </div>
    </section>
  )
}
