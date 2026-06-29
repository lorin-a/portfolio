'use client'

import { FieldSection, Ask, Finding, Figure, Split, Friction } from './kit'
import { IaV1, IaFinal } from './IaDiagrams'
import { birthPhoto } from '@/lib/cloudinary'

/* 03 — Architecture. Question-led: what should a parent meet first? The first
   answer (triage) was wrong; the reframe (get out of the way) was the work.
   Real IA diagrams as the before / after. Copy is draft, in her voice. */

export default function SecArchitecture() {
  const disorient = birthPhoto('disorient', 1300)
  return (
    <FieldSection id="architecture" num="03" crumb="architecture" when="week 3 · information architecture" wide>
      <Split
        text={
          <>
            <Ask>What should a parent deal with <em>first</em>, on one of the most disorienting days of their life?</Ask>
            <Finding kicker="my first answer">
              Ask them. The app would open by working out where you were: before, during, or after the
              birth, at home or the hospital, what kind of entry this was. I thought that was thorough.
            </Finding>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={disorient.src}
          byline={disorient.byline}
          alt="A hand holds a newborn's foot in a hospital room in the first hours after birth."
          cap="A newborn in hospital, the first hours the home screen has to meet."
        />
      </Split>

      <Figure
        tag="first answer"
        cap="ia-v1 · a branching questionnaire, conditional questions before a single entry."
      >
        <IaV1 />
      </Figure>
      <Finding kicker="what testing showed">
        It read like a form at the front desk while you were still catching your breath.
      </Finding>

      <Ask kicker="the reframe">Not “where are you in your birth.” The real question was how the app <em>gets out of the way</em>.</Ask>

      <Figure
        tag="what shipped"
        cap="ia-final · five tabs, a + in the dead center, nothing to answer before you begin."
      >
        <IaFinal />
      </Figure>

      <Friction>
        Should <b>New Note</b> be its own tab, or a floating <b>+</b>? It tested fine as a tab, but I
        never put the two side by side, so I can say it worked, not that it’s the right answer.
      </Friction>
    </FieldSection>
  )
}
