'use client'

import { FieldSection, Ask, Prose, sys } from './kit'
import styles from './SecFeatures.module.css'

/* 05 — Features, each led by the question that produced it. Real screens shown
   big beside the reasoning. Not feature benefits — design decisions. Copy is
   draft, in her voice. */

const FEATURES = [
  {
    q: <>Document or reflect: why make people <em>choose</em>?</>,
    prose: <>Feedback had split the app in two: a Document screen and a Reflect screen, two decisions before you’d written a word. Parents wanted less, so I collapsed both onto one home: capture first, sort it out later.</>,
    shots: [['/images/birthstory/bs-home.png', 'The home: one chronological record of notes and journal entries.', 'bs-home']],
  },
  {
    q: <>Who else is in the <em>room</em>?</>,
    prose: <>Parents kept describing the people around them: who they’d want to tell, who they’d want to speak for them. So the app invited a small, curated circle in: live updates out, support back, and someone able to post on your behalf when you can’t.</>,
    shots: [
      ['/images/birthstory/bs-carepod.png', 'Care Pod: loved ones orbiting a heart marked “You”.', 'care-pod'],
      ['/images/birthstory/bs-messages.png', 'Care Pod live message board during labor.', 'message-board'],
    ],
  },
  {
    q: <>Where do these memories go if the app <em>disappears</em>?</>,
    prose: <>One parent said it would be tragic to lose these moments if the app went away. That stuck. So the record can leave the app entirely: a printed Birth Story Book, or a free PDF. The memory never depends on us surviving.</>,
    shots: [['/images/birthstory/evolution/screens/v3-4.png', 'The Birth Story Book screen: order a keepsake or export a PDF.', 'birth-story-book']],
  },
]

function Screen({ src, alt, cap, solo }) {
  return (
    <figure className={`${styles.screen} ${solo ? styles.solo : ''}`}>
      <span className={sys.phone} style={{ width: '100%' }}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      <figcaption className={styles.screenCap}>{cap}</figcaption>
    </figure>
  )
}

export default function SecFeatures() {
  return (
    <FieldSection id="features" num="05" crumb="features" when="the product, decided" wide>
      {FEATURES.map((f, i) => (
        <div key={i} className={styles.feat}>
          <div className={styles.text}>
            <Ask kicker={i === 0 ? 'the question' : 'next question'}>{f.q}</Ask>
            <Prose>{f.prose}</Prose>
          </div>
          <div className={`${styles.media} ${sys.up}`}>
            {f.shots.map(([src, alt, cap]) => (
              <Screen key={cap} src={src} alt={alt} cap={cap} solo={f.shots.length === 1} />
            ))}
          </div>
        </div>
      ))}
    </FieldSection>
  )
}
