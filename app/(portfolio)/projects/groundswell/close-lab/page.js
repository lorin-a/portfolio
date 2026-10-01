import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import s from './page.module.css'
import DarkTheme from './DarkTheme'
import Triptych from './Triptych'

/* FS164 + FS165 LAB (2026-10-01): the close as Sense · Weave · Shape, on
   the About section's practice-card pattern (gradient border, painted
   mark, accent name). A statement and one line each, nothing hidden (FS166). Private: not linked, not indexed. */
export const metadata = {
  title: 'Close lab — private',
  robots: { index: false, follow: false, nocache: true },
}

/* Sense = discovering what’s true · Weave = how truths relate · Shape =
   giving form (her definitions, DESIGN_PROCESS.md). FS166: each card says
   only what no other section says, all of it visible.
   · lesson: her rehearsal Q6 (“To” dropped); the note compresses her
     takeaway paragraph
   · growth: FS167, her own list (see the card)
   · change: Kendyl Grant, groundswell-digital-wall-with-admin
     src/app/summary/page.js:536 (needs her OK for public use); the note is
     the study method from close.outcomes (no results: FS116) */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'The biggest lesson',
    line: 'Honor the work already being done, and find ways to uplift\u00a0it.',
    /* FS168: bullets. The reframe is her case-study copy,
       content/projects/groundswell.md:207. */
    list: [
      'The “cold” email we set out to redesign was a senior staff member’s own\u00a0innovation',
      'We learned it when she broke down in tears during a content\u00a0review',
      'We reframed from “the system has let you down” to “you have already created a beautiful culture of\u00a0care”',
    ],
  },
  {
    /* FS167, her words (2026-10-01): “through this project I grew into a
       data viz designer, navigated my first production of a installation,
       coordinated and secured donors, pitched to hospital admin, coordinated
       with stakeholders etc? Transformed a concept from start to finish,
       iterated through two brand identities, play tested etc etc”. Edits:
       “data viz” → data visualization (her cover title); “a installation”
       → an installation; “play tested” → playtested. Her “etc” means the
       list is hers to finish. */
    id: 'weave', verb: 'Weave', title: 'My growth',
    line: 'Through this project, I grew into a data visualization\u00a0designer.',
    list: [
      'Navigated my first production of an installation',
      'Coordinated and secured donors',
      'Pitched to hospital admin',
      'Coordinated with stakeholders',
      'Transformed a concept from start to finish',
      'Iterated through two brand identities',
      'Playtested',
    ],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What changed',
    line: '“The most impactful thing I have witnessed in my time at\u00a0Magee.”',
    cite: 'Kendyl Grant, Director of Operations, Gynecologic Oncology, UPMC',
    list: [
      'Clinical partners measured six validated scales: burnout, exhaustion, turnover intention, compassion fatigue, well-being, and perceived\u00a0support',
      'Surveyed before, during, and after the\u00a0pilot',
      'Results are held for\u00a0publication',
    ],
  },
]

export default function CloseLab() {
  return (
    <main className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS164 + FS165 lab · private</p>

      <Triptych cards={CARDS} />
    </main>
  )
}
