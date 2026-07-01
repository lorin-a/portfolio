# Upskilling Research — AI-Assisted Build Craft (2026)

**Date:** 2026-06-30. **Why this exists:** a session to push Lorin's vibecode / prompt-engineering workflow to the top decile — higher-craft, less-generic apps, faster alignment. Five parallel research agents swept the live web (Anthropic docs/engineering, Vercel/Next docs, Codrops/GSAP ecosystem, design-engineering practitioners, spec-driven-dev community). This file is the durable capture so the findings survive compaction; the *tooling changes* built from it live in `~/.claude/CLAUDE.md → The Intake Gate` and the next-moves menu (see end).

**How to read this:** each part is a standalone brief. The through-lines: (1) *context is the scarce resource* — spend it deliberately; (2) *front-load alignment* — surface disagreement before code; (3) *encode taste, don't re-explain it* — put it where the agent reads it every time; (4) *restraint is the thing no agent gives you for free.*

---

## Part 1 — Claude Code mastery (power-user tier)

Organizing principle: **the context window is the scarce resource; performance degrades as it fills ("context rot," the "dumb zone" past ~60–70%). Nearly every top technique is context economy.**

**Highest-leverage techniques**
1. **Close the verification loop for the agent, not yourself.** Give Claude a check it runs unattended — tests, build exit code, linter, or a screenshot diffed against a design — and tell it to iterate until it passes. Anthropic's single most-emphasized practice. *(Official)*
2. **Escalate the gate as autonomy rises:** inline "run the tests and iterate" → `/goal` condition (evaluator re-checks each turn) → a **Stop hook** that blocks the turn ending until a script passes. Demand evidence, not claims of success. *(Official)*
3. **Explore → Plan → Implement → Commit as distinct phases.** Plan mode (`Shift+Tab` twice / `/plan`) forces read-only research + written plan before edits; `Ctrl+G` opens the plan to hand-edit. Skip only when "you could describe the diff in one sentence." Highest-ROI pattern against "confidently builds the wrong thing." *(Official)*
4. **Treat CLAUDE.md like code; keep it ruthlessly short (~80–300 lines).** The model reliably follows ~150–200 instructions and the system prompt eats ~50; a bloated file makes Claude *ignore* real rules. Litmus per line: "would removing this cause a mistake?" Reference file paths + example patterns instead of pasting code; don't restate what the linter enforces. *(Official + community)*
5. **Move sometimes-relevant knowledge out of CLAUDE.md into Skills.** CLAUDE.md loads every session; a `SKILL.md` loads on demand (or via `/skill-name`). Officially recommended way to add domain workflows without bloating every conversation. `disable-model-invocation: true` for manual-only side-effectful workflows. *(Official)*
6. **Use subagents as context firewalls.** "Use subagents to investigate X" — they read many files in a *separate* context and return a condensed ~1–2k-token summary, keeping the main window clean. Define reusable ones in `.claude/agents/` with scoped `tools:` and their own `model:`. *(Official)*
7. **Add an adversarial review step in a fresh context before "done."** A reviewer subagent sees only the diff + criteria, not the reasoning that produced it. Run `/code-review`, or check the diff against `PLAN.md`. Critically: constrain it to *correctness / requirement gaps* — a reviewer asked for gaps invents them, driving over-engineering. *(Official)*
8. **`/clear` between unrelated tasks; after two failed corrections, `/clear` and rewrite the prompt.** A clean session + better prompt beats a long polluted one. Counters the two top failure modes (kitchen-sink session, correcting in circles). *(Official)*
9. **Compact proactively (~60% fill) and steer it.** `/compact <instructions>` focuses the summary; add a CLAUDE.md rule to always preserve modified files + test commands. `Esc Esc` / `/rewind` for partial compaction; `/btw` answers side questions in an overlay that never enters history. *(Official + community)*
10. **Let Claude interview you into a spec, then execute in a fresh session.** "Interview me in detail using AskUserQuestion… then write a complete spec to SPEC.md." Good specs name files/interfaces, state what's out of scope, end with an end-to-end verification step. *(Official)*
11. **TDD is the strongest agentic pattern.** Write tests first, confirm they fail, commit the failing tests, implement until green. Each red→green cycle is feedback the agent can't fake. *(Official + community, "single strongest pattern")*
12. **Prompt with specificity: scope the file, name the pattern, describe symptom + fix criteria.** "Use HotDogWidget.php as the pattern, build X without new libraries" beats "add a widget." Reference files with `@`, paste screenshots/images directly, give allowlisted doc URLs, pipe data (`cat error.log | claude`). *(Official)*
13. **Thinking-budget ladder:** `think < think hard < think harder < ultrathink` escalate reasoning for that turn only; or `/effort high` for the session. As of v2.1.68 `ultrathink` triggers an effort level (the old "31,999 tokens" figure is dead). Reserve for hard planning/debugging. *(Community; mechanics official)*
14. **Prefer CLI tools + `gh` over ad-hoc API/heavy MCP.** Most context-efficient way to hit external services; `gh` avoids unauthenticated rate limits. Claude learns unknown CLIs via `tool --help`. *(Official)*
15. **Scale horizontally once single-session is solid:** git **worktrees** for parallel isolated sessions; **Writer/Reviewer** two-session pattern (fresh reviewer less biased); **fan-out** via `claude -p "…" --allowedTools` in a loop for migrations (test on 2–3 files first); **auto mode** (`--permission-mode auto`, classifier blocks risky actions) for unattended runs. **Agent Teams** + **Workflows** for coordinated / deterministic control flow. *(Official)*

