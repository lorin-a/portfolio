'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import styles from '../whelm.module.css'

/* Section 2 — The Need.

   One sticky stage, one persistent question opener ("What if overwhelm
   is"), and three predicates that swap in below it as the user scrolls.
   The body paragraph swaps with each predicate.

   Reveal grammar:
   - Line 1 ("What if overwhelm is") wipes in once on entry, then stays.
   - Predicate (line 2) and body crossfade per beat. Predicate uses the
     same clip-path wipe as the rest of the section: prev predicate
     closes (--reveal 0% → 100%), new predicate opens (100% → 0%).
     Cursor rides the leading edge.
   - A scroll cue at the bottom of the sticky pulses while there are
     more beats to scroll to. */

const LINE_1 = 'What if overwhelm is'

const BEATS = [
  {
    id: 'not-a-problem',
    line2: 'not a problem to be solved?',
    body: [
      'Overwhelm is treated as a productivity issue that can be solved through self-management. This neglects the emotional experience beneath the surface.',
    ],
  },
  {
    id: 'messenger',
    line2: 'valuable information?',
    body: [
      'Overwhelm represents the tension between unmet needs and expectations, unfelt feelings and internalized beliefs. It is not a problem.',
      'It is a messenger.',
    ],
  },
  {
    id: 'invitation',
    line2: 'an invitation?',
    body: [
      'Overwhelm is an entry point for building a relationship with yourself, a companion for returning to what is real when your mind is on overdrive.',
    ],
  },
]

/* Per-char duration scaling — keeps the feel uniform across short
   ("an invitation?") and long ("not a problem to be solved?") lines. */
function wipeDuration(text) {
  const perChar = 0.045
  const min = 0.85
  return Math.max(min, text.length * perChar)
}

