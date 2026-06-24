'use client'

import { useEffect, useRef, useState } from 'react'
import ShapeMark from '@/components/marks/ShapeMark'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellPreview.module.css'

const FLOWER_GRADIENT = ['#9FB07E', '#E4B6A4', '#B79BC4']
const CMU = 'https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care'
const MEDIUM =
  'https://medium.com/@lorinanderberg/design-with-care-for-oncology-exploring-supportive-environments-for-health-care-workers-cd0d6800ddd9'

const img = (key, w = 1400) => cloudImg(GS_IMAGES[key], w)

// ── The chapter spine (left rail wayfinding) ──
const CHAPTERS = [
  { id: 'glance', label: 'Overview' },
  { id: 'vision', label: 'Vision' },
  { id: 'context', label: 'Context' },
  { id: 'research', label: 'Research' },
  { id: 'synthesis', label: 'Synthesis' },
  { id: 'ecosystem', label: 'The Work' },
  { id: 'making', label: 'Making' },
  { id: 'outcomes', label: 'Outcomes' },
  { id: 'reflection', label: 'Reflection' },
]

const DIMENSIONS = [
  { name: 'Recognition', need: 'feeling seen and appreciated', answer: 'Community Art Wall' },
  { name: 'Environment', need: 'workspace quality and resources', answer: 'Restorative Pod' },
  { name: 'Culture', need: 'team norms and shared care', answer: 'Reflection Cards' },
  { name: 'Systemic', need: 'constraints beyond the individual', answer: 'Ceased to Breathe email' },
]

const RESEARCH_QUOTES = [
  'A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.',
  'There is no time to grieve. Once someone passes there is no time before another person comes in.',
  'What mental health? There are zero benefits for staff mental health.',
  'I can’t turn it off. Even on my days off, I keep checking Teams. I am so exhausted.',
]

const COMPONENTS = [
  {
    n: '01',
    name: 'Community Art Wall',
    dimension: 'Recognition',
    image: 'gs-artwall',
    credit: true,
    body:
      'A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences. We built it as a safe, anonymous place to share and understand what others are feeling, giving public, collective voice to the cancer care community.',
  },
  {
    n: '02',
    name: 'Restorative Pod',
    dimension: 'Environment',
    image: 'gs-pod-detail-01',
    body:
      'A dedicated space for emotional decompression through mindfulness activities like guided meditation. Staff save their tears for the car ride home or the bathroom stall; nestled where telephone booths once were, the pod reinforces that emotional labor is real work deserving of real space.',
  },
  {
    n: '03',
    name: 'Ceased to Breathe Email',
    dimension: 'Systemic',
    image: 'gs-ctb-email',
    credit: true,
    body:
      'A redesigned patient-death notification email with compassionate visuals and language that acknowledges the impact of loss. By naming not just the patient but everyone who cared for them, it creates a moment of collective acknowledgment, infused into the workflow without adding administrative burden.',
  },
  {
    n: '04',
    name: 'Reflection Cards',
    dimension: 'Culture',
    image: 'gs-cards',
    credit: true,
    body:
      'My own healing journey led me to somatics and nervous-system approaches to well-being, and I wanted to channel that into the content. Each card starts with validation, then offers an invitation to try a somatic exercise — an entry point for building a relationship with the body and a ritual to return to for self-care.',
  },
]

const TIMELINE = [
  { t: 'Pre-Production', d: '2 weeks', c: 'Concept revision, timeline, early sketches' },
  { t: 'Concept Revisions', d: '2 weeks', c: 'Content feedback, donation outreach, presentation' },
  { t: 'Design', d: '4 weeks', c: 'Graphic design, vendor coordination, prototypes' },
  { t: 'Fabrication', d: '4 weeks', c: 'Pod assembly, play testing, install' },
]

const PLAYTEST_QUOTES = [
  'It’s remarkable what 10 minutes can do.',
  'As soon as I stepped inside, I almost teared up. You’re not always aware of how frazzled you are until you stop.',
  'I’ve worked in the trauma field, and I work with physicians — everyone needs one of these.',
]

const ROLE = ['Research', 'Co-Design', 'Copywriting', 'Project Coordination', 'Donor Outreach']
const COLLABORATORS = [
  { who: 'Carolyn Gavin', what: 'Artwork — “Blue Garden”' },
  { who: 'Catherine Liggett & Mark Staley', what: 'Guided meditations & poetry' },
  { who: 'Greg Baltus', what: 'Fabrication & hardware' },
  { who: 'Elijah Benzon, Kelly McDowell, Robertus Sucahyo', what: 'Design, development & research' },
]

