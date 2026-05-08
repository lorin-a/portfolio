'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from '../whelm.module.css'

gsap.registerPlugin(useGSAP)

/* Section 2.6 — The Portal lens. Third of the three.

   "Overwhelm is a portal." Heightened sensation surfaces what is
   ready to be seen. Three nested arches draw from outermost inward,
   like a passage opening — depth implied by the contour stack.
   Inside the innermost arch, a soft glow swells as the gesture
   completes. The claim panel resolves below.

   ─── Placeholder geometry ───
   Three open arches (outline only, no base line) inlined directly.
   Lavender-only palette. When Lorin provides her hand-drawn Portal
   SVG, drop it in to replace the geometry — animation hooks
   (data-portal-arch, data-portal-glow) carry through.

   ─── Pattern ───
   Cinematic-anchor sticky + paused timeline + IntersectionObserver
   play-once. Mirrors Tangle and Signal. */

const ARCHES = [
  /* Outermost → innermost. Each arch is an open path: vertical down
     left side, semicircle over the top, vertical down right side.
     Sized to fill ~92% of the viewBox vertically so the passage
     dominates its column instead of floating. */
  { id: 'outer',  d: 'M 200 480 L 200 220 A 200 200 0 0 1 600 220 L 600 480' },
  { id: 'mid',    d: 'M 260 480 L 260 250 A 140 140 0 0 1 540 250 L 540 480' },
  { id: 'inner',  d: 'M 330 480 L 330 290 A 70 70 0 0 1 470 290 L 470 480'   },
]

export default function WhelmPortal() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const sticky = root.querySelector('[data-portal-sticky]')
      const arches = Array.from(root.querySelectorAll('[data-portal-arch]'))
      const glow = root.querySelector('[data-portal-glow]')
      const heading = root.querySelector('[data-portal-line]')
      const body = root.querySelector('[data-portal-body]')
      if (!sticky) return

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      arches.forEach(p => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = String(len)
        p.style.strokeDashoffset = String(len)
      })
      gsap.set(glow, { autoAlpha: 0, transformOrigin: '50% 75%', scale: 0.6 })
      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(body, { autoAlpha: 0, y: 14 })

      if (prefersReduced) {
        arches.forEach(p => { p.style.strokeDashoffset = '0' })
        gsap.set(glow, { autoAlpha: 0.5, scale: 1 })
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set(body, { autoAlpha: 1, y: 0 })
        return
      }

      const tl = gsap.timeline({ paused: true })

      /* Text first — heading wipes in, body lifts right behind it.
         Both land before the passage opens so the framing claim
         arrives before any visual. */
      if (heading) {
        tl.to(heading, {
          '--reveal': '0%',
          duration: 1.0, ease: 'power2.inOut',
        }, 0)
      }
      tl.to(body, {
        autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out',
      }, 0.5)

      /* Arches draw outermost in, passage opening once text has
         settled. */
      const archStart = 1.3
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

      let played = false
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !played) {
            played = true
            tl.play()
            observer.disconnect()
          }
        },
        { threshold: 0.5 },
      )
      observer.observe(sticky)

      return () => {
        observer.disconnect()
        tl.kill()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="portal"
      className={styles.portalSection}
    >
      <div data-portal-sticky="true" className={styles.portalSticky}>
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
              cx="400"
              cy="400"
              rx="60"
              ry="100"
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

        <div className={styles.portalClaim}>
          <p className={styles.srOnly}>
            Overwhelm is a portal. Heightened sensation surfaces what is
            ready to be seen — for observation, reflection, release.
          </p>
          <h2 className={styles.portalHeading} aria-hidden="true">
            <span className={styles.portalLine} data-portal-line>
              <span className={styles.portalLineText}>
                Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
                <em className={styles.portalAccent}>portal</em>.
              </span>
            </span>
          </h2>
          <p data-portal-body className={styles.portalBody}>
            Heightened sensation surfaces what is ready to be seen — for
            observation, reflection, release.
          </p>
        </div>
      </div>
    </section>
  )
}
