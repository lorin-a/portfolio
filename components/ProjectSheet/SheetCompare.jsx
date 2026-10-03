'use client'

import { useState } from 'react'
import { rich } from './SheetContent'
import styles from './SheetCompare.module.css'
import ml from './SheetMotionLibrary.module.css'

/* THE COMPARE (FS331, FS333). One feature at a time across its
   versions, in Groundswell's dashboard gallery: one brand-glass container,
   the screens large on the color band, the text inside the glass beneath,
   and the chevron track to choose a feature (styles shared from
   SheetMotionLibrary.module.css so the two galleries stay one design).*/

function Heard({ h }) {
  if (!h) return null
  return h.quote ? (
    <>
      <span className={styles.heardWho}>{h.who}</span>
      <span className={styles.heardQuote}>“{h.quote}”</span>
    </>
  ) : (
    <>
      <span className={styles.heardWho}>What we heard</span>
      <span className={styles.heardSummary}>{rich(h.summary)}</span>
    </>
  )
}

/* FS333: one stroke glyph per feature, in the dashboard track's idiom */
const GLYPH = {
  'Entry point': <><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" /><path d="M10 16l4-4-4-4" /><path d="M14 12H3" /></>,
  'Onboarding': <><path d="M12 3l1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8z" /><path d="M18.5 15.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" /></>,
  'Documentation': <><path d="M6 3v18" /><circle cx="6" cy="7" r="1.6" /><circle cx="6" cy="17" r="1.6" /><path d="M10 7h10M10 17h10M10 12h7" /></>,
  'Sharing': <><circle cx="12" cy="12" r="2.4" /><circle cx="12" cy="12" r="8" strokeDasharray="2.5 2.5" /><circle cx="12" cy="4" r="1.6" /><circle cx="19" cy="15.5" r="1.6" /><circle cx="5" cy="15.5" r="1.6" /></>,
}

/* FS333: the Groundswell dashboard gallery, carried over so the site has
   one gallery grammar: everything inside one brand-glass container; the
   screens on the color band; the text inside the glass beneath them; a
   chevron track of the features, ordered along the parent's path through
   the app (enter, learn it, document, share), so the arrows mean a flow. */
export default function SheetCompare({ slides = [], label }) {
  const [at, setAt] = useState(0)
  if (!slides.length) return null
  const s = slides[at]

  const onKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (at + (e.key === 'ArrowRight' ? 1 : -1) + slides.length) % slides.length
    setAt(next)
    e.currentTarget.querySelectorAll('[role=tab]')[next]?.focus()
  }

  return (
    <figure className={`${ml.player} ${ml.glass} ${styles.compare}`} aria-label={label}>
      {/* the arrow labels: Groundswell's chevron track, on top (FS334) */}
      <div className={`${ml.flowWrap} ${styles.top}`}>
        <p className={`${ml.flowHint} ${styles.hint}`} aria-hidden="true">
          Select a feature
          <span className={styles.hintNow}>: {s.title}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v16M6 14l6 6 6-6" /></svg>
        </p>
        <ol className={ml.chev} role="tablist" aria-label="Features, along the parent's path through the app" onKeyDown={onKey}
          style={{ gridTemplateColumns: `repeat(${slides.length}, minmax(0, 1fr))` }}>
          {slides.map((x, i) => (
            <li key={x.title} style={{ '--depth': i }}>
              <button type="button" role="tab" id={`cmp-tab-${i}`} aria-selected={i === at} aria-controls="cmp-panel"
                tabIndex={i === at ? 0 : -1} className={ml.seg} onClick={() => setAt(i)}>
                {GLYPH[x.title] && <svg className={ml.segIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{GLYPH[x.title]}</svg>}
                <span className={ml.segView}>{x.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div id="cmp-panel" role="tabpanel" aria-labelledby={`cmp-tab-${at}`} key={at} className={styles.panel}>
        {/* the screens on the color band */}
        <div className={styles.band}>
          {s.versions.map((v, i) => (
            <div key={v.tag} className={styles.step}>
              {i > 0 && <span className={styles.arrow} aria-hidden="true">→</span>}
              <span className={styles.phone}>
                <span className={styles.notch} aria-hidden="true" />
                <span className={styles.screen}><img src={v.src} alt={v.alt} loading="lazy" draggable="false" /></span>
                {/* FS334: the feedback, pinned on the screen it explains */}
                {s.heard && s.heardAt === i && (
                  <span className={styles.pin} data-side={i === s.versions.length - 1 ? 'left' : 'right'}>
                    <span className={styles.pinDot} aria-hidden="true" />
                    <span className={styles.pinLeader} aria-hidden="true" />
                    <span className={styles.callout}><Heard h={s.heard} /></span>
                  </span>
                )}
              </span>
            </div>
          ))}
        </div>
        {/* the text, inside the glass, under the image */}
        <div className={styles.text}>
          <div className={styles.caps}>
            {s.versions.map((v) => (
              <p key={v.tag} className={styles.cap}>
                <span className={styles.tag}>{v.tag}</span>
                <span className={styles.capText}>{rich(v.text)}</span>
              </p>
            ))}
          </div>
          {s.line && <p className={styles.foot}>{rich(s.line)}</p>}
          {/* phones: the callout can't sit beside a small screen, so the
              feedback reads here instead */}
          {s.heard && <p className={styles.footHeard}><Heard h={s.heard} /></p>}
        </div>
      </div>

    </figure>
  )
}
