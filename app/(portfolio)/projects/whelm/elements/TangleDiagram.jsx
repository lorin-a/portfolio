import styles from '../whelm.module.css'

/* Tangle — slide 255:363.
   A knot of curving lines with embedded labeled nodes. Composition is
   organic, not symmetrical — emotions/contexts of overwhelm don't map
   onto a clean grid. Lines are hand-curated bezier curves overlapping
   in a way that reads as "wound up" without being purely random. Nodes
   are small lavender circles dropped at points where the curves cluster.
   Labels sit just outside each node, anchored to keep the knot visible. */

const NODES = [
  { id: 'trauma',    cx: 200, cy: 180, lx: 140, ly: 150, anchor: 'end' },
  { id: 'panic',     cx: 350, cy: 130, lx: 350, ly: 110, anchor: 'middle' },
  { id: 'anxiety',   cx: 320, cy: 200, lx: 300, ly: 180, anchor: 'end' },
  { id: 'family',    cx: 150, cy: 290, lx: 95,  ly: 270, anchor: 'end', label2: 'Role' },
  { id: 'tightChest',cx: 235, cy: 295, lx: 205, ly: 280, anchor: 'end', label2: 'Chest' },
  { id: 'lost',      cx: 305, cy: 305, lx: 320, ly: 290, anchor: 'middle' },
  { id: 'identity',  cx: 380, cy: 320, lx: 405, ly: 305, anchor: 'start' },
  { id: 'socio',     cx: 470, cy: 260, lx: 510, ly: 245, anchor: 'start', label2: 'Economics' },
  { id: 'tooMuch',   cx: 480, cy: 360, lx: 525, ly: 350, anchor: 'start' },
  { id: 'culture',   cx: 470, cy: 440, lx: 520, ly: 430, anchor: 'start' },
  { id: 'notEnough', cx: 280, cy: 440, lx: 280, ly: 460, anchor: 'middle' },
]

const LABELS = {
  trauma:    'Trauma',
  panic:     'Panic',
  anxiety:   'Anxiety',
  family:    'Family',
  tightChest:'Tight',
  lost:      'Lost',
  identity:  'Identity',
  socio:     'Socio',
  tooMuch:   'Too Much',
  culture:   'Culture',
  notEnough: 'Not Enough',
}

/* Hand-curated bezier curves that overlap to form the tangle. Each is
   stroked, no fill. The orchid (#895fae) is the core stroke; mauve
   (#bdb7e9) layers add lighter undertones for depth. */
const CURVES_DARK = [
  'M 130 220 C 280 80,  450 90,  520 240 S 360 470, 230 430 S 100 280, 130 220 Z',
  'M 180 380 C 320 470, 460 410, 500 320 S 380 130, 250 220 S 130 320, 180 380 Z',
  'M 220 160 C 350 220, 410 320, 320 420 S 160 360, 220 160 Z',
]
const CURVES_LIGHT = [
  'M 250 140 C 340 280, 480 280, 470 380 S 290 460, 230 350 S 200 230, 250 140 Z',
  'M 300 250 C 410 200, 480 320, 380 410 S 220 380, 240 290 S 270 260, 300 250 Z',
]

export default function TangleDiagram() {
  return (
    <svg
      viewBox="0 0 600 600"
      className={styles.diagram}
      role="img"
      aria-label="Overwhelm is a tangle — eleven interconnected emotions and contexts"
    >
      {/* Lighter undertones first */}
      {CURVES_LIGHT.map((d, i) => (
        <path
          key={`l${i}`}
          d={d}
          fill="none"
          stroke="#bdb7e9"
          strokeWidth="1.5"
          opacity="0.55"
          strokeLinecap="round"
        />
      ))}
      {/* Orchid overlays on top */}
      {CURVES_DARK.map((d, i) => (
        <path
          key={`d${i}`}
          d={d}
          fill="none"
          stroke="#895fae"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ))}

      {/* Nodes */}
      {NODES.map(n => (
        <circle key={n.id} cx={n.cx} cy={n.cy} r="9" fill="#bdb7e9" />
      ))}

      {/* Labels — sit just outside each node, anchored to read clean */}
      {NODES.map(n => (
        <text
          key={`t${n.id}`}
          x={n.lx}
          y={n.ly}
          textAnchor={n.anchor}
          className={styles.tangleLabel}
          fill="#f3eff7"
        >
          <tspan x={n.lx} dy="0">{LABELS[n.id]}</tspan>
          {n.label2 && <tspan x={n.lx} dy="14">{n.label2}</tspan>}
        </text>
      ))}
    </svg>
  )
}
