'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './GroundswellWireframe.module.css'

/* ============================================================================
   Groundswell — GREYSCALE FLOW WIREFRAME (v2: richer media vocabulary).
   No color, no real images, placeholder text. Now demonstrates a VOCABULARY of
   storytelling devices — stat callouts, a process stepper, a data-viz beat,
   pinned scrollytelling, an insight→intervention matrix, annotated media,
   before/after compares — each as a meaningful greyscale placeholder with its
   interaction annotated. The point is still FLOW + structure + chunking, decided
   before any visual design. Calm and centered, the way Lorin's work feels.
   ============================================================================ */

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
const SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'

function useSeen() {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.2 })
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

/* device label chip — names the kind of asset + its interaction */
function Tag({ kind, beh }) {
  return <span className={styles.tag}><b>{kind}</b>{beh && <span className={styles.tagBeh}> · {beh}</span>}</span>
}

/* ── primitives ──────────────────────────────────────────── */

function Box({ kind, beh, note, ratio = '16 / 9' }) {
  return (
    <Reveal className={styles.box} >
      <span style={{ aspectRatio: ratio }} className={styles.boxFill}>
        <Tag kind={kind} beh={beh} />
        {note && <span className={styles.boxNote}>{note}</span>}
      </span>
    </Reveal>
  )
}

function StatRow({ items }) {
  return (
    <Reveal className={styles.statRow}>
      {items.map((c, i) => <div key={i} className={styles.stat}><span className={styles.statNum}>00</span><span className={styles.statCap}>{c}</span></div>)}
    </Reveal>
  )
}

/* big single-number graphic moments */
function StatBeats({ items }) {
  return (
    <Reveal className={styles.statBeats}>
      {items.map((c, i) => (
        <div key={i} className={styles.statBeat}><span className={styles.statBig}>00</span><span className={styles.statBigCap}>{c}</span></div>
      ))}
    </Reveal>
  )
}

/* numbered process stepper */
function Stepper({ kind, steps }) {
  return (
    <Reveal className={styles.stepperWrap}>
      <Tag kind={kind} beh="numbered flow · reveals in sequence" />
      <ol className={styles.stepper}>
        {steps.map((s, i) => (
          <li key={i} className={styles.step}><span className={styles.stepDot}>{i + 1}</span><span className={styles.stepLabel}>{s}</span></li>
        ))}
      </ol>
    </Reveal>
  )
}

/* data-viz placeholder — a faint dot field that "builds on scroll" */
function DataViz({ note }) {
  return (
    <Reveal className={styles.dataviz}>
      <div className={styles.dotField} aria-hidden="true">{Array.from({ length: 120 }).map((_, i) => <span key={i} className={styles.dot} />)}</div>
      <div className={styles.datavizLabel}><Tag kind="DATA VIZ" beh="builds on scroll" />{note && <span className={styles.boxNote}>{note}</span>}</div>
    </Reveal>
  )
}

/* scrollytelling — a media panel pins while text steps through points */
function Scrolly({ media, steps }) {
  return (
    <Reveal className={styles.scrolly}>
      <div className={styles.scrollyMedia}><span className={styles.boxFill}><Tag kind={media} /><span className={styles.boxNote}>pins while text steps →</span></span></div>
      <ol className={styles.scrollySteps}>
        <li className={styles.scrollyHead}><Tag kind="SCROLLYTELLING" beh="media pins · text steps" /></li>
        {steps.map((s, i) => <li key={i} className={styles.scrollyStep}><span className={styles.stepDot}>{i + 1}</span><span>{s}</span></li>)}
      </ol>
    </Reveal>
  )
}

/* insight → intervention matrix */
function Matrix({ rows }) {
  return (
    <Reveal className={styles.matrixWrap}>
      <Tag kind="MATRIX" beh="insight → intervention mapping" />
      <div className={styles.matrix}>
        <div className={styles.matrixHead}><span>Dimension</span><span>Need</span><span>Intervention</span></div>
        {rows.map((r, i) => <div key={i} className={styles.matrixRow}><span className={styles.matrixName}>0{i + 1} · Dimension</span><span className={styles.matrixCell}>need</span><span className={styles.matrixCell}>→ intervention</span></div>)}
      </div>
    </Reveal>
  )
}

/* annotated media — callout labels around a figure */
function Annotated({ kind, labels }) {
  return (
    <Reveal className={styles.annotated}>
      <span className={styles.boxFill}><Tag kind={kind} beh="labeled callouts · reveal on scroll" /></span>
      <ul className={styles.callouts}>
        {labels.map((l, i) => <li key={i} className={styles.callout}><span className={styles.calloutDot} />{l}</li>)}
      </ul>
    </Reveal>
  )
}

