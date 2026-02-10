'use client'

import { useState, useRef, useEffect } from 'react'
import Lightbox from './Lightbox'
import styles from './ImageCarousel.module.css'

/**
 * ImageCarousel - Horizontal scrolling image gallery with lightbox
 * 
 * @param {Object[]} images - Array of image objects
 * @param {string} images[].src - Image source path
 * @param {string} images[].alt - Image alt text (required for accessibility)
 * @param {number} height - Optional height in pixels (default: 320)
 * @param {string} ariaLabel - Accessible label for the gallery
 */
export default function ImageCarousel({ 
  images, 
  height = 320,
  ariaLabel = 'Image gallery'
}) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollRef = useRef(null)
  
  if (!images || images.length === 0) return null
  
  const lightboxOpen = lightboxIndex !== null
  
  // Update arrow visibility based on scroll position
  const updateArrows = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 10)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }
  
  // Scroll by viewport percentage
  const scroll = (direction) => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.6
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
  
  // Lightbox navigation
  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)
  const prevImage = () => setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  const nextImage = () => setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  
  // Initialize arrow state
  useEffect(() => {
    updateArrows()
    // Re-check on resize
    const handleResize = () => updateArrows()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [images])
  
  return (
    <div className={styles.container} role="region" aria-label={ariaLabel}>
      {/* Wrapper with padding for arrows */}
      <div className={styles.carouselWrapper}>
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft} ${showLeftArrow ? styles.visible : ''}`}
              onClick={() => scroll('left')}
              aria-label="Scroll gallery left"
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
            
            <button
              className={`${styles.arrow} ${styles.arrowRight} ${showRightArrow ? styles.visible : ''}`}
              onClick={() => scroll('right')}
              aria-label="Scroll gallery right"
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
          </>
        )}
        
        {/* Scroll Container */}
        <div 
          className={styles.scrollContainer}
          ref={scrollRef}
          onScroll={updateArrows}
        >
          <div className={styles.track}>
            {images.map((image, index) => (
              <button
                key={index}
                className={styles.imageButton}
                onClick={() => openLightbox(index)}
                aria-label={`View ${image.alt || `image ${index + 1}`} in lightbox`}
                style={{ height: `${height}px` }}
              >
                <img
                  src={image.src}
                  alt={image.alt || ''}
                  className={styles.image}
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          src={images[lightboxIndex].src}
          alt={images[lightboxIndex].alt}
          onClose={closeLightbox}
          onPrev={images.length > 1 ? prevImage : undefined}
          onNext={images.length > 1 ? nextImage : undefined}
          counter={images.length > 1 ? `${lightboxIndex + 1} of ${images.length}` : undefined}
        />
      )}
    </div>
  )
}