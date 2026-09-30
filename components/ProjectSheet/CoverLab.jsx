'use client'

import { useEffect, useRef, useState } from 'react'
import { sheetImg } from './SheetMedia'
import styles from './CoverLab.module.css'

/**
 * COVER LAB — three cover treatments to compare in place (her note FS57:
 * "Show me 3 options I could not have thought of myself"). Lab only: the
 * sheet renders these when the page URL carries ?coverlab, with a switcher
 * pinned to the sheet. The shipped cover is untouched until she picks.
 *
 *   prints          E · three photographs stacked like prints in the
 *                   folder; hover fans them, click brings one forward.
 *   printsCatalogue E1 · the text as an archive's catalogue record: No.,
 *                   ruled label/value rows, a live caption naming the
 *                   print in front.
 *   printsSlip      E2 · the facts typed on a paper slip tucked into the
 *                   pile of prints.
 *   printsLabel     E3 · the text column as a file folder's label: a box
 *                   with a filled header bar, the facts in ruled rows.
 *   printsSheet     E4 · (FS60, FS61) the facts typed on one sheet of
 *                   loose-leaf under the name: punched holes, grain, ruled
 *                   and margin lines; the prints in a wabi-sabi pile.
 *
 * Earlier options (ambient, ecosystem, colour returns, settle on scroll,
 * the name) were set aside when she chose E (FS59); they live in git.
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

export default function CoverLab({ variant, sheet, num, title, tagline, titleId, onImage }) {
  const meta = sheet.meta || []

  if (variant.startsWith('prints')) {
    return <PrintsCover {...{ sheet, num, title, tagline, titleId, onImage, meta }}
      treatment={variant.replace('prints', '').toLowerCase() || 'plain'} />
  }

  return null
}

function TextRail({ num, title, tagline, titleId, meta, className }) {
  return (
    <div className={className}>
      <span className={styles.num}>{num}</span>
      <h2 id={titleId} className={styles.title}>{title}</h2>
      {tagline && <p className={styles.tagline}>{tagline}</p>}
      <Facts meta={meta} className={styles.facts} />
    </div>
  )
}

/* The title and its tagline at one width (FS63): the tagline's size is
   fitted so its line is exactly as wide as the title's. Measured from the
   text itself, so it holds for any project name; re-fitted on resize and
   once the web fonts have loaded. Clamped so a very short or very long
   tagline never lands at an absurd size. */
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

