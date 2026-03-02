'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './FlipCard.module.css'

/**
 * FlipCard — 3D card that flips on scroll entry, then toggles on click.
 *
 * Props:
 *  front — React node for front face
 *  back  — React node for back face
 */
export default function FlipCard({ front, back, clickOnly = false }) {
  const [flipped, setFlipped] = useState(false)
  const [hasFlippedOnce, setHasFlippedOnce] = useState(clickOnly)
  const cardRef = useRef(null)

  /* Scroll-triggered initial flip (skip if clickOnly) */
  useEffect(() => {
    if (clickOnly) return
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
  }, [clickOnly])

  /* Click toggle (immediate if clickOnly, otherwise after first flip) */
  const handleClick = useCallback(() => {
    if (!hasFlippedOnce) return
    setFlipped(prev => !prev)
  }, [hasFlippedOnce])

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    },
    [handleClick]
  )

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Flip card to reveal more"
    >
      <div className={styles.inner}>
        <div className={styles.front}>{front}</div>
        <div className={styles.back}>{back}</div>
      </div>
    </div>
  )
}
