'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import ShapeMark from '@/components/marks/ShapeMark'
import { cloudImg, cloudVideo, GS_IMAGES, GS_CARDS, GS_VIDEOS } from '@/lib/cloudinary'
import styles from './GroundswellPreview.module.css'

/* ============================================================================
   Groundswell — composed on one 12-column full-bleed canvas (design system v4,
   see the module CSS header). Sections place content asymmetrically against the
   grid; immersion is reserved for thresholds (hero, acts, the iteration scroll);
   value steps gently through porcelain → paper → sand. Copy is Lorin's own words.
   ============================================================================ */

const FLOWER_GRADIENT = ['#9FB07E', '#E4B6A4', '#B79BC4']
const CMU = 'https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care'
const MEDIUM =
  'https://medium.com/@lorinanderberg/design-with-care-for-oncology-exploring-supportive-environments-for-health-care-workers-cd0d6800ddd9'

const img = (key, w = 1600) => cloudImg(GS_IMAGES[key], w)
const cardBack = (name, w = 900) => cloudImg(GS_CARDS[`${name}-back`], w)
const vid = (key) => cloudVideo(GS_VIDEOS[key], 900)

const RAIL = [
  { id: 'standfirst', label: 'Overview' },
  { id: 'act-sense', label: 'Sense' },
  { id: 'act-weave', label: 'Weave' },
  { id: 'act-shape', label: 'Shape' },
  { id: 'outcome', label: 'Outcome' },
]

const ACTS = [
  { key: 'sense', n: 'I', name: 'Sense', phase: '15 weeks · research', image: 'gs-context-02',
    line: 'Listening with oncology staff to understand the emotional reality of the work.' },
  { key: 'weave', n: 'II', name: 'Weave', phase: 'synthesis · design', image: 'gs-making-figma-01',
    line: 'Translating what we heard into a connected ecosystem of interventions.' },
  { key: 'shape', n: 'III', name: 'Shape', phase: '10 weeks · production + pilot', image: 'gs-making-install-02',
    line: 'Building, testing, and installing Groundswell as a living pilot.' },
]

const STAFF_QUOTES = [
  'A special person can do this work forever, a good person can do it for a little while, most people couldn’t do it for a day.',
  'There is no time to grieve. Once someone passes there is no time before another person comes in.',
  'I can’t turn it off. Even on my days off, I keep checking Teams. I am so exhausted.',
]

const RESEARCH_FRAMES = [
  { k: 'gs-workshop-grief-01', cls: 'sheetA', cap: 'A generative workshop: mapping where grief lives in the workday.' },
  { k: 'gs-workshop-flower-01', cls: 'sheetB', cap: 'A making exercise, surfacing what staff carry.' },
  { k: 'gs-context-01', cls: 'sheetC', cap: 'Shadowing across the oncology unit.' },
  { k: 'gs-sense-affinity-02', cls: 'sheetD', cap: 'Clustering hundreds of observations into themes.' },
]

const DIMENSIONS = [
  { name: 'Recognition', need: 'feeling seen and appreciated', answer: 'Community Art Wall' },
  { name: 'Environment', need: 'workspace quality and resources', answer: 'Restorative Pod' },
  { name: 'Culture', need: 'team norms and shared care', answer: 'Reflection Cards' },
  { name: 'Systemic', need: 'constraints beyond the individual', answer: 'Ceased to Breathe email' },
]

const ITERATION = [
  { k: 'gs-making-prototype-01', n: '01', cap: 'Early prototyping: testing the pod’s footprint and feel.' },
  { k: 'gs-making-mockup-01', n: '02', cap: 'Mockups: finding the visual language for the space.' },
  { k: 'gs-making-figma-01', n: '03', cap: 'Designing the components in Figma.' },
  { k: 'gs-making-build-02', n: '04', cap: 'Fabrication, backed by donated materials and labor.' },
  { k: 'gs-making-facade', n: '05', cap: 'The pod facade comes together.' },
  { k: 'gs-making-install-02', n: '06', cap: 'Installation day at UPMC Magee-Womens Hospital.' },
]

