'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 8 — The Framework.

   Combines Lorin's two Figma frames into a single sticky beat:

     Phase A (slide 255:691, "staircase"):
       Pills cascade in stepped, each successive pill offset lower
       than the last. Body below shows the Purpose paragraph for each
       step — the "why" of that move in the ritual.

     Phase B (slide 255:721, "row"):
       Pills slide up into a single horizontal row. Purpose
       crossfades out, Activity + Outcome detail fades in. Phase bar
       wipes across the foot.

   The motion argues: "this is a sequence" (cascade) → "this is the
   whole map at once" (row). Same data, two ways of reading it.

   All copy verbatim from Whelm_Copy_Site_Flow.md. */

const STEPS = [
  {
    id: 'arrive',
    title: 'Arrive',
    rubric: 'Come Home to Yourself + Establish Capacity',
    purpose:
      'Nervous system regulation must precede cognitive processing. Connecting with the body begins the conversation with yourself.',
    activity:
      'Breathwork to settle the nervous system. A capacity check-in and personal commitment before beginning.',
    outcome:
      'A grounded starting point with a clear sense of how much you have to work with today.',
    pillBg: 'var(--whelm-bg)',
    pillText: 'var(--whelm-bg-cream)',
    phaseTextLight: true,
  },
  {
    id: 'sense',
    title: 'Sense',
    rubric: 'Scan for Sensations + Practice Witnessing',
    purpose:
      'Awareness precedes understanding. Sensation is the language the body speaks before words are available.',
    activity:
      'Locate the overwhelm in the body and express it through color, texture, and movement.',
    outcome:
      'A snapshot of how the overwhelm feels right now; in the body, not just the mind.',
    pillBg: 'var(--whelm-plum)',
    pillText: 'var(--whelm-bg-cream)',
    phaseTextLight: true,
  },
  {
    id: 'release',
    title: 'Release',
    rubric: 'Release the Stories + Reveal What Remains',
    purpose:
      'Spiraling stories are stuck inside the mind. Releasing them into something tangible makes them observable and approachable.',
    activity:
      'A free-form brain dump releases the stories. A filter identifies which words carry the most emotional weight.',
    outcome:
      'A distilled portrait of what actually needs attention beneath the noise.',
    pillBg: 'var(--whelm-orchid)',
    pillText: 'var(--whelm-bg-cream)',
    phaseTextLight: true,
  },
  {
    id: 'untangle',
    title: 'Untangle',
    rubric: 'Trace the Thread + Find Feelings Beneath',
    purpose:
      'Words are windows into internal beliefs. The language we reach for offers a view into what lies beneath the story.',
    activity:
      'Charged words are isolated one at a time. Self-inquiry questions explore the beliefs and expectations underneath.',
    outcome:
      'The one feeling that most needs your attention right now.',
    pillBg: 'var(--whelm-mauve)',
    pillText: 'var(--whelm-bg)',
    phaseTextLight: false,
  },
  {
    id: 'integrate',
    title: 'Integrate',
    rubric: 'Return to Context + Expand Resilience',
    purpose:
      'This is not about fixing or resolution, this is about learning to tolerate and honor complexity. Repeatedly meeting yourself with care is a lifelong journey.',
    activity:
      'Guided reflection names patterns and builds personal artifacts (a dopamine menu, values list, and key insights).',
    outcome:
      'A deeper understanding and a living record of the relationship you are building with yourself.',
    pillBg: 'rgba(189, 183, 233, 0.6)',
    pillText: 'var(--whelm-bg)',
    phaseTextLight: false,
  },
]

/* Per-step staircase y offset in px. Phase A starts each pill at
   index * STAIR_STEP below the row baseline. Phase B animates them
   all back to y=0. */
const STAIR_STEP = 44

