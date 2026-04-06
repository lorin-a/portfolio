'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const INTRO_KEY = 'hero-intro-played'

const HeroIntroContext = createContext({
  /** 'waiting' | 'playing' | 'transitioning' | 'done' */
  phase: 'done',
  triggerTransition: () => {},
})

export function useHeroIntro() {
  return useContext(HeroIntroContext)
}

/**
 * Provides hero intro state to Nav and Hero components.
 * Only activates on homepage, first visit per session,
 * and when reduced motion is not preferred.
 */
export function HeroIntroProvider({ children, isHomepage }) {
  const [phase, setPhase] = useState('done')

  useEffect(() => {
    if (!isHomepage) return
    const played = sessionStorage.getItem(INTRO_KEY)
    if (played) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    setPhase('waiting')
  }, [isHomepage])

  const triggerTransition = useCallback(() => {
    setPhase('transitioning')
    sessionStorage.setItem(INTRO_KEY, '1')
  }, [])

  const markDone = useCallback(() => {
    setPhase('done')
  }, [])

  return (
    <HeroIntroContext.Provider value={{ phase, setPhase, triggerTransition, markDone }}>
      {children}
    </HeroIntroContext.Provider>
  )
}
