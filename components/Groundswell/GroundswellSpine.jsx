'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './GroundswellSpine.module.css'

/* ============================================================================
   Groundswell — SPINE WIREFRAME (greyscale, art-free, flow-first).
   Copy = her own words (GROUNDSWELL_VOICE_DRAFT.md + groundswell.md). "I" for
   craft, "we" for collective. Layout uses the full width: a two-column masthead,
   margin-label process steps, wide stat bands, and side-by-side ❗→⭐ pairs.
   Hero = centered/cinematic (the system); process = left, structured (her, telling it).
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
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.15 })
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

function Note({ children }) { return <span className={styles.note}>{children}</span> }
function Statement({ children }) { return <h2 className={styles.statement}>{children}</h2> }

/* explanatory step — a margin label + a wide content column (narration + evidence) */
function Step({ label, say, children }) {
  return (
    <Reveal className={styles.step}>
      <p className={styles.stepLabel}>{label}</p>
      <div className={styles.stepBody}>
        {say && <p className={styles.say}>{say}</p>}
        {children}
      </div>
    </Reveal>
  )
}

function Expand({ summary, children }) {
  return (
    <details className={styles.expand}>
      <summary>{summary}</summary>
      <div className={styles.expandBody}>{children}</div>
    </details>
  )
}

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

