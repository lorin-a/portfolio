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
            <Lead>The app opens directly into documentation. There is no home screen, and nothing to answer before you begin.</Lead>
            <Prose>
              My first structure opened by asking where the parent was: before, during, or after the
              birth, at home or in the hospital. In testing it read like a form at the front desk while
              someone was still catching their breath. It added complexity the function did not justify,
              and it asked too many questions before getting to the point.
            </Prose>
          </>
        }
      >
        <Figure
          tag="context"
          photo
          src={disorient.src}
          byline={disorient.byline}
          alt="A hand holds a newborn's foot in a hospital room in the first hours after birth."
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
        The reframe was to get out of the way. The app opens straight into note-taking, the feature
        parents most wanted, and a brief onboarding flow introduces the others, which stay reachable
        from the nav bar at all times.
      </Prose>
      <Prose>
        A second decision unified the data. The brief required four kinds of capture: medical,
        contextual, narrative, and feelings. Rather than give each its own destination, I consolidated
        them into one timeline that every entry feeds, tagged and filterable by topic. Earlier versions
        separated them and tested as fragmented and complex.
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
