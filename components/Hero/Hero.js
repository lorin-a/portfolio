'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './Hero.module.css'

/* Split text into per-character spans for type-on animation */
function CharSpans({ text, charsRef, startIndex = 0, className }) {
  return (
    <span className={className}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          ref={el => { if (charsRef) charsRef.current[startIndex + i] = el }}
          style={{ opacity: 0, display: 'inline-block' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default function Hero() {
  const line1Chars = useRef([])
  const line2Chars = useRef([])
  const subtitleChars = useRef([])
  const ampRef = useRef(null)
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
       Cinematic entrance — ~2.6s
       ========================================= */
    const tl = gsap.timeline({
      onComplete: () => {
        entranceDoneRef.current = true
        // Clear inline styles so CSS :hover transition can take over
        if (ampRef.current) {
          ampRef.current.style.clipPath = ''
          ampRef.current.style.opacity = ''
          ampRef.current.style.transform = ''
          ampRef.current.classList.add(styles.titleAmpReady)
        }
      },
    })
    timelineRef.current = tl

    const stagger = 0.06

    // Beat 1 (0s): "UX Researcher" types on
    tl.to(line1Chars.current, {
      opacity: 1,
      duration: 0.08,
      stagger: stagger,
      ease: 'power1.inOut',
    }, 0)

    // Beat 2 (0.8s): & wipes on left-to-right
    tl.fromTo(ampRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      { clipPath: 'inset(0 0% 0 0)', duration: 0.9, ease: 'power1.inOut' },
    0.8)

    // Beat 3 (1.5s): "Design Strategist" types on
    tl.to(line2Chars.current, {
      opacity: 1,
      duration: 0.08,
      stagger: stagger,
      ease: 'power1.inOut',
    }, 1.5)

    // Beat 4 (2.8s): "Thoughtful design for social impact" types on
    tl.to(subtitleChars.current, {
      opacity: 1,
      duration: 0.08,
      stagger: stagger,
      ease: 'power1.inOut',
    }, 2.8)

    // Beat 5 (4.8-5.4s): Sense, Weave, Shape pop in staggered
    tl.to(senseWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 4.8)
    tl.call(() => setSenseAnimate(true), null, 4.8)

    tl.to(weaveWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 5.1)
    tl.call(() => setWeaveAnimate(true), null, 5.1)

    tl.to(shapeWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2)',
    }, 5.4)
    tl.call(() => setShapeAnimate(true), null, 5.4)

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
        {/* Left column: & beside title lines, subtitle below */}
        <div className={styles.left}>
          <h1 className={styles.title} aria-label="UX Researcher & Design Strategist. Thoughtful design for social impact.">
            <span className={styles.titleAmp} ref={ampRef} aria-hidden="true">
              &amp;
            </span>
            <span className={styles.titleText}>
              <CharSpans text="UX Researcher" charsRef={line1Chars} className={styles.titleLine} />
              <CharSpans text="Design Strategist" charsRef={line2Chars} className={styles.titleLine} />
              <CharSpans text="Thoughtful design for social impact" charsRef={subtitleChars} className={styles.subtitle} />
            </span>
          </h1>
        </div>

        {/* Right column: marks with labels */}
        <div className={styles.marksColumn} aria-hidden="true">
          <div
            className={styles.markItem}
            ref={senseWrapRef}
            onMouseEnter={() => entranceDoneRef.current && setSenseReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <SenseMark animate={senseAnimate} replay={senseReplay} showBrush color={isDark ? "#C5CFA6" : "#ACB592"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelSense}`}>Sense</span>
          </div>
          <div
            className={styles.markItem}
            ref={weaveWrapRef}
            onMouseEnter={() => entranceDoneRef.current && setWeaveReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <WeaveMark animate={weaveAnimate} replay={weaveReplay} showBrush color={isDark ? "#C7AAD1" : "#B098B7"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelWeave}`}>Weave</span>
          </div>
          <div
            className={styles.markItem}
            ref={shapeWrapRef}
            onMouseEnter={() => entranceDoneRef.current && setShapeReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <ShapeMark animate={shapeAnimate} replay={shapeReplay} showBrush color={isDark ? "#F79C7E" : "#C97E65"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelShape}`}>Shape</span>
          </div>
        </div>
      </div>
    </section>
  )
}
