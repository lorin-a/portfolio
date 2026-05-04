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
 * Section structure (per Lorin's storyboard 2026-05-04):
 *   - Hero (full-bleed, sidebar hidden)
 *   - Section 1 GAP — Overlooked
 *   - Section 2 NEED — three What-Ifs (sequential, copy-only beats)
 *   - Section 3 NEED — three Overwhelm-Is statements (Signal/Tangle/Portal)
 *   - Section 4 (future) — Whelm reveal + product, full-bleed
 */

/* Element catalog: every id that could appear in any layout. The
   Stage iterates this list once and mounts a wrapper per id; the
   orchestrator only animates positioning + opacity afterward. */
export const ELEMENT_IDS = [
  'wordmark',
  'hero-flourish',
  'scroll-cue',
  'overcome-stack',
  'signal-diagram',
  'tangle-diagram',
  'portal-diagram',
  'wordplay',
  'manifesto-panel',
  'persona-rings',
  'typology-trio',
  'roots-grid',
  'phase-journey',
]

export const LAYOUTS = {
  /* 01 — Hero. Wordmark center-stage, flourish drawn alongside,
     scroll cue at the bottom-center to invite the user onward. */
  hero: {
    wordmark:        { x: 50, y: 48, scale: 1, opacity: 1 },
    'hero-flourish': { x: 50, y: 64, scale: 1, opacity: 1 },
    'scroll-cue':    { x: 50, y: 92, scale: 1, opacity: 1 },
  },

  /* 03 — Overlooked: layered "Overwhelm" stack on the right; copy
     fills the left half with the "is overlooked" punchline below. */
  'overcome-stack': {
    'overcome-stack': { x: 65, y: 50, scale: 1, opacity: 1 },
  },

  /* What-If beats (Section 2): no element on stage, copy-only. */
  empty: {},

  /* Section 3 — diagrams on the right, copy on the left half. */
  'signal-diagram': {
    'signal-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },
  'tangle-diagram': {
    'tangle-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },
  'portal-diagram': {
    'portal-diagram': { x: 70, y: 50, scale: 1, opacity: 1 },
  },
}

export const INITIAL_LAYOUT = 'hero'
export const INITIAL_COPY = 'hero'

export const BEATS = [
  /* Each beat: { id, layout, copyId, span, section, fullBleed?, attrs? }
     - section: drives the sidebar's active highlight via data-active-section
     - fullBleed: when true, sidebar fades out for that beat (hero, future Whelm reveal)
     - attrs: optional element-id → attribute dict, applied at beat start */

  /* Section 1 — GAP. */
  { id: 'overlooked',    layout: 'overcome-stack', copyId: 'overlooked',    span: 250, section: 'gap'  },

  /* Section 2 — NEED. Three What-Ifs, each a standalone copy beat. */
  { id: 'not-a-problem', layout: 'empty',          copyId: 'not-a-problem', span: 200, section: 'need' },
  { id: 'messenger',     layout: 'empty',          copyId: 'messenger',     span: 200, section: 'need' },
  { id: 'invitation',    layout: 'empty',          copyId: 'invitation',    span: 200, section: 'need' },

  /* Section 3 — NEED continues. Overwhelm-Is statements with diagrams.
     Per storyboard: copy reveals first, element animates in last. */
  { id: 'signal',        layout: 'signal-diagram', copyId: 'signal',        span: 280, section: 'need', elementOrder: 'after-copy' },
  { id: 'tangle',        layout: 'tangle-diagram', copyId: 'tangle',        span: 280, section: 'need', elementOrder: 'after-copy' },
  { id: 'portal',        layout: 'portal-diagram', copyId: 'portal',        span: 280, section: 'need', elementOrder: 'after-copy' },
]

export const TOTAL_VH = BEATS.reduce((sum, b) => sum + b.span, 0)
