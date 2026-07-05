# Birth Story — Lorin's interview answers (raw / verbatim)

Source material for the case-study copy pass. Lorin's own words — preserve her phrasing; shape structure, keep voice. Captured 2026-06-30. Q5–Q16 to follow.

---

## Part A — the spine

**Q1 — The thread (who she is):**
> Understands the importance of asking the right questions and creating the right environment for real needs to surface. Then I synthesize those needs and translate them into opportunities. From there, I craft them in a way that keeps the story, the need, the emotion at the heart of every decision.

**Q2 — Contribution (vs Michael Juan):**
> Michael and I shared research responsibilities, co-facilitating interviews and co-presenting to the client. And co-synthesizing. Michael primarily owned mocking up data visualization features that did not ultimately get featured in the final design. I led UX/UI, visual identity, user flows/architecture, mockup designs. Michael contributed strategic feedback and brainstorming.

**Q3 — The bet / the brief:**
> We were given a very explicit prompt (I will show you so you understand) — the name was already given, Birth Story. The concept of document, reflect, make sense of the birth experience was already asked of us. Suggestions around balancing medical and emotional details, giving a book option — there was already a strong skeleton for what this should be in theory. It was up to us to create the concept in a real way. We started off trying to fit in as many features as we could — body scanning, data analysis, personal reflection, in-the-moment documentation tools — and quickly realized we were trying to do too much and returned to the reality of our user: a parent giving birth, or their partner, with little to no capacity, likely using this during or after birth with even less capacity, so this needed to be simple. There was strong desire for features that allow you to document, reflect, and make sense of the experience, but how that was designed from an interaction standpoint needed to be explored. User feedback on our second version helped us really step back and simplify. I learned the lesson that I should only show features I want feedback on in a review, so I simplified my image-heavy first prototype into more of a color-block and simple-icon wireframe, which helped direct the feedback more to the flow itself without distractions. While we were not able to show an A/B to the parents we interviewed, our client did see all 3 iterations and was very happy with the final.

**Q4 — Why she cared:**
> I come from a matriarchal family with mostly women, almost all of whom are mothers. I interviewed my family members and many of them had traumatic experiences or births that did not go according to plan. I asked friends as well who had given birth and it was shocking that none of them ever had support with the experience afterward and no one really prepared them for it. I am passionate about mental health, working with trauma, and psychology, so this called out to my heart as a very important need. We heard that there is significant grief when your birth plan does not go how you thought — for example, my sister planned a natural home birth and after 24 hours of slow painful labor had to go do a hospital birth with medication. This was the opposite of her plan, and then instantly she was a mother with no time to process that. My other sister nearly lost her life giving birth and her baby ended up in the NICU for the first few months of his life; this is an entirely different set of trauma that will forever be a part of their birth experience, and not just for them but for our family. Other parents could laugh and joke about which baby was easier and other more classic stories of birth going smoothly — and even they still wished there was a way to document it. On the more positive side, some parents said they wished that they could see a collection of everyone's experience and all the little details that they might not know — who was there, what they brought, what they witnessed, how they felt, even those anxiously waiting to receive the call. We learned that this is a shared experience for many, and while some features like journaling should be private for the individual or couple, others should be shared.

---
**Q5 — The build, in her words:**
> Since taking this course and learning how to prototype, I have taught myself prompt engineering and now I build apps, including this website, with AI assistance. I am an immersive storyteller and value motion when it serves a function. I rebuilt my original wireframes into animated prototypes for this case study and feel the strong potential of what this app concept could be. These are still just example features and flows for the concept — no app is built.

(HONESTY GUARDRAIL: claim "designed the concept; built this case-study site + animated prototypes with AI assistance." Do NOT claim a shipped app. The build proof is the *site/prototypes*, not a live product.)

---

## Part B — the project

**Q6 — Methodology:**
> We interviewed 7 parents. 2 interviews over Zoom with parents our client set us up with, where we did a think-aloud walk-through of our wireframes. I did video interviews with 3 family members and 2 friends on my own to hear more about the experience. I also researched forums and read blogs.

**Q7 — Synthesis / the a-ha:**
> The whole process for us was essentially starting big and chiseling down our flow into something approachable and simple that still held emotional tenor and clear function. The think-aloud interviews created the a-ha moment that we did not need a home menu page at all — users wanted to be able to jump right in and easily navigate, so we decided to have the app open into the most prominently desired feature: note taking, with an onboarding flow that showed the other optional features that are also easily accessible via the nav bar at all times.

Supporting quotes found in her research doc (use to ground the IA decision): **"Document details should be first"** and **"Too many menus"** (parent testers).

