'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './AnimatedElement.module.css'

/**
 * AnimatedElement — Fades in when scrolled into view.
 *
 * Props:
 *   children  — content to animate
 *   className — optional additional class(es)
 *   delay     — stagger delay in ms (default 0)
 *   tag       — HTML element to render (default 'div')
 */
export default function AnimatedElement({ children, className = '', delay = 0, tag: Tag = 'div' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
    )

    observer.observe(element)
    return () => {
      if (element) observer.unobserve(element)
      observer.disconnect()
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`${styles.animatedElement} ${isVisible ? styles.animatedElementVisible : ''} ${className}`}
      style={delay ? { '--stagger-delay': `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}