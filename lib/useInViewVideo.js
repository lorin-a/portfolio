'use client'

import { forwardRef, useEffect, useRef } from 'react'

/**
 * Muted, looping clips play only while they are on screen (FS358, her
 * note: “Make sure any video auto-play is when I scroll to that section so
 * I don't miss the beginning, and pause when I leave the screen so it
 * does not run without me looking at it.”).
 *
 * Each time a clip comes into view it starts from the top; when it leaves,
 * it pauses. Under reduced motion nothing plays on its own: the first
 * frame shows and native controls let the viewer start it.
 */
export function useInViewVideo(ref, { threshold = 0.35, holdRef } = {}) {
  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      v.controls = true
      return
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        /* FS372: a clip the viewer paused stays paused */
        if (holdRef?.current) return
        try { v.currentTime = 0 } catch {}
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    }, { threshold })
    io.observe(v)
    return () => io.disconnect()
  }, [ref, threshold, holdRef])
}

/** A <video> that follows the rule above. Takes the usual video props. */
const InViewVideo = forwardRef(function InViewVideo({ src, threshold, holdRef, ...rest }, outerRef) {
  const ref = useRef(null)
  useInViewVideo(ref, { threshold, holdRef })
  const setRef = (el) => {
    ref.current = el
    if (typeof outerRef === 'function') outerRef(el)
    else if (outerRef) outerRef.current = el
  }
  return (
    <video ref={setRef} src={src && !src.includes('#') ? `${src}#t=0.1` : src}
      muted loop playsInline preload="metadata" {...rest} />
  )
})

export default InViewVideo
