'use client'

import { useEffect, useRef, useState } from 'react'
import sys from './system.module.css'
import f from './SearchReveal.module.css'

/* Search — the drag-to-reveal drawer. Lorin's real search panel lives one swipe
   off the edge; on a loop a handle nudges, then her panel slides in from the
   right over the home screen and holds so you can read the filters. Reduced
   motion: the panel shown open. */

const BASE = '/images/birthstory/bs-home.png'
const PANEL = '/images/birthstory/bs-search-panel.png'

export default function SearchReveal({ cap }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOpen(true); return }

    const timers = []
    const at = (t, fn) => timers.push(setTimeout(fn, t))
    const run = () => {
      setOpen(false)
      at(900, () => setHint(true))
      at(1900, () => { setHint(false); setOpen(true) })
      at(6200, () => setOpen(false))
      at(7100, run)
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
          <img className={f.base} src={BASE} alt="The home screen, with the search drawer waiting off the right edge." loading="lazy" draggable="false" />

          {/* the edge handle that nudges before the swipe */}
          <span className={`${f.handle} ${hint ? f.handleOn : ''}`} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" /></svg>
          </span>

          {/* her real search panel, sliding in from the right */}
          <span className={`${f.panel} ${open ? f.panelOpen : ''}`} aria-hidden={!open}>
            <img src={PANEL} alt="The search drawer: a keyword field with emotion and category filters over notes, journal, and photo results." loading="lazy" draggable="false" />
          </span>
        </span>
      </span>
      {cap && <figcaption className={f.cap}>{cap}</figcaption>}
    </figure>
  )
}
