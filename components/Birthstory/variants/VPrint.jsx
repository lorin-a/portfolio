'use client'

import { useEffect, useRef } from 'react'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import { OVERVIEW, BRIEF, RESEARCH, ARCHITECTURE, ITERATION, FEATURES, VOICE, BRAND, OUTCOME, CLOSE } from './content'
import { IaV1, IaFinal } from '../IaDiagrams'
import VSwitch from './VSwitch'
import { sys } from '../kit'
import s from './VPrint.module.css'

/* ============================================================================
   DIRECTION D — THE PRINT ISSUE
   Same skeleton, rendered as a designed magazine feature. Hierarchy is carried
   entirely by the type system: folio marks, standfirsts, two-column body text,
   pull quotes, numbered plates. Photography runs duotone (ink + the teal spot
   color); screens are presented flat as plates — print doesn't do device
   chrome. The copy rewrites are set as an errata block, because that is what
   they are. One spot color, ink, and paper. No cards, no UI furniture.
   Folio lines and plate numbers are provisional furniture for Lorin's pass.
   ============================================================================ */

function Folio({ no, title }) {
  return (
    <div className={s.folio}>
      <span className={s.folioNo}>№ {no}</span>
      <span className={s.folioRule} aria-hidden="true" />
      <span className={s.folioTitle}>{title}</span>
    </div>
  )
}

function Plate({ no, src, alt, cap, duo, wide, children }) {
  return (
    <figure className={`${s.plate} ${wide ? s.plateWide : ''}`}>
      {children ? (
        <div className={s.plateArt}>{children}</div>
      ) : (
        <div className={`${s.plateArt} ${duo ? s.duo : ''}`}>
          <img src={src} alt={alt} loading="lazy" draggable="false" />
        </div>
      )}
      <figcaption className={s.plateCap}>
        <b>Plate {no}</b> — {cap}
      </figcaption>
    </figure>
  )
}

function PullQuote({ text, who }) {
  return (
    <blockquote className={s.pull}>
      <p>{text}</p>
      {who && <cite>{who}</cite>}
    </blockquote>
  )
}

