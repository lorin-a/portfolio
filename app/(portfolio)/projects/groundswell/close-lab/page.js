import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import s from './page.module.css'
import DarkTheme from './DarkTheme'
import Triptych from './Triptych'
import { ECOSYSTEM, DECISIONS } from './evidence'

/* FS171 LAB (2026-10-01): the reflection, edited to what earns its place.
   Each card has one job and one budget: a statement, then at most three
   short bullets. Sources: R = docs/deck-system/rehearsal/groundswell-
   answers.md (her verbatim answers); CS = content/projects/groundswell.md.
   Private: not linked, not indexed. */
export const metadata = {
  title: 'Close lab — private',
  robots: { index: false, follow: false, nocache: true },
}

const CARDS = [
  {
    /* The lesson (her R Q6, “To” dropped), the moment that taught it, and
       her R Q8 “do differently”, compressed. */
    id: 'sense', verb: 'Sense', title: 'The lesson',
    line: 'Honor the work already being done, and find ways to uplift it.',
    context: 'Learned when the “cold” email we came to fix turned out to be a staff member’s own work.',
    listLabel: 'Next time',
    list: [
      'A contract naming contributions and ownership up front',
      'A staff-led program to carry it beyond the pilot',
    ],
  },
  {
    /* Her FS167 list, cut to the three items only she can claim; merges of
       her own items. Dropped (hers to restore): coordinated with
       stakeholders · iterated through two brand identities · playtested. */
    id: 'weave', verb: 'Weave', title: 'My growth',
    line: 'I grew into a data visualization designer.',
    list: [
      'Led the data dashboard; every other component was a team effort',
      'Took my first installation from concept to build',
      'Secured donors and pitched hospital leadership',
    ],
  },
  {
    /* Kendyl Grant, groundswell-digital-wall-with-admin
       src/app/summary/page.js:536 (needs her OK for public use) + the study
       method (no results: FS116) + her R Q7 honest miss. */
    id: 'shape', verb: 'Shape', title: 'What changed',
    line: '“The most impactful thing I have witnessed in my time at Magee.”',
    context: 'Kendyl Grant, Director of Operations, Gynecologic Oncology, UPMC',
    list: [
      'Six validated scales, surveyed before, during, and after; results held for publication',
      'The launch missed some staff, so the study group was smaller',
    ],
  },
]

export default function CloseLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <p className={s.kicker}>Groundswell · FS171 lab · private</p>

      <h2 className={s.labH}>1 · The reflection</h2>
      <Triptych cards={CARDS} />

      <h2 className={s.labH}>2 · One decision per component (drafts)</h2>
      <p className={s.labNote}>A single line under each component’s description: the decision a skimmer would remember.</p>
      <p className={s.ecoLine}><span className={s.ecoLabel}>{ECOSYSTEM.label}</span>{ECOSYSTEM.line}</p>
      <dl className={s.decisions}>
        {DECISIONS.map((d) => (
          <div key={d.name} className={s.decision}>
            <dt>{d.name}</dt>
            <dd data-todo={d.todo || undefined}>{d.line}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
