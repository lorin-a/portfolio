'use client'

import { useEffect, useState } from 'react'
import s from './BirthStoryHeroVariants.module.css'

/* Birth Story — hero, full-bleed family. One markup, several CSS keys, so the
   comparison isolates layout + product prominence. The orbit's rotating care
   circle stays (it makes the product feel alive); the phone now cycles the
   STRONG screens. Reduced motion: composed, still, on the Care Pod. */

const MEMBERS = [
  { a: -20, tint: 'blush' }, { a: 70, tint: 'peri' }, { a: 165, tint: 'lav' }, { a: 255, tint: 'blush' },
]

/* the screens worth leading with — cover, Care Pod, live updates, a real entry */
const SCREENS = [
  '/images/birthstory/evolution/screens/v3-1.png',
  '/images/birthstory/bs-carepod.png',
  '/images/birthstory/bs-messages.png',
  '/images/birthstory/evolution/screens/v3-7.png',
]
const STILL = 1 // Care Pod — what reduced-motion / fan shows

function ScreenStack({ active }) {
  return (
    <span className={s.screen}>
      {SCREENS.map((src, i) => (
        <img key={src} src={src} alt="" className={`${s.screenImg} ${i === active ? s.screenOn : ''}`} draggable="false" />
      ))}
    </span>
  )
}

function Phone({ src, active, className = '' }) {
  return (
    <span className={`${s.phone} ${className}`}>
      <span className={s.notch} />
      {src ? <span className={s.screen}><img src={src} alt="" draggable="false" /></span> : <ScreenStack active={active} />}
    </span>
  )
}

function Orbit({ active }) {
  return (
    <div className={s.stage} aria-hidden="true">
      <div className={s.orbit}>
        <span className={s.ring} />
        <span className={s.rotor}>
          {MEMBERS.map((m, i) => (
            <span key={i} className={`${s.member} ${s[m.tint]}`} style={{ '--a': `${m.a}deg`, '--i': i }} />
          ))}
        </span>
        <Phone active={active} />
        <span className={s.bubble}>We’re here. ♥</span>
      </div>
    </div>
  )
}

function Fan() {
  return (
    <div className={s.fanStage} aria-hidden="true">
      <Phone src={SCREENS[0]} className={`${s.fanCard} ${s.fanBack}`} />
      <Phone src={SCREENS[2]} className={`${s.fanCard} ${s.fanSide}`} />
      <Phone src={SCREENS[1]} className={`${s.fanCard} ${s.fanFront}`} />
    </div>
  )
}

/* the surfaces worth previewing as an ecosystem (clean screens only) */
const ECO = [
  '/images/birthstory/evolution/screens/v3-1.png', // the cover
  '/images/birthstory/bs-carepod.png',             // Care Pod
  '/images/birthstory/bs-messages.png',            // live updates
  '/images/birthstory/evolution/screens/v3-7.png', // a real entry
]

/* Cascade — every surface overlapping in a perspective deck */
function Cascade() {
  return (
    <div className={s.cascadeStage} aria-hidden="true">
      {ECO.map((src, i) => (
        <div key={src} className={s.cascadeCard} style={{ '--i': i }}>
          <Phone src={src} className={s.cascadeMini} />
        </div>
      ))}
    </div>
  )
}

/* Lineup — an even row of upright phones, the middle one featured (Care Pod) */
function Lineup() {
  return (
    <div className={s.lineupStage} aria-hidden="true">
      <Phone src={ECO[2]} className={s.lineSide} />
      <Phone src={ECO[1]} className={s.lineMid} />
      <Phone src={ECO[3]} className={s.lineSide} />
    </div>
  )
}

/* Grid — a tidy 2×2 of four distinct surfaces on a single subtle plane */
function Grid() {
  return (
    <div className={s.gridStage} aria-hidden="true">
      {ECO.map((src) => (
        <div key={src} className={s.gridCell}><Phone src={src} /></div>
      ))}
    </div>
  )
}

function Stage({ variant, active }) {
  if (variant === 'fan') return <Fan />
  if (variant === 'cascade') return <Cascade />
  if (variant === 'lineup') return <Lineup />
  if (variant === 'grid') return <Grid />
  return <Orbit active={active} />
}

function Lead({ minimal }) {
  const follow = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollBy({ top: window.innerHeight * 0.92, behavior: reduce ? 'auto' : 'smooth' })
  }
  return (
    <div className={s.lead}>
      <p className={s.meta}><span>Birth Story</span><span>micro-app concept</span><span>CMU graduate studio</span></p>
      <h1 className={s.hook}>How do you hold the hardest, most disorienting day <em>without getting in the way</em>?</h1>
      {!minimal && (
        <p className={s.sub}>
          A companion just for the birth itself: the hours a newborn eclipses. Researched and
          tested with parents across a six-week studio.
        </p>
      )}
      <button type="button" className={s.cue} onClick={follow}>
        Follow the thinking <span aria-hidden="true">↓</span>
      </button>
      <p className={s.disclosure}>
        A micro-app concept for <a href="https://myana-app.com/team/" target="_blank" rel="noopener noreferrer">Myana</a>,
        a postpartum support platform by <a href="https://www.dezudio.com/" target="_blank" rel="noopener noreferrer">Dezudio</a>,
        made in a graduate studio at Carnegie Mellon. Created with client feedback, not professional
        work with Dezudio or UPMC.
      </p>
    </div>
  )
}

const MINIMAL = new Set(['min', 'fan', 'orbithero', 'cascade', 'lineup', 'grid'])

export default function BirthStoryHeroVariants({ variant = 'bleed' }) {
  const [on, setOn] = useState(false)
  const [active, setActive] = useState(STILL)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setOn(true); setActive(STILL); return }
    const t = setTimeout(() => setOn(true), 150)
    const cycle = setInterval(() => setActive((i) => (i + 1) % SCREENS.length), 2800)
    return () => { clearTimeout(t); clearInterval(cycle) }
  }, [])

  return (
    <section className={`${s.hero} ${s.darkBleed} ${s[variant]} ${on ? s.on : ''}`}>
      <div className={s.inner}>
        <Lead minimal={MINIMAL.has(variant)} />
        <Stage variant={variant} active={active} />
      </div>
    </section>
  )
}
