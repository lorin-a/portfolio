'use client'

import { sheetImg, stillFor } from './SheetMedia'
import styles from './CoverLab.module.css'

/**
 * COVER LAB — three cover treatments to compare in place (her note FS57:
 * "Show me 3 options I could not have thought of myself"). Lab only: the
 * sheet renders these when the page URL carries ?coverlab, with a switcher
 * pinned to the sheet. The shipped cover is untouched until she picks.
 *
 *   ambient  — the photo's own colour spreads into the page as a soft
 *              light behind the whole cover; photo crisp, text on its glow.
 *   name     — "Groundswell" set across the full width, the photograph
 *              showing through the letters and drifting slowly.
 *   strip    — the five components as tall slices: a visual contents.
 *              Hover widens a slice; click jumps to its section.
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
  const hero = sheet.hero
  const heroSrc = hero && sheetImg(hero.key, 2000)
  const meta = sheet.meta || []

  if (variant === 'ambient') {
    return (
      <header className={`${styles.cover} ${styles.ambient}`}>
        {heroSrc && (
          <span className={styles.glow} aria-hidden="true"
            style={{ '--glow': `url(${heroSrc})` }} />
        )}
        <div className={styles.ambientText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.facts} />
        </div>
        {heroSrc && (
          <button type="button" className={styles.ambientPhoto}
            onClick={(e) => onImage?.(hero.key, e.currentTarget)}
            aria-label={`View full screen: ${hero.alt}`}>
            <img src={heroSrc} alt="" />
          </button>
        )}
      </header>
    )
  }

  if (variant === 'name') {
    return (
      <header className={`${styles.cover} ${styles.name}`}>
        <span className={styles.num}>{num}</span>
        <h2 id={titleId} className={styles.knockout}
          style={heroSrc ? { backgroundImage: `url(${heroSrc})` } : undefined}>
          {title}
        </h2>
        <div className={styles.nameRow}>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.factsRow} />
        </div>
      </header>
    )
  }

  if (variant === 'strip') {
    const slices = (sheet.components || []).map((c, i) => ({
      key: c.key,
      n: String(i + 1).padStart(2, '0'),
      name: c.name,
      src: stillFor(c.media),
      gated: c.gated,
    }))
    const go = (key) => {
      const el = document.getElementById(`sheet-${key}`)
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      el?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    }
    return (
      <header className={`${styles.cover} ${styles.strip}`}>
        <div className={styles.stripText}>
          <span className={styles.num}>{num}</span>
          <h2 id={titleId} className={styles.title}>{title}</h2>
          {tagline && <p className={styles.tagline}>{tagline}</p>}
          <Facts meta={meta} className={styles.facts} />
        </div>
        <nav className={styles.slices} aria-label={`${title}: the five components`}>
          {slices.map((s) => (
            <button key={s.key} type="button" className={styles.slice}
              data-gated={s.gated || undefined} onClick={() => go(s.key)}
              aria-label={`${s.n} ${s.name}: go to this component`}>
              {s.src && <img src={s.src} alt="" loading="lazy" />}
              <span className={styles.sliceLabel}>
                <span className={styles.sliceNum}>{s.n}</span>
                <span className={styles.sliceName}>{s.name}</span>
              </span>
            </button>
          ))}
        </nav>
      </header>
    )
  }

  return null
}

/** The lab's switcher: pinned to the sheet, only in lab mode. */
export function CoverLabSwitch({ value, onChange }) {
  const opts = [
    ['current', 'Current'],
    ['ambient', '1 · Ambient bleed'],
    ['name', '2 · The name, made of the place'],
    ['strip', '3 · The ecosystem at a glance'],
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
