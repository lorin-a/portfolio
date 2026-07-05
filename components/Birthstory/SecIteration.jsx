'use client'

import { FieldSection, Lead, Prose, Insight, Friction, TesterNote, Figure, sys } from './kit'
import { cloudImg } from '@/lib/cloudinary'
import CritStage from './CritStage'
import styles from './SecIteration.module.css'

/* 04 — Iteration. Documented across three rounds of real wireframe testing: each
   round removed options the last one had added. The screens run big beside the
   change and the tester quote that drove it. */

const ROUNDS = [
  {
    label: 'Version 1 · Week 3',
    change: <>The first version tried to do everything, with a tool for every situation and sub-menus inside menus. It was disorienting.</>,
    note: 'Watching the versions in order, you can see the app calm down.',
    crit: { pin: { x: 50, y: 61 }, summary: true, kicker: 'the feedback', quote: 'Too many menus, too many buttons; the first build tried to do everything.', who: null },
    shots: [['v1-3', 'V1: reflect / document / connect, the build that did too much']],
  },
  {
    label: 'Version 2 · Week 4',
    change: <>For the second version I consolidated everything into one filterable notes section and narrowed the flow to two actions, document and reflect, one at a time. It was clearer, but still too many options, and the copy drew a flag too.</>,
    summary: true,
    kicker: 'the feedback',
    quote: 'The word ‘reclaim’ made the app feel braced for trauma: it pre-framed birth as something to recover from, not the feat and the memory it also is.',
    who: null,
    shots: [['v2-1', 'V2 splash'], ['v2-2', 'V2 welcome'], ['v2-3', 'one menu']],
  },
  {
    label: 'Version 3 · Week 5',
    change: <>By the third version I kept only the features parents came back to, and left room to go deeper.</>,
    quote: null,
    who: null,
    friction: true, // "what I couldn't test" rides V3's copy column, not a floating line
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

/* each round on the deep-dive grammar (Lorin's direction 2026-07-03): copy
   column left — version marker, the change, and any margin voice — with the
   artifact large on the right inside the gradient stage; the pinned tester
   quote lives INSIDE the stage, part of the feature container. */
function Round({ label, change, quote, who, kicker, summary, crit, shots, note, friction }) {
  return (
    <div className={styles.round}>
      <div className={styles.copy}>
        <div className={styles.roundHead}>
          <p className={`${sys.eyebrow} ${sys.up}`}>{label}</p>
          <Prose>{change}</Prose>
        </div>
        {quote && <TesterNote quote={quote} who={who} kicker={kicker} summary={summary} />}
        {note && <Insight>{note}</Insight>}
        {friction && (
          <Friction tag="what I couldn’t test">
            A six-week studio can’t show whether parents come back weeks later, once the fog has lifted.
            That return is the whole promise of the product, so it’s the part I most wish I had been able
            to test.
          </Friction>
        )}
      </div>

      <div className={`${styles.stage} ${sys.up}`}>
        {crit ? (
          <CritStage pin={crit.pin} quote={crit.quote} who={crit.who} kicker={crit.kicker} summary={crit.summary} side="right" cap={shots[0][1]}>
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
      </div>
    </div>
  )
}

export default function SecIteration() {
  // no section-level week stamp — the three version markers below are the
  // one canonical timeline (V1 · Week 3 → V3 · Week 5)
  return (
    <FieldSection id="iteration" crumb="iteration" alt wide sub>
      <div className={sys.headCluster}>
        <Lead>Each round made the app simpler.</Lead>
        <Prose>I took three versions through critique, a client check-in, and one round of think-aloud testing (TAP) with parents our client connected us with, and changed direction based on what I heard.</Prose>
      </div>

      <Figure
        photo
        tag="think-aloud walkthrough"
        className={styles.tapShot}
        src="https://res.cloudinary.com/dc17mvdyv/image/upload/f_auto,q_auto,w_1300/v1782679668/UX_Interview.jpg"
        alt="A think-aloud walkthrough over Zoom, with two facilitators on the right and the parent tile blurred for privacy on the left."
        cap="A think-aloud (TAP) walkthrough over Zoom: parents talked through the wireframes so we could hear where the flow broke · parent blurred for privacy"
      />

      {ROUNDS.map((r) => <Round key={r.label} {...r} />)}

      <Figure
        photo
        tag="the crit wall"
        className={styles.critWall}
        src={cloudImg('class_notes', 2000, { chain: ['e_brightness:48', 'e_contrast:level_16;type_sigmoidal', 'ar_16:9,c_auto'] })} /* Lorin's Media Editor correction — don't stack further e_* on top; 16:9 c_auto verified to keep every note on the board */
        alt="A whiteboard from the final review: printed app screens taped up in two columns labeled Gradient and Color Block, covered in red and orange handwritten feedback about tags, icons, the gradient, and touch-target sizes."
        cap="The final review: every screen printed and marked up, with the gradient-versus-color-block decision worked out in red."
      />
    </FieldSection>
  )
}
