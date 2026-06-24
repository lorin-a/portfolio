import styles from './RoleLedger.module.css'

/**
 * RoleLedger — named authorship as an editorial masthead. The author's role
 * leads; collaborators are credited beneath as a refined credits list. Default
 * tone is light (sits on a cream band, off the plum field).
 *
 * @param {string[]} mine - the author's own contributions
 * @param {{who: string, what: string, href?: string}[]} collaborators
 * @param {string} [name='Lorin Anderberg']
 * @param {'light'|'dark'} [tone='light']
 */
export default function RoleLedger({ mine = [], collaborators = [], name = 'Lorin Anderberg', tone = 'light' }) {
  return (
    <div className={`${styles.ledger} ${tone === 'dark' ? styles.dark : styles.light}`}>
      <div className={styles.lead}>
        <p className={styles.kicker}>Role</p>
        <p className={styles.name}>{name}</p>
        <ul className={styles.mine}>
          {mine.map((item) => (
            <li key={item} className={styles.mineItem}>{item}</li>
          ))}
        </ul>
      </div>

      {collaborators.length > 0 && (
        <div className={styles.collab}>
          <p className={styles.kicker}>In collaboration with</p>
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
    </div>
  )
}
