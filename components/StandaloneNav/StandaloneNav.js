'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './StandaloneNav.module.css'

export default function StandaloneNav({ backHref, backLabel = 'Back', revealAfter, chapters }) {
  const [visible, setVisible] = useState(false)
  // Audio state synced via custom events from CinematicIntro -- lets the
  // user pause / resume the poem audio after scrolling past the player.
  // `hasEngaged` flips true on first play so the button stays available
  // for replay after the user pauses or the audio ends.
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [hasEngaged, setHasEngaged] = useState(false)
  // Per-chapter progress (0-1) when `chapters` prop is passed. Each entry
  // tracks how far the viewport has advanced through that chapter's range
  // of section ids. Past chapters cap at 1, future chapters stay at 0.
  const [chapterProgress, setChapterProgress] = useState(
    () => (chapters ? chapters.map(() => 0) : [])
  )

  useEffect(() => {
    // When revealAfter selector is provided: nav appears once that element's
    // top has scrolled into the upper half of the viewport. This lets a
    // full-bleed cinematic intro live above without nav chrome.
    const handleScroll = () => {
      if (revealAfter) {
        const target = document.querySelector(revealAfter)
        if (!target) {
          setVisible(false)
          return
        }
        setVisible(target.getBoundingClientRect().top <= window.innerHeight * 0.5)
        return
      }
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setVisible(progress > 3)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [revealAfter])

  useEffect(() => {
    const onState = (e) => {
      const playing = Boolean(e.detail?.playing)
      setAudioPlaying(playing)
      if (playing) setHasEngaged(true)
    }
    window.addEventListener('gs:audio:state', onState)
    return () => window.removeEventListener('gs:audio:state', onState)
  }, [])

  // Spacebar toggles the active audio globally, as long as focus isn't
  // in a form control (input/textarea/select/contentEditable). Native
  // <audio controls> buttons keep their own space-to-play behavior;
  // this just adds the page-level shortcut once the user has engaged.
  useEffect(() => {
    if (!hasEngaged) return
    const onKey = (e) => {
      if (e.code !== 'Space') return
      const t = e.target
      const tag = t?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t?.isContentEditable) return
      // Don't fight the native <audio> element when it's focused.
      if (tag === 'AUDIO') return
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('gs:audio:toggle'))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hasEngaged])

  // Compute per-chapter progress on scroll. For each chapter, find the
  // top of its first section and the bottom of its last section, then
  // map the viewport's vertical center into that range. This keeps the
  // bar fill in sync with the section the reader is actually looking at.
  useEffect(() => {
    if (!chapters || !chapters.length) return
    const compute = () => {
      const anchor = window.scrollY + window.innerHeight * 0.5
      const next = chapters.map(({ sectionIds }) => {
        const first = document.getElementById(sectionIds[0])
        const last = document.getElementById(sectionIds[sectionIds.length - 1])
        if (!first || !last) return 0
        const top = first.offsetTop
        const bottom = last.offsetTop + last.offsetHeight
        if (bottom <= top) return 0
        return Math.max(0, Math.min(1, (anchor - top) / (bottom - top)))
      })
      setChapterProgress(next)
    }
    compute()
    window.addEventListener('scroll', compute, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', compute)
      window.removeEventListener('resize', compute)
    }
  }, [chapters])

  const activeChapterIndex = chapters
    ? chapterProgress.findIndex((p) => p > 0 && p < 1)
    : -1

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToChapter = (index) => {
    if (!chapters) return
    const firstId = chapters[index]?.sectionIds?.[0]
    if (!firstId) return
    const el = document.getElementById(firstId)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - 60
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const togglePoemAudio = () => {
    window.dispatchEvent(new CustomEvent('gs:audio:toggle'))
  }

  const hasBack = Boolean(backHref)

  return (
    <header className={`${styles.header} ${visible ? styles.headerVisible : ''}`}>
      <nav
        className={`${styles.nav} ${hasBack ? styles.navSplit : ''}`}
        aria-label="Page navigation"
      >
        {hasBack && (
          <Link href={backHref} className={styles.backLink} aria-label={`${backLabel} (return to portfolio)`}>
            <svg
              viewBox="0 0 20 24"
              fill="none"
              aria-hidden="true"
              className={styles.backArrow}
            >
              <path
                d="M14 4L6 12l8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </Link>
        )}
        {chapters && chapters.length > 0 && (
          <ol className={styles.chapters} aria-label="Section progress">
            {chapters.map((chapter, i) => {
              const isActive = i === activeChapterIndex
              return (
                <li key={chapter.label} className={styles.chapterItem}>
                  <button
                    type="button"
                    onClick={() => scrollToChapter(i)}
                    className={`${styles.chapterButton} ${isActive ? styles.chapterButtonActive : ''}`}
                    aria-label={`Jump to ${chapter.label}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {chapter.label}
                  </button>
                </li>
              )
            })}
          </ol>
        )}
        <div className={styles.navRight}>
          {hasEngaged && (
            <button
              type="button"
              onClick={togglePoemAudio}
              className={styles.audioToggle}
              aria-label={audioPlaying ? 'Pause audio (space)' : 'Play audio (space)'}
              aria-keyshortcuts="Space"
            >
              {audioPlaying ? (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                  <rect x="1" y="1" width="4" height="14" rx="1" />
                  <rect x="9" y="1" width="4" height="14" rx="1" />
                </svg>
              ) : (
                <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
                  <path d="M2 1.5v13a.5.5 0 0 0 .76.43l11-6.5a.5.5 0 0 0 0-.86l-11-6.5A.5.5 0 0 0 2 1.5z" />
                </svg>
              )}
              {audioPlaying ? 'Pause audio' : 'Play audio'}
            </button>
          )}
          <button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <svg
              viewBox="0 0 20 24"
              fill="none"
              aria-hidden="true"
              className={styles.arrow}
            >
              <path
                d="M10 22V4M15 10l-5-6-5 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to top
          </button>
        </div>
      </nav>
    </header>
  )
}