export default function VPrint() {
  const rootRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const els = rootRef.current?.querySelectorAll('[data-reveal]')
    if (!els?.length) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add(s.in); io.unobserve(en.target) }
      }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const fog = birthPhoto('fog', 1600, { grayscale: true })
  const feeding = birthPhoto('feeding', 1400)

  return (
    /* sys.case supplies the --bs-* tokens the inlined IA diagrams depend on;
       .page re-declares surface + ink so the print register stays in charge */
    <div className={`${sys.case} ${s.page}`} ref={rootRef}>
      {/* masthead — the issue cover */}
      <header className={s.cover}>
        <p className={s.issueLine}>A case study in six chapters · Carnegie Mellon × Myana · six weeks</p>
        <h1 className={s.masthead}>Birth Story</h1>
        <p className={s.standfirst}>{OVERVIEW.lead}</p>
        <dl className={s.coverMeta}>
          {OVERVIEW.meta.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </header>

      {/* 01 — Brief */}
      <section className={s.chapter} data-reveal>
        <Folio no="01" title="Brief" />
        <h2 className={s.chTitle}>{BRIEF.lead}</h2>
        <div className={s.cols}>
          <p>{BRIEF.prose[0]}</p>
          <p>{BRIEF.connection}</p>
        </div>
        <div className={s.statRow} data-reveal>
          {BRIEF.stakes.map(([fig, label]) => (
            <div key={fig} className={s.stat}>
              <span className={s.statFig}>{fig}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
          <p className={s.statSource}>{BRIEF.stakesSource}</p>
        </div>
        <div className={s.specSheet} data-reveal>
          <div>
            <p className={s.specHead}>Required</p>
            <ul className={s.specList}>
              {BRIEF.required.map(([k, v]) => <li key={k}><b>{k}.</b> {v}</li>)}
            </ul>
          </div>
          <div>
            <p className={s.specHead}>Provided · five optional features</p>
            <ul className={s.specList}>
              {BRIEF.provided.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
        <Plate no="I" duo src={fog.src} alt="A parent rests cheek to cheek with a swaddled newborn in the hours just after birth." cap={<>A parent and newborn in the hours after birth. Photograph, {fog.byline}.</>} wide />
      </section>

      {/* 02 — Research */}
      <section className={s.chapter} data-reveal>
        <Folio no="02" title="Research" />
        <h2 className={s.chTitle}>{RESEARCH.lead}</h2>
        <div className={s.cols}>
          <p>{RESEARCH.prose[0]}</p>
          <p>{RESEARCH.insight}</p>
        </div>
        <PullQuote text={RESEARCH.quote.text} who={RESEARCH.quote.who} />
        <div className={s.specSheet} data-reveal>
          <div>
            <p className={s.specHead}>What they wanted</p>
            <ul className={s.specList}>{RESEARCH.wanted.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
          <div>
            <p className={s.specHead}>How they’d use it</p>
            <ul className={s.specList}>{RESEARCH.usage.map((u) => <li key={u}>{u}</li>)}</ul>
          </div>
        </div>
        {/* the manifest — the four values as a numbered print manifest */}
        <ol className={s.manifest} data-reveal>
          {RESEARCH.values.map(([cat, val], i) => (
            <li key={cat}>
              <span className={s.manNo}>{i + 1}</span>
              <span className={s.manCat}>{cat}</span>
              <span className={s.manVal}>{val}</span>
            </li>
          ))}
        </ol>
        <Plate no="II" duo src={feeding.src} alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed." cap={<>A parent and newborn in the first hours after birth. Photograph, {feeding.byline}.</>} />
      </section>

      {/* 03 — Architecture */}
      <section className={s.chapter} data-reveal>
        <Folio no="03" title="Information architecture" />
        <h2 className={s.chTitle}>{ARCHITECTURE.lead}</h2>
        <div className={s.cols}>
          <p>{ARCHITECTURE.prose1} {ARCHITECTURE.insight}</p>
          <p>{ARCHITECTURE.prose2}</p>
          <p>{ARCHITECTURE.prose3}</p>
        </div>
        <div className={s.iaMove} data-reveal>
          <span className={s.iaFig}>{ARCHITECTURE.move[0]}</span>
          <span className={s.iaLabel}>{ARCHITECTURE.move[1]}</span>
        </div>
        <Plate no="III" cap={ARCHITECTURE.capV1} wide><IaV1 /></Plate>
        <Plate no="IV" cap={ARCHITECTURE.capFinal} wide><IaFinal /></Plate>
      </section>

      {/* Iteration — the contact sheet */}
      <section className={s.chapter} data-reveal>
        <Folio no="03·b" title="Iteration" />
        <h2 className={s.chTitle}>{ITERATION.lead}</h2>
        <div className={s.cols}>
          <p>{ITERATION.intro}</p>
        </div>
        {/* contact sheet — all three rounds as one filmstrip, frame numbers running */}
        <div className={s.contactSheet} data-reveal>
          {ITERATION.rounds.map((r, ri) => (
            <div key={r.label} className={s.sheetGroup}>
              <p className={s.sheetLabel}>{r.label}</p>
              <div className={s.sheetRow}>
                {r.shots.map(([id, cap], si) => (
                  <figure key={id} className={s.frame}>
                    <span className={s.frameNo}>{String(ri * 3 + si + 1).padStart(2, '0')}</span>
                    <img src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
                  </figure>
                ))}
              </div>
              <p className={s.sheetChange}>{r.change}</p>
              {r.feedback && (
                <p className={s.sheetNote}><b>The feedback, summarized.</b> {r.feedback}</p>
              )}
              {r.friction && <p className={s.sheetNote}><b>What I couldn’t test.</b> {r.friction}</p>}
            </div>
          ))}
        </div>
        <Plate
          no="V"
          duo
          src={cloudImg('class_notes', 2000, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })}
          alt="A whiteboard from the final review: printed app screens taped up in two columns, covered in handwritten feedback."
          cap="The final review: every screen printed and marked up, with the gradient-versus-color-block decision worked out in red."
          wide
        />
      </section>

      {/* 04 — The product */}
      <section className={s.chapter} data-reveal>
        <Folio no="04" title="The product" />
        <h2 className={s.chTitle}>{FEATURES.lead}</h2>
        <div className={s.cols}>
          <p>{FEATURES.intro}</p>
          <p>{FEATURES.prioProse}</p>
        </div>
        <div className={s.prioLine} data-reveal>
          {FEATURES.prio.map(([fig, label, names]) => (
            <span key={label} className={s.prioItem}>
              <b>{fig}</b> {label} <i>({names})</i>
            </span>
          ))}
        </div>
        {FEATURES.deepdives.map((f, i) => (
          <article key={f.name} className={s.featSpread} data-reveal>
            <div className={s.featText}>
              <h3 className={s.featName}>{f.name}</h3>
              <p className={s.featRole}>{f.role}</p>
              <p className={s.featProse}>{f.prose}</p>
              {f.quote && <PullQuote text={f.quote.text} who={f.quote.who} />}
            </div>
            <div className={s.featPlates}>
              {f.flow.map(([src, alt], j) => (
                <figure key={src} className={s.featPlate}>
                  <img src={src} alt={alt} loading="lazy" draggable="false" />
                  <figcaption><b>Plate {['VI', 'VII', 'VIII', 'IX', 'X'][i]}·{j + 1}</b> — {alt}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </section>

      {/* 05 — UX writing, with the rewrites set as errata */}
      <section className={s.chapter} data-reveal>
        <Folio no="05" title="UX writing" />
        <h2 className={s.chTitle}>{VOICE.lead}</h2>
        <div className={s.cols}>
          {VOICE.prose.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
        </div>
        <PullQuote text={VOICE.quote.text} who={VOICE.quote.who} />
        <div className={s.errata} data-reveal>
          <p className={s.errataHead}>Errata</p>
          {VOICE.rewrites.map(([a, b]) => (
            <p key={a} className={s.erratum}>
              For <s>{a}</s> read <b>{b}</b>.
            </p>
          ))}
        </div>
      </section>

      {/* 05·b — Visual design */}
      <section className={s.chapter} data-reveal>
        <Folio no="05·b" title="Visual design" />
        <h2 className={s.chTitle}>{BRAND.lead}</h2>
        <div className={s.cols}>
          <p>{BRAND.prose}</p>
          <p>{BRAND.insight}</p>
        </div>
        <div className={s.inkSpec} data-reveal>
          <p className={s.specHead}>Inks</p>
          <div className={s.inkRow}>
            {BRAND.palette.map(([hex, name]) => (
              <span key={hex} className={s.ink}>
                <i style={{ background: hex }} />
                <em>{name}</em>
              </span>
            ))}
          </div>
          <p className={s.specHead}>Faces</p>
          {BRAND.type.map(([face, use]) => (
            <p key={face} className={s.face}><b>{face}</b> — {use}</p>
          ))}
        </div>
        <Plate no="XI" src="/images/birthstory/moodboard.png" alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books." cap={BRAND.moodboardCap} wide />
      </section>

      {/* 06 — Outcome */}
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
        <footer className={s.colophon} data-reveal>
          <p className={s.closeLine}>{CLOSE.line}</p>
          <p className={s.closeSub}>{CLOSE.sub}</p>
          <div className={s.closeActions}>
            <a href={CLOSE.email}>Get in touch</a>
            <a href="/">See more work</a>
          </div>
          <p className={s.endMark} aria-hidden="true">■</p>
        </footer>
      </section>

      <VSwitch active="print" />
    </div>
  )
}
