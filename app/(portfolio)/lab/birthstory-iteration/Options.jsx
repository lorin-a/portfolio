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

/* ════════════════════════════════════════════════════════════════════
   D · WHAT TESTING CHANGED (FS339). Merges Architecture, Iteration, and
   UX Writing into one evidence chain, built on her Question Map: Q5 (how
   evidence became decisions, before/after), Q4 (what she rejected), Q6/
   Q8 (honest limits), rubric #1 (the why). Her thinking pattern is the
   thesis (Q16, verbatim) and the narrowing is drawn to scale.
   Receipts: counts from the live IaAria / IaDiagrams (4 intake questions,
   2 home pages, “4 → 0”), V2 menu (4 choices), V3 (opens on the timeline,
   5 tabs); requirements A–E (BIRTHSTORY-requirements-source.txt); Q3,
   Q7, Q9, Q12, Q16; tester quotes from her research doc; summaries carry
   no quotation marks. */

const THESIS = 'My pattern as a big dreamer is to try to do everything at first, and I almost always end up narrowing down further and further until I get to the heart of a product.'

const NARROW = [
  { v: 'Version 1', when: 'Week 3', count: '4 intake questions', unit: 'Then a choice of two home pages, before the first entry.', src: `${E}/v1-hub.png`, alt: 'Version 1 home with three choices.', w: 100 },
  { v: 'Version 2', when: 'Week 4', count: '4 menu choices', unit: 'One menu before the first entry.', src: `${E}/screens/v2-3.png`, alt: 'Version 2 menu with four choices.', w: 66 },
  { v: 'Version 3', when: 'Week 5', count: 'Nothing first', unit: 'Opens on the notes timeline; the other features are 5 tabs in the nav bar.', src: `${E}/screens/v3-2.png`, alt: 'Version 3: the notes timeline.', w: 34 },
]

const CHAIN = [
  {
    heard: { quote: 'Too many menus', who: 'A parent tester' },
    decided: 'Remove the home menu. The app opens into the most desired feature, note-taking, and the other features stay in the nav bar.',
    after: { src: `${E}/screens/v3-2.png`, alt: 'Version 3 opening on the notes timeline.' },
    delta: '4 menu choices → 0',
  },
  {
    heard: { summary: 'Parents were less interested in medical records and more interested in photos and an outline of what happened.' },
    decided: 'One notes section filtered by topic, instead of medical documentation in one place and memories in another.',
    after: { src: '/images/birthstory/bs-doc-medical.png', alt: 'Version 3: a medical entry as a tagged card on the same timeline.' },
    delta: '4 tools → 1 timeline',
  },
  {
    heard: { summary: 'A parent did not connect with “reclaim,” and the compassionate copy read as assuming a negative experience.' },
    decided: 'Shift the copy to be care-centered and neutral, and rename “Find strength & support,” which positioned the new mother in a negative light.',
    after: { src: '/images/birthstory/bs-carepod.png', alt: 'Version 3: the Care Pod.' },
    delta: 'Copy rewritten + feature renamed',
  },
]

const SCOPE = [
  { name: 'Sharing', state: 'kept', note: 'Became the Care Pod' },
  { name: 'Partner participation', state: 'kept', note: 'Became the Care Pod' },
  { name: 'Baby book', state: 'kept', note: 'The Birth Story Book' },
  { name: 'Trackers', state: 'cut', note: 'Too much for a parent with little to no capacity' },
  { name: 'Birth plan', state: 'cut', note: 'Too much for a parent with little to no capacity' },
  { name: 'Search', state: 'added', note: 'Not in the brief; for brain fog' },
]

function HeardLine({ h }) {
  return h.quote
    ? <p className={s.dHeard}><span className={s.dWho}>{h.who}</span><span className={s.dQuote}>“{h.quote}”</span></p>
    : <p className={s.dHeard}><span className={s.dWho}>What we heard</span><span>{h.summary}</span></p>
}

