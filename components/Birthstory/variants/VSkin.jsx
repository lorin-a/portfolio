'use client'

import { useEffect, useRef, useState } from 'react'
import { sys } from '../kit'
import { OVERVIEW, BRIEF, RESEARCH, ARCHITECTURE, ITERATION, FEATURES, VOICE, BRAND, OUTCOME, CLOSE } from './content'
import VSwitch from './VSwitch'
import s from './VSkin.module.css'

/* ============================================================================
   DIRECTION E — THE PRODUCT SKIN
   Same skeleton, told in Birth Story's own design system. Information is
   rendered AS interface: the brief's optional features are selectable chips
   whose states carry the prioritization (kept = selected, added = new, cut =
   disabled); iteration is a tappable V1/V2/V3 segmented control; each feature
   plays its real screens as an auto-advancing flow (the case study's "video"
   register, honest about being screens); the client's verdict arrives as a
   push notification. The full app palette is deployed, not swatched.
   UI microcopy labels are provisional furniture for Lorin's pass.
   ============================================================================ */

/* auto-advancing screen flow inside a device — plays once in view, loops
   gently, pauses on hover/focus; reduced motion shows the first frame with
   dots as manual buttons */
function FlowPlayer({ frames, name }) {
  const [i, setI] = useState(0)
  const [live, setLive] = useState(false)
  const hostRef = useRef(null)
  const reduced = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced.current) return
    const io = new IntersectionObserver(
      ([en]) => setLive(en.isIntersecting),
      { threshold: 0.4 }
    )
    if (hostRef.current) io.observe(hostRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live) return
    const t = setInterval(() => setI((v) => (v + 1) % frames.length), 2400)
    return () => clearInterval(t)
  }, [live, frames.length])

  return (
    <div
      className={s.flow}
      ref={hostRef}
      onMouseEnter={() => setLive(false)}
      onMouseLeave={() => { if (!reduced.current) setLive(true) }}
    >
      <span className={`${sys.phone} ${s.flowDevice}`}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={`${sys.phoneScreen} ${s.flowScreen}`}>
          {frames.map(([src, alt], j) => (
            <img
              key={src}
              src={src}
              alt={alt}
              loading="lazy"
              draggable="false"
              className={j === i ? s.frameOn : s.frameOff}
              aria-hidden={j !== i}
            />
          ))}
        </span>
      </span>
      <div className={s.dots} role="group" aria-label={`${name} flow steps`}>
        {frames.map(([src, alt], j) => (
          <button
            key={src}
            type="button"
            className={j === i ? s.dotOn : s.dot}
            aria-label={alt}
            aria-current={j === i}
            onClick={() => { setLive(false); setI(j) }}
          />
        ))}
      </div>
    </div>
  )
}

function Bubble({ text, who, out }) {
  return (
    <div className={out ? s.bubbleOut : s.bubbleIn}>
      <p>{text}</p>
      {who && <span>{who}</span>}
    </div>
  )
}

