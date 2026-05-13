'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 9a — The Experience.

   Showcase of the two user-flow POCs already built in the separate
   Whelm prototype: the body map (Sense) and the brain-dump text
   experience (Release). Each gets a frame with a placeholder for the
   eventual screen recording, and a "try it yourself" link opening
   the live prototype in a new tab.

   Decision: screen recording + external link, not embed. The case
   study controls pacing; the link rewards curiosity. */

const POCS = [
  {
    id: 'bodymap',
    eyebrow: 'Sense',
    title: 'The body map',
    body:
      'A felt-sense activity: locate the overwhelm in the body and express it through color, texture, and movement. Output is a snapshot of how it feels right now, in the body, not just the mind.',
    href: 'https://example.com/whelm-bodymap', // TODO: replace with live prototype URL
    cta: 'Try the body map',
  },
  {
    id: 'braindump',
    eyebrow: 'Release',
    title: 'The brain dump',
    body:
      'A free-form text experience: spill the stories, then a filter surfaces the words carrying the most emotional weight. Output is a distilled portrait of what actually needs attention beneath the noise.',
    href: 'https://example.com/whelm-braindump', // TODO: replace with live prototype URL
    cta: 'Try the brain dump',
  },
]

export default function WhelmExperience() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.3,
    build(tl, root) {
      const eyebrow = root.querySelector('[data-exp-eyebrow]')
      const heading = root.querySelector('[data-exp-heading]')
      const cards = root.querySelectorAll('[data-exp-card]')

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(cards, { autoAlpha: 0, y: 26 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set([eyebrow, ...cards], { autoAlpha: 1, y: 0 })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.1, ease: 'power2.inOut' }, 0.25)
      tl.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.95,
          ease: 'power2.out',
          stagger: 0.28,
        },
        1.0,
      )
    },
  })

  return (
    <StickySection ref={sectionRef} id="experience" track="long" stage="grid">
      <div className={styles.expSticky}>
        <p className={styles.audienceEyebrow} data-exp-eyebrow>
          The Experience
        </p>

        <h2 className={styles.audienceIntroHeading}>
          <span className={styles.audienceIntroHeadingClip} data-exp-heading>
            Two pieces of the ritual, built.
          </span>
        </h2>

        <div className={styles.expGrid}>
          {POCS.map(p => (
            <article key={p.id} data-exp-card className={styles.expCard}>
              <div className={styles.expFrame}>
                <span className={styles.expFramePlaceholder}>
                  Prototype recording
                </span>
              </div>
              <p className={styles.expEyebrow}>{p.eyebrow}</p>
              <h3 className={styles.expTitle}>{p.title}</h3>
              <p className={styles.expBody}>{p.body}</p>
              <a
                className={styles.expLink}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.cta}
                <span aria-hidden="true" className={styles.expLinkArrow}>↗</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </StickySection>
  )
}
