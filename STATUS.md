# Project Status

## ▶ RESUME HERE (2026-09-06, session close)

**What we're doing: THE FOLDER SHEET**, on `feat/folder-expand`. The one-tab folder is
**settled — do not relitigate it.** This session worked her notes in four batches (full
detail = the FS ledger below): **FS1–FS4** (page break, signed annotations, card pair,
press credential), **FS6–FS16** (one rule weight, all-white text, overlay gallery paging
all 14 images with focus return, Lorenzi credit, 3 cards, CTB corners root-caused, CFA
article preview, the team gallery), then **four design passes** — finesse and bold and
system were each rejected (FS17 "novice youth… D", FS19 "eyes do not know where to look"),
and the **PRIORITY PASS** (`188677d`) is what now stands: THE SHEET SYSTEM as custom
properties on `.inner` (six type steps · one split, now used only by image pairs · one
label recipe · one 1px rule · four rhythm values), all prose in ONE reading column, the
title alone on the cover, exactly two serif statement moments (The outcome · The biggest
lesson). Read [[design-pass-bar]] in project memory before touching the design again.

**Look at it first:** `npm run dev -- -p 3005`, scroll to Groundswell, click **Open
project** (hard-refresh if the tab was already open).

**⚠ AWAITING: her verdict on the priority pass.** If it still misses, the agreed next move
is a VARIANT LAB (the N30 move): 3–4 genuinely different treatments of one component at a
lab route, she points, the winner becomes law — not a fifth solo swing.

### Standing context (from 2026-08-27, still true)

- Her copy lives with receipts at `content/sheets/groundswell.js` — nothing rephrased;
  gaps render as [LORIN TO WRITE].
- **The visibility gate** (`b291290`) is committed but **NOT in effect** (needs the
  cherry-pick onto `main` + `SITE_HOLD_PASSWORD` in Vercel).
- Safety: private mirror `lorin-a/portfolio-private` holds all branches + the bundle at
  `~/portfolio-backups/`.

### ⟢ OPEN NOTES LEDGER — Folder sheet, round three (2026-09-30, her verdict on the priority pass)

> **"OKay I am very pleased thus far."** Visual round only: **"I will not edit copy in this round just visual."**

