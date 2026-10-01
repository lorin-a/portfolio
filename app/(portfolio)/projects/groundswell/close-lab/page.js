import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import s from './page.module.css'
import DarkTheme from './DarkTheme'
import Triptych from './Triptych'

/* FS171 LAB (2026-10-01): the reflection, edited to what earns its place.
   Each card has one job and one budget: a statement, then at most three
   short bullets. Sources: R = docs/deck-system/rehearsal/groundswell-
   answers.md (her verbatim answers); CS = content/projects/groundswell.md.
   Private: not linked, not indexed. */
/* FS174 — HER FREESTYLE, VERBATIM (2026-10-01; typos kept). Also in the
   git-ignored docs/deck-system/rehearsal/groundswell-answers.md, Round 2.

Let me just freestyle here and see how you respond: Sense: we learned the importance of honoring staff-led innovation from the start rather than imposing designer-led solutions. The intense emotional subject matter made the community relationships extremely important, we learned that in order to design something that would resonate with staff it would need to speak directly to their experience, build trust across hierarchy, provide tangible solutions to urgent issues. We also learned that we cannot change the things that matter most like getting higher pay, more time off, and better staffing. But that through our pilot, we were able to connect staff voices, complaints, suggestions directly to administrators through the data platform where they otherwise may have gone unheard. Who I became not sure about the language here but I became an applied designer? I moved from theoretical to tangible design experience, as a design researcher I designed and facilitated workshops, feedback sessions, synthesis, ideation and pitched to stakeholders. As a designer I prototyped,adapted to production timelines and constraints, innovated and led new solutions like the data dashboard, coordinated with stakeholders, etc. what story should this tell about me? Shape: Oh we also learned as a project the importance of pre-existing relationships among designers and staff played a big roles, assembling a transdisciplinary team of designers, clinicians of varying levels of access to leadership and staff realities, makers, artists, donors, etc. Having a senior staff member to advocate to admin was invaluable (respected doctors and administrative fellows to bridge communication gaps) and most importantly qualitative and generative research that amplified staff voices. Throughout the pilot there were multiple creative expression workshops that showed great turnout and potential for expanded programming. The installation alone was never the solution it was the starting point to getting enough respite to stop drowning, start having conversations, and innovate together on solutions. The next iterations plan to expand on programming and staff involvement.
*/

export const metadata = {
  title: 'Close lab — private',
  robots: { index: false, follow: false, nocache: true },
}

/* FS173: one grammar, past → present → future. Every card: symbol · one
   label line · one statement · two bullets. Sources (R = her rehearsal
   answers): Learned = R Q6 (“To honor the work already being down…”) +
   R Q7 part 1 (“an important lesson about who to involve and when and how
   to ensure buy-in from the community”). Became = her FS167 list. Next =
   R Q8 (contract with named asset ownership; a staff-led stewardship
   program). Kendyl’s quote moves to The Outcome column (impact, not
   reflection). */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'What I learned',
    line: 'Honor the work already being done, and find ways to uplift\u00a0it.',
    list: [
      'The “cold” email we came to fix was a staff member’s own\u00a0work',
      'Buy-in takes everyone: a launch that missed staff shrank the\u00a0study',
    ],
  },
  {
    id: 'weave', verb: 'Weave', title: 'Who I became',
    line: 'I grew into a data visualization\u00a0designer.',
    list: [
      'Took my first installation from concept to\u00a0build',
      'Secured donors and pitched hospital\u00a0leadership',
    ],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What’s next',
    line: 'Make Groundswell staff\u2011led, so it outlasts the\u00a0pilot.',
    list: [
      'A stewardship program: workshop templates, onboarding, a language\u00a0guide',
      'Agreements that name contributions and ownership from day\u00a0one',
    ],
  },
]

export default function CloseLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS173 lab · private</p>

      <h2 className={s.labH}>The reflection</h2>
      <Triptych cards={CARDS} />

    </div>
  )
}
