# Birth Story — copy draft v2 (for Lorin to bless)

**What changed from v1.** You called v1 a pitch, not process documentation, and said it isn't how you'd speak in an interview. You were right. v1 smoothed your verbatim into marketing: punchy fragments, parallel closers, a manifesto ending. **v2 pulls the copy back down onto your actual interview answers.** Most lines here are your words from `BIRTHSTORY-interview.md`, lightly stitched into each slot, in the register of you answering an interviewer's question. Same structure (you said it was almost perfect), same corrections, same resolved decisions. Just your voice instead of an ad's.

**The register, stated plainly so you can hold me to it:** first person, contingent, explains the reasoning, says what surprised you and what you got wrong, no fragments-for-effect, no corporate design language, no closers that sound like a tagline. The progress nav (Brief → Reflection) is the list of questions an interviewer would ask; each section is your answer to one of them.

**One thing I will not do:** write a line *for* you. There's exactly one spot where v1 invented copy (a feature-name rewrite). v2 marks it `[LORIN TO WRITE]` with a tight prompt instead.

`[OPEN]` = wants your eye · `[OPTIONAL]` = keep or cut · `[LORIN TO WRITE]` = yours to fill.

---

## HERO — `BirthStoryHeroFan.jsx`
*Interviewer: "What was this project?"*

**Title** > Birth Story

**Subhead** *(full brief triad: document, reflect, make sense)*
> Pregnancy is supported and understood, but giving birth is often a blur. **How might we help parents document, reflect, and make sense of their birth experience?**

**Disclosure** *(unchanged — honest and well-judged)*
> A micro-app concept for Myana, a postpartum support platform by Dezudio, made in a graduate studio at Carnegie Mellon. Created with client feedback, not professional work with Dezudio or UPMC.

**Notes:** No POV line in the hero. Your Q1 thread now lands in Reflection, where it's earned.

---

## 01 BRIEF — `BirthStoryBody.jsx → Brief()`
*Interviewer: "What were you asked to do, and who were you on the team?"*

**Credits masthead** *(from Q2 — your ownership, Michael credited honestly)*
> - **role** — UX/UI lead · visual identity · flows & architecture
> - **research** — co-led with Michael Juan (interviews, synthesis)
> - **build** — prototypes & this case study by me, with AI
> - **studio** — 6-week graduate studio · Carnegie Mellon
> - **client** — Sarah Burns (MSW) · Tamar Krishnamurti (PhD) · Myana

**The question** *(`<Ask>`)*
> How might we help parents document, reflect, and make sense of their birth experience?

**Lede** *(your existing on-page line — kept; no Olympic stat)*
> Parents who use Myana, a pregnancy and postpartum app, noted a gap in their experience: giving birth. Birth experiences vary widely and hardly go according to plan. It is a complex physical and emotional time that often gets forgotten when the newborn arrives.

**What we were handed** *(NEW — Q3 verbatim; standing correction: separate given from made)*
> We were given a very explicit prompt. The name was already there, Birth Story, and so was the core idea: document, reflect, and make sense of the experience, with suggestions about balancing medical and emotional detail and offering a book at the end. There was a strong skeleton in theory. It was up to us to make the concept real.

**Why I took this on** *(NEW — Q4, your words)*
> I come from a matriarchal family of mostly women, almost all of them mothers, and many of their births did not go to plan. One sister planned a natural home birth, labored 24 hours, and ended up in a hospital on medication, the opposite of her plan, and then she was instantly a mother with no time to process it. Another nearly lost her life giving birth, and her baby spent his first months in the NICU. When I asked friends who had given birth, it was shocking that none of them had any support with the experience afterward. I am passionate about mental health and trauma, so this called out to my heart as a very important need.

> [OPTIONAL — systemic gravity, from the client deck. One line, after the personal beat, if you want the wider stakes:] *And it is not a small thing to leave unsupported. In the US, most maternal deaths happen after delivery, and the large majority are preventable.*

**The task** *(`<Prose>`)*
> We were asked to create and pitch the concept for Myana's companion app, Birth Story.

**Notes:** `[OPEN]` the "why I took this on" beat is nearly word-for-word from Q4. Trim or expand to taste. Decision #2 lives here: personal leads, systemic is optional.

