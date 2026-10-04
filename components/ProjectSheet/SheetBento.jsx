'use client'

import { useRef, useState } from 'react'
import { sheetImg, sheetVid, preloadFull as warm } from './SheetMedia'
import InViewVideo from '@/lib/useInViewVideo'
import styles from './SheetBento.module.css'

/**
 * THE BENTO (FS384, FS387, FS389): several pieces of work seen together,
 * instead of one at a time behind a gallery's arrows. Her note:
 * “There are some things you isolated that look stronger alongside other
 * things all at once.”
 *
 * Each item: { key | src, type?: 'video', alt, label?, span?: 'big' |
 * 'wide' | 'tall', fit?: 'contain', ground?: css color, focus? }.
 * Images open full screen. Videos play while on screen; one Pause control
 * holds them all (WCAG 2.2.2).
 */
export default function SheetBento({ items = [], cols = 3, onImage, label = 'Gallery' }) {
  const holdRef = useRef(false)
  const vids = useRef([])
  const [paused, setPaused] = useState(false)
  const hasVideo = items.some((it) => it.type === 'video')

  const toggle = () => {
    const next = !paused
    holdRef.current = next
    setPaused(next)
    vids.current.forEach((v) => {
      if (!v) return
      if (next) v.pause()
      else v.play().catch(() => {})
    })
  }

  return (
    <figure className={styles.bento} aria-label={label}>
      <ul className={styles.grid} style={{ '--cols': cols }}>
        {items.map((it, i) => {
          const isVideo = it.type === 'video'
          const src = it.src || (isVideo ? sheetVid(it.key, 1200) : sheetImg(it.key, it.span === 'big' ? 1800 : 1200))
          if (!src) return null
          const style = { background: it.ground, objectFit: it.fit || 'cover', objectPosition: it.focus }
          return (
            <li key={it.key || it.src} className={styles.cell} data-span={it.span || undefined} style={{ background: it.ground }}>
              {isVideo ? (
                <InViewVideo ref={(el) => { vids.current[i] = el }} holdRef={holdRef} src={src}
                  className={styles.media} style={style} aria-label={it.alt} />
              ) : (
                <button type="button" className={styles.open} onClick={(e) => onImage?.(it.key, e.currentTarget)}
                  onPointerEnter={() => it.key && warm(it.key)} onFocus={() => it.key && warm(it.key)}
                  aria-label={`View full screen: ${it.alt}`} disabled={!it.key}>
                  <img src={src} alt="" className={styles.media} style={style} loading="lazy" />
                </button>
              )}
              {it.label && <span className={styles.label}>{it.label}</span>}
            </li>
          )
        })}
      </ul>
      {hasVideo && (
        <button type="button" className={styles.pause} onClick={toggle}
          aria-pressed={paused} aria-label={paused ? 'Play animations' : 'Pause animations'}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            {paused ? <path d="M5 3l8 5-8 5z" fill="currentColor" /> : <path d="M5 3h2v10H5zM9 3h2v10H9z" fill="currentColor" />}
          </svg>
          <span>{paused ? 'Play' : 'Pause'}</span>
        </button>
      )}
    </figure>
  )
}
