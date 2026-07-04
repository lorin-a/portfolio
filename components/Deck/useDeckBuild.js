'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

export function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* The deck's one motion contract — the case-study paused-timeline pattern with
   the trigger swapped from scroll to keypress. `build(tl)` composes the slide's
   beats and drops an addLabel('step-N') after each one. The stage owns which
   step is current; this hook tweens the timeline to that label when the slide is
   active, and parks it composed (or at zero) otherwise.

   - Forward through steps: smooth tweenTo the next label.
   - Reduced motion: the whole build resolves instantly, every step composed.
   - Leaving a slide backward: reset to 0 so re-entry rebuilds (slide-native). */
export function useDeckBuild({ scope, active, step, build, deps = [] }) {
  const tlRef = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })
    build(tl)
    tlRef.current = tl
    if (prefersReducedMotion()) tl.progress(1)
    return () => { tl.kill() }
  }, { scope, dependencies: deps })

  useEffect(() => {
    const tl = tlRef.current
    if (!tl) return

    if (prefersReducedMotion()) { tl.progress(1); return }

    if (!active) {
      // Park off-slides at the start so returning to them replays the build.
      tl.pause(0)
      return
    }

    const label = `step-${step}`
    if (tl.labels[label] === undefined) { tl.play(); return }
    tl.tweenTo(label, { overwrite: true })
  }, [active, step])
}
