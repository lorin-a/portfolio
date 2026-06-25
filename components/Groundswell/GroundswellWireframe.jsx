'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './GroundswellWireframe.module.css'

/* ============================================================================
   Groundswell — GREYSCALE FLOW WIREFRAME.
   No images, no color, placeholder text. The point is to lock the FLOW, the
   rhythm, and the type hierarchy first — calm and centered, the way Lorin's
   homepage and the cinematic version actually feel. Visual design comes after
   this skeleton is a yes.
   ============================================================================ */

const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
const LOREM_SHORT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.'

function Reveal({ children, className = '', as = 'div' }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.25 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  const Tag = as
  return <Tag ref={ref} className={`${styles.rise} ${seen ? styles.in : ''} ${className}`}>{children}</Tag>
}

/** Labeled grey placeholder for a media moment. */
function Box({ kind, note, ratio = '16 / 9', wide }) {
  return (
    <div className={`${styles.box} ${wide ? styles.boxWide : ''}`} style={{ aspectRatio: ratio }}>
      <span className={styles.boxKind}>{kind}</span>
      {note && <span className={styles.boxNote}>{note}</span>}
    </div>
  )
}

/** Full-screen act threshold. */
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

/** A centered reading beat. */
function Beat({ mark, heading, children, tall }) {
  return (
    <section className={`${styles.beat} ${tall ? styles.beatTall : ''}`}>
      <div className={styles.col}>
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
        <span className={styles.barMeta}>greyscale · no images · placeholder text</span>
      </header>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <Reveal className={styles.col}>
          <p className={styles.mark}>Hero · full-screen · the hook</p>
          <p className={styles.kicker}>Project · context line</p>
          <h1 className={styles.heroQ}>The research question, set large and calm, centered, revealing on load.</h1>
          <span className={styles.scrollNote}>scroll ↓</span>
        </Reveal>
      </section>

      {/* ── OVERVIEW / standfirst ── */}
      <Beat mark="Overview · the 90-second orientation" heading="One elegant sentence on what this is.">
        <Reveal as="p" className={styles.body}>{LOREM_SHORT}</Reveal>
        <Reveal className={styles.stats}>
          {['Stat', 'Stat', 'Stat'].map((s, i) => (
            <div key={i} className={styles.stat}><span className={styles.statNum}>00</span><span className={styles.statCap}>placeholder caption</span></div>
          ))}
        </Reveal>
        <Reveal as="p" className={styles.bodyMute}>{LOREM} {LOREM_SHORT}</Reveal>
      </Beat>

      <Beat>
        <Reveal><Box kind="PHOTOGRAPH" note="establishing — the installed work" ratio="16 / 9" wide /></Reveal>
      </Beat>

      {/* ════ ACT I · SENSE ════ */}
      <Act n="I" name="Sense" />

      <Beat mark="01 · The context" heading="The problem, framed as a single statement." tall>
        <Reveal as="p" className={styles.body}>{LOREM} {LOREM_SHORT}</Reveal>
        <Reveal as="p" className={styles.statement}>A short, weighty statement closes the beat.</Reveal>
      </Beat>

      <Beat mark="02 · What we heard" heading="The research, in the first person." tall>
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
        <Reveal className={styles.quotes}>
          {[0, 1, 2].map((i) => (
            <p key={i} className={styles.quote}>“A placeholder for one staff voice, set large and given room to land.”</p>
          ))}
        </Reveal>
      </Beat>

      <Beat mark="— · Inside the research">
        <Reveal><Box kind="CONTACT SHEET" note="3–4 process images, calm grid" ratio="2 / 1" wide /></Reveal>
      </Beat>

      <Beat mark="03 · From insight to intervention" heading="The research resolved into four dimensions.">
        <Reveal as="p" className={styles.body}>{LOREM_SHORT}</Reveal>
        <Reveal className={styles.list}>
          {['Dimension', 'Dimension', 'Dimension', 'Dimension'].map((d, i) => (
            <div key={i} className={styles.listRow}><span className={styles.listNum}>0{i + 1}</span><span className={styles.listName}>{d}</span><span className={styles.listNeed}>→ intervention</span></div>
          ))}
        </Reveal>
      </Beat>

      <Beat mark="— · Diagram">
        <Reveal><Box kind="DIAGRAM" note="synthesis — four dimensions around the void" ratio="3 / 2" wide /></Reveal>
      </Beat>

      {/* ════ ACT II · WEAVE ════ */}
      <Act n="II" name="Weave" />

      <Beat mark="04 · The ecosystem" heading="Four interventions, one connected system.">
        <Reveal as="p" className={styles.body}>{LOREM_SHORT}</Reveal>
      </Beat>

      <Beat mark="— · System map">
        <Reveal><Box kind="DIAGRAM" note="system map — interventions ↔ moments" ratio="2 / 1" wide /></Reveal>
      </Beat>

      {[
        { n: '01', label: 'Recognition', kind: 'PHOTOGRAPH', note: 'Community Art Wall, in use' },
        { n: '02', label: 'Environment', kind: 'DEVICE / VIDEO', note: 'meditation library, in an iPhone' },
        { n: '03', label: 'Culture', kind: 'CARD DECK', note: 'horizontal scroll — card writing' },
        { n: '04', label: 'Systemic', kind: 'PHOTOGRAPH', note: 'Ceased to Breathe email' },
      ].map((c) => (
        <Beat key={c.n} mark={`${c.n} · ${c.label}`} heading="The intervention, named simply.">
          <Reveal as="p" className={styles.body}>{LOREM_SHORT}</Reveal>
          <Reveal><Box kind={c.kind} note={c.note} ratio="16 / 10" wide /></Reveal>
        </Beat>
      ))}

      <Beat mark="05 · Concept to production" heading="The honest pivot: what changed, and why." tall>
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
      </Beat>

      {/* ════ ACT III · SHAPE ════ */}
      <Act n="III" name="Shape" />

      <Beat mark="06 · The making">
        <Reveal><Box kind="INTERACTIVE" note="iteration scroll — vertical drives horizontal through the build" ratio="2 / 1" wide /></Reveal>
      </Beat>

      <Beat mark="07 · Ten weeks, four phases" heading="A designed, proportional timeline.">
        <Reveal className={styles.track}>
          {[2, 2, 4, 4].map((span, i) => (
            <div key={i} className={styles.seg} style={{ flexGrow: span }}><span className={styles.segBar} /><span className={styles.segName}>Phase</span><span className={styles.segDur}>{span} wks</span></div>
          ))}
        </Reveal>
      </Beat>

      <Beat mark="08 · Play testing" heading="Thirty testers. Three changes." tall>
        <Reveal as="p" className={styles.body}>{LOREM_SHORT}</Reveal>
        <Reveal className={styles.quotes}>
          {[0, 1, 2].map((i) => <p key={i} className={styles.quote}>“A placeholder testing quote, calm and centered.”</p>)}
        </Reveal>
      </Beat>

      {/* ════ CLOSE ════ */}
      <Beat mark="09 · The outcome" heading="Installed, and launched as a 12-month pilot." tall>
        <Reveal as="p" className={styles.body}>{LOREM}</Reveal>
      </Beat>

      <Beat>
        <Reveal><Box kind="PHOTOGRAPH" note="the team at completion" ratio="16 / 9" wide /></Reveal>
      </Beat>

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

      <footer className={styles.end}>end of flow</footer>
    </div>
  )
}
