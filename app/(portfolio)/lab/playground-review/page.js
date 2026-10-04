import sheet from '@/components/ProjectSheet/ProjectSheet.module.css'
import DarkTheme from '../../projects/groundswell/close-lab/DarkTheme'
import { TIERS, ITEMS } from './items'
import MEDIA from './media'
import Review from './Review'
import s from './page.module.css'

/* FS393 LAB: every project from the old Squarespace site with Claude's tier
   picks, so Lorin can choose what goes in the Playground (FS392). Private:
   dev only (middleware), not linked, not indexed. */

export const metadata = {
  title: 'Playground review — private',
  robots: { index: false, follow: false, nocache: true },
}

const OLD = 'https://snail-squid-djta.squarespace.com'

export default function PlaygroundReview() {
  const items = ITEMS.map((it) => ({ ...it, url: OLD + it.url, media: MEDIA[it.slug] }))

  return (
    <div className={`${sheet.inner} ${s.page}`}>
      <DarkTheme />
      <header className={s.head}>
        <p className={s.kicker}>Lab · Playground · 17 projects from the old site</p>
        <h1 className={s.title}>What goes in the playground?</h1>
        <p className={s.intro}>
          Every project from your old site except the five already rebuilt as sheets. Each card shows the old cover, a strip from the page, your own line from it, and my case for or against. Mark each one In, Maybe, or Out, then copy your picks and paste them to me.
        </p>
        <p className={s.recommend}>
          <strong>My recommendation:</strong> the six in A, plus MindfulNest and Lamp from B: eight tiles. Leave C out, or fold the best of it into a single “Before design school” tile.
        </p>
      </header>

      <section className={s.decisions} aria-labelledby="decisions">
        <h2 id="decisions" className={s.secName}>Also yours to decide</h2>
        <ol className={s.decList}>
          <li><strong>The name.</strong> Playground, Notebook, Side Work, Field Notes… <span>My lean: Field Notes, since it fits your research voice and the folder metaphor.</span></li>
          <li><strong>Pre-grad work.</strong> Show any of it? <span>My lean: one tile at most, as the arc from journalism to design research.</span></li>
          <li><strong>Where it lives.</strong> Its own page, or a homepage section too? <span>My lean: its own page, linked from the end of the homepage and the nav.</span></li>
        </ol>
      </section>

      <Review tiers={TIERS} items={items} />
    </div>
  )
}
