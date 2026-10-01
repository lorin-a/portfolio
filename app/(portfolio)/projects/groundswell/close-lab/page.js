import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import s from './page.module.css'
import DarkTheme from './DarkTheme'

/* FS160 LAB (2026-10-01): four treatments of the sheet's close (What
   changed · My role · The biggest lesson), all on one shared anatomy.
   Private: not linked, not indexed. Delete once she picks. */
export const metadata = {
  title: 'Close lab — private',
  robots: { index: false, follow: false, nocache: true },
}

/* ── Content, every line sourced ──────────────────────────────────────
   Quote: Kendyl Grant, groundswell-digital-wall-with-admin
     src/app/summary/page.js:536 (needs her OK for public use).
   Role statement: her copy, content/sheets/groundswell.js (role).
   Principle: her rehearsal Q6 (“To honor the work already being down…”,
     typo corrected).
   From → to: content/projects/groundswell.md:207, her case-study copy.
   Support lines: PROVISIONAL compressions of her own paragraphs. */
const CARDS = {
  changed: {
    label: 'What changed',
    statement: '“The most impactful thing I have witnessed in my time at Magee.”',
    source: 'Kendyl Grant, Director of Operations, Gynecologic Oncology Division, UPMC',
    support: 'Clinical partners measured six validated scales before, during, and after the pilot. Results are held for publication.',
  },
  role: {
    label: 'My role, in full',
    statement: 'I did not own any one component. The exception was the data dashboard.',
    source: 'Every component, built by the whole team',
    support: 'I found the Groundswell name and designed the grief workshop to be trauma-informed, so it would not be extractive.',
  },
  lesson: {
    label: 'The biggest lesson',
    statement: 'To honor the work already being done and find ways to uplift it.',
    source: 'Learned when a senior staff member broke down in tears during a content review',
    support: 'The email we had called a cold clinical protocol was her own innovation, kept alive for decades.',
  },
}

/* ── Figure 1: the study, drawn (no results: FS116) ─────────────────── */
const SCALES = ['Burnout Frequency', 'Exhaustion/Dread', 'Turnover Intention', 'Compassion Fatigue', 'Workplace Wellbeing', 'Perceived Support']
function StudyFigure({ compact }) {
  return (
    <figure className={s.fig} aria-label="Six validated scales, surveyed before, during and after the pilot, October 2025 to June 2026">
      <div className={s.study}>
        <div className={s.studyAxis}>
          {['Pre', 'Mid', 'Post'].map((t) => (
            <span key={t} className={s.studyNode}><i /><b>{t}</b></span>
          ))}
        </div>
        <div className={s.studyEnds}><span>Oct 2025</span><span>June 2026</span></div>
        {!compact && (
          <ul className={s.scales}>
            {SCALES.map((x) => <li key={x}>{x}</li>)}
          </ul>
        )}
      </div>
    </figure>
  )
}

/* ── Figure 2: the contribution map (dots drafted from her five My
   Contribution lines; hers to check) ───────────────────────────────── */
const COLS = ['Wall', 'Pod', 'Library', 'CTB', 'Dashboard']
const ROWS = [
  ['Copy', [1, 0, 1, 1, 0]],
  ['Design', [0, 0, 1, 0, 2]],
  ['Coordination', [0, 0, 1, 1, 0]],
  ['Partnerships', [0, 1, 0, 0, 0]],
  ['Data', [1, 0, 0, 0, 2]],
]
function RoleFigure() {
  return (
    <figure className={s.fig} aria-label="Contribution map: Lorin's functions across the five components; she led the dashboard">
      <div className={s.map}>
        <span />
        {COLS.map((c, i) => <span key={c} className={`${s.mapCol} ${i === 4 ? s.mapLedCol : ''}`}>{c}</span>)}
        <span className={s.mapRow}>Research</span>
        <span className={s.mapBand}>informed every component</span>
        {ROWS.map(([r, v]) => (
          <div key={r} className={s.mapLine}>
            <span className={s.mapRow}>{r}</span>
            {v.map((d, i) => (
              <span key={i} className={s.mapCell}>
                {d === 1 && <i className={s.dot} />}
                {d === 2 && <i className={`${s.dot} ${s.dotLed}`} />}
              </span>
            ))}
          </div>
        ))}
      </div>
      <figcaption className={s.mapKey}>
        <span><i className={s.dot} /> contributed</span>
        <span><i className={`${s.dot} ${s.dotLed}`} /> led</span>
      </figcaption>
    </figure>
  )
}

