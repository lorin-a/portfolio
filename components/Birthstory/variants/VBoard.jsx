'use client'

import { useEffect, useRef } from 'react'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import { OVERVIEW, BRIEF, RESEARCH, ARCHITECTURE, ITERATION, FEATURES, VOICE, BRAND, OUTCOME, CLOSE } from './content'
import { IaV1, IaFinal } from '../IaDiagrams'
import FlowPlayer from './FlowPlayer'
import VSwitch from './VSwitch'
import { sys } from '../kit'
import s from './VBoard.module.css'

/* ============================================================================
   DIRECTION G — DIVERGE / CONVERGE
   The synthesis study. The page's home voice is the Print Issue's editorial
   register (folio marks, standfirsts, duotone photography — journalistic,
   clean). The mess is scoped to where mess actually happened: Research breaks
   the grid as a real working board — pinned group text, index cards, red
   thread — then the layout converges as the project does. Architecture is
   half board, half grid; the three iteration clusters straighten round by
   round; the product arrives on a composed grid, and only then does the app's
   gradient bloom in. The form narrates Dezudio's diverge/converge without
   saying a word about it.
   Scrawl annotations + tape labels are provisional furniture for Lorin's
   pass; body prose and quotes verbatim via the shared content module.
   ============================================================================ */

function Folio({ no, title, tag }) {
  return (
    <div className={s.folio}>
      <span className={s.folioNo}>№ {no}</span>
      <span className={s.folioRule} aria-hidden="true" />
      <span className={s.folioTitle}>{title}</span>
      {tag && <span className={s.folioTag}>{tag}</span>}
    </div>
  )
}

function Pin() {
  return <span className={s.pin} aria-hidden="true" />
}

