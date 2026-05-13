'use client'

import { useEffect, useRef, useState } from 'react'

/* useInlineSvg — fetch a public-path SVG, inline it via
   dangerouslySetInnerHTML, and prepare it for animation.

   Why inline (vs <img>): we need to manipulate individual paths —
   set strokeDasharray, animate per-band fills, query by color. <img>
   gives us a black box. Inline gives us the DOM tree.

   What this owns:
     - Fetch + setState lifecycle
     - Setting width/height/preserveAspectRatio on the root <svg>
     - Auto-cropping the viewBox to actual content bounds (the
       hand-drawn exports have internal canvas padding)
     - visibility: hidden initial state on the host (prevents a flash
       of fully-composed artwork between mount and the section's
       useGSAP hook running)

   What the section owns:
     - When to flip host visibility back on (after gsap.set initial-
       state runs)
     - Any color/path manipulation
     - The actual animation timeline

   Usage:
     const { hostRef, markup } = useInlineSvg('/brand/Tangle.svg', {
       autoCrop: true, padding: 24,
       strip: text => text.replace(/<rect[^>]*fill="#1F0536"[^>]*\/>\s* /i, ''),
     })

     // inside useStickyReveal build:
     const svgEl = hostRef.current?.querySelector('svg')
     // ...manipulate, animate, then:
     hostRef.current.style.visibility = 'visible'

   Render:
     <div ref={hostRef} dangerouslySetInnerHTML={{ __html: markup }} />

   The section MUST pass `markup` to the timeline via the deps array
   on useStickyReveal so the build callback re-runs once the SVG has
   been parsed into the DOM. */

export function useInlineSvg(src, { autoCrop = true, padding = 16, strip } = {}) {
  const hostRef = useRef(null)
  const [markup, setMarkup] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then(r => r.text())
      .then(text => {
        if (cancelled) return
        const cleaned = strip ? strip(text) : text
        setMarkup(cleaned)
      })
    return () => { cancelled = true }
  }, [src, strip])

  useEffect(() => {
    if (!markup) return
    const host = hostRef.current
    if (!host) return
    const svg = host.querySelector('svg')
    if (!svg) return

    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.style.display = 'block'
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    if (autoCrop) {
      requestAnimationFrame(() => {
        try {
          const b = svg.getBBox()
          svg.setAttribute(
            'viewBox',
            `${b.x - padding} ${b.y - padding} ${b.width + padding * 2} ${b.height + padding * 2}`,
          )
        } catch {}
      })
    }
  }, [markup, autoCrop, padding])

  return { hostRef, markup }
}
