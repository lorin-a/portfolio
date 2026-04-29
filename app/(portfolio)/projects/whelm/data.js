/**
 * Whelm scrollytelling — dot cast + layout dictionary + beat sequence.
 *
 * Coordinate space: SVG viewBox 0 0 1000 600. Each dot is a <g> at (0,0)
 * containing a circle of r=24; GSAP translates the group via x/y and
 * scales it. Dots persist throughout the entire story — when not
 * starring, they recede to ambient peripheral positions (small scale,
 * lower opacity) rather than disappearing. The whole point is that
 * the cast remains continuous as scroll repositions them.
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

  /* Cluster: all 20 dots converge into a tight blob. The 5 title
     dots return from ambient; the other 15 enter from offstage.
     Lavender "you" appears at lower-right edge. */
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

  /* Same cluster; lavender "you" rises slightly toward center. */
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
}

/* Initial layout — set on mount, runs intro animation, NOT a scroll beat. */
export const INITIAL_LAYOUT = 'title'
export const INITIAL_COPY = 'title'

/* Scroll-driven beats only. The first beat transitions FROM the title
   initial state. span = vh of scroll spent transitioning INTO this beat. */
export const BEATS = [
  { id: 'thought',       layout: 'thought', copyId: 'thought',      span: 250 },
  { id: 'empathy',       layout: 'trio',    copyId: 'empathy',      span: 200 },
  { id: 'perspectives',  layout: 'quad',    copyId: 'perspectives', span: 200 },
  { id: 'distance',      layout: 'cluster', copyId: 'distance',     span: 250 },
  { id: 'avoidance',     layout: 'cluster', copyId: 'avoidance',    span: 200 },
  { id: 'truth',         layout: 'truth',   copyId: 'truth',        span: 200 },
]

export const TOTAL_VH = BEATS.reduce((sum, b) => sum + b.span, 0)
