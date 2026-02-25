'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GroundswellCaseStudy.module.css'
import { cloudImg, cloudVideo, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import Lightbox from '@/components/Lightbox/Lightbox'
import ScrollVideo from '@/components/ScrollVideo/ScrollVideo'
import ProjectSidebar from '@/components/ProjectSidebar/ProjectSidebar'
import { SenseIcon, WeaveIcon, ShapeIcon } from './PhaseIcons'
import SystemMap from './SystemMap'
import ReflectionCards from './ReflectionCards'
import GsAudioPlayer from './GsAudioPlayer'
import PressCards from './PressCards'

gsap.registerPlugin(ScrollTrigger)

// ─── Cloudinary helpers ───
const gsImg = (key, w) => cloudImg(GS_IMAGES[key], w)
const gsVid = (key) => cloudVideo(GS_VIDEOS[key])

// ─── Metadata ───
const metadata = [
  { label: 'Client', value: 'UPMC Magee-Womens Hospital, Cancer Services' },
  { label: 'Duration', value: '15 wk research · 10 wk production · ongoing' },
  { label: 'Role', value: 'Research, Co-Design, Copywriting, Coordination, Donor Outreach' },
  { label: 'Status', value: '12-month Quality Improvement Study' },
]

// ─── Sidebar sections ───
const SIDEBAR_SECTIONS = [
  { id: 'hook', label: 'The Work', phase: null },
  { id: 'context', label: 'Context', phase: null },
  { id: 'stakes', label: 'Stakes', phase: null },
  { id: 'sense', label: 'Reading the Room', phase: 'sense' },
  { id: 'trust', label: 'Building Trust', phase: 'sense' },
  { id: 'weave', label: 'Synthesis', phase: 'weave' },
  { id: 'turning', label: 'The Turning Point', phase: 'weave' },
  { id: 'shape', label: 'The Ecosystem', phase: 'shape' },
  { id: 'making', label: 'Making It Real', phase: 'shape' },
  { id: 'testing', label: 'Testing', phase: null },
  { id: 'impact', label: 'Impact', phase: null },
  { id: 'reflection', label: 'Reflection', phase: null },
]

// ─── Evolution rows ───
const evolutionRows = [
  { pitched: 'Digital art wall', built: 'Physical installation', why: 'tangibility > reach' },
  { pitched: 'Resource guide', built: '56-card reflection deck', why: 'embodied practice > information' },
  { pitched: 'Pod concept', built: 'Full meditation ecosystem', why: 'ritual > furniture' },
  { pitched: 'CTB protocol update', built: 'CTB compassionate redesign', why: 'stayed close — the right call' },
]

// ─── Achievement facts ───
const achievements = [
  { accent: 'Grant-funded', rest: 'by UPMC Magee-Womens Hospital Medical Staff Fund' },
  { accent: '$30K+', rest: 'in donated materials and services secured' },
  { accent: '12-month', rest: 'Quality Improvement study launched October 2025' },
  { accent: 'Peer review', rest: '— research paper submitted' },
]

// ─── Partners ───
const partners = [
  { name: 'NookPod', role: '$13K pod structure' },
  { name: 'Catherine Liggett', role: 'meditation recordings' },
  { name: 'Local woodworking community', role: 'custom wood materials' },
  { name: 'Schlage', role: 'lock hardware' },
  { name: 'Ceramic artist', role: 'finger tracing stones' },
  { name: 'Vinyl printer', role: 'discounted printing' },
  { name: 'Volunteer fabricator', role: '→ paid partner' },
  { name: 'CancerBridges', role: 'research partnership' },
]

// ─── Dimensions ───
const dimensions = [
  { label: 'Recognition', desc: 'feeling appreciated', color: 'var(--color-sage-soft)' },
  { label: 'Environment', desc: 'workspace quality and wellbeing resources', color: 'var(--color-chalcedony-soft)' },
  { label: 'Culture', desc: 'positive team dynamics and workplace norms', color: 'var(--color-terracotta-soft)' },
  { label: 'Systemic', desc: 'institutional constraints beyond individual control', color: 'var(--color-plum-soft)' },
]

// ─── Feedback fixes ───
const feedbackFixes = [
  {
    number: '01',
    title: 'Accessibility',
    problem: 'Participants with larger bodies reported discomfort with table positioning, limiting their ability to rest comfortably.',
    quote: "Uncomfortable for larger people. I wished to rest my head on the table but couldn't get comfortable.",
    solution: 'We sawed 2 inches from the table depth to accommodate a wider range of body sizes and postures.',
  },
  {
    number: '02',
    title: 'Wayfinding',
    problem: 'Multiple participants expressed confusion about where to start, creating anxiety that undermined the calming intent.',
    quote: "Not sure what to do first. I was worried about doing something wrong — eventually I let go of that, but it took time.",
    solution: 'We added clear step-by-step instructions, making the digital meditation library the explicit first step to set intention.',
  },
  {
    number: '03',
    title: 'Entry Ritual',
    problem: 'Participants who started with music reported significantly deeper engagement with all other pod activities.',
    quote: "The music was wonderful — it really set the tone and helped me settle in.",
    solution: 'We repositioned the table centerpiece and ensured music exploration was the first instruction step.',
    isLast: true,
  },
]

// ─── Hand-drawn SVG decorations ───
function HandUnderline({ color = 'var(--color-sage)', width = 200 }) {
  return (
    <svg
      width={width}
      height="8"
      viewBox={`0 0 ${width} 8`}
      fill="none"
      className={styles.handUnderline}
      aria-hidden="true"
    >
      <path
        d={`M2 5C${width * 0.15} 2,${width * 0.3} 7,${width * 0.5} 4S${width * 0.75} 2,${width - 2} 5`}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

function HandCircle({ color = 'var(--color-plum-soft)', width = 220, height = 40 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      style={{ position: 'absolute', top: -6, left: -12, pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <ellipse
        cx={width / 2}
        cy={height / 2}
        rx={width / 2 - 4}
        ry={height / 2 - 4}
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        opacity={0.35}
        strokeDasharray="4 3"
      />
    </svg>
  )
}

// ─── PivotQuote — inline scroll-triggered animation ───
function PivotQuote() {
  const containerRef = useRef(null)
  const strikeRef = useRef(null)
  const arrowRef = useRef(null)
  const reframeRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const strikePath = strikeRef.current
    if (!strikePath) return
    const length = strikePath.getTotalLength()
    gsap.set(strikePath, { strokeDasharray: length, strokeDashoffset: length })
    gsap.set(arrowRef.current, { opacity: 0 })
    gsap.set(reframeRef.current, { opacity: 0, y: 12 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true,
      },
    })

    tl.to(strikePath, { strokeDashoffset: 0, duration: 0.8, ease: 'power1.inOut' })
      .to(arrowRef.current, { opacity: 1, duration: 0.4, ease: 'power1.inOut' }, '-=0.2')
      .to(reframeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power1.inOut' }, '-=0.1')

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === containerRef.current) st.kill()
      })
    }
  }, [])

  // Static text width for the strikethrough SVG
  const strikeWidth = 320

  return (
    <div ref={containerRef} className={styles.pivotQuote}>
      <div className={styles.pivotStruck}>
        <span>Making Space for Grief, Together</span>
        <svg
          width={strikeWidth}
          height="6"
          viewBox={`0 0 ${strikeWidth} 6`}
          className={styles.pivotStrikeSvg}
          aria-hidden="true"
        >
          <path
            ref={strikeRef}
            d={`M0 3C${strikeWidth * 0.2} 1,${strikeWidth * 0.4} 5,${strikeWidth * 0.6} 3S${strikeWidth * 0.8} 1,${strikeWidth} 3`}
            stroke="var(--color-ink-faint)"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <span ref={arrowRef} className={styles.pivotArrow}>→</span>
      <div ref={reframeRef} className={styles.pivotReframe}>
        Making Space to Restore, Together
      </div>
    </div>
  )
}

