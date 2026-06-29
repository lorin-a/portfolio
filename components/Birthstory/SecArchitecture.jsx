'use client'

import { Section, SectionHead, sys } from './kit'
import styles from './SecArchitecture.module.css'

/* 04 — The architecture. The IA recreated NATIVELY (no screenshots), as a
   before/after that shows the decision: stop interrogating the user, let them
   start. Process voice: the headline is the call, the proof is the structure. */

const V1 = [
  { q: 'What phase are you in?', leaves: ['Before birth', 'During labor', 'After birth'] },
  { q: 'Where are you?', leaves: ['At home', 'At the hospital', 'On the way'] },
  { q: 'What to remember?', leaves: ['Notes', 'Images', 'Medical events'] },
  { q: 'Then what?', leaves: ['Reflect', 'Document', 'Connect'] },
]
const FINAL = [
  { tab: 'Home', leaves: ['Notes', 'Journal'], tint: 'a' },
  { tab: 'Care Pod', leaves: ['Updates', 'Stories'], tint: 'b' },
  { tab: 'New Note', leaves: [], tint: 'c' },
  { tab: 'Book', leaves: ['About', 'Story'], tint: 'd' },
  { tab: 'Search', leaves: [], tint: 'e' },
]

export default function SecArchitecture() {
  return (
    <Section id="architecture" tone="cream">
      <SectionHead
        num="03"
        label="The architecture"
        headline={<>We stopped asking, and let people <em>start</em>.</>}
        takeaway="The first information architecture interrogated a parent — phase, place, intent — before they could write a single word. We replaced the triage with a home that simply opens."
      />

      <div className={`${styles.compare} ${sys.up}`} style={{ '--d': '240ms' }}>
        {/* BEFORE */}
        <figure className={styles.side}>
          <span className={`${styles.tag} ${styles.tagBefore}`}>Before · V1</span>
          <div className={`${styles.diagram} ${styles.faint}`}>
            <div className={styles.tree}>
              {V1.map((c) => (
                <div key={c.q} className={styles.col}>
                  <span className={styles.q}>{c.q}</span>
                  <span className={styles.stem} aria-hidden="true" />
                  <span className={styles.leaves}>
                    {c.leaves.map((l) => <span key={l} className={styles.leaf}>{l}</span>)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className={styles.cap}>A branching questionnaire — <strong>12+ conditional paths</strong> before a first entry.</figcaption>
        </figure>

        <span className={styles.arrow} aria-hidden="true">→</span>

        {/* AFTER */}
        <figure className={styles.side}>
          <span className={`${styles.tag} ${styles.tagAfter}`}>After · Final</span>
          <div className={styles.diagram}>
            <span className={styles.nav}>Main navigation</span>
            <div className={styles.tree}>
              {FINAL.map((c) => (
                <div key={c.tab} className={styles.col}>
                  <span className={`${styles.tab} ${styles['t' + c.tint]}`}>{c.tab}</span>
                  {c.leaves.length > 0 && <span className={styles.stem} aria-hidden="true" />}
                  <span className={styles.leaves}>
                    {c.leaves.map((l) => <span key={l} className={`${styles.leaf} ${styles.leafOn}`}>{l}</span>)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <figcaption className={styles.cap}><strong>One home, four ways in.</strong> The “+” sits dead center — capture in one tap.</figcaption>
        </figure>
      </div>
    </Section>
  )
}
