# Birth Story — the unifying visual system (Fable pass proposal, 2026-07-05)

---

## §0 · THE SPEC (governing, 2026-07-09 — supersedes everything below as the working contract)

Distilled from every verdict Lorin has given (F2–F15) plus her portfolio-advice doc. **Nothing is
shown to her that hasn't been checked against every line.** Every future "no" deposits one new
line here before the next attempt.

**The thesis (center of gravity):** care as the strategic instrument; a human at the center of
every piece; the rigor serves them. Same craft grammar as the engineer-canon, different gravity.
The case study holds itself to the app's own four principles — and every treatment must answer
*which principle am I serving* or be cut.

**The target:** one hiring manager, 90 seconds, leaning in and wanting to meet her. Felt, not
proven. Restraint reads senior.

1. **One thing per screen.** Each beat commits ~95% to a single mode (research / craft / product /
   story). Range accumulates across the sequence; it is never declared within a screen. (F5, F13,
   advice)
2. **Three arias, everything else still.** One peak per section maximum, and only ~3 on the whole
   page earn motion/interaction/full-bleed. Stillness elsewhere is the design. (advice; cures F11)
3. **Fast path / deep path on separate planes.** Headlines + one hero visual per beat must carry
   the whole argument in 90 seconds alone; evidence sits beneath, visually subordinate, available.
   (F7, advice)
4. **The story from images alone; words are optional depth.** (F14, her words)
5. **No text-and-lines fields.** Content takes its native form: voices as speech, decisions as
   product surface, flows as movement, claims as type. (F8, F12)
6. **Every register switch has a visible reason.** The cut from rigorous to cinematic should read
   as judgment, in sequence position and treatment. (advice: HMs score decision rationale)
7. **Human, not engineer.** A person in the frame — voices, photographs, stakes — before any
   system. Motion vocabulary derives from the app's principles: calm-by-default = slow soft
   arrivals; does-not-disorient = nothing jumps or reverses. (F15, advice)
8. **Never at the detriment of the story.** Every treatment must make the storyline easier to
   follow. (F2 — standing since Round 3)
9. **Judged live, in the browser, by feel.** Never from stills; motion is half the artifact.
   Her verdicts come as temperature ("colder / warmer / reads engineer / THIS") — each one gets
   named and appended here. (F15 method)
10. **Voice guardrails.** Her words verbatim or cut, never paraphrased; no em dashes introduced;
    no "not X, it's Y" constructions; curly quotes. (standing)

Status: **PROPOSED — awaiting Lorin's bless before any component is touched.**
Brief (her words, condensed): a strong Fable visual-sophistication pass on the whole page — flow, visual
treatment, site styles, typographic hierarchy, interactions — 60% → 110%. She loves scrollytelling, sticky
side-scroll, and impressive reveals, but *never at the detriment of rigor, structure, story, or getting the
point across: any treatment must enhance the viewer's ability to follow the storyline.*

Bar for this pass: Roots of Racism / Advocacy Through Walls (scrolly depth), Nahel Moussi + A Present Force
(her vibe), Studio Rodrigo (crisp + playful), Pentagram (quality). Taste ledger (locked 2026-07-05): editorial/
journalistic hierarchy + duotone · gradient-as-accent · group-text idiom · tool-native register scoped to
research mess · structure inventions as single-section features, not whole flows.

---

## 1 · Diagnosis — where "novice" actually lives

Verified eyes-on (full 22,000px walk at 1440) + in the CSS:

1. **Timid type scale.** The largest display type on the page is ~46px Fraunces (`.lead`) against 17px body,
   and every section statement sits at that same size. Nothing on the page is genuinely big; the hierarchy
   ratio never crosses 3:1 (the GRID.md gate floor). The chapter numerals (01–06) repeat identically and never
   become a moment.
2. **One layout loop.** Nearly every beat is the same recipe: ~40rem text column left, rounded media card
   right, dark corner chip, small centered caption. It repeats 10+ times, Brief through Outcome. The 12-col
   grid exists in the CSS (`.grid12`) but the field sections run on a single 60rem sheet — no asymmetry, no
   full-bleed besides the one teal band, no visible grid edge.
3. **Everything is a card.** Principles, brief spec, synthesis, move cards, gradient stages, chat — all white
   rounded rectangles with soft shadows on cream. Uniform elevation flattens hierarchy, and it is precisely
   the "overly rounded corners / callout cards" tell from her below-bar list. The real artifacts (working
   prototypes, crit wall, wireframes) are trapped in identical containers, so evidence and furniture read at
   the same weight.
4. **Unmanaged whitespace.** Search/Reflection/Book text blocks float beside 900px-tall stages with the left
   column ~70% empty; 300–500px dead bands sit between sections. Emptiness is leftover, not composed.
5. **The identity is visited, not carried.** The blush→peri→teal gradient lives in the hero, stages, and Close,
   but the paper page between is colorless: one teal accent, same slate chip everywhere. Photos are plain
   grayscale stock, untied to the identity.
