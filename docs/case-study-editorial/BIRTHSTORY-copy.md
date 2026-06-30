# Birth Story — copy draft (for Lorin to bless)

**What this is.** Final-candidate copy for the whole case study, section by section, grounded in your verbatim interview (`BIRTHSTORY-interview.md`) and the official brief. Every standing correction is applied. The four decisions are resolved (see the plan). Read it, mark it up, and once you bless the words I implement them into `components/Birthstory/*` — nothing changes on the page until then.

**How to read it.** Each section gives the **job**, then the **copy by slot** (so implementation is mechanical), then a short **notes** line. `[OPEN]` marks the few places I still want your eye. `[OPTIONAL]` marks a line you can keep or cut. No em dashes anywhere; curly quotes throughout.

**Three things that are NEW or changed in a big way** (read these first):
- **Your "why" is finally in the study.** Q4 (your matriarchal family, your two sisters) was nowhere on the page. It now opens the Brief as a short, restrained personal beat. This is the single biggest add.
- **"Built by me" is made explicit.** The credit masthead and a build line now say plainly: you led UX/UI, identity, flows, and architecture, and you built the prototypes and this site with AI. It was invisible before.
- **The Outcome no longer overclaims.** "Professors and client intend to build it" is gone, replaced with the honest version.

---

## HERO — `BirthStoryHeroFan.jsx`
*Job: 5-second hook, plant the flag, set the honest frame.*

**Title**
> Birth Story

**Subhead** *(tightened to carry the full brief triad: document, reflect, make sense)*
> Pregnancy gets supported and understood. Giving birth is often a blur. **How might we help parents document, reflect, and make sense of their birth experience?**

**Disclosure** *(unchanged — it is honest and well-judged)*
> A micro-app concept for Myana, a postpartum support platform by Dezudio, made in a graduate studio at Carnegie Mellon. Created with client feedback, not professional work with Dezudio or UPMC.

**Notes:** No personal manifesto in the hero — the project leads here, and your POV thread (Q1) lands at the very end, in Reflection, where it reads as earned rather than asserted.

---

## 01 BRIEF — `BirthStoryBody.jsx → Brief()`
*Job: the ask, the real stakes, and who you were on the team.*

**Credits masthead** *(rebuilt from Q2 — foregrounds your ownership, credits Michael honestly)*
> - **role** — UX/UI lead · visual identity · flows & architecture
> - **research** — co-led with Michael Juan (interviews, synthesis)
> - **build** — prototypes & this case study by me, with AI
> - **studio** — 6-week graduate studio · Carnegie Mellon
> - **client** — Sarah Burns (MSW) · Tamar Krishnamurti (PhD) · Myana

**The question** *(`<Ask>`)*
> How might we help parents document, reflect, and make sense of their birth experience?

**Lede** *(kept close to current; one phrase of physical framing replaces the cut Olympic stat)*
> Parents who use Myana, a pregnancy and postpartum app, named the gap themselves: giving birth. Birth experiences vary widely and rarely go to plan. It is one of the most physically demanding things a body does and one of the most emotionally loaded, and it is the part that gets forgotten the moment the newborn arrives.

