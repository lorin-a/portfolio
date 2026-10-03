'use client'

import SheetPrototype from '../SheetPrototype'
import { sheetImg } from '../SheetMedia'
import styles from './BirthStoryProcess.module.css'

/* BIRTHSTORY, PART TWO (FS314): each process section shows its real
   artifact, annotated, instead of a deck slide. Copy arrives as `data`
   from content/sheets/birthstory.js, where every line has its receipt. */

/* RESEARCH: the voice is the artifact (the case study's call): one
   parent's words at full size, what parents asked for, and the
   think-aloud session beside them. */
export function Voices({ data }) {
  const photo = sheetImg(data.photo?.key, 1400)
  return (
    <figure className={styles.voices}>
      <div className={styles.voicesWords}>
        <blockquote className={styles.bigQuote}>
          <p>{data.quote}</p>
          <cite>{data.cite}</cite>
        </blockquote>
        <p className={styles.kicker}>{data.asksLabel}</p>
        <ul className={styles.asks}>
          {data.asks.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </div>
      {photo && (
        <div className={styles.voicesPhoto}>
          <img src={photo} alt={data.photo.alt} loading="lazy" />
          <figcaption className={styles.caption}>{data.photo.alt}</figcaption>
        </div>
      )}
    </figure>
  )
}

/* ARCHITECTURE: before and after in one view, the count between them. */
export function FourToZero({ data }) {
  return (
    <figure className={styles.ia}>
      <div className={styles.iaStep}>
        <p className={styles.kicker}>{data.before.label}</p>
        <div className={`${styles.iaFrame} ${styles.iaV1}`}>
          <SheetPrototype name="ia-v1" fallback={sheetImg('bs-v1-ia', 1200)} fallbackAlt={data.before.alt} />
        </div>
        <p className={styles.caption}>{data.before.text}</p>
      </div>
      <div className={styles.count} aria-hidden="true">
        <span className={styles.countFig}>4<span className={styles.countArrow}>→</span>0</span>
        <span className={styles.countLabel}>questions before the first entry</span>
      </div>
      <div className={styles.iaStep}>
        <p className={styles.kicker}>{data.after.label}</p>
        <div className={`${styles.iaFrame} ${styles.iaFinal}`}>
          <SheetPrototype name="ia-final" fallback={sheetImg('bs-ia-final', 1200)} fallbackAlt={data.after.alt} />
        </div>
        <p className={styles.caption}>{data.after.text}</p>
      </div>
    </figure>
  )
}

/* UX WRITING: the screen that carried the first copy, and each line
   struck and rewritten beside it, under the parent's words that drove it. */
export function Revisions({ data }) {
  return (
    <figure className={styles.rev}>
      <div className={styles.revScreen}>
        <span className={styles.phone}>
          <span className={styles.notch} aria-hidden="true" />
          <span className={styles.screen}><img src={data.screen.src} alt={data.screen.alt} loading="lazy" /></span>
        </span>
        <p className={styles.caption}>{data.screen.caption}</p>
      </div>
      <div className={styles.revWords}>
        <p className={styles.kicker}>{data.saidLabel}</p>
        <blockquote className={styles.said}><p>{data.said}</p></blockquote>
        <p className={styles.kicker}>Revised</p>
        <ul className={styles.revList}>
          {data.rows.map(([from, to]) => (
            <li key={from} className={styles.revRow}>
              <span className={styles.from}>{from}</span>
              <span className={styles.arrow} aria-hidden="true">→</span>
              <span className={styles.to}>{to}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}

/* VISUAL IDENTITY: the system drawn live: the gradient with the
   wordmark, the palette by name, the two typefaces, the moodboard. */
export function Identity({ data }) {
  return (
    <figure className={styles.id}>
      <div className={styles.gradient}>
        <img className={styles.wordmark} src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story" draggable="false" />
        <span className={styles.gradientNote}>{data.gradientNote}</span>
      </div>
      <div className={styles.idLower}>
        <div className={styles.specs}>
          <p className={styles.kicker}>Palette</p>
          <ul className={styles.swatches}>
            {data.palette.map(([hex, name]) => (
              <li key={hex} className={styles.swatch}>
                <span className={styles.chip} style={{ background: hex }} />
                <span className={styles.sName}>{name}</span>
                <span className={styles.sHex}>{hex}</span>
              </li>
            ))}
          </ul>
          <p className={styles.kicker}>Type</p>
          <ul className={styles.types}>
            {data.type.map(([face, use]) => (
              <li key={face} className={styles.typeRow}><span className={styles.face}>{face}</span><span className={styles.use}>{use}</span></li>
            ))}
          </ul>
        </div>
        <div className={styles.board}>
          <img src="/images/birthstory/moodboard.png" alt={data.moodboard.alt} loading="lazy" />
          <p className={styles.caption}>{data.moodboard.caption}</p>
        </div>
      </div>
    </figure>
  )
}
