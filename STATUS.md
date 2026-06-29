# Project Status
### Last updated: 2026-06-29 (evening) — Birth Story body rebuilt on a "split" register (narrow text + BIG media); IA diagrams redrawn native; an interactive annotated Features tour shipped. Lorin: tour is "a good start, rough-draft quality." Next: the direct-feedback inline annotations (the missing half) + polish.

This is the living status doc for the lorin.work portfolio redesign. Updated at the end of every working session. Detailed in-flight state lives in memory `PROGRESS.md`.

---

## Portfolio strategy — LOCKED 2026-06-28 (the north star — read first)

**Positioning:** design **researcher / strategist who can also ship** — *not* a UX/UI designer with research skills (that market is too competitive). Research, synthesis, systems thinking, and co-design are the headline; UX/UI is supporting evidence. Case studies lead with framing and insight, not UI shots.

**Goal chain:** finish a tight, hiring-manager-ready portfolio ASAP → frees creative energy to finish Whelm + Inkling → job search. The portfolio must not keep eating creative energy.

**Tiered case studies (depth over quantity):**
- **3 stars** — full scannable Sense/Weave/Shape, real writing, curated captioned media:
  - **Groundswell** — co-design + real pilot (outcome).
  - **Birth Story** — UX/UI product + research, healthcare (proof she can ship).
  - **Transition Design** — systems thinking + data viz (the strategist signal; rounds the trio to research / product / systems).
- **Lean tier** — frontmatter framing + hero + embedded class deck/slideshow, near-zero writing:
  - **Bridging the G.A.P.** (brand + animation; visual, reads well lean) > **SomeBuddy** (lean or cut — dominated by Bridging).
- **Off the portfolio for now:** Whelm + Inkling (unfinished). Whelm = eventual **4th star** (solo, full ownership) once done.

**Three surfaces, decreasing ask on the viewer (added 2026-06-28):**
1. **Stars** — featured, full case studies (depth).
2. **"More work" grid** — lean projects as compact cards; each opens a thin framed page (one-line problem + role + outcome + embedded deck). Breadth, no writing burden. **A grid, not a dropdown** — Lorin has spent the project removing dropdowns; don't reintroduce one.
3. **Playground** — a separate, clearly-labeled light gallery for casual/experimental work. Personality + range, held away from the case studies so it never dilutes them.

**Operating principle:** identical bones, bespoke flesh. Scannable in 3 minutes. Every section legible from its headline + captions alone. Reveals, never scrubs. Interaction is a bonus, never the only path to the information. (From the two case-study articles Lorin sent — semplice.com, uxpilot.ai.)

**Build approach — content-driven (refines the "one editorial form for all" memory decision):**
- **Lean tier** rides the existing markdown system (`app/(portfolio)/projects/[slug]` + `content/projects/*.md`) — modernize to V2 + deck embed (the `liveUrl` iframe already exists).
- **Rich tier** = the `GroundswellSpine` editorial form (`/projects/groundswell/hero`), made content-driven so Birth Story + Transition Design pour in without copy-pasting JSX.
- Groundswell keeps its one bespoke signature (the art-wall hero).
- Reconcile three template artifacts: keep `[slug]` (lean) · `GroundswellSpine` → rich-tier engine · retire `GroundswellPreview` (superseded).