---
**Q8 — Architecture, why kill the "meet you in the moment" triage:**
> While the idea of an app that meets you in the moment you are in could still work, it proved to add more complexity and time than the function was worth. Too many questions to answer when they should be taken straight into the experience.

**Q9 — Iteration, the three rounds:**
> V1 had far too many user decisions to make; sub-menus within menus was disorienting and it needed to be simplified. I realized I was isolating interactions that could be housed uniformly in one feature — such as a singular notes section that can be filtered by topic/theme rather than isolating medical documentation in one place and memories in another. V2 was simplified with stronger flow rationale but still proved to be too many options, and user feedback this time showed us what was most useful to folks. V3 finally highlighted the core features we heard that users valued and created opportunity for deeper engagement throughout in a way that did not distract from the core functions.

Supporting quotes for V2 "what was most useful" (from her research doc): **"Document details should be first"**, **"Voice notes would be fun right after"**, **"Cool to share with grandparents, aunts and uncles. Privatize some of it."** (and the over-build signal: **"Too many menus"**).

---
**Q10 — Why each feature exists (her words):**
> - **Documentation/Notes:** Users told us they want to arrive directly into the app to do the main function, which is to document. If nothing else is used, at least there is a timeline documentation of what they or a loved one were able to add, and it is front and center.
> - **Reflection/Journal:** Users universally shared a desire to reflect and process their experience regardless of whether or not it was traumatic. The reflection cards and prompts are designed to start the conversation and create a space to reflect. Some say they journaled, but those who don't journal regularly may not have the infrastructure to know where to start.
> - **Care Pod (THE HEART):** Care Pod became real when one of our interviewees mentioned that someone in her close circle remembered a detail about her child's birth that she did not recall, and she wished she would have thought to get other people to add their notes and experiences to form a full collective memory — to tell the story of their birth to her child and how many people loved them from day 1. This became both a need for communication and documentation and a desire for collective memory-making.
> - **Search:** A feature to support brain fog and overwhelm; it allows the new parent to not need to navigate through the app to locate any specific memory or detail.
> - **The Book:** A suggestion from the start that we took seriously when a user mentioned she would not trust the app with all of this precious information with no guarantee that the info would not be lost one day. A deliverable that also put some closure on the experience and encouraged the reflection and curation process. Available as a free PDF or a real book to order.

**Q11 — Cut / proudest:**
> Hard to say what I would cut. Search feels a little boring but it is a function for a need. Care Pod feels strong and has the heart of the project. Notes are the core need addressed. Journaling/reflection was explicitly asked for but it's not unique.

(STORY EDIT GUIDANCE: lead deep on Care Pod (heart) + Documentation (core). Reflection, Search, Book = lighter/supporting.)

**Q12 — Voice strategy:**
> From the start I knew that births could be traumatic, so I took a careful and compassionate trauma-informed tone. When a user did not connect with "reclaim," it became clear that I was betting too much on the challenges and not enough on the way a birth brings people together and its miraculous significance. So I shifted it to be more care-centered and neutral. If I could keep working on this I would ensure the reflection questions were a balance of recalling joy and nurturing moments of distress. Same for "find strength & support" as a feature — it positioned the new mother in a negative light when in fact most are empowered by doing an amazing and hard thing.

(SECOND before/after example: feature name **"find strength & support"** → reframe (positioned mother negatively). VERIFY before using: the "birth exertion = Olympic-athlete endurance" stat Lorin asked me to look up — treat as framing, source it or soften.)

**Q14 — Brand rationale:**
> I wanted the app to feel calm, emotionally intelligent, and approachable — a break from clinical experiences. Myana already used a gradient in their app, so I felt a gradient here would be a good combination. I chose lighter pink and darker teal to subtly represent multiple metaphors: gender spectrum and emotional juxtaposition. Users said they would likely use it in the wee hours of the night between feedings, so it should feel welcoming and calm for an exhausted person in the middle of the night.

**Q15 — Outcome (HONEST — current copy overclaims):**
> We presented and the client had praise and almost no notes, and she said she wished this was real right now! There are no clear signals that this app will be developed, and the pitch may have been mostly for the benefit of the student project rather than the client, but it has offered a great starting point for exploring further.

(CORRECTION REQUIRED: current Outcome says "the professors and client intend to build it" — that is NOT supported. Reframe to: strong client validation, no commitment to build, a strong starting point.)

**Q16 — Reflection / growth:**
> This project was one of the first that I mostly led visual UX/UI on, and it informed how I wireframe. I noticed that my pattern as a big dreamer is to try to do everything at first, and I almost always end up narrowing down further and further until I get to the heart of a product. It was great practice with realtime feedback from clients, peers, teachers, and users.




