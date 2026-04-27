# Project Status
### Last updated: 2026-04-26

This is the living status doc for the lorin.work portfolio redesign. Updated at the end of every working session.

---

## Current Phase

**Phase 2 — Case studies + about + playground.** Homepage shipped, awaiting feedback (99% done). Building case study template starting with a Lorin-focused Groundswell case study.

### Roadmap
1. ~~Codebase overhaul~~ done
2. ~~Finish dark homepage with project previews~~ shipped 2026-04-24
3. **Case study template + Groundswell case study** — in progress
4. Remaining case studies (BirthStory, SomeBuddy, Transition Design, GAP)
5. About page (V2 migration)
6. Playground (`/playground`) — ~15 entries from squarespace + new in-progress projects (Whelm, Vibe Code)

---

## Phase 2 — Case Studies (Active)

### Decisions locked
- **Groundswell case study** = Lorin-focused (her skills, design lens, case study questions answered). Standalone `/groundswell` stakeholder site stays untouched and gets linked *out* to from the case study's Shape phase as the deepest evidence artifact.
- **Architecture:** shared phase components in `components/CaseStudy/` + per-project files at `app/(portfolio)/projects/[slug]/page.js` that compose them. Per-project bending allowed.
- **Anatomy:** Hero (light pin) → Context → Sense → Weave → Shape → Reflection → Credits. Same internal rhythm in each phase: setup question → evidence → takeaway in first-person voice.
- **Mark baton:** active phase mark fades out as next phase's mark draws on, coordinated by ScrollTrigger ranges. Simplify to no-baton if it feels too busy.
- **Hero pin:** ~0.4 viewport. Cinematic nod to homepage without trapping the reader.
- **Playground concept:** evolve `components/_archive/BuildingNow/BuildingNow.js` (cards with autoplay video previews + click-to-overlay) into a "floating" asymmetric layout with subtle idle drift. ~15 entries needs lightweight filtering — by phase or type.

### Components built
- [x] `components/CaseStudy/Hero.js` + CSS — title via SplitText mask, tagline/meta soft-appear, asset scale-up, light pin via ScrollTrigger
- [x] `components/CaseStudy/Phase.js` + CSS — mark draw-on, SplitText question, evidence batch reveal, takeaway with phase-tinted left border, baton fade-out
- [x] `components/CaseStudy/Context.js` + CSS — first-person setup paragraph
- [x] `components/CaseStudy/Reflection.js` + CSS — first-person close
- [x] `components/CaseStudy/Credits.js` + CSS — collaborators + next-project link (no animation)
- [x] `components/CaseStudy/Artifact.js` + CSS — image or video evidence with caption. Images now open `Lightbox` on click for closer inspection (UX/UI audit fix). Videos play inline.
- [x] `components/CaseStudy/Quote.js` + CSS — pull-quote with source + context attribution, picks up `--phase-tint`
- [x] `components/CaseStudy/DataNote.js` + CSS — stat + unit + note, large display number in phase tint
- [x] `components/CaseStudy/Insight.js` + CSS — labeled thesis-level reframe (e.g., The Void, the CTB email revelation), distinct from Quote which is sourced from a person
- [x] `components/CaseStudy/Framework.js` + CSS — labeled list of named items + context (e.g., the four dimensions of well-being)
- [x] `components/CaseStudy/LiveLink.js` + CSS — destination card for external evidence (live site, paper, video, Figma)
- [x] `components/CaseStudy/PhaseBeat.js` + CSS — sub-section divider inside a Phase (e.g., "Synthesis" beat inside Research). Solves synthesis-overshadow without restructuring the framework.
- [x] `components/CaseStudy/PhaseNav.js` + CSS — floating right-edge dot navigation. Tracks active phase via IntersectionObserver, click-jumps between phases, hidden on mobile.
- [x] Phase number treatment — `<Phase number="01" label="Research" />` renders a large faded numeral + label in the sticky mark column. Strengthens phase boundaries.
- [x] Strongest contribution elevated — bumped to `--text-body-large` italic in a tinted, bordered block. Breadth+depth signal louder.
- [x] Reflection number plate — `04 / Reflection` mirrors the phase numbering pattern in the spacer column.
- [x] Credits next-project elevated — full-width band with clamp(28px, 4vw, 56px) italic title, padding-grow hover.
- [x] `components/CaseStudy/index.js` — barrel export (Hero, Context, Phase, PhaseBeat, PhaseNav, Reflection, Credits, Artifact, Quote, DataNote, Insight, Framework, LiveLink)

