'use client'

import { FieldSection, Ask, Prose, Finding, Note, Split, Figure, sys } from './kit'
import { cloudImg } from '@/lib/cloudinary'
import CritStage from './CritStage'
import styles from './SecIteration.module.css'

/* 04 — Iteration. Question: when people are overwhelmed, what do you take away?
   Three rounds of real wireframes, each led by the change and the tester quote
   that forced it, with the screens shown big beside it. Watching them in order,
   the app calms down. Copy is draft, in her voice. */

const ROUNDS = [
  {
    kicker: 'round 1 · week 3',
    change: <>The first build offered every tool I could imagine: a path for every situation. A parent put the problem plainly.</>,
    crit: { pin: { x: 50, y: 61 }, quote: 'Onboarding is nice, but there are too many buttons and options.', who: 'Parent tester' },
    shots: [['v1-3', 'V1: reflect / document / connect, the build that did too much']],
  },
  {
    kicker: 'round 2 · week 4',
    change: <>So I cut to two verbs, Document and Reflect, and walked people through one at a time. Then a tester caught the <em>words</em>.</>,
    quote: 'Why “reclaim”? I’m not sure what it even means.',
    who: 'Parent tester',
    shots: [['v2-1', 'V2 splash'], ['v2-2', 'V2 welcome'], ['v2-3', 'one menu']],
  },
  {
    kicker: 'round 3 · week 5',
    change: <>What was left is the answer: one home, four ways in. Voice notes and the timeline stayed; the rest I let go.</>,
    quote: null,
    who: null,
    shots: [['v3-2', 'final home'], ['v3-4', 'Birth Story Book'], ['v3-5', 'search']],
  },
]

function Screen({ id, cap }) {
  return (
    <figure className={styles.screen}>
      <span className={sys.phone} style={{ width: '100%' }}>
        <span className={sys.phoneNotch} aria-hidden="true" />
        <span className={sys.phoneScreen}>
          <img src={`/images/birthstory/evolution/screens/${id}.png`} alt={cap} loading="lazy" draggable="false" />
        </span>
      </span>
      <figcaption className={styles.screenCap}>{cap}</figcaption>
    </figure>
  )
}

function Round({ kicker, change, quote, who, crit, shots }) {
  return (
    <Split
      text={
        <>
          <Finding kicker={kicker}>{change}</Finding>
          {quote && <div className={sys.up}><Note who={who}>“{quote}”</Note></div>}
        </>
      }
    >
      {crit ? (
        <CritStage pin={crit.pin} quote={crit.quote} who={crit.who} side="right" cap={shots[0][1]}>
          <span className={styles.critDevice}>
            <span className={sys.phone} style={{ width: '100%' }}>
              <span className={sys.phoneNotch} aria-hidden="true" />
              <span className={sys.phoneScreen}>
                <img src={`/images/birthstory/evolution/screens/${shots[0][0]}.png`} alt={shots[0][1]} loading="lazy" draggable="false" />
              </span>
            </span>
          </span>
        </CritStage>
      ) : (
        <div className={styles.strip}>
          {shots.map(([id, cap]) => <Screen key={id} id={id} cap={cap} />)}
        </div>
      )}
    </Split>
  )
}

export default function SecIteration() {
  return (
    <FieldSection id="iteration" num="04" crumb="iteration" when="weeks 3–5 · testing" alt wide>
      <Ask>When people are overwhelmed, what do you take <em>away</em>?</Ask>
      <Prose>Each round I put wireframes in front of parents and changed course on what they told me. Watching them in order, you can see the app calm down.</Prose>

      {ROUNDS.map((r) => <Round key={r.kicker} {...r} />)}

      <Figure
        photo
        tag="the crit wall"
        className={styles.critWall}
        ratio="16 / 7"
        src={cloudImg('class_notes', 2000)}
        alt="A whiteboard from the final review: printed app screens taped up in two columns labeled Gradient and Color Block, covered in red and orange handwritten feedback about tags, icons, the gradient, and touch-target sizes."
        cap="The whole final crit on one wall: every screen marked up, and the gradient-versus-color-block call argued out in red."
      />
    </FieldSection>
  )
}
