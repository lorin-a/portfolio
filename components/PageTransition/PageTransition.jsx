'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from '@/lib/gsap'
import styles from './PageTransition.module.css'

/**
 * PageTransition — masks the dark↔light seam between the dark homepage and
 * the light case studies.
 *
 * The site flips `data-theme` on <html> the instant the route changes
 * (PortfolioShell), so a click used to snap from the dark home straight into
 * a bright case study. This component turns that snap into a brightening:
 * a full-screen veil fades in using the DESTINATION's background colour, the
 * route commits underneath while the field is solid (the theme swap is
 * invisible), then the veil dissolves to reveal the new page. Dark→light
 * reads as dawn; light→dark (back home) reads as dusk. It's a matched-field
 * crossfade — a fade, never a curtain.
 *
 * Only theme-crossing internal navigations get the wash. Same-theme moves
 * (case study → case study via ProjectNav) stay instant — no seam to hide.
 */

// Which theme a path renders under. Mirrors PortfolioShell's rule.
const themeForPath = (path) => (path === '/' ? 'dark' : 'light')

// The solid field we cover with — the destination's background, taken as a
// literal because the theme var still resolves to the *current* theme while
// the cover is playing. Kept in sync with --color-cream in globals.css.
const FIELD = { dark: '#252525', light: '#FBF9F6' }

const COVER = 0.38 // brighten/dim in — slightly quicker, the lights coming up
const REVEAL = 0.56 // settle into the new page — slower, an exhale

export default function PageTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const veilRef = useRef(null)
  // Holds the in-flight transition's destination theme between the cover
  // completing (router.push) and the new pathname committing (reveal).
  const pendingRef = useRef(null)
  const lastPathRef = useRef(pathname)
  const safetyRef = useRef(null)

  // Intercept internal navigations that cross the dark/light seam.
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = e.target.closest?.('a[href]')
      if (!anchor) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return

      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin) return
      // Same document (hash jump, or re-click of current page) — let it be.
      if (url.pathname === window.location.pathname) return

      const from = themeForPath(window.location.pathname)
      const to = themeForPath(url.pathname)
      if (from === to) return // no seam to cross — Next handles it instantly

      // Pre-empt Next's <Link>: it bails when the click is already defaulted.
      e.preventDefault()
      cover(url.pathname + url.search + url.hash, to)
    }

    // Capture phase so we run before <Link>'s own click handler.
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [router])

  const cover = (href, destTheme) => {
    const veil = veilRef.current
    if (!veil) {
      router.push(href)
      return
    }
    pendingRef.current = { destTheme }
    veil.style.background = FIELD[destTheme]
    veil.style.pointerEvents = 'auto' // freeze interaction while we cross over

    gsap.killTweensOf(veil)
    gsap.fromTo(
      veil,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: COVER,
        ease: 'power2.inOut',
        onComplete: () => {
          router.push(href)
          // If the route never commits (blocked nav, error), don't strand
          // the viewer behind an opaque veil — force a reveal.
          safetyRef.current = window.setTimeout(() => {
            if (pendingRef.current) reveal()
          }, 1500)
        },
      },
    )
  }

  const reveal = () => {
    pendingRef.current = null
    if (safetyRef.current) {
      window.clearTimeout(safetyRef.current)
      safetyRef.current = null
    }
    const veil = veilRef.current
    if (!veil) return
    gsap.killTweensOf(veil)
    gsap.to(veil, {
      autoAlpha: 0,
      duration: REVEAL,
      ease: 'power2.out',
      onComplete: () => {
        veil.style.pointerEvents = 'none'
      },
    })
  }

  // Reveal once the destination route has actually committed. PortfolioShell
  // sets the theme on this same tick; the veil is fully opaque, so the swap
  // underneath is never seen.
  useEffect(() => {
    if (lastPathRef.current === pathname) return
    lastPathRef.current = pathname
    if (pendingRef.current) reveal()
  }, [pathname])

  return <div ref={veilRef} className={styles.veil} aria-hidden="true" />
}