### Components built (continued)
- [x] `components/Groundswell/GroundswellCaseStudy.js` — composes the CaseStudy primitives with Groundswell content. Voice and quotes seeded from `groundswell-case-study` branch's `docs/groundswell.md` (verbatim where Lorin wrote it; flagged as TODO drafts where first-person paragraphs need rewriting)
- [x] `app/(portfolio)/projects/groundswell/preview/page.js` — preview route at `/projects/groundswell/preview` (no-index, not in nav). V1 stays at `/projects/groundswell` until content-complete and routes swap

### Content still needed (Lorin to write)
- [ ] **Context paragraph** — 1–2 sentences, first-person. Why this work mattered to you (not what the project is)
- [ ] **Weave paragraph** — short, the grief→restoration pivot and how the three insights led to "create space for what was already there"
- [ ] **Shape paragraph** — short, your role through the 10-week production sprint (project coordination, copywriting, donor outreach, language work). First-person seed exists verbatim in groundswell.md
- [ ] **Reflection answers (all three)** — drafts in `GroundswellCaseStudy.js` are seeded from themes but not Lorin's actual words. Rewrite in voice

### Front-end engineering pass
- [x] Reflection prompts converted from `<dl><dt><dd>` to `<section><h3><p>` — heading-nav now surfaces each prompt
- [x] `'use client'` removed from `GroundswellCaseStudy.js` — composition is server-rendered, only Hero/Phase/Context/Reflection/PhaseNav/Artifact hydrate as client islands. Bundle improvement.
- [x] `<Insight>` switched from `<aside>` to `<div role="note" aria-label={label}>` — landmark gets a meaningful name
- [x] External `<LiveLink>` adds `<span className="visually-hidden">(opens in new tab)</span>` for screen readers (WCAG 2.4.4)
- [x] `.visually-hidden` utility added to `globals.css` (standard sr-only pattern)
- [x] `<Framework items={[{name, description}]}>` — renamed `context` → `description` to disambiguate from `<Quote context>`. Updated Groundswell call site.
- [x] `<Artifact type="video">` pauses when off-screen via IntersectionObserver — battery + CPU savings
- [x] Hero asset `sizes` refined to `(max-width: 900px) 100vw, (max-width: 1400px) 90vw, 1240px`
- [x] `<Phase>` dev-only warning when `kind` isn't in MARKS map — catches typos in future case studies

### Motion infrastructure
- [x] `lib/gsap.js` — added `CustomEase` plugin, registered `'bounce'` ease (matches `--ease-bounce` CSS token), exported `EASE` constant for centralized motion vocabulary
- [x] Hero pin uses `pinType:'fixed'` on mobile (≤768px) to avoid iOS Safari URL-bar drift
- [x] Phase: SplitText reverts in cleanup (was leaking spans), uses `EASE` constants throughout
- [x] Mark baton trigger overlap — phase entry fires at `top 80%` (was `top 70%`) so next mark begins drawing while previous is still mid-fade; no empty-rail moment between phases
- [x] PhaseBeat joins evidence batch reveal (added `data-evidence` + `visibility: hidden`)
- [x] PhaseNav fades in 1.2s after page load (after hero opener settles)
- [x] PhaseNav uses Lenis (`window.__lenis.scrollTo`) when available, falls back to native smooth scroll

### Components still needed
- [ ] Replace `app/(portfolio)/projects/groundswell/page.js` (V1, 1387 lines) with the new composition once content is locked
- [ ] Decide what happens to the V1 — archive `components/Groundswell/GroundswellContent.js` to `_archive/` after swap

