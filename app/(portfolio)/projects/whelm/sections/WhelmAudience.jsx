'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 4 — The Audience.

   Two anchored beats inside one wrapper:

     A. "Whelm is for All" — declarative intro. Display heading wipes in,
        four "who…" clauses stagger-lift. Single column, generous breath.

     B. Concentric rings — four nested circles tangent at the top, fanning
        downward like Russian dolls. The geometry is the argument: each
        layer contains the one before it. As the timeline advances, one
        ring at a time fills, its primary label brightens, and the matching
        persona description lifts in. Previous beat dims to a ghost stroke
        so the diagram reads as one composition over time, not four.

   Copy is verbatim from the deck (slides 371, 373, 372, 374, 633). No
   paraphrase. */

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
    body: 'Highly sensitive with strong sensory processing. Deeply attuned to environments, moods, and energy shifts. Rich inner world and vivid imagination.',
  },
  {
    id: 'approval',
    primary: 'Approval Seeking',
    body: 'Naturally picks up cues about their social role and takes on responsibility for maintaining harmony. Conflict and tension are dysregulating. Carries an outsized sense of responsibility for outcomes.',
  },
  {
    id: 'performing',
    primary: 'Over Performing',
    body: 'Extends beyond personal limits to be a good friend, coworker, child, parent, citizen, sibling. Follows internalized “rules” for what it means to do things “the right way.”',
  },
  {
    id: 'overstim',
    primary: 'Overstimulated',
    body: 'Easily impacted by smells, sounds, energy shifts, complex mental models. Gets activated or shut down when stimulated beyond a certain threshold.',
  },
]

/* Ring geometry — all rings tangent at top y=0, growing downward.
   Radii chosen so successive rings step out by ~78–84 units, matching
   the slide's progression. ViewBox 800×800 gives breathing room around
   the widest ring (r=380, diameter=760). */
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
      <AudienceRings />
    </>
  )
}

/* ─── A. Whelm is for All ─────────────────────────────────────────── */

function AudienceIntro() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      const heading = root.querySelector('[data-audience-heading]')
      const bullets = root.querySelectorAll('[data-audience-bullet]')
      const eyebrow = root.querySelector('[data-audience-eyebrow]')

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(bullets, { autoAlpha: 0, y: 18 })
      if (eyebrow) gsap.set(eyebrow, { autoAlpha: 0, y: 8 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set(bullets, { autoAlpha: 1, y: 0 })
        if (eyebrow) gsap.set(eyebrow, { autoAlpha: 1, y: 0 })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.1, ease: 'power2.inOut' }, 0.2)
      tl.to(bullets, {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: 'power2.out',
        stagger: 0.18,
      }, 0.95)
    },
  })

  return (
    <StickySection ref={sectionRef} id="audience" track="medium" stage="grid">
      <div className={styles.audienceIntroSticky}>
        <p className={styles.audienceEyebrow} data-audience-eyebrow>
          The Audience
        </p>

        <h2 className={styles.audienceIntroHeading}>
          <span
            className={styles.audienceIntroHeadingClip}
            data-audience-heading
          >
            Whelm is for All
          </span>
        </h2>

        <ul className={styles.audienceIntroList}>
          {INTRO_BULLETS.map((line, i) => (
            <li
              key={i}
              data-audience-bullet
              className={styles.audienceIntroBullet}
            >
              {line}
            </li>
          ))}
        </ul>
      </div>
    </StickySection>
  )
}

/* ─── B. Concentric rings + persona cycle ─────────────────────────── */

