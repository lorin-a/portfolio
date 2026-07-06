'use client'

import { FieldSection, Lead, Prose, Insight, Figure, Split, sys } from './kit'
import { IaV1, IaFinal } from './IaDiagrams'
import { birthPhoto } from '@/lib/cloudinary'
import a from './SecArchitecture.module.css'

/* 03 — Information architecture. The structural decision documented: no triage
   home screen, open straight into documentation, and unify the four capture
   types into one timeline. Real IA diagrams as the before / after. */

export default function SecArchitecture() {
  const disorient = birthPhoto('disorient', 1300)
  return (
    <FieldSection id="architecture" num="03" crumb="information architecture" when="Week 3" wide>
      <Split
        text={
          <>
            <Lead>
              New parents recovering from birth have limited capacity, which made the introduction,
              onboarding, and user flow make-or-break: they decide how a parent spends their few
              precious free moments.
            </Lead>
            <Prose>
              Our first attempt met the user in the moment. The opening menu asked what phase they were
              in, before, during, or after the birth, at home or in the hospital, to determine the need,
              and with it the best feature for that moment.
            </Prose>
            <Insight>
              Looking back, it did the opposite of what we intended. Meant to lower cognitive load, it
              gate-kept features instead of offering freedom and autonomy, and it made the app layered and
              disorienting: a form at the front desk while you’re still catching your breath.
            </Insight>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={disorient.src}
          byline={disorient.byline}
          alt="A hand holds a newborn’s foot in a hospital room in the first hours after birth."
          cap="The first hours after birth, the moment the home screen has to meet."
        />
      </Split>

      <div className={a.confront}>
        <Figure
          tag="first version"
          cap="ia-v1 · a branching questionnaire that asked conditional questions before any entry."
        >
          <IaV1 />
        </Figure>

        <div className={`${a.turn} ${sys.up}`}>
          <span className={a.turnStem} aria-hidden="true" />
          <span className={a.turnRow}>
            <span className={a.turnFig}>4 → 0</span>
            <span className={a.turnLabel}>questions before the first entry</span>
          </span>
          <span className={a.turnStem} aria-hidden="true" />
        </div>

        <Figure
          tag="what shipped"
          cap="ia-final · five tabs, a single add button at center, nothing to answer before beginning."
        >
          <IaFinal />
        </Figure>
      </div>

      <div className={`${a.shift} ${sys.up}`}>
        <span className={a.shiftLabel}>the shift</span>
        <p className={a.shiftText}>
          Think-aloud testing over Zoom confirmed it, and drove the most significant shift in our
          approach: from a sequenced entry to an immediate one, opening directly into the main feature for
          the most common use case, notes on a timeline.
        </p>
      </div>

      {/* the two IA moves it produced, as named decisions on a card so they read
          as design judgment, not paragraphs floating on the page */}
      <div className={`${a.moves} ${sys.up}`}>
        <div className={a.moveCard}>
          <p className={a.moveLabel}>Open into the task</p>
          <p className={a.moveText}>
            Rather than layer features, we embedded customization and options inside a simple core, always
            available in the nav bar: four features, each with room to go deeper. If a parent never leaves
            the home page, they still get the use case they wanted most, a timeline of their documentation.
            The rest can be explored another time.
          </p>
        </div>
        <div className={a.moveCard}>
          <p className={a.moveLabel}>Unify, don’t fragment</p>
          <p className={a.moveText}>
            We also stopped splitting the data up. The brief asked for four kinds of capture, medical,
            contextual, narrative, and feelings, and instead of giving each its own corner we put them on
            one timeline you tag and filter, because earlier versions that separated them tested as
            fragmented and confusing.
          </p>
        </div>
      </div>
    </FieldSection>
  )
}
