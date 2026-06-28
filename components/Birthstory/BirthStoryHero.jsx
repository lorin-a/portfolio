'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import DeviceMockup from '@/components/CaseStudy/DeviceMockup'
import styles from './BirthStoryHero.module.css'

/* ============================================================================
   Birth Story — Mode B hero with the SIGNATURE move: gather.
   Scattered fragments (loved ones' messages + moments) drift in, then coalesce
   into the phone — the product thesis animated: a birth, pieced together by
   everyone who lived it. Every later beat echoes this gesture, smaller.
   Reduced motion: composed end state, no scatter, content visible.
   Copy is PROPOSED (from Lorin's words) — bless or replace.
   ============================================================================ */

// deterministic scatter offsets (px from centre) — no random, hydration-safe
const FRAGMENTS = [
  { label: 'a name', x: 0, y: -188, r: 0 },
  { label: '12:04 am', x: 168, y: -132, r: 6 },
  { label: 'first cry', x: 206, y: 36, r: 5 },
  { label: 'photo', x: 150, y: 168, r: -6 },
  { label: '“so proud”', x: -150, y: 162, r: 7 },
  { label: '♥', x: -212, y: 28, r: -4 },
  { label: '“we’re here”', x: -166, y: -126, r: -8 },
]

export default function BirthStoryHero() {
  const rootRef = useRef(null)
  const hookRef = useRef(null)
  const phoneRef = useRef(null)
  const cueRef = useRef(null)
  const fragsRef = useRef([])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let tl
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([hookRef.current, phoneRef.current, cueRef.current], { autoAlpha: 1, y: 0, scale: 1 })
        gsap.set(fragsRef.current, { autoAlpha: 0 })
        return
      }

      gsap.set(hookRef.current, { autoAlpha: 0, y: 26 })
      gsap.set(phoneRef.current, { autoAlpha: 0, y: 32, scale: 0.96 })
      gsap.set(cueRef.current, { autoAlpha: 0 })
      gsap.set(fragsRef.current, (i) => ({
        xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.92,
        x: FRAGMENTS[i].x, y: FRAGMENTS[i].y, rotate: FRAGMENTS[i].r,
      }))

      tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
      tl.to(hookRef.current, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.15)
        // fragments appear, scattered — and HOLD so they read
        .to(fragsRef.current, { autoAlpha: 0.95, scale: 1, duration: 0.6, stagger: 0.06 }, 0.55)
        // the phone settles in at centre, beneath the scattered fragments
        .to(phoneRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 0.9 }, 1.35)
        // …then the fragments gather into the phone (the signature move)
        .to(fragsRef.current, {
          x: 0, y: 0, rotate: 0, scale: 0.24, autoAlpha: 0,
          duration: 1.25, ease: 'power2.inOut', stagger: 0.05,
        }, 2.5)
        .to(cueRef.current, { autoAlpha: 1, duration: 0.6 }, '>-0.3')
    }, rootRef)

    // play on load, and replay each time the hero scrolls back into view
    let obs
    if (!reduce && tl) {
      obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) tl.restart() },
        { threshold: 0.5 }
      )
      obs.observe(rootRef.current)
    }

    return () => { obs?.disconnect(); ctx.revert() }
  }, [])

  return (
    <section ref={rootRef} className={styles.hero}>
      <div className={styles.col}>
        <p className={styles.kicker}>Birth Story · UX Research · UX Design · Healthcare</p>
        <h1 ref={hookRef} className={styles.hook}>
          A birth, <em>pieced together</em> by everyone who lived it.
        </h1>

        <div className={styles.stage}>
          <div className={styles.frags} aria-hidden="true">
            {FRAGMENTS.map((f, i) => (
              <span key={f.label} ref={(el) => (fragsRef.current[i] = el)} className={styles.frag}>
                {f.label}
              </span>
            ))}
          </div>
          <div ref={phoneRef} className={styles.phoneWrap}>
            <DeviceMockup
              width="240px"
              float={false}
              media="image"
              src="/images/birthstory/bs-home.png"
              alt="The Birth Story home screen: a chronological record of notes and journal entries."
              caption="Moments, gathered into one record."
            />
          </div>
        </div>

        <span ref={cueRef} className={styles.scrollCue} aria-hidden="true">scroll ↓</span>
      </div>
    </section>
  )
}
