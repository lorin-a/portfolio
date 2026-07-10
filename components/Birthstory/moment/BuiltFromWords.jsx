'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import s from './moment.module.css'

/* Moment study 01 — "Built from their words."
   The screen-test method (F15): one fully-behaving viewport, nothing else.
   The research chat plays in real cadence; each ask physically becomes
   product; the app assembles from their voices and breathes.
   Motion vocabulary = the app's own principles: calm-by-default (slow, soft
   arrivals), does-not-disorient (nothing jumps or reverses), one playful
   accent only (the Care Pod heart). Play-once; reduced-motion shows the
   completed scene. */

const ASKS = [
  {
    msg: 'Less medical documentation. More photos, and an outline of what actually happened.',
    spark: 'photos + what happened',
  },
  {
    msg: 'Recognition for doing something this amazing and this hard.',
    spark: 'how it felt',
  },
  {
    msg: 'A space that doesn’t assume a “normal” birth: other people’s stories, resources.',
    spark: 'stories + support',
  },
]

function Icon({ d, filled = false }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5M5.5 9v11h13V9',
  heart: 'M12 20s-7-4.6-9-9c-1.2-2.7.6-6 3.8-6C9 5 10.8 6.4 12 8c1.2-1.6 3-3 5.2-3 3.2 0 5 3.3 3.8 6-2 4.4-9 9-9 9Z',
  plus: 'M12 5v14M5 12h14',
  book: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5ZM20 18.5H6.5A2.5 2.5 0 0 0 4 21',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM21 21l-5.8-5.8',
}

