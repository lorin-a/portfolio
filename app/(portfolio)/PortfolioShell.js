'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { HeroIntroProvider } from '@/components/HeroIntroContext'
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'

/**
 * Client shell for the portfolio layout.
 * Wraps Nav, main content, and Footer with the HeroIntroProvider
 * so Nav and Hero can coordinate the cinematic entrance.
 *
 * Site-wide smooth scroll via Lenis. Lenis intercepts wheel/touch
 * events and smooths them without restructuring the DOM, so existing
 * ScrollTrigger animations work without modification. Reduced-motion
 * skips Lenis entirely.
 */
export default function PortfolioShell({ children }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const lenisRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    })
    lenisRef.current = lenis

    // Lenis ↔ ScrollTrigger sync: every scroll event updates ScrollTrigger.
    lenis.on('scroll', ScrollTrigger.update)

    // GSAP's ticker drives Lenis's RAF so they share one frame loop.
    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Expose on window for debugging + anchor-link scroll (e.g., hero CTA → #work).
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      lenisRef.current = null
      delete window.__lenis
    }
  }, [])

  return (
    <HeroIntroProvider isHomepage={isHomepage}>
      <Nav />
      <main id="main-content">
        {children}
      </main>
      <Footer />
    </HeroIntroProvider>
  )
}