---

## 02 RESEARCH — `BirthStoryBody.jsx → Research()`
*Interviewer: "How did you approach the research, and what did you learn?"*

**The question** *(`<Ask>`)*
> What does a parent actually need in the *fog* right after?

**Methodology** *(NEW — Q6, your words)*
> We interviewed seven parents. Two were think-aloud walkthroughs of our wireframes over Zoom, with parents our client set us up with. I did video interviews with three family members and two friends on my own to hear more about the experience, and I read forums and blogs for the rest.

**The reframe** *(`<Finding>` — Q3/Q4; told as restraint, not invention)*
> What surprised me is that parents were not looking to log every medical record. They wanted recognition for doing something amazing and hard: a few photos, a loose outline to come back to, room to feel validated. We had been trying to do too much. The work was really about **less, not more**.

**In pieces** *(`<Prose>` — kept)*
> And they would use it in pieces. Sleep-deprived but on their phones between feedings, they wanted **"select one"** questions in the moment, and the freedom to come back and write the long version once the fog lifted.

**Parent quote** *(`<Note>` — real, kept, placed at the turning point)*
> "You often have one person in your corner who has seen what you went through, who validates your experience and what you've done. This amazing thing you've done. Not everyone has that."

**Design values** *(kept)*
> Intuitive & calming · Easy to navigate · Empathetic & trauma-informed · Therapeutic

**Notes:** Methodology is honest that some interviews were your own family (Q4/Q6). Proximity reads as a strength here, balanced by the client-sourced parents and the forums.

---

## 03 ARCHITECTURE — `SecArchitecture.jsx`
*Interviewer: "How did you decide on the structure?"*

**The question** *(`<Ask>`)*
> What should a parent deal with *first*, on one of the most disorienting days of their life?

**My first answer** *(`<Finding>` — kept; contingent, admits the miss)*
> Ask them. The app would open by working out where you were: before, during, or after the birth, at home or the hospital, what kind of entry this was. I thought that was thorough.

**What testing showed** *(`<Finding>` — kept)*
> It read like a form at the front desk while you were still catching your breath.

**The reframe** *(`<Ask kicker>` — Q8 + Q7, your words)*
> The idea of an app that meets you in the moment could still work, but it added more complexity and time than it was worth. Too many questions to answer when a parent should be taken straight into the experience. So we cut the home menu entirely: the app opens into note-taking, the thing people most wanted, with onboarding to show the rest in the nav.

**ia-final caption** *(kept)*
> ia-final · five tabs, a + in the dead center, nothing to answer before you begin.

**Notes:** Q8's logic and Q7's "no home menu" insight are now both in the reframe. Diagrams unchanged.

---

## 04 ITERATION — `SecIteration.jsx`
*Interviewer: "Walk me through how it evolved."*

**The question** *(`<Ask>`)*
> When people are overwhelmed, what do you take *away*?

**Intro** *(`<Prose>` — kept)*
> Each round I put wireframes in front of parents and changed course on what they told me. Watching them in order, you can see the app calm down.

**Round 1 · week 3** *(Q9, your words)*
> The first version had far too many decisions to make. Sub-menus inside menus, a path for every situation. A parent put it plainly.
> Tester: *"Onboarding is nice, but there are too many buttons and options."*

**Round 2 · week 4** *(Q9 — the "unify, don't fragment" insight, your words)*
> I realized I was separating things that could live in one place: medical notes here, memories there, when they could be one notes section you filter by topic. V2 had a stronger rationale, but it was still too many options. Then a tester caught the *words*.
> Tester: *"Why 'reclaim'? I'm not sure what it even means."*

**Round 3 · week 5** *(Q9, your words)*
> V3 finally centered the few features people kept telling me they valued, and left room to go deeper without distracting from them. One home, four ways in.

**Still open** *(NEW — `<Friction>`; the honest limit)*
> What I never got to test is whether people actually come back to it weeks later, once the fog lifts. That return is the whole promise of the app, and a six-week studio can't really prove it.

**Notes:** Round 2 carries your unify-don't-fragment insight, which v1 buried. "Still open" names what the format couldn't reach.

---

## 05 FEATURES — `SecFeatures.jsx`
*Interviewer: "Tell me about the key features and why they exist."*

