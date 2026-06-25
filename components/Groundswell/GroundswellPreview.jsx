'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import ShapeMark from '@/components/marks/ShapeMark'
import { cloudImg, GS_IMAGES } from '@/lib/cloudinary'
import styles from './GroundswellPreview.module.css'

/* ============================================================================
   Groundswell — case-study template, rebuilt as ONE editorial form.

   The corpus (docs/case-study-editorial/REFERENCES.md) converges on a single
   shape: a long-form feature that falls down a single reading column, punctuated
   by full-bleed cinematic act-dividers. The rhythm is a heartbeat —
     dark claim  →  light reading + inline evidence  →  full-bleed photo proof.
   Sense / Weave / Shape are the three breaths, bookended by the question-hero
   (the hook Lorin loved) and a quiet close.

   Principles pulled straight from the two LOVEs and the rest of the set:
   · research as reasoning, not decoration (CNN, Buck, ByHeart-as-caution)
   · one focal point at a time — no carousels, no competing rails (Hex Pens, Buck)
   · problem-first hook with stakes kept visible (CNN)
   · first-person ownership + concrete specifics (Beakery, Explora)
   · restraint and breath; type and space over decorative color (Bernard, Simms)
   · palette = the real homepage tokens, so it belongs to the site.
   Copy is Lorin's own words, untouched. Connective framing stays plain and true.
   ============================================================================ */

const FLOWER_GRADIENT = ['#9FB07E', '#E4B6A4', '#B79BC4']
const CMU = 'https://cfa.cmu.edu/magazine/groundswell-designing-systems-care-those-who-care'
const MEDIUM =
  'https://medium.com/@lorinanderberg/design-with-care-for-oncology-exploring-supportive-environments-for-health-care-workers-cd0d6800ddd9'

const img = (key, w = 1600) => cloudImg(GS_IMAGES[key], w)

// Quiet left spine — five ticks, the three acts bookended by overview + outcome.
const RAIL = [
  { id: 'standfirst', label: 'Overview' },
  { id: 'act-sense', label: 'Sense' },
  { id: 'act-weave', label: 'Weave' },
  { id: 'act-shape', label: 'Shape' },
  { id: 'outcome', label: 'Outcome' },
]

// Sense → Weave → Shape: Lorin's practice, doubling as the project arc. Each is
// a cinematic dark chapter break. Lines are her own.
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

const DIMENSIONS = [
  { name: 'Recognition', need: 'feeling seen and appreciated', answer: 'Community Art Wall' },
  { name: 'Environment', need: 'workspace quality and resources', answer: 'Restorative Pod' },
  { name: 'Culture', need: 'team norms and shared care', answer: 'Reflection Cards' },
  { name: 'Systemic', need: 'constraints beyond the individual', answer: 'Ceased to Breathe email' },
]