function AudienceRings() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.4,
    build(tl, root) {
      const ring = id => root.querySelector(`[data-ring="${id}"]`)
      const ringLabel = id => root.querySelector(`[data-ring-label="${id}"]`)
      const beats = root.querySelectorAll('[data-persona-beat]')

      // Initial state
      RINGS.forEach(({ id }) => {
        const r = ring(id)
        const lab = ringLabel(id)
        if (r) gsap.set(r, { '--audr-fill': 0, '--audr-stroke': 0.1 })
        if (lab) gsap.set(lab, { autoAlpha: 0 })
      })
      gsap.set(beats, { autoAlpha: 0, y: 16 })

      if (prefersReducedMotion()) {
        // Resolved: all rings labeled, all beats stacked visible. CSS
        // handles the layout switch.
        RINGS.forEach(({ id }) => {
          const r = ring(id)
          const lab = ringLabel(id)
          if (r) gsap.set(r, { '--audr-stroke': 0.55 })
          if (lab) gsap.set(lab, { autoAlpha: 1 })
        })
        gsap.set(beats, { autoAlpha: 1, y: 0 })
        return
      }

      // Stage 1 — rings trace in as faint strokes, smallest first.
      RINGS.forEach(({ id }, i) => {
        tl.to(ring(id), {
          '--audr-stroke': 0.32,
          duration: 0.85,
          ease: 'power2.out',
        }, i * 0.16)
      })

      // Stage 2 — cycle through 4 personas. Each beat: text first, then
      // ring activates. Previous beat fades back to ghost.
      const beatStart = 1.7
      const beatDur = 2.7

      PERSONAS.forEach((p, i) => {
        const t = beatStart + i * beatDur
        const r = ring(p.id)
        const lab = ringLabel(p.id)
        const beat = beats[i]

        // Text first
        tl.to(beat, { autoAlpha: 1, y: 0, duration: 0.95, ease: 'power2.out' }, t)

        // Ring activates: fill + crisp stroke + label
        tl.to(r, {
          '--audr-fill': 1,
          '--audr-stroke': 0.95,
          duration: 0.95,
          ease: 'power2.out',
        }, t + 0.5)
        tl.to(lab, {
          autoAlpha: 1,
          duration: 0.7,
          ease: 'power2.out',
        }, t + 0.6)

        // Previous beat dims, previous ring returns to ghost
        if (i > 0) {
          const prev = PERSONAS[i - 1]
          tl.to(beats[i - 1], {
            autoAlpha: 0,
            y: -10,
            duration: 0.6,
            ease: 'power2.in',
          }, t - 0.1)
          tl.to(ring(prev.id), {
            '--audr-fill': 0,
            '--audr-stroke': 0.42,
            duration: 0.7,
            ease: 'power2.inOut',
          }, t - 0.1)
          tl.to(ringLabel(prev.id), {
            autoAlpha: 0.5,
            duration: 0.55,
            ease: 'power2.inOut',
          }, t - 0.1)
        }
      })
    },
  })

  return (
    <StickySection ref={sectionRef} track="long" stage="grid">
      <div className={styles.audienceRingsSticky}>
        <div className={styles.audienceArt}>
          <svg
            viewBox="0 0 800 800"
            className={styles.audienceSvg}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {/* Render outer-to-inner so smaller rings layer above larger ones. */}
            {[...RINGS].reverse().map(({ id, r }) => (
              <g key={id} data-ring={id} className={styles.audienceRingGroup}>
                <circle
                  cx={CX}
                  cy={r}
                  r={r}
                  className={styles.audienceRingShape}
                />
              </g>
            ))}
          </svg>

          <div className={styles.audienceRingLabels} aria-hidden="true">
            {RINGS.map(({ id, r }) => {
              const persona = PERSONAS.find(p => p.id === id)
              /* Label sits at the centre of each ring. cy = r in the
                 viewBox (top-tangent geometry). Convert to a percentage
                 of the 800-unit viewBox so the label tracks the SVG
                 even at any size. */
              const yPct = (r / 800) * 100
              return (
                <span
                  key={id}
                  data-ring-label={id}
                  data-ring-id={id}
                  className={styles.audienceRingLabel}
                  style={{ top: `${yPct}%` }}
                >
                  {persona.primary}
                </span>
              )
            })}
          </div>
        </div>

        {/* Persona body column. Sr-only fallback above carries the full
            set so screen readers don't depend on the cinematic. */}
        <p className={styles.srOnly}>
          {PERSONAS.map(p => `${p.primary}: ${p.body}`).join(' ')}
        </p>

        <div className={styles.audienceBeats} aria-hidden="true">
          {PERSONAS.map(p => (
            <div key={p.id} data-persona-beat className={styles.audienceBeat}>
              <h3 className={styles.audienceBeatHeading}>{p.primary}</h3>
              <p className={styles.audienceBeatBody}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </StickySection>
  )
}
