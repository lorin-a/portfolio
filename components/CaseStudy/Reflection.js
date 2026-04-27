'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './Reflection.module.css'

const PROMPTS = [
  { key: 'differently', label: "What I'd do differently" },
  { key: 'surprised',   label: 'What surprised me' },
  { key: 'forward',     label: "What I'm taking forward" },
]

/**
 * Reflection — first-person close.
 * Three labeled prompts, each 1–2 sentences in Lorin's voice.
 * Locks rhythm across case studies; voice differentiates inside the structure.
 */
export default function Reflection({ number = '04', differently, surprised, forward }) {
  const ref = useRef(null)
  const answers = { differently, surprised, forward }

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.from(ref.current.querySelectorAll('[data-reveal]'), {
      autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.12, ease: 'power1.inOut',
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
    })
  }, { scope: ref })

  return (
    <section ref={ref} className={styles.reflection}>
      <div className={styles.inner}>
        <div className={styles.numberPlate} aria-hidden="true">
          <span className={styles.number}>{number}</span>
          <span className={styles.numberLabel}>Reflection</span>
        </div>
        <div className={styles.content}>
          <h2 data-reveal className={styles.heading}>Reflection</h2>
          <div className={styles.prompts}>
            {PROMPTS.map(({ key, label }) => (
              answers[key] && (
                <section key={key} data-reveal className={styles.prompt}>
                  <h3 className={styles.label}>{label}</h3>
                  <p className={styles.answer}>{answers[key]}</p>
                </section>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