/* ── Figure 3: from → to (her case-study words) ─────────────────────── */
function LessonFigure() {
  return (
    <figure className={s.fig} aria-label="The reframe: from “the system has let you down” to “you have already created a beautiful culture of care”">
      <div className={s.shift}>
        <div className={s.from}><b>From</b><span>“the system has let you down”</span></div>
        <svg className={s.arrow} viewBox="0 0 24 28" aria-hidden="true"><path d="M12 2v22M5 17l7 7 7-7" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
        <div className={s.to}><b>To</b><span>“you have already created a beautiful culture of care”</span></div>
      </div>
    </figure>
  )
}

const FIG = { changed: StudyFigure, role: RoleFigure, lesson: LessonFigure }

function Card({ k, variant, figureLast, compactStudy }) {
  const c = CARDS[k]
  const F = FIG[k]
  const fig = <div className={s.slotFig}>{k === 'changed' ? <F compact={compactStudy} /> : <F />}</div>
  return (
    <article className={`${s.card} ${s[variant]}`}>
      <h3 className={s.label}>{c.label}</h3>
      {!figureLast && fig}
      <p className={s.statement}>{c.statement}</p>
      <p className={s.support}>{c.support}</p>
      <p className={s.source}>{c.source}</p>
      {figureLast && fig}
    </article>
  )
}

const OPTIONS = [
  {
    id: 'a', title: 'A · Aligned glass cards',
    note: 'The current three glass cards, re-anatomised. Every card runs label, figure, statement, support, source, and the slots line up across the row (subgrid), so the three figures share a top and the three statements start on one line. The most continuous with the sheet as it stands.',
  },
  {
    id: 'b', title: 'B · One field, no cards',
    note: 'The three cards dissolve into one tinted field with a hairline between columns. Fewer edges and shadows, so the row reads as one designed object rather than three boxes. Calmest.',
  },
  {
    id: 'c', title: 'C · Statements first',
    note: 'Type leads. The three statements sit on one baseline at the statement size, so a skimmer reads the row as three sentences; the figures drop to a shared band below as the evidence. Strongest hierarchy, least diagrammatic.',
  },
  {
    id: 'd', title: 'D · The lesson leads',
    note: 'The lesson is the strongest thing on the page, so it takes the full width as the focal figure, and the other two sit beneath it as a matched pair. One dominant element, then two equals.',
  },
]

export default function CloseLab() {
  return (
    <main className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <header className={s.head}>
        <p className={s.kicker}>Groundswell · FS160 lab · private</p>
        <h1 className={s.h1}>The close, four ways</h1>
        <p className={s.intro}>
          One anatomy under all four: every card has the same five slots in the same order (label, figure, statement,
          support, source), the slots align across the row, colour means one thing (sage marks Lorin’s work and the
          change), and each slot has a word budget (statement under 20 words, support under 25). The options differ only
          in container and emphasis. Support lines and the contribution dots are drafts for Lorin to check.
        </p>
      </header>

      {OPTIONS.map((o) => (
        <section key={o.id} className={s.option} id={o.id}>
          <div className={s.optionHead}>
            <h2 className={s.h2}>{o.title}</h2>
            <p className={s.optionNote}>{o.note}</p>
          </div>

          {o.id === 'a' && (
            <div className={`${s.row} ${s.rowA}`}>
              {['changed', 'role', 'lesson'].map((k) => <Card key={k} k={k} variant="cardA" />)}
            </div>
          )}

          {o.id === 'b' && (
            <div className={`${s.row} ${s.rowB}`}>
              {['changed', 'role', 'lesson'].map((k) => <Card key={k} k={k} variant="cardB" />)}
            </div>
          )}

          {o.id === 'c' && (
            <div className={`${s.row} ${s.rowC}`}>
              {['changed', 'role', 'lesson'].map((k) => <Card key={k} k={k} variant="cardC" figureLast compactStudy />)}
            </div>
          )}

          {o.id === 'd' && (
            <div className={s.rowD}>
              <article className={s.lead}>
                <div className={s.leadText}>
                  <h3 className={s.label}>{CARDS.lesson.label}</h3>
                  <p className={s.leadStatement}>{CARDS.lesson.statement}</p>
                  <p className={s.support}>{CARDS.lesson.support}</p>
                  <p className={s.source}>{CARDS.lesson.source}</p>
                </div>
                <div className={s.leadFig}><LessonFigure /></div>
              </article>
              <div className={`${s.row} ${s.rowDPair}`}>
                {['changed', 'role'].map((k) => <Card key={k} k={k} variant="cardA" />)}
              </div>
            </div>
          )}
        </section>
      ))}
    </main>
  )
}