const TIMELINE = [
  { t: 'Pre-Production', d: '2 wks', span: 2, c: 'Concept revision, timeline, early sketches' },
  { t: 'Concept Revisions', d: '2 wks', span: 2, c: 'Content feedback, donation outreach' },
  { t: 'Design', d: '4 wks', span: 4, c: 'Graphic design, vendor coordination, prototypes' },
  { t: 'Fabrication', d: '4 wks', span: 4, c: 'Pod assembly, play testing, install' },
]

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

/* ── play-once reveal ── */
function useInViewOnce(threshold = 0.3) {
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

/** A section on the canvas. tone steps the value; tight trims the padding. */
function Section({ id, tone = 'Porcelain', tight, className = '', children }) {
  return (
    <section id={id} className={`${styles.canvas} ${tight ? styles.secTight : styles.sec} ${styles['on' + tone]} ${className}`}>
      {children}
    </section>
  )
}

/** Hung section marker — number + label in the left margin. */
function NumBlock({ n, label, place = styles.cSideL }) {
  return (
    <Reveal className={place}>
      <span className={styles.num}>{n}</span>
      <span className={styles.numLabel}>{label}</span>
      <span className={styles.numRule} aria-hidden="true" />
    </Reveal>
  )
}

/** Full-bleed cinematic evidence with a margin caption. */
function Cinematic({ k, cap, credit }) {
  const [ref, inView] = useInViewOnce(0.18)
  return (
    <figure ref={ref} className={`${styles.canvas} ${styles.cinematic} ${inView ? styles.in : ''}`}>
      <div className={`${styles.full} ${styles.cinematicMedia}`}>
        <img src={img(k, 2200)} alt={cap} loading="lazy" />
        {credit && <span className={styles.cinematicCredit}>Artwork: Carolyn Gavin</span>}
      </div>
      {cap && <figcaption className={styles.cinematicCap}><span className={styles.capTick} aria-hidden="true" />{cap}</figcaption>}
    </figure>
  )
}

/** Dark cinematic act-divider — name left, line in the right margin. */
function ActDivider({ act }) {
  const [ref, inView] = useInViewOnce(0.4)
  return (
    <section ref={ref} id={`act-${act.key}`} className={`${styles.canvas} ${styles.act} ${inView ? styles.in : ''}`}>
      <img src={img(act.image, 2400)} alt="" aria-hidden="true" className={styles.actImg} />
      <div className={styles.actScrim} aria-hidden="true" />
      <div className={styles.actNumWrap}>
        <p className={styles.actNum}>Act {act.n}</p>
        <h2 className={styles.actName}><span className={styles.actMask}><span className={styles.actNameInner}>{act.name}</span></span></h2>
        <p className={styles.actPhase}>{act.phase}</p>
      </div>
      <p className={`${styles.actLineWrap} ${styles.actLine}`}>{act.line}</p>
    </section>
  )
}

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

/** Horizontal scroll-through — vertical scroll drives a horizontal track. */
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
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
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
          <span className={styles.num}>06</span>
          <span className={styles.numLabel}>The making</span>
          <h2 className={styles.iterTitle}>Concept to installation, in ten weeks.</h2>
          <p className={styles.iterLede}>Scroll through the build →</p>
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
      <section className={`${styles.canvas} ${styles.hero}`} ref={heroRef}>
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

      {/* ── STANDFIRST — lede left (cols 1–7), facts as a right sidebar (9–12) ── */}
      <Section id="standfirst" tone="Porcelain" className={styles.rowTop}>
        <Reveal className={styles.cTextL}>
          <p className={styles.standLede}>
            <span className={styles.dropcap}>G</span>roundswell is a grant-funded ecosystem of emotional support, developed with the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. Through communication, creativity, and connection, it fosters a culture where the emotional complexities of oncology care are acknowledged, isolation transforms into belonging, and self-care is honored.
          </p>
          <p className={styles.wayIn}>
            I come from a long line of healers, educators, and innovators: people who carry the weight of the world, an optimism for the future, and the passion to create change that benefits others. Stepping into the oncology department healed something in me. Within minutes of speaking to the staff, I knew we were cut from the same cloth: givers, healers, lovers, builders, dreamers. It started as a class project. I did not anticipate that it would leave the classroom and become real.
          </p>
        </Reveal>
        <Reveal className={styles.cSideR} delay={0.1}>
          <div className={styles.sidebar}>
            <div className={styles.sideItem}><span className={styles.label}>My role</span><span className={styles.metaValue}>{ROLE.join(' · ')}</span></div>
            <div className={styles.sideItem}><span className={styles.label}>Context</span><span className={styles.metaValue}>Carnegie Mellon × UPMC · 2023–24</span></div>
            <div className={styles.sideStat}><span className={styles.sideNum}>15 wks</span><span className={styles.caption}>embedded in the oncology unit</span></div>
            <div className={styles.sideStat}><span className={styles.sideNum}>~$30K</span><span className={styles.caption}>in donated materials &amp; services</span></div>
            <div className={styles.sideStat}><span className={styles.sideNum}>12 mo</span><span className={styles.caption}>live quality-improvement pilot</span></div>
          </div>
        </Reveal>
      </Section>

      <Cinematic k="gs-install-upmc" cap="Groundswell, installed in a Cancer Services corridor at UPMC Magee-Womens Hospital." credit />

      {/* ════════ ACT I · SENSE ════════ */}
      <ActDivider act={ACTS[0]} />

      {/* CONTEXT — number margin-left, claim + body left, statement breaks wide */}
      <Section tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="01" label="The context" />
        <div className={styles.cTextL}>
          <Reveal as="h2" className={styles.h2}>Healthcare workers carry a dual burden.</Reveal>
          <Reveal as="p" className={styles.body}>
            The compassionate nature of the work means constant exposure to grief, loss, and trauma, set alongside administrative tasks that disconnect staff from the patient care that drew them in. The numbers are not edge cases. <b className={styles.inlineStat}>1 in 5</b> U.S. healthcare workers have experienced PTSD. <b className={styles.inlineStat}>73%</b> of emergency physicians report stigma around mental-health treatment, and <b className={styles.inlineStat}>27%</b> avoid treatment entirely, fearing professional consequences.
          </Reveal>
        </div>
        <Reveal as="p" className={`${styles.cWide} ${styles.statement}`} threshold={0.5}>This is not an individual failure. It is a systemic one.</Reveal>
      </Section>

      {/* RESEARCH — claim left; staff voices staggered across the field */}
      <Section tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="02" label="What we heard" />
        <div className={styles.cTextL}>
          <Reveal as="h2" className={styles.h2}>Over 15 weeks, I listened.</Reveal>
          <Reveal as="p" className={styles.body}>
            Part of what healed me was feeling connected to others who carry contradicting, complex emotional experiences with grace, who find their way back to gratitude even when devastated. As someone already aware of burnout in healthcare, it was not so much shocking as activating to hear, again and again, how under-resourced staff are to carry the emotional toll.
          </Reveal>
          <Reveal as="p" className={styles.method}>Shadowing across the unit · 8 contextual interviews · 2 generative research workshops.</Reveal>
        </div>
        <Reveal as="blockquote" className={`${styles.cTextR} ${styles.pullQuote}`} style={{ marginTop: '1rem' }}>{STAFF_QUOTES[0]}</Reveal>
        <Reveal as="blockquote" className={`${styles.cHalfL} ${styles.pullQuote}`} delay={0.05} style={{ marginTop: '2.5rem' }}>{STAFF_QUOTES[1]}</Reveal>
        <Reveal as="blockquote" className={`${styles.cTextR} ${styles.pullQuote}`} delay={0.05} style={{ marginTop: '2.5rem' }}>{STAFF_QUOTES[2]}</Reveal>
      </Section>

      {/* RESEARCH CONTACT SHEET — asymmetric collage */}
      <section className={`${styles.canvas} ${styles.secTight} ${styles.onPaper} ${styles.sheet}`}>
        <Reveal className={styles.sheetLabel}><span className={styles.label}>Inside the research</span></Reveal>
        {RESEARCH_FRAMES.map((f) => (
          <Reveal as="figure" key={f.k} className={`${styles.sheetItem} ${styles[f.cls]}`} threshold={0.18}>
            <div className={styles.sheetMedia}><img src={img(f.k, 1300)} alt={f.cap} loading="lazy" /></div>
            <figcaption className={styles.sheetCap}>{f.cap}</figcaption>
          </Reveal>
        ))}
      </section>

      {/* SYNTHESIS — claim + dimension list left */}
      <Section id="synthesis" tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="03" label="From insight to intervention" />
        <div className={styles.cTextL}>
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
        </div>
      </Section>

      {/* SYNTHESIS DIAGRAM — annotation hung left, diagram bleeds right */}
      <Section tone="Sand" className={styles.rowTop}>
        <Reveal className={styles.diagramNote}>
          <span className={styles.label}>The synthesis</span>
          <p className={styles.caption} style={{ marginTop: '0.75rem' }}>Four dimensions, mapped around the void that patient-centered care leaves behind.</p>
        </Reveal>
        <Reveal as="figure" className={styles.diagramFig} threshold={0.18}>
          <img src="/images/groundswell/Synthesis-diagram.jpg" alt="Synthesis diagram: Recognition, Environment, Culture, and Systemic Issues arranged around The Void at the center." loading="lazy" />
        </Reveal>
      </Section>

      {/* ════════ ACT II · WEAVE ════════ */}
      <ActDivider act={ACTS[1]} />

      {/* ECOSYSTEM intro */}
      <Section id="ecosystem" tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="04" label="The ecosystem" />
        <div className={styles.cTextL}>
          <Reveal as="h2" className={styles.h2}>Four interventions, each answering a dimension.</Reveal>
          <Reveal as="p" className={styles.body}>
            Not four products. One connected ecosystem, where recognition, environment, culture, and the systemic forces around the work each have a place to live, threaded into the rhythm of the day.
          </Reveal>
        </div>
      </Section>

      {/* SYSTEM MAP — diagram bleeds right, annotation left */}
      <Section tone="Sand" className={styles.rowTop}>
        <Reveal className={styles.diagramNote}>
          <span className={styles.label}>System map</span>
          <p className={styles.caption} style={{ marginTop: '0.75rem' }}>Each intervention meets a different moment: arriving, breaking, grieving, connecting.</p>
        </Reveal>
        <Reveal as="figure" className={styles.diagramFig} threshold={0.18}>
          <img src="/images/groundswell/gs-ecosystem-diagram.svg" alt="System map showing how the Ceased to Breathe email, Restorative Pod, Community Art Wall, and Reflection Cards connect to moments in the workday." loading="lazy" className={styles.diagramSvg} />
        </Reveal>
      </Section>

      {/* 01 — Community Art Wall: claim left, then full-bleed */}
      <Section tone="Porcelain" tight>
        <div className={styles.cTextL}>
          <Reveal className={styles.label}>01 · Recognition</Reveal>
          <Reveal as="h3" className={styles.h3} style={{ marginTop: '0.8rem' }}>A wall that gives the community a voice.</Reveal>
          <Reveal as="p" className={styles.body}>
            A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences. We built it as a safe, anonymous place to share and understand what others are feeling, giving public, collective voice to the cancer care community.
          </Reveal>
        </div>
      </Section>
      <Cinematic k="gs-artwall" cap="The Community Art Wall, in use." credit />

      {/* 02 — Pod: text left (1–6), iPhone right (8–12) */}
      <Section tone="Paper" className={styles.rowTop}>
        <div className={styles.cHalfL}>
          <Reveal className={styles.label}>02 · Environment</Reveal>
          <Reveal as="h3" className={styles.h3} style={{ marginTop: '0.8rem' }}>A room to decompress, mid-shift.</Reveal>
          <Reveal as="p" className={styles.body}>
            A dedicated space for emotional decompression through mindfulness activities like guided meditation. Staff save their tears for the car ride home or the bathroom stall; nestled where telephone booths once were, the pod reinforces that emotional labor is real work deserving of real space.
          </Reveal>
          <Reveal as="p" className={styles.method}>Guided meditations authored and recorded by Catherine Liggett.</Reveal>
        </div>
        <Reveal className={styles.cHalfR} threshold={0.18}>
          <DeviceFrame src={vid('gs-new-meditations')} label="The in-pod meditation library." />
        </Reveal>
      </Section>

      {/* 03 — Reflection Cards: claim left, then horizontal deck full-bleed */}
      <Section tone="Porcelain" tight>
        <div className={styles.cTextL}>
          <Reveal className={styles.label}>03 · Culture</Reveal>
          <Reveal as="h3" className={styles.h3} style={{ marginTop: '0.8rem' }}>Writing that meets the body where it is.</Reveal>
          <Reveal as="p" className={styles.body}>
            My own healing journey led me to somatics and nervous-system approaches to well-being, and I wanted to channel that into the content. Each card starts with validation, then offers an invitation to try a somatic exercise: an entry point for building a relationship with the body, and a ritual to return to for self-care.
          </Reveal>
          <Reveal as="p" className={styles.deckHint} style={{ marginTop: '1.5rem' }} aria-hidden="true">Drag to read the deck →</Reveal>
        </div>
        <ul className={styles.deck} aria-label="Reflection card writing">
          {CARD_BACKS.map((name, i) => (
            <li key={name} className={styles.deckCard}>
              <img src={cardBack(name)} alt={`Reflection card: ${name}. The back carries a validation and a somatic exercise.`} loading="lazy" />
              <span className={styles.deckIndex}>{String(i + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* 04 — Ceased to Breathe: image left (1–6), text right (8–12) — mirror of pod */}
      <Section tone="Paper" className={styles.rowTop}>
        <Reveal className={styles.cHalfL} threshold={0.18}>
          <div className={styles.splitImg}><img src={img('gs-ctb-email', 1400)} alt="The redesigned Ceased to Breathe notification email." loading="lazy" /></div>
        </Reveal>
        <div className={styles.cHalfR}>
          <Reveal className={styles.label}>04 · Systemic</Reveal>
          <Reveal as="h3" className={styles.h3} style={{ marginTop: '0.8rem' }}>Dignity, infused into the workflow.</Reveal>
          <Reveal as="p" className={styles.body}>
            A redesigned patient-death notification email with compassionate visuals and language that acknowledges the impact of loss. By naming not just the patient but everyone who cared for them, it creates a moment of collective acknowledgment, infused into the workflow without adding administrative burden.
          </Reveal>
        </div>
      </Section>

      {/* SEAM — concept to production */}
      <Section tone="Sand" className={styles.rowTop}>
        <NumBlock n="05" label="Concept to production" />
        <Reveal as="p" className={`${styles.cTextL} ${styles.lede}`}>
          The emotional outlet began as a digital “Garden” — an app where staff would speak a feeling and watch it bloom on a shared screen, with the patterns giving leadership anonymous insight. In production, that concept gave way to the physical Community Art Wall, where expression is tactile and human. The honest version of this story is that the most ambitious idea was not the one that shipped, and the project was stronger for it.
        </Reveal>
      </Section>

      {/* ════════ ACT III · SHAPE ════════ */}
      <ActDivider act={ACTS[2]} />

      {/* the build, iterated — immersive horizontal threshold */}
      <IterationScroll items={ITERATION} />

      {/* decompression + designed timeline */}
      <Section tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="07" label="Ten weeks, four phases" />
        <Reveal as="p" className={`${styles.cTextL} ${styles.body}`}>
          Over a 10-week production sprint, we turned concept into installation, backed by roughly $30,000 in donated materials and services. I led donor outreach and secured the pod, woodworking, the sensor, the ceramic finger labyrinths, and the door locks. Working remotely, I focused on coordination, documentation, and strategy.
        </Reveal>
        <div className={styles.cWide}>
          <ol className={styles.track}>
            {TIMELINE.map((t, i) => (
              <Reveal as="li" key={t.t} className={styles.seg} style={{ flexGrow: t.span, flexBasis: 0 }} delay={i * 0.06}>
                <span className={styles.segBar} aria-hidden="true" />
                <span className={styles.segName}>{t.t}</span>
                <span className={styles.segDur}>{t.d}</span>
                <span className={styles.segCtx}>{t.c}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* PLAYTEST — claim left, quotes staggered */}
      <Section tone="Paper" className={styles.rowTop}>
        <NumBlock n="08" label="Play testing" />
        <div className={styles.cTextL}>
          <Reveal as="h2" className={styles.h2}>Thirty testers. Three critical changes.</Reveal>
          <Reveal as="p" className={styles.body}>
            We pilot-tested the pod and its rituals with thirty staff before install, and their responses reshaped the final details, from the pacing of the meditations to the way the space invites you in.
          </Reveal>
        </div>
        <Reveal as="blockquote" className={`${styles.cTextR} ${styles.pullQuote}`} style={{ marginTop: '1rem' }}>{PLAYTEST_QUOTES[0]}</Reveal>
        <Reveal as="blockquote" className={`${styles.cHalfL} ${styles.pullQuote}`} delay={0.05} style={{ marginTop: '2.5rem' }}>{PLAYTEST_QUOTES[1]}</Reveal>
        <Reveal as="blockquote" className={`${styles.cTextR} ${styles.pullQuote}`} delay={0.05} style={{ marginTop: '2.5rem' }}>{PLAYTEST_QUOTES[2]}</Reveal>
      </Section>

      {/* ════════ OUTCOME ════════ */}
      <Section id="outcome" tone="Porcelain" className={styles.rowTop}>
        <NumBlock n="09" label="The outcome" />
        <div className={styles.cTextL}>
          <Reveal as="h2" className={styles.h2}>Installed, and launched as a 12-month pilot.</Reveal>
          <Reveal as="p" className={styles.body}>
            Groundswell is installed at UPMC Magee-Womens Hospital, launching a 12-month quality-improvement study for Cancer Services staff. We built a data-visualization platform to track and communicate findings, integrating survey data with documentation.
          </Reveal>
        </div>
        <Reveal as="blockquote" className={`${styles.cTextR} ${styles.bigQuote}`} style={{ marginTop: '1rem' }}>
          “Groundswell reminds us that caring for patients begins with caring for the people who serve them.”
          <cite>Samantha Williams, Director of Women’s Cancer Services, UPMC</cite>
        </Reveal>
      </Section>

      <Cinematic k="gs-finale" cap="The team at completion, in front of the installed Community Art Wall." credit />

      {/* REFLECTION — warm close, constrained and generous */}
      <Section tone="Sand">
        <Reveal as="p" className={`${styles.cMid} ${styles.reflectLede}`}>
          What Groundswell changed for me is a strong belief in, and foundation for, co-design and generative design methodology: the power that comes from relational practices, and the role of the designer as a facilitator of existing wisdom, a connector across scales, a translator between stakeholders.
        </Reveal>
        <Reveal as="p" className={`${styles.cMid} ${styles.reflectBody}`}>
          We learned to attune our process to amplify rather than impose, to honor existing community innovations, and to build trust through sustained presence — not as outsiders with solutions, but as collaborators creating conditions for what’s already trying to emerge.
        </Reveal>
        <Reveal as="p" className={`${styles.cMid} ${styles.reflectClose}`}>Because true patient-centered care includes the healers.</Reveal>
      </Section>

      {/* CREDITS */}
      <Section tone="Porcelain" tight className={styles.rowTop}>
        <Reveal className={styles.cHalfL}>
          <p className={styles.label}>Role</p>
          <p className={styles.creditName}>Lorin Anderberg</p>
          <ul className={styles.roleList}>{ROLE.map((r) => <li key={r} className={styles.roleItem}>{r}</li>)}</ul>
        </Reveal>
        <Reveal className={styles.cHalfR} delay={0.08}>
          <p className={styles.label}>In collaboration with</p>
          <ul className={styles.collabList}>
            {COLLABORATORS.map((c) => (
              <li key={c.who} className={styles.collabItem}><span className={styles.collabWho}>{c.who}</span><span className={styles.collabWhat}>{c.what}</span></li>
            ))}
          </ul>
        </Reveal>
      </Section>

      {/* GO DEEPER */}
      <Section tone="Porcelain" tight>
        <Reveal className={styles.cTextL}>
          <p className={styles.label}>Go deeper</p>
          <div className={styles.deeperLinks}>
            <a className={styles.deeperLink} href={MEDIUM} target="_blank" rel="noopener noreferrer">Read the full field documentation <span aria-hidden="true">→</span></a>
            <a className={styles.deeperLink} href={CMU} target="_blank" rel="noopener noreferrer">Read the CMU feature <span aria-hidden="true">→</span></a>
          </div>
          <ShapeMark className={styles.signoff} gradientColors={FLOWER_GRADIENT} />
        </Reveal>
      </Section>
    </div>
  )
}
