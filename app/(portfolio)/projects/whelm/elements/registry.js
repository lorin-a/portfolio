/**
 * Element registry — id → renderer + optional entrance timeline.
 *
 * Phase 0: every renderer is a placeholder block so the engine is
 * exercisable end-to-end. Phase 1 swaps each placeholder for the real
 * inline-SVG composite (or video/type element) per the Figma slides.
 *
 * Renderer contract:
 *   - Pure presentation. No internal positioning — the .element wrapper
 *     handles position via CSS custom props driven by the orchestrator.
 *   - Centered around its own visual anchor (the wrapper applies
 *     translate(-50%, -50%) so renderer content should be self-centering).
 *   - Static by default. If the element needs an entrance timeline
 *     (DrawSVG, stagger), expose `entrance(node, { duration })` which
 *     returns a GSAP timeline; orchestrator fires it on `incoming` state.
 *
 * Attribute contract:
 *   - When a beat sets `attrs[elementId] = { 'data-foo': 'bar' }`, the
 *     orchestrator writes those attributes onto the wrapper. Renderers
 *     should style off `[data-foo="bar"]` via CSS for held-beat morphs
 *     (e.g., persona-venn's active-circle highlight, agenda's active
 *     chapter row).
 */

import PlaceholderBox from './PlaceholderBox'

/* All Phase 0 renderers are PlaceholderBox with a label. The label
   distinguishes them visually so we can confirm the orchestrator is
   targeting the right ids. */
const placeholder = (label, opts = {}) => ({
  render: () => <PlaceholderBox label={label} {...opts} />,
})

export const ELEMENT_REGISTRY = {
  wordmark:         placeholder('whelm.', { kind: 'wordmark' }),
  agenda:           placeholder('Agenda', { kind: 'agenda' }),
  'overcome-stack': placeholder('Overwhelm × 3', { kind: 'stack' }),
  'signal-diagram': placeholder('Signal', { kind: 'diagram' }),
  'tangle-diagram': placeholder('Tangle', { kind: 'diagram' }),
  'portal-diagram': placeholder('Portal', { kind: 'diagram' }),
  wordplay:         placeholder('Overcome → whelm', { kind: 'wordplay' }),
  'manifesto-panel':placeholder('Manifesto panel', { kind: 'panel' }),
  'persona-venn':   placeholder('Persona Venn', { kind: 'venn' }),
  'typology-trio':  placeholder('Typology trio', { kind: 'trio' }),
  'roots-grid':     placeholder('Roots grid', { kind: 'grid' }),
  'phase-journey':  placeholder('Phase journey', { kind: 'journey' }),
}
