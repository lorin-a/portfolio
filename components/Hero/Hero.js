'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './Hero.module.css'

/* Split text into per-character spans for type-on animation.
   Initial opacity is set via CSS (.heroChar), NOT React inline styles,
   so GSAP has sole control over opacity and React re-renders won't reset it. */
function CharSpans({ text, charsRef, wrapRef, startIndex = 0, className, kerning, charStyles, bgSpan }) {
  return (
    <span className={className} ref={wrapRef}>
      {text.split('').map((char, i) => {
        const kern = kerning?.[i]
        const extra = charStyles?.[i]
        const bg = bgSpan?.[i]
        return (
          <span
            key={i}
            ref={el => { if (charsRef) charsRef.current[startIndex + i] = el }}
            className={styles.heroChar}
            style={{
              ...(kern ? { marginRight: `${kern}px` } : undefined),
              ...extra,
              ...bg,
            }}
            aria-hidden="true"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </span>
  )
}

/* Gradient palettes for marks */
const LIGHT_GRADIENT = ['#8A9263', '#9F84A9', '#C97D64']
const DARK_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* Per-character kerning from Figma (px values at 112px) */
const KERN_DESIGNING = { 0: -1.12, 3: -1.12, 4: 2.24, 5: 2.24, 6: 1.12 }
const KERN_CONNECTION = { 0: 1.12, 1: -2.24, 2: 2.24, 3: -2.24, 6: 1.12, 7: -2.24, 8: -2.24 }

/* Ampersand style override — non-italic, weight 333 per Figma */
const SUBTITLE_CHAR_STYLES = {
  36: { fontStyle: 'normal', fontWeight: 333 },
}

export default function Hero() {
  const line1Ref = useRef(null)
  const line2WrapRef = useRef(null)
  const line2Chars = useRef([])
  const subtitleChars = useRef([])
  const marksRowRef = useRef(null)
  const senseItemRef = useRef(null)
  const weaveItemRef = useRef(null)
  const shapeItemRef = useRef(null)
  const senseLabelRef = useRef(null)
  const weaveLabelRef = useRef(null)
  const shapeLabelRef = useRef(null)
  const titleWrapRef = useRef(null)
  const subtitleRef = useRef(null)

  const [senseAnimate, setSenseAnimate] = useState(false)
  const [weaveAnimate, setWeaveAnimate] = useState(false)
  const [shapeAnimate, setShapeAnimate] = useState(false)

  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const [shapeReplay, setShapeReplay] = useState(0)

  const { phase, setPhase, triggerTransition } = useHeroIntro()

  /* Span the gradient across the entire "Connection" word */
  const [line2BgSpan, setLine2BgSpan] = useState(null)
  useEffect(() => {
    const measure = () => {
      const wrap = line2WrapRef.current
      const chars = line2Chars.current.filter(Boolean)
      if (!wrap || !chars.length) return
      const wrapRect = wrap.getBoundingClientRect()
      const bgStyles = {}
      chars.forEach((el, i) => {
        const charRect = el.getBoundingClientRect()
        bgStyles[i] = {
          backgroundSize: `${wrapRect.width}px ${wrapRect.height}px`,
          backgroundPosition: `-${charRect.left - wrapRect.left}px 0px`,
        }
      })
      setLine2BgSpan(bgStyles)
    }
    requestAnimationFrame(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  /* Theme detection for gradient colors */
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const timelineRef = useRef(null)
  const entranceDoneRef = useRef(false)
  const isIntro = phase === 'waiting' || phase === 'playing'

  /* ===== Scroll escape: snap to final state ===== */
  const snapEntrance = useCallback(() => {
    if (entranceDoneRef.current) return
    entranceDoneRef.current = true
    if (timelineRef.current) {
      timelineRef.current.progress(1).kill()
      timelineRef.current = null
    }
    setSenseAnimate(true)
    setWeaveAnimate(true)
    setShapeAnimate(true)
    if (isIntro) triggerTransition()
  }, [isIntro, triggerTransition])

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReduced) {
      setSenseAnimate(true)
      setWeaveAnimate(true)
      setShapeAnimate(true)
      entranceDoneRef.current = true
      return
    }

    /* Title and subtitle start hidden regardless of intro mode */
    gsap.set(titleWrapRef.current, { opacity: 0, y: 20 })
    gsap.set(subtitleRef.current, { opacity: 0, y: 12 })

    if (isIntro) {
      /* =========================================
         CINEMATIC INTRO — first visit only (~4.5s)
         Scene 1: Marks spread from center + draw on
         Scene 2: Nav transitions, title + subtitle reveal
         ========================================= */
      setPhase('playing')

      const senseItem = senseItemRef.current
      const weaveItem = weaveItemRef.current
      const shapeItem = shapeItemRef.current

      /* Start marks clustered in center, small */
      gsap.set([senseItem, weaveItem, shapeItem], {
        scale: 0.4,
        opacity: 0,
      })
      gsap.set(senseItem, { x: 60 })
      gsap.set(shapeItem, { x: -60 })

      const tl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })
      timelineRef.current = tl

      /* Scene 1: Marks emerge and spread (0–2s) */

      // Fade in from center
      tl.to([senseItem, weaveItem, shapeItem], {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power1.inOut',
      }, 0.2)

      // Spread apart to natural positions
      tl.to(senseItem, { x: 0, duration: 0.7, ease: 'power1.inOut' }, 0.6)
      tl.to(shapeItem, { x: 0, duration: 0.7, ease: 'power1.inOut' }, 0.6)

      // Trigger draw-on as they settle
      tl.call(() => setSenseAnimate(true), null, 0.7)
      tl.call(() => setWeaveAnimate(true), null, 0.85)
      tl.call(() => setShapeAnimate(true), null, 1.0)

      // Labels fade in
      const labels = [senseLabelRef.current, weaveLabelRef.current, shapeLabelRef.current]
      tl.to(labels, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power1.inOut',
      }, 1.4)

      /* Hold — let marks breathe (1.8–2.4s) */

      /* Scene 2: Transition to full hero (2.4s+) */
      tl.call(() => triggerTransition(), null, 2.4)

      // Title reveals
      tl.to(titleWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.inOut',
      }, 2.6)

      // "Designing" wipes on
      tl.fromTo(line1Ref.current, {
        clipPath: 'inset(-0.2em 100% -0.2em 0)',
      }, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)',
        duration: 0.8,
        ease: 'power1.inOut',
      }, 2.6)

      // "Connection" wave entrance
      const line2Els = line2Chars.current.filter(Boolean)
      gsap.set(line2Els, { y: 28 })
      tl.to(line2Els, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.4)',
      }, 2.9)

      // Subtitle types on
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      }, 3.6)
      tl.to(subtitleChars.current, {
        opacity: 1,
        duration: 0.08,
        stagger: 0.03,
        ease: 'power1.inOut',
      }, 3.6)

    } else {
      /* =========================================
         STANDARD ENTRANCE — return visits (~2.5s)
         ========================================= */
      const tl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })
      timelineRef.current = tl

      // Marks draw on
      tl.call(() => setSenseAnimate(true), null, 0)
      tl.call(() => setWeaveAnimate(true), null, 0.15)
      tl.call(() => setShapeAnimate(true), null, 0.3)

      // Labels fade in
      const labels = [senseLabelRef.current, weaveLabelRef.current, shapeLabelRef.current]
      tl.to(labels, {
        opacity: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power1.inOut',
      }, 0.3)

      // Title reveals
      tl.to(titleWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.inOut',
      }, 0.8)

      tl.fromTo(line1Ref.current, {
        clipPath: 'inset(-0.2em 100% -0.2em 0)',
      }, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)',
        duration: 0.8,
        ease: 'power1.inOut',
      }, 0.8)

      const line2Els = line2Chars.current.filter(Boolean)
      gsap.set(line2Els, { y: 28 })
      tl.to(line2Els, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.4)',
      }, 1.0)

      // Subtitle
      tl.to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power1.inOut',
      }, 1.8)
      tl.to(subtitleChars.current, {
        opacity: 1,
        duration: 0.08,
        stagger: 0.03,
        ease: 'power1.inOut',
      }, 1.8)
    }

    /* ===== Scroll escape ===== */
    function onScroll() {
      if (!entranceDoneRef.current && window.scrollY > 10) {
        snapEntrance()
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (timelineRef.current) {
        timelineRef.current.kill()
        timelineRef.current = null
      }
    }
  }, [isIntro, setPhase, triggerTransition, snapEntrance])

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.heroContent}>
        {/* Marks row */}
        <div className={styles.marksRow} ref={marksRowRef} aria-hidden="true">
          <div
            className={styles.markItem}
            ref={senseItemRef}
            onMouseEnter={() => entranceDoneRef.current && setSenseReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <SenseMark animate={senseAnimate} replay={senseReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
            <span className={styles.markLabel} ref={senseLabelRef}>Sense</span>
          </div>
          <div
            className={styles.markItem}
            ref={weaveItemRef}
            onMouseEnter={() => entranceDoneRef.current && setWeaveReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <WeaveMark animate={weaveAnimate} replay={weaveReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
            <span className={styles.markLabelWeave} ref={weaveLabelRef}>Weave</span>
          </div>
          <div
            className={styles.markItem}
            ref={shapeItemRef}
            onMouseEnter={() => entranceDoneRef.current && setShapeReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <ShapeMark animate={shapeAnimate} replay={shapeReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
            <span className={styles.markLabel} ref={shapeLabelRef}>Shape</span>
          </div>
        </div>

        {/* Title */}
        <div ref={titleWrapRef}>
          <h1 className={styles.title} aria-label="Designing Connection. Emotion-Centered Research, Strategy and Design.">
            <CharSpans text="Designing" wrapRef={line1Ref} className={styles.titleLine1} kerning={KERN_DESIGNING} />
            <CharSpans text="Connection" charsRef={line2Chars} wrapRef={line2WrapRef} className={styles.titleLine2} kerning={KERN_CONNECTION} bgSpan={line2BgSpan} />
          </h1>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle} ref={subtitleRef}>
          <CharSpans text="Emotion-Centered Research, Strategy & Design" charsRef={subtitleChars} className={styles.subtitleText} charStyles={SUBTITLE_CHAR_STYLES} />
        </p>
      </div>
    </section>
  )
}
