# SomeBuddy: source inventory

Collected 2026-10-01. Facts only; nothing here is new copy. Paths are relative to `/Users/lorinanderberg/Desktop/portfolio-redesign/` unless they begin with `~/`.

## Files in this folder

- medium.md
- squarespace.md
- answers.md (none found)

## 1. Homepage folder today

Block: `app/(portfolio)/page.js:202-250`

- `num` (page.js:203): 04
- `title` (page.js:204): SomeBuddy
- `tagline` (page.js:205): Approachable Socialization for Busy Buddies
- `description` (page.js:206): A product and brand system for university campuses, helping busy students connect over shared values through low-effort socializing.
- Contribution label (page.js:209): **Brand Identity**
  - gallery:
    - (page.js:211) HOME_VIDEOS['somebuddy-logo'] (video, w1600): alt "SomeBuddy animated logo"
    - (page.js:212) HOME_IMAGES['somebuddy-22'] (image, w1200): alt "SomeBuddy brand detail"
    - (page.js:213) HOME_IMAGES['somebuddy-23'] (image, w1200): alt "SomeBuddy brand detail"
    - (page.js:214) HOME_VIDEOS['somebuddy-reel-2'] (video, w1200): alt "SomeBuddy brand reel"
- Contribution label (page.js:218): **Animation**
  - gallery:
    - (page.js:220) HOME_VIDEOS['somebuddy-animation'] (video, w1200): alt "SomeBuddy animation detail"
    - (page.js:221) HOME_VIDEOS['somebuddy-animation-2'] (video, w1200): alt "SomeBuddy animation detail"
    - (page.js:222) HOME_VIDEOS['somebuddy-animation-3'] (video, w1200): alt "SomeBuddy animation detail"
- Contribution label (page.js:226): **UX**
  - gallery:
    - (page.js:228) HOME_VIDEOS['somebuddy-ux'] (video, w1200): alt "SomeBuddy UX flow"
    - (page.js:229) HOME_VIDEOS['somebuddy-ux-2'] (video, w1200): alt "SomeBuddy UX flow detail"
    - (page.js:230) HOME_IMAGES['somebuddy-28'] (image, w1200): alt "SomeBuddy UX detail"
    - (page.js:231) HOME_IMAGES['somebuddy-30'] (image, w1200): alt "SomeBuddy UX detail"
    - (page.js:232) HOME_IMAGES['somebuddy-31'] (image, w1200): alt "SomeBuddy UX detail"
- `pillVariant` (page.js:236): sense
- `mediaSrc` (page.js:237): HOME_VIDEOS['somebuddy-logo'] (w1600)
- `mediaType` (page.js:238): "video"
- `mediaAlt` (page.js:239): "SomeBuddy animated logo"
- `mediaSequence` (page.js:240):
    - (page.js:241) HOME_VIDEOS['somebuddy-reel'] (video, w1200): alt "SomeBuddy reel"
    - (page.js:242) HOME_IMAGES['somebuddy-31'] (image, w1200): alt "SomeBuddy interface detail"
    - (page.js:243) HOME_IMAGES['somebuddy-28'] (image, w1200): alt "SomeBuddy interface detail"
    - (page.js:244) HOME_VIDEOS['somebuddy-reel-2'] (video, w1200): alt "SomeBuddy reel continued"
- `cardVariant` (page.js:246): file
- `href` (page.js:247): https://medium.com/ma-in-design-carnegie-mellon/somebuddy-a-social-app-for-busy-grad-students-60c22c579d78
- `external` (page.js:248)
- `flip` (page.js:249)


`lib/homeProjects.js:9-26` is a STALE, unimported homepage config: SomeBuddy there is "A therapy companion app" / "Brand identity, UX, and animation for a therapy companion app. Full creative range." (wrong; the real project is a grad-student social app). Contributions there: Brand Identity, UX, Animation.


## 2. Cloudinary assets mapped in code

Every key in `lib/cloudinary.js` that belongs to this project (cloud name `dc17mvdyv`). "On homepage" = referenced as `OBJECT['key']` in `app/(portfolio)/page.js`. "Used elsewhere" = other `app/ components/ lib/ content/` files referencing the same key by the same pattern (first four shown).

