'use client'

import { useRef } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import styles from './HeroOverview.module.css'

gsap.registerPlugin(useGSAP)

/**
 * HeroOverview — quote-led, words-first case study opener.
 *
 * For projects where the gravity of the subject is better served by a
 * confident written opening than a cinematic image transformation.
 * Renders below an opening QuoteScene; together they form a two-stage
 * cold open: cold-open quote → orientation (thesis + identity).
 *
 * Layout (one section, no pin, no scrub):
 *   eyebrow
 *   thesis paragraph (large, voice-led)
 *   title (Groundswell)
 *   tagline
 *   meta strip (role, client, year, category, team, duration)
 *   outcomes ribbon (3 stat cards)
 *
 * Reveals on enter, in cascade. Reduced motion shows everything at rest.
 *
 * data-theme defaults to "dark" so it pairs with a dark QuoteScene
 * preceding it. data-progress="hidden" suppresses the reading-progress
 * bar over the cold open.
 */
export default function HeroOverview({
  eyebrow,
  thesis,
  title,
  tagline,
  meta = {},
  outcomes = [],
  theme = 'dark',
}) {
  const ref = useRef(null)

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 70%',
        once: true,
      },
    })
    tl.from(ref.current.querySelectorAll('[data-reveal]'), {
      autoAlpha: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.12,
      ease: EASE.inOut,
    })

    return () => { tl.scrollTrigger?.kill(); tl.kill() }
  }, { scope: ref })

  const hasMeta = Object.values(meta).some(Boolean)

  return (
    <section
      ref={ref}
      className={styles.hero}
      data-theme={theme}
      data-progress="hidden"
    >
      <div className={styles.inner}>
        {eyebrow && (
          <p data-reveal className={styles.eyebrow}>{eyebrow}</p>
        )}
        {thesis && (
          <p data-reveal className={styles.thesis}>{thesis}</p>
        )}
        <div data-reveal className={styles.identity}>
          <h1 className={styles.title}>{title}</h1>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>
        {hasMeta && (
          <dl data-reveal className={styles.meta} aria-label="Project details">
            {meta.role && (<div><dt>Role</dt><dd>{meta.role}</dd></div>)}
            {meta.client && (<div><dt>Client</dt><dd>{meta.client}</dd></div>)}
            {meta.year && (<div><dt>Year</dt><dd>{meta.year}</dd></div>)}
            {meta.category && (<div><dt>Category</dt><dd>{meta.category}</dd></div>)}
            {meta.team && (<div><dt>Team</dt><dd>{meta.team}</dd></div>)}
            {meta.duration && (<div><dt>Duration</dt><dd>{meta.duration}</dd></div>)}
          </dl>
        )}
        {outcomes.length > 0 && (
          <ul data-reveal className={styles.outcomes} aria-label="At a glance">
            {outcomes.map((o, i) => (
              <li key={i} className={styles.outcome}>
                {o.value && <span className={styles.outcomeValue}>{o.value}</span>}
                {o.label && <span className={styles.outcomeLabel}>{o.label}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
