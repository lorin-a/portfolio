'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GroundswellCaseStudy.module.css'
import { cloudImg, GS_IMAGES, GS_CARDS } from '@/lib/cloudinary'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import Lightbox from '@/components/Lightbox/Lightbox'
import ProjectSidebar from '@/components/ProjectSidebar/ProjectSidebar'

gsap.registerPlugin(ScrollTrigger)

// ─── Cloudinary helpers ───
const gsImg = (key, w) => cloudImg(GS_IMAGES[key], w)
const cardImg = (key, w) => cloudImg(GS_CARDS[key], w)

// ─── Reflection card data (image-based flip) ───
const FLIP_CARDS = [
  { id: 'exhausted', frontKey: 'exhausted-front', backKey: 'exhausted-back' },
  { id: 'invisible', frontKey: 'invisible-front', backKey: 'invisible-back' },
  { id: 'valued', frontKey: 'valued-front', backKey: 'valued-back' },
  { id: 'grateful', frontKey: 'grateful-front', backKey: 'grateful-back' },
]

// ─── Metadata ───
const metadata = [
  { label: 'Client', value: 'UPMC Magee-Womens Hospital, Cancer Services' },
  { label: 'Duration', value: '15 wk research · 10 wk production · ongoing' },
  { label: 'Role', value: 'Research, Co-Design, Copywriting, Coordination, Donor Outreach' },
  { label: 'Status', value: '12-month Quality Improvement Study' },
]

// ─── Sidebar sections ───
const SIDEBAR_SECTIONS = [
  { id: 'hook', label: 'Groundswell', phase: null },
  { id: 'stakes', label: 'The Stakes', phase: null },
  { id: 'sense', label: 'What We Heard', phase: 'sense' },
  { id: 'trust', label: 'Building Trust', phase: 'sense' },
  { id: 'weave', label: 'The Synthesis', phase: 'weave' },
  { id: 'turning', label: 'The Turning Point', phase: 'weave' },
  { id: 'shape', label: 'What We Built', phase: 'shape' },
  { id: 'making', label: 'The Making', phase: 'shape' },
  { id: 'testing', label: 'Play Testing', phase: null },
  { id: 'impact', label: 'Impact', phase: null },
  { id: 'reflection', label: 'Reflection', phase: null },
]

