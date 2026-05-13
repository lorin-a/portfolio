'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 6 — The Audience. (Figma 255:371 + 255:372/373/374/633)

   Two beats:

     A. Intro (split layout, Figma 371):
        LEFT cream — eyebrow, "Whelm is for All" display heading, four
        "who…" bullets describing readiness.
        RIGHT dark — all four nested rings visible at once, labeled.
        Static composition with subtle stagger reveals.

     B. Cycle (full dark, Figma 372/373/374/633):
        Four persona beats — each isolates one ring as filled and
        labeled, the others recede to ghost-strokes. A dashed elbow
        leader connects the focused ring to the persona body on the
        right.

   Copy verbatim from the deck. */

const INTRO_BULLETS = [
  'Who are ready to follow their intuition but don’t know how to listen for it.',
  'Who manage their feelings but want to learn how to meet them instead.',
  'Who have done the work but feel like something is still missing.',
  'Who crave both structure and freedom.',
]

const PERSONAS = [
  {
    id: 'attuned',
    primary: 'Deeply Attuned',
    body:
      'Highly sensitive with strong sensory processing. Deeply attuned to environments, moods, and energy shifts. Rich inner world and vivid imagination.',
  },
  {
    id: 'approval',
    primary: 'Approval Seeking',
    body:
      'Naturally picks up cues about their social role and takes on responsibility for maintaining harmony. Conflict and tension are dysregulating. Carries an outsized sense of responsibility for outcomes.',
  },
  {
    id: 'performing',
    primary: 'Over Performing',
    body:
      'Extends beyond personal limits to be a good friend, coworker, child, parent, citizen, sibling. Follows internalized “rules” for what it means to do things “the right way.”',
  },
  {
    id: 'overstim',
    primary: 'Overstimulated',
    body:
      'Easily impacted by smells, sounds, energy shifts, complex mental models. Gets activated or shut down when stimulated beyond a certain threshold.',
  },
]

/* Ring geometry — tangent at top y=0, growing downward. ViewBox
   800×800 gives breathing room around the widest ring. */
const CX = 400
const RINGS = [
  { id: 'attuned',    r: 142 },
  { id: 'approval',   r: 222 },
  { id: 'performing', r: 302 },
  { id: 'overstim',   r: 380 },
]

export default function WhelmAudience() {
  return (
    <>
      <AudienceIntro />
      <AudienceCycle />
    </>
  )
}

/* ─── A. Split intro (Figma 371) ───────────────────────────────────── */