6. **Zero motion.** Beyond a fade-up utility and the spine underline, the page is static. The two inherently
   sequential stories — Architecture's 4→0 collapse and Iteration's "the app calms down" — are told in static
   pictures. The page claims working prototypes and shows static PNGs.

None of this is a content problem. Structure, story, and rigor are already strong; the *form* isn't doing the
quiet intentional work her craft statement describes.

## 2 · The organizing idea

**The case study holds itself to the app's own four principles.** The page becomes the proof of the designer:

- *Compassionate, not clinical* → editorial warmth: Fraunces at real display scale, duotone photography,
  paper ground, generous composed space.
- *Integrate facts and feelings* → the two-voice grammar made strict and visible: the RECORD (sans, ruled,
  ledger-set, spec-sharp) vs THE THINKING/FEELING (serif, italic, chapter color) — woven on one grid, not
  boxed in cards.
- *Does not disorient* → one orientation system (spine + week folio + chapter timeline ticks), play-once
  reveals, content never hidden behind interaction.
- *Trauma-informed / calm by default* → the motion grammar: slow, soft, text-first, never scrub, immersive
  through pacing rather than spectacle.

One holistic system; every move below derives from it.

## 3 · The system — six moves

### 3.1 Typographic register (the voice gets a range)
- New display tier: chapter-opener statements clamp to ~72px Fraunces, ≤16ch, tight leading, set asymmetric
  (hanging across 8–9 columns). Section leads stay ~38–46px; pull quotes ~42px italic. Body unchanged.
- Chapter numerals become oversized ghosted numerals (~10rem at low ink) beside/behind the opener — the
  wayfinding throughline made visible; tiny letterspaced crumb + huge numeral gives the ≥3:1 contrast.
- A **meta tier** for the record layer: week stamps, figure labels, spec eyebrows, counts — tabular,
  letterspaced, consistently placed at grid edges (top-left label · top-right folio) so the grid itself reads.

### 3.2 The grid made visible (from loop to composition)
- All sections adopt the one 12-col system. Text columns may start at col 2 or 5; media spans vary (7-col,
  9-col, full-bleed); at least one deliberate column-break moment per chapter.
- Five named layout recipes, rotated deliberately instead of the single text+card loop:
  **Statement** (chapter opener) · **Ledger** (record tables: brief spec, synthesis, prioritization — ruled,
  not carded) · **Exhibit** (one artifact big, margin annotations) · **Stage** (gradient immersion band) ·
  **Dialogue** (chat, tester voices).
- Whitespace composed: dead bands become numeral/rail moments; tall stages get sticky text columns beside
  them so nothing floats in a void.

### 3.3 De-carding (rules instead of boxes)
- The white rounded card + shadow stops being the default container. Record-layer content re-sets as ruled
  ledgers: hairlines, column rules, generous type — "the structure of editorial, the sharpness of corporate."
- Cards survive only where the artifact is genuinely a card: phone frames, chat bubbles, tool-native research
  scraps.
- Corner chips become a **specimen-label grammar**: small caps + hairline + figure number, on the grid, not
  floating on the image.

### 3.4 Color arc + duotone (the identity carried)
- The gradient becomes the page's arc: each chapter owns a stop (Brief blush → Research peri → Architecture
  dusk → Interface teal → Identity lilac → Outcome slate/teal), used **as accent only** — rules, labels,
  numerals, the spine's active state. Gradient-as-accent per the taste ledger.
- Documentary photos get one unified **duotone** (paper highlight, teal-ink shadow) — journalistic, hers, no
  longer grayscale stock. Intensity is a dial for her to set on a live A/B.
- Ground pacing stays paper with the two committed dark immersions (Interface band, Close bookend) plus the
  dark hero — the page breathes dark → light → dark.

