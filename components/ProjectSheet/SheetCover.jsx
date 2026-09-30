'use client'

import { useEffect, useRef, useState } from 'react'
import { sheetImg } from './SheetMedia'
import styles from './SheetCover.module.css'
import paper from './Paper.module.css'


/**
 * THE COVER — a pile of content inside the folder (her notes FS57–FS68).
 *
 * Left: the number, the name, and the tagline fitted to the name's width;
 * beneath them, the facts typed on one sheet of loose-leaf. Right: the
 * project's photographs as a loose pile of prints, each at its own tilt.
 * Every click on the pile advances one step in a fixed cycle (the front
 * print goes to the back), so it can never bounce between two photos.
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
            {v?.todo || v}
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

function Pile({ prints, style = 'prints' }) {
  const items = prints.map((p) => ({ ...p, src: sheetImg(p.key, 1400) })).filter((p) => p.src)
  const [order, setOrder] = useState(() => items.map((_, i) => i))
  const next = () => setOrder((o) => [...o.slice(1), o[0]])
  if (!items.length) return null
  return (
    <div className={`${styles.pile} ${['polaroid', 'techpol', 'brand'].includes(style) ? styles.polaroids : ''} ${style === 'brand' ? styles.brandPile : ''}`}>
      {items.map((p, i) => {
        const depth = order.indexOf(i)
        return (
          <button key={p.key} type="button" className={styles.print}
            data-depth={depth} style={{ zIndex: 10 - depth }}
            tabIndex={depth === 0 ? 0 : -1}
            aria-hidden={depth === 0 ? undefined : true}
            onClick={next}
            aria-label={`${p.alt} Photo ${i + 1} of ${items.length}. Show the next photo.`}>
            {style === 'polaroid' ? (
              <span className={styles.polaroidFrame}>
                <span className={styles.polaroidPhoto}><img src={p.src} alt="" /></span>
                {p.caption && <span className={styles.polaroidCaption}>{p.caption}</span>}
              </span>
            ) : style === 'brand' ? (
              <span className={styles.brandFrame}>
                <span className={styles.brandPhoto}><img src={p.src} alt="" /></span>
                <span className={styles.brandStrip}>
                  <span className={styles.brandCaption}>{p.caption}</span>
                </span>
              </span>
            ) : style === 'techpol' ? (
              <span className={styles.techFrame}>
                <span className={styles.techPhoto}><img src={p.src} alt="" /></span>
                <span className={styles.techStrip}>
                  <span className={styles.techCaption}>{p.caption}</span>
                  <span className={styles.techIndex}>
                    {String(i + 1).padStart(2, '0')}<span aria-hidden="true"> / </span>{String(items.length).padStart(2, '0')}
                  </span>
                </span>
              </span>
            ) : (
              <img src={p.src} alt="" />
            )}
          </button>
        )
      })}
    </div>
  )
}

/* LAB (FS69, FS70): ?coverlab on the page URL shows a switcher for the
   paper (loose-leaf / tech) and the pile (prints / polaroids). The shipped
   defaults are loose-leaf and prints until she picks. */
function useCoverLab() {
  const [lab, setLab] = useState(false)
  const [paperStyle, setPaperStyle] = useState('leaf')
  const [pileStyle, setPileStyle] = useState('prints')
  const [titleOn, setTitleOn] = useState('above')
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has('coverlab')) setLab(true)
  }, [])
  return { lab, paperStyle, setPaperStyle, pileStyle, setPileStyle, titleOn, setTitleOn }
}

function LabSwitch({ paperStyle, setPaperStyle, pileStyle, setPileStyle, titleOn, setTitleOn }) {
  const group = (label, value, set, opts) => (
    <div className={styles.labGroup} role="radiogroup" aria-label={label}>
      <span className={styles.labLabel}>{label}</span>
      {opts.map(([v, l]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v}
          className={styles.labBtn} onClick={() => set(v)}>{l}</button>
      ))}
    </div>
  )
  return (
    <div className={styles.lab}>
      {group('Paper', paperStyle, setPaperStyle, [['leaf', 'Loose-leaf'], ['tech', 'Tech'], ['glass', 'Glass']])}
      {group('Title', titleOn, setTitleOn, [['above', 'Above'], ['paper', 'On the paper']])}
      {group('Pile', pileStyle, setPileStyle, [['prints', 'Prints'], ['polaroid', 'Polaroids'], ['techpol', 'Tech polaroids'], ['brand', 'Brand glass']])}
    </div>
  )
}

export default function SheetCover({ sheet, num, title, tagline, titleId }) {
  const meta = sheet.meta || []
  const labState = useCoverLab()
  const { lab, paperStyle, pileStyle, titleOn } = labState
  const onPaper = titleOn === 'paper'
  const rootRef = useRef(null)
  /* Glass paper applies to the whole sheet (cover + every “What I did”),
     so the lab marks the dialog itself. */
  useEffect(() => {
    const dlg = rootRef.current?.closest('[role=dialog]')
    if (!dlg) return
    if (paperStyle === 'glass') dlg.setAttribute('data-paper', 'glass')
    else dlg.removeAttribute('data-paper')
  }, [paperStyle])
  return (
    <header ref={rootRef} className={styles.cover} data-reveal="0">
      <div className={styles.text}>
        {!onPaper && (
          <>
            <span className={styles.num}>{num}</span>
            <FitPair title={title} tagline={tagline} titleId={titleId} />
          </>
        )}
        <div className={`${styles.sheet} ${onPaper ? styles.sheetTitled : ''}`}>
          <div className={[paper.paper, paperStyle === 'tech' ? paper.tech : '', onPaper ? paper.titled : ''].join(' ')}>
            <span className={paper.holes} aria-hidden="true"><i /><i /><i /></span>
            {paperStyle === 'tech' && <span className={paper.marks} aria-hidden="true"><i /><i /><i /><i /></span>}
            {/* Title on the paper (lab, FS85): the heading sits in the sheet's
                unruled top margin; the rules begin beneath it. */}
            {onPaper && (
              <div className={styles.paperHead}>
                <span className={styles.num}>{num}</span>
                <FitPair title={title} tagline={tagline} titleId={titleId} />
              </div>
            )}
            <div className={onPaper ? paper.ruled : undefined}>
              {/* The short facts (FS82): the longer set (metaLong in the content
                  file) only existed to match the old, taller pile. */}
              <Facts meta={meta} className={`${styles.facts} ${paperStyle === 'tech' ? styles.techFacts : ''}`} />
            </div>
          </div>
        </div>
      </div>
      {sheet.prints?.length > 0 && <Pile prints={sheet.prints} style={pileStyle} />}
      {lab && <LabSwitch {...labState} />}
    </header>
  )
}
