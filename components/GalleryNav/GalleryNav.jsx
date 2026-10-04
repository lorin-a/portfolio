'use client'

import { useRef } from 'react'
import styles from './GalleryNav.module.css'

/**
 * GalleryNav — the site's one gallery control (her note FS44, 2026-09-30:
 * "one universal style for galleries across the whole site").
 *
 * The homepage folder's design: a thin circle arrow at each end, the
 * position as dots in the middle. Used by the homepage stack (desktop and
 * mobile) and every gallery inside a project folder.
 *
 * The drawn marks stay small (28px circles, 8px dots) but every control's
 * hit area is 44px, extended with negative margins so the layout footprint
 * is only as large as what you see.
 *
 * Colour comes from `--nav-ink` (defaults to currentColor), so each host
 * sets one variable rather than restyling the control.
 */
function Chevron({ dir }) {
  const d = dir === 'left' ? 'M14 6 L8 12 L14 18' : 'M10 6 L16 12 L10 18'
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function GalleryNav({
  count,
  index,
  onPrev,
  onNext,
  onSelect,
  label = 'Gallery',
  arrows = true,
  className = '',
}) {
  const dotsRef = useRef(null)
  if (!count || count < 2) return null
  /* FS372: the dots are one tab stop (a roving tabindex): Tab lands on the
     current dot, the arrow keys move between images, Home and End jump to
     the ends, and focus follows the selection. */
  const onDotKey = (e) => {
    const go = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: count - 1 }[e.key]
    if (go === undefined) return
    e.preventDefault()
    e.stopPropagation()
    const next = (go + count) % count
    onSelect?.(next)
    requestAnimationFrame(() => dotsRef.current?.children[next]?.focus())
  }
  return (
    <div className={`${styles.nav} ${className}`} role="group" aria-label={label}>
      {arrows && (
        <button type="button" className={styles.arrow} onClick={onPrev} aria-label="Previous image">
          <span className={styles.ring}><Chevron dir="left" /></span>
        </button>
      )}
      <div className={styles.dots} ref={dotsRef} onKeyDown={onDotKey}>
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            className={styles.dot}
            aria-current={i === index ? 'true' : undefined}
            tabIndex={i === index ? 0 : -1}
            aria-label={`Image ${i + 1} of ${count}`}
            onClick={() => onSelect?.(i)}
          >
            <span className={styles.mark} />
          </button>
        ))}
      </div>
      {arrows && (
        <button type="button" className={styles.arrow} onClick={onNext} aria-label="Next image">
          <span className={styles.ring}><Chevron dir="right" /></span>
        </button>
      )}
    </div>
  )
}
