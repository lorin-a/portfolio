# Birth Story — copy draft v3 (for Lorin to bless)

**The overhaul.** v1 and v2 were still pitch: rhetorical questions opening every section, italic punch-words, captions trying to be clever. v3 drops all of it. It is organized the way a hiring manager reading design-research case studies actually wants to read one: an at-a-glance summary first, then declarative sections that state the decision and document the reasoning. No questions as headers, no quips. Your substantive words are kept; the scaffolding is gone.

**What blessing this changes in the build.** The current components are built around the question-led furniture (`<Ask>` blocks, "week 1 · the ask" labels, mood-captions). Implementing v3 means restructuring those, not just swapping text. Sections lead with a bold statement, not a question. A new Overview block goes at the top.

**Conventions in this doc:** the **bold lead line** under each section number is the scannable takeaway a hiring manager reads first. Plain prose documents the reasoning. Tester quotes are verbatim and untouched. `[LORIN TO WRITE]` = yours. `[OPTIONAL]` = keep or cut.

---

## OVERVIEW — *(new section, top of page)*

**Birth Story is a concept for a companion app to Myana, a postpartum support platform. It helps parents document, reflect on, and make sense of giving birth — the part of the perinatal experience that goes unsupported once a newborn arrives.**

| | |
|---|---|
| **Role** | UX/UI lead · information architecture · visual identity · UX writing · co-led research |
| **Team** | Lorin Anderberg · Michael Juan |
| **Context** | 6-week graduate studio, Carnegie Mellon |
| **Client** | Sarah Burns (MSW) · Tamar Krishnamurti (PhD) · Myana |
| **Methods** | 7 parent interviews · 3 rounds of wireframe testing · forums and blogs |
| **Outcome** | Strong client validation; sponsored as it may inform future Myana iterations; no commitment to build |
| **Status** | A concept. I designed it and built the prototypes and this site with AI assistance. No app was shipped. |

Working from an explicit brief, my partner and I interviewed parents, reframed the project from a feature-heavy logging tool into a simple and emotionally intelligent space, and narrowed three rounds of design down to four core features. I led the UX/UI, information architecture, visual identity, and UX writing. The client validated the direction enthusiastically. The app remains a concept; I designed it and built the prototypes shown here.

---

## 01 THE BRIEF

**The brief was explicit and the skeleton was strong. The work was to make it real for an actual parent.**

Pregnancy is supported and understood. Giving birth is often a blur. It is a complex physical and emotional event that tends to be forgotten the moment the newborn arrives, and closing that gap was the assignment.

The prompt was specific. The name, Birth Story, was given, along with the core idea — document, reflect, and make sense of the experience — and suggestions to balance medical and emotional detail and to offer a keepsake book. There was a strong skeleton in theory. Our job was to turn it into a real concept.

**My role.** Michael Juan and I shared the research, co-facilitating interviews, co-synthesizing, and co-presenting to the client. I led the UX/UI, visual identity, user flows, and information architecture. Michael focused on data-visualization concepts that did not make the final design.

**Why I was close to it.** I come from a matriarchal family of mostly mothers, and many of their births did not go to plan. One sister labored 24 hours toward a home birth and ended up in a hospital on medication, then became a mother with no time to process the reversal. Another nearly died giving birth, and her son spent his first months in the NICU. None of the friends I asked had been offered any support with the experience afterward. I care about mental health and trauma, and this was a need I understood firsthand.

> [OPTIONAL — systemic context, from the client materials. Cut to stay personal; keep for wider stakes:] *In the US, most maternal deaths happen after delivery, and the large majority are preventable. The period this app addresses is the one that gets the least support.*

---

## 02 RESEARCH

**Seven parent interviews reframed the project from comprehensive logging to deliberate simplicity.**

We interviewed seven parents: two think-aloud walkthroughs of our wireframes over Zoom with parents the client arranged, three family members, and two friends I spoke with on my own. I supplemented the interviews with birth forums and blogs.

