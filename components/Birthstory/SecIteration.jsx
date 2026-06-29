'use client'

import { FieldSection, Ask, Prose, Shot, Note, Friction, sys } from './kit'
import styles from './SecIteration.module.css'

/* 04 — Iteration. Question: when people are overwhelmed, what do you take away?
   Three rounds of real wireframes; the tester quote that drove each cut sits
   right beside the screens. The colour quiets as the app finds its core. */

const ROUNDS = [
  {
    label: 'round 1 · week 3',
    prose: <>The first build offered every tool I could imagine — a path for every situation.</>,
    quote: 'Onboarding is nice, but there are too many buttons and options.',
    who: 'Parent tester',
    shots: [['v1-1', 'V1 welcome'], ['v1-3', 'V1 reflect / document / connect'], ['v1-4', 'V1 reflect grid']],
  },
  {
    label: 'round 2 · week 4',
    prose: <>So I cut to two verbs — Document and Reflect — and walked people through one at a time. Then a tester caught the <em>words</em>.</>,
    quote: 'Reconsider language — why “reclaim”? Compassionate copy may presume a negative experience.',
    who: 'Parent tester',
    shots: [['v2-1', 'V2 splash'], ['v2-2', 'V2 welcome'], ['v2-3', 'V2 one menu']],
  },
  {
    label: 'round 3 · week 5',
    prose: <>What was left is the answer: one home, four ways in. Voice notes and the timeline stayed; the rest I let go.</>,
    quote: null, who: null,
    shots: [['v3-2', 'final home'], ['v3-4', 'final Birth Story Book'], ['v3-5', 'final search']],
  },
]

export default function SecIteration() {
  return (
    <FieldSection id="iteration" num="04" crumb="iteration" when="weeks 3–5 · testing" alt>
      <Ask>When people are overwhelmed, what do you take <em>away</em>?</Ask>
      <Prose>Each round I put wireframes in front of parents and changed course on what they told me. Watching them in order, you can see the app calm down.</Prose>

      {ROUNDS.map((r) => (
        <div key={r.label} className={styles.round}>
          <span className={sys.askKicker}>{r.label}</span>
          <Prose>{r.prose}</Prose>
          <div className={`${styles.shots} ${sys.up}`}>
            {r.shots.map(([id, alt]) => (
              <Shot key={id} src={`/images/birthstory/evolution/screens/${id}.png`} alt={alt} cap={alt} width="138px" />
            ))}
          </div>
          {r.quote && <div className={sys.up}><Note who={r.who}>“{r.quote}”</Note></div>}
        </div>
      ))}

      <Friction>
        I never ran a clean A/B between the two-verb split and the single home — the change came from
        watching people stall, not from a controlled test. I trust it, but I’d want the numbers.
      </Friction>
    </FieldSection>
  )
}
