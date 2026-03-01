'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './Squiggle.module.css'

export default function Squiggle({ color = "var(--color-ink-faint)" }) {
  const [offset, setOffset] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const lastScrollY = useRef(0)
  const ref = useRef(null)

  useEffect(() => {
    const root = document.documentElement
    const check = () => setIsDark(root.dataset.theme === 'dark')
    check()
    const observer = new MutationObserver(check)
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

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

      const rect = ref.current.getBoundingClientRect()
      const inViewport = rect.top < window.innerHeight && rect.bottom > 0

      if (!inViewport) {
        lastScrollY.current = window.scrollY
        return
      }

      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      setOffset(prev => prev - delta * 0.3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  return (
    <div className={styles.container} ref={ref}>
      <svg
        viewBox="0 0 1440 24"
        className={styles.svg}
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        {isDark && (
          <defs>
            <linearGradient id="squiggle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5CFA6" />
              <stop offset="50%" stopColor="#C7AAD1" />
              <stop offset="100%" stopColor="#F79C7E" />
            </linearGradient>
          </defs>
        )}
        <path
          d="M 0 12 Q 30 4, 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 T 540 12 T 600 12 T 660 12 T 720 12 T 780 12 T 840 12 T 900 12 T 960 12 T 1020 12 T 1080 12 T 1140 12 T 1200 12 T 1260 12 T 1320 12 T 1380 12 T 1440 12"
          fill="none"
          stroke={isDark ? "url(#squiggle-gradient)" : color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 5"
          style={{
            strokeDashoffset: offset,
          }}
        />
      </svg>
    </div>
  )
}
