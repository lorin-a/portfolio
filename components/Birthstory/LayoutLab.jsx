'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from './kit'
import { FEATURES } from './productFeatures'
import CarePodFlow from './CarePodFlow'
import JournalFlow from './JournalFlow'
import DocReveal from './DocReveal'
import SearchReveal from './SearchReveal'
import l from './LayoutLab.module.css'

/* ============================================================================
   LAYOUT LAB — four candidates for the page's universal flow, built for real so
   they can be scrolled and compared rather than described.

   Same three features, same copy, in every variant. Nothing here ships as-is;
   whichever wins becomes the template and this route is deleted.
   ============================================================================ */

const SET = FEATURES.slice(0, 3) // Documentation · Care Pod · Reflection

function Media({ f }) {
  if (f.kind === 'doc') return <DocReveal cap={f.cap} />
  if (f.kind === 'carepod') return <CarePodFlow cap={f.cap} />
  if (f.kind === 'journal') return <JournalFlow cap={f.cap} />
  if (f.kind === 'search') return <SearchReveal cap={f.cap} />
  return null
}

function Notes({ f, className = '' }) {
  return (
    <div className={`${l.notes} ${className}`}>
      {[f.annots.l, f.annots.r].map((a) => (
        <div key={a.label} className={l.note}>
          <p className={l.noteLabel}>{a.label}</p>
          <p className={l.noteText}>{a.text}</p>
        </div>
      ))}
    </div>
  )
}

function Head({ f, i }) {
  return (
    <div className={l.head}>
      <p className={l.eyebrow}>{`Feature ${String(i + 1).padStart(2, '0')}`}</p>
      <h3 className={l.name}>{f.name}</h3>
      <p className={l.role}>{f.role}</p>
      <p className={l.lede}>{f.prose}</p>
    </div>
  )
}

/* ── A · contained rows, the copy sticks beside its artifact ────────────────
   Exactly the Iteration recipe: page column, copy column pinned at the top of
   the viewport while its tall artifact scrolls past, soft gradient stage. */
