'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { IaFinal } from '../IaDiagrams'
import s from './fourToZero.module.css'

/* Aria 3 — the 4→0 collapse. The page's central design argument, played once:
   the four onboarding questions of V1 are struck and removed one by one (the
   strike wears the crit color — feedback removing things, the page's standing
   grammar), the counter ticks down with a gentle accelerando (removal feels
   liberating, not violent), and what shipped lands: nothing to answer before
   beginning. Reduced motion shows the ended argument. */

const QUESTIONS = [
  'What phase in your birth story are you currently in?',
  'Where are you? Home / Hospital / Other',
  'Where are you in the process?',
  'Who is with you?',
]

export default function FourToZero() {
  const rootRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const q = gsap.utils.selector(root)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add(s.done)
      return
    }

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
    const pills = q('[data-z="pill"]')
    const strikes = q('[data-z="strike"]')
    const digits = q('[data-z="digit"]')
    gsap.set(pills, { autoAlpha: 0, y: 14 })
    gsap.set(strikes, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(digits, { autoAlpha: 0, yPercent: 40 })
    gsap.set(digits[0], { autoAlpha: 1, yPercent: 0 }) // "4"
    gsap.set(q('[data-z="label"]'), { autoAlpha: 0 })
    gsap.set(q('[data-z="landing"]'), { autoAlpha: 0, y: 16, scale: 0.98 })
    gsap.set(q('[data-z="landingCap"]'), { autoAlpha: 0 })

    /* the questions arrive — the wall a tired parent met */
    tl.to(pills, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 }, 0)
    tl.to(q('[data-z="label"]'), { autoAlpha: 1, duration: 0.4 }, 0.4)

    /* strike and remove, one by one, gently speeding up */
    const gaps = [1.4, 1.15, 0.95, 0.8]
    let t = 1.6
    QUESTIONS.forEach((_, i) => {
      tl.to(strikes[i], { scaleX: 1, duration: 0.32, ease: 'power1.inOut' }, t)
      tl.to(pills[i], { autoAlpha: 0, y: 10, duration: 0.45, ease: 'power1.in' }, t + 0.4)
      /* the counter ticks: old digit lifts away, the next settles in */
      tl.to(digits[i], { autoAlpha: 0, yPercent: -40, duration: 0.3, ease: 'power1.in' }, t + 0.42)
      tl.to(digits[i + 1], { autoAlpha: 1, yPercent: 0, duration: 0.38 }, t + 0.55)
      t += gaps[i]
    })

    /* what shipped lands: nothing to answer before beginning */
    tl.to(q('[data-z="zero"]'), { scale: 1.06, duration: 0.5, ease: 'sine.inOut', yoyo: true, repeat: 1 }, t + 0.1)
    tl.to(q('[data-z="landing"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.7 }, t + 0.5)
    tl.to(q('[data-z="landingCap"]'), { autoAlpha: 1, duration: 0.6 }, t + 1.0)

    tlRef.current = tl
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { tl.play(); io.disconnect() }
    }, { threshold: 0.45 })
    io.observe(root)
    return () => { io.disconnect(); tl.kill() }
  }, [])

  const replay = () => { const tl = tlRef.current; if (tl) { tl.pause(0); tl.play(0) } }

  return (
    <div ref={rootRef} className={s.root}>
      <div className={s.stage}>
        <div className={s.pills}>
          {QUESTIONS.map((question) => (
            <p key={question} className={s.pill} data-z="pill">
              {question}
              <span className={s.strike} data-z="strike" aria-hidden="true" />
            </p>
          ))}
        </div>
        <div className={s.counter} data-z="zero" aria-hidden="true">
          <span className={s.digits}>
            {['4', '3', '2', '1', '0'].map((d) => (
              <span key={d} className={s.digit} data-z="digit">{d}</span>
            ))}
          </span>
          <span className={s.counterLabel} data-z="label">questions before the first entry</span>
        </div>
      </div>
      {/* accessible summary of what the animation argues */}
      <p className={s.srOnly}>
        Version one asked four onboarding questions before a parent could begin. Testing removed
        all of them: the final app opens with nothing to answer.
      </p>
      <figure className={s.landing} data-z="landing">
        <IaFinal />
        <figcaption className={s.landingCap} data-z="landingCap">
          What shipped: five tabs, a single add button at center, nothing to answer before beginning.
        </figcaption>
      </figure>
      <button type="button" className={s.replay} onClick={replay}>↺ replay</button>
    </div>
  )
}
