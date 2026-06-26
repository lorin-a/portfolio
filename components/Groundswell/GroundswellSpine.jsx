'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './GroundswellSpine.module.css'

/* ============================================================================
   Groundswell — SPINE WIREFRAME (greyscale, art-free, flow-first).
   Implements CASE_STUDY_PLAYBOOK.md → THE SPEC:
   - Two layers: a SKIM layer (sticky rail + statement headings + stats, reads in
     90s) and an IMMERSION layer (hook + system map + iteration — placeholder here).
   - Arc: Hook → Frame → Sense/The Void → Weave/system map → Shape/making real → Close.
   - Connective logic = ❗insight → ⭐intervention on every decision.
   - Editorial discipline: one statement per beat, one hero artifact, depth behind
     EXPAND (progressive disclosure). 15 beats collapsed to 4 content beats.
   No real images, no Blue Garden. Statement headings are [PLACEHOLDER] at real
   length so the skim layer reads true; voice slots are Lorin's to write.
   ============================================================================ */

const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'sense', label: 'Sense', act: 'I' },
  { id: 'weave', label: 'Weave', act: 'II' },
  { id: 'shape', label: 'Shape', act: 'III' },
  { id: 'close', label: 'Outcome' },
]

function useSeen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.18 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return [ref, seen]
}

function Reveal({ children, className = '', as = 'div' }) {
  const [ref, seen] = useSeen()
  const Tag = as
  return <Tag ref={ref} className={`${styles.rise} ${seen ? styles.in : ''} ${className}`}>{children}</Tag>
}

/* wireframe annotation — names the layer/device (scaffolding, not shipped UI) */
function Note({ children }) { return <span className={styles.note}>{children}</span> }

/* the skim-layer statement heading (placeholder at real length) */
function Statement({ children }) { return <h2 className={styles.statement}>{children}</h2> }

/* ❗insight → ⭐intervention — the connective logic */
function Pair({ insight, move, expand }) {
  return (
    <Reveal className={styles.pair}>
      <p className={styles.insight}><b className={styles.bang}>❗</b><span>{insight}</span></p>
      <p className={styles.move}><b className={styles.star}>⭐</b><span>{move}</span></p>
      {expand && <Expand summary="See how I got there →">{expand}</Expand>}
    </Reveal>
  )
}

/* progressive disclosure — the oversharer's relief valve */
function Expand({ summary, children }) {
  return (
    <details className={styles.expand}>
      <summary>{summary}</summary>
      <div className={styles.expandBody}>{children}</div>
    </details>
  )
}

