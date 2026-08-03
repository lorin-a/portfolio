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
   THE PRODUCT — act one, and the page's universal grammar (N31).

   TWO SHAPES, and only two:

   THE ROW is the workhorse. Contained in the page column, copy on the left with
   the column sticking beside its artifact, the artifact large on the right. It
   is the Iteration recipe, which is what Lorin was pointing at all along. Every
   feature and every process beat on the page uses it.

   THE ARIA is reserved. A pinned, viewport-held moment used ONCE, and only
   where the beats are genuinely different KINDS of content — her condition:
   "3 would only work if each scroll TRULY earned a moment of isolation such as
   the ask, the research (a quote), the feature." Five product features pinned in
   a row is five of the same thing, which is exactly why it read as unearned.
   Care Pod is the one moment that carries that argument, and it already carries
   it in her own prose, so the aria's three beats are her sentences, split at
   their own boundaries and not rewritten.

   Callouts with leaders ride the aria's device, where the artifact is big and
   isolated enough to have regions worth pointing at. In a row the same notes
   read in the copy column instead.
   ============================================================================ */

const ARIA_KIND = 'carepod' // the one feature that earns the pin

function Media({ f }) {
  if (f.kind === 'doc') return <DocReveal cap={f.cap} />
  if (f.kind === 'carepod') return <CarePodFlow cap={f.cap} />
  if (f.kind === 'journal') return <JournalFlow cap={f.cap} />
  if (f.kind === 'search') return <SearchReveal cap={f.cap} />
  if (f.kind === 'book') return (
    <div className={p.bookPair}>
      {f.shots.map(([src, alt]) => (
        <span key={src} className={`${sys.phone} ${p.bookPhone}`}>
          <span className={sys.phoneNotch} aria-hidden="true" />
          <span className={sys.phoneScreen}><img src={src} alt={alt} loading="lazy" draggable="false" /></span>
        </span>
      ))}
    </div>
  )
  return null
}

/* ── THE ROW ─────────────────────────────────────────────────────────────── */

