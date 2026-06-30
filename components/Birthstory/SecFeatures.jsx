'use client'

import { FieldSection, Ask, Prose, Figure, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
import FeatureWall from './FeatureWall'
import CritStage from './CritStage'
import styles from './SecFeatures.module.css'

/* 05 — Features. The wall shows all four ways in at once; below, each capability
   gets a deep-dive: the question, the thinking, and the real screens shown big.
   Per the brief, the screens carry the use case; the copy calls out the reasoning.
   Copy is draft, in her voice. */

const DEEPDIVES = [
  {
    name: 'Documentation',
    q: <>How do you capture it when you can barely <em>type</em>?</>,
    prose: <>One place for everything. A tender note from the delivery room, a prescription with the doctor’s instructions, a voice memo when your hands are full. Personal memory and medical detail land on the same timeline, the moment they happen.</>,
    shots: [
      ['/images/birthstory/bs-doc-note.png', 'A delivery-room note with a photo grid and camera, pen, and voice tools.', 'A note from the delivery room, with photos and a voice memo.'],
      ['/images/birthstory/bs-doc-medical.png', 'A medical entry: an Ibuprofen prescription with pickup instructions and a voice memo, on the timeline.', 'A prescription, its instructions, and a voice note.'],
    ],
  },
  {
    name: 'Care Pod',
    q: <>Who else is in the <em>room</em>?</>,
    prose: <>One action keeps everyone informed. A support person sends updates, photos, and voice memos out; loved ones send messages and voice notes back. All of it saves into the Birth Story, so the conversations become part of the memory.</>,
    context: {
      photo: birthPhoto('room', 1200),
      alt: 'A partner cradles a newborn while an older sibling leans in close to see.',
      cap: 'Birth doesn’t happen to the mother alone. The people there, and those waiting to hear, each hold a piece of the story.',
    },
    shots: [
      ['/images/birthstory/bs-carepod-update.png', 'The Care Pod: loved ones orbiting a heart marked “You”, with a Send Update button.', 'Your curated circle. One update reaches everyone.'],
      ['/images/birthstory/bs-carepod-stories.png', 'Stories from loved ones: messages with photos and voice notes sent in.', 'Messages, photos, and voice notes, sent back in.'],
    ],
  },
  {
    name: 'Reflection',
    q: <>Where does the parent get to <em>process</em> it?</>,
    prose: <>Testers told me the quiet hours up at night, between feedings, were when they wanted to reflect. So the Journal offers gentle prompts: a letter to your past self, an emotion to name. Something to do with the feeling while everyone else is asleep.</>,
    shots: [
      ['/images/birthstory/bs-reflect-card.png', 'A reflection prompt card: a letter to your past self.', 'Gentle prompts, one card at a time.'],
      ['/images/birthstory/bs-reflect-entry.png', 'A finished journal entry tagged Empowered and Hopeful.', 'A finished entry, tagged with how it felt.'],
    ],
  },
  {
    name: 'The Book',
    q: <>Where do these memories go if the app <em>disappears</em>?</>,
    prose: <>Parents said they needed something real to keep, in case the app ever went away. So the record can leave entirely: a printed Birth Story Book or a free PDF, curated from everything already captured, and open to loved ones to add to.</>,
    crit: {
      pin: { x: 50, y: 39 },
      quote: 'It would be tragic to lose these moments if the app went away.',
      who: 'Parent tester',
    },
    shots: [
      ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.', 'Order a keepsake, or download a PDF.'],
      ['/images/birthstory/bs-book-curate.png', 'A timeline of entries with “Drag Content to Curate Your Story”, open to collaborators.', 'Curate from what’s already there, together.'],
    ],
  },
]

function Device({ src, alt }) {
  return (
    <span className={sys.phone} style={{ width: '100%' }}>
      <span className={sys.phoneNotch} aria-hidden="true" />
      <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
    </span>
  )
}

function Screen({ src, alt, cap, solo }) {
  return (
    <figure className={`${styles.screen} ${solo ? styles.solo : ''}`}>
      <Device src={src} alt={alt} />
      <figcaption className={styles.screenCap}>{cap}</figcaption>
    </figure>
  )
}

export default function SecFeatures() {
  return (
    <FieldSection id="features" num="05" crumb="features" when="the product, decided" wide>
      <Ask>Birth never goes to plan. How do you build something simple enough to use anyway?</Ask>
      <Prose>
        The biggest thing testers told me: birth is unpredictable and complicated, so the app had to be
        the opposite. Easy to enter, easy to understand, easy to engage, whatever stage you’re in. A home
        that drops you straight into documenting, and a nav bar that reaches every other feature in two taps.
      </Prose>

      <FeatureWall />

      <p className={styles.decisionsHead}>Each of these was a decision.</p>

      {DEEPDIVES.map((f, i) => (
        <div key={f.name} className={styles.feat}>
          <div className={styles.text}>
            <Ask kicker={f.name}>{f.q}</Ask>
            <Prose>{f.prose}</Prose>
            {f.context && (
              <Figure
                photo
                tag="the why"
                className={styles.contextFig}
                src={f.context.photo.src}
                byline={f.context.photo.byline}
                alt={f.context.alt}
                cap={f.context.cap}
              />
            )}
          </div>
          {f.crit ? (
            <div className={`${styles.media} ${styles.mediaCrit} ${sys.up}`}>
              <CritStage pin={f.crit.pin} quote={f.crit.quote} who={f.crit.who} side="left" cap={f.shots[0][2]}>
                <span className={styles.critDevice}><Device src={f.shots[0][0]} alt={f.shots[0][1]} /></span>
              </CritStage>
              {f.shots.slice(1).map(([src, alt, cap]) => (
                <Screen key={cap} src={src} alt={alt} cap={cap} />
              ))}
            </div>
          ) : (
            <div className={`${styles.media} ${sys.up}`}>
              {f.shots.map(([src, alt, cap]) => (
                <Screen key={cap} src={src} alt={alt} cap={cap} solo={f.shots.length === 1} />
              ))}
            </div>
          )}
        </div>
      ))}
    </FieldSection>
  )
}