| # | Note (her words) | Status |
|---|---|---|
| FS20 | "Depending on what is needed for mobile, I would prefer to see the Groundswell folder lip/title tab on the left like an actual manila folder" | ✅ SHIPPED — the tab sits at the folder’s left on the content gutter, so tab, title and every text edge share one left line at every width (measured 1440 / 1024 / 390). Mobile keeps it left too |
| FS21 | "the close symbol inside of the folder frame rather than on top of it" | ✅ SHIPPED — close moved inside the folder, below the tab line, on the content’s right edge; on phones it becomes an icon-only 44px circle so it never sits over text |
| FS22 | "I will not edit copy in this round just visual" | ✅ HELD — no copy edited. Structural additions only: the label “The project” over the frame paragraph, image alt text for the new gallery images (hers to rewrite), and the poem text + her Joy Harjo credit line, both already in the repo in her words |
| FS23 | "I feel that the rounded edge images look novice and naieve. I want a more sophisticated image set up" | ✅ SHIPPED — square corners on every photo and recording. Only the reflection cards keep rounded corners, because those are the printed cards’ real corners |
| FS24 | "I think it would look more sophisticated to show some kind of click gallery of images in their full size within the gallery box rather than a bento box style of different sized images and such" | ✅ SHIPPED — THE STAGE: each component is one gallery, one artifact at a time at its true proportions inside a fixed 3:2 mat (letterboxed, never cropped), with counter, arrows, a thumbnail rail, arrow keys, and click-through to the full-screen overlay. Galleries also grew: Garden 5, Pod 6, Library 4, CTB 5 |
| FS25 | "I love the flip cards" | ✅ KEEP — untouched |
| FS26 | "The poem is almost there but needs a more inviting and eye catching interaction, it currently looks like a line easy to miss, not asking the user to click--its a huge feature of the project and should take up space as such" | ✅ SHIPPED — the poem is its own full-width band on a tinted field: “Remember your heart.” set large, an 88px play button with one breathing ring at rest, a real seek bar and time, and the full poem text beside it that scrolls with the recording. Poem text moved to content/poems/groundswell.js, shared with the homepage intro |
| FS27 | "A lot of the text is left aligned and it makes the page look empty on the right side and makes it elongated unnecessarily, is there a 2 column set up or alternative that looks better?" | ✅ SHIPPED — each component is a narrow sticky text rail beside a wide work column; the frame and the close pair their blocks side by side with column widths proportional to word count, so paired blocks end together |
| FS28 | "The bottom gallery also needs to be something more sophisticated" | ✅ SHIPPED — behind the scenes is now a full-bleed filmstrip: one height, every photo at its own width, nothing cropped, horizontal scroll with arrows, captions under each |
| FS29 | "why must everything be so centered with tons of space on the left and right? Should we go for a more full width layout inside of the folder? Its looking a little like mobile-first and I would rather design for desktop first and make sure mobile looks clean" | ✅ SHIPPED — desktop first, full width inside the folder (max 120rem, 4vw gutter); one clean single column below 1000px. Sheet is ~17% shorter at 1440 (11,992 → 9,948px) |
| FS30 | "I want the ratio to be 80% visual 20% copy" | ✅ SHIPPED — the page runs on a rail : work proportion of about 1 : 3, the cover leads with the photograph, and the galleries carry more images, so visuals take most of every screen while no copy was cut |
| FS31 | "Very good. Make first image match height of text - it should be bigger so in line with \"01\"" (2026-09-30) | ✅ SHIPPED — the cover photo now starts exactly level with the “01” folio and ends exactly level with the last metadata line (measured 0px off at 1024 / 1440 / 1920), about 600px tall at 1440. Its left edge stays on the same line as every gallery below. To fit the rail, the title scales to the column (51px at 1440, 70px at 1920, was 86px); phones stack the photo under the facts at 16:9 | **Superseded by FS36:** title restored to full size; the photo fits the space instead.
| FS32 | "Make \"the project, \"the reseach\" and \"the outcome\" in one 3 column row" (2026-09-30) | ✅ SHIPPED — The project · What the research told us · The outcome now sit as one row of three equal columns under the cover, identical treatment (label + light serif at the statement size). The separate outcome headline is gone; the outcome is the row’s third part |
| FS33 | "shorten text to all match (lorin will edit later)" | ✅ SHIPPED, PROVISIONAL — cut and compressed from her own sentences, no new wording: project 52 → 29 words, research 85 → 27, outcome 23 unchanged. Short versions live in `frame.short` in content/sheets/groundswell.js with the full originals kept beside them for her edit |
| FS34 | "ensure all text is reaching accessibility requirements" | ✅ VERIFIED — scripted audit of every text element in the open sheet against its real background, at 1440 and 390: zero WCAG AA failures, lowest ratio 5.11:1 (the green labels; AA needs 4.5:1), no text under 14px, no control under 44×44px. Sizes are in rem, so browser text zoom scales everything |
| FS35 | "I feel the subheads in green are too small. even just visually they look too small" | ✅ SHIPPED — every green label (and the folio, counters, card names, close) went from 12px to 14px, one step in the sheet system, so they stay consistent everywhere |
| FS36 | "For the image resizing, I would rather adjust the image to fit inside the frame and keep text consistent" | ✅ SHIPPED — title back to its full cover size (86px at 1440). The cover’s left column now fits the title; the photo takes the rest of the row and crops to fill it, top on “01”, bottom on the last metadata line (0px off at 1024 / 1440 / 1920) |
| FS37 | "Match the rest of the layout to the three columns so that there is a unified layout design system" (2026-09-30) | ✅ SHIPPED as clarified by FS40 — one 12-column grid with one gutter under the whole sheet; sections keep their own shapes and share its lines |
| FS38 | "Same for the type system right now there seem to be inconsistencies across different type styles" | ✅ SHIPPED — six type sizes, each about 1.25× the last, one job each: label 14 · small 16 · body 19 · statement 24 · heading 32 · display 68 (at 1440). Audited: the open sheet renders exactly those six sizes and no others. Tab label matched to the label size |
| FS39 | "I like how big the 3 column text is but the body looks too small in comparison, can you adjust the body or does that mess with site-wide styles?" | ✅ SHIPPED — body raised to 19px at desktop (was 15px in the component text, 17px elsewhere). Answer to her question: it does NOT touch site-wide styles; the sheet’s type scale is scoped to the folder only |
| FS40 | "I do not want every section to be 3 columns, I like them how they are I just want the sizing of the 3 columns to fit into the overall layout ratio design system" (clarifies FS37) | ✅ SHIPPED — spans are 4·4·4 (frame row), 4|8 (cover, components, lesson, colophon, poem band) and 6|6 (closing pair). Measured at 1024 / 1440 / 1920: the rail, first frame column, cover facts and poem invitation end on the same pixel; the work, photo and poem text start on the same pixel. The rail widened from a quarter to a third to land on that line. Title display size set to fit one third (68px at 1440, 88px at 1920) |
| FS41 | "For the image galleries, it looks odd that there are only a few thumbnails, it would be better to either show none, or find a way to stretch them or do an alternative, I won't like them the same but just centered so don't try that" (2026-09-30) | ✅ SHIPPED — stretched: every gallery’s thumbnails now share the gallery’s full width equally, so four, five or six read as one complete index strip (measured: each strip = the stage’s full width, 824px at 1440, 318px on phones). Crops are fine there because the stage above shows each piece whole. Not centred, per her note |
| FS42 | "Make the poem in-line with the flip cards, perhaps in a mimic shape it will look better to have them all together in one line" | ✅ SHIPPED — the poem is now a card at the reflection cards’ exact proportions, corners and shadow, first in one row with joyful · exhausted · heartbroken across the whole Library component (3·3·3·3 on the grid; all four faces measured at the same 447px height at 1440). The card face holds “Listen”, the opening line, the whole poem scrolling with the recording, and the play control with its breathing ring; the title and her Joy Harjo credit sit under it like the cards’ names. Phones: poem card full width, flip cards as a swipeable row so none sits alone |
| FS43 | "Lets show three featured articles to go with the three column theme, here are two others: https://www.design.cmu.edu/news/concept-care-designing-groundswell-oncology-caregivers and https://www.design.cmu.edu/news/groundswell-creates-space-soul-co-designing-oncology-staff-upmc-magee-womens-hospital" (2026-09-30) | ✅ SHIPPED — “As featured in” is now a row of three on the sheet grid (4·4·4, measured on the same pixels as the frame row at the top), newest first: College of Fine Arts magazine (January 2026) · School of Design, “Groundswell Creates Space for the Soul…” (October 2025) · School of Design, “From Concept to Care…” (August 2025). Titles as published, dates read from each page. Each card is one link opening in a new tab: a screenshot of the article as published (the two new ones captured to match the existing CFA preview, saved in public/press/), publication and date, the headline, the publisher. The homepage card’s “Read the feature” link is unchanged |
| FS44 | "i don't like thumbnails at all so lets get rid of them and use the same style we have on the home page with dots in the middle, one universal style for galleries across the whole site" (2026-09-30) | ✅ SHIPPED — thumbnails removed. New shared component `components/GalleryNav/` is the homepage folder’s design (thin circle arrows at the ends, dots in the middle) and is now the only gallery control on the live site: homepage stack desktop + mobile (the mobile stack gained arrows), every folder gallery, and the behind-the-scenes filmstrip (one dot per photo). Marks stay small; arrows are 44×44 hit areas. Dots are 24×44: passes WCAG AA (24px) but under her 44px floor, because 44px-wide dots would push the 11-dot mobile row past a phone’s width; the arrows are the full-size path. The full-screen lightbox keeps its own side arrows (a viewer, not an inline gallery). Retired: the unused ProjectPreview carousel was left untouched since no page renders it |
| FS45 | "For the featured in, put the text on an overlay over the image to take up less space and be less noisy- on hover it can reveal full color no text but default is a faded darker overlay with text and CTA" | ✅ SHIPPED — each featured card is now the article page with a faded, darkened, softly blurred overlay carrying publication · date, the headline and “Read the article ↗”; hover lifts the overlay to show the page in full colour with no text. Keyboard focus and touch screens keep the text. Overlay text measured 8.9:1 or better against the brightest pixels behind it. Cards are 4:3 and grow when a long headline needs it (caught on phones) |
| FS46 | "In fact, make that the same for the hero up top, full bleed image faded with project context on overlay hover to see image in color" | ✅ SHIPPED — the cover is now full bleed: the hallway photo runs edge to edge under the tab line (top corners matching the folder’s), faded and darkened under the folio, title, tagline and the four facts as a 3·3·3·3 row; hover shows it in full colour. Overlay text measured 11.5:1 or better. Clicking still opens it full screen |
| FS47 | "We need to improve the mindfullness library section it looks messy and I think that is because of how many thing there are to showcase. We should be showing the auto-play embedded video of scrolling an iPhone through the screenrecording of the digital library, the flip cards, and the poem plus the gallery. What is the best most sophisticated minimalist and smartest way to rework that section?" (2026-09-30) | ✅ SHIPPED — four things, presented as three. (1) The gallery: photographs of the cards in use, beside the rail like every other component. (2) THE PHONE: the real iPhone recording of the digital library (gs-qr-library, which was not on the sheet before) auto-plays in a titanium iPhone frame while on screen, first in the deck row at exactly the cards’ height. (3) THE POEM plays inside the phone, because it is an item in the digital library: a mini-player on the screen, and pressing play turns the screen to the poem’s words scrolling with the recording. (4) The flip cards beside it, with the “three of nine” note heading only the cards. FOUND + FIXED: the Library gallery had been leading with the dashboard’s meditation view (New_Meditations), not the library; it moved to the dashboard gallery. The standalone poem card is retired |
| FS48 | "For the hero, it might look more beautiful to do a full color image + a watercolor maskoverlay that makes for a solid color bottom where the meta data can go, do you agree? Your current fade overlay is too black/dark/sharp" | ✅ AGREED + SHIPPED, with one refinement (title and facts both sit on the wash so the photo stays clean and needs no hover). The cover photo is full colour; a watercolor wash in Groundswell’s brand purple (#554E65, the colour its intro already uses) rises over its foot. The wash is generated by scripts/make-watercolor-band.py from the real scanned watercolor in the repo: a painted, thinning edge (alpha mask), granulation from the scan (soft-light) and a faint uneven rim, all colour-free so each project sets its own `band` colour. Text on the wash measured 5.84:1 or better against the actual pixels |
| FS49 | "I would rather it look like the image fades into white rather than a purple is laying on top of it. Like this: [Dragons reference: photo dissolving through a dry-brush torn edge into the page] sort of. Or if we do what you have then we need to be MUCH more blended like its one image not two or one with a mask" (2026-09-30) | ✅ SHIPPED — the photo itself now dissolves into the folder’s ground through a REAL painted edge: no layer on top, one surface. Interpretation stated to her: the folder’s ground is charcoal on this site, so the photo dissolves into charcoal (her reference fades to white because its page is white); a literal white folder would be a separate theme decision. The mask is built by scripts/make-cover-dissolve.py from a 5000px scan of a real watercolor stain (~/Desktop/groundswell-watercolor/public/watercolor-texture-3.png), its edge unrolled from polar coordinates at a matched step and its big swells half-levelled; the drips and ragged edge are the paint’s own. Title and facts sit on the ground beneath, rising into the dissolved edge. The FS48 purple wash and its three files are retired (the old script was renamed, not duplicated) | **Rejected by FS51:** “a blotch of blackness.”
| FS50 | "Another idea for the mindfullness library could be this, the most used cards: Grateful and Exhausted showcase the dichotomy. Then below in a 2x2 grid, the iphone (in matching width or the cards above + the powem in its own shape. What do you think? Or is there something even better?" | ✅ SHIPPED, her insight kept, her layout adjusted, reasons given once: a 2x2 would give ragged rows (a phone at card width stands ~34% taller than a card) and re-separate the poem we had just folded into the phone. Built instead: a TRIPTYCH on 4·4·4 — grateful · the phone (library + poem inside) · exhausted, the library holding both ends of the feeling. All three objects measured at one height (480px at 1440), tops level, each centred in its third. Note above: “The two most-used cards: grateful and exhausted. Turn one over for the somatic exercise.” (furniture, hers to rewrite). Phones: the three as a swipeable row. Her 2x2 remains a quick switch if she still prefers it |
| FS51 | "Lets do one thing at a time because these all failed. First, the watercolor overlay is a blotch of blackness its not working. Try something simpler to achieve the goal of showing the image and the text over it, revert to basic design skills like faded overlay perhaps over the whole image in brand purple? Or just the bottom? Do something clean, clear, and complimentary." (2026-09-30) | ✅ SHIPPED — basic and clean: the photo stays in full colour and one smooth gradient in Groundswell’s brand purple (#554E65) rises from the foot only (a whole-image tint would dull the art wall’s colour, which is what the photo is about). The gradient fades across the empty space above the text and is fully solid behind every word, so every line measures 7.0:1 at 390 / 1024 / 1440 / 1920 (measured against the real pixels). The dissolve mask and its script are deleted |
| FS52 | "Would it work better if Groundswell + title were on the left and the 4 meta data were in a 2x2 grid? then the overlay can be shorter?" (2026-09-30) | ✅ AGREED + SHIPPED — desktop: number, title and tagline on the left (6 columns), the four facts as a 2 × 2 on the right (6 columns), bottoms aligned; the purple is roughly half as tall, so more photo stays clear. Phones: text stacks, with a clear window of photo reserved above it and the crop shifted onto the art wall |
| FS53 | "What grid is the image aligning with it is both wider than the body and narrower than the groundswell label, it is too close to the top and the close button is overlapping which it shouldn't" (2026-09-30) | ✅ FIXED — diagnosis: the photo was full bleed to the folder’s own edges, so it matched neither the body text nor the tab, and it was pulled up into the close button’s band. Now it sits on the content grid: photo, tab, title and body share one left edge at 390 / 1024 / 1440 / 1920 (measured), and it starts below the close button at every width (phones got 5rem of top room for this) |
| FS54 | "No that I see the 2x2 metadata, id like to try the four inline with Groundswell title at the bottom with a line separating title from metadata verticaly. I can make the metadata text longer to be a better visual match to the height of the title" | ✅ SHIPPED — the caption plate beneath the photo: number, title and tagline on the left (4 columns), a vertical rule centred in the gutter, the four facts inline (8 columns, starting on the grid line). Phones stack them. Her plan to lengthen the fact text to match the title’s height will fit this as is |
| FS55 | "My worry is that we are trying to fit too much into a hero image -- if we make it longer we don't see the content below which we should see to show user to scroll. What are some other options to make this hero sing and be functional?" | ✅ ANSWERED + BUILT the recommendation: take the text off the photo. Photo clean and full colour, sized so the photo + caption plate + the top of the next section fit the first screen (the next section’s labels peek by 98px at 1440, 74px at 1920, 27px at 1024×768). Other options offered in chat: a slow Ken Burns drift on the photo, the photo swapping to the art-wall video, the name set large over the photo’s top-left only, or a two-photo split |
| FS56 | "I think we should go back to the original right side image left side text." (2026-09-30) | ✅ SHIPPED — restored the pre-overlay cover (the FS40 version): name, tagline and the four stacked facts in the left third (4 columns), the photo across the right two thirds (8), clean and full colour on the sheet grid. Measured at 1024 / 1440 / 1920: photo top level with “01” and bottom level with the last fact, to the pixel; title fits its third; photo below the close button. Phones: text first, photo at 16:9 beneath. The FS53 grid and close fixes are kept |
| FS57 | "I am still not thrilled but this is the best so far. Show me 3 options i could not have thought of myself" (2026-09-30) | 🧪 LAB BUILT — awaiting her pick. Open http://localhost:3005/?coverlab, open Groundswell, and use the switcher pinned to the bottom of the sheet (Current · 1 · 2 · 3). (1) AMBIENT BLEED: the photo, blurred past recognition and dimmed, becomes the light the whole cover sits in, edge to edge across the folder; photo crisp, text on its glow. (2) THE NAME, MADE OF THE PLACE: “Groundswell” across the full content width (measured 1247 of 1261px), the photograph showing through the letters and drifting slowly; tagline + the four facts in a row beneath. (3) THE ECOSYSTEM AT A GLANCE: the right side becomes five tall slices, one per component in its own image; hover or focus widens a slice and names it, click jumps to that section (the cover becomes the contents). All three on the sheet grid, no page overflow, reduced motion honoured. Code: components/ProjectSheet/CoverLab.jsx + .module.css; the shipped cover is unchanged until she picks, then the lab gets deleted |
| FS58 | "These are all interesting, 2 is a no. try again and this time keep playing with interaction, color, image and layout structure" (2026-09-30) | 🧪 LAB ROUND TWO BUILT — awaiting her pick. Option 2 (the name, made of the place) removed per her “2 is a no”; A (ambient bleed) and B (ecosystem slices) kept. New: C · COLOUR RETURNS — the cover in Groundswell purple edge to edge, the photo in a lavender duotone, and a soft circle of true colour follows the cursor (restoration where you attend); touch: tap to bring the colour back. D · SETTLE ON SCROLL — the first screen is the photo alone across the grid; the cover holds while the next 320px of scroll glides the photo into the right two thirds and fades the name and facts in, then releases (measured: photo 89→1351 at rest, 527→1351 settled, never under the close button). E · THE PRINTS — three photographs (hallway, pod, cards) stacked like prints; hover fans them, click brings one forward, click the front one for full screen. All five: no page overflow at 1440 or 390; reduced motion honoured. Same link: http://localhost:3005/?coverlab |

### ⟢ OPEN NOTES LEDGER — Folder sheet (2026-09-06, her verdict on the rebuilt sheet)

> **"I am VERY happy with this draft. I think it can be tightened up but overall very nice
> work."** The sheet's shape is blessed; the notes below are the tightening pass.

| # | Note (her words) | Status |
|---|---|---|
| FS1 | "I would like to see a page break line below the meta data" | ✅ SHIPPED — 1.5px ink rule closes the front-matter below the metadata, matching the sheet's major-break vocabulary (.deeper, .contents); the hairline above stays minor |
| FS2 | "a less generic/obviously AI callout design for my 'what I did' moments" | ✅ SHIPPED — the sage left-border callout (the AI tell, and identical to the outcome's treatment) is gone; each line is now a signed annotation: her phrase "What I did" as a small-caps sage label, the line itself in the site's italic serif voice at full ink |
| FS3 | "the flip cards to be a better and true to size with rounded corners design AND just show two side by side that are contrasting emotions" | ✅ SHIPPED — two cards, joyful against heartbroken (any other pair is a one-line swap in `content/sheets/groundswell.js`), at the deck's true 600×967 proportions (the old 3/4 box was cropping ~17% off every face, including the backs' Groundswell footer), radius-lg corners + shadow-md so they read as objects on the sheet. Click + keyboard flip re-verified |
| FS4 | "the read the article section to be more visual and official looking… featured in this publication type of thing. gives it credibility" | ✅ SHIPPED — a press credential: newspaper-masthead double rules, "As featured in" eyebrow, **College of Fine Arts** set large with the Carnegie Mellon University line, the article cited by its real title, pill CTA that fills on hover; the whole block is the link (new tab). Data-driven (`press` prop) so other projects keep the plain "Go further" link |
| FS5 | "Then we can work on copy" | ⏭ QUEUED — after the FS6–FS16 batch |
| FS6 | "the page break lines have unequal weights they should be the same" (2026-09-06, batch 2) | ✅ SHIPPED — every structural rule on the sheet is one 1px ink line (meta top+bottom, components, close, BTS, Go further, the audio frame). The press block's double rule stays: it is the masthead motif of that credential, not a page break — flag if it should match too |
| FS7 | "I prefer all white no grey text" | ✅ SHIPPED, sheet-scoped — every ink-light/ink-faint text tier in the sheet moved to full ink (num, tagline, meta labels, captions, card labels, partners, press lines). Sage labels stay sage. Measured zero grey text elements at 1440/390/reduced motion |
| FS8 | "the what I did sections are too plain and easy to miss" | ✅ SHIPPED — the annotation steps forward: a 2rem sage signature stroke opens the label, the line itself now clamp(1.125→1.3125rem) italic serif at full ink |
| FS9 | "The numbering of the sections feels weird and small" | ✅ SHIPPED — component numerals set in the heading serif at clamp(1.25→1.625rem), full ink, on the title's baseline |
| FS10 | "Lead with image/video before context or do title then image then description" | ✅ SHIPPED — took the second option: every component reads title → artifact → description → What I did → supporting media |
| FS11 | "Make images clickable into overlay gallery view… go through all of the project images in the folder BUT when they exit their cursor position remains the same" | ✅ SHIPPED — every public image opens the existing Lightbox; prev/next/arrow keys page all 14 folder images in reading order (components + BTS); ESC closes only the overlay (the sheet's ESC handler now yields); the sheet never scrolls and focus returns to the exact image they left from. Gated dashboard media is excluded — it is confidential |
| FS12 | "We need to credit Kevin Lorenzi photography" | ✅ SHIPPED — "Photography by Kevin Lorenzi." at the foot of the close, beside the partners line. Wording + placement hers to adjust; also flag WHICH photos are his if the credit should be per-image |
| FS13 | "Make the reflection cards full height/width of the section if that looks too big make it 3 cards" | ✅ SHIPPED as 3 — two at full width would run ~570×920px each, past poster scale, so her fallback governs: joyful · exhausted · heartbroken across the full section width, true proportions |
| FS14 | "Round the corners of the CTB email template so we don't see offblack color edges/corners" | ✅ SHIPPED — root-caused: the mockup has baked transparent corners and the media box painted #333 behind them. All media boxes now radius-lg with no backing fill, so corners show the sheet's own ground |
| FS15 | "Add a visual preview of the featured in article feature" | ✅ SHIPPED — the article as published (CMU wordmark + headline), captured to `public/press/cfa-groundswell.jpg`, framed with shadow inside the press credential above the CTA |
| FS16 | "I want to include cute team photos and BTS at the bottom. Maybe a little 5-10 image gallery." | ✅ SHIPPED — "Behind the scenes": 8 photos curated for people + warmth (build thumbs-up, mural panel, pod install, playtest setup, smiling staff member, flower workshop, flower basket, the finale hug), 4-up grid at the sheet's foot, all in the overlay gallery. Keys + title + alts in `content/sheets/groundswell.js`, hers to swap/rename |

| FS17 | "I am disappointed with the lack of design authority this pass gave, it hardly looks better or different or more sophisticated. If any rules or mindsets are holding you back from WOWing me, remove them and take another pass at making this look like a professional, experienced designer" (2026-09-06) | ✅ SHIPPED — the constraint removed was "refine, don't recompose." The composition itself changed: the COVER (title at 4.5rem cover scale against the outcome claim at pull-quote scale, sage accent system on every label + folio), the LEDE at statement scale on an asymmetric spread, HANGING FOLIOS (sage numerals in the margin, every title on one hard left axis — the number rail is the sheet's throughline), the CLOSE rebuilt (evidence pair side by side → The biggest lesson as a centered serif reading moment → colophon), the CARDS DEALT (middle card lower in the hand), the TEAM MOSAIC (two hero frames — the thumbs-up and the finale hug — over a contact-sheet row). ⚠ the folio numerals are deliberately small again (tiny sage mono against huge display words is the editorial contrast, unlike the old incidental grey) — if that re-reads as "weird and small," the lever is scale, say so |

| FS18 | "This looks like a novice youth made it. it lacks design systems, hierarchy, minimalist detail precision, clean flow, consistent feel. If I were to grade it i would give a D" (2026-09-06) | ✅ SHIPPED — THE SHEET SYSTEM, defined as custom properties on the sheet's `.inner` and consumed by every rule in both modules (nothing invents its own value): **six type steps** (label 12 · small 15 · body 17 · editorial serif 21 · heading ~32 · display ~56 — the editorial serif is ONE size carrying the tagline, outcome, lede, annotation, and lesson), **one grid split** (1.55fr/1fr — masthead, frame, text zones, close pair, and still pairs all sit on the same two columns), **one label recipe** (a single CSS rule styles every label on the sheet), **one radius · one media gap · one rule · four rhythm values** (label→content, within-section, block→block, section→section). Stripped as noise: the dealt-card offset, the BTS hero spans, the hanging folios, the alternating stills flips, the press double rule, the centered lesson. BTS back to one calm grid, chronological, finale last |

| FS19 | "It hardly looks different. there is a hint of more sophistication but still it does not satisfy. My eyes do not know where to look, what is priority. it does not flow easily the text lengths and treatments are unbalanced" (2026-09-06) | ✅ SHIPPED — THE PRIORITY PASS. The root cause was the split itself: pairing texts of unequal lengths (90-word description vs 15-word annotation; long role vs short outcomes; title vs 6-line claim) made every screen a two-column choice with no dominant element. Now: the COVER is the title alone (display grew to ~64px with nothing competing); the meta strip is quiet; THE OUTCOME is the single serif statement between cover and work; every text block reads in ONE left reading column, top to bottom; artifacts alone go full width; THE LESSON is the only other statement moment, at the close. Text splits deleted everywhere (masthead, frame, component text, close). The eye path per screen is singular: title → statement → work → lesson. If this still misses, the next move is an eyes-on variant lab (the N30 move), not a fifth solo swing |

### ▶ Next move

**Her verdict on the priority pass (FS19), then FS5: her copy pass.** FS1–FS4 shipped and verified 1440 · 390 · reduced motion (zero overflow, zero new console errors, flip works by click and keyboard, stylelint clean on the sheet files). Superseded: ~~her verdict on the rebuilt sheet~~ — delivered 2026-09-06, see ledger. Then, in order: **(1)** the 4-vs-5 component count —
she wrote "4 core components" and named five; the dashboard reads as the reporting layer
above the four. **(2)** The `[LORIN TO WRITE]` Timeline metadata (dates). **(3) The IRB
question, and it gates anything public**: the six-scale survey results are UPMC clinician
data, not the design team's usage data — **her own flag** — so confirm with the partners
before it ships. **(4)** The gate is committed but **NOT in effect**: it needs a cherry-pick
of `b291290` onto `main` (tested clean in a throwaway worktree, one file, sheet absent) plus
`SITE_HOLD_PASSWORD` set in Vercel. **(5)** Repoint `Go further` — all six hrefs still send
viewers to Medium, away from her own site.

### Still open, unchanged

The expand still plays as an **empty outline inflating** — at 60 ms the card's photo and label
are already deleted, and the scrim is bound to `landed` so the darkening arrives *after* the
growth finishes. Nothing travels. The sheet fill and the page ground are the identical
`rgb(37,37,37)`. The nav bleeds through the scrim beside the tab. `docs/lofi-expand.html` is
superseded; delete once the route lands.

### Gotchas from this session (full detail in project memory `REFERENCE.md`)

**Any `overflow` other than `visible` on a 3D flip container forces `transform-style` flat,
killing `backface-visibility`** — the card showed its FRONT mirrored, and every DOM value
measured correct, so only a screenshot catches it. **An em dash in a `WWW-Authenticate` realm
500s** in the edge runtime; header values are ASCII. **A 1.8 GB repo will not push in one
shot** — push `main` first, then each branch as a delta. **ESLint is not configured**;
`npm run lint` opens an interactive prompt, so the `lint-component.sh` hook cannot be running.

---

## ▶ ALSO LIVE — Birth Story (unchanged this session)

**What we're doing:** the Birth Story case study at `/projects/birthstory-care-pod`. The product
act up top is **blessed and done** — refine, never rebuild. The PROCESS half is being rebuilt
**punchline-first against her own hiring-manager research**, which is the correction that ended
three rejected passes.

### ★ THE STANDARDS THAT NOW GOVERN

1. **THE EDITORIAL QUESTION COMES FIRST (N45).** Before any layout: what is worth showing? Three
   passes were rejected because each answered a *presentation* problem when the real problem was
   that too much was on the page. **Her research settles it** — read
   `docs/deck-system/research/hm-rubrics-formats.md` and the **Question Map** in
   `docs/DECK_SYSTEM.md` before proposing structure.
2. **THE RUBRIC ORDER.** Decision rationale (the why) · role clarity (ambiguity is a stated
   *disqualifier*) · impact with evidence. **Process ranks FOURTH**, “as evidence of thinking, not
   documentation volume.” The #2 failure mode everywhere is *process dump / over-contextualizing*.
   Cold open = the punchline, Q7 first.
3. **OUTCOME IS THE VISUAL SPEC (N44):** `statement · one paragraph · one voice · one artifact,
   big`. When a section feels "crowded," **count its micro-labels and hairline rules** against
   Outcome’s (4 and 1) before redesigning anything. Repetition reads as calm; designing for variety
   IS the crowding.
4. **THE SILHOUETTE TEST (N40)** — cover the words; if the shape still says nothing, it is a
   paragraph in a costume. Run it on INHERITED components, not only new ones.
5. **THE MEASURE** — one 12-column grid (`sys.measure` + `.colsReading` / `.colsArtifact` /
   `.colsFull` / `.colsInset` / `.colsProse`). Every shape is a SPAN against it.
6. **Her lead grant (N38/N45):** curation, order, format AND content selection are Claude’s call —
   she has said explicitly to change anything, including retiring her own earlier ideas. **The words
   are always hers**: restructure and cut freely, never paraphrase; mark `[LORIN TO WRITE]` instead.
7. **No full-bleed images (N39).** Gradient and teal grounds for the exhale moments.

### ✅ SHIPPED THIS SESSION

- **02 merged, then subtracted, then scrapped and rebuilt** (`7113f5b` → `0a2e3f1` → `f009eb8`).
  The only pass that landed was the last one, and only because it stopped designing and read her
  research. Full account in **N43 · N44 · N45** below.
- **Q7 ANSWERED** (`bc9ddc6`) — the impact beat, owed since July and the highest-weighted item on
  the rubric. Her words, verbatim, in `docs/case-study-editorial/BIRTHSTORY-interview.md`.
- **01 THE FINDING** — the process half now opens on her Q7 sentence, with the evidence beneath it
  (the brief called sharing and partner participation optional; Care Pod shipped as one of five
  tabs). 3 micro-labels, 2 rules — fewer than Outcome.
- **02 ARCHITECTURE** — one statement, one artifact: the 4→0 collapse aria, built this session.
- **CUT:** the whole Brief chapter, the stat panel, the spec, the scoping tally, the design
  principles, the synthesis grid, the three moments, and the simulated chat card.
- **Two real bugs fixed:** the chapter spine blanked on any chapter taller than ~3,900px
  (unreachable observer thresholds — now measures visible pixels), and a sticky frame whose stage
  measured zero height.

### ▶ NEXT MOVE — Q3, HER ROLE

**Rank 2 on the rubric and a named disqualifier**, currently one row inside a six-row metadata
block: *“My partner Michael and I co-led research and information architecture. I led UX/UI, visual
identity, and UX writing.”* Good, honest sentence doing quiet work in a list. It needs to be
prominent and unmissable.

**Then, in rubric order — not chapter order:**
1. **03 Iteration** — the evidence-became-decisions beat (rank 4, and #1 for UXR specifically).
   Still 10 labels: three rounds each carrying two labelled voice-tracks under three *different*
   names, and Round 1’s quote sits inside the stage while Rounds 2–3 put it in the column. One
   convention, three times. Contain the crit-wall bleed (N39) while there.
2. **Q6 + Q8** — what went wrong, what she’d do differently. Both exist, both buried. Her research
   marks these **mandatory, never cut** — perfect-project narratives read as not credible.
3. **The “reclaim” beat** in 04 Identity — the clearest evidence of research changing her mind.
4. **One finishing pass page-wide**, then **delete the `/layouts` route**.

**⚠︎ Hers, not mine:** `bs-book-curate.png` has a device bezel baked into the export, so the Book
row shows a frame within a frame. Needs a screen-only re-export from Figma.

**Map:** every note she has sent = the `⟢ OPEN NOTES LEDGER` below (N1–N45) · the full curation
plan + component set = `★ THE CURATION PLAN` below · dev server on **:3001** · eyes-on
verification + the layout tripwires that cost real time = project memory.

---

## ⟢ OPEN NOTES LEDGER — Birth Story (live; every note Lorin sends lands here the moment it arrives)

> Standing rule (2026-07-05): no feedback note lives only in a conversation. Each one is logged
> here + as a harness task the instant it's sent, and closed only when done or explicitly deferred.

### 2026-08-03 — later notes (N22–N23)

| # | Note (her words, condensed) | Status |
|---|---|---|
| N22 | "improve these titles that I hate, they are too flashy, no big letter, looks unbalanced" (screenshot of a chapter statement with the giant ghosted numeral) | ✅ FIXED globally — removed the oversized ghosted chapter numeral (`.ghostNum`) + the ~22% indent it forced; every chapter statement is now flush-left, balanced, one tier smaller. The sticky nav + eyebrow already number the chapters. Verified 1440, stylelint clean, zero overflow/errors |
| N23 | "put the product section below the hero so its two fully immersive and differentiated parts then the process — but the process section needs to look MUCH more unified as a flow/content design" | 🟡 HALF DONE. ✅ **The restructure shipped** (`b7c4c44`): page now reads Hero → metadata → **PRODUCT** (act one, unnumbered, five full-viewport annotated stages) → **PROCESS** (01 Brief · 02 Research · 03 Architecture · 04 Identity · 05 Outcome) → Outcome/close. The two acts are differentiated by register: light identity-gradient ground + centred artifacts up top, flat paper + flush-left chapters below. ▸ **STILL OWED: the process-unify** — Brief/Research/Architecture/Iteration/Identity onto the one deep-dive grammar (see the unify plan) |

| N24 | "maybe the order is Hero → meta data → product preview" | 🔨 ACCEPTED into the N23 restructure — the Overview metadata block moves to sit directly under the hero as the masthead, product act follows it. Hiring-manager read order; also closes F19 ("I miss the metadata because that is more what hiring managers want to see") |
| N25 | "For product preview maybe instead of one small horizontal line with 4 screens side by side it could be scroll trigger full screen annotation views of each feature (with rebuilds adding animation where possible). See inspiration from my Presentation file (I have slides for each feature that can help with copy)" + screenshot of the deck's Care Pod slide (device flanked by dotted-leader annotations: Updates / Message Board) | 🔨 BUILDING. My counter-call, taken: **not a preview + a repeat — one product act.** The 4-screen `FeatureWall` overture is retired and the whole Interface chapter moves up under the metadata as ~full-viewport annotated feature stages (Documentation · Care Pod · Reflection · Search · The Book), each on the deck idiom she screenshotted, scroll-triggered, with the existing working prototypes (DocReveal / CarePodFlow / JournalFlow / SearchReveal) as the animation. Source deck for annotation copy: `~/Desktop/Portfolio/July 2025/Birth Story Presentation2.pdf` — checked; the deck's annotations are v1-era and describe the earlier wireframes, so the site's shipped annotations (which are insights, not descriptions) were kept. Flag if the deck language should govern instead. ✅ SHIPPED `b7c4c44`, verified 1440 + 390 |

| N26 | Her verdict on the first product act (2026-08-03): "try again on the design flow and scroll of the product section it does not look unified or clean or locked. It looks like its missing something, I wish there were sticky scroll type things to keep me anchored to read information, I wish the transitions were more interesting, I wish the text was more optimally arranged and sized. I might even miss the darker background. Try something better" | 🔨 REBUILD. Diagnosis: five identically-composed centred stages that scroll past each other = a slideshow with no spine; nothing persists, so nothing feels locked. The fix is a **pinned act** — one sticky frame holds while the beats change inside it: the device stays put and the screen changes within it, the copy column crossfades beat to beat, annotations restagger with their leaders redrawing. Dark ground restored (the app's own teal, the retired overture's surface). Text rearranged into a proper left reading column with real hierarchy instead of a centred label. Her five items tracked individually below | ✅ **SHIPPED `6743fef`** — all five closed: (a) pinned, 525vh track + one sticky frame, scroll advances beats · (b) dark teal ground restored, contrast measured 9.79/6.67/6.14 on it · (c) authored transitions (column builds in sequence, name wipes, notes land, leaders draw) · (d) real left reading column sharing a top edge with the device · (e) five-tick step rail at the foot so you always know where you are. Care Pod's photo released from the pin to close the act wide. Pin drops entirely under reduced motion and below 1000px. Verified 1440 + 390 |
| N27 | Her four notes on the pinned act, with screenshots at ~2000px (2026-08-03): "this layout looks incorrect as in not the right size for the page, its the right idea though" · "i am also not sure this header placement is working for me, seems off" · "I don't like pink text" · "Not sure I love the bottom placement of the horizontal nav for product features" | ✅ SHIPPED `0f16db5`. The act had been tuned on a 1440×900 laptop and did not survive a wide display. **(a) SIZE** — the device now scales with the viewport (it was capped at laptop size), the frame runs to 100rem, and the reading column balances against the device instead of top-aligning, which had left a lake of dead space below it. **(b) HEADER** — the opener is a title spread now (thesis left, the two orienting lines right, one rule across the top), not a left-hanging stack with an empty right half. **(c) PINK** — out of the type entirely; ONE accent carries every label, numeral, rule and emphasis, and it is the brand periwinkle (6.72 on the ground, against 4.5 for AA). **(d) FEATURE NAV** — no longer a horizontal bar at the foot, which duplicated the form of the chapter spine already at the top. It is a vertical index down the right edge in a gutter of its own (so it can never crowd the annotations), and only above 1500px where there is room; below that it goes and the "02 — OF 05" folio in the reading column carries the count. Verified 1998 + 1440 + 390 + reduced motion |
| N28 | "what if the main text and nav bar are left aligned in a light background and the right side is the dark annotated product preview" (2026-08-03) | ✅ SHIPPED `5498f8a`. **Two planes.** The reading column and the feature index hold a light plane on the left; the device and its annotations hold the dark plane on the right. The split runs edge to edge, painted as a hard-stop gradient on the sticky frame so it stays registered with the grid column above it. The index is left-aligned at the foot of the reading plane, anchored so it holds still while the beats change — it reads as a contents list now, not a rail, which also settles N27(d). The act still opens and closes dark, so the planes arrive with the features and leave with them. Two contrast bugs fixed en route (media captions 2.36→6.17, faint tier 4.45→4.85). Verified 1998 + 1440 + 390 + reduced motion |
| N29 | "I don't like the header of the section or the photo in the footer. The body content is also not working for me. Instead, can you replicate the scroll layout of the product section below that I do like? This would take a way a little from the immersive element but it would help establish a balanced layout that we can use throughout the rest of the page." (+ her clarification: the body content she means is the product act's own beats) | ✅ SHIPPED `91c7fcb`. **THE GRAMMAR IS NOW WORDS LEFT / ARTIFACT RIGHT.** (a) BEATS — the two planes were out of balance (dense artifact + two flanking notes on the right, vs a heading and one paragraph on the left). The notes moved into the reading column in the page's one annotation language; the artifact holds its plane alone and larger. This is also what makes the grammar replicable — any artifact can hold the right plane, where flanking dotted leaders only ever worked for a phone screen. (b) HEADER — no longer a dark title card; it's an unpinned instance of the same two planes (thesis left, context photograph filling the dark right). (c) FOOTER — the closing photo band is gone; the photograph moved into the opener's product plane. Contrast re-measured on both planes (the faint tier was 4.37 on light, under AA → teal at 5.27). Verified 1998 + 1440 + 390 + reduced motion. No copy touched |
| N30 | "that is not really what I asked… I was thinking that it would match the product section below during iteration phase which has an interesting scroll triggered motion for the text as if the text stays sticky with the content it is in reference to. You built a full wide screen offbeat version of that… I DO think there is a happy medium. Ask me questions to align and then give it one more try so that we finally have some type of universal language for the flow of the template" → then: "I am not sure what I prefer can you show me all 3 plus a fourth I could not possibly imagine myself?" | ✅ **ANSWERED — she picked 1 and 3; see N31.** My misread named: she was pointing at **SecIteration's `Round`** — contained rows in the page column, `.copy { position: sticky; top: 10rem }` beside a tall artifact stage — not a full-bleed viewport-pinned split. Rather than describe options, built all four for real at **`/projects/birthstory-care-pod/layouts`** (`ed3cbcd`), same three features and same copy in each so only the layout is compared: **A** the Iteration recipe unchanged · **B** the same rows on a full-bleed dark ground (geometry identical to A, only the band changes) · **C** the full-bleed pinned split planes that are live now · **D** the inversion — the artifact pins, the words scroll past it, the note in the reading band lights while the others recede. A hybrid is a valid answer ("A's containment with D's motion"). Also extracted the features into `productFeatures.jsx` so her copy lives in one place. **The lab route is deleted once she picks.** |
| N31 | "I like 1 and 3 the best. 3 would only work if each scroll TRULY earned a moment of isolation such as 'the ask, the research (a quote) the feature' or something to showcase process OR it was all product features and in that case might want to do proper annotation lines and callouts but not sure." | ✅ SHIPPED `384a4f6`. Her condition resolves 1 and 3 into ONE system rather than a choice. **THE UNIVERSAL GRAMMAR: THE ROW + ONE EARNED ARIA.** **THE ROW** (= lab variant A = `SecIteration`'s `Round`, the recipe she was pointing at all along): contained in the page column, copy left with the column `position: sticky` beside its artifact, artifact large on the right in the gradient stage. The opener is built as a row too. Documentation · Reflection · Search · The Book are rows. **THE ARIA** (= lab variant C, used ONCE): Care Pod, the one feature whose beats are genuinely different KINDS of content — and it already carries that argument in her own prose, so the three beats are her sentences split at their own boundaries, never rewritten: *the ask* (her role line verbatim) → *what one parent said* (set as the voice it is) → *what we built*. Five features pinned in a row was five of the same thing, which is precisely why the earlier version read as unearned. **CALLOUTS + LEADERS** live in the aria and nowhere else — the second half of her note. It is the one place where the artifact is big and alone enough for a leader to point at a region; in a row those same notes read in the copy column. They arrive on the last beat, once the feature exists. Reduced motion / <1000px unpins the aria into a plain three-beat row with everything visible. Verified 1600 + 390 + reduced motion |
| N32 | "I only see it on care pod and it looks a little glitchy not quite hitting the flow for the reader. every feature section will follow the same format right? is it better for each scroll to show one aspect of text at a time OR should the scroll 'fill in' a static set up text but in 3 scrolls for motion/isolation combined? not sure" | ✅ SHIPPED `f078623`. **(a) THE GLITCH WAS REAL** — the three beats shared one slot and swapped, so the outgoing text slid DOWN through the incoming text sliding UP: two elements crossing in opposite directions at every boundary. **(b) FILL IN WINS, and not only for steadiness** — swapping costs the reader the line they just read and gives no way to glance back. All three beats now hold their places from the first frame, each arrives as you reach it and stays, and the isolation comes from EMPHASIS (live beat carries the teal rule; already-read beats recede to half strength but stay legible). Space is reserved from the start so nothing on the page moves. At the end the whole argument is on screen at once. Dropped the `aria-hidden` too — nothing is removed, so nothing needs hiding. **(c) "only on Care Pod" is by design** — one aria per act; every other feature is a ROW, same format throughout. Care Pod is the only feature with three genuinely different kinds of content; giving the others a 3-beat aria would mean padding her copy to fill it. **Open for her:** if she wants uniformity over earned-ness, say so and every feature gets the aria treatment |
| N33 | "i like the reveal but it looks wrong/empty at first and the lines dont register as clues that more is coming, is there a better way to think about this?" (screenshot of the aria's first frame) | ✅ SHIPPED. **Both halves of that are one mistake:** reserving invisible space traded a layout jump for a void, and blank space cannot signal that more is coming — the 2px dots at the foot of the column were carrying that job and failing it. **THE REFRAME: show the OUTLINE, then fill it in.** All three labels (THE ASK · WHAT ONE PARENT SAID · WHAT WE BUILT) are present and ruled from the first frame, so the shape of the argument is legible before a word of it is; only the BODY of each beat expands as the reader reaches it. The upcoming labels ARE the clue. Dots deleted. Body opens on its own grid row 0fr→1fr, so a two-line beat and a six-line beat open in the same time and there is no magic max-height to keep in sync with her copy. Column is top-anchored: nothing already read ever moves. Also caught by measuring rather than looking — at 800px tall the fully-open column was 657px against 650px of frame; short viewports now step type and gaps down instead of spilling out of the pin. Verified 1600 + 1440×900 + 1440×800 + 390 + reduced motion |
| N34 | "I want to look at the product act… it got rebuilt three times and I haven't seen the final shape" (2026-08-03) | ✅ REVIEWED eyes-on, 1440 · 1998 · 390 · reduced motion, 13 scroll frames each. Zero x-overflow at every width; one pre-existing hydration warning (an SVG clip-path id, unrelated to the act). **Two defects found and fixed in the same pass, because both live in the ROW/chrome primitives that Brief is about to inherit:** **(a) THE CHROME SLICE** — the chapter spine was `rgba(paper, 0.92)` + `blur(8px)` over a ground that is one flat paper the whole way down, so the blur revealed nothing and only smeared the copy passing behind it; every row's heading got guillotined mid-glyph at the bar's rule as its sticky column released (worst on Reflection, where "Reflection" sat bisected). Spine is now opaque with a 1.6rem scrim beneath it, so a heading dissolves into the paper instead of being cut. **(b) THE ARIA'S OUTLINE FAILED AA** — the not-yet-reached labels (the exact elements N33 makes carry the "more is coming" clue) were dimmed to 45% → **1.9:1**, and already-read beats to 62% → **2.8:1**, both under the 4.5 floor. Rebuilt so the tiers recede by COLOUR, not opacity: all three labels hold full strength (the outline is legible from frame one, which is the point of it), read beats hold body tone at 7.06, and the LIVE beat steps UP to full ink at 13.38. Same hierarchy she asked for in N32, every tier readable. Verified: lowest measured tier in the aria is now 5.27 | ✅ SHIPPED |
| N35 | Three things the review surfaced that are **hers to call, not mine** — logged so they cannot drop | 🟡 (a) CLOSED · (b) HERS · (c) DEFERRED. **(a) THE DUPLICATE CAPTIONS — ✅ CUT** (2026-08-04), under her standing cut-not-paraphrase permission (F7), because it is a grammar rule Brief inherits and had to be settled before propagating: every row now reads identically — folio · name · role · lede · two labeled notes, artifact alone in its stage, no caption anywhere. The opener's photograph keeps its caption, which is a different object. Original note: — Care Pod, Reflection and Search each carry a `cap` under the device that now restates a note already in the copy column ("The deck deals a prompt; you write, and tag how it felt." vs the NO BLANK PAGE + TAG HOW IT FELT notes directly beside it). Documentation and The Book have no caption at all, so 3 of 5 rows carry furniture the other 2 don't. These caps are left over from the pre-N29 composition, when the notes flanked the device instead of living in the column. Recommend deleting all three — it is subtraction of redundancy, not of her voice — but they are copy, so hers. **(b) THE BOOK'S BAKED BEZEL** — `bs-book-curate.png` still shows a frame inside the site's own phone frame, plainly visible at 1440. Needs a screen-only re-export from Figma; it is the one thing in the act that looks unfinished. **(c) THE UNPIN RIDE** — a row's copy column releases when the row's content box ends, which is correct (it hands off with its artifact, and both bottoms land together), but rows are only ~990px against a 900px viewport, so the release happens while the artifact is still fully on screen. The scrim makes it read cleanly now; if she wants the copy to hold longer, the lever is row height, not the sticky |
| N36 | "i think its too much to have demo animation and text animation, leave the animation to the product feature not the text" (2026-08-03) | ✅ SHIPPED. Only one thing in the act was animating type — the Care Pod aria — so the scope was tight: the rows' copy was already static. **The aria's argument now sits still.** All three beats are composed and final from the first frame, both callouts and their leaders are drawn from the first frame, and every transition in the column is deleted rather than disabled (the `0fr→1fr` body opener, the beat opacity tiers, the leader's `scaleX` draw, the scroll listener and the `active` state that drove them all). The prototype inside the frame keeps its own timed sequence, and it is now the only thing moving. **The pin survives with one job:** hold the frame steady so the demo can play without the page sliding out from under it. Track cut from `beats × 100 + 30`vh (330) to a flat 170vh, since it no longer has text beats to pace — that is ~840–1120px of dwell depending on viewport, about one screen. Verified pinned-window measurements at 1998×1200, 1440×900, 1440×800: heading holds the same y across the whole travel, nothing rides under the chrome, the fully-open column never spills the frame (528px against 650px at the 800px-tall worst case). Reduced motion and <1000px unchanged, zero overflow, zero console errors, stylelint clean | ✅ SHIPPED |
| ⚠︎ | **The consequence of N36, named so she can judge it** — the aria's claim to "earning the scroll" (N31) rested on the three beats being revealed in sequence as genuinely different KINDS of content. With the type static, the aria is structurally a ROW that is held longer and carries callouts. Its justification now rests entirely on the Care Pod demo being worth the dwell. That may well be right — it is the concept's heart and the only feature with a real multi-state prototype — but if the held frame reads as dead air rather than isolation, the honest next move is to drop the pin and let Care Pod be the fifth row, with the callouts as its distinction | 🟡 HER CALL |
| N37 | **Her verdict on the product act (2026-08-04): "I am feeling much happier with the product section. It needs work but the overall is good."** Asked whether to perfect it now or move on | 📌 **THE ACT IS BLESSED AT THE STRUCTURAL LEVEL** — after three rebuilds, the shape holds. Call taken: **move on to the process half.** The remaining product items are all content-level, not primitive-level (the two primitive bugs were fixed in `e32d130`), and the grammar has only been proven against phone screens — until a row has carried a diagram, a wireframe set and a before/after, "perfect" is premature. Perfecting a template on one act and then discovering it does not survive the other four is the loop to avoid. Remaining act items stay logged in N35 and get one finishing pass once the whole page is on the grammar |
| N38 | "I hate when there are huge blocks of boring text if information can be portrayed graphicly with components i much prefer that its visual language that is easy for the mind to comprehend quickly." + **full creative lead granted**: "don't just take what I have and shove it together use your judgement and discernment to help me clarify what belongs, how it should look, what order it should be in. Be the pro here and i am just providing the preferences and all content for you to curate and discern" (2026-08-04) | 🔨 **THE MANDATE. Curation is mine; the words stay hers.** Restructure, reorder, cut, and reformat freely — but the inviolable holds: no paraphrasing her prose into my voice. Where a component needs a label that does not exist yet, it is marked `[LORIN TO WRITE]` with a specific prompt, never invented. Plan below |
| N39 | Also 2026-08-04: **"I don't love full bleed images"** · likes **gradient backgrounds and teal backgrounds** · colour-block decision deferred | 🔨 TAKEN. Exactly two full-bleeds exist: the Brief stock photo (`<Bleed>`, 100vw) and the Iteration crit-wall whiteboard (`<Bleed tall>`, 100vw × up to 780px). **The Brief bleed is cut outright** — it is a licensed Pexels stock photo carrying a chapter that contains none of her own work. **The crit wall is contained**, not bled: it is genuinely her artifact and worth showing at width, just not edge to edge. Gradient + teal become the grounds for the exhale moments, which is already the product act's stage vocabulary — it ties the halves without the process half copying the product half. This also answers the N29 open question (light vs dark process plane): neither, the exhales carry the colour and the rows stay on paper |

---

## ★ THE CURATION PLAN — the process half (settled 2026-08-04, under the N38 lead)

### The finding that reset the plan

A full content inventory of all six process chapters was run before assigning any layout.
**01 Brief contains zero artifacts of her own.** Its only image is a licensed Pexels stock
photo. The plan given an hour earlier — Brief as three ROWS, copy left / artifact right —
had nothing to put in the right plane, and would have meant inventing decorative images to
fill it. Caught by reading, not by building. Artifact counts, ranked: **Iteration 9**
(7 wireframe screens + the Zoom think-aloud photo + the crit wall) · **Brand 4** (wordmark
SVG, 10-chip palette, type specimen, moodboard) · **Architecture 2** (the two bespoke
measured IA diagrams — lowest count, highest craft, and a true before/after pair) ·
**Research 2** (the group-call chat card and the heard→learned→did matrix, both authored in
JSX rather than imported) · **Outcome 1** · **Voice 1**, typographic only · **Brief 0**.

### The rule that decides text vs component

Not everything becomes a graphic — that is how a page fills with decorative charts. The test:

> **If the content has STRUCTURE — a set, a sequence, a comparison, a proportion, a
> before/after — it becomes a component. If it is a single claim or her voice doing something
> only prose can do, it stays as type, and short.**

Prose survives in exactly three places: the chapter statement, her personal connection, and a
verbatim quote. Everything else on this page that is currently a paragraph is structured
information wearing prose, and converts. Working budget: **no prose block over ~60 words
survives** unless it passes the test above.

| N40 | "simply separating text into columns is not always enough to make it interesting, it then becomes a block of lines and text which is equally boring and space consuming" (2026-08-04) | 🔨 **THE SILHOUETTE TEST — now a gate every component must pass, not a preference.** She is pre-empting the exact failure of the progression idea: eight hairline rows of label-plus-line is a table, and a table is a wall with more rules in it. Separation is not information design. **The test: cover the words. Does the block still say something?** If the shape carries no meaning without its text, it is a paragraph in a costume and it goes back. What makes a component pass is that the FORM encodes the content — proportion shown as proportion, a set of five shown as five, a choice shown as chosen-versus-not, before/after shown at the same scale so the difference is the message. Corollaries, from GRID.md: ≥3:1 scale contrast where it matters, deliberate asymmetry rather than even fill, and never the same rhythm twice down a chapter |

### THE COMPONENT SET — six, and all six already exist latent in the page

Consolidation, not invention. Each replaces a class of prose and is reused across chapters,
which is what makes the page read as one system instead of nine. **Every one of them must pass
the N40 silhouette test before it ships: cover the words, and the shape must still say something.**

1. **THE LEDGER** — hairline-separated rows, label + one line. Generalised from the Research
   synthesis progression already built at N20. Replaces: Required/Provided, the colophon,
   the overview metadata.
2. **THE SPEC** — what was handed to her against what she had to invent. A two-track
   comparison. Serves Brief's ask band and Architecture's kept/added/cut.
3. **THE TURN** — before → hinge → after. Architecture's `4 → 0 questions` already is this;
   generalised, it serves any before/after on the page.
4. **THE CONTACT SHEET** — a set of screens on one baseline with mono captions. Iteration's
   two 3-up strips; the 21 wireframes on disk of which only 7 are currently used.
5. **THE SPECIMEN** — a made thing shown at true scale with its meta. Palette, wordmark,
   type, moodboard, the draft→rewrite copy pairs.
6. **THE VOICE** — a verbatim quote set as speech. Tester notes, the client quote, the sister
   quote in the group call.

### THE MEASURE — prerequisite, not cleanup

One 12-column grid at the 92rem sheet, defined once in `system.module.css`. The page
currently runs nine different proportions (`1.05fr/0.95fr`, `1.1fr/.85fr/1fr`, `27rem/1fr`,
`28rem/1fr`, `repeat(3,1fr)`…) — one per section, which is mechanically what "no grid" means
and the cause of the newspaper feeling named since F9. Every shape then becomes a SPAN
against that one measure, which is what makes alternative layouts complementary rather than
invented: **ROW** = copy 1–4 · empty 5 · artifact 6–12 · **SPREAD** = artifact 1–12, lede on
1–4 above · **PROGRESSION** = type 1–7, 8–12 deliberately empty · **INSET** = artifact 3–10.
Per GRID.md: the grid is made visible at the edges (folio numerals, the chapter footer rule)
and those edges align to the same columns in every chapter.

### THE SHAPE PER CHAPTER

| Ch | Shape | Why |
|---|---|---|
| 01 Brief | **PROGRESSION** + THE SPEC | Zero artifacts. Type is the artifact. It becomes the intake breath before the work starts |
| 02 Research | ROW + one **SPREAD** | Chat card is a row; the heard→learned→did matrix is 3 columns and takes the spread |
| 03 Architecture | **ARIA** (the one earned pin of the process half) | The 4→0 collapse: first version → the turn → what shipped. Three genuinely different kinds of content, already sitting there |
| 04 Iteration | 3 × ROW + one **SPREAD** | Already on the row recipe she pointed at. The crit wall is its exhale, contained not bled |
| 05 Identity | **SPREAD**-led | Four specimens; moodboard and the 10-chip palette want width. Voice's draft→rewrite pairs are a progression |
| 06 Outcome | **ROW** | One photo, short, closes quiet |

Read down: progression → row → aria → row → spread → row. No chapter leads with the shape the
one before it led with, and the exhales are spaced. **That is the answer to "it will feel
repetitive" — not alternation for its own sake, but each chapter getting the shape its content
already has.**

### TWO STRUCTURAL BUGS THE INVENTORY EXPOSED

- **Iteration is demoted.** It is authored as a `sub` FieldSection under Architecture with no
  number of its own — and it is the chapter with the MOST evidence of her work (9 artifacts).
  The richest proof on the page is currently a subsection. It should be its own numbered
  chapter.
- **The numbering disagrees with itself.** Voice is authored `num="05"` and Outcome `num="06"`,
  but the spine relabels them 04 and 05. One of the two is wrong on screen.

### ✅ PHASE 0 + 01 BRIEF — SHIPPED 2026-08-04

**The measure** is in `system.module.css` as `.measure` + role-named spans
(`.colsReading` `.colsArtifact` `.colsFull` `.colsInset` `.colsProse`). It
DESCRIBES the shipped product act rather than moving it — the row's copy column
already measured ~28rem, which is cols 1–4 of this grid — so it can be adopted a
chapter at a time without the blessed act shifting a pixel.

**Two real bugs found by measuring rather than looking**, both of which would
have poisoned every chapter that adopted the measure:
1. `margin-inline: auto` on a GRID ITEM makes the box shrink-to-fit instead of
   stretching. The twelve columns collapsed to 28px each and the whole block sat
   290px off the page's left axis. Fixed with an explicit `width: 100%`.
2. `app/globals.css` sets `section { padding: var(--space-lg) 0 }`, so any bare
   `<section>` carrying the measure inherited 64px of vertical padding that then
   stacked on `.flow`'s own gap — ~190px of dead paper between blocks. The
   measure now zeroes its own padding-block; vertical rhythm belongs to `.flow`.

**01 Brief** rebuilt as PROGRESSION + THE SPEC. Cut: the full-bleed Pexels
photograph (N39), the bordered Myana card (now an inline attribution — a card
around a hyperlink is furniture, not information), and the 3-column ask band.
Built: **THE STAKES**, where three figures that were a stat column are drawn as
what they are — the two shares on one shared 0–100 track so they read against
each other and against the whole, the ratio held OFF that track as one bar
against three, because plotting a ratio on a percentage scale is a lie about the
scale. Sober treatment throughout: 2px rules, small type, one colour, no fill
animation — the subject is people dying. And **THE SPEC**, two tracks of equal
total width where only the subdivision differs, so three solid blocks over five
hollow ones says "three to solve, five to choose among" before a word is read.
It also plants Architecture's kept/added/cut as the payoff for a choosing this
chapter only poses. Her copy 100% verbatim; nothing written.

Chapter height 1830px → **1398px** at 1440 with two graphics ADDED. Verified
1440 · 1998 · 390, zero overflow, zero console errors, stylelint clean.

**Refinements deliberately left for her eyes first:** the five hollow Provided
blocks rag 2/2/1 at 390 and leave an orphan; the chapter has real hierarchy at
its statement but is fairly even below it; and the two graphics are Brief-local
until a second chapter needs them, at which point Spec and Stakes get promoted
into `kit.jsx` as shared components.

### N41 — her verdict on the first Brief, and the reformat

> "It looks like we are stretching out sparse content and trying to make it interesting. There
> must be a better way to format this. it does not need to be this long either." (2026-08-04)

✅ **SHIPPED — and the diagnosis was a format error, not a decoration one.** The first build
made Brief a SEQUENCE: block, gap, block, gap, block. A sequence has to be fed, and with this
little content that meant inflating each band to fill it — exactly what she saw.

**But a brief is not a sequence, it is a DOCUMENT you take in at once.** So the chapter is now
ONE composed sheet on the established row geometry: the words left (the setup · who asked ·
her own stake in it), and the brief itself — THE SPEC and THE STAKES — as the artifact plane
on the right. Everything visible together, read in about ten seconds, then out of the way so
the real work starts at Research. **The artifact for the one chapter containing none of her
work is the ask she was handed** — which also means Brief now obeys the page grammar instead
of needing a fourth shape.

**1830px → 1398px → 961px at 1440**, with the two graphics kept. Nothing of hers was cut in
this pass; it is the same content composed rather than stacked.

Third instance of the same root cause, now worth remembering: `globals.css` sets
`section { padding: var(--space-lg) 0 }`, so ANY bare `<section>` inherits 64px of vertical
padding. It cost 190px between the first build's bands and another 128px between the two
graphics. **Any new component built as a `<section>` must zero its own padding-block.**

### ✅ 02 RESEARCH — first pass shipped 2026-08-04

**The curation call that mattered:** the chapter's CLAIM and its EVIDENCE were separated by an
artifact. The statement says *"Capacity rises over time, so the app had to meet three different
moments, not one"* — and the proof of exactly that was tucked into a bordered aside beside the
chat card, styled as a minor list. Promoted to its own component, **THE THREE MOMENTS**: three
beats on one time axis with a capacity bar that grows a third, two thirds, whole. Cover the
words and the staircase still says *it rises.* Her phases and wording untouched.

**Cut:** the second licensed Pexels photograph. It was the page's second stock image, it sat in
a chapter that has real artifacts of her own, and a `<Split>` was spending half its width on
decoration. Cutting it is what let her thinking sit in the reading column beside the research
it came from, instead of floating in its own band.

**THE ROW:** her words and reasoning left, the group call right — an artifact she authored, and
this chapter's hero evidence. Replaces the ad-hoc `1.05fr / 0.95fr` pairing with the measure.

**THE SECTION-PADDING BUG, FIXED AT THE SOURCE.** Rather than patch it a fourth time,
`.flow > section { padding-block: 0 }` now neutralises the `globals.css` rule for every chapter
child. `.flow` owns the chapter's vertical rhythm; its children do not get to add to it. That
alone took another 244px out of Research.

2714px → **2286px** at 1440. Verified 1440 · 1998 · 390, zero overflow, zero console errors.

**Not yet done in this chapter, and honestly flagged:** the synthesis matrix is still on its own
bespoke widths rather than declared as the measure's SPREAD, and the chapter has not had a full
top-to-bottom eyes-on read at her bar — only its individual blocks were verified. Both are the
next pass.

### N42 — Research rejected, and the merge that answers it

> "research is ALL text and lines…boring blocks, too much to see, not enough design should we
> be thinking about research and IA as one category?" (2026-08-04)

**She is right, and the failure is specific: the silhouette test was written as a gate and then
applied only to the NEW components, not to the inherited ones.** Audited honestly, Research is
~95% type. The two things called "artifacts" in the inventory — the group-call chat card and
the heard→learned→did synthesis matrix — are both *text arranged in boxes*. **Cover the words
on the synthesis matrix and you see an empty 4×3 grid. It says nothing.** It fails the gate.
The three moments and the group call pass; the matrix and the principles do not.

**AND THE MERGE IS THE ANSWER — her instinct is correct, for a reason worth writing down.**
Research has almost no visual artifacts of its own (2, both typographic). Architecture has the
page's two highest-craft objects: the measured, live-rendered IA v1 and IA final diagrams.
Meanwhile the synthesis matrix's "what we DID" column and Architecture's "what SHIPPED" are the
same claim told twice — once as a text grid, once as a diagram. **Merged, the research findings
stop needing their own furniture and become annotations on the diagrams that already prove
them.** The text dies and the drawing carries it. That is the fix for "all text and lines," and
no amount of restyling the matrix would have achieved it.

**THE MERGED CHAPTER — 02 Research & Architecture**
1. The claim — capacity rises, three moments (the graphic KEEPS, it passes)
2. The evidence — the group call (KEEPS, her authored artifact)
3. **THE ARIA** — the 4→0 collapse, already the named candidate: IA v1 → the turn → what
   shipped. Three genuinely different kinds of content, and the page's best drawing.
4. The heard→learned→did rows RETIRED as a standalone grid; the four "did" claims become
   annotations hung on the two diagrams.
5. Principles close it.

**The merge is also a CUT, which is the point** — the matrix's 12 text cells collapse into
diagram annotations, and Architecture's own prose (the "shift" panel, the two "moves" cards,
the scoping paragraph) is largely redundant with what the diagrams show. Merging without
cutting would just make one very long chapter; the cut is what makes it work.

**IT ALSO FIXES THE NUMBERING AND THE DEMOTION.** New spine: 01 Brief · 02 Research &
Architecture · **03 Iteration** · 04 Identity · 05 Outcome. Iteration — the chapter with NINE
artifacts, the most evidence of her actual work on the page — stops being an unnumbered
subsection. That was already logged as a structural bug; the merge frees the number.

🔨 **NEXT BUILD.**

### N43 — the merge brief (2026-08-04, her session-opening batch)

> "merge Research and Architecture into one chapter (02), so the research findings become
> annotations on the two IA diagrams instead of a grid of text cells. Build the 4→0 collapse as the
> aria, cut the redundant prose, and renumber the spine so Iteration finally gets its own chapter."
>
> Plus two judgment calls she carried in herself: **"The merge only works if it's also a cut.** If
> the synthesis grid survives as a block and Architecture keeps its 'shift' panel and 'moves' cards,
> you'll get one very long chapter instead of one good one." And: **"I rejected Research because it
> failed a standard I'd written myself three messages earlier. The same risk applies to
> Architecture — its two diagrams are genuinely strong, which makes it easy to leave the prose
> around them unexamined. Worth asking me to run the silhouette test on every block of that merged
> chapter before I call it done, not just the new ones."**

| # | Item | Status |
|---|---|---|
| N43a | Merge Research + Architecture into one chapter 02 | ✅ **SHIPPED.** One `FieldSection id="research" num="02"`, crumb *research & architecture*, Weeks 2–3. Architecture's thesis becomes the chapter's (it is the one that spans both halves: a research finding with a structural consequence). Research's own statement demotes from h2 to the lede of THE THREE MOMENTS — the graphic that proves it, and what it was really the caption for all along. `SecArchitecture.jsx` + `.module.css` deleted |
| N43b | Findings become annotations on the diagrams; the synthesis grid retired | ✅ **SHIPPED.** The 12-cell heard→learned→did grid is gone. Row 1's tester line hangs on **ia-v1** (the version it killed). Rows 3 and 4 hang on **ia-final**, each with a rule exactly one diagram-column wide and a dotted stem rising into the tab it produced — Home and New Note. Row 2 (the "reclaim" copy finding) is deliberately not among them: it is a copy finding, and 04 Identity already carries it with the parent's verbatim quote and the draft → rewrite pair. The middle "learned" tier is cut throughout — the diagram is what was learned |
| N43c | The 4→0 collapse built as the aria | ✅ **SHIPPED** — `IaAria.jsx`. A band of words across the top (the drawing is wide, so 28rem of words beside it was the wrong frame), the drawing full width beneath. Three beats: the first answer → what it actually did → what shipped. **What moves is the drawing:** v1 recedes, a wash of paper carries the count onto it, the shipped tree arrives in its place. All three labels hold full ink from frame one so the argument's shape is legible before it is read (N33/N34). Track 285vh. Unpins entirely under reduced motion and below 1000px, with both diagrams and all three beats fully visible |
| N43d | Cut the redundant prose (shift panel · moves cards · scoping paragraph) | ✅ **SHIPPED** — full cut list below, so any of it can be restored |
| N43e | Renumber the spine — 03 Iteration gets its own chapter | ✅ **SHIPPED.** 01 Brief · 02 Research & Architecture · **03 Iteration** · 04 Identity · 05 Outcome. Iteration is no longer a `sub`; it carries `num="03"` and its own Weeks 3–5 stamp. Voice 05→04 and Outcome 06→05 in the authoring, so the numbers finally agree with the bar. Gradient stops redistributed across five: blush → peri → dusk → sage → slate |
| N43f | Silhouette test run on EVERY block of the merged chapter, inherited ones included | ✅ **RUN — 7 pass, 2 flagged** (below). She was right that the risk was the inherited prose: the two flags are both on blocks I did not build this session |

**THE CUT LIST — everything removed, and where it went.** Logged because it is her prose:

| Cut | Where it lives now |
|---|---|
| The synthesis grid's four "learned" lines | **Gone.** Provisional copy from L6/L8; the diagram is what was learned |
| Synthesis row 2 (*Why "reclaim"?*) | 04 Identity, in her own prose + the parent's verbatim quote |
| Architecture's "the shift" panel | Verbatim, as the aria's third beat |
| Move card 1, "Open into the task" | Its last two sentences (*If a parent never leaves the home page…*) now LEAD the scoping ledger, replacing a provisional headline I had written. Its opening sentence about embedding options inside a simple core is **cut** — the shipped diagram draws exactly that |
| Move card 2, "Unify, don't fragment" | **Cut.** The New Note annotation carries the what; 03 Iteration already carries the why in her words (Round 2: *"I consolidated everything into one filterable notes section"*) |
| The scoping lead paragraph (*Three areas were required…*) | **Cut** — 01 Brief already draws it as three solid blocks against five hollow ones |
| The provisional headline *"The research kept telling me to leave things out."* | **Replaced** by her verbatim sentence above |

**THE SILHOUETTE VERDICTS** — cover the words; does the shape still say something?

| Block | Verdict |
|---|---|
| Chapter statement | Exempt — a thesis is prose by definition |
| The research row (her prose + MY THINKING) | ⚠️ **Weak.** A reading column with one labelled aside. It is her voice, which the standard exempts, but the Insight runs **71 words** against the ~60-word budget — the longest prose block left in the chapter. Hers to keep or trim |
| The group call | ✅ Three bubbles left, one filled dark right — *a conversation, and one voice mattered more* |
| The three moments | ✅ A staircase — *it rises.* Still the cleanest graphic in the chapter |
| The aria's band | ✅ Three markers on a rule, one lit — *a three-step sequence, and you are here* |
| The aria's plates | ✅ A dense branching web → a huge numeral → a clean five-column tree. *Complicated became simple*, with no words at all. This is the chapter |
| The aria's findings | ✅ Two short rules under two named columns, stems rising into them — *these parts came from somewhere* |
| The scoping ledger | ⚠️ **Weak, plus a factual gap.** The shape says "a set sorted three ways, some struck out," but it never shows the five AS five. And the kicker claims *five optional features on the table* while kept (2) + cut (2) accounts for four — **Partner Participation is unclassified.** It plausibly became the Care Pod, but that is a fact about her project, not a call I should make. **Hers.** Once she says, this can be redrawn as the five hollow blocks from Brief's SPEC resolving one by one, which would pass properly and pay Brief off visibly |
| Design principles | ✅ **Earned it this pass.** Four blocks in a 2×2, two carrying an extra tier on a periwinkle rule — *four claims, two of them revised by testing.* As four plain text blocks it failed |

**TWO BUGS THE MERGE EXPOSED, both fixed:**
1. **The chapter spine blanked on any tall chapter.** It ran on `IntersectionObserver` with `threshold: [0.15, …]`; a 5,477px chapter can only fill ~0.11 of a viewport shrunk by the rootMargin, so it never crossed the threshold, no callback ever fired, and the bar hid itself. Iteration was already failing this way and had been masked by sharing a node with a short section. Rewritten to measure **visible pixels** in the reading band — no thresholds, and it cannot be outgrown. Verified against all seven tracked sections.
2. **The pinned frame measured zero.** `align-content: center` on the sticky grid made its row content-sized, so the frame's `height: 100%` had nothing to resolve against and the stage's `minmax(0, 1fr)` came back 0 — the drawing had no height to be fitted into.

**Measured, not eyeballed:** 1440×900 · 1440×800 · 1998×1200 · 390×844 · reduced motion. Zero x-overflow at every width, zero console errors (one pre-existing SVG clip-path hydration warning, unrelated), stylelint clean. The first diagram renders at **scale 1.0** at 1440×900 and 0.88 at 1440×800 — the laptop case is the real case, so the band, the findings row and the diagram's own padding all give up height before the drawing gives up legibility. Chapter height **4,982px** at 1440: about what Research + Architecture were together, but roughly half of it is now one held frame with a drawing in it rather than blocks of text.

**⚠︎ One deliberate departure from N36, flagged so she can overrule it.** N36 says the motion belongs to the artifact, not the type — so in the aria the live beat's sentence cross-fades as the drawing changes. The reasoning: there, a demo ran its own timed sequence against static text and the two competed. Here the drawing and the sentence change on the same scroll gesture, and a sentence describing the drawing would be describing the wrong picture if it stayed. All three sentences are in the document at all times, and off the pin they simply read in order. If she wants zero type movement, the fix is to show all three at once in the band.

### N44 — "this feels complex and crowded" → THE SUBTRACTION PASS (2026-08-04)

> "I'm really not thrilled with the brief to iteration section… Perhaps I cut it altogether OR we
> simplify radically. The other sections feel spacious, calm, intuitive. This feels complex and
> crowded." Then, when I came back with a new structural system: **"are you sure the answer is not
> even simpler than this?"** And then: **"you are still trying to work with my content as is — I
> want you to take FULL control and change ANYTHING about it. we dont have to do chat thats an
> older idea. what MAKES SENSE?"**

**THE DIAGNOSIS, MEASURED.** It was not text and it was not layout — the calm chapters and the
crowded ones use the SAME components (Outcome, Identity and Iteration's rounds are all copy-left /
artifact-right). The difference is only how much each object announces itself:

| Chapter | micro-labels | rules |
|---|---|---|
| Outcome (*"spacious, calm"*) | **4** | 1 |
| Brief | 7 | 1 |
| Identity | 8 | 4 |
| Iteration | 10 | 6 |
| **Research & Architecture** | **24** | **70** |

A page where every object wears a small uppercase label on a hairline reads as a form to fill in —
which is exactly what her own copy criticises the first build for being (*"a form at the front desk
while you're still catching your breath"*). The case study had become the thing the product was
designed not to be.

**Two mistakes of mine, named.** (1) I answered a crowding complaint by designing a NEW SYSTEM — a
weekly timeline, a fusion, a three-variant lab — when the page already contained the answer. That is
the failure mode written into her CLAUDE.md: benchmark first, name the smallest delta. She caught it
in one line. (2) The curation plan I wrote optimised for VARIETY (*"no chapter leads with the shape
the one before it led with"*). Variety is the crowding. The product act is calm because it has two
shapes repeated five times.

**THE SPEC IS OUTCOME, and it is four elements:**

> **statement · one paragraph · one voice · one artifact, big**

**✅ SHIPPED on 02 (`0a2e3f1`) — no layout rebuilt, no artifact lost:**

- **The chat card is retired.** It was a group text *simulated in JSX* — bubbles, header, provenance
  note, shadowed card — standing in for research that happened on a real call. A drawn interface is
  not an artifact, it is a prop, and it had the best sentence in the chapter sitting inside a 1.2rem
  bubble. **What research leaves behind is a person's words**, so the plane now holds one verbatim
  quote at display scale, its attribution, and the asks from the same conversation under one
  hairline. No card, no bubbles, no shadow.
- **The MY THINKING chip is gone from this chapter** — the whole column is her voice, so the label
  announced what the reader already knew. (The device stays where her voice needs telling apart from
  a tester's; hers to restore here if she disagrees.)
- **The aria's plate tags are gone** — "ia-v1 · the branching questionnaire" sat directly under the
  label THE FIRST ANSWER and said it twice. So is the tester attribution label.
- **THE THREE MOMENTS is cut, and parked not deleted.** A good graphic, but it argued a SECOND claim
  inside a chapter that already has a thesis. Her sentence survives as the reading column's close.
  The three phases (early in the fog · later once it lifts · in the end) describe how the PRODUCT is
  used over time — they belong to the product act.
- **THE RECORD.** The scoping tally and the design principles stop competing with the argument and
  gather at the chapter's foot, quiet and small, under one label instead of one each. This is the
  seed of a page-wide record: Brief's stakes and spec, and Iteration's "what I couldn't test," join
  it when those chapters take the same pass.

**24 labels → 16**, of which five are the diagram's own tab names and three are the aria's beat
structure: **three pieces of furniture remain.** Chapter 4,982px → 4,504px. Zero overflow at 1440
and 390, zero console errors, stylelint clean.

**▶ OWED NEXT — the same pass on Brief (7 labels), Iteration (10) and Identity (8).** Iteration is
the one to watch: three rounds each carrying two labelled voice-tracks in three different labels
(MY THINKING · THE FEEDBACK · WHAT I COULDN'T TEST), and Round 1's quote sits inside the stage while
Rounds 2–3 put it in the column. One convention, applied three times.

### N45 — "SCRAP IT" → the process half rebuilt on her own hiring-manager research

> **"Im sorry to say but I HATE this. We need to absolutely scrap and start over and consider what
> is worth showing and how."** Then: **"I am with you AND lets think about what a hiring manager
> wants to see/know about my process."** Then Q7, and the call: **the collective opens it.**

**The lesson, and it cost three rejected passes.** N43 merged, N44 subtracted, and both were
answers to *presentation*. The problem was never presentation — it was that nobody had decided
what belonged on the page. The fourth attempt stopped designing and read her own research:
`docs/deck-system/research/hm-rubrics-formats.md` + the Question Map in `docs/DECK_SYSTEM.md`,
collected July 2026 and **never once applied to the site.**

**What it says.** In weight order: **decision rationale (the why) · role clarity (ambiguity is a
stated disqualifier) · impact with evidence (the strongest seniority discriminator).** Process
ranks **fourth**, and only "as evidence of thinking, not documentation volume." The #2 failure mode
across every source is *"process dump / over-contextualizing / slow wind-up."* Screening is **2–3
minutes per portfolio, some under one** — against a 20,000px page. And her own approved deck spec
(2026-07-03) says slide one is the punchline, **Q7 first**.

**The audit against her eight questions:** Q4 and Q5 answered strongly (the 4→0 aria closes the
most-cited UXR gap). Q1 over-answered. Q3 answered but buried in a metadata row. **Q7 was the
gap** — flagged as the weakest beat in her own doc since July, sitting as `[LORIN TO WRITE]`, and
the highest-weighted item on the rubric.

**✅ Q7 ANSWERED (2026-08-04), her words, saved verbatim to
`docs/case-study-editorial/BIRTHSTORY-interview.md`:**

> "if we did not learn about the importance of the collective experience of the birth as well as
> the individual we may have missed a crucial aspect of the ecosystem"

Her call: **the collective opens the case study**, and this sentence ships close to verbatim — the
"maybe it's the thesis that" hedge trimmed at her instruction, a comma added to a long conditional,
nothing else touched. It beats the client quote because it is a claim about what the research
FOUND, not how the work was received. **And the evidence is a fact, not rhetoric:** the brief listed
*Sharing* and *Partner Participation* as two of five OPTIONAL features; Care Pod shipped as one of
five primary tabs. The promotion is the impact.

**✅ SHIPPED (`f009eb8`):**
- **01 THE FINDING** — her Q7 sentence as the chapter statement, one line of evidence beneath it,
  then her research, her stake, and one voice (her sister, verbatim, at display scale). **3
  micro-labels, 2 rules** — fewer than Outcome, the chapter she called calm.
- **02 ARCHITECTURE** — one statement, one artifact: the 4→0 aria. Q4 and Q5 answered by a single
  object.
- **The N43 merge is undone.** It existed because Research had no artifact of its own; the
  editorial cut dissolved that premise — the artifact turned out to be the voice.

**CUT, because nothing in her research asks for it** (all recoverable from git):
| Cut | Why |
|---|---|
| The entire **Brief** chapter | The assignment she was handed, not her work. Its one useful line is now a metadata row — *"context capped at one beat"* |
| **THE STAKES** (80% / 65% / 3×) | Figures from the brief, and a stat panel is how every student case study opens |
| **THE SPEC** (required vs provided) | Same — the ask, not the work |
| **The scoping tally** (2 kept / 1 added / 2 cut) | On no rubric anywhere in her research. Also had an unresolved factual gap (five on the table, four accounted for) |
| **The four design principles** | Claims, not evidence. On no rubric |
| THE THREE MOMENTS · the synthesis grid · the chat card | Retired in N43/N44; see those entries |

Research + Architecture **5,465px → 3,665px**; page 20,164 → 19,437. Zero overflow at 1440 · 1440×800 ·
390 · reduced motion, zero console errors, stylelint clean.

**▶ OWED NEXT, in rubric order — not chapter order:**
1. **Q3, role.** Rank 2 and a named disqualifier, currently one row in a six-row metadata block. It
   needs to be prominent and unmissable.
2. **03 Iteration** — the evidence-became-decisions beat, and still 10 labels: three rounds each
   carrying two labelled voice-tracks under three *different* labels, with Round 1's quote inside
   the stage while Rounds 2–3 put it in the column. One convention, three times.
3. **Q6 + Q8** — what went wrong, and what she'd do differently. Both exist but are scattered and
   buried; her research says these are **mandatory, never cut**, because perfect-project narratives
   read as not credible.
4. **The Voice/"reclaim" beat** — the third of the three things worth showing, and the clearest
   evidence of research changing her mind.

### BUILD ORDER

**Phase 0** — the 12-column measure in `system.module.css`.
**Phase 1** — the six components, built once, against the measure.
**Phase 2** — chapter by chapter, **starting with 01 Brief**. Brief is the worst case: zero
artifacts, the most prose, and the chapter a hiring manager reads first. If the system can
make Brief good it can carry anything; building the artifact-rich chapters first would flatter
the system without testing it. Verified eyes-on and committed per chapter.

| ▸ | **THE GRAMMAR TO PROPAGATE (from N29)** — this is now the page-wide layout, and the remaining process-unify work is to put Brief / Research / Architecture / Iteration / Identity on it: **sticky reading column left (folio · heading · role · lede · labeled notes), artifact plane right, index anchored at the foot of the reading plane.** Her stated trade: slightly less immersion, in exchange for one balanced layout the whole page can use. Open question for her: whether the process half keeps a LIGHT right plane (so tone still differentiates the two acts) or goes dark like the product | 🔨 NEXT |

Her mandate: make the whole page match the simple/elegant/balanced flow of **Interface→Outcome**
(the sidebar-scrolly annotated-device look, "content + content together"); the rest is "sooo much
information and text"; ALL duotone → normal; radically simplify, balance show/tell, unify
flow+features+styles. Senior plan:

**TARGET SYSTEM (one grammar, taken from the Interface deep-dives):**
1. **The deep-dive grid** — a strong artifact + SHORT flanking margin annotations (the look she
   loves), heading + one short lede. Every product AND process moment adopts it.
2. **One annotation language** — the margin note (label + 1–2 lines) + the teal-rule "move".
   RETIRE: the MY THINKING pill, dark gradient boxes, bordered cards, dotted leaders, chat bubbles
   (except the one real group-text artifact).
3. **Real-tone photography** everywhere. ✅ DONE (Bleed default flipped, all `duo` removed).
4. **Whitespace over borders** — kill bordered cards (Myana card, IA questionnaire card, FeatureWall boxes).
5. **Radically less text** — long prose → short lede + margins; progressive disclosure for depth.
6. **Fewer dark bands** — reserve dark for one moment, cut the light/dark flicker.
7. **Demote stats** (80/65/3×) — one quiet line, not an infographic column.

**SEQUENCE (one chapter at a time, verified eyes-on, her copy verbatim, committed per chapter):**
- ✅ GLOBAL duotone → real-tone.
- ✅ Research (02) — synthesis unified to one typographic progression (N20).
- ▸ Brief (01) — demote stats; borderless Myana card; tighten required/provided band.
- ▸ Architecture (03) — borderless questionnaire artifact; before/after on the deep-dive grid; cut prose.
- ▸ Iteration (04) — one screen + one feedback per round, on the one annotation style.
- KEEP Interface (04) + Outcome (06) — they are the model.
- ▸ Identity/Voice + Brand (05) — deep-dive grid + one annotation style; borderless.
- FINAL — /impeccable layout grid gate per chapter, global voice-audit, reduced-motion/a11y, length check (25k px → tighter guided scroll).

---

### 2026-08-21 — N46, a direction proposal (hers, unbuilt — logged the moment it landed)

| # | Note (her words) | Status |
|---|---|---|
| N46 | "Maybe we do not make any in depth case studies just yet. What if we lean into the 'folder' motif more? There could be some way that when a person clicks in to see more about the project, the folder file becomes full screen and contained within it is the overview of the project with minimal text and meta data? I could then provide more in-depth stuff later as needed. My thinking is that it is more manageable, can be done quickly, gets me a peek into my work without needing to perfectly explain every step along the way." | 🟡 **PROPOSED — awaiting her call.** My read, in full, is in the ledger note below. Short form: **the container is right and her own research backs it** (screening is 2–3 minutes per portfolio, some under one; "the live site is for screening, the deck is for the interview" — Ali‑Hasan; "process‑heavy portfolios are dated" — Scott). **The content spec is the part to correct:** *overview + metadata* answers rubric ranks 5–7 and skips 1–3 (decision rationale · role clarity · impact with evidence), and her research names over‑contextualizing as the #2 failure mode. The folder should open on the **punchline**, not the overview — roughly 200 words in four fixed slots: what it proved (Q7) · her role, unmissable · one decision and why · what she'd change. Same effort as an overview, a much stronger read. **Birth Story is the exception** — blessed, nearly finished, and the one deep artifact that keeps the rest from reading as a gallery. One deep core, the rest stated crisply, which is her own F24 call from 2026‑07‑10, arrived at again from the other side. **Ceiling to know:** `FileStack` divides its tab row by `slotCount`, so the motif holds to about 5 or 6 folders and no more; breadth still wants the All‑Work bento |

**▸ CORRECTIONS after the code pass (2026‑08‑21, same day).** Three claims in the note above were made from summaries and glances rather than from the source. Corrected here rather than edited away, so the error stays visible:

- **The ceiling was asserted, not measured.** `FileStack` caps at `Math.min(slides.length, contributions.length, 15)`. Tab labels are 13px with `text-overflow: ellipsis`, so they degrade past roughly **8** slots, not 5 or 6. The bento argument still stands; the number was wrong.
- **The "one deep core" decision is real and verified** in project memory `DECISIONS.md` (~L709–715), including *"A junior documents all their research to prove they did it."* But it was originally cited by its ledger label after the lookup errored out, which is the thing that must not happen. Substance held; the sourcing did not.
- **THE MATERIAL ONE — the folders are currently FACETS, not projects.** `FileStack` sits *inside* `ProjectPreview`, one stack per project, and its tabs are contribution facets (Experience Design · Data Visualization · Copywriting). Her note describes a folder that opens onto *"the overview of the project"* — folder = project. Those are two different builds. **Recommendation: folder = project**, and the facets become the *contents* of the expanded sheet rather than sibling cards, which is what the fullscreen space is for. Hers to confirm.
- **Two build facts that make the expand cheaper than estimated:** `ProjectPreview` runs **no pin and no scrub** (`ProjectPreview.js:119` — "No scrub, no pin"; the pin-friction entry in `NEXT.md` is stale branch state from `feat/preview-trigger-compose`), so there is no transformed-ancestor blocking a fixed-position FLIP. And **a click-through already exists** (`card.href` + the `ArrowOut` affordance on the active card), so this changes a destination rather than adding an interaction. **Cost that remains:** below 768px `FileStack` swaps out for `MobileCardStack` entirely, so the fullscreen sheet needs its own mobile design, not a scaled-down desktop one |

### 2026-08-21 — N47, her notes on the lo-fi expand prototype

| # | Note (her words) | Status |
|---|---|---|
| N47a | "The see the full project button is getting overlapped with the folder depth. It could live under the text instead or be more subtle and constant on each folder." | ✅ Moved under the copy column. It was floating over the stack's lower right, where the receded cards' depth strip rides through it. Under the text it is constant, never collides, and reads as the project's own control rather than the active card's |
| N47b | "The expanded folder looses its shape of the folder cards and does not look right." | ✅ **Two real causes, both fixed.** (1) The sheet reused the 1600 × 1100 viewBox with `preserveAspectRatio="none"`, so at screen aspect every corner radius and the tab height stretched out of true. The sheet now builds its path in **real pixel space**, recomputed each frame, so radii and tab height stay correct at any size. (2) Widening one tab to full width turned it into a header bar, which is not a tab. **The expanded view now keeps real tabs** |
| N47c | "I don't like all that text up top." | ✅ The sheet opened on a title, a tagline, and four stacked statements before any work appeared. The masthead is now one line of identity plus a metadata row, and the four statements are a 2 × 2 hairline grid rather than a vertical wall (N38: information portrayed graphically, not as blocks of text) |
| N47d | "Try a better more compelling expanded view design." | ✅ **THE MOVE: the expanded sheet is ONE folder carrying ALL THREE TABS.** You opened the stack and what you get is a single document whose tabs are its sections. The path generalises her `buildSilhouettePath` to N tabs; during the expand the sibling tabs grow from zero height at their slots while the active one holds, so the folder visibly sprouts the others |
| N47e | "I like if the tabs are linked to sections on the singular expanded view rather than flipping between folder tabs literally. That way they cannot get lost." | ✅ They scroll to sections and, more importantly, **the active tab now tracks the scroll position** via IntersectionObserver. The previous build already scrolled, but nothing reflected where you were, so it still read as a flip-between. Three tabs on one folder is also what makes the section relationship legible in the form itself |
| N47f | "Maybe the text we have on the home view already literally moves into the expanded view frame as the intro header." | ✅ Built. The number, title and tagline are one block that **flies from its homepage position into the sheet masthead** on the same 600ms curve as the frame, then flies back on close. This is also what closes N47c: the header is text that moved, not new text |
| N47g | "Then we need to find a way to balance metadata, text, imagery, video." | 🔨 **First pass, hers to judge.** The order is identity → metadata row → the four statements → the three sections, each opening on one large lead artifact with supporting stills beneath. Metadata is a hairline label/value row, not a card. **Values are `[LORIN TO WRITE]`** — role, team, timeline and context for Groundswell are not in the repo and were not invented |

### 2026-08-21 — N49, the move into the site code

| # | Note (her words) | Status |
|---|---|---|
| N48 | "these tabs look terrible" (screenshot: tabs as tall narrow lobes with clipped labels and spikes below the body line) · "i do not like the orange color" · "the font looks too small" · "the italics is too much" · "the escape button is in an odd position but looks good" | ✅ ALL CLOSED in the lo-fi. **The tabs were one bug with two faces:** the widths were measured inside `buildSheet` while the sheet was still `display:none`, so every `scrollWidth` returned 0 and each tab got only its 44px of padding — narrower than tall, labels clipped — and then radii sized for a 230px tab folded the path back through itself, which is the spikes. Measure after display, clamp both radii to the tab's own width, and widen the inter-tab gap to clear two junction sweeps the way her own slot padding does. Orange placeholders → neutral, placeholder italics → roman, type scale raised, Close registered to the content column |
| N49 | "yea lets move to the site code because it still looks wonky." | ✅ **BUILT AND COMMITTED** on `feat/folder-expand` (`54736a9`), branched off `birthstory-round2` so the two do not mix. `components/ProjectSheet/{jsx,module.css}` new; `FileStack` exposes the active card + normalised tab-slot geometry; `ProjectPreview` carries the expand control under the copy and renders the sheet. **The diagnosis behind "still wonky": the sheet was full-bleed.** A folder filling the whole viewport has no room to be a folder — its tabs collide with the top edge and its outline hugs the browser chrome, which reads as a rendering fault rather than an object. **The sheet is now inset** (sides + top, running off the bottom edge) with the scrim visible around it. That is the single biggest improvement over the mockup |

**Three defects the real environment caught that the prototype could not:** (a) the site nav is `z-index: 100` and so was the sheet, so the nav punched through the scrim — sheet moved to 400/500, above the nav and below the skip link, which must stay reachable at 1000; (b) **stylelint rejected six font sizes** — the project bans anything under 12px as a legibility floor, which is the same complaint she made by eye; (c) CSS Modules rejected a bare `figcaption` (global selector in a module).

**Verified eyes-on, 1440 · 390 · reduced motion:** Escape unmounts and restores body scroll, focus returns to the expand control, reduced motion lands with content visible, zero horizontal overflow, no new console errors (the SVG clip-path hydration warning is pre-existing, N34). At 390 all three tabs fit inside the viewport carrying numerals only, with the section headings holding the names.

**▸ STILL OWED on this workstream:** (1) **the copy-fly (N47f)** — the homepage number/title/tagline flying into the masthead is proven in the lo-fi but not ported; it needs the two components to share a ref. (2) **The intercepting modal route**, so the sheet has a shareable URL and a working back button. (3) **Her judgement on the balance (N47g)** — whether the four statements earn their room against the work below them. (4) Real metadata values: role, team, timeline and context are `[LORIN TO WRITE]` because they are nowhere in the repo. (5) The lo-fi at `docs/lofi-expand.html` is now superseded and should be deleted once the route lands.

### 2026-08-21 — N50, the tab reckoning

| # | Note (her words) | Status |
|---|---|---|
| N50a | "the full project button is way too long" | ✅ It measured **560px**. Not a long label — the text column is a flex parent and the button was stretching to fill it. `align-self: flex-start` + `width: fit-content`. Now 158px, label shortened to “Open project” |
| N50b | "I worry the entire text section lost its size, did you adjust it? it looks smaller and tighter, harder to read." | ✅ **Checked rather than answered: the type is unchanged.** Measured live — title 56px, tagline 24px, description 18px, all at their existing clamp maxima, and the CSS diff has zero removals. What changed is the column's terminal weight: the old CTA was a 20px italic serif link and the new control is a small uppercase pill, which makes the whole column read tighter even though nothing above it moved. Control bumped to 13px with more space above. **If it still reads thin, the fix is to give that control back the serif presence the link had** |
| N50c | "the expanded folder looks like teeth not tabs and it is weird" → "the side tabs look weird what are we not thinking of? … maybe it is only 1 tab for this one single folder" | ✅ **SHIPPED, and her question was the one that cracked it. A TAB IS IDENTITY, NOT NAVIGATION.** A folder tab exists so you can find the folder while it is filed among others; it carries the folder's *name*. One folder has one tab. Several tabs mean several *dividers* — several documents. That is why no amount of geometry tuning helped: top-edge tabs made a comb, side tabs made three files sharing one body. **The sections were never tabs.** Now: one tab carrying the project name, hung off the content column's left edge; the sections are a quiet sticky contents strip inside the body, still scroll-spied. **It also makes the expansion honest for the first time** — one tab in the card, one tab in the folder, so the silhouette genuinely morphs instead of sprouting siblings |
| N50d | "the esc close button is not intuitively placed" | ✅ Moved to the sheet's own top-right corner. Registered to the content column it read as adrift mid-screen |
| N50e | "the scroll is not linked to the new expanded folder so I cannot scroll down, when i do it scrolls the background site" | ✅ **TWO REAL CAUSES.** (1) The homepage runs `ScrollTrigger.normalizeScroll(true)` (set in `HeroScatter`), which intercepts wheel and touch at the document and drives the page **programmatically** — so it both stole the wheel before the sheet could see it and scrolled straight past `overflow: hidden`. Suspended while the sheet is open, re-enabled on close. (2) `globals.css` sets `overflow-x: clip` on `html`, and a root whose overflow is not fully `visible` **stops propagating the body's overflow to the viewport** — so locking `body` alone was a no-op. The root is locked too. Verified: sheet scrolls, page holds, page scrolls again after close |

**Verified 1998 · 1440 · 1440 light · 390 · reduced motion:** tab 190 × 52 landing on the content column at every width, sheet scrolls while the page holds still, Escape closes and restores both the root overflow and `normalizeScroll`, zero horizontal overflow, no new console errors. Commits `ee33788` → `d483135` on `feat/folder-expand`.


**▸ STILL OWED:** (1) **the copy-fly (N47f)** — proven in the lo-fi, not ported; needs the two components to share a ref. (2) **The intercepting modal route** for a shareable URL and a working back button. (3) **Her judgement on the balance (N47g)** — the four statements still take more room than they earn before any work appears. (4) Real metadata values (role/team/timeline/context are `[LORIN TO WRITE]`; they are nowhere in the repo). (5) In dark mode the folder fill and the page ground are both `#252525`, so the folder barely separates from its ground even with the scrim at 0.72 — the fill probably needs to lift a step. (6) `docs/lofi-expand.html` is superseded; delete once the route lands.

### 2026-08-27 — N51, the visibility hold and the copy reckoning

| # | Note (her words) | Status |
|---|---|---|
| N51a | "I am not ready for the folder sheet or birthstory case study to be live but they can be committed for safety just not visible to the public." | 🔨 **HALF DONE.** Local insurance shipped: a verified `git bundle` of every ref at `~/portfolio-backups/` (1.9 GB, complete history, no blob over 50 MB so a remote push will take it). The **private mirror still needs her hands** — `gh repo create` is blocked by the permission classifier. Visibility half shipped as `b291290`, below |
| N51b | "only the home page is live at this point for public to see" | ✅ **SHIPPED (`b291290`), pending a push to `main` to take effect.** The audit found far more public than anyone thought — verified live with real status codes, not assumed: `/about`, `/design-system`, `/projects/whelm` and **ten markdown project pages** (birthstory, bridging-the-gap, cuba-creatives, groundswell, heirloom, homi, mindfulnest, seeds-of-transformation, somebuddy, transition-design) all returned **200 on lorin.work**. Only the Groundswell routes were sealed (401, the June legal hold). The fix **extends that existing gate** rather than inventing a second mechanism: two Basic-auth gates, each with its own password and its own reason — `GROUNDSWELL_GATE_PASSWORD` (legal: Blue Garden is licensed for physical use only) and `SITE_HOLD_PASSWORD` (editorial). **Both fail closed**, so an unset variable locks rather than opens. Nothing is deleted; the build stays reachable with the password. **Two gotchas the build caught:** an em dash in the `WWW-Authenticate` realm 500s in the edge runtime (headers are ASCII), and the matcher must exclude every media extension in `/public` or the homepage loses its assets — verified by a full-page scroll at 1440 with **zero failed requests and zero console errors** |
| N51c | "I am not feeling strong about these as the main categories for copy: what it proved · my role · the decision · what I'd change… I do still want it to answer viewer's question but I think we should workshop what someone getting the gist of a project wants and needs to know. How to balance brevity with depth." | 🔨 **Workshop open — her direction below is the brief.** The diagnosis that stands: those four map onto Q7/Q3/Q4/Q8 of the **Question Map**, which is a *deck* spine built for a 45-minute spoken panel. Her own research draws the line — *"the live site is for screening, the deck is for the interview"* (Ali-Hasan). The interview rubric was imported into the screening surface, which is the error. Three consequences: all four slots are retrospective so **the gist itself is missing**; "what I'd change" spends a scarce slot on a liability and gives away the strongest *live* answer (Zhuo's signature question); and four equal blocks in a 2×2 have **no punchline**, against a unanimous results-first consensus (*"don't make me wait too long to get to the punch line"* — Evnin) |
| N51d | "it can be a little more than this proposal some of that depth will come naturally as I need to explain the components of a project, what the research told us and why it was built and its outcomes, perhaps biggest lessons or takeaways" | 🟡 **HER SPEC — supersedes my three-line proposal.** She is naming five beats: **the components of a project · what the research told us · why it was built · its outcomes · biggest lessons or takeaways.** Read as a diagnosis: the three-line version was too thin, and the depth is not a burden to be minimised because *explaining the components is the work itself*. The structural answer is that this copy does not all live in one block — the per-section explanation rides **with each facet**, and only the frame (why it was built, outcome) and the closing takeaway sit as standalone statements |

**▸ THE MATERIAL FINDING behind all of it — the folder sheet is not a Groundswell feature.** All six homepage projects already run `cardVariant="file"` with contributions defined, and `ProjectSheet` takes `facets={contributions}`, so the sheet is live for every one of them. **65 media items are already wired** (Groundswell 10 with one gated facet · BirthStory 13 · Whelm 11 · SomeBuddy 12 · Transition Design 7 · Bridging 12). What is missing is **48 short text fields** — four statements and four metadata rows per project. The container is done; the contents are empty.

**▸ AND THE DEPTH EXIT POINTS OFF-SITE.** All six `href` values go to Medium articles or a CMU magazine piece, so today every "Go further" sends a hiring manager away from lorin.work to a class blog post — while Birth Story, the one real case study she has built, is the destination of nothing. Repointing it is what reconciles N46's flat folder tier with the locked three-star strategy: folders are the default tier for all six, Birth Story is the one deep exit.

**▸ AGREED ORDER OF OPERATIONS (hers, this session):** (1) Groundswell's fields, assembled from her verbatim rehearsal answers at `docs/deck-system/rehearsal/groundswell-answers.md` — Q7 part 2, Q3 + follow-up, Q2/Q6 follow-up, Q8 map onto the slots, so **no re-interview**. (2) The layout and motion pass against real words. (3) Repoint `Go further`. (4) The other five projects. (5) The push decision.

| N51e | "I am not feeling strong about these as the main categories… I think we should workshop what someone getting the gist of a project wants and needs to know." → then her own copy batch, and: *"the components of a project, what the research told us and why it was built and its outcomes, perhaps biggest lessons or takeaways"* | ✅ **SHIPPED (`2b5e8ea`).** Sheet rebuilt to **frame → five components → close**. Sections are the **components**, not her contribution facets — someone getting the gist needs to know what the thing IS, and "Experience Design" is a category of her labor, not an orientation. Her copy is preserved with a per-field receipt at `content/sheets/groundswell.js`; nothing rephrased |
| N51f | "I have photos of all of them. I would like some of the media to be videos and some photos maybe even a gallery." | ✅ **The rule that answers it: MEDIA FORM FOLLOWS WHAT THE COMPONENT IS**, so the mix has a reason rather than being variety for its own sake. Video where motion is the content (the wall filling, the walk through the pod, the dashboard moving) · photography where the object is (the pod, the CTB email) · audio where the medium is sound · a gallery where there is a genuine SET. **This rule travels to the other five projects**, which matters more than the one decision |
| N51g | "In previous versions of my portfolio… we did have the poem embedded is that no longer true?" | ✅ **Still true — nothing was lost.** `gs-poem-remember_psyfok` is live on Cloudinary, and `AudioPlayer` + `useSharedAudio` already coordinate single-play across every wired player. It needed **wiring, not building**, and is now the Mindfulness Library's lead because the medium is sound. (`gs-card-flip` is mapped in `lib/cloudinary.js` but 404s — do not reference it) |
| N51h | "My role was: generative research, content copywriting, project management, fundraising (securing over $30k in donations), data visalization and build of the data dashboard" · "lets credit that I led the data dashbaord production and design" | ✅ **Taken as authoritative** over anything assembled from the rehearsal answers. Her rehearsal line *"I did not own any specific component"* is kept beside it: **she owned FUNCTIONS, not COMPONENTS**, and naming that distinction is what makes a five-item role list read as credible rather than as a claim over a team's work. **The dashboard is the stated exception**, which is also the argument for treating it as the reporting layer above the four interventions rather than a fifth one. Role clarity now sits in three places: the metadata row, a "my part" line inside each component next to the proof, and the full narrative at the close |

**▸ THE DIAGNOSIS BEHIND N51e, and it generalises.** The four rejected statements map onto Q7/Q3/Q4/Q8 of the **Question Map** — a *deck* spine built for a 45-minute spoken panel. Her own research draws the line: *"the live site is for screening, the deck is for the interview"* (Ali-Hasan). **The rubric tells you what a hiring manager EVALUATES in an interview; it does not tell you what a screener needs in 90 seconds.** Do not import one into the other again. Full reasoning in project memory `DECISIONS.md → screening is not the interview`.

**▸ THE SEVEN-WEEK GAP.** `feat/folder-expand` is **282 commits ahead of `origin/main`; nothing has been pushed since 2026-07-05.** `ProjectSheet` is on no remote at all. `origin/birthstory-round2` **is** on the public repo (`lorin-a/portfolio` is PUBLIC), so that source has been readable since July — hers to decide whether it comes down once the private mirror exists.


---

### 2026-08-03 — Direction reset (new Claude account; deck dropped, template focus)

*Context: Lorin was signed out of her prior Claude account; this Claude is the one going forward.
Verified the persistent layer survived intact (same Mac — `~/.claude` is tied to the macOS user,
not the subscription). The automated `~/.claude-context` repo (last synced 2026-08-02) is the live
canonical off-machine copy; the Desktop `NEW CLAUDE` folder is an older manual handoff kit (last
touched 2026-06-11) — an archive + browser-upload kit, not the current source of truth.*

| # | Note (her words, condensed) | Status |
|---|---|---|
| N1 | Reopen / study / launch Birth Story to see where we left off | ✅ dev server live on :3000 → `/projects/birthstory-care-pod/v2` (the two-plane score). State = Round 5 close: split BLESSED, refinement round owed on both planes (see F25) |
| N2 | Confirmed: we'd built a set of hiring-manager questions for the case study that would ALSO seed an interview-practice / pitch deck (the `docs/DECK_SYSTEM.md` 8-question Map); and the "product up top, process below" move = the `/v2` two-plane page | 📌 confirmed — research intact, nothing lost |
| N3 | **Letting go of the interview pitch deck** as a deliverable | 🔨 accepted — the deck projection is dropped; the excavation research (question map + her interview answers) is kept |
| N4 | Use the research to inform how the case study is DESIGNED to answer a hiring manager's questions (questions govern the case-study design directly, not a separate deck) | 🔨 THE NEW FRAME — fold the 8-question Map into the case-study spec as a design governor |
| N5 | Make an easily replicable case-study TEMPLATE so this can be repeated across all her projects (some others may just reuse the pitch deck she already made) | 🔨 the deliverable — build on `CASE_STUDY_PLAYBOOK.md → THE SPEC`; Birth Story is the pilot instance |
| N6 | Needs at least two strong case studies — likely **Birth Story + Groundswell** | 📌 the two template instances |
| ⚠︎ | Uncommitted refinement work on disk (6 Birthstory `/v2` + `/moment` files, 122+/102−) from the last session's refinement round, never committed | 🟡 backed up to `scratchpad/birthstory-uncommitted-refinement-20260803.patch`; needs review — keep, finish, or discard (her call) |
| N7 | Her verdict on `/v2` eyes-on (2026-08-03, Fable session): "not very happy… overly gimmicky, too focused on cool interactions that it loses the pitch altogether, too text heavy, boring sections with only text or interactive sections with too many animations. How can we RADICALLY simplify this so the story of the product IS the main content but the animation, interaction, and design uplift, support, and emphasize the research underneath?" | ✅ BLESSED ("Yes agreed on all"): the artifact-led grammar governs — every section = a product artifact doing its job; text → captions ("heard → built" one-liners); motion → only the artifact's own behavior. Two-plane split survives; arias as set-pieces + text-only sections die. Next: ONE screen test (entry flow) judged in 10s before rolling the grammar |
| N12 | Her redirect on the story spine (2026-08-03): "helpful but it needs a better design and UXUI experience. we are also still not showing any of my work. Review what a hiring manager wants and the example case studies I logged… Where are you missing key inspiration, references, and research to build something actually exceptional?" | ✅ BENCHMARKED (the rule I'd skipped) — her `REFERENCES.md` + live study of the balance targets, LOVE, and 2 experience northstars. Synthesis + the 4 exceptional-vs-clean moves + the reference gaps → `DECISIONS.md → Case-study craft bar — reference study synthesis`. Core miss confirmed: 0% of her actual work shown (21 wireframes, IA sprawl→timeline before/after, onboarding v1→v3, moodboard all on disk, unused); balance target = ~50/50 research-to-craft. **Awaiting her pick of the experience lane before building** |
| N20 | Unify pass — PILOT on the Research chapter (2026-08-03, her "you go ahead and choose"): removed the teal duotone on the context photo (→ real-tone B&W) + rebuilt the "heard→learned→did" synthesis from 3 competing surfaces per row (mist bubble + dotted leader + dark gradient box) into ONE hairline-separated typographic progression (italic quote → muted insight → teal-ruled move). Her copy 100% verbatim. | 🟡 verified 1440, stylelint clean, zero overflow/console errors. Demonstrates the N19 direction (subtract competing surfaces, one annotation language, whitespace not boxes, real-tone photos). **HER JUDGMENT on the direction, then propagate to Brief/Architecture/Iteration/Interface/Identity/Outcome** (+ demote the stat numbers, unify the remaining aside styles: MY THINKING pill, FIG labels, eyebrows) |
| N19 | Art-director review of the parent-route page requested (2026-08-03): objective flow/architecture/content-design review of PRESENTATION not content. Her signals: dislikes duotone photos + huge stat numbers (80/65/3×) + "too much text not balanced"; LOVES the scrolly annotated-device section (SecFeatures Care Pod/Search). | ✅ reviewed eyes-on 1440 (10 real-size viewports). **DIAGNOSIS: one great layout system (artifact + short margin annotations, the Features deep-dives) competing with 5 others — every chapter invents new furniture.** Fix = SUBTRACT to unify: (1) propagate the Care-Pod annotated-device grid page-wide, (2) whitespace not borders (kill the bordered cards/quotes), (3) real-tone photos (cut duotone), (4) demote the stat numbers, (5) ONE annotation style (kill the 5 aside treatments), (6) reduce light/dark flipping. Nothing rewritten — re-presented. Page is ~25k px / 6 chapters each on a different grid = the "newspaper not a guided trail" feel. Awaiting her pick of where to start the unify pass |
| N18 | **THE FULL-CIRCLE FINDING (2026-08-03):** the rich in-depth "great previous version" she missed is NOT lost — it's live at the PARENT route `/projects/birthstory-care-pod` (`BirthStoryBody` + `Sec*.jsx`), last substantively committed at `2055c97` (F12). The whole radical-simplification arc (v2/case/story) created NEW child routes and never overwrote it. Session came full circle — benchmark-first was skipped (her CLAUDE.md's named failure; she's the one who noticed). | ✅ studied + verbatim copy corpus extracted (agent). **THE RECONCILIATION:** depth = content (her full copy/voice/research/review-process — keep every word); simplicity = PACING (one moment at a time, guided, Pearl — a presentation property). The rich version's one real flaw = density/guidance (her own F5/F9/F12: "too much to look at," "newspaper not a guided trail," "dizzy, D in info design"). Fix = re-pace the rich page, keep the words; the 4→0 collapse she already wrote = the one aria. **Refine the existing parent route, do NOT rebuild.** Awaiting her confirm |
| N17 | Verdict on the wireframe POC (2026-08-03): "its okay. But as a design researcher focused on feedback and review process I am not seeing enough back story and the isolated product screens look and feel big, repetitive, and not clean. The copy is too AI choppy not my voice. We had some really great previous versions with in depth copy that I still moved away from can you study those earlier iterations?" | 🔨 KEY CORRECTION — radical simplification went too far and lost the RESEARCH BACK-STORY + feedback/review-process depth that a design-researcher case study lives on. Isolation ≠ thin copy (Pearl isolates moments, writing stays rich). Fixes owed: (a) restore in-depth back-story + review-process narrative, (b) product screens are repetitive/big/not clean — vary + tighten, (c) COPY = her verbatim voice, never my choppy one-liners. **Studying the earlier in-depth iterations (git history + original components + copy docs) to recover her voice** |
| N16 | Skeleton approved after the Komoot×Garmin + CUJO study (2026-08-03): "the skeleton is interesting now how would you wireframe proof of concept to support this? flow will be most important, then animation, balance of visual and text." | 🔨 Building a scrollable, animated LO-FI wireframe (grey boxes, no assets) as a private Artifact she can scroll + feel. Priority order locked: (1) FLOW — one-point-per-screen isolation, named-process spine, scroll rhythm; (2) ANIMATION — reveals + the one collapse aria (sprawl→timeline); (3) BALANCE of visual/text (~60/40 contained, Komoot-style). Corrected model (N15→N16): process shown ON the stage but ISOLATED per beat, not hidden a layer down (the Komoot lesson) |
| N15 | Disappointed with the case build (2026-08-03): "not happy at all… I think it would be more impactful if we did not overload with content." Names the two poles + the tension: **Pearl's ref = centered, scrollytelling like an NYT immersive piece — isolates each point, makes it clear, with pause + added interaction/animation, tells a story, shows evolution over time.** vs. **showing process through a system — timeline, subheads, NAMING the design process, showcasing context and thinking.** "There is a struggle between that radical simplicity and over complication. How can we step back, not use so many tokens to iterate, and think about a wireframe or the best way to achieve the right balance?" | 🔨 STOP BUILDING — align on a WIREFRAME first. Resolution proposed: simplicity = ONE point per screen (not less total content); the SYSTEM is a quiet persistent frame (named process spine), the STORY is isolated scrollytelling beats; deep process lives one layer down, not on the main stage. Awaiting her react to the wireframe |
| N14 | THE CASE STUDY BUILT at `/projects/birthstory-care-pod/case` (2026-08-03) — the exceptional pass. Editorial birth-arc spine + ONE earned pinned aria (the v1 IA sprawl collapses to the shipped timeline as you scroll, inline SVG, pin+scrub). Every product moment interleaves with the WORK: onboarding v1→v3 iteration filmstrips, moodboard, 21-screen evolution grid. ~50/50 concept-to-craft; full-bleed rationed to the aria + grid. | 🟡 verified 1440/390, reduced-motion resolves the aria statically, all 9 beats reveal on real scroll, zero overflow, zero console errors, stylelint clean. **HER JUDGMENT PENDING** — is this "actually exceptional"? |
| N13 | Experience lane PICKED (2026-08-03): **Editorial + earned arias** — restraint is default, 2-3 pinned scrollytelling moments that EXPLAIN (the IA sprawl collapsing to the timeline; the before/after). The process+experience synthesis no logged reference achieves. Full structure settled: birth-arc spine · product→work interleave · ~50/50 research-to-craft · her two thinking diagrams (IA sprawl→timeline, v1-hub→v3-home) full-bleed · iteration rows contained (onboarding v1→v3, 21 screens) · authored warm open · one rigor artifact visible | 🔨 BUILDING to the Inkling bar |
| N11 | Full license granted (2026-08-03): "What rules or expectations might be holding you back? I want to give you full creative and structural control to make me something brilliant, replicable, professional" | ✅ constraints named (ledger-as-legal-code, fragment-permission loop, sparse≠distilled, /v2 geometry not sacred) and set down; true inviolables kept (her words, facts, a11y, the thesis). **THE STORY SPINE BUILT at `/projects/birthstory-care-pod/story`** — all 7 beats: thesis hero → need → before (home+delivery-room note) → during (dark register, the orbit pod) → after (Letter to Past Self) → the book (curation) → the record + deep link. Story lines = thesis verbatim; margins = research verbatim; spine = the app's own timeline motif; register arc = the app's own palette (cream/teal/cream). Verified composed at 1440/390 via wheel-scroll capture (first capture's blank beats = smooth-scroll artifact in the harness, not the page), zero overflow, zero console errors, stylelint clean. HER JUDGMENT PENDING |
| N10 | Her verdict on screen test 02 (2026-08-03): "very simple which is what I asked for but it does not tell the story clearly. and I don't see how this becomes the entire website flow? How do people tell the story of a concept AND show their work? That is the struggle of a design research project pitch and documentation. We need to MASTER this with simplicity… this is a show and tell with emphasis on show." | 🔨 THE CORE PROBLEM NAMED — a beat is a sentence, not a story; the missing layer is the narrative frame. Answer proposed: the story spine = one birth told in the product's own time (the thesis arc), show = the product in use carrying the narrative, tell = the research reason as a quiet margin voice; process depth stays in plane two. Awaiting her nod |
| N9 | Screen test 02 "The entry" BUILT at `/projects/birthstory-care-pod/moment-2` — the artifact-led grammar's first proof: home timeline + Care Pod devices composed, caption = her verbatim heard/built lines only, motion = settle → tap ring → pod slides in (~1.6s total) | 🟡 verified eyes-on 1440/390 (three review hits found + fixed: kicker/nav collision, pod eclipsing the timeline, fold overrun), reduced-motion composed, stylelint clean, zero x-overflow. **HER 10-SECOND JUDGMENT PENDING** |
| N8 | **THE THESIS (2026-08-03, her verbatim — preserved in full in `BIRTHSTORY-interview.md → THE THESIS`):** "birth is both an individual and shared experience and… the two are intertwined when it comes to processing documenting and reflecting." Care Pod = DURING (shared, + newborn updates) · Documentation = before/during/just-after (the partner's tool, shared) · Reflection = AFTER (birth parent, private safe space) · the Book = the outcome, "what they choose to carry forward" | 🔨 THE SPINE — the top plane organizes on the birth's own arc (during → documenting → after → the book) woven with the individual⇄shared axis. Retrospective-discovery honesty note logged in the interview doc (her call on owning it in reflection) |

| # | Note (her words, condensed) | Status |
|---|---|---|
| L1 | Rename spine/progress-bar labels to design-speak (was **dropped once** — this is the re-raise) | ✅ done — `The Product` → `Interface` (kept her deliberate `Architecture`); crumb aligned |
| L2 | IA section leads with outcome, not intention — reframe to "how did we get there?" (limited-capacity stakes → phase-menu first attempt → gate-kept/disorienting → think-aloud shift → immediate entry + simple core) | ✅ done — SecArchitecture rewritten in her words; **her bless pending** (my/our pronoun flag) |
| L3 | Principles: her wording + "we can't claim I applied them, only that they **evolved** through feedback." DECIDED: optional upgrade YES (rename → "Design principles" + derivation line under each); flow principle = ONE ("Does not disorient", property not imperative); her nuance — the principle was *unchanged*, her first 2 builds violated it, the lesson is what "disorienting" means; trauma-informed → "not trauma-assuming" | ✅ built + verified (1440/390): numbered 2×2, intro "Testing sharpened two of them", 03/04 carry a "what it taught" note. **Derivation copy PROVISIONAL — hers to bless** |
| L4 | Some users may miss the Care Pod's **timely** use (most useful *during* the birth); wants to explore Care-Pod-centered iterations to A/B test | 🔭 future exploration — logged, not a now-task |
| L5 | Raise annotations to her real deck bar | ✅ BUILT — her deck copy was more functional than the site's, so a wholesale swap would've downgraded; instead raised the two pure-restatement annots (Reflection·R, Search·R) to real intention grounded in her emotion-tagging / search-by-feeling design. Kept the strong ones. Provisional, hers to bless |
| L6/L8 | Synthesis panel — build it | ✅ BUILT + verified (1440/390) — a **Fact › Insight › Implication** grid in Research ("What we heard, what we did"), 4 rows from her real midpoint feedback quotes → insight → decision. Reconstruction of real synthesis in the taught grammar; NO fabricated affinity wall. Provisional copy, hers to bless. Her deck's "Our Approach" quality→feature map remains available as a companion |
| L9 | Find final deck on LaCie + Figma link | ✅ found — `LaCie/IXD Studio/Myana Finals/FINAL DOCUMENTATION DUE 3/` (Documentation 16pp = annotated wireframes; Presentation 22pp = client deck) |

### Round 5 — 2026-07-10 (her temperature notes on the score at `/v2`)

| # | Note (her words, condensed) | Status |
|---|---|---|
| F18 | KEEP: "Hero is good" · "The animations throughout and the work being larger is MUCH better" · "you did a great job of centralizing the flow on this one" | 📌 locked as keepers — the score survives |
| F19 | "the first intro needs more structure and I actually miss the metadata because that is more what hiring managers want to see for what they need to know" | ✅ BUILT — the V1 Overview metadata (Role · Context · Client · Method · Outcome · Build, her copy verbatim) returns to the brief frame as a quiet 3-column ledger under the stakes; verified 1440/390 |
| F20 | "It also needs structure labels" (her example word got garbled in transit — read as section/orientation labels; she corrects if wrong) | ✅ BUILT — numbered kickers on every frame (01 The brief → 08 The outcome; part two continues 09–12), one continuous spine; the cinematic voice bleed stays unlabeled on purpose |
| F21 | "I find myself missing more of the context, the screenshots of interviews and client pitches, I miss the annotations, I miss a little more of the process, before and after… you did lose some of the expertise and process depth I crave" | ✅ BUILT on the deep plane — the TAP Zoom interview screenshot returns · IA diagrams before/after · onboarding flow strips v1→v3 · all 21 wireframe screens as a versioned contact sheet · the reclaim→Care Pod word rewrites · the client-pitch photo. ⚠️ deck PDF embed BLOCKED: LaCie not mounted, no Drive copy — slot is designed, embed lands when she mounts the drive |
| F22 | THE ARCHITECTURE: "a quick scanner gets what they need to know from the top half and a curious person gets a lot more rich context, wireframe iterations, process depth in the second half, maybe even an embedded PDF presentation" | ✅ BUILT — part two "Behind the work" between Outcome and Coda: threshold gate (dotted stem, visible register switch) → ONE deep core per F24 (the entry-flow decision: evidence → first attempt owned → what testing said → what shipped → what I couldn't test) → archive → words → pitch. Score untouched above. SPEC line 3 sharpened. All new-plane prose is her V1 copy verbatim; only step labels + threshold line are new (provisional, hers) |
| F23 | License restated: "total freedom outside of copy… from what feels like a BETTER 70-80% there but still not hitting the sweet spot or perfect balance" | 📌 standing |
| F25 | Closing verdict on the two-plane build (2026-07-10): "this is a good split between product and process but both sections needs a lot of work to be refined to the point I am happy with. Currently animations are too slow for a fast scroller, the content does not feel cohesive and tight and sharp, lacks design detail but has good bones" | 📌 THE NEXT ROUND — split architecture BLESSED (keeper); refinement pass owed on BOTH planes: (a) animation timing for fast scrollers, (b) cohesion/tightness/sharpness of content, (c) design detail. "Good bones" = structure locked, finish is the gap |
| F24 | Mid-build advice doc (2026-07-10, from her parallel chat; verbatim distilled into `DECISIONS.md → Birth Story Round 5`): **personal = a register, not a section** (judgment shown, failure owned, collaborators credited — rides the process moments) · **product = the evidence, not the reveal** ("we heard X → we built Y → here it is, working"; polish validates rigor, rigor explains polish) · **depth = ONE deep core** (one decision to the bottom; the rest stated crisply — "a senior shows one thing examined to the point of the micro-decision a non-designer would miss") · the four layers occupy the SAME sections (spine / evidence / voice / one deep core), one artifact read at four depths | ✅ integrated — SPEC lines 11–13 added; deep plane restructured around the entry-flow decision as the one core |

### Round 4 — 2026-07-09 (her verdict on build pass 1)

| # | Note (her words, condensed) | Status |
|---|---|---|
| F4 | GOOD — keep: type hierarchy · adaptive scroll (sticky) · new text callouts · animations · alternating layout for demos | 📌 locked as keepers |
| F5 | Too much to look at → confusion + overwhelm; "looks like user did not know how to make information easy to understand and just put everything on the screen" | ✅ trail pass built — per-chapter cuts (2 context photos + review photo + duplicate prose gone), demotions, one-idea pacing |
| F6 | Not sure the flow is in the right order — "maybe I want to see the product in more depth first and then the process? Not sure." | ✅ her pick: **product overture** — the four-ways wall + her relocated "opens into documenting" line now one viewport after the Brief; ch4 = pure depth. Her cut criterion logged: **show product-designer/researcher chops — cut only what doesn't evidence them** |
| F7 | Lots of text, lots to read — "a skimmer will not absorb what is important" | ✅ concision sweep (cut-not-paraphrase): Brief connection −2 sentences · Research inline quote → chat carries it · 3 feature ledes de-duplicated vs annotations |
| F8 | Not enough balance / clean display of contextual info — "a lot of text and sooo many lines" | ✅ line-noise cut: dotted ground GONE (clean paper) · specimen/voice/aside trailing rules gone · principle inner hairlines gone · one rule grammar |
| F9 | Page hasn't found its identity: "trying to be editorial but lacking the decisive, intelligent unfolding of a narrative. It reads like a newspaper not an engaging article. User is guided through a jungle rather than told what to take away from a well guided trail hike with one clear path." | 🟡 partially answered by the trail (proposal §6); the rest lands in passes 2–4 (color arc = chapter identity, motion = the unfolding) |
| F10 | 2026-07-09 unleash license: "treat me as your project manager with art direction but ultimately YOU know what you can create… create what perhaps I could not imagine myself but would see and immediately know it hits the exact right spot" | 📌 standing — Claude owns remaining taste calls (incl. former §5 picks); she stays final judge on her words + facts; reversals of prior micro-blesses get noted here |
| F11 | Saw the trail pass — "really am not loving it." THE ACCEPTANCE TEST: "even if I squint my eyes and scroll without reading, I will walk away with an impressed and satisfied feeling… I don't even know what this is about but I already know this person bleeds craft." | 🟡 first coat SHIPPED (`2f13ed8`): duotone Bleed bands (Brief fog full-bleed teal-ink; crit wall full-bleed true color), contained duotones (feeding, Care Pod room), chapter color arc blush→peri→sage→teal→dusk→slate on numerals + meta rules, artifacts scaled up. Verified with literal blur-injected squint shots + no x-overflow at 390/1440. **The other half of her test = motion (passes 3–4), next** |

| F12 | Screenshot of Research synthesis + principles: "how can you claim this is an improvement? This is all text and lines, explicitly what I said was not working… I don't need flashy additions or duotone images, this feels novice, this is crowded, this is a D grade in information design" | 🟡 root cause named: containers were restyled, information wasn't redesigned. NEW STANDARD: every block takes its content's NATIVE FORM — voices as speech, decisions as product UI, flows as movement, claims as type. Synthesis + principles rebuilt first |
| F13 | "I am dizzy just looking at this. I'm disappointed. You are hyper focused on small changes… something is in the way. Some instruction or file or requirement is keeping you small… I feel like you need to start over. Objectively look at my goals, look at what is built and make something entirely from scratch that meets the high quality vision" | 🔨 START-OVER MANDATE. Diagnosis given (iterating-on-inherited-artifact + obeying every past micro-bless at once + small-fix verify loop). **V2 built from scratch in parallel at `/projects/birthstory-care-pod/v2`** — current draft untouched. Only true inviolables kept (her words, facts, a11y, story, taste ledger as direction); all prior layout/furniture decisions set aside |

| F14 | V2 verdict: "not good either." Her reference brief (2026-07-09, verbatim distilled): Nahel Moussi = product focus + scroll animation · **apresentforce.com/tny-editorial = "product and image forward with narrative throughout… I get the story from the images alone; if I want to know more I can read the words"** · Apple = focusing attention, minimalism, brilliant micro-interactions · **NEW TOP OF LIST: pearl-sequeira.com/cnn — "an actual designer with craft and voice… creative media flow and craft bar"** — but they don't show iteration; she loves showing what's behind; open question = how much process to show ("not sure how to strike this balance") | 🔨 BENCHMARK-FIRST rebuild: study both references eyes-on, quantify the deltas, rebuild V2 media-first (story readable from images alone; words optional depth), motion in from the start — show nothing until it sits next to the reference |

| F15 | Benchmarked V2 "looks and feels no different." Her market map: UX portfolios = 90% process/10% craft; brand = 90% visual/10% text; the middle misses. **devouringdetails.com = "the brilliance of intentional motion/animation/interaction, structure, and craft BUT it reads engineer and not human-centered storyteller like me."** The unicorn = visionary + strategist + researcher + crafter + builder + storyteller. "I have the taste of a senior designer… I will just know it when I see it. Tell me how to support you. **Don't just go build because you continue to disappoint me there.**" | 🔨 METHOD CHANGE: stop building pages, build MOMENTS (screen tests) — one fully-behaving viewport at a time, judged live in browser in 10 seconds; the hit becomes the page's DNA. Thesis: devouring-details-grade behavior applied to HUMAN material, motion vocabulary derived from the app's own principles |

| F16 | She stopped a build mid-flight: "i said don't just build and that is what you did" → pointed to `~/Desktop/portfolio advice` (the operating theory): thesis > ratio (center-of-gravity, not balance) · range-with-control (one mode per screen at 95%, the unicorn is a property of the whole via sequencing/transitions) · ONE peak per section, ~3 arias page-wide, stillness elsewhere · fast-path/deep-path on separate planes (90s from headlines + hero visuals alone) · every register switch has a visible reason · every "no" becomes a named spec line before the next build · target = one hiring manager, 90 seconds, felt not proven; restraint reads senior | ✅ interpreted + codified: **THE SPEC now governs at §0 of BIRTHSTORY-VISUAL-SYSTEM.md** (10 lines, every one traceable to her verdicts + the advice; pre-show gate). Score (film edit, 3 arias) proposed for her reaction. **Working lesson: a picked option ≠ a green light to build — the agreement conversation finishes first** |

| F17 | Full license granted: "don't just take all of this and make an even more complex spec sheet… act on your own accord… go beyond what I can imagine and move freely taking the best of all of this advice and preferences" | ✅ THE SCORE BUILT TO DONE on `/v2`: **aria 2 "Built from their words"** live in-page (chat cadence → sparks → the app assembles → breathes; absorbed + deleted the research and synthesis sections); **aria 3 "4→0"** live (real V1 questions struck one by one, counter ticks with gentle accelerando, shipped IA lands); everything else still. Both arias filmed frame-by-frame, reduced-motion complete-scene fallbacks, replay affordances, no console errors, no overflow at 390/1440. Her verdict: scroll it |

### Round 3 — 2026-07-05 late (the Fable visual-sophistication pass)

| # | Note (her words, condensed) | Status |
|---|---|---|
| F1 | Strong Fable visual pass on the WHOLE page — flow, visual treatment, site styles, typographic hierarchy, interactions; 60% → 110%. Study the page against her reference bar first, then **propose the unifying visual system before touching components** | 🟢 blessed 2026-07-09 ("begin build pass 1") — **pass 1 (foundation) in flight** on `birthstory-round2` |
| F3 | 2026-07-09: she read the proposal and sent "here are my verdicts + §5 picks" — **the verdict text did not come through** (message arrived without it). Proceeding on pass 1 (pick-independent); treating "nothing sacred" as default | ⚠️ **NEEDS RESEND** — her §5 picks (Iteration flavor · duotone intensity · anything sacred) + any redirects |
| F2 | Loves scrollytelling, sticky side-scroll, impressive reveals + motion/immersion — but **NEVER at the detriment of rigor, structure, story, or getting the point across**; treatment must enhance the viewer's ability to follow the storyline | 📌 standing constraint on the whole pass — baked into the proposal's motion grammar |

### Round 2 — 2026-07-05 eve (her design/craft batch on the built pass)

| # | Note (her words, condensed) | Status |
|---|---|---|
| R1 | "Craft" spine label too abstract → improve | ✅ → **Identity** (pairs with Interface) |
| R2 | Brief cards read novice → redesign | ✅ three header-bar cards → one spec panel split by thin rules, quiet eyebrows |
| R3 | Research group-chat mockup + more spine | ✅ the group call as the group text (asks as bubbles, sister quote verbatim as accent bubble, "summarized · verbatim" rigor note) + phased "how they'd use it" + takeaway; replaced 3 loose cards |
| R4 | Find Feb 16 2025 Zoom screenshot | ⚠️ **not found** (full-disk search hit only unrelated Groundswell Feb-16 shots + timed out). Group-chat mockup is the treatment she preferred anyway |
| R5 | Pronoun consistency (shared = we) | ✅ Architecture + Iteration now "we" for shared research/IA/testing; personal reasoning + UX-writing + visual stay "I". (If any specific line still reads wrong, she flags) |
| R6 | Synthesis panel needs more design | ✅ contained on a white card, › column progression, "What we did" lifted behind an accent rule |
| R7 | Apply accepted principle tightenings | ✅ dropped "Caring" → "Compassionate, not clinical" |
| R8 | Principle "why" treatment lost | ✅ pulled in behind a teal accent rule → reads as deliberate derivation |
| R9 | Make annotations rich (full) | ✅ all five screens carry the why (calm-by-default, you-don't-carry-it, nothing-is-lost, brain-fog, trust) |
| R10 | Architecture reasonCols un-designed | ✅ two named "move" cards + a framed "the shift" pivot line |
| R11 | Remove Architecture method cite | ✅ removed |
| R12 | Remove SomeBuddy taught-process/method | ✅ removed the bottom five-strategies map + Dezudio process diagram + colophon Lineage row + Overview "Dezudio's five-strategy process" phrasing. ⚠️ **KEPT + FLAGGED: the Overview "taught by the founders of Dezudio, Myana's design partner" context line** — the 51-612 course did carry Dezudio content (Saffer + Fact›Insight›Implication slides), so it's likely true for Birth Story; **needs her confirm** |
| R13 | Iteration image right + sticky | ✅ image right of text (Split). ⏭️ **sticky-scroll = staged** as a focused next pass (real interaction build; wants her pick of variant flavor — VLedger rail vs VAtlas camera) |
| R14 | Prioritization card weak | ✅ kept but de-duplicated (prose→setup only); cut features struck through (subtraction made visual); added one carries its reason |
| R15 | Push — NOT to main | ✅ pushed branch **`birthstory-round2`** (main untouched) |
| R16 | Care Pod A/B (my recap #7) — she said "good" → leave parked, no action | ✅ parked |
| L7 | Make **external note-logging a GLOBAL rule** + preserve in NEW CLAUDE / sync kit | 🔨 in progress |

### Last updated: 2026-07-10 close (ROUND 5 DONE — two-plane page built, split BLESSED, refinement round owed) — **`/v2` on `birthstory-round2` (pushed): part one THE SCORE (arias + restored hiring-manager metadata ledger + numbered kickers 01–08) + part two BEHIND THE WORK (threshold gate → one deep core per F24: the entry-flow decision to the bottom, with the TAP Zoom screenshot, IA diagrams, onboarding strips v1→v3, the two named moves, "what I couldn't test" → 21-screen contact sheet → reclaim→Care Pod rewrites → pitch photo). All deep-plane prose = her V1 copy verbatim; threshold line + step tags provisional. Verified 1440/390. HER CLOSING VERDICT (F25): the split is right, "good bones" — NEXT MOVE = THE REFINEMENT ROUND on both planes: (1) animation timing tuned for a fast scroller (reveals currently too slow — likely shorter durations, earlier triggers, less stagger), (2) cohesion/tightness/sharpness pass on content (one grammar, no loose blocks), (3) design detail (the finish layer that makes it feel chosen). Check every move against THE SPEC's 13 lines. THEN: deck PDF embed (blocked on LaCie mount; no Drive copy — pitch slot designed and waiting), Dezudio credit confirm, V1-vs-V2 canonical swap decision.**
### Prev: 2026-07-09 late (ROUND 4 BREAKTHROUGH — the score built, first "much better") — **After five rejected builds (F4→F15: pass 1 foundation, trail pass, squint layer, info-design rebuild, V2 from scratch), the loop broke on her reference brief + `~/Desktop/portfolio advice`. SHIPPED, all on `birthstory-round2` (pushed, `ad9c9b3`): V2 at `/projects/birthstory-care-pod/v2` rebuilt to the score — THREE ARIAS (hero · "Built from their words": the group call plays in chat cadence and the app assembles from the asks, absorbing the research + synthesis sections · "4→0": the real V1 questions struck away, counter accelerando, shipped IA lands), stillness everywhere else, replay affordances, reduced-motion complete scenes. THE SPEC governs at §0 of `docs/case-study-editorial/BIRTHSTORY-VISUAL-SYSTEM.md` (ten lines, each from a verdict of hers; pre-show gate; every "no" adds a line). V1 draft untouched at the parent route; isolated aria at `/moment-1`. Her verdict: "much better." NEXT MOVE: her full scroll-through of `/v2` with temperature notes (cadence, weight, pauses, anywhere it reads machine) → the finish layer (hover/load micro-polish, quiet orientation affordance, aria tuning) → the V1-vs-V2 canonical swap decision + which cut V1 material (Voice/UX-writing beat, colophon) earns a place back. Method locked: benchmark-first · moments not pages · judge motion live · a picked option ≠ green light to build.**
### Prev: 2026-07-09 (FABLE VISUAL PASS — BUILD PASS 1 of 4 SHIPPED on `birthstory-round2`) — **Foundation built + eyes-on verified (1440 full walk + 390 full walk, GRID gate passed): (1) TYPE SCALE — chapter openers now real display (72px Fraunces short / 54px long, asymmetric hanging indent, her words verbatim with teal `<b>` emphasis only), oversized ghosted chapter numerals (~13rem, 8% teal ink) behind each opener, meta tier at grid edges (crumb top-left · week folio top-right, small caps + tabular). Chapter statements are now the page's h2 spine (subs h3). (2) DE-CARDING — brief spec, synthesis, principles (ruled 2×2), Architecture moves, prioritization all re-set as ruled ledgers (2px teal top rule → hairlines); Insight/TesterNote/Friction de-boxed to labeled rules (voice chips ride a dotted/peri hairline — voice→color mapping kept); figure chips → specimen labels (`fig. NN · tag` + hairline, page-wide CSS counter). Cards survive only for true artifacts (chat, phones, Myana citation, revisions plate on the veil). (3) GRID RECIPES — Research split flipped (media left/thinking right), Features deep-dives alternate sides, copy columns ride sticky beside tall stages, stage radii squared to 6px. NEXT: pass 2 (chapter color arc + duotone photography) → pass 3 (motion) → pass 4 (flagship scrolly beats). ⚠️ F3 above: her verdicts + §5 picks never arrived — needs resend; duotone intensity (pick 2) gates part of pass 2, Iteration flavor (pick 1) gates pass 4.**
### Prev: 2026-07-05 latest (FABLE VISUAL PASS ROUND 3 — paused at the proposal gate, Fable quota out) — **The 60%→110% pass began on Fable: full-page study done (22,000px walk, CSS audit, GRID gate) and the unifying visual-system proposal DELIVERED, committed at `docs/case-study-editorial/BIRTHSTORY-VISUAL-SYSTEM.md` on `birthstory-round2`. No components touched (her gate: propose first).** Diagnosis: timid type scale (max ~46px display, under 3:1) · one text-left/card-right loop ~10× · everything in identical rounded cards · unmanaged whitespace · identity visited not carried · zero motion. Organizing idea: **the case study holds itself to the app’s four principles**; six moves (72px display tier + ghosted numerals · visible 12-col grid, 5 named recipes · de-carding to ruled ledgers · gradient-as-arc + teal-ink duotone · calm scrollytelling with flagships Architecture 4→0 + Iteration sticky (rec VLedger) · scoped timeline ticks). **NEXT (on Fable): she reads + blesses/redirects the proposal → build pass 1 of 4 (foundation: type scale, de-carding, grid recipes).** Her picks: proposal §5. Standing constraint F2 in the ledger above.
### Prev (2026-07-05 late — BIRTH STORY ROUND 2 SHIPPED ON A BRANCH; next = a Fable visual pass) — **A 15-item structural/copy/accuracy design pass, committed + pushed to `birthstory-round2` (NOT main).** Shipped (see the OPEN NOTES LEDGER above, R1–R15): spine `The Product`→`Interface` + `Craft`→`Identity`; IA leads with intention; design values → evolved **Saffer principles** ("what testing taught" notes; dropped "Caring"); a **Fact › Insight › Implication synthesis panel** from her real feedback quotes; a **group-chat mockup** of the sister call (rigor note kept); Brief → one spec panel; Architecture reasoning → named "move" cards; annotations made rich; prioritization de-duplicated (cut struck through); the **SomeBuddy method/lineage removed** (`DECISIONS.md`). **HER VERDICT: not ship-ready — the visual language still reads novice, has potential but lacks sophistication. NEXT MOVE = a strong FABLE visual-sophistication pass across the whole page / flow / visual treatment / site styles / interactions (60%→110%).** Open flags for her: (1) is Dezudio still the right studio credit (I kept the Overview "taught by Dezudio" line, removed the method framework); (2) sticky-scroll for Iteration staged — pick VLedger-rail vs VAtlas-camera. Final decks on LaCie (`IXD Studio/Myana Finals/FINAL DOCUMENTATION DUE 3/`); extraction in `docs/case-study-editorial/LINEAGE-dezudio.md §10`.
### Prev (2026-07-05 evening — BIRTH STORY DIRECTION-STUDY EXPLORATION, closed) — **A 4-round Fable exploration built 8 radically different design studies of the finished case study; her verdict: “fun and clever — park this level of creativity for other ideas and keep the case study as is.” Nothing migrates into the draft.** The studies stay as a review-only, noindex **idea library** at `/projects/birthstory-care-pod/v` (index + floating switcher; 4 commits `88d098a`→`ef1d84c` on `main`, NOT pushed): A·Ledger (decision argument + honest liabilities column) · B·One Artifact (one pinned phone narrates 15 chapters) · C·Atlas (synthesis map + camera + minimap) · D·Print Issue (editorial folio/duotone/errata) · E·Product Skin (information as UI; flow players; push-notification quote) · F·Studio Wall (material board) · G·Diverge/Converge (mess scoped to research; register rejected) · H·Canvas (2026 Figma/FigJam-native: frames, stickies, cursors, comment threads). **Durable takeaway = her taste ledger** (memory `DECISIONS.md → Birth Story exploration taste ledger`): loves editorial/journalistic hierarchy + duotone, the group-text synthesis idiom, gradient-as-accent, tool-native cool register, grid-breaking scoped to research; rejects manila/material warmth; structure inventions read best as single-section features. Build gotchas in `REFERENCE.md → Birthstory variants build gotchas`. Shared infra: `components/Birthstory/variants/` (`content.js`, `FlowPlayer`, `VSwitch`). **The case study itself is UNCHANGED — next move below still stands.**
### Prev (2026-07-05 — BIRTH STORY LIVE COPY PASS, deep) — **Ran her copy pass with her over a long session; the front half of the case study is substantially rewritten. `31d55d3`→`a6025b0` on `main` (~14 commits, NOT pushed — she has a standing push hold).** Shipped: the Care Pod rename (push-blocker cleared) + tightened teal bookend + Q7 proof line; the **method + lineage system** (Birth Story sits in a real Dezudio × Pitt × Myana research lineage — her professors authored the EPIC 2023 study; credited via a Method meta row, a bridge-model cite on the IA diagrams, a Close method ledger, Dezudio's wave diagram cited as an artifact, and a colophon Lineage row); her **readthrough batch** (Brief realigned to the LaCie source docs, linked meta, spine "Structure"→"Architecture", 5 interviews + 3 TAP); **Research fully rebuilt** into two phases (generative family interviews vs evaluative TAP), findings from her verbatim **sister notes**, real family quotes, **chronology fixed** (TAP moved to Iteration), her tightened **"My thinking" reflection**; and **"My thinking" callouts moved to body sans** (Fraunces reserved for titles/headers/quotes). She gave **standing permission to copyedit her words for concision** (`DECISIONS.md`). **NEXT MOVE: she reads the rebuilt page and blesses/pushes** (`git pull --rebase` at push — cherry-pick ahead/behind). **THEN:** extend the concision pass to Brief/Architecture/Product/Craft/Outcome; decide the "Function" design-value wording (now slightly against her medical-optional framing). Full state: memory `PROGRESS.md → SESSION-END STATE 2026-07-05`.
### Prev (2026-07-05, deck-system workstream) — **Rehearsal Round 1 run by hand — the inversion works, and the interview turns out to be the authoring root.** Ran Round 1 on Groundswell under the Public Policy Lab lens (`docs/deck-system/REHEARSAL_PROTOCOL.md`), zero build. Her answers are preserved verbatim in `docs/deck-system/rehearsal/groundswell-answers.md` (the durable authored layer). The round surfaced ~6 high-value beats that live nowhere on her site — the extractive-data ethics line, the CTB email repair story (a senior staff member wept in a content review; the "cold protocol" was her own humane innovation), the bunny-workshop pivot and its findings (staff need *permission* + *acknowledgement*), the comms-rollout failure, the Dr. Taylor counterfactual (peers steering a distressed colleague to the pod), and a Q8 that fills the site's literal `[LORIN TO WRITE]` blank. **Two durable architecture decisions locked (memory `DECISIONS.md`; journal 010/011):** (1) the interview is the content-**excavation** root upstream of everything — "the site is the source of truth" is incomplete; case study *and* deck are both projections of the excavated pool; the interview generates the copy spine *and* the asset shot-list in one pass. (2) A three-arm entry-point study (hers): Groundswell = mid-draft (done) · Birth Story = post-completion (the modal-user condition) · Transition Design = pre-everything → **hold building Transition Design; interview it first.** Framed honestly as a comparative multi-case design, not a controlled A/B. **NEXT on this workstream: run the Birth Story rehearsal round (Studio Rodrigo / product-craft lens).** Birth Story copy pass remains the overall critical path.
### Prev (2026-07-05) — **Birth Story METHOD + LINEAGE system built on her yes** (`dfe9aaa` + `5c19709` on `main`, NOT pushed). Pre-pass research first (full findings `docs/case-study-editorial/LINEAGE-dezudio.md`, local): **Birth Story sits inside a real research lineage** — her professors O'Leary + Deal (Dezudio founders, CMU Special Faculty) authored the EPIC 2023 postpartum experience-prototype study with Pitt, and Myana is a Dezudio client; her process maps cleanly onto the analysis–synthesis bridge model they taught. Then the integration, three altitudes in the page's existing grammar: **Overview "Method" meta row** (five-strategy process in the skim) · **METHOD cite in 03 Structure** under the 4→0 rationale (bridge model, Dubberly/Evenson/Robinson 2008, "taught in studio by Dezudio") · **ruled method ledger in Close** (each taught strategy → what she did with it, her verbatim; end placement = mastery, not homework) + **Dezudio's wave diagram cited as a framed artifact** (their pixels, their credit, linked — never re-drawn; citation-not-mockup) + **colophon Lineage row** naming the professors. Her catch applied: "This move has a name" phrasing cut as an AI tell. Books (McKercher, *Social Design Reader*) held for the future Seeds page, not this colophon (course attribution unconfirmed — ask her). Eyes-on 1440 + 390. **All new copy hers to bless in the copy pass, then push. Optional courtesy: a heads-up note to O'Leary + Deal (also a networking touch).**
### Prev (2026-07-05) — **Birth Story copy pass EXECUTED; the push-blocker is cleared — page is push-ready on her bless.** One commit on `main` (`31d55d3`, NOT pushed). The "Find strength & support" rename turned out to be a **documented fact, not new writing**: the V2 hub wireframe on the page shows it as the heart-icon menu item — V1's "Connect," which became the **Care Pod** in the final app. The Voice revisions row now reads “Find strength & support” → **“Care Pod”**, and her Q12 verbatim reasoning joined the prose ("…most are empowered by doing an amazing and hard thing. It became the Care Pod."). Both optionals done: the **teal bookend tightened** ("I'm a big dreamer. I try to do everything first, then narrow and narrow until I get to the heart of it.") + a quieter **Q7 proof line** beneath it ("Designing something and then being able to build it myself is the direction I'm headed. The working prototypes on this page are that proof."). Eyes-on verified 1440 + 390. **All three lines composed from her interview words — HERS TO BLESS on read-through, then push when she says.** Full state: memory `PROGRESS.md → Birth Story review-batch execution`.
### Prev (2026-07-04) — **Birth Story review batch EXECUTED; copy pass is all that remains.** One long session cleared Lorin's whole fine-tooth review — **5 commits on `main`** (`9e1abf6`→`9343de4`; originally made on the shared `deck-system` tree, cherry-picked here, NOT pushed). Shipped: the 6-item feedback batch (narrow Overview meta · **story-led prio card** · Voice grounded on the gradient veil · **dotted "my thinking" border** · **real Terfens wordmark** · **teal Close bookend**); the spine **restructured to 6 chapters (Option B)** — Brief · Research · Structure · The Product · Craft · Outcome, with iteration/brand/reflection as subheads; a **quote-accuracy pass** (four fabricated quotes reframed as summaries or cut — only her verbatim words are ever in quote marks now); **client facts corrected** (Dezudio = Myana's design partner, its founders taught the CMU studio; Pitt not UPMC); **Role line = her verbatim**; **Reflection = the teal bookend** (retrospective paragraphs cut). Eyes-on verified 1440 + 390. **NEXT = HER COPY PASS.** One hard push-blocker: the live placeholder "[ Lorin to write ]" for the **"Find strength & support" rename** in Voice; optional = tighten the bookend line + a Q7 "what it proved" sentence. Full state: memory `PROGRESS.md → Birth Story review-batch execution`. **Push when she says.** (The `deck-system` branch is a separate parallel workstream — its engine-day work is not on `main`.)
### Prev (2026-07-04) — **Workflow/config session — no portfolio feature change.** Model routing lifted to GLOBAL `~/.claude/CLAUDE.md`: Fable 5 = innovation partner (deliberate, main-thread `/model`), Opus 4.8 = execution default, Haiku = delegated substrate behind a cheap check, Sonnet = research deep-reads — best-of-best where it matters, not cost (reverses an initial wrong call to shelve Fable). Her craft standard captured as `~/.claude/DESIGN_PROCESS.md → §8 The Bar`: standard + annotated northstars + the additive-vs-narrowed / Inkling calibration, in her words. Both synced off-machine (`sync.sh` → GitHub/iCloud/LaCie) so a locked-out new Claude inherits them. **Portfolio critical path UNCHANGED — the Birth Story batch below is still the next move.**
### Prev (2026-07-04) — **Lorin’s fine-toothed review done; a 6-item design feedback batch + the copy pass are all that stand before push.** Review-night session (4 commits → `d69ece5`, **17 local total, NOT pushed**): crit wall now rides her own Cloudinary edit (new `cloudImg` `chain` opt — Media Editor “saves” are transformation URLs, not overwrites); **Consent row leads the Close colophon** (attribution policy adopted cross-chat: no participant names ever, role-context labels, two-tier evidence — memory `DECISIONS.md`); **8 iteration/hero wireframes re-exported crisp from Figma** (2×, node map in `REFERENCE.md`; hero cover = `hero/cover-wing.jpg`); **Question-Map audit: the page already answers 5 of 8 interviewer questions** — every gap is copy, parked in the canonical `PROGRESS.md → COPY PARKING LOT` (2 HIGH: Close ending + Q7 impact answer · Role statement); skim walk passed at 1440 + 390. **Her feedback batch (execute FIRST next session): overview meta ≤3 lines · prio card standalone · Voice contrast · dotted-border “my thinking” rec (needs her yes) · Terfens wordmark via Figma export (signature is wrongly Fraunces) · a visual Close** — verbatim in `PROGRESS.md → DESIGN FEEDBACK BATCH`. **Then copy day, then push.**
### Prev (2026-07-03) — **DECK SYSTEM workstream born, Phase 0 complete.** Every case study becomes an interview walkthrough (5/20/45-min cuts) + downloadable PDF, presented from the site itself (`/projects/[slug]/deck`, future). Structure derives from researched interviewer questions (4 research passes, ~35 sources — the 8-question spine, rubric, failure guardrails); slide-REGISTER system approved (Statement/Specimen/Diagram/Voice on site DNA, evidence-grounded rhythm rules); ROLE LENS feature specced (re-weights deck for UXR vs product roles; lens rule: never alters content). Product idea (hers) parked to Phase 5. **Living PM doc: `docs/DECK_SYSTEM.md`** · making-of journal (binding capture protocol): `docs/deck-system/`. **Next on this workstream: cut the `deck-system` branch, build the four register frames.** Birth Story beat spec + slide copy wait on her copy pass — which stays the overall critical path.
### Prev (2026-07-03) — **Contact + brand-icon pass.** Resume now links live in the About byline + footer (Drive PDF `Lorin_Anderberg_Resume_June2026`, anyone-with-link; update it by replacing the file’s contents — a re-upload breaks the link). Favicon existed only as a 404 — it and the apple-touch-icon are now the ShapeMark flower on the dark ground, with optical stroke weights so the loop mark survives 16px (recipe: memory `REFERENCE.md → Brand icons`). Four local commits (`1518ef8`, `55b21bf`, `4308ea2`, `5aa6510`) — **cherry-pick as one set when Lorin says deploy.**
### Prev (2026-07-03) — **Birth Story design DONE pending Lorin’s copy pass.** A full-day Fable session (13 local commits, dbf6e56 → 4dc428f, **not pushed**) locked the whole visual system and section grammar: **one chip-card language** (white grounded cards + solid chips — colored left-border callouts BANNED, they read AI); **voice→color mapping** (teal = the record · lilac `#E6E5FD` = her thinking · peri `#B1C1F4` = testers); **gradient stages on every feature/round** + the **full-bleed teal product band** (both blessed); **Iteration rebuilt on the deep-dive grammar** (copy left, artifact in gradient stage right, tester quote pinned in-stage); **annotations on all five functions**; Architecture’s **4→0 confrontation frame**; sources **colophon**; crit wall **color-corrected + uncropped**; a11y floor fixes (44px spine targets); Search screen re-exported crisp. Two standing workflow rules born here: **GRID.md pre-ship gate on every layout pass** and **every feedback batch → tracked checklist** (global CLAUDE.md). Tripwires + full state: memory `PROGRESS.md → Birth Story — session 2026-07-03`. **Next: Lorin’s fine-toothed review + copy pass** — parking lot below.
### Prev (2026-07-01) — Visual system: silent near-white ground `#FAFAFA`, color from content only, chapter numerals, grounded elevation (`DECISIONS.md → Birth Story VISUAL SYSTEM`).
### Prev (2026-07-01) — **Register shift + Brief rebuilt as the template** (three legible voices: objective record / teal `<Insight>` "my thinking" / terracotta tester). Hero, Overview, Brief done. Rationale: `DECISIONS.md → Case-study REGISTER`. Client/asset facts: `REFERENCE.md → Birth Story client facts`.
### Prev (2026-06-30) — Workflow/tooling session (Intake rule, over-tooling audit discipline, commit-freely, permission allowlist) + earlier the copy pass into hiring-manager documentation (now SUPERSEDED by the 2026-07-01 register above).

This is the living status doc for the lorin.work portfolio redesign. Updated at the end of every working session. Detailed in-flight state lives in memory `PROGRESS.md`.

---

## Portfolio strategy — LOCKED 2026-06-28 (the north star — read first)

**Positioning:** design **researcher / strategist who can also ship** — *not* a UX/UI designer with research skills (that market is too competitive). Research, synthesis, systems thinking, and co-design are the headline; UX/UI is supporting evidence. Case studies lead with framing and insight, not UI shots.

**Goal chain:** finish a tight, hiring-manager-ready portfolio ASAP → frees creative energy to finish Whelm + Inkling → job search. The portfolio must not keep eating creative energy.

**Tiered case studies (depth over quantity):**
- **3 stars** — full scannable Sense/Weave/Shape, real writing, curated captioned media:
  - **Groundswell** — co-design + real pilot (outcome).
  - **Birth Story** — UX/UI product + research, healthcare (proof she can ship).
  - **Transition Design** — systems thinking + data viz (the strategist signal; rounds the trio to research / product / systems).
- **Lean tier** — frontmatter framing + hero + embedded class deck/slideshow, near-zero writing:
  - **Bridging the G.A.P.** (brand + animation; visual, reads well lean) > **SomeBuddy** (lean or cut — dominated by Bridging).
- **Off the portfolio for now:** Whelm + Inkling (unfinished). Whelm = eventual **4th star** (solo, full ownership) once done.

**Three surfaces, decreasing ask on the viewer (added 2026-06-28):**
1. **Stars** — featured, full case studies (depth).
2. **"More work" grid** — lean projects as compact cards; each opens a thin framed page (one-line problem + role + outcome + embedded deck). Breadth, no writing burden. **A grid, not a dropdown** — Lorin has spent the project removing dropdowns; don't reintroduce one.
3. **Playground** — a separate, clearly-labeled light gallery for casual/experimental work. Personality + range, held away from the case studies so it never dilutes them.

**Site architecture — homepage as "Selected Projects" + an "All Work" bento page (vision, added 2026-06-30):**
This is the concrete shape the "three surfaces" now take, and the north star for the site build after the stars are written:
- **Homepage = "Selected Projects."** The homepage is a *curated* landing — only the stars (Groundswell, Birth Story, Transition Design; Whelm later). It is not a complete index; it is the 90-second highlight reel that makes the strong first impression. Decreasing ask: the homepage shows the best, in full depth.
- **"All Work" page = a traditional bento-box grid** of *every other* project. A classic bento layout (mixed-size tiles, each a project) that reads as a complete portfolio index without the writing burden of full case studies. Breadth lives here, away from the curated homepage.
- **Each bento tile opens its own page** — eventually a full case study (when the project earns one) or, in the meantime, a **basic project outline / documentation** (frontmatter framing + hero + embedded deck/slideshow, near-zero writing). Tiles graduate from "outline" → "case study" over time; the bento grid is the durable home for all of them.
- Mapping back to the three surfaces: **Selected Projects = surface 1 (stars)**; **All Work bento = surface 2 (the old "more work" grid, now a dedicated page)**; **Playground = surface 3** stays separate. The bento is still **a grid, not a dropdown** (the project's standing no-dropdowns rule).
- **Sequencing:** finish the star case studies first (Birth Story is the template pilot), then build the lean outline template, then stand up the All Work bento page and pour every other project into it as outline-tier, upgrading to case studies as they're written.

**Operating principle:** identical bones, bespoke flesh. Scannable in 3 minutes. Every section legible from its headline + captions alone. Reveals, never scrubs. Interaction is a bonus, never the only path to the information. (From the two case-study articles Lorin sent — semplice.com, uxpilot.ai.)

**Build approach — content-driven (refines the "one editorial form for all" memory decision):**
- **Lean tier** rides the existing markdown system (`app/(portfolio)/projects/[slug]` + `content/projects/*.md`) — modernize to V2 + deck embed (the `liveUrl` iframe already exists).
- **Rich tier** = the `GroundswellSpine` editorial form (`/projects/groundswell/hero`), made content-driven so Birth Story + Transition Design pour in without copy-pasting JSX.
- Groundswell keeps its one bespoke signature (the art-wall hero).
- Reconcile three template artifacts: keep `[slug]` (lean) · `GroundswellSpine` → rich-tier engine · retire `GroundswellPreview` (superseded).

**Hero mode is per-project, set by the deliverable (added 2026-06-28):** the opening sets the contract for the scroll that follows.
- **Mode A — full-bleed photo/video hero** that *transitions down* into editorial formats. For physical/experiential deliverables (Groundswell's art-wall hero).
- **Mode B — text + an isolated component** that starts calm and centered, then *reorganizes on scroll* into new layouts. For app deliverables (Birth Story Care Pod).
- Systems work (Transition Design) may open on a data-viz hero. Same bones, bespoke opening.

**Shipped 2026-06-28 (calibration):** reusable `<DeviceMockup>` primitive (`components/CaseStudy/DeviceMockup.jsx` — static image | looping prototype video | screens; reduced-motion + lazy-load handled) and the **Birth Story Care Pod calibration beat** (`components/Birthstory/`, route `/projects/birthstory-care-pod`). This beat is the tuning-fork for the minimalism / process / interactivity balance: centered Mode B opening, statement + device + depth line, color only inside the screen. DeviceMockup is reused by every app project (SomeBuddy, Homi, Heirloom, MindfulNest).

**Critical path:** Claude builds the lean template + ships Bridging *now* (no blocking on writing); Lorin writes Birth Story + Transition Design copy (only she can — her voice); then Claude makes the Spine content-driven and pours the stars in.

---

## Right now — Birth Story (the template pilot)

**Birth Story defines the case-study template.** Full draft at `/projects/birthstory-care-pod` (not gated; dev on port 3001).

**The locked direction — structured documentation in three legible voices** (full principle + reasoning in memory `DECISIONS.md → "Case-study REGISTER"`, 2026-07-01; this SUPERSEDES the 2026-06-30 "autobiographical prose" register). The reader must never *decipher* brief-vs-thinking, so: (1) **objective record** = direct sentences + labeled bullet lists (`Required`/`Provided`), NOT prose; (2) **her thinking** = the new teal **`<Insight>` "My thinking" callout** (`kit.jsx`), mirror of the terracotta `TesterNote` — content must be CONCRETE + in her voice (never invented; source from notes or `[LORIN TO WRITE]`); (3) **tester feedback** = the existing crit voice. Also: **Overview = metadata-forward grid** (no synopsis para); headers direct, no poetic titles; **stats big**; reference others' products by **citation, not mockup**. Fraunces still reserved for leads/headings/callouts; body = Open Sans; paper ground `#F1F2F0`. Candidate model for all the stars. **Copy source of truth = `components/Birthstory/*` (the page), not the copy doc.**

Earlier this build (2026-06-29): hero `BirthStoryHeroFan` wired live + Nav contrast fix; body on the split register; 03 Architecture IA diagrams rebuilt native (`IaDiagrams.jsx`, "so much better"); horizontal sticky progress bar (`BirthStorySpine`); Credits masthead in Brief.

**Shipped this session 2026-06-30 (committed local on `main`; NOT pushed):**
- **Tester "crit voice"** — new `CritStage.jsx` (terracotta pin + measured leader, "a tester said" card, set against the product teal). Placed: Voice (*why "reclaim"?* on the rejected draft copy) · Iteration round 1 (*too many buttons and options* on the over-built V1) · Book (*tragic to lose these moments*).
- **05 Features REBUILT** — retired the interactive tour (`OnboardingTour.jsx` kept on disk, unused). Now a **4-up `FeatureWall`** (Home · Care Pod · Book · Search, all side by side) opening on the insight *"birth never goes to plan, so the app is the opposite,"* then **four capability deep-dives** (Documentation · Care Pod · Reflection · Book), each = question + thinking + the real screens shown big.
- **Real Figma screens pulled** — 8 final "Gradient" screens exported 2× PNG to `public/images/birthstory/bs-{doc-note,doc-medical,reflect-card,reflect-entry,carepod-update,carepod-stories,book-order,book-curate}.png` (node ids + `download_assets` workflow in memory `REFERENCE.md`).
- **Photos** — class-presentation shots **bookend** the study (Brief top `IMG_3010` cropped 2∶1; Outcome `IMG_3012` paired with the client quote). New context photos added then **swapped to B&W**: Brief = `fog` (B&W via Cloudinary `e_grayscale`), Research = `feeding` (natively B&W); plus `gap`, `room` (Care Pod "why"). **Design values moved Brief → Research.** Brief client photo now **aligned in the same column** as the context photo (3∶2, not the 2∶1 band). **Final crit-wall whiteboard** (`class_notes.heic` via `f_auto`) closes Iteration.

**Shipped 2026-06-30 (latest — the copy pass, committed local on `main`, NOT pushed):** the whole case study rebuilt into the autobiographical-documentation register above. New kit `Lead` + `SubBlock`; Overview masthead added; `<Ask>` question openers removed everywhere; `.prose` moved off Fraunces. All standing corrections applied (Outcome overclaim gone, "built by me with AI / concept" explicit). Voice-audit passed (contractions, curly quotes, no em dashes, killed "hold space"). 4 pre-build decisions all resolved (feature map confirmed · warm-personal Brief w/ optional systemic toggle · `MY PART.docx` read = not Birth Story content · Olympic stat cut). Eyes-on verified 1440 + 390.

**Next move — the 6-item DESIGN FEEDBACK BATCH from her review (`PROGRESS.md → DESIGN FEEDBACK BATCH`), then COPY DAY, then push.** Two of the six wait on her word: the dotted-border “my thinking” distinguisher (Claude’s rec, needs her yes) and the visual Close (lands with the Close copy). The copy list is canonical in **`PROGRESS.md → COPY PARKING LOT`** — 2 HIGH (Close ending + Q7 impact answer as one authored passage · the Role statement / solo-vs-studio framing) + the small verdicts (spine vocabulary, act labels, Care Pod role line, “Find strength & support” rename, stats-big, colophon facts + Consent-row bless, tester-chip labels + evidence tiers, jargon calls incl. the hero’s Dezudio/UPMC vs Overview’s Myana/CONVERGE facts). Question-Map audit says the built page already answers Q1/Q4/Q5/Q6/Q8 — the copy closes the rest. Her still-open design verdicts: prio cells-vs-rows (desktop-only — it stacks to rows at 390 anyway), chip colors on her screen. Then: **Transition Design** (star #3; source = `MY PART.docx` Tab 2, `REFERENCE.md`); then the **All Work bento + Playground**.

**Open:** Lorin mentioned a **2nd whiteboard photo** (only `class_notes` placed so far) — ask if it covers different ground. ~~Low-res holdouts~~ RESOLVED 2026-07-04: all 8 page-used wireframes re-exported 2× from Figma (node map in `REFERENCE.md`).

**Asset note:** Birth Story screens live in `public/images/birthstory/` (2× PNG); context/documentary photos are Cloudinary (`birthPhoto()` map in `lib/cloudinary.js`). Pull more Figma screens by node id (REFERENCE.md). Pasted screenshots can't be grabbed — use Figma or Cloudinary.

---

## Groundswell case study (flagship — pending hero pivot)

The case study is now **one gated page: `/projects/groundswell/hero`** = `GroundswellHero` (cinematic dark hook) + `GroundswellSpine` (light process). The model + voice live in `docs/case-study-editorial/CASE_STUDY_PLAYBOOK.md → THE SPEC`; her origin copy is in `GROUNDSWELL_VOICE_DRAFT.md` (do not re-interview). Full detail in memory `PROGRESS.md → "Groundswell case study — CONSOLIDATED build"`.

**Shipped this session:** consolidated the parallel drafts into one page (retired `GroundswellProcess`/`GroundswellLook` + the `/spine`,`/look` routes); restored the cinematic hook (art-wall → shrink-into-circles → her real `connectors.svg` map → discs — *since trimmed to hook-only, see the restructure block below*) with a smart credit that fades with the artwork; the light process on a **real 12-column grid** (media full-width, text in a readable column, a **full-height vertical timeline rail** set apart by a divider + gap); act color-coding (sage/plum/terracotta, saturated); **no dropdowns** — Sense method **slideshow**, Weave **interactive system map**, Shape **interactive timeline**; **claimable-only outcomes** (study data removed — $30k+, live grant-funded QI study, 30 testers); first documentary photos placed; AA contrast.

**Shipped 2026-06-27 (overview pass, commit `cdf22a5`):** the **overview now opens documentary** — two grid-aligned full-bleed photos lead the section (playtest-setup `gs-playtest-01` left, staff grief-workshop `gs-workshop-grief-02` right, cropped so its right edge butts to col 9, aligning with the ROLE column). They reach the top with no white gutter; the green dawn (#C5CFA6 → transparent) fades in **below** them via `.mastBody::before`, full-bleed to the rail divider. Dropped the **"The process" kicker** — the masthead now leads with the *"I helped design Groundswell with the people it serves"* statement. **No credit on the candid BTS overview photos** (no art in frame — credit is reserved for the Blue-Garden frames). Recast **"More context"** as a **dark-mode card** (#252525, light text) with the site gradient plus/minus icon; the personal backstory reveals **inside** the expanded container (the sanctioned dropdown exception). Verified eyes-on at 1440.

**Shipped 2026-06-27 (earlier):** cleared the last two **dropdowns** — "More on how I got here" (Frame) is now a visible secondary way-in paragraph; "See how I got there" (the 6 ❗→⭐ pairs) is gone — each pair is now a visible three-tier card (tension → response → hairline → rationale). Dead `Expand` component + CSS removed. **Placed the four Weave intervention photos**: each intervention card (Art Wall / Restorative Pod / Reflection Cards / CTB Email) now leads with a documentary photo bleeding to the card edges, Carolyn Gavin credited inline ("Artwork Carolyn Gavin · Photography Kevin Lorenzi" — all four frames show Blue Garden). Verified eyes-on at 1440 + 400px; clean compile, no console errors.

**Shipped 2026-06-27 (Shape imagery + hero line):** Shape's two "calls that mattered" pairs now carry photos — `gs-workshop-flower-02` (the "Nourishing the Flower" worksheet → grief→restoration, no credit) and `gs-making-facade` (trust-not-surveillance, Carolyn credited). Overview left masthead photo `object-position` 40%→**56%** so the table artifacts read. Hero mid-scroll line **varied** to *"scattered support becomes a system that holds them"* so it no longer repeats the overview's "connected ecosystem" verbatim (now claim→proven). Verified 1440 + 400px.

**Shipped 2026-06-27 (hero restructure — biggest change):** the **mega-hero was trimmed to a hook** (`GroundswellHero`, **560/380vh → 165vh**, ~2 scrolls): thesis question → art-wall full-bleed → promise line → "Process ↓". The **ecosystem diagram was REMOVED from the hero** — it duplicated the Weave system map — and **consolidated INTO Weave**, where it now renders on her **real `connectors.svg` geometry** (her arrows draw on as the substrate, a plum lit overlay traces connections on select), placed **after the four intervention cards** as the synthesis ("How they connect"). `connectors.svg` now passes to `GroundswellSpine` server-side. No skip affordance (she chose a clean hook). Verified eyes-on 1440 + 400px; only pre-existing console noise (ShapeMark hydration + favicon).

**Reviewed 2026-06-28 (hero pacing + Weave map):** the 165vh hook is **rushed at the front, dead at the tail** (whole hook ≈ one trackpad swipe; the thesis question gone by ~120px). Recommendation logged: go **up to ~200–210vh** and hold the question longer (don't drop to 140 — that compresses further). **3 fixes shipped:** "Process ↓" / credit collision (credit → bottom-right corner), promise legibility (added contained scrim), and the Weave map caption grammar ("When a patient loss," → grammatical for all 6 moments). Weave "How they connect" map works in context.
**Next move (Groundswell):** the hero gets **rebuilt as the ecosystem circle→web signature** (the pivot — see `DECISIONS.md`); art-wall demotes to its intervention beat. Lower priority than finishing Birth Story + Transition Design. Copy: statement headings to bless + the **"what I'd do differently"** line still `[LORIN TO WRITE]` in Close.

**License (binding):** documentary art in approved context is OK with Carolyn credited inline; no NEW uses (card-flip deck, alterations). The legacy `GroundswellContent.js` build stays gated. See `PROGRESS.md → "Groundswell artwork-license hold"`.

**Dev gotcha:** Next `.next` desyncs after rapid edits → stale builds; view in **incognito**, and on stale: kill dev, `rm -rf .next`, restart. Never `npm run build` while `npm run dev` runs.

---

## Homepage — shipped this session (2026-06-27, all live on `origin/main` / lorin.work)

All deployed as isolated cherry-pick pushes to `origin/main` (the held Groundswell case-study commits stayed local):
- **Practice cards equal height** — `.practiceFan` `align-items: center → stretch`.
- **Hero intro reworked, locked on scrub.** Pass-through sweep (the scatter cluster is a pass-through waypoint, not a rest); cold-start entrance (flower *grows → spins once → bounces*, hover-spin arms after); even pacing (`end:'+=300%'`, `scrub:1`); "Keep Scrolling" renders two words (`.hWord` margin); no double-"Welcome" (SplitText `.revert()` on cleanup). **Guardrail logged in `PROGRESS.md` → stays scrub + `normalizeScroll`; do NOT decouple into timed-play / scroll-lock — that broke scroll repeatedly this session.**
- **About photo iris** reveals in the gaze (IntersectionObserver boundary trigger, not the old `top 85%` ScrollTrigger).
- **Groundswell homepage preview — data-viz gated** (commit `c4ab96e`): the data-viz recordings (`gs-opener`, `gs-pod-data` — real care data + licensed art) now sit behind a lock + `blur(4px)` via the new `components/CardStack/GatedOverlay` primitive (content illegible, work still reads, click-through preserved). "Data Visualization" moved to the **middle** file/tab (pills reorder with it); file-card media is now `object-fit: cover` (fills wide like other previews); **Experience Design leads with the cover-cropped `gs-walkthrough` video**.

**Next move (homepage):** the **Experience Design** card still shows `gs-hero` (corridor) + `gs-artwall` — Blue Garden art, public on the homepage. Give them the same gated/swap treatment when Lorin wants (she scoped this session to the data-viz recordings only).

**Push state:** `origin/main` = `c4ab96e`. Local `main` reads ahead/behind because the pushed commits are cherry-pick hashes — a `git pull --rebase` dedupes them. The other session's `GroundswellHero`/`GroundswellSpine` WIP is uncommitted in the tree (not mine — left untouched).

---

## Current Phase

**Dark homepage shipped to production.** Next focus: case study template and a real about page.

### Roadmap
1. ~~Codebase overhaul~~ done
2. ~~Finish dark homepage with project previews~~ shipped 2026-04-24
3. Case study pages (Sense/Weave/Shape template) — next
4. About page (new concept) — currently a disabled span in the nav

---

## What's Live (main branch, deployed to lorin.work)

- **Dark homepage** with scatter-gather hero, scroll-driven ProjectPreview carousels for all five projects, AboutSection (drop-down cards + Sense/Weave/Shape practice fan + bouncy mailto closer), Lenis smooth scroll
- Nav slimmed to "About" only (Work and Contact removed; ThemeToggle stashed but not imported)
- Footer: centered LinkedIn / GitHub / Resume / Email (Resume live as of 2026-07-03, pending deploy)
- `/projects/groundswell` case study with a "Live Site" cell linking to `/groundswell`
- Standalone Groundswell stakeholder site (`/groundswell`, complete, do not touch)
- Theme: forced `data-theme="dark"` on `/` only via inline head script + PortfolioShell effect; case study and other portfolio routes stay light
- Last production commit: `c799323` — SomeBuddy + TD subheads, closer word-break and spacing
- **Tag `v1-final`** points at `7c015c2` (the pre-redesign main HEAD), so the V1 site is one `git checkout` away

---

## What's Unfinished

- About page (`/about`) — the nav still shows it as a disabled span
- BirthStory / SomeBuddy / Transition Design / Bridging the G.A.P. case study pages — all `comingSoon: true` on the homepage; the routes don't exist yet
- ThemeToggle still in `components/ThemeToggle/` but no longer imported anywhere (intentional stash)

---

## Reference Branches (do not delete)

### `groundswell-case-study` (22 commits ahead of main)
Rich case study exploration. Key reusable patterns:
- 6-phase typewriter hero with FLIP repositioning
- FrameworkShuffle with expandable dropdowns and mark draw-on
- ProjectSidebar (sticky scroll nav for case studies)
- ProjectNav (prev/next project navigation)
- Animated SVG marks (SenseMark, WeaveMark, ShapeMark)
- Hand-drawn underline SVGs (Vector 206, 207)
- Scroll-driven metadata highlight cycling
- Full GroundswellCaseStudy component (1400 lines, use as reference not directly)
- Ends with a revert of a homepage dark experiment

### `homepage-updates` (3 commits ahead of main)
Earlier hero concept: 3-beat typewriter with greeting, title, sentence, FLIP word transition. Superseded by `homepage-dark-redesign` but has the narrative typewriter pattern if we want to revisit.

### `gather-test-page` (1 commit ahead of main)
"Gathered" page: scattered object layout with 12 curated personal items (stones, crystals, books, tarot card). Light/dark toggle, hover tooltips, placeholder shapes, full accessibility. Cabinet of curiosities concept for potential about page use.

---

## Stashes (6 remaining)

| # | Branch | What's in it | Reuse potential |
|---|--------|-------------|-----------------|
| 0 | homepage-dark-redesign | Squiggle color tweak (darker ink) | Low — trivial change |
| 1 | groundswell-case-study | Streamlined 3-beat hero, pre-measured FLIP optimization, bigger typography | High — animation pattern |
| 2 | groundswell-case-study | Scroll-driven metadata highlight cycling (items highlight in sequence on scroll) | High — novel interaction |
| 3 | groundswell-case-study | Alternating dark/light case study sections + Groundswell hero/metadata refinements | Medium — visual pacing |
| 4 | groundswell-case-study | Hand-drawn underline SVGs (Vector 206, 207) + hero layout refactor | Medium — unique assets |
| 5 | groundswell-case-study | Typography sizing polish, dark-mode color fixes | Low — incremental |

---

## Untracked Files

| File | Status |
|------|--------|
| `Case Study Copy Inspiration.pdf` | Reference — decide to commit or gitignore |
| `PORTFOLIO_INTELLIGENCE_2026.md` | Being archived to docs/archive/ |
| 4 screenshots (March 5) | Reference images — decide to commit or delete |
| `public/marks/and.svg` | SVG asset — decide if active |
| `public/marks/new dots.svg` | SVG asset — decide if active |

---

## Pending Upgrades

### Next.js 14 → 16 (deferred)

**When to do it:** after V1 late-stage edits are finished, before V2 case study template is built. Single focused window, not mid-design. Whelm is on a different stack (CRA), zero impact there.

**Why:** Next 14 has known DoS/RSC vulnerabilities patched in 15.5.10+. Next 16 also brings Cache Components, useful for the content-driven case study template not yet built. React 19 changes will affect any new components, so V2 work benefits from being on the new foundation from the start.

**Risk for this codebase: low.** Verified 2026-04-22:
- `[slug]/page.js` already uses `await params` (Next 15+ async pattern done)
- No `cookies()`, `headers()`, `searchParams` usage anywhere
- No `forwardRef`, `useFormState`, `useFormStatus` in direct code
- `next.config.js` minimal (just images + Cloudinary remotePatterns)
- GSAP via `@gsap/react` — framework-agnostic, unaffected
- gray-matter, react-markdown@9 — both stable across React 19

**Known issue: `next-cloudinary` peer deps.**
- v6.17.5 (installed) and v7-beta.11 both cap peer deps at Next ^15
- Will throw peer dep warning on Next 16 install
- Will likely work in practice (no breaking API surface), but verify all Cloudinary-rendered images after upgrade
- Check the next-cloudinary GitHub before upgrading for an official Next 16 release; otherwise install with `--legacy-peer-deps` and test

**Steps when ready:**
1. Branch off `main` (not the V2 feature branch): `git checkout main && git checkout -b nextjs-16-upgrade`
2. Run codemod: `npx @next/codemod@latest upgrade`
3. Test: every page in dev, especially `[slug]/*` routes and any page using Cloudinary
4. Bump GSAP if not current (already done 2026-04-22)
5. Merge to main, let Vercel deploy V1 on Next 16
6. Rebase `homepage-dark-redesign` onto upgraded main, continue V2

**Estimated time:** 30 min codemod + 1 hr verification, +30 min if Cloudinary needs intervention. Half-day total.

---

## Overhaul Progress

- [x] Phase 0: Protect existing work (push, clean branches, drop duplicate stash)
- [x] Phase 1: Consolidate project documents (7 → 3)
- [x] Phase 2: Token cleanup in globals.css
- [x] Phase 3: Sweep deprecated token usage
- [x] Phase 4: ~~Standardize GSAP easing (lib/motion.js)~~ SKIPPED — easing strings are just strings, GSAP is dynamically imported, centralizing adds indirection without benefit
- [x] Phase 5: Extract homepage data to lib/homeProjects.js, archive FeaturedWork (dead code), rename GroundswellContentV3 → GroundswellContent
- [x] Hero scatter-gather rebuild (merged from hero-scatter-gather branch 2026-04-07)
- [x] Phase 6: ~~Consolidate animation patterns~~ SKIPPED — breathing animation scale differences are intentional (1.03 idle vs 1.15 hint)
- [x] Phase 7: Archive orphaned components (ThemeSetter, BuildingNow, ProcessDot), clean up barrel exports
- [x] ProjectPreview component (2026-04-22): scroll-driven carousel — hero image composes, then rotation slides lift up from below one by one on continued scroll. Pin scales with slide count, sticky ease, final dwell, white text with subtle opacity, fixed-width text column (no reflow)
- [x] Homepage grid unification (2026-04-22): single `--page-gutter` canonical variable; `--gutter`, `--grid-margin`, `--container-padding` all alias. Breakpoint-divergent overrides removed so every edge aligns at every viewport
- [x] Groundswell carousel finalized with real assets (2026-04-22): 6-slot sequence — `gs-opener` video (stitched iris intro → display view, hard cut at natural fade), `gs-hero` corridor photo, `gs-pod-data` video (asymmetric right-crop to 16:10 preserves KEY panel), `gs-cards` artifact, `gs-walkthrough-video`, `gs-ctb-email`. Three-layer mute guard (`muted` + `defaultMuted` + ref fallback) on video element handles React's attribute quirk

---

## Decisions Log

| Date | Decision | Context |
|------|----------|---------|
| 2026-04-06 | Keep HowIWork component (may reuse on about page) | Has Systems/Stories/Solutions pillars concept |
| 2026-04-06 | Archive ThemeSetter (ThemeToggle handles data-theme directly) | Duplicate utility |
| 2026-04-06 | Keep BlobLabel (domain-colored pills, useful for case studies) | Well-built V2 component |
| 2026-04-06 | Archive ProcessDot (unused, simple to recreate) | 3 colored dots, no imports |
| 2026-04-06 | Drop gather-test-page concept as standalone page | May reuse ideas in about page |
| 2026-04-06 | Consolidate docs: keep CLAUDE.md, DESIGN_SPEC.md, WORKING_WITH_LORIN.md | Other 4 docs archived |
| 2026-04-06 | Skip lib/motion.js (Phase 4) | GSAP easing strings are just strings, dynamic imports make a constants file pointless indirection |
| 2026-04-06 | Skip animation consolidation (Phase 6) | Breathing scales (1.03 vs 1.15) are intentionally different for idle vs hint states |
| 2026-04-06 | Archive FeaturedWork | Exported in barrel but never imported anywhere — dead code |
| 2026-04-06 | Rename GroundswellContentV3 → GroundswellContent | V3 suffix is versioning noise. Decomposition deferred — touches standalone Groundswell site |
| 2026-04-06 | .DS_Store cleanup unnecessary | Already in .gitignore, not tracked in git |
| 2026-04-07 | Scatter-gather hero merged | Scroll-driven letter constellation replaces time-based hero |
| 2026-04-07 | Hero approach: cinematic hero, restrained body | Hero does the heavy animation lifting, rest of page should be impressive but not over-animated |
| 2026-04-22 | Drop peek-artifact concept | Tried and rejected in favor of full-media rotation (commit 7a5db8a still in history) |
| 2026-04-22 | ProjectPreview media rotation | Hero image composes, then 2-4 rotation slides lift up in-place on continued scroll. Real assets used where available; placeholders for non-Groundswell projects pending Lorin's image swap |
| 2026-04-22 | Grid path 1 (margins only, defer columns) | Unify horizontal margins now via `--page-gutter`; full 12-column grid adoption deferred until case study template is designed |