| Object | Key | Public ID | `lib/cloudinary.js` line | On homepage `page.js`? | Used elsewhere in code |
|---|---|---|---|---|---|
| `HOME_IMAGES` | `somebuddy-cover` | `somebuddy-cover_dbf5it` | 51 | **NO** |  |
| `HOME_IMAGES` | `somebuddy-22` | `22` | 52 | yes |  |
| `HOME_IMAGES` | `somebuddy-23` | `sb-23` | 53 | yes |  |
| `HOME_IMAGES` | `somebuddy-28` | `28` | 54 | yes |  |
| `HOME_IMAGES` | `somebuddy-30` | `30` | 55 | yes |  |
| `HOME_IMAGES` | `somebuddy-31` | `31` | 56 | yes |  |
| `HOME_VIDEOS` | `somebuddy-default` | `somebuddy-home-preview-default` | 198 | **NO** | `lib/homeProjects.js` |
| `HOME_VIDEOS` | `somebuddy-hover` | `somebuddy-home-preview-hover` | 199 | **NO** | `lib/homeProjects.js` |
| `HOME_VIDEOS` | `somebuddy-reel` | `somebuddy-reel` | 200 | yes |  |
| `HOME_VIDEOS` | `somebuddy-reel-2` | `somebuddy-reel-2` | 201 | yes |  |
| `HOME_VIDEOS` | `somebuddy-logo` | `Final_SomeBuddy_Animated_Logo` | 202 | yes |  |
| `HOME_VIDEOS` | `somebuddy-animation` | `Animation` | 203 | yes |  |
| `HOME_VIDEOS` | `somebuddy-animation-2` | `Animation_2` | 204 | yes |  |
| `HOME_VIDEOS` | `somebuddy-animation-3` | `Animation_3` | 205 | yes |  |
| `HOME_VIDEOS` | `somebuddy-ux` | `UX` | 206 | yes |  |
| `HOME_VIDEOS` | `somebuddy-ux-2` | `UX_2` | 207 | yes |  |

Local source videos for the Cloudinary uploads are listed under "Local originals" below.

## 3. Existing written sources

