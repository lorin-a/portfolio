'use client'

import { FieldSection, Lead, Prose, Plate, sys } from './kit'
import styles from './SecBrand.module.css'

/* 07 — Visual design. Palette, type, and gradient documented as decisions: calm,
   emotionally intelligent, non-clinical; the moodboard as the artifact it is. */

const PALETTE = [
  ['#1A434D', 'teal'], ['#3E5E6A', 'slate'], ['#6D8F99', 'sage'], ['#B1C1F4', 'peri'], ['#DBADAD', 'blush'],
  ['#9DA3BF', 'dusk'], ['#BFC0D4', 'mist'], ['#E6E5FD', 'lilac'], ['#DBE6FA', 'sky'], ['#FFFCFA', 'paper'],
]

export default function SecBrand() {
  return (
    <FieldSection id="brand" num="07" crumb="visual design" when="Week 5" wide>
      <Lead>Calm, emotionally intelligent, and deliberately non-clinical.</Lead>
      <Prose>
        The app needed to feel calm, emotionally intelligent, and approachable, a break from clinical
        experiences. Myana already used a gradient, so I built one here to connect the two products. The
        lighter pink to darker teal carries two quiet metaphors: a gender spectrum, and the emotional
        range of the day itself. Parents said they would use the app in the small hours between feedings,
        so every choice had to read gently to an exhausted person in the middle of the night.
      </Prose>

      <div className={`${styles.signature} ${sys.up}`}>
        <span className={styles.gWord}>Birth Story</span>
        <span className={styles.gNote}>blush → periwinkle → teal · the gradient that ties Birth Story to Myana</span>
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
