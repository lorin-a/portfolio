'use client'

import gsap from 'gsap'

import LensClaim, { Accent } from '../components/LensClaim'
import { StickySection } from '../components/StickySection'
import { revealClaim, snapClaim } from '../lib/revealClaim'
import { useStickyReveal, prefersReducedMotion } from '../lib/useStickyReveal'
import styles from '../whelm.module.css'

/* Section 2.3 — The Signal lens.

   Concentric-rings diagram (rebuilt 2026-05-14, replacing the funnel).
   The Signal lens names overwhelm as a message from the nervous system
   — the diagram shows its anatomy in three layers:

     Outer ring (plum)    : Stimulus — what lands. External pressures.
     Middle ring (orchid) : Response — survival strategies, internal.
     Core (pale lavender) : Overwhelm itself, sitting underneath both,
                            protruding through the bottom of the middle
                            ring to suggest it isn't contained by either
                            layer — it's the substrate beneath them.

   No explicit "external / internal" labels. The temporal reveal teaches
   the hierarchy: outer ring lands first, then its words drift in from
   the centre outward; middle ring lands, then its words; finally the
   core arrives with a soft bounce.

   Words sit on circular arcs spanning 240° around the upper portion of
   each ring (8 o'clock around the top to 4 o'clock), leaving the lower
   quadrant empty so the core can protrude cleanly below. */

/* Words distribute around the full circle. Top arc holds the louder /
   more immediate pressures and responses; bottom arc holds the
   quieter ones underneath. Both arcs use the upper-half / lower-half
   of their respective rings so every word stays inside ~70° of either
   the top or the bottom — keeping all chars upright relative to the
   viewer. */
const OUTER_TOP = [
  { text: 'Overstimulation', offset: '15%' },
  { text: 'Deadlines',       offset: '50%' },
  { text: 'Expectations',    offset: '85%' },
]
const OUTER_BOTTOM = [
  { text: 'Intrusive Thoughts',     offset: '25%' },
  { text: 'Challenging Experience', offset: '75%' },
]

const INNER_TOP = [
  { text: 'Inner Critic', offset: '15%' },
  { text: 'Numbing',      offset: '50%' },
  { text: 'Avoidance',    offset: '85%' },
]
const INNER_BOTTOM = [
  { text: 'Over-analyzing', offset: '28%' },
  { text: 'Dissociation',   offset: '72%' },
]

/* Top arc — endpoints at ±halfAngle from 12 o'clock, traversed CW (the
   path goes over the top, L → R). Text rendered "above" the baseline
   sits outside the curve. At the top of the arc that's upward = up
   relative to the viewer, so chars read normally. */
function arcPath(cx, cy, r, halfAngleDeg) {
  const a = (halfAngleDeg * Math.PI) / 180
  const startX = cx - r * Math.sin(a)
  const endX = cx + r * Math.sin(a)
  const y = cy - r * Math.cos(a)
  const largeArc = halfAngleDeg > 90 ? 1 : 0
  return `M ${startX} ${y} A ${r} ${r} 0 ${largeArc} 1 ${endX} ${y}`
}

/* Bottom arc — endpoints at ±halfAngle from 6 o'clock, traversed CCW
   so the path runs L → R along the bottom of the circle. At the bottom,
   the CCW tangent points right (east), and "above" the baseline points
   inward (toward circle centre = upward to the viewer). Chars read
   right-side up. */
function arcPathBottom(cx, cy, r, halfAngleDeg) {
  const a = (halfAngleDeg * Math.PI) / 180
  // Start at lower-LEFT (so the path traversed CCW lands at lower-right).
  // CCW from lower-left going via the bottom = sweep flag 0 in SVG.
  const startX = cx - r * Math.sin(a)
  const endX = cx + r * Math.sin(a)
  const y = cy + r * Math.cos(a)
  const largeArc = halfAngleDeg > 90 ? 1 : 0
  return `M ${startX} ${y} A ${r} ${r} 0 ${largeArc} 0 ${endX} ${y}`
}

