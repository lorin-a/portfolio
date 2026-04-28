# Whelm Case Study — Scrollytelling Build

**Branch:** `whelm-scrollytelling` (created 2026-04-28 from `case-study-template-draft`)
**Route:** `app/(portfolio)/projects/whelm/` (bespoke, NOT the `[slug]` template)
**Started:** 2026-04-28
**Status:** Planning — no code yet

## What this is

A scrollytelling case study for the Whelm project (the emotion-sorting game Lorin invented). Adapted from a 50-frame Figma slide deck (file `uR0ROcu5koEA9VXoWNfVW8`) into a single immersive page.

The slides already do scrollytelling work — they share a visual language (colored dots on cream, with one pale lavender dot acting as "you") that transforms across the deck. Scroll continuity replaces slide cuts.

## Vision

A single pinned canvas holds two persistent character groups for the entire narrative spine:

- **The cast** — ~20 colored dots representing emotions/aspects/perspectives. Reorganize across the page via Flip + direct tweens. Never destroyed, never re-instantiated.
- **"You"** — one pale lavender dot, separate layer. Always present. Position and scale change with scroll. Starts small at the edge → orbits → drifts toward center → lands at center in Phase 1 → becomes the witness in the ecosystem → becomes the ringed self at the end.

The piece is the story of one dot finding itself.

Total scroll length: **~2250vh, ~5 minutes** of reading.

## Architecture

```
app/(portfolio)/projects/whelm/
├── page.js                    # Server component, metadata
├── WhelmStory.client.jsx      # Pinned canvas + scroll orchestrator
├── beats.js                   # Beat definitions: layouts, copy, color
├── DotsCanvas.jsx             # <svg> with #cast + #you groups
├── layouts.js                 # xy coords per dot id, per layout state
├── components/
│   ├── BeatCopy.jsx           # Headline + body, fade/wipe in/out
│   ├── BulletList.jsx         # Static reading sections (un-pinned)
│   └── HandDrawn.jsx          # SVG paths for arrows, scribbles, underlines
└── whelm.module.css
```

**Key decisions:**

- One `<svg>` viewport for the entire dot system. ViewBox is animatable for camera moves.
- Each dot has a stable ID and color. Layouts are arrays of `{id, x, y, scale}` keyed by layout name.
- Flip plugin handles layout transitions. DrawSVG handles connecting lines + hand-drawn elements.
- Background color shifts (cream → blue → cream) mark act boundaries. `gsap.to('body', { backgroundColor })` scrubbed.
- Bullet/reading sections are NOT pinned — the canvas releases, content flows naturally, then the canvas re-pins for the next act.
- All copy preserves Lorin's italics (`<em>`) and bolds. Type carries the emphasis; no over-animation.

## Scroll-beat map (compressed to 5 minutes)

| Act | Beats | vh | Notes |
|-----|-------|-----|-----|
| **0 — Open** | Lavender dot alone on cream, holds before any text | 150 | Earn attention. Not in slides — added for scroll. |
| **I — Thought spiral** | thought (1 dot) → empathy (3 dots) → perspectives (4 dots) | 250 | Each beat shows headline + quote together, not staged. Lavender dot enters during this act, far edge, idle micro-float. |
| **II — Distance & avoidance** | distance → cluster (Flip into blob) → disassociation → "your truth" | 300 | Lavender dot establishes itself as "you." Three text columns fade L→R. |
| **III — Every angle** | cluster → ring (Flip) → tangled connecting lines (DrawSVG) → "But your own." | 350 | Cut: scribble overlay, "Maybe just like this..?" slide. |
| **IV — Therapy & mom** | ring → blue dot ("therapy") → yellow dot ("mom") + arrow → cluster → "invented a game" | 150 | Tight. Typography carries weight, not duration. |
| **V — Phase 1** | bg → blue → cream / lavender dot centers / "PHASE 1" small persistent label / 6-bullet howto (un-pinned reading) / "organizing… No Pressure." (full ring) | 300 | Cut: full-screen Phase title card, Hot Tip beat. |
| **VI — Phase 2 → Ecosystem (CLIMAX)** | "PHASE 2" label / 6-bullet howto / "Feel how there is more space?" (Flip ring → scattered) / "what about me?" / **universes** (each dot grows a mini-ring of clones) / **ecosystem** (viewBox zooms out, lavender at center connecting to all universes) | 600 | Protect this. The longest scrubs in the piece live here. |
| **VII — Resolution** | Rinse Cycle Repeat (chaos → resolved-self, 2 morphs not 4) / **weaving** (dot → strip → woven) / Tom Anderberg quote on blue / Therapy Takeaways (un-pinned reading) | 300 | Cut: 4-stage rinse cycle, "THANK YOU" ring. |