**Hero mode is per-project, set by the deliverable (added 2026-06-28):** the opening sets the contract for the scroll that follows.
- **Mode A — full-bleed photo/video hero** that *transitions down* into editorial formats. For physical/experiential deliverables (Groundswell's art-wall hero).
- **Mode B — text + an isolated component** that starts calm and centered, then *reorganizes on scroll* into new layouts. For app deliverables (Birth Story Care Pod).
- Systems work (Transition Design) may open on a data-viz hero. Same bones, bespoke opening.

**Shipped 2026-06-28 (calibration):** reusable `<DeviceMockup>` primitive (`components/CaseStudy/DeviceMockup.jsx` — static image | looping prototype video | screens; reduced-motion + lazy-load handled) and the **Birth Story Care Pod calibration beat** (`components/Birthstory/`, route `/projects/birthstory-care-pod`). This beat is the tuning-fork for the minimalism / process / interactivity balance: centered Mode B opening, statement + device + depth line, color only inside the screen. DeviceMockup is reused by every app project (SomeBuddy, Homi, Heirloom, MindfulNest).

**Critical path:** Claude builds the lean template + ships Bridging *now* (no blocking on writing); Lorin writes Birth Story + Transition Design copy (only she can — her voice); then Claude makes the Spine content-driven and pours the stars in.

---

## Right now — Birth Story (the template pilot)

**Birth Story defines the case-study template.** Full draft at `/projects/birthstory-care-pod` (not gated; dev on port 3001). Rebuilt 2026-06-29 in a **field-notes / question-led register** after the polished version read as a "corporate pitch."

**The locked direction — process, not pitch · curiosity first** (full principle in memory `DECISIONS.md → "Case-study VOICE"`): every section OPENS on its driving question, then shows the thinking — `the question → my first (wrong) answer → the reframe → the better answer → what's still open`. First-person, contingent prose that admits missteps; **her real Figma files/screens as figure plates (NOT recreations)**; documentary furniture (monospace metadata, dated entries, figure numbers); **cool paper ground `#F1F2F0`** (the warm cream read "tan"). App screens still in the device mockups she likes, shown as figures. This register is the candidate model for Transition Design + the other stars.

**Shipped this session 2026-06-29 evening (committed local on main `2b14165`→`febb9cd`; not pushed):**
- **Hero `BirthStoryHeroFan` wired live** + **Nav contrast fixed** (`.overHero` white-ink over the teal gradient; reverts to dark on scroll).
- **Body rebuilt on a "split" register** — each beat = narrow text (the thinking) + BIG media (the artifact). New primitives in `kit.jsx`/`system.module.css`: `Split`, `Figure` (now also hosts a **native DOM artifact via `children`**), `Finding`, `FieldSection wide`. Progress spine is now a **horizontal sticky bar** (`BirthStorySpine`); metadata folded into Brief as `Credits`. **5 of 8 sections converted, screens shown BIG** (was 138–150px thumbs): 01 Brief · 02 Research · 03 Architecture · 04 Iteration · 05 Features. Em dashes cleared from those drafts.
- **03 Architecture — IA diagrams REBUILT NATIVE** (`IaDiagrams.jsx`): the black Figma-canvas PNGs read as alien slabs; redrawn as DOM in the teal-on-paper palette (`IaV1` branching questionnaire w/ measured fan connectors, `IaFinal` five-tab tree). Lorin: "so much better."
- **05 Features — interactive annotated TOUR** (`OnboardingTour.jsx`) leads the section: marries big rendered mockups + animation + inline annotations. Walks 4 destinations; pin + measured leader line ties each to a callout (her verbatim onboarding copy); rebuilt nav rail lights the active tab; auto-advances/clickable; reduced-motion + mobile handled. Decision rows stay below as the *why*. **Lorin: "a good start, rough-draft quality."**

**Next move:** **add the direct/specific-feedback inline annotations** — the half still missing. Reuse the tour's pin+leader, styled as a distinct **"tester said" crit voice**, with 3 real quotes: *"it would be tragic to lose these moments…"* → Book · *"why 'reclaim'?"* → Voice · *"too many buttons and options"* → Iteration round 1. Then a **polish pass on the tour** (it's rough-draft) and fix Care Pod's nav bar peeking on mobile.

