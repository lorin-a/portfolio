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

/* ===========================================
   DropdownSubTerms — extracted renderer
   =========================================== */
function DropdownSubTerms({ item, isOpen, subsRef }) {
  return (
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
  )
}

function ShuffleWord({ item, phase, shouldAnimate, isOpen, onOpen, onClose, onStrokeComplete, itemRef, skipEntrance = false, delay = 0 }) {
  const [replayCount, setReplayCount] = useState(0)
  const [drawComplete, setDrawComplete] = useState(false)
  const isBreathing = drawComplete && !isOpen

  const internalRef = useRef(null)
  const subsRef = useRef(null)
  const canHoverRef = useRef(false)
  const wasOpenRef = useRef(false)

  const setRef = useCallback((el) => {
    internalRef.current = el
    if (typeof itemRef === 'function') itemRef(el)
  }, [itemRef])

  useEffect(() => {
    canHoverRef.current = window.matchMedia('(hover: hover)').matches
  }, [])

  // Entrance animation (non-skipEntrance mode)
  useEffect(() => {
    if (skipEntrance || delay <= 0) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    import('gsap').then(({ gsap }) => {
      gsap.fromTo(internalRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay }
      )
    })
  }, [delay, skipEntrance])

  useEffect(() => {
    const wasOpen = wasOpenRef.current
    wasOpenRef.current = isOpen
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
    onStrokeComplete?.()
  }, [onStrokeComplete])

  const breatheClass = isBreathing
    ? `${markStyles.breathing} ${markStyles[item.breatheDelay]}`
    : ''

  return (
    <div
      ref={setRef}
      className={`${styles.fwItem} ${styles[item.colorClass]}`}
      style={skipEntrance ? undefined : (delay > 0 ? { opacity: 0 } : undefined)}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <item.Mark
        animate={shouldAnimate}
        delay={skipEntrance ? 0 : delay}
        replay={replayCount}
        className={breatheClass}
        onDrawComplete={handleDrawComplete}
      />
      <span className={styles.rootWord}>{item.root}</span>
      <DropdownSubTerms
        item={item}
        isOpen={isOpen}
        subsRef={subsRef}
      />
    </div>
  )
}

export default function FrameworkShuffle({ phase = 'idle', onMarksReady, visible = true, skipEntrance = false, startDelay = 0, itemStagger = 0.3 }) {
  const [openItemId, setOpenItemId] = useState(null)
  const marksReadyFiredRef = useRef(false)
  const completedCountRef = useRef(0)
  const [activated, setActivated] = useState(false)

  const itemRefs = useRef([null, null, null])
  const rowRef = useRef(null)

  // Activate marks when phase leaves idle (or immediately if no phase system)
  useEffect(() => {
    if (phase !== 'idle' && !activated) {
      setActivated(true)
    }
  }, [phase, activated])

  // Handle stroke completion: wait for all 3, then fire onMarksReady
  const handleStrokeComplete = useCallback(() => {
    completedCountRef.current++
    if (completedCountRef.current >= FRAMEWORK_ITEMS.length) {
      // Brief pause after last mark completes for fills to settle
      setTimeout(() => {
        if (!marksReadyFiredRef.current) {
          marksReadyFiredRef.current = true
          onMarksReady?.()
        }
      }, 300)
    }
  }, [onMarksReady])

  return (
    <div
      className={styles.fwRow}
      ref={rowRef}
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s ease' }}
    >
      {FRAMEWORK_ITEMS.map((item, i) => (
        <ShuffleWord
          key={item.id}
          item={item}
          phase={phase}
          shouldAnimate={activated}
          isOpen={openItemId === item.id}
          onOpen={() => setOpenItemId(item.id)}
          onClose={() => setOpenItemId(null)}
          onStrokeComplete={handleStrokeComplete}
          itemRef={el => itemRefs.current[i] = el}
          skipEntrance={skipEntrance}
          delay={skipEntrance ? 0 : startDelay + i * itemStagger}
        />
      ))}
    </div>
  )
}
