'use client'

import { useSeen, Figure, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
import CarePodFlow from './CarePodFlow'
import JournalFlow from './JournalFlow'
import DocReveal from './DocReveal'
import SearchReveal from './SearchReveal'
import p from './ProductAct.module.css'

/* ============================================================================
   THE PRODUCT — the first of the page's two acts, sitting directly under the
   hero and the metadata (N23/N24/N25).

   It replaces two things that used to say the product twice: the four-screen
   overture wall after the Brief, and the Interface chapter buried at 04. Now
   the product happens ONCE, immersively, before any process is told.

   The grammar is Lorin's own client-deck slide: one artifact centered, two
   short annotations flanking it on dotted leaders, one feature per screen.
   Each stage holds a viewport and reveals on its own arrival — the artifact
   settles, the leaders draw out, the notes land. The screens are the working
   prototypes, so the motion inside them is the product's real behavior.

   The act is deliberately unnumbered: the process half keeps the numerals, so
   the two halves read as different registers rather than one long sequence.
   ============================================================================ */

const FEATURES = [
  {
    name: 'Documentation',
    role: 'The core feature · all information-gathering, unified',
    kind: 'doc',
    annots: {
      l: { label: 'One timeline', text: 'Medical, contextual, narrative, and feelings in one place — a birth isn’t lived in separate files.', mt: '15rem' },
      r: { label: 'Calm by default', text: 'Entries stay closed until you open one, so a tired parent meets a surface, not a wall of clinical detail.', mt: '7.5rem' },
    },
    prose: <>Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add.</>,
  },
  {
    name: 'Care Pod',
    role: 'The heart of the concept · the optional sharing and partner-participation features',
    kind: 'carepod',
    annots: {
      l: { label: 'You don’t carry it', text: 'One person you designate sends the updates, photos, and voice memos — not the laboring parent.', mt: '5.5rem' },
      r: { label: 'Nothing is lost', text: 'Loved ones reply, and it all saves into the story: the detail you’d have forgotten, kept.', mt: '13rem' },
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
    annots: {
      l: { label: 'No blank page', text: 'The deck deals a prompt, because the parents who don’t already journal don’t know where to start.', mt: '5rem' },
      r: { label: 'Tag how it felt', text: 'So a memory can be found later by its emotion, not only its date.', mt: '12rem' },
    },
    prose: <>Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.</>,
    cap: 'The deck deals a prompt; you write, and tag how it felt.',
  },
  {
    name: 'Search',
    role: 'Not required · my addition, for cognitive load',
    kind: 'search',
    annots: {
      l: { label: 'A swipe from anywhere', text: 'Reachable over any screen, so brain fog never means digging through the app for one memory.', mt: '9rem' },
      r: { label: 'Filter by feeling', text: 'A parent recalls a memory by how it felt, not when it was logged.', mt: '4rem' },
    },
    prose: <>This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.</>,
    cap: 'Swipe it in from the edge; filter by feeling, category, or keyword.',
  },
  {
    name: 'The Book',
    role: 'The optional baby book',
    kind: 'book',
    annots: {
      l: { label: 'It can leave the app', text: 'The whole record as a book or a free PDF — no one trusts something this precious to a screen that could vanish.', mt: '7rem' },
      r: { label: 'Curated together', text: 'Built from what’s already there, open to the people who were part of it.', mt: '7rem' },
    },
    prose: <>We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear.</>,
    shots: [
      ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.', 'Order a keepsake, or download a PDF.'],
      ['/images/birthstory/bs-book-curate.png', 'A timeline of entries with “Drag Content to Curate Your Story”, open to collaborators.', 'Curate from what’s already there, together.'],
    ],
  },
]

function Screen({ src, alt, cap }) {
  return (
    <figure className={p.screen}>
      <span className={sys.phone} style={{ width: '100%' }}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
      </span>
      <figcaption className={p.screenCap}>{cap}</figcaption>
    </figure>
  )
}

function Media({ f }) {
  if (f.kind === 'doc') return <DocReveal cap="Entries stay closed until you open one; the medical detail lives a tap away." />
  if (f.kind === 'carepod') return <CarePodFlow cap={f.cap} />
  if (f.kind === 'journal') return <JournalFlow cap={f.cap} />
  if (f.kind === 'search') return <SearchReveal cap={f.cap} />
  if (f.kind === 'book') return (
    <div className={p.bookPair}>
      {f.shots.map(([src, alt, cap]) => <Screen key={cap} src={src} alt={alt} cap={cap} />)}
    </div>
  )
  return null
}

/* one feature, one viewport. Reveal is local to the stage (its own observer),
   so each feature lands as you reach it rather than all five firing at once. */
function Stage({ f, i, total }) {
  const [ref, on] = useSeen(0.25)
  const wide = f.kind === 'book'
  return (
    /* each stage is also a spine target: the act as a whole is far too tall for
       an IntersectionObserver ratio to ever resolve, so the progress bar tracks
       the stages and maps them all back to the one "product" node */
    <section ref={ref} id={`product-${i + 1}`} className={`${p.stage} ${on ? p.on : ''}`} aria-label={f.name}>
      <div className={p.stageInner}>
        {/* the slide label — compact and centred, so the artifact is the mass on
            the stage and the type never leaves an empty quadrant beside it */}
        <header className={p.head}>
          <p className={`${p.folio} ${p.rise}`}>
            <span className={p.folioNum}>{String(i + 1).padStart(2, '0')}</span>
            <span className={p.folioOf}>{`of ${String(total).padStart(2, '0')}`}</span>
          </p>
          <h3 className={`${p.name} ${p.rise}`} style={{ '--d': '60ms' }}>{f.name}</h3>
          <p className={`${p.role} ${p.rise}`} style={{ '--d': '120ms' }}>{f.role}</p>
        </header>

        {/* the deck composition: the artifact centered, a short note either side
            riding a dotted leader that draws toward the region it describes.
            Below 900px the notes fold under the artifact as a stacked pair. */}
        <div className={`${p.compose} ${wide ? p.composeWide : ''}`}>
          <div className={`${p.annot} ${p.annotL}`} style={{ '--mt': f.annots.l.mt }}>
            <p className={sys.annotLabel}>{f.annots.l.label}</p>
            <p className={sys.annotText}>{f.annots.l.text}</p>
            <span className={p.leader} aria-hidden="true" />
          </div>

          <div className={`${p.art} ${wide ? p.artWide : ''}`}>
            <Media f={f} />
          </div>

          <div className={`${p.annot} ${p.annotR}`} style={{ '--mt': f.annots.r.mt }}>
            <p className={sys.annotLabel}>{f.annots.r.label}</p>
            <p className={sys.annotText}>{f.annots.r.text}</p>
            <span className={p.leader} aria-hidden="true" />
          </div>
        </div>

        {/* show first, then tell — the reasoning lands under the artifact it
            explains, at a reading measure, never as a wall beside it */}
        <footer className={p.foot}>
          <p className={`${p.lede} ${p.rise}`} style={{ '--d': '120ms' }}>{f.prose}</p>
          {f.context && (
            <div className={`${p.why} ${p.rise}`} style={{ '--d': '200ms' }}>
              <Figure
                photo
                tag="the why"
                src={f.context.photo.src}
                byline={f.context.photo.byline}
                alt={f.context.alt}
                cap={f.context.cap}
              />
            </div>
          )}
        </footer>
      </div>
    </section>
  )
}

export default function ProductAct() {
  /* the observer rides the opener, not the act: the act runs several thousand
     pixels tall, so no fraction of it is ever visible enough to trip a ratio */
  const [ref, on] = useSeen(0.3)
  return (
    <div className={p.act}>
      <header ref={ref} id="product" className={`${p.actHead} ${on ? p.on : ''}`}>
        <div className={p.actHeadInner}>
          {/* no crumb: the sticky spine names this act directly above, and the
              rule alone opens it — the label would have read twice in 140px */}
          <span className={p.actRule} aria-hidden="true" />
          {/* her thesis for the interface, and the orienting line relocated
              verbatim from the retired overture — both her words */}
          <h2 className={`${p.statement} ${p.rise}`}>
            Birth is unpredictable, so the app is deliberately <b>simple</b>.
          </h2>
          <p className={`${p.actLede} ${p.rise}`} style={{ '--d': '90ms' }}>
            It opens into documenting and reaches everything else in a tap or two.
          </p>
          <p className={`${p.actNote} ${p.rise}`} style={{ '--d': '180ms' }}>
            None of the screens below are flat mockups: I rebuilt the wireframes as working prototypes,
            so what you’re seeing is the real interaction.
          </p>
        </div>
      </header>

      {FEATURES.map((f, i) => <Stage key={f.name} f={f} i={i} total={FEATURES.length} />)}
    </div>
  )
}
