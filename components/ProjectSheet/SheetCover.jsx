'use client'

import { useEffect, useRef, useState } from 'react'
import { sheetImg } from './SheetMedia'
import styles from './SheetCover.module.css'
import paper from './Paper.module.css'


/**
 * THE COVER — a pile of content inside the folder (her notes FS57–FS102).
 *
 * Left, on the page's 4-column rail: one sheet of loose-leaf made of the
 * brand glass, with the number, the name and the tagline (fitted to the
 * name's width) in its unruled top margin and the facts on its rules.
 * Right: the photographs as glass polaroids, spread and tilted, stretched
 * to the paper's height. Every click on the pile advances one step in a
 * fixed cycle (the front print goes to the back), so it can never bounce
 * between two photos.
 */

function Facts({ meta, className }) {
  if (!meta?.length) return null
  return (
    <dl className={className}>
      {meta.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd className={v?.todo ? styles.todo : undefined}>
            {v?.todo ? <b>Lorin to write</b> : null}
            {Array.isArray(v)
              ? v.map((line) => <span key={line} className={styles.factLine}>{line}</span>)
              : (v?.todo || v)}
          </dd>
        </div>
      ))}
    </dl>
  )
}

/* The name and its tagline at one width (FS63): the tagline's size is
   fitted so its line is exactly as wide as the name's. Measured from the
   text itself, so it holds for any project name; re-fitted on resize and
   once the web fonts have loaded, and clamped so it never lands at an
   absurd size. */
function FitPair({ title, tagline, titleId }) {
  const hRef = useRef(null)
  const tRef = useRef(null)
  useEffect(() => {
    const h = hRef.current, t = tRef.current
    if (!h || !t) return
    const width = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width }
    const fit = () => {
      t.style.fontSize = ''
      t.style.whiteSpace = 'nowrap'
      const base = parseFloat(getComputedStyle(t).fontSize)
      const scale = Math.min(1.8, Math.max(0.6, width(h) / width(t)))
      t.style.fontSize = `${base * scale}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(h)
    return () => ro.disconnect()
  }, [title, tagline])
  return (
    <>
      <h2 id={titleId} ref={hRef} className={styles.title}>{title}</h2>
      {tagline && <p ref={tRef} className={styles.tagline}>{tagline}</p>}
    </>
  )
}

function Pile({ prints }) {
  const items = prints.map((p) => ({ ...p, src: sheetImg(p.key, 1400) })).filter((p) => p.src)
  /* Per-print crop: `zoom` scales the photo inside its frame, `focus` is
     the point it scales toward (e.g. to lose a table edge). */
  const crop = (p) => (p.zoom || p.focus)
    ? { transform: `scale(${p.zoom || 1})`, transformOrigin: p.focus || '50% 50%', objectPosition: p.focus || undefined }
    : undefined
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  if (!items.length) return null
  return (
    <div className={`${styles.pile} ${styles.polaroids} ${styles.brandPile}`}>
      {items.map((p, i) => {
        const depth = order.indexOf(i)
        return (
          <button key={p.key} type="button" className={styles.print}
            data-depth={depth} style={{ zIndex: 10 - depth }}
            tabIndex={depth === 0 ? 0 : -1}
            aria-hidden={depth === 0 ? undefined : true}
            onClick={next}
            aria-label={`${p.alt} Photo ${i + 1} of ${items.length}. Show the next photo.`}>
            <span className={styles.brandFrame}>
              <span className={styles.brandPhoto}><img src={p.src} alt="" style={crop(p)} /></span>
              <span className={styles.brandStrip}>
                <span className={styles.brandCaption}>{p.caption}</span>
              </span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default function SheetCover({ sheet, num, title, tagline, titleId }) {
  const meta = sheet.meta || []
  return (
    <header className={styles.cover} data-reveal="0">
      <div className={styles.text}>
        <div className={`${styles.sheet} ${styles.sheetTitled}`}>
          <div className={`${paper.paper} ${paper.titled}`}>
            <span className={paper.holes} aria-hidden="true"><i /><i /><i /></span>
            {/* The heading sits in the sheet's unruled top margin; the rules
                begin beneath it. */}
            <div className={styles.paperHead}>
              {/* No folio number on the cover (FS103). */}
              <FitPair title={title} tagline={tagline} titleId={titleId} />
            </div>
            <div className={paper.ruled}>
              {/* Her facts, FS93–FS101; receipts in the content file. */}
              <Facts meta={meta} className={styles.facts} />
            </div>
          </div>
        </div>
      </div>
      {sheet.prints?.length > 0 && <Pile prints={sheet.prints} />}
    </header>
  )
}
