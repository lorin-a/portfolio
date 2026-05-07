'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

import styles from '../whelm.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

/* Section 2 — The Need.

   ─── Concept ───
   The line is the writer's hand. The horizon is the dawn.

   One pinned viewport. Two beats overlay the same composition. As the
   reader scrolls, a soft cream "dawn" descends from the top of the
   viewport (animated linear-gradient stops with a feather zone) — no
   hard color edge. While the dawn descends, a hand-drawn bridge
   squiggle draws across the dissolving frame.

   ─── Type + line coordination ───
   Headings split into per-character masked chars. Each char drops in
   from above (yPercent: -100 → 0, autoAlpha 0 → 1) with a left-to-
   right stagger that physically maps to the squiggle's left-to-right
   draw direction. Both heading chars and squiggle path use the same
   `power2.out` easing and overlap in time, so the letters and the
   line read as one continuous gesture — the writer's hand laying
   down ink left-to-right while the squiggle traces below.

   ─── Master timeline phases (scroll-scrubbed) ───
     Phase 1  Beat 1 reveal    chars descend → squiggle draws → body
     Phase 2  Dawn transition  cream gradient descends + bridge draws
                               + Beat 1 fades + Beat 2 prepared
     Phase 3  Beat 2 reveal    same gesture, on cream

   ─── Squiggle stroke ───
   Cursive-matched: 3-stop gradient (#4d1c7a → #8552B2 → #BDB7E9),
   4px stroke with non-scaling-stroke, round caps + joins, 0.9 opacity. */