---

## The official brief + requirements (from LaCie: IXD_ Myana Birth Story.docx + Requirements.xlsx)

**Deliverables required:** final presentation · an IA/key-workflow diagram · annotated wireframes w/ rationale · hi-fi mockups of a representative subset · team eval · 3–5 high-res hero images.

**Required features (the "skeleton" Lorin was given):**
- **1.0 Information gathering** — 1.1 Medical (mom+baby: meds, diagnoses, pain mgmt/interventions, treatment plans) · 1.2 Contextual (who/when/how long/where) · 1.3 Birth narrative (what unfolded over time) · 1.4 Feelings.
- **2.0 Meaning-making** — 2.1 Processing (process unplanned/traumatic events; focus positive, don't re-traumatize; silver-lining/growth; "people have different goals — process trauma OR celebrate joy OR both").
- **3.0 Admin** — 3.1 Profile/Onboarding (quick setup, tailor to context, partner/care-team access) · 3.2 Nudges (prompt capture; tone/framing matters).
- **Optional A–E:** A Baby Book · B Trackers · C Birth Plan · D Sharing · E Partner Participation.

**Her feature decisions → requirements (the prioritization/strategy story):**
- **Notes/Documentation = ALL of 1.0** unified into one tagged timeline (her "unify, don't fragment" insight) — required, made simpler than asked.
- **Reflection/Journal = 2.1 + 3.2** (the prompts).
- **Onboarding = 3.1.**
- **Care Pod = D Sharing + E Partner Participation** — *optional*, chosen as a core pillar, grounded in the collective-memory interview.
- **The Book = A Baby Book** — *optional*, chosen.
- **Search = NOT required** — her own addition for brain fog / cognitive load (initiative).
- **Cut: B Trackers, C Birth Plan** — optional, deliberately dropped ("less, not more").

**Outcome — the supported truth (use this, drop "intend to build"):** the doc says *"The client wanted to sponsor this project as it may inform future iterations of their app."* So: client sponsored it; it *may* inform future Myana iterations; no commitment to build Birth Story. Plus a note-to-self in the doc: *"portfolio words represent that it is a school project — 'propose a design direction,' never back-pedal."*

**Systemic stakes (client talk, optional gravity for Brief):** 700 US maternal deaths/yr, 80% preventable, 65% after delivery, 1 in 3 after discharge, Black women 3× more likely. Myana = Track/Engage/Triage/Support; "Mothers, you are not alone."

**Craft ethos from the studio (her case-study DNA):** "DO LESS, Do ENOUGH" · "6 screens not enough, 35 too many" · "Don't tell me, show me."

---

## Sister interviews — her verbatim synthesis (added 2026-07-05)

Her own words describing the pre-build **information interviews with family** (generative
phase, distinct from the post-V2 think-aloud/TAP evaluative research). Source for the
Research-section "What they wanted / How they'd use it" findings.

> Based on my interviews with my sisters, they aren't sold on the idea that we need to be
> documenting all the medical records and such but that it would be nice to have more photos
> and a general outline of the events that happened to refer back to. They felt more like they
> needed validation and recognition for doing this amazing and hard thing. They said that at
> first they will be sleep deprived but definitely on their phones while breastfeeding, that
> they would prefer easy to answer questions like "select one" during this phase and then maybe
> later they can revisit the entry and do more free form journaling. They like the idea that the
> story or narrative eventually gets turned into a baby book of the story of how they came to be
> in the world. They see value in being able to express multiple perspectives of the story via
> partner, etc. but also owned that they feel a strong claim to "my experience". They hate the
> idea of a "normal" birth and feel it is more traumatizing than it is not and this doesn't get
> discussed enough. A safe space to reject the idea of what you "should do" and to hear other
> people's stories like a forum and resources would be very helpful and important. They are
> concerned about medical data security.

**Findings not yet placed on the page** (available if wanted): multiple-perspectives-but-my-story
(→ Care Pod's ownership tension), medical data-security concern (→ trust / the Book keepsake
rationale), forum/community stories + resources.

## Research → Architecture "My thinking" reflection — her words (added 2026-07-05)

> My thinking was informed and rooted in my close family members' traumatic experiences, which
> explains why I took a trauma-informed approach. I was looking for the right balance of how to
> support the individual experience and feat of giving birth and the collective experience of
> those who were a part of the experience. I was also thinking about how to match the interaction
> design to the capacity level of a new parent. I chose not to focus on medical records primarily,
> but to leave documentation of medical information optional; instead, the focus would be
> event-based and timeline-based by the final iteration.
