# BirthStory: source inventory

Collected 2026-10-01. Facts only; nothing here is new copy. Paths are relative to `/Users/lorinanderberg/Desktop/portfolio-redesign/` unless they begin with `~/`.

## Files in this folder

- medium.md
- squarespace.md
- answers.md

## 1. Homepage folder today

Block: `app/(portfolio)/page.js:104-151`

- `num` (page.js:105): 02
- `title` (page.js:106): BirthStory
- `tagline` (page.js:107): A Micro-App for Birthing Parents
- `description` (page.js:108): Helping parents document and reflect on their birth experience for University of Pittsburgh Women’s Health.
- Contribution label (page.js:111): **UX Design**
  - gallery:
    - (page.js:113) HOME_VIDEOS['birthstory-default'] (video, w1200): alt "BirthStory default preview"
    - (page.js:114) HOME_VIDEOS['birthstory-hover'] (video, w1200): alt "BirthStory hover preview"
    - (page.js:115) HOME_IMAGES['bs-5'] (image, w1200): alt "BirthStory interface detail"
    - (page.js:116) HOME_IMAGES['bs-4'] (image, w1200): alt "BirthStory interface detail"
- Contribution label (page.js:120): **UX Research**
  - gallery:
    - (page.js:122) HOME_IMAGES['bs-49'] (image, w1200): alt "BirthStory research process"
    - (page.js:123) HOME_IMAGES['bs-73'] (image, w1200): alt "BirthStory site architecture"
    - (page.js:124) HOME_IMAGES['bs-55'] (image, w1200): alt "BirthStory research approach"
    - (page.js:125) HOME_IMAGES['bs-27'] (image, w1200): alt "BirthStory site navigation map"
- Contribution label (page.js:129): **Client Iteration**
  - gallery:
    - (page.js:131) HOME_IMAGES['bs-23'] (image, w1200): alt "BirthStory client iteration — class working with client"
    - (page.js:132) HOME_IMAGES['bs-64'] (image, w1200): alt "BirthStory wireframe iteration"
    - (page.js:133) HOME_IMAGES['bs-67'] (image, w1200): alt "BirthStory wireframe iteration"
    - (page.js:134) HOME_IMAGES['bs-74'] (image, w1200): alt "BirthStory wireframe iteration"
    - (page.js:135) HOME_IMAGES['bs-83'] (image, w1200): alt "BirthStory wireframe iteration"
- `pillVariant` (page.js:139): weave
- `mediaSrc` (page.js:140): HOME_VIDEOS['birthstory-default'] (w1600)
- `mediaType` (page.js:141): "video"
- `mediaAlt` (page.js:142): "BirthStory default preview"
- `mediaSequence` (page.js:143):
    - (page.js:144) HOME_VIDEOS['birthstory-hover'] (video, w1200): alt "BirthStory hover preview"
    - (page.js:145) HOME_IMAGES['bs'] (image, w1200): alt "BirthStory cover"
- `cardVariant` (page.js:147): file
- `href` (page.js:148): https://medium.com/ma-in-design-carnegie-mellon/client-project-birthstory-a-micro-app-for-birthing-parents-to-record-reflect-on-their-138849c42a38
- `external` (page.js:149)
- `flip` (page.js:150)


## 2. Cloudinary assets mapped in code

Every key in `lib/cloudinary.js` that belongs to this project (cloud name `dc17mvdyv`). "On homepage" = referenced as `OBJECT['key']` in `app/(portfolio)/page.js`. "Used elsewhere" = other `app/ components/ lib/ content/` files referencing the same key by the same pattern (first four shown).