### Decisions locked (continued)
- **Hero asset:** lead with polished product, not process. For Groundswell, reuse `gs-hero` corridor photo. Stack: polish (Hero) → process (phases) → polish (Reflection ties back to outcome). Process-led only works when polish is also visible.
- **Context paragraph:** below the Hero pin (after unpin). Hero delivers the visual hit; Context is the breath after — the human stakes that hook them into the first phase. Homepage already primed them, so don't re-establish what the project is, establish why it mattered.
- **Phase structure (chronological for Groundswell):** Research → Production → Study. Three phases match the doc's own framework (Phase 1 / Phase 2 / Phase 3) and the project's 15-month arc. Synthesis lives inside Research as a visually distinct sub-beat (Framework + Insight components carry the weight). Other case studies can use either chronological or methodology naming (Sense/Weave/Shape) — Phase component supports both. Marks reassigned: Research → SenseMark, Production → ShapeMark, Study → WeaveMark.
- **Strongest contribution per phase:** new `contribution` prop on `<Phase>` renders a small italic line under the takeaway with phase-tinted "Strongest contribution" label. Surfaces Lorin's distinctive individual moves without breaking the collective "we" voice of the body. Reusable across all case studies.
- **Eyebrow:** *Co-Design · Healthcare · Mental Health.* Three short chips that locate the work in market terms. Year stays in meta.
- **Reflection format:** three labeled prompts, each 1–2 sentences in Lorin's voice (not bullets, not essay):
  1. *What I'd do differently*
  2. *What surprised me*
  3. *What I'm taking forward*
  Locks the rhythm across all 5 case studies; voice does the differentiation inside the structure.

### Strategy notes
- Old `groundswell-case-study` branch (22 commits, 1400-line component) is reference only. Lorin: "I do not think it fits with our progress."
- Playground design pass deferred until case study template ships. Keep the floating/scattered idea in mind so design language stays consistent.

---

---

## What's Live (main branch, deployed to lorin.work)

- **Dark homepage** with scatter-gather hero, scroll-driven ProjectPreview carousels for all five projects, AboutSection (drop-down cards + Sense/Weave/Shape practice fan + bouncy mailto closer), Lenis smooth scroll
- Nav slimmed to "About" only (Work and Contact removed; ThemeToggle stashed but not imported)
- Footer: centered LinkedIn / Resume (disabled) / Email
- `/projects/groundswell` case study with a "Live Site" cell linking to `/groundswell`
- Standalone Groundswell stakeholder site (`/groundswell`, complete, do not touch)
- Theme: forced `data-theme="dark"` on `/` only via inline head script + PortfolioShell effect; case study and other portfolio routes stay light
- Last production commit: `c799323` — SomeBuddy + TD subheads, closer word-break and spacing
- **Tag `v1-final`** points at `7c015c2` (the pre-redesign main HEAD), so the V1 site is one `git checkout` away

---

## What's Unfinished

- About page (`/about`) — the nav still shows it as a disabled span
- Resume link in footer — disabled span
- BirthStory / SomeBuddy / Transition Design / Bridging the G.A.P. case study pages — all `comingSoon: true` on the homepage; the routes don't exist yet
- ThemeToggle still in `components/ThemeToggle/` but no longer imported anywhere (intentional stash)

---

## Reference Branches (do not delete)

### `groundswell-case-study` (22 commits ahead of main)
Rich case study exploration. Key reusable patterns:
- 6-phase typewriter hero with FLIP repositioning
- FrameworkShuffle with expandable dropdowns and mark draw-on
- ProjectSidebar (sticky scroll nav for case studies)
- ProjectNav (prev/next project navigation)
- Animated SVG marks (SenseMark, WeaveMark, ShapeMark)
- Hand-drawn underline SVGs (Vector 206, 207)
- Scroll-driven metadata highlight cycling
- Full GroundswellCaseStudy component (1400 lines, use as reference not directly)
- Ends with a revert of a homepage dark experiment

