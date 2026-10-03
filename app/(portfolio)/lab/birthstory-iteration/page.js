import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import DarkTheme from '../../projects/groundswell/close-lab/DarkTheme'
import { Strip, Narrowing, RoundLog, UNTESTED } from './Options'
import s from './page.module.css'

/* FS338 LAB: three options for BirthStory's Iteration section, each
   giving it one job (how the app and the testing evolved). Private: dev
   only (middleware), not linked, not indexed. */

export const metadata = {
  title: 'BirthStory iteration lab — private',
  robots: { index: false, follow: false, nocache: true },
}

const OPTIONS = [
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
        <h1 className={s.title}>Three ways to show the iteration</h1>
        <p className={s.intro}>Each gives the section one job: how the app and the testing changed across three rounds. The menu removal and the rename stay where they already live, in Architecture and UX Writing.</p>
      </header>

      {OPTIONS.map(({ id, name, why, El }) => (
        <section key={id} className={s.option} aria-labelledby={`opt-${id}`}>
          <div className={s.optHead}>
            <h2 id={`opt-${id}`} className={s.optName}>{name}</h2>
            <p className={s.optWhy}>{why}</p>
          </div>
          {/* the section as it would sit in the sheet */}
          <div className={s.mock}>
            <span className={s.kicker}>Step 3 · Weeks 3–5</span>
            <h3 className={s.secName}>Iteration</h3>
            <p className={s.takeaway}>Each round removed options the previous one had added.</p>
            <El />
            <p className={s.untested}><span className={s.kicker}>What I couldn’t test</span>{UNTESTED}</p>
          </div>
        </section>
      ))}
    </div>
  )
}
