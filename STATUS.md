# Project Status
### Last updated: 2026-07-04 (latest) — **Birth Story review batch EXECUTED; copy pass is all that remains.** One long session cleared Lorin's whole fine-tooth review — **5 commits local on `main`, NOT pushed** (`76c2492`→`2c883c1`, atop ~21 prior local). Shipped: the 6-item feedback batch (narrow Overview meta · **story-led prio card** · Voice grounded on the gradient veil · **dotted "my thinking" border** · **real Terfens wordmark** · **teal Close bookend**); the spine **restructured to 6 chapters (Option B)** — Brief · Research · Structure · The Product · Craft · Outcome, with iteration/brand/reflection as subheads; a **quote-accuracy pass** (four fabricated quotes reframed as summaries or cut — only her verbatim words are ever in quote marks now); **client facts corrected** (Dezudio = Myana's design partner, its founders taught the CMU studio; Pitt not UPMC); **Role line = her verbatim**; **Reflection = the teal bookend** (retrospective paragraphs cut). Eyes-on verified 1440 + 390. **NEXT = HER COPY PASS.** One hard push-blocker: the live placeholder "[ Lorin to write ]" for the **"Find strength & support" rename** in Voice; optional = tighten the bookend line + a Q7 "what it proved" sentence. Full state: memory `PROGRESS.md → Birth Story review-batch execution`. **Push when she says.** (Deck-system engine work below is a separate parallel branch, `deck-system` — untouched by this session.)
### Prev (2026-07-04) — **DECK SYSTEM engine day — first running code.** Cut the `deck-system` branch off `main` and built the content-agnostic deck engine + one draft slide per register, deployed to a Vercel preview for Lorin to react to. Chrome-free `(deck)` root layout · `DeckStage` (16:9 letterbox, container-query type so it reads projected or previewed, keyboard nav, presenter rail, reduced-motion) · `useDeckBuild` (the case studies' paused-timeline play-once with the trigger swapped scroll→keypress, advancing *sub-steps within a slide* then to the next) · **four register frames** on Birth Story material — **Statement** (4→0 punchline, wonky face) · **Specimen** (real screen + dotted-leader annotations drawing in one at a time) · **Diagram** (the 4→0 architecture decision enacted: gate builds → collapses → "New note") · **Voice** (verbatim tester quote, shown and left alone). Commit `e278fb0` on `origin/deck-system` (a parallel session's Birth Story feedback-batch commit `76c2492` landed cleanly on top). **Preview (READY, behind Vercel login):** `portfolio-git-deck-system-lorinanderberg1-3719s-projects.vercel.app/deck-preview`. Production `lorin.work` untouched; branch never merges until worthy. All four frames eyes-on verified 1440×900. Making-of journaled (`docs/deck-system/JOURNAL.md` entry 004 + artifacts). **NEXT: Lorin reacts to the frames**; then slide-copy pass + the open engine items (appendix slides, print pipeline, motion permalinks, direction-aware back-nav seek). **Birth Story remains the overall critical path.**
### Prev (2026-07-04) — **Workflow/config session — no portfolio feature change.** Model routing lifted to GLOBAL `~/.claude/CLAUDE.md`: Fable 5 = innovation partner (deliberate, main-thread `/model`), Opus 4.8 = execution default, Haiku = delegated substrate behind a cheap check, Sonnet = research deep-reads — best-of-best where it matters, not cost (reverses an initial wrong call to shelve Fable). Her craft standard captured as `~/.claude/DESIGN_PROCESS.md → §8 The Bar`: standard + annotated northstars + the additive-vs-narrowed / Inkling calibration, in her words. Both synced off-machine (`sync.sh` → GitHub/iCloud/LaCie) so a locked-out new Claude inherits them. **Portfolio critical path UNCHANGED — the Birth Story batch below is still the next move.**
### Prev (2026-07-04) — **Lorin’s fine-toothed review done; a 6-item design feedback batch + the copy pass are all that stand before push.** Review-night session (4 commits → `d69ece5`, **17 local total, NOT pushed**): crit wall now rides her own Cloudinary edit (new `cloudImg` `chain` opt — Media Editor “saves” are transformation URLs, not overwrites); **Consent row leads the Close colophon** (attribution policy adopted cross-chat: no participant names ever, role-context labels, two-tier evidence — memory `DECISIONS.md`); **8 iteration/hero wireframes re-exported crisp from Figma** (2×, node map in `REFERENCE.md`; hero cover = `hero/cover-wing.jpg`); **Question-Map audit: the page already answers 5 of 8 interviewer questions** — every gap is copy, parked in the canonical `PROGRESS.md → COPY PARKING LOT` (2 HIGH: Close ending + Q7 impact answer · Role statement); skim walk passed at 1440 + 390. **Her feedback batch (execute FIRST next session): overview meta ≤3 lines · prio card standalone · Voice contrast · dotted-border “my thinking” rec (needs her yes) · Terfens wordmark via Figma export (signature is wrongly Fraunces) · a visual Close** — verbatim in `PROGRESS.md → DESIGN FEEDBACK BATCH`. **Then copy day, then push.**
### Prev (2026-07-03) — **DECK SYSTEM workstream born, Phase 0 complete.** Every case study becomes an interview walkthrough (5/20/45-min cuts) + downloadable PDF, presented from the site itself (`/projects/[slug]/deck`, future). Structure derives from researched interviewer questions (4 research passes, ~35 sources — the 8-question spine, rubric, failure guardrails); slide-REGISTER system approved (Statement/Specimen/Diagram/Voice on site DNA, evidence-grounded rhythm rules); ROLE LENS feature specced (re-weights deck for UXR vs product roles; lens rule: never alters content). Product idea (hers) parked to Phase 5. **Living PM doc: `docs/DECK_SYSTEM.md`** · making-of journal (binding capture protocol): `docs/deck-system/`. **Next on this workstream: cut the `deck-system` branch, build the four register frames.** Birth Story beat spec + slide copy wait on her copy pass — which stays the overall critical path.
### Prev (2026-07-03) — **Contact + brand-icon pass.** Resume now links live in the About byline + footer (Drive PDF `Lorin_Anderberg_Resume_June2026`, anyone-with-link; update it by replacing the file’s contents — a re-upload breaks the link). Favicon existed only as a 404 — it and the apple-touch-icon are now the ShapeMark flower on the dark ground, with optical stroke weights so the loop mark survives 16px (recipe: memory `REFERENCE.md → Brand icons`). Four local commits (`1518ef8`, `55b21bf`, `4308ea2`, `5aa6510`) — **cherry-pick as one set when Lorin says deploy.**
### Prev (2026-07-03) — **Birth Story design DONE pending Lorin’s copy pass.** A full-day Fable session (13 local commits, dbf6e56 → 4dc428f, **not pushed**) locked the whole visual system and section grammar: **one chip-card language** (white grounded cards + solid chips — colored left-border callouts BANNED, they read AI); **voice→color mapping** (teal = the record · lilac `#E6E5FD` = her thinking · peri `#B1C1F4` = testers); **gradient stages on every feature/round** + the **full-bleed teal product band** (both blessed); **Iteration rebuilt on the deep-dive grammar** (copy left, artifact in gradient stage right, tester quote pinned in-stage); **annotations on all five functions**; Architecture’s **4→0 confrontation frame**; sources **colophon**; crit wall **color-corrected + uncropped**; a11y floor fixes (44px spine targets); Search screen re-exported crisp. Two standing workflow rules born here: **GRID.md pre-ship gate on every layout pass** and **every feedback batch → tracked checklist** (global CLAUDE.md). Tripwires + full state: memory `PROGRESS.md → Birth Story — session 2026-07-03`. **Next: Lorin’s fine-toothed review + copy pass** — parking lot below.
### Prev (2026-07-01) — Visual system: silent near-white ground `#FAFAFA`, color from content only, chapter numerals, grounded elevation (`DECISIONS.md → Birth Story VISUAL SYSTEM`).
### Prev (2026-07-01) — **Register shift + Brief rebuilt as the template** (three legible voices: objective record / teal `<Insight>` "my thinking" / terracotta tester). Hero, Overview, Brief done. Rationale: `DECISIONS.md → Case-study REGISTER`. Client/asset facts: `REFERENCE.md → Birth Story client facts`.
### Prev (2026-06-30) — Workflow/tooling session (Intake rule, over-tooling audit discipline, commit-freely, permission allowlist) + earlier the copy pass into hiring-manager documentation (now SUPERSEDED by the 2026-07-01 register above).

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

