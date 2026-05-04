import styles from '../whelm.module.css'

/* Generic full-bleed asset renderer. Loads a Whelm SVG export from
   public/marks/whelm/ as an <img>. The element wrapper handles grid
   placement and beat-driven opacity; this component just fills it.
   Used for assets exported as 1920×1080 slide compositions where the
   intent is full-canvas presence. */
export default function BleedAsset({ src, alt, opacity, blendMode }) {
  return (
    <img
      src={src}
      alt={alt || ''}
      className={styles.bleedAsset}
      style={{
        opacity: opacity ?? 1,
        mixBlendMode: blendMode || 'normal',
      }}
      draggable={false}
      aria-hidden={alt ? undefined : 'true'}
    />
  )
}
