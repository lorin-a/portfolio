# Bridging the G.A.P.: source inventory

Collected 2026-10-01. Facts only; nothing here is new copy. Paths are relative to `/Users/lorinanderberg/Desktop/portfolio-redesign/` unless they begin with `~/`.

## Files in this folder

- medium.md
- squarespace.md
- answers.md (none found)

## 1. Homepage folder today

Block: `app/(portfolio)/page.js:291-349`

- `num` (page.js:292): 06
- `title` (page.js:293): Bridging the G.A.P.
- `tagline` (page.js:294): Inclusive and Playful Nature Trail Rebrand
- `description` (page.js:295): A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders.
- Contribution label (page.js:298): **Brand Identity**
  - gallery:
    - (page.js:300) HOME_VIDEOS['bridging-default'] (video, w1200): alt "Bridging the G.A.P. logo animation"
    - (page.js:301) HOME_IMAGES['btg-29'] (image, w1200): alt "Bridging the G.A.P. brand detail"
    - (page.js:302) HOME_IMAGES['btg-30'] (image, w1200): alt "Bridging the G.A.P. brand detail"
    - (page.js:303) HOME_IMAGES['btg-33'] (image, w1200): alt "Bridging the G.A.P. brand detail"
- Contribution label (page.js:307): **UX Design**
  - gallery:
    - (page.js:309) HOME_VIDEOS['bridging-clip-1'] (video, w1200): alt "Bridging the G.A.P. motion clip"
    - (page.js:310) HOME_VIDEOS['bridging-clip-2'] (video, w1200): alt "Bridging the G.A.P. motion clip"
    - (page.js:311) HOME_IMAGES['btg-14'] (image, w1200): alt "Bridging the G.A.P. research artifact"
    - (page.js:312) HOME_IMAGES['btg-45'] (image, w1200): alt "Bridging the G.A.P. research artifact"
    - (page.js:313) HOME_IMAGES['btg-15'] (image, w1200): alt "Bridging the G.A.P. research artifact"
- Contribution label (page.js:317): **Animation**
  - gallery:
    - (page.js:319) HOME_VIDEOS['bridging-gap-logo'] (video, w1200): alt "Bridging the G.A.P. logo animation"
    - (page.js:320) HOME_VIDEOS['bridging-logos-3'] (video, w1200): alt "Bridging the G.A.P. secondary logo animation"
    - (page.js:321) HOME_VIDEOS['bridging-logos-2'] (video, w1200): alt "Bridging the G.A.P. secondary logo animation"
- `pillVariant` (page.js:325): shape
- `mediaSrc` (page.js:326): HOME_VIDEOS['bridging-default'] (w1600)
- `mediaType` (page.js:327): "video"
- `mediaAlt` (page.js:328): "Bridging the G.A.P. logo animation"
- `mediaSequence` (page.js:329):
    - (page.js:330) HOME_IMAGES['btg-29'] (image, w1200): alt "Bridging the G.A.P. campaign detail"
    - (page.js:331) HOME_VIDEOS['bridging-app-iphone'] (video, w1200): alt "Bridging the G.A.P. iPhone app prototype"
    - (page.js:332) HOME_VIDEOS['bridging-clip-2'] (video, w1200): alt "Bridging the G.A.P. motion clip"
    - (page.js:333) HOME_VIDEOS['bridging-logos-2'] (video, w1200): alt "Bridging the G.A.P. secondary logo animation"
    - (page.js:334) HOME_IMAGES['btg-36'] (image, w1200): alt "Bridging the G.A.P. campaign detail"
    - (page.js:335) HOME_IMAGES['btg-33'] (image, w1200): alt "Bridging the G.A.P. campaign detail"
- `cardVariant` (page.js:337): file
- `href` (page.js:338): https://medium.com/ma-in-design-carnegie-mellon/cmu-design-ma-visual-comms-studio-project-4-communications-rebrand-4ddc692dec05
- `external` (page.js:339)
- `flip` (page.js:340)


`lib/homeProjects.js:46-59` is a STALE, unimported homepage config: tagline "Trail rebrand and campaign"; description "...campaign for inexperienced riders, GPS app prototype, and environmental graphics."; contributions UX Research, Brand Identity, Animation. (`grep -rn homeProjects app components lib content` finds no importer.)


## 2. Cloudinary assets mapped in code

Every key in `lib/cloudinary.js` that belongs to this project (cloud name `dc17mvdyv`). "On homepage" = referenced as `OBJECT['key']` in `app/(portfolio)/page.js`. "Used elsewhere" = other `app/ components/ lib/ content/` files referencing the same key by the same pattern (first four shown).

