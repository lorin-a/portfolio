# Whelm: source inventory

Collected 2026-10-01. Facts only; nothing here is new copy. Paths are relative to `/Users/lorinanderberg/Desktop/portfolio-redesign/` unless they begin with `~/`.

## Files in this folder

- other-copy.md
- squarespace.md (none)
- answers.md (none found)
- (no medium.md: Whelm has no Medium article)

## 1. Homepage folder today

Block: `app/(portfolio)/page.js:153-200`

- `num` (page.js:154): 03
- `title` (page.js:155): Whelm
- `tagline` (page.js:156): A Companion for Navigating Overwhelm
- `description` (page.js:157): A self-inquiry ritual with a sequenced framework that slows thought spirals, gently navigates internal conflict, and surfaces core needs that are buried beneath ruminating narratives.
- Contribution label (page.js:160): **Original Concept**
  - gallery:
    - (page.js:162) WHELM_VIDEOS['whelm-preview'] (video, w1200): alt "Whelm preview"
    - (page.js:163) WHELM_IMAGES['whelm-slide-9'] (image, w1200): alt "Whelm concept slide"
    - (page.js:164) WHELM_IMAGES['whelm-slide-11'] (image, w1200): alt "Whelm concept slide"
    - (page.js:165) WHELM_IMAGES['whelm-slide-13'] (image, w1200): alt "Whelm concept slide"
- Contribution label (page.js:169): **Framework Development**
  - gallery:
    - (page.js:171) WHELM_IMAGES['whelm-slide-27'] (image, w1200): alt "Whelm framework slide"
    - (page.js:172) WHELM_IMAGES['whelm-slide-17'] (image, w1200): alt "Whelm framework slide"
    - (page.js:173) WHELM_IMAGES['whelm-slide-8'] (image, w1200): alt "Whelm framework slide"
    - (page.js:174) WHELM_IMAGES['whelm-slide-22'] (image, w1200): alt "Whelm framework slide"
- Contribution label (page.js:178): **Interaction Design**
  - gallery:
    - (page.js:180) WHELM_VIDEOS['whelm-meter'] (video, w1200): alt "Whelm meter interaction"
    - (page.js:181) WHELM_VIDEOS['whelm-body'] (video, w1200): alt "Whelm body scan interaction"
    - (page.js:182) WHELM_VIDEOS['whelm-breathe'] (video, w1200): alt "Whelm breathe interaction"
- `pillVariant` (page.js:186): weave
- `mediaSrc` (page.js:187): WHELM_IMAGES['whelm-2'] (w1600)
- `mediaType` (page.js:188): "image"
- `mediaAlt` (page.js:189): "Whelm interface — meter introduction"
- `mediaSequence` (page.js:190):
    - (page.js:191) WHELM_VIDEOS['whelm-meter'] (video, w1200): alt "Whelm meter in motion"
    - (page.js:192) WHELM_IMAGES['whelm-3'] (image, w1200): alt "Whelm interface — body scan introduction"
    - (page.js:193) WHELM_VIDEOS['whelm-body'] (video, w1200): alt "Whelm body scan in motion"
    - (page.js:194) WHELM_IMAGES['whelm-4'] (image, w1200): alt "Whelm interface — breathe introduction"
    - (page.js:195) WHELM_VIDEOS['whelm-breathe'] (video, w1200): alt "Whelm breathe practice"
    - (page.js:196) WHELM_VIDEOS['whelm-opener'] (video, w1200): alt "Whelm opener"
- `cardVariant` (page.js:198): file
- `comingSoon` (page.js:199)


## 2. Cloudinary assets mapped in code

Every key in `lib/cloudinary.js` that belongs to this project (cloud name `dc17mvdyv`). "On homepage" = referenced as `OBJECT['key']` in `app/(portfolio)/page.js`. "Used elsewhere" = other `app/ components/ lib/ content/` files referencing the same key by the same pattern (first four shown).

