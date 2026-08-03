'use client'

import { useEffect, useRef, useState } from 'react'
import { useSeen, sys } from './kit'
import { birthPhoto } from '@/lib/cloudinary'
import CarePodFlow from './CarePodFlow'
import JournalFlow from './JournalFlow'
import DocReveal from './DocReveal'
import SearchReveal from './SearchReveal'
import p from './ProductAct.module.css'

/* ============================================================================
   THE PRODUCT — act one, pinned.

   The first pass laid five identically-composed stages end to end and let them
   scroll past each other. Lorin's read (N26): "not unified or clean or locked…
   missing something." She was right — nothing persisted, so nothing anchored.

   This version pins. One frame holds for the whole act while the beats change
   inside it: the device stays exactly where it is and the screen changes within
   it, the reading column crossfades, the flanking notes restagger and redraw
   their leaders. Scroll advances beats rather than moving the composition, so
   there is always something to read without chasing it up the page.

   The ground is the app's own teal — the darker surface she missed when the
   overture was retired.

   Reduced motion drops the pin entirely and renders the five features as a
   plain stacked list, every beat visible at once.
   ============================================================================ */

const FEATURES = [
  {
    name: 'Documentation',
    role: 'The core feature · all information-gathering, unified',
    kind: 'doc',
    annots: {
      l: { label: 'One timeline', text: 'Medical, contextual, narrative, and feelings in one place — a birth isn’t lived in separate files.', mt: '9rem' },
      r: { label: 'Calm by default', text: 'Entries stay closed until you open one, so a tired parent meets a surface, not a wall of clinical detail.', mt: '3.5rem' },
    },
    prose: <>Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add.</>,
  },
  {
    name: 'Care Pod',
    role: 'The heart of the concept · the optional sharing and partner-participation features',
    kind: 'carepod',
    annots: {
      l: { label: 'You don’t carry it', text: 'One person you designate sends the updates, photos, and voice memos — not the laboring parent.', mt: '3rem' },
      r: { label: 'Nothing is lost', text: 'Loved ones reply, and it all saves into the story: the detail you’d have forgotten, kept.', mt: '8rem' },
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
      l: { label: 'No blank page', text: 'The deck deals a prompt, because the parents who don’t already journal don’t know where to start.', mt: '3rem' },
      r: { label: 'Tag how it felt', text: 'So a memory can be found later by its emotion, not only its date.', mt: '7.5rem' },
    },
    prose: <>Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.</>,
    cap: 'The deck deals a prompt; you write, and tag how it felt.',
  },
  {
    name: 'Search',
    role: 'Not required · my addition, for cognitive load',
    kind: 'search',
    annots: {
      l: { label: 'A swipe from anywhere', text: 'Reachable over any screen, so brain fog never means digging through the app for one memory.', mt: '5.5rem' },
      r: { label: 'Filter by feeling', text: 'A parent recalls a memory by how it felt, not when it was logged.', mt: '2.5rem' },
    },
    prose: <>This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.</>,
    cap: 'Swipe it in from the edge; filter by feeling, category, or keyword.',
  },
  {
    name: 'The Book',
    role: 'The optional baby book',
    kind: 'book',
    annots: {
      l: { label: 'It can leave the app', text: 'The whole record as a book or a free PDF — no one trusts something this precious to a screen that could vanish.', mt: '4rem' },
      r: { label: 'Curated together', text: 'Built from what’s already there, open to the people who were part of it.', mt: '4rem' },
    },
    prose: <>We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear.</>,
    shots: [
      ['/images/birthstory/bs-book-order.png', 'The Birth Story Book screen: order a printed keepsake or download a PDF.'],
      ['/images/birthstory/bs-book-curate.png', 'A timeline of entries with “Drag Content to Curate Your Story”, open to collaborators.'],
    ],
  },
]

/* the media components each draw their own device at the width the stage sets,
   so crossfading between them reads as the screen changing inside a frame that
   never moves — the device is the act's anchor */
function Media({ f, live }) {
  if (f.kind === 'doc') return <DocReveal cap={f.cap} />
  if (f.kind === 'carepod') return <CarePodFlow cap={f.cap} />
  if (f.kind === 'journal') return <JournalFlow cap={f.cap} />
  if (f.kind === 'search') return <SearchReveal cap={f.cap} />
  /* no inline width here: the pair is sized by .bookPair in CSS, and an inline
     width:100% on a flex item would resolve against an auto-width container and
     blow the whole plate out */
  if (f.kind === 'book') return (
    <div className={p.bookPair}>
      {f.shots.map(([src, alt]) => (
        <span key={src} className={`${sys.phone} ${p.bookPhone}`}>
          <span className={sys.phoneNotch} aria-hidden="true" />
          <span className={sys.phoneScreen}><img src={src} alt={live ? alt : ''} loading="lazy" draggable="false" /></span>
        </span>
      ))}
    </div>
  )
  return null
}

