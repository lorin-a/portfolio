# Transition Design: source inventory

Collected 2026-10-01. Facts only; nothing here is new copy. Paths are relative to `/Users/lorinanderberg/Desktop/portfolio-redesign/` unless they begin with `~/`.

## Files in this folder

- medium.md (5 articles)
- squarespace.md
- answers.md (none found)

## 1. Homepage folder today

Block: `app/(portfolio)/page.js:252-289`

- `num` (page.js:253): 05
- `title` (page.js:254): Transition Design
- `tagline` (page.js:255): Roots to Resilience: A Food Justice Future
- `description` (page.js:256): A systems-level design response to food insecurity in Pittsburgh using Transition Design methods.
- Contribution label (page.js:259): **Systems Mapping**
  - gallery:
    - (page.js:261) HOME_VIDEOS['transition-design-default'] (video, w1200): alt "Transition design preview"
    - (page.js:262) HOME_IMAGES['td-stakeholders-full'] (image, w1200): alt "Stakeholder relations map"
    - (page.js:263) HOME_IMAGES['td-timeline-full'] (image, w1200): alt "Food insecurity timeline"
- Contribution label (page.js:267): **Design Futures**
  - gallery:
    - (page.js:269) HOME_VIDEOS['transition-design-hover'] (video, w1200): alt "Transition design preview"
    - (page.js:270) HOME_IMAGES['td-scales'] (image, w1200): alt "Scales of transition design intervention"
    - (page.js:271) HOME_IMAGES['td-roots'] (image, w1200): alt "Roots to Resilience design future"
    - (page.js:272) HOME_IMAGES['td-4b'] (image, w1200): alt "Transition design speculative artifact"
- `pillVariant` (page.js:276): sense
- `mediaSrc` (page.js:277): HOME_VIDEOS['transition-design-default'] (w1600)
- `mediaType` (page.js:278): "video"
- `mediaAlt` (page.js:279): "Transition design default preview"
- `mediaSequence` (page.js:280):
    - (page.js:281) HOME_IMAGES['td-scales'] (image, w1200): alt "Scales of transition design intervention"
    - (page.js:282) HOME_VIDEOS['transition-design-hover'] (video, w1200): alt "Transition design detail"
    - (page.js:283) HOME_IMAGES['td-timeline'] (image, w1200): alt "Food insecurity timeline"
    - (page.js:284) HOME_IMAGES['td-stakeholders'] (image, w1200): alt "Stakeholder relations map"
- `cardVariant` (page.js:286): file
- `href` (page.js:287): https://medium.com/transition-design-seminar-spring-25-carnegie
- `external` (page.js:288)


`lib/homeProjects.js:28-39` is a STALE, unimported homepage config: tagline "Systems-level design for food insecurity"; description "A systems-level design response to food insecurity in Pittsburgh. The lens widens."; contributions Systems Mapping, Research Synthesis.


## 2. Cloudinary assets mapped in code

Every key in `lib/cloudinary.js` that belongs to this project (cloud name `dc17mvdyv`). "On homepage" = referenced as `OBJECT['key']` in `app/(portfolio)/page.js`. "Used elsewhere" = other `app/ components/ lib/ content/` files referencing the same key by the same pattern (first four shown).

| Object | Key | Public ID | `lib/cloudinary.js` line | On homepage `page.js`? | Used elsewhere in code |
|---|---|---|---|---|---|
| `HOME_IMAGES` | `transition-design-hero` | `transition-design-hero_l30j93` | 43 | **NO** |  |
| `HOME_IMAGES` | `td-scales` | `Team_Autopoesis_4A-1` | 44 | yes |  |
| `HOME_IMAGES` | `td-timeline` | `Team_Autopoesis_FoodInsecurity_Timeline_2025-1` | 45 | yes |  |
| `HOME_IMAGES` | `td-stakeholders` | `Team_Autopoesis_Stakeholder_Relations-1` | 46 | yes |  |
| `HOME_IMAGES` | `td-stakeholders-full` | `Team_Autopoesis_Stakeholder_Relations` | 47 | yes |  |
| `HOME_IMAGES` | `td-timeline-full` | `Team_Autopoesis_FoodInsecurity_Timeline_2025` | 48 | yes |  |
| `HOME_IMAGES` | `td-roots` | `Team_Autopoesis_Roots_to_Resilience` | 49 | yes |  |
| `HOME_IMAGES` | `td-4b` | `Team_Autopoesis_4B` | 50 | yes |  |
| `HOME_VIDEOS` | `transition-design-default` | `transition-design-home-preview-default` | 208 | yes | `lib/homeProjects.js` |
| `HOME_VIDEOS` | `transition-design-hover` | `transition-design-home-preview-hover` | 209 | yes | `lib/homeProjects.js` |

Only 10 keys are mapped for Transition Design; the Medium articles carry about 117 additional images that are not in Cloudinary.

