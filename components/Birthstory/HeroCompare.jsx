'use client'

import { useState } from 'react'
import BirthStoryHeroVariants from './BirthStoryHeroVariants'
import s from './HeroCompare.module.css'

/* Gated pick step: flip between the three hero directions live.
   Keyed remount replays each entrance so you judge it from a cold start. */

const OPTS = [
  { id: 'cascade', label: 'Cascade' },
  { id: 'lineup', label: 'Lineup' },
  { id: 'grid', label: 'Grid' },
  { id: 'fan', label: 'Fan' },
]

export default function HeroCompare() {
  const [v, setV] = useState('cascade')
  return (
    <>
      <div className={s.bar} role="group" aria-label="Hero options">
        {OPTS.map((o) => (
          <button
            key={o.id}
            className={`${s.pill} ${v === o.id ? s.active : ''}`}
            onClick={() => setV(o.id)}
            aria-pressed={v === o.id}
          >
            {o.label}
          </button>
        ))}
      </div>
      <BirthStoryHeroVariants key={v} variant={v} />
    </>
  )
}
