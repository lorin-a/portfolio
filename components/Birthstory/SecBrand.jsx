'use client'

import { FieldSection, Lead, Prose, Insight, Split, sys } from './kit'
import styles from './SecBrand.module.css'

/* 07 — Visual design. Palette, type, and gradient documented as decisions: calm,
   emotionally intelligent, non-clinical; the moodboard as the artifact it is. */

const PALETTE = [
  ['#1A434D', 'teal'], ['#3E5E6A', 'slate'], ['#6D8F99', 'sage'], ['#B1C1F4', 'peri'], ['#DBADAD', 'blush'],
  ['#9DA3BF', 'dusk'], ['#BFC0D4', 'mist'], ['#E6E5FD', 'lilac'], ['#DBE6FA', 'sky'], ['#FFFCFA', 'paper'],
]

export default function SecBrand() {
  return (
    <FieldSection id="brand" crumb="visual design" when="Week 5" wide sub>
      <Split
        text={
          <>
            <Lead>Calm, emotionally intelligent, and deliberately non-clinical.</Lead>
            <Prose>
              Myana already used a gradient, so I built one here to tie the two together. Parents told
              me they’d mostly reach for this in the small hours between feedings, so everything had to
              read gently to someone exhausted in the middle of the night.
            </Prose>
          </>
        }
      >
        <Insight narrow>
          I chose a lighter pink into a darker teal because it let me hold two things at once: a gender
          spectrum, and the emotional range of the day itself.
        </Insight>
      </Split>

      <div className={`${styles.signature} ${sys.up}`}>
        {/* the real wordmark, set in Terfens (the app's title face, a commercial
            font not installed here) — exported from Figma as vector, not
            re-typeset in Fraunces */}
        <img className={styles.gWord} src="/images/birthstory/wordmark-birthstory.svg" alt="Birth Story" width="267" height="54" draggable="false" />
        <span className={styles.gNote}>blush → periwinkle → teal · the gradient that ties Birth Story to Myana</span>
      </div>

      <div className={`${styles.lower} ${sys.up}`}>
        <div className={styles.specsCol}>
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

        <figure className={styles.board}>
          <div className={styles.boardArt}>
            <span className={styles.boardTab}>moodboard</span>
            <img
              src="/images/birthstory/moodboard.png"
              alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books."
              loading="lazy"
              draggable="false"
            />
          </div>
          <figcaption className={styles.boardCap}>
            <span className={styles.boardSrc}>moodboard · figma</span>
            <p className={styles.boardNote}>
              O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod.
            </p>
          </figcaption>
        </figure>
      </div>
    </FieldSection>
  )
}
