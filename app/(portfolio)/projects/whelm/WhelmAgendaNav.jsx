'use client'

import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { SECTIONS } from './data'
import styles from './WhelmAgendaNav.module.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Sticky top agenda for the case study. Appears once the user has
   scrolled past the hero (sentinelRef points at the hero container);
   each item links to its section anchor. Active state highlights the
   section currently in view. Smooth-scrolls via Lenis when present. */
export default function WhelmAgendaNav({ sentinelRef }) {
  const navRef = useRef(null)
  const [activeId, setActiveId] = useState(SECTIONS[0].id)
  const [revealed, setRevealed] = useState(false)

  useGSAP(() => {
    if (!sentinelRef?.current) return

    const triggers = []

    triggers.push(
      ScrollTrigger.create({
        trigger: sentinelRef.current,
        start: 'bottom top',
        onEnter: () => setRevealed(true),
        onLeaveBack: () => setRevealed(false),
      })
    )

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (!el) return
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 40%',
          end: 'bottom 40%',
          onToggle: self => {
            if (self.isActive) setActiveId(s.id)
          },
        })
      )
    })

    return () => triggers.forEach(t => t.kill())
  }, { dependencies: [sentinelRef] })

  const handleClick = id => e => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo(target, { duration: 1.2 })
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={styles.nav}
      data-state={revealed ? 'visible' : 'hidden'}
      aria-label="Case study sections"
    >
      <ol className={styles.list}>
        {SECTIONS.map(s => (
          <li key={s.id} className={styles.item}>
            <a
              href={`#${s.id}`}
              className={styles.link}
              data-active={activeId === s.id ? 'true' : 'false'}
              onClick={handleClick(s.id)}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
