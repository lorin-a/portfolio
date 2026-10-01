'use client'

import { useEffect, useRef } from 'react'
import { birthPhoto, cloudImg } from '@/lib/cloudinary'
import { OVERVIEW, BRIEF, RESEARCH, ARCHITECTURE, ITERATION, FEATURES, VOICE, BRAND, OUTCOME, CLOSE } from './content'
import { IaV1, IaFinal } from '../IaDiagrams'
import FlowPlayer from './FlowPlayer'
import VSwitch from './VSwitch'
import { sys } from '../kit'
import s from './VCanvas.module.css'

/* ============================================================================
   DIRECTION H — THE CANVAS
   The draft's skeleton and cleanliness, drastically upgraded into 2026
   design-tool native: a cool near-white canvas with a fine dot grid, labeled
   frames with selection blue, FigJam-crisp stickies in the app's pastels,
   connector arrows, live cursors with name pills, and every piece of feedback
   where a designer would actually find it — as comment threads pinned to the
   work. Research and Iteration live fully on the canvas; the product presents
   as a design file; Visual design is a styles inspector; the client's verdict
   arrives as a comment. No paper, no tape, no yellow — vector-crisp
   throughout, with the app's teal and gradient as the only warm notes.
   UI microcopy (frame names, badges, cursor labels) is provisional furniture
   for Lorin's pass; body prose and quotes verbatim via the content module.
   ============================================================================ */

const AVATARS = {
  lorin: { initials: 'LA', name: 'Lorin', tone: 'teal' },
  michael: { initials: 'MJ', name: 'Michael', tone: 'peri' },
  sarah: { initials: 'SB', name: 'Sarah Burns', tone: 'blush' },
  parent: { initials: 'P', name: 'Parent tester', tone: 'slate' },
}

function Avatar({ who, small }) {
  const a = AVATARS[who]
  return <span className={`${s.avatar} ${s[`tone_${a.tone}`]} ${small ? s.avatarSm : ''}`} aria-hidden="true">{a.initials}</span>
}

function Cursor({ who, style }) {
  const a = AVATARS[who]
  return (
    <span className={`${s.cursor} ${s[`cursorTone_${a.tone}`]}`} style={style} aria-hidden="true">
      <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 3l14 8-6.5 1.5L9 19z" /></svg>
      <i>{a.name}</i>
    </span>
  )
}

/* a design-tool frame: name above the border, optional selected state */
function Frame({ name, selected, badge, className, children, style }) {
  return (
    <div className={`${s.frame} ${selected ? s.frameSelected : ''} ${className || ''}`} style={style}>
      <span className={s.frameName}>
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true"><path d="M3 1v10M9 1v10M1 3h10M1 9h10" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>
        {name}
        {badge && <b className={badge === 'shipped' ? s.badgeShip : s.badgeCut}>{badge}</b>}
      </span>
      {selected && (
        <>
          <i className={`${s.handle} ${s.hTL}`} aria-hidden="true" />
          <i className={`${s.handle} ${s.hTR}`} aria-hidden="true" />
          <i className={`${s.handle} ${s.hBL}`} aria-hidden="true" />
          <i className={`${s.handle} ${s.hBR}`} aria-hidden="true" />
        </>
      )}
      <div className={s.frameBody}>{children}</div>
    </div>
  )
}

function StickyNote({ tone = 'lilac', author = 'lorin', kicker, children, className, style }) {
  return (
    <div className={`${s.stickyNote} ${s[`sticky_${tone}`]} ${className || ''}`} style={style}>
      {kicker && <span className={s.stickyKicker}>{kicker}</span>}
      <p>{children}</p>
      <span className={s.stickyAuthor}><Avatar who={author} small /> {AVATARS[author].name}</span>
    </div>
  )
}