/* before / after compare */
function BeforeAfter({ note }) {
  return (
    <Reveal className={styles.beforeAfter}>
      <div className={styles.baPane}><span className={styles.baLabel}>BEFORE</span></div>
      <div className={styles.baHandle} aria-hidden="true"><span /></div>
      <div className={styles.baPane}><span className={styles.baLabel}>AFTER</span></div>
      <span className={styles.baNote}><Tag kind="BEFORE / AFTER" beh="draggable compare" />{note && ` — ${note}`}</span>
    </Reveal>
  )
}

/* device frame (iPhone video) */
function Device({ note }) {
  return (
    <Reveal className={styles.device}>
      <div className={styles.phone}><div className={styles.phoneNotch} /><span className={styles.phoneLabel}>VIDEO</span></div>
      <span className={styles.boxNote}><Tag kind="DEVICE" beh="autoplay loop" /> {note}</span>
    </Reveal>
  )
}

/* horizontal card deck */
function Deck() {
  return (
    <Reveal className={styles.deckWrap}>
      <Tag kind="CARD DECK" beh="horizontal drag" />
      <div className={styles.deck}>{Array.from({ length: 8 }).map((_, i) => <div key={i} className={styles.deckCard}>0{i + 1}</div>)}</div>
    </Reveal>
  )
}

/* proportional timeline */
function Timeline() {
  return (
    <Reveal className={styles.track}>
      {[2, 2, 4, 4].map((span, i) => <div key={i} className={styles.seg} style={{ flexGrow: span }}><span className={styles.segBar} /><span className={styles.segName}>Phase</span><span className={styles.segDur}>{span} wks</span></div>)}
    </Reveal>
  )
}

/* ── section shells ──────────────────────────────────────── */

function Act({ n, name }) {
  return (
    <section className={styles.act}>
      <Reveal className={styles.actInner}>
        <p className={styles.actNum}>Act {n}</p>
        <p className={styles.actName}>{name}</p>
        <span className={styles.actNote}>full-screen chapter threshold · single focal point</span>
      </Reveal>
    </section>
  )
}

function Beat({ mark, heading, children, tall, wide }) {
  return (
    <section className={`${styles.beat} ${tall ? styles.beatTall : ''}`}>
      <div className={`${styles.col} ${wide ? styles.colWide : ''}`}>
        {mark && <Reveal as="p" className={styles.mark}>{mark}</Reveal>}
        {heading && <Reveal as="h2" className={styles.h2}>{heading}</Reveal>}
        {children}
      </div>
    </section>
  )
}

