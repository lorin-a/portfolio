'use client'

import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './Context.module.css'

/**
 * Context — first-person setup paragraph between Hero and Sense.
 * Soft fade + translateY on enter. 1–2 sentences max in Lorin's voice.
 */
export default function Context({ children }) {
  const ref = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    gsap.from(ref.current, {
      autoAlpha: 0, y: 16, duration: 0.9, ease: 'power1.inOut',
      scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
    })
  }, { scope: ref })

  return (
    <section className={styles.section}>
      <p ref={ref} className={styles.context}>{children}</p>
    </section>
  )
}
