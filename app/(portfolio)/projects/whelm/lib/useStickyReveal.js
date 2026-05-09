'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* useStickyReveal — the case-study's one motion contract.
   Every post-hero section animates the same way:

     1. Build a paused GSAP timeline.
     2. Watch the sticky stage with IntersectionObserver.
     3. When it crosses the threshold, play the timeline once and
        disconnect. No reverse on backscroll. No scrub.

   The hook owns the dance. Sections own the choreography.

   Usage:
     const { sectionRef } = useStickyReveal({
       triggerSelector: '[data-sticky]',
       threshold: 0.5,
       build(tl, root) {
         tl.to(...).to(...)
       },
       deps: [someAsyncDependency],
     })

   The build callback runs inside useGSAP, so cleanups (split.revert(),
   etc.) happen automatically when the component unmounts. The callback
   may return a cleanup fn for anything not registered with useGSAP.

   Reduced motion: the hook does not branch — sections compose their
   own reduced-motion fallback before calling build. This is deliberate:
   each section has different "resolved state" semantics (Reveal shows
   only the right half; Tangle shows everything; Gap hides the cursor).
   A generic fallback would lie. */

import { useRef } from 'react'

export function useStickyReveal({
  triggerSelector = '[data-sticky]',
  threshold = 0.5,
  build,
  deps = [],
} = {}) {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return
      const trigger = root.querySelector(triggerSelector)
      if (!trigger) return

      const tl = gsap.timeline({ paused: true })
      const cleanup = build?.(tl, root)

      let played = false
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !played) {
            played = true
            tl.play()
            observer.disconnect()
          }
        },
        { threshold },
      )
      observer.observe(trigger)

      return () => {
        observer.disconnect()
        tl.kill()
        if (typeof cleanup === 'function') cleanup()
      }
    },
    { dependencies: deps, scope: sectionRef },
  )

  return { sectionRef }
}

/* Helper: returns true if the user wants reduced motion.
   Sections call this synchronously inside build() to branch. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
