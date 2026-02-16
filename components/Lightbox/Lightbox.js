'use client'

import { useEffect, useRef, useCallback } from 'react'
import styles from './Lightbox.module.css'

/**
 * Lightbox - Full-screen image viewer with keyboard navigation
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {function} onClose - Callback when lightbox closes
 * @param {function} onPrev - Optional callback for previous image (enables arrows)
 * @param {function} onNext - Optional callback for next image (enables arrows)
 * @param {string} counter - Optional counter text (e.g., "3 of 10")
 */
export default function Lightbox({ 
  src, 
  alt = '', 
  onClose, 
  onPrev, 
  onNext,
  counter 
}) {
  const lightboxRef = useRef(null)
  const hasNavigation = onPrev && onNext
  
  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    switch (e.key) {
      case 'Escape':
        onClose()
        break
      case 'ArrowLeft':
        if (onPrev) onPrev()
        break
      case 'ArrowRight':
        if (onNext) onNext()
        break
    }
  }, [onClose, onPrev, onNext])
  
  // Setup focus trap and body scroll lock
  useEffect(() => {
    // Focus the lightbox for keyboard events
    lightboxRef.current?.focus()
    
    // Lock body scroll
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    
    // Add keyboard listener
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
  
  return (
    <div 
      className={styles.lightbox}
      ref={lightboxRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Backdrop */}
      <div 
        className={styles.backdrop} 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Close button */}
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close lightbox"
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      
      {/* Navigation arrows */}
      {hasNavigation && (
        <>
          <button
            className={`${styles.navButton} ${styles.navPrev}`}
            onClick={onPrev}
            aria-label="Previous image"
          >
            <svg 
              width="32" 
              height="32" 
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
            className={`${styles.navButton} ${styles.navNext}`}
            onClick={onNext}
            aria-label="Next image"
          >
            <svg 
              width="32" 
              height="32" 
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
      
      {/* Image */}
      <div className={styles.imageContainer}>
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      
      {/* Counter */}
      {counter && (
        <div className={styles.counter} aria-live="polite">
          {counter}
        </div>
      )}
    </div>
  )
}