| Object | Key | Public ID | `lib/cloudinary.js` line | On homepage `page.js`? | Used elsewhere in code |
|---|---|---|---|---|---|
| `HOME_IMAGES` | `bridging-cover` | `bridging-cover_pikdr9` | 57 | **NO** |  |
| `HOME_IMAGES` | `btg-14` | `BTG_14` | 58 | yes |  |
| `HOME_IMAGES` | `btg-15` | `BTG_15` | 59 | yes |  |
| `HOME_IMAGES` | `btg-29` | `BTG_29` | 60 | yes |  |
| `HOME_IMAGES` | `btg-30` | `BTG_30` | 61 | yes |  |
| `HOME_IMAGES` | `btg-33` | `BTG_33` | 62 | yes |  |
| `HOME_IMAGES` | `btg-36` | `BTG_36` | 63 | yes |  |
| `HOME_IMAGES` | `btg-45` | `BTG_45` | 64 | yes |  |
| `HOME_IMAGES` | `btg-early-prototype` | `Early_App_Prototype_GIF` | 65 | **NO** |  |
| `HOME_VIDEOS` | `bridging-default` | `Logos_1` | 210 | yes | `lib/homeProjects.js` |
| `HOME_VIDEOS` | `bridging-hover` | `GAP-video-home-preview-hover` | 211 | **NO** | `lib/homeProjects.js` |
| `HOME_VIDEOS` | `bridging-app-iphone` | `App_iPhone_Animated` | 212 | yes |  |
| `HOME_VIDEOS` | `bridging-clip-1` | `BTG-Clip-1` | 213 | yes |  |
| `HOME_VIDEOS` | `bridging-clip-2` | `BTG-Clip-2` | 214 | yes |  |
| `HOME_VIDEOS` | `bridging-logos-2` | `Logos_2` | 215 | yes |  |
| `HOME_VIDEOS` | `bridging-logos-3` | `Logos_3` | 216 | yes |  |
| `HOME_VIDEOS` | `bridging-gap-logo` | `GAP_logo_Animated` | 217 | yes |  |

The Medium article carries 82 images (13 captioned) that are not in Cloudinary.

## 3. Existing written sources

