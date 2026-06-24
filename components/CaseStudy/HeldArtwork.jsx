import styles from './HeldArtwork.module.css'

/**
 * HeldArtwork — a gallery wall-label for a collaborator's artwork that is
 * deliberately NOT reproduced (the license covers the physical installation
 * only). Treats withholding as curatorial respect, not a gap: the artwork is
 * named the way a museum credits a piece shown elsewhere.
 *
 * @param {string} artist   - "Carolyn Gavin"
 * @param {string} title    - artwork title ("Blue Garden")
 * @param {string} [where]  - where it lives ("In the installation at UPMC Magee")
 * @param {string} children - the note body, in the project's voice (1–2 sentences)
 * @param {string} [href]   - link to editorial coverage
 * @param {string} [linkLabel='See it in the CMU feature']
 * @param {'light'|'dark'} [tone='dark'] - the section background it sits on
 */
export default function HeldArtwork({
  artist,
  title,
  where = 'In the physical installation',
  children,
  href,
  linkLabel = 'See it in the CMU feature',
  tone = 'dark',
}) {
  return (
    <figure className={`${styles.label} ${tone === 'light' ? styles.onLight : styles.onDark}`}>
      <p className={styles.kicker}>
        <span className={styles.mark} aria-hidden="true">✦</span>
        Artwork, shown in the installation
      </p>

      <p className={styles.title}><em>{title}</em></p>
      <p className={styles.artist}>{artist}</p>

      <hr className={styles.rule} />

      <p className={styles.where}>{where}</p>
      {children ? <p className={styles.note}>{children}</p> : null}

      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {linkLabel} <span aria-hidden="true">&rarr;</span>
        </a>
      ) : null}
    </figure>
  )
}
