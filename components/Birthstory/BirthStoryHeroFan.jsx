'use client'

import { useEffect, useState } from 'react'
import s from './BirthStoryHeroFan.module.css'
import CarePodScreen from './CarePodScreen'
import MessageBoardScreen from './MessageBoardScreen'

/* Birth Story — hero. The slide deck was the seed; this is the better version.
   The reveal is a sequence: the cluster fans open, the Care Pod's care circle
   targets outward from "You" and its members join, then the Live Message Board
   populates — all on a large, slowly turning care-ring behind the screens.
   Reduced motion: composed, fanned, populated, still. */

const WING_L = '/images/birthstory/hero/cover-wing.jpg'  // the cover — jpeg: the grainy gradient bloats PNG 7×

/* neutral dots for the ambient care-ring behind the cluster */
const ACCENT = [
  { a: 18 }, { a: 74 }, { a: 132 }, { a: 198 }, { a: 256 }, { a: 312 },
]

/* the cover wing — a real screen capture */
function Phone({ src, className = '' }) {
  return (
    <span className={`${s.phone} ${className}`}>
      <span className={s.notch} />
      <span className={s.screen}><img src={src} alt="" draggable="false" /></span>
    </span>
  )
}

/* a phone whose screen is a live, rebuilt component */
function ScreenPhone({ className = '', children }) {
  return (
    <span className={`${s.phone} ${className}`}>
      <span className={s.notch} />
      <span className={s.screen}>{children}</span>
    </span>
  )
}

/* the ambient care-ring — neutral dots orbiting behind everything */
function Accent() {
  return (
    <div className={s.accent} aria-hidden="true">
      <span className={`${s.accentRing} ${s.accentOuter}`} />
      <span className={`${s.accentRing} ${s.accentInner}`} />
      <span className={s.accentRotor}>
        {ACCENT.map((d, i) => (
          <span key={i} className={s.accentDot} style={{ '--a': `${d.a}deg`, '--i': i }} />
        ))}
      </span>
    </div>
  )
}

function Lead() {
  const follow = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollBy({ top: window.innerHeight * 0.92, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <div className={s.lead}>
      <h1 className={s.title}>Birth Story</h1>
      <p className={s.subhead}>How might we help parents document, reflect on, and make sense of their birth experience?</p>
      <p className={s.disclosure}>
        A micro-app concept for <a href="https://myana-app.com/team/" target="_blank" rel="noopener noreferrer">Myana</a>,
        a postpartum support platform, made in a graduate studio at Carnegie Mellon. Created with
        client feedback, not professional work.
      </p>
      <button type="button" className={s.cue} onClick={follow}>
        Follow the thinking <span aria-hidden="true">↓</span>
      </button>
    </div>
  )
}

export default function BirthStoryHeroFan() {
  const [on, setOn] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 160)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`${s.hero} ${on ? s.on : ''}`}>
      <div className={s.inner}>
        <Lead />
        <div className={s.stage} aria-label="Three Birth Story screens fanning open: the cover, the Care Pod, and the live message board." role="img">
          <Accent />
          <Phone src={WING_L} className={s.wingL} />
          <ScreenPhone className={s.wingR}><MessageBoardScreen /></ScreenPhone>
          <ScreenPhone className={s.center}><CarePodScreen /></ScreenPhone>
        </div>
      </div>
    </section>
  )
}
