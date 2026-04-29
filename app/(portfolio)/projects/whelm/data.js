/**
 * Whelm scrollytelling — dot cast + layout dictionary + beat sequence.
 *
 * Coordinate space: SVG viewBox 0 0 1000 600. Each dot is a <g> at (0,0)
 * containing a circle of r=24; GSAP translates the group via x/y and
 * scales it. Layouts only list dots that should be VISIBLE at that
 * beat. Match-cut continuity: a dot present in two adjacent layouts
 * travels between positions; a dot present in only one fades in/out.
 *
 * Colors are eyedropped approximations from the Figma slides. Refine
 * against the source palette before public ship.
 */

export const CAST = [
  { id: 'd01', color: '#D4A93B' }, // gold
  { id: 'd02', color: '#C9421B' }, // rust
  { id: 'd03', color: '#2A8AD5' }, // blue
  { id: 'd04', color: '#3F7E6E' }, // teal-green
  { id: 'd05', color: '#A53D5C' }, // wine
  { id: 'd06', color: '#7B3F9E' }, // purple
  { id: 'd07', color: '#7A8341' }, // olive
  { id: 'd08', color: '#D596B5' }, // pink-rose
  { id: 'd09', color: '#5A2E1E' }, // burgundy
  { id: 'd10', color: '#C5BB91' }, // tan
  { id: 'd11', color: '#B8D0DA' }, // icy blue
  { id: 'd12', color: '#5E8273' }, // sage
  { id: 'd13', color: '#3A6571' }, // deep teal
  { id: 'd14', color: '#D67428' }, // orange
  { id: 'd15', color: '#8B6A9E' }, // soft purple
  { id: 'd16', color: '#C0808A' }, // dusty rose
  { id: 'd17', color: '#E8C8D5' }, // light pink
  { id: 'd18', color: '#1B4A6B' }, // indigo
  { id: 'd19', color: '#A4A8C6' }, // cool lavender
  { id: 'd20', color: '#6E4E3D' }, // umber
]

export const YOU = { id: 'you', color: '#DCE7F0' }
export const ALL_DOTS = [...CAST, YOU]

/* ─── Computed ring positions for Act III ─────────────────────
   20 evenly-spaced angles around (500, 300), radius 200, starting
   at the top and walking clockwise. */
const RING_CENTER = { x: 500, y: 300 }
const RING_RADIUS = 200
const ringPos = (i) => {
  const angle = (i / 20) * Math.PI * 2 - Math.PI / 2
  return {
    x: +(RING_CENTER.x + Math.cos(angle) * RING_RADIUS).toFixed(1),
    y: +(RING_CENTER.y + Math.sin(angle) * RING_RADIUS).toFixed(1),
    scale: 1,
  }
}

const ringLayout = Object.fromEntries(
  CAST.map((dot, i) => [dot.id, ringPos(i)])
)

/* Indices into the ring used for chaotic interior lines (Act III).
   Pairs of dot indices whose ring positions get connected. Decorative;
   visualization-only; activated when DrawSVG lines are added. */
export const RING_LINES = [
  [0, 8], [0, 13], [3, 11], [4, 17], [6, 14],
  [7, 16], [9, 18], [10, 19], [12, 1], [15, 5], [2, 14],
]

