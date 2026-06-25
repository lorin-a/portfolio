'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import ShapeMark from '@/components/marks/ShapeMark'
import { cloudImg, cloudVideo, GS_IMAGES, GS_CARDS, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './GroundswellPreview.module.css'

/* ============================================================================
   Groundswell — case-study template. ONE editorial form, now built to SHOW
   the process, not just narrate it.

   Spine: a single reading column punctuated by full-bleed cinematic
   act-dividers. Heartbeat: dark claim → light reading + inline evidence →
   PROCESS MADE VISIBLE → dark claim. The "evidence" beat now varies — a
   research contact-sheet, a synthesis diagram, an iPhone of the live product,
   a horizontal scroll through the build iterations (the Komoot move Lorin
   loved), the reflection-card writing as a horizontal deck. Imagery teaches
   how she works; one focal point at a time so the eye never bounces.

   Copy is Lorin's own words. Connective framing stays plain and true; no
   introduced em dashes. Reflection-card BACKS (her somatic copy) are shown,
   never Carolyn's front artwork.
   ============================================================================ */

const FLOWER_GRADIENT = ['#9FB07E', '#E4B6A4', '#B79BC4']
const CMU = 'https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care'
const MEDIUM =
  'https://medium.com/@lorinanderberg/design-with-care-for-oncology-exploring-supportive-environments-for-health-care-workers-cd0d6800ddd9'

const img = (key, w = 1600) => cloudImg(GS_IMAGES[key], w)
const cardBack = (name, w = 900) => cloudImg(GS_CARDS[`${name}-back`], w)
const vid = (key) => cloudVideo(GS_VIDEOS[key], 900)

// Quiet left spine — five ticks, the three acts bookended by overview + outcome.
const RAIL = [
  { id: 'standfirst', label: 'Overview' },
  { id: 'act-sense', label: 'Sense' },
  { id: 'act-weave', label: 'Weave' },
  { id: 'act-shape', label: 'Shape' },
  { id: 'outcome', label: 'Outcome' },
]

// Sense → Weave → Shape: Lorin's practice, doubling as the project arc.
const ACTS = [
  {
    key: 'sense', n: 'I', name: 'Sense', phase: '15 weeks · research', image: 'gs-context-02',
    line: 'Listening with oncology staff to understand the emotional reality of the work.',
  },
  {
    key: 'weave', n: 'II', name: 'Weave', phase: 'synthesis · design', image: 'gs-making-figma-01',
    line: 'Translating what we heard into a connected ecosystem of interventions.',
  },
  {
    key: 'shape', n: 'III', name: 'Shape', phase: '10 weeks · production + pilot', image: 'gs-making-install-02',
    line: 'Building, testing, and installing Groundswell as a living pilot.',
  },
]

const STAFF_QUOTES = [
  'A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.',
  'There is no time to grieve. Once someone passes there is no time before another person comes in.',
  'I can’t turn it off. Even on my days off, I keep checking Teams. I am so exhausted.',
]

// Research process — a contact sheet of the generative work, so the reader sees
// HOW the listening happened (not one hero photo).
const RESEARCH_FRAMES = [
  { k: 'gs-workshop-grief-01', cap: 'A generative workshop: mapping where grief lives in the workday.' },
  { k: 'gs-workshop-flower-01', cap: 'A making exercise, surfacing what staff carry.' },
  { k: 'gs-context-01', cap: 'Shadowing across the oncology unit.' },
  { k: 'gs-sense-affinity-02', cap: 'Clustering hundreds of observations into themes.' },
]

const DIMENSIONS = [
  { name: 'Recognition', need: 'feeling seen and appreciated', answer: 'Community Art Wall' },
  { name: 'Environment', need: 'workspace quality and resources', answer: 'Restorative Pod' },
  { name: 'Culture', need: 'team norms and shared care', answer: 'Reflection Cards' },
  { name: 'Systemic', need: 'constraints beyond the individual', answer: 'Ceased to Breathe email' },
]

// The build, iterated — the horizontal scroll-through (Komoot move).
const ITERATION = [
  { k: 'gs-making-prototype-01', n: '01', cap: 'Early prototyping: testing the pod’s footprint and feel.' },
  { k: 'gs-making-mockup-01', n: '02', cap: 'Mockups: finding the visual language for the space.' },
  { k: 'gs-making-figma-01', n: '03', cap: 'Designing the components in Figma.' },
  { k: 'gs-making-build-02', n: '04', cap: 'Fabrication, backed by donated materials and labor.' },
  { k: 'gs-making-facade', n: '05', cap: 'The pod facade comes together.' },
  { k: 'gs-making-install-02', n: '06', cap: 'Installation day at UPMC Magee-Womens Hospital.' },
]

// Designed timeline — proportional to weeks (2 / 2 / 4 / 4 of a 12-week build).
const TIMELINE = [
  { t: 'Pre-Production', d: '2 wks', span: 2, c: 'Concept revision, timeline, early sketches' },
  { t: 'Concept Revisions', d: '2 wks', span: 2, c: 'Content feedback, donation outreach, presentation' },
  { t: 'Design', d: '4 wks', span: 4, c: 'Graphic design, vendor coordination, prototypes' },
  { t: 'Fabrication', d: '4 wks', span: 4, c: 'Pod assembly, play testing, install' },
]

// Reflection-card writing — the BACKS only (her somatic copy as type).
const CARD_BACKS = [
  'welcome', 'embrace', 'numb', 'present', 'angry', 'grateful', 'exhausted', 'joyful',
  'invisible', 'valued', 'heartbroken', 'connected', 'vulnerable', 'hopeful', 'thankyou',
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

/* ── play-once reveal: paused state in CSS, IntersectionObserver flips it ── */
function useInViewOnce(threshold = 0.32) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, inView]
}

