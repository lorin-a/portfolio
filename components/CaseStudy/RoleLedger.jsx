import styles from './RoleLedger.module.css'

/**
 * RoleLedger — named authorship, up front. Built on the case study's existing
 * acknowledgement-card pattern (equal cards, --project-accent-light text) so it
 * matches the established system and stays accessible on the plum field.
 *
 * @param {string[]} mine - the author's own contributions
 * @param {{who: string, what: string, href?: string}[]} collaborators
 * @param {string} [name='Lorin Anderberg']
 * @param {'light'|'dark'} [tone='dark']
 */
export default function RoleLedger({ mine = [], collaborators = [], name = 'Lorin Anderberg', tone = 'dark' }) {
  const first = name.split(' ')[0]
  return (
    <div className={`${styles.ledger} ${tone === 'dark' ? styles.dark : styles.light}`}>
      <section className={styles.card} aria-label={`What ${first} did`}>
        <h2 className={styles.heading}>What {first} did</h2>
        <ul className={styles.list}>
          {mine.map((item) => (
            <li key={item} className={styles.mineItem}>{item}</li>
          ))}
        </ul>
      </section>

      {collaborators.length > 0 && (
        <section className={styles.card} aria-label="In collaboration with">
          <h2 className={styles.heading}>In collaboration with</h2>
          <ul className={styles.list}>
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
        </section>
      )}
    </div>
  )
}