## 3. Existing written sources

Source: `content/projects/transition-design.md` (verbatim, full file; line numbers are the file's own).

```markdown
  1  ---
  2  title: Transition Design
  3  subtitle: Roots to Resilience
  4  tags: ["Systems Thinking", "Design Research", "Data Visualization"]
  5  hero: td-hero.jpg
  6  client: CMU Transition Design Institute
  7  team: Lorin Anderberg, Diane Hu, Shama Patwardhan, Alisha Saxena
  8  role: Research, Copywriting, Information Design, Data Visualization
  9  duration: 15 week sprint
 10  tools: Miro, Figma, Google Docs
 11  order: 3
 12  ---
 13  
 14  ## Context
 15  
 16  Transition Design is a systems-based, trans-disciplinary approach that tackles complex “wicked” problems by targeting root causes and steering society toward sustainable, equitable futures through intentional, place-based transformation.
 17  
 18  This seminar project examines Pittsburgh’s food insecurity through multiple transition design perspectives, proposing a hyper-local integrated intervention plan to dismantle systemic barriers to food security.
 19  
 20  ![td-context-01.jpg]
 21  
 22  ## Tension
 23  
 24  Food insecurity affects approximately 12.5% of Pittsburgh’s population, disproportionately impacting vulnerable groups including low-income individuals, elderly residents, single parents, children, and marginalized communities who face the systemic inequalities of “food apartheid.”
 25  
 26  ## Listen
 27  
 28  [Add research content]
 29  
 30  ![td-listen-01.jpg]
 31  
 32  ## Sense
 33  
 34  [Add synthesis content]
 35  
 36  ![td-sense-01.jpg]
 37  
 38  ## Imagine
 39  
 40  [Add futures visioning content]
 41  
 42  ![td-imagine-01.jpg]
 43  
 44  ## Try
 45  
 46  [Add intervention design content]
 47  
 48  ![td-try-01.jpg]
 49  
 50  ## Offer
 51  
 52  [Add final deliverables]
 53  
 54  ![td-offer-01.jpg]
 55  
 56  ## Learn
 57  
 58  This project was recognized as the “best outcome yet” by the founders of CMU’s Transition Design Institute.
```

### Other sources

- The Medium publication holds FIVE articles (assignments 1-5, all dated 4 May 2025), not one; all are in `medium.md`. Her Squarespace page links to "Read Full Documentation" and "View High-Res PDF" (Drive).
- No route: `app/(portfolio)/projects/` has no Transition Design folder.
- Files mentioning Transition Design: `STATUS.md` (lines 13, 360, 1058, 1192, 1219, 1231, 1241, 1248, 1252, 1272, 1295, 1337, 1345), `docs/deck-system/JOURNAL.md:909-910, 930` (planned as the "interview first, build after" arm), `docs/case-study-editorial/BIRTHSTORY-copy-plan.md:11` (`MY PART.docx` Tab 2; file not on this machine), `docs/case-study-editorial/PORTFOLIO-all-copy-RAW.md`. Nothing in `References/`.
- Local originals: `~/Desktop/NEW 2026 Portfolio Files Cloudinary/Transition Design/`, `/Volumes/Lorin 10 TB/Offload from Mac/2026-11-03/Portfolio/Transition Design/`, `~/Desktop/cloudinary-compressed/transition-design-home-preview-*.mp4`.
- Medium disclaimer (publication description): "Disclaimer: Theoretical w/ AI-Assisted Writing & Research + Imagery". Assignment 5 header: "the entirety of this project is done through speculation and internet research with AI-assistance and does not claim to truly and deeply understand the experience of anyone who is represented."


## 4. Coverage against the Groundswell sheet

Compared against `content/sheets/groundswell.js` (595 lines): `meta` (Context, Role, Collaborators, Tools Used, Timeline, lines 71-77), `credits` (Design Team, Clinical Team, Funding, 83-94), `outcome` (30), `prints` (cover images, 36-41), `system` (synthesis exhibit, 100-107), `frame` (why 111, research 114, role 123, short versions, roleMore, partners), `components` (name, body, `mine` "My Contribution", media; 5 components), `process` (Research + Production galleries), `close`, `acknowledgements` (partners, three columns of people, footer), `reflection` (Sense / Weave / Shape cards, each with a from-to shift and three headed bullets). Marking is strict: HAVE only where her actual words or the actual assets exist.

| Section | Status | Source / note |
|---|---|---|
| Cover media / prints | **HAVE** | Homepage: preview videos + `td-scales`, `td-timeline(-full)`, `td-stakeholders(-full)`, `td-roots`, `td-4b` (`app/(portfolio)/page.js:254-288`). Medium: 117 images across five articles; "See High Res PDF" Drive link on assignment 5 (https://drive.google.com/file/d/1xt2x0SqwE2EqkcuugkU_2Tczkfam5uIJ/view?usp=sharing). |
| Cover facts: Context | **HAVE** | `content/projects/transition-design.md:16-18` (Context); Medium assignment 5 header and disclaimer; Squarespace L4 opening. |
| Cover facts: Role / titles | **HAVE** | `content/projects/transition-design.md:8` "Research, Copywriting, Information Design, Data Visualization"; Squarespace L4 "I played a key role in the information design on our Miro board." |
| Cover facts: Team / collaborators / client | **HAVE** | Medium: "**Team:** Lorin Anderberg, Diane Hu, Shama Patwardhan, Alisha Saxena"; seminar taught by Terry Irwin and Gideon Kossoff (Transition Design Institute founders); `content/projects/transition-design.md:6-7` (client "CMU Transition Design Institute"). |
| Cover facts: Tools | **HAVE** | `content/projects/transition-design.md:10` "Miro, Figma, Google Docs"; Squarespace "Tools: Miro, Figma Slides, Google Docs / Credits: Pexels, Canva + MidJourney, AI-Assisted Research/Copy Editing"; Medium "Photos made with Canva". |
| Cover facts: Timeline | **HAVE** | CONFLICT: `content/projects/transition-design.md:9` "15 week sprint"; Squarespace "Each exercise was completed in 3 weeks" (six exercises); Medium assignment 5 "**Timeline:** 2.5 weeks". |
| Tagline + one-line description | **HAVE** | `app/(portfolio)/page.js:255-256` ("Roots to Resilience: A Food Justice Future" / "A systems-level design response to food insecurity in Pittsburgh using Transition Design methods."). |
| Outcome line (masthead punchline) | **HAVE** | `content/projects/transition-design.md:58` and Squarespace L4: "recognized as the 'best outcome yet' by the founders of CMU’s Transition Design Institute". Only source for that claim is her own pages. |
| Frame: project (why it exists) | **HAVE** | `content/projects/transition-design.md:16-24`; Medium assignment 1 (wicked problem); Squarespace "Design Challenge". |
| Frame: what the research told us | **HAVE** | Medium assignments 1-4 (STEEP, stakeholder relations, multi-level perspective history, designing for transitions); Squarespace "Pittsburgh's food insecurity is fundamentally a problem of power and control..." (L4). |
| Frame: my role in detail | **PARTIAL** | Role line + one sentence (information design on the Miro board). Medium writes as a team ("Team Autopoiesis" in the article URLs); no component-level contributions. |
| Components: name + body | **HAVE** | The interventions: Medium assignment 5 and Squarespace L4 ("Roots to Resilience 2050": twelve shovel-ready interventions, Harvesting Pittsburgh app, Home Harvest Initiative, Local Harvest Basket, The People’s Table, Farm-to-Institution PA, Food Sovereignty Wisdom Circle, Urban-Rural Food Alliance). |
| Components: “My Contribution” per component | **MISSING** | No per-intervention contribution lines. |
| Components: media per component | **HAVE** | Homepage `td-roots`, `td-4b`, `td-scales`; Medium assignment 5 images + high-res PDF link. |
| Reflection: Sense (what I learned) | **MISSING** | Only the "best outcome yet" line (`content/projects/transition-design.md:58`); no learning statement. |
| Reflection: Weave (what I’ll carry forward) | **MISSING** | None. |
| Reflection: Shape (what’s next) | **MISSING** | None. (Medium assignment 5 closes on the proposal itself.) |
| Process galleries (behind the scenes) | **HAVE** | Artifacts of the process: homepage `td-stakeholders-full`, `td-timeline-full`; Medium images for each of the five assignments (maps, timelines). Not behind-the-scenes photos. |
| Acknowledgements / credits / funding | **PARTIAL** | Team, instructors, tools/credits line (Pexels, Canva + MidJourney, AI-assisted research/copy editing) and the AI disclaimer exist. No thanks passage. |
| Synthesis exhibit (maps / diagrams) | **HAVE** | Stakeholder map, food-insecurity timeline, scales of intervention, STEEP and multi-level-perspective diagrams: homepage keys above; Medium images (uncaptioned). |
| Hiring-manager answers | **MISSING** | None found; interview not run (`docs/deck-system/JOURNAL.md:909-910`, `:930`). See `answers.md`. |


## Flags in this project's sources

- The homepage CTA (`page.js:287`) points to the Medium PUBLICATION home, which renders with no story list; the five articles are only reachable by direct link. See `medium.md` for all five URLs.
- Medium states the work is theoretical and AI-assisted (writing, research, imagery); the homepage and `content/projects/` do not.
- Timeline conflicts: 15-week sprint (`content/projects/transition-design.md:9`) vs 3 weeks per exercise (Squarespace) vs 2.5 weeks for assignment 5 (Medium).
