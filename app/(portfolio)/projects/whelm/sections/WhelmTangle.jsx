'use client'

import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useInlineSvg } from '../lib/useInlineSvg'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.4 — The Tangle. "Overwhelm is a tangle."

   Lorin's new hand-drawn tangle (2026-05-13) is a single continuous
   cream thread with mauve nodules at the crossings and cream word
   labels scattered along the line. Animation:

     1. Claim wipes in (text first per project convention).
     2. The thread draws on.
     3. As the drawing tip reaches each marker, dots and labels fade
        in spatially-timed — so each item appears as if the pencil
        reached it, not on a parallel stagger.

   SVG palette (from public/brand/NewTangle-5-13.svg):
     - fill="#1F0536" — bg rect (stripped)
     - stroke="#F3EFF7" — the thread (cream)
     - fill="#BDB7E9" — mauve crossing nodules
     - fill="#F3EFF7" — cream word labels */

const TANGLE_SRC = '/brand/NewTangle-5-13.svg'

/* The new NewTangle-5-13.svg has no full-canvas bg rect (page bg comes
   from CSS). Don't strip anything — the six rect elements that DO exist
   are pill-shape label backgrounds, not artifacts. The one rect with
   fill="#1F0536" is the "Self Expression / Self Doubt" pill; the other
   five are exported without a fill and need one applied at runtime so
   the thread doesn't show through. */

export default function WhelmTangle() {
  const { hostRef: svgHostRef, markup: svgMarkup } = useInlineSvg(TANGLE_SRC, {
    padding: 24,
  })

  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    deps: [svgMarkup],
    build(tl, root) {
      const host = svgHostRef.current
      if (!host) return
      const svgEl = host.querySelector('svg')
      if (!svgEl) return

      const creamStroked = Array.from(
        svgEl.querySelectorAll('path[stroke="#F3EFF7"]'),
      )
      const creamFills = Array.from(
        svgEl.querySelectorAll('path[fill="#F3EFF7"]'),
      )
      const mauveFills = Array.from(
        svgEl.querySelectorAll('path[fill="#BDB7E9"]'),
      )
      /* The six label-background pills. Force-fill them with the bg
         color so the thread doesn't show through, regardless of what
         the export gave each rect. */
      const pills = Array.from(svgEl.querySelectorAll('rect'))
      pills.forEach(r => r.setAttribute('fill', '#1F0536'))

      /* The longest stroked path is the thread. Anything else stroked
         is decor (small tendrils, accents). */
      const thread = creamStroked.length
        ? creamStroked.reduce((a, b) =>
            a.getTotalLength() >= b.getTotalLength() ? a : b,
          )
        : null
      const decor = creamStroked.filter(p => p !== thread)

      /* Stacking order: thread (bottom) → pills → mauve dots →
         cream label text (top). Reorder via appendChild — last
         appended renders on top. */
      const reorder = el => el && svgEl.appendChild(el)
      pills.forEach(reorder)
      mauveFills.forEach(reorder)
      creamFills.forEach(reorder)

      // Initial state — thread invisible (dashoffset = length), all
      // other elements hidden.
      if (thread) {
        const len = thread.getTotalLength()
        thread.style.strokeDasharray = `${len}`
        thread.style.strokeDashoffset = `${len}`
      }
      gsap.set([...decor, ...creamFills, ...mauveFills, ...pills], { autoAlpha: 0 })

      host.style.visibility = 'visible'

      if (prefersReducedMotion()) {
        if (thread) thread.style.strokeDashoffset = '0'
        gsap.set([...decor, ...creamFills, ...mauveFills, ...pills], { autoAlpha: 1 })
        snapClaim(root)
        return
      }

      /* Sample the thread at N points so we can time each marker's
         fade-in by its closest point along the path's progress. */
      const sampleThread = (path, samples = 240) => {
        if (!path) return []
        const total = path.getTotalLength()
        const pts = []
        for (let i = 0; i <= samples; i++) {
          const p = path.getPointAtLength((i / samples) * total)
          pts.push({ x: p.x, y: p.y, t: i / samples })
        }
        return pts
      }
      const closestT = (samples, cx, cy) => {
        let bestT = 0
        let bestD = Infinity
        for (const p of samples) {
          const d = (p.x - cx) ** 2 + (p.y - cy) ** 2
          if (d < bestD) {
            bestD = d
            bestT = p.t
          }
        }
        return bestT
      }
      const centerOf = el => {
        const b = el.getBBox()
        return { cx: b.x + b.width / 2, cy: b.y + b.height / 2 }
      }

      const samples = sampleThread(thread)

      // Detect if the path's natural direction reads right-to-left so
      // the visual draw motion (and label timing) reverses to match.
      const reversed =
        samples.length > 0 &&
        samples[0].x > samples[samples.length - 1].x

      if (thread && reversed) {
        const len = thread.getTotalLength()
        thread.style.strokeDashoffset = `-${len}`
      }

      const drawDuration = 4.4 // one continuous pass over the whole thread
      const claimEnd = revealClaim(tl, root)
      const drawStart = claimEnd + 0.4

      // Thread draws on.
      if (thread) {
        const len = thread.getTotalLength()
        tl.fromTo(
          thread,
          { strokeDashoffset: reversed ? -len : len },
          { strokeDashoffset: 0, duration: drawDuration, ease: 'power1.inOut' },
          drawStart,
        )
      }

      // Helper — fade a node in at its position along the draw timeline.
      const timeAtPoint = t =>
        drawStart + (reversed ? 1 - t : t) * drawDuration

      // Decor tendrils — small accents, fade as the tip reaches them.
      decor.forEach(el => {
        const { cx, cy } = centerOf(el)
        const t = closestT(samples, cx, cy)
        tl.to(
          el,
          { autoAlpha: 1, duration: 0.5, ease: 'power2.out' },
          timeAtPoint(t),
        )
      })

      // Mauve nodules — back.out so each pops into place lightly.
      mauveFills.forEach(el => {
        const { cx, cy } = centerOf(el)
        const t = closestT(samples, cx, cy)
        tl.to(
          el,
          { autoAlpha: 1, duration: 0.45, ease: 'back.out(1.6)' },
          timeAtPoint(t),
        )
      })

      // Pills + their cream word labels — fade together, spatially-
      // timed by the pill's center along the thread. The pill arrives
      // a hair before its label so the badge "lands" then the word
      // settles inside it.
      pills.forEach(pill => {
        const { cx, cy } = centerOf(pill)
        const t = closestT(samples, cx, cy)
        tl.to(
          pill,
          { autoAlpha: 1, duration: 0.55, ease: 'power2.out' },
          timeAtPoint(t),
        )
      })

      creamFills.forEach(el => {
        const { cx, cy } = centerOf(el)
        const t = closestT(samples, cx, cy)
        tl.to(
          el,
          { autoAlpha: 1, duration: 0.55, ease: 'power2.out' },
          timeAtPoint(t) + 0.12,
        )
      })
    },
  })

  return (
    <StickySection ref={sectionRef} id="tangle" track="long" stage="grid">
      <div className={styles.tangleSticky}>
        <LensClaim
          className={styles.tangleClaim}
          srText="Overwhelm is a tangle. Where unmet needs and internalized expectations clash."
          heading={
            <>
              Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
              <Accent>tangle</Accent>.
            </>
          }
          body="Where unmet needs and internalized expectations clash."
        />

        <div className={styles.tangleStage}>
          <div
            ref={svgHostRef}
            className={styles.tangleSvgHost}
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      </div>
    </StickySection>
  )
}
