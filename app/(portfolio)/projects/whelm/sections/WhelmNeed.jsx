'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { lockForwardScroll } from '../lib/scrollLock'
import styles from '../whelm.module.css'

/* Section 2 — The Need. One sticky stage, three "What if" beats
   crossfade in place as the user scrolls. The viewport doesn't move;
   each question swaps out for the next.

   Reveal grammar — smooth, continuous, calm:
   - Each heading line is wiped open via clip-path animating from
     inset(... 100% ... 0) to inset(... 0% ... 0). One fluid motion,
     not per-char chunks.
   - A cursor element rides the wipe's right edge: its left position
     is bound to the same --reveal custom property the clip uses, so
     the cursor and the text edge advance in lockstep.
   - When line 1 finishes, its cursor fades; line 2's cursor lands
     and the second wipe begins.
   - Body fades up with translateY after the cursor on line 2 exits.

   Copy from Figma 255:358 / 255:359 / 255:361. */

const BEATS = [
  {
    id: 'not-a-problem',
    line1: 'What if overwhelm is not',
    line2: 'a problem to be solved?',
    body: [
      'Overwhelm is treated as a productivity issue that can be solved through self-management.',
      'This neglects the emotional experience beneath the surface.',
    ],
  },
  {
    id: 'messenger',
    line1: 'What if overwhelm offers us',
    line2: 'valuable information?',
    body: [
      'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem.',
      'It is a messenger.',
    ],
  },
  {
    id: 'invitation',
    line1: 'What if overwhelm is',
    line2: 'an invitation?',
    body: [
      'Overwhelm is an entry point for building a relationship with yourself, a companion for returning to what is real when your mind is on overdrive.',
    ],
  },
]

/* Per-char duration scaling — keeps the feel uniform across short
   ("an invitation?") and long ("Overwhelm offers us") lines. Bottom-
   capped so a 6-char line still has presence. Tuned slow on purpose:
   the wipe should read as breath, not as a typewriter race. */
function wipeDuration(text) {
  const perChar = 0.075
  const min = 1.4
  return Math.max(min, text.length * perChar)
}