function VariantA() {
  return (
    <div className={l.sheet}>
      {SET.map((f, i) => (
        <div key={f.name} className={l.rowA}>
          <div className={l.copyA}>
            <Head f={f} i={i} />
            <Notes f={f} />
          </div>
          <div className={l.stageLight}>
            <div className={l.art}><Media f={f} /></div>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── B · the same rows, on a ground that runs edge to edge ──────────────────
   Identical geometry to A. The only change is the section's ground: the band
   goes dark and full width while the content stays in the page column. */
function VariantB() {
  return (
    <div className={l.darkBand}>
      <div className={l.sheet}>
        {SET.map((f, i) => (
          <div key={f.name} className={`${l.rowA} ${l.rowDark}`}>
            <div className={l.copyA}>
              <Head f={f} i={i} />
              <Notes f={f} />
            </div>
            <div className={l.stageBare}>
              <div className={l.art}><Media f={f} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── C · the full-bleed split planes, pinned ────────────────────────────────
   What is live on the case study now, cut down to three features. The frame
   locks to the viewport and the beat changes inside it. */
function VariantC() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    let frame = 0
    const measure = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const travel = r.height - window.innerHeight
      if (travel <= 0) return
      const progress = Math.min(Math.max(-r.top / travel, 0), 0.9999)
      setActive(Math.floor(progress * SET.length))
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
  }, [])

  return (
    <div ref={trackRef} className={l.trackC} style={{ height: `${SET.length * 105}vh` }}>
      <div className={l.stickyC}>
        {SET.map((f, i) => (
          <div key={f.name} className={`${l.beatC} ${i === active ? l.on : ''}`} aria-hidden={i === active ? undefined : 'true'}>
            <div className={l.paneCopy}>
              <Head f={f} i={i} />
              <Notes f={f} />
            </div>
            <div className={l.paneArt}>
              <div className={l.art}><Media f={f} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── D · the inversion: the artifact holds, the words move ──────────────────
   The one shape none of the others covers. The device pins; the heading, the
   lede and each note scroll past it; whichever note is in the reading band
   lights up and the others recede, so the words stay tied to the thing they
   describe without the page ever locking. */
function RowD({ f, i }) {
  const noteRefs = useRef([])
  const [live, setLive] = useState(0)

  useEffect(() => {
    const els = noteRefs.current.filter(Boolean)
    if (!els.length) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const o = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setLive(Number(e.target.dataset.idx))
        })
      },
      /* a narrow band across the middle of the viewport: whatever is being read
         is what the artifact should be answering to */
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    els.forEach((el) => o.observe(el))
    return () => o.disconnect()
  }, [])

  const beats = [
    { label: null, body: <><h3 className={l.name}>{f.name}</h3><p className={l.role}>{f.role}</p><p className={l.lede}>{f.prose}</p></> },
    { label: f.annots.l.label, body: <p className={l.noteText}>{f.annots.l.text}</p> },
    { label: f.annots.r.label, body: <p className={l.noteText}>{f.annots.r.text}</p> },
  ]

  return (
    <div className={l.rowD}>
      <div className={l.scrollerD}>
        <p className={l.eyebrow}>{`Feature ${String(i + 1).padStart(2, '0')}`}</p>
        {beats.map((b, n) => (
          <div
            key={b.label || 'lede'}
            ref={(el) => { noteRefs.current[n] = el }}
            data-idx={n}
            className={`${l.beatD} ${n === live ? l.beatOn : ''}`}
          >
            {/* the marker rides the text, not the scroll spacing — a rule the
                height of a 58vh block reads as a stray line, not an annotation */}
            <div className={l.beatInner}>
              {b.label && <p className={l.noteLabel}>{b.label}</p>}
              {b.body}
            </div>
          </div>
        ))}
      </div>
      <div className={l.stickyD}>
        <div className={l.stageLight}>
          <div className={l.art}><Media f={f} /></div>
          <ol className={l.dotsD} aria-hidden="true">
            {beats.map((b, n) => (
              <li key={b.label || 'lede'} className={n === live ? l.dotOn : ''} />
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

function VariantD() {
  return (
    <div className={l.sheet}>
      {SET.map((f, i) => <RowD key={f.name} f={f} i={i} />)}
    </div>
  )
}

const VARIANTS = [
  {
    key: 'A',
    title: 'Contained rows, the copy sticks',
    blurb: 'The Iteration recipe, unchanged. Page column, normal margins, soft gradient stage. The copy column pins at the top of the viewport and holds while its artifact scrolls past, then releases when the row ends.',
    render: <VariantA />,
  },
  {
    key: 'B',
    title: 'The same rows, on a ground that runs edge to edge',
    blurb: 'Identical geometry to A — the only thing that changes is the ground. The band goes dark and full width while the content stays in the page column, so the product half can look different without the layout changing.',
    render: <VariantB />,
  },
  {
    key: 'C',
    title: 'Full-bleed split planes, pinned',
    blurb: 'What is on the case study right now. The frame locks to the viewport and the beat changes inside it, one feature at a time. Most immersive, most controlling of the scroll, and the hardest to reuse for a diagram or a photograph.',
    render: <VariantC />,
  },
  {
    key: 'D',
    title: 'The inversion — the artifact holds, the words move',
    blurb: 'The one none of the others covers. The device pins instead of the copy; the heading and each note scroll past it, and whichever note you are reading lights up while the others recede. The words stay tied to the thing they describe, and the page never locks.',
    render: <VariantD />,
  },
]

export default function LayoutLab() {
  return (
    <main className={`${sys.case} ${l.lab}`}>
      <div className={l.mastheadBand}>
      <header className={l.masthead}>
        <p className={l.kicker}>Layout lab · not a page, a comparison</p>
        <h1 className={l.title}>Four candidates for the template’s flow.</h1>
        <p className={l.intro}>
          Same three features, same copy, four layouts. Scroll each one — the differences are in the
          motion, not the still frame. Whichever wins becomes the grammar for every chapter, and this
          route gets deleted.
        </p>
      </header>
      </div>

      {VARIANTS.map((v) => (
        <section key={v.key} id={`variant-${v.key}`} className={l.variant}>
          <div className={l.variantHead}>
            <span className={l.variantKey}>{v.key}</span>
            <div>
              <h2 className={l.variantTitle}>{v.title}</h2>
              <p className={l.variantBlurb}>{v.blurb}</p>
            </div>
          </div>
          {v.render}
        </section>
      ))}

      <footer className={l.foot}>
        <p>Tell me a letter, or a hybrid — “A’s containment with D’s motion” is a perfectly good answer.</p>
      </footer>
    </main>
  )
}
