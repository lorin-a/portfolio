'use client'

import { FieldSection, Ask, Prose, Plate, sys } from './kit'
import styles from './SecBrand.module.css'

/* 07 — Brand. Question: what should this feel like at 3am? Palette, type and
   gradient shown as documented decisions; the moodboard as the artifact it is. */

const PALETTE = [
  ['#1A434D', 'teal'], ['#3E5E6A', 'slate'], ['#6D8F99', 'sage'], ['#B1C1F4', 'peri'], ['#DBADAD', 'blush'],
  ['#9DA3BF', 'dusk'], ['#BFC0D4', 'mist'], ['#E6E5FD', 'lilac'], ['#DBE6FA', 'sky'], ['#FFFCFA', 'paper'],
]

export default function SecBrand() {
  return (
    <FieldSection id="brand" num="07" crumb="brand" when="the feel">
      <Ask>What should this feel like at <em>3am</em>, and in the hospital light?</Ask>
      <Prose>
        It had to hold hard feelings and bright ones without tipping into either: calm, organic, never
        clinical. I built a gradient to echo Myana, the parent app, so Birth Story felt like family, and
        kept everything soft enough to read at the worst hour of the night.
      </Prose>

      <div className={`${styles.signature} ${sys.up}`}>
        <span className={styles.gWord}>Birth Story</span>
        <span className={styles.gNote}>blush → periwinkle → teal · the whole identity in one object</span>
      </div>

      <div className={`${styles.specs} ${sys.up}`}>
        <div className={styles.palette}>
          <span className={sys.askKicker}>palette</span>
          <div className={styles.swatches}>
            {PALETTE.map(([hex, name]) => (
              <div key={hex} className={styles.swatch}>
                <span className={styles.chip} style={{ background: hex }} />
                <span className={styles.sName}>{name}</span>
                <span className={styles.sHex}>{hex}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.type}>
          <span className={sys.askKicker}>type</span>
          <div className={styles.typeRow}><span className={styles.face}>Terfens</span><span className={styles.use}>titles</span></div>
          <div className={styles.typeRow}><span className={`${styles.face} ${styles.body}`}>Gotham</span><span className={styles.use}>everything else</span></div>
        </div>
      </div>

      <Plate
        tab="moodboard"
        wide
        light
        src="/images/birthstory/moodboard.png"
        alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books."
        cap="moodboard · figma"
        margin="O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod."
        rot="-0.5deg"
      />
    </FieldSection>
  )
}
