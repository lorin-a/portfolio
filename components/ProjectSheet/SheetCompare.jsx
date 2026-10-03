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

   FS330, simplified: per slide one line and one heard above the screens,
   one short caption under each screen.
   slides: [{ title, line, heard?, versions: [{ tag, src, alt, text }] }] */

/* FS330: one line, no box. A verbatim quote in quotation marks with who
   said it; a summary of what we heard with no quotation marks. */
function Heard({ h }) {
  if (!h) return null
  return h.quote ? (
    <p className={styles.heard}>
      <span className={styles.heardQuote}>“{h.quote}”</span>
      <span className={styles.heardWho}>{h.who}</span>
    </p>
  ) : (
    <p className={styles.heard}>
      <span className={styles.heardWho}>What we heard</span>
      <span className={styles.heardSummary}>{rich(h.summary)}</span>
    </p>
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
        {/* FS330: one statement and the one piece of feedback behind it */}
        <div className={styles.head}>
          <p className={styles.line}>{rich(s.line)}</p>
          <Heard h={s.heard} />
        </div>
        {/* the screens, alone on the color band */}
        <div className={styles.band}>
          <div className={styles.row} style={{ '--n': s.versions.length }}>
            {s.versions.map((v) => (
              <figure key={v.tag} className={styles.version}>
                <span className={styles.phone}>
                  <span className={styles.notch} aria-hidden="true" />
                  <span className={styles.screen}><img src={v.src} alt={v.alt} loading="lazy" draggable="false" /></span>
                </span>
              </figure>
            ))}
          </div>
        </div>
        {/* one short caption under each screen */}
        <div className={`${styles.row} ${styles.caps}`} style={{ '--n': s.versions.length }}>
          {s.versions.map((v) => (
            <p key={v.tag} className={styles.cap}>
              <span className={styles.tag}>{v.tag}</span>
              {rich(v.text)}
            </p>
          ))}
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
