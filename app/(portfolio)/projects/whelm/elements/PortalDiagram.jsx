import styles from '../whelm.module.css'

/* Portal — slide 255:365.
   A dashed spiral path winding inward to a "Self" core. Dashed (not
   solid) gives the path a meditative, otherworldly read — different
   energy from the structured Signal funnel and the chaotic Tangle.
   Includes a small lavender entry dot at the outer edge: "we are here,
   the path leads inward." Spiral is hand-shaped — not a perfect
   Archimedean — to feel drawn rather than computed. */

/* Spiral path, drawn from outer entry point inward to center. Mostly
   smooth curves with subtle organic variations. Center is roughly (300, 300). */
const SPIRAL_D =
  'M 540 470 ' +
  'C 540 540, 480 540, 380 540 ' +
  'S 130 530, 110 380 ' +
  'S 145 145, 320 100 ' +
  'S 555 165, 520 360 ' +
  'S 240 460, 200 340 ' +
  'S 290 145, 410 200 ' +
  'S 470 360, 320 360 ' +
  'S 285 280, 320 290'

export default function PortalDiagram() {
  return (
    <svg
      viewBox="0 0 600 600"
      className={styles.diagram}
      role="img"
      aria-label="Overwhelm is a portal — a dashed spiral path inward to self"
    >
      {/* Spiral path */}
      <path
        d={SPIRAL_D}
        fill="none"
        stroke="#895fae"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 9"
        opacity="0.85"
      />

      {/* Entry dot — bottom-right exterior */}
      <circle cx="540" cy="470" r="9" fill="#bdb7e9" opacity="0.85" />

      {/* Self core — center */}
      <g>
        <circle cx="312" cy="300" r="22" fill="#7e609d" />
        <text
          x="312"
          y="305"
          textAnchor="middle"
          className={styles.portalCoreLabel}
          fill="#f3eff7"
        >
          Self
        </text>
      </g>
    </svg>
  )
}
