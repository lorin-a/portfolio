'use client'

import SheetPrototype from './SheetPrototype'
import { rich } from './SheetContent'
import styles from './SheetAnnotated.module.css'

/* THE ANNOTATED STAGE (FS314): one working prototype, large, center stage
   on the project's gradient band, with its annotations on either side and
   a dotted leader pointing in, the grammar of the case study's feature
   aria and of the sheet's four-screen overview (FS313). The words sit next
   to the part of the work they explain instead of in the rail.

   Desktop: notes | device | notes. Narrow: the device, then the notes in
   one column beneath, each under a leader dropping from the band. */

function Note({ n, side }) {
  return (
    <div className={styles.note} data-side={side}>
      <span className={styles.leader} aria-hidden="true" />
      <p className={styles.label}>{n.label}</p>
      <p className={styles.text}>{rich(n.text)}</p>
    </div>
  )
}

export default function SheetAnnotated({ prototype, left = [], right = [], alt }) {
  return (
    <figure className={styles.stage}>
      <div className={styles.band}>
        <div className={`${styles.col} ${styles.left}`}>
          {left.map((n) => <Note key={n.label} n={n} side="left" />)}
        </div>
        <div className={styles.device} role="img" aria-label={alt} data-wide={prototype === 'book' || undefined}>
          <SheetPrototype name={prototype} bare />
        </div>
        <div className={`${styles.col} ${styles.right}`}>
          {right.map((n) => <Note key={n.label} n={n} side="right" />)}
        </div>
      </div>
    </figure>
  )
}
