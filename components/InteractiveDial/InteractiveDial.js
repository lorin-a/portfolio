'use client'

import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import Image from 'next/image'
import styles from './InteractiveDial.module.css'
import {
  DIAL_SIZE,
  INNER_R, OUTER_R,
  DOTS, ALL_KEYS,
  OUTER_KEYS, INNER_KEYS,
  angleToPos,
  easeSmooth,
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

export default function InteractiveDial({ dialActive = false }) {
  const [dotsVisible, setDotsVisible] = useState(false)
  const [labelsVisible, setLabelsVisible] = useState(false)
  const [pulsing, setPulsing] = useState(false)
  const [activeKey, setActiveKey] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipText, setTooltipText] = useState('')

  const pillRefs = useRef({})
  const dotRefs = useRef({})
  const labelAreaRef = useRef(null)
  const trackInnerRef = useRef(null)
  const trackOuterRef = useRef(null)
  const wrapperRef = useRef(null)
  const arcRafRef = useRef(null)
  const postArcTimersRef = useRef([])

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
    setLabelsVisible(true)
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
      el.style.transform = 'translate(-50%, 6px)'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
    }
  }, [])

  // Arc animation: dots sweep along their rings into position
  const startDotArcAnimation = useCallback((onComplete) => {
    const ARC_DURATION = 800
    const ARC_OFFSET = 120
    const STAGGER = 100

    const arcOrder = [...OUTER_KEYS, ...INNER_KEYS]
    const animations = arcOrder.map((key, i) => {
      const dot = DOTS[key]
      const radius = dot.ring === 'inner' ? INNER_R : OUTER_R
      const finalAngle = dot.angle
      const startAngle = dot.ring === 'outer'
        ? finalAngle - ARC_OFFSET
        : finalAngle + ARC_OFFSET
      return { key, radius, startAngle, finalAngle, delay: i * STAGGER }
    })

    const startTime = performance.now()

    function frame(now) {
      const elapsed = now - startTime
      let allDone = true

      for (const { key, radius, startAngle, finalAngle, delay } of animations) {
        const t = Math.max(0, Math.min(1, (elapsed - delay) / ARC_DURATION))
        if (t < 1) allDone = false

        const easedT = easeSmooth(t)
        const currentAngle = startAngle + (finalAngle - startAngle) * easedT
        const pos = angleToPos(currentAngle, radius)
        const xPct = (pos.x / DIAL_SIZE) * 100
        const yPct = (pos.y / DIAL_SIZE) * 100

        const el = dotRefs.current[key]
        if (el) {
          el.style.left = `${xPct}%`
          el.style.top = `${yPct}%`
          el.style.opacity = String(Math.min(1, t * 3))
        }
      }

      if (!allDone) {
        arcRafRef.current = requestAnimationFrame(frame)
      } else {
        setDotsVisible(true)
        if (onComplete) onComplete()
      }
    }

    arcRafRef.current = requestAnimationFrame(frame)
  }, [])

  // dialActive sequence: rings → arc dots → labels fade in → inner dots pulse
  useEffect(() => {
    if (!dialActive) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Rings expand immediately
    requestAnimationFrame(() => {
      if (trackInnerRef.current) trackInnerRef.current.classList.add(styles.visible)
      if (trackOuterRef.current) trackOuterRef.current.classList.add(styles.visible)
    })

    // Dots arc into position after rings expand
    const dotsTimer = setTimeout(() => {
      startDotArcAnimation(() => {
        // Labels fade in 500ms after dots land (CSS handles stagger per label)
        const labelTimer = setTimeout(() => setLabelsVisible(true), 500)
        postArcTimersRef.current.push(labelTimer)

        // Inner dots start pulsing after labels are all visible (~1.5s after labels start)
        const pulseTimer = setTimeout(() => setPulsing(true), 2000)
        postArcTimersRef.current.push(pulseTimer)
      })
    }, 800)

    return () => {
      clearTimeout(dotsTimer)
      cancelAnimationFrame(arcRafRef.current)
      postArcTimersRef.current.forEach(clearTimeout)
      postArcTimersRef.current = []
    }
  }, [dialActive, startDotArcAnimation])

  // Dot click handler
  const handleDotClick = useCallback((key) => {
    if (!dotsVisible) return

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
  }, [dotsVisible, activeKey, pillHide, pillCenter])

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
    if (pulsing && activeKey !== key) classes.push(styles.breathing)
    if (activeKey === key) classes.push(styles.active)
    return classes.join(' ')
  }

  const getPillClassName = (key) => {
    const dot = DOTS[key]
    const styleClass = dot.pillStyle === 'bold' ? styles.pillBold : styles.pillSoft
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    return `${styles.pill} ${styleClass} ${colorClass}`
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <div className={`${styles.dial}${dialActive ? ` ${styles.dialActive}` : ''}`}>
        {/* Track rings */}
        <div className={styles.trackInner} ref={trackInnerRef} />
        <div className={styles.trackOuter} ref={trackOuterRef} />

        {/* Photo */}
        <div className={styles.photoWrap}>
          <Image
            src={cloudImg(HOME_IMAGES['lorin-photo'], 520)}
            alt="Lorin Anderberg, smiling warmly at the camera"
            fill
            sizes="260px"
          />
        </div>

        {/* All dots */}
        {ALL_KEYS.map((key) => (
          <button
            key={key}
            ref={(el) => (dotRefs.current[key] = el)}
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

        {/* Radial labels — positioned near outer dots */}
        <span className={`${styles.radialLabel} ${styles.labelTranslate} ${labelsVisible ? styles.radialLabelVisible : ''}`}>
          Distilling Complexity
        </span>
        <span className={`${styles.radialLabel} ${styles.labelAmplify} ${labelsVisible ? styles.radialLabelVisible : ''}`}>
          Amplifying Voices
        </span>
        <span className={`${styles.radialLabel} ${styles.labelHold} ${labelsVisible ? styles.radialLabelVisible : ''}`}>
          Holding Space
        </span>
      </div>

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
