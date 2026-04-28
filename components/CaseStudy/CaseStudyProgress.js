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
  const [hideOverActive, setHideOverActive] = useState(true)

  useEffect(() => {
    const doc = document.documentElement
    const themed = Array.from(document.querySelectorAll('[data-theme]'))

    const update = () => {
      const max = doc.scrollHeight - window.innerHeight
      const nextProgress = max > 0 ? (window.scrollY / max) * 100 : 0
      setProgress(nextProgress)

      /* Active themed section: first one whose top is in the upper
         portion of the viewport. Drives both color flip and the
         data-progress="hidden" suppression (used over the hero). */
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
      setHideOverActive(active?.getAttribute('data-progress') === 'hidden')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <ProgressNav
      scrollProgress={progress}
      isDark={isDark}
      isVisible={progress > 3 && !hideOverActive}
    />
  )
}
