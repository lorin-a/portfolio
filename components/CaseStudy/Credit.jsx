import styles from './Credit.module.css'

/**
 * Credit — inline attribution that travels WITH a collaborator's work.
 *
 * The contribution-true template's core ethic: wherever someone else's craft
 * appears or is described, name it in place rather than burying it in a
 * credits list. Reusable across case studies.
 *
 * @param {string} work  - what was contributed ("Artwork", "Meditations")
 * @param {string} who   - the person ("Carolyn Gavin")
 * @param {string} [role]- optional clarifier ("© 2025, used in the installation")
 * @param {string} [href]- optional link to the person's site or coverage
 * @param {'light'|'dark'} [tone='dark'] - text tone for the section background
 */
export default function Credit({ work, who, role, href, tone = 'dark' }) {
  const name = href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
      {who}
    </a>
  ) : (
    who
  )

  return (
    <p className={`${styles.credit} ${tone === 'light' ? styles.light : styles.dark}`}>
      <span className={styles.work}>{work}</span>
      <span className={styles.sep} aria-hidden="true">·</span>
      <span className={styles.who}>{name}</span>
      {role ? <span className={styles.role}>{role}</span> : null}
    </p>
  )
}
