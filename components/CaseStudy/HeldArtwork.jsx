import styles from './HeldArtwork.module.css'

/**
 * HeldArtwork — the honesty note shown where a collaborator's artwork is
 * deliberately NOT reproduced, because the license covers the physical
 * installation only. Turns the constraint into a visible ethic rather than a
 * silent gap. Names the artist (Credit-style) and points to public coverage.
 *
 * @param {string} artist   - "Carolyn Gavin"
 * @param {string} title    - artwork title ("Blue Garden")
 * @param {string} children - the note body (1–2 sentences, the project's voice)
 * @param {string} [href]   - link to editorial coverage / artist
 * @param {string} [linkLabel='See it in the CMU feature']
 * @param {'light'|'dark'} [tone='dark']
 */
export default function HeldArtwork({
  artist,
  title,
  children,
  href,
  linkLabel = 'See it in the CMU feature',
  tone = 'dark',
}) {
  return (
    <figure className={`${styles.held} ${tone === 'light' ? styles.light : styles.dark}`}>
      <div className={styles.frame} aria-hidden="true">
        <span className={styles.mark}>✦</span>
      </div>
      <figcaption className={styles.caption}>
        <p className={styles.label}>Artwork shown in the installation, not reproduced here</p>
        <p className={styles.body}>{children}</p>
        <p className={styles.attribution}>
          <em>{title}</em> — {artist}
          {href ? (
            <>
              <span className={styles.dot} aria-hidden="true">·</span>
              <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {linkLabel} &rarr;
              </a>
            </>
          ) : null}
        </p>
      </figcaption>
    </figure>
  )
}
