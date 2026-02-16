'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'
import styles from './ImageGallery.module.css'

/**
 * ImageGallery - Single image display with navigation arrows and dot indicators
 * 
 * @param {Object[]} images - Array of image objects
 * @param {string} images[].src - Image source path
 * @param {string} images[].alt - Image alt text (required for accessibility)
 * @param {boolean} showDots - Whether to show dot navigation (default: true)
 * @param {boolean} showCounter - Whether to show "1 of 5" counter (default: true)
 * @param {string} ariaLabel - Accessible label for the gallery
 */
export default function ImageGallery({ 
  images, 
  showDots = true,
  showCounter = true,
  ariaLabel = 'Image gallery'
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  
  if (!images || images.length === 0) return null
  
  const hasMultiple = images.length > 1
  
  const goToPrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const goToNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  const goToIndex = (index) => setCurrentIndex(index)
  
  const openLightbox = () => setLightboxOpen(true)
  const closeLightbox = () => setLightboxOpen(false)
  
  return (
    <div className={styles.container} role="region" aria-label={ariaLabel}>
      <div className={styles.galleryWrapper}>
        {/* Previous Arrow */}
        {hasMultiple && (
          <button
            className={`${styles.arrow} ${styles.arrowPrev}`}
            onClick={goToPrev}
            aria-label="Previous image"
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
        )}
        
        {/* Image Container */}
        <div className={styles.imageContainer}>
          <button
            className={styles.imageButton}
            onClick={openLightbox}
            aria-label={`View ${images[currentIndex].alt || 'image'} in lightbox`}
          >
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt || ''}
              className={styles.image}
            />
          </button>
          
          {/* Counter */}
          {showCounter && hasMultiple && (
            <p className={styles.counter}>
              {currentIndex + 1} of {images.length}
            </p>
          )}
        </div>
        
        {/* Next Arrow */}
        {hasMultiple && (
          <button
            className={`${styles.arrow} ${styles.arrowNext}`}
            onClick={goToNext}
            aria-label="Next image"
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
        )}
      </div>
      
      {/* Dot Navigation */}
      {showDots && hasMultiple && (
        <div className={styles.dots} role="tablist" aria-label="Gallery navigation">
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => goToIndex(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          onClose={closeLightbox}
          onPrev={hasMultiple ? goToPrev : undefined}
          onNext={hasMultiple ? goToNext : undefined}
          counter={hasMultiple ? `${currentIndex + 1} of ${images.length}` : undefined}
        />
      )}
    </div>
  )
}
