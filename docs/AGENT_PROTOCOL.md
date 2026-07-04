# Agent Protocol — lorin.work Portfolio

Standing operating rules for Claude on this project. These are binding — not preferences I follow when convenient. Lorin should not have to repeat any of them.

## Loop discipline

- **Read dev server output before asking "did that work?"** Use `Monitor` on the running Next dev server. Compile errors, runtime errors, and 404s show up there. Don't outsource error detection to Lorin.
- **Default to subagents for anything >3 searches.** Asset audits, "where is X used," cross-file consistency checks all go to `Explore`. Main context stays clean for design judgment, not file hunting.
- **Pipe-test scripts before wiring them in.** Hooks, build scripts, validation commands — synthesize the input, run the raw command, confirm exit code AND side effect. Never wire untested.

## Model routing

Delegated work gets the cheapest model that can do it *without the quality showing*. This governs subagents and workflow steps only — the main thread stays on Opus 4.8.

- **If the output has taste in it, it's Opus 4.8.** Layout, motion, copy/voice, design judgment, and every final/customer-facing pass never leave Opus — regardless of what built the draft.
- **If it fetches, moves, scans, or locates, it's Haiku 4.5.** grep/glob sweeps, file moves, Cloudinary export bookkeeping, curly-quote and typo scans, token/CSS audits, `Explore` readers whose job is *locate*, not *judge*.
- **Downroute only behind a cheap check.** Haiku is safe when the result is mechanically verifiable (file moved, exports present, audit returns a clean list) or flows straight back to Opus for the judgment call. No cheap check → keep it on Opus.
- **Sonnet 5 for research deep-reads only** — reading many sources to pull facts, with synthesis returning to Opus. Rare on this project.
- **Fable 5 stays off.** It's a 2×-price autonomous-engineering model; nothing here needs it, and it is worse at Lorin's voice than Opus.

The reasoning behind "efficiency on principle": the trivial substrate visibly goes to a lighter worker; nothing Lorin would notice ever drops below the bar.

## Handoff discipline

- **Targeted taste callouts, not "let me know what you think."** Every handoff names the element and the question. Bad: "Scene 4 ready, thoughts?" Good: "Scene 4: watch fragments 2→3 transition. Question: does the held beat feel right or rushed?"
- **Batch taste passes.** Build several scenes / changes, then one consolidated handoff. Not three small interruptions for three small things.
- **Open-questions ledger.** Maintain a running list of things needed from Lorin (copy stand-ins, decisions, asset confirms). Surface in batches at handoff, not as one-off pings.
- **Auto-run `review` skill before any "ready for your eyes" handoff.** Structural pass complete = handoff. Don't make Lorin discover obvious mistakes.

## Build hygiene

- **Hooks (auto, in `.claude/hooks/`)** enforce these without me thinking about them:
  - `check-tokens.sh` — flags deprecated V1 tokens in component CSS
  - `voice-lint.sh` — flags AI vocab in any Markdown
  - `lint-component.sh` — runs ESLint on changed JS/JSX/TSX
- **Don't run `npm run build` while the dev server is up.** Dev server stays up; rely on its compile output for verification.
- **Visual regression baseline = greybox commit.** After Phase 0 lands, generate baselines (`npm run test:update`). Subsequent diffs auto-detected.

## Tools I should use without being asked

- **`check-tokens` skill** after styling changes (until full migration is done)
- **`debug` skill** when something breaks instead of guessing
- **`review` skill** as the gate before handoff
- **`challenge` skill** before any Tier 2/3 change
- **Figma MCP** when Lorin references Figma designs or shares figma.com URLs
- **Playwright MCP** for structural audits (page loads, no console errors, no overflow at 1440/768/400, axe scan)

## What stays Lorin's

- Motion taste, type taste, color taste, "does this feel like the reference register"
- Voice — never paraphrase her writing; flag for her to rewrite
- Architecture / content hierarchy / page structure decisions (Tier 3 — discuss before anything)
