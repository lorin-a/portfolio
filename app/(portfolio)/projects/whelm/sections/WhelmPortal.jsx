'use client'

import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.6 — The Portal lens. "Overwhelm is a portal."
   Three nested arches draw outermost-inward, like a passage opening.
   A soft glow swells inside the innermost arch as the gesture
   completes. */

const ARCHES = [
  { id: 'outer',  d: 'M 200 480 L 200 220 A 200 200 0 0 1 600 220 L 600 480' },
  { id: 'mid',    d: 'M 260 480 L 260 250 A 140 140 0 0 1 540 250 L 540 480' },
  { id: 'inner',  d: 'M 330 480 L 330 290 A 70 70 0 0 1 470 290 L 470 480'   },
]

export default function WhelmPortal() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    build(tl, root) {
      const arches = Array.from(root.querySelectorAll('[data-portal-arch]'))
      const glow = root.querySelector('[data-portal-glow]')

      arches.forEach(p => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = String(len)
        p.style.strokeDashoffset = String(len)
      })
      gsap.set(glow, { autoAlpha: 0, transformOrigin: '50% 75%', scale: 0.6 })

      if (prefersReducedMotion()) {
        arches.forEach(p => { p.style.strokeDashoffset = '0' })
        gsap.set(glow, { autoAlpha: 0.5, scale: 1 })
        snapClaim(root)
        return
      }

      const archStart = revealClaim(tl, root)
      arches.forEach((p, i) => {
        tl.to(p, {
          strokeDashoffset: 0,
          duration: 1.3,
          ease: 'sine.inOut',
        }, archStart + i * 0.4)
      })

      const archEnd = archStart + (arches.length - 1) * 0.4 + 1.3
      tl.to(glow, {
        autoAlpha: 0.55, scale: 1,
        duration: 1.4, ease: 'power2.out',
      }, archEnd - 0.6)
    },
  })

  return (
    <StickySection ref={sectionRef} id="portal" track="medium" stage="grid">
      <div className={styles.lensSplit}>
        <div className={styles.portalStage}>
          <svg
            className={styles.portalSvg}
            viewBox="160 0 480 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="portalArchGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#BDB7E9" />
                <stop offset="1" stopColor="#7e6fa8" />
              </linearGradient>
              <radialGradient id="portalGlowGradient" cx="50%" cy="100%" r="60%">
                <stop offset="0" stopColor="#F0E2FF" stopOpacity="0.7" />
                <stop offset="0.5" stopColor="#BDB7E9" stopOpacity="0.25" />
                <stop offset="1" stopColor="#1f0536" stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse
              data-portal-glow
              cx="400" cy="400" rx="60" ry="100"
              fill="url(#portalGlowGradient)"
            />

            {ARCHES.map(a => (
              <path
                key={a.id}
                data-portal-arch
                d={a.d}
                pathLength="1"
                fill="none"
                stroke="url(#portalArchGradient)"
                strokeWidth="2.5"
                strokeOpacity="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        </div>

        <LensClaim
          className={styles.portalClaim}
          srText="Overwhelm is a portal. Heightened sensation surfaces what is ready to be seen — for observation, reflection, release."
          heading={<>Over<span className={styles.overwhelmKern}>w</span>helm is a <Accent>portal</Accent>.</>}
          body="Heightened sensation surfaces what is ready to be seen — for observation, reflection, release."
        />
      </div>
    </StickySection>
  )
}