export default function WhelmNeed() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    const root = sectionRef.current
    if (!root) return

    const line1El = root.querySelector('[data-need-line-1]')
    const line1Cursor = root.querySelector('[data-need-line-1-cursor]')
    const predicateLayers = root.querySelectorAll('[data-need-predicate]')
    const bodyLayers = root.querySelectorAll('[data-need-body]')
    const scrollCue = root.querySelector('[data-need-scroll-cue]')

    if (!predicateLayers.length || !bodyLayers.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      line1El.style.setProperty('--reveal', '0%')
      gsap.set(line1Cursor, { autoAlpha: 0 })
      predicateLayers.forEach((layer, i) => {
        const cursor = layer.querySelector('[data-need-predicate-cursor]')
        layer.style.setProperty('--reveal', '0%')
        gsap.set(layer, { autoAlpha: i === 0 ? 1 : 0 })
        gsap.set(cursor, { autoAlpha: 0 })
      })
      bodyLayers.forEach((layer, i) => {
        gsap.set(layer, { autoAlpha: i === 0 ? 1 : 0, y: 0 })
      })
      gsap.set(scrollCue, { autoAlpha: 1 })
      return
    }

    /* Initial state — line 1 hidden, all predicate layers stacked but
       only beat 0 will animate in; bodies stacked but only beat 0 will
       fade in. Cursors all hidden until needed.

       --reveal is set on the .needLine layer (not the text child) so
       both the text (clip-path consumer) and the cursor (left position
       consumer) inherit the same value. Setting it on the text only
       would leave the cursor's left calculation reading the layer's
       default 100% — cursor would never track the wipe edge. */
    line1El.style.setProperty('--reveal', '100%')
    gsap.set(line1Cursor, { autoAlpha: 0 })
    predicateLayers.forEach(layer => {
      const cursor = layer.querySelector('[data-need-predicate-cursor]')
      layer.style.setProperty('--reveal', '100%')
      gsap.set(layer, { autoAlpha: 0 })
      gsap.set(cursor, { autoAlpha: 0 })
    })
    /* Beat 0's predicate layer needs to be visible (autoAlpha 1) so its
       wipe is seen — its text is still clipped via --reveal until the
       timeline plays it. */
    gsap.set(predicateLayers[0], { autoAlpha: 1 })
    gsap.set(bodyLayers, { autoAlpha: 0, y: 20 })
    gsap.set(scrollCue, { autoAlpha: 0 })

    /* ----- Entry timeline (beat 0) -----
       Line 1 wipes, then predicate cursor lands + wipes, then body
       fades up, then scroll cue pulses in. */
    const entryTl = gsap.timeline({ paused: true })

    const dur1 = wipeDuration(LINE_1)
    const beat0Layer = predicateLayers[0]
    const beat0Cursor = beat0Layer.querySelector('[data-need-predicate-cursor]')
    const dur2 = wipeDuration(BEATS[0].line2)

    entryTl
      .to(line1Cursor, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
      .to(line1El, { '--reveal': '0%', duration: dur1, ease: 'power2.inOut' }, '<+=0.05')
      .to(line1Cursor, { autoAlpha: 0, duration: 0.2, ease: 'power2.out' }, '-=0.05')
      .to(beat0Cursor, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' }, '-=0.05')
      .to(beat0Layer, { '--reveal': '0%', duration: dur2, ease: 'power2.inOut' }, '<+=0.05')
      .to(beat0Cursor, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, '+=0.15')
      .to(bodyLayers[0], { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out' }, '-=0.1')
      .to(scrollCue, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')

    /* ----- Per-beat predicate + body swap (i = 1, 2) -----
       Closes prev predicate (clip back to 100%), opens new (clip 100%
       → 0% with cursor in lead). Body crossfades. ScrollTriggers
       toggle bidirectionally so backscroll restores the prior beat. */
    const triggers = []
    const beatTimelines = []

    for (let i = 1; i < BEATS.length; i++) {
      const prevLayer = predicateLayers[i - 1]
      const nextLayer = predicateLayers[i]
      const nextCursor = nextLayer.querySelector('[data-need-predicate-cursor]')
      const dur = wipeDuration(BEATS[i].line2)

      const swapForward = gsap.timeline({ paused: true })
      swapForward
        /* 1. Question swaps first, fully. Close prev predicate (clip
           collapses from right), hide it, reveal next layer, cursor
           lands, new predicate wipes in, cursor exits. */
        .to(prevLayer, { '--reveal': '100%', duration: dur * 0.6, ease: 'power2.inOut' })
        .set(prevLayer, { autoAlpha: 0 })
        .set(nextLayer, { autoAlpha: 1 })
        .to(nextCursor, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
        .addLabel('predicate-wipe-in', '<+=0.05')
        .to(nextLayer, { '--reveal': '0%', duration: dur, ease: 'power2.inOut' }, 'predicate-wipe-in')
        .to(nextCursor, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, '+=0.15')
        /* 2. Paragraph swaps sequentially — old fades fully out before
           new fades in, so the two never overlap mid-crossfade in the
           shared grid cell. Fade-out kicks off while the new question
           is still wiping in, so the body is fresh by the time the
           reader's eye drops to it. */
        .to(bodyLayers[i - 1], { autoAlpha: 0, y: -12, duration: 0.4, ease: 'power2.in' }, `predicate-wipe-in+=${dur * 0.4}`)
        .to(bodyLayers[i], { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power1.out' })

      beatTimelines.push(swapForward)

      const t = ScrollTrigger.create({
        trigger: root,
        start: () => `top top-=${i * window.innerHeight - window.innerHeight * 0.4}`,
        end: () => `top top-=${i * window.innerHeight + window.innerHeight * 0.5}`,
        onEnter: () => {
          swapForward.play()
        },
        onLeaveBack: () => {
          /* Reverse the swap: prev predicate text reopens, layers
             revert, body crossfade reverses. Use the same timeline in
             reverse for symmetry. */
          swapForward.reverse()
        },
      })
      triggers.push(t)
    }

    /* ----- Scroll cue lifecycle -----
       Fade out on the final beat (no more to scroll to). */
    const lastBeatTrigger = ScrollTrigger.create({
      trigger: root,
      start: () => `top top-=${(BEATS.length - 1) * window.innerHeight - window.innerHeight * 0.4}`,
      end: () => `top top-=${(BEATS.length - 1) * window.innerHeight - window.innerHeight * 0.4 + 1}`,
      onEnter: () => gsap.to(scrollCue, { autoAlpha: 0, duration: 0.5, ease: 'power2.out' }),
      onLeaveBack: () => gsap.to(scrollCue, { autoAlpha: 1, duration: 0.5, ease: 'power2.out' }),
    })
    triggers.push(lastBeatTrigger)

    /* First beat plays its entry the moment the sticky is comfortably
       in the viewport. */
    const stickyEl = root.querySelector('[data-need-sticky]')
    let played = false
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          entryTl.play()
          played = true
          firstObserver.disconnect()
        }
      },
      { threshold: 0.6 },
    )
    if (stickyEl) firstObserver.observe(stickyEl)

    return () => {
      firstObserver.disconnect()
      triggers.forEach(t => t.kill())
      entryTl.kill()
      beatTimelines.forEach(tl => tl.kill())
    }
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="need" className={styles.needSection} aria-labelledby="need-heading">
      <p id="need-heading" className={styles.srOnly}>
        {BEATS.map(b => `${LINE_1} ${b.line2}`).join(' ')}
      </p>

      <div data-need-sticky="true" className={styles.needSticky}>
        <div className={styles.needComposition}>
          <h2 className={styles.needHeading} aria-hidden="true">
            {/* Persistent opener — wipes in once, then stays. */}
            <span className={styles.needLine} data-need-line-1>
              <span className={styles.needLineText}>
                What if over<span className={styles.overwhelmKern}>w</span>helm is
              </span>
              <span className={styles.needCursor} data-need-line-1-cursor aria-hidden="true" />
            </span>

            {/* Predicate slot — three layers stacked, one visible at a
                time. Each layer holds its own clipped text + cursor. */}
            <span className={styles.needPredicateSlot}>
              {BEATS.map(beat => (
                <span
                  key={beat.id}
                  data-need-predicate
                  className={`${styles.needLine} ${styles.needPredicateLayer} ${styles.needLineAccent}`}
                >
                  <span className={styles.needLineText} data-need-predicate-text>
                    {beat.line2}
                  </span>
                  <span className={styles.needCursor} data-need-predicate-cursor aria-hidden="true" />
                </span>
              ))}
            </span>
          </h2>

          {/* Body slot — three paragraphs stacked, one visible at a time. */}
          <div className={styles.needBodySlot}>
            {BEATS.map(beat => (
              <div key={beat.id} data-need-body className={styles.needBody}>
                {beat.body.map((p, i) => (
                  <p key={i} className={styles.needBodyP}>{p}</p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div data-need-scroll-cue className={styles.needScrollCue} aria-hidden="true">
          <svg viewBox="0 0 20 24" fill="none" aria-hidden="true">
            <path
              d="M10 2v18M5 14l5 6 5-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