/* interactive timeline — demonstrates "I make complex process legible" */
function Timeline() {
  const PHASES = [
    { wk: 'Weeks 1–2', name: 'Prototype', span: 2, body: 'Turned the high-fidelity concept into a functional prototype: brand, ecosystem flow, the service design of the program. As a team of three, I brainstormed and drafted iterations.' },
    { wk: 'Weeks 3–4', name: 'Mockup & Figma', span: 2, body: 'Pod interior, mindfulness resources, and the communications plan for hospital administration. I drafted first-round copy across nearly all of it.' },
    { wk: 'Weeks 5–7', name: 'Fabrication', span: 3, body: 'Greg Baltus transformed spatial limits into design assets. I coordinated remotely and ran donor outreach: the pod, woodworking, the sensor, the labyrinths, the Schlage locks.' },
    { wk: 'Weeks 8–10', name: 'Install & playtest', span: 3, body: 'On-site install at Magee. I co-led playtesting with 30 staff before launch; three critical changes shipped from what we learned.' },
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

function Device({ kind, beh, ratio = '16 / 9', note }) {
  return (
    <Reveal className={styles.device} style={{ aspectRatio: ratio }}>
      <span className={styles.deviceKind}>{kind}</span>
      {beh && <span className={styles.deviceBeh}>{beh}</span>}
      {note && <span className={styles.deviceNote}>{note}</span>}
    </Reveal>
  )
}

/* interactive system map — demonstrates systems thinking + information architecture.
   Hover/focus a moment → the interventions that answer it light up; hover an
   intervention → its moments + its ❗→⭐ surface. (Connections illustrative until
   wired to her real Figma connector map.) */
const SM_MOMENTS = [
  { id: 'arrive', label: 'Arrive', full: 'arrive at work', x: 18, y: 8 },
  { id: 'break', label: 'Break', full: 'take a break', x: 50, y: 8 },
  { id: 'leave', label: 'Leave', full: 'leave work', x: 82, y: 8 },
  { id: 'loss', label: 'Patient loss', full: 'a patient loss', x: 18, y: 48 },
  { id: 'hard', label: 'Hard day', full: 'a hard day', x: 50, y: 48 },
  { id: 'meeting', label: '1:1', full: 'a one-on-one', x: 82, y: 48 },
]
const SM_NODES = [
  { id: 'ctb', label: 'CTB', full: 'CTB Email', x: 15, y: 28, insight: 'a nurse had already built a compassionate death-notice', move: 'honor and amplify what was already there' },
  { id: 'pod', label: 'Pod', full: 'Restorative Pod', x: 38, y: 28, insight: '“they save their tears for the car ride home”', move: 'a real space to decompress' },
  { id: 'wall', label: 'Wall', full: 'Art Wall', x: 62, y: 28, insight: 'staff feared retaliation for showing feelings', move: 'anonymous, collective voice' },
  { id: 'cards', label: 'Cards', full: 'Reflection Cards', x: 85, y: 28, insight: 'grief includes contradictory emotions', move: 'validation + a somatic exercise' },
]
const SM_LINKS = [
  ['arrive', 'pod'], ['arrive', 'wall'],
  ['break', 'pod'], ['break', 'cards'],
  ['leave', 'pod'], ['leave', 'cards'],
  ['loss', 'ctb'], ['loss', 'pod'], ['loss', 'wall'],
  ['hard', 'pod'], ['hard', 'cards'], ['hard', 'wall'],
  ['meeting', 'cards'], ['meeting', 'wall'],
]

function SystemMap() {
  const [sel, setSel] = useState(null)
  const [locked, setLocked] = useState(false)
  const neigh = (id) => SM_LINKS.filter((l) => l.includes(id)).map((l) => (l[0] === id ? l[1] : l[0]))
  const litSet = sel ? new Set([sel, ...neigh(sel)]) : null
  const dim = (id) => (litSet && !litSet.has(id) ? styles.smapDim : '')
  const enter = (id) => { if (!locked) setSel(id) }
  const leave = () => { if (!locked) setSel(null) }
  const click = (id) => { if (locked && sel === id) { setLocked(false); setSel(null) } else { setLocked(true); setSel(id) } }

  const node = SM_NODES.find((n) => n.id === sel)
  const mom = SM_MOMENTS.find((m) => m.id === sel)
  const caption = node
    ? <><b>{node.full}.</b> ❗ {node.insight} → ⭐ {node.move}</>
    : mom
      ? <><b>When {mom.full},</b> staff can reach: {neigh(mom.id).map((id) => SM_NODES.find((n) => n.id === id).full).join(' · ')}.</>
      : 'Hover a moment or an intervention to trace the connections.'

  const btnProps = (id) => ({
    onMouseEnter: () => enter(id), onMouseLeave: leave,
    onFocus: () => enter(id), onBlur: leave, onClick: () => click(id),
    'aria-pressed': sel === id,
  })

  return (
    <Reveal className={styles.smapWrap}>
      <Note>INTERACTIVE SYSTEM MAP · hover a moment or an intervention</Note>
      <div className={styles.smap}>
        <svg className={styles.smapSvg} viewBox="0 0 100 56" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {SM_LINKS.map((l, i) => {
            const m = SM_MOMENTS.find((x) => x.id === l[0])
            const n = SM_NODES.find((x) => x.id === l[1])
            return <line key={i} x1={m.x} y1={m.y} x2={n.x} y2={n.y} className={`${styles.smapLine} ${sel && l.includes(sel) ? styles.smapLineLit : ''}`} />
          })}
        </svg>
        {SM_MOMENTS.map((m) => (
          <button key={m.id} className={`${styles.smapPill} ${dim(m.id)} ${sel === m.id ? styles.smapOn : ''}`} style={{ left: `${m.x}%`, top: `${(m.y / 56) * 100}%` }} {...btnProps(m.id)}>{m.label}</button>
        ))}
        {SM_NODES.map((n) => (
          <button key={n.id} className={`${styles.smapNode} ${dim(n.id)} ${sel === n.id ? styles.smapOn : ''}`} style={{ left: `${n.x}%`, top: `${(n.y / 56) * 100}%` }} {...btnProps(n.id)}>{n.label}</button>
        ))}
      </div>
      <p className={styles.smapCaption}>{caption}</p>
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
        <span className={styles.barMeta}>greyscale · art-free · first copy take (her words)</span>
      </header>

      {/* ── HOOK — cinematic, full-width, NO rail (the one immersive moment) ── */}
      <section className={styles.hook}>
        <Reveal className={styles.hookInner}>
          <p className={styles.kicker}>Groundswell · case study</p>
          <h1 className={styles.hookQ}>Who better to design care than those who <em>give it?</em></h1>
          <Device kind="SYSTEM DIAGRAM" beh="4 interventions × staff moments · assembles on scroll" note="art-free — my own connector map, not the mural" ratio="2.6 / 1" />
          <p className={styles.dive}>dive into the process ↓</p>
          <Note>IMMERSION LAYER · the single hook</Note>
        </Reveal>
      </section>

      {/* ── PROCESS — the rail appears HERE and sticks ── */}
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
          {/* ── FRAME — two-column masthead: personal statement + way-in | meta panel ── */}
          <section id="overview" ref={set('overview')} className={`${styles.beat} ${styles.mast}`}>
            <div className={styles.mastMain}>
              <Reveal as="p" className={styles.beatKicker}>The process</Reveal>
              <Statement>I helped design Groundswell <em>with</em> the people it serves: a connected system of emotional support for oncology staff.</Statement>
              <Reveal as="p" className={styles.lead}>
                I come from a long line of healers, educators, and innovators. That is why I went back to grad school for design, and why I took Professor Kristin Hughes’ co-design course, <em>Designing with CARE</em>. Within minutes of speaking with the staff, I knew we were cut from the same cloth.
              </Reveal>
              <Reveal>
                <Expand summary="More on how I got here →">
                  Stepping into the oncology department healed something in me. I have had a fear of death since I was ten, and I have always been drawn to the depths of the human experience. It started as a class project, one that would only amount to a final pitch. But I felt my marketing skills could at least get this department a donated pod, a temporary solution to give them respite. I did not anticipate that securing that donation would meet a perfectly timed grant, and the project would leave the classroom and become real.
                </Expand>
              </Reveal>
            </div>
            <Reveal as="aside" className={styles.mastAside}>
              <dl className={styles.meta}>
                <div><dt>Role</dt><dd>Participatory research · Co-design facilitation · Copywriting · Coordination · Donor outreach</dd></div>
                <div><dt>Timeline</dt><dd>15-wk research + 10-wk production · ongoing pilot</dd></div>
                <div><dt>Outcome</dt><dd>12-month pilot, launched Oct 2025</dd></div>
              </dl>
              <div className={styles.metaStats}>
                {[['256', 'pod visits'], ['570', 'engagement points'], ['$30k+', 'donated']].map(([n, c]) => (
                  <div key={c} className={styles.stat}><span className={styles.statNum}>{n}</span><span className={styles.statCap}>{c}</span></div>
                ))}
              </div>
              <Note>SKIM LAYER · what it is, my role, the result</Note>
            </Reveal>
          </section>

          {/* ── SENSE · 01 — The Void (margin-label walkthrough) ── */}
          <section id="sense" ref={set('sense')} className={styles.beat}>
            <Reveal as="p" className={styles.beatKicker}>Sense · 01</Reveal>
            <Statement>Burnout on the floor wasn’t an individual failure. It was <em>systemic</em>.</Statement>

            <Step label="What I walked into" say="A windowless unit, cramped desks, constant interruption. Staff skipping meals, saving their tears for the car ride home, attending funerals alone. Over one in five healthcare workers has experienced PTSD, and most carry it with nowhere to put it." />

            <Step label="How I worked" say="Over fifteen weeks I embedded with the gynecologic oncology staff: shadowing shifts, interviewing across roles, and facilitating participatory workshops designed to surface what people often couldn’t say out loud.">
              <div className={styles.chips}>
                <Expand summary="1. Shadowing & interviews">Eight staff across roles. I observed the environment and sat with people in quiet moments, hearing how grief management varies from person to person.</Expand>
                <Expand summary="2. Women in White Coats">With CancerBridges, generative research with female oncology leaders, who added their thoughts to an orchid poster on balancing compassion and self-care.</Expand>
                <Expand summary="3. Nourishing the Flower">Staff used nature metaphors to name the “nutrients” and “root causes” of a nourished workplace. Recognition, environment, and team culture kept surfacing.</Expand>
                <Expand summary="4. Grief Workshop">A container for vulnerability: a trauma-responsive grounding exercise, a soft object to hold, and scenario-based discussion of how to support a struggling teammate.</Expand>
              </div>
              <Device kind="SIGNATURE METHOD: Grief Workshop" beh="one method shown in depth" note="trauma-responsive container · scenario discussion" ratio="2.6 / 1" />
            </Step>

            <Step label="What I heard" say="Part of what healed me in working with oncology staff was feeling connected to others who carry contradicting, complex emotional experiences with grace, who find their way back to gratitude even when they are also devastated.">
              <blockquote className={styles.quote}>“A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.”<span className={styles.quoteAttr}>— Oncology staff</span></blockquote>
            </Step>

            <Step label="What it told me" say="Three patterns held across everything I heard:">
              <ol className={styles.insights}>
                <li><b>Recognition</b>: feeling appreciated and acknowledged</li>
                <li><b>Environment</b>: space and resources to restore</li>
                <li><b>Culture</b>: shared purpose and team care</li>
              </ol>
              <p className={styles.reframe}>They pointed to what we came to call <em>The Void</em>: the unspoken weight staff carry when patient-centered systems neglect the people giving the care. So the thesis became simple. Don’t add more. Make space for what was already trying to surface.</p>
            </Step>
          </section>

          {/* ── WEAVE · 02 — the system map (asset interactions) ── */}
          <section id="weave" ref={set('weave')} className={styles.beat}>
            <Reveal as="p" className={styles.beatKicker}>Weave · 02</Reveal>
            <Statement>I shaped what we heard into <em>four interventions that work as one system</em>.</Statement>

            <Step label="The system" say="Everything pointed to the moments where support could land: arriving at work, taking a break, a patient loss, a hard day, a one-on-one. I helped translate the patterns into four connected interventions, each meeting staff in one of those moments rather than a single fix.">
              <SystemMap />
            </Step>

            <Reveal as="p" className={styles.bandLabel}>What I heard → what we made</Reveal>
            <div className={styles.pairs}>
              <Pair insight="Staff feared retaliation for showing feelings" move="Art Wall: anonymous, collective voice" expand="A community wall for anonymous shared expression across the full spectrum of oncology experience, giving public, collective voice to the care community." />
              <Pair insight="“They save their tears for the car ride home”" move="Restorative Pod: real space to decompress" expand="A dedicated space for emotional decompression, nestled in a former phone-booth nook. The message: emotional labor is real work deserving of real space." />
              <Pair insight="Grief includes contradictory, complex emotions" move="Reflection Cards: validation and a somatic exercise" expand="My own healing journey led me to somatics and nervous-system approaches, and I wanted to channel that into the content. Each card starts with validation, then invites a simple exercise. I kept the language approachable so any experience level could engage." />
              <Pair insight="A nurse had already built a compassionate death-notice" move="CTB email: honor and amplify what was already there" expand="What looked like a cold clinical protocol was a staff-created act of compassion. That shifted our whole approach: from “the system has let you down” to “you have already created a beautiful culture of care.”" />
            </div>
          </section>

          {/* ── SHAPE · 03 — making it real ── */}
          <section id="shape" ref={set('shape')} className={styles.beat}>
            <Reveal as="p" className={styles.beatKicker}>Shape · 03</Reveal>
            <Statement>From concept to an <em>installed pilot</em> in ten weeks.</Statement>

            <Reveal as="p" className={styles.lead}>Grant funding and donations in hand, our team of three had ten weeks to turn a high-fidelity concept into something real on the floor.</Reveal>
            <Timeline />

            <Reveal as="p" className={styles.bandLabel}>The calls that mattered</Reveal>
            <div className={styles.pairs}>
              <Pair insight="“Grief” narrowed it: staff named hope, joy, resilience too" move="Shifted the whole project to “restoration”" expand="Our tagline evolved from “Making Space for Grief, Together” to “Making Space to Restore, Together.” The shift permeated every component. Attunement to staff wisdom over our first instinct." />
              <Pair insight="Admin wanted a key-card system to monitor pod access" move="A permeable acrylic facade: “trust, not surveillance”" expand="Care must include the freedom to pause without guilt. The final design signals use with subtle LED light instead of monitoring it. A constraint turned into a values stance." />
            </div>

            <Step label="What I brought" say="I led donor outreach and secured the assets and partnerships: the pod itself, the woodworking added to it, the sensor within it, the ceramic finger labyrinths, and the Schlage door locks. It was my meditation and shadow-work teacher, Catherine Liggett, who volunteered to co-edit, author, and record the meditations used in the study. I drafted first-round copy for nearly all of the project, co-led playtesting, helped with build and installation, and (working mostly remote) ran project coordination, documentation, and strategy." />
          </section>

          {/* ── CLOSE — outcome, validation, reflection, next ── */}
          <section id="close" ref={set('close')} className={styles.beat}>
            <Reveal as="p" className={styles.beatKicker}>Outcome</Reveal>
            <Statement>Installed, and live as a <em>12-month study</em>.</Statement>
            <Reveal className={styles.statBand}>
              {[['570', 'engagement points'], ['207', 'emotion responses'], ['256', 'pod visits'], ['107', 'meditation views']].map(([n, c]) => (
                <div key={c} className={styles.statBig}><span className={styles.statBigNum}>{n}</span><span className={styles.statBigCap}>{c}</span></div>
              ))}
            </Reveal>
            <Reveal as="p" className={styles.lead}>Minimum baselines from the first four months; our methods are designed to undercount rather than overcount. The qualitative richness, alongside consistent pod usage, suggests meaningful adoption.</Reveal>

            <blockquote className={styles.quoteWide}>“Caring for people means seeing them as whole, complex, and beautiful human beings, not just as patients in need of medicine or surgery. Healing begins with caring for the caregivers.”<span className={styles.quoteAttr}>— Dr. Sarah Taylor, Gynecologic Oncology, UPMC</span></blockquote>

            <Reveal className={styles.reflect}>
              <div>
                <p className={styles.reflectK}>What I learned</p>
                <p className={styles.reflectV}>Groundswell gave me a strong belief in co-design and generative methodology: the power of relational practice, and the role of the designer as a facilitator of existing wisdom, a connector across scales, and a translator between stakeholders.</p>
              </div>
              <div>
                <p className={styles.reflectK}>What I’d do differently</p>
                <p className={styles.reflectV}>[LORIN TO WRITE — candid growth, 1–2 honest lines. The one piece every hiring manager looks for.]</p>
              </div>
            </Reveal>

            <Reveal as="p" className={styles.next}>Next: a research paper on “resonance” in review · the study completes July 2026 · pursuing funding to expand to other hospital settings.</Reveal>

            <Reveal className={styles.credits}>
              <Note>CREDITS · named authorship + inline attribution</Note>
              <p>Role ledger (me + team, named) · Artwork Carolyn Gavin · Photography Kevin Lorenzi · → Read the full documentation · → Read the CMU feature</p>
            </Reveal>
          </section>

          <footer className={styles.end}>end of spine · depth lives behind the expands + the linked full record</footer>
        </main>
      </div>
    </div>
  )
}