function AudienceIntro() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      const eyebrow = root.querySelector('[data-au-eyebrow]')
      const heading = root.querySelector('[data-au-heading]')
      const bullets = root.querySelectorAll('[data-au-bullet]')
      const rings = root.querySelectorAll('[data-au-intro-ring]')
      const labels = root.querySelectorAll('[data-au-intro-label]')

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(bullets, { autoAlpha: 0, y: 14 })
      gsap.set(rings, { '--au-ring-stroke': 0, '--au-ring-fill': 0 })
      gsap.set(labels, { autoAlpha: 0 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set([eyebrow, ...bullets], { autoAlpha: 1, y: 0 })
        gsap.set(rings, { '--au-ring-stroke': 1, '--au-ring-fill': 1 })
        gsap.set(labels, { autoAlpha: 1 })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.0, ease: 'power2.inOut' }, 0.2)
      tl.to(bullets, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.14 }, 0.85)
      // Rings trace in from smallest to largest, each settling to its
      // distinct slide-source fill.
      rings.forEach((ring, i) => {
        tl.to(
          ring,
          { '--au-ring-stroke': 1, '--au-ring-fill': 1, duration: 0.85, ease: 'power2.out' },
          1.1 + i * 0.18,
        )
        tl.to(labels[i], { autoAlpha: 1, duration: 0.55, ease: 'power2.out' }, 1.35 + i * 0.18)
      })
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="audience"
      track="medium"
      stage="grid"
      stickyClassName={styles.auIntroSticky}
    >
      <div className={styles.auIntroInner}>
        {/* LEFT cream */}
        <div className={styles.auIntroLeft}>
          <p className={styles.auEyebrow} data-au-eyebrow>The Audience</p>
          <h2 className={styles.auIntroHeading}>
            <span className={styles.auIntroHeadingClip} data-au-heading>
              Whelm is for All
            </span>
          </h2>
          <ul className={styles.auIntroBullets}>
            {INTRO_BULLETS.map((line, i) => (
              <li key={i} data-au-bullet className={styles.auIntroBullet}>
                {line}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT dark — all four rings visible, labeled */}
        <div className={styles.auIntroRight}>
          <div className={styles.auIntroArt}>
            <svg
              viewBox="0 0 800 800"
              className={styles.auIntroSvg}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {[...RINGS].reverse().map(({ id, r }) => (
                <g
                  key={id}
                  data-au-intro-ring
                  data-ring={id}
                  className={styles.auIntroRingGroup}
                >
                  <circle
                    cx={CX}
                    cy={r}
                    r={r}
                    className={styles.auIntroRingShape}
                  />
                </g>
              ))}
            </svg>

            <div className={styles.auIntroLabels} aria-hidden="true">
              {RINGS.map(({ id, r }) => {
                const persona = PERSONAS.find(p => p.id === id)
                const yPct = (r / 800) * 100
                return (
                  <span
                    key={id}
                    data-au-intro-label
                    data-ring-id={id}
                    className={styles.auIntroLabel}
                    style={{ top: `${yPct}%` }}
                  >
                    {persona.primary}
                  </span>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </StickySection>
  )
}

/* ─── B. Cycle with focused ring + dashed elbow leader ───────────── */

function AudienceCycle() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      const cycleArt = root.querySelector('[data-au-cycle-art]')
      const ringGroups = root.querySelectorAll('[data-au-cycle-ring]')
      const ringLabels = root.querySelectorAll('[data-au-cycle-ring-label]')
      const beats = root.querySelectorAll('[data-au-beat]')
      const elbow = root.querySelector('[data-au-elbow]')

      // All rings start as faint ghost-stroke. The active ring fills
      // and brightens; non-active recede further so the contrast
      // between focused/unfocused is unmistakable.
      gsap.set(ringGroups, { '--au-fill': 0, '--au-stroke': 0.08 })
      gsap.set(ringLabels, { autoAlpha: 0 })
      gsap.set(beats, { autoAlpha: 0, x: 16 })
      gsap.set(elbow, { autoAlpha: 0 })

      if (prefersReducedMotion()) {
        // Resolved — all personas readable, no cycle.
        gsap.set(ringGroups, { '--au-stroke': 0.55 })
        gsap.set(ringLabels, { autoAlpha: 1 })
        gsap.set(beats, { autoAlpha: 1, x: 0 })
        gsap.set(elbow, { autoAlpha: 0 })
        return
      }

      // Cycle through four personas. Each beat ~1.8s — shortened from
      // the earlier 2.7s/persona that motion-review flagged as brittle
      // on fast scroll. Total ~7.2s.
      const beatStart = 0.4
      const beatDur = 1.8

      PERSONAS.forEach((p, i) => {
        const t = beatStart + i * beatDur
        const ring = root.querySelector(`[data-au-cycle-ring="${p.id}"]`)
        const lab = root.querySelector(`[data-au-cycle-ring-label="${p.id}"]`)
        const beat = beats[i]

        // Text first (body lifts in) — per project convention.
        tl.to(beat, { autoAlpha: 1, x: 0, duration: 0.75, ease: 'power2.out' }, t)

        // Then ring fills + label appears.
        tl.to(ring, {
          '--au-fill': 1,
          '--au-stroke': 0.95,
          duration: 0.8,
          ease: 'power2.out',
        }, t + 0.15)
        tl.to(lab, { autoAlpha: 1, duration: 0.55, ease: 'power2.out' }, t + 0.3)

        // Elbow leader fades in with the first beat and stays — it's
        // a single dashed path that visually rhymes with the Figma's
        // pointer line, not a per-beat redraw.
        if (i === 0) {
          tl.to(elbow, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, t + 0.4)
        }

        // Dim previous beat + ring.
        if (i > 0) {
          const prev = PERSONAS[i - 1]
          const prevRing = root.querySelector(`[data-au-cycle-ring="${prev.id}"]`)
          const prevLab = root.querySelector(`[data-au-cycle-ring-label="${prev.id}"]`)
          tl.to(beats[i - 1], { autoAlpha: 0, x: -10, duration: 0.5, ease: 'power2.in' }, t - 0.05)
          tl.to(prevRing, {
            '--au-fill': 0,
            '--au-stroke': 0.32,
            duration: 0.55,
            ease: 'power2.inOut',
          }, t - 0.05)
          tl.to(prevLab, { autoAlpha: 0, duration: 0.4, ease: 'power2.inOut' }, t - 0.05)
        }
      })
    },
  })

  return (
    <StickySection ref={sectionRef} track="long" stage="grid" stickyClassName={styles.auCycleSticky}>
      <div className={styles.auCycleInner}>
        <div className={styles.auCycleArt} data-au-cycle-art>
          <svg
            viewBox="0 0 800 800"
            className={styles.auIntroSvg}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {[...RINGS].reverse().map(({ id, r }) => (
              <g
                key={id}
                data-au-cycle-ring={id}
                data-ring={id}
                className={styles.auCycleRingGroup}
              >
                <circle cx={CX} cy={r} r={r} className={styles.auCycleRingShape} />
              </g>
            ))}
          </svg>

          <div className={styles.auCycleLabels} aria-hidden="true">
            {RINGS.map(({ id, r }) => {
              const persona = PERSONAS.find(p => p.id === id)
              const yPct = (r / 800) * 100
              return (
                <span
                  key={id}
                  data-au-cycle-ring-label={id}
                  data-ring-id={id}
                  className={styles.auCycleRingLabel}
                  style={{ top: `${yPct}%` }}
                >
                  {persona.primary}
                </span>
              )
            })}
          </div>
        </div>

        {/* Dashed elbow leader — SVG positioned in the gap between art
            and body, points right toward the active beat. */}
        <svg
          className={styles.auElbow}
          viewBox="0 0 120 200"
          preserveAspectRatio="none"
          aria-hidden="true"
          data-au-elbow
        >
          <path
            d="M 0 100 L 60 100 L 60 180 L 110 180"
            fill="none"
            stroke="var(--whelm-mauve)"
            strokeWidth="1.4"
            strokeDasharray="6 5"
          />
          <path
            d="M 104 174 L 110 180 L 104 186"
            fill="none"
            stroke="var(--whelm-mauve)"
            strokeWidth="1.4"
          />
        </svg>

        {/* Sr-only full persona set. */}
        <p className={styles.srOnly}>
          {PERSONAS.map(p => `${p.primary}: ${p.body}`).join(' ')}
        </p>

        <div className={styles.auCycleBeats} aria-hidden="true">
          {PERSONAS.map(p => (
            <div key={p.id} data-au-beat className={styles.auCycleBeat}>
              <h3 className={styles.auCycleBeatHeading}>{p.primary}</h3>
              <p className={styles.auCycleBeatBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </StickySection>
  )
}
