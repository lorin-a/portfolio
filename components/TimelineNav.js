'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import styles from './TimelineNav.module.css'

/**
 * TimelineNav - Sticky progress timeline navigation
 * 
 * @param {Object[]} sections - Array of section objects
 * @param {string} sections[].id - Section element ID to scroll to
 * @param {string} sections[].label - Display label
 * @param {string} heroId - ID of hero element (nav hides when hero is visible)
 */
export default function TimelineNav({ sections, heroId = 'hero' }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const observersRef = useRef([])
  
  // Scroll to section
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 80 // Account for sticky nav
      const top = el.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])
  
  // Setup intersection observers
  useEffect(() => {
    // Observer for hero visibility (controls nav visibility)
    const heroEl = document.getElementById(heroId)
    if (heroEl) {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0]) {
            setIsVisible(!entries[0].isIntersecting)
          }
        },
        { threshold: 0.1 }
      )
      heroObserver.observe(heroEl)
      observersRef.current.push(heroObserver)
    }
    
    // Observer for section tracking
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sections.findIndex(s => s.id === entry.target.id)
            if (index !== -1) {
              setActiveIndex(index)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )
    
    sections.forEach(section => {
      const el = document.getElementById(section.id)
      if (el) {
        sectionObserver.observe(el)
      }
    })
    observersRef.current.push(sectionObserver)
    
    // Cleanup
    return () => {
      observersRef.current.forEach(observer => observer.disconnect())
      observersRef.current = []
    }
  }, [sections, heroId])
  
  // Calculate progress line width
  const progressWidth = sections.length > 1 
    ? (activeIndex / (sections.length - 1)) * 100 
    : 0
  
  return (
    <nav 
      className={`${styles.nav} ${isVisible ? styles.visible : ''}`}
      aria-label="Page sections"
    >
      <div className={styles.container}>
        {/* Background track */}
        <div className={styles.track} aria-hidden="true" />
        
        {/* Progress line */}
        <div 
          className={styles.progress} 
          style={{ width: `${progressWidth}%` }}
          aria-hidden="true"
        />
        
        {/* Section buttons */}
        <div className={styles.sections}>
          {sections.map((section, index) => (
            <button
              key={section.id}
              className={styles.sectionButton}
              onClick={() => scrollToSection(section.id)}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <span 
                className={`${styles.dot} ${index <= activeIndex ? styles.dotFilled : ''} ${index === activeIndex ? styles.dotActive : ''}`}
                aria-hidden="true"
              />
              <span 
                className={`${styles.label} ${index === activeIndex ? styles.labelActive : ''}`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
