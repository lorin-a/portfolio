'use client'

import { useEffect, useRef, useState } from 'react'
import sys from './system.module.css'
import f from './JournalFlow.module.css'

/* Reflection — the deck deals you a prompt, then you write. The base is Lorin's
   real Journal screen; over the carousel a deck of prompts auto-shuffles and
   settles on "Letter to past self", then the parent's reflection types itself
   into the composer and the mood tags land. Everything sits in % of the screen,
   so the overlay holds at any size. Reduced motion: composed, no loop. */

// her verbatim prompts, ending on the one the entry below answers
const PROMPTS = [
  ['Sensory Memory:', 'Write about what you remember about your birth experience, What did you see, smell, hear? What textures did you feel?'],
  ['The Three H’s:', 'It can be hard to identify your needs when you are a full time parent. Try starting with the three H’s. Do you need to be Heard, Hugged, or Helped?'],
  ['Letter to Past Self:', 'Write a message to your past self who is about to give birth. What wisdom do you want to share?'],
]
const SETTLE = PROMPTS.length - 1
// the parent's words, verbatim from the screen Lorin designed
const REFLECTION = 'This is going to hurt like hell, but you are a fighter and baby needs you to give this everything you’ve got.'
const TAGS = [['Empowered', f.tEmp], ['Hopeful', f.tHope]]

export default function JournalFlow({ cap }) {
  const ref = useRef(null)
  const timers = useRef([])
  const reduce = useRef(false)
  const [idx, setIdx] = useState(0)
  const [typed, setTyped] = useState(0)
  const [tagN, setTagN] = useState(0)

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce.current) { setIdx(SETTLE); setTyped(REFLECTION.length); setTagN(TAGS.length); return }

    const push = (t) => timers.current.push(t)
    const clearAll = () => { timers.current.forEach((t) => { clearTimeout(t); clearInterval(t) }); timers.current = [] }

    const run = () => {
      clearAll()
      setIdx(0); setTyped(0); setTagN(0)
      for (let k = 1; k <= SETTLE; k++) push(setTimeout(() => setIdx(k), 1600 * k))
      push(setTimeout(() => {
        let c = 0
        const iv = setInterval(() => {
          c += 1; setTyped(c)
          if (c >= REFLECTION.length) {
            clearInterval(iv)
            push(setTimeout(() => setTagN(1), 280))
            push(setTimeout(() => setTagN(2), 640))
            push(setTimeout(run, 6000))
          }
        }, 30)
        push(iv)
      }, 1600 * SETTLE + 900))
    }

    let started = false
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) { started = true; run() }
    }, { threshold: 0.4 })
    o.observe(ref.current)
    return () => { o.disconnect(); clearAll() }
  }, [])

  const writing = typed > 0 && typed < REFLECTION.length

  return (
    <figure ref={ref} className={f.wrap}>
      <span className={`${sys.phone} ${f.phone}`}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={`${sys.phoneScreen} ${f.screen}`}>
          <img className={f.base} src="/images/birthstory/bs-reflect-card.png" alt="The Journal: a deck of reflection prompts above a composer where you write the entry." loading="lazy" draggable="false" />

          {/* prompt deck — covers the baked carousel, then shuffles on top */}
          <span className={f.deck} aria-hidden="true">
            <span className={f.cover} />
            <span className={`${f.card} ${f.peekL}`} />
            <span className={`${f.card} ${f.peekR}`} />
            <span key={idx} className={`${f.card} ${f.front}`}>
              <span className={f.cardBody}>
                <span className={f.cardT}>{PROMPTS[idx][0]}</span>
                <span className={f.cardB}>{PROMPTS[idx][1]}</span>
              </span>
              <span className={f.cardNav}>
                <svg viewBox="0 0 24 24" className={f.navIc}><path d="M15 5l-7 7 7 7" /></svg>
                <svg viewBox="0 0 24 24" className={f.navIc}><path d="M12 20s-7-4.4-7-9a3.6 3.6 0 0 1 7-1 3.6 3.6 0 0 1 7 1c0 4.6-7 9-7 9Z" /></svg>
                <svg viewBox="0 0 24 24" className={f.navIc}><path d="M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12" /></svg>
                <svg viewBox="0 0 24 24" className={f.navIc}><path d="M9 5l7 7-7 7" /></svg>
              </span>
            </span>
          </span>

          {/* composer — the entry types itself in, then the tags land */}
          <span className={f.compose} aria-hidden="true">
            <span className={f.cover2} />
            <span className={f.tags} data-on={tagN > 0}>
              {TAGS.slice(0, tagN).map(([label, cls]) => (
                <span key={label} className={`${f.tag} ${cls}`}>{label}</span>
              ))}
            </span>
            <span className={f.entry}>
              {REFLECTION.slice(0, typed)}
              {writing && <span className={f.caret} />}
            </span>
          </span>
        </span>
      </span>
      {cap && <figcaption className={f.cap}>{cap}</figcaption>}
    </figure>
  )
}