/* E · THE PRINTS ────────────────────────────────────────────────────── */
const PRINT_KEYS = [
  /* Four, for range across the project (FS64): the place, the wall in
     use, the pod in use, the cards in hand. */
  { key: 'gs-hero', alt: 'The Groundswell Garden and the Restorative Pod in the hallway.' },
  { key: 'gs-artwall-detail-01', alt: 'Writing a response to one of the guided prompts at the art wall.' },
  { key: 'gs-pod-detail-01', alt: 'Two staff members at the table inside the Restorative Pod.' },
  { key: 'gs-cards', alt: 'Hands sorting the Groundswell Reflection Cards on a table.' },
]
function PrintsCover({ sheet, num, title, tagline, titleId, onImage, meta, treatment }) {
  const [order, setOrder] = useState(() => PRINT_KEYS.map((_, i) => i))
  const prints = PRINT_KEYS.map((p) => ({ ...p, src: sheetImg(p.key, 1400) })).filter((p) => p.src)
  const front = (i) => setOrder((o) => [i, ...o.filter((x) => x !== i)])
  const shown = prints[order[0]]

  const stack = (
    <div className={`${styles.printStack} ${treatment === 'sheet' ? styles.wabi : ''}`}>
      {prints.map((p, i) => {
        const depth = order.indexOf(i)
        return (
          <button key={p.key} type="button" className={styles.print}
            data-depth={depth} style={{ '--depth': depth, zIndex: 10 - depth }}
            onClick={(e) => depth === 0 ? onImage?.(p.key, e.currentTarget) : front(i)}
            aria-label={depth === 0 ? `View full screen: ${p.alt}` : `Bring to front: ${p.alt}`}>
            <img src={p.src} alt="" />
          </button>
        )
      })}
      {treatment === 'slip' && (
        <div className={styles.slip}>
          <Facts meta={meta} className={styles.slipFacts} />
        </div>
      )}
    </div>
  )

  /* E1 · THE CATALOGUE RECORD */
  if (treatment === 'catalogue') {
    return (
      <header className={`${styles.cover} ${styles.prints} ${styles.catalogue}`}>
        <div className={styles.printsText}>
          <span className={styles.accession}>No. {num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.record} />
        </div>
        <div className={styles.printsCol}>
          {stack}
          {shown && (
            <p className={styles.printCaption} aria-live="polite">
              <span className={styles.printCount}>
                Print {String(order[0] + 1).padStart(2, '0')} of {String(prints.length).padStart(2, '0')}
              </span>
              <span>{shown.alt}</span>
            </p>
          )}
        </div>
      </header>
    )
  }

  /* E2 · THE SLIP */
  if (treatment === 'slip') {
    return (
      <header className={`${styles.cover} ${styles.prints} ${styles.slipCover}`}>
        <div className={styles.printsText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
        </div>
        {stack}
      </header>
    )
  }

  /* E4 · THE SHEET: the facts typed on one sheet of loose-leaf paper
     under the name (FS61: a single sheet; a second one read as something
     to click); the prints in a looser pile. */
  if (treatment === 'sheet') {
    return (
      <header className={`${styles.cover} ${styles.prints}`}>
        <div className={styles.printsText}>
          <span className={styles.num}>{num}</span>
          <FitPair title={title} tagline={tagline} titleId={titleId} />
          <div className={styles.paper}>
            <div className={styles.paperSheet}>
              <span className={styles.holes} aria-hidden="true"><i /><i /><i /></span>
              {/* The longer facts where the column is wide enough to carry
                  them; the short ones where it is narrow. */}
              <Facts meta={sheet.metaLong || meta} className={`${styles.paperFacts} ${styles.factsLong}`} />
              <Facts meta={meta} className={`${styles.paperFacts} ${styles.factsShort}`} />
            </div>
          </div>
        </div>
        {stack}
      </header>
    )
  }

  /* E3 · THE FOLDER LABEL */
  if (treatment === 'label') {
    return (
      <header className={`${styles.cover} ${styles.prints}`}>
        <div className={`${styles.printsText} ${styles.label}`}>
          <span className={styles.labelBar}>
            <span>Project file</span>
            <span>No. {num}</span>
          </span>
          <div className={styles.labelBody}>
            <h2 id={titleId} className={styles.title}>{title}</h2>
            {tagline && <p className={styles.tagline}>{tagline}</p>}
            <Facts meta={meta} className={styles.record} />
          </div>
        </div>
        {stack}
      </header>
    )
  }

  return (
    <header className={`${styles.cover} ${styles.prints}`}>
      <TextRail {...{ num, title, tagline, titleId, meta }} className={styles.printsText} />
      {stack}
    </header>
  )
}

/** The lab's switcher: pinned to the sheet, only in lab mode. */
export function CoverLabSwitch({ value, onChange }) {
  const opts = [
    ['current', 'Current'],
    ['prints', 'E · The prints'],
    ['printsCatalogue', 'E1 · Catalogue record'],
    ['printsSlip', 'E2 · The slip'],
    ['printsLabel', 'E3 · Folder label'],
    ['printsSheet', 'E4 · The sheet'],
  ]
  return (
    <div className={styles.switch} role="radiogroup" aria-label="Cover option">
      {opts.map(([v, label]) => (
        <button key={v} type="button" role="radio" aria-checked={value === v}
          className={styles.switchBtn} onClick={() => onChange(v)}>
          {label}
        </button>
      ))}
    </div>
  )
}
