'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const EASE_INOUT = 'power1.inOut'
import styles from './PhaseNav.module.css'

/**
 * PhaseNav — floating right-edge dot navigation for case study phases.
 * Tracks the active phase via IntersectionObserver and lets the user
 * jump between phases. Hidden on mobile (where the case study stays
 * single-column and scrolling is the primary navigation).
 *
 * Usage:
 *   <PhaseNav phases={[
 *     { kind: 'research',   label: 'Research' },
 *     { kind: 'production', label: 'Production' },
 *     { kind: 'study',      label: 'Study' },
 *   ]} />
 */
export default function PhaseNav({ phases = [] }) {
  const [active, setActive] = useState(0)
  const navRef = useRef(null)

  /* Fade in after the hero opener has settled (~1.2s). The hero's title
     SplitText + asset bounce land in that window, so the nav arrives
     after the entry, not over it. */
  useEffect(() => {
    if (!navRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(navRef.current, { autoAlpha: 1 })
      return
    }
    gsap.set(navRef.current, { autoAlpha: 0 })
    const tween = gsap.to(navRef.current, {
      autoAlpha: 1, duration: 0.5, ease: EASE_INOUT, delay: 1.2,
    })
    return () => tween.kill()
  }, [])

  useEffect(() => {
    const sections = phases
      .map((p) => document.querySelector(`[data-phase="${p.kind}"]`))
      .filter(Boolean)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = sections.indexOf(entry.target)
            if (i !== -1) setActive(i)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [phases])

  const handleJump = (kind) => {
    const target = document.querySelector(`[data-phase="${kind}"]`)
    if (!target) return
    /* Prefer Lenis if PortfolioShell exposed it, so smooth scroll matches
       the rest of the page. Falls back to native smooth scroll otherwise. */
    const lenis = typeof window !== 'undefined' ? window.__lenis : null
    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(target, { offset: 0 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!phases.length) return null

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Case study phases">
      <ol className={styles.list}>
        {phases.map((phase, i) => (
          <li key={phase.kind} className={styles.item}>
            <button
              type="button"
              data-phase-kind={phase.kind}
              className={`${styles.button} ${active === i ? styles.active : ''}`}
              onClick={() => handleJump(phase.kind)}
              aria-current={active === i ? 'step' : undefined}
              aria-label={`Jump to ${phase.label}`}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.label}>{phase.label}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