**The question** *(`<Ask>`)*
> Birth rarely goes to plan, so how do you build something simple enough to use anyway?

**Intro** *(`<Prose>` — Q5 build reveal, your words)*
> Testers kept telling me the same thing: birth is unpredictable and complicated, so the app had to be the opposite. Simple to enter, wherever you are in it. The home drops you straight into documenting, and the nav reaches everything else in a tap or two. The screens below are not flat mockups. I rebuilt my wireframes into working prototypes for this case study, so what you're looking at is the real interaction.

**The cut list** *(NEW — Q11 + requirements; confirms decision #1)*
> We were handed five optional features on top of the required ones. I kept two, a sharing layer and a keepsake book. I added one nobody asked for, search, for the brain fog every parent described. And I cut the rest. A symptom tracker and a birth-plan builder were the kind of extra the research kept telling me to leave out.

### Documentation *(core — Q10, your words)*
**Q** > How do you capture it when you can barely *type*?
**Prose** > Users told us they wanted to arrive directly into the main function, which is to document. If nothing else gets used, there is still a timeline of what they or a loved one managed to add, and it's front and center. So one place holds everything: a note from the delivery room, a prescription, a voice memo when your hands are full. Personal memory and medical detail on the same timeline, the moment they happen.

### Care Pod *(the heart — Q10, your words, origin story restored)*
**Q** > Who else is in the *room*?
**Prose** > Care Pod became real in one interview. A parent told me someone in her close circle remembered a detail about her child's birth that she did not, and she wished she'd thought to ask everyone to add their notes and experiences, to form a full collective memory: the story of the birth, and how many people loved that child from day one. It was both a need for communication and a desire for collective memory-making. So one support person sends updates, photos, and voice memos out; loved ones send messages and voice notes back; and all of it saves into the Birth Story.
**"the why" photo caption** *(kept)* > Birth doesn't happen to the mother alone. The people there, and those waiting to hear, each hold a piece of the story.

### Reflection *(supporting — Q10, your words)*
**Q** > Where does the parent get to *process* it?
**Prose** > Everyone wanted to reflect and process, whether or not the birth was traumatic. The catch is that people who don't already journal often don't know where to start. So the Journal deals gentle prompts to begin the conversation: a letter to your past self, the needs you can't name, the senses you want to keep. Something to do with the feeling while the house is asleep.

### Search *(your addition — Q10)*
**Q** > How do you find one moment in *all* of it?
**Prose** > This one I added myself, for the brain fog. Months of notes, photos, and voice memos stack up fast, and a new parent shouldn't have to navigate the whole app to find one memory. So search lives a swipe off the edge from anywhere: pull it in and filter by emotion, category, or keyword.

### The Book *(kept — Q10, your words)*
**Q** > Where do these memories go if the app *disappears*?
**Prose** > This was a suggestion from the start, and it got real when a parent said she wouldn't trust the app with all of this precious information with no guarantee it wouldn't be lost one day. So the record can leave the app entirely: a printed Birth Story Book or a free PDF, curated from what's already there, and open to loved ones to add to. It also gives the experience some closure.
**Tester** *(kept)* > "It would be tragic to lose these moments if the app went away."

**Notes:** Care Pod opens on its origin (Q10), the emotional center of the study. The cut list makes your prioritization visible without a matrix.

---

## 06 VOICE — `BirthStoryBody.jsx → Voice()`
*Interviewer: "You wrote the UX copy. How did you handle the tone?"*

**The question** *(`<Ask>`)*
> Whose story were we *assuming*?

**The realization** *(`<Prose>` — Q12, your words)*
> From the start I knew births could be traumatic, so I wrote in a careful, trauma-informed tone. When a tester didn't connect with "reclaim," it became clear I was betting too much on the hard parts and not enough on the way a birth brings people together, or on how miraculous it is. The words shouldn't decide the experience for the parent.

**Tester** *(`<TesterNote>` — kept)*
> "Assuming there's a trauma, you shouldn't call it that. I appreciate the acknowledgement, but it feels like an implied negative."

**Before / after #1** *(kept)*
> the draft: "Reclaim your narrative."
> the rewrite: "A space to make sense of it, in your own words."

**Before / after #2** *(Q12's second example — the rewrite is YOURS to write)*
> the draft: "Find strength & support."
> the rewrite: `[LORIN TO WRITE — a feature name that assumes the mother is already strong, not in need of rescue. Q12 says this one "positioned the new mother in a negative light when in fact most are empowered by doing an amazing and hard thing." What would you call it?]`
> *why:* it positioned the new mother negatively, when most are empowered by doing an amazing and hard thing.

**The principle** *(`<Prose>` — Q12 close, your words)*
> So I rewrote toward connection and let the parent bring their own tone. If I kept going, the next pass is the reflection prompts, making sure they reach for joy as readily as they hold space for distress.

**Notes:** This is the section you flagged as empty; Q12 fills it with two real before/afters. I did not invent the second rewrite line. That's the one place I held the "don't write for her" rule.

---

## 07 BRAND — `SecBrand.jsx`
*Interviewer: "Talk me through the visual identity."*

**The question** *(`<Ask>`)*
> What should this feel like at *3am*, and in the hospital light?

**Prose** *(Q14, your words — the gradient metaphor now stated)*
> I wanted the app to feel calm, emotionally intelligent, and approachable, a break from clinical experiences. Myana already used a gradient, so a gradient here felt like a good way to connect the two. I chose a lighter pink and a darker teal to hold a couple of quiet metaphors at once: a gender spectrum, and the emotional range of the day itself. Users said they'd likely use it in the small hours between feedings, so it had to feel welcoming and calm for an exhausted person in the middle of the night.

**Signature note** *(kept)*
> blush → periwinkle → teal · the whole identity in one object

**Notes:** `[LAYOUT, not copy]` your note about a compact right-side view and killing the moodboard whitespace is a build task for the implementation pass.

---

## 08 OUTCOME — `BirthStoryBody.jsx → Outcome()`
*Interviewer: "What happened? How did it land?"*

**Where it landed** *(`<Finding>` — Q15, your words; the overclaim is gone)*
> We presented, and the client had praise and almost no notes. There are no clear signals the app will be built. Myana sponsored the project because it may inform future versions of their own app, and the pitch may have been as much for our learning as for them. But it has offered a great starting point for exploring further.

**Client quote** *(kept — real; now framed as enthusiasm, not a contract)*
> "I wish this could be real right now!"
> — Sarah Burns, MSW, LSW · client

**Notes:** Standing correction #1. "Proposed a design direction," never back-pedaled, per your note-to-self. No metrics: it's a concept.

---

## 09 REFLECTION — `BirthStoryBody.jsx → Close()`
*Interviewer: "What did you learn? What would you do differently?"*

**The question** *(`<Ask kicker="next time">`)*
> What would I ask *differently*?

**What I'd do differently** *(Q3, your words)*
> I'd start from the constraint, not the possibilities. Naming the core need in week one, *less, not more*, would have saved me a build full of tools nobody asked for. And I learned to only put something in a wireframe if it's a question I actually want feedback on.

**The thread** *(NEW — Q16, your words; names the arc the case study just walked)*
> This was one of the first projects I mostly led the visual UX and UI on, and it shaped how I wireframe now. I noticed my pattern: as a big dreamer, I try to do everything at first, and I almost always end up narrowing further and further until I reach the heart of the product. That's the whole arc of this project, too.

**Who I'm becoming** *(NEW — Q5, your words; the concept framing is unmistakable)*
> Birth Story is a concept. Since this course I taught myself to prototype, then prompt engineering, and now I build with AI, including this site. The screens here are example flows; no app is built. But designing it and then learning to build it is the direction I'm heading.

**Notes:** Q1's thread lands here, earned. Q5's "no app is built" keeps the concept framing clean.

---

## Still want your eyes on
- `[OPEN]` **Brief "why I took this on"** — near-verbatim Q4. Right amount, or trim?
- `[LORIN TO WRITE]` **Voice before/after #2** — the rename of "Find strength & support."
- `[OPTIONAL]` **Systemic stats line** in the Brief — keep or cut.
- After you bless the words: implement into `components/Birthstory/*`, run a voice-audit pass on the final copy, then clear the layout backlog (compact Brand, Outcome photo overlap, animation timing) tracked in `PROGRESS.md`.
