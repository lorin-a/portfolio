'use client'

import { useEffect } from 'react'

/**
 * Hooks an HTMLAudioElement into the page-wide single-play system used
 * across /groundswell. When any wired audio plays, all other wired
 * audios pause. The StandaloneNav listens for the same events so its
 * play/pause control always tracks the currently-active audio.
 *
 * Custom events:
 * - `gs:audio:claim` { audio } — fired when an audio starts; other
 *   wired audios pause themselves.
 * - `gs:audio:state` { playing, label } — fired when the *active* audio
 *   transitions between playing / paused / ended; consumed by nav.
 * - `gs:audio:toggle` — listener that toggles the most-recently-engaged
 *   wired audio.
 *
 * @param {React.RefObject<HTMLAudioElement>} audioRef
 * @param {string} label — human-readable identifier (e.g., "Poem")
 */
export function useSharedAudio(audioRef, label) {
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    let isActive = false

    const emitState = (playing) => {
      window.dispatchEvent(
        new CustomEvent('gs:audio:state', { detail: { playing, label } })
      )
    }

    const onPlay = () => {
      isActive = true
      window.dispatchEvent(
        new CustomEvent('gs:audio:claim', { detail: { audio } })
      )
      emitState(true)
    }
    const onPause = () => {
      // Only the currently active audio reports its pause to nav --
      // otherwise being-paused-by-another-claim would clobber the
      // newly-active audio's playing state.
      if (isActive) emitState(false)
    }
    const onEnded = () => {
      if (isActive) emitState(false)
    }
    const onClaim = (e) => {
      if (e.detail?.audio === audio) {
        isActive = true
      } else {
        isActive = false
        if (!audio.paused) audio.pause()
      }
    }
    const onToggle = () => {
      if (!isActive) return
      if (audio.paused) audio.play()
      else audio.pause()
    }

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    window.addEventListener('gs:audio:claim', onClaim)
    window.addEventListener('gs:audio:toggle', onToggle)

    return () => {
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      window.removeEventListener('gs:audio:claim', onClaim)
      window.removeEventListener('gs:audio:toggle', onToggle)
    }
  }, [audioRef, label])
}