// ─── Feedback fixes ───
const feedbackFixes = [
  { title: 'Accessibility', fix: 'Table depth excluded larger bodies. We sawed 2 inches off.' },
  { title: 'Wayfinding', fix: 'Confusion about where to start created anxiety. We added step-by-step instructions.' },
  { title: 'Entry Ritual', fix: 'Music set the tone for deeper engagement. We made it the first step.' },
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

// ─── Section heading: h2 + HandUnderline ───
function SectionH2({ children, color, width = 200 }) {
  return (
    <div style={{ marginBottom: 'var(--space-md)' }}>
      <h2 className={styles.sectionHeading}>{children}</h2>
      <HandUnderline color={color} width={width} />
    </div>
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

  const strikeWidth = 280

  return (
    <div ref={containerRef} className={styles.pivotQuote}>
      <div className={styles.pivotStruck}>
        <span>&ldquo;the system has let you down&rdquo;</span>
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
      <span ref={arrowRef} className={styles.pivotArrow}>↓</span>
      <div ref={reframeRef} className={styles.pivotReframe}>
        &ldquo;you have already created something remarkable&rdquo;
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


// ─── Image-based card flip (portfolio version) ───
function CardFlipGrid() {
  const [flipped, setFlipped] = useState({})
  const toggle = (id) => setFlipped((prev) => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className={styles.cardFlipGrid}>
      {FLIP_CARDS.map((card) => {
        const isFlipped = flipped[card.id]
        return (
          <button
            key={card.id}
            className={styles.cardFlipButton}
            onClick={() => toggle(card.id)}
            aria-label={`${card.id} reflection card — ${isFlipped ? 'showing exercise, click to flip back' : 'click to reveal exercise'}`}
          >
            <div className={`${styles.cardFlipInner} ${isFlipped ? styles.cardFlipInnerFlipped : ''}`}>
              <div className={styles.cardFlipFace}>
                <img
                  src={cardImg(card.frontKey, 400)}
                  alt={`${card.id} — front of reflection card`}
                  loading="lazy"
                />
              </div>
              <div className={`${styles.cardFlipFace} ${styles.cardFlipBack}`} aria-hidden={!isFlipped}>
                <img
                  src={cardImg(card.backKey, 400)}
                  alt={`${card.id} — somatic exercise on back of card`}
                  loading="lazy"
                />
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}


// ═══════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════
export default function GroundswellCaseStudy() {
  const [lightboxSrc, setLightboxSrc] = useState(null)
  const openLightbox = useCallback((src) => setLightboxSrc(src), [])
  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  return (
    <div className={styles.caseStudy}>

      {/* ═══ HERO ZONE — Full bleed, above sidebar ═══ */}
      <section id="hook" data-section="hook" className={styles.heroZone}>
        <div className={styles.hookText}>
          <AnimatedElement>
            <div className={styles.hookColumns}>
              <div className={styles.hookLeft}>
                <h1 className={styles.thresholdTitle}>Groundswell</h1>
                <p className={styles.thresholdSubtitle}>Making Space to Restore, Together</p>
              </div>
              <div className={styles.hookDivider} />
              <div className={styles.hookRight}>
                <p className={styles.thresholdLabel}>A Design Ecology for Staff Well-Being</p>
                <p className={styles.body}>
                  A grant-funded ecology of emotional support for oncology healthcare workers, developed through participatory research with staff at UPMC Magee-Womens Hospital.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement>
          <div className={styles.heroBlock}>
            <LightboxImage imageKey="gs-hero" width={1600} alt="Groundswell — pod and art wall installed at UPMC Magee-Womens Hospital" openLightbox={openLightbox} className={styles.heroImage} />
            <div className={styles.metadataBar}>
              {metadata.map((item, i) => (
                <div key={i} className={styles.metadataCell}>
                  <p className={styles.metadataLabel}>{item.label}</p>
                  <p className={styles.metadataValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>

      </section>

      {/* ═══ SIDEBAR + CONTENT — starts with dark Stakes ═══ */}
      <div className={styles.sidebarLayout}>
        <ProjectSidebar sections={SIDEBAR_SECTIONS} />

        <div className={styles.content}>

          {/* ═══ STAKES — DARK (first thing alongside sidebar) ═══ */}
          <section
            className={styles.sectionDark}
            id="stakes"
            data-section="stakes"
            data-dark-section
          >
            <div className={styles.narrow} style={{ paddingTop: 'var(--space-xl)' }}>
              <AnimatedElement>
                <p className={styles.bodyDark} style={{ fontSize: 'var(--text-body-large)' }}>
                  Groundswell began as a graduate-level participatory design course at Carnegie Mellon University. Our team chose the challenge of improving workplace culture for oncology staff at UPMC Magee-Womens Hospital. What started as a semester project earned grant funding, moved into production, and launched as a formal quality improvement study.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ paddingTop: 'var(--space-lg)', paddingBottom: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.imageGridFeatured}>
                  <LightboxImage imageKey="gs-context-01" width={800} alt="Reflection Cards — close-up with language visible" openLightbox={openLightbox} style={{ height: 420, objectFit: 'cover' }} />
                  <div className={styles.imageGridFeaturedRight}>
                    <LightboxImage imageKey="gs-pod" width={600} alt="Restorative Pod installed in hospital" openLightbox={openLightbox} style={{ flex: 1, objectFit: 'cover' }} />
                    <LightboxImage imageKey="gs-artwall" width={600} alt="Community Art Wall" openLightbox={openLightbox} style={{ flex: 1, objectFit: 'cover' }} />
                  </div>
                </div>
              </AnimatedElement>
            </div>
            <div className={styles.narrow}>
              <AnimatedElement>
                <p className={styles.bodyDark}>
                  Healthcare, like many social systems in the United States, is built on structural inequity. My own encounters with these systems brought me to this project. I had no traditional healthcare experience, but I didn&apos;t need convincing that caregivers are failed by the institutions they serve.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>1 in 5</p>
                    <p className={styles.statDesc}>healthcare workers have experienced PTSD</p>
                  </div>
                  <div className={styles.statDivider} />
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>73%</p>
                    <p className={styles.statDesc}>of emergency physicians report stigma around mental health</p>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <p className={`${styles.bodyDark} ${styles.bodyCenter}`}>
                  This is not an individual failure. It is a systemic one.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.heroQuote}>
                  <span className={styles.heroQuoteMark} style={{ color: 'var(--color-plum-soft)', opacity: 0.3 }}>&ldquo;</span>
                  <p className={`${styles.heroQuoteText} ${styles.heroQuoteTextDark}`}>
                    A special person can do this work forever, a good person can do it for a little while, most people couldn&apos;t do it for a day.
                  </p>
                  <div className={styles.heroQuoteBar} style={{ background: 'var(--color-plum-soft)', opacity: 0.5 }} />
                </div>
              </AnimatedElement>
            </div>
            <div style={{ paddingBottom: 'var(--space-xl)' }} />
          </section>


          {/* ═══ SENSE — What We Heard ═══ */}
          <section className={styles.room} id="sense" data-section="sense" data-phase="sense">
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-sage)" width={220}>What We Heard</SectionH2>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  Over 15 weeks, my team and I shadowed nurses across multiple shifts, conducted contextual interviews, and facilitated a confidential conversation with a former employee who could speak freely.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  The stories were enough to bring tears to our eyes, and the environment spoke volumes. We heard about immeasurable compassion and dedicated care but also immense pain from lack of structural support. The hallways were overflowing with supportive notes and personal touches, but the harsh lighting, windowless walls, and cramped desks revealed barriers that no amount of personal effort could overcome.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <LightboxImage imageKey="gs-sense-affinity-01" width={1200} alt="Environment — the contrast between personal touches and institutional neglect" openLightbox={openLightbox} style={{ height: 380, objectFit: 'cover' }} />
              </AnimatedElement>
            </div>

            <div className={styles.narrow} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-sage)' }}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-sage)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>&ldquo;I feel trapped. If I leave my patients I will feel guilty. If I leave my workers in this mess I will feel guilty.&rdquo;</p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-sage)' }}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-sage)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>&ldquo;There is no time to grieve. Once someone passes there is no time before another person comes in.&rdquo;</p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-sage)' }}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-sage)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>&ldquo;I was not prepared for this. No one trained me on the emotional trauma that this job causes.&rdquo;</p>
                </div>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ TRUST — Building Trust ═══ */}
          <section
            id="trust"
            data-section="trust"
            data-phase="sense"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderTop: '1px solid var(--color-cream-dark)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-sage)" width={220}>Building Trust</SectionH2>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  Three participatory activities, each deepening the relationship with staff and increasing the level of vulnerability we could hold together. The sequence was intentional: celebration first, then reflection, then grief.
                </p>
              </AnimatedElement>
            </div>

            {/* Women in White Coats */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.imageGridStacked}>
                  <LightboxImage imageKey="gs-workshop-coats-01" width={600} alt="Women in White Coats — orchid pins, shared poster" openLightbox={openLightbox} style={{ height: 280, objectFit: 'cover' }} />
                  <div>
                    <h3 className={styles.subHeading}>Women in White Coats</h3>
                    <p className={styles.body}>
                      In partnership with CancerBridges, we honored women in cancer care with handmade orchid pins and a shared poster. Public, celebratory, visible on the unit.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* Nourishing the Flower */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.imageGridStackedReverse}>
                  <div>
                    <h3 className={styles.subHeading}>Nourishing the Flower</h3>
                    <p className={styles.body}>
                      Using a flower as metaphor for workplace health, staff mapped what sustains them and what quietly erodes them. Staff who had never named their working conditions started doing so through color and metaphor.
                    </p>
                  </div>
                  <LightboxImage imageKey="gs-workshop-flower-01" width={600} alt="Flower worksheets — warm, tactile, real" openLightbox={openLightbox} style={{ height: 280, objectFit: 'cover' }} />
                </div>
              </AnimatedElement>
            </div>

            {/* Grief Workshop */}
            <div className={styles.narrow} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <h3 className={styles.subHeading}>Grief Workshop</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  I designed a trauma-responsive facilitation approach: a script that named our positionality directly, a stuffed rabbit as comfort object to abstract grief through safe distance, and a take-home integration packet so no one was left emotionally opened without support.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  The biggest takeaway across all three activities was the need for validation and permission. Staff needed to hear that their feelings were real and shared before they could engage with any kind of support. This became a design principle that threaded through everything we built.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <LightboxImage imageKey="gs-workshop-grief-01" width={1200} alt="Grief workshop — worksheet, comfort objects, integration packet" openLightbox={openLightbox} style={{ height: 340, objectFit: 'cover' }} />
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ WEAVE — The Synthesis ═══ */}
          <section
            id="weave"
            data-section="weave"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderTop: '1px solid var(--color-cream-dark)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-plum)" width={220}>The Synthesis</SectionH2>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  I suggested we use a tetrahedron analysis to map findings across four dimensions: recognition, environment, culture, and systemic. The framework revealed what individual quotes couldn&apos;t: the problem was the compounding effect of all four pressing in at once.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <LightboxImage imageKey="Synthesis-diagram" width={1200} alt="Tetrahedron Synthesis — full diagram showing four dimensions of well-being" openLightbox={openLightbox} />
              </AnimatedElement>
            </div>

            <div className={styles.narrow} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <p className={styles.body}>
                  At the center of these dimensions, the methodology names a structural gap: the Void. The system optimizes for patients while treating staff as infinitely renewable. We couldn&apos;t fix that. But we could design within it.
                </p>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ TURNING POINT ═══ */}
          <section
            id="turning"
            data-section="turning"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderTop: '1px solid var(--color-cream-dark)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-plum)" width={260}>The Turning Point</SectionH2>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  One component was a redesign of the Ceased to Breathe email, the hospital&apos;s patient death notification, built entirely within Outlook.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  We initially presented it as a correction to a cold clinical protocol. In a feedback session, the nurse who created it was moved to tears. She had poured care into that protocol, and we were dismissing her work.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  That rupture reframed the entire project: staff are already innovating. They don&apos;t need outsiders with solutions. They need their existing care work recognized and amplified.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <PivotQuote />
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ SHAPE — What We Built ═══ */}
          <section
            className={styles.room}
            id="shape"
            data-section="shape"
            data-phase="shape"
            style={{ borderTop: '1px solid var(--color-cream-dark)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-terracotta)" width={220}>What We Built</SectionH2>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  Four interconnected components, each addressing a different dimension of well-being. Not a product — an ecology, shaped by the people it serves.
                </p>
              </AnimatedElement>
            </div>

            {/* ── Community Art Wall ── */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.componentBlock}>
                  <div className={styles.componentImages}>
                    <LightboxImage imageKey="gs-artwall" width={700} alt="Community Art Wall installed at UPMC Magee — full view with staff contributions" openLightbox={openLightbox} className={styles.componentImagePrimary} />
                    <LightboxImage imageKey="gs-artwall-detail-02" width={500} alt="Art Wall close-up — anonymous staff notes and expressions" openLightbox={openLightbox} className={styles.componentImageDetail} />
                  </div>
                  <div className={styles.componentText}>
                    <h3 className={styles.componentTitle}>Community Art Wall</h3>
                    <p className={styles.body}>
                      An anonymous space for shared emotional expression across the full spectrum of oncology experiences. Staff reported discomfort expressing feelings due to fear of retaliation — the wall gave public, collective voice to what had been carried alone. We intentionally included family caregivers and patients because staff told us how much hearing gratitude mattered.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* ── Restorative Pod ── */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.componentBlock}>
                  <div className={styles.componentImages}>
                    <LightboxImage imageKey="gs-pod-exterior" width={700} alt="Restorative Pod exterior — nestled in a former telephone booth alcove" openLightbox={openLightbox} className={styles.componentImagePrimary} />
                    <LightboxImage imageKey="gs-pod-detail-02" width={500} alt="Pod interior — meditation stones, guided audio, soft lighting" openLightbox={openLightbox} className={styles.componentImageDetail} />
                  </div>
                  <div className={styles.componentText}>
                    <h3 className={styles.componentTitle}>Restorative Pod</h3>
                    <p className={styles.body}>
                      A dedicated space for emotional decompression through guided meditation and stillness. We heard that staff save their tears for the car ride home or the bathroom stall. Nestled where telephone booths once stood, the pod reinforces a message the hospital had never sent: emotional labor is real work deserving of real space.
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            </div>

            {/* ── Ceased to Breathe Email ── */}
            <div className={styles.narrow} style={{ marginTop: 'var(--space-lg)' }}>
              <AnimatedElement>
                <div className={styles.componentBlockCompact}>
                  <h3 className={styles.componentTitle}>Ceased to Breathe Email</h3>
                  <p className={styles.body}>
                    A redesign of the hospital&apos;s patient death notification, built entirely within Outlook. What we initially saw as a cold clinical protocol was actually a staff-created innovation — a nurse manager had built it to ensure colleagues learned about patient deaths with dignity. Groundswell honored that by integrating compassionate language and visuals into the existing workflow, a low-effort change that acknowledged the emotional weight of every loss.
                  </p>
                </div>
              </AnimatedElement>
            </div>

            {/* ── Reflection Cards ── */}
            <div className={styles.narrow} style={{ marginTop: 'var(--space-xl)' }}>
              <AnimatedElement>
                <h3 className={styles.componentTitle}>Reflection Cards</h3>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body}>
                  Guided reflection cards that help staff build a self-care practice through emotional validation and somatic exercises. By showing healthcare workers that the full spectrum of grief includes complex and contradictory emotions, the cards create a more holistic culture of care. Every staff member received their own deck; one set permanently lives in the pod.
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <LightboxImage imageKey="gs-cards" width={1000} alt="Staff member holding a set of Groundswell reflection cards" openLightbox={openLightbox} style={{ borderRadius: 'var(--radius-md)' }} />
              </AnimatedElement>
            </div>

            <div className={styles.wide} style={{ marginTop: 'var(--space-md)', marginBottom: 'var(--space-sm)' }}>
              <AnimatedElement>
                <CardFlipGrid />
                <p className={styles.cardFlipHint}>Click any card to see the somatic exercise on the back</p>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ MAKING ═══ */}
          <section
            id="making"
            data-section="making"
            data-phase="shape"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderTop: '1px solid var(--color-cream-dark)' }}
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-terracotta)" width={200}>The Making</SectionH2>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  Ten weeks from concept to installation. I led donor outreach across Etsy, LinkedIn, email, and phone, securing $30K+ in donated materials: the NookPod ($13K), ceramic meditation stones, wood materials, volunteer fabrication, and more.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  Staff feedback shifted our language from &ldquo;grief&rdquo; to &ldquo;restoration,&rdquo; a change I translated as the team&apos;s primary copywriter. When hospital administration required lockable doors on the pod, then proposed key-card monitoring, we pushed back: care must include freedom to pause without guilt or surveillance. I named the project &ldquo;Groundswell&rdquo; — water that rises naturally from deep within the earth.
                </p>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ PLAY TESTING ═══ */}
          <section
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)', borderTop: '1px solid var(--color-cream-dark)' }}
            id="testing"
            data-section="testing"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-terracotta)" width={200}>Play Testing</SectionH2>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.body} style={{ marginBottom: 'var(--space-lg)' }}>
                  30 participants tested the pod before hospital installation. Three issues, three fixes:
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                  {feedbackFixes.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-xs)' }}>
                      <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-body-large)', fontVariationSettings: 'var(--font-soft)', color: 'var(--color-terracotta)', flexShrink: 0 }}>→</span>
                      <div>
                        <span style={{ fontWeight: 600, color: 'var(--color-ink)' }}>{item.title}: </span>
                        <span className={styles.body}>{item.fix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ IMPACT ═══ */}
          <section
            className={styles.sectionAccent}
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
            id="impact"
            data-section="impact"
          >
            <div className={styles.narrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-plum)" width={140}>Impact</SectionH2>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  Groundswell is installed at UPMC Magee-Womens Hospital, running a 12-month quality improvement study measuring compassion fatigue, burnout, and intent to leave.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  To bridge qualitative research and clinical survey data, I taught myself to prompt engineer with Claude AI, building a custom data visualization platform. The platform translates participatory research into formats the clinical team can use.
                </p>
              </AnimatedElement>
            </div>

            {/* Data viz placeholder */}
            <div className={styles.wide} style={{ marginTop: 'var(--space-md)' }}>
              <AnimatedElement>
                <p className={styles.body} style={{ color: 'var(--color-ink-faint)', fontStyle: 'italic', textAlign: 'center' }}>
                  [ Data visualization image placeholder ]
                </p>
              </AnimatedElement>
            </div>

            <div className={styles.narrow}>
              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ marginTop: 'var(--space-lg)' }}>
                  <span className={styles.inlineQuoteMark} style={{ color: 'var(--color-plum)', opacity: 0.12 }}>&ldquo;</span>
                  <p className={styles.inlineQuoteText}>
                    &ldquo;Groundswell reminds us that caring for patients begins with caring for the people who serve them.&rdquo;
                  </p>
                  <p className={styles.inlineQuoteAttribution}>— Samantha Williams, Director of Women&apos;s Cancer Services, UPMC</p>
                </div>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body} style={{ marginTop: 'var(--space-sm)', fontSize: 'var(--text-body-small)', color: 'var(--color-ink-faint)' }}>
                  Research paper under peer review. Expansion proposals submitted for additional hospital settings.
                </p>
              </AnimatedElement>
            </div>
          </section>


          {/* ═══ REFLECTION ═══ */}
          <section className={styles.room} id="reflection" data-section="reflection">
            <div className={styles.exitNarrow}>
              <AnimatedElement>
                <SectionH2 color="var(--color-ink-faint)" width={180}>Reflection</SectionH2>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  The most meaningful support emerges from within a community. Our job was amplification, not invention.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  Groundswell was made possible by years of relational work between previous cohorts, Professor Kristin Hughes, and the UPMC staff. My team and I inherited that trust and had to steward it carefully.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  The CTB misstep taught me to test assumptions before presenting interpretations back to their creators. I would also establish shared language between design research and clinical research teams earlier. The tension between qualitative and quantitative methods is real. I would name it sooner.
                </p>
              </AnimatedElement>
              <AnimatedElement>
                <p className={styles.bodySpaced}>
                  This project changed how I approach everything: listen first, amplify what&apos;s already there, design with the community rather than for them.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={styles.teamCredits}>
                  <p className={styles.teamCreditsText}>
                    <span style={{ fontWeight: 700 }}>Team:</span> Kristin Hughes (Lead Designer), Elijah Benzon, Kelly McDowell, Robertus Sucahyo, Greg Baltus
                  </p>
                  <p className={styles.teamCreditsLink}>
                    A collaboration between CMU School of Design, University of Pittsburgh Schools of Medicine and Nursing, and UPMC Magee-Womens Hospital.
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
