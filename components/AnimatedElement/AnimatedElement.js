'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AnimatedElement.module.css'

/**
 * AnimatedElement — Fades in when scrolled into view.
 *
 * Wraps any content in a div that starts transparent and
 * translated down, then animates to visible when the element
 * enters the viewport. Observes once, then disconnects.
 *
 * Props:
 *   children  — content to animate
 *   className — optional additional class(es)
 */
export default function AnimatedElement({ children, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => {
      if (element) observer.unobserve(element)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`${styles.animatedElement} ${isVisible ? styles.animatedElementVisible : ''} ${className}`}
    >
      {children}
    </div>
  )
}