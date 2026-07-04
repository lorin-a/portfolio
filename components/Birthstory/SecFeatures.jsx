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
    annots: {
      l: { label: 'One timeline', text: 'Medical, contextual, narrative, and feelings, tagged and filtered in one place.', mt: '15rem' },
      r: { label: 'The medical record', text: 'Entries stay closed until you open one; the detail lives a tap away.', mt: '7.5rem' },
    },
    prose: <>Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add, and a note from the delivery room, a prescription, and a voice memo when your hands are full all land on it together, the moment they happen.</>,
  },
  {
    name: 'Care Pod',
    role: 'The heart of the concept · the optional sharing and partner-participation features',
    kind: 'carepod',
    layout: 'side',
    annots: {
      l: { label: 'One action', text: 'One support person sends out updates, photos, and voice memos.', mt: '5.5rem' },
      r: { label: 'Their replies', text: 'Loved ones reply, and all of it saves into the Birth Story.', mt: '13rem' },
    },
    prose: <>The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod: one support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story, so the whole story of who was there and how loved that child was stays in one place.</>,
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
    annots: {
      l: { label: 'No blank page', text: 'The deck deals a prompt: a letter to a past self, the needs that are hard to name.', mt: '5rem' },
      r: { label: 'Tag how it felt', text: 'You write, and tag how it felt.', mt: '12rem' },
    },
    prose: <>Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.</>,
    cap: 'The deck deals a prompt; you write, and tag how it felt.',
  },
  {
    name: 'Search',
    role: 'Not required · my addition, for cognitive load',
    kind: 'search',
    layout: 'side',
    annots: {
      l: { label: 'A swipe from anywhere', text: 'The drawer slides in over whatever screen you’re on.', mt: '9rem' },
      r: { label: 'Filter by feeling', text: 'Emotion, category, or keyword.', mt: '4rem' },
    },
    prose: <>This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory, so search is a swipe away from anywhere and filters by emotion, category, or keyword.</>,
    cap: 'Swipe it in from the edge; filter by feeling, category, or keyword.',
  },
  {
    name: 'The Book',
    role: 'The optional baby book',
    kind: 'book',
    layout: 'side',
    annots: {
      l: { label: 'It can leave the app', text: 'The whole record, as a printed book or a free PDF.', mt: '7rem' },
      r: { label: 'Curated together', text: 'Built from what’s already there, open to the people who were part of it.', mt: '7rem' },
    },
    prose: <>We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. So the whole record can leave the app, as a printed book or a free PDF, curated from what’s already there and open to the people who were part of it.</>,
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
      <div className={sys.headCluster}>
        <Lead>Birth is unpredictable, so the app is deliberately simple.</Lead>
        <Prose>
          It opens into documenting and reaches everything else in a tap or two. None of the screens below
          are flat mockups: I rebuilt the wireframes as working prototypes, so what you’re seeing is the
          real interaction.
        </Prose>
      </div>

      {/* the product landmark — the four ways in, on the app's own surface.
          One full-bleed teal moment so a skimming reader finds the UI instantly;
          the deep-dives below return to paper. */}
      <div className={styles.productBand}>
        <div className={styles.productBandInner}>
          <FeatureWall tone="dark" />
        </div>
      </div>

      <div className={styles.prioritize}>
        <Prose>
          The brief gave us three required areas, information gathering, meaning-making, and onboarding,
          plus five optional features. I kept two, sharing and a keepsake book, added one that wasn’t on
          the list, search, because every parent described the same brain fog, and cut the other two, a
          symptom tracker and a birth-plan builder, the kind of extra the research kept telling me to
          leave out.
        </Prose>
        <div className={`${styles.prioCard} ${sys.up}`}>
          <p className={styles.prioHead}>Prioritization</p>
          <p className={styles.prioSub}>
            The brief offered five optional features. I kept two, added one that wasn’t on the list, and
            cut two the research kept telling me to leave out.
          </p>
          <div className={styles.prioCells}>
            <div className={styles.prioCell}>
              <span className={styles.prioFigRow}><span className={styles.prioFig}>2</span><span className={styles.prioLabel}>kept</span></span>
              <span className={styles.prioNames}>sharing · keepsake book</span>
            </div>
            <div className={styles.prioCell}>
              <span className={styles.prioFigRow}><span className={styles.prioFig}>1</span><span className={styles.prioLabel}>added</span></span>
              <span className={styles.prioNames}>search</span>
            </div>
            <div className={styles.prioCell}>
              <span className={styles.prioFigRow}><span className={styles.prioFig}>2</span><span className={styles.prioLabel}>cut</span></span>
              <span className={styles.prioNames}>symptom tracker · birth-plan builder</span>
            </div>
          </div>
        </div>
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
            {f.annots ? (
              /* the annotated stage — the deck idiom (label · note · dotted
                 leader) flanking the live screen, so the reasoning sits ON the
                 artifact. Annotations hide at mobile; the caption takes over. */
              <div className={styles.annotStage}>
                <div className={`${styles.annot} ${styles.annotL}`} style={{ '--mt': f.annots.l.mt }}>
                  <p className={sys.annotLabel}>{f.annots.l.label}</p>
                  <p className={sys.annotText}>{f.annots.l.text}</p>
                  <span className={sys.leader} aria-hidden="true" />
                </div>
                {f.kind === 'book' ? <Media f={f} /> : <div className={styles.media}><Media f={f} /></div>}
                <div className={`${styles.annot} ${styles.annotR}`} style={{ '--mt': f.annots.r.mt }}>
                  <p className={sys.annotLabel}>{f.annots.r.label}</p>
                  <p className={sys.annotText}>{f.annots.r.text}</p>
                  <span className={sys.leader} aria-hidden="true" />
                </div>
              </div>
            ) : f.kind === 'book' ? <Media f={f} /> : <div className={styles.media}><Media f={f} /></div>}
          </div>
        </div>
      ))}
    </FieldSection>
  )
}
