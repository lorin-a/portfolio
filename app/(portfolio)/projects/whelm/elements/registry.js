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

import gsap from 'gsap'

import PlaceholderBox from './PlaceholderBox'
import Wordmark from './Wordmark'
import OvercomeStack from './OvercomeStack'
import SignalDiagram from './SignalDiagram'
import TangleDiagram from './TangleDiagram'
import PortalDiagram from './PortalDiagram'
import HeroFlourish from './HeroFlourish'
import ScrollCue from './ScrollCue'

/* Entrance contract: (node, { duration }) → paused GSAP timeline.
   Side-effect any initial-state gsap.set calls synchronously inside
   the function body so the element is in its hidden start state
   before the orchestrator plays the returned timeline. */

/* OvercomeStack — line 1 fades in, then lines 2 & 3 distribute down
   from behind line 1 with a slight stagger. Storyboard: "top one fades
   in and then middle and bottom overhwelms distribute down from the
   top as if they emerged from behind it and slotted into place." */
function overcomeStackEntrance(node, { duration = 1.2 } = {}) {
  const lines = node.querySelectorAll('[data-tier]')
  if (lines.length < 3) return null

  /* Snap initial state: line 1 hidden, lines 2 & 3 stacked behind line 1. */
  gsap.set(lines, { autoAlpha: 0 })
  gsap.set(lines[1], { y: '-100%' })
  gsap.set(lines[2], { y: '-200%' })

  const slideDur = duration * 0.45
  const tl = gsap.timeline({ paused: true })
  tl.to(lines[0], {
    autoAlpha: 1,
    duration: duration * 0.30,
    ease: 'power2.out',
  })
  tl.to(lines[1], {
    y: 0,
    autoAlpha: 1,
    duration: slideDur,
    ease: 'power3.out',
  }, '+=0.15')
  tl.to(lines[2], {
    y: 0,
    autoAlpha: 1,
    duration: slideDur,
    ease: 'power3.out',
  }, '<0.18')

  return tl
}

/* Each entry: { render } at minimum; optional `entrance(node, ctx)`
   returns a GSAP timeline fired when the element transitions into a
   beat (state: 'incoming') for composite element animations like
   DrawSVG diagrams or staged stack reveals. */
const placeholder = (label, opts = {}) => ({
  render: () => <PlaceholderBox label={label} {...opts} />,
})

export const ELEMENT_REGISTRY = {
  wordmark:         { render: Wordmark },
  'hero-flourish':  { render: HeroFlourish },
  'scroll-cue':     { render: ScrollCue },
  'overcome-stack': { render: OvercomeStack, entrance: overcomeStackEntrance },
  'signal-diagram': { render: SignalDiagram },
  'tangle-diagram': { render: TangleDiagram },
  'portal-diagram': { render: PortalDiagram },
  wordplay:         placeholder('Overcome → whelm', { kind: 'wordplay' }),
  'manifesto-panel':placeholder('Manifesto panel', { kind: 'panel' }),
  'persona-venn':   placeholder('Persona Venn', { kind: 'venn' }),
  'typology-trio':  placeholder('Typology trio', { kind: 'trio' }),
  'roots-grid':     placeholder('Roots grid', { kind: 'grid' }),
  'phase-journey':  placeholder('Phase journey', { kind: 'journey' }),
}
