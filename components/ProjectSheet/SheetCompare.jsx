'use client'

import { useCallback, useState } from 'react'
import GalleryNav from '@/components/GalleryNav/GalleryNav'
import { rich } from './SheetContent'
import stage from './SheetMedia.module.css'
import styles from './SheetCompare.module.css'

/* THE COMPARE GALLERY (FS320): one feature at a time across its versions,
   side by side, in the same brand-glass frame and footer as every sheet
   gallery (SheetStage). Next changes the feature: the title, the screens,
   and the copy under each screen change; the format stays.

   slides: [{ title, line?, versions: [{ tag, src, alt, text, quote? }] }] */

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
      <div className={styles.mat}>
        <div key={at} className={styles.slide}>
          <div className={styles.row} style={{ '--n': s.versions.length }}>
            {s.versions.map((v) => (
              <figure key={v.tag} className={styles.version}>
                <span className={styles.phone}>
                  <span className={styles.notch} aria-hidden="true" />
                  <span className={styles.screen}><img src={v.src} alt={v.alt} loading="lazy" draggable="false" /></span>
                </span>
                <figcaption className={styles.words}>
                  <span className={styles.tag}>{v.tag}</span>
                  <span className={styles.text}>{rich(v.text)}</span>
                  {v.quote && <span className={styles.quote}>{v.quote}</span>}
                </figcaption>
              </figure>
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
          <span className={`${stage.captionText} ${styles.title}`}>
            <strong>{s.title}</strong>{s.line && <> {rich(s.line)}</>}
          </span>
        </p>
        <GalleryNav className={stage.stageNav} count={n} index={at}
          onPrev={() => go(-1)} onNext={() => go(1)} onSelect={setAt} label={label} />
      </div>
    </div>
  )
}
