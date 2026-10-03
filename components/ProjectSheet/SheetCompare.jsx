'use client'

import { useState } from 'react'
import { rich } from './SheetContent'
import styles from './SheetCompare.module.css'

/* THE COMPARE (FS331: the visual is the hero). One feature at a time
   across its versions. The screens are large on the color band with an
   arrow between each step; the features are named tabs above, so the
   reader picks what to compare instead of paging blind. Words are kept
   to a version tag and one line under each screen, and the statement
   with its feedback as a quiet footnote.

   What we heard (FS326): a verbatim quote ({ quote, who }) in quotation
   marks, or a summary ({ summary }) without. Never invent or reword.

   slides: [{ title, line?, heard?, versions: [{ tag, src, alt, text }] }] */

function Heard({ h }) {
  if (!h) return null
  return h.quote ? (
    <span className={styles.heard}>
      <span className={styles.heardQuote}>“{h.quote}”</span> <span className={styles.heardWho}>{h.who}</span>
    </span>
  ) : (
    <span className={styles.heard}>
      <span className={styles.heardWho}>What we heard:</span> {rich(h.summary)}
    </span>
  )
}

export default function SheetCompare({ slides = [], label }) {
  const [at, setAt] = useState(0)
  if (!slides.length) return null
  const s = slides[at]

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const d = e.key === 'ArrowRight' ? 1 : -1
    const next = (at + d + slides.length) % slides.length
    setAt(next)
    e.currentTarget.querySelectorAll('[role=tab]')[next]?.focus()
  }

  return (
    <figure className={styles.compare} aria-label={label}>
      {/* the features, as tabs */}
      <div className={styles.tabs} role="tablist" aria-label="Feature" onKeyDown={onKey}>
        {slides.map((sl, i) => (
          <button key={sl.title} type="button" role="tab" id={`cmp-tab-${i}`}
            aria-selected={i === at} aria-controls="cmp-panel" tabIndex={i === at ? 0 : -1}
            className={styles.tab} onClick={() => setAt(i)}>
            {sl.title}
          </button>
        ))}
      </div>

      <div id="cmp-panel" role="tabpanel" aria-labelledby={`cmp-tab-${at}`} key={at} className={styles.panel}>
        {/* the hero: the screens, large, one step to the next */}
        <div className={styles.band}>
          {s.versions.map((v, i) => (
            <div key={v.tag} className={styles.step}>
              {i > 0 && <span className={styles.arrow} aria-hidden="true">→</span>}
              <figure className={styles.version}>
                <span className={styles.phone}>
                  <span className={styles.notch} aria-hidden="true" />
                  <span className={styles.screen}><img src={v.src} alt={v.alt} loading="lazy" draggable="false" /></span>
                </span>
                <figcaption className={styles.cap}>
                  <span className={styles.tag}>{v.tag}</span>
                  <span className={styles.capText}>{rich(v.text)}</span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>

        {(s.line || s.heard) && (
          <p className={styles.foot}>
            {s.line && <span className={styles.footLine}>{rich(s.line)}</span>}
            <Heard h={s.heard} />
          </p>
        )}
      </div>
    </figure>
  )
}