/* the act's one context photograph, released from the pin to close the act */
const why = FEATURES.find((f) => f.context)?.context

function Annot({ a, side }) {
  return (
    <div className={`${p.annot} ${side === 'l' ? p.annotL : p.annotR}`} style={{ '--mt': a.mt }}>
      <p className={p.annotLabel}>{a.label}</p>
      <p className={p.annotText}>{a.text}</p>
      <span className={p.leader} aria-hidden="true" />
    </div>
  )
}

/* the reading column and the stage, one beat's worth */
function Beat({ f, i, total, state }) {
  const live = state === 'live'
  return (
    <>
      <div className={`${p.copy} ${p[state]}`} aria-hidden={live ? undefined : 'true'}>
        <p className={p.folio}>
          <span className={p.folioNum}>{String(i + 1).padStart(2, '0')}</span>
          <span className={p.folioRule} aria-hidden="true" />
          <span className={p.folioOf}>{`of ${String(total).padStart(2, '0')}`}</span>
        </p>
        <h3 className={p.name}>{f.name}</h3>
        <p className={p.role}>{f.role}</p>
        <p className={p.lede}>{f.prose}</p>
      </div>

      <div className={`${p.plate} ${p[state]}`} aria-hidden={live ? undefined : 'true'}>
        <Annot a={f.annots.l} side="l" />
        <div className={`${p.art} ${f.kind === 'book' ? p.artWide : ''}`}>
          <Media f={f} live={live} />
        </div>
        <Annot a={f.annots.r} side="r" />
      </div>
    </>
  )
}

export default function ProductAct() {
  const [headRef, headOn] = useSeen(0.3)
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPinned(false); return }
    const mq = window.matchMedia('(max-width: 1000px)')
    const apply = () => setPinned(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  /* which beat is live: read the track's own progress rather than observing five
     elements, so the step is deterministic and can't land between beats */
  useEffect(() => {
    if (!pinned) return
    const el = trackRef.current
    if (!el) return
    let frame = 0
    const measure = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      if (travel <= 0) return
      const progress = Math.min(Math.max(-r.top / travel, 0), 0.9999)
      setActive(Math.floor(progress * FEATURES.length))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(measure) }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [pinned])

  const stateOf = (i) => (!pinned || i === active ? 'live' : i < active ? 'past' : 'next')

  return (
    <div className={p.act}>
      <header ref={headRef} id="product" className={`${p.actHead} ${headOn ? p.on : ''}`}>
        <div className={p.actHeadInner}>
          {/* a title spread, not a stack: the thesis holds the left, the two
              orienting lines hold the right, so the opener uses the page's full
              measure instead of hanging off its left edge */}
          <h2 className={`${p.statement} ${p.rise}`}>
            Birth is unpredictable, so the app is deliberately <b>simple</b>.
          </h2>
          <div className={p.actAside}>
            <p className={`${p.actLede} ${p.rise}`} style={{ '--d': '90ms' }}>
              It opens into documenting and reaches everything else in a tap or two.
            </p>
            <p className={`${p.actNote} ${p.rise}`} style={{ '--d': '180ms' }}>
              None of the screens below are flat mockups: I rebuilt the wireframes as working prototypes,
              so what you’re seeing is the real interaction.
            </p>
          </div>
        </div>
      </header>

      <div
        ref={trackRef}
        className={`${p.track} ${pinned ? p.trackPinned : ''}`}
        style={pinned ? { height: `${FEATURES.length * 105}vh` } : undefined}
      >
        <div className={p.sticky}>
          <div className={p.frame}>
            {FEATURES.map((f, i) => (
              <section key={f.name} id={`product-${i + 1}`} className={p.beat} aria-label={f.name}>
                <Beat f={f} i={i} total={FEATURES.length} state={stateOf(i)} />
              </section>
            ))}

            {/* the act's index — left-aligned at the foot of the reading plane,
                anchored so it holds still while the beats change above it. It
                lives with the words, not over the product. */}
            {pinned && (
              <ol className={p.steps} aria-hidden="true">
                {FEATURES.map((f, i) => (
                  <li key={f.name} className={`${p.step} ${i === active ? p.stepOn : ''} ${i < active ? p.stepPast : ''}`}>
                    <span className={p.stepTick} />
                    <span className={p.stepName}>{f.name}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* the one context photograph in the act — Care Pod's why, released from
          the pin so it can run wide as the act's closing image */}
      {why && (
        <figure id="product-close" className={p.why}>
          <img src={why.photo.src} alt={why.alt} loading="lazy" draggable="false" />
          <figcaption>
            {why.cap}
            <span className={p.byline}>{`Photo · ${why.photo.byline} / Pexels`}</span>
          </figcaption>
        </figure>
      )}
    </div>
  )
}
