import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import DarkTheme from '../../projects/groundswell/close-lab/DarkTheme'
import { Strip, Narrowing, RoundLog, WhatTestingChanged, UNTESTED } from './Options'
import s from './page.module.css'

/* FS338 LAB: three options for BirthStory's Iteration section, each
   giving it one job (how the app and the testing evolved). Private: dev
   only (middleware), not linked, not indexed. */

export const metadata = {
  title: 'BirthStory iteration lab — private',
  robots: { index: false, follow: false, nocache: true },
}

const OPTIONS = [
  { id: 'd', name: 'D · What Testing Changed (recommended)', why: 'Built for the hiring manager’s questions. It merges Architecture, Iteration, and UX Writing into one evidence chain, so the page shows how you think: your narrowing pattern drawn to scale, each finding traced to a decision and the screen it produced, what you cut and why, and what you could not test. Replaces three sections with one.', El: WhatTestingChanged, take: 'Three rounds of testing narrowed the app from four intake questions to none.', label: 'What Testing Changed', step: 'Steps 2–4 · Weeks 3–5', noUntested: true },
  { id: 'a', name: 'A · The Strip', why: 'The calmest. Three versions side by side, one line each, your fidelity lesson under them. Reads in five seconds.', El: Strip },
  { id: 'b', name: 'B · The Narrowing', why: 'The most visual. The three versions as a fanned stack, like the cover; choose one to bring it forward and read its round. Echoes your “narrow until I reach the heart” pattern.', El: Narrowing },
  { id: 'c', name: 'C · The Round Log', why: 'The most explicit. One row per round: what we tested, what we heard, what changed. Reads like a research log, which hiring managers trust.', El: RoundLog },
]

export default function IterationLab() {
  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <header className={s.head}>
        <p className={s.kicker}>Lab · BirthStory · Iteration</p>
        <h1 className={s.title}>Four ways to show the iteration</h1>
        <p className={s.intro}>D is built for the hiring manager’s questions and replaces three sections with one. A, B, and C keep Architecture and UX Writing as they are and give Iteration one job.</p>
      </header>

      {OPTIONS.map(({ id, name, why, El, take, label, step, noUntested }) => (
        <section key={id} className={s.option} aria-labelledby={`opt-${id}`}>
          <div className={s.optHead}>
            <h2 id={`opt-${id}`} className={s.optName}>{name}</h2>
            <p className={s.optWhy}>{why}</p>
          </div>
          {/* the section as it would sit in the sheet */}
          <div className={s.mock}>
            <span className={s.kicker}>{step || 'Step 3 · Weeks 3–5'}</span>
            <h3 className={s.secName}>{label || 'Iteration'}</h3>
            <p className={s.takeaway}>{take || 'Each round removed options the previous one had added.'}</p>
            <El />
            {!noUntested && <p className={s.untested}><span className={s.kicker}>What I couldn’t test</span>{UNTESTED}</p>}
          </div>
        </section>
      ))}
    </div>
  )
}
