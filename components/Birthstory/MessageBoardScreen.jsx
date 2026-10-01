'use client'

import { useEffect, useState } from 'react'
import s from './MessageBoardScreen.module.css'

/* The Birth Story "Live Message Board", rebuilt from Lorin's Figma so the
   conversation populates: the card lands, then each message drops in. Reveal is
   timed to land after the Care Pod's members settle, so the cluster reads as a
   sequence. Reduced motion: fully populated, still. Copy is from the design. */

const MESSAGES = [
  { from: 'curly',    side: 'l', text: 'Hi!! How is everyone doing? Have the contractions started yet?' },
  { from: 'beard',    side: 'r', text: 'No contractions yet. So far so good. Will update when we know.' },
  { from: 'headband', side: 'l', lead: 'Update:', text: ' Nadia is officially in labor, All is well, heading to the hospital.' },
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

export default function MessageBoardScreen() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={`${s.screen} ${on ? s.on : ''}`}>
      <div className={s.status}>
        <span className={s.time}>9:41</span>
        <span className={s.island} />
        <span className={s.statusRight}><span className={s.signal} /><span className={s.battery} /></span>
      </div>

      <div className={s.tabs}>
        <span className={s.tabActive}>Updates</span>
        <span className={s.tab}>Stories</span>
      </div>

      <div className={s.send}>
        <span>Send Update</span>
        <span className={s.sendPlus} aria-hidden="true">+</span>
      </div>

      <div className={s.card}>
        <p className={s.cardTitle}>Live Message Board:</p>
        <div className={s.thread}>
          {MESSAGES.map((m, i) => (
            <div key={m.from} className={`${s.row} ${m.side === 'r' ? s.right : s.left}`} style={{ '--i': i }}>
              <span className={s.msgAvatar}><img src={`/images/birthstory/hero/members/${m.from}.jpg`} alt="" draggable="false" /></span>
              <span className={s.bubble}>
                {m.lead && <strong>{m.lead}</strong>}{m.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={s.nav}>
        <Icon name="home" /><Icon name="pod" />
        <span className={s.fab} aria-hidden="true">+</span>
        <Icon name="book" /><Icon name="search" />
      </div>
    </div>
  )
}
