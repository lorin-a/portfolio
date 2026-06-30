'use client'

import { FieldSection, Lead, Prose, Figure, Split } from './kit'
import { IaV1, IaFinal } from './IaDiagrams'
import { birthPhoto } from '@/lib/cloudinary'

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
            <Lead>The app opens straight into documentation, with no home screen and nothing to answer first.</Lead>
            <Prose>
              My first version opened by asking the parent where they were: before, during, or after the
              birth, at home or in the hospital. I thought that was being thorough, but in testing it
              read like a form at the front desk while you’re still catching your breath. It was too
              many questions to answer before getting to anything that mattered.
            </Prose>
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

      <Figure
        tag="first version"
        cap="ia-v1 · a branching questionnaire that asked conditional questions before any entry."
      >
        <IaV1 />
      </Figure>

      <Prose>
        So I cut the questions entirely. The app opens straight into note-taking, the thing parents
        most wanted, and onboarding introduces the rest, which stay in the nav bar the whole time.
      </Prose>
      <Prose>
        While I was at it, I stopped splitting the data up. The brief asked for four kinds of capture,
        medical, contextual, narrative, and feelings, and instead of giving each its own corner I put
        them on one timeline you tag and filter, because the earlier versions that separated them had
        tested as fragmented and confusing.
      </Prose>

      <Figure
        tag="what shipped"
        cap="ia-final · five tabs, a single add button at center, nothing to answer before beginning."
      >
        <IaFinal />
      </Figure>
    </FieldSection>
  )
}
