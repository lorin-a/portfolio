import styles from './RoleLedger.module.css'

/**
 * RoleLedger — named authorship, up front. The contribution-true template's
 * spine: a hiring manager should see in seconds what was MINE versus the
 * team's, with collaborators credited by name rather than absorbed.
 *
 * @param {string[]} mine - the author's own contributions
 * @param {{who: string, what: string, href?: string}[]} collaborators
 * @param {string} [name='Lorin Anderberg']
 * @param {'light'|'dark'} [tone='light']
 */
export default function RoleLedger({ mine = [], collaborators = [], name = 'Lorin Anderberg', tone = 'light' }) {
  return (
    <section
      className={`${styles.ledger} ${tone === 'dark' ? styles.dark : styles.light}`}
      aria-label="Roles and contributions"
    >
      <div className={styles.col}>
        <h2 className={styles.heading}>What {name.split(' ')[0]} did</h2>
        <ul className={styles.mine}>
          {mine.map((item) => (
            <li key={item} className={styles.mineItem}>{item}</li>
          ))}
        </ul>
      </div>

      {collaborators.length > 0 && (
        <div className={styles.col}>
          <h2 className={styles.heading}>In collaboration with</h2>
          <ul className={styles.team}>
            {collaborators.map((c) => (
              <li key={c.who} className={styles.teamItem}>
                <span className={styles.teamWho}>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                      {c.who}
                    </a>
                  ) : (
                    c.who
                  )}
                </span>
                <span className={styles.teamWhat}>{c.what}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