export default function GroundswellWireframe() {
  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <span>Groundswell — flow wireframe</span>
        <span className={styles.barMeta}>greyscale · device vocabulary · placeholder text</span>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <Reveal className={styles.col}>
          <p className={styles.mark}>Hero · full-screen · the hook</p>
          <p className={styles.kicker}>Project · context line</p>
          <h1 className={styles.heroQ}>The research question, set large and calm, centered, revealing on load.</h1>
          <span className={styles.scrollNote}>scroll ↓</span>
        </Reveal>
      </section>

      {/* OVERVIEW */}
      <Beat mark="Overview · the 90-second orientation" heading="One elegant sentence on what this is.">
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <StatRow items={['embedded', 'donated', 'live pilot']} />
        <Reveal as="p" className={styles.bodyMute}>{LOREM}</Reveal>
      </Beat>

      <Beat wide><Box kind="PHOTOGRAPH" beh="full-bleed · subtle ken-burns" note="establishing — the installed work" ratio="2.4 / 1" /></Beat>

      {/* ACT I · SENSE */}
      <Act n="I" name="Sense" />

      <Beat mark="01 · The context" heading="The problem, framed in one line." tall>
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <StatBeats items={['have experienced PTSD', 'report stigma', 'avoid treatment entirely']} />
        <Reveal as="p" className={styles.statement}>This is not an individual failure. It is a systemic one.</Reveal>
      </Beat>

      <Beat mark="02 · How I worked" heading="The research method, made legible." wide>
        <Stepper kind="PROCESS STEPPER" steps={['Shadow the unit', 'Contextual interviews', 'Generative workshops', 'Synthesize']} />
      </Beat>

      <Beat mark="03 · What we heard" heading="The research, in the first person." tall>
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
        <Reveal className={styles.quotes}>
          {[0, 1, 2].map((i) => <p key={i} className={styles.quote}>“A placeholder for one staff voice, set large and given room to land.”</p>)}
        </Reveal>
      </Beat>

      <Beat mark="— · The emotional landscape" heading="What the data felt like." wide>
        <DataViz note="staff feeling, mapped — muted dots accumulate as you scroll" />
      </Beat>

      <Beat mark="— · Inside the research" wide><Box kind="CONTACT SHEET" beh="staggered reveal" note="3–4 process images, calm grid" ratio="2.2 / 1" /></Beat>

      <Beat mark="04 · From insight to intervention" heading="The research resolved into four dimensions." wide>
        <Scrolly media="DIAGRAM" steps={['Recognition', 'Environment', 'Culture', 'Systemic forces']} />
        <Matrix rows={[0, 1, 2, 3]} />
      </Beat>

      {/* ACT II · WEAVE */}
      <Act n="II" name="Weave" />

      <Beat mark="05 · The ecosystem" heading="Four interventions, one connected system." wide>
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <Annotated kind="SYSTEM MAP" labels={['arriving at work', 'taking a break', 'a patient loss', 'a hard moment', 'connecting 1:1']} />
      </Beat>

      <Beat mark="01 · Recognition" heading="Community Art Wall.">
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <Annotated kind="PHOTOGRAPH" labels={['anonymous expression', 'collective voice', 'full spectrum of experience']} />
      </Beat>

      <Beat mark="02 · Environment" heading="Restorative Pod.">
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <Device note="the in-pod meditation library" />
      </Beat>

      <Beat mark="03 · Culture" heading="Reflection Cards.">
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <Deck />
      </Beat>

      <Beat mark="04 · Systemic" heading="Ceased to Breathe email." wide>
        <Reveal as="p" className={styles.body}>{SHORT}</Reveal>
        <BeforeAfter note="the old notification vs. the redesign" />
      </Beat>

      <Beat mark="06 · Concept to production" heading="The honest pivot: what changed, and why." wide tall>
        <BeforeAfter note="digital Garden concept → physical Art Wall" />
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
      </Beat>

      {/* ACT III · SHAPE */}
      <Act n="III" name="Shape" />

      <Beat mark="07 · The making" heading="Concept to installation, in ten weeks." wide>
        <Box kind="INTERACTIVE — ITERATION SCROLL" beh="vertical scroll drives horizontal" note="prototype → mockup → Figma → fabrication → install" ratio="2.4 / 1" />
        <Timeline />
      </Beat>

      <Beat mark="08 · Play testing" heading="Thirty testers. Three changes." tall>
        <StatBeats items={['testers before install', 'critical changes', 'minutes to reset']} />
        <Reveal className={styles.quotes}>{[0, 1].map((i) => <p key={i} className={styles.quote}>“A placeholder testing quote, calm and centered.”</p>)}</Reveal>
      </Beat>

      {/* CLOSE */}
      <Beat mark="09 · The outcome" heading="Installed, and launched as a 12-month pilot." wide tall>
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
        <DataViz note="the pilot dashboard — blurred to protect unpublished findings" />
      </Beat>

      <Beat wide><Box kind="PHOTOGRAPH" beh="full-bleed" note="the team at completion" ratio="2.4 / 1" /></Beat>

      <Beat mark="— · Reflection" tall>
        <Reveal as="p" className={styles.reflect}>The reflection, in Lorin's voice — the largest, calmest beat. Generous space. One closing line lands at the end.</Reveal>
        <Reveal as="p" className={styles.reflectClose}>A single closing line.</Reveal>
      </Beat>

      <Beat mark="— · Credits & go deeper">
        <Reveal className={styles.credits}>
          <div><span className={styles.creditK}>Role</span><span className={styles.creditV}>placeholder</span></div>
          <div><span className={styles.creditK}>In collaboration with</span><span className={styles.creditV}>placeholder names</span></div>
        </Reveal>
        <Reveal className={styles.deeper}><span>→ Read the full documentation</span><span>→ Read the feature</span></Reveal>
      </Beat>

      {/* DEVICE LEGEND — the storytelling vocabulary in this flow */}
      <section className={styles.legend}>
        <p className={styles.legendTitle}>Storytelling devices in this flow</p>
        <div className={styles.legendGrid}>
          {[
            ['PHOTOGRAPH', 'full-bleed cinematic, captioned proof'],
            ['CONTACT SHEET', 'a calm grid of process images'],
            ['STAT CALLOUT', 'a single number, given its own moment'],
            ['PROCESS STEPPER', 'numbered method, reveals in sequence'],
            ['DATA VIZ', 'muted dots/bars that build on scroll'],
            ['SCROLLYTELLING', 'a graphic pins while text steps through it'],
            ['MATRIX', 'insight → intervention, as a grid'],
            ['ANNOTATED MEDIA', 'callout labels reveal on a photo or diagram'],
            ['BEFORE / AFTER', 'a draggable compare for a pivot'],
            ['DEVICE FRAME', 'live product video in an iPhone'],
            ['CARD DECK', 'horizontal drag through writing'],
            ['ITERATION SCROLL', 'vertical scroll drives a horizontal build'],
            ['TIMELINE', 'proportional phases'],
          ].map(([k, d]) => <div key={k} className={styles.legendItem}><span className={styles.legendKind}>{k}</span><span className={styles.legendDesc}>{d}</span></div>)}
        </div>
        <p className={styles.legendNote}>Tell me which to add, cut, or move — and where the story still needs chunking.</p>
      </section>

      <footer className={styles.end}>end of flow</footer>
    </div>
  )
}