| Object | Key | Public ID | `lib/cloudinary.js` line | On homepage `page.js`? | Used elsewhere in code |
|---|---|---|---|---|---|
| `HOME_IMAGES` | `birthstory-cover` | `birthstory-cover_bl6cqu` | 42 | **NO** |  |
| `HOME_IMAGES` | `bs` | `bs` | 67 | yes |  |
| `HOME_IMAGES` | `bs-2` | `bs-2` | 68 | **NO** |  |
| `HOME_IMAGES` | `bs-3` | `bs-3` | 69 | **NO** |  |
| `HOME_IMAGES` | `bs-4` | `bs-4` | 70 | yes |  |
| `HOME_IMAGES` | `bs-5` | `bs-5` | 71 | yes |  |
| `HOME_IMAGES` | `bs-20` | `bs-20` | 72 | **NO** |  |
| `HOME_IMAGES` | `bs-23` | `bs-23` | 73 | yes |  |
| `HOME_IMAGES` | `bs-27` | `bs-27` | 74 | yes |  |
| `HOME_IMAGES` | `bs-55` | `bs-55` | 75 | yes |  |
| `HOME_IMAGES` | `bs-64` | `bs-64` | 76 | yes |  |
| `HOME_IMAGES` | `bs-49` | `bs-49` | 77 | yes |  |
| `HOME_IMAGES` | `bs-67` | `bs-67` | 78 | yes |  |
| `HOME_IMAGES` | `bs-73` | `bs-73` | 79 | yes |  |
| `HOME_IMAGES` | `bs-74` | `bs-74` | 80 | yes |  |
| `HOME_IMAGES` | `bs-83` | `bs-83` | 81 | yes |  |
| `HOME_VIDEOS` | `birthstory-default` | `birthstory-home-preview-default` | 196 | yes | `components/BirthStorySection/BirthStorySection.js` |
| `HOME_VIDEOS` | `birthstory-hover` | `birthstory-home-preview-hover` | 197 | yes |  |
| `BIRTHSTORY_PHOTOS` | `fog` | `pexels-saul-siguenza-355267816-36288592` | 252 | **NO** | `components/Birthstory/variants/VPrint.jsx`, `components/Birthstory/variants/VCanvas.jsx`, `components/Birthstory/variants/VBoard.jsx`, `components/Birthstory/variants/VWall.jsx` |
| `BIRTHSTORY_PHOTOS` | `reflect` | `pexels-william-fortunato-6392913` | 253 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `room` | `pexels-jonathanborba-3279209` | 254 | **NO** | `components/Birthstory/variants/VWall.jsx`, `components/Birthstory/productFeatures.jsx` |
| `BIRTHSTORY_PHOTOS` | `circle` | `pexels-greyartweddings-29172142` | 255 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `disorient` | `pexels-by_narmin-aslanli-701641061-29127872` | 256 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `tender` | `pexels-sarah-chai-7282807` | 257 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `gap` | `pexels-william-fortunato-6392902` | 258 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `feeding` | `pexels-thatguycraig000-4041805` | 259 | **NO** | `components/Birthstory/variants/VPrint.jsx`, `components/Birthstory/variants/VCanvas.jsx`, `components/Birthstory/variants/VBoard.jsx`, `components/Birthstory/variants/VWall.jsx` |
| `BIRTHSTORY_PHOTOS` | `cradle` | `pexels-thatguycraig000-4041804` | 260 | **NO** |  |
| `BIRTHSTORY_PHOTOS` | `birth` | `pexels-jonathanborba-3259628` | 261 | **NO** |  |

Besides the Cloudinary maps above, the live case study references images by raw public ID (e.g. `IMG_3012`, `components/Birthstory/BirthStoryBody.jsx:260`), which are not in the mapped objects.

## 3. Existing written sources

