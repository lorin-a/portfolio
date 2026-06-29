'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import t from './OnboardingTour.module.css'
import { sys } from './kit'

/* 05 — Features, as an interactive tour. The final app's four destinations,
   walked one at a time: the screen is a big rendered mockup, the active tab
   lights up in a rebuilt nav bar, and the verbatim onboarding copy pins to the
   spot it describes with a leader line. Auto-advances once in view; click any
   tab to drive it yourself. Reduced motion: parked on step one, still, clickable.

   Callout copy is Lorin's, verbatim from the Figma onboarding flow. */

const useIso = typeof window === 'undefined' ? useEffect : useLayoutEffect

const TABS = ['home', 'pod', 'book', 'search']

function TabIcon({ name }) {
  const p = {
    home: 'M3 10.6 12 3.5l9 7.1M5.2 9.3V20h13.6V9.3',
    pod: 'M12 12.4a2.7 2.7 0 1 0 0-5.4 2.7 2.7 0 0 0 0 5.4ZM6 19.5c0-2.6 2.7-4.1 6-4.1s6 1.5 6 4.1',
    book: 'M12 6.4c-1.9-1.2-4.4-1.4-6.6-.9v11.6c2.2-.5 4.7-.3 6.6.9 1.9-1.2 4.4-1.4 6.6-.9V5.5c-2.2-.5-4.7-.3-6.6.9ZM12 6.4v11.7',
    search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13ZM19.5 19.5 15 15',
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={p[name]} />
    </svg>
  )
}

const STEPS = [
  {
    tab: 'home', label: 'Home', n: '01',
    src: '/images/birthstory/evolution/v3-home.png',
    alt: 'The Birth Story home: a New Entry box above prompts for memorable events, notes, and medical details, on a scrollable dated timeline.',
    pin: { x: 54, y: 27 },
    title: 'Add Memorable Events',
    body: 'Key moments, surprises, a chronological diary of experiences.',
  },
  {
    tab: 'pod', label: 'Care Pod', n: '02',
    src: '/images/birthstory/bs-carepod.png',
    alt: 'The Care Pod: loved ones orbiting a heart marked “You” on concentric dashed rings.',
    pin: { x: 50, y: 49 },
    title: 'Curate Your Care Pod',
    body: 'Send live birth updates, group messages, and invite your community to add their experience to your Birth Story.',
  },
  {
    tab: 'book', label: 'Book', n: '03',
    src: '/images/birthstory/hero/phone-book.jpg',
    alt: 'The Birth Story Book screen: a spiral keepsake book, a feature list, and Order Now or Download buttons.',
    pin: { x: 50, y: 43 },
    title: 'Order Your Birth Story Book!',
    body: 'Curate your entries in the app, photos, and reflections into a physical Birth Story Book or free PDF to export and share.',
  },
  {
    tab: 'search', label: 'Search', n: '04',
    src: '/images/birthstory/evolution/screens/v3-7.png',
    alt: 'The search screen: a search bar above emotion and category tags, notes, journal entries, and a photo grid.',
    pin: { x: 50, y: 11 },
    title: 'Search With Ease',
    body: 'Search the entire app for key words, media type, or category/emotion tag for seamless organization.',
  },
]

export default function OnboardingTour() {
  const [step, setStep] = useState(0)
  const [seen, setSeen] = useState(false)
  const [auto, setAuto] = useState(true)
  const [lead, setLead] = useState(null)

  const stageRef = useRef(null)
  const pinRef = useRef(null)
  const calloutRef = useRef(null)
  const reduce = useRef(false)

  // reveal + reduced-motion
  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce.current) { setSeen(true); setAuto(false); return }
    const el = stageRef.current
    if (!el) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); o.disconnect() } }, { threshold: 0.4 })
    o.observe(el)
    return () => o.disconnect()
  }, [])

  // auto-advance once in view, until the user takes over
  useEffect(() => {
    if (!seen || !auto || reduce.current) return
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4200)
    return () => clearInterval(id)
  }, [seen, auto])

  const go = (i) => { setAuto(false); setStep(i) }

  // measure the leader line from the pin to the callout
  useIso(() => {
    const measure = () => {
      const stage = stageRef.current, pin = pinRef.current, call = calloutRef.current
      if (!stage || !pin || !call) return
      const sb = stage.getBoundingClientRect()
      const pb = pin.getBoundingClientRect()
      const cb = call.getBoundingClientRect()
      const x1 = pb.left + pb.width / 2 - sb.left
      const y1 = pb.top + pb.height / 2 - sb.top
      const onRight = cb.left > pb.left
      const x2 = (onRight ? cb.left : cb.right) - sb.left
      const y2 = cb.top + Math.min(cb.height / 2, 34) - sb.top
      if (sb.width < 640) { setLead(null); return } // stacked layout: no leader
      setLead({ x1, y1, x2, y2 })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (stageRef.current) ro.observe(stageRef.current)
    window.addEventListener('resize', measure)
    const id = setTimeout(measure, 320)
    return () => { ro.disconnect(); window.removeEventListener('resize', measure); clearTimeout(id) }
  }, [step, seen])

  const cur = STEPS[step]

  return (
    <div
      className={`${t.tour} ${seen ? t.seen : ''}`}
      onMouseEnter={() => setAuto(false)}
      onFocusCapture={() => setAuto(false)}
    >
      <div className={t.stage} ref={stageRef}>
        <div className={t.phoneCol}>
          <span className={`${sys.phone} ${t.phone}`}>
            <span className={sys.phoneNotch} aria-hidden="true" />
            <span className={sys.phoneScreen}>
              {STEPS.map((s, i) => (
                <img
                  key={s.tab}
                  src={s.src}
                  alt={i === step ? cur.alt : ''}
                  className={`${t.shot} ${i === step ? t.shotOn : ''}`}
                  loading="lazy"
                  draggable="false"
                  aria-hidden={i === step ? undefined : true}
                />
              ))}
            </span>
          </span>
          <span
            ref={pinRef}
            className={t.pin}
            style={{ left: `${cur.pin.x}%`, top: `${cur.pin.y}%` }}
            aria-hidden="true"
          />
        </div>

        <svg className={t.leads} aria-hidden="true">
          {lead && <line x1={lead.x1} y1={lead.y1} x2={lead.x2} y2={lead.y2} />}
        </svg>

        <div className={t.calloutCol} style={{ '--pin-y': cur.pin.y }}>
          <figure className={t.callout} ref={calloutRef} aria-live="polite">
            <figcaption className={t.calloutKicker}>{cur.label}</figcaption>
            <p className={t.calloutTitle}>{cur.title}</p>
            <p className={t.calloutBody}>{cur.body}</p>
          </figure>
        </div>
      </div>

      <div className={t.rail} role="tablist" aria-label="Birth Story feature tour">
        {STEPS.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            role="tab"
            aria-selected={i === step}
            className={`${t.tab} ${i === step ? t.tabOn : ''}`}
            onClick={() => go(i)}
          >
            <span className={t.tabIcon}><TabIcon name={s.tab} /></span>
            <span className={t.tabLabel}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
