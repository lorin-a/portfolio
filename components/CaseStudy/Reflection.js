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
 *
 * Two modes:
 *   1. PROMPT mode (legacy) — pass `differently / surprised / forward` strings.
 *      Renders three labeled prompts with the canonical questions above.
 *   2. PRINCIPLES mode — pass `principles: [{ title, body }]`.
 *      Each principle's *title is the lesson*. Use this for the closing
 *      peak per the storytelling philosophy: headers carry the claim,
 *      body explains in 2–3 sentences. Up to four principles.
 *
 * Prefer principles mode for new case studies. Prompt mode stays as a
 * fallback for projects that haven't migrated.
 */
export default function Reflection({
  number = '04',
  heading = 'Reflection',
  principles,
  differently,
  surprised,
  forward,
}) {
  const ref = useRef(null)

  /* Resolve which mode is active. Principles take precedence when an
     array of one or more {title, body} entries is provided. */
  const usingPrinciples =
    Array.isArray(principles) &&
    principles.some(p => p && (p.title || p.body))

  const promptAnswers = { differently, surprised, forward }

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
          <h2 data-reveal className={styles.heading}>{heading}</h2>
          <div className={styles.prompts}>
            {usingPrinciples
              ? principles
                  .filter(p => p && (p.title || p.body))
                  .map(({ title, body }, i) => (
                    <section key={i} data-reveal className={styles.prompt}>
                      <h3 className={styles.principleTitle}>{title}</h3>
                      {body && <p className={styles.answer}>{body}</p>}
                    </section>
                  ))
              : PROMPTS.map(({ key, label }) => (
                  promptAnswers[key] && (
                    <section key={key} data-reveal className={styles.prompt}>
                      <h3 className={styles.label}>{label}</h3>
                      <p className={styles.answer}>{promptAnswers[key]}</p>
                    </section>
                  )
                ))}
          </div>
        </div>
      </div>
    </section>
  )
}
