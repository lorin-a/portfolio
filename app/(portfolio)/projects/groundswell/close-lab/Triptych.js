import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import s from './page.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* FS171: three reading levels only (header · statement · bullets), one
   left edge, and the four slots aligned across the row by subgrid, so the
   eye reads three statements on one line and three lists on the next. */
export default function Triptych({ cards }) {
  return (
    <section className={s.close} aria-label="The lesson, my growth, and what changed">
      {cards.map(({ id, verb, title, line, context, listLabel, list }, i) => {
        const Mark = MARKS[id]
        return (
          <article key={id} className={s.card} data-practice={id}>
            <header className={s.head}>
              <span className={s.mark} aria-hidden="true">
                <Mark animate showBrush delay={0.2 + i * 0.25} gradientColors={BRAND_GRADIENT} />
              </span>
              <span className={s.verb}>{verb}</span>
              <h3 className={s.title}>{title}</h3>
            </header>
            <p className={s.line}>{line}</p>
            <p className={s.context}>{context}</p>
            <div className={s.listWrap}>
              {listLabel && <p className={s.listLabel}>{listLabel}</p>}
              <ul className={s.list}>
                {list.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          </article>
        )
      })}
    </section>
  )
}
