'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './Hero.module.css'

export default function Hero() {
  const line1Ref = useRef(null)
  const line2Ref = useRef(null)
  const ampRef = useRef(null)
  const senseWrapRef = useRef(null)
  const weaveWrapRef = useRef(null)
  const shapeWrapRef = useRef(null)
  const subtitleRef = useRef(null)

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
          ampRef.current.style.opacity = ''
          ampRef.current.style.transform = ''
          ampRef.current.classList.add(styles.titleAmpReady)
        }
      },
    })
    timelineRef.current = tl

    // Beat 1 (0s): "UX Researcher" slides up + fades
    tl.to(line1Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 0)

    // Beat 2 (0.15s): "Design Strategist" slides up
    tl.to(line2Ref.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 0.15)

    // Beat 3 (0.3s): & bounces in
    tl.to(ampRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.7,
      ease: 'back.out(2.5)',
    }, 0.3)

    // Beat 4 (1.0-1.4s): Marks pop in with bounce, staggered 200ms
    tl.to(senseWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
    }, 1.0)
    tl.call(() => setSenseAnimate(true), null, 1.0)

    tl.to(weaveWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
    }, 1.2)
    tl.call(() => setWeaveAnimate(true), null, 1.2)

    tl.to(shapeWrapRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(2)',
    }, 1.4)
    tl.call(() => setShapeAnimate(true), null, 1.4)

    // Beat 5 (1.8s): Subtitle fades up
    tl.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power1.inOut',
    }, 1.8)

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

  const markColor = isDark ? 'url(#hero-mark-gradient)' : undefined

  return (
    <section className={styles.hero} aria-label="Introduction">
      {/* Shared SVG gradient definition for dark-mode marks */}
      {isDark && (
        <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient
              id="hero-mark-gradient"
              x1="28.5%" y1="5%" x2="71.5%" y2="95%"
            >
              <stop offset="15.5%" stopColor="#C5CFA6" />
              <stop offset="52.1%" stopColor="#C7AAD1" />
              <stop offset="89.7%" stopColor="#F79C7E" />
            </linearGradient>
          </defs>
        </svg>
      )}
      <div className={styles.heroContent}>
        {/* Left column: & beside title lines, subtitle below */}
        <div className={styles.left}>
          <h1 className={styles.title}>
            <span className={styles.titleAmp} ref={ampRef} aria-hidden="true">
              &amp;
            </span>
            <span className={styles.titleText}>
              <span className={styles.titleLine} ref={line1Ref}>
                UX Researcher
              </span>
              <span className={styles.titleLine} ref={line2Ref}>
                Design Strategist
              </span>
              <span className={styles.subtitle} ref={subtitleRef}>
                Thoughtful design for social impact
              </span>
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
              <SenseMark animate={senseAnimate} replay={senseReplay} showBrush color={markColor || "#C5CFA6"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelSense}`}>Sense</span>
          </div>
          <div
            className={styles.markItem}
            ref={weaveWrapRef}
            onMouseEnter={() => entranceDoneRef.current && setWeaveReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <WeaveMark animate={weaveAnimate} replay={weaveReplay} showBrush color={markColor || "#C7AAD1"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelWeave}`}>Weave</span>
          </div>
          <div
            className={styles.markItem}
            ref={shapeWrapRef}
            onMouseEnter={() => entranceDoneRef.current && setShapeReplay(r => r + 1)}
          >
            <div className={styles.markIcon}>
              <ShapeMark animate={shapeAnimate} replay={shapeReplay} showBrush color={markColor || "#C6DCF6"} />
            </div>
            <span className={`${styles.markLabel} ${styles.markLabelShape}`}>Shape</span>
          </div>
        </div>
      </div>
    </section>
  )
}