/** Labeled image placeholder — marks where photography still needs to go. */
function Frame({ label, ratio = '4 / 3', credit }) {
  return (
    <figure className={styles.frame} style={{ aspectRatio: ratio }}>
      <span className={styles.frameLabel}>{label}</span>
      {credit && <span className={styles.frameCredit}>Artwork: Carolyn Gavin</span>}
    </figure>
  )
}

/** Real documentary photograph (credited where Carolyn's art appears). */
function Photo({ k, label, ratio = '4 / 3', credit }) {
  return (
    <figure className={styles.photo} style={{ aspectRatio: ratio }}>
      <img src={img(k, 1400)} alt={label} loading="lazy" />
      {credit && <figcaption className={styles.photoCredit}>Artwork: Carolyn Gavin</figcaption>}
    </figure>
  )
}

// The three acts = Lorin's Sense → Weave → Shape practice, doubling as the
// project timeline. Each is a cinematic chapter break.
const ACTS = [
  { key: 'sense', n: 'I', name: 'Sense', phase: '15 weeks · research', image: 'gs-sense-affinity-01',
    line: 'Listening with oncology staff to understand the emotional reality of the work.' },
  { key: 'weave', n: 'II', name: 'Weave', phase: 'design', image: 'gs-making-figma-01',
    line: 'Translating what we heard into a connected ecosystem of interventions.' },
  { key: 'shape', n: 'III', name: 'Shape', phase: '10 weeks · production + pilot', image: 'gs-making-install-02',
    line: 'Building, testing, and installing Groundswell as a living pilot.' },
]

function ActDivider({ act }) {
  return (
    <section className={styles.act} id={`act-${act.key}`}>
      <img src={img(act.image, 2000)} alt="" aria-hidden="true" className={styles.actImg} />
      <div className={styles.actScrim} aria-hidden="true" />
      <div className={styles.actContent}>
        <p className={styles.actNum}>Act {act.n}</p>
        <h2 className={styles.actName}>{act.name}</h2>
        <p className={styles.actPhase}>{act.phase}</p>
        <p className={styles.actLine}>{act.line}</p>
      </div>
    </section>
  )
}

function useInViewOnce(threshold = 0.4) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