| Object | Key | Public ID | `lib/cloudinary.js` line | On homepage `page.js`? | Used elsewhere in code |
|---|---|---|---|---|---|
| `OTHER_VIDEOS` | `whelm-preview` | `whelm-preview_jcs1jq` | 222 | **NO** |  |
| `WHELM_IMAGES` | `whelm-2` | `2` | 227 | yes |  |
| `WHELM_IMAGES` | `whelm-3` | `3` | 228 | yes |  |
| `WHELM_IMAGES` | `whelm-4` | `4` | 229 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-8` | `Slide_16_9_-_8` | 230 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-9` | `Slide_16_9_-_9` | 231 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-11` | `Slide_16_9_-_11` | 232 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-13` | `Slide_16_9_-_13` | 233 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-17` | `Slide_16_9_-_17` | 234 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-22` | `Slide_16_9_-_22` | 235 | yes |  |
| `WHELM_IMAGES` | `whelm-slide-27` | `Slide_16_9_-_27` | 236 | yes |  |
| `WHELM_VIDEOS` | `whelm-opener` | `1-opener` | 240 | yes |  |
| `WHELM_VIDEOS` | `whelm-meter` | `2-meter` | 241 | yes |  |
| `WHELM_VIDEOS` | `whelm-body` | `3-body` | 242 | yes |  |
| `WHELM_VIDEOS` | `whelm-breathe` | `4-Breathe` | 243 | yes |  |
| `WHELM_VIDEOS` | `whelm-preview` | `whelm_preview_5.5` | 244 | yes |  |

Whelm case-study assets under `public/brand/` (SVGs such as `NewTangle-5-13.svg`) are served from the repo, not Cloudinary.

## 3. Existing written sources

No `content/projects/whelm.md` exists (checked: `ls content/projects/`).

### Routes: `app/(portfolio)/projects/whelm/` (a built scrollytelling case study, `noindex`)

- `page.js` (16 lines): metadata title "Whelm — Lorin Anderberg"; description "Whelm — A Ritual for Returning to Yourself. A scrollytelling case study tracing the design of a ritual for moving through overwhelm."
- `content.js` (11 lines): the only copy block run through the COPY pipeline: hero sub `<em>A Ritual for Returning to Yourself</em>` (`:9`).
- `data.js` (17 lines): the agenda-nav section index: The Gap, The Lenses, The Manifesto, The Audience, The Typologies, The Framework, The Experience, The Root, What’s Next.
- `sections/` (each section owns its copy), section by section:
  - `WhelmGap.jsx`: "Overwhelm x3 is overlooked", scroll cue "Keep scrolling".
  - `WhelmSignal.jsx` / `WhelmTangle.jsx` / `WhelmPortal.jsx`: the three lenses, each a claim + body ("A message from the nervous system, asking for support." / "Where unmet needs and internalized expectations clash." / "Heightened sensation surfaces what is ready to be seen — for observation, reflection, release.").
  - `WhelmReveal.jsx`: Overwhelm to whelm transition.
  - `WhelmManifesto.jsx` (`:34-50`): anchor, process line, three litany pairs.
  - `WhelmAudience.jsx` (`:28-57`): four bullets + four personas (Deeply Attuned, Approval Seeking, Over Performing, Overstimulated).
  - `WhelmTypologies.jsx` (`:31-45`): The Fog, The Flood, The Frenzy.
  - `WhelmFramework.jsx` (`:41-98`): five steps with rubric / purpose / activity / outcome; opening and closing claims are still `[LORIN TO WRITE]` (`:172-175`, `:347-350`).
  - `WhelmExperience.jsx` (`:26,35`): two POCs (body map, brain dump); copy Claude-written.
  - `WhelmResearch.jsx` (`:31-70`): eight modalities; only IFS has a written description; the rest are `[LORIN TO WRITE]`.
  - `WhelmNextSteps.jsx` (`:24-52`): five milestones (Now/Next/Soon/After/Eventually); Claude-written placeholders.
- `elements/` (Wordmark, CursiveWhelm, HeroFlourish, ScrollCue), `components/` (LensClaim, StickySection), `lib/` (scroll helpers): no copy.

### Other copy sources (full text in `other-copy.md`)

- `~/Desktop/whelm/docs/Whelm_Copy_Site_Flow.md` (85 lines): her own copy doc and website-flow brief; includes the Figma node links. Copied whole.
- `~/Desktop/whelm/docs/Whelm_Site_Copy.md` (287 lines): extract of the deployed page (2026-05-13) with `[LORIN TO WRITE]` markers for Claude-written passages. Copied whole.

### Related Whelm docs (listed, not copied)

