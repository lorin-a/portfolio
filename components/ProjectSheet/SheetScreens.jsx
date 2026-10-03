'use client'

import { rich } from './SheetContent'
import styles from './SheetScreens.module.css'

/* KEY SCREENS, SIDE BY SIDE (FS313, generalized FS314): real screens on
   one continuous band of the project's gradient, each with a dotted leader
   down to its annotation. First built as the BirthStory overview (her
   “exactly right”); now any sheet section can use it through
   `media.screens` or `system.screens`.

   Each item: { src, alt, name, tag?, text?, quote?, muted? }.
   `muted` sets the tag and leader in lavender (BirthStory: the one
   private moment). `quote` renders in italics under the text. Four
   across on desktop (or as many as given, up to four), 2 × 2 on phones. */

export default function SheetScreens({ items = [] }) {
  return (
    <figure className={styles.eco}>
      <ol className={styles.screens} style={{ '--n': Math.min(items.length, 4) }}>
        {items.map((s, i) => (
          <li key={s.name || i} className={styles.item} data-private={s.muted || undefined} style={{ '--i': i }}>
            <div className={styles.stage}>
              <span className={styles.phone}>
                <span className={styles.notch} aria-hidden="true" />
                <span className={styles.screen}>
                  <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
                </span>
              </span>
            </div>
            <span className={styles.leader} aria-hidden="true" />
            <div className={styles.note}>
              <h4 className={styles.name}>{s.name}</h4>
              {s.tag && <p className={styles.who}>{s.tag}</p>}
              {s.text && <p className={styles.text}>{rich(s.text)}</p>}
              {s.quote && <p className={`${styles.text} ${styles.quote}`}>{s.quote}</p>}
            </div>
          </li>
        ))}
      </ol>
    </figure>
  )
}