function CommentThread({ who, meta, text, className, style }) {
  return (
    <div className={`${s.comment} ${className || ''}`} style={style}>
      <div className={s.commentHead}>
        <Avatar who={who} small />
        <b>{AVATARS[who].name}</b>
        {meta && <span>{meta}</span>}
      </div>
      <p className={s.commentText}>{text}</p>
    </div>
  )
}

export default function VCanvas() {
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

  const fog = birthPhoto('fog', 1500, { grayscale: true })
  const feeding = birthPhoto('feeding', 1100)

  return (
    <div className={`${sys.case} ${s.page}`} ref={rootRef}>
      {/* file header — breadcrumb, title, presence */}
      <header className={s.fileBar} aria-hidden="true">
        <span className={s.crumb}>Drafts <i>/</i> Birth Story <i>/</i> case study</span>
        <span className={s.presence}>
          <Avatar who="lorin" small /><Avatar who="michael" small /><Avatar who="sarah" small />
        </span>
      </header>

      <section className={s.hero}>
        <h1 className={s.title}>Birth Story</h1>
        <p className={s.standfirst}>{OVERVIEW.lead}</p>
        <dl className={s.metaGrid}>
          {OVERVIEW.meta.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      </section>

      {/* 01 — Brief */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>01 · Brief</p>
        <h2 className={s.chTitle}>{BRIEF.lead}</h2>
        <p className={s.prose}>{BRIEF.prose[0]}</p>
        <div className={s.duo}>
          <div className={s.panel}>
            <p className={s.panelHead}>Required</p>
            {BRIEF.required.map(([k, v]) => (
              <div key={k} className={s.checkRow}>
                <span className={s.check} aria-hidden="true">✓</span>
                <span><b>{k}.</b> {v}</span>
              </div>
            ))}
            <p className={s.panelHead}>Optional · state = the week-5 call</p>
            <div className={s.chips}>
              <span className={s.chipKept}>Baby Book</span>
              <span className={s.chipCut}><s>Trackers</s></span>
              <span className={s.chipCut}><s>Birth Plan</s></span>
              <span className={s.chipKept}>Sharing</span>
              <span className={s.chipKept}>Partner Participation</span>
              <span className={s.chipAdded}>+ Search</span>
            </div>
          </div>
          <div>
            <div className={s.statCards}>
              {BRIEF.stakes.map(([fig, label]) => (
                <div key={fig} className={s.statCard}>
                  <span className={s.statFig}>{fig}</span>
                  <span className={s.statLabel}>{label}</span>
                </div>
              ))}
            </div>
            <p className={s.microNote}>{BRIEF.stakesSource}</p>
            <CommentThread who="lorin" meta="why I was close to this" text={BRIEF.connection} className={s.briefComment} />
          </div>
        </div>
      </section>

      {/* 02 — Research: THE CANVAS */}
      <section className={s.canvasSection} data-reveal>
        <div className={s.canvasHead}>
          <p className={s.kicker}>02 · Research</p>
          <h2 className={s.chTitle}>{RESEARCH.lead}</h2>
          <p className={s.prose}>{RESEARCH.prose[0]}</p>
        </div>
        <div className={s.canvas}>
          <span className={s.zoomPill} aria-hidden="true">research.canvas · 82%</span>

          <svg className={s.connectors} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 38 22 C 50 30, 58 42, 68 56" />
            <path d="M 58 20 C 64 32, 66 42, 71 52" />
            <path d="M 57 68 C 61 66, 64 64, 68 62" />
            <path d="M 26 62 C 30 66, 34 68, 38 68" />
          </svg>

          <Frame name="interviews / the group call" selected className={s.chatFrame}>
            <div className={s.chatBody}>
              {RESEARCH.wanted.map((w) => <p key={w} className={s.bubbleIn}>{w}</p>)}
              <p className={s.bubbleOut}>{RESEARCH.quote.text.replace(/^“|”$/g, '')}</p>
            </div>
            <p className={s.chatNote}>my three sisters · asks summarized, the quote verbatim</p>
          </Frame>

          <StickyNote tone="lilac" author="lorin" kicker="how they’d use it" className={s.sticky1}>
            {RESEARCH.usage[0]} {RESEARCH.usage[1]}
          </StickyNote>
          <StickyNote tone="sky" author="michael" kicker="and in the end" className={s.sticky2}>
            {RESEARCH.usage[2]}
          </StickyNote>

          <Frame name="img / the first hours" className={s.photoFrame}>
            <img src={feeding.src} alt="A mother holds her newborn skin to skin in a hospital bed, her eyes closed, in black and white." loading="lazy" draggable="false" />
            <p className={s.photoCap}>{feeding.byline}</p>
          </Frame>

          <CommentThread who="lorin" meta="my thinking" text={RESEARCH.insight} className={s.thinkComment} />

          <p className={s.marker} aria-hidden="true">less, not more!</p>

          <Frame name="synthesis / design values" className={s.valuesFrame}>
            <ol className={s.valuesList}>
              {RESEARCH.values.map(([cat, val]) => (
                <li key={cat}><b>{cat}</b><span>{val}</span></li>
              ))}
            </ol>
          </Frame>

          <Cursor who="michael" style={{ left: '60%', top: '38%' }} />
          <Cursor who="lorin" style={{ left: '80%', top: '48%' }} />
        </div>
      </section>

      {/* 03 — Architecture: two frames, one archived, one shipped */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>03 · Information architecture</p>
        <h2 className={s.chTitle}>{ARCHITECTURE.lead}</h2>
        <div className={s.iaGrid}>
          <div className={s.iaCol}>
            <Frame name="ia / v1" badge="archived">
              <IaV1 />
            </Frame>
            <CommentThread who="lorin" meta="on v1, after testing" text={ARCHITECTURE.insight} />
            <p className={s.capNote}>{ARCHITECTURE.capV1}</p>
          </div>
          <div className={s.iaCol}>
            <Frame name="ia / final" badge="shipped" selected>
              <IaFinal />
            </Frame>
            <p className={s.iaMove}><b>{ARCHITECTURE.move[0]}</b> {ARCHITECTURE.move[1]}</p>
            <p className={s.capNote}>{ARCHITECTURE.capFinal}</p>
          </div>
        </div>
        <div className={s.duo}>
          <p className={s.prose}>{ARCHITECTURE.prose1} {ARCHITECTURE.prose2}</p>
          <p className={s.prose}>{ARCHITECTURE.prose3}</p>
        </div>
      </section>

      {/* Iteration: three frames with the feedback pinned where it landed */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>Iteration</p>
        <h2 className={s.chTitle}>{ITERATION.lead}</h2>
        <p className={s.prose}>{ITERATION.intro}</p>
        <div className={s.roundGrid}>
          {ITERATION.rounds.map((r, ri) => (
            <div key={r.label} className={s.roundCol} data-reveal>
              <Frame name={`wireframes / v${ri + 1}`} badge={ri === 2 ? 'shipped' : undefined} selected={ri === 2}>
                <div className={s.roundShots}>
                  {r.shots.map(([id, cap]) => (
                    <img key={id} src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
                  ))}
                </div>
              </Frame>
              <p className={s.roundLabel}>{r.label}</p>
              <p className={s.roundChange}>{r.change}</p>
              {r.feedback && <CommentThread who="parent" meta="feedback · summarized" text={r.feedback} />}
              {r.friction && <CommentThread who="lorin" meta="what I couldn’t test" text={r.friction} />}
            </div>
          ))}
        </div>
        <Frame name="final review / the whiteboard" className={s.critFrame}>
          <img
            src={cloudImg('class_notes', 2000, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })}
            alt="A whiteboard from the final review: printed app screens taped up in two columns, covered in handwritten feedback."
            loading="lazy"
            draggable="false"
          />
          <p className={s.photoCap}>Every screen printed and marked up, with the gradient-versus-color-block decision worked out in red.</p>
        </Frame>
      </section>

      {/* 04 — The product: the design file */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>04 · The product</p>
        <h2 className={s.chTitle}>{FEATURES.lead}</h2>
        <div className={s.duo}>
          <p className={s.prose}>{FEATURES.intro}</p>
          <p className={s.prose}>{FEATURES.prioProse}</p>
        </div>
        {FEATURES.deepdives.map((f, i) => (
          <article key={f.name} className={`${s.featRow} ${i % 2 ? s.featFlip : ''}`} data-reveal>
            <div className={s.featText}>
              <h3 className={s.featName}>{f.name}</h3>
              <p className={s.featRole}>{f.role}</p>
              <p className={s.prose}>{f.prose}</p>
              <div className={s.propChips}>
                <span className={s.propChip}><b>{f.note[0]}</b> {f.note[1]}</span>
              </div>
              {f.quote && <CommentThread who="parent" meta="in testing" text={f.quote.text.replace(/^“|”$/g, '')} />}
            </div>
            <Frame name={`flows / ${f.name.toLowerCase()}`} className={s.featFrame}>
              <FlowPlayer frames={f.flow} name={f.name} />
            </Frame>
          </article>
        ))}
      </section>

      {/* 05 — UX writing: the rewrite as a reviewed change */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>05 · UX writing</p>
        <h2 className={s.chTitle}>{VOICE.lead}</h2>
        <div className={s.duo}>
          <div>
            {VOICE.prose.map((p) => <p key={p.slice(0, 24)} className={s.prose}>{p}</p>)}
          </div>
          <div className={s.voiceStack}>
            <CommentThread who="parent" meta="on the first draft" text={VOICE.quote.text.replace(/^“|”$/g, '')} />
            <div className={s.panel}>
              <p className={s.panelHead}>copy / revisions</p>
              {VOICE.rewrites.map(([a, b]) => (
                <p key={a} className={s.rewrite}>
                  <s>{a}</s>
                  <span>{b}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual design: the styles inspector */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>Visual design</p>
        <h2 className={s.chTitle}>{BRAND.lead}</h2>
        <div className={s.duo}>
          <div>
            <p className={s.prose}>{BRAND.prose}</p>
            <CommentThread who="lorin" meta="my thinking" text={BRAND.insight} />
          </div>
          <div className={s.stylesPanel}>
            <p className={s.panelHead}>Styles</p>
            <div className={s.gradientRow}>
              <i aria-hidden="true" />
              <span>gradient / birth-story</span>
            </div>
            {BRAND.palette.map(([hex, name]) => (
              <div key={hex} className={s.styleRow}>
                <i style={{ background: hex }} aria-hidden="true" />
                <span>color / {name}</span>
                <em>{hex}</em>
              </div>
            ))}
            {BRAND.type.map(([face, use]) => (
              <div key={face} className={s.styleRow}>
                <b aria-hidden="true">Ag</b>
                <span>type / {face}</span>
                <em>{use}</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 — Outcome: the client's comment */}
      <section className={s.chapter} data-reveal>
        <p className={s.kicker}>06 · Outcome</p>
        <h2 className={s.chTitle}>{OUTCOME.lead}</h2>
        <p className={s.prose}>{OUTCOME.prose}</p>
        <div className={s.finalComment}>
          <CommentThread who="sarah" meta="MSW, LSW · client · at the final review" text={OUTCOME.quote.text.replace(/^“|”$/g, '')} className={s.bigComment} />
        </div>
        <footer className={s.closing} data-reveal>
          <p className={s.closeLine}>{CLOSE.line}</p>
          <p className={s.closeSub}>{CLOSE.sub}</p>
          <div className={s.closeActions}>
            <a className={s.cta} href={CLOSE.email}>Get in touch</a>
            <a className={s.alt} href="/">See more work</a>
          </div>
        </footer>
      </section>

      <VSwitch active="canvas" />
    </div>
  )
}
