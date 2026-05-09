'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.3 — The Signal lens.
   Lorin's hand-drawn funnel SVG. Bands cascade top-to-bottom in
   deepening lavender; glyphs fade in alongside their owning band. */

const SIGNAL_SRC = '/images/projects/whelm/Signal.svg'

export default function WhelmSignal() {
  const svgHostRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(SIGNAL_SRC)
      .then(r => r.text())
      .then(text => { if (!cancelled) setSvgMarkup(text) })
    return () => { cancelled = true }
  }, [])

  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    deps: [svgMarkup],
    build(tl, root) {
      const host = svgHostRef.current
      if (!host) return
      const svgEl = host.querySelector('svg')
      if (!svgEl) return

      svgEl.setAttribute('width', '100%')
      svgEl.setAttribute('height', '100%')
      svgEl.style.display = 'block'
      svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

      requestAnimationFrame(() => {
        try {
          const b = svgEl.getBBox()
          const pad = 8
          svgEl.setAttribute(
            'viewBox',
            `${b.x - pad} ${b.y - pad} ${b.width + pad * 2} ${b.height + pad * 2}`,
          )
        } catch {}
      })

      const bandColors = ['#49325D', '#895FAE', '#BDB7E9', '#F0E2FF']
      const bandPaths = bandColors.map(c => svgEl.querySelector(`path[fill="${c}"]`))
      const otherPaths = Array.from(svgEl.querySelectorAll('path'))
        .filter(p => !bandPaths.includes(p))

      gsap.set(bandPaths.filter(Boolean), { autoAlpha: 0, y: -16 })
      gsap.set(otherPaths, { autoAlpha: 0 })

      host.style.visibility = 'visible'

      if (prefersReducedMotion()) {
        gsap.set([...bandPaths.filter(Boolean), ...otherPaths], { autoAlpha: 1, y: 0 })
        snapClaim(root)
        return
      }

      const bandStart = revealClaim(tl, root)
      const bandStep = 0.3
      bandPaths.forEach((p, i) => {
        if (!p) return
        tl.to(p, {
          autoAlpha: 1, y: 0,
          duration: 0.85, ease: 'power2.out',
        }, bandStart + i * bandStep)
      })

      const zoneFor = (path) => {
        try {
          const b = path.getBBox()
          const cy = b.y + b.height / 2
          if (cy < 318) return 0
          if (cy < 498) return 1
          if (cy < 679) return 2
          return 3
        } catch { return 0 }
      }
      otherPaths.forEach(p => {
        const z = zoneFor(p)
        tl.to(p, {
          autoAlpha: 1,
          duration: 0.5, ease: 'power2.out',
        }, bandStart + z * bandStep + 0.35)
      })
    },
  })

  return (
    <StickySection ref={sectionRef} id="signal" track="medium" stage="grid">
      <div className={styles.lensSplit}>
        <div className={styles.signalStage}>
          <div
            ref={svgHostRef}
            className={styles.signalSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>

        <LensClaim
          className={styles.signalClaim}
          srText="Overwhelm is a signal. A message from the nervous system, asking for support."
          heading={<>Over<span className={styles.overwhelmKern}>w</span>helm is a <Accent>signal</Accent>.</>}
          body="A message from the nervous system, asking for support."
        />
      </div>
    </StickySection>
  )
}
