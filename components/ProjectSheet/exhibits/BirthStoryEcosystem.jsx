'use client'

import styles from './BirthStoryEcosystem.module.css'

/* THE BIRTH STORY ECOSYSTEM, as four key screens (FS313, replacing the
   FS311 timeline): her real screens side by side on the identity
   gradient, each annotated beneath with a dotted leader, the deck idiom
   the case study uses.

   Each annotation says who the feature serves and when, then one line.
   Both come from her thesis (BIRTHSTORY-interview.md, 2026-08-03),
   trimmed: “The documentation is a great tool for a partner or loved one
   to keep track of events and details leading up to, during, and just
   after the birth … the care pod a central feature DURING birth and
   perhaps for sending easy updates in the newborn phase … The reflection
   questions are useful AFTER the birth and center on the birth parent's
   experience in a private safe space … the ultimate outcome is a book
   they can curate to mark this moment and what they choose to carry
   forward.” Search is left out: a utility, and her least favorite (Q11). */

const SCREENS = [
  {
    key: 'doc', name: 'Documentation', who: 'Shared · during the birth',
    text: 'A partner or loved one keeps track of events and details, leading up to, during, and just after.',
    src: '/images/birthstory/bs-doc-medical.png',
    alt: 'The notes timeline with a medical entry opened: an ibuprofen prescription and a voice memo.',
  },
  {
    key: 'pod', name: 'Care Pod', who: 'Shared · the birth and the newborn weeks',
    text: 'Easy updates out to the circle, and their replies saved into the story.',
    src: '/images/birthstory/bs-carepod.png',
    alt: 'The Care Pod: loved ones in a circle around the parent, with a Send Update button.',
  },
  {
    key: 'reflect', name: 'Reflection', who: 'Private · after the birth',
    text: 'Prompts that center the birth parent’s experience, in a private, safe space.',
    src: '/images/birthstory/bs-reflect-card.png',
    alt: 'A reflection prompt card dealt in the journal, above a new entry.',
  },
  {
    key: 'book', name: 'The Book', who: 'Shared · in the end',
    text: 'Curated to mark this moment and what they choose to carry forward.',
    src: '/images/birthstory/bs-book-order.png',
    alt: 'The Birth Story Book: order a printed keepsake or download a free PDF.',
  },
]

export default function BirthStoryEcosystem() {
  return (
    <figure className={styles.eco}>
      <ol className={styles.screens}>
        {SCREENS.map((s) => (
          <li key={s.key} className={styles.item} data-private={s.who.startsWith('Private') || undefined}>
            <div className={styles.stage}>
              <span className={styles.phone}>
                <span className={styles.notch} aria-hidden="true" />
                <span className={styles.screen}>
                  <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
                </span>
              </span>
            </div>
            <span className={styles.leader} aria-hidden="true" />
            <div className={styles.note}>
              <h4 className={styles.name}>{s.name}</h4>
              <p className={styles.who}>{s.who}</p>
              <p className={styles.text}>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
