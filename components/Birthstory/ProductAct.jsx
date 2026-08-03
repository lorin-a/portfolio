'use client'

import { useEffect, useRef, useState } from 'react'
import { useSeen, sys } from './kit'
import { FEATURES } from './productFeatures'
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

/* the reading column and the stage, one beat's worth.

   The notes used to flank the device inside the dark plane, which left the two
   planes badly out of balance: a dense artifact beside a heading and a single
   paragraph. They read in the reading column now — same annotation language as
   the rest of the page — and the artifact holds its plane alone. That also
   makes the grammar replicable: any artifact fits the right plane, but flanking
   dotted leaders only ever worked for a phone screen. */
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
        <div className={p.notes}>
          {[f.annots.l, f.annots.r].map((a) => (
            <div key={a.label} className={p.note}>
              <p className={p.noteLabel}>{a.label}</p>
              <p className={p.noteText}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${p.plate} ${p[state]}`} aria-hidden={live ? undefined : 'true'}>
        <div className={`${p.art} ${f.kind === 'book' ? p.artWide : ''}`}>
          <Media f={f} live={live} />
        </div>
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
      {/* the opener is the same two planes, unpinned — the act announces itself
          in the grammar it then runs on. The context photograph fills the dark
          plane, which is a better home for it than the band it used to close on. */}
      <header ref={headRef} id="product" className={`${p.actHead} ${headOn ? p.on : ''}`}>
        <div className={p.actCopy}>
          <span className={p.actRule} aria-hidden="true" />
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
        {why && (
          <figure className={p.actArt}>
            <img src={why.photo.src} alt={why.alt} loading="lazy" draggable="false" />
            <figcaption>
              {why.cap}
              <span className={p.byline}>{`Photo · ${why.photo.byline} / Pexels`}</span>
            </figcaption>
          </figure>
        )}
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

    </div>
  )
}