function Reveal({ children, className = '', as = 'div', delay = 0, threshold, style }) {
  const [ref, inView] = useInViewOnce(threshold)
  const Tag = as
  const merged = { ...(style || {}), ...(delay ? { transitionDelay: `${delay}s` } : {}) }
  return (
    <Tag ref={ref} className={`${styles.rise} ${inView ? styles.in : ''} ${className}`}
      style={Object.keys(merged).length ? merged : undefined}>
      {children}
    </Tag>
  )
}

/** Light reading section — the single column. One idea, breathing. */
function Read({ id, n, label, children }) {
  return (
    <section id={id} className={styles.read}>
      <div className={styles.column}>
        {(n || label) && (
          <Reveal className={styles.kicker}>
            {n && <span className={styles.kickerNum}>{n}</span>}
            {label && <span className={styles.kickerLabel}>{label}</span>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}

/** Full-bleed cinematic evidence — captioned proof. Used sparingly now. */
function Cinematic({ k, cap, credit, ratio }) {
  const [ref, inView] = useInViewOnce(0.2)
  return (
    <figure ref={ref} className={`${styles.cinematic} ${inView ? styles.in : ''}`}>
      <div className={styles.cinematicMedia} style={ratio ? { aspectRatio: ratio } : undefined}>
        <img src={img(k, 2200)} alt={cap} loading="lazy" />
        {credit && <span className={styles.cinematicCredit}>Artwork: Carolyn Gavin</span>}
      </div>
      {cap && <figcaption className={styles.cinematicCap}><span className={styles.capTick} aria-hidden="true" />{cap}</figcaption>}
    </figure>
  )
}

/** Contact-sheet gallery — several smaller captioned process images, revealing
 *  in sequence. Shows breadth of the work without one photo dominating. */
function ContactSheet({ frames, credit }) {
  return (
    <div className={styles.sheet}>
      {frames.map((f, i) => (
        <Reveal as="figure" key={f.k} className={styles.sheetItem} delay={(i % 2) * 0.08} threshold={0.2}>
          <div className={styles.sheetMedia}>
            <img src={img(f.k, 1200)} alt={f.cap} loading="lazy" />
            {credit && <span className={styles.cinematicCredit}>Artwork: Carolyn Gavin</span>}
          </div>
          <figcaption className={styles.sheetCap}>{f.cap}</figcaption>
        </Reveal>
      ))}
    </div>
  )
}

/** Dark cinematic act-divider — the chapter break. Name wipes up on enter. */
function ActDivider({ act }) {
  const [ref, inView] = useInViewOnce(0.4)
  return (
    <section ref={ref} id={`act-${act.key}`} className={`${styles.act} ${inView ? styles.in : ''}`}>
      <img src={img(act.image, 2400)} alt="" aria-hidden="true" className={styles.actImg} />
      <div className={styles.actScrim} aria-hidden="true" />
      <div className={styles.actInner}>
        <p className={styles.actNum}>Act {act.n}</p>
        <h2 className={styles.actName}><span className={styles.actMask}><span className={styles.actNameInner}>{act.name}</span></span></h2>
        <p className={styles.actPhase}>{act.phase}</p>
        <p className={styles.actLine}>{act.line}</p>
      </div>
    </section>
  )
}

/** iPhone frame holding an autoplaying product recording. */
function DeviceFrame({ src, label }) {
  return (
    <div className={styles.device}>
      <div className={styles.deviceBody}>
        <div className={styles.deviceNotch} aria-hidden="true" />
        <video className={styles.deviceVideo} src={src} autoPlay muted loop playsInline />
      </div>
      {label && <p className={styles.deviceLabel}>{label}</p>}
    </div>
  )
}

/** Horizontal scroll-through — vertical scroll drives a horizontal track of
 *  iteration frames (the Komoot move). Pinned + scrubbed via ScrollTrigger.
 *  Falls back to a native horizontal scroll when motion is reduced or on small
 *  screens. */
function IterationScroll({ items }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [statik, setStatik] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 720px)').matches
    if (reduce || small) { setStatik(true); return }

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)
    return () => { clearTimeout(t); window.removeEventListener('load', refresh); ctx.revert() }
  }, [])

  return (
    <section ref={sectionRef} className={`${styles.iter} ${statik ? styles.iterStatic : ''}`} aria-label="Build iterations">
      <div ref={trackRef} className={styles.iterTrack}>
        <div className={styles.iterIntro}>
          <p className={styles.kicker}><span className={styles.kickerNum}>06</span><span className={styles.kickerLabel}>The making</span></p>
          <h2 className={styles.iterTitle}>Concept to installation, in ten weeks.</h2>
          <p className={styles.iterLede}>Scroll through the build.</p>
        </div>
        {items.map((it) => (
          <figure key={it.k} className={styles.iterFrame}>
            <div className={styles.iterMedia}>
              <span className={styles.iterNum}>{it.n}</span>
              <img src={img(it.k, 1600)} alt={it.cap} loading="lazy" />
            </div>
            <figcaption className={styles.iterCap}>{it.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

/** Reflection-card writing as a horizontal deck (the BACKS). */
function CardDeck({ names }) {
  return (
    <div className={styles.deckWrap}>
      <p className={styles.deckHint} aria-hidden="true">Drag to read the deck →</p>
      <ul className={styles.deck} aria-label="Reflection card writing">
        {names.map((name, i) => (
          <li key={name} className={styles.deckCard}>
            <img src={cardBack(name)} alt={`Reflection card: ${name}. The back carries a validation and a somatic exercise.`} loading="lazy" />
            <span className={styles.deckIndex}>{String(i + 1).padStart(2, '0')}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function GroundswellPreview() {
  const [active, setActive] = useState('standfirst')
  const [showRail, setShowRail] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    RAIL.forEach((c) => { const el = document.getElementById(c.id); if (el) obs.observe(el) })
    const onScroll = () => setShowRail(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = gsap.context(() => {
      gsap.timeline()
        .from('[data-hero-img]', { scale: 1.12, autoAlpha: 0, duration: 1.8, ease: 'power2.out' }, 0)
        .from('[data-hero-k]', { y: 16, autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, 0.5)
        .from('[data-ql]', { yPercent: 118, duration: 0.95, stagger: 0.13, ease: 'power3.out' }, 0.7)
        .from('[data-hero-cue]', { autoAlpha: 0, duration: 0.6 }, 1.7)
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <span className={styles.topbarName}>Lorin Anderberg</span>
        <span className={styles.topbarCenter}>
          <ShapeMark className={styles.topbarMark} gradientColors={FLOWER_GRADIENT} />
          <span className={styles.topbarProject}>Groundswell</span>
        </span>
        <a className={styles.topbarBack} href="/">All work</a>
      </header>

      <nav className={`${styles.rail} ${showRail ? styles.railOn : ''}`} aria-label="Sections">
        {RAIL.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={`${styles.railItem} ${active === c.id ? styles.railActive : ''}`}>
            <span className={styles.railTick} /><span className={styles.railLabel}>{c.label}</span>
          </a>
        ))}
      </nav>

      {/* ── HERO ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroMedia}>
          <img data-hero-img src={img('gs-hero', 2200)} alt="Groundswell installed in a corridor at UPMC Magee-Womens Hospital" className={styles.heroImg} />
          <div className={styles.heroScrim} aria-hidden="true" />
        </div>
        <div className={styles.heroInner}>
          <p className={styles.heroKicker} data-hero-k>Groundswell · oncology well-being at UPMC Magee-Womens Hospital</p>
          <h1 className={styles.heroQ}>
            <span className={styles.qLine}><span data-ql>How might we create</span></span>
            <span className={styles.qLine}><span data-ql>supportive environments where</span></span>
            <span className={styles.qLine}><span data-ql>staff feel nurtured, recognized,</span></span>
            <span className={styles.qLine}><span data-ql>and celebrated?</span></span>
          </h1>
        </div>
        <p className={styles.heroCredit}>Artwork: Carolyn Gavin</p>
        <div className={styles.scrollCue} aria-hidden="true" data-hero-cue><span>Scroll</span><span className={styles.scrollLine} /></div>
      </section>

      {/* ── STANDFIRST ── */}
      <section id="standfirst" className={styles.standfirst}>
        <div className={styles.column}>
          <Reveal>
            <p className={styles.standLede}>
              <span className={styles.dropcap}>G</span>roundswell is a grant-funded ecosystem of emotional support, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. Through communication, creativity, and connection, it fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored.
            </p>
          </Reveal>
          <Reveal className={styles.metaRow}>
            <div className={styles.metaItem}><span className={styles.metaLabel}>My role</span><span className={styles.metaValue}>{ROLE.join(' · ')}</span></div>
            <div className={styles.metaItem}><span className={styles.metaLabel}>Context</span><span className={styles.metaValue}>Carnegie Mellon × UPMC · 2023–24</span></div>
          </Reveal>
          <Reveal className={styles.statRow}>
            <div className={styles.statCell}><span className={styles.statNum}>15 wks</span><span className={styles.statCap}>embedded in the oncology unit</span></div>
            <div className={styles.statCell}><span className={styles.statNum}>~$30K</span><span className={styles.statCap}>in donated materials &amp; services</span></div>
            <div className={styles.statCell}><span className={styles.statNum}>12 mo</span><span className={styles.statCap}>live quality-improvement pilot</span></div>
          </Reveal>
          <Reveal className={styles.wayInWrap}>
            <p className={styles.wayIn}>
              I come from a long line of healers, educators, and innovators: people who carry the weight of the world, an optimism for the future, and the passion to create change that benefits others. Stepping into the oncology department healed something in me. Within minutes of speaking to the staff, I knew we were cut from the same cloth: givers, healers, lovers, builders, dreamers. It started as a class project. I did not anticipate that it would leave the classroom and become real.
            </p>
          </Reveal>
        </div>
      </section>

      <Cinematic k="gs-install-upmc" cap="Groundswell, installed in a Cancer Services corridor at UPMC Magee-Womens Hospital." credit ratio="16 / 9" />

      {/* ════════ ACT I · SENSE ════════ */}
      <ActDivider act={ACTS[0]} />

      <Read id="context" n="01" label="The context">
        <Reveal as="h2" className={styles.h2}>Healthcare workers carry a dual burden.</Reveal>
        <Reveal as="p" className={styles.body}>
          The compassionate nature of the work means constant exposure to grief, loss, and trauma, set alongside administrative tasks that disconnect staff from the patient care that drew them in. The numbers are not edge cases. <b className={styles.inlineStat}>1 in 5</b> U.S. healthcare workers have experienced PTSD. <b className={styles.inlineStat}>73%</b> of emergency physicians report stigma around mental-health treatment, and <b className={styles.inlineStat}>27%</b> avoid treatment entirely, fearing professional consequences.
        </Reveal>
        <Reveal as="p" className={styles.statement}>This is not an individual failure. It is a systemic one.</Reveal>
      </Read>

      <Read n="02" label="What we heard">
        <Reveal as="h2" className={styles.h2}>Over 15 weeks, I listened.</Reveal>
        <Reveal as="p" className={styles.body}>
          Part of what healed me was feeling connected to others who carry contradicting, complex emotional experiences with grace, who find their way back to gratitude even when devastated. As someone already aware of burnout in healthcare, it was not so much shocking as activating to hear, again and again, how under-resourced staff are to carry the emotional toll.
        </Reveal>
        <Reveal as="p" className={styles.method}>Shadowing across the unit · 8 contextual interviews · 2 generative research workshops.</Reveal>
        <div className={styles.quoteRun}>
          {STAFF_QUOTES.map((q, i) => (
            <Reveal as="blockquote" key={i} className={styles.pullQuote} delay={i * 0.05}>{q}</Reveal>
          ))}
        </div>
      </Read>

      {/* research made visible — a contact sheet of the generative work */}
      <section className={styles.evidence}>
        <div className={styles.column}>
          <Reveal as="p" className={styles.evidenceLabel}>Inside the research</Reveal>
        </div>
        <ContactSheet frames={RESEARCH_FRAMES} />
      </section>

      <Read id="synthesis" n="03" label="From insight to intervention">
        <Reveal as="h2" className={styles.h2}>The research resolved into four dimensions of well-being.</Reveal>
        <Reveal as="p" className={styles.body}>
          Each is a need staff named. I mapped hundreds of observations until the pattern held, then chose interventions so that, together, they would answer every one.
        </Reveal>
        <ol className={styles.dimList}>
          {DIMENSIONS.map((d, i) => (
            <Reveal as="li" key={d.name} className={styles.dimRow} delay={i * 0.08}>
              <span className={styles.dimNum}>0{i + 1}</span>
              <span className={styles.dimName}>{d.name}</span>
              <span className={styles.dimNeed}>{d.need}</span>
              <span className={styles.dimAnswer}><span className={styles.dimArrow} aria-hidden="true">→</span>{d.answer}</span>
            </Reveal>
          ))}
        </ol>
      </Read>

      {/* the synthesis, as a diagram — the four dimensions around The Void */}
      <section className={styles.diagram}>
        <Reveal as="figure" className={styles.diagramFig} threshold={0.2}>
          <img src="/images/groundswell/Synthesis-diagram.jpg" alt="Synthesis diagram: Recognition, Environment, Culture, and Systemic Issues arranged around The Void at the center." loading="lazy" />
          <figcaption className={styles.diagramCap}><span className={styles.capTick} aria-hidden="true" />The synthesis: four dimensions around the void that patient-centered care leaves behind.</figcaption>
        </Reveal>
      </section>

      {/* ════════ ACT II · WEAVE ════════ */}
      <ActDivider act={ACTS[1]} />

      <Read id="ecosystem" n="04" label="The ecosystem">
        <Reveal as="h2" className={styles.h2}>Four interventions, each answering a dimension.</Reveal>
        <Reveal as="p" className={styles.body}>
          Not four products. One connected ecosystem, where recognition, environment, culture, and the systemic forces around the work each have a place to live, threaded into the rhythm of the day.
        </Reveal>
      </Read>

      {/* system map — how the parts connect (shown, not told) */}
      <section className={styles.diagram}>
        <Reveal as="figure" className={styles.diagramFig} threshold={0.2}>
          <img src="/images/groundswell/gs-ecosystem-diagram.svg" alt="System map showing how the Ceased to Breathe email, Restorative Pod, Community Art Wall, and Reflection Cards connect to moments in the workday." loading="lazy" className={styles.diagramSvg} />
          <figcaption className={styles.diagramCap}><span className={styles.capTick} aria-hidden="true" />Each intervention meets a different moment: arriving, breaking, grieving, connecting.</figcaption>
        </Reveal>
      </section>

      {/* 01 — Community Art Wall (the physical centerpiece) */}
      <Read n="01 · Recognition" label="Community Art Wall">
        <Reveal as="h3" className={styles.h3}>A wall that gives the community a voice.</Reveal>
        <Reveal as="p" className={styles.body}>
          A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences. We built it as a safe, anonymous place to share and understand what others are feeling, giving public, collective voice to the cancer care community.
        </Reveal>
      </Read>
      <Cinematic k="gs-artwall" cap="The Community Art Wall, in use." credit ratio="16 / 10" />

      {/* 02 — Restorative Pod (with the live meditation on an iPhone) */}
      <section className={styles.split}>
        <div className={styles.splitText}>
          <Reveal className={styles.kicker}><span className={styles.kickerNum}>02 · Environment</span></Reveal>
          <Reveal as="h3" className={styles.h3}>A room to decompress, mid-shift.</Reveal>
          <Reveal as="p" className={styles.body}>
            A dedicated space for emotional decompression through mindfulness activities like guided meditation. Staff save their tears for the car ride home or the bathroom stall; nestled where telephone booths once were, the pod reinforces that emotional labor is real work deserving of real space.
          </Reveal>
          <Reveal as="p" className={styles.method}>Guided meditations authored and recorded by Catherine Liggett.</Reveal>
        </div>
        <Reveal className={styles.splitMedia} threshold={0.2}>
          <DeviceFrame src={vid('gs-new-meditations')} label="The in-pod meditation library." />
        </Reveal>
      </section>

      {/* 03 — Reflection Cards (the writing, as a horizontal deck) */}
      <Read n="03 · Culture" label="Reflection Cards">
        <Reveal as="h3" className={styles.h3}>Writing that meets the body where it is.</Reveal>
        <Reveal as="p" className={styles.body}>
          My own healing journey led me to somatics and nervous-system approaches to well-being, and I wanted to channel that into the content. Each card starts with validation, then offers an invitation to try a somatic exercise: an entry point for building a relationship with the body, and a ritual to return to for self-care.
        </Reveal>
      </Read>
      <CardDeck names={CARD_BACKS} />

      {/* 04 — Ceased to Breathe Email */}
      <section className={styles.split}>
        <Reveal className={styles.splitMedia} threshold={0.2}>
          <div className={styles.splitImg}><img src={img('gs-ctb-email', 1400)} alt="The redesigned Ceased to Breathe notification email." loading="lazy" /></div>
        </Reveal>
        <div className={styles.splitText}>
          <Reveal className={styles.kicker}><span className={styles.kickerNum}>04 · Systemic</span></Reveal>
          <Reveal as="h3" className={styles.h3}>Dignity, infused into the workflow.</Reveal>
          <Reveal as="p" className={styles.body}>
            A redesigned patient-death notification email with compassionate visuals and language that acknowledges the impact of loss. By naming not just the patient but everyone who cared for them, it creates a moment of collective acknowledgment, infused into the workflow without adding administrative burden.
          </Reveal>
        </div>
      </section>

      {/* the seam — concept to production */}
      <Read n="05" label="Concept to production">
        <Reveal as="h2" className={styles.h2}>From a digital garden to a physical wall.</Reveal>
        <Reveal as="p" className={styles.body}>
          The emotional outlet began as a digital “Garden” — an app where staff would speak a feeling and watch it bloom on a shared screen, with the patterns giving leadership anonymous insight. In production, that concept gave way to the physical Community Art Wall, where expression is tactile and human. The honest version of this story is that the most ambitious idea was not the one that shipped, and the project was stronger for it.
        </Reveal>
      </Read>

      {/* ════════ ACT III · SHAPE ════════ */}
      <ActDivider act={ACTS[2]} />

      {/* the build, iterated — horizontal scroll-through */}
      <IterationScroll items={ITERATION} />

      {/* designed timeline */}
      <Read label="Ten weeks, four phases">
        <Reveal as="p" className={styles.body}>
          Over a 10-week production sprint, we turned concept into installation, backed by roughly $30,000 in donated materials and services. I led donor outreach and secured the pod, woodworking, the sensor, the ceramic finger labyrinths, and the door locks. Working remotely, I focused on coordination, documentation, and strategy.
        </Reveal>
        <ol className={styles.timeline}>
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.t} className={styles.timeRow} delay={i * 0.06} style={{ '--span': t.span }}>
              <span className={styles.timeBar} aria-hidden="true" />
              <span className={styles.timeT}>{t.t}</span>
              <span className={styles.timeD}>{t.d}</span>
              <span className={styles.timeC}>{t.c}</span>
            </Reveal>
          ))}
        </ol>
      </Read>

      <Read n="07" label="Play testing">
        <Reveal as="h2" className={styles.h2}>Thirty testers. Three critical changes.</Reveal>
        <Reveal as="p" className={styles.body}>
          We pilot-tested the pod and its rituals with thirty staff before install, and their responses reshaped the final details, from the pacing of the meditations to the way the space invites you in.
        </Reveal>
        <div className={styles.quoteRun}>
          {PLAYTEST_QUOTES.map((q, i) => (
            <Reveal as="blockquote" key={i} className={styles.pullQuote} delay={i * 0.05}>{q}</Reveal>
          ))}
        </div>
      </Read>

      {/* ════════ OUTCOME ════════ */}
      <Read id="outcome" n="08" label="The outcome">
        <Reveal as="h2" className={styles.h2}>Installed, and launched as a 12-month pilot.</Reveal>
        <Reveal as="p" className={styles.body}>
          Groundswell is installed at UPMC Magee-Womens Hospital, launching a 12-month quality-improvement study for Cancer Services staff. We built a data-visualization platform to track and communicate findings, integrating survey data with documentation.
        </Reveal>
        <Reveal as="blockquote" className={styles.bigQuote}>
          “Groundswell reminds us that caring for patients begins with caring for the people who serve them.”
          <cite>Samantha Williams, Director of Women’s Cancer Services, UPMC</cite>
        </Reveal>
      </Read>

      <Cinematic k="gs-finale" cap="The team at completion, in front of the installed Community Art Wall." credit ratio="16 / 9" />

      {/* ── REFLECTION ── */}
      <section id="reflection" className={styles.reflection}>
        <div className={styles.column}>
          <Reveal as="p" className={styles.reflectLede}>
            What Groundswell changed for me is a strong belief in, and foundation for, co-design and generative design methodology: the power that comes from relational practices, and the role of the designer as a facilitator of existing wisdom, a connector across scales, a translator between stakeholders.
          </Reveal>
          <Reveal as="p" className={styles.reflectBody}>
            We learned to attune our process to amplify rather than impose, to honor existing community innovations, and to build trust through sustained presence — not as outsiders with solutions, but as collaborators creating conditions for what’s already trying to emerge.
          </Reveal>
          <Reveal as="p" className={styles.reflectClose}>Because true patient-centered care includes the healers.</Reveal>
        </div>
      </section>

      {/* ── CREDITS ── */}
      <section className={styles.credits}>
        <div className={styles.creditsInner}>
          <Reveal className={styles.creditCol}>
            <p className={styles.kickerLabel}>Role</p>
            <p className={styles.creditName}>Lorin Anderberg</p>
            <ul className={styles.roleList}>{ROLE.map((r) => <li key={r} className={styles.roleItem}>{r}</li>)}</ul>
          </Reveal>
          <Reveal className={styles.creditCol} delay={0.08}>
            <p className={styles.kickerLabel}>In collaboration with</p>
            <ul className={styles.collabList}>
              {COLLABORATORS.map((c) => (
                <li key={c.who} className={styles.collabItem}><span className={styles.collabWho}>{c.who}</span><span className={styles.collabWhat}>{c.what}</span></li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── GO DEEPER ── */}
      <section className={styles.deeper}>
        <Reveal>
          <p className={styles.kickerLabel}>Go deeper</p>
          <div className={styles.deeperLinks}>
            <a className={styles.deeperLink} href={MEDIUM} target="_blank" rel="noopener noreferrer">Read the full field documentation <span aria-hidden="true">→</span></a>
            <a className={styles.deeperLink} href={CMU} target="_blank" rel="noopener noreferrer">Read the CMU feature <span aria-hidden="true">→</span></a>
          </div>
          <ShapeMark className={styles.signoff} gradientColors={FLOWER_GRADIENT} />
        </Reveal>
      </section>
    </div>
  )
}
