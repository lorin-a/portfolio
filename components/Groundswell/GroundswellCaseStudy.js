'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './GroundswellCaseStudy.module.css'
import { cloudImg, GS_IMAGES, GS_CARDS } from '@/lib/cloudinary'
import AnimatedElement from '@/components/AnimatedElement/AnimatedElement'
import Lightbox from '@/components/Lightbox/Lightbox'
import ProjectSidebar from '@/components/ProjectSidebar/ProjectSidebar'
import SenseMark from '@/components/marks/SenseMark'
import markStyles from '@/components/marks/marks.module.css'

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

// ─── Hand-drawn SVG underline (animated draw-on) ───
function HandUnderline({ color = 'var(--color-sage)', animate = false }) {
  const pathRef = useRef(null)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    const length = path.getTotalLength()
    path.style.strokeDasharray = length
    path.style.strokeDashoffset = animate ? '0' : length

    if (!animate) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      path.style.strokeDashoffset = '0'
      return
    }

    gsap.fromTo(path,
      { strokeDashoffset: length },
      { strokeDashoffset: 0, duration: 1.0, ease: 'power1.inOut', delay: 0.3 }
    )
  }, [animate])

  return (
    <svg
      width="100%"
      height="8"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
      fill="none"
      className={styles.handUnderline}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d="M2 5Q40 2,70 5T130 4T198 5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  )
}

// ─── Section divider: scroll-triggered wavy line ───
function SectionDivider({ color = 'var(--color-cream-dark)', className }) {
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setAnimate(true); return }

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => setAnimate(true),
    })
    return () => st.kill()
  }, [])

  return (
    <div ref={ref} className={`${styles.sectionDivider}${className ? ` ${className}` : ''}`}>
      <HandUnderline color={color} animate={animate} />
    </div>
  )
}

// ─── Section heading: h2 + HandUnderline ───
function SectionH2({ children, color }) {
  const [animate, setAnimate] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setAnimate(true); return }

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setAnimate(true),
    })
    return () => st.kill()
  }, [])

  return (
    <div ref={ref} className={styles.sectionH2Wrap}>
      <h2 className={styles.sectionHeading}>{children}</h2>
      <HandUnderline color={color} animate={animate} />
    </div>
  )
}

