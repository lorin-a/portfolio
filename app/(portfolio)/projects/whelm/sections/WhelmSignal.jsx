'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import styles from '../whelm.module.css'

gsap.registerPlugin(useGSAP)

/* Section 2.3 — The Signal lens.

   Lorin's hand-drawn Signal artwork (public/images/projects/whelm/
   Signal.svg) — a four-band downward funnel of escalating signal
   types in deepening lavender. Fetched at runtime, inlined, then
   bands reveal top-to-bottom: the first signal arrives, then deepens.

   ─── Pattern ───
   Cinematic-anchor sticky + paused timeline + IntersectionObserver
   play-once. Mirrors Tangle. */

const SIGNAL_SRC = '/images/projects/whelm/Signal.svg'

export default function WhelmSignal() {
  const sectionRef = useRef(null)
  const svgHostRef = useRef(null)
  const [svgMarkup, setSvgMarkup] = useState('')

  useEffect(() => {
    let cancelled = false
    fetch(SIGNAL_SRC)
      .then(r => r.text())
      .then(text => { if (!cancelled) setSvgMarkup(text) })
    return () => { cancelled = true }
  }, [])

  useGSAP(() => {
    const root = sectionRef.current
    const host = svgHostRef.current
    if (!root || !host) return

    const svgEl = host.querySelector('svg')
    if (!svgEl) return

    svgEl.setAttribute('width', '100%')
    svgEl.setAttribute('height', '100%')
    svgEl.style.display = 'block'
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet')

    /* Auto-crop the viewBox to actual content bounds. The hand-drawn
       SVG has internal whitespace (canvas padding around the funnel);
       cropping makes the funnel fill its column instead of floating
       small. Run after a tick so getBBox sees laid-out paths. */
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

    /* The artwork is composed of 4 large band paths (the funnel
       layers, fill colors going from deep #49325D at the top down
       to pale #F0E2FF at the bottom) plus interior glyph paths for
       the labels and numerals. Reveal the bands top-to-bottom by
       fill color order; fade the rest in alongside their owning band. */
    const bandColors = ['#49325D', '#895FAE', '#BDB7E9', '#F0E2FF']
    const bandPaths = bandColors.map(c => svgEl.querySelector(`path[fill="${c}"]`))
    const otherPaths = Array.from(svgEl.querySelectorAll('path'))
      .filter(p => !bandPaths.includes(p))

    const heading = root.querySelector('[data-signal-line]')
    const body = root.querySelector('[data-signal-body]')

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set(bandPaths.filter(Boolean), { autoAlpha: 0, y: -16 })
    gsap.set(otherPaths, { autoAlpha: 0 })
    if (heading) heading.style.setProperty('--reveal', '100%')
    gsap.set(body, { autoAlpha: 0, y: 14 })

    host.style.visibility = 'visible'

    if (prefersReduced) {
      gsap.set([...bandPaths.filter(Boolean), ...otherPaths], { autoAlpha: 1, y: 0 })
      if (heading) heading.style.setProperty('--reveal', '0%')
      gsap.set(body, { autoAlpha: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ paused: true })

    /* Text first — heading wipes in, body lifts right behind it.
       Both land before the graphic so the reader has the framing
       claim before any visual evidence arrives. */
    if (heading) {
      tl.to(heading, {
        '--reveal': '0%',
        duration: 1.0, ease: 'power2.inOut',
      }, 0)
    }
    tl.to(body, {
      autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out',
    }, 0.5)

    /* Diagram resolves last — bands cascade top-down once the text
       has settled. */
    const bandStart = 1.3
    const bandStep = 0.3
    bandPaths.forEach((p, i) => {
      if (!p) return
      tl.to(p, {
        autoAlpha: 1, y: 0,
        duration: 0.85, ease: 'power2.out',
      }, bandStart + i * bandStep)
    })

    /* Glyphs (labels/numerals) belong to whichever band they sit
       inside vertically. */
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl.play()
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(root.querySelector('[data-signal-sticky]'))

    return () => {
      observer.disconnect()
      tl.kill()
    }
  }, { dependencies: [svgMarkup], scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="signal"
      className={styles.signalSection}
    >
      <div data-signal-sticky="true" className={styles.signalSticky}>
        <div className={styles.signalStage}>
          <div
            ref={svgHostRef}
            className={styles.signalSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>

        <div className={styles.signalClaim}>
          <p className={styles.srOnly}>
            Overwhelm is a signal. A message from the nervous system, asking
            for support.
          </p>
          <h2 className={styles.signalHeading} aria-hidden="true">
            <span className={styles.signalLine} data-signal-line>
              <span className={styles.signalLineText}>
                Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
                <em className={styles.signalAccent}>signal</em>.
              </span>
            </span>
          </h2>
          <p data-signal-body className={styles.signalBody}>
            A message from the nervous system, asking for support.
          </p>
        </div>
      </div>
    </section>
  )
}
