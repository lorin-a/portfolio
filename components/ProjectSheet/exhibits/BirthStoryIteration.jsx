'use client'

import { rich } from '../SheetContent'
import s from './BirthStoryIteration.module.css'

/* ITERATION, as her reference case studies show it (FS341–FS343; lab
   Option E). Komoot (Ellen Covey) and Rokt (Gloria Lo): iteration as one
   static row of the versions; each decision its own beat, a
   full-sentence heading, two or three sentences, Before and After side
   by side. No gallery, nothing to click, one visual vocabulary. Copy
   arrives as `data` from content/sheets/birthstory.js with receipts. */

function Phone({ src, alt }) {
  return <span className={s.phone}><img src={src} alt={alt} loading="lazy" /></span>
}

export default function BirthStoryIteration({ data }) {
  const { intro, rounds = [], decisions = [], untested } = data || {}
  return (
    <div className={s.e}>
      <section className={s.beat}>
        <h4 className={s.head}>{intro.head}</h4>
        <p className={s.body}>{rich(intro.body)}</p>
        <div className={`${s.band} ${s.row3}`}>
          {rounds.map((r) => (
            <figure key={r.tag} className={s.shot}>
              <Phone src={r.src} alt={r.alt} />
              <figcaption className={s.cap}><span className={s.label}>{r.tag}</span>{r.fidelity}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {decisions.map((d) => (
        <section key={d.head} className={s.beat}>
          <h4 className={s.head}>{d.head}</h4>
          <p className={s.body}>{rich(d.body)}</p>
          <div className={`${s.band} ${s.row2}`}>
            <figure className={s.shot}><span className={s.label}>{d.before.label}</span><Phone {...d.before} /></figure>
            <span className={s.arrow} aria-hidden="true">→</span>
            <figure className={s.shot}><span className={s.label}>{d.after.label}</span><Phone {...d.after} /></figure>
          </div>
        </section>
      ))}

      {untested && (
        <p className={s.untested}><span className={s.untestedLabel}>What I couldn’t test</span>{untested}</p>
      )}
    </div>
  )
}
