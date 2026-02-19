'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import styles from './InteractiveDial.module.css'
import {
  DIAL_SIZE,
  INNER_R, OUTER_R,
  DOTS, ALL_KEYS,
  TOUR_ORDER,
  angleToPos,
} from './dialConfig'
import { cloudImg, HOME_IMAGES } from '@/lib/cloudinary'

// Stagger delays for breathing animation
const BREATHE_DELAYS = {
  playful: '0s',
  meticulous: '0.5s',
  hopeful: '1.0s',
  translate: '1.5s',
  amplify: '2.0s',
  hold: '2.5s',
}

// Delays relative to dialActive becoming true
const PULSE_DELAY = 5000                   // breathing starts
const POP_DELAY = 5800                     // amplify dot pops
const POP_DURATION = 2500                  // pop animation length
const INSTRUCTION_DELAY = 8500             // instruction text

export default function InteractiveDial({ dialActive = false }) {
  const [dotsVisible, setDotsVisible] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [guidedDot, setGuidedDot] = useState(null)
  const [instructionVisible, setInstructionVisible] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [activeKey, setActiveKey] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipText, setTooltipText] = useState('')

  const pillRefs = useRef({})
  const labelAreaRef = useRef(null)
  const trackInnerRef = useRef(null)
  const trackOuterRef = useRef(null)
  const wrapperRef = useRef(null)
  const tourTimerRef = useRef(null)
  const visitedDotsRef = useRef(new Set())

  // Compute dot positions as percentages so they scale with container
  const dotPositions = useMemo(() => {
    const positions = {}
    ALL_KEYS.forEach((key) => {
      const dot = DOTS[key]
      const radius = dot.ring === 'inner' ? INNER_R : OUTER_R
      const pos = angleToPos(dot.angle, radius)
      positions[key] = {
        x: `${(pos.x / DIAL_SIZE) * 100}%`,
        y: `${(pos.y / DIAL_SIZE) * 100}%`,
      }
    })
    return positions
  }, [])

  // Reduced-motion: show everything immediately on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!prefersReducedMotion) return

    if (trackInnerRef.current) trackInnerRef.current.classList.add(styles.visible)
    if (trackOuterRef.current) trackOuterRef.current.classList.add(styles.visible)
    setDotsVisible(true)
    setInstructionVisible(true)
  }, [])

  // dialActive sequence: rings → dots → pulse → pop → instruction
  useEffect(() => {
    if (!dialActive) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Rings expand immediately
    requestAnimationFrame(() => {
      if (trackInnerRef.current) trackInnerRef.current.classList.add(styles.visible)
      if (trackOuterRef.current) trackOuterRef.current.classList.add(styles.visible)
    })

    // Dots fade in after rings expand (~800ms)
    const dotsTimer = setTimeout(() => setDotsVisible(true), 800)
    // Breathing starts
    const pulseTimer = setTimeout(() => setPulsing(true), PULSE_DELAY)
    // Amplify dot pops to draw attention
    const popTimer = setTimeout(() => setGuidedDot('amplify'), POP_DELAY)
    // Pop ends, return to normal breathing
    const popEndTimer = setTimeout(() => setGuidedDot(null), POP_DELAY + POP_DURATION)
    // Instruction text fades in
    const instructionTimer = setTimeout(() => setInstructionVisible(true), INSTRUCTION_DELAY)

    return () => {
      clearTimeout(dotsTimer)
      clearTimeout(pulseTimer)
      clearTimeout(popTimer)
      clearTimeout(popEndTimer)
      clearTimeout(instructionTimer)
      clearTimeout(tourTimerRef.current)
    }
  }, [dialActive])

  // Pill positioning (click interaction)
  const pillCenter = useCallback((key) => {
    const el = pillRefs.current[key]
    if (el) {
      el.style.transform = 'translate(-50%, 0)'
      el.style.opacity = '1'
      el.style.pointerEvents = 'auto'
    }
  }, [])

  const pillHide = useCallback((key) => {
    const el = pillRefs.current[key]
    if (el) {
      el.style.transform = 'translate(-50%, 12px)'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
    }
  }, [])

  // Start a 5s timer to advance the guided tour to the next unvisited dot
  const startTourTimer = useCallback(() => {
    clearTimeout(tourTimerRef.current)
    tourTimerRef.current = setTimeout(() => {
      const nextDot = TOUR_ORDER.find((k) => !visitedDotsRef.current.has(k))
      if (nextDot) {
        setGuidedDot(nextDot)
      }
    }, 5000)
  }, [])

  // Dot click handler
  const handleDotClick = useCallback((key) => {
    if (!dotsVisible) return
    if (!hasInteracted) setHasInteracted(true)

    // Track visited dot for tour
    visitedDotsRef.current.add(key)

    // If clicking the currently guided dot, stop its pop animation
    if (key === guidedDot) setGuidedDot(null)

    // Clear any pending tour timer and start a new one
    clearTimeout(tourTimerRef.current)

    if (activeKey === key) {
      // Dismiss current
      pillHide(key)
      setTooltipVisible(false)
      setActiveKey(null)
      if (labelAreaRef.current) labelAreaRef.current.style.height = '0'
    } else {
      // Dismiss previous if any
      if (activeKey) pillHide(activeKey)
      setTooltipVisible(false)

      // Activate new dot
      setActiveKey(key)
      const isMobile = window.innerWidth <= 600
      if (labelAreaRef.current) labelAreaRef.current.style.height = isMobile ? '70px' : '80px'

      requestAnimationFrame(() => {
        pillCenter(key)
        setTimeout(() => {
          setTooltipText(DOTS[key].tooltip)
          setTooltipVisible(true)
        }, 250)
      })
    }

    // Advance tour after 5s reading pause
    startTourTimer()
  }, [dotsVisible, hasInteracted, activeKey, guidedDot, pillHide, pillCenter, startTourTimer])

  // Click outside to dismiss
  useEffect(() => {
    if (!dotsVisible) return

    const handleClickOutside = (e) => {
      if (wrapperRef.current && wrapperRef.current.contains(e.target)) {
        const clickedDot = e.target.closest(`.${styles.dot}`)
        if (clickedDot) return
      }

      if (activeKey) {
        pillHide(activeKey)
        setTooltipVisible(false)
        setActiveKey(null)
        if (labelAreaRef.current) labelAreaRef.current.style.height = '0'
        // Keep tour advancing even after dismiss — user already read the content
        startTourTimer()
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dotsVisible, activeKey, pillHide, startTourTimer])

  // Class name helpers
  const getDotClassName = (key) => {
    const dot = DOTS[key]
    const typeClass = dot.type === 'fill' ? styles.dotFill : styles.dotRing
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    const classes = [styles.dot, typeClass, colorClass]
    if (dotsVisible) classes.push(styles.dotsVisible)
    if (key === guidedDot) {
      classes.push(styles.popping)
    } else if (pulsing) {
      classes.push(styles.breathing)
    }
    if (activeKey === key) classes.push(styles.active)
    return classes.join(' ')
  }

  const getPillClassName = (key) => {
    const dot = DOTS[key]
    const styleClass = dot.pillStyle === 'bold' ? styles.pillBold : styles.pillSoft
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    return `${styles.pill} ${styleClass} ${colorClass}`
  }

  const showInstruction = instructionVisible && !hasInteracted

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={`${styles.dial}${dialActive ? ` ${styles.dialActive}` : ''}`}>
        {/* Track rings */}
        <div className={styles.trackInner} ref={trackInnerRef} />
        <div className={styles.trackOuter} ref={trackOuterRef} />

        {/* Photo */}
        <div className={styles.photoWrap}>
          <Image
            src={cloudImg(HOME_IMAGES['lorin-photo'], 420)}
            alt="Lorin Anderberg, smiling warmly at the camera"
            fill
            sizes="210px"
          />
        </div>

        {/* All dots */}
        {ALL_KEYS.map((key) => (
          <button
            key={key}
            className={getDotClassName(key)}
            aria-label={DOTS[key].label}
            style={{
              left: dotPositions[key].x,
              top: dotPositions[key].y,
              animationDelay: BREATHE_DELAYS[key],
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleDotClick(key)
            }}
          />
        ))}

        {/* Desktop instruction text — positioned right of Amplify dot */}
        <span className={`${styles.instructionDesktop} ${showInstruction ? styles.instructionShow : ''}`}>
          click to explore
        </span>
      </div>

      {/* Mobile/tablet instruction text — centered between dial and labels */}
      <span className={`${styles.instructionMobile} ${showInstruction ? styles.instructionShow : ''}`}>
        tap to explore
      </span>

      <div className={styles.labelArea} ref={labelAreaRef}>
        {ALL_KEYS.map((key) => (
          <span
            key={key}
            ref={(el) => (pillRefs.current[key] = el)}
            className={getPillClassName(key)}
          >
            {DOTS[key].label}
          </span>
        ))}

        <span
          className={`${styles.tooltip} ${tooltipVisible ? styles.visible : ''}`}
          aria-live="polite"
        >
          {tooltipText}
        </span>
      </div>
    </div>
  )
}