export function WhatTestingChanged() {
  return (
    <div className={s.d}>
      <blockquote className={s.dThesis}><p>{THESIS}</p></blockquote>

      {/* 1 · the narrowing, to scale */}
      <figure className={s.dBlock}>
        <span className={s.kicker}>1 · The narrowing</span>
        <div className={s.funnel}>
          {NARROW.map((n) => (
            <div key={n.v} className={s.fStep}>
              <div className={s.fBar} style={{ '--w': `${n.w}%` }}>
                <span className={s.fCount}>{n.count}</span>
              </div>
              <div className={s.fBody}>
                <span className={s.fPhone}><img src={n.src} alt={n.alt} /></span>
                <p className={s.fText}><b>{n.v} · {n.when}</b>{n.unit}</p>
              </div>
            </div>
          ))}
        </div>
        <figcaption className={s.dNote}>
          <b>How I ran the tests:</b> I simplified my image-heavy first prototype into a color-block and simple-icon wireframe, which directed the feedback to the flow itself.
        </figcaption>
      </figure>

      {/* 2 · evidence → decision → built */}
      <div className={s.dBlock}>
        <span className={s.kicker}>2 · What we heard, what I decided</span>
        <ol className={s.chain}>
          <li className={s.chainHead} aria-hidden="true"><span>Evidence</span><span /><span>Decision</span><span>Built</span></li>
          {CHAIN.map((c, i) => (
            <li key={i} className={s.chainRow}>
              <HeardLine h={c.heard} />
              <span className={s.chainArrow} aria-hidden="true">→</span>
              <p className={s.chainDecided}>{c.decided}</p>
              <div className={s.chainAfter}>
                <span className={s.fPhone}><img src={c.after.src} alt={c.after.alt} /></span>
                <span className={s.chainDelta}>{c.delta}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* 3 · scope: kept, cut, added */}
      <div className={s.dBlock}>
        <span className={s.kicker}>3 · The brief’s optional features: kept, cut, added</span>
        <ul className={s.scope}>
          {SCOPE.map((x) => (
            <li key={x.name} className={s.scopeItem} data-state={x.state}>
              <span className={s.scopeState}>{x.state}</span>
              <span className={s.scopeName}>{x.name}</span>
              <span className={s.scopeNote}>{x.note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 4 · limits */}
      <div className={`${s.dBlock} ${s.limits}`}>
        <span className={s.kicker}>4 · What I couldn’t test</span>
        <p>We were not able to show an A/B to the parents we interviewed; our client did see all three iterations and was very happy with the final.</p>
        <p>{UNTESTED}</p>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════════════
   E · FROM THE REFERENCES (FS341). Komoot (Ellen Covey) and Rokt (Gloria
   Lo): iteration as one static row of versions, decisions as stacked
   beats with full-sentence headings, 2–3 sentences, Before | After side
   by side; no galleries (Buck). One visual vocabulary: the gradient
   band, phones, sage labels, the heading face.
   Receipts: Q3 (fidelity lesson), Q9 (rounds), Q7, Q12, the sister
   synthesis (summary), the parent-tester quote from her research doc. */

const DECISIONS = [
  {
    head: 'Remove the home menu, so parents land on the task.',
    body: <>Version 2 asked parents to choose from a menu of four before they could write anything. A parent tester put it plainly: <i>“Too many menus.”</i> The app now opens straight into note-taking, and the other features stay in the nav bar.</>,
    before: { src: `${E}/screens/v2-3.png`, alt: 'Version 2: a home menu with four choices.', label: 'Before · Version 2' },
    after: { src: `${E}/screens/v3-2.png`, alt: 'Version 3: the app opens on the notes timeline.', label: 'After · Version 3' },
  },
  {
    head: 'Fold separate tools into one timeline.',
    body: <>Version 1 kept voice notes, notes, photos, and the timeline in separate places. Parents were less interested in medical records and more interested in photos and an outline of what happened, so everything now lands on one timeline, organized by tags.</>,
    before: { src: `${E}/screens/v1-4.png`, alt: 'Version 1: voice note, notes, photos, and timeline as separate tools.', label: 'Before · Version 1' },
    after: { src: '/images/birthstory/bs-doc-medical.png', alt: 'Version 3: a medical entry as a tagged card on the timeline.', label: 'After · Version 3' },
  },
  {
    head: 'Rewrite the copy that assumed a hard birth.',
    body: <>A parent didn’t connect with “reclaim,” and the careful, compassionate copy read as assuming a negative experience. I shifted the tone to care-centered and neutral, and “Find Strength & Support” became the Care Pod.</>,
    before: { src: `${E}/screens/v2-6.png`, alt: 'Version 2: Find Strength & Support in the menu.', label: 'Before · Version 2' },
    after: { src: '/images/birthstory/bs-carepod.png', alt: 'Version 3: the Care Pod.', label: 'After · Version 3' },
  },
]

function Shot({ x }) {
  return (
    <figure className={s.eShot}>
      <span className={s.eLabel}>{x.label}</span>
      <span className={s.ePhone}><img src={x.src} alt={x.alt} /></span>
    </figure>
  )
}

export function FromTheReferences() {
  return (
    <div className={s.e}>
      {/* 1 · iteration: the three rounds, one static row */}
      <section className={s.eBeat}>
        <h4 className={s.eHead}>Three rounds of wireframes, each simpler than the last.</h4>
        <p className={s.eBody}>I started by fitting in every feature I could, then narrowed. To keep testers focused on the flow, I took my image-heavy first prototype down to color blocks and simple icons.</p>
        <div className={s.eRow3}>
          {ROUNDS.map((r) => (
            <figure key={r.v} className={s.eShot}>
              <span className={s.ePhone}><img src={r.src} alt={r.alt} /></span>
              <figcaption className={s.eCap}><span className={s.eLabel}>{r.v} · {r.when}</span>{r.fidelity}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 2 · the decisions, one at a time */}
      {DECISIONS.map((d) => (
        <section key={d.head} className={s.eBeat}>
          <h4 className={s.eHead}>{d.head}</h4>
          <p className={s.eBody}>{d.body}</p>
          <div className={s.eRow2}>
            <Shot x={d.before} />
            <span className={s.eArrow} aria-hidden="true">→</span>
            <Shot x={d.after} />
          </div>
        </section>
      ))}
    </div>
  )
}
