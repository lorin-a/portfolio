'use client'

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import styles from './FlipCard.module.css'

/**
 * FlipCard — 3D card that flips on scroll entry, then toggles on click.
 *
 * Props:
 *  front — React node for front face
 *  back  — React node for back face
 *  clickOnly — skip scroll-triggered initial flip
 *  gsapControlled — when true, disables CSS transition and click handling (GSAP drives the flip)
 *  innerRef — ref forwarded to the .inner div so GSAP can target it directly
 */
const FlipCard = forwardRef(({ front, back, clickOnly = false, gsapControlled = false, innerRef }, ref) => {
  const [flipped, setFlipped] = useState(false)
  const [hasFlippedOnce, setHasFlippedOnce] = useState(clickOnly)
  const cardRef = useRef(null)

  useImperativeHandle(ref, () => ({
    setFlipped: (val) => {
      setFlipped(val)
      setHasFlippedOnce(true)
    }
  }))

  /* Scroll-triggered initial flip (skip if clickOnly or gsapControlled) */
  useEffect(() => {
    if (clickOnly || gsapControlled) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setFlipped(true)
        setHasFlippedOnce(true)
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) observer.observe(cardRef.current)

    return () => observer.disconnect()
  }, [clickOnly, gsapControlled])

  /* Click toggle (disabled when gsapControlled) */
  const handleClick = useCallback(() => {
    if (gsapControlled) return
    if (!hasFlippedOnce) return
    setFlipped(prev => !prev)
  }, [hasFlippedOnce, gsapControlled])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  const classNames = [
    styles.card,
    flipped ? styles.flipped : '',
    gsapControlled ? styles.gsapControlled : '',
  ].filter(Boolean).join(' ')

  return (
    <div
      ref={cardRef}
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Flip card to reveal more"
    >
      <div className={styles.inner} ref={innerRef}>
        <div className={styles.front}>{front}</div>
        <div className={styles.back}>{back}</div>
      </div>
    </div>
  )
})

FlipCard.displayName = 'FlipCard'

export default FlipCard
