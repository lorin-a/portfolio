'use client'

import { forwardRef } from 'react'
import styles from '../whelm.module.css'

/* StickySection — the wrapper every post-hero beat sits inside.

   Owns:
     - Outer track height (controls how long the sticky pins for)
     - position: sticky inner stage at viewport-minus-nav
     - dvh fallback, scroll-margin, deep-purple bg
     - data-sticky="true" hook for useStickyReveal's IntersectionObserver

   Doesn't own:
     - Anything inside the sticky (composition, type, art) — that's the
       section's job. StickySection is a frame, not a layout engine.

   `track` controls the outer height. The default (`track="medium"`)
   gives ~80vh of post-pin scroll room — enough for a ~3-5s timeline
   to play through before the user scrolls past. `track="long"` is for
   beats with longer timelines (Tangle's threads draw for 13s+).

   The inner sticky uses `data-stage="default"` (flex-center) or
   `data-stage="grid"` (no display rules; section provides its own).
   The grid variant is for compositions that need full control over
   how content sits inside the viewport-minus-nav box. */

export const StickySection = forwardRef(function StickySection(
  {
    id,
    track = 'medium',
    stage = 'default',
    className = '',
    stickyClassName = '',
    children,
    ...rest
  },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      className={`${styles.section} ${styles[`section_track_${track}`]} ${className}`}
      {...rest}
    >
      <div
        data-sticky="true"
        data-stage={stage}
        className={`${styles.sectionSticky} ${stickyClassName}`}
      >
        {children}
      </div>
    </section>
  )
})
