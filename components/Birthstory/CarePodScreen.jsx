'use client'

import { useEffect, useState } from 'react'
import s from './CarePodScreen.module.css'

/* The Birth Story "Care Pod" screen, rebuilt faithfully from Lorin's Figma so it
   can actually move: real member photos orbit upright around the "You" heart on
   three concentric dashed rings, the way she designed it. Each member carries a
   baked --start angle so the formation rests correctly when motion is disabled.
   Reveal (rings draw in, members pop, faces settle) is driven by the `on` flag. */

const MEMBERS = [
  { img: 'curly',    start: 290.6, r: 42, i: 0 }, // outer, upper-right (periwinkle)
  { img: 'headband', start: 270,   r: 15, i: 1 }, // inner, top (peach)
  { img: 'beard',    start: 0,     r: 29, i: 2 }, // middle, right (peach)
  { img: 'elder',    start: 165,   r: 29, i: 3 }, // middle, left (peach)
  { img: 'brunette', start: 105.4, r: 42, i: 4 }, // outer, lower-left (periwinkle)
]

function Icon({ name }) {
  const p = {
    home: 'M3 10.2 12 3l9 7.2M5 9v11h14V9',
    pod: 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM5.5 20c0-2.8 2.9-4.5 6.5-4.5s6.5 1.7 6.5 4.5',
    book: 'M12 6c-1.8-1.2-4-1.8-6.5-1.8V18c2.5 0 4.7.6 6.5 1.8 1.8-1.2 4-1.8 6.5-1.8V4.2C16 4.2 13.8 4.8 12 6Zm0 0v13.8',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  }[name]
  return (
    <svg viewBox="0 0 24 24" className={s.navIcon} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p} />
    </svg>
  )
}

export default function CarePodScreen() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 600)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`${s.screen} ${on ? s.on : ''}`}>
      <div className={s.status}>
        <span className={s.time}>9:41</span>
        <span className={s.island} />
        <span className={s.statusRight}>
          <span className={s.signal} /><span className={s.battery} />
        </span>
      </div>

      <div className={s.tabs}>
        <span className={s.tabActive}>Updates</span>
        <span className={s.tab}>Stories</span>
      </div>

      <div className={s.field}>
        <div className={s.orbit}>
          <span className={`${s.ring} ${s.ringOuter}`} />
          <span className={`${s.ring} ${s.ringMid}`} />
          <span className={`${s.ring} ${s.ringInner}`} />

          {MEMBERS.map((m) => (
            <span key={m.img} className={s.arm} style={{ '--start': `${m.start}deg`, '--r': `${m.r}cqw`, '--i': m.i }}>
              <span className={s.node}>
                <span className={s.spin}>
                  <span className={s.face}>
                    <img src={`/images/birthstory/hero/members/${m.img}.jpg`} alt="" draggable="false" />
                    <span className={s.badge} aria-hidden="true">+</span>
                  </span>
                </span>
              </span>
            </span>
          ))}

          <span className={s.you}>
            <svg viewBox="0 0 32 30" className={s.heart} aria-hidden="true"><path d="M16 28C7 21.5 1 16.4 1 9.8 1 5.2 4.6 2 8.6 2c2.6 0 5 1.4 6.4 3.6h2C18.4 3.4 20.8 2 23.4 2 27.4 2 31 5.2 31 9.8c0 6.6-6 11.7-15 18.2Z" /></svg>
            <span className={s.youText}>You</span>
          </span>
        </div>
      </div>

      <div className={s.send}>
        <span>Send Update</span>
        <span className={s.sendPlus} aria-hidden="true">+</span>
      </div>

      <div className={s.nav}>
        <Icon name="home" />
        <Icon name="pod" />
        <span className={s.fab} aria-hidden="true">+</span>
        <Icon name="book" />
        <Icon name="search" />
      </div>
    </div>
  )
}