**Then:** convert the copy-led sections (06 Voice · 07 Brand · 08 Outcome/Close) and **Lorin's copy pass** on all body prose (Claude's draft in her voice). Then apply the settled register to **Transition Design** (star #3); then **"More work" grid + Playground**.

**Asset gotcha:** clean app screens = `evolution/v3-home.png`, `bs-carepod.png`, `hero/phone-book.jpg` (Book), `evolution/screens/v3-7.png` (search). `v3-4.png`/`v3-5.png` are **coach-mark frames** (baked callouts) — don't use where a clean screen is needed. Full map in `PROGRESS.md`.

---

## Groundswell case study (flagship — pending hero pivot)

The case study is now **one gated page: `/projects/groundswell/hero`** = `GroundswellHero` (cinematic dark hook) + `GroundswellSpine` (light process). The model + voice live in `docs/case-study-editorial/CASE_STUDY_PLAYBOOK.md → THE SPEC`; her origin copy is in `GROUNDSWELL_VOICE_DRAFT.md` (do not re-interview). Full detail in memory `PROGRESS.md → "Groundswell case study — CONSOLIDATED build"`.

**Shipped this session:** consolidated the parallel drafts into one page (retired `GroundswellProcess`/`GroundswellLook` + the `/spine`,`/look` routes); restored the cinematic hook (art-wall → shrink-into-circles → her real `connectors.svg` map → discs — *since trimmed to hook-only, see the restructure block below*) with a smart credit that fades with the artwork; the light process on a **real 12-column grid** (media full-width, text in a readable column, a **full-height vertical timeline rail** set apart by a divider + gap); act color-coding (sage/plum/terracotta, saturated); **no dropdowns** — Sense method **slideshow**, Weave **interactive system map**, Shape **interactive timeline**; **claimable-only outcomes** (study data removed — $30k+, live grant-funded QI study, 30 testers); first documentary photos placed; AA contrast.

**Shipped 2026-06-27 (overview pass, commit `cdf22a5`):** the **overview now opens documentary** — two grid-aligned full-bleed photos lead the section (playtest-setup `gs-playtest-01` left, staff grief-workshop `gs-workshop-grief-02` right, cropped so its right edge butts to col 9, aligning with the ROLE column). They reach the top with no white gutter; the green dawn (#C5CFA6 → transparent) fades in **below** them via `.mastBody::before`, full-bleed to the rail divider. Dropped the **"The process" kicker** — the masthead now leads with the *"I helped design Groundswell with the people it serves"* statement. **No credit on the candid BTS overview photos** (no art in frame — credit is reserved for the Blue-Garden frames). Recast **"More context"** as a **dark-mode card** (#252525, light text) with the site gradient plus/minus icon; the personal backstory reveals **inside** the expanded container (the sanctioned dropdown exception). Verified eyes-on at 1440.

**Shipped 2026-06-27 (earlier):** cleared the last two **dropdowns** — "More on how I got here" (Frame) is now a visible secondary way-in paragraph; "See how I got there" (the 6 ❗→⭐ pairs) is gone — each pair is now a visible three-tier card (tension → response → hairline → rationale). Dead `Expand` component + CSS removed. **Placed the four Weave intervention photos**: each intervention card (Art Wall / Restorative Pod / Reflection Cards / CTB Email) now leads with a documentary photo bleeding to the card edges, Carolyn Gavin credited inline ("Artwork Carolyn Gavin · Photography Kevin Lorenzi" — all four frames show Blue Garden). Verified eyes-on at 1440 + 400px; clean compile, no console errors.

**Shipped 2026-06-27 (Shape imagery + hero line):** Shape's two "calls that mattered" pairs now carry photos — `gs-workshop-flower-02` (the "Nourishing the Flower" worksheet → grief→restoration, no credit) and `gs-making-facade` (trust-not-surveillance, Carolyn credited). Overview left masthead photo `object-position` 40%→**56%** so the table artifacts read. Hero mid-scroll line **varied** to *"scattered support becomes a system that holds them"* so it no longer repeats the overview's "connected ecosystem" verbatim (now claim→proven). Verified 1440 + 400px.

**Shipped 2026-06-27 (hero restructure — biggest change):** the **mega-hero was trimmed to a hook** (`GroundswellHero`, **560/380vh → 165vh**, ~2 scrolls): thesis question → art-wall full-bleed → promise line → "Process ↓". The **ecosystem diagram was REMOVED from the hero** — it duplicated the Weave system map — and **consolidated INTO Weave**, where it now renders on her **real `connectors.svg` geometry** (her arrows draw on as the substrate, a plum lit overlay traces connections on select), placed **after the four intervention cards** as the synthesis ("How they connect"). `connectors.svg` now passes to `GroundswellSpine` server-side. No skip affordance (she chose a clean hook). Verified eyes-on 1440 + 400px; only pre-existing console noise (ShapeMark hydration + favicon).

**Reviewed 2026-06-28 (hero pacing + Weave map):** the 165vh hook is **rushed at the front, dead at the tail** (whole hook ≈ one trackpad swipe; the thesis question gone by ~120px). Recommendation logged: go **up to ~200–210vh** and hold the question longer (don't drop to 140 — that compresses further). **3 fixes shipped:** "Process ↓" / credit collision (credit → bottom-right corner), promise legibility (added contained scrim), and the Weave map caption grammar ("When a patient loss," → grammatical for all 6 moments). Weave "How they connect" map works in context.
**Next move (Groundswell):** the hero gets **rebuilt as the ecosystem circle→web signature** (the pivot — see `DECISIONS.md`); art-wall demotes to its intervention beat. Lower priority than finishing Birth Story + Transition Design. Copy: statement headings to bless + the **"what I'd do differently"** line still `[LORIN TO WRITE]` in Close.

**License (binding):** documentary art in approved context is OK with Carolyn credited inline; no NEW uses (card-flip deck, alterations). The legacy `GroundswellContent.js` build stays gated. See `PROGRESS.md → "Groundswell artwork-license hold"`.

**Dev gotcha:** Next `.next` desyncs after rapid edits → stale builds; view in **incognito**, and on stale: kill dev, `rm -rf .next`, restart. Never `npm run build` while `npm run dev` runs.

---

## Homepage — shipped this session (2026-06-27, all live on `origin/main` / lorin.work)

All deployed as isolated cherry-pick pushes to `origin/main` (the held Groundswell case-study commits stayed local):
- **Practice cards equal height** — `.practiceFan` `align-items: center → stretch`.
- **Hero intro reworked, locked on scrub.** Pass-through sweep (the scatter cluster is a pass-through waypoint, not a rest); cold-start entrance (flower *grows → spins once → bounces*, hover-spin arms after); even pacing (`end:'+=300%'`, `scrub:1`); "Keep Scrolling" renders two words (`.hWord` margin); no double-"Welcome" (SplitText `.revert()` on cleanup). **Guardrail logged in `PROGRESS.md` → stays scrub + `normalizeScroll`; do NOT decouple into timed-play / scroll-lock — that broke scroll repeatedly this session.**
- **About photo iris** reveals in the gaze (IntersectionObserver boundary trigger, not the old `top 85%` ScrollTrigger).
- **Groundswell homepage preview — data-viz gated** (commit `c4ab96e`): the data-viz recordings (`gs-opener`, `gs-pod-data` — real care data + licensed art) now sit behind a lock + `blur(4px)` via the new `components/CardStack/GatedOverlay` primitive (content illegible, work still reads, click-through preserved). "Data Visualization" moved to the **middle** file/tab (pills reorder with it); file-card media is now `object-fit: cover` (fills wide like other previews); **Experience Design leads with the cover-cropped `gs-walkthrough` video**.

**Next move (homepage):** the **Experience Design** card still shows `gs-hero` (corridor) + `gs-artwall` — Blue Garden art, public on the homepage. Give them the same gated/swap treatment when Lorin wants (she scoped this session to the data-viz recordings only).

**Push state:** `origin/main` = `c4ab96e`. Local `main` reads ahead/behind because the pushed commits are cherry-pick hashes — a `git pull --rebase` dedupes them. The other session's `GroundswellHero`/`GroundswellSpine` WIP is uncommitted in the tree (not mine — left untouched).

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