### 3.5 Motion grammar (calm scrollytelling, story-first)
All paused-timeline + IntersectionObserver play-once (the project's architecture), reduced-motion honored.
Every beat below exists to make the argument easier to follow, not to decorate:
- **Chapter openers:** numeral fades in, rule draws, statement lines rise (reuse the Whelm `revealClaim` beat).
- **Architecture 4→0 (flagship #1):** sticky beat — the four onboarding questions stack, then strike and
  collapse one by one to the "0"; the page's central design argument literally plays.
- **Iteration sticky side-scroll (flagship #2, already staged):** text beats advance V1→V2→V3 while the
  artifact stage swaps — "each round made the app simpler" animates. Recommended flavor: **VLedger rail**
  (the VAtlas camera is more spectacle than story here).
- **Group chat:** bubbles arrive in sequence; the verbatim sister quote lands last as the accent.
- **Synthesis panel:** each row cascades Fact → Insight → Implication, mirroring the method it documents.
- **Feature stages:** annotation leader-lines draw in; phones lift softly; prototypes shown as short looping
  videos where they exist — motion doing rigor's work (proof they're real).
- Micro: artifact hover lift + caption, spine progress fill, hero scroll-cue breathing.

### 3.6 Orientation (the one-timeline thesis, scoped)
- The spine keeps its job, gains craft: chapter color stops, a progress thread, tighter type.
- Chapter openers carry a small timeline tick (Week 1 → 6) — the app's one-timeline idea as page structure,
  scoped to the openers per her rule that structure inventions are section features, not whole flows.

## 4 · Build plan (after her yes)

Four passes, each eyes-on verified at 1440 + 390 with the GRID.md pre-ship gate:
1. Foundation — type scale tokens, de-carding, grid recipes, whitespace composition.
2. Chapter openers + color arc + duotone photography.
3. Motion pass — openers, chat, synthesis, features, micro-interactions.
4. Flagship scrolly beats — Architecture 4→0 and Iteration sticky (her flavor pick).

## 5 · Only-she-holds decisions

1. **Iteration flavor:** VLedger rail (recommended) vs VAtlas camera.
2. **Duotone intensity:** subtle teal-shadow vs full journalistic duotone — will show both live on real photos.
3. Anything in the current layout she wants held sacred before the loop is broken.

*(Standing open flags, unchanged: Dezudio credit confirm; both remain in STATUS.md.)*

---

## 6 · Round 4 — the trail, not the jungle (2026-07-09, after her verdict on pass 1)

Her verdict, condensed: keeps the type hierarchy, sticky copy, de-carded callouts, reveals, and
alternation — but the page overwhelms. Too much to look at, too much text for a skimmer, too many
lines; "trying to be editorial but lacking the decisive, intelligent unfolding of a narrative. It
reads like a newspaper not an engaging article… a jungle rather than a well guided trail hike with
one clear path."

**Diagnosis.** Pass 1 changed the *material* of the scaffolding (cards → rules) but not the
*amount* of it, and it raised the volume of everything at once. Every beat still carries three to
five simultaneous voices at equal weight, so nothing leads. A newspaper shows all its matter at
once; an engaging article decides, per beat, the one thing you must take away — and subordinates
the rest. The page performs structure instead of exercising judgment.

**The organizing idea: one trail, marked overlooks, optional side paths.**

1. **The skim contract.** Each chapter must land its whole point from three things only:
   the statement + one hero artifact + one takeaway caption. A skimmer who reads nothing else
   gets the full story. Everything else steps down a register.
2. **One idea per viewport.** Re-pace every section so a scroll position holds one thing —
   the statement alone, then the artifact, then the voice — never statement + prose + callout +
   figure competing in one frame.
3. **Cut the line noise.** One rule grammar page-wide. Hairlines survive only where a ledger
   genuinely has rows; specimen labels lose their trailing rule; the dotted paper ground goes —
   clean paper. Fewer, heavier moves.
4. **Concision sweep** (her standing permission: cut, never paraphrase). Prose ≤ ~3 lines at
   1440; anything a caption or annotation already says gets cut from the prose; secondary
   paragraphs demote to a quieter supporting size or go.
5. **Demote the record, promote the claim.** Supporting detail (method notes, second photos,
   redundant context) steps down in size and position; the one claim per beat steps up.
6. **Flow (her open question — product earlier?).** Recommendation: a **product overture** —
   one viewport directly after the Brief: the four-ways-in wall + a single line, so the reader
   holds *what we made* in mind while walking *how we got there*; the full Interface chapter
   stays in place as the deep payoff. Alternative (her named instinct): move the whole Interface
   chapter before Research — stronger product-forward, but the process then reads as flashback,
   which fights "does not disorient." Her pick.

Sequencing: this trail pass comes **before** the remaining visual-system passes; the color arc
(pass 2) then lands on a page that can carry it — chapter color becomes part of the "decisive
unfolding" answer, not more noise.

---

## 7 · V2 — the from-scratch rebuild (2026-07-09, her start-over mandate, F13)

Not another pass. A new page, designed as ONE composition and built clean, in parallel at
`/projects/birthstory-care-pod/v2` (the current draft untouched). Kept: her verbatim words, the
facts, accessibility, the story order, the taste ledger as direction. Set aside: every inherited
section structure, register furniture (crumbs, folios, spec labels, ledgers), and layout DNA.

**The organizing idea: the page is a film strip of designed frames, not a document with sections.**
Twelve frames, one idea each, composed to pass her squint test individually and as a color script:

dark hero → THE ASK (type + three huge stakes) → THE VOICE (sister's verbatim huge over the
full-bleed duotone) → THE RESEARCH (chat + three moments) → HEARD→DID (voices flow into product
chips) → PRINCIPLES (four claims as type) → THE TURN (4→0 confrontation) → THREE ROUNDS (the app
calms down; crit wall full-bleed) → THE PRODUCT (a sustained dark-teal world: wall, prioritization
made visible, five working prototypes) → THE IDENTITY (gradient as artifact) → THE OUTCOME (client
quote huge) → the teal coda.

Text exists only as claims, captions, and her preserved verbatim moments; no paragraph columns.
Motion grammar unchanged in spirit (play-once, reduced-motion honored); flagship theater (4→0
strike, iteration sticky) layers on after the composition is blessed.
