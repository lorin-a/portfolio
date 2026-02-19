'use client'

import { useState } from 'react'
import styles from './CardCarousel.module.css'
import { cloudImg, GS_CARDS } from '@/lib/cloudinary'

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

function cardSrc(name, side) {
  const key = `${name}-${side}`
  const publicId = GS_CARDS[key]
  if (publicId) return cloudImg(publicId, 600)
  // Fallback to local path if not in Cloudinary map
  return `/images/groundswell/gs-card-${name}-${side}.jpg`
}

export default function CardCarousel() {
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
            src={cardSrc(getCardAt(-2).name, 'front')}
            alt=""
            aria-hidden="true"
            className={styles.carouselCardImage}
          />
        </div>

        {/* Left card */}
        <div className={`${styles.carouselCard} ${styles.carouselCardSide}`}>
          <img
            src={cardSrc(getCardAt(-1).name, 'front')}
            alt=""
            aria-hidden="true"
            className={styles.carouselCardImage}
          />
        </div>

        {/* Center card (flippable) */}
        <button
          type="button"
          className={`${styles.carouselCard} ${styles.carouselCardCenter} ${isFlipped ? styles.carouselCardFlipped : ''}`}
          onClick={handleFlip}
          aria-label={isFlipped ? `${getCardAt(0).name} card - click to see front` : `${getCardAt(0).name} card - click to flip and see exercise`}
        >
          <div className={styles.carouselCardInner}>
            <div className={styles.carouselCardFront}>
              <img
                src={cardSrc(getCardAt(0).name, 'front')}
                alt={`${getCardAt(0).name} card front`}
                className={styles.carouselCardImage}
              />
            </div>
            <div className={styles.carouselCardBack}>
              <img
                src={cardSrc(getCardAt(0).name, 'back')}
                alt={`${getCardAt(0).name} card back`}
                className={styles.carouselCardImage}
              />
            </div>
          </div>
        </button>

        {/* Right card */}
        <div className={`${styles.carouselCard} ${styles.carouselCardSide}`}>
          <img
            src={cardSrc(getCardAt(1).name, 'front')}
            alt=""
            aria-hidden="true"
            className={styles.carouselCardImage}
          />
        </div>

        {/* Far right card (faded) */}
        <div className={`${styles.carouselCard} ${styles.carouselCardFar}`}>
          <img
            src={cardSrc(getCardAt(2).name, 'front')}
            alt=""
            aria-hidden="true"
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