export default function GroundswellPreview() {
  const [active, setActive] = useState('glance')
  const [showRail, setShowRail] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px' }
    )
    CHAPTERS.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) obs.observe(el)
    })
    const onScroll = () => setShowRail(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      obs.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className={styles.page}>
      {/* ── Wayfinding header ── */}
      <header className={styles.topbar}>
        <span className={styles.topbarName}>Lorin Anderberg</span>
        <span className={styles.topbarCenter}>
          <ShapeMark className={styles.topbarMark} gradientColors={FLOWER_GRADIENT} />
          <span className={styles.topbarProject}>Groundswell</span>
        </span>
        <a className={styles.topbarBack} href="/">All work</a>
      </header>

      {/* ── The spine: left chapter rail ── */}
      <nav className={`${styles.rail} ${showRail ? styles.railOn : ''}`} aria-label="Sections">
        {CHAPTERS.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={`${styles.railItem} ${active === c.id ? styles.railActive : ''}`}>
            <span className={styles.railTick} />
            <span className={styles.railLabel}>{c.label}</span>
          </a>
        ))}
      </nav>

      {/* ── 1 · HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroMedia}>
          <img src={img('gs-hero', 2000)} alt="Groundswell installed in a corridor at UPMC Magee-Womens Hospital" className={styles.heroImg} />
          <div className={styles.heroScrim} aria-hidden="true" />
        </div>
        <div className={styles.heroContent}>
          <p className={styles.heroKicker}>Oncology well-being · UPMC Magee-Womens Hospital</p>
          <h1 className={styles.heroTitle}>Groundswell</h1>
          <p className={styles.heroTagline}>Making Space to Restore, Together</p>
          <p className={styles.heroOutcome}>
            A grant-funded design ecology for the emotional reality of oncology care. Launched as a 12-month pilot.
          </p>
        </div>
        <p className={styles.heroCredit}>Artwork: Carolyn Gavin</p>
        <div className={styles.scrollCue} aria-hidden="true"><span>Scroll</span><span className={styles.scrollLine} /></div>
      </section>

      {/* ── 2 · AT A GLANCE ── */}
      <section id="glance" className={styles.glance}>
        <div className={styles.glanceGrid}>
          <div className={styles.glanceItem}><span className={styles.label}>What</span><span className={styles.glanceValue}>A grant-funded ecosystem of emotional support for oncology staff.</span></div>
          <div className={styles.glanceItem}><span className={styles.label}>My role</span><span className={styles.glanceValue}>{ROLE.join(' · ')}</span></div>
          <div className={styles.glanceItem}><span className={styles.label}>Timeline</span><span className={styles.glanceValue}>15 wks research + 10 wks production + ongoing pilot</span></div>
          <div className={styles.glanceItem}><span className={styles.label}>Outcome</span><span className={styles.glanceValueStrong}>Launched as a 12-month quality-improvement study.</span></div>
        </div>
        <div className={styles.pills}>{['Design Research', 'Co-Design', 'Copywriting', 'Healthcare'].map((p) => <span key={p} className={styles.pill}>{p}</span>)}</div>
      </section>

      {/* ── 3 · THE WAY IN (paper) ── */}
      <section className={styles.papered}>
        <article className={styles.paper}>
          <p className={styles.paperLede}>
            I come from a long line of healers, educators, and innovators: people who carry the weight of the world, an optimism for the future, and the passion to create change that benefits others.
          </p>
          <p className={styles.paperBody}>
            Stepping into the oncology department healed something in me. Within minutes of speaking to the staff, I knew we were cut from the same cloth: givers, healers, lovers, builders, dreamers. Supporting them turned out to be a lesson in supporting myself, and others who carry more than their capacity can hold.
          </p>
          <p className={styles.paperBody}>
            It started as a class project. But I felt strongly that my marketing skills could at least get this department a donated pod, a temporary solution to give them hope and respite. I did not anticipate that it would leave the classroom and become real.
          </p>
        </article>
      </section>

      {/* ── 4 · VISION ── */}
      <section id="vision" className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.num}>01</p>
            <p className={styles.label}>The vision</p>
            <h2 className={styles.h2}>A culture where staff well-being is treated as essential to care.</h2>
            <p className={styles.body}>
              Groundswell is a grant-funded ecosystem of emotional support, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. Through communication, creativity, and connection, it fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored.
            </p>
            <blockquote className={styles.quote}>
              “Groundswell reminds us that caring for patients begins with caring for the people who serve them.”
              <cite>— Samantha Williams, Director of Women’s Cancer Services, UPMC</cite>
            </blockquote>
          </div>
          <div className={styles.colMedia}><Frame label="[ Installation walkthrough / wide shot ]" ratio="3 / 4" /></div>
        </div>
      </section>

      <ActDivider act={ACTS[0]} />

      {/* ── 5 · CONTEXT (the problem + stats) ── */}
      <section id="context" className={styles.band}>
        <div className={styles.bandNarrow}>
          <p className={styles.num}>02</p>
          <p className={styles.label}>The context</p>
          <h2 className={styles.h2}>Healthcare workers carry a dual burden.</h2>
          <p className={styles.body}>
            The inherently compassionate nature of the work — constant exposure to grief, loss, and trauma — combined with excessive administrative tasks that disconnect staff from the patient care that drew them to the profession.
          </p>
          <div className={styles.stats}>
            <div className={styles.stat}><span className={styles.statNum}>1 in 5</span><span className={styles.statCap}>U.S. healthcare workers have experienced PTSD</span></div>
            <div className={styles.stat}><span className={styles.statNum}>73%</span><span className={styles.statCap}>of emergency physicians report stigma around mental-health treatment</span></div>
            <div className={styles.stat}><span className={styles.statNum}>27%</span><span className={styles.statCap}>avoid treatment entirely, fearing professional consequences</span></div>
          </div>
          <p className={styles.statement}>This is not an individual failure.<br />It is a systemic one.</p>
        </div>
      </section>

      {/* ── 6 · RESEARCH ── */}
      <section id="research" className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.num}>03</p>
            <p className={styles.label}>What we heard</p>
            <h2 className={styles.h2}>Over 15 weeks, I listened.</h2>
            <p className={styles.body}>
              Part of what healed me was feeling connected to others who carry contradicting, complex emotional experiences with grace, who find their way back to gratitude even when devastated. As someone already aware of burnout in healthcare, it was not so much shocking as activating to hear, again and again, how under-resourced staff are to carry the emotional toll.
            </p>
            <p className={styles.bodyMuted}>Shadowing across the unit · 8 contextual interviews · 2 generative research workshops.</p>
          </div>
          <div className={styles.colMedia}>
            <ul className={styles.quoteCards}>
              {RESEARCH_QUOTES.map((q, i) => <li key={i} className={styles.quoteCard}>{q}</li>)}
            </ul>
          </div>
        </div>
        <div className={styles.mediaRow}>
          <Photo k="gs-sense-affinity-01" label="Affinity mapping session" /><Photo k="gs-sense-affinity-02" label="Research synthesis" /><Photo k="gs-sense-affinity-03" label="Identifying interconnected forces" />
        </div>
      </section>

      {/* ── 7 · SYNTHESIS → 4 dimensions (no big flower; clean structure) ── */}
      <SynthesisBlock />

      {/* ── 8 · THE VOID ── */}
      <section className={styles.bandDim}>
        <div className={styles.bandNarrow}>
          <p className={styles.label}>The void</p>
          <p className={styles.statement}>
            Patient-centered care aims to improve outcomes, but it often neglects the people delivering it. In a system that treats staff as disposable, the urgent need is a model that values healthcare workers as essential to sustainable, high-quality care.
          </p>
        </div>
      </section>

      <ActDivider act={ACTS[1]} />

      {/* ── 9 · THE ECOSYSTEM (4 components) ── */}
      <section id="ecosystem" className={styles.band}>
        <div className={styles.bandNarrow}>
          <p className={styles.num}>05</p>
          <p className={styles.label}>The ecosystem</p>
          <h2 className={styles.h2}>Four interventions, each answering a dimension.</h2>
        </div>
        {COMPONENTS.map((c, i) => (
          <div key={c.n} className={`${styles.component} ${i % 2 ? styles.componentFlip : ''}`}>
            <div className={styles.componentMedia}><Photo k={c.image} label={`${c.name} in use`} ratio="4 / 3" credit={c.credit} /></div>
            <div className={styles.componentText}>
              <p className={styles.componentTag}><span className={styles.componentNum}>{c.n}</span>Answers: {c.dimension}</p>
              <h3 className={styles.h3}>{c.name}</h3>
              <p className={styles.body}>{c.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── 10 · CONCEPT → PRODUCTION (the seam) ── */}
      <section className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.label}>Concept to production</p>
            <h2 className={styles.h2}>One idea became two.</h2>
            <p className={styles.body}>
              The emotional outlet began as a digital “Garden” — an app where staff would speak a feeling and watch it bloom on a shared screen, with the patterns giving leadership anonymous insight. In production, that concept gave way to the physical Community Art Wall, where expression is tactile and human.
            </p>
            <p className={styles.bodyMuted}>[ Reasoning in Lorin’s voice — why physical over digital — to be written. ]</p>
          </div>
          <div className={styles.colMedia}>
            <div className={styles.splitFrames}>
              <Frame label="[ Concept: digital Garden ]" ratio="3 / 4" />
              <Frame label="[ Shipped: Art Wall ]" ratio="3 / 4" />
            </div>
          </div>
        </div>
      </section>

      <ActDivider act={ACTS[2]} />

      {/* ── 11 · MAKING ── */}
      <section id="making" className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.num}>06</p>
            <p className={styles.label}>The making</p>
            <h2 className={styles.h2}>Securing it into existence.</h2>
            <p className={styles.body}>
              Over a 10-week production sprint, we turned concept into installation, backed by roughly $30,000 in donated materials and services. I led donor outreach and secured the pod, woodworking, the sensor, the ceramic finger labyrinths, and the door locks. It was my meditation teacher, Catherine Liggett, who volunteered to author and record the meditations. Working remotely, I focused on coordination, documentation, and strategy.
            </p>
          </div>
          <div className={styles.colMedia}>
            <ol className={styles.timeline}>
              {TIMELINE.map((t) => (
                <li key={t.t} className={styles.timeRow}><span className={styles.timeT}>{t.t}</span><span className={styles.timeD}>{t.d}</span><span className={styles.timeC}>{t.c}</span></li>
              ))}
            </ol>
          </div>
        </div>
        <div className={styles.mediaRow}><Photo k="gs-making-build-01" label="Fabrication" /><Photo k="gs-making-install-01" label="Installation day" /><Photo k="gs-finale" label="The team" /></div>
      </section>

      {/* ── 12 · PLAY TESTING ── */}
      <section className={styles.band}>
        <div className={styles.bandNarrow}>
          <p className={styles.label}>Play testing</p>
          <h2 className={styles.h2}>30 testers. Three critical changes.</h2>
          <ul className={styles.quoteCardsRow}>
            {PLAYTEST_QUOTES.map((q, i) => <li key={i} className={styles.quoteCard}>{q}</li>)}
          </ul>
        </div>
      </section>

      {/* ── 13 · OUTCOMES ── */}
      <section id="outcomes" className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.num}>07</p>
            <p className={styles.label}>The outcomes</p>
            <h2 className={styles.h2}>It’s real.</h2>
            <p className={styles.body}>
              Groundswell is installed at UPMC Magee-Womens Hospital, launching a 12-month quality-improvement study for Cancer Services staff. We built a data-visualization platform to track and communicate findings, integrating survey data with documentation. Data is blurred to protect unpublished results.
            </p>
            <blockquote className={styles.quote}>
              “Healing begins with caring for the caregivers.”
              <cite>— Dr. Sarah Taylor, Gynecologic Oncology, UPMC</cite>
            </blockquote>
          </div>
          <div className={styles.colMedia}><Frame label="[ Data platform — blurred ]" ratio="4 / 3" /></div>
        </div>
      </section>

      {/* ── 14 · REFLECTION ── */}
      <section id="reflection" className={styles.papered}>
        <article className={styles.paper}>
          <p className={styles.paperLede}>
            What Groundswell changed for me is a strong belief in, and foundation for, co-design and generative design methodology: the power that comes from relational practices, and the role of the designer as a facilitator of existing wisdom, a connector across scales, a translator between stakeholders.
          </p>
          <p className={styles.paperBody}>
            We learned to attune our process to amplify rather than impose, to honor existing community innovations, and to build trust through sustained presence — not as outsiders with solutions, but as collaborators creating conditions for what’s already trying to emerge.
          </p>
          <p className={styles.paperClose}>Because true patient-centered care includes the healers.</p>
        </article>
      </section>

      {/* ── 15 · CREDITS ── */}
      <section className={styles.band}>
        <div className={styles.bandInner}>
          <div className={styles.colText}>
            <p className={styles.label}>Role</p>
            <p className={styles.creditName}>Lorin Anderberg</p>
            <ul className={styles.roleList}>{ROLE.map((r) => <li key={r} className={styles.roleItem}>{r}</li>)}</ul>
          </div>
          <div className={styles.colText}>
            <p className={styles.label}>In collaboration with</p>
            <ul className={styles.collabList}>
              {COLLABORATORS.map((c) => <li key={c.who} className={styles.collabItem}><span className={styles.collabWho}>{c.who}</span><span className={styles.collabWhat}>{c.what}</span></li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 16 · GO DEEPER ── */}
      <section className={styles.deeper}>
        <p className={styles.label}>Go deeper</p>
        <div className={styles.deeperLinks}>
          <a className={styles.deeperLink} href={MEDIUM} target="_blank" rel="noopener noreferrer">Read the full field documentation <span aria-hidden="true">→</span></a>
          <a className={styles.deeperLink} href={CMU} target="_blank" rel="noopener noreferrer">Read the CMU feature <span aria-hidden="true">→</span></a>
        </div>
        <ShapeMark className={styles.signoff} gradientColors={FLOWER_GRADIENT} />
      </section>
    </div>
  )
}

/* Synthesis: the four dimensions as a structured, scannable mapping. No big
   flower — the structure itself is the spine. */
function SynthesisBlock() {
  const [ref, inView] = useInViewOnce(0.4)
  return (
    <section id="synthesis" className={styles.band} ref={ref}>
      <div className={styles.bandNarrow}>
        <p className={styles.num}>04</p>
        <p className={styles.label}>From insight to intervention</p>
        <h2 className={styles.h2}>The research resolved into <em>four dimensions</em> of well-being.</h2>
        <p className={styles.body}>Each is a need staff named. We chose interventions so that, together, they would answer every one.</p>
        <ul className={styles.dimList}>
          {DIMENSIONS.map((d, i) => (
            <li key={d.name} className={`${styles.dimRow} ${inView ? styles.dimIn : ''}`} style={{ transitionDelay: `${i * 0.12}s` }}>
              <span className={styles.dimNum}>0{i + 1}</span>
              <span className={styles.dimName}>{d.name}</span>
              <span className={styles.dimNeed}>{d.need}</span>
              <span className={styles.dimAnswer}><span className={styles.dimArrow} aria-hidden="true">→</span>{d.answer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