Source: `content/projects/somebuddy.md` (verbatim, full file; line numbers are the file's own).

```markdown
  1  ---
  2  title: SomeBuddy
  3  subtitle: A Social App for Grad Students
  4  tags: ["UX Research", "Brand Identity", "Animation"]
  5  hero: sb-hero.jpg
  6  client: CMU Department of Student Affairs
  7  team: Lorin Anderberg, Yaezi Lee, Rui Ying
  8  role: UX/UI Design, UX Research, Copywriting, Brand Identity
  9  duration: 5 weeks
 10  tools: Figma, After Effects, Adobe Illustrator
 11  order: 4
 12  ---
 13  
 14  ## Context
 15  
 16  [Add content from PDF]
 17  
 18  ## Tension
 19  
 20  Grad students seek connection but struggle to make plans due to hectic schedules which can lead to feelings of isolation.
 21  
 22  How can we create easy, low-pressure ways for grad students to connect through simple activities, especially when it’s something they don’t want to do alone?
 23  
 24  ## Listen
 25  
 26  [Add content]
 27  
 28  ## Sense
 29  
 30  [Add content]
 31  
 32  ## Imagine
 33  
 34  [Add content]
 35  
 36  ## Try
 37  
 38  [Add content]
 39  
 40  ## Offer
 41  
 42  [Add content]
 43  
 44  ## Learn
 45  
 46  [Add content]
```

### Other sources

- Medium article and Squarespace page (`medium.md`, `squarespace.md` in this folder) are the substantive text; `content/projects/somebuddy.md` has only the Tension paragraph and an HMW (lines 20-22); Context, Listen, Sense, Imagine, Try, Offer, Learn are all `[Add content]` (Context says "[Add content from PDF]").
- No route: `app/(portfolio)/projects/` has no SomeBuddy folder (`[slug]/` is generic).
- Files mentioning SomeBuddy: `STATUS.md` (lines 13, 360, 1054-1058, 1178, 1189, 1221, 1250, 1337, 1345), `docs/case-study-editorial/BIRTHSTORY-copy-plan.md:11` (the `MY PART.docx` note; the file is not on this machine), `docs/case-study-editorial/PORTFOLIO-all-copy-RAW.md`. `STATUS.md:1178` (R12) records that a SomeBuddy "Dezudio taught-process/method" block was removed from an earlier build. Nothing in `References/`.
- Local originals: `~/Desktop/NEW 2026 Portfolio Files Cloudinary/SomeBuddy/` (includes `SomeBuddy Video.mp4`, `somebuddy-reel-2.mp4`, `Final SomeBuddy Animated Logo.mp4`), `~/Desktop/somebuddy-clips/`, `~/Desktop/Portfolio/Final SomeBuddy Animated Logo.mp4`, `~/Desktop/portfolio-deck/filestack-somebuddy-initial.png`.
- Medium YouTube video (in the article): https://www.youtube.com/watch?v=pdlaitoGycA


## 4. Coverage against the Groundswell sheet

Compared against `content/sheets/groundswell.js` (595 lines): `meta` (Context, Role, Collaborators, Tools Used, Timeline, lines 71-77), `credits` (Design Team, Clinical Team, Funding, 83-94), `outcome` (30), `prints` (cover images, 36-41), `system` (synthesis exhibit, 100-107), `frame` (why 111, research 114, role 123, short versions, roleMore, partners), `components` (name, body, `mine` "My Contribution", media; 5 components), `process` (Research + Production galleries), `close`, `acknowledgements` (partners, three columns of people, footer), `reflection` (Sense / Weave / Shape cards, each with a from-to shift and three headed bullets). Marking is strict: HAVE only where her actual words or the actual assets exist.

| Section | Status | Source / note |
|---|---|---|
| Cover media / prints | **HAVE** | Homepage: animated logo video, reels, animation + UX videos, 5 stills (`app/(portfolio)/page.js:211-244`). Medium: embedded YouTube video "SomeBuddy: A Social App for Grad Students" (https://www.youtube.com/watch?v=pdlaitoGycA) + 32 images. |
| Cover facts: Context | **HAVE** | Medium: "**About:** Final project for Carnegie Mellon School of Design MA Interaction Design Studio II, Spring 2025" and "**Ask:** Develop a design ecosystem with at least one off-screen element..."; Squarespace L10 opening paragraph. |
| Cover facts: Role / titles | **HAVE** | `content/projects/somebuddy.md:8` "UX/UI Design, UX Research, Copywriting, Brand Identity"; Squarespace L10 (same). |
| Cover facts: Team / collaborators / client | **HAVE** | Medium: "**Team:** Lorin Anderberg, Yaezi Lee, Rui Ying"; "**Class:** Interaction Design Studio II, Ashley Deal + Raelynn O’Leary". CAUTION: `content/projects/somebuddy.md:6` lists "client: CMU Department of Student Affairs", but Squarespace L10 says Student Affairs "expressed interest" after the presentation; it was not a client. |
| Cover facts: Tools | **HAVE** | `content/projects/somebuddy.md:10` "Figma, After Effects, Adobe Illustrator"; Squarespace "Credits: SVG Repo Icons, Unsplash Images, CMU Images". |
| Cover facts: Timeline | **HAVE** | Squarespace "Duration: 5 Weeks" + weekly breakdown (Ideation, Research/Synthesis, Concept, Refinement, Presentation); `content/projects/somebuddy.md:9`; Medium "Spring 2025". |
| Tagline + one-line description | **HAVE** | `app/(portfolio)/page.js:204-206` ("Approachable Socialization for Busy Buddies" / "A product and brand system for university campuses..."). |
| Outcome line (masthead punchline) | **HAVE** | Squarespace L10 "Outcomes": Student Affairs "met with sincere interest, especially around incorporating SomeBuddy into Fall 2025 orientation... no next steps have been taken yet". Not in Medium or `content/projects/somebuddy.md` (its Context/Listen/.../Learn are all `[Add content]`). |
| Frame: project (why it exists) | **HAVE** | `content/projects/somebuddy.md:20-22` (Tension + HMW); Medium opening ("As CMU grad students, we’ve all felt isolated...", "**How can we create easy, low-pressure ways...**"). |
| Frame: what the research told us | **HAVE** | Medium: four research objectives, ecosystem map, 8 interviews and two findings, five design principles, three personas, storyboards + speed dating feedback. Squarespace "Research" section. |
| Frame: my role in detail | **MISSING** | No first-person contribution anywhere. Medium and Squarespace write in "we". Role line only (row above). The `MY PART.docx` Tab 1 that `BIRTHSTORY-copy-plan.md:11` says holds SomeBuddy contribution notes is not on this machine. |
| Components: name + body | **HAVE** | Medium describes each part with body text: orientation bingo, the app (post, match, filter, request/chat templates), badges + customization + collection page, bingo cards, brand/logo/typeface (Quicksand). Squarespace "The Ecosystem" same. |
| Components: “My Contribution” per component | **MISSING** | No per-component "my contribution" lines. |
| Components: media per component | **HAVE** | Homepage `somebuddy-logo`, `somebuddy-animation(-2,-3)`, `somebuddy-ux(-2)`, `somebuddy-reel(-2)`, `somebuddy-22/23/28/30/31` (`page.js:211-244`); Medium images (uncaptioned) + YouTube video. |
| Reflection: Sense (what I learned) | **MISSING** | No "what I learned" for SomeBuddy in any file. |
| Reflection: Weave (what I’ll carry forward) | **MISSING** | None. |
| Reflection: Shape (what’s next) | **HAVE** | Squarespace L10 end: "If we had more time to expand the work, we would host additional co-design workshops, conduct more interviews, test activities, and collaborate with developers to prototype the app." (team voice, not first person). |
| Process galleries (behind the scenes) | **PARTIAL** | Medium images show ecosystem map, flows, personas, storyboards, but are uncaptioned and cannot be read from text; originals in `~/Desktop/NEW 2026 Portfolio Files Cloudinary/SomeBuddy/` and `~/Desktop/somebuddy-clips/`. No behind-the-scenes photos mapped in `lib/cloudinary.js`. |
| Acknowledgements / credits / funding | **PARTIAL** | Team + instructors named (Medium); "Credits: SVG Repo Icons, Unsplash Images, CMU Images" (Squarespace). No thanks passage. |
| Synthesis exhibit (maps / diagrams) | **PARTIAL** | Ecosystem map and user flow appear only as uncaptioned Medium images; no text description of the map itself. |
| Hiring-manager answers | **MISSING** | None found. See `answers.md`. |


## Flags in this project's sources

- `content/projects/somebuddy.md:6` "client: CMU Department of Student Affairs" vs Squarespace: Student Affairs "expressed interest" (not a client).
- The Medium article is long (about 14 KB) and entirely "we" voice; no first-person contribution anywhere.