### `homepage-updates` (3 commits ahead of main)
Earlier hero concept: 3-beat typewriter with greeting, title, sentence, FLIP word transition. Superseded by `homepage-dark-redesign` but has the narrative typewriter pattern if we want to revisit.

### `gather-test-page` (1 commit ahead of main)
"Gathered" page: scattered object layout with 12 curated personal items (stones, crystals, books, tarot card). Light/dark toggle, hover tooltips, placeholder shapes, full accessibility. Cabinet of curiosities concept for potential about page use.

---

## Stashes (6 remaining)

| # | Branch | What's in it | Reuse potential |
|---|--------|-------------|-----------------|
| 0 | homepage-dark-redesign | Squiggle color tweak (darker ink) | Low — trivial change |
| 1 | groundswell-case-study | Streamlined 3-beat hero, pre-measured FLIP optimization, bigger typography | High — animation pattern |
| 2 | groundswell-case-study | Scroll-driven metadata highlight cycling (items highlight in sequence on scroll) | High — novel interaction |
| 3 | groundswell-case-study | Alternating dark/light case study sections + Groundswell hero/metadata refinements | Medium — visual pacing |
| 4 | groundswell-case-study | Hand-drawn underline SVGs (Vector 206, 207) + hero layout refactor | Medium — unique assets |
| 5 | groundswell-case-study | Typography sizing polish, dark-mode color fixes | Low — incremental |

---

## Untracked Files

| File | Status |
|------|--------|
| `Case Study Copy Inspiration.pdf` | Reference — decide to commit or gitignore |
| `PORTFOLIO_INTELLIGENCE_2026.md` | Being archived to docs/archive/ |
| 4 screenshots (March 5) | Reference images — decide to commit or delete |
| `public/marks/and.svg` | SVG asset — decide if active |
| `public/marks/new dots.svg` | SVG asset — decide if active |

---

## Pending Upgrades

### Next.js 14 → 16 (deferred)

**When to do it:** after V1 late-stage edits are finished, before V2 case study template is built. Single focused window, not mid-design. Whelm is on a different stack (CRA), zero impact there.

**Why:** Next 14 has known DoS/RSC vulnerabilities patched in 15.5.10+. Next 16 also brings Cache Components, useful for the content-driven case study template not yet built. React 19 changes will affect any new components, so V2 work benefits from being on the new foundation from the start.

**Risk for this codebase: low.** Verified 2026-04-22:
- `[slug]/page.js` already uses `await params` (Next 15+ async pattern done)
- No `cookies()`, `headers()`, `searchParams` usage anywhere
- No `forwardRef`, `useFormState`, `useFormStatus` in direct code
- `next.config.js` minimal (just images + Cloudinary remotePatterns)
- GSAP via `@gsap/react` — framework-agnostic, unaffected
- gray-matter, react-markdown@9 — both stable across React 19

**Known issue: `next-cloudinary` peer deps.**
- v6.17.5 (installed) and v7-beta.11 both cap peer deps at Next ^15
- Will throw peer dep warning on Next 16 install
- Will likely work in practice (no breaking API surface), but verify all Cloudinary-rendered images after upgrade
- Check the next-cloudinary GitHub before upgrading for an official Next 16 release; otherwise install with `--legacy-peer-deps` and test

**Steps when ready:**
1. Branch off `main` (not the V2 feature branch): `git checkout main && git checkout -b nextjs-16-upgrade`
2. Run codemod: `npx @next/codemod@latest upgrade`
3. Test: every page in dev, especially `[slug]/*` routes and any page using Cloudinary
4. Bump GSAP if not current (already done 2026-04-22)
5. Merge to main, let Vercel deploy V1 on Next 16
6. Rebase `homepage-dark-redesign` onto upgraded main, continue V2

**Estimated time:** 30 min codemod + 1 hr verification, +30 min if Cloudinary needs intervention. Half-day total.

---

## Overhaul Progress

