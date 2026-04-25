# Project Status
### Last updated: 2026-04-22

This is the living status doc for the lorin.work portfolio redesign. Updated at the end of every working session.

---

## Current Phase

**Codebase overhaul** — consolidating months of exploration into a production-quality foundation before building case study pages.

### Roadmap
1. Codebase overhaul (in progress)
2. Finish dark homepage with project previews
3. Case study pages (Sense/Weave/Shape template)
4. About page (new concept)

---

## What's Live (main branch, deployed to lorin.work)

- Homepage V1 with video preview cards, "coming soon" states
- Standalone Groundswell stakeholder site (complete, do not touch)
- Last commit: `7c015c2` — consistent "we" voice in Groundswell copy

---

## Active Branch: `homepage-dark-redesign`

45 commits ahead of main. Pushed to remote 2026-04-06.

**What's built:**
- Light/dark theme toggle (ThemeToggle component, `data-theme` attribute)
- Dark mode hero with gradient marks, per-character wave animation
- "Designing" wipe-on animation with descender-safe clip-path
- GroundswellSection: 2-row media-first layout, scroll-triggered fan-out, 3D card flips, iPhone mockup
- BirthStorySection: full-width video, sticky scroll gallery (5 images)
- 3 generic ProjectSections (SomeBuddy, Transition Design, Bridging the G.A.P.) with video cards
- Gradient pills, squiggle gradients, systematized typography
- Corner-to-corner gradients on hero marks
- AboutSection placeholder at bottom

**What's unfinished:**
- BirthStory: missing case study link
- SomeBuddy, Transition Design, Bridging: all marked `comingSoon: true`
- About section: placeholder with "coming soon" extended bio
- Bridging preview video may be placeholder (`Logos_1`)

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