**Site architecture — homepage as "Selected Projects" + an "All Work" bento page (vision, added 2026-06-30):**
This is the concrete shape the "three surfaces" now take, and the north star for the site build after the stars are written:
- **Homepage = "Selected Projects."** The homepage is a *curated* landing — only the stars (Groundswell, Birth Story, Transition Design; Whelm later). It is not a complete index; it is the 90-second highlight reel that makes the strong first impression. Decreasing ask: the homepage shows the best, in full depth.
- **"All Work" page = a traditional bento-box grid** of *every other* project. A classic bento layout (mixed-size tiles, each a project) that reads as a complete portfolio index without the writing burden of full case studies. Breadth lives here, away from the curated homepage.
- **Each bento tile opens its own page** — eventually a full case study (when the project earns one) or, in the meantime, a **basic project outline / documentation** (frontmatter framing + hero + embedded deck/slideshow, near-zero writing). Tiles graduate from "outline" → "case study" over time; the bento grid is the durable home for all of them.
- Mapping back to the three surfaces: **Selected Projects = surface 1 (stars)**; **All Work bento = surface 2 (the old "more work" grid, now a dedicated page)**; **Playground = surface 3** stays separate. The bento is still **a grid, not a dropdown** (the project's standing no-dropdowns rule).
- **Sequencing:** finish the star case studies first (Birth Story is the template pilot), then build the lean outline template, then stand up the All Work bento page and pour every other project into it as outline-tier, upgrading to case studies as they're written.

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

**Birth Story defines the case-study template.** Full draft at `/projects/birthstory-care-pod` (not gated; dev on port 3001).

**The locked direction — structured documentation in three legible voices** (full principle + reasoning in memory `DECISIONS.md → "Case-study REGISTER"`, 2026-07-01; this SUPERSEDES the 2026-06-30 "autobiographical prose" register). The reader must never *decipher* brief-vs-thinking, so: (1) **objective record** = direct sentences + labeled bullet lists (`Required`/`Provided`), NOT prose; (2) **her thinking** = the new teal **`<Insight>` "My thinking" callout** (`kit.jsx`), mirror of the terracotta `TesterNote` — content must be CONCRETE + in her voice (never invented; source from notes or `[LORIN TO WRITE]`); (3) **tester feedback** = the existing crit voice. Also: **Overview = metadata-forward grid** (no synopsis para); headers direct, no poetic titles; **stats big**; reference others' products by **citation, not mockup**. Fraunces still reserved for leads/headings/callouts; body = Open Sans; paper ground `#F1F2F0`. Candidate model for all the stars. **Copy source of truth = `components/Birthstory/*` (the page), not the copy doc.**

Earlier this build (2026-06-29): hero `BirthStoryHeroFan` wired live + Nav contrast fix; body on the split register; 03 Architecture IA diagrams rebuilt native (`IaDiagrams.jsx`, "so much better"); horizontal sticky progress bar (`BirthStorySpine`); Credits masthead in Brief.

**Shipped this session 2026-06-30 (committed local on `main`; NOT pushed):**
- **Tester "crit voice"** — new `CritStage.jsx` (terracotta pin + measured leader, "a tester said" card, set against the product teal). Placed: Voice (*why "reclaim"?* on the rejected draft copy) · Iteration round 1 (*too many buttons and options* on the over-built V1) · Book (*tragic to lose these moments*).
- **05 Features REBUILT** — retired the interactive tour (`OnboardingTour.jsx` kept on disk, unused). Now a **4-up `FeatureWall`** (Home · Care Pod · Book · Search, all side by side) opening on the insight *"birth never goes to plan, so the app is the opposite,"* then **four capability deep-dives** (Documentation · Care Pod · Reflection · Book), each = question + thinking + the real screens shown big.
- **Real Figma screens pulled** — 8 final "Gradient" screens exported 2× PNG to `public/images/birthstory/bs-{doc-note,doc-medical,reflect-card,reflect-entry,carepod-update,carepod-stories,book-order,book-curate}.png` (node ids + `download_assets` workflow in memory `REFERENCE.md`).
- **Photos** — class-presentation shots **bookend** the study (Brief top `IMG_3010` cropped 2∶1; Outcome `IMG_3012` paired with the client quote). New context photos added then **swapped to B&W**: Brief = `fog` (B&W via Cloudinary `e_grayscale`), Research = `feeding` (natively B&W); plus `gap`, `room` (Care Pod "why"). **Design values moved Brief → Research.** Brief client photo now **aligned in the same column** as the context photo (3∶2, not the 2∶1 band). **Final crit-wall whiteboard** (`class_notes.heic` via `f_auto`) closes Iteration.

**Shipped 2026-06-30 (latest — the copy pass, committed local on `main`, NOT pushed):** the whole case study rebuilt into the autobiographical-documentation register above. New kit `Lead` + `SubBlock`; Overview masthead added; `<Ask>` question openers removed everywhere; `.prose` moved off Fraunces. All standing corrections applied (Outcome overclaim gone, "built by me with AI / concept" explicit). Voice-audit passed (contractions, curly quotes, no em dashes, killed "hold space"). 4 pre-build decisions all resolved (feature map confirmed · warm-personal Brief w/ optional systemic toggle · `MY PART.docx` read = not Birth Story content · Olympic stat cut). Eyes-on verified 1440 + 390.

**Next move — the 6-item DESIGN FEEDBACK BATCH from her review (`PROGRESS.md → DESIGN FEEDBACK BATCH`), then COPY DAY, then push.** Two of the six wait on her word: the dotted-border “my thinking” distinguisher (Claude’s rec, needs her yes) and the visual Close (lands with the Close copy). The copy list is canonical in **`PROGRESS.md → COPY PARKING LOT`** — 2 HIGH (Close ending + Q7 impact answer as one authored passage · the Role statement / solo-vs-studio framing) + the small verdicts (spine vocabulary, act labels, Care Pod role line, “Find strength & support” rename, stats-big, colophon facts + Consent-row bless, tester-chip labels + evidence tiers, jargon calls incl. the hero’s Dezudio/UPMC vs Overview’s Myana/CONVERGE facts). Question-Map audit says the built page already answers Q1/Q4/Q5/Q6/Q8 — the copy closes the rest. Her still-open design verdicts: prio cells-vs-rows (desktop-only — it stacks to rows at 390 anyway), chip colors on her screen. Then: **Transition Design** (star #3; source = `MY PART.docx` Tab 2, `REFERENCE.md`); then the **All Work bento + Playground**.

**Open:** Lorin mentioned a **2nd whiteboard photo** (only `class_notes` placed so far) — ask if it covers different ground. ~~Low-res holdouts~~ RESOLVED 2026-07-04: all 8 page-used wireframes re-exported 2× from Figma (node map in `REFERENCE.md`).

**Asset note:** Birth Story screens live in `public/images/birthstory/` (2× PNG); context/documentary photos are Cloudinary (`birthPhoto()` map in `lib/cloudinary.js`). Pull more Figma screens by node id (REFERENCE.md). Pasted screenshots can't be grabbed — use Figma or Cloudinary.

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
- Footer: centered LinkedIn / GitHub / Resume / Email (Resume live as of 2026-07-03, pending deploy)
- `/projects/groundswell` case study with a "Live Site" cell linking to `/groundswell`
- Standalone Groundswell stakeholder site (`/groundswell`, complete, do not touch)
- Theme: forced `data-theme="dark"` on `/` only via inline head script + PortfolioShell effect; case study and other portfolio routes stay light
- Last production commit: `c799323` — SomeBuddy + TD subheads, closer word-break and spacing
- **Tag `v1-final`** points at `7c015c2` (the pre-redesign main HEAD), so the V1 site is one `git checkout` away

---

## What's Unfinished

- About page (`/about`) — the nav still shows it as a disabled span
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
