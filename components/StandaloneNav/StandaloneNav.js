'use client'

import { useState, useEffect } from 'react'
import styles from './StandaloneNav.module.css'

export default function StandaloneNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const vision = document.getElementById('vision')
    if (!vision) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          setVisible(true)
        }
        if (entry.isIntersecting || entry.boundingClientRect.top > 0) {
          setVisible(false)
        }
      },
      { threshold: 0 }
    )

    observer.observe(vision)
    return () => observer.disconnect()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
      <nav className={styles.nav} aria-label="Groundswell navigation">
        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg
            viewBox="0 0 20 24"
            fill="none"
            aria-hidden="true"
            className={styles.arrow}
          >
            <path
              d="M10 22V4M15 10l-5-6-5 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to top
        </button>
      </nav>
    </header>
  )
}
