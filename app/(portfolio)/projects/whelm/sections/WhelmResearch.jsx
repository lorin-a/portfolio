'use client'

import gsap from 'gsap'

import { StickySection } from '../components/StickySection'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 9b — The Root. (Figma 255:677)

   Cream "page" with a dark-inset middle row. Heading top-left:
   "What is at the root?". Below, a 2×4 grid of citation cards
   crediting the lineage of practices Whelm draws from. The middle
   row inverts (dark bg, cream text) so the eight cards split into
   two registers — primary modalities (top, more space) and named
   protocols (bottom, lighter rendering).

   Body copy is short by design — the cards read as a citation
   index, not an essay. */

const EYEBROW = 'The Root'
const HEADING = 'What is at the root?'

/* Modalities verbatim from Figma 255:677. Where the Figma shows
   "Short description of X" as a placeholder, I've left a
   [LORIN TO WRITE] marker. IFS body is the one Figma carries
   in full. */
const MODALITIES = [
  {
    id: 'ifs',
    name: 'Internal Family Systems (IFS)',
    body:
      'Richard Schwartz’s work on “no bad parts” and understanding the roles and responsibilities of the parts that show up to protect us in moments of difficulty.',
    inverse: true,
  },
  {
    id: 'cbt',
    name: 'Cognitive Behavioral Therapy (CBT)',
    body: '[LORIN TO WRITE: short description of CBT]',
    inverse: true,
  },
  {
    id: 'dbt',
    name: 'Dialectic Behavioral Therapy (DBT)',
    body: '[LORIN TO WRITE: short description of DBT]',
    inverse: true,
  },
  {
    id: 'se',
    name: 'Somatic Experiencing (SE)',
    body: '[LORIN TO WRITE: short description of SE]',
    inverse: true,
  },
  {
    id: 'face',
    name: 'Catherine Liggett (F.A.C.E)',
    body: '[LORIN TO WRITE: short description of FACE]',
    inverse: false,
  },
  {
    id: 'rain',
    name: 'Tara Brach (R.A.I.N.)',
    body: '[LORIN TO WRITE: short description of RAIN]',
    inverse: false,
  },
  {
    id: 'wot',
    name: 'Window of Tolerance Theory',
    body: '[LORIN TO WRITE: short description of WoT]',
    inverse: false,
  },
  {
    id: 'polyvagal',
    name: 'Polyvagal Theory',
    body: '[LORIN TO WRITE: short description of PT]',
    inverse: false,
  },
]

export default function WhelmResearch() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.3,
    build(tl, root) {
      const eyebrow = root.querySelector('[data-rt-eyebrow]')
      const heading = root.querySelector('[data-rt-heading]')
      const cards = root.querySelectorAll('[data-rt-card]')

      if (heading) heading.style.setProperty('--reveal', '100%')
      gsap.set(eyebrow, { autoAlpha: 0, y: 8 })
      gsap.set(cards, { autoAlpha: 0, y: 22 })

      if (prefersReducedMotion()) {
        if (heading) heading.style.setProperty('--reveal', '0%')
        gsap.set([eyebrow, ...cards], { autoAlpha: 1, y: 0 })
        return
      }

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, 0)
      tl.to(heading, { '--reveal': '0%', duration: 1.0, ease: 'power2.inOut' }, 0.2)
      tl.to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
          stagger: { each: 0.09, from: 0 },
        },
        0.9,
      )
    },
  })

  return (
    <StickySection
      ref={sectionRef}
      id="research"
      track="long"
      stage="grid"
      stickyClassName={styles.rtSticky}
    >
      <div className={styles.rtInner}>
        <div className={styles.rtHeader}>
          <p className={styles.rtEyebrow} data-rt-eyebrow>{EYEBROW}</p>
          <h2 className={styles.rtHeading}>
            <span className={styles.rtHeadingClip} data-rt-heading>
              {HEADING}
            </span>
          </h2>
        </div>

        <ul className={styles.rtGrid} aria-label="Lineage of practices">
          {MODALITIES.map(m => (
            <li
              key={m.id}
              data-rt-card
              data-inverse={m.inverse ? 'true' : 'false'}
              className={styles.rtCard}
            >
              <h3 className={styles.rtName}>{m.name}</h3>
              <p className={styles.rtNote}>{m.body}</p>
            </li>
          ))}
        </ul>

        <p className={styles.rtDisclaim}>
          A personal project rooted in established practice, not clinical care.
        </p>
      </div>
    </StickySection>
  )
}
