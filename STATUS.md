# Project Status
### Last updated: 2026-06-27 (Groundswell overview — documentary lede + dark disclosure)

This is the living status doc for the lorin.work portfolio redesign. Updated at the end of every working session. Detailed in-flight state lives in memory `PROGRESS.md`.

---

## Right now — Groundswell case study (one consolidated page)

The case study is now **one gated page: `/projects/groundswell/hero`** = `GroundswellHero` (cinematic dark hook) + `GroundswellSpine` (light process). The model + voice live in `docs/case-study-editorial/CASE_STUDY_PLAYBOOK.md → THE SPEC`; her origin copy is in `GROUNDSWELL_VOICE_DRAFT.md` (do not re-interview). Full detail in memory `PROGRESS.md → "Groundswell case study — CONSOLIDATED build"`.

**Shipped this session:** consolidated the parallel drafts into one page (retired `GroundswellProcess`/`GroundswellLook` + the `/spine`,`/look` routes); restored the cinematic hook (art-wall → shrink-into-circles → her real `connectors.svg` map → discs) with a smart credit that fades with the artwork; the light process on a **real 12-column grid** (media full-width, text in a readable column, a **full-height vertical timeline rail** set apart by a divider + gap); act color-coding (sage/plum/terracotta, saturated); **no dropdowns** — Sense method **slideshow**, Weave **interactive system map**, Shape **interactive timeline**; **claimable-only outcomes** (study data removed — $30k+, live grant-funded QI study, 30 testers); first documentary photos placed; AA contrast.

**Shipped 2026-06-27 (overview pass, commit `cdf22a5`):** the **overview now opens documentary** — two grid-aligned full-bleed photos lead the section (playtest-setup `gs-playtest-01` left, staff grief-workshop `gs-workshop-grief-02` right, cropped so its right edge butts to col 9, aligning with the ROLE column). They reach the top with no white gutter; the green dawn (#C5CFA6 → transparent) fades in **below** them via `.mastBody::before`, full-bleed to the rail divider. Dropped the **"The process" kicker** — the masthead now leads with the *"I helped design Groundswell with the people it serves"* statement. **No credit on the candid BTS overview photos** (no art in frame — credit is reserved for the Blue-Garden frames). Recast **"More context"** as a **dark-mode card** (#252525, light text) with the site gradient plus/minus icon; the personal backstory reveals **inside** the expanded container (the sanctioned dropdown exception). Verified eyes-on at 1440.

**Shipped 2026-06-27 (earlier):** cleared the last two **dropdowns** — "More on how I got here" (Frame) is now a visible secondary way-in paragraph; "See how I got there" (the 6 ❗→⭐ pairs) is gone — each pair is now a visible three-tier card (tension → response → hairline → rationale). Dead `Expand` component + CSS removed. **Placed the four Weave intervention photos**: each intervention card (Art Wall / Restorative Pod / Reflection Cards / CTB Email) now leads with a documentary photo bleeding to the card edges, Carolyn Gavin credited inline ("Artwork Carolyn Gavin · Photography Kevin Lorenzi" — all four frames show Blue Garden). Verified eyes-on at 1440 + 400px; clean compile, no console errors.

**Next move:** continue imagery into **Shape** (the two "calls that mattered" pairs are still text-only; `gs-making-facade` fits the surveillance-vs-trust call). **Open copy (Lorin owns):** bless the assembled statement headings + write the "what I'd do differently" line (`[LORIN TO WRITE]` in Close). **Open question (raised, unanswered):** the mid-scroll hero line now restates the overview thesis ("a connected ecosystem of care") — keep it as a deliberate claim→proven echo, or vary the hero line so the two don't repeat verbatim.

**License (binding):** documentary art in approved context is OK with Carolyn credited inline; no NEW uses (card-flip deck, alterations). The legacy `GroundswellContent.js` build stays gated. See `PROGRESS.md → "Groundswell artwork-license hold"`.

**Dev gotcha:** Next `.next` desyncs after rapid edits → stale builds; view in **incognito**, and on stale: kill dev, `rm -rf .next`, restart. Never `npm run build` while `npm run dev` runs.

---

## Homepage — Lorin feedback (logged + actioned 2026-06-26)

### 1. Sense / Weave / Shape practice cards — equal height ✅ DONE

The **Sense** card rendered shorter than Weave/Shape in the practice fan (`components/AboutSection/`). **Not an illusion — real.** Cause: `.practiceFan` used `align-items: center`, so each card sized to its own content (`min-height: 340px` is only a floor; Sense's body wraps to fewer lines).

**Fix shipped:** `.practiceFan` → `align-items: stretch`, so all three match the tallest. The GSAP fan-out only animates `x`/`rotation`/`autoAlpha` (never height), so it's unaffected; the ≤800px mobile block already overrode this (column stack, full-width cards), so no mobile side effect. Verified statically across breakpoints; not yet eyes-on in browser.

### 2. Intro opener — kill the false midpoint, keep the instruction ✅ IMPLEMENTED (needs eyes-on)

**Refined diagnosis (Lorin's, sharper than the first read):** the "Keep Scrolling" instruction is *good and stays*. The real fault was the letter **architecture** — letters animated in two phases with the scatter cluster as a *resting waypoint*: drag-in eased `power2.out` (decelerates to a stop at the cluster), then gather eased `power2.inOut` (eases in from a stop). The velocity-zero at the cluster made it read as a finished composition, so the user stopped and had to re-initiate scroll to morph cluster → sentence. The old timing-overlap fix never worked because the *easing* reintroduced the stop, not the timing.

**Fix shipped** (`components/Hero/HeroScatter.js`, `buildScrollTimeline`): merged the two per-element position tweens into **one keyframed tween** where the scatter cluster is a *pass-through* waypoint. Phase 1 `power2.in` accelerates into the cluster (peak velocity at arrival); phase 2 `power2.out` leaves immediately and settles into the kerned sentence. No velocity-zero at the midpoint → no false destination. Single tween per property also prevents the old drag-in/gather pair from fighting mid-scrub. Applied to all letters + Sense/Weave marks + the centre flower (`SWEEP_IN 0.30` / `SWEEP_OUT 0.34`). "Keep Scrolling" swap/dissolve left as-is — it now cues one continuous build and fades (~0.30) right as the letters cross the cluster.

**Open:** needs a real scroll to confirm the *feel* (the whole point). Couldn't run automated eyes-on this session — Playwright browser profile was locked by an open Chrome. Dev server is live on :3000. Open call when reviewed: pass-through vs. the more radical one-path (single tween straight offscreen → sentence, no scatter waypoint) if the constellation moment isn't earning its keep.

### 3. Photo iris reveal — fire in the gaze ✅ IMPLEMENTED (needs eyes-on)

`AboutSection.js` photo iris was on a ScrollTrigger (`top 85%`) that fired while the photo was still near the viewport bottom, so the open finished before it reached the reading zone. Switched to **IntersectionObserver play-once** (the pattern the rest of the section uses; pin-shifted ScrollTrigger starts are unreliable here), snappier ease, so the open is witnessed whole. Committed separately this session.

---

## Current Phase

**Dark homepage shipped to production.** Next focus: case study template and a real about page.

### Roadmap
1. ~~Codebase overhaul~~ done
2. ~~Finish dark homepage with project previews~~ shipped 2026-04-24
3. Case study pages (Sense/Weave/Shape template) — next
4. About page (new concept) — currently a disabled span in the nav

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
