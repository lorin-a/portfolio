'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from './GroundswellProcess.module.css'

/* ============================================================================
   Groundswell — case-study LIGHT chapter (process / first-person).
   The page-scale heartbeat: the dark mega-hero (the SYSTEM / product) releases
   into this LIGHT field (HER role / story / process). Dark → light = the turn
   from product to person. Structure follows the V2 Sense → Weave → Shape spine,
   which the palette already encodes (sage · plum · terracotta on cream).

   Motion = the project standard: paused timeline + IntersectionObserver play-once.
   NO scrub here (scrub belongs to the mega-hero only). Text-first reveal.

   VOICE: every narrative line is a [LORIN TO WRITE] prompt. Nothing here is her
   words yet — the kickers (Sense/Weave/Shape) are the framework labels, not voice.
   ============================================================================ */

/* Sense → Weave → Shape. Accent per the V2 palette (globals.css).
   headingPlaceholder = a SHORT bracketed stand-in at real heading length so the
   layout + reveal read true. The full writing brief lives in `guide` (rendered
   small, under the body) so the scaffold stays legible without a wall of huge type.
   All of it is scaffolding, not her voice. */
const BEATS = [
  {
    id: 'sense',
    kicker: 'Sense',
    accent: 'var(--color-sage)',
    headingPlaceholder: '[Sense: how you came to understand the problem]',
    bodyPlaceholder: '[Sense body: the research move, first person.]',
    guide:
      'LORIN TO WRITE — Sense, first person. Heading: one line on how you came to understand the problem (caregiver burnout on the oncology floor) framed as YOUR entry, not the abstract problem. Body (2–3 sentences): who you listened to, the method (shadowing, interviews, the 15-week course), and the insight that made co-design the answer.',
    evidence: 'Evidence: research artifact (affinity map / interview moment / shadowing photo). Art-free per the license hold.',
  },
  {
    id: 'weave',
    kicker: 'Weave',
    accent: 'var(--color-plum)',
    headingPlaceholder: '[Weave: bringing caregivers into designing care]',
    bodyPlaceholder: '[Weave body: the synthesis and co-design, first person.]',
    guide:
      'LORIN TO WRITE — Weave, first person. Heading: one line on bringing caregivers into designing their own care (the hero question answered in practice). Body (2–3 sentences): workshops, the moments that mattered, how patterns became the four interventions (CTB Email · Pod · Art Wall · Reflection Cards). Show the weaving, not a deliverable list.',
    evidence: 'Evidence: synthesis / co-design session (workshop worksheet, system diagram, persona session). Art-free.',
  },
  {
    id: 'shape',
    kicker: 'Shape',
    accent: 'var(--color-terracotta)',
    headingPlaceholder: '[Shape: the system made real on the floor]',
    bodyPlaceholder: '[Shape body: building, installing, the pilot, first person.]',
    guide:
      'LORIN TO WRITE — Shape, first person. Heading: one line on how the system took physical form where care happens. Body (2–3 sentences): prototyping, building, installing at Magee, the pilot, and what changed for the people who give care. Land on the outcome that earns the dark hero’s claim.',
    evidence: 'Evidence: the work in use (pod interior, wall in context, cards in hand, pilot moment). Kevin Lorenzi photography; Carolyn Gavin artwork credited inline.',
  },
]

