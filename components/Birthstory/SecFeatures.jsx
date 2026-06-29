'use client'

import { Section, SectionHead, useSeen, sys } from './kit'
import styles from './SecFeatures.module.css'

/* 06 — The features, annotated in Lorin's deck idiom (5-20400): each one led by
   the INSIGHT that produced it (process), then the screen with dotted-leader
   callouts. The clarity bar — obvious what to take away. */

const FEATURES = [
  {
    id: 'home', name: 'One home',
    insight: 'Feedback had split the app into Document and Reflect — two screens, two decisions. Parents wanted less, so both moved onto one home.',
    screens: [{ src: '/images/birthstory/bs-home.png', alt: 'The Birth Story home: a chronological record of notes and journal entries.' }],
    notes: [
      { side: 'left', label: 'One timeline', text: 'Entries auto-populate a single chronological record — no choosing a mode first.' },
      { side: 'right', label: 'One entry card', text: 'Notes, voice, images and tags live in one place. Capture, then organise later.' },
    ],
  },
  {
    id: 'carepod', name: 'Care Pod',
    insight: 'Parents kept describing the people around them. So the app invited a curated inner circle in — to send live updates, and to receive support back.',
    screens: [
      { src: '/images/birthstory/bs-carepod.png', alt: 'The Care Pod: loved ones orbiting a central heart marked “You”.' },
      { src: '/images/birthstory/bs-messages.png', alt: 'The Care Pod live message board during labor.' },
    ],
    notes: [
      { side: 'left', label: 'Updates', text: 'Pre-selected members get live labor updates in one tap.' },
      { side: 'right', label: 'Message Board', text: 'Real-time support from the people invited in — who can also speak on your behalf.' },
    ],
  },
  {
    id: 'book', name: 'Birth Story Book',
    insight: 'A parent said it would be tragic to lose these moments if the app disappeared. So the record can leave the app entirely.',
    screens: [{ src: '/images/birthstory/evolution/screens/v3-4.png', alt: 'The Birth Story Book screen — order a printed keepsake or export a PDF.' }],
    notes: [
      { side: 'left', label: 'A keepsake', text: 'Curate entries, photos and reflections into a physical Birth Story Book.' },
      { side: 'right', label: 'Yours to keep', text: 'Or export a free PDF — the memory never depends on the app surviving.' },
    ],
  },
]

function Feature({ f }) {
  const [ref, seen] = useSeen(0.25)
  const left = f.notes.filter((n) => n.side === 'left')
  const right = f.notes.filter((n) => n.side === 'right')
  return (
    <figure ref={ref} className={`${styles.panel} ${seen ? sys.in : ''}`}>
      <figcaption className={styles.head}>
        <h3 className={styles.name}>{f.name}</h3>
        <p className={styles.insight}>{f.insight}</p>
      </figcaption>

      <div className={styles.stage}>
        <div className={styles.col}>
          {left.map((n) => (
            <div key={n.label} className={`${styles.annot} ${styles.aLeft}`}>
              <p className={sys.annotLabel}>{n.label}</p>
              <p className={sys.annotText}>{n.text}</p>
              <span className={sys.leader} />
            </div>
          ))}
        </div>

        <div className={styles.phones}>
          {f.screens.map((sc) => (
            <span key={sc.src} className={sys.phone} style={{ width: f.screens.length > 1 ? '140px' : '188px' }}>
              <span className={sys.phoneNotch} aria-hidden="true" />
              <span className={sys.phoneScreen}><img src={sc.src} alt={sc.alt} loading="lazy" draggable="false" /></span>
            </span>
          ))}
        </div>

        <div className={styles.col}>
          {right.map((n) => (
            <div key={n.label} className={`${styles.annot} ${styles.aRight}`}>
              <p className={sys.annotLabel}>{n.label}</p>
              <p className={sys.annotText}>{n.text}</p>
              <span className={sys.leader} />
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

export default function SecFeatures() {
  return (
    <Section id="features" tone="cream">
      <SectionHead
        num="05"
        label="The features"
        headline={<>Each feature is an <em>answer</em> to something we heard.</>}
        takeaway="Read each the way our deck did — the insight first, then the screen it became, annotated."
      />
      <div className={styles.list}>
        {FEATURES.map((f) => <Feature key={f.id} f={f} />)}
      </div>
      <p className={styles.credit}>CMU IXD Studio · Spring 2025 — Lorin Anderberg + Michael Juan</p>
    </Section>
  )
}
