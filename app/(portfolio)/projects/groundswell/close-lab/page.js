import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import s from './page.module.css'
import DarkTheme from './DarkTheme'
import Triptych from './Triptych'
import { ECOSYSTEM, SHAPED } from './evidence'

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
    id: 'sense', verb: 'Sense', title: 'Lessons',
    line: 'Honor the work already being done, and find ways to uplift\u00a0it.',
    /* FS168: bullets. The reframe is her case-study copy,
       content/projects/groundswell.md:207. */
    list: [
      'The “cold” email we set out to redesign was a senior staff member’s own\u00a0innovation',
      'We learned it when she broke down in tears during a content\u00a0review',
      /* FS170, R Q8: “a proper contract with agreements and contribtuions,
         acknoweldgement, funding sources, and explicitly named asset
         ownership” · “a comprehensive programming and onboarding stewardship
         program that would enable this to be staff-led… (originally proposed
         in the concept pitch)”. The reframe moved to the CTB block. */
      'Next time: a contract up front naming contributions, funding, and asset\u00a0ownership',
      'Next time: a staff-led stewardship program (workshop templates, onboarding, a compassionate language guide), first proposed in the concept\u00a0pitch',
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
      /* FS170, role honesty (her rubric #2), R Q3: “I did not own any
         specific component” + the dashboard she led */
      'Led the data dashboard; every other component was a team\u00a0effort',
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
      /* FS170, R Q7 part 1: “our comms launch plan did not reach everyoone…
         leading us to have a much smaller study group” */
      'The launch did not reach everyone, so the study group was smaller than\u00a0planned',
    ],
  },
]

export default function CloseLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS164–FS170 lab · private</p>

      <h2 className={s.labH}>1 · The close</h2>
      <Triptych cards={CARDS} />

      <h2 className={s.labH}>2 · The components: what shaped each one (drafts)</h2>
      <p className={s.labNote}>One block per component, under its description. Every line is compressed from Lorin’s rehearsal answers or case-study copy; sources in the code.</p>
      <div className={s.eco}>
        <p className={s.ecoLabel}>{ECOSYSTEM.label}</p>
        <p className={s.ecoLine}>{ECOSYSTEM.line}</p>
      </div>
      <div className={s.shapedGrid}>
        {SHAPED.map((c) => (
          <article key={c.name} className={s.shaped}>
            <h3 className={s.shapedName}>{c.name}</h3>
            <p className={s.shapedLabel}>What shaped it</p>
            <ul className={s.shapedList}>
              {c.bullets.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
