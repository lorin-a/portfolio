/**
 * Whelm scrollytelling — layout dictionary + beat sequence.
 *
 * Coordinate space: percentages of the stage (a div sized to fill the
 * pinned viewport). x/y are 0–100, where 50/50 is dead center. The
 * orchestrator drives CSS custom properties (--ex, --ey, --es, --eo)
 * via GSAP, and the .element wrapper resolves them in `transform` and
 * `left/top`. Layouts list ONLY the elements that should be VISIBLE at
 * that beat — match-cut continuity falls out for free: an element
 * present in two adjacent layouts travels; an element present in only
 * one fades in/out.
 *
 * Phase 0 placeholder set: hero, divider, overlooked, not-a-problem,
 * messenger. Enough to verify the engine renders, transitions, and
 * holds across beats. Phase 2 fills the full 16-beat sequence.
 */

/* Element catalog: every id that could appear in any layout. The
   Stage iterates this list once and mounts a wrapper per id; the
   orchestrator only animates positioning + opacity afterward. */
export const ELEMENT_IDS = [
  'wordmark',
  'agenda',
  'overcome-stack',
  'signal-diagram',
  'tangle-diagram',
  'portal-diagram',
  'wordplay',
  'manifesto-panel',
  'persona-venn',
  'typology-trio',
  'roots-grid',
  'phase-journey',
]

export const LAYOUTS = {
  /* 01 — Hero. Wordmark center-stage. */
  hero: {
    wordmark: { x: 50, y: 50, scale: 1, opacity: 1 },
  },

  /* 02 — Chapter divider. Agenda list visible in upper-right. */
  agenda: {
    agenda: { x: 75, y: 45, scale: 1, opacity: 1 },
  },

  /* 03 — Overlooked: layered "Overwhelm" type stack.  */
  'overcome-stack': {
    'overcome-stack': { x: 50, y: 50, scale: 1, opacity: 1 },
  },

  /* 05 — Messenger: type alone, no element. */
  empty: {},

  /* 08 — Signal diagram on the right; copy fills the left half. */
  'signal-diagram': {
    'signal-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },

  /* 09 — Tangle diagram. Same composition as Signal — diagram right,
     copy left. The match-cut moment is purely the diagram swap. */
  'tangle-diagram': {
    'tangle-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },

  /* 10 — Portal diagram. Same right-side anchor; the spiral and "Self"
     core carry the metaphor inward. */
  'portal-diagram': {
    'portal-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },
}

export const INITIAL_LAYOUT = 'hero'
export const INITIAL_COPY = 'hero'

export const BEATS = [
  /* Each beat: { id, layout, copyId, span, attrs? }
     - layout: name from LAYOUTS
     - copyId: key in COPY
     - span: vh of pinned scroll dwell
     - attrs: optional element-id → attribute dict, applied during Phase A
       (used for held beats that morph internal state without layout change) */

  /* 02 — divider The Gap (held against an empty prior canvas; agenda fades in) */
  { id: 'divider-gap',  layout: 'agenda',         copyId: 'divider-gap',   span: 100,
    attrs: { agenda: { 'data-active': 'gap' } } },

  /* 03 — Overlooked (transition: agenda fades out, overcome-stack fades in) */
  { id: 'overlooked',   layout: 'overcome-stack', copyId: 'overlooked',    span: 200 },

  /* 04 — Not a problem (held: same layout, copy swap) */
  { id: 'not-a-problem',layout: 'overcome-stack', copyId: 'not-a-problem', span: 200 },

  /* 05 — Messenger (transition: stack fades, type-only beat) */
  { id: 'messenger',    layout: 'empty',          copyId: 'messenger',     span: 200 },

  /* 08 — Signal (transition: diagram fades in on right) */
  { id: 'signal',       layout: 'signal-diagram', copyId: 'signal',        span: 250 },

  /* 09 — Tangle (transition: signal funnel fades, tangle knots in) */
  { id: 'tangle',       layout: 'tangle-diagram', copyId: 'tangle',        span: 250 },

  /* 10 — Portal (transition: tangle fades, spiral draws inward) */
  { id: 'portal',       layout: 'portal-diagram', copyId: 'portal',        span: 250 },
]

export const TOTAL_VH = BEATS.reduce((sum, b) => sum + b.span, 0)
