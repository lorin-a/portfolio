'use client'

import { useEffect, useState, useMemo } from 'react'
import styles from './Hero.module.css'
import InteractiveDial from '../InteractiveDial/InteractiveDial'

// Fixed duration for all lines (equal timing) - soft, readable pace
const LINE_DURATION = 1.65 // seconds per line
const OVERLAP = 0.35 // seconds of overlap between lines for continuous flow

export default function Hero() {
  const [started, setStarted] = useState(false)
  const [underlineVisible, setUnderlineVisible] = useState(false)
  const [ctaVisible, setCtaVisible] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Define lines with their text content for duration calculation
  const lines = useMemo(() => {
    const lineData = [
      { text: "I translate community wisdom" },
      { text: "into systems change" },
      { text: "through stories." },
    ]

    // Equal duration for most lines, longer line gets extra time
    // Line 1 "I translate community wisdom" is longest, needs more time to match pace
    let cumulativeDelay = 0
    return lineData.map((line, index) => {
      const duration = index === 0 ? LINE_DURATION + 0.8 : LINE_DURATION
      const delay = cumulativeDelay
      // Next line starts slightly before this one ends for continuous flow
      cumulativeDelay += duration - (index < lineData.length - 1 ? OVERLAP : 0)
      return { ...line, duration, delay }
    })
  }, [])

  // Calculate when last line finishes
  const lastLineEnd = lines[2].delay + lines[2].duration

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    if (mediaQuery.matches) {
      setStarted(true)
      setUnderlineVisible(true)
      setCtaVisible(true)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion) return

    const startTimer = setTimeout(() => setStarted(true), 900)
    // Underline appears shortly after the period shows
    const underlineTimer = setTimeout(() => setUnderlineVisible(true), 900 + (lastLineEnd * 1000) + 300)
    // CTA appears after a brief pause following the underline
    const ctaTimer = setTimeout(() => setCtaVisible(true), 900 + (lastLineEnd * 1000) + 1400)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(underlineTimer)
      clearTimeout(ctaTimer)
    }
  }, [prefersReducedMotion, lastLineEnd])

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className={styles.hero} id="hero">
      <InteractiveDial />

      {/* Headline as separate lines */}
      <h1 className={styles.headline}>
        {/* Line 1 */}
        <span className={`${styles.line} ${started ? styles.revealing : ''}`}
              style={{ '--line-delay': `${lines[0].delay}s`, '--line-duration': `${lines[0].duration}s` }}>
          I translate <span className={styles.olive}>community wisdom</span>
        </span>
        <br />
        {/* Line 2 */}
        <span className={`${styles.line} ${started ? styles.revealing : ''}`}
              style={{ '--line-delay': `${lines[1].delay}s`, '--line-duration': `${lines[1].duration}s` }}>
          into <span className={styles.plum}>systems change</span>
        </span>
        <br />
        {/* Line 3 */}
        <span className={`${styles.line} ${started ? styles.revealing : ''}`}
              style={{ '--line-delay': `${lines[2].delay}s`, '--line-duration': `${lines[2].duration}s` }}>
          through{' '}
          <span className={styles.storiesUnderline}>
            stories
            <svg
              className={`${styles.underlineSvg} ${underlineVisible ? styles.visible : ''}`}
              viewBox="0 0 120 10"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M3 8 C30 5, 60 3.5, 90 4.5 C105 5.2, 114 6.5, 117 7" />
            </svg>
          </span>
          .
        </span>
      </h1>

      <button
        className={`${styles.cta} ${ctaVisible ? styles.visible : ''}`}
        onClick={scrollToWork}
      >
        <span className={styles.ctaText}>See my work</span>
        <svg className={styles.ctaArrow} viewBox="0 0 20 24" fill="none" aria-hidden="true">
          <path d="M10 2v18M5 14l5 6 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </section>
  )
}
