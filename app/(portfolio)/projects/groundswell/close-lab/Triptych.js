import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import s from './page.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* Three equal cards, everything visible (FS166): a statement and one
   supporting line each, saying only what no other section says. */
export default function Triptych({ cards }) {
  return (
    <section className={s.close} aria-label="What the project taught, my role, and what changed">
      {cards.map(({ id, verb, title, line, cite, note, list }, i) => {
        const Mark = MARKS[id]
        return (
          <article key={id} className={s.card} data-practice={id}>
            <span className={s.mark} aria-hidden="true">
              <Mark animate showBrush delay={0.2 + i * 0.25} gradientColors={BRAND_GRADIENT} />
            </span>
            <p className={s.verb}>{verb}</p>
            <h3 className={s.title}>{title}</h3>
            <p className={s.line}>{line}</p>
            {cite && <p className={s.cite}>{cite}</p>}
            {list ? (
              <ul className={`${s.note} ${s.list}`}>
                {list.map((x) => <li key={x}>{x}</li>)}
              </ul>
            ) : <p className={s.note}>{note}</p>}
          </article>
        )
      })}
    </section>
  )
}
