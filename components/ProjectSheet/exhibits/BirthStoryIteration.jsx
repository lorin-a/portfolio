'use client'

import { useEffect, useRef, useState } from 'react'
import { rich } from '../SheetContent'
import s from './BirthStoryIteration.module.css'

/* ITERATION (FS341–FS345). Her reference grammar (Komoot, Rokt): one row
   of the versions, then each decision as a beat, words left and the work
   right. FS345: the work moves like the rest of the case study. Each
   decision is one phone that plays before → after on a loop, the way the
   feature prototypes do (a tap pulses, the after screen swipes in, holds,
   returns); a Before / After switch tracks the loop and holds either
   state when chosen. The version row rises in one phone at a time.
   Reduced motion: nothing plays; Before and After sit side by side. */

function useInView(ref, threshold = 0.35) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting), { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, threshold])
  return on
}

function useReduced() {
  const [r, setR] = useState(false)
  useEffect(() => { setR(window.matchMedia('(prefers-reduced-motion: reduce)').matches) }, [])
  return r
}

function Phone({ src, alt }) {
  return <span className={s.phone}><span className={s.screen}><img src={src} alt={alt} loading="lazy" /></span></span>
}

/* one phone, before → after */
function Morph({ before, after }) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reduced = useReduced()
  const [state, setState] = useState('before')
  const [tap, setTap] = useState(false)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (!inView || reduced || held) return
    const t = []
    const at = (ms, fn) => t.push(setTimeout(fn, ms))
    const run = () => {
      setState('before'); setTap(false)
      at(1800, () => setTap(true))
      at(2250, () => { setTap(false); setState('after') })
      at(2250 + 3600, run)
    }
    run()
    return () => t.forEach(clearTimeout)
  }, [inView, reduced, held])

  if (reduced) {
    return (
      <div className={s.pair}>
        <figure className={s.shot}><span className={s.label}>{before.label}</span><Phone {...before} /></figure>
        <span className={s.arrow} aria-hidden="true">→</span>
        <figure className={s.shot}><span className={s.label}>{after.label}</span><Phone {...after} /></figure>
      </div>
    )
  }

  const choose = (v) => { setHeld(true); setTap(false); setState(v) }
  return (
    <figure ref={ref} className={s.morph}>
      <span className={s.phone}>
        <span className={s.screen}>
          <img src={before.src} alt={before.alt} loading="lazy" />
          <img className={s.after} data-on={state === 'after' || undefined} src={after.src} alt={after.alt} loading="lazy" />
          <span className={s.tap} data-on={tap || undefined} aria-hidden="true" />
        </span>
      </span>
      <div className={s.switch} role="group" aria-label="Show before or after">
        {[['before', before.label], ['after', after.label]].map(([v, label]) => (
          <button key={v} type="button" className={s.switchBtn} aria-pressed={state === v} onClick={() => choose(v)}>
            {label}
          </button>
        ))}
      </div>
    </figure>
  )
}

/* the versions, rising in one at a time */
function Rounds({ rounds }) {
  const ref = useRef(null)
  const inView = useInView(ref, 0.3)
  return (
    <div ref={ref} className={`${s.band} ${s.row3}`} data-in={inView || undefined}>
      {rounds.map((r, i) => (
        <figure key={r.tag} className={`${s.shot} ${s.rise}`} style={{ '--d': `${i * 140}ms` }}>
          <Phone src={r.src} alt={r.alt} />
          <figcaption className={s.cap}><span className={s.label}>{r.tag}</span>{r.fidelity}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default function BirthStoryIteration({ data }) {
  const { intro, rounds = [], decisions = [], untested } = data || {}
  return (
    <div className={s.e}>
      <section className={s.beat}>
        <div className={s.words}>
          <h4 className={s.head}>{intro.head}</h4>
          <p className={s.body}>{rich(intro.body)}</p>
        </div>
        <Rounds rounds={rounds} />
      </section>

      {decisions.map((d) => (
        <section key={d.head} className={s.beat}>
          <div className={s.words}>
            <h4 className={s.head}>{d.head}</h4>
            <p className={s.body}>{rich(d.body)}</p>
          </div>
          <div className={s.band}><Morph before={d.before} after={d.after} /></div>
        </section>
      ))}

      {untested && (
        <p className={s.untested}><span className={s.untestedLabel}>What I couldn’t test</span>{untested}</p>
      )}
    </div>
  )
}
