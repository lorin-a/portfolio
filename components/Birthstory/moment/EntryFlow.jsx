'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './entryFlow.module.css'

/* Moment study 02 — "The entry."
   The first screen test of the artifact-led grammar (N7, blessed 2026-08-03):
   the artifact is the content, text is a caption, motion is only the product's
   own behavior. The app opens straight into the timeline (no menu, no
   onboarding maze); one tap later the Care Pod is there. Two devices end
   composed: the home that arrives instantly + the depth one tap away.
   Copy is verbatim — the tester line and Lorin's shipped-answer line, both
   carried from the V1 draft. Play-once; reduced motion sees the composed
   scene. */

export default function EntryFlow({ embedded = false }) {
  const stageRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const q = gsap.utils.selector(stage)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // CSS leaves the composed scene fully visible

    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
    tlRef.current = tl

    /* initial states (JS-only, so no-JS and reduced-motion see the finished scene) */
    gsap.set(q('[data-m="home"]'), { autoAlpha: 0, y: 26 })
    gsap.set(q('[data-m="heard"], [data-m="built"]'), { autoAlpha: 0, y: 12 })
    gsap.set(q('[data-m="ring"]'), { autoAlpha: 0, scale: 0.5 })
    gsap.set(q('[data-m="pod"]'), { autoAlpha: 0, x: 90 })

    /* the product's own behavior, fast: you open it, you're in; one tap, the pod */
    tl.to(q('[data-m="home"]'), { autoAlpha: 1, y: 0, duration: 0.5 }, 0)
      .to(q('[data-m="heard"]'), { autoAlpha: 1, y: 0, duration: 0.35 }, 0.15)
      .to(q('[data-m="built"]'), { autoAlpha: 1, y: 0, duration: 0.35 }, 0.5)
      .to(q('[data-m="ring"]'), { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.95)
      .to(q('[data-m="ring"]'), { autoAlpha: 0, scale: 1.7, duration: 0.3, ease: 'power1.out' }, 1.13)
      .to(q('[data-m="pod"]'), { autoAlpha: 1, x: 0, duration: 0.45 }, 1.1)

    let played = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true
          tl.play()
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(stage)
    return () => {
      io.disconnect()
      tl.kill()
    }
  }, [])

  const replay = () => {
    if (tlRef.current) tlRef.current.restart()
  }

  return (
    <section ref={stageRef} className={s.stage} aria-label="Screen test: the entry flow">
      <div className={s.grid}>
        <p className={s.kicker}>Screen test 02 · The entry</p>
        <div className={s.caption}>
          <div data-m="heard">
            <p className={s.tag}>heard</p>
            <blockquote className={s.quote}>
              <p>“Onboarding is nice, but too many buttons and options. Too many menus.”</p>
            </blockquote>
          </div>
          <div data-m="built">
            <p className={s.tag}>built</p>
            <p className={s.claim}>Open straight into notes on a timeline; everything else a tap away.</p>
          </div>
        </div>

        <div className={s.deviceStack}>
          <figure className={s.device} data-m="home">
            <img
              src="/images/birthstory/bs-home.png"
              alt="The shipped home screen: notes on a timeline, with New Entry at the top and the whole app one tap away in the bottom bar."
              width="860"
              height="1860"
            />
            <span className={s.ring} data-m="ring" aria-hidden="true" />
          </figure>
          <figure className={`${s.device} ${s.devicePod}`} data-m="pod">
            <img
              src="/images/birthstory/bs-carepod.png"
              alt="The Care Pod screen: you at the center, circles of loved ones in orbit around you, and one Send Update button."
              width="860"
              height="1860"
            />
          </figure>
        </div>
      </div>

      <button type="button" className={s.replay} onClick={replay}>
        replay
      </button>
    </section>
  )
}
