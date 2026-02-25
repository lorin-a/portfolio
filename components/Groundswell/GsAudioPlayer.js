'use client'

import { useState, useEffect } from 'react'
import styles from './GsAudioPlayer.module.css'

// Deterministic waveform heights for SSR (sin wave, no random)
const INITIAL_BARS = Array.from(
  { length: 40 },
  (_, i) => 6 + Math.sin(i * 0.5) * 10 + 4
)

export default function GsAudioPlayer({
  trackName = '"Coming Home to Yourself"',
  artist = 'Catherine Liggett',
  duration = '5:00',
}) {
  const [playing, setPlaying] = useState(false)
  const [barHeights, setBarHeights] = useState(INITIAL_BARS)

  // Add organic variation client-side only to avoid hydration mismatch
  useEffect(() => {
    setBarHeights(
      Array.from({ length: 40 }, (_, i) => 6 + Math.sin(i * 0.5) * 10 + Math.random() * 8)
    )
  }, [])

  return (
    <div className={styles.wrapper}>
      <button
        className={`${styles.playButton} ${playing ? styles.playButtonActive : ''}`}
        onClick={() => setPlaying(!playing)}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-cream)" aria-hidden="true">
            <rect x="7" y="6" width="3" height="12" rx="1" />
            <rect x="14" y="6" width="3" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-plum)" aria-hidden="true">
            <polygon points="8,5 20,12 8,19" />
          </svg>
        )}
      </button>
      <p className={styles.trackName}>{trackName}</p>
      <p className={styles.trackArtist}>
        {artist} · {duration}
      </p>
      <div className={styles.waveform} aria-hidden="true">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className={`${styles.bar} ${playing ? styles.barActive : styles.barInactive}`}
            style={{
              height: h,
              opacity: playing ? (i < 15 ? 0.8 : 0.25) : 0.2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
