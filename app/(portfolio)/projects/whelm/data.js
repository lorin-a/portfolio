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
  /* 01 — Hero. Wordmark center; cursive flourish layers above the bg
     (oversized to extend past stage edges), wipes on left-to-right
     during intro. Scroll cue at the bottom. */
  hero: {
    'hero-flourish': { opacity: 1 },
    wordmark:        { opacity: 1 },
    'scroll-cue':    { opacity: 1 },
  },

  /* Section 1 — Overlooked. OvercomeStack centered. */
  'overcome-stack': {
    'overcome-stack': { opacity: 1 },
  },

  /* Section 2 — What-If beats: copy-only, no element on stage. */
  empty: {},

  /* Section 3 — diagrams full-bleed; copy lives on top. */
  'signal-diagram': {
    'signal-diagram': { opacity: 1 },
  },
  'tangle-diagram': {
    'tangle-diagram': { opacity: 1 },
  },
  'portal-diagram': {
    'portal-diagram': { opacity: 1 },
  },
}

export const INITIAL_LAYOUT = 'hero'
export const INITIAL_COPY = 'hero'

/* Agenda — drives the sticky top nav that appears once the user scrolls
   past the hero. Order is the case-study reading order; ids match the
   `section` field on BEATS for active-state detection. */
export const SECTIONS = [
  { id: 'gap',       label: 'The Gap' },
  { id: 'need',      label: 'The Lenses' },
  { id: 'audience',  label: 'The Audience' },
  { id: 'framework', label: 'The Framework' },
  { id: 'research',  label: 'The Research' },
  { id: 'design',    label: 'The Design' },
]

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