Source: `content/projects/bridging-the-gap.md` (verbatim, full file; line numbers are the file's own).

```markdown
  1  ---
  2  title: Bridging the G.A.P.
  3  subtitle: Trail Re-Brand Campaign
  4  tags: ["UX Research", "Brand Identity", "Animation"]
  5  hero: gap-hero.jpg
  6  team: Lorin Anderberg, Michael Juan, Rui Ying
  7  role: UX Research, Brand Identity, Animation
  8  duration: 5 weeks
  9  tools: Figma, Adobe Illustrator, After Effects
 10  order: 5
 11  ---
 12  
 13  ## Context
 14  
 15  A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders, GPS app prototype, printed materials, and environmental graphics.
 16  
 17  ## Tension
 18  
 19  Pittsburgh has a large transient student population and most residents are unaware of the GAP trail or experience barriers to experiencing this historic nature trail.
 20  
 21  How might we rebrand the GAP trail to feel accessible and inviting to people with minimal experience in nature?
 22  
 23  ## Listen
 24  
 25  [Add content]
 26  
 27  ## Sense
 28  
 29  [Add content]
 30  
 31  ## Imagine
 32  
 33  [Add content]
 34  
 35  ## Try
 36  
 37  [Add content]
 38  
 39  ## Offer
 40  
 41  [Add content]
 42  
 43  ## Learn
 44  
 45  [Add content]
```

### Other sources

- Medium article + Squarespace page (this folder) are the substantive text; `content/projects/bridging-the-gap.md` has Context and Tension/HMW only; Listen through Learn are `[Add content]`.
- No route: `app/(portfolio)/projects/` has no Bridging the G.A.P. folder.
- Files mentioning it: `STATUS.md` (lines 13, 360, 1058, 1221, 1252, 1345), `docs/groundswell-pdf/STATUS.md:79` (deferred), `docs/case-study-editorial/PORTFOLIO-all-copy-RAW.md`. Nothing in `References/`.
- Local originals: `~/Desktop/NEW 2026 Portfolio Files Cloudinary/Bridging the Gap/` (includes `bridging-cover.gif`) and `resized-for-cloudinary/Bridging the Gap/`.
- Medium YouTube video: https://www.youtube.com/watch?v=mToBFHA3aNQ ("GAP Map App Product Video").


## 4. Coverage against the Groundswell sheet

Compared against `content/sheets/groundswell.js` (595 lines): `meta` (Context, Role, Collaborators, Tools Used, Timeline, lines 71-77), `credits` (Design Team, Clinical Team, Funding, 83-94), `outcome` (30), `prints` (cover images, 36-41), `system` (synthesis exhibit, 100-107), `frame` (why 111, research 114, role 123, short versions, roleMore, partners), `components` (name, body, `mine` "My Contribution", media; 5 components), `process` (Research + Production galleries), `close`, `acknowledgements` (partners, three columns of people, footer), `reflection` (Sense / Weave / Shape cards, each with a from-to shift and three headed bullets). Marking is strict: HAVE only where her actual words or the actual assets exist.

| Section | Status | Source / note |
|---|---|---|
| Cover media / prints | **HAVE** | Homepage: `bridging-default` (Logos_1), `bridging-clip-1/2`, `bridging-gap-logo`, `bridging-logos-2/3`, `bridging-app-iphone`, `btg-14/15/29/30/33/36/45` (`app/(portfolio)/page.js:293-337`). Medium: 82 images with 13 captions + YouTube "GAP Map App Product Video" (https://www.youtube.com/watch?v=mToBFHA3aNQ). |
| Cover facts: Context | **HAVE** | Medium "Assignment" + "Approach" + "Reflection"; `content/projects/bridging-the-gap.md:15`; Squarespace L6 opening. |
| Cover facts: Role / titles | **HAVE** | `content/projects/bridging-the-gap.md:7` "UX Research, Brand Identity, Animation"; Squarespace L6 (same); Medium "The Work". |
| Cover facts: Team / collaborators / client | **HAVE** | Medium: "**Team:** Lorin Anderberg, Michael Juan, Rui Ying"; "**Class:** Visual Communications Studio I, Brett Yasko". No client (class brief). |
| Cover facts: Tools | **HAVE** | `content/projects/bridging-the-gap.md:9` "Figma, Adobe Illustrator, After Effects"; Squarespace "Credits: Unsplash Images, Figma Community Templates, Mr MockUp". |
| Cover facts: Timeline | **HAVE** | CONFLICT: Medium "**Duration:** 4 Weeks"; `content/projects/bridging-the-gap.md:8` and Squarespace "5 Weeks". |
| Tagline + one-line description | **HAVE** | `app/(portfolio)/page.js:294-295` ("Inclusive and Playful Nature Trail Rebrand" / "A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders."). |
| Outcome line (masthead punchline) | **HAVE** | Medium "**Finale:** I am very proud of where we ended up..."; Squarespace "Outcomes: Overall, we are very pleased..." and the professor "favorite of all time" praise (L6 opening). |
| Frame: project (why it exists) | **HAVE** | `content/projects/bridging-the-gap.md:19-21` (Tension + HMW); Medium HMW block; Squarespace "Design Challenge". |
| Frame: what the research told us | **HAVE** | Medium "Field Research" (Ohiopyle, 30 interviews, only one not interested), "User Research" (personas, journeys), "Market Research" (AllTrails, Strava, Komoot, Trail Forks, FarOut, Gaia GPS). |
| Frame: my role in detail | **HAVE** | Medium "The Work": "I started drafting the brand identity, Rui started drafting the App and Website, and Michael got to work on the pamphlet illustrations, icons, and signage"; Squarespace "Big props to my teammates: Michael... Rui..." |
| Components: name + body | **HAVE** | Medium: four deliverables with body text each (Apparel; Signage + trail mural; Gap Guide Pamphlet with features list; GAP Map App with features list); Squarespace "Asset Ecosystem". |
| Components: “My Contribution” per component | **PARTIAL** | Scattered first-person lines: brand identity ("I started crafting logo ideas..."), "I designed the selfie slides and collaborated on the features", sticker badges ("My first iteration..."). Nothing for Apparel or Signage. Not in per-component "mine" form. |
| Components: media per component | **HAVE** | Medium images with captions (logo iterations, color palette, sticker badges, Gap Guide layout, icons, mockups, app sketches) + YouTube; homepage keys above. |
| Reflection: Sense (what I learned) | **HAVE** | Squarespace L6 Outcomes: "Our biggest takeaway was to unify our brand system. If I could do it again, I would try to iterate more casually. I have a tendency to need to create high fidelity iterations in order to know if I like them or not..." |
| Reflection: Weave (what I’ll carry forward) | **PARTIAL** | Same Squarespace passage implies it (iterate lo-fi first); no explicit forward-looking sentence. |
| Reflection: Shape (what’s next) | **PARTIAL** | Medium Finale: "As always, there is more work to do and many edits that could make it even better"; no specific next steps. |
| Process galleries (behind the scenes) | **HAVE** | Medium captioned process images: "Early iterations of the logo", "Iteration of color palette and style guide", "Exploring the layout", "Mood board inspiration for icon style", "Early sketches of web/app UX", "Early stage web trip planner" (see medium.md image list). |
| Acknowledgements / credits / funding | **PARTIAL** | Team, class, instructor (Brett Yasko), tools/credits, and "Big props to my teammates" (Squarespace). No formal acknowledgements (e.g., the GAP association contacts are mentioned in Approach but not thanked). |
| Synthesis exhibit (maps / diagrams) | **PARTIAL** | Personas, journey maps, market-research images exist in Medium (uncaptioned); no text describing them as a synthesis exhibit. |
| Hiring-manager answers | **MISSING** | None found. See `answers.md`. |


## Flags in this project's sources

- Duration: Medium "4 Weeks" vs `content/projects/bridging-the-gap.md:8` and Squarespace "5 Weeks".
- Medium's "Reflection" (about the GAP association) and Squarespace "Concept" paragraph differ in structure; both describe the same four deliverables. The Squarespace version lists "Environmental Graphics" and the Medium version lists "Signage + trail mural".
