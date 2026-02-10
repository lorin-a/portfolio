'use client'

import { useState } from 'react'
import styles from './CardCarousel.module.css'

const reflectionCards = [
  { id: 1, name: 'welcome' },
  { id: 2, name: 'embrace' },
  { id: 3, name: 'numb' },
  { id: 4, name: 'present' },
  { id: 5, name: 'angry' },
  { id: 6, name: 'grateful' },
  { id: 7, name: 'exhausted' },
  { id: 8, name: 'joyful' },
  { id: 9, name: 'invisible' },
  { id: 10, name: 'valued' },
  { id: 11, name: 'heartbroken' },
  { id: 12, name: 'connected' },
  { id: 13, name: 'vulnerable' },
  { id: 14, name: 'hopeful' },
  { id: 15, name: 'thankyou' },
]

export default function CardCarousel({ imagePath = '/images/groundswell/gs-card-' }) {
  const [currentIndex, setCurrentIndex] = useState(7)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goNext = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev + 1) % reflectionCards.length)
  }

  const goPrev = () => {
    setIsFlipped(false)
    setCurrentIndex((prev) => (prev - 1 + reflectionCards.length) % reflectionCards.length)
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleFlip()
    }
  }

  const getCardAt = (offset) => {
    const index = (currentIndex + offset + reflectionCards.length) % reflectionCards.length
    return reflectionCards[index]
  }

  return (
    <div
      className={styles.cardCarouselContainer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Reflection cards carousel"
    >
      {/* Horizontal Card Track */}
      <div className={`${styles.carouselTrack} ${isTransitioning ? styles.carouselTransitioning : ''}`}>
        {/* Far left card (faded) */}
        <div className={`${styles.carouselCard} ${styles.carouselCardFar}`}>
          <img
            src={`${imagePath}${getCardAt(-2).name}-front.jpg`}
            alt=""
            className={styles.carouselCardImage}
          />
        </div>

        {/* Left card */}
        <div className={`${styles.carouselCard} ${styles.carouselCardSide}`}>
          <img
            src={`${imagePath}${getCardAt(-1).name}-front.jpg`}
            alt=""
            className={styles.carouselCardImage}
          />
        </div>

        {/* Center card (flippable) */}
        <div
          className={`${styles.carouselCard} ${styles.carouselCardCenter} ${isFlipped ? styles.carouselCardFlipped : ''}`}
          onClick={handleFlip}
        >
          <div className={styles.carouselCardInner}>
            <div className={styles.carouselCardFront}>
              <img
                src={`${imagePath}${getCardAt(0).name}-front.jpg`}
                alt={`${getCardAt(0).name} card front`}
                className={styles.carouselCardImage}
              />
            </div>
            <div className={styles.carouselCardBack}>
              <img
                src={`${imagePath}${getCardAt(0).name}-back.jpg`}
                alt={`${getCardAt(0).name} card back`}
                className={styles.carouselCardImage}
              />
            </div>
          </div>
        </div>

        {/* Right card */}
        <div className={`${styles.carouselCard} ${styles.carouselCardSide}`}>
          <img
            src={`${imagePath}${getCardAt(1).name}-front.jpg`}
            alt=""
            className={styles.carouselCardImage}
          />
        </div>

        {/* Far right card (faded) */}
        <div className={`${styles.carouselCard} ${styles.carouselCardFar}`}>
          <img
            src={`${imagePath}${getCardAt(2).name}-front.jpg`}
            alt=""
            className={styles.carouselCardImage}
          />
        </div>
      </div>

      {/* Controls */}
      <div className={styles.carouselControls}>
        <button
          onClick={goPrev}
          className={styles.carouselArrow}
          aria-label="Previous card"
        >
          ←
        </button>

        <div className={styles.carouselInfo}>
          <span className={styles.carouselInstruction}>
            {isFlipped ? 'Click to see front' : 'Click to flip'}
          </span>
          <span className={styles.carouselCounter}>
            {currentIndex + 1} of {reflectionCards.length}
          </span>
        </div>

        <button
          onClick={goNext}
          className={styles.carouselArrow}
          aria-label="Next card"
        >
          →
        </button>
      </div>
    </div>
  )
}