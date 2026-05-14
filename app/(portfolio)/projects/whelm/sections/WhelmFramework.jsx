'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import LensClaim, { Accent } from '../components/LensClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import styles from '../whelm.module.css'

/* The Framework — cinematic rebuild (2026-05-14).

   Source was a slide deck: each phase was its own slide with Title,
   Rubric, Purpose, Activity, Outcome. The previous web version flattened
   all five phases into one 5-column brochure, which broke the case
   study's "one idea per frame, breathe, next" rhythm.

   This rebuild restores the slide deck's time dimension: each phase
   gets its own sticky frame with a 4-frame internal arc. A persistent
   row at the foot of every frame shows the ritual assembling — past
   phases filled, current phase active, future phases dim. The reader
   feels the ritual unfold *and* sees the systems map build at the same
   time.

   Composition:
     <FrameworkClaim>     — opening claim (eyebrow + LORIN TO WRITE line)
     <FrameworkPhase × 5> — Arrive, Sense, Release, Untangle, Integrate
     <FrameworkResolved>  — final composed row + phase bar + closing line

   Each FrameworkPhase plays its own paused-on-enter timeline:
     1. Pill rises into center, title clip-wipes in, rubric fades up.
     2. Purpose body lifts in below.
     3. Purpose recedes; Activity replaces it in place.
     4. Outcome lifts in below Activity.
*/

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
  },
  {
    id: 'untangle',
    title: 'Untangle',
    rubric: 'Trace the Thread + Find Feelings Beneath',
    purpose:
      'Words are windows into internal beliefs. The language we reach for offers a view into what lies beneath the story.',
    activity:
      'Charged words are isolated one at a time. Self-inquiry questions explore the beliefs and expectations underneath.',
    outcome: 'The one feeling that most needs your attention right now.',
    pillBg: 'var(--whelm-mauve)',
    pillText: 'var(--whelm-bg)',
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
  },
]

/* PersistentRow — the trail of completed phases at the foot of each
   phase frame. activeIndex says which phase is currently in the
   center stage of its frame; past phases (i < activeIndex) render as
   filled pills, future (i > activeIndex) as dim dots. The active
   slot renders as an outlined-empty cell so the eye knows the spot
   is reserved.

   In <FrameworkResolved>, activeIndex = STEPS.length so all five
   are past/filled, plus the phase bar appears below. */
function PersistentRow({ activeIndex, resolved = false }) {
  return (
    <div className={styles.fwV2Row} aria-hidden="true">
      {STEPS.map((s, i) => {
        const state =
          resolved || i < activeIndex
            ? 'past'
            : i === activeIndex
              ? 'active'
              : 'future'
        return (
          <span
            key={s.id}
            data-state={state}
            className={styles.fwV2RowCell}
            style={
              state === 'past'
                ? { background: s.pillBg, color: s.pillText, borderColor: s.pillBg }
                : undefined
            }
          >
            {state === 'past' ? s.title : null}
            {state === 'future' ? <span className={styles.fwV2RowDot} /> : null}
          </span>
        )
      })}
    </div>
  )
}

function FrameworkClaim() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      if (prefersReducedMotion()) {
        snapClaim(root)
        gsap.set(root.querySelector('[data-fw-eyebrow]'), { autoAlpha: 1, y: 0 })
        return
      }
      const eyebrow = root.querySelector('[data-fw-eyebrow]')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0)
      revealClaim(tl, root, { start: 0.3 })
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="framework"
      track="short"
      stage="grid"
      stickyClassName={styles.fwV2Sticky}
    >
      <div className={styles.fwV2ClaimInner}>
        <p className={styles.fwV2Eyebrow} data-fw-eyebrow>
          The Framework
        </p>
        <LensClaim
          srText="Five movements. One ritual. [LORIN TO WRITE the opening claim for the framework section.]"
          heading={
            <>
              [LORIN TO WRITE] <Accent>opening claim.</Accent>
            </>
          }
          body="[LORIN TO WRITE — one short body line introducing the five-phase ritual.]"
          className={styles.fwV2Claim}
        />
      </div>
    </StickySection>
  )
}