**What we were handed** *(NEW — the honest "given vs made" beat; standing correction #3)*
> The brief came with a strong skeleton. The name was set. So was the core idea: document, reflect, make sense of the experience, with a nudge toward a keepsake book at the end. The open question, and our actual job, was what that becomes for a real parent.

**Why I took this on** *(NEW — Q4, restrained to four sentences; this is the warm lead)*
> I did not come to this cold. I come from a big matriarchal family, almost all of them mothers, and almost none of their births went to plan. One sister labored 24 hours toward a home birth and ended up in a hospital on medication, the opposite of everything she had pictured, and then she was a mother with no time to process any of it. Another nearly died, and her son spent his first months in the NICU. When I asked friends who had given birth, not one had been offered any support with the experience afterward, and that absence is what the brief was really about.

> [OPTIONAL — systemic gravity. Add this one line after the personal beat if you want the wider stakes; cut it to stay personal. From the client deck:] *And it is not a small thing to leave unsupported. In the US, most maternal deaths happen after delivery, and the large majority are preventable.*

**The task** *(`<Prose>`)*
> We were asked to create and pitch the concept for Myana's companion app, Birth Story.

**Notes:** Decision #2 lives here. Warm/personal leads; systemic stats are the toggle. Decision #4 (Olympic stat) handled in the lede as framing. `[OPEN]` the personal beat names your sisters' experiences plainly but without detail — tell me if it is too much or not enough.

---

## 02 RESEARCH — `BirthStoryBody.jsx → Research()`
*Job: prove the thinker. Methodology, and the reframe told as restraint, not invention.*

**The question** *(`<Ask>`)*
> What does a parent actually need in the *fog* right after?

**Methodology** *(NEW — Q6, surfaced as a short line; it was only a caption before)*
> Seven parents. Two were think-aloud walkthroughs with parents our client introduced us to; three were family; two were friends. Forums and birth blogs filled in the experiences we could not reach in a six-week window.

**The reframe** *(`<Finding>` — standing correction #3: the brief gave the skeleton, the interviews told me what to cut)*
> The brief handed us a long list of things to capture. The interviews told me which to leave out. Parents were not sold on logging every medical record. What they wanted was recognition for doing something amazing and hard: a few photos, a loose outline to come back to, room to be validated. The work became **less, not more**.

**In pieces** *(`<Prose>` — kept)*
> And they would use it in pieces. Sleep-deprived but on their phones between feedings, they wanted **"select one"** questions in the moment, and the freedom to come back and write the long version once the fog lifted.

**Parent quote** *(`<Note>` — real, kept)*
> "You often have one person in your corner who has seen what you went through, who validates your experience and what you've done. This amazing thing you've done. Not everyone has that."

**Design values** *(kept — the four-value list is good as is)*
> Intuitive & calming · Easy to navigate · Empathetic & trauma-informed · Therapeutic

**Notes:** Methodology is honest about interviewing your own family (Q4/Q6) — proximity is a strength here, balanced by the client-sourced and forum voices. Reads as a researcher who used every angle available in six weeks.

---

## 03 ARCHITECTURE — `SecArchitecture.jsx`
*Job: systems judgment. The first answer was wrong; the reframe was the work.*

**The question** *(`<Ask>`)*
> What should a parent deal with *first*, on one of the most disorienting days of their life?

**My first answer** *(`<Finding>` — kept)*
> Ask them. The app would open by working out where you were: before, during, or after the birth, at home or the hospital, what kind of entry this was. I thought that was thorough.

**What testing showed** *(`<Finding>` — kept)*
> It read like a form at the front desk while you were still catching your breath.

**The reframe** *(`<Ask kicker>` — Q8: too many questions before the experience)*
> Not "where are you in your birth." The real question was how the app *gets out of the way*. Too many questions to answer when a parent should be taken straight into the experience.

**ia-final caption** *(kept)*
> ia-final · five tabs, a + in the dead center, nothing to answer before you begin.

**Notes:** Q8's kill-the-triage logic now states the reason in the reframe line. Diagrams unchanged.

---

## 04 ITERATION — `SecIteration.jsx`
*Job: the work changing on real feedback, and the discipline of subtraction.*

**The question** *(`<Ask>`)*
> When people are overwhelmed, what do you take *away*?

**Intro** *(`<Prose>` — kept)*
> Each round I put wireframes in front of parents and changed course on what they told me. Watching them in order, you can see the app calm down.

**Round 1 · week 3** *(Q9 — the over-built first build)*
> The first build offered every tool I could imagine, a path for every situation. A parent put the problem plainly.
> Tester: *"Onboarding is nice, but there are too many buttons and options."*

**Round 2 · week 4** *(Q9 — unified but still too many options; the words got caught)*
> So I cut to two verbs, Document and Reflect, and walked people through one at a time. I also stopped fragmenting: medical notes and memories had lived in separate places, and I folded them into one timeline you filter by topic. Then a tester caught the *words*.
> Tester: *"Why 'reclaim'? I'm not sure what it even means."*

**Round 3 · week 5** *(Q9 — the core that testers valued)*
> What was left is the answer: one home, four ways in. The features people kept reaching for stayed; the rest I let go.

**Still open** *(NEW — `<Friction>`; the one honest admission the section is missing)*
> What I never got to test: whether people actually come back weeks later, once the fog lifts. That return is the whole promise of the app, and it is the one thing a six-week studio cannot prove.

**Notes:** Round 2 now carries your "unify, don't fragment" insight (Q9), which was getting lost. The "still open" line is the senior move — name the limit of the format.

---

## 05 FEATURES — `SecFeatures.jsx`
*Job: craft, the WHY behind each feature (Q10), and the build reveal.*

**The question** *(`<Ask>`)*
> Birth never goes to plan. How do you build something simple enough to use anyway?

**Intro** *(`<Prose>` — kept, with the build reveal added)*
> The biggest thing testers told me: birth is unpredictable and complicated, so the app had to be the opposite. Easy to enter, easy to understand, easy to engage, whatever stage you are in. A home that drops you straight into documenting, and a nav bar that reaches every other feature in two taps. The screens below are not flat mockups. I rebuilt them as working prototypes in code, so the interaction is the thing you are looking at.

**The cut list** *(NEW — the strategist beat; Q11 + requirements; confirms decision #1)*
> We were handed five optional features on top of the required ones. I kept two, a sharing layer and a keepsake book. I added one nobody asked for, search, for the brain fog every parent described. And I cut the rest. A symptom tracker and a birth-plan builder were exactly the kind of *more* the research kept telling me to resist.

### Documentation *(core)*
**Q** > How do you capture it when you can barely *type*?
**Prose** *(kept)* > One place for everything. A tender note from the delivery room, a prescription with the doctor's instructions, a voice memo when your hands are full. Personal memory and medical detail land on the same timeline, the moment they happen.

### Care Pod *(the heart — now carries the origin story, Q10)*
**Q** > Who else is in the *room*?
**Prose** *(REWRITTEN to lead with the interview that created it)* > Care Pod started with one interview. A mother told me someone in her circle remembered a detail about her child's birth that she had lost completely, and she wished she had thought to gather everyone's pieces while they were fresh. That is the whole feature. One support person sends updates, photos, and voice memos out; loved ones send messages and voice notes back; all of it saves into the Birth Story. The point is a collective memory, the story of who was there and how loved that baby was from day one.
**"the why" photo caption** *(kept)* > Birth doesn't happen to the mother alone. The people there, and those waiting to hear, each hold a piece of the story.

### Reflection *(supporting)*
**Q** > Where does the parent get to *process* it?
**Prose** *(kept, lightly tuned to Q10)* > Reflection was the thing every parent asked for, traumatic birth or not. The trouble is most people do not journal, so they do not know where to start. So the Journal deals gentle prompts: a letter to your past self, the needs you can't name, the senses you want to keep. Something to do with the feeling while everyone else is asleep.

### Search *(your addition)*
**Q** > How do you find one moment in *all* of it?
**Prose** *(kept)* > Months of notes, photos, voice memos, and entries stack up fast. So search lives one swipe off the edge from anywhere: pull it in and filter by emotion, category, or keyword to bring a single moment back.

### The Book *(kept; Q10 — the trust concern)*
**Q** > Where do these memories go if the app *disappears*?
**Prose** *(kept)* > Parents said they needed something real to keep, in case the app ever went away. So the record can leave entirely: a printed Birth Story Book or a free PDF, curated from everything already captured, and open to loved ones to add to.
**Tester** *(kept)* > "It would be tragic to lose these moments if the app went away."

**Notes:** Care Pod now opens on its origin (Q10), which is the emotional center of the whole study. The "cut list" makes your prioritization visible, which is the strategist signal the positioning wants.

---

## 06 VOICE — `BirthStoryBody.jsx → Voice()`
*Job: the differentiator — trauma-informed language as a craft decision. This section was thin; Q12 fills it.*

**The question** *(`<Ask>`)*
> Whose story were we *assuming*?

**The realization** *(`<Prose>` — Q12, expanded)*
> Because births can be traumatic, I had written in a careful, trauma-informed tone from the start. A tester showed me I had over-corrected. I was betting too much on the hard parts and not enough on the way a birth brings people together, or on how miraculous it is. The words should not decide the experience for the parent.

**Tester** *(`<TesterNote>` — kept)*
> "Assuming there's a trauma, you shouldn't call it that. I appreciate the acknowledgement, but it feels like an implied negative."

**Before / after #1** *(kept)*
> the draft: "Reclaim your narrative."
> the rewrite: "A space to make sense of it, in your own words."

**Before / after #2** *(NEW — Q12's second example: the "find strength & support" feature name)*
> the draft: "Find strength & support."
> the rewrite: "Your people, in one place."
> *why:* the first version cast the new mother as someone in need of rescue. Most parents I spoke with felt the opposite, empowered by doing an amazing and hard thing.

**The principle** *(`<Prose>` — Q12 close)*
> So I rewrote toward connection and let the parent bring their own tone. If I kept working on this, the next pass is the reflection prompts: making sure they reach for joy and tender moments as readily as they hold space for distress.

**Notes:** `[OPEN]` the rewrite of "find strength & support" → "Your people, in one place" is my proposal (it points at the Care Pod). Swap in your own line if you have one. This is the only invented copy in the doc and I want your eyes on it.

---

## 07 BRAND — `SecBrand.jsx`
*Job: identity decisions, stated as decisions. Q14.*

**The question** *(`<Ask>`)*
> What should this feel like at *3am*, and in the hospital light?

**Prose** *(Q14, expanded to state the gradient metaphor)*
> It had to hold hard feelings and bright ones without tipping into either: calm, emotionally intelligent, never clinical. I built a gradient to echo Myana, the parent app, so Birth Story would feel like family. The colors carry two quiet metaphors: a lighter pink into a deeper teal, for the spectrum of who gives birth and for the emotional range of the day itself. Users told me they would reach for this in the small hours between feedings, so every choice had to read gently to an exhausted person in the middle of the night.

**Signature note** *(kept)*
> blush → periwinkle → teal · the whole identity in one object

**Notes:** The pink-to-teal reasoning (gender spectrum + emotional juxtaposition) is now stated, not just implied in the swatch note. `[LAYOUT, not copy]` your note about a compact right-side view and killing the moodboard whitespace is a build task for the implementation pass.

---

## 08 OUTCOME — `BirthStoryBody.jsx → Outcome()`
*Job: an honest win. The overclaim is removed.*

**Where it landed** *(`<Finding>` — REPLACES the "professors and client intend to build it" overclaim; standing correction #1)*
> The client's response was praise and almost no notes. What this earned was not a green light. Myana sponsored the project because it may inform future versions of their own app, and there is no commitment to build Birth Story. What it earned is a real foundation: a proposed design direction, validated by the person it was for.

**Client quote** *(kept — real, and now correctly framed as enthusiasm, not a contract)*
> "I wish this could be real right now!"
> — Sarah Burns, MSW, LSW · client

**Notes:** This is the must-fix. Frame stays "proposed a design direction," per the doc's own note-to-self. No metrics, because it is a concept and nothing shipped.

---

## 09 REFLECTION — `BirthStoryBody.jsx → Close()`
*Job: the senior close, tied to your thread (Q16 + Q1).*

**The question** *(`<Ask kicker="next time">`)*
> What would I ask *differently*?

**What I'd do differently** *(kept — it is good)*
> I would start from the constraint, not the possibilities. Naming the core need in week one, *less, not more*, would have saved me a build full of tools nobody asked for. And I learned not to put anything in a wireframe that opens a question I did not mean to ask.

**The thread** *(NEW — Q16; names the arc the whole case study just walked)*
> This is also just how I work. I am a big dreamer, so I start by trying everything, and I almost always narrow and narrow until I reach the heart of the thing. This project was one of the first I led on the visual and UX side, and it set the pattern: ask the right questions, build the room for the real need to surface, then carry its story and its feeling all the way through to what gets made.

**Who I'm becoming** *(NEW — Q5; the self-taught build arc, stated once, plainly)*
> Birth Story is a concept. I designed it, and then I taught myself to build, so the prototypes and this site are mine, made with AI. That is the direction I am heading: a researcher who can carry an idea from the first interview to something you can actually hold.

**Notes:** Q1's POV thread lands here as the close, where it is earned by everything above it rather than asserted in the hero. Q5's "no app is built" honesty is stated cleanly so the concept framing is unmistakable.

---

## Still want your eyes on
- `[OPEN]` **Brief personal beat** — your sisters, named but spare. Too much, or right?
- `[OPEN]` **Voice before/after #2** — "Find strength & support" → "Your people, in one place" is my line. Yours instead?
- `[OPTIONAL]` **Systemic stats** in the Brief — keep the one-line maternal-mortality bridge, or stay fully personal?
- After you bless the words, the remaining items are **layout/build** (Voice draftiness, compact Brand view, Outcome photo overlap, animation timing), tracked in `PROGRESS.md`, and a **voice-audit pass** on the final copy before it goes live.