export default function BuiltFromWords({ embedded = false }) {
  const stageRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const q = gsap.utils.selector(stage)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return // CSS leaves the completed scene fully visible

    const build = () => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })

      /* initial states (JS-only, so no-JS and reduced-motion see the finished scene) */
      gsap.set(q('[data-m="chatHead"], [data-m="msg"], [data-m="quote"]'), { autoAlpha: 0, y: 14 })
      gsap.set(q('[data-m="typing"]'), { autoAlpha: 0 })
      gsap.set(q('[data-m="device"]'), { autoAlpha: 0, y: 26 })
      gsap.set(q('[data-m="entry1"], [data-m="entry2"], [data-m="navbar"], [data-m="apphead"], [data-m="newentry"]'), { autoAlpha: 0, y: 10, scale: 0.97 })
      gsap.set(q('[data-m="dot"]'), { autoAlpha: 0, scale: 0.4 })
      gsap.set(q('[data-m="navicon"]'), { autoAlpha: 0, scale: 0.5 })
      gsap.set(q('[data-m="veil"]'), { opacity: 0 })
      gsap.set(q('[data-m="caption"]'), { autoAlpha: 0, y: 10 })
      gsap.set(q('[data-m="spark"]'), { autoAlpha: 0 })

      /* the stage settles */
      tl.to(q('[data-m="device"]'), { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
      tl.to(q('[data-m="chatHead"]'), { autoAlpha: 1, y: 0, duration: 0.5 }, 0.2)

      /* a spark lifts from a bubble and lands as product */
      const stageRect = () => stage.getBoundingClientRect()
      const flySpark = (tlPos, sparkEl, fromEl, toEl, onLand) => {
        tl.call(() => {
          const sr = stageRect()
          const a = fromEl.getBoundingClientRect()
          const b = toEl.getBoundingClientRect()
          const startX = a.right - sr.left - 24
          const startY = a.top - sr.top + a.height / 2 - 12
          const endX = b.left - sr.left + b.width / 2 - 40
          const endY = b.top - sr.top + b.height / 2 - 12
          gsap.set(sparkEl, { x: startX, y: startY, scale: 0.7 })
          gsap.timeline()
            .to(sparkEl, { autoAlpha: 1, scale: 1, duration: 0.18 })
            .to(sparkEl, {
              keyframes: [
                { x: (startX + endX) / 2, y: Math.min(startY, endY) - 46, duration: 0.42, ease: 'power1.out' },
                { x: endX, y: endY, duration: 0.42, ease: 'power1.in' },
              ],
            })
            .to(sparkEl, { autoAlpha: 0, scale: 0.6, duration: 0.16 }, '-=0.05')
            .call(onLand)
        }, null, tlPos)
      }

      const msgs = q('[data-m="msg"]')
      const typings = q('[data-m="typing"]')
      const sparks = q('[data-m="spark"]')
      const device = q('[data-m="device"]')[0]

      const landings = [
        () => { // ask 1 → the first timeline entry
          gsap.to(q('[data-m="entry1"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 })
        },
        () => { // ask 2 → the feeling: emotion dots + the second entry
          gsap.to(q('[data-m="dot"]'), { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.09, ease: 'power3.out' })
          gsap.to(q('[data-m="entry2"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, delay: 0.15 })
        },
        () => { // ask 3 → the nav assembles; the Care Pod heart lands last, the one bounce
          gsap.to(q('[data-m="navbar"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 })
          gsap.to(q('[data-m="navicon"]:not([data-heart])'), { autoAlpha: 1, scale: 1, duration: 0.35, stagger: 0.08, delay: 0.2 })
          gsap.to(q('[data-heart]'), { autoAlpha: 1, scale: 1, duration: 0.55, delay: 0.65, ease: 'back.out(2.4)' })
        },
      ]

      ASKS.forEach((_, i) => {
        const t0 = 0.9 + i * 2.1
        tl.to(typings[i], { autoAlpha: 1, duration: 0.2 }, t0)
        tl.to(typings[i], { autoAlpha: 0, duration: 0.18 }, t0 + 0.85)
        tl.to(msgs[i], { autoAlpha: 1, y: 0, duration: 0.5 }, t0 + 0.95)
        flySpark(t0 + 1.5, sparks[i], msgs[i], device, landings[i])
      })

      /* the sister's verbatim — weightier, slower */
      const tQ = 0.9 + 3 * 2.1
      tl.to(typings[3], { autoAlpha: 1, duration: 0.2 }, tQ)
      tl.to(typings[3], { autoAlpha: 0, duration: 0.18 }, tQ + 1.15)
      tl.to(q('[data-m="quote"]'), { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power1.out' }, tQ + 1.25)

      /* the app completes, warms, and breathes */
      tl.to(q('[data-m="apphead"], [data-m="newentry"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.5 }, tQ + 2.1)
      tl.to(q('[data-m="veil"]'), { opacity: 1, duration: 1.5, ease: 'sine.inOut' }, tQ + 2.3)
      tl.to(device, { scale: 1.012, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, tQ + 2.6)
      tl.to(q('[data-m="caption"]'), { autoAlpha: 1, y: 0, duration: 0.8 }, tQ + 2.8)

      return tl
    }

    tlRef.current = build()
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { tlRef.current?.play(); io.disconnect() }
    }, { threshold: 0.45 })
    io.observe(stage)
    return () => { io.disconnect(); tlRef.current?.kill() }
  }, [])

  const replay = () => {
    const tl = tlRef.current
    if (tl) { tl.pause(0); tl.play(0) }
  }

  return (
    <div ref={stageRef} className={`${s.stage} ${embedded ? s.embedded : ''}`}>
      {!embedded && <p className={s.kicker}>Moment study 01 · the group call becomes the app</p>}

      <div className={s.grid}>
        {/* the conversation */}
        <div className={s.chat}>
          <p className={s.chatHead} data-m="chatHead">The group call · my three sisters, my mom, a friend with a toddler</p>
          {ASKS.map((a, i) => (
            <div key={a.spark} style={{ position: 'relative' }}>
              <span className={s.typing} data-m="typing" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden="true"><i /><i /><i /></span>
              <p className={s.msg} data-m="msg">{a.msg}</p>
            </div>
          ))}
          <div style={{ position: 'relative' }}>
            <span className={s.typing} data-m="typing" style={{ position: 'absolute', left: 0, top: 0 }} aria-hidden="true"><i /><i /><i /></span>
            <blockquote className={`${s.msg} ${s.msgQuote}`} data-m="quote" style={{ margin: 0 }}>
              “None of our births went according to plan and they were traumatizing, and it doesn’t
              get discussed enough.”
            </blockquote>
          </div>
        </div>

        {/* the phone, assembling */}
        <div className={s.device} data-m="device">
          <span className={s.notch} aria-hidden="true" />
          <div className={s.screen}>
            <span className={s.veil} data-m="veil" aria-hidden="true" />
            <div className={s.appHead} data-m="apphead"><u>Notes</u><span>Journal</span></div>
            <div className={s.newEntry} data-m="newentry"><i>+</i>New Entry</div>
            <div className={s.rail}>
              <div className={s.entry} data-m="entry1">
                <span className={s.entryNode} aria-hidden="true" />
                <p className={s.entryTitle}>Water broke</p>
                <p className={s.entryMeta}>01/12/2025 · 2:14am</p>
                <div className={s.photoRow} aria-hidden="true"><i /><i /><i /></div>
              </div>
              <div className={s.entry} data-m="entry2">
                <span className={s.entryNode} aria-hidden="true" />
                <div className={s.dots} aria-hidden="true"><i data-m="dot" /><i data-m="dot" /><i data-m="dot" /></div>
                <p className={s.entryTitle}>Feeling empowered</p>
                <p className={s.entryMeta}>01/12/2025 · 2:31am</p>
              </div>
            </div>
            <div className={s.navBar} data-m="navbar">
              <span className={s.navIcon} data-m="navicon"><Icon d={PATHS.home} /></span>
              <span className={s.navIcon} data-m="navicon" data-heart="true" style={{ color: '#8089C2' }}><Icon d={PATHS.heart} filled /></span>
              <span className={`${s.navIcon} ${s.navPlus}`} data-m="navicon"><Icon d={PATHS.plus} /></span>
              <span className={s.navIcon} data-m="navicon"><Icon d={PATHS.book} /></span>
              <span className={s.navIcon} data-m="navicon"><Icon d={PATHS.search} /></span>
            </div>
          </div>
        </div>

        {/* the traveling sparks */}
        {ASKS.map((a) => (
          <span key={a.spark} className={s.spark} data-m="spark" aria-hidden="true">{a.spark}</span>
        ))}
      </div>

      <p className={s.caption} data-m="caption">Built from their words.</p>

      <button type="button" className={s.replay} onClick={replay}>↺ replay</button>
    </div>
  )
}
