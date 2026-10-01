import SenseMark from '@/components/marks/SenseMark'
import WeaveMark from '@/components/marks/WeaveMark'
import ShapeMark from '@/components/marks/ShapeMark'
import s from './page.module.css'

const MARKS = { sense: SenseMark, weave: WeaveMark, shape: ShapeMark }
/* the same gradient the About practice cards paint their marks with */
const BRAND_GRADIENT = ['#C5CFA6', '#C7AAD1', '#F79C7E']

/* FS183: the same content in four treatments. Constant across all four:
   the shift sits on ONE line (sized to the card with a container query),
   the order is label → shift → bullets, and colour means the practice. */
export default function Triptych({ cards, variant = 'a' }) {
  const runIn = variant === 'c' || variant === 'd'
  return (
    <section className={`${s.close} ${s['v' + variant]}`}
      aria-label="What I learned, what I’ll carry forward, and what’s next">
      {cards.map(({ id, verb, title, shift, list }, i) => {
        const Mark = MARKS[id]
        return (
          <article key={id} className={s.card} data-practice={id}>
            <header className={s.head}>
              <span className={s.mark} aria-hidden="true">
                <Mark animate showBrush delay={0.2 + i * 0.25} gradientColors={BRAND_GRADIENT} />
              </span>
              <h3 className={s.label}><span className={s.verb}>{verb}</span> {title}</h3>
              <p className={s.shift} aria-label={`From ${shift[0]} to ${shift[1]}`}>
                <span className={s.from} aria-hidden="true">{shift[0]}</span>
                <span className={s.arrow} aria-hidden="true">→</span>
                <span className={s.to} aria-hidden="true">{shift[1]}</span>
              </p>
            </header>
            <ul className={s.list}>
              {list.map(({ head, text }) => (
                <li key={head}>
                  {runIn ? (
                    <><strong className={s.runHead}>{head}.</strong> {text}</>
                  ) : (
                    <>
                      <strong className={s.bulletHead}>{head}</strong>
                      <span className={s.bulletText}>{text}</span>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </article>
        )
      })}
    </section>
  )
}
