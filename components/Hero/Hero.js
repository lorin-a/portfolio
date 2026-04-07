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

/* Per-character kerning from Figma (px at 112px base, scales with font size) */
const KERN_DESIGNING = { 0: -1.12, 3: -1.12, 4: 2.24, 5: 2.24, 6: 1.12 }
const KERN_CONNECTION = { 0: 1.12, 1: -2.24, 2: 2.24, 3: -2.24, 6: 1.12, 7: -2.24, 8: -2.24 }

function applyKerning(chars, kernMap) {
  Object.entries(kernMap).forEach(([i, px]) => {
    if (chars[i]) chars[i].style.marginRight = `${px}px`
  })
}

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

      /* Title lines stay visibility:hidden (from CSS).
         SplitText inherits that — no chars visible during setup. */
      gsap.set('.titleWrap', { height: 'auto', overflow: 'visible', autoAlpha: 1, y: 0 })

      /* Designing: masked for rise-from-below reveal */
      const split1Opts = {
        type: 'chars',
        mask: 'chars',
        onSplit(self) {
          self.masks.forEach(m => {
            m.style.paddingTop = '0.25em'
            m.style.marginTop = '-0.25em'
            m.style.paddingBottom = '0.2em'
            m.style.marginBottom = '-0.12em'
          })
        },
      }
      const split1 = SplitText.create('.titleLine1', split1Opts)

      /* Connection: NO mask — chars need to scatter across viewport */
      const split2 = SplitText.create('.titleLine2', { type: 'chars' })

      /* Hide Designing chars behind masks */
      gsap.set(split1.chars, { y: '100%' })

      /* Scatter Connection chars across full viewport in a deliberate ring.
         Positions inspired by Figma mockup — letters placed around the
         center composition, not randomly scattered. */
      const vw = window.innerWidth
      const vh = window.innerHeight
      /* Scatter chars using position:fixed so they escape ALL overflow containers.
         Positions are absolute viewport coordinates forming a ring around center. */
      const cx = vw / 2
      const cy = vh / 2
      const scatterPositions = [
        { left: vw * 0.06, top: vh * 0.2 },   // C — far left, upper
        { left: vw * 0.22, top: vh * 0.08 },  // o — upper left
        { left: vw * 0.68, top: vh * 0.1 },   // n — upper right
        { left: vw * 0.85, top: vh * 0.2 },   // n — far right, upper
        { left: vw * 0.05, top: vh * 0.6 },   // e — far left, lower
        { left: vw * 0.82, top: vh * 0.45 },  // c — far right, middle
        { left: vw * 0.25, top: vh * 0.72 },  // t — lower left
        { left: vw * 0.73, top: vh * 0.5 },   // i — right of center
        { left: vw * 0.6,  top: vh * 0.75 },  // o — lower right
        { left: vw * 0.88, top: vh * 0.68 },  // n — far right, lower
      ]
      split2.chars.forEach((char, i) => {
        const pos = scatterPositions[i] || { left: cx, top: cy }
        gsap.set(char, {
          position: 'fixed',
          left: pos.left,
          top: pos.top,
          x: 0, y: 0,
          rotation: gsap.utils.random(-8, 8),
          autoAlpha: 0,
          zIndex: 50,
        })
      })

      /* Apply gradient + kerning (chars are invisible) */
      connectionCharsRef.current = split2.chars
      applyKerning(split1.chars, KERN_DESIGNING)
      applyKerning(split2.chars, KERN_CONNECTION)
      const line2El = heroRef.current.querySelector('.titleLine2')
      applyGradientSpan(line2El, split2.chars, isDark)

      gsap.set('.subtitle', { height: 'auto', overflow: 'visible',
        clipPath: 'inset(-0.2em 100% -0.2em 0)' })

      /* ─── Step 3: Text + marks reveal timeline ─── */
      const master = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      /* Make lines visible + start animation in the SAME timeline tick.
         Chars are already at y:100% so nothing shows above the masks. */
      master.set('.titleLine1', { visibility: 'visible' }, 0)
      master.set('.titleLine2', { visibility: 'visible' }, 0)

      /* "Designing" chars rise from mask */
      master.to(split1.chars, {
        y: '0%', duration: 0.8, stagger: 0.04, ease: 'power1.inOut',
      }, 0)

      /* "Connection" — gather: scattered fixed chars fade in then pull to final position */
      master.set('.titleLine2', { visibility: 'visible' }, 0.6)

      /* Fade in at scattered positions */
      master.to(split2.chars, {
        autoAlpha: 1, duration: 0.5,
        stagger: { each: 0.03, from: 'random' },
        ease: 'power1.in',
      }, 0.6)

      /* Gather: measure each char's final position, animate from fixed to there */
      master.call(() => {
        /* Get each char's natural position in the flow */
        const targets = split2.chars.map(char => {
          /* Temporarily remove fixed positioning to measure natural position */
          const savedStyles = {
            position: char.style.position,
            left: char.style.left,
            top: char.style.top,
            zIndex: char.style.zIndex,
          }
          gsap.set(char, { position: 'relative', left: 'auto', top: 'auto', zIndex: 'auto' })
          const rect = char.getBoundingClientRect()
          /* Restore fixed positioning */
          gsap.set(char, savedStyles)
          return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        })

        /* Animate each char from its fixed position to its natural center */
        split2.chars.forEach((char, i) => {
          const charRect = char.getBoundingClientRect()
          const fromX = charRect.left + charRect.width / 2
          const fromY = charRect.top + charRect.height / 2
          const dx = targets[i].x - fromX
          const dy = targets[i].y - fromY

          gsap.to(char, {
            x: `+=${dx}`, y: `+=${dy}`, rotation: 0,
            duration: 1.0,
            delay: i * 0.03,
            ease: 'power2.inOut',
            onComplete: () => {
              /* Snap to flow position */
              gsap.set(char, {
                position: 'relative', left: 'auto', top: 'auto',
                x: 0, y: 0, zIndex: 'auto', clearProps: 'rotation',
              })
            },
          })
        })
      }, null, 1.2)

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
            m.style.paddingTop = '0.25em'
            m.style.marginTop = '-0.25em'
            m.style.paddingBottom = '0.2em'
            m.style.marginBottom = '-0.12em'
          })
        },
      }
      const split1 = SplitText.create('.titleLine1', splitOpts)
      const split2 = SplitText.create('.titleLine2', splitOpts)

      /* Apply gradient spanning + store ref for theme updates */
      connectionCharsRef.current = split2.chars
      applyKerning(split1.chars, KERN_DESIGNING)
      applyKerning(split2.chars, KERN_CONNECTION)
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
      const vwStd = window.innerWidth
      const vhStd = window.innerHeight
      const scatterStd = [
        { x: -vwStd * 0.38, y: -vhStd * 0.25 },
        { x: -vwStd * 0.2,  y: -vhStd * 0.38 },
        { x: vwStd * 0.25,  y: -vhStd * 0.35 },
        { x: vwStd * 0.38,  y: -vhStd * 0.15 },
        { x: -vwStd * 0.38, y: vhStd * 0.15 },
        { x: vwStd * 0.35,  y: vhStd * 0.05 },
        { x: -vwStd * 0.15, y: vhStd * 0.25 },
        { x: vwStd * 0.2,   y: vhStd * 0.0 },
        { x: vwStd * 0.1,   y: vhStd * 0.3 },
        { x: vwStd * 0.35,  y: vhStd * 0.25 },
      ]
      split2.chars.forEach((char, i) => {
        const pos = scatterStd[i] || { x: 0, y: 0 }
        gsap.set(char, {
          x: pos.x, y: pos.y,
          rotation: gsap.utils.random(-8, 8),
          autoAlpha: 0,
        })
      })
      tl.set('.titleLine2', { visibility: 'visible' }, 1.0)
      tl.to(split2.chars, {
        autoAlpha: 1, duration: 0.3,
        stagger: { each: 0.02, from: 'random' },
        ease: 'power1.in',
      }, 1.0)
      tl.to(split2.chars, {
        x: 0, y: 0, rotation: 0, scale: 1, duration: 0.8,
        stagger: { each: 0.03, from: 'edges' },
        ease: 'power2.inOut',
      }, 1.1)

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
            <span
              className={`${styles.titleLine2} titleLine2`}
              onMouseEnter={() => {
                if (!entranceDoneRef.current || !connectionCharsRef.current) return
                const chars = connectionCharsRef.current
                if (gsap.isTweening(chars[0])) return
                /* Gather: chars scatter to deliberate ring then reform */
                const vw = window.innerWidth
                const vh = window.innerHeight
                const hoverPositions = [
                  { x: -vw * 0.3, y: -vh * 0.2 },
                  { x: -vw * 0.15, y: -vh * 0.3 },
                  { x: vw * 0.2, y: -vh * 0.28 },
                  { x: vw * 0.3, y: -vh * 0.1 },
                  { x: -vw * 0.3, y: vh * 0.12 },
                  { x: vw * 0.28, y: vh * 0.05 },
                  { x: -vw * 0.12, y: vh * 0.2 },
                  { x: vw * 0.15, y: vh * 0.0 },
                  { x: vw * 0.08, y: vh * 0.25 },
                  { x: vw * 0.28, y: vh * 0.2 },
                ]
                const tl = gsap.timeline()
                chars.forEach((char, i) => {
                  const pos = hoverPositions[i] || { x: 0, y: 0 }
                  tl.to(char, {
                    x: pos.x, y: pos.y,
                    rotation: gsap.utils.random(-8, 8),
                    duration: 0.5,
                    ease: 'power1.out',
                  }, i * 0.02)
                })
                tl.to(chars, {
                  x: 0, y: 0, rotation: 0,
                  duration: 0.8,
                  stagger: { each: 0.02, from: 'edges' },
                  ease: 'power2.inOut',
                })
              }}
            >Connection</span>
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
