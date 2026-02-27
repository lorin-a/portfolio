'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import FrameworkShuffle from '@/components/FrameworkShuffle/FrameworkShuffle'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef(null)
  const introWrapRef = useRef(null)
  const greetingRef = useRef(null)
  const greetingCursorRef = useRef(null)
  const sentenceRef = useRef(null)
  const senseWordRef = useRef(null)
  const weaveWordRef = useRef(null)
  const shapeWordRef = useRef(null)
  const connectiveRefs = useRef([])
  const sentenceCursorRef = useRef(null)
  const titleWrapRef = useRef(null)
  const titleRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const fwContainerRef = useRef(null)
  const timelineRef = useRef(null)
  const timelineBuiltRef = useRef(false)

  // Phase: idle → greeting → sentence → flip → marks → done
  const [phase, setPhase] = useState('idle')
  const phaseRef = useRef('idle')

  const setPhaseSync = useCallback((p) => {
    setPhase(p)
    phaseRef.current = p
  }, [])

  // Derived framework props
  const fwPhase = (phase === 'flip' || phase === 'marks' || phase === 'done') ? 'draw' : 'idle'
  const fwVisible = phase === 'flip' || phase === 'marks' || phase === 'done'

  // Start sequence after mount
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setPhaseSync('done')
      if (titleRef.current) {
        titleRef.current.style.fontVariationSettings = "'SOFT' 100, 'WONK' 1"
      }
      return
    }
    const t = setTimeout(() => setPhaseSync('greeting'), 100)
    return () => clearTimeout(t)
  }, [setPhaseSync])

  // Snap to final state (scroll escape)
  const snapToFinalState = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1).kill()
      timelineRef.current = null
    }
    // Remove any leftover FLIP clones
    heroRef.current?.querySelectorAll('[data-flip-clone]').forEach(el => el.remove())
    // Restore rootWord visibility in case FLIP was mid-flight
    fwContainerRef.current?.querySelectorAll('[class*="rootWord"]').forEach(el => {
      el.style.visibility = 'visible'
    })
    if (introWrapRef.current) {
      introWrapRef.current.style.height = '0'
      introWrapRef.current.style.overflow = 'hidden'
    }
    if (titleWrapRef.current) {
      titleWrapRef.current.style.height = 'auto'
      titleWrapRef.current.style.overflow = 'visible'
    }
    if (titleRef.current) {
      titleRef.current.style.fontVariationSettings = "'SOFT' 100, 'WONK' 1"
    }
    if (titleLine1Ref.current) {
      titleLine1Ref.current.style.opacity = '1'
      titleLine1Ref.current.style.clipPath = 'inset(0 0% 0 0)'
    }
    if (titleLine2Ref.current) {
      titleLine2Ref.current.style.opacity = '1'
      titleLine2Ref.current.style.clipPath = 'inset(0 0% 0 0)'
    }
  }, [])

  // Title reveal — triggered after marks complete
  const revealTitle = useCallback(() => {
    import('gsap').then(({ gsap }) => {
      const tl = gsap.timeline({
        onComplete: () => setPhaseSync('done'),
      })
      timelineRef.current = tl

      // Expand title wrapper
      tl.to(titleWrapRef.current, {
        height: 'auto',
        duration: 0.4,
        ease: 'power1.inOut',
      })

      // SOFT axis tween: sharp serifs → soft/wonky
      const softObj = { soft: 0 }
      tl.to(softObj, {
        soft: 100, duration: 0.8, ease: 'power2.out',
        onUpdate: () => {
          if (titleRef.current) {
            titleRef.current.style.fontVariationSettings = `'SOFT' ${softObj.soft}, 'WONK' 1`
          }
        },
      }, '<')

      // Line 1 wipe: "Design Researcher"
      const dur1 = Math.max(0.8, 17 * 0.06)
      tl.set(titleLine1Ref.current, { opacity: 1 }, '<+=0.05')
      tl.fromTo(titleLine1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: dur1, ease: 'power1.inOut' },
        '<'
      )

      // Line 2 wipe: "& Creative Strategist" — overlaps line 1
      const dur2 = Math.max(0.8, 21 * 0.06)
      tl.set(titleLine2Ref.current, { opacity: 1 }, '>-0.4')
      tl.fromTo(titleLine2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: dur2, ease: 'power1.inOut' },
        '-=0.4'
      )
    })
  }, [setPhaseSync])

  // Marks complete → reveal title
  const handleMarksReady = useCallback(() => {
    if (phaseRef.current === 'marks' || phaseRef.current === 'flip') {
      setPhaseSync('marks')
      revealTitle()
    }
  }, [revealTitle, setPhaseSync])

  // Build master GSAP timeline
  useEffect(() => {
    if (phase !== 'greeting') return
    if (timelineBuiltRef.current) return
    timelineBuiltRef.current = true

    import('gsap').then(({ gsap }) => {
      if (phaseRef.current === 'done') return

      const tl = gsap.timeline()
      timelineRef.current = tl

      const greetingEl = greetingRef.current
      const greetingCursorEl = greetingCursorRef.current
      const sentenceEl = sentenceRef.current
      const sentenceCursorEl = sentenceCursorRef.current
      const heroEl = heroRef.current

      // ==========================================
      // BEAT 1: "Hi, I'm Lorin." wipe
      // ==========================================
      const greetingDur = Math.max(1.0, 14 * 0.08)

      tl.set(greetingEl, { opacity: 1 })
      tl.fromTo(greetingEl,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: greetingDur, ease: 'power1.inOut' }
      )

      // ==========================================
      // BEAT 2: Sentence wipe (breathes into greeting tail)
      // ==========================================
      tl.add(() => {
        if (phaseRef.current !== 'done') setPhaseSync('sentence')
      }, '-=0.2')

      tl.set(greetingCursorEl, { display: 'none' })
      tl.set(sentenceEl, { opacity: 1 })

      const sentenceText = 'I sense, weave, and shape solutions to complex problems.'
      const sentenceDur = Math.max(1.0, sentenceText.length * 0.035)

      tl.fromTo(sentenceEl,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: sentenceDur, ease: 'power1.inOut' }
      )

      // ==========================================
      // BEAT 3: Dissolve + FLIP (one fluid motion)
      // ==========================================
      tl.to(sentenceCursorEl, { opacity: 0, duration: 0.1 })

      tl.add(() => {
        if (phaseRef.current === 'done') return
        setPhaseSync('flip')

        // Wait for FrameworkShuffle to render into the DOM
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const wordRefs = [senseWordRef, weaveWordRef, shapeWordRef]
            const fwContainer = fwContainerRef.current
            if (!fwContainer) return

            const rootWords = fwContainer.querySelectorAll('[class*="rootWord"]')
            if (rootWords.length < 3) return

            // 1. Capture source positions (method words in the sentence)
            const heroRect = heroEl.getBoundingClientRect()
            const sourceRects = wordRefs.map(ref => ref.current.getBoundingClientRect())

            // 2. Pre-measure targets: temporarily collapse introWrap
            //    to find where rootWords land in the final layout.
            //    This is synchronous — no paint occurs between set/restore.
            const introEl = introWrapRef.current
            const origHeight = introEl.offsetHeight
            introEl.style.transition = 'none'
            introEl.style.height = '0'
            heroEl.offsetHeight // force reflow

            const targetRects = Array.from(rootWords).map(el => el.getBoundingClientRect())
            const targetFontSizes = Array.from(rootWords).map(el =>
              window.getComputedStyle(el).fontSize
            )

            // Restore introWrap before painting
            introEl.style.height = `${origHeight}px`
            heroEl.offsetHeight // force reflow
            introEl.style.transition = ''

            // 3. Create absolute clones at source positions
            const clones = wordRefs.map((ref, i) => {
              const el = ref.current
              const rect = sourceRects[i]
              const computed = window.getComputedStyle(el)
              const clone = document.createElement('span')
              clone.textContent = el.textContent
              clone.dataset.flipClone = 'true'
              Object.assign(clone.style, {
                position: 'absolute',
                top: `${rect.top - heroRect.top}px`,
                left: `${rect.left - heroRect.left}px`,
                fontSize: computed.fontSize,
                fontFamily: computed.fontFamily,
                fontWeight: computed.fontWeight,
                fontStyle: computed.fontStyle,
                color: computed.color,
                lineHeight: computed.lineHeight,
                margin: '0',
                padding: '0',
                zIndex: '10',
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              })
              heroEl.appendChild(clone)
              return clone
            })

            // 4. Hide originals (clones take their place visually)
            wordRefs.forEach(ref => { ref.current.style.visibility = 'hidden' })
            rootWords.forEach(el => { el.style.visibility = 'hidden' })

            // 5. Single combined motion: fade, collapse, reposition
            const flipDur = 0.9
            const flipTl = gsap.timeline()
            timelineRef.current = flipTl

            // Fade greeting
            flipTl.to(greetingEl, {
              opacity: 0, duration: flipDur * 0.6, ease: 'power1.inOut',
            }, 0)

            // Fade connective text
            const cEls = connectiveRefs.current.filter(Boolean)
            if (cEls.length) {
              flipTl.to(cEls, {
                opacity: 0, duration: flipDur * 0.6, ease: 'power1.inOut',
              }, 0)
            }

            // Collapse introWrap
            flipTl.to(introEl, {
              height: 0, duration: flipDur, ease: 'power2.inOut',
            }, 0)

            // Animate clones to framework row positions
            clones.forEach((clone, i) => {
              flipTl.to(clone, {
                top: targetRects[i].top - heroRect.top,
                left: targetRects[i].left - heroRect.left,
                fontSize: targetFontSizes[i],
                duration: flipDur,
                ease: 'power2.inOut',
                onComplete: () => {
                  clone.remove()
                  rootWords[i].style.visibility = 'visible'
                },
              }, 0)
            })

            // handleMarksReady fires from FrameworkShuffle when marks + brush complete
          })
        })
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Scroll escape — skip to final state on any scroll
  useEffect(() => {
    if (phase === 'done' || phase === 'idle') return
    const handleScroll = () => {
      snapToFinalState()
      setPhaseSync('done')
    }
    window.addEventListener('scroll', handleScroll, { passive: true, once: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [phase, snapToFinalState, setPhaseSync])

  return (
    <section className={styles.hero} ref={heroRef} id="hero" style={{ position: 'relative' }}>
      <div className={styles.heroContent}>
        {/* Intro: greeting + sentence — collapses during FLIP */}
        <div className={styles.introWrap} ref={introWrapRef}>
          <p className={styles.greeting} ref={greetingRef}>
            Hi, I&apos;m Lorin.
            <span className={styles.cursor} ref={greetingCursorRef} aria-hidden="true">|</span>
          </p>
          <p className={styles.sentenceLine} ref={sentenceRef}>
            <span className={styles.connective} ref={el => connectiveRefs.current[0] = el}>I </span>
            <span className={`${styles.fwWord} ${styles.senseColor}`} ref={senseWordRef}>sense</span>
            <span className={styles.connective} ref={el => connectiveRefs.current[1] = el}>, </span>
            <span className={`${styles.fwWord} ${styles.weaveColor}`} ref={weaveWordRef}>weave</span>
            <span className={styles.connective} ref={el => connectiveRefs.current[2] = el}>, and </span>
            <span className={`${styles.fwWord} ${styles.shapeColor}`} ref={shapeWordRef}>shape</span>
            <span className={styles.connective} ref={el => connectiveRefs.current[3] = el}> solutions to complex problems.</span>
            <span className={styles.cursor} ref={sentenceCursorRef} aria-hidden="true">|</span>
          </p>
        </div>

        {/* Title — reveals after marks complete */}
        <div className={styles.heroTitleWrap} ref={titleWrapRef}>
          <h1 className={styles.heroTitle} ref={titleRef}>
            <span className={styles.titleLine} ref={titleLine1Ref}>
              Design Researcher
            </span>
            <br />
            <span className={styles.titleLine} ref={titleLine2Ref}>
              <span className={styles.amp}>&amp;</span> Creative Strategist
            </span>
          </h1>
        </div>

        {/* Framework row — marks draw during FLIP, interactive after done */}
        <div ref={fwContainerRef}>
          <FrameworkShuffle
            phase={fwPhase}
            onMarksReady={handleMarksReady}
            visible={fwVisible}
            skipEntrance
          />
        </div>
      </div>
    </section>
  )
}