// Components ordered to match the four dimensions above (Buck: one concept,
// isolated, per vertical beat — no deck, no carousel).
const COMPONENTS = [
  {
    n: '01', name: 'Community Art Wall', dimension: 'Recognition', image: 'gs-artwall', credit: true,
    body:
      'A community art wall that invites participation through anonymous shared emotional expression across the full spectrum of oncology experiences. We built it as a safe, anonymous place to share and understand what others are feeling, giving public, collective voice to the cancer care community.',
  },
  {
    n: '02', name: 'Restorative Pod', dimension: 'Environment', image: 'gs-pod-detail-01',
    body:
      'A dedicated space for emotional decompression through mindfulness activities like guided meditation. Staff save their tears for the car ride home or the bathroom stall; nestled where telephone booths once were, the pod reinforces that emotional labor is real work deserving of real space.',
  },
  {
    n: '03', name: 'Reflection Cards', dimension: 'Culture', image: 'gs-cards', credit: true,
    body:
      'My own healing journey led me to somatics and nervous-system approaches to well-being, and I wanted to channel that into the content. Each card starts with validation, then offers an invitation to try a somatic exercise — an entry point for building a relationship with the body and a ritual to return to for self-care.',
  },
  {
    n: '04', name: 'Ceased to Breathe Email', dimension: 'Systemic', image: 'gs-ctb-email', credit: true,
    body:
      'A redesigned patient-death notification email with compassionate visuals and language that acknowledges the impact of loss. By naming not just the patient but everyone who cared for them, it creates a moment of collective acknowledgment, infused into the workflow without adding administrative burden.',
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

/* ── play-once reveal: paused state in CSS, IntersectionObserver flips it ── */
function useInViewOnce(threshold = 0.32) {
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

/** Generic on-enter reveal wrapper. */
function Reveal({ children, className = '', as = 'div', delay = 0, threshold }) {
  const [ref, inView] = useInViewOnce(threshold)
  const Tag = as
  return (
    <Tag
      ref={ref}
      className={`${styles.rise} ${inView ? styles.in : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}

/** A light reading section — the single column. One idea, breathing. */
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

/** Full-bleed cinematic evidence — captioned proof, never a carousel (Buck). */
function Cinematic({ k, cap, credit, ratio }) {
  const [ref, inView] = useInViewOnce(0.2)
  return (
    <figure ref={ref} className={`${styles.cinematic} ${inView ? styles.in : ''}`}>
      <div className={styles.cinematicMedia} style={ratio ? { aspectRatio: ratio } : undefined}>
        <img src={img(k, 2200)} alt={cap} loading="lazy" />
        {credit && <span className={styles.cinematicCredit}>Artwork: Carolyn Gavin</span>}
      </div>
      {cap && (
        <figcaption className={styles.cinematicCap}>
          <span className={styles.capTick} aria-hidden="true" />
          {cap}
        </figcaption>
      )}
    </figure>
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
        <h2 className={styles.actName}>
          <span className={styles.actMask}><span className={styles.actNameInner}>{act.name}</span></span>
        </h2>
        <p className={styles.actPhase}>{act.phase}</p>
        <p className={styles.actLine}>{act.line}</p>
      </div>
    </section>
  )
}

export default function GroundswellPreview() {
  const [active, setActive] = useState('standfirst')
  const [showRail, setShowRail] = useState(false)
  const heroRef = useRef(null)

  // Rail wayfinding + reveal-after-hero.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-45% 0px -45% 0px' }
    )
    RAIL.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) obs.observe(el)
    })
    const onScroll = () => setShowRail(window.scrollY > window.innerHeight * 0.85)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => { obs.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  // The hook: on load the photo blooms and the research question wipes up line by
  // line behind a mask. Honors reduced motion.
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
      {/* ── header ── */}
      <header className={styles.topbar}>
        <span className={styles.topbarName}>Lorin Anderberg</span>
        <span className={styles.topbarCenter}>
          <ShapeMark className={styles.topbarMark} gradientColors={FLOWER_GRADIENT} />
          <span className={styles.topbarProject}>Groundswell</span>
        </span>
        <a className={styles.topbarBack} href="/">All work</a>
      </header>

      {/* ── quiet left spine ── */}
      <nav className={`${styles.rail} ${showRail ? styles.railOn : ''}`} aria-label="Sections">
        {RAIL.map((c) => (
          <a key={c.id} href={`#${c.id}`} className={`${styles.railItem} ${active === c.id ? styles.railActive : ''}`}>
            <span className={styles.railTick} />
            <span className={styles.railLabel}>{c.label}</span>
          </a>
        ))}
      </nav>

      {/* ── HERO · the question reveals on load ── */}
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
        <div className={styles.scrollCue} aria-hidden="true" data-hero-cue>
          <span>Scroll</span><span className={styles.scrollLine} />
        </div>
      </section>

      {/* ── STANDFIRST · the 90-second orientation (manager can stop here) ── */}
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

      {/* first cinematic breath — the installed work */}
      <Cinematic k="gs-install-upmc" cap="Groundswell, installed in a Cancer Services corridor at UPMC Magee-Womens Hospital." credit ratio="16 / 9" />

      {/* ════════ ACT I · SENSE ════════ */}
      <ActDivider act={ACTS[0]} />

      <Read id="context" n="01" label="The context">
        <Reveal as="h2" className={styles.h2}>Healthcare workers carry a dual burden.</Reveal>
        <Reveal as="p" className={styles.body}>
          The compassionate nature of the work means constant exposure to grief, loss, and trauma, set alongside administrative tasks that disconnect staff from the patient care that drew them in. The numbers are not edge cases. <b className={styles.inlineStat}>1 in 5</b> U.S. healthcare workers have experienced PTSD. <b className={styles.inlineStat}>73%</b> of emergency physicians report stigma around mental-health treatment, and <b className={styles.inlineStat}>27%</b> avoid treatment entirely, fearing professional consequences.
        </Reveal>
        <Reveal as="p" className={styles.statement}>
          This is not an individual failure. It is a systemic one.
        </Reveal>
      </Read>

      <Read n="02" label="What we heard">
        <Reveal as="h2" className={styles.h2}>Over 15 weeks, I listened.</Reveal>
        <Reveal as="p" className={styles.body}>
          Part of what healed me was feeling connected to others who carry contradicting, complex emotional experiences with grace, who find their way back to gratitude even when devastated. As someone already aware of burnout in healthcare, it was not so much shocking as activating to hear, again and again, how under-resourced staff are to carry the emotional toll.
        </Reveal>
        <Reveal as="p" className={styles.method}>
          Shadowing across the unit · 8 contextual interviews · 2 generative research workshops.
        </Reveal>
        <div className={styles.quoteRun}>
          {STAFF_QUOTES.map((q, i) => (
            <Reveal as="blockquote" key={i} className={styles.pullQuote} delay={i * 0.05}>
              {q}
            </Reveal>
          ))}
        </div>
      </Read>

      <Cinematic k="gs-workshop-grief-01" cap="A generative workshop with staff: mapping where grief lives in the workday." ratio="16 / 9" />

      <Read id="synthesis" n="03" label="From insight to intervention">
        <Reveal as="h2" className={styles.h2}>The research resolved into four dimensions of well-being.</Reveal>
        <Reveal as="p" className={styles.body}>
          Each is a need staff named. We chose interventions so that, together, they would answer every one.
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

      {/* ════════ ACT II · WEAVE ════════ */}
      <ActDivider act={ACTS[1]} />

      <Read id="ecosystem" n="04" label="The ecosystem">
        <Reveal as="h2" className={styles.h2}>Four interventions, each answering a dimension.</Reveal>
        <Reveal as="p" className={styles.body}>
          Not four products. One connected ecosystem, where recognition, environment, culture, and the systemic forces around the work each have a place to live.
        </Reveal>
      </Read>

      {/* component specimens — one focal point each, full-bleed proof */}
      {COMPONENTS.map((c) => (
        <section key={c.n} className={styles.specimen}>
          <Cinematic k={c.image} cap={`${c.name}, in use.`} credit={c.credit} ratio="16 / 10" />
          <div className={styles.column}>
            <Reveal className={styles.specimenHead}>
              <span className={styles.specimenNum}>{c.n}</span>
              <span className={styles.specimenDim}>Answers {c.dimension}</span>
            </Reveal>
            <Reveal as="h3" className={styles.h3}>{c.name}</Reveal>
            <Reveal as="p" className={styles.body}>{c.body}</Reveal>
          </div>
        </section>
      ))}

      <Read n="05" label="Concept to production">
        <Reveal as="h2" className={styles.h2}>From a digital garden to a physical wall.</Reveal>
        <Reveal as="p" className={styles.body}>
          The emotional outlet began as a digital “Garden” — an app where staff would speak a feeling and watch it bloom on a shared screen, with the patterns giving leadership anonymous insight. In production, that concept gave way to the physical Community Art Wall, where expression is tactile and human. The honest version of this story is that the most ambitious idea was not the one that shipped, and the project was stronger for it.
        </Reveal>
      </Read>

      {/* ════════ ACT III · SHAPE ════════ */}
      <ActDivider act={ACTS[2]} />

      <Read id="making" n="06" label="The making">
        <Reveal as="h2" className={styles.h2}>Concept to installation in ten weeks.</Reveal>
        <Reveal as="p" className={styles.body}>
          Over a 10-week production sprint, we turned concept into installation, backed by roughly $30,000 in donated materials and services. I led donor outreach and secured the pod, woodworking, the sensor, the ceramic finger labyrinths, and the door locks. It was my meditation teacher, Catherine Liggett, who volunteered to author and record the meditations. Working remotely, I focused on coordination, documentation, and strategy.
        </Reveal>
        <ol className={styles.timeline}>
          {TIMELINE.map((t, i) => (
            <Reveal as="li" key={t.t} className={styles.timeRow} delay={i * 0.05}>
              <span className={styles.timeT}>{t.t}</span>
              <span className={styles.timeD}>{t.d}</span>
              <span className={styles.timeC}>{t.c}</span>
            </Reveal>
          ))}
        </ol>
      </Read>

      <Cinematic k="gs-making-install-01" cap="Installation day at UPMC Magee-Womens Hospital." ratio="16 / 9" />

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

      {/* ── REFLECTION · the close ── */}
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
                <li key={c.who} className={styles.collabItem}>
                  <span className={styles.collabWho}>{c.who}</span>
                  <span className={styles.collabWhat}>{c.what}</span>
                </li>
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
