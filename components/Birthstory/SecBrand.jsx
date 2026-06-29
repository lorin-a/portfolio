'use client'

import { Section, SectionHead, sys } from './kit'
import styles from './SecBrand.module.css'

/* 08 — The brand. Identity recreated natively (palette + gradient + type), the
   moodboard shown as the artifact it is. Process voice: the decision was calm,
   organic, kin to the parent app — here is what that resolved into. */

const PALETTE = [
  ['#1A434D', 'Teal'], ['#3E5E6A', 'Slate'], ['#6D8F99', 'Sage'], ['#B1C1F4', 'Peri'], ['#DBADAD', 'Blush'],
  ['#9DA3BF', 'Dusk'], ['#BFC0D4', 'Mist'], ['#E6E5FD', 'Lilac'], ['#DBE6FA', 'Sky'], ['#FFFCFA', 'Paper'],
]

export default function SecBrand() {
  return (
    <Section id="brand" tone="shade">
      <SectionHead
        num="07"
        label="The brand"
        headline={<>Calm enough for the <em>wee hours</em> and the hospital light.</>}
        takeaway="The interface had to feel calming, organic and emotionally supportive — a safe space for hard feelings and bright ones alike. So the system stayed soft, and a gradient was built to echo Myana, the parent app."
      />

      <div className={`${styles.grid} ${sys.up}`} style={{ '--d': '200ms' }}>
        <div className={styles.specs}>
          <div className={styles.block}>
            <p className={styles.blockLabel}>Palette</p>
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

          <div className={styles.block}>
            <p className={styles.blockLabel}>Type</p>
            <div className={styles.type}>
              <div className={styles.typeRow}><span className={styles.typeFace}>Terfens</span><span className={styles.typeUse}>Titles &amp; headers</span></div>
              <div className={styles.typeRow}><span className={`${styles.typeFace} ${styles.typeBody}`}>Gotham</span><span className={styles.typeUse}>Sub-headers &amp; body</span></div>
            </div>
          </div>
        </div>

        <div className={styles.gradient}>
          <span className={styles.gWord}>Birth Story</span>
          <span className={styles.gNote}>Blush → periwinkle → teal. The whole identity in one object.</span>
        </div>
      </div>

      <figure className={`${styles.moodFig} ${sys.up}`} style={{ '--d': '300ms' }}>
        <img className={styles.mood} src="/images/birthstory/moodboard.png" alt="The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books." loading="lazy" />
        <figcaption className={styles.moodCap}>The moodboard — O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod.</figcaption>
      </figure>
    </Section>
  )
}