- [x] Phase 0: Protect existing work (push, clean branches, drop duplicate stash)
- [x] Phase 1: Consolidate project documents (7 → 3)
- [x] Phase 2: Token cleanup in globals.css
- [x] Phase 3: Sweep deprecated token usage
- [x] Phase 4: ~~Standardize GSAP easing (lib/motion.js)~~ SKIPPED — easing strings are just strings, GSAP is dynamically imported, centralizing adds indirection without benefit
- [x] Phase 5: Extract homepage data to lib/homeProjects.js, archive FeaturedWork (dead code), rename GroundswellContentV3 → GroundswellContent
- [x] Hero scatter-gather rebuild (merged from hero-scatter-gather branch 2026-04-07)
- [x] Phase 6: ~~Consolidate animation patterns~~ SKIPPED — breathing animation scale differences are intentional (1.03 idle vs 1.15 hint)
- [x] Phase 7: Archive orphaned components (ThemeSetter, BuildingNow, ProcessDot), clean up barrel exports
- [x] ProjectPreview component (2026-04-22): scroll-driven carousel — hero image composes, then rotation slides lift up from below one by one on continued scroll. Pin scales with slide count, sticky ease, final dwell, white text with subtle opacity, fixed-width text column (no reflow)
- [x] Homepage grid unification (2026-04-22): single `--page-gutter` canonical variable; `--gutter`, `--grid-margin`, `--container-padding` all alias. Breakpoint-divergent overrides removed so every edge aligns at every viewport
- [x] Groundswell carousel finalized with real assets (2026-04-22): 6-slot sequence — `gs-opener` video (stitched iris intro → display view, hard cut at natural fade), `gs-hero` corridor photo, `gs-pod-data` video (asymmetric right-crop to 16:10 preserves KEY panel), `gs-cards` artifact, `gs-walkthrough-video`, `gs-ctb-email`. Three-layer mute guard (`muted` + `defaultMuted` + ref fallback) on video element handles React's attribute quirk

---

## Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-04-06 | Keep HowIWork component (may reuse on about page) | Has Systems/Stories/Solutions pillars concept |
| 2026-04-06 | Archive ThemeSetter (ThemeToggle handles data-theme directly) | Duplicate utility |
| 2026-04-06 | Keep BlobLabel (domain-colored pills, useful for case studies) | Well-built V2 component |
| 2026-04-06 | Archive ProcessDot (unused, simple to recreate) | 3 colored dots, no imports |
| 2026-04-06 | Drop gather-test-page concept as standalone page | May reuse ideas in about page |
| 2026-04-06 | Consolidate docs: keep CLAUDE.md, DESIGN_SPEC.md, WORKING_WITH_LORIN.md | Other 4 docs archived |
| 2026-04-06 | Skip lib/motion.js (Phase 4) | GSAP easing strings are just strings, dynamic imports make a constants file pointless indirection |
| 2026-04-06 | Skip animation consolidation (Phase 6) | Breathing scales (1.03 vs 1.15) are intentionally different for idle vs hint states |
| 2026-04-06 | Archive FeaturedWork | Exported in barrel but never imported anywhere — dead code |
| 2026-04-06 | Rename GroundswellContentV3 → GroundswellContent | V3 suffix is versioning noise. Decomposition deferred — touches standalone Groundswell site |
| 2026-04-06 | .DS_Store cleanup unnecessary | Already in .gitignore, not tracked in git |
| 2026-04-07 | Scatter-gather hero merged | Scroll-driven letter constellation replaces time-based hero |
| 2026-04-07 | Hero approach: cinematic hero, restrained body | Hero does the heavy animation lifting, rest of page should be impressive but not over-animated |
| 2026-04-22 | Drop peek-artifact concept | Tried and rejected in favor of full-media rotation (commit 7a5db8a still in history) |
| 2026-04-22 | ProjectPreview media rotation | Hero image composes, then 2-4 rotation slides lift up in-place on continued scroll. Real assets used where available; placeholders for non-Groundswell projects pending Lorin's image swap |
| 2026-04-22 | Grid path 1 (margins only, defer columns) | Unify horizontal margins now via `--page-gutter`; full 12-column grid adoption deferred until case study template is designed |
