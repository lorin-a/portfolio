# Case Study Playbook — Architecture + Voice

**Purpose:** A persistent reference for building lorin.work case studies, so the
study below is not stuck in one chat. Covers two things Lorin weighs equally:
**architecture** (structure, sections, layout) and **voice** (copy, narrative,
register). Distilled from a study of seven case-study sites on 2026-06-24.

**How to use:** Read this before any case-study build or rewrite. The build
approach (Section 7) gives the working order. Groundswell is instance #1.

**Status:** Reference drafted 2026-06-24. Groundswell architecture is in good
shape; copy is the open work (still institutional "we"). Copy scaffold pending.

---

## 1. The core principle (read this first)

Lorin's signal challenge: she is **visionary, visual, strategic, AND
methodical**, and most portfolios force a choice. The reference that resolves
this (Ellen Covey) does NOT alternate a "vision" section with a "rigor" section.
It **fuses them in the same sentence**: it narrates a rigorous, methodical
process in a personal, specific, first-person voice.

> "In 2020, I hatched 6 Chinese painted quail chicks in my London flat.\* It was
> something I'd planned meticulously — perfecting the incubation, setting up
> ideal habitats, and even filling their water dishes with marbles so they
> couldn't fall in."

Personal hook + methodical detail, one breath. That is the whole trick:
- **Strategic / methodical** reads through: first-person ownership + concrete
  specificity + visible reasoning + named concepts.
- **Visionary / personal** reads through: a personal way-in + questions +
  warmth + evocatively named ideas.
- They are not separate sections. One voice does both.

---

## 2. The reference set

| Site | URL | What it teaches (architecture) | What it teaches (voice) |
|---|---|---|---|
| **Ellen Covey / The Beakery** ⭐ | ellencovey.com/the-beakery | Layered typographic hero (title behind mockups); left metadata column; research rendered as her own illustrated personas w/ Goals(green)/Frustrations(coral); left chapter-tick nav | **The model.** First-person narrative + rigor + warmth; questions as section openers; named methods; concrete specifics; footnotes |
| **Ellen Covey / home** | ellencovey.com | Per-project **positioning tags** naming each piece's strength; one accent color per project; layered photo-over-name hero; charming microcopy | "Written by a human who likes em dashes" — personality in the colophon |
| **Sanvi / Explora** | sanvithi.com/explora | At-a-glance overview block w/ big impact stats ($1.2M · 100% · 9→1); named design decisions ("The Split-Workspace Grid"); narrow editorial column | Restrained/strategic; named problem/solution/result ("Digital Chaos"); quantified everything; first-person ownership |
| **Adam Hickey / SAP** | adamhickey.com/case-study/sap-product-maturity.html | Sticky top chapter nav; **numbered phase spine** (1→4); artifact cards w/ labeled sub-lists (Focus areas / Highlights / Benefits); impact **table** (Dimension \| Outcome) | Consultant-clean; thesis-statement cards; can read corporate — borrow clarity, not tone |
| **Amy La / Untitled Lyrics** | amylalai.com/untitledlyrics-fromhome | Left sticky section nav (TL;DR · Problem · Research · Solution · Learnings); big serif statement openers; step walkthroughs w/ device mockups | Calm, clear, product-walkthrough voice |
| **Chaachie / Restore** | chaachiedesigns.framer.website/newrestore | Brand-forward repeated-wordmark hero; dark + green + coral color-blocking; staged conversational sections | **Personality extreme.** Statement-headers the body completes ("Reading sucks." → "At least that's what I thought."). Too flip for Lorin's register; device is borrowable in moderation |
| **Rachel Chen / OpenAI** | rachelchen.tech/projects/openai | Left sticky chapter nav (thorough list); mono uppercase labels; gradient "cover" card hero; tidy metadata row | Minimal, restrained |
| **Jesse Warren / DemocracyOS** | jessewarren.com/democracy-os | **Big centered act-dividers** (huge serif "Discovery" / "Design") segmenting the narrative; modular grid hero | Civic-product clarity |

---

## 3. Architecture toolkit (the reusable skeleton)

Ordered by leverage for lorin.work. ✅ have it / ⚠️ partial / ❌ missing.

1. **Persistent chapter nav** — left rail or top anchors. ✅ `StandaloneNav`.
2. **At-a-glance orientation** — metadata + 2–3 impact stats with one-line
   captions (Explora). ⚠️ Groundswell masthead has facts, not stats. Pull
   outcomes (12-month study, 30 testers, ~$30k donated) forward.
3. **Big serif *statement* openers per section** — promote section labels to a
   thesis sentence or a question (Beakery, Amy La). ⚠️ Whelm's `LensClaim`
   already does this; reuse the pattern.
4. **A clear structural spine** — numbered phases (Adam Hickey), big act-dividers
   (Jesse Warren), or named design decisions (Explora). ⚠️ labels only today.
