'use client'

import { useEffect, useState } from 'react'
import styles from './DeviceMockup.module.css'

/* ============================================================================
   DeviceMockup — reusable iPhone frame for app-concept case studies.
   One media slot, three modes (identical bones, bespoke flesh):
     • media="image"  — a static screenshot (src, alt)
     • media="video"  — a muted autoplay loop of a prototype recording (src, poster)
     • media="screens"— a set of exported screens (screens=[{src,alt}]) *
     • children       — a custom placeholder screen, used until real media lands
   Reduced motion: video shows its poster (no autoplay/loop); float is disabled;
   custom screens render static. The caption always carries the meaning, so the
   device is a bonus, never the only path to the information.
   * screens-swap-on-scroll is a planned enhancement; v1 shows the first screen.
   ============================================================================ */

export default function DeviceMockup({
  media = 'placeholder',
  src,
  poster,
  alt = '',
  screens = [],
  caption,
  aspect = '9 / 19.5',
  width = 'min(280px, 72vw)',
  float = true,
  children,
}) {
  const reduce = usePrefersReducedMotion()
  const showFloat = float && !reduce

  return (
    <figure className={styles.wrap}>
      <div className={`${styles.phone} ${showFloat ? styles.float : ''}`} style={{ width }}>
        <span className={styles.island} aria-hidden="true" />
        <div className={styles.screen} style={{ aspectRatio: aspect }}>
          {media === 'video' && src ? (
            <video
              className={styles.media}
              src={src}
              poster={poster}
              muted
              loop={!reduce}
              autoPlay={!reduce}
              playsInline
              preload="metadata"
              aria-label={alt}
            />
          ) : media === 'image' && src ? (
            <img className={styles.media} src={src} alt={alt} loading="lazy" />
          ) : media === 'screens' && screens.length ? (
            <img className={styles.media} src={screens[0].src} alt={screens[0].alt || alt} loading="lazy" />
          ) : (
            children
          )}
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduce(m.matches)
    const on = () => setReduce(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduce
}
