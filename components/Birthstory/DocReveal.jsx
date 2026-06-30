'use client'

import { useEffect, useRef, useState } from 'react'
import sys from './system.module.css'
import f from './DocReveal.module.css'

/* Documentation — the medical timeline, where one entry opens. It's Lorin's real
   screen, untouched: three clipped copies of the same PNG stacked so the header
   and nav stay put while the middle (the Ibuprofen dropdown + the entries below)
   slides down to open. No recreation — the pixels are hers. On scroll it loops:
   closed, a tap on the entry, the white card unrolls, holds, closes. Reduced
   motion: shown open. */

const SRC = '/images/birthstory/bs-doc-medical.png'
const ALT = 'A medical entry on the timeline: an Ibuprofen prescription with its pickup instructions and a voice memo, opened beneath the Notes timeline.'

export default function DocReveal({ cap }) {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const [tap, setTap] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOpen(true); return }

    const timers = []
    const push = (fn, t) => timers.push(setTimeout(fn, t))
    const loop = () => {
      setOpen(false)
      push(() => setTap(true), 1100)
      push(() => { setTap(false); setOpen(true) }, 1550)
      push(loop, 1550 + 600 + 3800)
    }

    let started = false
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; loop() }
    }, { threshold: 0.4 })
    o.observe(el)
    return () => { o.disconnect(); timers.forEach(clearTimeout) }
  }, [])

  return (
    <figure ref={ref} className={f.wrap}>
      <span className={`${sys.phone} ${f.phone}`}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={`${sys.phoneScreen} ${f.screen} ${open ? f.open : ''}`}>
          <img className={f.top} src={SRC} alt={ALT} loading="lazy" draggable="false" />
          <img className={f.mid} src={SRC} alt="" aria-hidden="true" loading="lazy" draggable="false" />
          <img className={f.bot} src={SRC} alt="" aria-hidden="true" loading="lazy" draggable="false" />
          <span className={`${f.tapDot} ${tap ? f.tapOn : ''}`} aria-hidden="true" />
        </span>
      </span>
      {cap && <figcaption className={f.cap}>{cap}</figcaption>}
    </figure>
  )
}
