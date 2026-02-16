'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './InteractiveDial.module.css'
import {
  CX, CY, INNER_R, OUTER_R,
  ROW_H, ROW_GAP, PILL_GAP,
  DOTS, INNER_KEYS, OUTER_KEYS, ALL_KEYS,
  ROW1_KEYS, ROW2_KEYS, RETRACT_ORDER,
  angleToPos, easeSmooth,
} from './dialConfig'

export default function InteractiveDial() {
  // Dial states: 'closed' | 'animating' | 'open'
  const [dialState, setDialState] = useState('closed')
  const [activeKey, setActiveKey] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [tooltipText, setTooltipText] = useState('')

  const dotRefs = useRef({})
  const pillRefs = useRef({})
  const pillWidths = useRef({})
  const labelAreaRef = useRef(null)
  const trackInnerRef = useRef(null)
  const trackOuterRef = useRef(null)

  // Set dot position
  const setDotPos = useCallback((key, x, y) => {
    const el = dotRefs.current[key]
    if (el) {
      el.style.left = `${x}px`
      el.style.top = `${y}px`
    }
  }, [])

  // Animate dot along arc
  const animateArc = useCallback((key, startAngle, startR, endAngle, endR, duration) => {
    return new Promise((resolve) => {
      const el = dotRefs.current[key]
      if (!el) return resolve()

      const t0 = performance.now()
      let travel = endAngle - startAngle
      if (travel < 0) travel += 360

      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1)
        const e = easeSmooth(p)
        const pos = angleToPos(startAngle + travel * e, startR + (endR - startR) * e)
        setDotPos(key, pos.x, pos.y)
        if (p < 1) {
          requestAnimationFrame(tick)
        } else {
          resolve()
        }
      }
      requestAnimationFrame(tick)
    })
  }, [setDotPos])

  // Measure pill widths
  const measurePills = useCallback(() => {
    ALL_KEYS.forEach((k) => {
      const el = pillRefs.current[k]
      if (el) {
        el.style.opacity = '0.001'
        el.style.transform = 'translate(-50%, 0)'
        pillWidths.current[k] = el.offsetWidth
        el.style.opacity = '0'
        el.style.transform = 'translate(-50%, 12px)'
      }
    })
  }, [])

  // Compute pill layout positions
  const computeLayout = useCallback((visibleKeys) => {
    const row1 = visibleKeys.filter((k) => ROW1_KEYS.includes(k))
    const row2 = visibleKeys.filter((k) => ROW2_KEYS.includes(k))
    const positions = {}

    ;[row1, row2].forEach((row, rowIdx) => {
      if (row.length === 0) return
      const totalW = row.reduce((sum, k) => sum + (pillWidths.current[k] || 100), 0) + (row.length - 1) * PILL_GAP
      let x = -totalW / 2
      const y = rowIdx === 0 ? 0 : ROW_H + ROW_GAP
      row.forEach((k) => {
        const w = pillWidths.current[k] || 100
        positions[k] = { x: x + w / 2, y }
        x += w + PILL_GAP
      })
    })

    return positions
  }, [])

  // Set label area height
  const setAreaHeight = useCallback((visibleKeys) => {
    const hasRow2 = visibleKeys.some((k) => ROW2_KEYS.includes(k))
    if (labelAreaRef.current) {
      labelAreaRef.current.style.height = `${hasRow2 ? ROW_H * 2 + ROW_GAP + 6 : Math.max(44, ROW_H + 6)}px`
    }
  }, [])

  // Pill positioning functions
  const pillCenter = useCallback((key) => {
    const el = pillRefs.current[key]
    if (el) {
      el.style.transform = 'translate(-50%, 0)'
      el.style.opacity = '1'
      el.style.pointerEvents = 'auto'
    }
  }, [])

  const layoutPills = useCallback((visibleKeys, brightKey) => {
    const pos = computeLayout(visibleKeys)
    setAreaHeight(visibleKeys)
    visibleKeys.forEach((k) => {
      const el = pillRefs.current[k]
      const p = pos[k]
      if (el && p) {
        el.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y}px)`
        el.style.opacity = k === brightKey ? '1' : '0.25'
        el.style.pointerEvents = 'auto'
      }
    })
  }, [computeLayout, setAreaHeight])

  const layoutAllBright = useCallback((visibleKeys) => {
    const pos = computeLayout(visibleKeys)
    setAreaHeight(visibleKeys)
    visibleKeys.forEach((k) => {
      const el = pillRefs.current[k]
      const p = pos[k]
      if (el && p) {
        el.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y}px)`
        el.style.opacity = '1'
        el.style.pointerEvents = 'auto'
      }
    })
  }, [computeLayout, setAreaHeight])

  const pillRetract = useCallback((key) => {
    const el = pillRefs.current[key]
    if (el) {
      el.style.transform = 'translate(-50%, 0)'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
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

  // Dot visibility
  const fadeInDot = useCallback((key, dur = 800) => {
    const el = dotRefs.current[key]
    if (el) {
      el.style.transition = `opacity ${dur}ms cubic-bezier(0.4, 0, 0.1, 1)`
      el.style.opacity = '1'
    }
  }, [])

  const fadeOutDot = useCallback((key, dur = 400) => {
    const el = dotRefs.current[key]
    if (el) {
      el.style.transition = `opacity ${dur}ms cubic-bezier(0.4, 0, 0.1, 1)`
      el.style.opacity = '0'
    }
  }, [])

  // Track visibility
  const showTracks = useCallback(() => {
    if (trackInnerRef.current) {
      trackInnerRef.current.classList.add(styles.visible)
    }
    if (trackOuterRef.current) {
      trackOuterRef.current.classList.add(styles.visible)
    }
  }, [])

  const hideTracks = useCallback(() => {
    if (trackInnerRef.current) {
      trackInnerRef.current.classList.remove(styles.visible)
    }
    if (trackOuterRef.current) {
      trackOuterRef.current.classList.remove(styles.visible)
    }
  }, [])

  // Delay helper
  const delay = (ms) => new Promise((r) => setTimeout(r, ms))

  // Interactive reveal (when dial is open)
  const revealDot = useCallback((key) => {
    if (dialState !== 'open') return

    // Remove active from all dots
    ALL_KEYS.forEach((k) => {
      const el = dotRefs.current[k]
      if (el) el.classList.remove(styles.active)
    })

    // Hide previous pill
    if (activeKey) {
      pillHide(activeKey)
    }
    setTooltipVisible(false)

    // Activate new dot
    setActiveKey(key)
    const el = dotRefs.current[key]
    if (el) el.classList.add(styles.active)

    if (labelAreaRef.current) {
      labelAreaRef.current.style.height = '80px'
    }

    requestAnimationFrame(() => {
      pillCenter(key)
      setTimeout(() => {
        setTooltipText(DOTS[key].tooltip)
        setTooltipVisible(true)
      }, 250)
    })
  }, [dialState, activeKey, pillHide, pillCenter])

  const dismissAll = useCallback(() => {
    ALL_KEYS.forEach((k) => {
      const el = dotRefs.current[k]
      if (el) el.classList.remove(styles.active)
    })
    if (activeKey) {
      pillHide(activeKey)
    }
    setTooltipVisible(false)
    setActiveKey(null)
    if (labelAreaRef.current) {
      labelAreaRef.current.style.height = '44px'
    }
  }, [activeKey, pillHide])

  // ACTIVATE: Run the full animation sequence
  const activateDial = useCallback(async () => {
    if (dialState !== 'closed') return
    setDialState('animating')

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Skip animation, show everything immediately
      showTracks()
      ALL_KEYS.forEach((key) => {
        const dot = DOTS[key]
        const radius = dot.ring === 'inner' ? INNER_R : OUTER_R
        const pos = angleToPos(dot.angle, radius)
        setDotPos(key, pos.x, pos.y)
        const el = dotRefs.current[key]
        if (el) el.style.opacity = '1'
      })
      setDialState('open')
      return
    }

    measurePills()

    // Position dots at starting positions
    const innerStart = angleToPos(60, INNER_R)
    INNER_KEYS.forEach((k) => setDotPos(k, innerStart.x, innerStart.y))
    const outerStart = angleToPos(0, OUTER_R)
    OUTER_KEYS.forEach((k) => setDotPos(k, outerStart.x, outerStart.y))

    // Hide all pills initially
    ALL_KEYS.forEach((k) => pillHide(k))
    if (labelAreaRef.current) labelAreaRef.current.style.height = '44px'

    // Show tracks with animation
    showTracks()

    await delay(800)

    // ===== PHASE 1: Paradoxes (inner) =====
    if (dotRefs.current.playful) dotRefs.current.playful.style.zIndex = '7'
    if (dotRefs.current.meticulous) dotRefs.current.meticulous.style.zIndex = '6'
    if (dotRefs.current.hopeful) dotRefs.current.hopeful.style.zIndex = '5'

    fadeInDot('playful', 800)
    fadeInDot('meticulous', 800)
    fadeInDot('hopeful', 800)

    await delay(500)
    pillCenter('playful')
    await delay(2000)

    let visible = ['playful', 'meticulous']
    layoutPills(visible, 'meticulous')
    animateArc('meticulous', 60, INNER_R, 180, INNER_R, 1400)
    await delay(1400)
    await delay(1200)

    visible = ['playful', 'meticulous', 'hopeful']
    layoutPills(visible, 'hopeful')
    animateArc('hopeful', 60, INNER_R, 300, INNER_R, 1400)
    await delay(1400)
    await delay(1400)

    // ===== PHASE 2: Mantras (outer) =====
    if (dotRefs.current.translate) dotRefs.current.translate.style.zIndex = '7'
    if (dotRefs.current.amplify) dotRefs.current.amplify.style.zIndex = '6'
    if (dotRefs.current.hold) dotRefs.current.hold.style.zIndex = '5'

    fadeInDot('translate', 800)
    fadeInDot('amplify', 800)
    fadeInDot('hold', 800)

    visible = ['playful', 'meticulous', 'hopeful', 'translate']
    layoutPills(visible, 'translate')
    await delay(2000)

    visible = ['playful', 'meticulous', 'hopeful', 'translate', 'amplify']
    layoutPills(visible, 'amplify')
    animateArc('amplify', 0, OUTER_R, 120, OUTER_R, 1400)
    await delay(1400)
    await delay(1200)

    visible = ['playful', 'meticulous', 'hopeful', 'translate', 'amplify', 'hold']
    layoutPills(visible, 'hold')
    animateArc('hold', 0, OUTER_R, 240, OUTER_R, 1600)
    await delay(1600)
    await delay(1000)

    // ===== FULL PICTURE =====
    await delay(300)
    layoutPills(visible, null)
    await delay(500)
    layoutAllBright(visible)
    await delay(3000)

    // ===== RESOLVE =====
    for (let i = 0; i < RETRACT_ORDER.length; i++) {
      pillRetract(RETRACT_ORDER[i])
      await delay(180)
    }

    await delay(900)
    if (labelAreaRef.current) labelAreaRef.current.style.height = '44px'

    await delay(400)
    setDialState('open')
  }, [dialState, measurePills, setDotPos, pillHide, pillCenter, layoutPills, layoutAllBright, pillRetract, fadeInDot, animateArc, showTracks])

  // DEACTIVATE: Return to closed state
  const deactivateDial = useCallback(async () => {
    if (dialState !== 'open') return
    setDialState('animating')

    // Dismiss any active dot
    dismissAll()

    // Fade out all dots
    ALL_KEYS.forEach((k) => fadeOutDot(k, 400))

    await delay(400)

    // Hide tracks
    hideTracks()

    await delay(600)
    setDialState('closed')
  }, [dialState, dismissAll, fadeOutDot, hideTracks])

  // Handle photo click
  const handlePhotoClick = () => {
    if (dialState === 'closed') {
      activateDial()
    } else if (dialState === 'open') {
      deactivateDial()
    }
    // Do nothing if animating
  }

  // Handle dot interaction
  const handleDotClick = (key) => {
    if (dialState !== 'open') return
    if (activeKey === key) {
      dismissAll()
    } else {
      revealDot(key)
    }
  }

  const handleDotMouseEnter = (key) => {
    if (dialState === 'open') revealDot(key)
  }

  const handleDotMouseLeave = () => {
    if (dialState === 'open') dismissAll()
  }

  // Get dot class names
  const getDotClassName = (key) => {
    const dot = DOTS[key]
    const typeClass = dot.type === 'fill' ? styles.dotFill : styles.dotRing
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    return `${styles.dot} ${typeClass} ${colorClass}`
  }

  // Get pill class names
  const getPillClassName = (key) => {
    const dot = DOTS[key]
    const styleClass = dot.pillStyle === 'bold' ? styles.pillBold : styles.pillSoft
    const colorClass = styles[`color${dot.color.charAt(0).toUpperCase() + dot.color.slice(1)}`]
    return `${styles.pill} ${styleClass} ${colorClass}`
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dial}>
        {/* Track rings - hidden by default, shown on activate */}
        <div className={styles.trackInner} ref={trackInnerRef} />
        <div className={styles.trackOuter} ref={trackOuterRef} />

        {/* Photo with pulse rings (shown when closed) */}
        <button
          className={`${styles.photoWrap} ${dialState === 'closed' ? styles.pulsing : ''}`}
          onClick={handlePhotoClick}
          aria-label={dialState === 'closed' ? 'Click to learn more about me' : 'Click to close'}
        >
          {/* Pulse rings */}
          <span className={styles.pulseRing1} />
          <span className={styles.pulseRing2} />

          <img
            className={styles.photoMain}
            src="/images/lorin-photo.jpg"
            alt="Lorin Anderberg, smiling warmly at the camera"
          />
          <img
            className={styles.photoLaugh}
            src="/images/lorin-photo-2.jpg"
            alt="Lorin Anderberg, laughing and looking to the side"
          />
        </button>

        {/* Indicator - shown when closed */}
        <div className={`${styles.indicator} ${dialState === 'closed' ? styles.visible : ''}`}>
          click to meet me
        </div>

        {/* Outer ring dots (mantras) */}
        {OUTER_KEYS.map((key) => (
          <button
            key={key}
            ref={(el) => (dotRefs.current[key] = el)}
            className={getDotClassName(key)}
            aria-label={DOTS[key].label}
            onClick={() => handleDotClick(key)}
            onMouseEnter={() => handleDotMouseEnter(key)}
            onMouseLeave={handleDotMouseLeave}
          />
        ))}

        {/* Inner ring dots (paradoxes) */}
        {INNER_KEYS.map((key) => (
          <button
            key={key}
            ref={(el) => (dotRefs.current[key] = el)}
            className={getDotClassName(key)}
            aria-label={DOTS[key].label}
            onClick={() => handleDotClick(key)}
            onMouseEnter={() => handleDotMouseEnter(key)}
            onMouseLeave={handleDotMouseLeave}
          />
        ))}
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