function Row({ f, i, total }) {
  const [ref, on] = useSeen(0.15)
  return (
    <section
      ref={ref}
      id={`product-${i + 1}`}
      className={`${p.row} ${on ? p.on : ''}`}
      aria-label={f.name}
    >
      <div className={p.copy}>
        <p className={p.folio}>
          <span className={p.folioNum}>{String(i + 1).padStart(2, '0')}</span>
          <span className={p.folioRule} aria-hidden="true" />
          <span className={p.folioOf}>{`of ${String(total).padStart(2, '0')}`}</span>
        </p>
        <h3 className={`${p.name} ${p.rise}`}>{f.name}</h3>
        <p className={`${p.role} ${p.rise}`} style={{ '--d': '70ms' }}>{f.role}</p>
        <p className={`${p.lede} ${p.rise}`} style={{ '--d': '140ms' }}>{f.prose}</p>
        <div className={`${p.notes} ${p.rise}`} style={{ '--d': '210ms' }}>
          {[f.annots.l, f.annots.r].map((a) => (
            <div key={a.label} className={p.note}>
              <p className={p.noteLabel}>{a.label}</p>
              <p className={p.noteText}>{a.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={`${p.stage} ${p.rise}`} style={{ '--d': '120ms' }}>
        <div className={`${p.art} ${f.kind === 'book' ? p.artWide : ''}`}>
          <Media f={f} />
        </div>
      </div>
    </section>
  )
}

/* ── THE ARIA ────────────────────────────────────────────────────────────── */

/* the three beats, every word hers — the role line from the brief, and the two
   halves of her Care Pod paragraph split at their own sentence boundaries */
function ariaBeats(f) {
  return [
    {
      key: 'ask',
      kicker: 'The ask',
      /* her role line, verbatim — no surgery on her wording to make it fit */
      body: <p className={p.ariaLede}>{f.role}</p>,
    },
    {
      key: 'heard',
      kicker: 'What one parent said',
      body: (
        <p className={p.ariaQuote}>
          A parent told me someone in her circle remembered a detail about her child’s birth that she
          had lost, and wished she’d asked everyone around her to add what they remembered while it
          was fresh.
        </p>
      ),
    },
    {
      key: 'built',
      kicker: 'What we built',
      body: (
        <p className={p.ariaLede}>
          That became Care Pod: one support person sends out updates, photos, and voice memos, loved
          ones reply with messages and voice notes, and all of it saves into the Birth Story, so the
          whole story of who was there and how loved that child was stays in one place.
        </p>
      ),
    },
  ]
}

function Aria({ f, i, total }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(true)
  const beats = ariaBeats(f)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setPinned(false); return }
    const mq = window.matchMedia('(max-width: 1000px)')
    const apply = () => setPinned(!mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

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
      setActive(Math.floor(progress * beats.length))
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
  }, [pinned, beats.length])

  return (
    <section
      id={`product-${i + 1}`}
      className={`${p.aria} ${pinned ? p.ariaPinned : ''}`}
      aria-label={f.name}
    >
      <div
        ref={trackRef}
        className={p.ariaTrack}
        style={pinned ? { height: `${beats.length * 100 + 30}vh` } : undefined}
      >
        <div className={p.ariaSticky}>
          <div className={p.ariaFrame}>
            <div className={p.ariaCopy}>
              <p className={p.folio}>
                <span className={p.folioNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={p.folioRule} aria-hidden="true" />
                <span className={p.folioOf}>{`of ${String(total).padStart(2, '0')}`}</span>
              </p>
              <h3 className={p.ariaName}>{f.name}</h3>

              {/* THE OUTLINE FILLS IN.

                  Reserving invisible space traded a jump for a void — it read as
                  broken, and blank space cannot signal that more is coming. So
                  all three labels are present from the first frame: the reader
                  sees the shape of the argument immediately, and only the BODY
                  of each beat expands as they reach it. The upcoming labels are
                  the clue, which is the job the dots were failing to do, so the
                  dots are gone. Nothing already read is ever removed or moved. */}
              {beats.map((b, n) => (
                <div
                  key={b.key}
                  className={`${p.ariaBeat} ${
                    !pinned || n === active ? p.beatOn : n < active ? p.beatIn : p.beatNext
                  }`}
                >
                  <p className={p.ariaKicker}>{b.kicker}</p>
                  <div className={p.ariaBody}><div>{b.body}</div></div>
                </div>
              ))}

            </div>

            {/* the callouts belong here and only here: the device is big and
                alone, so a leader can actually point at the region it names.
                They arrive on the last beat, once the feature has been built. */}
            <div className={p.ariaStage}>
              <div className={`${p.ariaAnnot} ${p.annotL} ${!pinned || active === beats.length - 1 ? p.annotOn : ''}`}>
                <p className={p.noteLabel}>{f.annots.l.label}</p>
                <p className={p.noteText}>{f.annots.l.text}</p>
                <span className={p.leader} aria-hidden="true" />
              </div>
              <div className={p.ariaArt}><Media f={f} /></div>
              <div className={`${p.ariaAnnot} ${p.annotR} ${!pinned || active === beats.length - 1 ? p.annotOn : ''}`}>
                <p className={p.noteLabel}>{f.annots.r.label}</p>
                <p className={p.noteText}>{f.annots.r.text}</p>
                <span className={p.leader} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── the act ─────────────────────────────────────────────────────────────── */

const why = FEATURES.find((f) => f.context)?.context

export default function ProductAct() {
  const [headRef, headOn] = useSeen(0.25)
  return (
    <div className={p.act}>
      {/* the opener is a row too — same containment, same two columns, so the
          act announces itself in the grammar it then runs on */}
      <header ref={headRef} id="product" className={`${p.head} ${headOn ? p.on : ''}`}>
        <div className={p.headCopy}>
          <span className={p.headRule} aria-hidden="true" />
          <h2 className={`${p.statement} ${p.rise}`}>
            Birth is unpredictable, so the app is deliberately <b>simple</b>.
          </h2>
          <p className={`${p.headLede} ${p.rise}`} style={{ '--d': '90ms' }}>
            It opens into documenting and reaches everything else in a tap or two.
          </p>
          <p className={`${p.headNote} ${p.rise}`} style={{ '--d': '180ms' }}>
            None of the screens below are flat mockups: I rebuilt the wireframes as working prototypes,
            so what you’re seeing is the real interaction.
          </p>
        </div>
        {why && (
          <figure className={`${p.headArt} ${p.rise}`} style={{ '--d': '140ms' }}>
            <img src={why.photo.src} alt={why.alt} loading="lazy" draggable="false" />
            <figcaption>
              {why.cap}
              <span className={p.byline}>{`Photo · ${why.photo.byline} / Pexels`}</span>
            </figcaption>
          </figure>
        )}
      </header>

      {FEATURES.map((f, i) =>
        f.kind === ARIA_KIND
          ? <Aria key={f.name} f={f} i={i} total={FEATURES.length} />
          : <Row key={f.name} f={f} i={i} total={FEATURES.length} />
      )}
    </div>
  )
}
