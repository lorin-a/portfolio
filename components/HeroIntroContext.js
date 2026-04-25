'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const INTRO_KEY = 'hero-intro-played'

const HeroIntroContext = createContext({
  /** null (loading) | 'waiting' | 'playing' | 'transitioning' | 'done' */
  phase: null,
  triggerTransition: () => {},
})

export function useHeroIntro() {
  return useContext(HeroIntroContext)
}

/**
 * Provides hero intro state to Nav and Hero components.
 * Phase starts as null until client-side check completes.
 */
export function HeroIntroProvider({ children, isHomepage }) {
  const [phase, setPhase] = useState(null)

  useEffect(() => {
    const played = sessionStorage.getItem(INTRO_KEY)
    if (!isHomepage) {
      setPhase('done')
      return
    }
    if (played) {
      setPhase('done')
      return
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      setPhase('done')
      return
    }
    setPhase('waiting')
  }, [isHomepage])

  const triggerTransition = useCallback(() => {
    setPhase('transitioning')
    /* Don't set sessionStorage here — wait until the intro fully completes.
       This prevents React strict mode's double-fire from permanently
       marking the intro as played before it ever visually runs. */
  }, [])

  const markDone = useCallback(() => {
    setPhase('done')
    sessionStorage.setItem(INTRO_KEY, '1')
  }, [])

  /* Dev only: press Shift+R to reset and replay intro */
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return
    const onKey = (e) => {
      if (e.shiftKey && e.key === 'R') {
        sessionStorage.removeItem(INTRO_KEY)
        window.location.reload()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <HeroIntroContext.Provider value={{ phase, setPhase, triggerTransition, markDone }}>
      {children}
    </HeroIntroContext.Provider>
  )
}
