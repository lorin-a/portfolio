'use client'

import { useRef } from 'react'
import styles from '@/styles/project.module.css'
import { useSharedAudio } from '@/lib/useSharedAudio'

export default function AudioPlayer({ track }) {
  const audioRef = useRef(null)
  // Wires this audio into the page-wide single-play system. When the
  // visitor presses play, any other shared audio (cinematic poem,
  // sibling pod player) pauses; the StandaloneNav play/pause control
  // tracks whichever is currently active.
  useSharedAudio(audioRef, track.type)

  return (
    <div className={styles.audioPlayerCompact}>
      <div className={styles.audioHeaderCompact}>
        <span className={styles.audioType}>{track.type}</span>
        <span className={styles.audioTitle}>{track.title}</span>
      </div>
      <audio ref={audioRef} controls className={styles.audioElementCompact}>
        <source src={track.src} type="audio/mpeg" />
      </audio>
    </div>
  )
}
