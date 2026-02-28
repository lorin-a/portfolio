'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import FrameworkShuffle from '@/components/FrameworkShuffle/FrameworkShuffle'
import styles from './Hero.module.css'

export default function Hero() {
  const heroRef = useRef(null)
  const greetingRef = useRef(null)
  const greetingCursorRef = useRef(null)
  const titleRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const sentenceRef = useRef(null)
  const senseWordRef = useRef(null)
  const weaveWordRef = useRef(null)
  const shapeWordRef = useRef(null)
  const connectiveRefs = useRef([])
  const sentenceCursorRef = useRef(null)
  const fwContainerRef = useRef(null)
  const timelineRef = useRef(null)
  const timelineBuiltRef = useRef(false)

  // Phase: idle → greeting → title → sentence → flip → done
  const [phase, setPhase] = useState('idle')
  const phaseRef = useRef('idle')

  const setPhaseSync = useCallback((p) => {
    setPhase(p)
    phaseRef.current = p
  }, [])

  // Derived framework props
  const fwPhase = (phase === 'flip' || phase === 'done') ? 'draw' : 'idle'
  const fwVisible = phase === 'flip' || phase === 'done'

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
    heroRef.current?.querySelectorAll('[data-flip-clone]').forEach(el => el.remove())
    fwContainerRef.current?.querySelectorAll('[class*="rootWord"]').forEach(el => {
      el.style.visibility = 'visible'
    })
    // Collapse greeting
    if (greetingRef.current) {
      greetingRef.current.style.height = '0'
      greetingRef.current.style.overflow = 'hidden'
      greetingRef.current.style.opacity = '0'
      greetingRef.current.style.marginBottom = '0'
    }
    // Collapse sentence
    if (sentenceRef.current) {
      sentenceRef.current.style.height = '0'
      sentenceRef.current.style.overflow = 'hidden'
    }
    // Title stays visible
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

  // Marks complete → done (title is already visible)
  const handleMarksReady = useCallback(() => {
    if (phaseRef.current !== 'done') {
      setPhaseSync('done')
    }
  }, [setPhaseSync])

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
      // BEAT 1: "Hi, I'm Lorin." wipe + cursor breathe
      // ==========================================
      const greetingDur = Math.max(1.0, 14 * 0.1)

      tl.set(greetingEl, { opacity: 1 })
      tl.fromTo(greetingEl,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: greetingDur, ease: 'power1.inOut' }
      )
      // Cursor breathes — time to read
      tl.to({}, { duration: 0.8 })

      // ==========================================
      // BEAT 2: Title wipe (sequential) + SOFT tween
      // ==========================================
      tl.add(() => {
        if (phaseRef.current !== 'done') setPhaseSync('title')
      })
      tl.set(greetingCursorEl, { display: 'none' })

      // SOFT axis: sharp serifs → soft/wonky (concurrent with line wipes)
      const softObj = { soft: 0 }
      tl.to(softObj, {
        soft: 100, duration: 1.2, ease: 'power2.out',
        onUpdate: () => {
          if (titleRef.current) {
            titleRef.current.style.fontVariationSettings = `'SOFT' ${softObj.soft}, 'WONK' 1`
          }
        },
      })

      // Line 1: "Design Researcher"
      const dur1 = Math.max(1.0, 17 * 0.08)
      tl.set(titleLine1Ref.current, { opacity: 1 }, '<')
      tl.fromTo(titleLine1Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: dur1, ease: 'power1.inOut' },
        '<'
      )

      // Line 2: "& Creative Strategist" — sequential after line 1
      const dur2 = Math.max(1.0, 21 * 0.08)
      tl.set(titleLine2Ref.current, { opacity: 1 })
      tl.fromTo(titleLine2Ref.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: dur2, ease: 'power1.inOut' }
      )

      // ==========================================
      // BEAT 3: Sentence wipe + reading hold
      // ==========================================
      tl.add(() => {
        if (phaseRef.current !== 'done') setPhaseSync('sentence')
      })
      tl.set(sentenceEl, { opacity: 1 })

      const sentenceText = 'I sense, weave, and shape solutions to complex problems.'
      const sentenceDur = Math.max(1.0, sentenceText.length * 0.055)

      tl.fromTo(sentenceEl,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: sentenceDur, ease: 'power1.inOut' }
      )
      // Hold — let the sentence sit and be read
      tl.to({}, { duration: 0.8 })

      // ==========================================
      // BEAT 4: Dissolve + FLIP (greeting & sentence
      //         collapse, title stays, method words
      //         travel to framework row)
      // ==========================================
      tl.to(sentenceCursorEl, { opacity: 0, duration: 0.2 })

      tl.add(() => {
        if (phaseRef.current === 'done') return
        setPhaseSync('flip')

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const wordRefs = [senseWordRef, weaveWordRef, shapeWordRef]
            const fwContainer = fwContainerRef.current
            if (!fwContainer) return

            const rootWords = fwContainer.querySelectorAll('[class*="rootWord"]')
            if (rootWords.length < 3) return

            // 1. Capture source positions
            const heroRect = heroEl.getBoundingClientRect()
            const sourceRects = wordRefs.map(ref => ref.current.getBoundingClientRect())

            // 2. Pre-measure targets: temporarily collapse greeting + sentence
            const greetingOrigHeight = greetingEl.offsetHeight
            const greetingOrigMargin = window.getComputedStyle(greetingEl).marginBottom
            const sentenceOrigHeight = sentenceEl.offsetHeight

            greetingEl.style.transition = 'none'
            sentenceEl.style.transition = 'none'
            greetingEl.style.height = '0'
            greetingEl.style.overflow = 'hidden'
            greetingEl.style.marginBottom = '0'
            sentenceEl.style.height = '0'
            sentenceEl.style.overflow = 'hidden'
            heroEl.offsetHeight // force reflow

            const targetRects = Array.from(rootWords).map(el => el.getBoundingClientRect())
            const targetFontSizes = Array.from(rootWords).map(el =>
              window.getComputedStyle(el).fontSize
            )

            // Restore before paint
            greetingEl.style.height = `${greetingOrigHeight}px`
            greetingEl.style.overflow = ''
            greetingEl.style.marginBottom = greetingOrigMargin
            sentenceEl.style.height = `${sentenceOrigHeight}px`
            sentenceEl.style.overflow = ''
            heroEl.offsetHeight // force reflow
            greetingEl.style.transition = ''
            sentenceEl.style.transition = ''

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

            // 4. Hide originals
            wordRefs.forEach(ref => { ref.current.style.visibility = 'hidden' })
            rootWords.forEach(el => { el.style.visibility = 'hidden' })

            // 5. Combined motion: title stays, everything else transforms
            const flipDur = 1.3
            const flipTl = gsap.timeline()
            timelineRef.current = flipTl

            // Fade + collapse greeting
            flipTl.to(greetingEl, {
              opacity: 0, height: 0, marginBottom: 0,
              duration: flipDur * 0.6, ease: 'power1.inOut',
              onComplete: () => { greetingEl.style.overflow = 'hidden' },
            }, 0)

            // Fade connective text
            const cEls = connectiveRefs.current.filter(Boolean)
            if (cEls.length) {
              flipTl.to(cEls, {
                opacity: 0, duration: flipDur * 0.5, ease: 'power1.inOut',
              }, 0)
            }

            // Collapse sentence
            flipTl.to(sentenceEl, {
              height: 0, duration: flipDur, ease: 'power2.inOut',
              onStart: () => { sentenceEl.style.overflow = 'hidden' },
            }, 0)

            // Animate clones to framework row
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

            // Marks draw sequentially via FrameworkShuffle (phase='draw')
          })
        })
      })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // Scroll escape
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
        {/* Beat 1: Greeting */}
        <p className={styles.greeting} ref={greetingRef}>
          Hi, I&apos;m Lorin.
          <span className={styles.cursor} ref={greetingCursorRef} aria-hidden="true">|</span>
        </p>

        {/* Beat 2: Title — stays visible throughout */}
        <h1 className={styles.heroTitle} ref={titleRef}>
          <span className={styles.titleLine} ref={titleLine1Ref}>
            Design Researcher
          </span>
          <br />
          <span className={styles.titleLine} ref={titleLine2Ref}>
            <span className={styles.amp}>&amp;</span> Creative Strategist
          </span>
        </h1>

        {/* Beat 3: Sentence — method words FLIP to framework row */}
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

        {/* Framework row — marks draw sequentially after FLIP */}
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
