'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 10 — What’s Next.

   The horizon: playtesting, expert review, brand development, and
   eventual public release. A vertical timeline; each milestone’s
   marker fills and label brightens as the timeline plays.

   Copy is placeholder — Lorin to refine. Marked with [LORIN TO WRITE]
   inline where the wording is mine and should be replaced. */

const MILESTONES = [
  {
    id: 'playtest',
    when: 'Now',
    title: 'Playtest the framework',
    body:
      'Walk small groups through the ritual end-to-end. Watch where the language lands, where it slips, where the activities ask too much.',
  },
  {
    id: 'review',
    when: 'Next',
    title: 'Expert review',
    body:
      'Sit with therapists and mental-health practitioners. Pressure-test the framework against clinical grounding without making it clinical.',
  },
  {
    id: 'brand',
    when: 'Soon',
    title: 'Develop the brand',
    body:
      'Move from moodboard to system. Type, palette, drawing language, voice — codified so the app reads like Whelm before a word is read.',
  },
  {
    id: 'build',
    when: 'After',
    title: 'Build the app',
    body:
      'Translate the body map and brain dump into a complete experience. The ritual becomes something you can return to.',
  },
  {
    id: 'release',
    when: 'Eventually',
    title: 'Open it to the world',
    body:
      'Make Whelm available to the people it was designed for. A companion, not a clinic.',
  },
]

export default function WhelmNextSteps() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.3,
    build(tl, root) {
      const eyebrow = root.querySelector('[data-nx-eyebrow]')
      const heading = root.querySelector('[data-nx-heading]')
      const beats = root.querySelectorAll('[data-nx-beat]')

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(beats, { autoAlpha: 0, x: -16 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set([eyebrow, ...beats], { autoAlpha: 1, x: 0, y: 0 })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.1, ease: 'power2.inOut' }, 0.25)
      tl.to(
        beats,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.85,
          ease: 'power2.out',
          stagger: 0.32,
        },
        1.0,
      )
    },
  })

  return (
    <StickySection ref={sectionRef} id="next" track="long" stage="grid">
      <div className={styles.nxSticky}>
        <p className={styles.audienceEyebrow} data-nx-eyebrow>
          What’s Next
        </p>

        <h2 className={styles.audienceIntroHeading}>
          <span className={styles.audienceIntroHeadingClip} data-nx-heading>
            The work from here.
          </span>
        </h2>

        <ol className={styles.nxTimeline} aria-label="Next steps">
          {MILESTONES.map(m => (
            <li key={m.id} data-nx-beat className={styles.nxBeat}>
              <span className={styles.nxMarker} aria-hidden="true" />
              <p className={styles.nxWhen}>{m.when}</p>
              <h3 className={styles.nxTitle}>{m.title}</h3>
              <p className={styles.nxBody}>{m.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </StickySection>
  )
}