- `~/Desktop/whelm/docs/Whelm Framework.md` (376 lines): "What Emerged: The Core Flow", the design principles that emerged (e.g., "The Interaction IS the Therapy").
- `~/Desktop/whelm/docs/Whelm_Framework_Explainer_DRAFT.md` (573 lines): candid walkthrough of the Body Map and Brain Dump to Self-Inquiry sequence, with research backing flagged strong/weak.
- `~/Desktop/whelm/docs/Whelm_Framework_Update_March_2026.md` (142 lines): a live self-study of a real emotional spiral that "sharpened the product's purpose, scope, and target user".
- `~/Desktop/whelm/BRAINDUMP_FLOW_BRAINSTORM_2_28_26.md` (290 lines), `BRAINDUMP_JOURNEY_MAP.md` (326 lines): brain-dump flow brainstorm and journey map (status-keyed).
- PDFs in `~/Desktop/whelm/docs/`: `Whelm Pitch.pdf`, `Whelm Pitch_4.7.pdf`, `Whelm Pitch2.pdf`, `Whelm Docs.pdf` (+1,2,3,5, `WhelmDocs4.pdf`), `Whelm_playtest_1.pdf`, `Whelm_PlayTest_3.11.pdf`, `Whelm_IFS.pdf`, `Whelm_Polyvagal Theory.pdf`, `Whelm_SOS Resources.pdf`; `.docx`: `Whelm_Ethics_Lineage_March_2026.docx`, `Whelm_Framework_March_2026.docx`.
- `References/overwhelm-research-foundation.md` (189 lines, in this repo): evidence base for the thesis that overwhelm arises when perceived demands exceed perceived capacity. `References/overwhelm-framework-landscape.md` (228 lines): map of adjacent somatic/contemplative/therapeutic frameworks relative to Signal, Tangle, Portal.
- Local media: `~/Desktop/NEW 2026 Portfolio Files Cloudinary/Whelm/`.

### Other files that mention Whelm (whole word)

`STATUS.md` (lines 8, 12, 363, 1054, 1058, 1213, 1222, 1231, 1401), `CLAUDE.md:113-115` (Whelm case study primitives), `docs/DECK_SYSTEM.md:281, 371`, `docs/deck-system/JOURNAL.md:84, 675`, `docs/deck-system/research/pentagram.md:74`, `docs/UPSKILL_RESEARCH_2026.md`, `docs/AI Ethics.md:980-1008`, `docs/archive/PORTFOLIO_STRATEGY_SUMMARY_v2.md`, `docs/archive/PORTFOLIO_INTELLIGENCE_2026.md`, `docs/case-study-editorial/CASE_STUDY_PLAYBOOK.md:232, 259`, `docs/case-study-editorial/BIRTHSTORY-VISUAL-SYSTEM.md`, `content/poems/groundswell.js`.


## 4. Coverage against the Groundswell sheet

Compared against `content/sheets/groundswell.js` (595 lines): `meta` (Context, Role, Collaborators, Tools Used, Timeline, lines 71-77), `credits` (Design Team, Clinical Team, Funding, 83-94), `outcome` (30), `prints` (cover images, 36-41), `system` (synthesis exhibit, 100-107), `frame` (why 111, research 114, role 123, short versions, roleMore, partners), `components` (name, body, `mine` "My Contribution", media; 5 components), `process` (Research + Production galleries), `close`, `acknowledgements` (partners, three columns of people, footer), `reflection` (Sense / Weave / Shape cards, each with a from-to shift and three headed bullets). Marking is strict: HAVE only where her actual words or the actual assets exist.

