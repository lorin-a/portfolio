'use client'

import styles from '@/styles/project.module.css'

export default function VoiceCard({ quote, context }) {
  return (
    <div className={styles.voiceCard}>
      <blockquote className={styles.voiceQuote}>&ldquo;{quote}&rdquo;</blockquote>
      {context && <p className={styles.voiceContext}>{context}</p>}
    </div>
  )
}
