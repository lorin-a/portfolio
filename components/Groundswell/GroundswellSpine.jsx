'use client'

import { useEffect, useRef, useState } from 'react'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellSpine.module.css'

const photo = (key, w = 1400) => cloudImg(GS_IMAGES[key], w)

/* ============================================================================
   Groundswell — SPINE WIREFRAME (greyscale, art-free, flow-first).
   Copy = her own words (GROUNDSWELL_VOICE_DRAFT.md + groundswell.md). "I" for
   craft, "we" for collective. Layout uses the full width: a two-column masthead,
   margin-label process steps, wide stat bands, and side-by-side ❗→⭐ pairs.
   Hero = centered/cinematic (the system); process = left, structured (her, telling it).
   ============================================================================ */

// Act colours map to the EXACT Sense/Weave/Shape mark colours used site-wide
// (components/marks/*). The rail is the legend; the act washes use the same tokens.
const RAIL = [
  { id: 'overview', label: 'Overview' },
  { id: 'sense', label: 'Sense', act: 'I', color: 'var(--color-sage)' },
  { id: 'weave', label: 'Weave', act: 'II', color: 'var(--color-plum)' },
  { id: 'shape', label: 'Shape', act: 'III', color: 'var(--color-terracotta)' },
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

/* ❗tension → ⭐response → the rationale — the connective logic, all visible.
   Optional documentary photo bleeds to the card edges; art credited inline. */
function Pair({ insight, move, detail, img, alt, credit }) {
  return (
    <Reveal className={`${styles.pair} ${img ? styles.pairPhoto : ''}`}>
      {img && (
        <span className={styles.pairFig}>
          <img src={photo(img, 900)} alt={alt} loading="lazy" />
        </span>
      )}
      <p className={styles.insight}><b className={styles.bang}>❗</b><span>{insight}</span></p>
      <p className={styles.move}><b className={styles.star}>⭐</b><span>{move}</span></p>
      {detail && <p className={styles.pairDetail}>{detail}</p>}
      {credit && <p className={styles.pairCredit}>{credit}</p>}
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
      <Note>Click a phase</Note>
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

/* real documentary photo — image + optional caption/credit. Art credited inline
   only where the artwork appears in context (per Lorin's stance). */
function Figure({ img, alt, caption, credit, ratio = '16 / 10' }) {
  return (
    <Reveal as="figure" className={styles.figure}>
      <span className={styles.figFrame} style={{ aspectRatio: ratio }}>
        <img src={photo(img)} alt={alt} loading="lazy" />
      </span>
      {(caption || credit) && (
        <figcaption className={styles.figCap}>
          {caption}{credit && <span className={styles.figCredit}> · {credit}</span>}
        </figcaption>
      )}
    </Reveal>
  )
}

/* slideshow — visible content with obvious controls (replaces dropdowns). */
function Slideshow({ slides, credit = 'Photography Kevin Lorenzi' }) {
  const [i, setI] = useState(0)
  const n = slides.length
  const go = (d) => setI((p) => (p + d + n) % n)
  const s = slides[i]
  return (
    <Reveal className={styles.show}>
      <div className={styles.showFrame}>
        <img src={photo(s.img)} alt={s.alt} loading="lazy" />
      </div>
      <div className={styles.showBar}>
        <div className={styles.showText}>
          <p className={styles.showName}>{s.name}</p>
          <p className={styles.showBody}>{s.body}</p>
        </div>
        <div className={styles.showNav}>
          <div className={styles.showDots}>
            {slides.map((sl, d) => (
              <button key={sl.name} className={`${styles.showDot} ${d === i ? styles.showDotOn : ''}`} onClick={() => setI(d)} aria-label={sl.name} aria-current={d === i} />
            ))}
          </div>
          <div className={styles.showArrows}>
            <span className={styles.showCount}>{i + 1} / {n}</span>
            <button className={styles.showArrow} onClick={() => go(-1)} aria-label="Previous method">←</button>
            <button className={styles.showArrow} onClick={() => go(1)} aria-label="Next method">→</button>
          </div>
        </div>
      </div>
      <p className={styles.showCredit}>{s.credit || credit}</p>
    </Reveal>
  )
}

const METHODS = [
  { name: 'Shadowing & interviews', img: 'gs-context-01', alt: 'The oncology unit where staff work, with the community art wall', body: 'Eight staff across roles. I observed the environment and sat with people in quiet moments, hearing how grief management varies from person to person.', credit: 'Artwork Carolyn Gavin · Photography Kevin Lorenzi' },
  { name: 'Women in White Coats', img: 'gs-workshop-coats-01', alt: 'The Women in White Coats session', body: 'With CancerBridges, generative research with female oncology leaders, who added their thoughts to an orchid poster on balancing compassion and self-care.' },
  { name: 'Nourishing the Flower', img: 'gs-workshop-flower-01', alt: 'The Nourishing the Flower workshop', body: 'Staff used nature metaphors to name the “nutrients” and “root causes” of a nourished workplace. Recognition, environment, and team culture kept surfacing.' },
  { name: 'Grief Workshop', img: 'gs-workshop-grief-01', alt: 'The Grief Workshop, a trauma-responsive group session', body: 'A trauma-responsive container: a grounding exercise, a soft object to hold, and scenario-based discussion of how to support a struggling teammate.' },
]

function Device({ kind, beh, ratio = '16 / 9', note }) {
  return (
    <Reveal className={styles.device} style={{ aspectRatio: ratio }}>
      <span className={styles.deviceKind}>{kind}</span>
      {beh && <span className={styles.deviceBeh}>{beh}</span>}
      {note && <span className={styles.deviceNote}>{note}</span>}
    </Reveal>
  )
}

/* interactive system map — the Weave synthesis, on her real Figma connector
   geometry (1736×1080). Her connector arrows draw on as the resting substrate;
   hover/focus a moment → the interventions that answer it light up; hover an
   intervention → its moments + its ❗→⭐ surface. Coordinates are the normalized
   node/pill centres from her export (matching GroundswellHero's CX/CY, PX/PY). */
const FRAME_W = 1736
const FRAME_H = 1080
const SM_MOMENTS = [
  { id: 'arrive', label: 'Arrive', full: 'arriving at work', x: 12.20, y: 5.98 },
  { id: 'break', label: 'Break', full: 'taking a break', x: 50.00, y: 5.98 },
  { id: 'leave', label: 'Leave', full: 'leaving for the day', x: 87.70, y: 5.98 },
  { id: 'loss', label: 'Patient loss', full: 'a patient dies', x: 12.20, y: 94.02 },
  { id: 'hard', label: 'Hard day', full: 'the day is hard', x: 50.00, y: 94.02 },
  { id: 'meeting', label: '1:1', full: 'in a one-on-one', x: 87.70, y: 94.02 },
]
const SM_NODES = [
  { id: 'ctb', label: 'CTB', full: 'CTB Email', x: 12.30, y: 47.03, insight: 'a nurse had already built a compassionate death-notice', move: 'honor and amplify what was already there' },
  { id: 'pod', label: 'Pod', full: 'Restorative Pod', x: 37.45, y: 47.03, insight: '“they save their tears for the car ride home”', move: 'a real space to decompress' },
  { id: 'wall', label: 'Wall', full: 'Art Wall', x: 62.61, y: 47.03, insight: 'staff feared retaliation for showing feelings', move: 'anonymous, collective voice' },
  { id: 'cards', label: 'Cards', full: 'Reflection Cards', x: 87.77, y: 47.03, insight: 'grief includes contradictory emotions', move: 'validation + a somatic exercise' },
]
const SM_LINKS = [
  ['arrive', 'pod'], ['arrive', 'wall'],
  ['break', 'pod'], ['break', 'cards'],
  ['leave', 'pod'], ['leave', 'cards'],
  ['loss', 'ctb'], ['loss', 'pod'], ['loss', 'wall'],
  ['hard', 'pod'], ['hard', 'cards'], ['hard', 'wall'],
  ['meeting', 'cards'], ['meeting', 'wall'],
]
const SM_PT = (id) => {
  const m = SM_MOMENTS.find((x) => x.id === id) || SM_NODES.find((x) => x.id === id)
  return { x: (m.x / 100) * FRAME_W, y: (m.y / 100) * FRAME_H }
}

function SystemMap({ connectorsSvg }) {
  const [sel, setSel] = useState(null)
  const [locked, setLocked] = useState(false)
  const [drawn, setDrawn] = useState(false)
  const mapRef = useRef(null)

  // her connector arrows draw on once, when the map enters view (play-once)
  useEffect(() => {
    const el = mapRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDrawn(true); return }
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setDrawn(true); obs.disconnect() }
    }, { threshold: 0.35 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const neigh = (id) => SM_LINKS.filter((l) => l.includes(id)).map((l) => (l[0] === id ? l[1] : l[0]))
  const litSet = sel ? new Set([sel, ...neigh(sel)]) : null
  const litLinks = sel ? SM_LINKS.filter((l) => l.includes(sel)) : []
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
      <Note>Hover a moment or an intervention</Note>
      <div ref={mapRef} className={`${styles.smap} ${sel ? styles.smapActive : ''}`}>
        {/* her real connector geometry — drawn on, the resting substrate */}
        <div
          className={`${styles.smapDrawn} ${drawn ? styles.smapDrawnIn : ''}`}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: connectorsSvg }}
        />
        {/* lit overlay — the active element's connections, in the act colour */}
        <svg className={styles.smapLit} viewBox={`0 0 ${FRAME_W} ${FRAME_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          {litLinks.map((l, i) => {
            const a = SM_PT(l[0]); const b = SM_PT(l[1])
            return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={styles.smapLitLine} />
          })}
        </svg>
        {SM_MOMENTS.map((m) => (
          <button key={m.id} className={`${styles.smapPill} ${dim(m.id)} ${sel === m.id ? styles.smapOn : ''}`} style={{ left: `${m.x}%`, top: `${m.y}%` }} {...btnProps(m.id)}>{m.label}</button>
        ))}
        {SM_NODES.map((n) => (
          <button key={n.id} className={`${styles.smapNode} ${dim(n.id)} ${sel === n.id ? styles.smapOn : ''}`} style={{ left: `${n.x}%`, top: `${n.y}%` }} {...btnProps(n.id)}>{n.label}</button>
        ))}
      </div>
      <p className={styles.smapCaption}>{caption}</p>
    </Reveal>
  )
}

export default function GroundswellSpine({ connectorsSvg }) {
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
      {/* ── PROCESS — rail + content. The cinematic hook is GroundswellHero, above. ── */}
      <div className={styles.processWrap}>
        <nav className={styles.rail} aria-label="Case study sections">
          <ol>
            {RAIL.map((r) => (
              <li key={r.id} style={r.color ? { '--mark': r.color } : undefined}>
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
            <Reveal className={styles.mastLede}>
              <span className={styles.ledeShot}>
                <img src={photo('gs-playtest-01', 1200)} alt="Setting up the Groundswell reflection station at UPMC Magee — the program poster, the synthesis diagrams, and the reflection cards laid out for a playtest." loading="lazy" />
              </span>
              <span className={`${styles.ledeShot} ${styles.ledeStaff}`}>
                <img src={photo('gs-workshop-grief-02', 1200)} alt="A trauma-responsive grief workshop in session — oncology staff around a table with worksheets and a soft object to hold, a “For Staff” sign in the window." loading="lazy" />
              </span>
            </Reveal>
            <div className={styles.mastBody}>
            <div className={styles.mastMain}>
              <Statement>I helped design Groundswell <em>with</em> the people it serves: a connected ecosystem of emotional support for oncology staff.</Statement>
              <Reveal as="p" className={styles.lead}>
                The concept started out as a class project at Carnegie Mellon in Professor Kristin Hughes’ course, <a className={styles.inlineLink} href="https://www.design.cmu.edu/news/kristin-hughes-designing-care" target="_blank" rel="noreferrer">Designing with CARE</a>—a collaborative course in partnership with UPMC Magee-Womens Hospital.
              </Reveal>
              <details className={styles.more}>
                <summary className={styles.moreSummary}>
                  <span className={styles.moreLabel}>More context</span>
                  <span className={styles.moreIcon} aria-hidden="true" />
                </summary>
                <div className={styles.moreBody}>
                  <p className={styles.leadMore}>
                    I went to CMU for grad school to learn how to co-design meaningful change within complex systems and immediately knew that this class would be life changing. Not only because it would put me up close and personal with my fear of mortality but it would be a real world opportunity to be of service and learn the ethics of my budding design philosophy, relational design.
                  </p>
                  <p className={styles.leadMore}>
                    I could not have predicted that our final project concept would receive grant funding to become a pilot study, but looking back on the process I can now see exactly how it all came together through embedded relationships, divine timing, an idea guided by co-design expertise, and above all, the opportunity that the CARE course gave us to amplify the voices, ideas, and needs of oncology staff.
                  </p>
                </div>
              </details>
            </div>
            <Reveal as="aside" className={styles.mastAside}>
              <dl className={styles.meta}>
                <div><dt>Role</dt><dd>Participatory research · Co-design facilitation · Copywriting · Coordination · Donor outreach</dd></div>
                <div><dt>Timeline</dt><dd>15-wk research + 10-wk production · ongoing pilot</dd></div>
                <div><dt>Outcome</dt><dd>12-month pilot, launched Oct 2025</dd></div>
              </dl>
              <div className={styles.metaStats}>
                {[['$30k+', 'in donations'], ['30', 'playtesters'], ['Live', '12-mo QI study']].map(([n, c]) => (
                  <div key={c} className={styles.stat}><span className={styles.statNum}>{n}</span><span className={styles.statCap}>{c}</span></div>
                ))}
              </div>
            </Reveal>
            </div>
          </section>

          {/* ── SENSE · 01 — The Void (margin-label walkthrough) ── */}
          <section id="sense" ref={set('sense')} className={styles.beat} style={{ '--accent': 'var(--color-sage)' }}>
            <Reveal as="p" className={styles.beatKicker}>Sense · 01</Reveal>
            <Statement>Burnout on the floor wasn’t an individual failure. It was <em>systemic</em>.</Statement>

            <Step label="What I walked into" say="A windowless unit, cramped desks, constant interruption. Staff skipping meals, saving their tears for the car ride home, attending funerals alone. Over one in five healthcare workers has experienced PTSD, and most carry it with nowhere to put it." />

            <Step label="How I worked" say="Over fifteen weeks I embedded with the gynecologic oncology staff: shadowing shifts, interviewing across roles, and facilitating participatory workshops designed to surface what people often couldn’t say out loud." />
            <Slideshow slides={METHODS} />

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
          <section id="weave" ref={set('weave')} className={styles.beat} style={{ '--accent': 'var(--color-plum)' }}>
            <Reveal as="p" className={styles.beatKicker}>Weave · 02</Reveal>
            <Statement>I shaped what we heard into <em>four interventions that work as one system</em>.</Statement>

            <Step label="The system" say="Everything pointed to the moments where support could land: arriving at work, taking a break, a patient loss, a hard day, a one-on-one. I helped translate the patterns into four connected interventions, each meeting staff in one of those moments rather than a single fix." />

            <Reveal as="p" className={styles.bandLabel}>What I heard → what we made</Reveal>
            <div className={styles.pairs}>
              <Pair insight="Staff feared retaliation for showing feelings" move="Art Wall: anonymous, collective voice" detail="A community wall for anonymous shared expression across the full spectrum of oncology experience, giving public, collective voice to the care community." img="gs-artwall" alt="A staff member adds a small token to the floral community art wall on the oncology unit." credit="Artwork Carolyn Gavin · Photography Kevin Lorenzi" />
              <Pair insight="“They save their tears for the car ride home”" move="Restorative Pod: real space to decompress" detail="A dedicated space for emotional decompression, nestled in a former phone-booth nook. The message: emotional labor is real work deserving of real space." img="gs-pod" alt="The restorative pod, a floral-wrapped enclosure tucked into the unit corridor beneath the Purple Zone sign." credit="Artwork Carolyn Gavin · Photography Kevin Lorenzi" />
              <Pair insight="Grief includes contradictory, complex emotions" move="Reflection Cards: validation and a somatic exercise" detail="My own healing journey led me to somatics and nervous-system approaches, and I wanted to channel that into the content. Each card starts with validation, then invites a simple exercise. I kept the language approachable so any experience level could engage." img="gs-cards" alt="A staff member holds a fanned deck of reflection cards, one open to the “vulnerable” card." credit="Artwork Carolyn Gavin · Photography Kevin Lorenzi" />
              <Pair insight="A nurse had already built a compassionate death-notice" move="CTB email: honor and amplify what was already there" detail="What looked like a cold clinical protocol was a staff-created act of compassion. That shifted our whole approach: from “the system has let you down” to “you have already created a beautiful culture of care.”" img="gs-ctb-email" alt="A staff member composes the “Call to the Bedside” sympathy notice on a laptop, the template bordered by the floral art." credit="Artwork Carolyn Gavin · Photography Kevin Lorenzi" />
            </div>

            <Reveal as="p" className={styles.bandLabel}>How they connect</Reveal>
            <SystemMap connectorsSvg={connectorsSvg} />
          </section>

          {/* ── SHAPE · 03 — making it real ── */}
          <section id="shape" ref={set('shape')} className={styles.beat} style={{ '--accent': 'var(--color-terracotta)' }}>
            <Reveal as="p" className={styles.beatKicker}>Shape · 03</Reveal>
            <Statement>From concept to an <em>installed pilot</em> in ten weeks.</Statement>

            <Reveal as="p" className={styles.lead}>Grant funding and donations in hand, our team of three had ten weeks to turn a high-fidelity concept into something real on the floor.</Reveal>
            <Timeline />

            <Reveal as="p" className={styles.bandLabel}>The calls that mattered</Reveal>
            <div className={styles.pairs}>
              <Pair insight="“Grief” narrowed it: staff named hope, joy, resilience too" move="Shifted the whole project to “restoration”" detail="Our tagline evolved from “Making Space for Grief, Together” to “Making Space to Restore, Together.” The shift permeated every component. Attunement to staff wisdom over our first instinct." img="gs-workshop-flower-02" alt="A completed “Nourishing the Flower” worksheet — a hand-colored tulip with roots, where a staff member wrote what makes work restorative: going above and beyond for each patient, positive energy, being part of a great team." />
              <Pair insight="Admin wanted a key-card system to monitor pod access" move="A permeable acrylic facade: “trust, not surveillance”" detail="Care must include the freedom to pause without guilt. The final design signals use with subtle LED light instead of monitoring it. A constraint turned into a values stance." img="gs-making-facade" alt="The reflection pod taking shape — its permeable acrylic facade wrapped in floral artwork, fronted by a clear door rather than a closed wall, as a team member presses the top panel into place." credit="Artwork Carolyn Gavin · Photography Kevin Lorenzi" />
            </div>

            <Step label="What I brought" say="I led donor outreach and secured the assets and partnerships: the pod itself, the woodworking added to it, the sensor within it, the ceramic finger labyrinths, and the Schlage door locks. It was my meditation and shadow-work teacher, Catherine Liggett, who volunteered to co-edit, author, and record the meditations used in the study. I drafted first-round copy for nearly all of the project, co-led playtesting, helped with build and installation, and (working mostly remote) ran project coordination, documentation, and strategy." />
          </section>

          {/* ── CLOSE — outcome, validation, reflection, next ── */}
          <section id="close" ref={set('close')} className={styles.beat}>
            <Reveal as="p" className={styles.beatKicker}>Outcome</Reveal>
            <Statement>Installed, and live as a <em>grant-funded</em> 12-month study.</Statement>
            <Reveal className={styles.statBand}>
              {[['$30k+', 'in donations secured'], ['Oct 2025', 'launched at UPMC Magee']].map(([n, c]) => (
                <div key={c} className={styles.statBig}><span className={styles.statBigNum}>{n}</span><span className={styles.statBigCap}>{c}</span></div>
              ))}
            </Reveal>
            <Reveal as="p" className={styles.lead}>Built with a team of three and installed on the floor where the care happens.</Reveal>

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
              <p>Role ledger (me + team, named) · Artwork Carolyn Gavin · Photography Kevin Lorenzi · → Read the full documentation · → Read the CMU feature</p>
            </Reveal>
          </section>

          <footer className={styles.end}>end of spine · the full record lives in the linked documentation</footer>
        </main>
      </div>
    </div>
  )
}
