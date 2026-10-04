'use client'

import { useEffect, useState } from 'react'
import s from './page.module.css'

/* Her picks live in this browser only (localStorage), and leave as text
   she pastes back to Claude. */

const KEY = 'fs393-playground-picks'
const CHOICES = [
  { id: 'in', label: 'In' },
  { id: 'maybe', label: 'Maybe' },
  { id: 'out', label: 'Out' },
]
const sized = (u, w = 750) => `${u}?format=${w}w`
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`

export default function Review({ tiers, items }) {
  const [picks, setPicks] = useState({})
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    try { setPicks(JSON.parse(localStorage.getItem(KEY)) || {}) } catch {}
  }, [])

  const pick = (slug, id) => {
    const next = { ...picks, [slug]: picks[slug] === id ? undefined : id }
    setPicks(next)
    try { localStorage.setItem(KEY, JSON.stringify(next)) } catch {}
  }

  const count = (id) => items.filter((it) => picks[it.slug] === id).length
  const open = items.length - count('in') - count('maybe') - count('out')

  const copy = async () => {
    const group = (id, name) => {
      const list = items.filter((it) => picks[it.slug] === id).map((it) => `- ${it.title}`)
      return list.length ? `${name}:\n${list.join('\n')}` : null
    }
    const text = ['Playground picks (FS393)', group('in', 'In'), group('maybe', 'Maybe'), group('out', 'Out')]
      .filter(Boolean).join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {}
  }

  return (
    <>
      {tiers.map((tier) => (
        <section key={tier.id} className={s.tier} aria-labelledby={`tier-${tier.id}`}>
          <div className={s.tierHead}>
            <h2 id={`tier-${tier.id}`} className={s.secName}>{tier.name}</h2>
            <p className={s.tierNote}>{tier.note}</p>
          </div>
          <ul className={s.grid}>
            {items.filter((it) => it.tier === tier.id).map((it) => (
              <li key={it.slug} className={s.card} data-pick={picks[it.slug] || 'none'}>
                <a className={s.cover} href={it.url} target="_blank" rel="noreferrer" aria-label={`${it.title} on the old site (opens in a new tab)`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sized(it.media.cover, 1000)} alt="" loading="lazy" data-fit={it.fit} />
                </a>
                <div className={s.body}>
                  <p className={s.meta}>{it.kind}</p>
                  <h3 className={s.name}>{it.title}</h3>
                  <p className={s.when}>{it.when}</p>
                  <blockquote className={s.line}>“{it.line}”</blockquote>
                  <p className={s.why}><span className={s.who}>Claude</span>{it.why}</p>
                  {it.flag && <p className={s.flag}>{it.flag}</p>}
                  {it.media.strip.length > 0 && (
                    <ul className={s.strip} aria-label="From the old page">
                      {it.media.strip.map((u) => (
                        <li key={u}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={sized(u, 300)} alt="" loading="lazy" />
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className={s.count}>
                    {plural(it.media.images, 'image')}{it.media.videos ? ` · ${plural(it.media.videos, 'video')}` : ''} on the old page ·{' '}
                    <a href={it.url} target="_blank" rel="noreferrer">Open it ↗</a>
                  </p>
                  <div className={s.picks} role="group" aria-label={`Your pick for ${it.title}`}>
                    {CHOICES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className={s.pick}
                        data-choice={c.id}
                        aria-pressed={picks[it.slug] === c.id}
                        onClick={() => pick(it.slug, c.id)}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className={s.tally} role="status">
        <p>
          <strong>{count('in')}</strong> in · <strong>{count('maybe')}</strong> maybe · <strong>{count('out')}</strong> out
          {open > 0 && <span className={s.left}> · {open} to go</span>}
        </p>
        <button type="button" className={s.copy} onClick={copy}>
          {copied ? 'Copied. Paste it to Claude' : 'Copy my picks'}
        </button>
      </div>
    </>
  )
}