export default function WhelmNeed() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const root = sectionRef.current
    if (!root) return

    const layers = root.querySelectorAll('[data-need-layer]')
    if (!layers.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* Build per-beat entrance timelines. One-shot — once a beat has
       wiped open, scrolling back keeps it composed; only the layer
       opacity toggles thereafter. */
    const entranceTimelines = Array.from(layers).map((layer, idx) => {
      const lineEls = layer.querySelectorAll('[data-need-line]')
      const cursorEls = layer.querySelectorAll('[data-need-cursor]')
      const bodyEl = layer.querySelector('[data-need-body]')
      const beat = BEATS[idx]

      if (prefersReduced) {
        lineEls.forEach(el => el.style.setProperty('--reveal', '0%'))
        gsap.set(cursorEls, { autoAlpha: 0 })
        gsap.set(bodyEl, { autoAlpha: 1, y: 0 })
        return { play: () => {}, kill: () => {} }
      }

      lineEls.forEach(el => el.style.setProperty('--reveal', '100%'))
      gsap.set(cursorEls, { autoAlpha: 0 })
      gsap.set(bodyEl, { autoAlpha: 0, y: 20 })

      const dur1 = wipeDuration(beat.line1)
      const dur2 = wipeDuration(beat.line2)

      const tl = gsap.timeline({ paused: true })

      /* Line 1 — cursor lands, then text wipes open in one motion.
         power2.inOut keeps the wipe calm at both edges. */
      tl.to(cursorEls[0], { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
      tl.to(
        lineEls[0],
        { '--reveal': '0%', duration: dur1, ease: 'power2.inOut' },
        '<+=0.1',
      )
      tl.to(cursorEls[0], { autoAlpha: 0, duration: 0.35, ease: 'power2.out' }, '+=0.15')

      /* Line 2 — italic mauve. Cursor fades in at the start of line 2
         while line 1's cursor exits; small overlap reads as the cursor
         hopping down. */
      tl.to(cursorEls[1], { autoAlpha: 1, duration: 0.35, ease: 'power2.out' }, '-=0.15')
      tl.to(
        lineEls[1],
        { '--reveal': '0%', duration: dur2, ease: 'power2.inOut' },
        '<+=0.1',
      )
      tl.to(cursorEls[1], { autoAlpha: 0, duration: 0.6, ease: 'power2.out' }, '+=0.4')

      /* Body — slow cinematic fade-up. Starts as the cursor finishes
         its exit so the question lands first; long duration + power1
         ease reads as a held breath rather than a snap. */
      tl.to(
        bodyEl,
        { autoAlpha: 1, y: 0, duration: 1.8, ease: 'power1.inOut' },
        '+=0.3',
      )

      return tl
    })

    if (prefersReduced) {
      gsap.set(layers, { autoAlpha: 1 })
      return
    }

    /* Layers stack atop each other; only one is fully visible at a
       time. First beat starts visible so the user lands on it as the
       sticky catches; later beats fade in over their slot. */
    gsap.set(layers, { autoAlpha: 0 })
    gsap.set(layers[0], { autoAlpha: 1 })

    const triggers = []
    const playedOnce = new Array(layers.length).fill(false)

    /* First beat plays its wipe-on as soon as the sticky stage is
       comfortably in the viewport. Observe the sticky (100vh, can
       reach 60% intersection) — observing the 400vh section directly
       would cap intersection ratio at 0.25 and never fire any
       threshold above that. */
    const stickyEl = root.querySelector('[data-need-sticky]')
    let releaseScroll = null
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !playedOnce[0]) {
          /* Hold the viewport in place until line 1 + line 2 + body
             have all landed. User cannot scroll past beat 1 mid-wipe. */
          releaseScroll = lockForwardScroll()
          const tl = entranceTimelines[0]
          tl.play()
          tl.then(() => {
            if (releaseScroll) {
              releaseScroll()
              releaseScroll = null
            }
          })
          playedOnce[0] = true
          firstObserver.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    if (stickyEl) firstObserver.observe(stickyEl)

    /* For each beat slot, a ScrollTrigger toggles which layer is
       opaque. Crossfade is symmetric — backscroll restores the prior
       beat. Section is 400vh tall with a 100vh sticky → 300vh of pin
       range, enough room for three slots. Beat i becomes active at
       roughly i * 100vh into the pin range. */
    for (let i = 1; i < layers.length; i++) {
      const layer = layers[i]
      const prev = layers[i - 1]

      const t = ScrollTrigger.create({
        trigger: root,
        start: () => `top top-=${i * window.innerHeight - window.innerHeight * 0.4}`,
        end: () => `top top-=${i * window.innerHeight + window.innerHeight * 0.5}`,
        onEnter: () => {
          gsap.to(prev, { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' })
          gsap.to(layer, { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' })
          if (!playedOnce[i]) {
            entranceTimelines[i].play()
            playedOnce[i] = true
          }
        },
        onLeaveBack: () => {
          gsap.to(layer, { autoAlpha: 0, duration: 0.7, ease: 'power2.inOut' })
          gsap.to(prev, { autoAlpha: 1, duration: 0.7, ease: 'power2.inOut' })
        },
      })
      triggers.push(t)
    }

    return () => {
      firstObserver.disconnect()
      if (releaseScroll) releaseScroll()
      triggers.forEach(t => t.kill())
      entranceTimelines.forEach(tl => tl.kill && tl.kill())
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="need" className={styles.needSection}>
      <div data-need-sticky="true" className={styles.needSticky}>
        {BEATS.map(beat => (
          <article
            key={beat.id}
            id={beat.id}
            data-need-layer="true"
            className={styles.needLayer}
            aria-labelledby={`${beat.id}-q`}
          >
            <p id={`${beat.id}-q`} className={styles.srOnly}>
              {beat.line1} {beat.line2}
            </p>

            <div className={styles.needComposition}>
              <h2 className={styles.needHeading} aria-hidden="true">
                <span className={styles.needLine} data-need-line>
                  <span className={styles.needLineText}>
                    {/* line1 always begins "What if overwhelm…" — the
                        Mackinac r→w pair needs the universal kern. */}
                    What if over<span className={styles.overwhelmKern}>w</span>helm{beat.line1.slice('What if overwhelm'.length)}
                  </span>
                  <span className={styles.needCursor} data-need-cursor aria-hidden="true" />
                </span>
                <span className={`${styles.needLine} ${styles.needLineAccent}`} data-need-line>
                  <span className={styles.needLineText}>{beat.line2}</span>
                  <span className={styles.needCursor} data-need-cursor aria-hidden="true" />
                </span>
              </h2>

              <div data-need-body className={styles.needBody}>
                {beat.body.map((p, i) => (
                  <p key={i} className={styles.needBodyP}>{p}</p>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
