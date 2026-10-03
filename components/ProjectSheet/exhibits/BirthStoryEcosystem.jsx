'use client'

import styles from './BirthStoryEcosystem.module.css'

/* THE BIRTH STORY ECOSYSTEM (FS311): her thesis, drawn.

   “Birth is both an individual and shared experience and … the two are
   intertwined when it comes to processing, documenting, and reflecting on
   the experience” (BIRTHSTORY-interview.md, the thesis, 2026-08-03). The
   same note places every feature in time and says who it is for, so the
   exhibit is a timeline in two lanes: what is shared with loved ones above
   the line, what stays private to the birth parent below it. Search runs
   under all of it. Each stop carries her real screen.

   The `when` and `text` lines are her thesis, trimmed; Search's line is the
   live case study's annotation. Order follows time, left to right; on a
   phone it becomes one vertical line with the lane named on each stop. */

const STOPS = [
  {
    key: 'doc', lane: 'shared', name: 'Documentation',
    when: 'Leading up to, during, and just after',
    text: 'A tool for a partner or loved one to keep track of events and details.',
    src: '/images/birthstory/bs-doc-note.png',
    alt: 'The notes timeline with a new entry open.',
  },
  {
    key: 'pod', lane: 'shared', name: 'Care Pod',
    when: 'During the birth and the newborn weeks',
    text: 'Easy updates out to the circle, and their replies saved into the story.',
    src: '/images/birthstory/bs-carepod.png',
    alt: 'The Care Pod circle around the parent.',
  },
  {
    key: 'reflect', lane: 'private', name: 'Reflection',
    when: 'After the birth',
    text: 'Centered on the birth parent’s experience, in a private, safe space.',
    src: '/images/birthstory/bs-reflect-card.png',
    alt: 'A reflection prompt card in the journal.',
  },
  {
    key: 'book', lane: 'shared', name: 'The Book',
    when: 'In the end',
    text: 'Curated to mark this moment and what they choose to carry forward.',
    src: '/images/birthstory/bs-book-order.png',
    alt: 'The Birth Story Book: order a keepsake or download a PDF.',
  },
]

function Stop({ s, i }) {
  return (
    <li className={styles.stop} data-lane={s.lane} style={{ '--col': i + 1 }}>
      <span className={styles.dot} aria-hidden="true" />
      <div className={styles.card}>
        <span className={styles.phone}>
          <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
        </span>
        <div className={styles.words}>
          <span className={styles.lane}>{s.lane === 'shared' ? 'Shared' : 'Private'}</span>
          <h4 className={styles.name}>{s.name}</h4>
          <p className={styles.when}>{s.when}</p>
          <p className={styles.text}>{s.text}</p>
        </div>
      </div>
    </li>
  )
}

export default function BirthStoryEcosystem() {
  return (
    <figure className={styles.eco}>
      <figcaption className={styles.srOnly}>
        The Birth Story ecosystem over time. Shared with loved ones: Documentation, leading up to,
        during, and just after the birth; Care Pod, during the birth and the newborn weeks; and the
        Book, in the end. Private to the birth parent: Reflection, after the birth. Search runs
        through all of it.
      </figcaption>

      <div className={styles.board}>
        <span className={`${styles.laneLabel} ${styles.laneShared}`} aria-hidden="true">Shared with loved ones</span>
        <span className={`${styles.laneLabel} ${styles.lanePrivate}`} aria-hidden="true">Private to the birth parent</span>
        <span className={styles.axis} aria-hidden="true" />
        <ol className={styles.stops}>
          {STOPS.map((s, i) => <Stop key={s.key} s={s} i={i} />)}
        </ol>
      </div>

      <div className={styles.search}>
        <span className={styles.searchName}>Search</span>
        <span className={styles.searchText}>Runs through all of it: a swipe from anywhere, so brain fog never means digging for one memory.</span>
      </div>
    </figure>
  )
}
