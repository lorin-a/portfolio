/* Element registry — id → renderer for the three hero elements.
   The post-pivot architecture renders the rest of the case study
   directly (each section is its own component), so the registry
   is intentionally narrow: hero composition only. */

import HeroFlourish from './HeroFlourish'
import ScrollCue from './ScrollCue'
import Wordmark from './Wordmark'

export const ELEMENT_REGISTRY = {
  wordmark:        { render: Wordmark },
  'hero-flourish': { render: HeroFlourish },
  'scroll-cue':    { render: ScrollCue },
}
