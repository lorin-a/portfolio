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
/* FS176: copy first. Her tone, set by her own line “With subject matter
   this emotional,”: every bullet opens inside the project (a condition, a
   phase, a moment), never a label and a colon. Equal budget per card: one
   statement (~12 words) + three bullets (~16–25 words). Every line traces
   to her freestyle (above) or her rehearsal answers (R). */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'What I learned',
    line: 'Honor staff-led innovation from the start, rather than imposing designer-led\u00a0solutions.',
    list: [
      'With subject matter this emotional, the work had to speak to staff experience, build trust across hierarchy, and solve urgent\u00a0problems.',
      'Pre-existing relationships opened the door, and respected doctors and administrative fellows bridged the gaps between staff and\u00a0leadership.',
      'We couldn’t change what matters most, like pay, time off, and staffing, but the data platform carried staff voices to administrators who might not have heard\u00a0them.',
    ],
  },
  {
    id: 'weave', verb: 'Weave', title: 'Who I became',
    line: 'I moved from theoretical to tangible design, as a researcher who also\u00a0builds.',
    list: [
      'In the research phase, I designed and facilitated workshops, feedback sessions, synthesis, and ideation, and pitched the concept to hospital\u00a0leadership.',
      'When production began, I prototyped, adapted to timelines and constraints like the late call for doors, and coordinated with\u00a0stakeholders.',
      /* R Q3: “Once the study was running, I led data visualization of the
         collected data for an internal reporting visualization site” + “I
         did not own any specific component” */
      'Once the study was running, I designed and built the data dashboard, the one component I led, to report what staff were telling\u00a0us.',
    ],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What’s next',
    line: 'The installation alone was never the solution; it was the starting\u00a0point.',
    list: [
      /* “conversations their days rarely allowed”: the research’s “There is no time to grieve” and R Q1’s “difficult to sneak away” */
      'With enough respite to stop drowning, staff could start the conversations their days rarely allowed and innovate together on\u00a0solutions.',
      'Throughout the pilot, creative expression workshops drew strong turnout and showed the potential for expanded programming alongside the\u00a0installation.',
      /* “beyond the pilot”: R Q8, “staff-led and structurally supported beyond the components” */
      'The next iteration builds on both, expanding the programming and involving more staff in shaping it, so it continues beyond the\u00a0pilot.',
    ],
  },
]

export default function CloseLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS176 lab · private</p>

      <h2 className={s.labH}>The reflection</h2>
      <Triptych cards={CARDS} />

    </div>
  )
}