**Act totals:** 150 + 250 + 300 + 350 + 150 + 300 + 600 + 300 = **2400vh ≈ 5 minutes** at comfortable scrub pace.

## Dot → Weaving morph (climax of Act VII)

Three phases on a single scrub trigger. Each colored dot becomes a colored strip — identity preserved through transformation.

1. **Dots → strips:** `scaleY: 8, scaleX: 0.4`, staggered `from: 'center'`. Strips of varying length, still scattered.
2. **Strips → bundled column:** repositioned into a tight horizontal arrangement at canvas center, equalized in length. The "everything you've been carrying" moment.
3. **Weave:** every other strip rotates 90° and slides horizontally across, interleaving with the verticals via SVG `<clipPath>` alternating over/under regions. Basket-weave overlap. Each strip visible passing under and over neighbors.

**Texture:** SVG `<filter>` with `feTurbulence` + `feDisplacementMap` for soft painterly edges. Fallback: per-strip vertical gradient (color → desaturated self) for paint-stroke feel without filter cost.

**Color blending after settle:** slow `gsap.to()` nudges each strip's fill ~10% toward the average of its over/under neighbors. Subtle. Reads as colors informing each other without losing themselves.

**Reduced motion:** skip the morph. Render a static SVG of the final woven state.

## Decisions (resolved 2026-04-28)

- [x] **Woven artwork sourcing.** Path **B is default** (dot → weave morph carries metaphor alone). **Lorin and Claude will iterate together on the morph design** — the woven moment is collaborative, not a pre-made asset.
- [x] **Branch strategy.** New branch `whelm-scrollytelling`, created from `case-study-template-draft`.
- [x] **Phase title cards.** Small persistent corner label, NOT full-screen.
- [x] **Bullet sections un-pinned.** Bullets break the pin, flow naturally, then canvas re-pins for next act.
- [x] **Cut list approved:** scribble overlay, "Maybe just like this..?", Hot Tip, full Phase title cards, 4-stage Rinse Cycle, THANK YOU ring.

## Open

- [ ] **Dot count + hex extraction.** Figma flattens the ring/cluster groups to raster on `get_design_context`. Need a different extraction approach when building `layouts.js`:
  - Option A: call `get_design_context` on individual vector nodes (e.g. `255:1204`, `255:1205`, …) — slow but exact.
  - Option B: eyedrop from a high-res screenshot of the ring slide. Faster, slightly less exact.
  - Decision deferred until build-time.

## Asset checklist

- [ ] Dot colors extracted from Figma (20 hex values + 1 lavender). Pull from any frame's `get_design_context`.
- [ ] Hand-drawn arrows + underline SVG paths (extract from Figma frames or redraw).
- [ ] Tom Anderberg quote — confirm exact wording: "There's a lot to everything."
- [ ] Therapy Takeaways copy — confirmed in Figma.
- [ ] Open question (A vs B above) — woven artwork or no.

## Cut from scope (don't add back without discussion)

- Slide-by-slide quote staging (e.g., headline appears, then quote appears in separate beat) — collapse to one beat per movement.
- Full-screen Phase title cards.
- "Maybe just like this..?" hand-drawn-circles slide — muddies the metaphor.
- "Hot Tip: Listen really carefully…" — fold the Shrek quote into howto bullets if kept at all.
- 4-stage "Rinse. Cycle. Repeat." — compress to 2 morphs.
- "THANK YOU" ring closer — let the Therapy Takeaways or quote be the ending.

## Status log

- **2026-04-28** — Plan drafted. Vision and 5-minute beat map agreed. Woven morph designed (default path B, collaborative iteration). Branch `whelm-scrollytelling` created from `case-study-template-draft`. All decisions resolved except dot color extraction (deferred to build-time). No code yet — ready to start building when Lorin gives the go.