5. **Research rendered WITH craft, color-coded** — render deliverables in brand
   voice, not generic UX tables (Ellen's personas; Goals=green/Frustrations=coral).
   ✅ Lorin's diagrams already do this; lean in.
6. **Impact as a stat block or table** (Explora / Adam Hickey). ⚠️ buried in Outcomes.
7. **Per-project positioning tag** at the collection level (Ellen's home) — one
   line naming the strength each piece shows. ❌ not on the homepage yet.
8. **Layered typographic hero** (title behind photo/mockups). Optional elevation.

---

## 4. Voice & copy toolkit (equal weight to architecture)

The moves, in order of lift:

1. **First-person ownership of every methodical step** — "I interviewed," "I led,"
   "I established," "I wrote." This is what makes strategy read as *hers*.
   Groundswell is 100% "we" today — the single biggest gap.
2. **Concrete specificity, never vague** — numbers, named people, lettered
   criteria. Lorin HAS the specifics (15 weeks embedded, 30 playtesters, ~$30k
   donated, the staff quotes); they're just not pulled forward.
3. **Questions as section openers** — "What makes this so hard?" "So how might
   we…?" Propulsive, conversational, walks the reader through her reasoning.
4. **Name concepts evocatively** — "Digital Chaos," "The Split-Workspace Grid."
   Lorin already does this best (Whelm's Signal / Tangle / Portal; Groundswell's
   "The Void," the four dimensions). Lean harder.
5. **Show the reasoning, not just the decision** — justify prioritization. The
   rigor IS the content.
6. **A personal way-in before the rigor** — a sincere entry point that carries
   the vision (Beakery's quail story). For Groundswell, sincere, not cute.
7. **Statement-headers the body completes** (Restore) and **stat + one-line
   caption** (Explora) — use sparingly.

### Voice guardrails (do NOT cargo-cult)

- **Match register to subject.** Groundswell is oncology grief and care. NO
  Restore-style flippancy or startup-bro warmth. The personal way-in must be
  sincere.
- **No introduced em dashes.** Colon / period / comma / parentheses first
  (Ellen "likes em dashes" — Lorin does not). Never paraphrase Lorin's writing:
  use her actual words or mark `[LORIN TO WRITE]`.
- **Don't over-template.** Adam Hickey's numbered phases read corporate. Borrow
  the clarity, not the consultancy tone.
- Carry-forward voice discipline (from the retired cinematic plan): negative-
  parallelism ban, AI-vocab list, em-dash discipline — see global
  `~/.claude/CLAUDE.md` Copy Style + the `voice-audit` skill.

---

## 5. Resolving the tension, concretely (vision + visual + strategic + methodical)

Three places it gets resolved:

1. **At the collection level** — per-project positioning tags so the *range*
   makes the argument (one piece proves research depth, another vision, another
   craft).
2. **In the copy** — one voice narrating the methodical process in first person,
   with specifics, reasoning, and named ideas, opened by a personal/strategic hook.
3. **In the artifacts** — render the strategy work (research, system, data) with
   Lorin's own visual taste, so "visual" is not a coat of paint; the deliverables
   themselves carry it.

---

## 6. Build approach / working order

**Copy first, then architecture** — because architecture should serve the story,
not the reverse, and copy is the current weak link. Order:

1. **Scaffold (no voice writing required):** section/act outline; question or
   statement openers per section; real specifics pulled into place; `[LORIN TO
   WRITE]` slots placed exactly where "I" should surface (research lead-in,
   reflection cards, making/coordination, reflection).
2. **Lorin writes the voice** into the scaffold (first person, specifics).
3. **Architecture finishes to fit** the locked copy (openers, stat treatments,
   artifact rendering).

The long pole is Lorin's writing time; copy-first front-loads it so the final
architecture pass is fast and entirely in Claude's lane.

---

## 7. Salvage from the retired cinematic plan

The prior `docs/case-study-editorial/STATUS.md` ("Cinematic Scrollytelling
Build," 2026-04-29) is **superseded** — it centered on a Blue Garden watercolor
reveal, which the artwork license now rules out. Still-useful pieces, kept here:

- **The funnel / three-act idea:** cinematic draw-in → editorial middle →
  skim-friendly reference. Could be revived with **compliant** visuals (no Blue
  Garden alteration).
- **Meta-strip with three outcome stat cards** — aligns with Section 3 item 2.
- **Reference register:** Visual Cinnamon (data), Virya (atmosphere), Savor; NOT
  NYT Snow Fall. (Pairs with the project's named anchors: Apple Environment,
  Linear Method.)
- **Voice discipline references** (above).

If the cinematic intro is revived, it must use compliant assets only.

---

## 8. Status & next steps

- **Groundswell = instance #1.** Architecture refactored (cohesive masthead;
  documentary photos restored with inline artwork credit; copywriting voice
  cards; RoleLedger). Still gated behind the privacy hold.
- **Next:** the copy scaffold (Section 6 step 1) on Groundswell.
- **Then:** per-project positioning tags on the homepage; surface outcome stats.
- See project memory `PROGRESS.md` for the live build state and the license hold.
