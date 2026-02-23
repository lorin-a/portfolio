'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import markStyles from '@/components/marks/marks.module.css'
import styles from './FrameworkShuffle.module.css'

const FRAMEWORK_ITEMS = [
  {
    id: 'sense',
    root: 'sense',
    subs: ['details', 'patterns', 'tensions'],
    Mark: SenseMark,
    colorClass: 'sense',
    breatheDelay: 'breatheDelay1',
  },
  {
    id: 'weave',
    root: 'weave',
    subs: ['stories & systems', 'empathy & evidence', 'details & dreams'],
    Mark: WeaveMark,
    colorClass: 'weave',
    breatheDelay: 'breatheDelay2',
  },
  {
    id: 'shape',
    root: 'shape',
    subs: ['experiences', 'environments', 'culture'],
    Mark: ShapeMark,
    colorClass: 'shape',
    breatheDelay: 'breatheDelay3',
  },
]

function ShuffleWord({ item, delay = 0, isOpen, onOpen, onClose, showHint = false }) {
  const [replayCount, setReplayCount] = useState(0)
  const [drawComplete, setDrawComplete] = useState(false)
  const isBreathing = drawComplete && !isOpen

  const itemRef = useRef(null)
  const subsRef = useRef(null)
  const canHoverRef = useRef(false)
  const wasOpenRef = useRef(false)
  const [visible, setVisible] = useState(false)

  // Detect hover capability once at mount
  useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover)').matches
  }, [])

  // Entrance animation
  useEffect(() => {
    if (delay <= 0) {
      setVisible(true)
      return
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setVisible(true)
      return
    }

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(itemRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay }
      )
      setVisible(true)
    })
  }, [delay])

  // Open/close animation via GSAP
  useEffect(() => {
    const wasOpen = wasOpenRef.current
    wasOpenRef.current = isOpen

    // Skip on mount
    if (wasOpen === isOpen) return

    const subsEl = subsRef.current
    if (!subsEl) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isOpen) {
      if (prefersReduced) {
        subsEl.style.height = 'auto'
      } else {
        import('gsap').then(({ gsap }) => {
          gsap.fromTo(subsEl,
            { height: 0 },
            { height: 'auto', duration: 0.7, ease: 'power1.inOut' }
          )
        })
      }
    } else {
      if (prefersReduced) {
        subsEl.style.height = '0'
      } else {
        import('gsap').then(({ gsap }) => {
          gsap.to(subsEl, {
            height: 0,
            duration: 0.5,
            ease: 'power1.inOut',
          })
        })
      }
    }
  }, [isOpen])

  const handleOpen = useCallback(() => {
    setReplayCount(prev => prev + 1)
    onOpen()
  }, [onOpen])

  const handleMouseEnter = useCallback(() => {
    if (canHoverRef.current) handleOpen()
  }, [handleOpen])

  const handleMouseLeave = useCallback(() => {
    if (canHoverRef.current) onClose()
  }, [onClose])

  const handleClick = useCallback(() => {
    if (!canHoverRef.current) {
      if (isOpen) onClose()
      else handleOpen()
    }
  }, [isOpen, onClose, handleOpen])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen) onClose()
      else handleOpen()
    }
  }, [isOpen, onClose, handleOpen])

  const handleDrawComplete = useCallback(() => {
    setDrawComplete(true)
  }, [])

  // Build breathing className for mark — enhanced pulse when hint is active
  const breatheClass = isBreathing
    ? showHint
      ? markStyles.hintPulse
      : `${markStyles.breathing} ${markStyles[item.breatheDelay]}`
    : ''

  return (
    <div
      ref={itemRef}
      className={`${styles.fwItem} ${styles[item.colorClass]}`}
      style={delay > 0 ? { opacity: 0 } : undefined}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {showHint && (
        <div className={styles.hintArrow} aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" width="36" height="36">
            <path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <item.Mark
        animate={visible}
        delay={delay}
        replay={replayCount}
        className={breatheClass}
        onDrawComplete={handleDrawComplete}
      />
      <span className={styles.rootWord}>{item.root}</span>
      <div
        ref={subsRef}
        className={styles.subsContainer}
        aria-hidden={!isOpen}
      >
        {item.subs.map((sub, i) => (
          <span
            key={i}
            className={`${styles.subTerm} ${isOpen ? styles.subTermVisible : ''}`}
            style={isOpen ? { transitionDelay: `${i * 90}ms` } : { transitionDelay: '0ms' }}
          >
            {sub}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FrameworkShuffle({ startDelay = 0, itemStagger = 0.3 }) {
  const [openItemId, setOpenItemId] = useState(null)
  const [hintActive, setHintActive] = useState(false)
  const hasInteractedRef = useRef(false)

  // Activate hint after all draw-on animations + breathing established
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const totalDelay = (startDelay + (FRAMEWORK_ITEMS.length - 1) * itemStagger + 2.0) * 1000
    const timer = setTimeout(() => {
      if (!hasInteractedRef.current) {
        setHintActive(true)
      }
    }, totalDelay)
    return () => clearTimeout(timer)
  }, [startDelay, itemStagger])

  // Dismiss hint permanently on first interaction
  const dismissHint = useCallback(() => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true
      setHintActive(false)
    }
  }, [])

  return (
    <div className={styles.fwRow}>
      {FRAMEWORK_ITEMS.map((item, i) => (
        <ShuffleWord
          key={item.id}
          item={item}
          delay={startDelay + i * itemStagger}
          isOpen={openItemId === item.id}
          onOpen={() => { dismissHint(); setOpenItemId(item.id) }}
          onClose={() => setOpenItemId(null)}
          showHint={i === 0 && hintActive}
        />
      ))}
    </div>
  )
}
