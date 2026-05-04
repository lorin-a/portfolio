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
import Wordmark from './Wordmark'
import OvercomeStack from './OvercomeStack'

/* Phase 1+: real renderers replace placeholders one element at a time.
   Each entry: { render } at minimum; optional `entrance(node, ctx)`
   returns a GSAP timeline fired when the element transitions into a
   beat (state: 'incoming') for composite element animations like
   DrawSVG diagrams. */
const placeholder = (label, opts = {}) => ({
  render: () => <PlaceholderBox label={label} {...opts} />,
})

export const ELEMENT_REGISTRY = {
  wordmark:         { render: Wordmark },
  agenda:           placeholder('Agenda', { kind: 'agenda' }),
  'overcome-stack': { render: OvercomeStack },
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