// ─── Reusable lightbox image button ───
function LightboxImage({ imageKey, width, alt, className, style, openLightbox }) {
  return (
    <button
      className={styles.lightboxTrigger}
      onClick={() => openLightbox(gsImg(imageKey, 1600))}
      aria-label={`View full size: ${alt}`}
    >
      <img
        src={gsImg(imageKey, width)}
        alt={alt}
        className={className || styles.projectImage}
        loading="lazy"
        style={style}
      />
    </button>
  )
}


// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function GroundswellCaseStudy() {
  // ─── Lightbox ───
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const openLightbox = useCallback((src) => setLightboxSrc(src), [])
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  return (
    <div className={styles.caseStudy}>

      {/* ═══ FLEX WRAPPER: Sidebar + Content ═══ */}
      <div className={styles.sidebarLayout}>
        <ProjectSidebar sections={SIDEBAR_SECTIONS} metadata={metadata} />

        <div className={styles.content}>

          {/* ═══ SECTION 1: HOOK ═══ */}
          <section id="hook" data-section="hook">
            <div className={`${styles.narrow} ${styles.threshold}`}>
              <AnimatedElement>
                <p className={styles.thresholdLabel}>A Design Ecology for Staff Well-Being</p>
              </AnimatedElement>
              <AnimatedElement delay={100}>
                <h1 className={styles.thresholdTitle}>Groundswell</h1>
              </AnimatedElement>
              <AnimatedElement delay={150}>
                <p className={styles.thresholdSubtitle}>Making Space to Restore, Together</p>
              </AnimatedElement>
              <AnimatedElement delay={200}>
                <div className={styles.thresholdTags}>
                  {['Co-Production', 'Healthcare', 'Co-Design'].map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </AnimatedElement>

              {/* Desktop metadata is in the sidebar; mobile metadata inline */}
              <AnimatedElement delay={250}>
                <div className={styles.mobileMetadata}>
                  <div className={styles.metadataGrid}>
                    {metadata.map((item, i) => (
                      <div key={i} className={styles.metadataCell}>
                        <p className={styles.metadataLabel}>{item.label}</p>
                        <p className={styles.metadataValue}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Image gallery */}
            <div className={styles.wide} style={{ paddingBottom: 'var(--space-xl)' }}>
              <AnimatedElement>
                <div className={styles.imageGridFeatured}>
                  <LightboxImage imageKey="gs-context-01" width={800} alt="Reflection Cards — close-up with language visible" openLightbox={openLightbox} style={{ height: 420, objectFit: 'cover' }} />
                  <div className={styles.imageGridFeaturedRight}>
                    <LightboxImage imageKey="gs-pod" width={600} alt="Restorative Pod installed in hospital" openLightbox={openLightbox} style={{ flex: 1, objectFit: 'cover' }} />
                    <LightboxImage imageKey="gs-artwall" width={600} alt="Community Art Wall" openLightbox={openLightbox} style={{ flex: 1, objectFit: 'cover' }} />
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement delay={150}>
                <div className={styles.imageGrid2col} style={{ marginTop: 'var(--space-sm)' }}>
                  <LightboxImage imageKey="gs-ctb-email" width={600} alt="CTB Email Redesign" openLightbox={openLightbox} style={{ height: 240, objectFit: 'cover' }} />
                  <LightboxImage imageKey="gs-pod-detail-01" width={600} alt="Pod interior — meditation library, tracing stones" openLightbox={openLightbox} style={{ height: 240, objectFit: 'cover' }} />
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 2: CONTEXT ═══ */}
          <section
            className={styles.room}
            id="context"
            data-section="context"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <p className={styles.body}>
                  Healthcare workers in oncology carry a particular weight. They form deep relationships with patients over months of treatment — and then lose them. This grief accumulates without ceremony, without pause, without acknowledgment.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  We were asked to explore well-being support for the Gynecologic Oncology staff at UPMC Magee-Womens Hospital. What emerged was not a product or a service, but a <span className={styles.em} style={{ color: 'var(--color-sage)' }}>design ecology</span> — an interconnected system of touchpoints that gives staff permission to feel, restore, and reconnect on their own terms.
                </p>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 3: STAKES — DARK ═══ */}
          <section
            className={styles.sectionDark}
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
            id="stakes"
            data-section="stakes"
            data-dark-section
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>1 in 5</p>
                    <p className={styles.statDesc}>U.S. healthcare workers have experienced PTSD</p>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>73%</p>
                    <p className={styles.statDesc}>of emergency physicians report stigma around mental health treatment</p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <p className={`${styles.bodyDark} ${styles.bodyCenter}`}>
                  Healthcare workers in oncology carry compounded grief — repeated exposure to loss that accumulates when not processed. This is not an individual failure. It is a <span className={styles.em} style={{ color: 'rgba(255,255,255,0.95)' }}>systemic</span> one.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-plum-soft)', opacity: 0.3 }}>&ldquo;</span>
                  <p className={`${styles.heroQuoteText} ${styles.heroQuoteTextDark}`}>
                    I was not prepared for this. No one officially trained me on the emotional trauma that this job causes.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-plum-soft)', opacity: 0.5 }} />
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-plum-soft)', opacity: 0.3 }}>&ldquo;</span>
                  <p className={`${styles.heroQuoteText} ${styles.heroQuoteTextDark}`}>
                    There is no time to grieve. Once someone passes there is no time to grieve the loss before another person comes in.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-plum-soft)', opacity: 0.5 }} />
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 4: SENSE ═══ */}
          <section
            className={styles.room}
            id="sense"
            data-section="sense"
            data-phase="sense"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <div className={styles.phaseRow}>
                    <SenseIcon />
                    <span className={styles.phaseLabel} style={{ color: 'var(--color-sage)' }}>Sense</span>
                  </div>
                  <h2 className={styles.phaseTitle}>Reading the Room Before Designing Anything</h2>
                  <div className={styles.accentBar} style={{ background: 'var(--color-sage)' }} />
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body} style={{ marginTop: 'var(--space-xs)' }}>
                  We were asked to explore well-being support for the Gynecologic Oncology staff. We came as outsiders — we named that from the start. We haven&apos;t lived this. We hadn&apos;t earned trust yet. So we started by <span className={styles.em} style={{ color: 'var(--color-sage)' }}>listening</span>.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  Within minutes of holding space for conversation, tears surfaced. Staff saved their tears for the car ride home or the bathroom stall. Emotion was running just beneath the surface with nowhere to go.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <figure className={styles.figure}>
                  <LightboxImage imageKey="gs-workshop-flower-01" width={1200} alt="Workshop moment — participants in Nourishing the Flower activity" openLightbox={openLightbox} style={{ height: 400, objectFit: 'cover' }} />
                  <figcaption className={styles.caption}>Nourishing the Flower and Women in White Coats — surfacing what sustains alongside what erodes</figcaption>
                </figure>
              </AnimatedElement>
            </div>

            <div className={styles.narrow} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <p className={styles.body}>
                  We partnered with CancerBridges to honor women in cancer care. Using the anatomy of a flower as a metaphor for workplace health, participants mapped their experiences — one flourishing, one wilting. Each received a hand-made orchid pin they could add to a shared poster.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.imageGrid2col}>
                  <figure className={styles.figure}>
                    <LightboxImage imageKey="gs-workshop-flower-02" width={600} alt="Orchid poster with participant handwriting" openLightbox={openLightbox} style={{ height: 300, objectFit: 'cover' }} />
                    <figcaption className={styles.caption}>Orchid poster — reflections on care and self-care</figcaption>
                  </figure>
                  <figure className={styles.figure}>
                    <LightboxImage imageKey="gs-workshop-coats-01" width={600} alt="Completed flower worksheets" openLightbox={openLightbox} style={{ height: 300, objectFit: 'cover' }} />
                    <figcaption className={styles.caption}>Nourishing the Flower — what sustains and what erodes</figcaption>
                  </figure>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 5: TRUST (Sense continued) ═══ */}
          <section
            id="trust"
            data-section="trust"
            data-phase="sense"
            style={{ paddingBottom: 'var(--space-xl)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <p className={styles.body}>
                  But what struck me most was what they had already built. Every desk was decorated with cards from patients and families, photos, words of encouragement. These people love what they do. They care deeply.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <div style={{ marginTop: 'var(--space-lg)' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-pull-quote)', fontWeight: 'var(--weight-title)', color: 'var(--color-ink)', lineHeight: 1.3, margin: 0 }}>
                    They know what they need — <span style={{ position: 'relative', display: 'inline-block' }}>
                      no one had asked.
                      <span style={{ position: 'absolute', bottom: -4, left: 0 }}>
                        <HandUnderline color="var(--color-sage)" width={180} />
                      </span>
                    </span>
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.lessonMoment} ${styles.lessonMomentLight}`}>
                  <span className={`${styles.lessonLabel} ${styles.lessonLabelLight}`}>✦ Lesson</span>
                  <p className={`${styles.lessonText} ${styles.lessonTextLight}`}>
                    The most meaningful support emerges from within a community. Our job was amplification, not invention.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 6: WEAVE ═══ */}
          <section
            id="weave"
            data-section="weave"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 0 }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <div className={styles.phaseRow}>
                    <WeaveIcon />
                    <span className={styles.phaseLabel} style={{ color: 'var(--color-plum)' }}>Weave</span>
                  </div>
                  <h2 className={styles.phaseTitle}>Where the Thinking Lives</h2>
                  <div className={styles.accentBar} style={{ background: 'var(--color-plum)' }} />
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body} style={{ marginTop: 'var(--space-xs)' }}>
                  We organized hundreds of observations and quotes through affinity mapping, searching for patterns across four dimensions.
                </p>
              </AnimatedElement>
            </div>
          </section>

          {/* Weave — Dark Tetrahedron */}
          <section
            className={styles.sectionDark}
            style={{ paddingTop: 80, paddingBottom: 80, marginTop: 'var(--space-lg)' }}
            data-dark-section
          >
            <div className={styles.wide}>
              <AnimatedElement>
                <div className={styles.dimensionsGrid}>
                  {dimensions.map((dim, i) => (
                    <div key={i} className={styles.dimensionCard} style={{ borderLeft: `3px solid ${dim.color}` }}>
                      <p className={styles.dimensionTitle}>{dim.label}</p>
                      <p className={styles.dimensionDesc}>{dim.desc}</p>
                    </div>
                  ))}
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <LightboxImage imageKey="Synthesis-diagram" width={1200} alt="Tetrahedron Synthesis — full diagram showing four dimensions of well-being" openLightbox={openLightbox} style={{ marginTop: 'var(--space-md)' }} />
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.voidBlock}>
                  <img
                    src={gsImg('gs-sense-affinity-01', 800)}
                    alt="The Void — zoomed detail of synthesis"
                    className={`${styles.projectImage} ${styles.voidImage}`}
                    loading="lazy"
                    style={{ height: 360, objectFit: 'cover' }}
                  />
                  <div className={styles.voidText}>
                    <p className={styles.voidTitle}>The Void</p>
                    <p className={styles.bodyDark}>
                      While patient-centered care aims to improve health outcomes, it often neglects the well-being of healthcare workers. In a profit-driven, hierarchical system that treats staff as disposable, the intense focus on patients comes at the cost of worker support.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 7: TURNING POINT (Weave continued) ═══ */}
          <section
            id="turning"
            data-section="turning"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>The CTB Revelation</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  We had been told the Ceased to Breathe email — the notification sent when a patient dies — was a cold clinical protocol. We presented it that way in a feedback session.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  A nurse broke down in tears. She had created that protocol. It was her innovation — born from wanting colleagues to learn about patient deaths with <span className={styles.em} style={{ color: 'var(--color-plum)' }}>dignity</span>, not from a hallway whisper.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-plum)', opacity: 0.2 }}>&ldquo;</span>
                  <p className={styles.heroQuoteText}>
                    <span style={{ position: 'relative', display: 'inline' }}>
                      They were already innovating
                      <HandCircle color="var(--color-plum-soft)" width={260} height={38} />
                    </span> — they lacked support to reach the full potential of their ideas.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-plum)', opacity: 0.35 }} />
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  We shifted our entire narrative: from &ldquo;the system let you down&rdquo; to <span className={styles.em} style={{ color: 'var(--color-plum)' }}>&ldquo;you have already created something remarkable — we want to amplify it.&rdquo;</span>
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.lessonMoment} ${styles.lessonMomentLight}`}>
                  <span className={`${styles.lessonLabel} ${styles.lessonLabelLight}`}>✦ Lesson</span>
                  <p className={`${styles.lessonText} ${styles.lessonTextLight}`}>
                    I would build in more assumption-testing before presenting interpretations of existing systems back to their creators.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            <div className={styles.narrow}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>The Language Shift</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  A physician told us: oncology work involves more than grief. The word narrowed the focus and inadvertently pathologized their experience.
                </p>
              </AnimatedElement>

              {/* PivotQuote animation */}
              <AnimatedElement>
                <PivotQuote />
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.lessonMoment} ${styles.lessonMomentLight}`}>
                  <span className={`${styles.lessonLabel} ${styles.lessonLabelLight}`}>✦ Lesson</span>
                  <p className={`${styles.lessonText} ${styles.lessonTextLight}`}>
                    Listening isn&apos;t passive. A single word from a participant changed the entire frame of the project.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            <div className={styles.narrow}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>Designing the Grief Workshop</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  We needed staff to share their deepest experiences with loss — people who pride themselves on toughness. Every facilitation choice had to honor that identity while creating genuine space for vulnerability.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  I wrote the introductory script, proposed a stuffed rabbit as a comfort object, and designed <span className={styles.em} style={{ color: 'var(--color-plum)' }}>emotional abstraction</span>: scenarios presented at a distance so staff could respond without reopening wounds. After testing, I advocated for splitting it into two focused sessions and created take-home integration packets.
                </p>
              </AnimatedElement>
            </div>
            <div className={styles.wide} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <figure className={styles.figure}>
                  <LightboxImage imageKey="gs-workshop-grief-01" width={1200} alt="Grief workshop — worksheet, comfort objects, integration packet" openLightbox={openLightbox} style={{ height: 340, objectFit: 'cover' }} />
                  <figcaption className={styles.caption}>Every choice reflects facilitation intelligence — designing the emotional container, not just the questions</figcaption>
                </figure>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 8: SHAPE ═══ */}
          <section
            className={styles.room}
            id="shape"
            data-section="shape"
            data-phase="shape"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <div style={{ marginBottom: 'var(--space-md)' }}>
                  <div className={styles.phaseRow}>
                    <ShapeIcon />
                    <span className={styles.phaseLabel} style={{ color: 'var(--color-terracotta)' }}>Shape</span>
                  </div>
                  <h2 className={styles.phaseTitle}>Giving Form to What Was Already Trying to Surface</h2>
                  <div className={styles.accentBar} style={{ background: 'var(--color-terracotta)' }} />
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h4)', fontWeight: 'var(--weight-title)', fontStyle: 'italic', color: 'var(--color-ink-light)', lineHeight: 1.5, margin: '0 0 var(--space-md)' }}>
                  What we&apos;d pitched and what needed to be built were two different things.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  The ecosystem was designed to meet staff wherever they are in their day. Together, the four components create conditions for <span className={styles.em} style={{ color: 'var(--color-terracotta)' }}>culture change to emerge from within</span>.
                </p>
              </AnimatedElement>

              {/* Evolution table */}
              <AnimatedElement>
                <div className={styles.evolutionTable}>
                  <p className={styles.evolutionLabel}>How it evolved</p>
                  {evolutionRows.map((row, i) => (
                    <div key={i} className={styles.evolutionRow}>
                      <p className={styles.evolutionPitched}>{row.pitched}</p>
                      <span className={styles.evolutionArrow}>→</span>
                      <div>
                        <p className={styles.evolutionBuilt}>{row.built}</p>
                        <p className={styles.evolutionWhy}>{row.why}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedElement>
            </div>

            {/* System Map */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-content-gap)' }}>
              <AnimatedElement>
                <p className={styles.mapHint}>Hover or tap a component to explore</p>
                <SystemMap />
              </AnimatedElement>
            </div>

            {/* Reflection Cards */}
            <div className={styles.narrow} style={{ marginTop: 'var(--space-xl)' }}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>Reflection Cards</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  Meeting people in their bodies, not their heads. I drew on somatic bodywork training to root prompts in <span className={styles.em} style={{ color: 'var(--color-terracotta)' }}>embodied exercises</span> — breathing, movement, gentle touch — without naming them as such. I excluded the research-backed &ldquo;why it works&rdquo; framing — keeping staff in their emotional state rather than pulling them into cognitive mode.
                </p>
              </AnimatedElement>
            </div>
            <div className={styles.wide} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <ReflectionCards />
              </AnimatedElement>
            </div>
            <div className={styles.narrow} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <figure className={styles.figure}>
                  <LightboxImage imageKey="gs-context-01" width={800} alt="User interacting with full card set — hands visible, cards spread" openLightbox={openLightbox} style={{ height: 280, objectFit: 'cover' }} />
                  <figcaption className={styles.caption}>Every staff member received their own deck; one set permanently lives in the pod</figcaption>
                </figure>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 9: MAKING IT REAL (Shape continued) ═══ */}
          <section
            id="making"
            data-section="making"
            data-phase="shape"
            style={{ paddingBottom: 'var(--space-xl)' }}
          >
            {/* Pod + Surveillance */}
            <div className={styles.wide}>
              <AnimatedElement>
                <ScrollVideo
                  src={gsVid('gs-walkthrough-video')}
                  label="The Restorative Pod installed at UPMC Magee-Womens Hospital"
                />
              </AnimatedElement>
            </div>

            <div className={styles.narrow} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>Trust, Not Surveillance</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  Staff had been saving tears for car rides and bathroom stalls — the pod says <span className={styles.em} style={{ color: 'var(--color-terracotta)' }}>emotional labor is real work</span> deserving of real space.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  Administration required doors or the project wouldn&apos;t proceed. Then proposed key-card monitoring to track access. We pushed back: care must include freedom to pause without guilt or surveillance.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  I prepared polished documentation, prototypes, and pitch materials for our hospital champion Dr. Taylor — understanding that the person with institutional relationships needed to lead the conversation, not the design team. The resolution: an acrylic facade that serves privacy, aesthetics, and emotional safety simultaneously. LED lights subtly signal occupancy without surveillance.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.typoMoment}>
                  <p className={styles.typoMomentText} style={{ color: 'var(--color-terracotta)' }}>
                    Constraint became invention.
                  </p>
                  <div style={{ margin: '6px auto 0', width: 280 }}>
                    <HandUnderline color="var(--color-terracotta)" width={280} />
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.lessonMoment} ${styles.lessonMomentLight}`}>
                  <span className={`${styles.lessonLabel} ${styles.lessonLabelLight}`}>✦ Lesson</span>
                  <p className={`${styles.lessonText} ${styles.lessonTextLight}`}>
                    Navigating institutional constraints means understanding power dynamics — knowing when to lead versus when to equip the right person with the tools to lead.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            {/* Meditation */}
            <div className={styles.meditationSection}>
              <div className={styles.narrow}>
                <AnimatedElement>
                  <p className={styles.meditationLabel}>Pause</p>
                  <h3 className={styles.meditationTitle}>Custom Meditations</h3>
                </AnimatedElement>
                <AnimatedElement>
                  <p className={`${styles.body} ${styles.bodyCenter}`}>
                    I brought in my meditation teacher Catherine Liggett as subject matter expert. She custom-wrote meditations for people who carry others&apos; pain professionally. Single consistent voice for trust. Multiple lengths designed around shift availability.
                  </p>
                </AnimatedElement>
              </div>
              <div style={{ margin: 'var(--space-lg) auto', maxWidth: 480 }}>
                <AnimatedElement>
                  <GsAudioPlayer />
                </AnimatedElement>
              </div>
              <div className={styles.phoneFrame}>
                <AnimatedElement>
                  <ScrollVideo
                    src={gsVid('gs-qr-library')}
                    label="Staff access guided meditations on-demand during shifts"
                  />
                </AnimatedElement>
              </div>
            </div>

            {/* Art Wall + CTB */}
            <div style={{ marginTop: 'var(--space-xl)' }}>
              <div className={styles.wide}>
                <AnimatedElement>
                  <div className={styles.imageGridStacked} style={{ marginBottom: 'var(--space-lg)' }}>
                    <LightboxImage imageKey="gs-artwall" width={800} alt="Community Art Wall — The Garden" openLightbox={openLightbox} style={{ height: 340, objectFit: 'cover' }} />
                    <div>
                      <h3 className={styles.subHeading}>The Garden</h3>
                      <p className={styles.body}>
                        An anonymous shared expression surface for staff, patients, and families. Watercolor artwork from our research workshops became the visual language. Participants add words, drawings, and reflections without attribution — grief and gratitude side by side.
                      </p>
                    </div>
                  </div>
                </AnimatedElement>
                <AnimatedElement>
                  <div className={styles.imageGridStackedReverse}>
                    <div>
                      <h3 className={styles.subHeading}>Ceased to Breathe Email</h3>
                      <p className={styles.body}>
                        A compassionate redesign honoring the nurse&apos;s original innovation. Updated language, timing, and tone — transforming a clinical notification into a moment of collective acknowledgment. The patient&apos;s name. A brief pause. Permission to feel.
                      </p>
                    </div>
                    <LightboxImage imageKey="gs-ctb-email" width={800} alt="CTB Email — compassionate redesign" openLightbox={openLightbox} style={{ height: 340, objectFit: 'cover' }} />
                  </div>
                </AnimatedElement>
              </div>
            </div>

            {/* Naming + $30K */}
            <div className={styles.narrow} style={{ marginTop: 'var(--space-xl)' }}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>Naming &amp; Voice</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  I named the project &ldquo;Groundswell&rdquo; — water that rises naturally from deep within the earth. I drafted the original project poem, brand copy, phased email communications, and drove the language shift that permeated every component.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.donationDisplay}>
                  <p className={styles.donationNumber}>$30K+</p>
                  <p className={styles.donationLabel}>in donated materials and services</p>
                  <div className={styles.donationBar} />
                  <p className={styles.donationDesc}>
                    I led cold outreach across Etsy, LinkedIn, email, and phone. This wasn&apos;t a fundraising department — it was a <span className={styles.em} style={{ color: 'var(--color-terracotta)' }}>design student picking up the phone</span>.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.partnerGrid}>
                  <p className={styles.partnerGridLabel}>Partners &amp; Donors</p>
                  <div className={styles.partnerList}>
                    {partners.map((p, i) => (
                      <div key={i} className={styles.partnerItem}>
                        <p className={styles.partnerName}>{p.name}</p>
                        <p className={styles.partnerRole}>{p.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 10: TESTING ═══ */}
          <section
            className={styles.sectionTinted}
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
            id="testing"
            data-section="testing"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <h2 className={styles.sectionHeading}>Testing With Real People</h2>
                <div className={styles.accentBar} style={{ background: 'var(--color-terracotta)', marginBottom: 'var(--space-md)' }} />
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body} style={{ marginBottom: 'var(--space-lg)' }}>
                  Before hospital installation, we invited <span className={styles.em} style={{ color: 'var(--color-terracotta)' }}>30 participants</span> to test the pod experience — retired nurses, UPMC administrators, design professors, mental health professionals, and designers. Three patterns emerged.
                </p>
              </AnimatedElement>

              {feedbackFixes.map((fix, i) => (
                <AnimatedElement key={i}>
                  <div className={styles.feedbackTimeline}>
                    <div className={styles.feedbackDot}>
                      <span className={styles.feedbackNumber}>{fix.number}</span>
                      {!fix.isLast && <div className={styles.feedbackLine} />}
                    </div>
                    <div className={fix.isLast ? styles.feedbackContentLast : styles.feedbackContent}>
                      <p className={styles.feedbackTitle}>{fix.title}</p>
                      <p className={styles.body} style={{ marginBottom: 'var(--space-sm)' }}>{fix.problem}</p>

                      <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-terracotta)', background: 'var(--color-terracotta-muted)' }}>
                        <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-terracotta)', opacity: 0.12 }}>&ldquo;</span>
                        <p className={styles.inlineQuoteText}>&ldquo;{fix.quote}&rdquo;</p>
                      </div>

                      <div className={styles.feedbackArrow}>
                        <span className={styles.feedbackArrowIcon}>→</span>
                        <p className={styles.body} style={{ color: 'var(--color-ink)' }}>{fix.solution}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              ))}

              <AnimatedElement>
                <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(149,96,88,0.1)' }}>
                  <p className={styles.sectionLabel} style={{ color: 'var(--color-terracotta)' }}>What participants said after</p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-terracotta)', opacity: 0.2 }}>&ldquo;</span>
                  <p className={styles.heroQuoteText}>
                    As soon as I stepped inside, I almost teared up. You&apos;re not always aware of how frazzled you are until you stop.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-terracotta)', opacity: 0.35 }} />
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-terracotta)', background: 'var(--color-terracotta-muted)' }}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-terracotta)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>
                    &ldquo;Being able to stop in the middle of the day and have the physical and mental space to get quiet and meditate is really helpful — much better than a bathroom stall.&rdquo;
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 11: IMPACT ═══ */}
          <section
            className={styles.sectionAccent}
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
            id="impact"
            data-section="impact"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <h2 className={styles.sectionHeading}>What Happened</h2>
                <div className={styles.accentBar} style={{ background: 'var(--color-plum)', marginBottom: 'var(--space-md)' }} />
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.achievementList}>
                  {achievements.map((fact, i) => (
                    <div key={i} className={styles.achievementRow}>
                      <span className={styles.achievementAccent}>{fact.accent}</span>
                      <span className={styles.achievementRest}>{fact.rest}</span>
                    </div>
                  ))}
                </div>
              </AnimatedElement>
            </div>

            {/* Data viz card */}
            <div className={styles.wide}>
              <AnimatedElement>
                <div className={styles.dataVizCard}>
                  <ScrollVideo
                    src={gsVid('entrypage')}
                    label="Data visualization platform"
                    autoplay
                    blur
                  />
                  <div className={styles.dataVizMeta}>
                    <div>
                      <p className={styles.dataVizLabel}>Self-taught</p>
                      <p className={styles.dataVizDesc}>
                        I taught myself to vibe-code with Claude AI to build a custom data visualization dashboard — <span className={styles.em} style={{ color: 'var(--color-chalcedony)' }}>bridging qualitative conversations and clinical survey data</span> in a tool the research team could actually use.
                      </p>
                    </div>
                    <div className={styles.dataVizTags}>
                      {['Next.js', 'VS Code', 'Vercel', 'NEON', 'YouTube API'].map((tag) => (
                        <span key={tag} className={styles.dataVizTag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Stakeholder voices */}
            <div className={styles.narrow}>
              <AnimatedElement>
                <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)' }}>
                  <p className={styles.sectionLabel} style={{ color: 'var(--color-plum)' }}>Voices from the field</p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-plum)', opacity: 0.2 }}>&ldquo;</span>
                  <p className={styles.heroQuoteText}>
                    Caring for people means seeing them as whole, complex, and beautiful human beings — not just as patients in need of medicine or surgery.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-plum)', opacity: 0.35 }} />
                  <p className={styles.heroQuoteAttribution}>— Dr. Sarah Taylor, Gynecologic Oncology, UPMC</p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-plum)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>
                    &ldquo;Groundswell reminds us that caring for patients begins with caring for the people who serve them.&rdquo;
                  </p>
                  <p className={styles.inlineQuoteAttribution}>— Samantha Williams, Director of Women&apos;s Cancer Services, UPMC</p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div style={{ marginTop: 'var(--space-lg)', paddingTop: 'var(--space-md)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <p className={styles.sectionLabel} style={{ color: 'var(--color-ink-faint)', marginBottom: 'var(--space-md)' }}>In the Press</p>
                  <PressCards />
                </div>
              </AnimatedElement>
            </div>
          </section>

          {/* ═══ SECTION 12: REFLECTION ═══ */}
          <section
            className={styles.room}
            id="reflection"
            data-section="reflection"
          >
            <div className={styles.exitNarrow}>
              <AnimatedElement>
                <div className={styles.honestyContainer}>
                  <h2 className={styles.honestyTitle}>What I&apos;d Do Differently</h2>
                  <p className={styles.body}>
                    I&apos;d establish shared language between design research and clinical research teams earlier — the tension between generative qualitative methods and clinical protocols surfaced repeatedly and was never fully resolved. I&apos;d also build in more assumption-testing checkpoints. The CTB misstep taught me that secondhand accounts, no matter how consistent, can still miss the heart of the story.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div style={{ marginBottom: 'var(--space-lg)' }}>
                  <h3 className={styles.whereTitle}>Where This Led</h3>
                  <p className={styles.body}>
                    This project gave me a passion for healthcare design and participatory research. It fundamentally shaped how I approach every project: listen first, amplify what&apos;s already there, design with the community not for them. It also led me to teach myself to code — because the work needed a bridge between qualitative and quantitative that didn&apos;t exist yet.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.teamCredits}>
                  <p className={styles.teamCreditsText}>
                    <span style={{ fontWeight: 700 }}>Team:</span> Kristin Hughes (Project Lead), Elijah Benzon, Kelly McDowell, Robertus Sucahyo, Greg Baltus
                  </p>
                  <p className={styles.teamCreditsLink}>
                    <a href="/groundswell">Read the full Groundswell story →</a> including all contributors, donors, and acknowledgements.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.prevNextNav}>
                  <a href="/" className={styles.prevNextLink} style={{ color: 'var(--color-sage)' }}>
                    <span className={styles.prevNextArrow}>←</span> All Work
                  </a>
                  <a href="/projects/birthstory" className={styles.prevNextLink} style={{ color: 'var(--color-terracotta)' }}>
                    Next: BirthStory <span className={styles.prevNextArrow}>→</span>
                  </a>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <p className={styles.closing}>Thank you for spending time here.</p>
              </AnimatedElement>
            </div>
          </section>

        </div>{/* end .content */}
      </div>{/* end .sidebarLayout */}

      {/* Lightbox */}
      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt="Groundswell project image"
          onClose={closeLightbox}
        />
      )}
    </div>
  )
}