export default function GroundswellProcess() {
  const rootRef = useRef(null)
  const openerRef = useRef(null)
  const beatRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observers = []
    const ctx = gsap.context(() => {
      // ── chapter opener (the reframe: system → her) ──
      const op = openerRef.current
      if (op) {
        const oKick = op.querySelector('[data-kicker]')
        const oHead = op.querySelector('[data-heading]')
        const oBody = op.querySelector('[data-body]')
        gsap.set(oKick, { autoAlpha: 0, y: 14 })
        gsap.set(oHead, { clipPath: 'inset(0 0 100% 0)', y: 20 })
        gsap.set(oBody, { autoAlpha: 0, y: 18 })

        const oTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        oTl
          .to(oKick, { autoAlpha: 1, y: 0, duration: 0.6 }, 0)
          .to(oHead, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.0,
            onComplete: () => gsap.set(oHead, { clipPath: 'none' }) }, 0.15)
          .to(oBody, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)

        const oObs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { oTl.play(); oObs.disconnect() }
        }, { threshold: 0.4 })
        oObs.observe(op)
        observers.push(oObs)
      }

      // ── Sense / Weave / Shape — same primitive, play once on entry ──
      beatRefs.current.filter(Boolean).forEach((section) => {
        const kick = section.querySelector('[data-kicker]')
        const head = section.querySelector('[data-heading]')
        const body = section.querySelector('[data-body]')
        const rule = section.querySelector('[data-rule]')
        const ev = section.querySelector('[data-evidence]')

        gsap.set(kick, { autoAlpha: 0, y: 14 })
        gsap.set(rule, { scaleX: 0, transformOrigin: '0% 50%' })
        gsap.set(head, { clipPath: 'inset(0 0 100% 0)', y: 22 })
        gsap.set(body, { autoAlpha: 0, y: 20 })
        gsap.set(ev, { autoAlpha: 0, y: 28 })

        const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        tl
          .to(kick, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
          .to(rule, { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0.1)
          .to(head, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 1.0,
            onComplete: () => gsap.set(head, { clipPath: 'none' }) }, 0.25)
          .to(body, { autoAlpha: 1, y: 0, duration: 0.75 }, 0.6)
          .to(ev, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.85)

        const obs = new IntersectionObserver(([e]) => {
          if (e.isIntersecting) { tl.play(); obs.disconnect() }
        }, { threshold: 0.35 })
        obs.observe(section)
        observers.push(obs)
      })
    }, rootRef)

    return () => { observers.forEach((o) => o.disconnect()); ctx.revert() }
  }, [])

  return (
    <div className={styles.root} ref={rootRef}>
      {/* ── dark → light bridge + first-person reframe opener ── */}
      <section className={styles.opener} ref={openerRef}>
        <div className={styles.openerInner}>
          <span className={styles.openerKicker} data-kicker>The process</span>
          <h2 className={styles.openerHeading} data-heading>
            [The reframe line: <em>your</em> first-person turn]
          </h2>
          <p className={styles.openerBody} data-body>
            [Opener standfirst: your role and the throughline, first person.]
          </p>
          <p className={styles.openerGuide}>
            LORIN TO WRITE — the heartbeat turn from SYSTEM to YOU. The hero showed
            the connected system; this opens the story of how it came to be, in your
            hands. Suggested heading echo of the hero question, take or replace:
            “How did a floor of exhausted caregivers end up designing their own care?”
            Italic emphasis is form, not colour.
          </p>
        </div>
      </section>

      {/* ── Sense → Weave → Shape spine ── */}
      {BEATS.map((b, i) => (
        <section
          key={b.id}
          id={b.id}
          ref={(el) => (beatRefs.current[i] = el)}
          className={styles.beat}
          style={{ '--beat-accent': b.accent }}
        >
          <div className={styles.beatInner}>
            <div className={styles.beatHead}>
              <span className={styles.kicker} data-kicker>
                {b.kicker}
                <span className={styles.kickerRule} data-rule aria-hidden="true" />
              </span>
              <h2 className={styles.heading} data-heading>{b.headingPlaceholder}</h2>
              <p className={styles.body} data-body>{b.bodyPlaceholder}</p>
              <p className={styles.guide}>{b.guide}</p>
            </div>
            <figure className={styles.evidence} data-evidence>
              <span className={styles.evidenceLabel}>{b.evidence}</span>
            </figure>
          </div>
        </section>
      ))}
    </div>
  )
}
