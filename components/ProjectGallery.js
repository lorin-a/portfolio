'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import styles from './ProjectGallery.module.css'

/**
 * ProjectGallery - Horizontal scrolling image gallery with lightbox
 * 
 * @param {Object[]} images - Array of image objects with src and alt
 * @param {string} images[].src - Image source path
 * @param {string} images[].alt - Image alt text (required for accessibility)
 */
export default function ProjectGallery({ images }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollRef = useRef(null)
  const lightboxRef = useRef(null)
  
  if (!images || images.length === 0) return null
  
  // Update arrow visibility based on scroll position
  const updateArrows = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setShowLeftArrow(scrollLeft > 10)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }
  
  // Scroll by a fixed amount
  const scroll = (direction) => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.7
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
  
  // Open lightbox
  const openLightbox = (index) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }
  
  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  // Navigate lightbox
  const navigateLightbox = (direction) => {
    if (direction === 'prev') {
      setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    } else {
      setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }
  
  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') navigateLightbox('prev')
      if (e.key === 'ArrowRight') navigateLightbox('next')
    }
    
    // Trap focus in lightbox
    lightboxRef.current?.focus()
    document.body.style.overflow = 'hidden'
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [lightboxOpen, images.length])
  
  // Initialize arrow state
  useEffect(() => {
    updateArrows()
  }, [images])
  
  return (
    <div className={styles.container}>
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
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft} ${showLeftArrow ? styles.visible : ''}`}
            onClick={() => scroll('left')}
            aria-label="Scroll gallery left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight} ${showRightArrow ? styles.visible : ''}`}
            onClick={() => scroll('right')}
            aria-label="Scroll gallery right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
      
      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className={styles.lightbox}
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div className={styles.lightboxBackdrop} onClick={closeLightbox} />
          
          <div className={styles.lightboxContent}>
            <img
              src={images[activeIndex].src}
              alt={images[activeIndex].alt || ''}
              className={styles.lightboxImage}
            />
          </div>
          
          {/* Lightbox Controls */}
          <button
            className={styles.lightboxClose}
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          
          {images.length > 1 && (
            <>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                onClick={() => navigateLightbox('prev')}
                aria-label="Previous image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                onClick={() => navigateLightbox('next')}
                aria-label="Next image"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}
          
          {/* Image Counter */}
          <div className={styles.lightboxCounter} aria-live="polite">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  )
}
