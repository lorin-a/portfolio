'use client'

import { FieldSection, Lead, Prose, Figure, TesterNote, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
import FeatureWall from './FeatureWall'
import CarePodFlow from './CarePodFlow'
import JournalFlow from './JournalFlow'
import DocReveal from './DocReveal'
import SearchReveal from './SearchReveal'
import styles from './SecFeatures.module.css'

/* 05 — The product. The wall shows all four ways in at once; below, each feature
   is documented: the name, the requirement it maps to, and the need it answers,
   with the real screen shown large beside it, moving where the feature is a flow
   (the medical entry opens; the Care Pod sends out and receives back; the Journal
   deck deals a prompt). */

const DEEPDIVES = [
  {
    name: 'Documentation',
    role: 'The core feature · all information-gathering, unified',
    kind: 'doc',
    layout: 'side',
    prose: <>Parents wanted to arrive directly at the main task. If nothing else is used, the app still holds a timeline of what they or a loved one managed to add. A note from the delivery room, a prescription, and a voice memo land on the same timeline, the moment they happen.</>,
  },
  {
    name: 'Care Pod',
    role: 'The heart of the concept · the optional sharing and partner-participation features',
    kind: 'carepod',
    layout: 'side',
    prose: <>The idea came from one interview. A parent told me that someone in her close circle remembered a detail about her child’s birth that she did not, and she wished she had thought to ask everyone to add their notes and experiences, to form a full collective memory: the story of the birth, and how many people loved that child from day one. One support person sends updates, photos, and voice memos out; loved ones reply with messages and voice notes; all of it saves into the Birth Story.</>,
    context: {
      photo: birthPhoto('room', 1200),
      alt: 'A partner cradles a newborn while an older sibling leans in close to see.',
      cap: 'Birth doesn’t happen to the mother alone; the people there, and those waiting to hear, each hold a piece of the story.',
    },
    cap: 'One update goes out; their replies come back into the story.',
  },
  {
    name: 'Reflection',
    role: 'The processing and nudge requirements',
    kind: 'journal',
    layout: 'side',
    prose: <>Every parent wanted to reflect, whether or not their birth was traumatic. Those who do not already journal often do not know where to start, so the feature offers gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.</>,
    cap: 'The deck deals a prompt; you write, and tag how it felt.',
  },
  {
    name: 'Search',
    role: 'Not required · my addition, for cognitive load',
    kind: 'search',
    layout: 'side',
    prose: <>Parents described real brain fog. As entries accumulate, search sits one swipe from any screen and filters by emotion, category, or keyword, so a single memory is never buried.</>,
    cap: 'Swipe it in from the edge; filter by feeling, category, or keyword.',
  },
  {
    name: 'The Book',
    role: 'The optional baby book',
    kind: 'book',
    layout: 'side',
    prose: <>A parent said she would not trust the app with this much precious information without a guarantee it would not be lost. So the record can leave the app entirely: a printed book or a free PDF, curated from existing entries and open to loved ones. It also gives the experience a sense of closure.</>,
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
  if (f.kind === 'doc') return <DocReveal cap="Entries stay closed until you open one; the medical detail lives a tap away." />
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
    <FieldSection id="features" num="05" crumb="the product" when="Week 5" threshold={0.04} wide>
      <Lead>Birth is unpredictable, so the app is deliberately simple.</Lead>
      <Prose>
        It opens into documentation and reaches every other feature in a tap or two. The screens below
        are not static mockups: I rebuilt the wireframes as working prototypes for this case study, so
        the interactions are real.
      </Prose>

      <FeatureWall />

      <div className={styles.prioritize}>
        <p className={`${sys.eyebrow} ${sys.up}`}>Prioritization</p>
        <Prose>
          The brief required information gathering, meaning-making, and onboarding, and offered five
          optional features on top. I kept two of the optional ones (sharing and a keepsake book), added
          one that was not requested (search, for cognitive load), and cut two (a symptom tracker and a
          birth-plan builder) as the kind of scope the research told me to resist.
        </Prose>
      </div>

      {DEEPDIVES.map((f) => (
        <div key={f.name} className={`${styles.feat} ${styles.side} ${f.kind === 'book' ? styles.bookFeat : ''}`}>
          <div className={styles.copy}>
            <div className={`${styles.featHead} ${sys.up}`}>
              <h3 className={styles.featName}>{f.name}</h3>
              <p className={styles.featRole}>{f.role}</p>
            </div>
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