The central finding surprised me. Parents did not want to log every medical record. They wanted recognition for doing something difficult: a few photos, a loose outline to return to, and room to feel validated. We had been trying to build too much. The real work was less, not more.

They also described using the app in fragments, sleep-deprived and on their phones between feedings. They wanted simple "select one" inputs in the moment, and the option to come back and write the longer version once the fog lifted.

> "You often have one person in your corner who has seen what you went through, who validates your experience and what you've done. This amazing thing you've done. Not everyone has that."
> — Parent interview

The research produced four design values that guided every decision after it: intuitive and calming, easy to navigate, empathetic and trauma-informed, therapeutic.

---

## 03 INFORMATION ARCHITECTURE

**The app opens directly into documentation. There is no home screen, and nothing to answer before you begin.**

My first structure opened by asking where the parent was: before, during, or after the birth, at home or in the hospital. In testing it read like a form at the front desk while someone was still catching their breath. It added complexity and time the function did not justify, and it asked too many questions before getting to the point.

The reframe was to get out of the way. The app opens straight into note-taking, the feature parents most wanted, and a brief onboarding flow introduces the others, which stay reachable from the nav bar at all times.

A second decision unified the data. The brief required four kinds of capture: medical, contextual, narrative, and feelings. Rather than give each its own destination, I consolidated them into one timeline that every entry feeds — a note, a record, a photo, a voice memo — tagged and filterable by topic. Earlier versions separated them and tested as fragmented and complex.

*Diagram captions:* `ia-v1 · a branching questionnaire that asked conditional questions before any entry.` · `ia-final · five tabs, a single add button at center, nothing to answer before beginning.`

---

## 04 ITERATION

**Each round removed options the previous one had added. The app got simpler as testing went on.**

I tested wireframes with parents in three rounds and changed direction based on what they told me.

**Version 1** offered a tool for every situation, with sub-menus inside menus. It was disorienting.
> "Onboarding is nice, but there are too many buttons and options."
> — Parent tester

**Version 2** consolidated the separate sections into one filterable notes feature and reduced the flow to two actions, document and reflect, introduced one at a time. It was clearer, but still offered too many options. Testing also caught the language.
> "Why 'reclaim'? I'm not sure what it even means."
> — Parent tester

**Version 3** kept only the features parents consistently valued and made room to go deeper without distracting from them: one home, four ways in.

**What I could not test.** A six-week studio cannot show whether parents return to the app weeks later, once the fog lifts. That return is the core promise of the product, and it remains unproven.

---

## 05 THE PRODUCT

**Five features, each tied to a documented need. Of the brief's five optional features, I kept two, added one, and cut two.**

Birth is unpredictable, so the app is deliberately simple. It opens into documentation and reaches every other feature in a tap or two. The screens here are not static mockups; I rebuilt the wireframes as working prototypes for this case study, so the interactions are real.

**Prioritization.** The brief required information gathering, meaning-making, and onboarding, and offered five optional features on top. I kept two of the optional ones (sharing and a keepsake book), added one that was not requested (search, for cognitive load), and cut two (a symptom tracker and a birth-plan builder) as the kind of scope the research told me to resist.

**Documentation** — *the core feature; all of the brief's information-gathering requirement, unified.* Parents wanted to arrive directly at the main task. If nothing else is used, the app still holds a timeline of what they or a loved one added. A note from the delivery room, a prescription, and a voice memo land on the same timeline, the moment they happen.

**Care Pod** — *the heart of the concept; the brief's optional sharing and partner-participation features.* The idea came from one interview. A parent told me someone in her close circle remembered a detail about her child's birth that she did not, and she wished she had asked everyone to add their notes and experiences to form a full collective memory: the story of the birth, and how many people loved that child from day one. One support person sends updates, photos, and voice memos out; loved ones reply with messages and voice notes; all of it saves into the Birth Story.

