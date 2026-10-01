'use client'

import { useState } from 'react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import s from './page.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* Three equal cards; “Read more” opens that card's full text in one panel
   under the row, so the cards never stretch to match an opened one. */
export default function Triptych({ cards }) {
  const [open, setOpen] = useState(null)
  const current = cards.find((c) => c.id === open)
  return (
    <section className={s.wrap} aria-label="What the project taught, my role, and what changed">
      <div className={s.close}>
        {cards.map(({ id, verb, title, line, cite }, i) => {
          const Mark = MARKS[id]
          return (
            <article key={id} className={s.card} data-practice={id} data-open={open === id || undefined}>
              <span className={s.mark} aria-hidden="true">
                <Mark animate showBrush delay={0.2 + i * 0.25} gradientColors={BRAND_GRADIENT} />
              </span>
              <p className={s.verb}>{verb}</p>
              <h3 className={s.title}>{title}</h3>
              <p className={s.line}>{line}</p>
              {cite && <p className={s.cite}>{cite}</p>}
              <button type="button" className={s.toggle} aria-expanded={open === id}
                aria-controls="close-more" onClick={() => setOpen(open === id ? null : id)}>
                {open === id ? 'Close' : 'Read more'}
              </button>
            </article>
          )
        })}
      </div>
      <div id="close-more" className={s.panel} data-practice={current?.id} hidden={!current}>
        {current && (
          <>
            <p className={s.panelHead}>{current.verb} · {current.title}</p>
            <div className={s.panelText}>
              {current.more.filter(Boolean).map((t, k) => <p key={k}>{t}</p>)}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