export const LAYOUTS = {
  /* Hero — 5 dots in a diagonal across the right side, sized
     progressively. Mirrors the Figma title slide. */
  title: {
    d01: { x: 540, y: 440, scale: 0.5 },
    d02: { x: 625, y: 370, scale: 0.7 },
    d04: { x: 705, y: 295, scale: 0.9 },
    d03: { x: 805, y: 195, scale: 1.15 },
    d05: { x: 915, y: 90,  scale: 1.4 },
  },

  /* Single yellow thought. d03 (blue) carries forward from the title
     diagonal, traveling to its trio-right waiting position.
     d02, d04, d05 fade out (absent from this layout). */
  thought: {
    d01: { x: 500, y: 280, scale: 1 },
    d03: { x: 555, y: 270, scale: 1 },
  },

  /* Empathy: d02 (rust) fades in at trio-left. d01 and d03 already
     in place from thought; they nudge slightly into trio formation. */
  trio: {
    d01: { x: 510, y: 310, scale: 1 },
    d02: { x: 465, y: 270, scale: 1 },
    d03: { x: 555, y: 270, scale: 1 },
  },

  /* Perspectives: d04 (green) fades in below the trio. */
  quad: {
    d01: { x: 495, y: 290, scale: 1 },
    d02: { x: 460, y: 250, scale: 1 },
    d03: { x: 555, y: 250, scale: 1 },
    d04: { x: 565, y: 310, scale: 1 },
  },

  /* Cluster — all 20 dots converge into a tight blob. */
  cluster: {
    d01: { x: 510, y: 305, scale: 1 },
    d02: { x: 460, y: 280, scale: 1 },
    d03: { x: 555, y: 290, scale: 1 },
    d04: { x: 530, y: 340, scale: 1 },
    d05: { x: 480, y: 240, scale: 1 },
    d06: { x: 540, y: 230, scale: 1 },
    d07: { x: 425, y: 305, scale: 1 },
    d08: { x: 590, y: 320, scale: 1 },
    d09: { x: 590, y: 270, scale: 1 },
    d10: { x: 500, y: 350, scale: 1 },
    d11: { x: 450, y: 340, scale: 1 },
    d12: { x: 580, y: 360, scale: 1 },
    d13: { x: 460, y: 380, scale: 1 },
    d14: { x: 615, y: 285, scale: 1 },
    d15: { x: 425, y: 245, scale: 1 },
    d16: { x: 615, y: 360, scale: 1 },
    d17: { x: 545, y: 380, scale: 1 },
    d18: { x: 510, y: 215, scale: 1 },
    d19: { x: 405, y: 280, scale: 1 },
    d20: { x: 555, y: 350, scale: 1 },
    you: { x: 880, y: 480, scale: 0.7 },
  },

  /* Cluster + lavender rises slightly toward center. */
  truth: {
    d01: { x: 510, y: 305, scale: 1 },
    d02: { x: 460, y: 280, scale: 1 },
    d03: { x: 555, y: 290, scale: 1 },
    d04: { x: 530, y: 340, scale: 1 },
    d05: { x: 480, y: 240, scale: 1 },
    d06: { x: 540, y: 230, scale: 1 },
    d07: { x: 425, y: 305, scale: 1 },
    d08: { x: 590, y: 320, scale: 1 },
    d09: { x: 590, y: 270, scale: 1 },
    d10: { x: 500, y: 350, scale: 1 },
    d11: { x: 450, y: 340, scale: 1 },
    d12: { x: 580, y: 360, scale: 1 },
    d13: { x: 460, y: 380, scale: 1 },
    d14: { x: 615, y: 285, scale: 1 },
    d15: { x: 425, y: 245, scale: 1 },
    d16: { x: 615, y: 360, scale: 1 },
    d17: { x: 545, y: 380, scale: 1 },
    d18: { x: 510, y: 215, scale: 1 },
    d19: { x: 405, y: 280, scale: 1 },
    d20: { x: 555, y: 350, scale: 1 },
    you: { x: 870, y: 440, scale: 1.0 },
  },

  /* Act III — perfect ring formation. All 20 dots Flip from cluster
     to evenly-spaced ring positions. Lavender stays at lower-right. */
  ring: {
    ...ringLayout,
    you: { x: 880, y: 480, scale: 0.7 },
  },

  /* Same ring; lavender rises into focus for "But your own." */
  ring_you: {
    ...ringLayout,
    you: { x: 880, y: 460, scale: 1.0 },
  },

  /* Act IV — just blue, alone, large, at center. The ring fades. */
  blue_solo: {
    d03: { x: 500, y: 300, scale: 2.0 },
  },

  /* Blue + yellow as the "therapy and mom" pair. Yellow joins
     overlapping the right side of blue. */
  therapy_pair: {
    d01: { x: 470, y: 320, scale: 1.4 },
    d03: { x: 540, y: 280, scale: 1.6 },
  },
}

/* Initial layout — set on mount, intro animation runs, NOT a scroll beat. */
export const INITIAL_LAYOUT = 'title'
export const INITIAL_COPY = 'title'

/* Scroll-driven beats. Atomized: most movements split into a
   transition beat (dots move, lead text wipes in) followed by one
   or more held beats (image static, secondary copy reveals). The
   reader gets explicit dwell on each phrase rather than meeting them
   stacked inside one beat. */
export const BEATS = [
  /* Act I — thought spiral */
  { id: 'thought-lead',     layout: 'thought',  copyId: 'thought_lead',     span: 200 },
  { id: 'thought-quote',    layout: 'thought',  copyId: 'thought_quote',    span: 150 },
  { id: 'empathy-lead',     layout: 'trio',     copyId: 'empathy_lead',     span: 200 },
  { id: 'empathy-quote',    layout: 'trio',     copyId: 'empathy_quote',    span: 150 },
  { id: 'perspectives-lead',layout: 'quad',     copyId: 'persp_lead',       span: 200 },
  { id: 'perspectives-quote',layout: 'quad',    copyId: 'persp_quote',      span: 150 },

  /* Act II — distance, avoidance, truth */
  { id: 'distance',         layout: 'cluster',  copyId: 'distance',         span: 250 },
  { id: 'avoidance',        layout: 'cluster',  copyId: 'avoidance',        span: 200 },
  { id: 'disassociation',   layout: 'cluster',  copyId: 'disassociation',   span: 200 },
  { id: 'truth',            layout: 'truth',    copyId: 'truth',            span: 200 },

  /* Act III — every angle */
  { id: 'every-angle',      layout: 'ring',     copyId: 'every_angle',      span: 300 },
  { id: 'everyones',        layout: 'ring',     copyId: 'everyones',        span: 200 },
  { id: 'but-your-own',     layout: 'ring_you', copyId: 'but_your_own',     span: 200 },

  /* Act IV — therapy + mom */
  { id: 'aka',              layout: 'blue_solo',    copyId: 'aka',          span: 200 },
  { id: 'therapy',          layout: 'blue_solo',    copyId: 'therapy',      span: 200 },
  { id: 'mom',              layout: 'therapy_pair', copyId: 'mom',          span: 200 },
  { id: 'mom-wisdom',       layout: 'therapy_pair', copyId: 'mom_wisdom',   span: 250 },
]

export const TOTAL_VH = BEATS.reduce((sum, b) => sum + b.span, 0)
