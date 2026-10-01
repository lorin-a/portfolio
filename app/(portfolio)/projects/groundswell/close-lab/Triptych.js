import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import s from './page.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* FS173: one grammar for all three: symbol · label · statement · two
   bullets. Slots aligned across the row by subgrid. */
export default function Triptych({ cards }) {
  return (
    <section className={s.close} aria-label="What I learned, what I brought together, and what’s next">
      {cards.map(({ id, verb, title, line, list }, i) => {
        const Mark = MARKS[id]
        return (
          <article key={id} className={s.card} data-practice={id}>
            <header className={s.head}>
              <span className={s.mark} aria-hidden="true">
                <Mark animate showBrush delay={0.2 + i * 0.25} gradientColors={BRAND_GRADIENT} />
              </span>
              <h3 className={s.label}><span className={s.verb}>{verb}</span> {title}</h3>
            </header>
            <p className={s.line}>{line}</p>
            <ul className={s.list}>
              {list.map((x) => <li key={x}>{x}</li>)}
            </ul>
          </article>
        )
      })}
    </section>
  )
}
