'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './Hero.module.css'

/* Split text into per-character spans for type-on animation.
   Initial opacity is set via CSS (.heroChar), NOT React inline styles,
   so GSAP has sole control over opacity and React re-renders won't reset it. */
function CharSpans({ text, charsRef, wrapRef, startIndex = 0, className, kerning, charStyles }) {
  return (
    <span className={className} ref={wrapRef}>
      {text.split('').map((char, i) => {
        const kern = kerning?.[i]
        const extra = charStyles?.[i]
        return (
          <span
            key={i}
            ref={el => { if (charsRef) charsRef.current[startIndex + i] = el }}
            className={styles.heroChar}
            style={{
              ...(kern ? { marginRight: `${kern}px` } : undefined),
              ...extra,
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

/* Light-mode solid colors for marks (from design tokens) */
const LIGHT_MARK_COLORS = {
  sense: '#ACB592',
  weave: '#B098B7',
  shape: '#C97E65',
}

/* Per-character kerning from Figma (px values at 112px) */
const KERN_DESIGNING = { 0: -1.12, 3: -1.12, 4: 2.24, 5: 2.24, 6: 1.12 }
const KERN_CONNECTION = { 0: 1.12, 1: -2.24, 2: 2.24, 3: -2.24, 6: 1.12, 7: -2.24, 8: -2.24 }

/* Ampersand style override — non-italic, weight 333 per Figma */
// "Emotion-Centered Research, Strategy & Design" → & is at index 36
const SUBTITLE_CHAR_STYLES = {
  36: { fontStyle: 'normal', fontWeight: 333 },
}

export default function Hero() {
  const line1Ref = useRef(null)
  const line2Chars = useRef([])
  const subtitleChars = useRef([])
  const senseWrapRef = useRef(null)
  const weaveWrapRef = useRef(null)
  const shapeWrapRef = useRef(null)

  const [senseAnimate, setSenseAnimate] = useState(false)
  const [weaveAnimate, setWeaveAnimate] = useState(false)
  const [shapeAnimate, setShapeAnimate] = useState(false)

  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const [shapeReplay, setShapeReplay] = useState(0)

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
  }, [])

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

    /* =========================================
       Cinematic entrance — ~4s
       ========================================= */
    const tl = gsap.timeline({
      onComplete: () => {
        entranceDoneRef.current = true
      },
    })
    timelineRef.current = tl

    const stagger = 0.06

    // Beat 1 (0s): "Designing" wipes on left-to-right
    tl.fromTo(line1Ref.current, {
      clipPath: 'inset(-0.2em 100% -0.2em 0)',
    }, {
      clipPath: 'inset(-0.2em 0% -0.2em 0)',
      duration: 1.0,
      ease: 'power1.inOut',
    }, 0)

    // Beat 2 (0.8s): "Connection" wave entrance — each letter rises into place
    const line2Els = line2Chars.current.filter(Boolean)
    gsap.set(line2Els, { y: 28 })
    tl.to(line2Els, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.07,
      ease: 'back.out(1.4)',
    }, 0.8)

    // Beat 3 (1.8s): Subtitle types on with soft ramp-in
    tl.to(subtitleChars.current, {
      opacity: 1,
      duration: 0.12,
      stagger: stagger,
      ease: 'power1.inOut',
    }, 1.8)

    // Beat 4 (3.2-3.8s): Sense, Weave, Shape pop in staggered
    tl.to(senseWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 3.2)
    tl.call(() => setSenseAnimate(true), null, 3.2)

    tl.to(weaveWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 3.5)
    tl.call(() => setWeaveAnimate(true), null, 3.5)

    tl.to(shapeWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 3.8)
    tl.call(() => setShapeAnimate(true), null, 3.8)

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
  }, [snapEntrance])

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.heroContent}>
        {/* Left column: title */}
        <div className={styles.left}>
          <h1 className={styles.title} aria-label="Designing Connection. Emotion-Centered Research, Strategy and Design.">
            <CharSpans text="Designing" wrapRef={line1Ref} className={styles.titleLine1} kerning={KERN_DESIGNING} />
            <CharSpans text="Connection" charsRef={line2Chars} className={styles.titleLine2} kerning={KERN_CONNECTION} />
          </h1>
        </div>

        {/* Right column: marks + subtitle */}
        <div className={styles.right}>
          <div className={styles.marksRow} aria-hidden="true">
            <div
              className={styles.markItem}
              ref={senseWrapRef}
              onMouseEnter={() => entranceDoneRef.current && setSenseReplay(r => r + 1)}
            >
              <div className={styles.markIcon}>
                <SenseMark animate={senseAnimate} replay={senseReplay} showBrush gradientColors={isDark ? ['#C5CFA6', '#C7AAD1', '#F79C7E'] : undefined} color={isDark ? undefined : LIGHT_MARK_COLORS.sense} />
              </div>
            </div>
            <div
              className={styles.markItem}
              ref={weaveWrapRef}
              onMouseEnter={() => entranceDoneRef.current && setWeaveReplay(r => r + 1)}
            >
              <div className={styles.markIcon}>
                <WeaveMark animate={weaveAnimate} replay={weaveReplay} showBrush gradientColors={isDark ? ['#C5CFA6', '#C7AAD1', '#F79C7E'] : undefined} color={isDark ? undefined : LIGHT_MARK_COLORS.weave} />
              </div>
            </div>
            <div
              className={styles.markItem}
              ref={shapeWrapRef}
              onMouseEnter={() => entranceDoneRef.current && setShapeReplay(r => r + 1)}
            >
              <div className={styles.markIcon}>
                <ShapeMark animate={shapeAnimate} replay={shapeReplay} showBrush gradientColors={isDark ? ['#C5CFA6', '#C7AAD1', '#F79C7E'] : undefined} color={isDark ? undefined : LIGHT_MARK_COLORS.shape} />
              </div>
            </div>
          </div>
          <p className={styles.subtitle}>
            <CharSpans text="Emotion-Centered Research, Strategy & Design" charsRef={subtitleChars} className={styles.subtitleText} charStyles={SUBTITLE_CHAR_STYLES} />
          </p>
        </div>
      </div>
    </section>
  )
}
