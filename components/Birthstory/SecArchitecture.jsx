'use client'

import { FieldSection, Ask, Prose, Plate, Friction } from './kit'

/* 03 — Architecture. Question-led: what should a parent meet first? My first
   answer (triage) was wrong; the reframe (get out of the way) was the work.
   Real Figma files as evidence. Copy draft — hers. */

export default function SecArchitecture() {
  return (
    <FieldSection id="architecture" num="03" crumb="architecture" when="week 3 · information architecture">
      <Ask>What should a parent have to deal with <em>first</em> — on one of the most disorienting days of their life?</Ask>

      <Prose>
        My first answer was to ask them. The app opened by working out where you were — before, during,
        or after the birth; at home or the hospital; what kind of entry this was. I thought that was thorough.
      </Prose>

      <Plate
        tab="Fig. 1"
        src="/images/birthstory/system/ia-v1.png"
        alt="V1 information architecture from Figma: a wide branching questionnaire fanning into conditional paths for phase, place, and entry type."
        cap="ia-v1 · figma — twelve conditional paths before a first entry"
        margin="In testing it felt like a form at the front desk while you were still catching your breath."
        rot="-0.8deg"
      />

      <Ask kicker="the real question">Not “where are you in your birth.” It was: how does the app <em>get out of the way</em>?</Ask>

      <Prose>
        That reframe is what cut the triage. The home just opens — Notes and Journal already there, a&nbsp;<b>+</b>&nbsp;in
        the dead center, five tabs and nothing to answer before you begin.
      </Prose>

      <Plate
        tab="Fig. 2"
        narrow
        src="/images/birthstory/system/ia-final.png"
        alt="Final information architecture from Figma: a clean five-tab home."
        cap="ia-final · figma — five tabs, and out of the way"
        rot="0.9deg"
      />

      <Friction>
        Should “New Note” be its own tab, or a floating&nbsp;<b>+</b>? It tested fine as a tab — but I never
        put the two side by side, so I can’t say it’s the right answer, only that it worked.
      </Friction>
    </FieldSection>
  )
}
