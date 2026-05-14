'use client'

import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.5 — The Portal lens. "Overwhelm is a portal."

   Rebuilt 2026-05-14 per Figma 386:965. Three stacked stair-blocks
   ascend from the bottom; an arched doorway sits on top of them
   labelled "Self." The composition reads as: practices accumulate
   step by step into a threshold; the threshold opens onto the self.

   Stairs (widest at the bottom, narrowest at the top, climbing into
   the portal):
     - Self-Expression — deepest practice, plum base
     - Self-Inquiry    — middle, orchid
     - Intuition       — top step under the portal, pale lavender

   Animation:
     1. Claim wipes.
     2. Steps rise from below, bottom → top (Self-Expression first).
     3. Arched portal fades + lifts above the steps.
     4. "Self" lands inside the portal with a soft scale-up. */

const STEPS = [
  {
    id: 'self-expression',
    label: 'Self-Expression',
    x: 230, y: 510, w: 340, h: 56,
    fill: '#49325D',         // whelm-plum
    textFill: 'var(--whelm-cream)',
  },
  {
    id: 'self-inquiry',
    label: 'Self-Inquiry',
    x: 270, y: 454, w: 260, h: 56,
    fill: '#9469C2',         // brighter orchid
    textFill: 'var(--whelm-bg)',
  },
  {
    id: 'intuition',
    label: 'Intuition',
    x: 310, y: 398, w: 180, h: 56,
    fill: '#D6CBF1',         // pale lavender
    textFill: 'var(--whelm-bg)',
  },
]

/* Portal doorway — rounded-top rectangle (semicircle on top + vertical
   walls down to the top of the Intuition step). The bottom of the
   portal sits flush with the top of the highest stair (y=398). */
const PORTAL_PATH =
  'M 332 398 L 332 200 A 68 68 0 0 1 468 200 L 468 398 Z'

export default function WhelmPortal() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    build(tl, root) {
      const steps = Array.from(root.querySelectorAll('[data-portal-step]'))
      const stepTexts = Array.from(root.querySelectorAll('[data-portal-step-text]'))
      const portal = root.querySelector('[data-portal-arch]')
      const selfText = root.querySelector('[data-portal-self]')

      gsap.set(steps, { autoAlpha: 0, y: 24 })
      gsap.set(stepTexts, { autoAlpha: 0 })
      gsap.set(portal, { autoAlpha: 0, y: 18 })
      gsap.set(selfText, { autoAlpha: 0, scale: 0.9, transformOrigin: '50% 50%' })

      if (prefersReducedMotion()) {
        gsap.set([...steps, ...stepTexts, portal], { autoAlpha: 1, y: 0 })
        gsap.set(selfText, { autoAlpha: 1, scale: 1 })
        snapClaim(root)
        return
      }

      const claimEnd = revealClaim(tl, root)
      tl.addLabel('stepsIn', `+=${0.2}`)

      steps.forEach((stepEl, i) => {
        const at = `stepsIn+=${i * 0.32}`
        tl.to(
          stepEl,
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' },
          at,
        )
        tl.to(
          stepTexts[i],
          { autoAlpha: 1, duration: 0.45, ease: 'power2.out' },
          `${at}+=0.18`,
        )
      })

      const portalAt = `stepsIn+=${steps.length * 0.32 + 0.15}`
      tl.to(
        portal,
        { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' },
        portalAt,
      )

      tl.to(
        selfText,
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: 'back.out(1.6)' },
        `${portalAt}+=0.55`,
      )
    },
  })

  return (
    <StickySection ref={sectionRef} id="portal" track="medium" stage="grid">
      <div className={styles.lensSplit}>
        <div className={styles.portalStage}>
          <svg
            className={styles.portalSvg}
            viewBox="100 100 600 500"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="portalArchStroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#A47ED1" />
                <stop offset="1" stopColor="#5B3F7E" />
              </linearGradient>
            </defs>

            <path
              data-portal-arch
              d={PORTAL_PATH}
              fill="#3A2553"
              stroke="url(#portalArchStroke)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            <text
              data-portal-self
              x="400" y="285"
              textAnchor="middle"
              className={styles.portalSelfText}
            >
              Self
            </text>

            {STEPS.map(s => (
              <g key={s.id}>
                <rect
                  data-portal-step
                  x={s.x} y={s.y} width={s.w} height={s.h}
                  fill={s.fill}
                  stroke="var(--whelm-cream)"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
                <text
                  data-portal-step-text
                  x={s.x + s.w / 2}
                  y={s.y + s.h / 2 + 7}
                  textAnchor="middle"
                  className={styles.portalStepText}
                  style={{ fill: s.textFill }}
                >
                  {s.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <LensClaim
          className={styles.portalClaim}
          srText="Overwhelm is a portal. Heightened sensation surfaces what is ready to be seen — for observation, reflection, release."
          heading={
            <>
              Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
              <Accent>portal</Accent>.
            </>
          }
          body="Heightened sensation surfaces what is ready to be seen — for observation, reflection, release."
        />
      </div>
    </StickySection>
  )
}
