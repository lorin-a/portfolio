import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import { groundswell } from '@/content/sheets/groundswell'
import s from './page.module.css'
import DarkTheme from './DarkTheme'
import Triptych from './Triptych'

/* FS164 + FS165 LAB (2026-10-01): the close as Sense · Weave · Shape, on
   the About section's practice-card pattern (gradient border, painted
   mark, accent name). One line each, readable in ten seconds; her full
   paragraphs sit behind “Read more”. Private: not linked, not indexed. */
export const metadata = {
  title: 'Close lab — private',
  robots: { index: false, follow: false, nocache: true },
}

/* Sense = discovering what’s true · Weave = how truths relate · Shape =
   giving form (her definitions, DESIGN_PROCESS.md). Lines:
   · lesson: her rehearsal Q6, “To honor the work already being done and
     find ways to uplift it”, the “To” dropped
   · role: PROVISIONAL, assembled from her role titles and her own “I did
     not own any one component. The exception was the data dashboard.”
   · change: Kendyl Grant, groundswell-digital-wall-with-admin
     src/app/summary/page.js:536 (needs her OK for public use) */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'The biggest lesson',
    line: 'Honor the work already being done, and find ways to uplift it.',
    more: [groundswell.close.takeaway],
  },
  {
    id: 'weave', verb: 'Weave', title: 'My role',
    line: 'Research, copy, partnerships, and data across every component. I led the data dashboard.',
    more: [groundswell.frame.role, groundswell.frame.roleMore],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What changed',
    line: '“The most impactful thing I have witnessed in my time at Magee.”',
    cite: 'Kendyl Grant, Director of Operations, Gynecologic Oncology, UPMC',
    more: [groundswell.close.outcomes, groundswell.close.qualitative],
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