// ─── Sense heading: SenseMark + h2 + underline, with scroll trigger ───
function SenseHeading({ children }) {
  const [animate, setAnimate] = useState(false)
  const [replayCount, setReplayCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setAnimate(true); return }

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => setAnimate(true),
    })
    return () => st.kill()
  }, [])

  const handleHover = () => {
    if (animate) setReplayCount((c) => c + 1)
  }

  return (
    <div
      ref={ref}
      className={styles.senseHeadingWrap}
      onMouseEnter={handleHover}
    >
      <div className={styles.senseMarkAlign}>
        <SenseMark
          animate={animate}
          delay={0}
          replay={replayCount}
        />
      </div>
      <div className={styles.senseHeadingText}>
        <div className={styles.sectionH2Wrap} style={{ marginBottom: 0 }}>
          <h2 className={styles.sectionHeading}>{children}</h2>
          <HandUnderline color="var(--color-sage)" animate={animate} />
        </div>
      </div>
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

      {/* ═══ UNIFIED GRID — hero + sidebar + content share columns ═══ */}
      <div className={styles.pageGrid}>

        {/* ─── Hero row: text in sidebar column, image in content column ─── */}
        <section id="hook" data-section="hook" className={styles.heroLeft}>
          <AnimatedElement>
            <h1 className={styles.thresholdTitle}>Groundswell</h1>
            <p className={styles.thresholdSubtitle}>Making Space to Restore, Together</p>
          </AnimatedElement>
          <AnimatedElement>
            <SectionDivider color="var(--color-ink)" className={styles.heroDivider} />
          </AnimatedElement>
          <AnimatedElement>
            <p className={styles.thresholdLabel}>A Design Ecology for Staff Well-Being</p>
            <p className={styles.body}>
              A grant-funded ecology of emotional support for oncology healthcare workers, developed through participatory research with staff at UPMC Magee-Womens Hospital.
            </p>
          </AnimatedElement>
        </section>

        <div className={styles.heroRight}>
          <AnimatedElement>
            <div className={styles.heroBlock}>
              <LightboxImage imageKey="gs-hero" width={1600} alt="Groundswell — pod and art wall installed at UPMC Magee-Womens Hospital" openLightbox={openLightbox} className={styles.heroImage} />
              <div className={styles.metadataWrap}>
                <svg className={styles.scallops} viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0,32 Q50,0 100,32 Q150,0 200,32 Q250,0 300,32 Q350,0 400,32 L400,32 L0,32 Z" fill="var(--project-accent-pale)" />
                </svg>
                {/* Hand-drawn dots at scallop intersections */}
                <div className={styles.scallopDots} aria-hidden="true">
                  {[
                    { left: '25%', color: 'var(--color-sage-soft)' },
                    { left: '50%', color: 'var(--color-plum-soft)' },
                    { left: '75%', color: 'var(--color-terracotta-soft)' },
                  ].map((dot, i) => (
                    <svg
                      key={i}
                      className={styles.scallopDot}
                      style={{ left: dot.left }}
                      viewBox="0 0 27 25"
                      fill="none"
                    >
                      <path
                        d="M12.2599 10.4005C12.1191 10.767 11.9633 10.9354 11.6315 11.2207C10.8572 11.9147 9.43412 12.6218 9.03866 14.3403C10.0636 17.1347 12.0986 18.3583 12.8265 18.8434C13.6761 19.3666 13.9955 19.5333 14.1674 19.6879C14.4735 19.9641 14.1838 20.0255 13.7216 19.8912C13.2689 19.7602 12.7354 19.5725 12.2243 19.3452C13.0549 19.0502 14.3972 18.3722 15.3031 17.3203C16.2268 16.2797 16.5015 15.2041 16.4644 14.6688C16.3876 13.9532 16.1423 13.3225 15.9338 12.9975C15.722 12.6519 15.6227 12.6697 15.7926 12.6404C15.7709 12.5914 15.7485 12.5426 15.7253 12.494C15.3373 11.6731 14.7394 11.0869 14.3355 10.7934C13.9198 10.4902 13.6644 10.397 13.5329 10.352C13.0875 10.2074 12.7244 10.3208 12.6747 10.4356C12.6079 10.5549 12.7721 10.6456 12.9067 10.6864C12.1795 11.221 11.9498 11.8048 11.8877 11.9528C11.6062 12.5495 11.3867 13.1914 11.2131 14.0898C11.213 14.09 11.213 14.0903 11.2129 14.0905C11.0758 14.8776 11.3689 15.4784 11.6684 15.7111C11.9768 15.9577 12.3175 15.9227 12.5883 15.7725C13.1338 15.468 13.4259 14.6997 12.9159 14.3944C12.9178 14.3763 12.866 14.3914 12.7649 14.4716C12.3618 14.7804 11.8138 14.8566 11.2114 14.7757C11.8038 14.6878 12.4682 14.3509 12.8119 14.0016C13.1694 13.6518 13.2599 13.3588 13.2373 13.2062C13.1745 12.8966 12.7637 13.0268 12.3147 13.36C12.1939 13.4492 12.0659 13.5704 11.9289 13.7322C11.7619 13.5854 11.5171 13.5655 11.3987 13.8566C11.2776 14.1363 11.321 14.6628 11.5385 15.2129C11.2273 14.9846 11.298 15.2596 11.5812 15.3444C11.6257 15.3987 11.7102 15.4186 11.8564 15.3103C12.0245 15.1918 12.2604 14.8014 12.2526 14.4902C12.2628 14.2429 12.0185 14.1297 11.8074 14.5766C11.7218 14.7611 11.6957 15.0724 11.7903 15.4061C11.9996 16.0721 12.3041 16.311 12.4152 16.4106C12.5424 16.5083 12.5701 16.49 12.5846 16.4492C12.6091 16.4056 12.664 16.3401 12.8037 16.2139C12.9344 16.09 13.1955 15.8712 13.3751 15.5151C13.5604 15.143 13.4668 14.8992 13.354 14.7365C13.2316 14.5717 13.085 14.4513 12.8663 14.2773C12.6319 14.0822 12.4017 14.1135 12.3524 14.2245C12.2936 14.3334 12.354 14.4791 12.445 14.5796C12.4777 14.6162 12.5137 14.6533 12.5515 14.6903C12.6706 14.8091 12.7962 14.924 12.8922 15.0311C12.9889 15.1465 13.0516 15.2102 13.0072 15.4075C12.9859 15.5154 13.0643 15.6345 13.1746 15.6404C13.2835 15.6545 13.4057 15.6144 13.5277 15.5975C13.5278 15.5975 13.528 15.5975 13.5281 15.5975C13.6772 15.5769 13.8488 15.5813 13.9489 15.751C14.0627 15.9118 13.9564 16.2919 13.7347 16.4369C13.0778 16.839 12.6903 16.8207 12.1262 16.8913C11.4926 16.8843 10.3719 17.1153 9.28737 15.6237C8.77889 14.7973 8.60434 13.9289 8.70813 12.9401C8.77982 12.3464 9.0037 11.7532 9.40978 11.2238C11.1211 9.27568 12.7407 9.46946 13.783 9.62587C14.9098 9.98663 16.1124 10.0783 17.5535 12.5468C18.3923 14.5185 17.752 16.0651 17.2902 17.212C17.0755 17.7069 16.8187 18.2209 16.459 18.7805C16.0668 19.3849 15.5933 19.9655 14.9476 20.4965C13.7684 21.4912 11.9966 22.1475 10.2136 22.0176C8.7499 21.9403 6.81073 21.6559 5.01737 19.4279C3.76413 17.9986 1.82361 15.542 3.1442 11.0694C3.40227 10.4825 3.74494 9.69268 4.48479 8.63139C4.97308 7.95174 5.53877 7.1508 6.48909 6.33449C7.41444 5.51552 8.87892 4.81385 10.1948 4.65572C12.344 4.27122 14.188 3.09467 17.7769 3.95152C18.6446 4.12626 19.6604 4.43114 20.9458 5.35497C22.1396 6.24047 24.1177 8.11983 24.5998 11.5272C24.8867 13.8526 24.2438 15.9949 22.9939 17.7029C22.8857 17.8394 22.7712 17.9771 22.6497 18.1154C21.6102 19.3169 20.212 20.4458 18.7374 21.0784C15.4361 22.1905 12.8472 22.9357 9.51531 22.7205C8.05604 22.5875 5.41981 22.2197 3.16387 19.0856C1.55166 17.3041 -1.42344 14.1947 0.789415 7.37039C1.32653 5.9589 2.61252 3.75714 4.96736 2.17768C6.90268 0.859273 9.01719 0.325087 10.5727 0.178627C11.5661 0.0491915 12.6979 -0.0451651 14.3315 0.0226097C15.1745 0.0707645 16.1015 0.116714 17.6512 0.468508C18.4389 0.665799 19.4035 0.90569 20.8333 1.65506C22.1777 2.35977 24.4576 3.99212 25.6965 6.86865C27.2387 10.7989 26.9785 15.5302 24.2204 19.3525C22.6225 21.5035 20.786 22.7517 18.6331 23.5939C17.2963 23.984 14.4606 25.2378 10.3508 23.6017C7.67966 22.2644 4.71171 19.7779 3.47789 16.0898C3.19573 15.259 3.02007 14.425 2.9276 13.6536C2.77433 12.3998 2.85316 11.149 3.07644 10.0409C3.20635 9.44908 3.34074 8.38905 4.30501 6.70651C5.12117 5.03486 8.05763 2.67379 10.5924 2.41281C11.6741 2.18702 12.8498 1.98024 14.4218 1.95298C16.0165 2.09052 17.9741 1.55824 21.9129 4.33398C23.8484 5.99123 25.6695 8.17361 25.7391 12.3442C25.6646 15.797 23.8614 18.6327 21.5363 20.2906C20.5203 20.9949 20.0859 21.1578 19.5706 21.3999C19.0832 21.6151 18.637 21.7805 18.2056 21.922C17.3366 22.2058 16.4827 22.4091 15.5751 22.5508C14.0814 22.7673 12.4686 22.9983 10.2357 22.786C8.12889 22.6127 4.56802 21.5404 2.30715 18.5429C-0.161968 14.9448 0.384725 12.4956 0.602134 10.7308C0.753234 10.0101 0.928583 8.69563 2.16053 6.84159C3.31507 4.93099 6.32416 3.17799 8.33715 3.00408C9.4564 2.78949 10.6283 2.6154 12.0155 2.57083C13.4563 2.5892 14.8716 2.41835 17.8062 3.56317C18.5532 3.89665 19.4026 4.30194 20.5199 5.22852C21.5647 6.10778 23.2774 7.94062 23.7252 10.8869C24.307 17.5198 19.8113 20.0108 17.5232 20.8075C16.2874 21.2083 15.4423 21.2664 14.6855 21.2884C13.1433 21.2969 12.0175 21.1028 10.5403 20.6894C9.82452 20.4695 8.94255 20.2111 7.71349 19.5009C6.51878 18.8437 4.84112 17.2835 4.13859 15.4901C2.91253 12.2137 3.63739 10.1112 4.48911 8.26385C5.46543 6.17311 7.83726 4.19413 10.0196 3.69942C12.5782 3.13322 13.9816 3.45543 15.9148 4.04415C17.1836 4.53475 19.4788 5.3619 20.6591 8.36956C21.4726 10.7652 20.7793 13.14 19.1183 14.6977C17.4702 16.0952 15.6058 16.6045 13.4235 15.9992C12.1685 15.4169 10.805 14.6899 9.7317 13.5176C9.2134 12.9515 8.76625 12.2571 8.5081 11.5345C8.19303 10.7247 7.9631 9.43297 8.62988 8.20472C9.31807 7.00458 10.2752 6.69951 10.8247 6.55489C13.0259 6.29428 13.6083 6.43593 15.6049 7.03756C16.1048 7.2544 16.8936 7.70359 17.3246 8.71095C17.7437 9.72111 17.5441 10.7025 17.2582 11.3862C16.9385 12.1311 16.4183 12.8732 15.442 13.4181C15.0893 13.6095 14.6678 13.7602 14.1947 13.8211C12.401 14.0188 11.1871 13.0595 10.5166 12.343C9.73018 11.4338 9.10965 10.4786 9.00755 8.78084C8.98652 7.57933 9.56383 5.81539 11.3139 5.31609C11.8529 5.29006 12.3936 5.31623 12.9277 5.40478C13.7393 5.53882 14.1324 5.96434 14.0953 6.41182C14.1656 6.83971 13.9193 7.30989 13.4495 7.76458C13.1966 8.00788 12.9433 8.21867 12.6965 8.40967C12.9689 8.38443 13.1484 8.17403 13.1975 8.15528C13.2586 8.11969 13.2954 8.17251 13.3731 8.19402C13.5001 8.14899 13.8487 8.33699 14.3991 8.12941C14.7964 7.98822 15.1353 7.809 15.3821 7.59022C15.6914 7.30048 15.8298 6.89954 15.5858 6.44438C15.3601 6.00322 14.6082 5.46956 13.4886 5.43635C11.642 5.42691 10.4415 6.43844 10.0277 7.76969C9.91809 8.13551 9.8078 8.59667 9.81964 9.31674C9.82609 10.0118 10.0519 11.0997 10.6891 11.953C11.5302 13.067 12.344 13.3033 12.7003 13.4134C13.2509 13.5399 13.1762 13.4682 13.1676 13.5444C13.1346 13.604 13.0529 13.7267 13.0103 13.8888C12.9669 14.0499 12.952 14.2501 13.0346 14.4403C13.1252 14.6243 13.2799 14.8257 13.7823 14.8391C14.3046 14.8269 15.2835 14.6322 16.3801 13.4727C17.5107 12.337 18.0276 10.2051 17.767 9.01203C17.5953 8.02282 17.2778 7.53815 17.0004 7.17827C15.9998 6.04014 13.9758 6.46987 15.6229 6.9451C14.8973 6.76503 14.1796 6.80785 13.6256 6.95488C13.0573 7.11692 12.6267 7.29363 12.0417 7.81354C10.9176 8.92845 10.3482 10.4657 10.9456 12.341C11.3816 13.6122 12.3058 14.3814 12.7356 14.6872C13.0338 14.9017 13.1973 14.9989 13.2891 15.0792C13.4725 15.2263 13.4181 15.3112 13.4789 15.4095C13.5372 15.4967 13.6516 15.6085 14.1394 15.538C15.1547 15.4266 16.4931 14.3043 16.8984 13.4967C17.313 12.6533 17.852 11.72 17.0311 9.45395C16.4857 8.0432 15.1067 6.86661 14.4342 6.51426C13.7164 6.1061 13.4515 6.04268 13.3436 5.96627C13.1589 5.8554 13.2376 5.79488 13.1138 5.72901C12.9844 5.68446 12.7795 5.56919 11.8313 5.84654C10.4354 6.2933 7.48279 7.97422 7.3562 12.45C7.35824 12.7657 7.38124 13.0995 7.43063 13.4436C7.72819 15.644 9.0469 17.2604 9.79672 17.8868C10.5949 18.5694 11.0571 18.7374 11.3555 18.8526C12.0034 19.0915 12.2549 19.0665 12.3411 19.0384C12.4234 19.0026 12.3362 18.9344 12.1738 18.8748C11.8409 18.7519 11.2132 18.6561 10.5214 18.6326C11.8084 18.5243 14.1179 17.1878 14.8857 15.8501C15.7155 14.5645 15.6956 13.9159 15.704 13.8565C15.6882 13.2121 16.2323 12.0491 14.4877 9.41551C14.0395 8.82119 13.36 8.29994 12.8421 8.03654C12.3158 7.76211 11.9719 7.66989 11.7931 7.5817C11.4584 7.43498 11.5583 7.4063 11.8624 7.27424C12.01 7.2125 12.2081 7.13044 12.3708 7.04923C12.4504 7.00977 12.5234 6.96882 12.5364 6.95433C12.5413 6.94821 12.5321 6.94767 12.4731 6.97653C12.4088 7.01153 12.3223 7.0444 11.9825 7.28561C10.7132 8.20389 9.57552 9.82088 9.51187 12.0735C9.58185 14.9367 10.6525 16.02 11.6696 16.9543C12.864 17.8936 13.5414 17.9834 13.8355 18.0817C14.1396 18.1562 14.1608 18.1526 14.1013 18.1718C13.9634 18.2006 13.5069 18.2787 13.0695 18.4142C15.1274 18.2937 17.671 16.1812 18.1789 15.1006C18.8515 13.9872 18.8798 13.6144 18.945 13.6645C19.1171 13.2411 19.252 12.6501 19.2883 12.0497C19.3202 11.5696 19.269 11.0802 19.1671 10.655C18.6444 8.76309 17.733 8.29011 17.2916 8.21747C16.8037 8.15388 16.4868 8.45742 16.2566 8.82935C15.0693 8.57712 13.9013 8.76899 13.2799 9.0846C12.6376 9.39859 12.4372 9.75691 12.493 9.95478C12.392 10.1069 12.3195 10.2549 12.2599 10.4005Z"
                        fill={dot.color}
                      />
                    </svg>
                  ))}
                </div>
                <div className={styles.metadataBar}>
                  {metadata.map((item, i) => (
                    <div key={i} className={styles.metadataCell}>
                      <p className={styles.metadataLabel}>{item.label}</p>
                      <p className={styles.metadataValue}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* ─── Sidebar + Content: same grid columns ─── */}
        <ProjectSidebar sections={SIDEBAR_SECTIONS} />

        <div className={styles.content}>

          {/* ═══ STAKES — DARK (two voices: data + designer) ═══ */}
          <section
            className={styles.sectionDark}
            id="stakes"
            data-section="stakes"
            data-dark-section
          >
            <div className={styles.narrow} style={{ paddingTop: 'var(--space-xl)' }}>

              {/* Voice 1 — DATA */}
              <AnimatedElement>
                <p className={styles.voiceLabel}>What the Data Says</p>
              </AnimatedElement>
              <AnimatedElement>
                <div className={styles.statsRow}>
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>1 in 5</p>
                    <p className={styles.statDesc}>healthcare workers have experienced PTSD</p>
                    <p className={styles.statSource}>↗ <a href="https://ndpanalytics.com/wp-content/uploads/HCW-Shortage-Final-Mar-2023.pdf" target="_blank" rel="noopener noreferrer">NDP Analytics, 2023</a></p>
                  </div>
                  <span className={styles.statPlus}>+</span>
                  <div className={styles.statItem}>
                    <p className={styles.statNumber}>73%</p>
                    <p className={styles.statDesc}>of emergency physicians report stigma around mental health</p>
                    <p className={styles.statSource}>↗ <a href="https://www.emergencyphysicians.org/article/mental-health/poll-workplace-stigma-fear-of-professional-consequences-prevent-emergency-physicians-from-seeking-mental-health-care" target="_blank" rel="noopener noreferrer">ACEP, 2023</a></p>
                  </div>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className={styles.stakesCalloutWrap}>
                  <p className={styles.stakesCallout}>
                    This is not an individual failure. It is a <em>systemic</em> one.
                  </p>
                  <SectionDivider color="var(--color-cream)" className={styles.calloutDivider} />
                </div>
              </AnimatedElement>

              {/* Voice 2 — DESIGNER */}
              <div className={styles.stakesVoice}>
                <AnimatedElement>
                  <p className={styles.voiceLabel}>What I Brought</p>
                </AnimatedElement>
                <AnimatedElement>
                  <p className={styles.bodyDark}>
                    As a masters student at Carnegie Mellon with a focus on mental health and structurally flawed systems, I was drawn to a participatory design course partnered with a local oncology unit. I had no idea it would reshape my career. What started as a semester of research became a grant-funded, 12-month quality improvement study at UPMC.
                  </p>
                </AnimatedElement>
                <AnimatedElement>
                  <p className={styles.bodyDark}>
                    My background in somatic psychology, emotional literacy, and trauma-informed design shaped every contribution I made, from the language on each reflection card to the systems-level thinking behind a multi-scale ecology that intervenes at both intimate and institutional scales.
                  </p>
                </AnimatedElement>
              </div>

            </div>
            <div style={{ paddingBottom: 'var(--space-xl)' }} />
          </section>


          {/* ═══ SENSE — What We Heard ═══ */}
          <section className={styles.room} id="sense" data-section="sense" data-phase="sense">
            <div className={styles.narrow}>
              <AnimatedElement>
                <SenseHeading>What We Heard</SenseHeading>
              </AnimatedElement>

              <AnimatedElement>
                <p className={styles.body}>
                  Over 15 weeks, my team and I shadowed nurses across multiple shifts, conducted contextual interviews, and facilitated a confidential conversation with a former employee who could speak freely.
                </p>
              </AnimatedElement>

              <AnimatedElement>
                <div className={`${styles.inlineQuote} ${styles.inlineQuoteLight}`} style={{ borderLeftColor: 'var(--color-sage)' }}>
                  <p className={styles.inlineQuoteText}>&ldquo;A special person can do this work forever, a good person can do it for a little while, most people couldn&apos;t do it for a day.&rdquo;</p>
                  <p className={styles.inlineQuoteAttribution}>— Ex-UPMC Employee</p>
                </div>
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
          <SectionDivider color="var(--color-sage-soft)" />
          <section
            id="trust"
            data-section="trust"
            data-phase="sense"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
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
          <SectionDivider color="var(--color-plum-soft)" />
          <section
            id="weave"
            data-section="weave"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
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
          <SectionDivider color="var(--color-plum-soft)" />
          <section
            id="turning"
            data-section="turning"
            data-phase="weave"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
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
          <SectionDivider color="var(--color-terracotta-soft)" />
          <section
            className={styles.room}
            id="shape"
            data-section="shape"
            data-phase="shape"
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
          <SectionDivider color="var(--color-terracotta-soft)" />
          <section
            id="making"
            data-section="making"
            data-phase="shape"
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
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
          <SectionDivider color="var(--color-terracotta-soft)" />
          <section
            style={{ paddingTop: 'var(--space-xl)', paddingBottom: 'var(--space-xl)' }}
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
      </div>{/* end .pageGrid */}

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
