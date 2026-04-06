'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import { useHeroIntro } from '@/components/HeroIntroContext'
import styles from './Hero.module.css'

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

const LIGHT_GRADIENT = ['#8A9263', '#9F84A9', '#C97D64']
const DARK_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']
const KERN_DESIGNING = { 0: -1.12, 3: -1.12, 4: 2.24, 5: 2.24, 6: 1.12 }
const KERN_CONNECTION = { 0: 1.12, 1: -2.24, 2: 2.24, 3: -2.24, 6: 1.12, 7: -2.24, 8: -2.24 }
const SUBTITLE_CHAR_STYLES = { 36: { fontStyle: 'normal', fontWeight: 333 } }

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
  const heroContentRef = useRef(null)
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

  /* Theme detection */
  const [isDark, setIsDark] = useState(true)
  useEffect(() => {
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const entranceDoneRef = useRef(false)
  const cancelledRef = useRef(false)
  const isIntro = phase === 'waiting' || phase === 'playing'
  const resolved = phase !== null

  /* Scroll escape */
  const snapEntrance = useCallback(() => {
    if (entranceDoneRef.current) return
    entranceDoneRef.current = true
    cancelledRef.current = true
    gsap.killTweensOf('*')
    setSenseAnimate(true)
    setWeaveAnimate(true)
    setShapeAnimate(true)
    shapeDrawDone.current?.()
    /* Snap everything to final state */
    if (heroContentRef.current) gsap.set(heroContentRef.current, { visibility: 'visible' })
    if (introFlowerRef.current) gsap.set(introFlowerRef.current, { visibility: 'hidden' })
    if (introFlowerInnerRef.current) gsap.set(introFlowerInnerRef.current, { opacity: 0, scale: 0 })
    ;[senseItemRef, weaveItemRef, shapeItemRef].forEach(ref => {
      if (ref.current) gsap.set(ref.current, { opacity: 1, scale: 1, clearProps: 'clipPath,x' })
    })
    if (titleWrapRef.current) gsap.set(titleWrapRef.current, { opacity: 1, y: 0, height: 'auto', overflow: 'visible' })
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0, height: 'auto', overflow: 'visible' })
    line2Chars.current.filter(Boolean).forEach(el => gsap.set(el, { opacity: 1, y: 0 }))
    subtitleChars.current.filter(Boolean).forEach(el => gsap.set(el, { opacity: 1 }))
    if (line1Ref.current) gsap.set(line1Ref.current, { visibility: 'visible', clipPath: 'inset(-0.2em 0% -0.2em 0)' })
    const snapChars = line2WrapRef.current?.querySelectorAll('.' + styles.heroChar)
    if (snapChars) gsap.set(snapChars, { opacity: 1, y: 0 })
    if (isIntro) triggerTransition()
  }, [isIntro, triggerTransition])

  /* ═══ MAIN ANIMATION ═══ */
  useEffect(() => {
    if (!resolved) return
    if (entranceDoneRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(heroContentRef.current, { visibility: 'visible' })
      setSenseAnimate(true)
      setWeaveAnimate(true)
      setShapeAnimate(true)
      entranceDoneRef.current = true
      return
    }

    cancelledRef.current = false

    const onScroll = () => {
      if (!entranceDoneRef.current && window.scrollY > 10) snapEntrance()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    if (isIntro) {
      cinematicIntro()
    } else {
      standardEntrance()
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelledRef.current = true
    }

    async function cinematicIntro() {
      setPhase('playing')

      const flower = introFlowerRef.current

      /* Make hero content container visible (was hidden via CSS to prevent flash) */
      gsap.set(heroContentRef.current, { visibility: 'visible' })

      /* Collapse title/subtitle so marks center properly */
      gsap.set(titleWrapRef.current, { height: 0, overflow: 'hidden' })
      gsap.set(subtitleRef.current, { height: 0, overflow: 'hidden' })

      /* Show the intro flower */
      gsap.set(flower, { visibility: 'visible' })
      gsap.set(introFlowerInnerRef.current, { opacity: 1, scale: 1 })

      /* Wait for layout */
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if (cancelledRef.current) return

      /* Trigger the Shape fill + spin animation */
      const drawPromise = new Promise(r => { shapeDrawDone.current = r })
      setShapeAnimate(true)
      await drawPromise
      if (cancelledRef.current) return

      /* ─── Step 1: Bounce → shrink (awaited, nothing else happening) ─── */
      const flowerInner = introFlowerInnerRef.current

      /* Bounce up */
      await gsap.to(flowerInner, {
        scale: 1.3, duration: 0.35, ease: 'power2.out',
      })
      if (cancelledRef.current) return

      /* Shrink and fade from peak */
      await gsap.to(flowerInner, {
        scale: 0, opacity: 0, duration: 0.7, ease: 'power2.inOut',
      })
      if (cancelledRef.current) return

      gsap.set(flower, { visibility: 'hidden', pointerEvents: 'none' })

      /* ─── Step 2: Text + marks reveal timeline ─── */
      triggerTransition()

      gsap.set(titleWrapRef.current, { height: 'auto', overflow: 'visible', opacity: 1, y: 0 })
      gsap.set(line1Ref.current, { visibility: 'visible', clipPath: 'inset(-0.2em 100% -0.2em 0)' })
      gsap.set(subtitleRef.current, { height: 'auto', overflow: 'visible', opacity: 1, y: 0,
        clipPath: 'inset(-0.2em 100% -0.2em 0)' })
      gsap.set(subtitleChars.current, { opacity: 1 })

      /* Get Connection chars via DOM query (not React refs, avoids re-render conflicts) */
      const connectionChars = line2WrapRef.current?.querySelectorAll('.' + styles.heroChar)
      if (connectionChars) {
        /* Span gradient across all chars so they show one continuous gradient */
        const wrapRect = line2WrapRef.current.getBoundingClientRect()
        connectionChars.forEach(el => {
          const charRect = el.getBoundingClientRect()
          el.style.backgroundSize = `${wrapRect.width}px ${wrapRect.height}px`
          el.style.backgroundPosition = `-${charRect.left - wrapRect.left}px 0px`
        })
        gsap.set(connectionChars, { opacity: 0, y: 20 })
      }

      const revealTl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      /* 0s — "Designing" wipes on */
      revealTl.to(line1Ref.current, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.2, ease: 'power1.inOut',
      }, 0)

      /* 1.0s — "Connection" staggered wave reveal */
      if (connectionChars) {
        revealTl.to(connectionChars, {
          opacity: 1, y: 0, duration: 0.8,
          stagger: 0.07, ease: 'power1.inOut',
        }, 1.0)
      }

      /* 2.0s — Subtitle wipes on */
      revealTl.to(subtitleRef.current, {
        clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 1.0, ease: 'power1.inOut',
      }, 2.0)

      /* 2.8s — Marks cascade on left to right at full size */
      const markEls = [senseItemRef.current, weaveItemRef.current, shapeItemRef.current]

      revealTl.call(() => {
        setSenseAnimate(true)
        setWeaveAnimate(true)
        setShapeAnimate(true)
      }, null, 2.8)

      markEls.forEach((el, i) => {
        revealTl.to(el, {
          opacity: 1, duration: 0.4, ease: 'power1.inOut',
        }, 2.8 + i * 0.2)
      })
    }

    function standardEntrance() {
      gsap.set(heroContentRef.current, { visibility: 'visible' })
      gsap.set(line1Ref.current, { visibility: 'visible', clipPath: 'inset(-0.2em 100% -0.2em 0)' })
      gsap.set(titleWrapRef.current, { opacity: 0, y: 20 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 })
      gsap.set(introFlowerRef.current, { visibility: 'hidden' })

      const connectionChars = line2WrapRef.current?.querySelectorAll('.' + styles.heroChar)
      if (connectionChars) {
        const wrapRect = line2WrapRef.current.getBoundingClientRect()
        connectionChars.forEach(el => {
          const charRect = el.getBoundingClientRect()
          el.style.backgroundSize = `${wrapRect.width}px ${wrapRect.height}px`
          el.style.backgroundPosition = `-${charRect.left - wrapRect.left}px 0px`
        })
        gsap.set(connectionChars, { opacity: 0, y: 20 })
      }

      const tl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      tl.call(() => setSenseAnimate(true), null, 0)
      tl.call(() => setWeaveAnimate(true), null, 0.15)
      tl.call(() => setShapeAnimate(true), null, 0.3)

      tl.to([senseItemRef.current, weaveItemRef.current, shapeItemRef.current], {
        opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power1.inOut',
      }, 0.3)

      tl.to(titleWrapRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power1.inOut',
      }, 0.8)

      tl.fromTo(line1Ref.current,
        { clipPath: 'inset(-0.2em 100% -0.2em 0)' },
        { clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 0.8, ease: 'power1.inOut' },
        0.8,
      )

      if (connectionChars) {
        tl.to(connectionChars, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power1.inOut',
        }, 1.0)
      }

      tl.to(subtitleRef.current, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power1.inOut',
      }, 1.6)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved, isIntro])

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.heroContent} ref={heroContentRef}>
        {/* Intro flower — large, centered, only visible during cinematic intro */}
        <div className={styles.introFlower} ref={introFlowerRef} aria-hidden="true">
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

        {/* Marks row — final positions */}
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
            <div className={styles.markIconWeave}>
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
              <ShapeMark animate={shapeAnimate && !isIntro} replay={shapeReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
            <span className={styles.markLabel} ref={shapeLabelRef}>Shape</span>
          </div>
        </div>

        <div ref={titleWrapRef}>
          <h1 className={styles.title} aria-label="Designing Connection. Emotion-Centered Research, Strategy and Design.">
            <CharSpans text="Designing" wrapRef={line1Ref} className={styles.titleLine1} kerning={KERN_DESIGNING} />
            <CharSpans text="Connection" wrapRef={line2WrapRef} className={styles.titleLine2} kerning={KERN_CONNECTION} />
          </h1>
        </div>

        <p className={styles.subtitle} ref={subtitleRef}>
          <CharSpans text="Emotion-Centered Research, Strategy & Design" charsRef={subtitleChars} className={styles.subtitleText} charStyles={SUBTITLE_CHAR_STYLES} />
        </p>
      </div>
    </section>
  )
}