export default function WhelmSignal() {
  const { sectionRef } = useStickyReveal({
    threshold: 0.5,
    build(tl, root) {
      const outerRing = root.querySelector('[data-signal-ring="outer"]')
      const middleRing = root.querySelector('[data-signal-ring="middle"]')
      const coreRing = root.querySelector('[data-signal-ring="core"]')
      const outerWords = root.querySelectorAll('[data-signal-outer-word]')
      const innerWords = root.querySelectorAll('[data-signal-inner-word]')
      const coreWord = root.querySelector('[data-signal-core-word]')

      const rings = [outerRing, middleRing].filter(Boolean)
      const allWords = [...outerWords, ...innerWords, coreWord].filter(Boolean)

      gsap.set(rings, { autoAlpha: 0 })
      gsap.set(coreRing, { autoAlpha: 0, attr: { r: 80 } })
      gsap.set(allWords, { autoAlpha: 0, y: 6 })

      if (prefersReducedMotion()) {
        gsap.set(rings, { autoAlpha: 1 })
        gsap.set(coreRing, { autoAlpha: 1, attr: { r: 110 } })
        gsap.set(allWords, { autoAlpha: 1, y: 0 })
        snapClaim(root)
        return
      }

      // Words appear one at a time, in spatial order along each arc.
      // Cadence: ~0.32s between each word's start. Each word fades in
      // over 0.5s, so consecutive words overlap slightly — reads as a
      // gentle "naming" rhythm, not a strict beat-by-beat reveal.
      const wordStep = 0.32
      const wordDur = 0.5

      const claimEnd = revealClaim(tl, root)
      tl.addLabel('ringsIn', `+=${0.2}`)

      // Outer ring lands first.
      tl.to(
        outerRing,
        { autoAlpha: 1, duration: 0.75, ease: 'power2.out' },
        'ringsIn',
      )
      // Then its words, sequentially.
      outerWords.forEach((w, i) => {
        tl.to(
          w,
          { autoAlpha: 0.95, y: 0, duration: wordDur, ease: 'power2.out' },
          `ringsIn+=${0.55 + i * wordStep}`,
        )
      })

      // Middle ring lands after the last outer word starts its fade.
      const outerWordsEnd = 0.55 + outerWords.length * wordStep
      tl.to(
        middleRing,
        { autoAlpha: 1, duration: 0.75, ease: 'power2.out' },
        `ringsIn+=${outerWordsEnd}`,
      )
      innerWords.forEach((w, i) => {
        tl.to(
          w,
          { autoAlpha: 0.95, y: 0, duration: wordDur, ease: 'power2.out' },
          `ringsIn+=${outerWordsEnd + 0.4 + i * wordStep}`,
        )
      })

      // Core lands with a soft bounce — the moment the diagram settles.
      const innerWordsEnd = outerWordsEnd + 0.4 + innerWords.length * wordStep
      tl.to(
        coreRing,
        {
          autoAlpha: 1,
          attr: { r: 110 },
          duration: 0.75,
          ease: 'back.out(1.7)',
        },
        `ringsIn+=${innerWordsEnd + 0.1}`,
      )
      tl.to(
        coreWord,
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out' },
        `ringsIn+=${innerWordsEnd + 0.35}`,
      )
    },
  })

  return (
    <StickySection ref={sectionRef} id="signal" track="medium" stage="grid">
      <div className={styles.lensSplit}>
        <LensClaim
          className={styles.signalClaim}
          srText="Overwhelm is a signal. A message from the nervous system, asking for support."
          heading={
            <>
              Over<span className={styles.overwhelmKern}>w</span>helm is a{' '}
              <Accent>signal</Accent>.
            </>
          }
          body="A message from the nervous system, asking for support."
        />

        <div className={styles.signalStage}>
          <svg
            viewBox="0 0 800 800"
            preserveAspectRatio="xMidYMid meet"
            className={styles.signalSvg}
            aria-hidden="true"
          >
            <defs>
              {/* Word arcs span 240° across the top of each ring (clock
                  8 to clock 4), leaving the lower 120° empty so words
                  never rotate past readable. r_outer and r_inner sit
                  text just inside each ring's stroke. */}
              {/* Outer ring (r=380) — top arc over the upper half,
                  bottom arc under the lower half. Both at the same
                  radius for ring symmetry. */}
              <path
                id="signal-outer-arc-top"
                d={arcPath(400, 400, 345, 70)}
                fill="none"
              />
              <path
                id="signal-outer-arc-bot"
                d={arcPathBottom(400, 400, 345, 65)}
                fill="none"
              />
              {/* Inner ring (r=250) — top and bottom arcs at r=215. */}
              <path
                id="signal-inner-arc-top"
                d={arcPath(400, 400, 215, 70)}
                fill="none"
              />
              <path
                id="signal-inner-arc-bot"
                d={arcPathBottom(400, 400, 215, 65)}
                fill="none"
              />
            </defs>

            {/* Outline rings — strokes only, no fill — read as a
                structural diagram rather than a bullseye target. The
                core is the only solid shape, anchoring the centre. */}
            <circle
              data-signal-ring="outer"
              cx="400" cy="400" r="380"
              fill="none"
              stroke="var(--whelm-mauve)"
              strokeWidth="1.5"
              strokeOpacity="0.55"
            />
            <circle
              data-signal-ring="middle"
              cx="400" cy="400" r="250"
              fill="none"
              stroke="var(--whelm-mauve)"
              strokeWidth="1.5"
              strokeOpacity="0.75"
            />
            <circle
              data-signal-ring="core"
              cx="400" cy="400" r="80"
              fill="var(--whelm-mauve)"
              stroke="var(--whelm-cream)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />

            <g>
              {OUTER_TOP.map(w => (
                <text
                  key={w.text}
                  data-signal-outer-word
                  textAnchor="middle"
                  className={styles.signalOuterWord}
                >
                  <textPath href="#signal-outer-arc-top" startOffset={w.offset}>
                    {w.text}
                  </textPath>
                </text>
              ))}
              {OUTER_BOTTOM.map(w => (
                <text
                  key={w.text}
                  data-signal-outer-word
                  textAnchor="middle"
                  className={styles.signalOuterWordSmall}
                >
                  <textPath href="#signal-outer-arc-bot" startOffset={w.offset}>
                    {w.text}
                  </textPath>
                </text>
              ))}
            </g>

            <g>
              {INNER_TOP.map(w => (
                <text
                  key={w.text}
                  data-signal-inner-word
                  textAnchor="middle"
                  className={styles.signalInnerWord}
                >
                  <textPath href="#signal-inner-arc-top" startOffset={w.offset}>
                    {w.text}
                  </textPath>
                </text>
              ))}
              {INNER_BOTTOM.map(w => (
                <text
                  key={w.text}
                  data-signal-inner-word
                  textAnchor="middle"
                  className={styles.signalInnerWordSmall}
                >
                  <textPath href="#signal-inner-arc-bot" startOffset={w.offset}>
                    {w.text}
                  </textPath>
                </text>
              ))}
            </g>

            <text
              data-signal-core-word
              x="400" y="412"
              textAnchor="middle"
              className={styles.signalCoreWord}
            >
              Overwhelm
            </text>
          </svg>
        </div>
      </div>
    </StickySection>
  )
}
