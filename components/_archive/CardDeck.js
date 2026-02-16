'use client'

import { useState } from 'react'
import styles from './CardDeck.module.css'

/**
 * CardDeck - Interactive flippable card stack with navigation
 * 
 * @param {Object[]} cards - Array of card objects
 * @param {string} cards[].id - Unique card identifier
 * @param {string} cards[].name - Card name (used for image paths and labels)
 * @param {string} cards[].frontImage - Front image path (optional if using imagePath pattern)
 * @param {string} cards[].backImage - Back image path (optional if using imagePath pattern)
 * @param {string} imagePath - Base path for card images (e.g., '/images/groundswell/gs-card-')
 * @param {string} imagePattern - Pattern for image names: 'name-front.jpg' format
 */
export default function CardDeck({ 
  cards,
  imagePath = '',
  imagePattern = '{name}-front.jpg' // {name}-front.jpg and {name}-back.jpg
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  
  if (!cards || cards.length === 0) return null
  
  const currentCard = cards[currentIndex]
  
  // Generate image URLs
  const getFrontImage = (card) => {
    if (card.frontImage) return card.frontImage
    return `${imagePath}${card.name}-front.jpg`
  }
  
  const getBackImage = (card) => {
    if (card.backImage) return card.backImage
    return `${imagePath}${card.name}-back.jpg`
  }
  
  const goToPrev = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1))
    }, 150)
  }
  
  const goToNext = () => {
    setIsFlipped(false)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1))
    }, 150)
  }
  
  const goToIndex = (index) => {
    if (index === currentIndex) return
    setIsFlipped(false)
    setCurrentIndex(index)
  }
  
  const toggleFlip = () => setIsFlipped(!isFlipped)
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleFlip()
    }
  }
  
  return (
    <div className={styles.container}>
      {/* Counter */}
      <p className={styles.counter}>
        {currentIndex + 1} of {cards.length}
      </p>
      
      {/* Card Stack Area */}
      <div className={styles.stackArea}>
        {/* Previous Arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={goToPrev}
          aria-label="Previous card"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        {/* Card Stack */}
        <div className={styles.stack}>
          {/* Preview card 2 (furthest back) */}
          <div className={`${styles.previewCard} ${styles.previewCard2}`}>
            <img 
              src={getFrontImage(cards[(currentIndex + 2) % cards.length])}
              alt=""
              aria-hidden="true"
            />
          </div>
          
          {/* Preview card 1 (middle) */}
          <div className={`${styles.previewCard} ${styles.previewCard1}`}>
            <img 
              src={getFrontImage(cards[(currentIndex + 1) % cards.length])}
              alt=""
              aria-hidden="true"
            />
          </div>
          
          {/* Main Flippable Card */}
          <div
            className={styles.cardWrapper}
            onClick={toggleFlip}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${currentCard.name} card. ${isFlipped ? 'Showing back.' : 'Showing front.'} Press Enter to flip.`}
          >
            <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
              {/* Front */}
              <div className={styles.cardFace}>
                <img 
                  src={getFrontImage(currentCard)}
                  alt={`${currentCard.name} card front`}
                />
              </div>
              
              {/* Back */}
              <div className={`${styles.cardFace} ${styles.cardBack}`}>
                <img 
                  src={getBackImage(currentCard)}
                  alt={`${currentCard.name} card back`}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Next Arrow */}
        <button
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={goToNext}
          aria-label="Next card"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
      
      {/* Flip Instruction */}
      <div className={`${styles.flipHint} ${isFlipped ? styles.flipHintDimmed : ''}`}>
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        <span>{isFlipped ? 'Tap to see front' : 'Tap card to flip'}</span>
      </div>
      
      {/* Dot Navigation */}
      <div className={styles.dots} role="tablist" aria-label="Card navigation">
        {cards.map((card, index) => (
          <button
            key={card.id || index}
            className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
            onClick={() => goToIndex(index)}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Go to ${card.name} card`}
          />
        ))}
      </div>
    </div>
  )
}
