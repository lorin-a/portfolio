'use client'

import { useEffect, useState } from 'react'
import styles from './ThemeToggle.module.css'

const STORAGE_KEY = 'theme-preference'

export default function ThemeToggle({ defaultTheme = 'dark' }) {
  const [theme, setTheme] = useState(defaultTheme)
  const [mounted, setMounted] = useState(false)

  /* Hydrate from localStorage, apply to DOM */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const initial = stored || defaultTheme
    setTheme(initial)
    document.documentElement.dataset.theme = initial
    setMounted(true)

    return () => {
      delete document.documentElement.dataset.theme
    }
  }, [defaultTheme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem(STORAGE_KEY, next)
  }

  const isDark = theme === 'dark'

  return (
    <button
      className={styles.toggle}
      onClick={toggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{ opacity: mounted ? 1 : 0 }}
    >
      {isDark ? (
        /* Sun icon — shown in dark mode, click to go light */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode, click to go dark */
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}
