'use client'

import { useEffect, useState } from 'react'
import ProgressNav from '@/components/ProgressNav/ProgressNav'

/**
 * CaseStudyProgress — self-driving wrapper around ProgressNav.
 *
 * Tracks document scroll progress and watches `[data-theme]` sections
 * to flip the bar color over dark surfaces. Drop-in for any case study
 * that uses themed sections (HeroCinematic, StickyScene[data-theme="dark"],
 * etc.) — no parent state required.
 *
 * Hidden until ~3% scroll so it doesn't crowd the hero arrival.
 */
export default function CaseStudyProgress() {
  const [progress, setProgress] = useState(0)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const computeProgress = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const next = max > 0 ? (window.scrollY / max) * 100 : 0
      setProgress(next)
    }

    computeProgress()
    window.addEventListener('scroll', computeProgress, { passive: true })
    window.addEventListener('resize', computeProgress)

    /* Watch themed sections — first one whose top is in the upper half
       of the viewport sets the active theme. Falls back to dark when
       the cinematic hero is on screen. */
    const themed = Array.from(document.querySelectorAll('[data-theme]'))
    const updateTheme = () => {
      const probe = window.innerHeight * 0.4
      let active = themed[0]
      for (const el of themed) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= probe && rect.bottom > probe) {
          active = el
          break
        }
      }
      const theme = active?.getAttribute('data-theme') || 'light'
      setIsDark(theme === 'dark')
    }
    updateTheme()
    window.addEventListener('scroll', updateTheme, { passive: true })

    return () => {
      window.removeEventListener('scroll', computeProgress)
      window.removeEventListener('resize', computeProgress)
      window.removeEventListener('scroll', updateTheme)
    }
  }, [])

  return (
    <ProgressNav
      scrollProgress={progress}
      isDark={isDark}
      isVisible={progress > 3}
    />
  )
}