| Section | Status | Source / note |
|---|---|---|
| Cover media / prints | **HAVE** | Homepage: `whelm-2` (mediaSrc), `whelm-slide-8/9/11/13/17/22/27`, videos `whelm-opener/meter/body/breathe/preview` (`app/(portfolio)/page.js:155-198`). `whelm-3`, `whelm-4` stills in the media sequence. |
| Cover facts: Context | **PARTIAL** | Homepage description (`page.js:157`); disclaimer line "A personal project rooted in established practice, not clinical care" (`Whelm_Site_Copy.md:236`, flagged `[LORIN TO WRITE]`). No cover-fact context line (course, why, when). |
| Cover facts: Role / titles | **MISSING** | No role/title text for Whelm in the case study or docs. Ownership claim conflicts: `STATUS.md:1222` ("solo, full ownership") vs `docs/deck-system/research/pentagram.md:74` (lists Whelm among "team work"). |
| Cover facts: Team / collaborators / client | **MISSING** | No team, collaborator, or credits line. (Lineage names such as Catherine Liggett appear as modalities, `Whelm_Site_Copy.md:231`, not as collaborators.) |
| Cover facts: Tools | **MISSING** | No tools line for the case study. (The prototypes live in a separate CRA project, `STATUS.md:1401`; no tools list written.) |
| Cover facts: Timeline | **MISSING** | No timeline written. Process docs are dated Feb to May 2026 (`~/Desktop/whelm/docs/`, file dates); playtest PDFs 2026-03-10, 03-11. |
| Tagline + one-line description | **HAVE** | Homepage `tagline` "A Companion for Navigating Overwhelm" (`page.js:156`). Two other taglines exist (see Surprises). |
| Outcome line (masthead punchline) | **MISSING** | None. The project is unfinished; "What's Next" is a roadmap, not an outcome. |
| Frame: project (why it exists) | **HAVE** | Her copy: `Whelm_Copy_Site_Flow.md:4-12` (the gap, three "What if" questions, "Overwhelm is a Signal / Tangle / Portal", "A Ritual for building a relationship with yourself"); built in `sections/WhelmGap.jsx`, `WhelmSignal.jsx`, `WhelmTangle.jsx`, `WhelmPortal.jsx`, `WhelmManifesto.jsx`. |
| Frame: what the research told us | **HAVE** | Audience personas + three typologies (Fog, Flood, Frenzy): `Whelm_Copy_Site_Flow.md:14-19`; `sections/WhelmAudience.jsx:28-57`; `sections/WhelmTypologies.jsx:31-45`. Research basis: `References/overwhelm-research-foundation.md`, `overwhelm-framework-landscape.md`, `~/Desktop/whelm/docs/Whelm_Framework_Update_March_2026.md` (a self-study). Primary research write-up (the playtests) is not in text. |
| Frame: my role in detail | **MISSING** | No role detail. |
| Components: name + body | **HAVE** | The five-step framework (Arrive, Sense, Release, Untangle, Integrate), each with rubric / purpose / activity / outcome: `sections/WhelmFramework.jsx:41-98`; `Whelm_Copy_Site_Flow.md:20-22`. Two built POCs (body map, brain dump): `sections/WhelmExperience.jsx:26,35` (those two descriptions are Claude-written per `Whelm_Site_Copy.md:199,207`). |
| Components: “My Contribution” per component | **MISSING** | None. |
| Components: media per component | **HAVE** | Homepage `whelm-meter`, `whelm-body`, `whelm-breathe`, `whelm-opener` videos; slides 8-27. POC prototypes live in `~/Desktop/whelm/` (separate project). |
| Reflection: Sense (what I learned) | **MISSING** | None. |
| Reflection: Weave (what I’ll carry forward) | **MISSING** | None. |
| Reflection: Shape (what’s next) | **PARTIAL** | Her brief: `Whelm_Copy_Site_Flow.md:68` ("play testing the concept, getting therapists and mental health professionals to review the framework, develop the brand (i have a moodboard to show)... ideally make it public"). The five milestone bodies in `sections/WhelmNextSteps.jsx:24-52` are Claude-written placeholders (`Whelm_Site_Copy.md:249-255`). |
| Process galleries (behind the scenes) | **PARTIAL** | Concept/framework slides (`Slide_16_9_-_8..27`); playtest decks `~/Desktop/whelm/docs/Whelm_playtest_1.pdf`, `Whelm_PlayTest_3.11.pdf`; framework drafts. No behind-the-scenes photos; moodboard referenced (`Whelm_Copy_Site_Flow.md:68`) but not located. |
| Acknowledgements / credits / funding | **PARTIAL** | Lineage credited in code (IFS / Richard Schwartz written; CBT, DBT, SE, FACE, RAIN, Window of Tolerance, Polyvagal descriptions are `[LORIN TO WRITE]`, `Whelm_Site_Copy.md:222-236`); "not a mental health professional" is in her brief (`Whelm_Copy_Site_Flow.md:66`). |
| Synthesis exhibit (maps / diagrams) | **HAVE** | Signal / Tangle / Portal SVGs (`public/brand/NewTangle-5-13.svg` etc.), typology drawings, framework pills: built in `sections/*.jsx`. Process docs: `~/Desktop/whelm/BRAINDUMP_JOURNEY_MAP.md`. |
| Hiring-manager answers | **MISSING** | None found. See `answers.md`. |


## Flags in this project's sources

- Three taglines: homepage "A Companion for Navigating Overwhelm" (`page.js:156`); shipped case study "A Ritual for Returning to Yourself" (`content.js:9`, `page.js:6`); site-copy doc "Find Your Way to Feeling" (`Whelm_Site_Copy.md:26`).
- `lib/cloudinary.js` has `whelm-preview` twice with different public IDs: `OTHER_VIDEOS` `whelm-preview_jcs1jq` (unused) and `WHELM_VIDEOS` `whelm_preview_5.5` (used on the homepage).
- Solo vs team ownership is stated both ways (`STATUS.md:1222` vs `pentagram.md:74`).
- Several of the case study's strongest-looking paragraphs are Claude-written placeholders (`[LORIN TO WRITE]`): The Experience, What's Next, six of eight modalities, the disclaimer, and the framework section's opening and closing claims.
