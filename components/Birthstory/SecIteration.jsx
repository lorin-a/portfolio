'use client'

import { Section, SectionHead, Phone, Note, useSeen, sys } from './kit'
import styles from './SecIteration.module.css'

/* 05 — The iteration. The real screens, round by round, in consistent frames;
   the tester feedback that drove each change sits inline beside it. Process
   voice: this is the messy middle — what was tried, what was said, what changed. */

const ROUNDS = [
  {
    id: 'v1', tone: 'blush', tag: 'V1 · Every tool, every path',
    changed: 'Our first wireframes offered every tool we could imagine — a path for every situation.',
    feedback: 'Onboarding is nice, but there are too many buttons and options.',
    who: 'Parent tester',
    screens: [1, 2, 3].map((n) => ({ src: `/images/birthstory/evolution/screens/v1-${n}.png`, alt: `V1 onboarding screen ${n}` })),
  },
  {
    id: 'v2', tone: 'slate', tag: 'V2 · Document + Reflect',
    changed: 'We cut to two verbs and walked people through one menu at a time — and looked hard at the words.',
    feedback: 'Reconsider language — why “reclaim”? Compassionate copy may presume a negative experience.',
    who: 'Parent tester',
    screens: [1, 2, 3].map((n) => ({ src: `/images/birthstory/evolution/screens/v2-${n}.png`, alt: `V2 onboarding screen ${n}` })),
  },
  {
    id: 'v3', tone: 'teal', tag: 'Final · One calm home',
    changed: 'One home, four ways in. Voice notes and the timeline stayed; the rest was let go.',
    feedback: null,
    who: null,
    screens: [
      { src: '/images/birthstory/evolution/screens/v3-2.png', alt: 'Final home — notes and journal' },
      { src: '/images/birthstory/evolution/screens/v3-4.png', alt: 'Final — the Birth Story Book' },
      { src: '/images/birthstory/evolution/screens/v3-5.png', alt: 'Final — tag-based search' },
    ],
  },
]

function Round({ r, i }) {
  const [ref, seen] = useSeen(0.18)
  return (
    <div ref={ref} className={`${styles.round} ${styles[r.tone]} ${i % 2 ? styles.flip : ''} ${seen ? sys.in : ''}`}>
      <div className={styles.text}>
        <p className={`${styles.tag} ${sys.up}`}>{r.tag}</p>
        <p className={`${styles.changed} ${sys.up}`} style={{ '--d': '80ms' }}>{r.changed}</p>
        {r.feedback
          ? <div className={sys.up} style={{ '--d': '160ms' }}><Note who={r.who}>“{r.feedback}”</Note></div>
          : <p className={`${styles.shipped} ${sys.up}`} style={{ '--d': '160ms' }}>What shipped.</p>}
      </div>
      <div className={styles.screens}>
        {r.screens.map((sc, n) => (
          <span key={sc.src} className={`${styles.slot} ${sys.up}`} style={{ '--d': `${200 + n * 90}ms` }}>
            <Phone src={sc.src} alt={sc.alt} width="100%" />
          </span>
        ))}
      </div>
    </div>
  )
}

export default function SecIteration() {
  return (
    <Section id="iteration" tone="shade">
      <SectionHead
        num="04"
        label="The iteration"
        headline={<>The app <em>settled</em> across three rounds.</>}
        takeaway="Each round, we put wireframes in front of parents and changed course on what they told us. You can watch it calm down — the colour quieting as the work found its core."
      />
      <div className={styles.rounds}>
        {ROUNDS.map((r, i) => <Round key={r.id} r={r} i={i} />)}
      </div>
    </Section>
  )
}
