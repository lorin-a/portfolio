'use client'

import { useEffect, useState } from 'react'
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

  return (
    <section
      id={`product-${i + 1}`}
      className={`${p.aria} ${pinned ? p.ariaPinned : ''}`}
      aria-label={f.name}
    >
      <div
        className={p.ariaTrack}
        style={pinned ? { height: '170vh' } : undefined}
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

              {/* THE ARGUMENT SITS STILL.

                  It used to fill in beat by beat on scroll. Her call: the demo
                  and the words were both moving, and two things in motion at
                  once is one too many to read — the motion belongs to the
                  product, not to the type. So all three beats are composed and
                  final from the first frame; the pin now exists only to hold
                  the frame steady while the prototype plays through its states.
                  Nothing here animates. */}
              {beats.map((b) => (
                <div key={b.key} className={p.ariaBeat}>
                  <p className={p.ariaKicker}>{b.kicker}</p>
                  <div className={p.ariaBody}><div>{b.body}</div></div>
                </div>
              ))}

            </div>

            {/* the callouts belong here and only here: the device is big and
                alone, so a leader can actually point at the region it names.
                They are present from the start — they are type, and the type
                no longer arrives. */}
            <div className={p.ariaStage}>
              <div className={`${p.ariaAnnot} ${p.annotL}`}>
                <p className={p.noteLabel}>{f.annots.l.label}</p>
                <p className={p.noteText}>{f.annots.l.text}</p>
                <span className={p.leader} aria-hidden="true" />
              </div>
              <div className={p.ariaArt}><Media f={f} /></div>
              <div className={`${p.ariaAnnot} ${p.annotR}`}>
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
