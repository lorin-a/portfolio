'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Squiggle.module.css'

export default function Squiggle({ color = "var(--color-green-dark)" }) {
  const [offset, setOffset] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const lastScrollY = useRef(0)
  const ref = useRef(null)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handleChange = (e) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  useEffect(() => {
    if (prefersReducedMotion) return
    
    lastScrollY.current = window.scrollY
    
    const handleScroll = () => {
      if (!ref.current) return
      
      // Check if squiggle is in viewport
      const rect = ref.current.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0
      
      if (!inViewport) {
        lastScrollY.current = window.scrollY
        return
      }
      
      // Calculate scroll delta and direction
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY
      
      // Adjust offset based on scroll direction
      // Positive delta (scroll down) = move right (decrease offset)
      // Negative delta (scroll up) = move left (increase offset)
      setOffset(prev => prev - delta * 0.3)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])
  
  return (
    <div className={styles.container} ref={ref}>
      <svg 
        width="120" 
        height="20" 
        viewBox="0 0 120 20"
        className={styles.svg}
        aria-hidden="true"
      >
        <path
          d="M 0 10 Q 15 3, 30 10 T 60 10 T 90 10 T 120 10"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 5"
          style={{
            strokeDashoffset: offset
          }}
        />
      </svg>
    </div>
  )
}