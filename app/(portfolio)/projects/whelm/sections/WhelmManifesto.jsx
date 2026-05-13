'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useInlineSvg } from '../lib/useInlineSvg'
import styles from '../whelm.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Section 5 — A Ritual + The Manifesto. (Figma 255:367 + 255:368 + 255:370)

   Merged composition. The LEFT pane stays pinned (sticky) with the
   "A Ritual…" anchor and the hand-drawn Squiggle bridging into the
   right. The RIGHT pane flows normally — Manifesto title moment
   followed by the six-line litany, paired into three beats. As the
   user scrolls, each RIGHT beat passes through the viewport against
   the static LEFT anchor.

   This is the case-study's hinge: the LEFT names the ritual, the
   RIGHT is the ritual being spoken.

   Copy verbatim from Whelm_Copy_Site_Flow.md. */

const RITUAL_LINES = [
  'A Ritual',
  'for building',
  'a relationship',
  'with yourself.',
]

const MANIFESTO_ANCHOR = 'Whelm is a companion for coming back to yourself.'
const MANIFESTO_PROCESS =
  'A process for moving from thinking into feeling, at your pace.'

/* Six litany lines, paired into three beats per Figma 368/370. */
const LITANY_PAIRS = [
  [
    'For the wide-open hearts that feel everything deeply but lose track of what belongs to them.',
    'Empathetic givers who never learned how to receive.',
  ],
  [
    'Self-aware beings who make others comfortable by making themselves smaller.',
    'Expressive souls with vivid imaginations whose creativity gets drained by rumination.',
  ],
  [
    'Private perfectionists who were taught that they needed to perform to belong.',
    'Curious minds who had to minimize their sensitivity in order to survive.',
  ],
]

export default function WhelmManifesto() {
  const sectionRef = useRef(null)

  const squiggle = useInlineSvg('/brand/Squiggle.svg', {
    autoCrop: true,
    padding: 12,
  })
  const underline = useInlineSvg('/brand/Underline-squiggle.svg', {
    autoCrop: true,
    padding: 6,
  })

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const prefersReduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches

      const ritualLines = root.querySelectorAll('[data-mn-ritual-line]')
      const squiggleHost = root.querySelector('[data-mn-squiggle]')
      const beats = root.querySelectorAll('[data-mn-beat]')
      const underlineHost = root.querySelector('[data-mn-underline]')

      // Reveal SVG hosts (mount via dangerouslySetInnerHTML).
      if (squiggleHost) squiggleHost.style.visibility = 'visible'
      if (underlineHost) underlineHost.style.visibility = 'visible'

      // Initial state.
      ritualLines.forEach(line => line.style.setProperty('--reveal', '100%'))
      gsap.set(squiggleHost, { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%' })
      gsap.set(beats, { autoAlpha: 0, y: 28 })
      if (underlineHost) {
        const path = underlineHost.querySelector('path')
        if (path) {
          const len = path.getTotalLength?.() ?? 600
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
        }
      }

      if (prefersReduced) {
        ritualLines.forEach(line => line.style.setProperty('--reveal', '0%'))
        gsap.set(squiggleHost, { autoAlpha: 1, scale: 1 })
        gsap.set(beats, { autoAlpha: 1, y: 0 })
        if (underlineHost) {
          const path = underlineHost.querySelector('path')
          if (path) gsap.set(path, { strokeDashoffset: 0 })
        }
        return
      }

      // ─── LEFT pane reveal — fires once when the section enters ──
      const leftTl = gsap.timeline({ paused: true })
      ritualLines.forEach((line, i) => {
        leftTl.to(
          line,
          { '--reveal': '0%', duration: 0.85, ease: 'power2.inOut' },
          i * 0.22,
        )
      })
      leftTl.to(
        squiggleHost,
        { autoAlpha: 1, scale: 1, duration: 1.0, ease: 'power2.out' },
        0.9,
      )

      const leftST = ScrollTrigger.create({
        trigger: root,
        start: 'top 70%',
        once: true,
        onEnter: () => leftTl.play(),
      })

      // ─── RIGHT beats — each reveals as it enters viewport ──
      const beatSTs = []
      beats.forEach((beat, i) => {
        const isManifestoTitleBeat = i === 0
        beatSTs.push(
          ScrollTrigger.create({
            trigger: beat,
            start: 'top 75%',
            once: true,
            onEnter: () => {
              const tl = gsap.timeline()
              tl.to(beat, {
                autoAlpha: 1,
                y: 0,
                duration: 0.9,
                ease: 'power2.out',
              })
              if (isManifestoTitleBeat && underlineHost) {
                const path = underlineHost.querySelector('path')
                if (path) {
                  tl.to(
                    path,
                    { strokeDashoffset: 0, duration: 1.4, ease: 'sine.inOut' },
                    '<0.3',
                  )
                }
              }
            },
          }),
        )
      })

      return () => {
        leftST.kill()
        beatSTs.forEach(st => st.kill())
      }
    },
    { scope: sectionRef, dependencies: [squiggle.markup, underline.markup] },
  )

  return (
    <section ref={sectionRef} id="manifesto" className={styles.mnSection}>
      <div className={styles.mnGrid}>
        {/* LEFT — sticky cream pane with Ritual title + Squiggle bridge */}
        <div className={styles.mnLeftSticky}>
          <div className={styles.mnLeftInner}>
            <h2 className={styles.mnRitualTitle}>
              {RITUAL_LINES.map((line, i) => (
                <span key={i} className={styles.mnRitualRow}>
                  <span
                    className={styles.mnRitualClip}
                    data-mn-ritual-line
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <div
              ref={squiggle.hostRef}
              data-mn-squiggle
              className={styles.mnSquiggle}
              dangerouslySetInnerHTML={{ __html: squiggle.markup }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* RIGHT — dark scrolling flow with manifesto beats */}
        <div className={styles.mnRightFlow}>
          {/* Sr-only — full content in one block so screen readers
              get the whole manifesto regardless of the visual cycle. */}
          <p className={styles.srOnly}>
            {MANIFESTO_ANCHOR} {MANIFESTO_PROCESS}{' '}
            {LITANY_PAIRS.flat().join(' ')}
          </p>

          {/* Beat 0 — Manifesto title block */}
          <div className={styles.mnBeat} data-mn-beat aria-hidden="true">
            <p className={styles.mnEyebrow}>The Manifesto</p>
            <h3 className={styles.mnAnchor}>{MANIFESTO_ANCHOR}</h3>
            <div
              ref={underline.hostRef}
              data-mn-underline
              className={styles.mnUnderline}
              dangerouslySetInnerHTML={{ __html: underline.markup }}
              aria-hidden="true"
            />
            <p className={styles.mnProcess}>{MANIFESTO_PROCESS}</p>
          </div>

          {/* Beats 1-3 — Litany pairs */}
          {LITANY_PAIRS.map((pair, i) => (
            <div
              key={i}
              data-mn-beat
              className={styles.mnBeat}
              aria-hidden="true"
            >
              {pair.map((line, j) => (
                <p key={j} className={styles.mnLitanyLine}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
