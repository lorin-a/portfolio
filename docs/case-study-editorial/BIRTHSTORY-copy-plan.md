# Birth Story — copy build plan, drafts & resume point

**START HERE to continue the copy phase.** Source-of-truth for Lorin's answers + the brief = `BIRTHSTORY-interview.md` (same folder). Live case study = `components/Birthstory/*` (route `/projects/birthstory-care-pod`, dev port 3001).

## Where we are (2026-06-30)
Interview complete (Q1–Q16). Official brief + requirements read off LaCie and distilled into `BIRTHSTORY-interview.md`. **Next step:** build the case-study copy IN LORIN'S VOICE, section by section, into a draft she blesses, then implement into the live components. Lorin gave **permission to copyedit without losing her voice**; her voice reference = the verbatim interview answers.

## ✅ The 4 decisions — RESOLVED 2026-06-30 (in the copy draft)
1. **Kept/cut feature map:** CONFIRMED accurate vs Q10/Q11 + requirements. Search = her addition; Trackers (B) + Birth Plan (C) = deliberate cuts. Surfaced as the "cut list" strategist beat in Features.
2. **Brief tone:** warm/personal LEADS (Q4 — her matriarchal family, her two sisters; this material was MISSING from the study and is the biggest add). Systemic maternal-mortality stats offered as an OPTIONAL toggle in the draft, not baked in.
3. **`MY PART.docx`:** READ. It contains NO Birth Story content — Tab 1 = SomeBuddy, Tab 2 = the Transition Design / Pittsburgh food-systems project (source for star #3). So **Q2 is the authoritative contribution split.** No further sourcing needed.
4. **Olympic-endurance stat:** CUT the number, kept as framing ("as physically demanding as anything the body does"). No unsourced stat.

## 🔒 Standing corrections (must apply when building)
- **Outcome:** DROP "the professors and client intend to build it." Truth (from brief): *client sponsored it; it may inform future Myana iterations; no commitment.* Frame as "proposed a design direction." (Doc note-to-self: "'propose a design direction,' never back-pedal.")
- **Build claim:** "designed the concept; built this case-study site + animated prototypes with AI assistance." NOT "shipped an app." (Q5)
- **Research reframe:** tell it as *"I had the restraint to subtract"*, not *"I invented the insight"* — the brief gave a strong skeleton (Q3 + requirements). Honesty is the stronger story.
- **No em dashes in her voice** (colon/period/comma/parens first). Curly quotes in prose.

## Spine drafts (her words, tightened — VOICE NOT YET LOCKED; she'll react)
- **POV / hero line:** "I ask the right questions and build the environment for real needs to surface. Then I synthesize them into opportunities and craft the answer with the story, the need, and the emotion at the heart of every decision." (short hero variant: "I surface the real need, then carry its story and emotion all the way through to what gets made.")
- **Credit line:** "Researched with Michael Juan. UX/UI, visual identity, flows, and architecture by me. Prototypes and this site built by me, with AI assistance." (app = concept, nothing shipped.)
- **Honest Outcome:** "The client's response was praise and almost no notes. 'I wish this could be real right now.' It isn't greenlit, and the pitch served the studio as much as the client, but it gave the concept a real foundation to build from."

## The copy plan — what goes where & why (HAVE = in interview doc · NEED = ask/source)
- **HERO** — *Job: 5-sec hook + plant the flag.* Title, blur→HMW question, credit line. **HAVE** + spine drafts above. **NEW:** the role/POV line (make "built by me" explicit — currently invisible, biggest under-leveraged asset).
- **01 BRIEF** — *Job: the ask, the real stakes, who she was on the team.* HMW, the gap, the client. **HAVE.** **NEED:** contribution split (Q2 / maybe MY PART.docx); decide on systemic-stats gravity (decision #2). Separate *given* (name/concept/skeleton) from *made*.
- **02 RESEARCH** — *Job: prove the thinker — methodology + the reframe-as-restraint.* Q6 methodology (7 parents: 2 client think-alouds + 3 family + 2 friends + forums), Q7 synthesis (start big → chisel → "no home menu, open into note-taking"), validation quote, "select one," design values. Ground IA with **"Document details should be first" / "Too many menus."**
- **03 ARCHITECTURE** — *Job: systems judgment.* Q8 (kill triage: "too many questions before the experience") → drop them in. Unify-don't-fragment (4 required capture types → one tagged timeline). Real IA diagrams (have).
- **04 ITERATION** — *Job: the work changing + discipline of subtraction.* Q9 three rounds (too many decisions → unified but too many options → core valued features). Tester quotes (have). Restore ONE "still open" admission.
- **05 FEATURES** — *Job: craft + the WHY (Q10) + the build reveal.* Lead deep on **Care Pod (heart — the collective-memory origin story)** + **Documentation (core)**; lighter on Reflection/Search/Book (Q11). Map each to requirement (Notes=1.0 unified · Reflection=2.1+3.2 · Care Pod=opt D+E · Book=opt A · Search=her add · cut B,C). "Rebuilt these in code to show the interaction."
- **06 VOICE** — *Job: the differentiator — trauma-informed language.* Q12: "reclaim" bet too much on challenge → care-centered/neutral; honor both hard AND miraculous/empowering; balance joy + distress; 2nd example = "find strength & support" positioned mother negatively. (Section currently feels empty — this fills it.)
- **07 BRAND** — *Job: identity decisions, compact (right-side view, more info left; kill moodboard whitespace).* Q14 rationale: calm/emotionally-intelligent/non-clinical; Myana gradient → family; **pink→teal = gender spectrum + emotional juxtaposition**; calm at 3am for the exhausted.
- **08 OUTCOME** — *Job: honest win.* Honest-Outcome draft above. Client praise + "wish it were real"; sponsored to maybe inform Myana; no metrics (concept).
- **09 REFLECTION** — *Job: senior close tied to her thread.* Q16: "big dreamer who tries everything first, then narrows to the heart" = the case study's arc. The self-taught build arc (course→prompt-eng→builds w/ AI) as a "who I'm becoming" beat. "What I'd do differently."

## Build order
Hero → Brief → Research → Architecture → Iteration → Features → Voice → Brand → Outcome → Reflection. Draft into `BIRTHSTORY-copy.md`, Lorin blesses, THEN implement into components.

## Re-read the brief if scratchpad is gone
Originals on LaCie: `/Volumes/LaCie/Takeout 2/Drive/IXD_ Myana Birth Story.docx` + `Birth Story App Requirements (copy).xlsx`. Convert: `textutil -convert txt "<docx>"`; xlsx via python `zipfile` (sharedStrings + sheet XML). Key content already distilled in `BIRTHSTORY-interview.md`.
