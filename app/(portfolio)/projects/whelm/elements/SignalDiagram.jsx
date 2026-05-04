import styles from '../whelm.module.css'

/* Signal — slide 255:362.
   An inverted funnel stratified into 4 bands. Bottom (lightest) is the
   quietest signal of overwhelm; top (darkest) is the loudest. Reading
   bottom→top mirrors how overwhelm escalates: numbing first, then
   avoidance, then intrusive thoughts, then questioning/overstimulation.
   The shape is one silhouette: rounded-corner top, sides taper to a
   rounded bottom point. Bands are full-width rects clipped to the
   silhouette so the funnel reads as a single object even though it's
   internally divided. */
export default function SignalDiagram() {
  return (
    <svg
      viewBox="0 0 600 600"
      className={styles.diagram}
      role="img"
      aria-label="Overwhelm is a signal — an inverted funnel of escalating responses"
    >
      <defs>
        <clipPath id="signalSilhouette">
          <path d="M 90 60 H 510 A 30 30 0 0 1 540 90 L 360 510 A 30 30 0 0 1 300 540 A 30 30 0 0 1 240 510 L 60 90 A 30 30 0 0 1 90 60 Z" />
        </clipPath>
      </defs>

      {/* Bands, top → bottom */}
      <g clipPath="url(#signalSilhouette)">
        <rect x="0" y="60"  width="600" height="120" fill="#3a2553" />
        <rect x="0" y="180" width="600" height="120" fill="#7e609d" />
        <rect x="0" y="300" width="600" height="120" fill="#c0b6dd" />
        <rect x="0" y="420" width="600" height="120" fill="#ece4f6" />
      </g>

      {/* Outline — subtle silhouette stroke for definition */}
      <path
        d="M 90 60 H 510 A 30 30 0 0 1 540 90 L 360 510 A 30 30 0 0 1 300 540 A 30 30 0 0 1 240 510 L 60 90 A 30 30 0 0 1 90 60 Z"
        fill="none"
        stroke="#bdb7e9"
        strokeWidth="1.5"
        opacity="0.4"
      />

      {/* Labels — color contrast inverted on bottom two bands */}
      <text x="300" y="128" textAnchor="middle" className={styles.signalLabel} fill="#f3eff7">
        Questioning / Analyzing / Overstimulation
      </text>
      <text x="300" y="248" textAnchor="middle" className={styles.signalLabel} fill="#f3eff7">
        Intrusive Thoughts / Fixing / Managing
      </text>
      <text x="300" y="368" textAnchor="middle" className={styles.signalLabel} fill="#1f0536">
        Avoiding / Disassociating
      </text>
      <text x="300" y="488" textAnchor="middle" className={styles.signalLabel} fill="#1f0536">
        Numbing
      </text>
    </svg>
  )
}