**Permissions & hooks:** reduction ladder = `/permissions` allowlists → auto-mode classifier → `/sandbox` OS isolation (deny rules always win). **Hooks are deterministic; CLAUDE.md is advisory** — use hooks for must-happen-every-time (PreToolUse veto, PostToolUse format/typecheck, Stop gate completion).

**Context engineering (the 2026 frame):** prompt engineering = one good instruction; context engineering = curating the optimal *set of tokens* across a loop. Core moves: minimal high-signal system prompts (headers/XML; "minimal ≠ short"); **just-in-time retrieval** (hold file paths, fetch on demand); **canonical examples over exhaustive rules**; **tool-result clearing**; **structured note-taking** (NOTES.md outside the window); **sub-agent isolation.**

**Common mistakes (mid-tier → top-decile):** bloated CLAUDE.md; kitchen-sink session; correcting in circles; trust-then-verify gap; unscoped "investigate"; *over*-specified prompts (excess detail measurably hurts — specify constraints + references, not everything); chasing every reviewer finding (over-engineering); restating what tooling enforces.

**Sources:** code.claude.com/docs/en/best-practices · anthropic.com/engineering/effective-context-engineering-for-ai-agents · platform.claude.com/cookbook (context-engineering-tools) · anthropic.com/engineering/effective-harnesses-for-long-running-agents · anthropic.com/engineering/claude-code-auto-mode · code.claude.com/docs/en/skills · code.claude.com/docs/en/permission-modes · docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices · github.com/hesreallyhim/awesome-claude-code · shipyard.build/blog/claude-code-multi-agent · claudefa.st/blog/guide/agents/sub-agent-best-practices · orchestrator.dev (claude-code-agent-memory-2026) · datacamp.com/tutorial/claude-code-best-practices · kentgigger.com/posts/claude-code-thinking-triggers · decodeclaude.com/ultrathink-deprecated

---

## Part 2 — Encoding design taste into specs (anti-slop)

**Why AI UI looks generic + the counter for each cause**
- **Token averaging, not choosing** — when uncertain the model reaches for `indigo-600`, `slate-900`, `rounded-2xl shadow-lg p-6`. → Override defaults at the *token* layer so its "safe" reach lands on *your* values.
- **The shadcn/Tailwind default fingerprint** (slate neutrals, Inter default sizing, uniform 8px radius, 1px slate-200 borders, DataTable/Dialog straight from docs). → Maintain an explicit anti-pattern list; customize tokens *before* generating.
- **Vague briefs invite the mean** ("clean and modern" → statistical center). → Specify platform, user, one primary action, named style, hex, type scale, spacing, references.
- **Component-first customization is backwards** (tuning 12 components inside a default-feeling kit). → Tokens first; one edit propagates everywhere.
- **No signature element.** → Add one token shadcn doesn't ship (grain, multi-layer shadow, custom easing, negative letter-spacing) — the project's fingerprint.
- **Agent drift across a session** (each new component re-reaches for defaults). → Point CLAUDE.md at a durable `design.md` so decisions are read, not re-guessed.
- **One-shot expectation** (first gen = the mean; craft lives in iteration). → generate → screenshot → critique → revise.

