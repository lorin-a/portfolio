'use client'

import { useRef, useState, useCallback } from 'react'
import { gsap, SplitText } from '@/lib/gsap'
import { useGSAP } from '@gsap/react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './Hero.module.css'

gsap.registerPlugin(useGSAP)

const LIGHT_GRADIENT = ['#8A9263', '#9F84A9', '#C97D64']
const DARK_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']
const LIGHT_GRAD_CSS = 'linear-gradient(to bottom right, #6B8245 5%, #8B6899 45%, #B86048 88%)'
const DARK_GRAD_CSS = 'linear-gradient(169.3deg, #C5CFA6 15.5%, #C7AAD1 52.1%, #F79C7E 89.7%)'

/**
 * Apply gradient spanning across SplitText chars.
 * Each char shows its slice of one continuous gradient.
 */
function applyGradientSpan(wrapEl, chars, dark) {
  const gradient = dark ? DARK_GRAD_CSS : LIGHT_GRAD_CSS
  const wrapRect = wrapEl.getBoundingClientRect()
  chars.forEach(char => {
    const charRect = char.getBoundingClientRect()
    Object.assign(char.style, {
      background: gradient,
      backgroundSize: `${wrapRect.width}px ${wrapRect.height}px`,
      backgroundPosition: `-${charRect.left - wrapRect.left}px 0px`,
      webkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    })
  })
}

