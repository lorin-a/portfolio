import Link from 'next/link'
import s from './VSwitch.module.css'

/* Slim review-only switcher so Lorin can hop between the three direction
   studies and the current draft. Lives only on /v/* routes; never ships. */
export default function VSwitch({ active }) {
  const items = [
    ['ledger', 'A · Ledger'],
    ['artifact', 'B · One Artifact'],
    ['atlas', 'C · Atlas'],
    ['print', 'D · Print'],
    ['skin', 'E · Skin'],
    ['wall', 'F · Wall'],
    ['board', 'G · Div/Con'],
    ['canvas', 'H · Canvas'],
  ]
  return (
    <nav className={s.bar} aria-label="Direction studies">
      <span className={s.tag}>Direction studies</span>
      {items.map(([slug, label]) => (
        <Link
          key={slug}
          href={`/projects/birthstory-care-pod/v/${slug}`}
          className={active === slug ? s.on : s.off}
          aria-current={active === slug ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
      <Link href="/projects/birthstory-care-pod" className={s.off}>current draft ↗</Link>
    </nav>
  )
}