/* interactive timeline — demonstrates "I make complex process legible" */
function Timeline() {
  const PHASES = [
    { wk: 'Weeks 1–2', name: 'Prototype', span: 2, body: '[What happened in prototyping · the decision I made · my role.]' },
    { wk: 'Weeks 3–4', name: 'Mockup & Figma', span: 2, body: '[Hi-fi concept · stakeholder review · my role.]' },
    { wk: 'Weeks 5–7', name: 'Fabrication', span: 3, body: '[Build with Greg Baltus · the door-lock pivot · my coordination role.]' },
    { wk: 'Weeks 8–10', name: 'Install & playtest', span: 3, body: '[On-site install · 30 testers · the 3 changes that shipped.]' },
  ]
  const [i, setI] = useState(0)
  return (
    <Reveal className={styles.tl}>
      <Note>INTERACTIVE TIMELINE · click a phase</Note>
      <div className={styles.tlTrack} role="tablist" aria-label="Production timeline">
        {PHASES.map((p, idx) => (
          <button
            key={p.name}
            role="tab"
            aria-selected={i === idx}
            className={`${styles.tlSeg} ${i === idx ? styles.tlOn : ''}`}
            style={{ flexGrow: p.span }}
            onClick={() => setI(idx)}
          >
            <span className={styles.tlDot} aria-hidden="true" />
            <span className={styles.tlWk}>{p.wk}</span>
            <span className={styles.tlName}>{p.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.tlPanel} role="tabpanel">
        <p className={styles.tlPanelHead}>{PHASES[i].wk} · {PHASES[i].name}</p>
        <p className={styles.tlPanelBody}>{PHASES[i].body}</p>
      </div>
    </Reveal>
  )
}

/* greyscale device placeholder */
function Device({ kind, beh, ratio = '16 / 9', note }) {
  return (
    <Reveal className={styles.device} style={{ aspectRatio: ratio }}>
      <span className={styles.deviceKind}>{kind}</span>
      {beh && <span className={styles.deviceBeh}>{beh}</span>}
      {note && <span className={styles.deviceNote}>{note}</span>}
    </Reveal>
  )
}

export default function GroundswellSpine() {
  const [active, setActive] = useState('overview')
  const secs = useRef({})

  useEffect(() => {
    const ids = RAIL.map((r) => r.id)
    const o = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (vis[0]) setActive(vis[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    )
    ids.forEach((id) => { const el = secs.current[id]; if (el) o.observe(el) })
    return () => o.disconnect()
  }, [])

  const set = (id) => (el) => { if (el) secs.current[id] = el }
  const go = (id) => () => secs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <span>Groundswell — spine wireframe</span>
        <span className={styles.barMeta}>greyscale · art-free · statement-heading skim layer + ❗→⭐ + expand-to-depth</span>
      </header>

      {/* ── HOOK — cinematic, full-width, NO rail (the one immersive moment) ── */}
      <section className={styles.hook}>
        <Reveal className={styles.hookInner}>
          <p className={styles.kicker}>Groundswell · case study</p>
          <h1 className={styles.hookQ}>Who better to design care than those who <em>give it?</em></h1>
          <Device kind="SYSTEM DIAGRAM" beh="4 interventions × staff moments · assembles on scroll" note="art-free — Lorin's own connector map, NOT the mural" ratio="2.4 / 1" />
          <p className={styles.dive}>dive into the process ↓</p>
          <Note>IMMERSION LAYER · the single hook</Note>
        </Reveal>
      </section>

      {/* ── PROCESS — the rail appears HERE and sticks (the designer presenting) ── */}
      <div className={styles.processWrap}>
        <nav className={styles.rail} aria-label="Case study sections">
          <ol>
            {RAIL.map((r) => (
              <li key={r.id}>
                <button className={`${styles.railItem} ${active === r.id ? styles.railOn : ''}`} onClick={go(r.id)}>
                  <span className={styles.railTick} aria-hidden="true" />
                  <span className={styles.railText}>
                    {r.act && <span className={styles.railAct}>Act {r.act}</span>}
                    {r.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.railFoot}>read just this column → the 90-second story</p>
        </nav>

        <main className={styles.main}>
        {/* ── FRAME — first-person way-in + orientation (fast facts) ── */}
        <section id="overview" ref={set('overview')} className={styles.beat}>
          <Reveal as="p" className={styles.beatKicker}>The process</Reveal>
          <Statement>[Your way-in — one first-person line. From your drafted story: “I come from a long line of healers…”]</Statement>
          <Reveal as="p" className={styles.lead}>[Standfirst — your role + the throughline, 1–2 sentences, first person.]</Reveal>
          <Reveal className={styles.orient}>
            <div><span className={styles.oK}>Role</span><span className={styles.oV}>Participatory research · Co-design · Copywriting · Coordination · Donor outreach</span></div>
            <div><span className={styles.oK}>Timeline</span><span className={styles.oV}>15-wk research + 10-wk production · live pilot</span></div>
            <div><span className={styles.oK}>Outcome</span><span className={styles.oV}>12-month pilot, launched Oct 2025</span></div>
          </Reveal>
          <Reveal className={styles.statRow}>
            {[['256', 'pod visits'], ['570', 'engagement points'], ['$30k+', 'donated']].map(([n, c]) => (
              <div key={c} className={styles.stat}><span className={styles.statNum}>{n}</span><span className={styles.statCap}>{c}</span></div>
            ))}
          </Reveal>
          <Note>SKIM LAYER · orientation in 25 seconds</Note>
        </section>

        {/* ── SENSE · 01 — The Void ── */}
        <section id="sense" ref={set('sense')} className={styles.beat}>
          <Reveal as="p" className={styles.beatKicker}>Sense · 01</Reveal>
          <Statement>[Statement — the problem in one line: caregiver grief is systemic, not individual]</Statement>
          <Reveal as="p" className={styles.body}>[2–3 sentences, first person: what you went looking for and the turn that made co-design the answer.]</Reveal>

          {/* method strip — research is her specialty; documented, not buried */}
          <Reveal className={styles.methodStrip}>
            <Note>METHOD · research as reasoning · expand each</Note>
            <div className={styles.chips}>
              {['Shadowing & interviews', 'Women in White Coats', 'Nourishing the Flower', 'Grief Workshop'].map((m, i) => (
                <Expand key={m} summary={`${i + 1}. ${m}`}>[Method card: what it was · why · what it surfaced.]</Expand>
              ))}
            </div>
            <Device kind="SIGNATURE METHOD — Grief Workshop" beh="one method gets a visible moment" note="trauma-responsive container · scenario discussion" ratio="2.2 / 1" />
          </Reveal>

          <Reveal as="blockquote" className={styles.quote}>“A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.”<span className={styles.quoteAttr}>— Oncology staff</span></Reveal>

          {/* named insights — the ❗ side of the map */}
          <Reveal className={styles.insightsRow}>
            <Note>THE THREE INSIGHTS (named, not implied)</Note>
            <ol className={styles.insights}>
              <li><b>Recognition</b> — feeling appreciated and acknowledged</li>
              <li><b>Environment</b> — space and resources to restore</li>
              <li><b>Culture</b> — shared purpose and team care</li>
            </ol>
          </Reveal>
          <Reveal as="p" className={styles.reframe}>[The reframe — “The Void”: create space for what was already trying to surface, in one line.]</Reveal>
        </section>

        {/* ── WEAVE · 02 — the system map (asset interactions) ── */}
        <section id="weave" ref={set('weave')} className={styles.beat}>
          <Reveal as="p" className={styles.beatKicker}>Weave · 02</Reveal>
          <Statement>[Statement — four interventions, one connected system]</Statement>
          <Device kind="SYSTEM MAP" beh="interventions × staff moments · tap a node to expand" note="the asset interactions — the hook’s handoff (art-free)" ratio="2 / 1" />
          <Note>each intervention = ❗insight → ⭐intervention · detail behind expand</Note>
          <div className={styles.pairs}>
            <Pair insight="Staff feared retaliation for showing feelings" move="Art Wall — anonymous, collective voice" expand="[Art Wall detail: documentary photo + Carolyn Gavin credit. Art-free in main flow.]" />
            <Pair insight="“They save their tears for the car ride home”" move="Restorative Pod — real space to decompress" expand="[Pod detail: meditation library (device-frame video), finger labyrinths, the NookPod donation.]" />
            <Pair insight="Grief includes contradictory, complex emotions" move="Reflection Cards — validation + a somatic exercise" expand="[Card detail: your copywriting as type — feeling · validation · somatic cue. The card faces are art; the WRITING is yours.]" />
            <Pair insight="A nurse had already built a compassionate death-notice" move="CTB email — honor and amplify, don’t replace" expand="[CTB detail: before/after of the notification; the reframe from ‘the system failed you’ to ‘you built a culture of care’.]" />
          </div>
        </section>

        {/* ── SHAPE · 03 — making it real ── */}
        <section id="shape" ref={set('shape')} className={styles.beat}>
          <Reveal as="p" className={styles.beatKicker}>Shape · 03</Reveal>
          <Statement>[Statement — concept to installation in ten weeks]</Statement>
          <Timeline />

          <div className={styles.pairs}>
            <Pair insight="“Grief” narrowed it — staff named hope, joy, resilience too" move="Shifted the whole project to “restoration”" expand="[Language shift: tagline ‘Making Space for Grief’ → ‘Making Space to Restore, Together’. Attunement to staff wisdom.]" />
            <Pair insight="Admin wanted a key-card system to monitor pod access" move="Permeable acrylic facade — “trust, not surveillance”" expand="[The constraint-turned-asset: LED presence cues, no monitoring. A values stance, your call.]" />
          </div>

          {/* what I brought — the role signal teammates can't claim */}
          <Reveal className={styles.role}>
            <Note>WHAT I BROUGHT · first person, specific</Note>
            <p>[I led donor outreach and secured the pod itself, the locks, the labyrinths, the sensors; first-round copy across the project; the meditations via my own teacher; co-led playtesting; build, install, and remote coordination.]</p>
          </Reveal>

          <Reveal className={styles.statRow}>
            {[['30', 'testers before install'], ['3', 'changes that shipped']].map(([n, c]) => (
              <div key={c} className={styles.stat}><span className={styles.statNum}>{n}</span><span className={styles.statCap}>{c}</span></div>
            ))}
          </Reveal>
        </section>

        {/* ── CLOSE — outcome, validation, reflection (learned + would differently), next ── */}
        <section id="close" ref={set('close')} className={styles.beat}>
          <Reveal as="p" className={styles.beatKicker}>Outcome</Reveal>
          <Statement>[Statement — installed, and live as a 12-month pilot]</Statement>
          <Reveal className={styles.statRowBig}>
            {[['570', 'engagement points'], ['207', 'emotion responses'], ['256', 'pod visits'], ['107', 'meditation views']].map(([n, c]) => (
              <div key={c} className={styles.statBig}><span className={styles.statBigNum}>{n}</span><span className={styles.statBigCap}>{c}</span></div>
            ))}
          </Reveal>
          <Reveal as="blockquote" className={styles.quote}>[One stakeholder quote — Dr. Sarah Taylor — as external validation.]</Reveal>

          <Reveal className={styles.reflect}>
            <div>
              <p className={styles.reflectK}>What I learned</p>
              <p className={styles.reflectV}>[Resonance: Presence · Attunement · Harmonization — your belief in co-design, in your own words.]</p>
            </div>
            <div>
              <p className={styles.reflectK}>What I’d do differently</p>
              <p className={styles.reflectV}>[LORIN TO WRITE — candid growth, 1–2 honest lines. The one piece every hiring manager looks for.]</p>
            </div>
          </Reveal>

          <Reveal as="p" className={styles.next}>Next: research paper on “resonance” in review · study completes July 2026 · pursuing funding to expand.</Reveal>

          <Reveal className={styles.credits}>
            <Note>CREDITS · named authorship + inline attribution</Note>
            <p>Role ledger (you + team, named) · Artwork Carolyn Gavin · Photography Kevin Lorenzi · → Read the full documentation · → Read the CMU feature</p>
          </Reveal>
        </section>

        <footer className={styles.end}>end of spine · depth lives behind the expands + the linked full record</footer>
        </main>
      </div>
    </div>
  )
}
