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
 * Smooth scroll via Lenis on case study / non-home routes. Lenis is
 * intentionally disabled on the homepage because it desyncs the hero's
 * top-pinned ScrollTrigger (the pin spacer is created but the pin never
 * actually engages, so the user can scroll past the hero into blank
 * space). The homepage uses native scroll + ScrollTrigger.normalizeScroll
 * (set inside HeroScatter) instead. Reduced-motion skips Lenis entirely.
 */
export default function PortfolioShell({ children }) {
  const pathname = usePathname()
  const isHomepage = pathname === '/'
  const lenisRef = useRef(null)

  // Homepage uses dark tokens (scoped via data-theme on <html>). The inline
  // script in layout.js sets this on first paint to avoid a flash; this
  // effect keeps it in sync for client-side navigation between routes.
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isHomepage) {
      document.documentElement.dataset.theme = 'dark'
    } else {
      delete document.documentElement.dataset.theme
    }
  }, [isHomepage])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    // Skip Lenis on the homepage — see component comment above.
    if (isHomepage) return

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
  }, [isHomepage])

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
