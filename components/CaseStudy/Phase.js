'use client'

import { useRef, useState } from 'react'
import { gsap, ScrollTrigger, EASE } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './Phase.module.css'

gsap.registerPlugin(useGSAP)

/* Marks map. Both methodology names (sense/weave/shape) and chronological
   names (research/production/study) supported so projects can pick the
   framing that fits — Groundswell uses chronological because the project
   has a 15-month arc; other case studies may stick with methodology. */
const MARKS = {
  sense: SenseMark, weave: WeaveMark, shape: ShapeMark,
  research: SenseMark, production: ShapeMark, study: WeaveMark,
}

/**
 * Case study Phase — Sense | Weave | Shape  OR  Research | Production | Study.
 *
 * Mark draws on as the phase enters. Setup question reveals via SplitText.
 * Evidence batch-reveals on scroll. Takeaway lands last and holds.
 *
 * Baton: this phase fades its mark out as the next phase's mark draws on,
 * coordinated by ScrollTrigger ranges (no cross-component messaging needed).
 *
 * Per-project bending: drop any artifact components as children. The Phase
 * doesn't prescribe what evidence looks like — only the rhythm around it.
 */
export default function Phase({ kind, number, label, question, takeaway, contribution, children }) {
  const phaseRef = useRef(null)
  const markRef = useRef(null)
  const markIconRef = useRef(null)
  const questionRef = useRef(null)
  const evidenceRef = useRef(null)
  const takeawayRef = useRef(null)
  const [markAnimate, setMarkAnimate] = useState(false)

  const Mark = MARKS[kind] || SenseMark
  if (process.env.NODE_ENV !== 'production' && !MARKS[kind]) {
    console.warn(
      `[CaseStudy.Phase] Unknown kind "${kind}". ` +
      `Falling back to SenseMark. Valid: ${Object.keys(MARKS).join(', ')}.`
    )
  }

  useGSAP(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    let split

    /* Trigger mark draw + question reveal when phase enters.
       'top 80%' fires earlier than the previous 'top 70%' so the next
       phase's mark begins drawing on while the previous phase's mark is
       still mid-fade — no empty-rail moment between phases. */
    const enter = ScrollTrigger.create({
      trigger: phaseRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        setMarkAnimate(true)

        split = SplitText.create(questionRef.current, {
          type: 'chars', mask: 'chars',
          onSplit(self) {
            const perChar = 0.06
            const duration = Math.max(1.2, self.chars.length * perChar)
            return gsap.from(self.chars, {
              yPercent: 100, duration, stagger: 0.025, ease: EASE.inOut,
            })
          },
        })
      },
    })

    /* Evidence batch reveal — captures every [data-evidence] descendant
       (Artifact, Quote, DataNote, Insight, Framework, LiveLink, PhaseBeat). */
    let evidenceBatch
    if (evidenceRef.current) {
      evidenceBatch = ScrollTrigger.batch(
        evidenceRef.current.querySelectorAll('[data-evidence]'),
        {
          start: 'top 85%',
          onEnter: (els) => gsap.from(els, {
            autoAlpha: 0, y: 20, duration: 0.7, stagger: 0.12, ease: EASE.inOut,
          }),
        }
      )
    }

    /* Takeaway: final landing, slightly slower for emphasis */
    const takeawayTween = ScrollTrigger.create({
      trigger: takeawayRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from(takeawayRef.current, {
          autoAlpha: 0, y: 16, duration: 1.0, ease: EASE.inOut,
        })
      },
    })

    /* Mark scale scrub: glyph enters at column-width (presence), then
       gracefully scrubs down to icon size as the reader moves into evidence.
       transformOrigin top-left so the mark settles toward the column's
       reading-edge anchor — like a chapter glyph reducing to a marginal note.
       Disabled on mobile (column stacks; mark stays at fixed inline size). */
    let scaleScrub
    const isNarrow = window.matchMedia('(max-width: 900px)').matches
    if (!isNarrow && markIconRef.current) {
      scaleScrub = ScrollTrigger.create({
        trigger: phaseRef.current,
        start: 'top 50%',
        end: 'top 10%',
        scrub: true,
        animation: gsap.fromTo(
          markIconRef.current,
          { scale: 1, transformOrigin: 'top left' },
          { scale: 0.25, ease: 'none' }
        ),
      })
    }

    /* Baton: fade mark out as user leaves the phase, overlapping with
       the next phase's mark draw-on (which fires at top 80%). */
    const exit = ScrollTrigger.create({
      trigger: phaseRef.current,
      start: 'bottom 60%',
      end: 'bottom 30%',
      scrub: true,
      animation: gsap.to(markRef.current, { autoAlpha: 0, ease: EASE.inOut }),
    })

    return () => {
      enter.kill()
      if (evidenceBatch) evidenceBatch.forEach(t => t.kill())
      takeawayTween.kill()
      if (scaleScrub) scaleScrub.kill()
      exit.kill()
      if (split && typeof split.revert === 'function') split.revert()
    }
  }, { scope: phaseRef })

  return (
    <section ref={phaseRef} data-phase={kind} className={styles.phase}>
      <div className={styles.inner}>
        <div ref={markRef} className={styles.markAnchor} aria-hidden="true">
          <div ref={markIconRef} className={styles.markIcon}>
            <Mark animate={markAnimate} />
          </div>
          {number && (
            <div className={styles.numberPlate}>
              <span className={styles.number}>{number}</span>
              <span className={styles.numberLabel}>{label || kind}</span>
            </div>
          )}
        </div>
        <div className={styles.content}>
          <header className={styles.header}>
            <span className={styles.phaseTag}>{label || kind}</span>
            <h2 ref={questionRef} className={styles.question}>{question}</h2>
          </header>
          <div ref={evidenceRef} className={styles.evidence}>
            {children}
          </div>
          <p ref={takeawayRef} className={styles.takeaway}>{takeaway}</p>
          {contribution && (
            <p className={styles.contribution}>
              <span className={styles.contributionLabel}>Strongest contribution</span>
              <span className={styles.contributionBody}>{contribution}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
