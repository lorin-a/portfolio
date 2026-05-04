import styles from '../whelm.module.css'

/* Hero cursive flourish — slide 255:355.
   Lorin's exported gradient-filled cursive whelm mark. Sits above the
   deep-purple background, oversized so it extends past the stage on
   all sides — the strokes feel hand-drawn into and beyond the canvas.
   Wrapped in a clipping div so the orchestrator can animate
   clip-path inset 100% → 0% during the intro for a left-to-right
   draw-on (matches handwriting flow). */
export default function HeroFlourish() {
  return (
    <div className={styles.heroFlourishClip} data-hero-clip="true">
      <img
        src="/marks/whelm/cursivewhelm.svg"
        alt=""
        className={styles.heroFlourishImg}
        aria-hidden="true"
        draggable={false}
      />
    </div>
  )
}
