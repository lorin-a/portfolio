# Groundswell — Cinematic Scrollytelling Build

**Status:** Plan drafted. Awaiting Lorin's go-ahead before branch + code.
**Direction:** Cinematic scrollytelling intro prepended to existing project page.
**Reference register:** Visual Cinnamon (data) + Virya (atmosphere). NOT NYT Snow Fall.
**Last updated:** 2026-04-29

---

## The decision in one paragraph

The existing `/projects/groundswell` page already does the reference work — components, prototype, ecosystem map, outcomes, credits. What it lacks is voice, narrative pull, and an authored point of view. The fix is to prepend a 5–6 minute cinematic scrollytelling intro above it. One URL. One page. Three acts: cinematic experience, meta strip bridge, existing reference content. Density rises and choreography drops as the reader scrolls — the funnel pattern.

---

## Why this shape (the funnel)

```
ACT 1 — Cinematic draw-in           (~60–90 sec)
Scenes 1–4: visual opening, thesis, UPMC quote, gs-hero, rolodex.
Pure emotional pull. Reader doesn't yet know they're in a portfolio.

ACT 2 — Editorial middle             (~3–5 min)
Scenes 5–8: shape of the work, listening, cup overflow + 4 pillars,
moral pivot. Authored prose. Density rising.

ACT 3 — Reference + artifacts        (skim-friendly)
MetaStrip + existing GroundswellContent: prototype showcase,
ecosystem map, data layer, outcomes, news, credits, live-site CTA.
Modular content. Skim mode.
```

A 15-second skimmer hits the pull quote and lands in the meta strip. A 7-minute reader does the full arc. Both are served by the same page.

---

## Architecture

### Route

- **During build:** `/projects/groundswell/preview` (new sub-route on the feature branch). Existing `/projects/groundswell` stays untouched on main and on the branch.
- **At launch:** the preview route's content moves to `/projects/groundswell`; the existing `GroundswellContent.js` continues to render as Act 3 of that page.

### Branch

- Branch name: `groundswell-cinematic`
- Base: `main`

### File structure (proposed)

```
app/(portfolio)/projects/groundswell/
├── page.js                          (existing, untouched)
└── preview/
    └── page.js                      (NEW — mounts cinematic + meta + content)

components/CaseStudy/Cinematic/
├── SceneOpening.js                  (Scene 1 — Blue Garden watercolor)
├── SceneThesis.js                   (Scene 2 — thesis + UPMC quote)
├── SceneHeldImage.js                (Scene 3 — gs-hero full bleed)
├── SceneRolodex.js                  (Scene 4 — voice fragments)
├── SceneShapeOfWork.js              (Scene 5 — atmospheric prose)
├── SceneListening.js                (Scene 6 — workshops)
├── SceneCupOverflow.js              (Scene 7 — 4 pillars + factors)
├── ScenePivot.js                    (Scene 8 — moral pivot / kicker)
└── *.module.css                     (per scene)

components/CaseStudy/MetaStrip.js    (NEW — bridge moment)
components/CaseStudy/MetaStrip.module.css

components/Groundswell/GroundswellContent.js  (existing — light copy pass)
```

### Why per-scene components

ScrollTrigger isolation is cleaner with discrete components. Each scene can be iterated on without touching neighbors. Animation contexts stay scoped.

---

## Phases

### Phase 0 — Setup
- Create branch `groundswell-cinematic`
- Create `/projects/groundswell/preview/page.js` route
- Mount placeholder `<CinematicIntro />`, `<MetaStrip />`, and existing `<GroundswellContent />` in order to confirm scaffolding works

### Phase 1 — De-risk Blue Garden primitive (HALF DAY SPIKE)
- Build the watercolor mask reveal as a standalone component on the preview route
- Confirm the technique works (likely SVG mask + scroll-driven reveal, or canvas)
- Source asset from `groundswell-digital-admin-wall` if available; fall back to a captured still + animated mask if not
- **Gate:** if this primitive eats more than one full day, redesign Scene 1 before continuing

### Phase 2 — Scene 1 (Visual Opening)
- Black background → Blue Garden reveal → image rises → purple field → logo anchor → scroll arrow
- Establishes the motion grammar for the rest of the cinematic

### Phase 3 — Scenes 2–4 (Thesis + Quote + Image + Rolodex)
- SceneThesis: thesis sentence with delicate text reveal (per-character duration scaling, `power1.inOut`, clip-path wipe with negative em insets)
- UPMC pull quote in italics
- SceneHeldImage: gs-hero full bleed crossfade
- SceneRolodex: vertical scroll through six voice fragments on `#f8ebe5` / `#554d65`

### Phase 4 — Scene 5 (Shape of the work)
- **Pending Lorin's writing:** four italic stand-ins still need her voice (see Pending Writing below)
- Atmospheric scroll, held color field, type-led, generous whitespace
- Display moment: "Who is drawn to this work?" alone on the field

### Phase 5 — Scene 6 (Listening)
- **Pending Lorin's writing:** Listening prose
- Workshop images (need asset audit — see below)
- Maintain the same atmospheric register as Scene 5

### Phase 6 — Scene 7 (Cup overflow + 4 pillars)
- Four pillars: Recognition, Environment, Culture, System
- Cup metaphor: visual cup at center fills as factors accumulate, then spills
- Pillars named with weight; 16 factors live beneath as evidence
- After spill: one held beat of stillness before transition

### Phase 7 — Scene 8 (Pivot / Kicker)
- Moral pivot — "this project is for them" register
- **Pending Lorin's writing:** the pivot sentence in her voice (currently italic stand-in)
- Closes the cinematic