**Reusable techniques**
1. **Tokens-first override** — redefine neutrals (drop slate/zinc), radius (`0` / `1rem` / `999px`, not safe `0.5rem`), fonts, one saturated accent as CSS vars; every generated component inherits *your* values.
2. **Add a signature token the library doesn't ship** — one named grain/shadow/easing/letter-spacing decision applied everywhere.
3. **Split the spec by concern:** tokens in `design.md` + CSS vars; component conventions + do-nots in `CLAUDE.md`. *(Lorin already does this: `DESIGN_SPEC.md` = tokens, `CLAUDE.md` = conventions.)*
4. **Reserve, don't spread, color** — one accent for active states + primary CTA; secondary actions use *absence of color*.
5. **Anchor with named references — "in the style of X"** (Linear, Apple Environment, Visual Cinnamon, Savor). Strong priors for named systems.
6. **Kill vague adjectives; use named design languages** (editorial, brutalist) + hex + type scale + spacing system.
7. **Ship an explicit anti-pattern list** — reject: purple/indigo gradients, identical card grids, centered hero+3-cards, bounce easing, glow, uniform radius, emoji icons, bento abuse, generic CTAs. (UI Craft codifies 33 such rules.)
8. **Multishot / reference examples** (Anthropic guidance) — 3–5 concrete examples in `<example>` tags; vary them so the model doesn't overfit.
9. **Component contract with a state lattice** — specify idle/loading/empty/error/partial *before* the happy path.
10. **Demand realistic content, never placeholder** — real names/amounts/Lorin-voice strings; fake content masks hierarchy problems.
11. **A "finish bar" checklist the agent self-runs before done** — hierarchy, type, surface stack, spacing rhythm, iconography, states, motion, microcopy, pixel honesty, data formatting. *(≈ Lorin's `/impeccable layout` + design-review.)*
12. **Screenshot feedback loop = the core craft engine** — render + capture full-page/component/device, critique against the reference. *(Lorin's Playwright `design-review` already does this — make it mandatory per UI feature.)*
13. **Critique with concrete defects, not vibes** — "H2 competes with H1, sidebar misaligned" + DOM/console signals → one incremental fix → re-screenshot.
14. **Translate a reference faithfully without copying** — feed the image, ask the agent to *extract* its system (grid, type ratio, spacing, color relationships, motion grammar) into tokens, rebuild from *your* tokens.
15. **Numeric taste knobs** — expose 1–10 dials (craft level, motion intensity, density) for a consistent register across a project.

**Named frameworks/repos:** **UI Craft** (`educlopez/ui-craft`) — Claude Code skill/plugin: 31 references, 22 slash-commands (`/brief` `/craft` `/critique` `/finalize` `/polish` `/unhappy`), anti-slop MCP scanner (33 rules), `tokens_lint`, deterministic UICraftScore, read-only `design-reviewer` + `a11y-auditor` agents — `npx skills add educlopez/ui-craft`. · **DESIGN.md pattern** (designmd.directory) — canonical token handoff format (Lorin's `DESIGN_SPEC.md` is one). · `albertzhangz10/design-system-skill` — generates design.md from reference images. · **Finish Bar (10-pass) + State Lattice + 3-layer token spine** (primitive→semantic→component).

**Bottom line for Lorin:** already doing the highest-leverage moves (tokenized spec, conventions in CLAUDE.md, named reference bar, Playwright review loop, voice/motion audits). Gaps to close: (1) explicit **anti-slop visual-cliché list** in CLAUDE.md; (2) a formal **signature-token** statement; (3) UI Craft's **finish-bar + state-lattice** as a self-run pre-ship check; (4) make the **screenshot-critique loop mandatory** per UI feature.

**Sources:** freedesignmd.com/blog/shadcn-looks-generic · github.com/educlopez/ui-craft · gendesigns.ai/blog/ai-generated-ui-mistakes-how-to-fix · tweag.github.io/agentic-coding-handbook/WORKFLOW_VISUAL_FEEDBACK · platform.claude.com/docs (claude-prompting-best-practices) · designmd.directory/guides/design-md-for-shadcn · dev.to/promptmaster (wire DESIGN.md into Claude Code) · github.com/albertzhangz10/design-system-skill · mindstudio.ai/blog/iterative-refinement-loop-claude-design-multimodal · medium.com/@rotbart (round-trip screenshot testing) · skills.smoothui.dev · alexlavaee.me/blog/lessons-learned-designing-with-ai

---

## Part 3 — Elite interactive frontend + motion

Through-line: **cinematic scroll choreography over WebGL, with hard performance discipline (transform/opacity only, compositor thread) and restraint.** WebGPU hit cross-browser support Jan 2026 but WebGL/Three.js remains the pragmatic default, WebGPU as progressive enhancement. **You are one or two tiers of *choreography* away from the Apple/Linear/Visual-Cinnamon bar on your existing GSAP stack — not tech away.**

**Prioritized learning path (designer-developer)**
1. **GSAP core + ScrollTrigger (deepen).** Timelines-with-position-parameters, `ScrollTrigger.refresh()` after layout/image load, pin vs no-pin, scrub tradeoffs. The differentiator is timeline *authorship*, not tech. *Highest craft-per-hour.*
2. **Lenis smooth scroll.** The near-universal substrate under award sites; drive GSAP's ticker from Lenis so scroll/animation/render share one clock. *Cheapest upgrade to "premium feel." (Don't instantiate under reduced-motion.)*
3. **GSAP plugin fluency: SplitText, Flip, Observer.** SplitText = line/word/char staggers; Flip = "impossible" layout-change animation; Observer = unify wheel/touch/pointer into section-snapping. *~80% of "how did they do that" without WebGL.*
4. **Native CSS scroll-driven animations (`view-timeline`/`scroll-timeline`) + View Transitions API.** ~87% desktop / ~71% mobile support. `view()` reveals never touch the main thread — offload the cheap 80% here, reserve GSAP for sequencing/pinning/runtime control. View Transitions for Next route/state morphs. *Free performance.*
5. **Canvas 2D + the shader mindset (GLSL literacy).** Think in fragment shaders (per-pixel function: uv, time, noise). One custom shader (grain, scroll-velocity displacement, gradient mesh) reads as craft. *Visual-Cinnamon-tier is often SVG/Canvas + one clever shader, not a 3D scene.*
6. **Three.js → React Three Fiber (+ drei, postprocessing).** Only once motion is second nature. Cap DPR at 2, decouple GSAP state from the render loop. *The ceiling, not the entry ticket; easiest place to build something impressive that fails the taste/perf bar.*
7. **Optional accents:** custom cursors (sparingly), matter.js physics (rarely load-bearing), SVG filters (`feTurbulence`/`feDisplacementMap`), WebGPU/TSL as an enhancement layer. **Skip-for-now honestly:** physics engines + heavy 3D are where portfolios over-invest.

**Craft techniques**
1. **Timeline-as-shot-list** — `scenePerspectives` array (camera/scroll-range/text) mapped to explicit scroll segments; one master timeline, `duration: end - start` per beat.
2. **Held beats** — silent segments (`.to({}, {duration: 0.5})`) between entrance and exit. Absence is the #1 tell of amateur scrollytelling.
3. **Text-first ordering** — reveal words, then the graphic behind them. *(Lorin's `revealClaim`.)*
4. **SplitText staggers with fade envelopes** — ~0.02s/char, wrapped fade-in→stagger→hold→fade-out so each block reads as a chapter.
5. **Fixed canvas + scrolling DOM overlay** — pin visual layer (z-0), float UI (z-10) + scroll content (z-20). GPU does spectacle, DOM does crisp type.
6. **Scrub calibration as rhythm** — `scrub: true` = tight; `0.4–0.5` = smoothed ease. *(Lorin's project deliberately avoids scrub reveals — applies to intentional cinematic canvas moments only.)*
7. **Momentum/inertia** — `momentum = momentum*0.92 + velocity*0.15` into opacity/displacement = organic follow-through without a physics engine.
8. **Velocity-reactive shaders** — feed scroll velocity into a fragment shader (displacement/blur/trail). Motion that *responds* to scroll speed = signature elite move.
9. **Flip for "impossible" layout transitions** — interpolate first/last DOM positions; bespoke-looking, declarative.
10. **Custom eases as brand** — `CustomEase.create("cinematicSilk", …)`; snappy takeoff + very soft landing + slightly longer duration so it settles. A house ease = fingerprint.
11. **`quickSetter`/`quickTo`** for high-frequency updates (cursor, progress) — bypass overhead, avoid reflow.
12. **Transform + opacity ONLY.** Never `left/top/width/height`. The single hard line between 60fps and jank.
13. **DPR cap + conditional postprocessing** — `dpr={Math.min(devicePixelRatio, 2)}`; drop bloom/particles on low-end. Degrade, don't ship one heavy scene to everyone.
14. **Texture atlas + UV scrolling** for seamless infinite loops.
15. **Orchestrated entrances (40–120ms cascades), not simultaneous mounts.** Chaotic simultaneous reveals = amateur signature.

**References to study:** Apple environmental pages (*restraint + spatial continuity*, scroll-to-3D-camera coupling, how little moves at once) · Linear (*premium product motion*, subtle/fast/purposeful, "expensive but calm") · Nadieh Bremer / Visual Cinnamon (*elite ≠ heavy 3D*; SVG+Canvas+occasional Three/GSAP, dependency-light) · Active Theory (immersive WebGL as brand) · Resn (art-direction consistency) · Codrops/tympanus (the working codebook) · Three.js Journey (Bruno Simon) + Wawa Sensei (R3F, "reproduce an Awwwards site").

**Prompting an agent for interaction work:** **install GreenSock's official GSAP AI skills** (`github.com/greensock/gsap-skills`) — teaches agents correct 2026 GSAP/ScrollTrigger/React and fixes the failure modes below. Then specify: perf contract ("transform/opacity only, `autoAlpha`"); React lifecycle contract ("`useGSAP`, scope selectors to a ref, `gsap.context()` cleanup"); `ScrollTrigger.refresh()` after images/layout; the **shot-list not the vibe** (scroll ranges, beat order text-first, durations, named ease, held beats); pin project conventions (paused-timeline + IntersectionObserver play-once, the 3-ease system, `useStickyReveal`/`revealClaim`).

**Agent failure modes:** animating layout props → jank; stale "GSAP is paid" reasoning that avoids free SplitText/Flip; ScrollTrigger init before layout stable / no `refresh()`; missing scope/cleanup → leaks + StrictMode double-init; over-building (bloom+particles+physics when a `view-timeline` reveal was right — won't self-impose restraint); uncapped DPR, no reduced-motion branch (content that only appears via animation becomes invisible).

**Sources:** tympanus.net/codrops (cinematic 3D scroll GSAP, Nov 2025; infinite scroll GSAP+Lenis, May 2026; scroll-revealed WebGL gallery, Feb 2026; Shader.se WebGPU pipeline, May 2026) · github.com/greensock/gsap-skills · medium.com "Your AI Coding Agent Writes Janky GSAP Code" · dev.to/kolonatalie (60fps GSAP+WebGL) · MDN scroll-driven-animations + View-Transition-API · joshwcomeau.com/animation/scroll-driven-animations · artofstyleframe.com/blog/web-animation-css-vs-gsap-2026 · wawasensei.dev (reproduce Atmos Awwwards R3F) · threejs-journey.com · visualcinnamon.com/about · byteiota.com/webgpu-2026

---

## Part 4 — Backend & app architecture (2026 reality)

Reflects 2026 platform changes: Edge Functions deprecated → **Fluid Compute**; Vercel Postgres/KV → **Marketplace** (Neon/Upstash); **AI SDK 6**; **Cache Components** (PPR default).

**Recommended pragmatic solo stack:** **Neon Postgres** (Marketplace; serverless, per-branch DBs matched to preview deploys, auto env vars) · **Drizzle ORM** (TS-first, one schema source, readable SQL, fast cold starts; `drizzle-kit` migrations; Prisma only if inherited) · **Zod + `drizzle-zod`** (runtime contract at every boundary; `createInsertSchema`/`createSelectSchema` keep DB + validation + types in sync) · **Clerk** (Marketplace-native, fastest path; **Better Auth**/Auth.js if you want to own the tables) · **Upstash Redis** + `@upstash/ratelimit` · **Cloudinary** (media transforms, already in stack) + **Vercel Blob** (plain file storage) · **AI SDK 6 + Vercel AI Gateway** (one key, failover, unified spend) · **Vercel Functions, Node runtime, Fluid Compute** · **Sentry** (server+client+edge). **Skip:** Edge as default, tRPC (Server Actions + Zod cover solo needs), a separate backend service until you need cross-client APIs, self-hosting auth from scratch, GraphQL, K8s/Docker.

**Architecture/quality techniques**
1. **Server Components by default; push `"use client"` to the leaves.** Fetch in Server Components; only interactive bits are client.
2. **Mutations = Server Actions with Zod at the top of every action.** Parse untrusted input before it touches the DB; `ZodError` gives the exact field path. TS vanishes at runtime — validate the boundary.
3. **Authorize inside every Server Action + a `server-only` Data Access Layer.** Don't rely on middleware/layout/page checks alone.
4. **Adopt Cache Components (`cacheComponents: true`).** Dynamic by default; opt *into* caching with `use cache` at page/component/function level.
5. **Tune with `cacheLife` + `cacheTag`;** `updateTag` for read-your-own-writes, `revalidateTag` for SWR background refresh.
6. **Cached scopes can't read `cookies()`/`headers()`/`searchParams`** — read runtime values outside and pass as args; wrap dynamic reads in `<Suspense>`.
7. **Route Handlers only for Client Components / external consumers** — don't call one from a Server Component; fetch directly.
8. **Stream with `loading.tsx` + Suspense; fetch in parallel** to kill waterfalls.
9. **Migrations are code — commit them** (`drizzle-kit generate` + `migrate`); Neon branch DBs run migrations per preview deploy.
10. **One schema, many outputs** — schema first, generate Drizzle types + Zod validators so DB/API/forms can't drift.
11. **Rate-limit the expensive/abusable paths** (login, signup, reset, contact, paid-API/LLM calls) with `@upstash/ratelimit`. Single highest-impact security decision.
12. **Loading/empty/error as first-class UI** — `app/global-error.tsx`, `app/global-not-found.tsx`; "no data yet" and "it failed" are designed screens.
13. **AI SDK 6:** `ToolLoopAgent` for reusable agents, `streamText`/`generateText` for one-offs; bound loops with `stopWhen: stepCountIs(n)`; gate risky tools with `needsApproval`.
14. **Structured LLM output via `Output.object()`/`Output.array()`** + Zod; validate model output like user input (model upgrades silently change JSON shape).
15. **Route all LLM traffic through AI Gateway** with a `models` fallback array → provider outage becomes failover, not a 500.

**Production-readiness checklist (designers skip):** `.env.*` gitignored, only public vars get `NEXT_PUBLIC_`, `vercel env pull`; auth on the action not the page (re-check per row); rate limits on auth/forms/paid calls; custom `error.tsx`/`global-error.tsx`/`not-found.tsx` + Sentry (prod strips server errors); designed loading/empty/error states + Suspense skeletons; Zod at every untrusted entry (forms, route handlers, webhooks, LLM output); security headers + CSP, `taint` APIs, keep Next patched (CVSS-10 RSC bug + DoS CVE late-2025/early-2026); DB constraints + indexes in the schema, transactions for multi-step writes; Sentry + `useReportWebVitals` + bundle analyzer; run `next build` locally before deploy.

**Prompting an agent for solid backend:** give it the **schema explicitly** (or point at the Drizzle file as source of truth); the **validation contract** ("Zod at the action boundary; reject with typed errors; never trust client data"); the **edge cases up front** — the three negative paths agents skip: malformed input, ambiguous/empty results, downstream failure (DB timeout, LLM/provider outage); **test requirements** ("unit tests for every path including failures; assert against the Zod schema"); **non-functionals** (auth/authorization per action, transactions, rate limits, idempotency for double-submittable actions). **Practical loop:** agent writes schema + Zod validators first → your eyes on that contract → *then* it implements handlers + tests.

**Agent failure modes:** "plausible code" with latent edge-case flaws (review the *error paths*); guessed contracts (pin with a shared Zod schema imported by both sides); missing **authorization** (checks auth-N, skips auth-Z per record); silent data loss / unhandled nulls / unsafe coercion; no transactions → partial writes; unbounded LLM loops + no rate limiting.

**Sources:** vercel.com/blog/ai-sdk-6 · vercel.com/ai-gateway (+ model-fallbacks docs) · vercel.com/docs/fluid-compute · vercel.com/docs (edge deprecation) · vercel.com/blog/introducing-the-vercel-marketplace · vercel.com/docs/marketplace-storage · nextjs.org/docs/app/guides/production-checklist · nextjs.org/docs (cacheComponents, use-cache, mutating-data) · orm.drizzle.team/docs/tutorials/drizzle-nextjs-neon · tech-insider.org/drizzle-orm-tutorial-2026 · neon.com/guides/neon-auth-nextjs · upstash.com (@upstash/ratelimit) · blog.sentry.io/next-js-observability-gaps · authgear.com/post/nextjs-security-best-practices · augmentcode.com/guides/why-ai-coding-agents-fail-e2e-tests

---

## Part 5 — Collapsing the align→execute loop

Consensus across Anthropic's docs and the best practitioners: **the cheapest tokens and highest-value minutes are the ones spent before any code is written.** Every correction round after implementation costs more than the alignment work that would have prevented it.

**Front-load alignment (kill disagreement before code exists)**
1. **Make the agent interview *you*, one question at a time** — "I want to build X, interview me" → it asks about implementation/UX/edge cases/tradeoffs until nothing's ambiguous → it writes the spec. (Claude Code: `AskUserQuestion`.) Converts fuzzy intent to explicit spec *without you knowing the questions up front* — the designer's alignment gap, solved. **This is the single highest-yield move; it's what the Intake Gate automates.**
2. **Plan mode for anything touching >1 file.** Explore → Plan → Implement → Commit; read + edit the plan (Ctrl+G) before a line ships. Skip only if you could describe the diff in one sentence.
3. **"Explain the plan back / list the files + interfaces you'll touch."** Reviewing a plan is seconds; reviewing 200 lines of wrong code is minutes + a re-run. The plan is where you catch "solving the wrong problem."
4. **Write the spec to a file, execute in a *fresh* session** — clean context, durable re-runnable artifact. (Harper Reed: brainstorm-spec → `prompt_plan.md` + `todo.md` → execute.)

**One-shot / high-yield prompting**
5. **Show, don't describe** — paste a screenshot/mockup/reference and "build this + screenshot your result and list the differences." "Make it look better" guarantees a multi-round loop. *For a designer this is the whole game.*
6. **Constraints, not vibes** — target file, scenario, what "done" looks like, what's out of scope, "no new libraries."
7. **Point at an existing pattern to copy** — "follow `Foo.jsx`" / "match the Whelm primitives / LensClaim pattern." Fastest way to transmit taste without a style essay.
8. **You're the architect; the agent implements** — hand it function signatures / component contracts with names + types. More skeleton = less wrong guessing.

**Tight loops when iteration IS needed**
9. **Give the agent a check it can run** (test/build/lint/screenshot-vs-design) so the loop closes without you being the verification step.
10. **Wire a visual feedback loop (Playwright)** — agent renders, screenshots, compares to design/criteria, lists diffs, fixes. Self-corrects the "buries the button, overlaps the header, feels broken" class. *Highest-fidelity alignment channel for a motion/type portfolio.*
11. **Concrete defects + fix target** — "increase max-width to Xch, the label wraps," not "too narrow."
12. **Adversarial review in fresh context before done** — subagent sees only diff + criteria; constrain to correctness/requirement gaps.
13. **Two-strikes rule** — after correcting the same thing twice, `/clear` + rewrite (or `/rewind` to last good checkpoint). Polluted context keeps failing.

**Reusable assets that compound**
14. **CLAUDE.md = always-loaded alignment layer, kept ruthlessly short** — only non-inferable, mistake-preventing lines. Discipline is pruning, not adding.
15. **Skills / slash-commands for sometimes-relevant knowledge** — package taste/brand/motion grammar into on-demand `SKILL.md`; a **`design.md`** is the designer-specific version. The system that gets faster over time.
16. **A personal spec/prompt library** — save the interview prompt, spec-compile prompt, screenshot-diff prompt, and past specs as templates; a taste profile (confirmed prefs, soft patterns, rejected anti-patterns) so each project starts from what the system already knows about you.

**The first-try-correct prompt (checklist):** goal in one line · a visual/code exemplar · named scope + explicit out-of-scope · constraints as hard rules (tokens/fonts/easing, no new libs, curly quotes, no em dashes, reduced-motion, 44px) · acceptance criteria · a verification instruction · "plan first, don't code yet." Skeleton: *"Goal: [one line]. Match this: [screenshot / `ExampleFile`]. Touch only [files]; don't change [out of scope]. Constraints: [tokens, fonts, no new libs, a11y]. Done = [criteria]. Plan it first and show me before coding. After implementing, [screenshot/build], verify against criteria, list diffs, fix."*

**Rework triggers → counter:** codes before agreeing what → plan mode + interview-me · vague adjectives → constraints + reference image · taste in prose → point to a pattern / `design.md` · no self-check → runnable check · "feels off" in words → screenshot loop · same correction twice → `/clear` + rewrite · context bloat → `/clear` + subagents for research · long CLAUDE.md → prune · writer grades own work → fresh-context review.

**Named tools:** **GitHub Spec Kit** (`github/spec-kit`, most agent-agnostic SDD) · **AWS Kiro** (spec-native IDE, EARS-notation `requirements.md` + `design.md` + `tasks.md`) · BMAD-METHOD / OpenSpec / Tessl / Google Antigravity (SDD landscape) · **Playwright MCP** (browser eyes) · Claude Code native: plan mode, `AskUserQuestion`, `/goal`, Stop hooks, `/code-review`, `/rewind`, subagents, skills · **repomix** (pack repo for planning) · **design.md** convention.

**Bottom line for Lorin's pain:** fastest levers are (1) agent interviews her into a written spec before any code *(= the Intake Gate)*, (2) always a reference image or exemplar file instead of adjectives, (3) a Playwright screenshot loop so the agent self-corrects against what it sees. The compounding layer: turn recurring taste into skills / `design.md` so alignment is done once, not re-litigated.

**Sources:** code.claude.com/docs/en/best-practices · harper.blog/2025/02/16/my-llm-codegen-workflow-atm · simonwillison.net/2025/Jun/29/agentic-coding · github.com/github/spec-kit · martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html · github.blog (spec-driven-development toolkit) · medium.com/@rotbart (screenshot testing) · tweag.github.io/agentic-coding-handbook/WORKFLOW_VISUAL_FEEDBACK · builder.io/blog/playwright-mcp-server-claude-code · designproject.io/blog/design-md-file · chriskobar.medium.com (designer's field guide) · lushbinary.com/blog/loop-engineering · resources.anthropic.com (2026 Agentic Coding Trends Report) · blog.x-way.org/Coding/2025/07/04/Agentic-Coding.html

---

## Part 6 — The cost of over-tooling (the restraint brief)

The vendor-neutral evidence converges hard on restraint; more configuration is a tax, not a feature, and it degrades the exact creativity Lorin cares about.

**Findings**
1. **Instruction-following degrades measurably and non-linearly.** IFScale benchmark (arxiv 2507.11538): ~94–100% adherence at ~10 instructions, dropping to ~68% at 500 even for frontier models. More rules make *every* rule less likely to be followed.
2. **Claude shows near-linear decay** — roughly double the instructions, roughly halve reliability on any one; frontier models start shedding rules around 150–200.
3. **Under load models OMIT, not approximate** — whole rules silently vanish (one model at 35:1 omit-to-modify) and you can't tell which.
4. **Primacy bias kills middle rules first** ("lost in the middle") — long docs recall their middle least.
5. **CLAUDE.md instructions followed ~70% at best** — treated as a ceiling; adding rules to fix a missed rule makes the whole set worse.
6. **Line thresholds practitioners report:** rule-dropping past ~80 lines, large blocks ignored past ~200, collapse past ~500 words. Common landing point: **keep ~20 critical rules max.**
7. **CLAUDE.md is a per-session tax** — loads every conversation, competes with the code for attention, and can get summarized "into oblivion" on compaction.
8. **Rules the model already follows are pure waste** ("write clear code"). Test each: "would removing this cause a mistake?"
9. **Over-instruction suppresses creative range — measured** (CS4, arxiv 2410.04197): output quality drops as constraint count rises; RLHF already pulls toward average, constraints deepen the safe-attractor basin. For a design portfolio, heavy scaffolding is anti-craft.
10. **Skills carry a permanent context tax whether or not they fire** (~500 tokens/10 skills of standing metadata).
11. **You can't control when a skill fires** — non-deterministic semantic activation; overlapping triggers misfire silently. Anthropic's own tracker has a request to *disable* auto-triggering.
12. **A skill is often worse than a good prompt or an explicit slash command** — slash commands are deterministic; prefer them when predictability matters.
13. **Hooks live in the hot path and stack latency** — >100ms is noticeable; a documented 11-hook setup turned 4.8s → 18.2s per interaction.
14. **Blocking hooks can trap the agent in loops** — need explicit exit conditions + `stop_hook_active` guard, not aspirational goals.
15. **Multi-agent fan-out degraded performance in every tested config** (−4.4% to −35.3% vs single-agent baseline); ~15× token cost; context-reconstruction loss at every handoff. Pays off only when subtasks need minimal shared context and combine cleanly — rare in iterative design work.
16. **The primitive-selection machinery is itself overhead** — Claude Code later unified skills + slash commands to reduce this.
17. **MCP servers have the same standing-tax shape** — 3–6 active max; disable "just in case" servers.

**The "does this change earn its place?" audit checklist** (run before adopting any hook / skill / rule / subagent / MCP; fail any of the first four → don't add):
1. **Failure test** — name the specific repeated mistake it prevents. No cited failure → speculative → don't add.
2. **Default test** — does the model already do this? → cut.
3. **Cheaper-primitive test** — prompt < slash command < skill < hook < subagent, by standing cost. Use the lightest that works.
4. **Cost-of-carry test** — what does it cost *when not needed?* (rule = tokens/session; skill/MCP = metadata/session; hook = latency/call; subagent = coordination + handoff loss).
5. **Conflict test** — overlaps/contradicts something already there? One job, one clear trigger.
6. **Determinism test** — must it be guaranteed (safety/secrets/formatting/build)? → hook/code ("law"). Soft preference? → CLAUDE.md line ("request"); a hook is overkill.
7. **Creativity test** — does it constrain *how* (bad) or only *what quality bar* (fine)? Leave method open.
8. **A/B test** — same task with/without; can't feel the difference → remove.
9. **One-in-one-out** — name what it replaces.

**Symptoms of overkill:** CLAUDE.md >80–100 lines or rules you can't remember why; agent follows first/last rules, drops the middle; adding a rule to fix an ignored rule; output feels generic/on-rails/less surprising; sessions slow before work starts; skills misfiring or fighting over keywords; hesitating over which command/skill to use; a hook nagging on something you routinely override. **Remove first:** latency hooks that rarely catch → idle MCP/skills → overlapping-trigger skills → CLAUDE.md rules the model already follows, then prescriptive *how* rules → standing subagent orchestration → redundant docs.

**Verdicts on what was built here:**
- **(a) Always-on `UserPromptSubmit` hook injecting a fixed directive every prompt → DON'T.** Re-injecting the same text every turn burns tokens, reads as noise (attention dilutes, drift *increases*), and directive-style injected text can trip Claude's prompt-injection defenses so it surfaces the text instead of acting. Only defensible if injected *conditionally and surgically*. A non-negotiable belongs in a deterministic PreToolUse/PostToolUse hook that enforces the *outcome*; a soft preference belongs in one CLAUDE.md line.
- **(b) Clarifying-gate on literally every task → DON'T; gate only substantial/ambiguous.** A universal gate is friction theater: it adds round-trips on trivial tasks, trains dismissal so it loses force when it matters, and fights a "redirects faster than answers" working style. Trigger on scope/ambiguity/blast-radius signals; let small clear tasks run.

**Sources:** arxiv.org/abs/2507.11538 (IFScale — the load-bearing numbers) · anthropic.com/engineering/claude-code-best-practices · dev.to (200 lines of rules, ignored) · techsy.io/en/blog/claude-md-best-practices · mindstudio.ai/blog/context-rot-claude-code-skills-bloated-files · paddo.dev/blog/claude-skills-controllability-problem · github.com/anthropics/claude-code/issues/30355 · medium.com/@ivan.seleznov1 (skill activation study) · augmentedswe.com/p/guide-to-claude-code-hooks · github.com/ruvnet/ruflo/issues/1530 (11 hooks → 18.2s) · code.claude.com/docs/en/hooks · arxiv.org/html/2604.02460v1 (single vs multi-agent) · medium.com/@mjgmario (multi-agent degradation) · arxiv.org/pdf/2410.04197 (CS4 — constraints vs creativity)

---

## What this became (tooling built from this research)

- **Intake before substantial work** — a lean ~4-line rule in `~/.claude/CLAUDE.md`. Inverts who carries what: Claude fields everything knowable; Lorin supplies only the bar, the success test, and true unknowns. Fires only on substantial/ambiguous tasks; small clear tasks just run; method left open. **A maximal first build (an always-on `UserPromptSubmit` hook + an every-task modal gate) was cut the same session** once Part 6 research showed it was the exact over-tooling anti-pattern. That reversal is the proof-of-work for the audit discipline below.
- **Audit discipline (permanent)** — every proposed hook/skill/rule/subagent/MCP runs the Part 6 checklist before adoption; chiefly *name the specific repeated failure it prevents.* No cited failure → don't build.
- **Next-moves menu — PARKED, not planned.** Candidate encodings (anti-slop visual-cliché list, GSAP AI skills install, motion shot-list template, backend contract block, mandatory screenshot-critique loop, `/brief` spec-first skill) each stay unbuilt until a real project surfaces the failure it fixes. Building them pre-emptively is exactly the bloat Part 6 warns against.
