'use client'

import { useCallback, useState } from 'react'
import GalleryNav from '@/components/GalleryNav/GalleryNav'
import { rich } from './SheetContent'
import stage from './SheetMedia.module.css'
import styles from './SheetCompare.module.css'

/* THE COMPARE GALLERY (FS320, re-laid FS325): one feature at a time across
   its versions, in the sheet's brand-glass gallery frame. The color band
   holds only the screens. Beneath it, a formatted text area: the
   feature's heading and line, then a column under each screen with what
   changed and what we heard. Next changes everything; the format stays.

   What we heard (FS326) is either a verbatim quote ({ quote, who }) set as
   a quotation, or a summary ({ summary }) set without quotation marks.
   Never invent or reword a quote.

   slides: [{ title, line?, versions: [{ tag, src, alt, text, heard? }] }] */

function Heard({ h }) {
  if (!h) return null
  if (h.quote) {
    return (
      <blockquote className={styles.quote}>
        <span className={styles.heardLabel}>{h.who || 'What we heard'}</span>
        <p>{h.quote}</p>
      </blockquote>
    )
  }
  return (
    <div className={styles.summary}>
      <span className={styles.heardLabel}>What we heard</span>
      <p>{rich(h.summary)}</p>
    </div>
  )
}

export default function SheetCompare({ slides = [], label }) {
  const [at, setAt] = useState(0)
  const n = slides.length
  const go = useCallback((d) => setAt((i) => (i + d + n) % n), [n])
  if (!n) return null
  const s = slides[at]

  const onKey = (e) => {
    if (n < 2) return
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  return (
    <div className={stage.stage} role="group" aria-roledescription="gallery" aria-label={label} onKeyDown={onKey}>
      <div key={at} className={styles.slide}>
        {/* the color band: the screens and nothing else */}
        <div className={styles.band}>
          <div className={styles.row} style={{ '--n': s.versions.length }}>
            {s.versions.map((v) => (
              <span key={v.tag} className={styles.phone}>
                <span className={styles.notch} aria-hidden="true" />
                <span className={styles.screen}><img src={v.src} alt={v.alt} loading="lazy" draggable="false" /></span>
              </span>
            ))}
          </div>
        </div>

        {/* the text area */}
        <div className={styles.text}>
          <div className={styles.head}>
            <h4 className={styles.title}>{s.title}</h4>
            {s.line && <p className={styles.line}>{rich(s.line)}</p>}
          </div>
          <div className={styles.row} style={{ '--n': s.versions.length }}>
            {s.versions.map((v) => (
              <div key={v.tag} className={styles.col}>
                <span className={styles.tag}>{v.tag}</span>
                <p className={styles.change}>{rich(v.text)}</p>
                <Heard h={v.heard} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={stage.stageBar}>
        <p className={stage.caption} aria-live="polite">
          <span className={stage.counter}>
            {String(at + 1).padStart(2, '0')}
            <span aria-hidden="true"> / </span>
            <span className={stage.srOnly}> of </span>
            {String(n).padStart(2, '0')}
          </span>
          <span className={stage.captionText}>{s.title}</span>
        </p>
        <GalleryNav className={stage.stageNav} count={n} index={at}
          onPrev={() => go(-1)} onNext={() => go(1)} onSelect={setAt} label={label} />
      </div>
    </div>
  )
}
