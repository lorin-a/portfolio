'use client'

/* revealClaim — the project-wide "text first" beat for lens sections.
   Heading wipes in (clip-path), body lifts behind it. Universal across
   Tangle/Signal/Portal so the case study has one tempo for the
   "claim arrives" moment. Returns the wall-clock time at which the
   beat ends so the consumer can chain the graphic reveal after it.

   Args:
     tl      — paused timeline from useStickyReveal
     root    — section root; helper queries for [data-claim-line] and
               [data-claim-body] inside it
     opts    — { start = 0 } position offset for the entire beat
   Returns:
     endTime — start + 1.3 (when the body has fully lifted) */

import gsap from 'gsap'

export function revealClaim(tl, root, { start = 0 } = {}) {
  const heading = root.querySelector('[data-claim-line]')
  const body = root.querySelector('[data-claim-body]')

  if (heading) heading.style.setProperty('--reveal', '100%')
  if (body) gsap.set(body, { autoAlpha: 0, y: 14 })

  if (heading) {
    tl.to(
      heading,
      { '--reveal': '0%', duration: 1.0, ease: 'power2.inOut' },
      start,
    )
  }
  if (body) {
    tl.to(
      body,
      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out' },
      start + 0.5,
    )
  }

  return start + 1.3
}

/* Reduced-motion: snap claim to its resolved state with no animation. */
export function snapClaim(root) {
  const heading = root.querySelector('[data-claim-line]')
  const body = root.querySelector('[data-claim-body]')
  if (heading) heading.style.setProperty('--reveal', '0%')
  if (body) {
    body.style.opacity = '1'
    body.style.transform = 'none'
    body.style.visibility = 'visible'
  }
}