export default function Hero() {
  const heroRef = useRef(null)
  const introFlowerRef = useRef(null)
  const introFlowerInnerRef = useRef(null)

  const [senseAnimate, setSenseAnimate] = useState(false)
  const [weaveAnimate, setWeaveAnimate] = useState(false)
  const [shapeAnimate, setShapeAnimate] = useState(false)
  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const [shapeReplay, setShapeReplay] = useState(0)

  const shapeDrawDone = useRef(null)
  const onShapeDrawComplete = useCallback(() => shapeDrawDone.current?.(), [])

  const { phase, setPhase, triggerTransition } = useHeroIntro()
  const entranceDoneRef = useRef(false)
  const isIntro = phase === 'waiting' || phase === 'playing'
  const resolved = phase !== null

  /* Track split chars for theme-responsive gradient updates */
  const connectionCharsRef = useRef(null)

  /* Theme detection — also re-applies gradient when theme changes */
  const [isDark, setIsDark] = useState(true)
  useGSAP(() => {
    const root = document.documentElement
    const check = () => {
      const dark = root.dataset.theme === 'dark'
      setIsDark(dark)
      /* Re-apply gradient if chars exist */
      const line2El = heroRef.current?.querySelector('.titleLine2')
      if (line2El && connectionCharsRef.current) {
        applyGradientSpan(line2El, connectionCharsRef.current, dark)
      }
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, { scope: heroRef })

  /* Scroll escape */
  const { contextSafe } = useGSAP({ scope: heroRef })
  const snapEntrance = contextSafe(() => {
    if (entranceDoneRef.current) return
    entranceDoneRef.current = true
    gsap.killTweensOf('*')
    setSenseAnimate(true)
    setWeaveAnimate(true)
    setShapeAnimate(true)
    shapeDrawDone.current?.()
    gsap.set('.heroContent', { autoAlpha: 1 })
    gsap.set('.introFlower', { autoAlpha: 0 })
    gsap.set('.markItem', { autoAlpha: 1 })
    gsap.set('.titleWrap', { autoAlpha: 1, y: 0, height: 'auto', overflow: 'visible' })
    gsap.set('.titleLine1, .titleLine2', { visibility: 'visible', clipPath: 'none' })
    gsap.set('.subtitle', { autoAlpha: 1, y: 0, height: 'auto', overflow: 'visible' })
    if (isIntro) triggerTransition()
  })

  /* ═══ MAIN ANIMATION ═══ */
  useGSAP(() => {
    if (!resolved || entranceDoneRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set('.heroContent', { autoAlpha: 1 })
      gsap.set('.titleLine1, .titleLine2', { visibility: 'visible' })
      gsap.set('.markItem', { autoAlpha: 1 })
      gsap.set('.subtitle', { autoAlpha: 1 })
      setSenseAnimate(true)
      setWeaveAnimate(true)
      setShapeAnimate(true)
      entranceDoneRef.current = true
      return
    }

    /* Scroll escape */
    const onScroll = () => {
      if (!entranceDoneRef.current && window.scrollY > 10) snapEntrance()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (isIntro) {
      buildCinematicIntro()
    } else {
      buildStandardEntrance()
    }

    return () => window.removeEventListener('scroll', onScroll)

    /* ─────────────────────────────────────────
       CINEMATIC INTRO — One master timeline
       ───────────────────────────────────────── */
    async function buildCinematicIntro() {
      setPhase('playing')

      const flower = introFlowerRef.current
      const flowerInner = introFlowerInnerRef.current


      /* Initial state */
      gsap.set('.heroContent', { autoAlpha: 1 })
      gsap.set('.titleWrap', { height: 0, overflow: 'hidden' })
      gsap.set('.subtitle', { height: 0, overflow: 'hidden' })
      gsap.set(flower, { autoAlpha: 1 })
      gsap.set(flowerInner, { autoAlpha: 1, scale: 1 })

      /* Wait for fonts before SplitText */
      await document.fonts.ready
      if (entranceDoneRef.current) return

      /* Flower fill + spin (driven by ShapeMark internally) */
      const drawPromise = new Promise(r => { shapeDrawDone.current = r })
      setShapeAnimate(true)
      await drawPromise
      if (entranceDoneRef.current) return

      /* ─── Step 1: Flower bounce + shrink ─── */
      await gsap.to(flowerInner, { scale: 1.3, duration: 0.35, ease: 'power2.out' })
      if (entranceDoneRef.current) return

      await gsap.to(flowerInner, { scale: 0, autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' })
      if (entranceDoneRef.current) return

      gsap.set(flower, { autoAlpha: 0, pointerEvents: 'none' })

      /* ─── Step 2: Now that flower is gone, prepare text ─── */
      triggerTransition()

      const splitOpts = {
        type: 'chars',
        mask: 'chars',
        onSplit(self) {
          self.masks.forEach(m => {
            m.style.paddingBottom = '0.2em'
            m.style.marginBottom = '-0.12em'
          })
        },
      }
      const split1 = SplitText.create('.titleLine1', splitOpts)
      const split2 = SplitText.create('.titleLine2', splitOpts)

      /* Position chars behind masks FIRST, then make visible */
      gsap.set(split1.chars, { y: '100%' })
      gsap.set(split2.chars, { y: '100%' })
      gsap.set('.titleWrap', { height: 'auto', overflow: 'visible', autoAlpha: 1, y: 0 })
      gsap.set('.titleLine1', { visibility: 'visible' })
      gsap.set('.titleLine2', { visibility: 'visible' })

      /* Apply gradient spanning + store ref for theme updates */
      connectionCharsRef.current = split2.chars
      const line2El = heroRef.current.querySelector('.titleLine2')
      applyGradientSpan(line2El, split2.chars, isDark)
      gsap.set('.subtitle', { height: 'auto', overflow: 'visible',
        clipPath: 'inset(-0.2em 100% -0.2em 0)' })

      /* ─── Step 3: Text + marks reveal timeline ─── */
      const master = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      /* "Designing" chars rise from mask */
      master.to(split1.chars, {
        y: '0%', duration: 0.8, stagger: 0.04, ease: 'power1.inOut',
      }, 0)

      /* "Connection" chars rise from mask */
      master.to(split2.chars, {
        y: '0%', duration: 0.8, stagger: 0.04, ease: 'power1.inOut',
      }, 0.6)

      /* Subtitle wipes in */
      master.to('.subtitle', {
        autoAlpha: 1,
        clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.0, ease: 'power1.inOut',
      }, 1.4)

      /* Marks cascade left to right */
      master.call(() => {
        setSenseAnimate(true)
        setWeaveAnimate(true)
        setShapeAnimate(true)
      }, null, 2.0)

      master.to('.markItem', {
        autoAlpha: 1, duration: 0.4, stagger: 0.2, ease: 'power1.inOut',
      }, 2.0)
    }

    /* ─────────────────────────────────────────
       STANDARD ENTRANCE — One timeline, return visits
       ───────────────────────────────────────── */
    function buildStandardEntrance() {


      gsap.set('.heroContent', { autoAlpha: 1 })
      gsap.set('.titleLine1', { visibility: 'visible' })
      gsap.set('.titleLine2', { visibility: 'visible' })
      gsap.set('.titleWrap', { autoAlpha: 0, y: 20 })
      gsap.set('.subtitle', { autoAlpha: 0, y: 12 })
      gsap.set('.introFlower', { autoAlpha: 0 })

      const splitOpts = {
        type: 'chars',
        mask: 'chars',
        onSplit(self) {
          self.masks.forEach(m => {
            m.style.paddingBottom = '0.2em'
            m.style.marginBottom = '-0.12em'
          })
        },
      }
      const split1 = SplitText.create('.titleLine1', splitOpts)
      const split2 = SplitText.create('.titleLine2', splitOpts)

      /* Apply gradient spanning + store ref for theme updates */
      connectionCharsRef.current = split2.chars
      const line2El = heroRef.current.querySelector('.titleLine2')
      applyGradientSpan(line2El, split2.chars, isDark)

      const tl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      /* 0s: marks draw on + fade in */
      tl.call(() => setSenseAnimate(true), null, 0)
      tl.call(() => setWeaveAnimate(true), null, 0.15)
      tl.call(() => setShapeAnimate(true), null, 0.3)
      tl.to('.markItem', {
        autoAlpha: 1, duration: 0.5, stagger: 0.12, ease: 'power1.inOut',
      }, 0.3)

      /* 0.8s: title wrapper + text reveals */
      tl.to('.titleWrap', {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power1.inOut',
      }, 0.8)
      tl.from(split1.chars, {
        y: '100%', duration: 0.6, stagger: 0.03, ease: 'power1.inOut',
      }, 0.8)
      tl.from(split2.chars, {
        y: '100%', duration: 0.6, stagger: 0.03, ease: 'power1.inOut',
      }, 1.0)

      /* 1.6s: subtitle */
      tl.to('.subtitle', {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power1.inOut',
      }, 1.6)
    }
  }, {
    scope: heroRef,
    dependencies: [resolved, isIntro],
  })

  return (
    <section className={styles.hero} ref={heroRef} aria-label="Introduction">
      <div className={`${styles.heroContent} heroContent`}>
        {/* Intro flower */}
        <div className={`${styles.introFlower} introFlower`} ref={introFlowerRef} aria-hidden="true">
          <div className={styles.introFlowerInner} ref={introFlowerInnerRef}>
            <ShapeMark
              animate={shapeAnimate && isIntro}
              fillReveal
              showBrush
              gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT}
              onDrawComplete={onShapeDrawComplete}
            />
          </div>
        </div>

        {/* Marks */}
        <div className={styles.marksRow} aria-hidden="true">
          <div className={`${styles.markItem} markItem`}
            onMouseEnter={() => entranceDoneRef.current && setSenseReplay(r => r + 1)}>
            <div className={styles.markIcon}>
              <SenseMark animate={senseAnimate} replay={senseReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
          </div>
          <div className={`${styles.markItem} markItem`}
            onMouseEnter={() => entranceDoneRef.current && setWeaveReplay(r => r + 1)}>
            <div className={styles.markIconWeave}>
              <WeaveMark animate={weaveAnimate} replay={weaveReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
          </div>
          <div className={`${styles.markItem} markItem`}
            onMouseEnter={() => entranceDoneRef.current && setShapeReplay(r => r + 1)}>
            <div className={styles.markIcon}>
              <ShapeMark animate={shapeAnimate && !isIntro} replay={shapeReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="titleWrap">
          <h1 className={styles.title} aria-label="Designing Connection">
            <span className={`${styles.titleLine1} titleLine1`}>Designing</span>
            <span className={`${styles.titleLine2} titleLine2`}>Connection</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className={`${styles.subtitle} subtitle`}>
          Emotion-Centered Research, Strategy <span style={{ fontStyle: 'normal', fontWeight: 333 }}>&amp;</span> Design
        </p>
      </div>
    </section>
  )
}
