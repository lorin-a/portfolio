'use client'

import { FieldSection, Lead, Prose, Friction, Note, Split, Figure, sys } from './kit'
import { cloudImg } from '@/lib/cloudinary'
import CritStage from './CritStage'
import styles from './SecIteration.module.css'

/* 04 — Iteration. Documented across three rounds of real wireframe testing: each
   round removed options the last one had added. The screens run big beside the
   change and the tester quote that drove it. */

const ROUNDS = [
  {
    label: 'Version 1 · Week 3',
    change: <>The first version offered a tool for every situation, with sub-menus inside menus. It was disorienting, and a parent said so plainly.</>,
    crit: { pin: { x: 50, y: 61 }, quote: 'Onboarding is nice, but there are too many buttons and options.', who: 'Parent tester' },
    shots: [['v1-3', 'V1: reflect / document / connect, the build that did too much']],
  },
  {
    label: 'Version 2 · Week 4',
    change: <>Version 2 consolidated the separate sections into one filterable notes feature and reduced the flow to two actions, document and reflect, introduced one at a time. It was clearer, but still offered too many options. Testing also caught the language.</>,
    quote: 'Why “reclaim”? I’m not sure what it even means.',
    who: 'Parent tester',
    shots: [['v2-1', 'V2 splash'], ['v2-2', 'V2 welcome'], ['v2-3', 'one menu']],
  },
  {
    label: 'Version 3 · Week 5',
    change: <>Version 3 kept only the features parents consistently valued, and made room to go deeper without distracting from them: one home, four ways in.</>,
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

function Round({ label, change, quote, who, crit, shots }) {
  return (
    <Split
      text={
        <>
          <div className={styles.roundHead}>
            <p className={`${sys.eyebrow} ${sys.up}`}>{label}</p>
            <Prose>{change}</Prose>
          </div>
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
    <FieldSection id="iteration" num="04" crumb="iteration" when="Weeks 3–5" alt wide>
      <Lead>Each round removed options the previous one had added. The app got simpler as testing went on.</Lead>
      <Prose>I tested wireframes with parents in three rounds and changed direction based on what they told me.</Prose>

      {ROUNDS.map((r) => <Round key={r.label} {...r} />)}

      <Friction tag="what I could not test">
        A six-week studio cannot show whether parents return to the app weeks later, once the fog lifts.
        That return is the core promise of the product, and it remains unproven.
      </Friction>

      <Figure
        photo
        tag="the crit wall"
        className={styles.critWall}
        ratio="16 / 7"
        src={cloudImg('class_notes', 2000)}
        alt="A whiteboard from the final review: printed app screens taped up in two columns labeled Gradient and Color Block, covered in red and orange handwritten feedback about tags, icons, the gradient, and touch-target sizes."
        cap="The final review: every screen printed and marked up, with the gradient-versus-color-block decision worked out in red."
      />
    </FieldSection>
  )
}