Source: `content/projects/birthstory.md` (verbatim, full file; line numbers are the file's own).

```markdown
  1  ---
  2  title: Birth Story
  3  subtitle: A Micro-App Concept for Birthing Parents
  4  tags: ["UX Research", "UX Design", "Healthcare"]
  5  hero: bs-hero.jpg
  6  client: University of Pittsburgh Center for Research on Healthcare
  7  team: Lorin Anderberg, Michael Juan
  8  role: UX/UI Design, UX Research, Copywriting, Brand Identity
  9  duration: 6 week sprint
 10  tools: Figma
 11  order: 2
 12  ---
 13  
 14  ## Context
 15  
 16  A sister app concept to Myana (Mothers You Are Not Alone), developed in a graduate studio collaboration between CMU, Dezudio design studio founders, and the University of Pittsburgh Center for Research on Healthcare.
 17  
 18  ![bs-context-01.jpg]
 19  
 20  ## Tension
 21  
 22  Birthing parents lack systems of support before, during, and after the experience of giving birth, which is often overshadowed by the needs of a newborn.
 23  
 24  How might we create an app that will help birthing parents and their loved ones prepare to document, record, and reflect on the process of giving birth in such a way that balances the logistical and emotional aspects of the experience?
 25  
 26  ## Listen
 27  
 28  We interviewed 7 parents to learn about their birth experiences, and many reported that their experiences were traumatic and that they lacked tools to process them.
 29  
 30  ![bs-listen-01.jpg]
 31  
 32  ## Sense
 33  
 34  [Add synthesis content]
 35  
 36  ![bs-sense-01.jpg]
 37  
 38  ## Imagine
 39  
 40  Users are quickly onboarded with clear examples and can toggle between notes and journal entries in a chronological timeline. Thoughtful prompts guide reflection on the birth experience, while keyword tagging enables easy search.
 41  
 42  ![bs-imagine-01.jpg]
 43  
 44  ## Try
 45  
 46  We created lo-fi wireframes that attempted to offer as many tools as possible but through feedback we learned that simple is better for postpartum brain fog.
 47  
 48  ![bs-try-01.jpg]
 49  
 50  ## Offer
 51  
 52  [Add final design content]
 53  
 54  ![bs-offer-01.jpg]
 55  
 56  ## Learn
 57  
 58  The concepts presented in this class will function as real, preliminary research and ideation for the eventual creation of a Birth Story app by the professors and the client.
 59  
 60  If I could do this project again, I’d begin by simplifying. Identifying the core need early would have helped me stay focused, rather than trying to do too much at once.
```

### Written drafts and research: `docs/case-study-editorial/BIRTHSTORY-*`

- `BIRTHSTORY-copy.md` (178 lines, about 2,600 words). Copy draft v3 (Overview + 01 Brief through 09 Reflection + open items), written for her to bless. Its header says the live page superseded the section prose after 2026-06-30; the page is now the copy source of truth.
- `BIRTHSTORY-copy-plan.md` (41 lines). The "START HERE" resume file: the four resolved decisions, standing corrections (Outcome must not claim a build commitment; build claim is "designed the concept; built the site and prototypes with AI assistance"), spine drafts, and the section-by-section copy plan (HAVE vs NEED).
- `BIRTHSTORY-interview.md` (203 lines). Her verbatim interview answers Q1-Q16 (2026-06-30) plus the official brief and requirements distilled, her sister-interview synthesis, "My thinking" reflection, the thesis (2026-08-03) and the Q7 counterfactual answer (2026-08-04). Reproduced in `answers.md`.
- `BIRTHSTORY-VISUAL-SYSTEM.md` (248 lines). The unifying visual-system proposal (Fable pass, 2026-07-05) with a governing "THE SPEC" (2026-07-09) distilled from every verdict she gave, plus later rounds and the V2 from-scratch rebuild plan.
- `BIRTHSTORY-brief-source.txt` (477 lines). The official project brief converted from `IXD_ Myana Birth Story.docx` (timeline, deliverables, client talk notes).
- `BIRTHSTORY-requirements-source.txt` (35 lines). The app requirements spreadsheet converted to text (1.0 Information gathering, 2.0 Meaning-making, 3.0 Admin, optional A-E).
- Related, not named BIRTHSTORY: `docs/case-study-editorial/LINEAGE-dezudio.md` (research on the Dezudio studio and how professionals write about this work), `REFERENCES.md:190` (Elijah Benzon's Birth Story page as her "ideal clear" benchmark), `CASE_STUDY_PLAYBOOK.md`, `docs/deck-system/BIRTHSTORY_NOTES.md` (78-line improvement prompt built on the hiring-manager Question Map).
- `~/Desktop/portfolio-deck/docs/case-study-editorial/` also holds `BIRTHSTORY-scaffold.md` (her old Squarespace copy mapped onto the wireframe skeleton; not in this repo) and older copies of the files above.

### Routes: `app/(portfolio)/projects/birthstory-care-pod/` (page files are thin; the content lives in `components/Birthstory/`)

- `page.js` (18 lines): renders `BirthStoryHeroFan` + `BirthStoryBody`. This is the live case study (draft, `noindex`). Title "Birth Story — case study (draft)".
- `case/page.js` (`components/Birthstory/case/BirthStoryCase.jsx`, `IaCollapse.jsx`), `story/page.js` (`story/BirthStoryStory.jsx`, "the story spine"), `v2/page.js` (`v2/BirthStoryV2.jsx`, "from-scratch rebuild"), `heroes/page.js` (hero options), `layouts/page.js` (`LayoutLab.jsx`), `moment-1/page.js` (`moment/BuiltFromWords.jsx`), `moment-2/page.js` (`moment/EntryFlow.jsx`), and `v/` + `v/{ledger,artifact,atlas,print,skin,wall,board,canvas}/page.js` (direction studies A-H, `components/Birthstory/variants/`). All are layout/composition explorations.

`components/Birthstory/BirthStoryBody.jsx` (357 lines), section by section:

- **Overview** (`:33-60`; Role `:35`, Brief `:36`, Client `:38`, Outcome `:40`, Build `:41`): metadata masthead: Role, Brief, Context (6-week CMU studio taught by Dezudio founders), Client (Myana, co-developed by Pitt researchers), Method ("5 parent interviews, 3 think-aloud protocols (TAP), 3 wireframe rounds"), Outcome, Build.
- **The product** (`ProductAct.jsx`, 249 lines; `productFeatures.jsx`, 69 lines): five functions (Documentation, Care Pod, Reflection, Search, The Book), each with a kicker sequence (The ask / What one parent said / What we built) and two annotation labels; interactive prototypes `DocReveal`, `CarePodFlow`, `JournalFlow`, `SearchReveal`.
- **01 Research / the finding** (`:99-170`): statement ("If we did not learn about the importance of the collective experience..."), proof line, three Prose paragraphs, her sister's quote, the three asks.
- **02 Architecture** (`:172-183`, `IaAria.jsx`, 267 lines): statement + IA first answer / what it did / what shipped.
- **03 Iteration** (`SecIteration.jsx`, 141 lines): "Each round made the app simpler"; Version 1 (Week 3), 2 (Week 4), 3 (Week 5) with tester notes, think-aloud photo and printed-screens photo.
- **04 Voice / UX writing** (`:185-253`): "reclaim" and "Find strength & support" revisions with the parent quote.
- **Brand / visual design** (`SecBrand.jsx`, 86 lines): "Calm, emotionally intelligent, and deliberately non-clinical."
- **05 Outcome** (`:255-288`; statement `:260`, photo `:281`): client quote "I wish this could be real right now!" (Sarah Burns, MSW, LSW) + final-review photo.
- **Close** (`:290-340`; coda `:302-307`, colophon `:317-335`): reflection coda, colophon (Consent, Tools, Icons, Photography).

### Other files that mention BirthStory

`STATUS.md` (lines 11, 25, 141, 360, 363, 429-431), `DESIGN_SPEC.md:222` (theme: "BirthStory periwinkle"), `content/projects/groundswell.md`, `content/sheets/_template.js`, `docs/DECK_SYSTEM.md`, `docs/AI Ethics.md`, `docs/deck-system/JOURNAL.md`, `docs/deck-system/research/pentagram.md` ("Lead with Birth Story, not Groundswell", :65) and `studio-rodrigo.md`, `docs/case-study-editorial/PORTFOLIO-all-copy-RAW.md` (the Squarespace scrape). No `References/` file mentions it.

### Local originals

`~/Desktop/NEW 2026 Portfolio Files Cloudinary/BirthStory/` (source media for the Cloudinary uploads).


## 4. Coverage against the Groundswell sheet

Compared against `content/sheets/groundswell.js` (595 lines): `meta` (Context, Role, Collaborators, Tools Used, Timeline, lines 71-77), `credits` (Design Team, Clinical Team, Funding, 83-94), `outcome` (30), `prints` (cover images, 36-41), `system` (synthesis exhibit, 100-107), `frame` (why 111, research 114, role 123, short versions, roleMore, partners), `components` (name, body, `mine` "My Contribution", media; 5 components), `process` (Research + Production galleries), `close`, `acknowledgements` (partners, three columns of people, footer), `reflection` (Sense / Weave / Shape cards, each with a from-to shift and three headed bullets). Marking is strict: HAVE only where her actual words or the actual assets exist.

| Section | Status | Source / note |
|---|---|---|
| Cover media / prints | **HAVE** | Homepage `mediaSrc` + `mediaSequence` (birthstory-default / birthstory-hover videos, `bs` cover): `app/(portfolio)/page.js:140-147`. Licensed Pexels context photos mapped in `lib/cloudinary.js:~238-249`. Final-review team photo `IMG_3012`: `components/Birthstory/BirthStoryBody.jsx:281`. Medium hero image (image 1). |
| Cover facts: Context | **HAVE** | Medium: "**About:** Design a micro-app to accompany Myana, a pregnancy app, that helps birthing parents log important medical information..." (medium.md). `content/projects/birthstory.md:16`. Squarespace L1. |
| Cover facts: Role / titles | **HAVE** | `content/projects/birthstory.md:8` "UX/UI Design, UX Research, Copywriting, Brand Identity"; Squarespace L1 (same line); live Overview `components/Birthstory/BirthStoryBody.jsx:35` ("I led UX/UI, visual identity, and UX writing"). |
| Cover facts: Team / collaborators / client | **HAVE** | Medium: "**Team:** Lorin Anderberg, Michael Juan". Client appears four different ways (see Surprises): Medium "University of Pittsburgh Women’s Health Researchers"; Squarespace "Sarah Burns, MSW, LSW; Tamar Krishnamurti, PhD"; `content/projects/birthstory.md:6` "University of Pittsburgh Center for Research on Healthcare"; live Overview "Myana". |
| Cover facts: Tools | **HAVE** | `content/projects/birthstory.md:10` "Figma"; Squarespace "Figma, SVG Repo Icons, Unsplash Images"; live colophon `components/Birthstory/BirthStoryBody.jsx:317-335` (Figma + Claude Code). |
| Cover facts: Timeline | **HAVE** | Medium "**Duration:** 6 weeks"; `content/projects/birthstory.md:9`; Squarespace weekly breakdown (Research I, Research II, Ideation, Interviews, Iteration, Presentation, 1 week each). |
| Tagline + one-line description | **HAVE** | `app/(portfolio)/page.js:106-108` ("A Micro-App for Birthing Parents" / "Helping parents document and reflect on their birth experience for University of Pittsburgh Women’s Health."). |
| Outcome line (masthead punchline) | **HAVE** | Her words: `BIRTHSTORY-interview.md:70` (Q15). Live Outcome statement `components/Birthstory/BirthStoryBody.jsx:260`. NOTE: `content/projects/birthstory.md:58` and Squarespace L1 still carry the overclaim ("eventual creation of a Birth Story app by the professors and the client") that Q15 corrects. |
| Frame: project (why it exists) | **HAVE** | `content/projects/birthstory.md:22-24` (Tension + HMW); Medium "About"; live Overview "Brief" `components/Birthstory/BirthStoryBody.jsx:36`; Squarespace "Design Challenge". |
| Frame: what the research told us | **HAVE** | Interview Q6 (`BIRTHSTORY-interview.md:32`), Q7 (`:35`), sister interviews (`:115-128`), "My thinking" (`:136-142`), the thesis (`:149-157`), Q7 counterfactual (`:182-184`); live Finding `components/Birthstory/BirthStoryBody.jsx:99-170`. |
| Frame: my role in detail | **HAVE** | Interview Q2 (`BIRTHSTORY-interview.md:13`): "Michael and I shared research responsibilities... I led UX/UI, visual identity, user flows/architecture, mockup designs." Live Overview Role. |
| Components: name + body | **HAVE** | Five functions with her reason for each: Interview Q10 (`:49-54`); `components/Birthstory/productFeatures.jsx:9-69` (Documentation, Care Pod, Reflection, Search, The Book, each with two annotation labels + text); Medium "Final Iteration" paragraphs. |
| Components: “My Contribution” per component | **PARTIAL** | Only a project-level split exists (Q2, `BIRTHSTORY-interview.md:13`). No per-function "what I did" lines. Co-led research with Michael Juan; no per-feature authorship statement. |
| Components: media per component | **HAVE** | Live prototypes: `components/Birthstory/CarePodFlow.jsx`, `JournalFlow.jsx`, `DocReveal.jsx`, `SearchReveal.jsx`, `ProductAct.jsx`; Medium final screens (images 23-35); homepage `bs-4`, `bs-5`. |
| Reflection: Sense (what I learned) | **HAVE** | Interview Q16 (`:75`); Squarespace L1 "If I could do this project again, I'd begin by simplifying..."; `content/projects/birthstory.md:60`; live Voice section last Prose `components/Birthstory/BirthStoryBody.jsx:208-210`. |
| Reflection: Weave (what I’ll carry forward) | **PARTIAL** | Q16 ("it informed how I wireframe", `:75`); live Close coda "Designing something and then being able to build it myself is the direction I’m headed" (`components/Birthstory/BirthStoryBody.jsx:302-307`, composed from her interview words, marked hers to bless). Not in her Sense/Weave/Shape bullet shape. |
| Reflection: Shape (what’s next) | **PARTIAL** | Q12 end (`:62`: "If I could keep working on this I would ensure the reflection questions were a balance of recalling joy and nurturing moments of distress"); live Voice "The next thing I’d do is balance the reflection prompts..." No from-to shift, no three-bullet form. |
| Process galleries (behind the scenes) | **HAVE** | Assets: Medium V1 wireframes (images 9-17), V2 (18-22), final (23-35); homepage `bs-23` (class working with client), `bs-64/67/74/83` (wireframe iterations), `bs-49/55/73/27` (research, architecture); live SecIteration (`components/Birthstory/SecIteration.jsx`, think-aloud photo + printed-screens photo). Captions are sparse (Medium has one captioned image). |
| Acknowledgements / credits / funding | **PARTIAL** | Team + client credit exist (Medium, Squarespace). Live colophon (`components/Birthstory/BirthStoryBody.jsx:317-335`): consent note, tools, icons (SVG Repo), photography (Saul Siguenza, Craig Adderley, Narmin Aslanli, Jonathan Borba via Pexels; Unsplash; CMU IXD Studio). No thanks passage (client, Dezudio founders, studio, interviewees). No funding (n/a). |
| Synthesis exhibit (maps / diagrams) | **HAVE** | IA diagrams: `components/Birthstory/IaAria.jsx` (first answer / what it actually did / what shipped), `IaDiagrams.jsx`, `case/IaCollapse.jsx`; Medium user-flow images. |
| Hiring-manager answers | **PARTIAL** | Answers exist (interview Q1-Q16 + counterfactual) but are the project-specific interview, not the hiring-manager rehearsal set; the Birth Story rehearsal round is queued, not run (`docs/deck-system/JOURNAL.md:928-929`). See `answers.md`. |


## Flags in this project's sources

- Outcome: `BIRTHSTORY-interview.md:70-72` (Q15) says the "eventual creation" claim is NOT supported; `content/projects/birthstory.md:58` and Squarespace L1 still contain it.
- Client is named four ways (Medium, Squarespace, `content/projects/birthstory.md:6`, homepage `page.js:119`, live Overview).
- Medium names "Care Pod" and "Birth Story Book" in the Final Iteration; the Medium has no outcome, reflection, or methodology section.
