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
   · role: the two facts found nowhere else on the sheet, from her role
     paragraph (naming; the trauma-informed grief workshop)
   · change: Kendyl Grant, groundswell-digital-wall-with-admin
     src/app/summary/page.js:536 (needs her OK for public use); the note is
     the study method from close.outcomes (no results: FS116) */
const CARDS = [
  {
    id: 'sense', verb: 'Sense', title: 'The biggest lesson',
    line: 'Honor the work already being done, and find ways to uplift\u00a0it.',
    note: 'The “cold” email we set out to redesign was a senior staff member’s own innovation. We learned it when she broke down in tears during a content\u00a0review.',
  },
  {
    id: 'weave', verb: 'Weave', title: 'My role',
    line: 'I named Groundswell and led its grief\u00a0workshop.',
    note: 'I designed the workshop to be trauma-informed and responsive, so it would not be extractive in collecting emotional\u00a0data.',
  },
  {
    id: 'shape', verb: 'Shape', title: 'What changed',
    line: '“The most impactful thing I have witnessed in my time at\u00a0Magee.”',
    cite: 'Kendyl Grant, Director of Operations, Gynecologic Oncology, UPMC',
    note: 'Clinical partners measured six validated scales before, during, and after the pilot. Results are held for\u00a0publication.',
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