function FrameworkPhase({ index }) {
  const step = STEPS[index]
  // Each rubric has the shape "A + B" — first clause becomes the heading,
  // second clause becomes the accent. Falls back gracefully if no `+`.
  const [headingLead, headingAccent] = step.rubric.includes(' + ')
    ? step.rubric.split(' + ')
    : [step.rubric, null]

  // Solid version of the pill colour for the centre stage — the
  // semi-transparent Integrate fill is for the row treatment only.
  const centerBg =
    step.pillBg === 'rgba(189, 183, 233, 0.6)' ? 'var(--whelm-mauve)' : step.pillBg

  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      const pill = root.querySelector('[data-fw-pill]')
      const heading = root.querySelector('[data-claim-line]')
      const body = root.querySelector('[data-claim-body]')
      const purpose = root.querySelector('[data-fw-purpose]')
      const activity = root.querySelector('[data-fw-activity]')
      const outcome = root.querySelector('[data-fw-outcome]')

      if (prefersReducedMotion()) {
        snapClaim(root)
        gsap.set([pill, purpose, activity, outcome], {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        })
        gsap.set(purpose, { autoAlpha: 0 })
        return
      }

      gsap.set(pill, { autoAlpha: 0, y: 60, scale: 0.94 })
      gsap.set(purpose, { autoAlpha: 0, y: 16 })
      gsap.set(activity, { autoAlpha: 0, y: 16 })
      gsap.set(outcome, { autoAlpha: 0, y: 16 })

      // Beat 1 — pill rises, then the editorial heading wipes in.
      tl.to(pill, { autoAlpha: 1, y: 0, scale: 1, duration: 0.85, ease: 'power3.out' }, 0)
      const claimEnd = revealClaim(tl, root, { start: 0.35 })

      // Beat 2 — purpose lifts in below.
      tl.to(purpose, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, claimEnd)

      // Beat 3 — purpose recedes, activity replaces it in place.
      tl.to(
        purpose,
        { autoAlpha: 0, y: -10, duration: 0.55, ease: 'power2.in' },
        claimEnd + 1.6,
      )
      tl.to(
        activity,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        claimEnd + 1.8,
      )

      // Beat 4 — outcome lifts in beneath activity.
      tl.to(
        outcome,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        claimEnd + 2.6,
      )
    },
    deps: [index],
  })

  return (
    <StickySection
      ref={sectionRef}
      track="medium"
      stage="grid"
      stickyClassName={styles.fwV2Sticky}
      data-fw-phase-id={step.id}
    >
      <p className={styles.srOnly}>
        Phase {index + 1} of {STEPS.length}: {step.title}. {step.rubric}.{' '}
        {step.purpose} Activity: {step.activity} Outcome: {step.outcome}
      </p>

      <div className={styles.fwV2PhaseInner} aria-hidden="true">
        <div className={styles.fwV2PhaseHead}>
          <span className={styles.fwV2PhaseIndex}>
            Phase {index + 1} of {STEPS.length}
          </span>
        </div>

        <div className={styles.fwV2PhaseStage}>
          <div
            className={styles.fwV2PillCenter}
            data-fw-pill
            style={{ background: centerBg, color: step.pillText, borderColor: centerBg }}
          >
            {step.title}
          </div>

          <LensClaim
            srText={`${step.rubric}.`}
            heading={
              headingAccent ? (
                <>
                  {headingLead} <Accent>+ {headingAccent}</Accent>
                </>
              ) : (
                headingLead
              )
            }
            body={
              <span className={styles.fwV2BodySlot}>
                <span className={styles.fwV2Purpose} data-fw-purpose>
                  {step.purpose}
                </span>
                <span className={styles.fwV2Activity} data-fw-activity>
                  <strong className={styles.fwV2Label}>Activity. </strong>
                  {step.activity}
                </span>
              </span>
            }
            className={styles.fwV2PhaseClaim}
          />

          <p className={styles.fwV2Outcome} data-fw-outcome>
            <strong className={styles.fwV2Label}>Outcome. </strong>
            {step.outcome}
          </p>
        </div>

        <div className={styles.fwV2RowFoot}>
          <PersistentRow activeIndex={index} />
        </div>
      </div>
    </StickySection>
  )
}

function FrameworkResolved() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      if (prefersReducedMotion()) {
        snapClaim(root)
        gsap.set(root.querySelector('[data-fw-bar]'), { scaleX: 1 })
        return
      }
      const bar = root.querySelector('[data-fw-bar]')
      gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' })
      revealClaim(tl, root, { start: 0 })
      tl.to(bar, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0.8)
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      track="short"
      stage="grid"
      stickyClassName={styles.fwV2Sticky}
    >
      <div className={styles.fwV2ResolvedInner}>
        <LensClaim
          srText="The whole ritual. [LORIN TO WRITE the closing claim for the framework section.]"
          heading={
            <>
              [LORIN TO WRITE] <Accent>closing line.</Accent>
            </>
          }
          body="[LORIN TO WRITE — one short body line naming what the reader is now looking at.]"
          className={styles.fwV2Claim}
        />

        <PersistentRow activeIndex={STEPS.length} resolved />

        <div className={styles.fwV2BarWrap}>
          <div className={styles.fwV2Bar} data-fw-bar aria-hidden="true">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                className={styles.fwV2BarCell}
                style={{ background: s.pillBg, color: s.pillText }}
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

export default function WhelmFramework() {
  return (
    <>
      <FrameworkClaim />
      {STEPS.map((_, i) => (
        <FrameworkPhase key={STEPS[i].id} index={i} />
      ))}
      <FrameworkResolved />
    </>
  )
}