export default function VBoard() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = rootRef.current?.querySelectorAll('[data-reveal]')
    if (!els?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add(s.in); io.unobserve(en.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const fog = birthPhoto('fog', 1600, { grayscale: true })
  const feeding = birthPhoto('feeding', 1100)

  return (
    <div className={`${sys.case} ${s.page}`} ref={rootRef}>
      {/* masthead — editorial, composed. The conceit stated once, quietly. */}
      <header className={s.cover}>
        <p className={s.issueLine}>A case study in six chapters · Carnegie Mellon × Myana · six weeks</p>
        <h1 className={s.masthead}>Birth Story</h1>
        <p className={s.standfirst}>{OVERVIEW.lead}</p>
        <p className={s.conceit}>The layout follows the process: research breaks the grid, and the product earns it back.</p>
        <dl className={s.coverMeta}>
          {OVERVIEW.meta.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </header>

      {/* 01 — Brief: editorial. The handed spec is a tidy document; the page is still tidy. */}
      <section className={s.chapter} data-reveal>
        <Folio no="01" title="Brief" tag="as handed to us" />
        <h2 className={s.chTitle}>{BRIEF.lead}</h2>
        <div className={s.cols}>
          <p>{BRIEF.prose[0]}</p>
          <p>{BRIEF.connection}</p>
        </div>
        <div className={s.statCards} data-reveal>
          {BRIEF.stakes.map(([fig, label]) => (
            <div key={fig} className={s.statCard}>
              <span className={s.statFig}>{fig}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
        </div>
        <p className={s.microNote}>{BRIEF.stakesSource}</p>
        <figure className={`${s.plate} ${s.duo}`} data-reveal>
          <img src={fog.src} alt="A parent rests cheek to cheek with a swaddled newborn in the hours just after birth." loading="lazy" draggable="false" />
          <figcaption>A parent and newborn in the hours after birth. Photograph, {fog.byline}.</figcaption>
        </figure>
      </section>

      {/* 02 — Research: THE BOARD. The grid breaks here, because this is where it broke. */}
      <section className={s.boardSection} data-reveal>
        <div className={s.boardHead}>
          <Folio no="02" title="Research" tag="diverge — the board" />
        </div>
        <div className={s.board}>
          {/* red thread: evidence → values */}
          <svg className={s.thread} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 57 24 C 66 34, 72 40, 80 52" />
            <path d="M 46 66 C 56 62, 64 58, 76 56" />
            <path d="M 22 86 C 42 82, 60 70, 75 62" />
            <path d="M 18 62 C 24 64, 30 64, 35 62" />
          </svg>

          <div className={`${s.boardItem} ${s.leadSheet}`} style={{ '--tilt': '-0.5deg' }}>
            <span className={s.tapeCorner} aria-hidden="true" />
            <h2 className={s.boardTitle}>{RESEARCH.lead}</h2>
            <p className={s.boardProse}>{RESEARCH.prose[0]}</p>
          </div>

          {/* the group text, printed and pinned — the call where the project turned */}
          <div className={`${s.boardItem} ${s.chatSheet}`} style={{ '--tilt': '-1.3deg' }}>
            <Pin />
            <p className={s.chatHead}>the group call · my three sisters</p>
            <div className={s.chatBody}>
              {RESEARCH.wanted.map((w) => <p key={w} className={s.bubbleIn}>{w}</p>)}
              <p className={s.bubbleOut}>{RESEARCH.quote.text.replace(/^“|”$/g, '')}</p>
            </div>
            <p className={s.chatNote}>their asks summarized · the quote verbatim</p>
          </div>

          <figure className={`${s.boardItem} ${s.polaroid}`} style={{ '--tilt': '1.7deg' }}>
            <Pin />
            <img src={feeding.src} alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed, in black and white." loading="lazy" draggable="false" />
            <figcaption>The first hours. {feeding.byline}</figcaption>
          </figure>

          <blockquote className={`${s.boardItem} ${s.indexCard} ${s.card1}`} style={{ '--tilt': '-1deg' }}>
            <Pin />
            <span className={s.cardKicker}>how they’d use it</span>
            <p>{RESEARCH.usage[0]} {RESEARCH.usage[1]}</p>
          </blockquote>

          <blockquote className={`${s.boardItem} ${s.indexCard} ${s.card2}`} style={{ '--tilt': '0.9deg' }}>
            <Pin />
            <span className={s.cardKicker}>and in the end</span>
            <p>{RESEARCH.usage[2]}</p>
          </blockquote>

          <aside className={`${s.boardItem} ${s.sticky}`} style={{ '--tilt': '-1.6deg' }}>
            <span className={s.stickyLabel}>my thinking</span>
            <p>{RESEARCH.insight}</p>
          </aside>

          <p className={`${s.boardItem} ${s.scrawl}`} style={{ '--tilt': '-2.5deg' }} aria-hidden="true">
            less, not more!
          </p>

          {/* where the thread ends: the four values, already half-composed */}
          <div className={`${s.boardItem} ${s.valuesSheet}`} style={{ '--tilt': '0.5deg' }}>
            <span className={s.tapeCorner} aria-hidden="true" />
            <p className={s.valuesHead}>what it all pointed to · our design values</p>
            <ol className={s.valuesList}>
              {RESEARCH.values.map(([cat, val]) => (
                <li key={cat}><b>{cat}</b><span>{val}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 03 — Architecture: half board, half grid. The page starts converging. */}
      <section className={s.chapter} data-reveal>
        <Folio no="03" title="Information architecture" tag="converging" />
        <h2 className={s.chTitle}>{ARCHITECTURE.lead}</h2>
        <div className={s.halfsplit}>
          <div className={s.halfMess}>
            <div className={s.taped} style={{ '--tilt': '-1.2deg' }}>
              <span className={s.tapeCorner} aria-hidden="true" />
              <IaV1 />
              <p className={s.redScrawl} aria-hidden="true">4 questions before anything?? cut.</p>
            </div>
            <p className={s.halfCap}>{ARCHITECTURE.capV1}</p>
          </div>
          <div className={s.halfClean}>
            <div className={s.cleanPanel}>
              <IaFinal />
            </div>
            <p className={s.halfCap}>{ARCHITECTURE.capFinal}</p>
            <p className={s.iaMove}><b>{ARCHITECTURE.move[0]}</b> {ARCHITECTURE.move[1]}</p>
          </div>
        </div>
        <div className={s.cols}>
          <p>{ARCHITECTURE.prose1} {ARCHITECTURE.insight}</p>
          <p>{ARCHITECTURE.prose2} {ARCHITECTURE.prose3}</p>
        </div>
      </section>

      {/* Iteration: the clusters straighten as the app calms down. */}
      <section className={s.chapter} data-reveal>
        <Folio no="03·b" title="Iteration" tag="still converging" />
        <h2 className={s.chTitle}>{ITERATION.lead}</h2>
        <p className={s.introProse}>{ITERATION.intro}</p>
        <div className={s.calmRow}>
          {ITERATION.rounds.map((r, ri) => (
            <div key={r.label} className={`${s.calmCluster} ${[s.calm0, s.calm1, s.calm2][ri]}`} data-reveal>
              <p className={s.calmLabel}>{r.label}</p>
              <div className={s.calmShots}>
                {r.shots.map(([id, cap], si) => (
                  <figure key={id} className={s.calmShot} style={{ '--tilt': `${[[-2.2, 1.6, -1][si], [-0.8, 0.6, -0.4][si], [0, 0, 0][si]][ri]}deg` }}>
                    <img src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
                  </figure>
                ))}
              </div>
              <p className={s.calmChange}>{r.change}</p>
              {r.feedback && (
                <blockquote className={`${s.indexCard} ${s.calmCard}`} style={{ '--tilt': ri === 0 ? '-1.2deg' : '0deg' }}>
                  <span className={s.cardKicker}>the feedback · summarized</span>
                  <p>{r.feedback}</p>
                </blockquote>
              )}
              {r.friction && (
                <div className={s.frictionBox}>
                  <b>What I couldn’t test.</b> {r.friction}
                </div>
              )}
            </div>
          ))}
        </div>
        <figure className={`${s.plate} ${s.duo}`} data-reveal>
          <img
            src={cloudImg('class_notes', 2000, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })}
            alt="A whiteboard from the final review: printed app screens taped up in two columns, covered in handwritten feedback."
            loading="lazy"
            draggable="false"
          />
          <figcaption>The final review: every screen printed and marked up, with the gradient-versus-color-block decision worked out in red.</figcaption>
        </figure>
      </section>

      {/* 04 — The product: converged. Clean grid, and the app's gradient blooms in. */}
      <section className={s.chapter} data-reveal>
        <Folio no="04" title="The product" tag="converged" />
        <h2 className={s.chTitle}>{FEATURES.lead}</h2>
        <div className={s.cols}>
          <p>{FEATURES.intro}</p>
          <p>{FEATURES.prioProse}</p>
        </div>
        <div className={s.statCards} data-reveal>
          {FEATURES.prio.map(([fig, label, names]) => (
            <div key={label} className={s.statCard}>
              <span className={s.statFig}>{fig}</span>
              <span className={s.statLabel}><b>{label}</b> · {names}</span>
            </div>
          ))}
        </div>
        {FEATURES.deepdives.map((f, i) => (
          <article key={f.name} className={`${s.featRow} ${i % 2 ? s.featFlip : ''}`} data-reveal>
            <div className={s.featText}>
              <h3 className={s.featName}>{f.name}</h3>
              <p className={s.featRole}>{f.role}</p>
              <p className={s.featProse}>{f.prose}</p>
              {f.quote && (
                <blockquote className={s.pullSmall}>
                  <p>{f.quote.text}</p>
                  <cite>{f.quote.who}</cite>
                </blockquote>
              )}
            </div>
            <div className={s.featStage}>
              <FlowPlayer frames={f.flow} name={f.name} />
            </div>
          </article>
        ))}
      </section>

      {/* 05 — UX writing: composed, with the marker's one comeback. */}
      <section className={s.chapter} data-reveal>
        <Folio no="05" title="UX writing" />
        <h2 className={s.chTitle}>{VOICE.lead}</h2>
        <div className={s.cols}>
          {VOICE.prose.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <blockquote className={s.pull}>
          <p>{VOICE.quote.text}</p>
          <cite>{VOICE.quote.who}</cite>
        </blockquote>
        <div className={s.rewrites} data-reveal>
          {VOICE.rewrites.map(([a, b]) => (
            <p key={a} className={s.rewrite}>
              <s>{a}</s>
              <span>{b}</span>
            </p>
          ))}
        </div>
      </section>

      {/* Visual design: the gradient arrives in full. */}
      <section className={s.brandBand} data-reveal>
        <div className={s.brandInner}>
          <img className={s.brandMark} src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story wordmark, set in Terfens" width="267" height="54" draggable="false" />
          <p className={s.brandLead}>{BRAND.lead}</p>
          <p className={s.brandProse}>{BRAND.prose} {BRAND.insight}</p>
          <div className={s.brandDots} aria-hidden="true">
            {BRAND.palette.map(([hex]) => <i key={hex} style={{ background: hex }} />)}
          </div>
          <p className={s.brandNote}>{BRAND.gradientNote}</p>
        </div>
      </section>

      {/* 06 — Outcome: editorial finale. */}
      <section className={s.chapter} data-reveal>
        <Folio no="06" title="Outcome" />
        <h2 className={s.chTitle}>{OUTCOME.lead}</h2>
        <div className={s.cols}>
          <p>{OUTCOME.prose}</p>
        </div>
        <blockquote className={s.finale}>
          <p>{OUTCOME.quote.text}</p>
          <cite>{OUTCOME.quote.who}</cite>
        </blockquote>
        <footer className={s.closing} data-reveal>
          <p className={s.closeLine}>{CLOSE.line}</p>
          <p className={s.closeSub}>{CLOSE.sub}</p>
          <div className={s.closeActions}>
            <a href={CLOSE.email}>Get in touch</a>
            <a href="/">See more work</a>
          </div>
        </footer>
      </section>

      <VSwitch active="board" />
    </div>
  )
}
