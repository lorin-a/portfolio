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
  const introFlowerRef = useRef(null)

  const [senseAnimate, setSenseAnimate] = useState(false)
  const [weaveAnimate, setWeaveAnimate] = useState(false)
  const [shapeAnimate, setShapeAnimate] = useState(false)
  const [senseReplay, setSenseReplay] = useState(0)
  const [weaveReplay, setWeaveReplay] = useState(0)
  const [shapeReplay, setShapeReplay] = useState(0)

  const shapeDrawDone = useRef(null)
  const onShapeDrawComplete = useCallback(() => shapeDrawDone.current?.(), [])

  const { phase, setPhase, triggerTransition } = useHeroIntro()

  /* Gradient span for "Connection" */
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
    if (introFlowerRef.current) gsap.set(introFlowerRef.current, { opacity: 0, scale: 0 })
    ;[senseItemRef, weaveItemRef, shapeItemRef].forEach(ref => {
      if (ref.current) gsap.set(ref.current, { opacity: 1, clearProps: 'clipPath,x' })
    })
    ;[senseLabelRef, weaveLabelRef, shapeLabelRef].forEach(ref => {
      if (ref.current) gsap.set(ref.current, { opacity: 1 })
    })
    if (titleWrapRef.current) gsap.set(titleWrapRef.current, { opacity: 1, y: 0, height: 'auto', overflow: 'visible' })
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 1, y: 0, height: 'auto', overflow: 'visible' })
    line2Chars.current.filter(Boolean).forEach(el => gsap.set(el, { opacity: 1, y: 0 }))
    subtitleChars.current.filter(Boolean).forEach(el => gsap.set(el, { opacity: 1 }))
    if (line1Ref.current) gsap.set(line1Ref.current, { clipPath: 'inset(-0.2em 0% -0.2em 0)' })
    if (isIntro) triggerTransition()
  }, [isIntro, triggerTransition])

  /* ═══ MAIN ANIMATION ═══ */
  useEffect(() => {
    if (!resolved) return
    if (entranceDoneRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
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

      /* Hide everything except the intro flower */
      gsap.set([senseItemRef.current, weaveItemRef.current, shapeItemRef.current], { opacity: 0 })
      gsap.set([senseLabelRef.current, weaveLabelRef.current, shapeLabelRef.current], { opacity: 0 })
      gsap.set(titleWrapRef.current, { opacity: 0, y: 20, height: 0, overflow: 'hidden' })
      gsap.set(subtitleRef.current, { opacity: 0, y: 12, height: 0, overflow: 'hidden' })

      /* Show the intro flower large and centered */
      gsap.set(flower, { opacity: 1, scale: 1 })

      /* Wait for layout */
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))
      if (cancelledRef.current) return

      /* Trigger the Shape draw-on animation on the intro flower */
      const drawPromise = new Promise(r => { shapeDrawDone.current = r })
      setShapeAnimate(true)
      await drawPromise
      if (cancelledRef.current) return

      /* Hold — flower is complete with color fill */
      await gsap.to({}, { duration: 0.8 })
      if (cancelledRef.current) return

      /* ─── TRANSITION ─── */
      triggerTransition()

      /* Measure where the Shape mark needs to end up in the marks row */
      const shapeTarget = shapeItemRef.current.getBoundingClientRect()
      const flowerRect = flower.getBoundingClientRect()

      const dx = (shapeTarget.left + shapeTarget.width / 2) - (flowerRect.left + flowerRect.width / 2)
      const dy = (shapeTarget.top + shapeTarget.height / 2) - (flowerRect.top + flowerRect.height / 2)
      const targetScale = shapeTarget.width / flowerRect.width

      /* Flower shrinks and moves to Shape's position */
      await gsap.to(flower, {
        x: dx,
        y: dy,
        scale: targetScale,
        duration: 0.8,
        ease: 'power1.inOut',
      })
      if (cancelledRef.current) return

      /* Swap: hide intro flower, show real Shape mark (already has brush fill) */
      gsap.set(flower, { opacity: 0 })
      gsap.set(shapeItemRef.current, { opacity: 1 })
      gsap.set(shapeLabelRef.current, { opacity: 1 })

      /* Reveal Sense and Weave with their draw-on */
      gsap.set(senseItemRef.current, { opacity: 1 })
      gsap.set(weaveItemRef.current, { opacity: 1 })
      setSenseAnimate(true)
      setWeaveAnimate(true)

      gsap.to([senseLabelRef.current, weaveLabelRef.current], {
        opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power1.inOut',
      })

      /* Brief hold for Sense + Weave to draw on */
      await gsap.to({}, { duration: 1.2 })
      if (cancelledRef.current) return

      /* Reveal title */
      gsap.set(titleWrapRef.current, { height: 'auto', overflow: 'visible' })
      gsap.from(titleWrapRef.current, { height: 0, duration: 0.5, ease: 'power1.inOut' })
      gsap.to(titleWrapRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power1.inOut' })

      gsap.fromTo(line1Ref.current,
        { clipPath: 'inset(-0.2em 100% -0.2em 0)' },
        { clipPath: 'inset(-0.2em 0% -0.2em 0)', duration: 0.8, ease: 'power1.inOut' },
      )

      const line2Els = line2Chars.current.filter(Boolean)
      gsap.set(line2Els, { y: 28 })
      await gsap.to(line2Els, {
        opacity: 1, y: 0, duration: 0.5, delay: 0.2,
        stagger: 0.05, ease: 'back.out(1.4)',
      })
      if (cancelledRef.current) return

      /* Reveal subtitle */
      gsap.set(subtitleRef.current, { height: 'auto', overflow: 'visible' })
      gsap.from(subtitleRef.current, { height: 0, duration: 0.3, ease: 'power1.inOut' })
      gsap.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.4, ease: 'power1.inOut' })
      await gsap.to(subtitleChars.current, {
        opacity: 1, duration: 0.08, stagger: 0.03, ease: 'power1.inOut',
      })

      entranceDoneRef.current = true
    }

    function standardEntrance() {
      gsap.set(titleWrapRef.current, { opacity: 0, y: 20 })
      gsap.set(subtitleRef.current, { opacity: 0, y: 12 })
      gsap.set(introFlowerRef.current, { opacity: 0, scale: 0 })

      const tl = gsap.timeline({
        onComplete: () => { entranceDoneRef.current = true },
      })

      tl.call(() => setSenseAnimate(true), null, 0)
      tl.call(() => setWeaveAnimate(true), null, 0.15)
      tl.call(() => setShapeAnimate(true), null, 0.3)

      const labels = [senseLabelRef.current, weaveLabelRef.current, shapeLabelRef.current]
      tl.to(labels, {
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

      const line2Els = line2Chars.current.filter(Boolean)
      gsap.set(line2Els, { y: 28 })
      tl.to(line2Els, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'back.out(1.4)',
      }, 1.0)

      tl.to(subtitleRef.current, {
        opacity: 1, y: 0, duration: 0.4, ease: 'power1.inOut',
      }, 1.8)
      tl.to(subtitleChars.current, {
        opacity: 1, duration: 0.08, stagger: 0.03, ease: 'power1.inOut',
      }, 1.8)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolved, isIntro])

  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.heroContent}>
        {/* Intro flower — large, centered, only visible during cinematic intro */}
        <div className={styles.introFlower} ref={introFlowerRef} aria-hidden="true">
          <ShapeMark
            animate={shapeAnimate && isIntro}
            fillReveal
            showBrush
            gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT}
            onDrawComplete={onShapeDrawComplete}
          />
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
              <ShapeMark animate={shapeAnimate && !isIntro} replay={shapeReplay} showBrush gradientColors={isDark ? DARK_GRADIENT : LIGHT_GRADIENT} />
            </div>
            <span className={styles.markLabel} ref={shapeLabelRef}>Shape</span>
          </div>
        </div>

        <div ref={titleWrapRef}>
          <h1 className={styles.title} aria-label="Designing Connection. Emotion-Centered Research, Strategy and Design.">
            <CharSpans text="Designing" wrapRef={line1Ref} className={styles.titleLine1} kerning={KERN_DESIGNING} />
            <CharSpans text="Connection" charsRef={line2Chars} wrapRef={line2WrapRef} className={styles.titleLine2} kerning={KERN_CONNECTION} bgSpan={line2BgSpan} />
          </h1>
        </div>

        <p className={styles.subtitle} ref={subtitleRef}>
          <CharSpans text="Emotion-Centered Research, Strategy & Design" charsRef={subtitleChars} className={styles.subtitleText} charStyles={SUBTITLE_CHAR_STYLES} />
        </p>
      </div>
    </section>
  )
}
