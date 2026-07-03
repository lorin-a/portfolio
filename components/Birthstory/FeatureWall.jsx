'use client'

import { useRef, useState, useEffect } from 'react'
import { sys } from './kit'
import w from './FeatureWall.module.css'

/* The four ways in, shown side by side so the whole product reads at a glance —
   no engagement required. Each is a real screen in the device frame, labelled
   with what it's for. Reveals as a staggered set when the row scrolls in.

   NOTE: the screens below are the highest-res assets on hand and stand in for
   the richer final screens (active documentation, reflection, curation) until
   those are added — see PROGRESS. Swap `src` per item when they land. */

const WAYS = [
  {
    tab: 'Home',
    src: '/images/birthstory/bs-home.png',
    alt: 'The Home screen: a New Entry box above a dated timeline of notes and journal entries.',
    desc: 'Document as it happens. Personal notes and medical detail land on one timeline.',
  },
  {
    tab: 'Care Pod',
    src: '/images/birthstory/bs-carepod.png',
    alt: 'The Care Pod: loved ones orbiting a heart marked “You” on concentric rings.',
    desc: 'Keep everyone informed in one action. Updates out, support and memories back.',
  },
  {
    tab: 'Book',
    src: '/images/birthstory/hero/phone-book.jpg',
    alt: 'The Birth Story Book screen: a keepsake book with Order Now and Download.',
    desc: 'Take the whole story with you. A printed book or a free PDF.',
  },
  {
    tab: 'Search',
    src: '/images/birthstory/evolution/screens/v3-7.png',
    alt: 'The Search screen: a search bar above emotion and category tags and a photo grid.',
    desc: 'Find any moment by keyword, media type, or emotion tag.',
  },
]

export default function FeatureWall({ tone }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setSeen(true); return }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.2 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  return (
    <div ref={ref} className={`${w.wall} ${tone === 'dark' ? w.dark : ''} ${seen ? w.in : ''}`}>
      {WAYS.map((s, i) => (
        <figure key={s.tab} className={w.item} style={{ '--i': i }}>
          <span className={`${sys.phone} ${w.phone}`}>
            <span className={sys.phoneNotch} aria-hidden="true" />
            <span className={sys.phoneScreen}>
              <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
            </span>
          </span>
          <figcaption className={w.cap}>
            <span className={w.tab}>{s.tab}</span>
            <span className={w.desc}>{s.desc}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}
