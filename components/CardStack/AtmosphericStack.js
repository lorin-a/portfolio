'use client'

import { useCallback, useRef, useState } from 'react'
import styles from './AtmosphericStack.module.css'

/**
 * AtmosphericStack — skeuomorphic card stack with peek-edge cue.
 *
 * 3 cards visible at rest: front card full, back cards peek with
 * progressively reduced scale, slight upward Y-offset, lower opacity,
 * and minor rotation. Click the front card to advance — current card
 * lifts and fades, next card rises into place.
 *
 * No labels. Visual depth alone signals "more here."
 */
export default function AtmosphericStack({ slides = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const cards = slides.slice(0, Math.min(slides.length, 4))

  const advance = useCallback(() => {
    setActiveIndex(i => (i + 1) % cards.length)
  }, [cards.length])

  const getCardState = (index) => {
    const distance = (index - activeIndex + cards.length) % cards.length
    return distance
  }

  return (
    <div
      className={styles.stack}
      role="region"
      aria-label="Project image carousel"
    >
      {cards.map((slide, i) => {
        const distance = getCardState(i)
        const isVisible = distance < 3
        const isActive = distance === 0

        return (
          <div
            key={i}
            className={styles.card}
            data-distance={distance}
            data-visible={isVisible ? 'true' : 'false'}
            onClick={isActive ? advance : undefined}
            role={isActive ? 'button' : undefined}
            tabIndex={isActive ? 0 : -1}
            aria-label={isActive ? `View next image (${activeIndex + 1} of ${cards.length})` : undefined}
            aria-hidden={!isActive}
            onKeyDown={isActive ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                advance()
              }
            } : undefined}
          >
            {slide.type === 'video' ? (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                preload={i === 0 ? 'auto' : 'metadata'}
                className={styles.media}
                aria-label={slide.alt}
              />
            ) : (
              <img
                src={slide.src}
                alt={i === 0 ? slide.alt : ''}
                className={styles.media}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            )}
          </div>
        )
      })}
      <span className={styles.srOnly} aria-live="polite">
        Image {activeIndex + 1} of {cards.length}
      </span>
    </div>
  )
}
