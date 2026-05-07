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
   Each beat is one continuous gesture: the writer's hand lays down
   the question, lays down the squiggle alongside it, sets down the
   body that follows. Then — without leaving the page — the thought
   dissolves: chars rise back into the page, body rises with them,
   the squiggle unwrites itself in reverse, and the room lightens.
   The release of the old thought is what lets the dawn in. The new
   thought (Beat 2) emerges in the new light, reusing the same
   gesture vocabulary on cream.

   ─── Master timeline phases (scroll-scrubbed) ───
     Phase 1  Beat 1 reveal      chars descend → line draws → body lifts
     Phase 2  Dissolve + dawn    chars rise + body rises + line undraws
                                 + cream bloom rises (one envelope)
     Phase 3  Beat 2 reveal      chars descend → line draws → body lifts

   ─── Stroke ───
   Cursive-matched: 3-stop gradient (#4d1c7a → #8552B2 → #BDB7E9),
   4px non-scaling-stroke, round caps/joins, 0.92 opacity. Paths
   pre-hidden in markup with `pathLength="1"` + `strokeDasharray="1"`
   + `strokeDashoffset="1"` so they never FOUC. */

export default function WhelmNeed() {
  const sectionRef = useRef(null)

  useGSAP(
    () => {
      const root = sectionRef.current
      if (!root) return

      const pin = root.querySelector('[data-need-pin]')
      const beats = Array.from(root.querySelectorAll('[data-need-beat]'))
      if (!pin || beats.length !== 2) return

      const beat1Heading = beats[0].querySelector('[data-need-heading]')
      const beat2Heading = beats[1].querySelector('[data-need-heading]')
      const beat1LinePath = beats[0].querySelector('[data-need-line-svg] path')
      const beat2LinePath = beats[1].querySelector('[data-need-line-svg] path')
      const beat1Body = beats[0].querySelector('[data-need-body]')
      const beat2Body = beats[1].querySelector('[data-need-body]')

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches

      /* Initial state. `--dawn` (0→1) drives a radial cream bloom on
         the pin's ::before — bloom radius and opacity ramp together so
         the light expands from the upper-left (where the question is
         held) outward across the room. Both beat layers stay at
         autoAlpha 1 throughout; their individual elements (chars,
         body, line) carry the visibility state. */
      gsap.set(pin, { '--dawn': 0 })
      gsap.set([beats[0], beats[1]], { autoAlpha: 1 })
      gsap.set([beat1Body, beat2Body], { autoAlpha: 0, y: 14 })

      /* Force inline-style dashoffset on both line paths so any race
         between timeline creation and ScrollTrigger taking scrub
         control can't briefly reveal the line. Inline style overrides
         the attribute. */
      const linePaths = [beat1LinePath, beat2LinePath].filter(Boolean)
      gsap.set(linePaths, { strokeDashoffset: 1 })

      if (prefersReduced) {
        /* Reduced motion: skip animation, show Beat 2 final state. */
        gsap.set(pin, { '--dawn': 1 })
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
         Three phases. Reveal and dissolve use the same gesture
         vocabulary in reverse — chars descend on entry, rise on
         exit; line draws on entry, undraws on exit; body lifts on
         entry, drifts on exit. The dawn rises within the dissolve
         envelope, so the release of the old thought is what brings
         the light. */
      const tl = gsap.timeline({ paused: true })

      /* Phase 1 — Beat 1 reveal.
         Chars descend left-to-right; line draws ~0.15s behind, sharing
         the same `sine.out` so the letter rhythm and the ink rhythm
         feel like one hand. Body lifts at the line's tail. */
      tl.addLabel('beat1', 0)

      tl.to(
        split1.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: { each: 0.022, from: 'start' },
          ease: 'sine.out',
        },
        'beat1',
      )
      if (beat1LinePath) {
        tl.to(
          beat1LinePath,
          { strokeDashoffset: 0, duration: 1.6, ease: 'sine.out' },
          'beat1+=0.15',
        )
      }
      tl.to(
        beat1Body,
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'sine.out' },
        'beat1+=1.2',
      )

      /* Phase 2 — Dissolve into dawn (single envelope).
         The old thought releases: chars drift up and out, body lifts
         and dissolves, the line unwrites itself in reverse. As they
         release, the cream bloom rises from the upper-left across the
         room. The act of letting go *is* the dawn — same envelope,
         same easing curve, all landing within ~50ms of each other. */
      tl.addLabel('dissolve', 'beat1+=2.4')

      tl.to(
        split1.chars,
        {
          yPercent: -60,
          autoAlpha: 0,
          duration: 1.1,
          stagger: { each: 0.014, from: 'end' },
          ease: 'sine.inOut',
        },
        'dissolve',
      )
      tl.to(
        beat1Body,
        { autoAlpha: 0, y: -10, duration: 0.9, ease: 'sine.inOut' },
        'dissolve+=0.1',
      )
      if (beat1LinePath) {
        tl.to(
          beat1LinePath,
          { strokeDashoffset: 1, duration: 1.3, ease: 'sine.inOut' },
          'dissolve+=0.05',
        )
      }
      tl.to(
        pin,
        { '--dawn': 1, duration: 1.5, ease: 'power2.inOut' },
        'dissolve+=0.15',
      )

      /* Phase 3 — Beat 2 reveal in the new light.
         Identical relative offsets to Beat 1 (chars at label, line
         +0.15, body +1.2) so the new thought lays down with the same
         hand-rhythm. Begins as the dawn settles. */
      tl.addLabel('beat2', 'dissolve+=1.7')

      tl.to(
        split2.chars,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: { each: 0.022, from: 'start' },
          ease: 'sine.out',
        },
        'beat2',
      )
      if (beat2LinePath) {
        tl.to(
          beat2LinePath,
          { strokeDashoffset: 0, duration: 1.6, ease: 'sine.out' },
          'beat2+=0.15',
        )
      }
      tl.to(
        beat2Body,
        { autoAlpha: 1, y: 0, duration: 0.75, ease: 'sine.out' },
        'beat2+=1.2',
      )

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top top',
        end: '+=360%',
        pin: pin,
        pinSpacing: true,
        scrub: 0.3,
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
                pathLength="1"
                stroke="url(#needLineGradient)"
                strokeWidth="4"
                strokeOpacity="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1"
                strokeDashoffset="1"
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
                pathLength="1"
                stroke="url(#needLineGradient)"
                strokeWidth="4"
                strokeOpacity="0.92"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="1"
                strokeDashoffset="1"
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
