# Next

Working scratch. Gitignored. Delete entries when done; delete the file when empty.

## Paused — ProjectPreview / Hero / HowIWork compose tuning

**Branch:** `feat/preview-trigger-compose` (off main, has 1 commit `f8a581c`, pushed to origin). Resume with `git checkout feat/preview-trigger-compose`.

**Three open issues to resolve before merging to main:**

1. **HeroScatter — Designing/Connection final positions overlap** (visual bug from peek work)
   - Cause: `gsap.set(el, { x: off.x, y: off.y })` on peek letters (D, e, s, C) overrides the CSS `transform: translate(-50%, -50%)`, so those 4 letters lose centering and collide with neighbors in the gather/final phase.
   - Fix: add `xPercent: -50, yPercent: -50` to the peek-letter `gsap.set` in `components/Hero/HeroScatter.js` (~lines 226 and 236, inside the `D_PEEK.has(i)` / `C_PEEK.has(i)` branches).
   - **This is already on `main` (commit `2e115d0`)** — fix should land on `main` directly as a hotfix, not just this branch.

2. **ProjectPreview — bidirectional pin friction** (committed in `f8a581c`, feels wrong on scroll-back)
   - Current: pin shortened from 4.5vh to 1.5vh. Forward feels good. Going UP through 5 cards = 7.5vh of unwanted re-pinning. ScrollTrigger pin can't be unidirectional natively.
   - Decision needed with user: remove pin entirely (rely on section's natural 90vh height for dwell) OR keep a tiny pin (~50%) and accept minor backward friction.
   - File: `components/ProjectPreview/ProjectPreview.js` ~line 145.

3. **HowIWork — cards reveal animation missed on first pass**
   - Symptom: scroll-triggered reveal animations don't complete before user scrolls past; only readable on scroll-back.
   - Likely cause: scrub-tied or `start` too late. Same family as #2.
   - File: `components/HowIWork/HowIWork.js`. Check for ScrollTrigger with `scrub`. Pattern: trigger-based playback with own timer, `start` early enough to complete in visible window.

**Resume order:** fix #1 first as hotfix to main (independent). Then talk through #2 direction with user. Then apply same pattern to #3.

## Recently shipped

- [x] Voice + doc rules in global CLAUDE.md (sparse em dashes, no "not X, it's Y", typos always-on, AI-tell catalog, doc discipline, art-director framing)
- [x] Sharpened `challenge`, `refocus`, `review` skills
- [x] Archived STUDY_STATUS.md and LORIN_FINGERPRINT.md
- [x] Validation infrastructure (Playwright + axe + Lighthouse, `npm test`, `npm run verify`, `npm run verify:perf`)
- [x] `~/.claude/MIGRATION.md` for account-switch playbook
- [x] Playwright MCP installed at user scope (visual feedback loop). **Restart Claude Code to load the tools.**

## Pending — verification follow-through

- [ ] Generate visual baselines: `npm run test:update`. **Run AFTER the other tab's a11y fixes commit** so baselines reflect corrected state. Commit the screenshots.
- [ ] First Lighthouse baseline: `npm run verify:perf`. Open `reports/lighthouse-*.html`. Note current scores so future regressions are visible. Can run before or after a11y fixes (perf/best-practices/SEO unaffected; a11y score will improve after fixes).
- [ ] **(Other tab)** Fix homepage `aria-prohibited-attr` and Groundswell `nested-interactive` findings.

## Pending — original action backlog

- [ ] **Try Playwright MCP in a real session.** Once restarted, ask Claude to screenshot a route, click an element, scroll. Confirm the loop feels right. Decide whether Chrome DevTools MCP also belongs alongside it (for "watch my actual browser" mode).
- [ ] **Site teardown.** One-line prompt template, not a skill. Use when studying a site whose motion or layout you admire.
- [ ] **Temporary inline tool pattern.** Build a temporary in-page scrubber for tuning numeric values. First test case: ProjectPreview `perSlideUnits`.

## Pending — account migration

- [ ] When ready to switch accounts, follow `~/.claude/MIGRATION.md`. Doc self-deletes after verification.

## Cross-project (when ready)

- [ ] Carry the validation pattern (Playwright + axe + Lighthouse + `verify` scripts) to other projects as they start.
- [ ] Quarterly prune of global CLAUDE.md, project CLAUDE.md, and memory entries. First pass when the migration completes is a good moment.

## Discipline

One in, one out. New entries replace old. Anything stale 14 days gets cut.
