'use client'

import { useEffect, useState } from 'react'
import s from './BirthStoryHeroDeck.module.css'

/* Birth Story — hero, implemented from the slide-deck title page (Figma).
   A documentation title slide: the wordmark, the doc label + course, the
   authors, and a three-screen cluster (the keepsake Book, the cover, the
   Care Pod) on the real Myana gradient. Fonts mapped to the portfolio's
   Fraunces / Open Sans. Reduced motion: composed, still. */

export default function BirthStoryHeroDeck() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOn(true); return }
    const t = setTimeout(() => setOn(true), 120)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className={`${s.hero} ${on ? s.on : ''}`}>
      <div className={s.inner}>
        <div className={s.lead}>
          <h1 className={s.title}>Birth Story</h1>
          <p className={s.doc}>Project Documentation<br />CMU IXD Studio Spring 2025</p>
          <p className={s.authors}>By Lorin Anderberg + Michael Juan</p>
        </div>

        <div className={s.cluster} role="img" aria-label="Three Birth Story screens: the keepsake book, the cover, and the Care Pod.">
          <img className={`${s.phone} ${s.pBook}`} src="/images/birthstory/hero/phone-book.jpg" alt="" loading="eager" draggable="false" />
          <img className={`${s.phone} ${s.pCarepod}`} src="/images/birthstory/hero/phone-carepod.jpg" alt="" loading="eager" draggable="false" />
          <img className={`${s.phone} ${s.pCover}`} src="/images/birthstory/hero/phone-cover.jpg" alt="" loading="eager" draggable="false" />
        </div>
      </div>
    </section>
  )
}
