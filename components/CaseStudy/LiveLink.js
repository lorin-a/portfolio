import Link from 'next/link'
import styles from './LiveLink.module.css'

/**
 * LiveLink — destination card for external evidence.
 * Use as the closing artifact of a Phase when the deepest evidence
 * lives outside the case study (a live site, a video, a paper).
 *
 * Usage:
 *   <LiveLink href="/groundswell" label="See it in the field" title="Groundswell stakeholder site" />
 */
export default function LiveLink({ href, label, title, external = false }) {
  const isExternal = external || (typeof href === 'string' && /^https?:\/\//.test(href))
  const Tag = isExternal ? 'a' : Link
  const props = isExternal ? { href, target: '_blank', rel: 'noopener noreferrer' } : { href }

  return (
    <Tag {...props} data-evidence className={styles.liveLink}>
      <span>
        <span className={styles.label}>{label}</span>
        <span className={styles.title}>{title}</span>
        {isExternal && <span className="visually-hidden"> (opens in new tab)</span>}
      </span>
      <svg className={styles.arrow} viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Tag>
  )
}