export default function VSkin() {
  const [round, setRound] = useState(0)
  const r = ITERATION.rounds[round]

  return (
    <div className={`${sys.case} ${s.page}`}>
      {/* masthead — the app's own surface */}
      <header className={s.hero}>
        <img className={s.heroMark} src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story" width="267" height="54" draggable="false" />
        <p className={s.heroLine}>{OVERVIEW.lead}</p>
        <p className={s.heroNote}>A case study told in the app’s own design system.</p>
      </header>

      {/* overview — a settings-style profile card */}
      <section className={s.wrap}>
        <div className={s.profileCard}>
          {OVERVIEW.meta.map(([k, v]) => (
            <div key={k} className={s.profileRow}>
              <span className={s.profileKey}>{k}</span>
              <span className={s.profileVal}>{v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 01 — Brief: requirements as checklist, options as chips whose state IS the decision */}
      <section className={s.wrap}>
        <p className={s.kicker}>01 · Brief</p>
        <h2 className={s.title}>{BRIEF.lead}</h2>
        <p className={s.prose}>{BRIEF.prose[0]}</p>
        <div className={s.card}>
          <p className={s.cardHead}>Required</p>
          {BRIEF.required.map(([k, v]) => (
            <div key={k} className={s.checkRow}>
              <span className={s.check} aria-hidden="true">✓</span>
              <span><b>{k}.</b> {v}</span>
            </div>
          ))}
          <p className={s.cardHead}>Optional · chip state = what I decided in week 5</p>
          <div className={s.chips}>
            <span className={s.chipKept}>Baby Book · kept</span>
            <span className={s.chipCut}><s>Trackers</s> · cut</span>
            <span className={s.chipCut}><s>Birth Plan</s> · cut</span>
            <span className={s.chipKept}>Sharing · kept</span>
            <span className={s.chipKept}>Partner Participation · kept</span>
            <span className={s.chipAdded}>+ Search · my addition</span>
          </div>
        </div>
        <div className={s.statCards}>
          {BRIEF.stakes.map(([fig, label]) => (
            <div key={fig} className={s.statCard}>
              <span className={s.statFig}>{fig}</span>
              <span className={s.statLabel}>{label}</span>
            </div>
          ))}
        </div>
        <p className={s.microNote}>{BRIEF.stakesSource}</p>
        <div className={s.noteCard}>
          <p className={s.cardHead}>{BRIEF.connectionLabel}</p>
          <p className={s.noteText}>{BRIEF.connection}</p>
        </div>
      </section>

      {/* 02 — Research: quotes as a message thread, values as onboarding cards */}
      <section className={s.wrap}>
        <p className={s.kicker}>02 · Research</p>
        <h2 className={s.title}>{RESEARCH.lead}</h2>
        <p className={s.prose}>{RESEARCH.prose[0]}</p>
        <div className={s.thread}>
          <p className={s.threadLabel}>what they told me · summarized</p>
          {RESEARCH.wanted.map((w) => <Bubble key={w} text={w} />)}
          <Bubble out text={RESEARCH.quote.text.replace(/^“|”$/g, '')} who={RESEARCH.quote.who} />
        </div>
        <div className={s.noteCard}>
          <p className={s.cardHead}>My thinking</p>
          <p className={s.noteText}>{RESEARCH.insight}</p>
        </div>
        <div className={s.onboardRow}>
          {RESEARCH.values.map(([cat, val], i) => (
            <div key={cat} className={s.onboardCard}>
              <span className={s.onboardStep}>{i + 1} / 4</span>
              <p className={s.onboardCat}>{cat}</p>
              <p className={s.onboardVal}>{val}</p>
              <span className={s.onboardDots} aria-hidden="true">
                {[0, 1, 2, 3].map((d) => <i key={d} className={d === i ? s.odOn : undefined} />)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — Architecture: the decision as two app states */}
      <section className={s.wrap}>
        <p className={s.kicker}>03 · Information architecture</p>
        <h2 className={s.title}>{ARCHITECTURE.lead}</h2>
        <p className={s.prose}>{ARCHITECTURE.prose1} {ARCHITECTURE.insight}</p>
        <div className={s.iaPair}>
          <div className={`${s.card} ${s.iaCard}`}>
            <p className={s.cardHead}>v1 · the form at the front desk</p>
            <div className={s.formMock}>
              {['Are you before, during, or after the birth?', 'Are you at home or in the hospital?', 'Who is filling this out?', 'What would you like to track?'].map((q, i) => (
                <div key={q} className={s.formRow}><span>{i + 1}</span>{q}</div>
              ))}
            </div>
          </div>
          <div className={s.iaMove} aria-hidden="true">
            <b>{ARCHITECTURE.move[0]}</b>
            <span>{ARCHITECTURE.move[1]}</span>
          </div>
          <div className={`${s.card} ${s.iaCard}`}>
            <p className={s.cardHead}>final · nothing to answer first</p>
            <div className={s.tabMock}>
              {['story', 'pod', '+', 'reflect', 'book'].map((t) => (
                <span key={t} className={t === '+' ? s.tabAdd : s.tab}>{t}</span>
              ))}
            </div>
            <p className={s.microNote}>{ARCHITECTURE.capFinal}</p>
          </div>
        </div>
        <p className={s.prose}>{ARCHITECTURE.prose2}</p>
        <p className={s.prose}>{ARCHITECTURE.prose3}</p>
      </section>

      {/* Iteration — a real segmented control; tap the versions */}
      <section className={s.wrap}>
        <p className={s.kicker}>Iteration</p>
        <h2 className={s.title}>{ITERATION.lead}</h2>
        <p className={s.prose}>{ITERATION.intro}</p>
        <div className={s.segmented} role="tablist" aria-label="Wireframe versions">
          {ITERATION.rounds.map((rd, i) => (
            <button
              key={rd.label}
              type="button"
              role="tab"
              aria-selected={i === round}
              className={i === round ? s.segOn : s.seg}
              onClick={() => setRound(i)}
            >
              V{i + 1}
            </button>
          ))}
        </div>
        <div className={s.roundPane}>
          <div className={s.roundCopy}>
            <p className={s.cardHead}>{r.label}</p>
            <p className={s.prose}>{r.change}</p>
            {r.feedback && (
              <div className={s.feedbackCard}>
                <p className={s.cardHead}>the feedback · summarized</p>
                <p className={s.noteText}>{r.feedback}</p>
              </div>
            )}
            {r.friction && (
              <div className={s.feedbackCard}>
                <p className={s.cardHead}>what I couldn’t test</p>
                <p className={s.noteText}>{r.friction}</p>
              </div>
            )}
          </div>
          <div className={s.roundShots}>
            {r.shots.map(([id, cap]) => (
              <figure key={id} className={s.shot}>
                <span className={sys.phone} style={{ width: '100%' }}>
                  <span className={sys.phoneNotch} aria-hidden="true" />
                  <span className={sys.phoneScreen}>
                    <img src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
                  </span>
                </span>
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — The product: five feature cards, each playing its real flow */}
      <section className={s.wrap}>
        <p className={s.kicker}>04 · The product</p>
        <h2 className={s.title}>{FEATURES.lead}</h2>
        <p className={s.prose}>{FEATURES.intro}</p>
        <p className={s.prose}>{FEATURES.prioProse}</p>
        {FEATURES.deepdives.map((f) => (
          <article key={f.name} className={s.featCard}>
            <div className={s.featCopy}>
              <h3 className={s.featName}>{f.name}</h3>
              <p className={s.featRole}>{f.role}</p>
              <p className={s.prose}>{f.prose}</p>
              <div className={s.featNote}>
                <b>{f.note[0]}</b>
                <span>{f.note[1]}</span>
              </div>
              {f.quote && <Bubble out text={f.quote.text.replace(/^“|”$/g, '')} who={f.quote.who} />}
            </div>
            <FlowPlayer frames={f.flow} name={f.name} />
          </article>
        ))}
      </section>

      {/* 05 — UX writing: the rewrite as a text field being corrected */}
      <section className={s.wrap}>
        <p className={s.kicker}>05 · UX writing</p>
        <h2 className={s.title}>{VOICE.lead}</h2>
        {VOICE.prose.map((p) => <p key={p.slice(0, 24)} className={s.prose}>{p}</p>)}
        <div className={s.thread}>
          <Bubble text={VOICE.quote.text.replace(/^“|”$/g, '')} who={VOICE.quote.who} />
        </div>
        <div className={s.fieldStack}>
          {VOICE.rewrites.map(([a, b]) => (
            <div key={a} className={s.field}>
              <span className={s.fieldLabel}>draft</span>
              <s className={s.fieldOld}>{a}</s>
              <span className={s.fieldLabel}>shipped</span>
              <span className={s.fieldNew}>{b}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visual design — the palette deployed, not swatched */}
      <section className={s.wrap}>
        <p className={s.kicker}>Visual design</p>
        <h2 className={s.title}>{BRAND.lead}</h2>
        <p className={s.prose}>{BRAND.prose}</p>
        <div className={s.noteCard}>
          <p className={s.cardHead}>My thinking</p>
          <p className={s.noteText}>{BRAND.insight}</p>
        </div>
        <div className={s.paletteRows}>
          {BRAND.palette.map(([hex, name]) => (
            <div key={hex} className={s.paletteRow} style={{ '--sw': hex }}>
              <i aria-hidden="true" />
              <b>{name}</b>
              <span>{hex}</span>
            </div>
          ))}
        </div>
        <p className={s.microNote}>{BRAND.gradientNote}</p>
      </section>

      {/* 06 — Outcome: the verdict arrives as a notification */}
      <section className={`${s.wrap} ${s.outcome}`}>
        <p className={s.kickerLight}>06 · Outcome</p>
        <h2 className={s.titleLight}>{OUTCOME.lead}</h2>
        <p className={s.proseLight}>{OUTCOME.prose}</p>
        <div className={s.notification} role="note">
          <img src="/images/birthstory/myana-icon.jpg" alt="" width="40" height="40" draggable="false" />
          <div>
            <p className={s.notifTitle}>{OUTCOME.quote.who}</p>
            <p className={s.notifBody}>{OUTCOME.quote.text}</p>
          </div>
          <span className={s.notifTime} aria-hidden="true">now</span>
        </div>
        <p className={s.closeLine}>{CLOSE.line}</p>
        <p className={s.closeSub}>{CLOSE.sub}</p>
        <div className={s.closeActions}>
          <a className={s.cta} href={CLOSE.email}>Get in touch</a>
          <a className={s.alt} href="/">See more work</a>
        </div>
      </section>

      <VSwitch active="skin" />
    </div>
  )
}
