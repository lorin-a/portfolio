'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import styles from './InteractiveDial.module.css'
import {
  INNER_R, OUTER_R,
  DOTS, ALL_KEYS,
  angleToPos,
} from './dialConfig'

// Stagger delays for breathing animation
const BREATHE_DELAYS = {
  playful: '0s',
  meticulous: '0.5s',
  hopeful: '1.0s',
  translate: '1.5s',
  amplify: '2.0s',
  hold: '2.5s',
}

// Hero.js CTA appears at ~7350ms — sync pulse start with that
const PULSE_DELAY = 7400
const POP_DELAY = PULSE_DELAY + 800       // amplify dot pops
const POP_DURATION = 2500                  // pop animation length
const INSTRUCTION_DELAY = POP_DELAY + POP_DURATION + 200

export default function InteractiveDial() {
  const [dotsVisible, setDotsVisible] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [amplifyPopping, setAmplifyPopping] = useState(false)
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

  // Compute dot positions from config at render time
  const dotPositions = useMemo(() => {
    const positions = {}
    ALL_KEYS.forEach((key) => {
      const dot = DOTS[key]
      const radius = dot.ring === 'inner' ? INNER_R : OUTER_R
      positions[key] = angleToPos(dot.angle, radius)
    })
    return positions
  }, [])

  // Mount sequence: rings → dots → headline → CTA → pulse → pop → instruction
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (trackInnerRef.current) trackInnerRef.current.classList.add(styles.visible)
      if (trackOuterRef.current) trackOuterRef.current.classList.add(styles.visible)
      setDotsVisible(true)
      setInstructionVisible(true)
      return
    }

    // Rings expand on mount
    requestAnimationFrame(() => {
      if (trackInnerRef.current) trackInnerRef.current.classList.add(styles.visible)
      if (trackOuterRef.current) trackOuterRef.current.classList.add(styles.visible)
    })

    // Dots fade in as a group after rings expand (~800ms)
    const dotsTimer = setTimeout(() => setDotsVisible(true), 800)
    // Breathing starts when Hero CTA appears
    const pulseTimer = setTimeout(() => setPulsing(true), PULSE_DELAY)
    // Amplify dot pops to draw attention
    const popTimer = setTimeout(() => setAmplifyPopping(true), POP_DELAY)
    // Pop ends, return to normal breathing
    const popEndTimer = setTimeout(() => setAmplifyPopping(false), POP_DELAY + POP_DURATION)
    // Instruction text fades in after pop completes
    const instructionTimer = setTimeout(() => setInstructionVisible(true), INSTRUCTION_DELAY)

    return () => {
      clearTimeout(dotsTimer)
      clearTimeout(pulseTimer)
      clearTimeout(popTimer)
      clearTimeout(popEndTimer)
      clearTimeout(instructionTimer)
    }
  }, [])

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

  // Dot click handler
  const handleDotClick = useCallback((key) => {
    if (!dotsVisible) return
    if (!hasInteracted) setHasInteracted(true)

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
      if (labelAreaRef.current) labelAreaRef.current.style.height = '80px'

      requestAnimationFrame(() => {
        pillCenter(key)
        setTimeout(() => {
          setTooltipText(DOTS[key].tooltip)
          setTooltipVisible(true)
        }, 250)
      })
    }
  }, [dotsVisible, hasInteracted, activeKey, pillHide, pillCenter])

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
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [dotsVisible, activeKey, pillHide])

  // Class name helpers
  const getDotClassName = (key) => {
    const dot = DOTS[key]
    const typeClass = dot.type === 'fill' ? styles.dotFill : styles.dotRing
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    const classes = [styles.dot, typeClass, colorClass]
    if (dotsVisible) classes.push(styles.dotsVisible)
    if (key === 'amplify' && amplifyPopping) {
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
      <div className={styles.dial}>
        {/* Track rings */}
        <div className={styles.trackInner} ref={trackInnerRef} />
        <div className={styles.trackOuter} ref={trackOuterRef} />

        {/* Photo */}
        <div className={styles.photoWrap}>
          <img
            src="/images/lorin-photo.jpg"
            alt="Lorin Anderberg, smiling warmly at the camera"
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
