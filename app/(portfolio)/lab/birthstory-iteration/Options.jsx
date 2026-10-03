'use client'

import { useState } from 'react'
import s from './page.module.css'

/* FS338: three ways to give BirthStory's Iteration one job: how the app
   and the testing evolved across three rounds. The menu removal and the
   rename stay in Architecture and UX Writing.

   Copy, all hers or traced: Q9 (each round), Q3 (fidelity lesson; client
   saw all three), the live SecIteration round summary for V1 (a summary,
   no quotation marks), her V2 slide feedback notes (summary), the live
   “what I couldn't test” (verbatim). */

const E = '/images/birthstory/evolution'

export const ROUNDS = [
  {
    v: 'Version 1', when: 'Week 3', fidelity: 'Image-heavy',
    src: `${E}/screens/v1-3.png`, alt: 'Version 1 home: three choices, Reflect, Document, and Connect, in a purple, image-heavy style.',
    tested: 'Studio critique',
    heard: 'Too many menus and buttons; the first build tried to do everything.',
    changed: 'Far too many user decisions to make; sub-menus within menus was disorienting and it needed to be simplified.',
  },
  {
    v: 'Version 2', when: 'Week 4', fidelity: 'Color block',
    src: `${E}/screens/v2-3.png`, alt: 'Version 2 menu in gray color blocks: Reflect & Reclaim, Document the Details, Find Strength & Support, View Collections.',
    tested: 'Think-aloud sessions with parents',
    heard: 'Onboarding was nice, but there were still too many buttons and options, and “reclaim” read as assuming a negative experience.',
    changed: 'Simplified with stronger flow rationale but still proved to be too many options.',
  },
  {
    v: 'Version 3', when: 'Week 5', fidelity: 'Final',
    src: `${E}/screens/v3-2.png`, alt: 'Version 3: the final notes timeline in deep teal, opening straight into note-taking.',
    tested: 'Client review',
    heard: 'Our client saw all three iterations and was very happy with the final.',
    changed: 'Finally highlighted the core features we heard that users valued.',
  },
]

export const LESSON = 'I learned the lesson that I should only show features I want feedback on in a review, so I simplified my image-heavy first prototype into more of a color-block and simple-icon wireframe, which helped direct the feedback more to the flow itself.'
export const UNTESTED = 'A six-week studio can’t show whether parents come back weeks later, once the fog has lifted. That return is the whole promise of the product, so it’s the part I most wish I had been able to test.'

function Phone({ r, className = '' }) {
  return (
    <span className={`${s.phone} ${className}`}>
      <span className={s.notch} aria-hidden="true" />
      <span className={s.screen}><img src={r.src} alt={r.alt} draggable="false" /></span>
    </span>
  )
}

/* A · THE STRIP: three versions side by side, one line each */
export function Strip() {
  return (
    <figure className={s.strip}>
      <div className={s.stripBand}>
        {ROUNDS.map((r, i) => (
          <div key={r.v} className={s.stripItem}>
            {i > 0 && <span className={s.stripArrow} aria-hidden="true">→</span>}
            <Phone r={r} />
          </div>
        ))}
      </div>
      <div className={s.stripCaps}>
        {ROUNDS.map((r) => (
          <figcaption key={r.v} className={s.stripCap}>
            <span className={s.kicker}>{r.v} · {r.when} · {r.fidelity}</span>
            <span>{r.changed}</span>
          </figcaption>
        ))}
      </div>
      <p className={s.lesson}>{LESSON}</p>
    </figure>
  )
}

/* B · THE NARROWING: the three as a fanned stack; choose one to bring it
   forward, and its round reads beside the stack */
export function Narrowing() {
  const [at, setAt] = useState(2)
  const r = ROUNDS[at]
  return (
    <figure className={s.narrow}>
      <div className={s.fan} role="group" aria-label="Three versions, stacked">
        {ROUNDS.map((x, i) => (
          <button key={x.v} type="button" className={s.fanCard} data-pos={i} data-front={i === at || undefined}
            aria-pressed={i === at} aria-label={`Show ${x.v}`} onClick={() => setAt(i)}>
            <Phone r={x} />
          </button>
        ))}
      </div>
      <div className={s.narrowWords} aria-live="polite">
        <div className={s.steps} role="group" aria-label="Choose a version">
          {ROUNDS.map((x, i) => (
            <button key={x.v} type="button" className={s.stepBtn} aria-pressed={i === at} onClick={() => setAt(i)}>
              <span className={s.stepNum}>{i + 1}</span>{x.when}
            </button>
          ))}
        </div>
        <span className={s.kicker}>{r.v} · {r.fidelity}</span>
        <p className={s.big}>{r.changed}</p>
        <p className={s.small}><b>Tested:</b> {r.tested}</p>
        <p className={s.small}><b>What we heard:</b> {r.heard}</p>
      </div>
    </figure>
  )
}

/* C · THE ROUND LOG: a row per round, the screen and three short facts:
   tested, heard, changed */
export function RoundLog() {
  return (
    <figure className={s.log}>
      {ROUNDS.map((r, i) => (
        <div key={r.v} className={s.logRow}>
          <div className={s.logShot}>
            <span className={s.logNum}>{i + 1}</span>
            <Phone r={r} className={s.logPhone} />
          </div>
          <div className={s.logBody}>
            <span className={s.kicker}>{r.v} · {r.when} · {r.fidelity}</span>
            <dl className={s.logFacts}>
              <div><dt>Tested</dt><dd>{r.tested}</dd></div>
              <div><dt>What we heard</dt><dd>{r.heard}</dd></div>
              <div><dt>What changed</dt><dd>{r.changed}</dd></div>
            </dl>
          </div>
        </div>
      ))}
    </figure>
  )
}