**Reflection** — *the brief's processing and nudge requirements.* Every parent wanted to reflect, whether or not their birth was traumatic. Those who do not already journal often do not know where to start, so the feature offers gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.

**Search** — *not required; my addition.* Parents described real brain fog. As entries accumulate, search is one swipe from any screen and filters by emotion, category, or keyword, so a single memory is never buried.

**The Book** — *the brief's optional baby book.* A parent said she would not trust the app with this much precious information without a guarantee it would not be lost. The record can leave the app as a printed book or a free PDF, curated from existing entries and open to loved ones. It also gives the experience a sense of closure.
> "It would be tragic to lose these moments if the app went away."
> — Parent tester

---

## 06 UX WRITING

**The copy is trauma-informed without assuming trauma.**

Because births can be traumatic, I wrote the early copy in a careful, trauma-informed tone. Testing showed I had over-corrected. A parent did not connect with the word "reclaim," and it became clear I was emphasizing the hard parts at the expense of the connection and significance a birth can also hold. The words should not decide the experience for the parent.

> "Assuming there's a trauma, you shouldn't call it that. I appreciate the acknowledgement, but it feels like an implied negative."
> — Parent tester

Two examples of the rewrite:

| Before | After |
|---|---|
| "Reclaim your narrative." | "A space to make sense of it, in your own words." |
| "Find strength & support." | `[LORIN TO WRITE — a feature name that assumes the mother is already strong rather than in need of rescue. Per Q12, the original "positioned the new mother in a negative light when in fact most are empowered by doing an amazing and hard thing." What would you call it?]` |

I rewrote toward connection and left room for the parent to bring their own tone. The next step, if the project continued, is to balance the reflection prompts so they reach for joy as readily as they hold space for distress.

---

## 07 VISUAL DESIGN

**Calm, emotionally intelligent, and deliberately non-clinical.**

The app needed to feel calm, emotionally intelligent, and approachable, a break from clinical experiences. Myana already used a gradient, so I built one here to connect the two products. The lighter pink to darker teal carries two quiet metaphors: a gender spectrum, and the emotional range of the day itself. Parents said they would use the app in the small hours between feedings, so every choice had to read gently to an exhausted person in the middle of the night.

*The palette, type, and gradient specs already render in the section. `[LAYOUT, not copy]` your note about a compact right-side view and the moodboard whitespace is a build task for implementation.*

---

## 08 OUTCOME

**Strong client validation, and an honest limit: no commitment to build.**

We presented the concept, and the client responded with praise and almost no notes. There are no clear signals that the app will be built. Myana sponsored the project because it may inform future versions of their own product, and the pitch served the student project as much as the client. It gave the concept a strong starting point to develop further.

> "I wish this could be real right now!"
> — Sarah Burns, MSW, LSW · client

---

## 09 REFLECTION

**What I would do differently, and what the project taught me about how I work.**

I would start from the constraint rather than the possibilities. Naming the core need in the first week, less rather than more, would have saved a build full of tools no one asked for. I also learned to put something in a wireframe only when it raises a question I actually want feedback on.

The project reflects a pattern I have noticed in myself. As a big dreamer, I start by trying to do everything, then narrow further and further until I reach the heart of the product. This was one of the first projects I led on the visual UX and UI side, and it shaped how I wireframe now.

Birth Story is a concept. I designed it, then taught myself to prototype, to prompt engineer, and to build with AI, including this site. The screens are example flows; no app was built. Designing the concept and then learning to build it is the direction I am moving in.

---

## Open items
- `[LORIN TO WRITE]` the rename of "Find strength & support" (UX Writing).
- `[OPTIONAL]` the systemic-context line in the Brief.
- `[OPEN]` the personal "why I was close to it" beat in the Brief is near-verbatim Q4; trim if it runs long for the page.
- On bless: restructure `components/Birthstory/*` to the documentation format (remove `<Ask>` blocks, cute captions, and the "week N · …" labels; add the Overview block), then voice-audit the final copy, then the layout backlog in `PROGRESS.md`.
