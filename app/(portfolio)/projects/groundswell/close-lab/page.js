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
/* FS181: her nine two-word heads (verbatim), each bullet rewritten so its
   sentence proves its head. Sources: her freestyle (above) and R = her
   rehearsal answers. Heads render on their own line, not as “Head: …”. */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'What I learned',
    line: 'Honor staff-led innovation from the start, rather than imposing designer-led\u00a0solutions.',
    list: [
      { head: 'Build Trust', text: 'With subject matter this emotional, the work had to speak to staff experience and earn trust across hierarchy before it could solve\u00a0anything.' },
      { head: 'Be Relational', text: 'Pre-existing relationships opened the door, and a transdisciplinary team of designers, clinicians, makers, artists, and donors kept it\u00a0moving.' },
      { head: 'Bridge Gaps', text: 'We couldn’t change what matters most, like pay, time off, and staffing, but respected doctors and administrative fellows carried staff realities to\u00a0leadership.' },
    ],
  },
  {
    id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
    line: 'Moving from theoretical to tangible design gave me practices I’ll\u00a0keep.',
    list: [
      /* R Q3: “I specifically drafted the workshop to be trauma-informed and
         responsive by providing a worksheet for mindfulness and wellbeing
         with journal prompts and somatic exercises so as to not be
         extractive in collecting emotional data.” */
      { head: 'Practice Reciprocity', text: 'In the grief workshop I led, staff left with a worksheet of journal prompts and somatic exercises, so we gave back as much as we\u00a0asked.' },
      /* R Q6: doors required late; redesigned; playtesters confirmed. */
      { head: 'Embrace Constraints', text: 'When admin required doors late in production, we redesigned in acrylic, and playtesters found the pod private without feeling closed\u00a0off.' },
      /* R Q3: the dashboard she led; freestyle: voices to administrators. */
      { head: 'Innovate Intentionally', text: 'I designed and built the data dashboard, the one component I led, so what staff told us reached the administrators who could act on\u00a0it.' },
    ],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What’s next',
    line: 'The installation alone was never the solution; it was the starting\u00a0point.',
    list: [
      { head: 'Build Capacity', text: 'With enough respite to stop drowning, staff could start the conversations their days rarely allowed and innovate together on\u00a0solutions.' },
      { head: 'Expand Engagement', text: 'Creative expression workshops drew strong turnout throughout the pilot, so programming will grow beyond the\u00a0installation.' },
      /* R Q8: “staff-led and structurally supported beyond the components” */
      { head: 'Community Ownership', text: 'The next iteration involves more staff in shaping it, so Groundswell becomes staff-led and continues beyond the\u00a0pilot.' },
    ],
  },
]

export default function CloseLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS181 lab · private</p>

      <h2 className={s.labH}>The reflection</h2>
      <Triptych cards={CARDS} />

    </div>
  )
}
