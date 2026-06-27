'use client'

import styles from './GatedOverlay.module.css'

/**
 * GatedOverlay — sits over a blurred media panel to signal that real work
 * exists here but the content is protected (NDA / licensed / confidential).
 * The blur lives on the media itself (each stack applies its own blur class);
 * this is just the lock + label scrim. Purely presentational — pointer-events
 * pass through so any card link underneath still works.
 *
 * @param {string} [label] — short status word (default "Confidential")
 * @param {string} [note]  — one-line sub (default "Available on request")
 */
export default function GatedOverlay({ label = 'Confidential', note = 'Available on request' }) {
  return (
    <div className={styles.overlay} aria-hidden="true">
      <svg className={styles.lock} viewBox="0 0 24 24" fill="none">
        <rect x="5" y="10.5" width="14" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="15" r="1.3" fill="currentColor" />
      </svg>
      <span className={styles.label}>{label}</span>
      {note && <span className={styles.note}>{note}</span>}
    </div>
  )
}
