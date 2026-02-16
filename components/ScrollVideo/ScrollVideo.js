'use client'

import { useState, useRef } from 'react'
import styles from './ScrollVideo.module.css'

/**
 * ScrollVideo — Shared video player for all project pages.
 *
 * Two modes:
 *   1. Click-to-play (default): Play icon overlay, controls appear after click
 *   2. Autoplay (autoplay=true): Loops silently, controls appear on hover
 *
 * Props:
 *   src      — video file path
 *   label    — text shown on hover (e.g. "Installation Walkthrough")
 *   autoplay — if true, video autoplays muted and loops, controls on hover
 */
export default function ScrollVideo({ src, label, autoplay = false, blur = false }) {
  const videoRef = useRef(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
    setHasStarted(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handlePlay()
    }
  }

  // Autoplay mode: loops silently, controls on hover
  if (autoplay) {
    return (
      <div
        className={styles.scrollVideoContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          ref={videoRef}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          controls={isHovered && !blur}
          className={`${styles.scrollVideo} ${blur ? styles.scrollVideoBlurred : ''}`}
        />
        {label && (
          <div className={`${styles.videoLabelBar} ${isHovered ? styles.videoLabelBarHidden : ''}`}>
            <span>{label}</span>
          </div>
        )}
        {blur && isHovered && (
          <div className={styles.blurNotice}>
            <span>Data blurred to protect unpublished study results</span>
          </div>
        )}
      </div>
    )
  }

  // Click-to-play mode (default)
  return (
    <div className={styles.scrollVideoContainer}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        controls={hasStarted}
        className={`${styles.scrollVideo} ${blur ? styles.scrollVideoBlurred : ''}`}
      />
      <div
        className={styles.videoPlayOverlay}
        onClick={handlePlay}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={label ? `Play ${label}` : 'Play video'}
        style={{
          opacity: hasStarted ? 0 : 1,
          pointerEvents: hasStarted ? 'none' : 'auto',
        }}
      >
        <span className={styles.videoPlayIcon}>&#9654;</span>
        {label && <span className={styles.videoLabelOverlay}>{label}</span>}
      </div>
    </div>
  )
}
