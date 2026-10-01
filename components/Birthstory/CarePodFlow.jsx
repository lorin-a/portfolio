'use client'

import { useEffect, useRef, useState } from 'react'
import sys from './system.module.css'
import CarePodScreen from './CarePodScreen'
import MessageBoardScreen from './MessageBoardScreen'
import f from './CarePodFlow.module.css'

/* Care Pod — the send-out showcase, built from Lorin's own pieces. The hero's
   Care Pod orbit loads in (the circle animation), you tap Send Update, her real
   compose sheet swipes up over it, then it closes onto the Live Message Board
   where the replies land. One phone, on a loop. Reduced motion: the orbit, still. */

const COMPOSE = '/images/birthstory/bs-carepod-compose.png'

export default function CarePodFlow({ cap }) {
  const ref = useRef(null)
  const [screen, setScreen] = useState('pod') // 'pod' | 'board'
  const [composeUp, setComposeUp] = useState(false)
  const [tap, setTap] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setReduced(true); return }

    const timers = []
    const at = (t, fn) => timers.push(setTimeout(fn, t))
    const run = () => {
      setScreen('pod'); setComposeUp(false); setTap(false)
      at(2600, () => setTap(true))                              // tap Send Update
      at(3000, () => { setTap(false); setComposeUp(true) })     // sheet swipes up
      at(5900, () => { setScreen('board'); setComposeUp(false) }) // close onto the board
      at(9700, run)
    }

    let started = false
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; run() }
    }, { threshold: 0.4 })
    o.observe(el)
    return () => { o.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  return (
    <figure ref={ref} className={f.wrap}>
      <span className={`${sys.phone} ${f.phone}`}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={`${sys.phoneScreen} ${f.screen}`}>
          {/* back screen: the orbit, then the message board */}
          {screen === 'board' && !reduced ? <MessageBoardScreen /> : <CarePodScreen />}

          {/* the Send Update tap */}
          <span className={`${f.tapDot} ${tap ? f.tapOn : ''}`} aria-hidden="true" />

          {/* the compose sheet, swiping up from the bottom */}
          {!reduced && (
            <span className={`${f.compose} ${composeUp ? f.composeUp : ''}`} aria-hidden={!composeUp}>
              <img src={COMPOSE} alt="The Send Update compose sheet: a note to the Care Pod with photos and a voice memo." loading="lazy" draggable="false" />
            </span>
          )}
        </span>
      </span>
      {cap && <figcaption className={f.cap}>{cap}</figcaption>}
    </figure>
  )
}
