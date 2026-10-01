# Case-study source packs

Collected 2026-10-01 for the project-sheet build modeled on the Groundswell sheet (`content/sheets/groundswell.js`). Collection only: nothing here is new copy, and her words are quoted verbatim. Each project folder holds `inventory.md` (start there), plus the files below.

| Project | medium.md | squarespace.md | answers.md | other |
|---|---|---|---|---|
| BirthStory | full article | full page | Q1-Q16 + 3 additions | |
| SomeBuddy | full article | full page | none found | |
| Transition Design | 5 articles | full page | none found | |
| Bridging the G.A.P. | full article | full page | none found | |
| Whelm | no article exists | none (not on old site) | none found | other-copy.md |

## Coverage against the Groundswell sheet

HAVE = her actual words or the actual assets exist; PART = some of it; MISS = nothing found. Groups roll up the detailed rows below (all HAVE = HAVE, all MISS = MISS, else PART).

| Project | Cover | Cover facts | Tagline | Outcome | Frame | Components | Reflection | Process | Credits | Synthesis | HM answers |
|---|---|---|---|---|---|---|---|---|---|---|---|
| BirthStory | HAVE | HAVE | HAVE | HAVE | HAVE | PART | PART | HAVE | PART | HAVE | PART |
| SomeBuddy | HAVE | HAVE | HAVE | HAVE | PART | PART | PART | PART | PART | PART | MISS |
| Transition Design | HAVE | HAVE | HAVE | HAVE | PART | PART | MISS | HAVE | PART | HAVE | MISS |
| Bridging the G.A.P. | HAVE | HAVE | HAVE | HAVE | HAVE | PART | PART | HAVE | PART | PART | MISS |
| Whelm | HAVE | PART | HAVE | MISS | PART | PART | PART | PART | PART | HAVE | MISS |

### Detail (21 sections)

| Section | BirthStory | SomeBuddy | Transition Design | Bridging the G.A.P. | Whelm |
|---|---|---|---|---|---|
| Cover media / prints | HAVE | HAVE | HAVE | HAVE | HAVE |
| Cover facts: Context | HAVE | HAVE | HAVE | HAVE | PART |
| Cover facts: Role / titles | HAVE | HAVE | HAVE | HAVE | MISS |
| Cover facts: Team / collaborators / client | HAVE | HAVE | HAVE | HAVE | MISS |
| Cover facts: Tools | HAVE | HAVE | HAVE | HAVE | MISS |
| Cover facts: Timeline | HAVE | HAVE | HAVE | HAVE | MISS |
| Tagline + one-line description | HAVE | HAVE | HAVE | HAVE | HAVE |
| Outcome line (masthead punchline) | HAVE | HAVE | HAVE | HAVE | MISS |
| Frame: project (why it exists) | HAVE | HAVE | HAVE | HAVE | HAVE |
| Frame: what the research told us | HAVE | HAVE | HAVE | HAVE | HAVE |
| Frame: my role in detail | HAVE | MISS | PART | HAVE | MISS |
| Components: name + body | HAVE | HAVE | HAVE | HAVE | HAVE |
| Components: “My Contribution” per component | PART | MISS | MISS | PART | MISS |
| Components: media per component | HAVE | HAVE | HAVE | HAVE | HAVE |
| Reflection: Sense (what I learned) | HAVE | MISS | MISS | HAVE | MISS |
| Reflection: Weave (what I’ll carry forward) | PART | MISS | MISS | PART | MISS |
| Reflection: Shape (what’s next) | PART | HAVE | MISS | PART | PART |
| Process galleries (behind the scenes) | HAVE | PART | HAVE | HAVE | PART |
| Acknowledgements / credits / funding | PART | PART | PART | PART | PART |
| Synthesis exhibit (maps / diagrams) | HAVE | PART | HAVE | PART | HAVE |
| Hiring-manager answers | PART | MISS | MISS | MISS | MISS |

Evidence and file/line citations for every cell are in each project's `inventory.md`, section 4.

## Fetch status

- All four Medium URLs from `app/(portfolio)/page.js` were fetched successfully on 2026-10-01 with a real Chrome browser (playwright-core, `channel: 'chrome'`). `curl` and WebFetch both failed on all four with HTTP 403 (Cloudflare "Attention Required"); no mirror (scribe.rip, freedium) was used for the saved text.
- Fetch failures: none that remain. The first-attempt failures were curl and WebFetch (all four URLs).
- Caveat: Medium interface chrome was stripped ("Listen", "Share", and the mid-article "Get Lorin Anderberg’s stories in your inbox" sign-up block). Images have no alt text and few captions; src URLs are listed at the bottom of each `medium.md`.
- Transition Design: the homepage URL (`https://medium.com/transition-design-seminar-spring-25-carnegie`) is the publication home, which shows no stories when rendered. The five articles were found through the publication RSS feed and fetched individually.

## Standing flags for the build session

- Dead homepage config: `lib/homeProjects.js` is imported by nothing and carries stale taglines (SomeBuddy as "A therapy companion app").
- Duplicated or conflicting facts across sources: BTG duration (4 vs 5 weeks), Transition Design timeline (15 weeks / 3 weeks / 2.5 weeks), BirthStory client (four versions), BirthStory outcome overclaim still in `content/projects/birthstory.md:58`, Whelm tagline (three versions), SomeBuddy "client".
- `MY PART.docx` (SomeBuddy and Transition Design contribution notes, per `BIRTHSTORY-copy-plan.md:11`) is not on this machine.
- Whelm: the case study's The Experience, What's Next, six modality descriptions, and disclaimer are Claude-written placeholders, not her words.
