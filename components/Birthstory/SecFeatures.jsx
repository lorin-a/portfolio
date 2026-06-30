'use client'

import { FieldSection, Ask, Prose, Figure, TesterNote, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
import FeatureWall from './FeatureWall'
import CarePodFlow from './CarePodFlow'
import JournalFlow from './JournalFlow'
import DocReveal from './DocReveal'
import SearchReveal from './SearchReveal'
import styles from './SecFeatures.module.css'

/* 05 — Features. The wall shows all four ways in at once; below, each capability
   gets a deep-dive: the question leads, a short note explains the reasoning, and
   the real screen sits large beside it — moving where the feature is a flow (the
   medical entry opens; the Care Pod sends out and receives back; the Journal deck
   deals a prompt). Copy is draft, in her voice. */

const DEEPDIVES = [
  {
    name: 'Documentation',
    kind: 'doc',
    layout: 'side',
    q: <>How do you capture it when you can barely <em>type</em>?</>,
    prose: <>One place for everything. A tender note from the delivery room, a prescription with the doctor’s instructions, a voice memo when your hands are full. Personal memory and medical detail land on the same timeline, the moment they happen.</>,
  },
  {
    name: 'Care Pod',
    kind: 'carepod',
    layout: 'side',
    q: <>Who else is in the <em>room</em>?</>,
    prose: <>One action keeps everyone informed. A support person sends updates, photos, and voice memos out; loved ones send messages and voice notes back. All of it saves into the Birth Story, so the conversations become part of the memory.</>,
    context: {
      photo: birthPhoto('room', 1200),
      alt: 'A partner cradles a newborn while an older sibling leans in close to see.',
      cap: 'Birth doesn’t happen to the mother alone. The people there, and those waiting to hear, each hold a piece of the story.',
    },
    cap: 'You send one update out; their replies come back into the story.',
  },
  {
    name: 'Reflection',
    kind: 'journal',
    layout: 'side',
    q: <>Where does the parent get to <em>process</em> it?</>,
    prose: <>Testers told me the quiet hours up at night, between feedings, were when they wanted to reflect. So the Journal deals gentle prompts: a letter to your past self, the needs you can’t name, the senses you want to keep. Something to do with the feeling while everyone else is asleep.</>,
    cap: 'The deck deals a prompt; you write, and tag how it felt.',
  },
  {
    name: 'Search',
    kind: 'search',
    layout: 'side',
    q: <>How do you find one moment in <em>all</em> of it?</>,
    prose: <>Months of notes, photos, voice memos, and entries stack up fast. So search lives one swipe off the edge from anywhere: pull it in and filter by emotion, category, or keyword to bring a single moment back.</>,
    cap: 'Swipe it in from the edge; filter by feeling, category, or keyword.',
  },
  {
    name: 'The Book',
    kind: 'book',
    layout: 'side',
    q: <>Where do these memories go if the app <em>disappears</em>?</>,
    prose: <>Parents said they needed something real to keep, in case the app ever went away. So the record can leave entirely: a printed Birth Story Book or a free PDF, curated from everything already captured, and open to loved ones to add to.</>,
    crit: {
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

function Screen({ src, alt, cap }) {
  return (
    <figure className={styles.screen}>
      <Device src={src} alt={alt} />
      <figcaption className={styles.screenCap}>{cap}</figcaption>
    </figure>
  )
}

function Media({ f }) {
  if (f.kind === 'doc') return <DocReveal cap="Entries stay closed until you open one — the medical detail lives a tap away." />
  if (f.kind === 'carepod') return <CarePodFlow cap={f.cap} />
  if (f.kind === 'journal') return <JournalFlow cap={f.cap} />
  if (f.kind === 'search') return <SearchReveal cap={f.cap} />
  if (f.kind === 'book') return (
    <div className={styles.bookPair}>
      {f.shots.map(([src, alt, cap]) => <Screen key={cap} src={src} alt={alt} cap={cap} />)}
    </div>
  )
  return null
}

export default function SecFeatures() {
  return (
    <FieldSection id="features" num="05" crumb="features" when="the product, decided" threshold={0.04} wide>
      <Ask>Birth never goes to plan. How do you build something simple enough to use anyway?</Ask>
      <Prose>
        The biggest thing testers told me: birth is unpredictable and complicated, so the app had to be
        the opposite. Easy to enter, easy to understand, easy to engage, whatever stage you’re in. A home
        that drops you straight into documenting, and a nav bar that reaches every other feature in two taps.
      </Prose>

      <FeatureWall />

      <p className={styles.decisionsHead}>Each of these was a decision.</p>

      {DEEPDIVES.map((f) => (
        <div key={f.name} className={`${styles.feat} ${styles.side} ${f.kind === 'book' ? styles.bookFeat : ''}`}>
          <div className={styles.copy}>
            <Ask kicker={f.name}>{f.q}</Ask>
            <p className={`${styles.lede} ${sys.up}`}>{f.prose}</p>
            {f.context && (
              <Figure
                photo
                tag="the why"
                className={styles.whyFig}
                src={f.context.photo.src}
                byline={f.context.photo.byline}
                alt={f.context.alt}
                cap={f.context.cap}
              />
            )}
            {f.crit && <div className={sys.up}><TesterNote quote={f.crit.quote} who={f.crit.who} /></div>}
          </div>

          <div className={`${styles.stage} ${sys.up}`}>
            {f.kind === 'book' ? <Media f={f} /> : <div className={styles.media}><Media f={f} /></div>}
          </div>
        </div>
      ))}
    </FieldSection>
  )
}
