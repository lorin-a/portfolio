'use client'

import { useEffect, useRef, useState } from 'react'
import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import styles from './SheetReflection.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* THE REFLECTION (FS164–FS186): three cards on one grammar, mark · label ·
   a from → to shift on one line · three bullets led by her two-word heads.
   The marks draw on once the row scrolls into the sheet's view (the sheet
   is its own scroller, so the observer watches the viewport). Reduced
   motion: the marks skip straight to their painted state. */
export default function SheetReflection({ cards = [] }) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (!cards.length) return null
  return (
    <section ref={ref} className={styles.reflection} data-reveal="0"
      aria-label={cards.map((c) => c.title).join(', ')}>
      {cards.map(({ id, verb, title, shift, list }, i) => {
        const Mark = MARKS[id]
        return (
          <article key={id} className={styles.card} data-practice={id}>
            <header className={styles.head}>
              <span className={styles.mark} aria-hidden="true">
                {Mark && <Mark animate={seen} delay={0.15 + i * 0.25} showBrush gradientColors={BRAND_GRADIENT} />}
              </span>
              <h3 className={styles.label}><span className={styles.verb}>{verb}</span> {title}</h3>
              <p className={styles.shift} aria-label={`From ${shift[0]} to ${shift[1]}`}>
                <span aria-hidden="true">{shift[0]}</span>
                <span className={styles.arrow} aria-hidden="true">→</span>
                <span className={styles.to} aria-hidden="true">{shift[1]}</span>
              </p>
            </header>
            <ul className={styles.list}>
              {list.map(({ head, text }) => (
                <li key={head}><strong className={styles.runHead}>{head}.</strong> {text}</li>
              ))}
            </ul>
          </article>
        )
      })}
    </section>
  )
}