### Phase 8 — MetaStrip
- Role · Duration · Status · Team · Client · Live Site
- Three outcome stat cards
- Acts as the visual transition from cinematic to reference register

### Phase 9 — Integration
- Mount all cinematic scenes + meta strip above existing GroundswellContent on the preview route
- Test the full scroll experience end-to-end

### Phase 10 — Copy pass on existing GroundswellContent
- Audit for AI vocab, negative parallelism, dead transitions, banned analogies
- Surface Lorin's voice where the existing prose reads generic
- No structural changes — copy only

### Phase 11 — QA
- Accessibility: axe, reduced-motion content visibility, keyboard navigation, screen reader announcements for animated reveals
- Reduced-motion overrides per component (content visible, animation disabled)
- Lighthouse perf
- Mobile + cross-browser (Safari iOS, Firefox, Chrome)
- Visual regression against staging

### Phase 12 — Launch
- Move preview content to `/projects/groundswell` route
- Retire `/projects/groundswell/preview`
- Update memory + STATUS doc

---

## Open decisions (pending Lorin)

1. **Meta strip placement.** Two options:
   - Top-of-page only (one quiet line under cinematic header — *"Groundswell · UPMC Magee-Womens · 2024–2025 · Lead designer · 7 min read"*)
   - After Scene 8 only (full panel as bridge into Act 3)
   - Both (quiet line at top + full panel after Scene 8) — current instinct
2. **Closing kicker placement.** Does the moral pivot sentence end Act 2, or does a separate one-line kicker live alone on cream after it?
3. **Scene 9 prose.** Existing `GroundswellContent.js` already opens conceptually with Scene 9 content. Likely no new prose needed — confirm during Phase 10 copy pass.
4. **Live-site link target.** `/groundswell` (standalone stakeholder site) or external URL?

---

## Pending writing (Lorin's voice)

Stand-ins from the current draft that need Lorin to replace:

- **Scene 5 — "never lets go"** replacement for the corporate "remains top of mind" idiom
- **Scene 5 — generational wisdom sentences** (1–2 sentences naming what these workers carry)
- **Scene 5 — superhuman sentence** (one image of what endurance actually looks like)
- **Scene 5 — pivot paragraph** (FOR the wisdom keepers, FROM their pain, designed to make change from within — 2–3 sentences, the moral center)
- **Scene 6** — Listening prose (full)
- **Scene 7** — copy framing the four pillars
- **Scene 8** — thesis and any closing kicker line
- **Existing page** — AI-tell pass surfacing Lorin's voice (Phase 10)

---

## Asset audit (needed before Phase 1)

| Asset | Status | Notes |
|---|---|---|
| Blue Garden watercolor reveal source | UNKNOWN | Confirm in `groundswell-digital-admin-wall` repo. If unavailable, capture still + design mask |
| gs-hero | EXISTS | Cloudinary, used today |
| Workshop photographs (Scene 6) | UNKNOWN | Confirm Cloudinary catalog |
| Cup overflow visual | NOT BUILT | SVG illustration or animated metaphor — needs design pass |
| Four pillars iconography | NOT BUILT | May not be needed if typography carries it |
| gs-walkthrough video | UNKNOWN | Confirm Cloudinary catalog |
| Existing components, ecosystem map, etc. | EXISTS | Already on the live page |

---

## Risks

- **Scope creep on length.** Current writing is making the piece longer. The target is 5–6 minutes for Acts 1+2. If Lorin's prose runs longer when locked, cuts are needed before Phase 2.
- **Asset gaps.** The Blue Garden mask and cup overflow are not yet captured/designed. Both are blocking for their respective scenes.
- **Register break risk.** The transition from Scene 8 cinematic into the existing V1-styled `GroundswellContent` may feel jarring. Phase 10 copy pass mitigates voice mismatch but not visual register. If the visual break is significant at integration, a light V2 styling pass on the existing component may be needed (out of plan scope; flag as risk).
- **One-week target.** Realistic build is one week with locked prose entering Phase 2. If prose isn't locked by Phase 2, slippage compounds.
- **Reduced-motion completeness.** Every scene needs explicit reduced-motion overrides. Easy to miss; baked into Phase 11 but should be designed in per-scene.

---

## What stays frozen

- `app/(portfolio)/projects/groundswell/page.js` — until Phase 12 launch swap
- `components/Groundswell/GroundswellContent.js` — except the Phase 10 copy pass
- `app/(standalone)/groundswell/` — entirely
- `styles/project.module.css` — until V2 migration is scoped separately

---

## Reference

- **Reference taste:** `feedback_scrollytelling_references.md` (Visual Cinnamon, Virya, Savor)
- **Editorial scrollytelling craft baseline:** `feedback_editorial_scrollytelling.md` (ambient breath, clip-path wipes, display type)
- **Motion grammar:** `feedback_scrollytelling_motion.md` (match-cut continuity, three-phase pacing, atomized beats)
- **GSAP patterns:** `reference_gsap_bible.md`
- **Voice rules:** global `~/.claude/CLAUDE.md` Copy Style section (negative parallelism ban, AI vocab list, em dash discipline)

---

## Next session opens here

1. Confirm plan with Lorin. Adjust phases if needed.
2. Decide meta strip placement question.
3. Asset audit for Blue Garden source + workshop images.
4. Lorin replaces Scene 5 italic stand-ins in her voice.
5. Branch + Phase 0 setup.