export default function WhelmFramework() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.3,
    build(tl, root) {
      const eyebrow = root.querySelector('[data-fw-eyebrow]')
      const pills = root.querySelectorAll('[data-fw-pill]')
      const purposes = root.querySelectorAll('[data-fw-purpose]')
      const details = root.querySelectorAll('[data-fw-detail]')
      const phaseBar = root.querySelector('[data-fw-phasebar]')
      const phaseCells = root.querySelectorAll('[data-fw-phase]')

      // Initial state — pills hidden, staircase y offsets set per
      // index, purposes hidden, details hidden, phase bar collapsed.
      pills.forEach((p, i) => {
        gsap.set(p, {
          autoAlpha: 0,
          y: i * STAIR_STEP + 16,
          scale: 0.94,
        })
      })
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(purposes, { autoAlpha: 0, y: 18 })
      gsap.set(details, { autoAlpha: 0, y: 12 })
      gsap.set(phaseBar, { scaleX: 0, transformOrigin: '0% 50%' })
      gsap.set(phaseCells, { autoAlpha: 0 })

      if (prefersReducedMotion()) {
        // Resolved state — row layout, details visible, phase bar full.
        gsap.set(pills, { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set(purposes, { autoAlpha: 0 })
        gsap.set(details, { autoAlpha: 1, y: 0 })
        gsap.set(eyebrow, { autoAlpha: 1, y: 0 })
        gsap.set(phaseBar, { scaleX: 1 })
        gsap.set(phaseCells, { autoAlpha: 1 })
        return
      }

      // ─── Phase A — Staircase intro ─────────────────────────────
      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)

      // Pills cascade in at their staircase y positions.
      pills.forEach((p, i) => {
        tl.to(
          p,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          0.35 + i * 0.14,
        )
      })

      // Purpose copy lifts in under each pill, staggered with pills.
      tl.to(
        purposes,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.14,
        },
        0.85,
      )

      // Hold so the staircase reads — half a beat to take it in.
      const holdEnd = 2.6

      // ─── Phase B — Transition to row, reveal detail ───────────
      tl.to(
        pills,
        {
          y: 0,
          duration: 1.0,
          ease: 'power3.inOut',
          stagger: { each: 0.05, from: 'end' },
        },
        holdEnd,
      )

      tl.to(
        purposes,
        {
          autoAlpha: 0,
          y: -8,
          duration: 0.6,
          ease: 'power2.in',
        },
        holdEnd,
      )

      tl.to(
        details,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.08,
        },
        holdEnd + 0.6,
      )

      tl.to(
        phaseBar,
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
        holdEnd + 0.5,
      )

      tl.to(
        phaseCells,
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.05,
        },
        holdEnd + 0.9,
      )
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="framework"
      track="long"
      stage="grid"
      stickyClassName={styles.fwSticky}
    >
      <div className={styles.fwInner}>
        <p className={styles.fwEyebrow} data-fw-eyebrow>
          The Framework
        </p>

        <p className={styles.srOnly}>
          {STEPS.map(s =>
            `${s.title}. ${s.rubric}. ${s.purpose} Activity: ${s.activity} Outcome: ${s.outcome}`,
          ).join(' ')}
        </p>

        <div className={styles.fwGrid} aria-hidden="true">
          {STEPS.map(s => (
            <article key={s.id} className={styles.fwCol}>
              <div
                className={styles.fwPill}
                data-fw-pill
                style={{ background: s.pillBg, color: s.pillText }}
              >
                {s.title}
              </div>

              <p className={styles.fwRubric}>{s.rubric}</p>

              {/* Phase A body — purpose paragraph */}
              <p
                className={styles.fwPurpose}
                data-fw-purpose
              >
                {s.purpose}
              </p>

              {/* Phase B body — activity + outcome detail */}
              <div className={styles.fwDetail} data-fw-detail>
                <p>
                  <strong className={styles.fwLabel}>Activity:</strong>{' '}
                  {s.activity}
                </p>
                <p>
                  <strong className={styles.fwLabel}>Outcome:</strong>{' '}
                  {s.outcome}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.fwPhaseBarWrap}>
          <div className={styles.fwPhaseBar} data-fw-phasebar aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                data-fw-phase
                className={styles.fwPhaseCell}
                style={{
                  background: s.pillBg,
                  color: s.phaseTextLight
                    ? 'var(--whelm-bg-cream)'
                    : 'var(--whelm-bg)',
                }}
              >
                Phase {i + 1}
              </span>
            ))}
          </div>
        </div>
      </div>
    </StickySection>
  )
}