export default function WhelmNeed() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const pin = root.querySelector('[data-need-pin]')
      const beats = Array.from(root.querySelectorAll('[data-need-beat]'))
      const bridge = root.querySelector('[data-need-bridge]')
      if (!pin || beats.length !== 2) return

      const beat1Heading = beats[0].querySelector('[data-need-heading]')
      const beat2Heading = beats[1].querySelector('[data-need-heading]')
      const beat1LinePath = beats[0].querySelector('[data-need-line-svg] path')
      const beat2LinePath = beats[1].querySelector('[data-need-line-svg] path')
      const beat1Body = beats[0].querySelector('[data-need-body]')
      const beat2Body = beats[1].querySelector('[data-need-body]')
      const bridgePaths = bridge
        ? Array.from(bridge.querySelectorAll('path'))
        : []

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      /* Hide all squiggle paths before reveal (strokeDashoffset = total
         length means nothing is drawn yet). */
      const hidePath = (p) => {
        if (!p) return
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.strokeDashoffset = `${len}`
      }
      hidePath(beat1LinePath)
      hidePath(beat2LinePath)
      bridgePaths.forEach(hidePath)

      /* Initial state. The dawn gradient sits above the viewport
         (--horizon-start: -30%, --horizon-end: -10%) so the bg reads
         as fully dark on entry. Both beat layers stay at autoAlpha
         1 throughout — Beat 2 stays "invisible" because its
         individual elements (chars, body, line path) are each in
         their own hidden state. Only Beat 1's *layer* fades out
         during dawn, eliminating the ghosty mid-state from before. */
      gsap.set(pin, {
        '--horizon-start': '-30%',
        '--horizon-end': '-10%',
      })
      gsap.set([beats[0], beats[1]], { autoAlpha: 1 })
      gsap.set([beat1Body, beat2Body], { autoAlpha: 0, y: 16 })

      if (prefersReduced) {
        /* Reduced motion: skip animation, show Beat 2 final state. */
        gsap.set(pin, { '--horizon-start': '110%', '--horizon-end': '130%' })
        gsap.set(beats[0], { autoAlpha: 0 })
        gsap.set(beat2Body, { autoAlpha: 1, y: 0 })
        if (beat2LinePath) beat2LinePath.style.strokeDashoffset = '0'
        return
      }

      /* SplitText each heading into chars within line-level masks.
         Line masks clip vertically (chars descend through them) but
         leave horizontal room for italic Mackinac glyph overhang. */
      const split1 = SplitText.create(beat1Heading, {
        type: 'lines, chars',
        mask: 'lines',
      })
      const split2 = SplitText.create(beat2Heading, {
        type: 'lines, chars',
        mask: 'lines',
      })

      /* Chars start above their line masks (hidden) — they'll descend
         into place during reveal. yPercent: -100 hides them above the
         mask boundary; the mask wrapper has overflow:hidden so they're
         invisible until they enter their slot. */
      gsap.set([...split1.chars, ...split2.chars], {
        yPercent: -100,
        autoAlpha: 0,
      })

      /* ─── Master timeline (scroll-scrubbed) ───
         Three labels anchor each phase. Phase 1 and Phase 3 use
         IDENTICAL relative offsets from their label so the chars
         and squiggle share the same coordination in both beats. */
      const tl = gsap.timeline()

      /* Phase 1 — Beat 1 reveal. Chars descend left-to-right while
         the squiggle draws in parallel (line offset +0.15s from
         chars, both `power2.out`). Body fades up at the line's tail. */
      tl.addLabel('beat1', 0)

      tl.to(
        split1.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: { each: 0.022, from: 'start' },
          ease: 'power2.out',
        },
        'beat1',
      )
      if (beat1LinePath) {
        tl.to(
          beat1LinePath,
          { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' },
          'beat1+=0.15',
        )
      }
      tl.to(
        beat1Body,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out' },
        'beat1+=1.15',
      )

      /* Phase 2 — Dawn transition.
         Sequential body crossfade (no ghosty mid-state):
         - 0.0s  Beat 1 layer starts fading out
         - 0.4s  Dawn gradient begins descending
         - 0.5s  Bridge starts drawing across the dissolving frame
         - 1.0s  Beat 1 layer fully invisible
         - 1.6s  Bridge mostly drawn
         - 2.2s  Dawn fully descended; cream bg complete
         Beat 2's layer stays at autoAlpha 1 throughout — its
         individual elements (chars/body/line) hold the visibility. */
      tl.addLabel('dawn', 'beat1+=2.2')

      tl.to(
        beats[0],
        { autoAlpha: 0, duration: 1.0, ease: 'power1.in' },
        'dawn',
      )

      tl.to(
        pin,
        {
          '--horizon-start': '110%',
          '--horizon-end': '130%',
          duration: 1.8,
          ease: 'power1.inOut',
        },
        'dawn+=0.4',
      )

      if (bridgePaths.length) {
        tl.to(
          bridgePaths,
          { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' },
          'dawn+=0.5',
        )
      }

      /* Phase 3 — Beat 2 reveal (overlaps late dawn).
         Chars start descending at 'dawn+=1.9' — while the bridge
         is still completing its last 0.2s and the dawn is still
         settling. Closes the dead zone the audit flagged.

         Critically: identical relative offsets from 'beat2' label
         to those used in 'beat1' (chars at 0, line at +0.15, body
         at +1.15) so the char-to-line coordination feels exactly
         the same in Beat 1 and Beat 2. */
      tl.addLabel('beat2', 'dawn+=1.9')

      tl.to(
        split2.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.85,
          stagger: { each: 0.022, from: 'start' },
          ease: 'power2.out',
        },
        'beat2',
      )
      if (beat2LinePath) {
        tl.to(
          beat2LinePath,
          { strokeDashoffset: 0, duration: 1.5, ease: 'power2.out' },
          'beat2+=0.15',
        )
      }
      tl.to(
        beat2Body,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power1.out' },
        'beat2+=1.15',
      )

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=480%',
        pin: pin,
        pinSpacing: true,
        scrub: 0.8,
        animation: tl,
        invalidateOnRefresh: true,
      })

      return () => {
        trigger.kill()
        tl.kill()
        split1.revert()
        split2.revert()
      }
    },
    { scope: sectionRef },
  )

  return (
    <section
      ref={sectionRef}
      id="need"
      className={styles.needWrap}
      aria-labelledby="need-heading"
    >
      <h2 id="need-heading" className={styles.srOnly}>
        What if overwhelm is not a problem to be solved? But a messenger
        communicating the tension between unmet needs and expectations,
        unfelt feelings and internalized beliefs. What if overwhelm is
        an invitation? To return to what is real when the mind is on
        overdrive. An entry point for self inquiry and compassion.
      </h2>

      <div data-need-pin className={styles.needPin}>
        {/* Shared gradient defs for all squiggles. */}
        <svg
          aria-hidden="true"
          className={styles.needGradientHost}
          width="0"
          height="0"
        >
          <defs>
            <linearGradient
              id="needLineGradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop offset="0" stopColor="#4d1c7a" />
              <stop offset="0.4" stopColor="#8552B2" />
              <stop offset="0.85" stopColor="#BDB7E9" />
            </linearGradient>
            <linearGradient
              id="needBridgeGradient"
              x1="1"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0" stopColor="#4d1c7a" />
              <stop offset="0.4" stopColor="#8552B2" />
              <stop offset="0.85" stopColor="#BDB7E9" />
            </linearGradient>
          </defs>
        </svg>

        {/* ─── Beat 1 — overlaid on dawn-gradient bg, cream text ─── */}
        <div
          data-need-beat="1"
          className={`${styles.needBeat} ${styles.needBeatDark}`}
        >
          <div className={styles.needBeatInner}>
            <p
              data-need-heading
              className={styles.needHeading}
              aria-hidden="true"
            >
              <span className={styles.needHeadingLine}>
                What if over
                <span className={styles.overwhelmKern}>w</span>helm is{' '}
                <em className={styles.needHeadingItalic}>not</em>
              </span>
              <span
                className={`${styles.needHeadingLine} ${styles.needHeadingItalic} ${styles.needHeadingAccent}`}
              >
                a problem to be solved?
              </span>
            </p>

            <svg
              data-need-line-svg
              className={styles.needLineSvg}
              viewBox="0 0 645.168 288.321"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 1C1 15.2966 2.72539 52.1333 10.6452 72.4979C18.995 93.9679 51.6265 113.973 90.1554 127.647C150.94 149.218 196.361 127.504 216.406 118.129C224.58 114.306 229.783 105.219 234.646 97.6277C238.783 91.1683 239.141 79.758 238.473 66.9468C238.192 61.5712 235.984 58.6855 233.1 56.7352C220.197 48.0078 201.693 55.1015 186.902 60.6378C177.689 64.0863 169.569 71.3905 162.965 78.0078C157.731 83.2529 156.864 93.2816 157.062 104.682C157.367 122.28 185.785 144.134 203.082 158.035C216.853 169.103 259.764 168.287 306.941 159.717C330.967 155.352 371.681 138.949 410.95 131.808C485.246 118.298 529.628 125.613 544.08 129.632C582.216 140.238 613.514 167.293 636.519 192.105C644.302 206.872 646.3 227.81 641.8 250.546C639.157 258.552 634.931 270.58 630.577 287.321"
                stroke="url(#needLineGradient)"
                strokeWidth="4"
                strokeOpacity="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <p
              data-need-body
              className={styles.needBody}
              aria-hidden="true"
            >
              But a messenger communicating the tension between unmet
              needs and expectations, unfelt feelings and internalized
              beliefs.
            </p>
          </div>
        </div>

        {/* ─── Bridge — anchored to viewport center, draws during dawn ─── */}
        <svg
          data-need-bridge
          className={styles.needBridge}
          viewBox="0 0 785.636 388.457"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M783.636 2C783.391 2 752.637 11.3363 702.799 27.0582C676.323 35.4105 643.038 56.4755 594.155 89.6022C551.972 118.188 528.561 148.504 510.215 172.945C468.567 228.426 469.879 269.332 474.703 287.836C476.486 294.678 486.796 294.526 493.158 295.507C499.215 296.442 505.005 294.484 510.827 290.196C518.884 284.262 523.057 274.163 525.935 265.618C528.951 256.664 526.1 246.559 522.482 237.701C519.133 229.501 512.008 223.863 503.741 217.834C492.559 209.678 479.244 205.469 433.809 199.981C393.79 195.147 318.814 191.057 278.526 188.479C225.558 185.089 201.04 194.708 163.595 214.637C141.243 226.534 110.244 248.359 77.3165 268.558C47.3685 286.929 19.2491 333.77 8.94534 354.095C7.39317 358.636 5.67544 364.544 4.47614 369.969C3.27684 375.394 2.64802 380.156 2.00016 386.457"
            stroke="url(#needBridgeGradient)"
            strokeWidth="4"
            strokeOpacity="0.92"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* ─── Beat 2 — overlaid on cream-gradient bg, deep purple text ─── */}
        <div
          data-need-beat="2"
          className={`${styles.needBeat} ${styles.needBeatCream}`}
        >
          <div className={styles.needBeatInner}>
            <p
              data-need-heading
              className={styles.needHeading}
              aria-hidden="true"
            >
              <span className={styles.needHeadingLine}>
                What if over
                <span className={styles.overwhelmKern}>w</span>helm is
              </span>
              <span
                className={`${styles.needHeadingLine} ${styles.needHeadingItalic} ${styles.needHeadingAccent}`}
              >
                an invitation?
              </span>
            </p>

            <svg
              data-need-line-svg
              className={styles.needLineSvg}
              viewBox="0 0 909.896 239.866"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M38.0503 1.00004C34.7988 5.12567 22.7227 27.2052 10.0144 69.1491C-5.49443 120.336 2.80079 153.161 7.10215 170.742C10.996 186.657 30.255 198.996 64.9042 215.34C115.46 239.187 165.184 224.052 197.222 213.874C234.408 202.06 258.671 166.646 267.739 151.426C274.042 140.847 274.519 124.548 275.006 110.432C275.335 100.91 270.93 95.0359 266.816 90.3763C262.299 85.2618 255.899 82.6166 249.467 81.1262C235.425 77.8729 221.575 86.2205 208.757 96.7127C191.673 110.697 189.935 129.006 188.456 158.632C187.456 178.668 213.512 197.378 249.308 218.641C279.372 236.498 329.37 238.109 354.624 238.846C373.078 239.384 391.603 229.218 423.592 210.082C449.736 194.443 494.122 163.723 526.185 144.198C574.989 114.478 612.121 103.221 646.179 94.9773C677.335 87.4357 718.066 88.6838 758.558 90.4975C800.861 92.3922 853.755 124.267 884.785 148.151C898.793 171.157 905.68 193.782 908.501 206.488C908.896 210.132 908.896 214.342 908.896 218.68"
                stroke="url(#needLineGradient)"
                strokeWidth="4"
                strokeOpacity="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <p
              data-need-body
              className={styles.needBody}
              aria-hidden="true"
            >
              To return to what is real when the mind is on overdrive.
              An entry point for self inquiry and compassion.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
