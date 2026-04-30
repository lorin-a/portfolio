import styles from './GreyboxScene.module.css'

/**
 * Greybox scene template. Static, no animation.
 * Used to scaffold the full cinematic arc end-to-end before any polish.
 *
 * Props:
 *   id        — DOM id for anchoring
 *   bg        — 'dark' | 'cream' | 'purple' | 'paper'
 *   kicker    — small label above heading (e.g., "Scene 1 — Visual Opening")
 *   heading   — display headline
 *   children  — body content (paragraphs, stand-ins, etc.)
 *   media     — optional ReactNode rendered after body (img, video, placeholder)
 *   notes     — optional motion/intent notes shown muted at bottom of scene
 */
export default function GreyboxScene({
  id,
  bg = 'paper',
  kicker,
  heading,
  children,
  media,
  notes,
}) {
  return (
    <section id={id} className={styles.scene} data-bg={bg}>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {children && <div className={styles.body}>{children}</div>}
      {media && <div className={styles.media}>{media}</div>}
      {notes && <p className={styles.notes}>{notes}</p>}
    </section>
  )
}

/** Inline marker for missing copy. Renders highlighted in greybox. */
export function StandIn({ children }) {
  return <span className={styles.standin}>[stand-in: {children}]</span>
}

/** Visual placeholder for assets not yet sourced (Blue Garden, cup overflow, etc.) */
export function Placeholder({ label }) {
  return <div className={styles.placeholder}>{label}</div>
}
