/**
 * BirthStory — folder sheet copy (FS299), raised from the built case study
 * (FS301).
 *
 * SOURCES, so every line has a receipt:
 *   · "live" = the built case study, components/Birthstory/* at
 *     /projects/birthstory-care-pod (BirthStoryBody, productFeatures,
 *     IaAria, SecIteration, SecBrand): the copy she blessed after
 *     2026-06-30, rewritten in her autobiographical voice.
 *   · "v3"   = docs/case-study-editorial/BIRTHSTORY-copy.md, the copy draft
 *     the live page grew from (its verbatim tester quotes and the
 *     kept/added/cut map).
 *   · "v2"   = components/Birthstory/v2 (design principles, three moments).
 *   · "Qn"   = docs/case-study-editorial/BIRTHSTORY-interview.md, her
 *     verbatim interview answers.
 *   · "sq"   = her old Squarespace page.
 *
 * Copy is hers, selected and trimmed under the standing copy rule (her
 * draft is the source; Claude refines it). Lines marked PROVISIONAL are
 * assembled for this sheet and are hers to rewrite.
 *
 * THE SHAPE (FS310–FS313): the cover plays the case study's hero
 * animation; the ecosystem (four key screens, annotated) gives the overview; then
 * Part one, The Product (each feature opens on its working prototype,
 * FS301) and Part two, How It Came Together (Research, Architecture with
 * her native IA diagrams, Iteration, UX Writing, Visual Identity). No
 * separate behind-the-scenes gallery: the studio photos live in the
 * sections they belong to.
 *
 * OPEN, hers to settle (also in STATUS):
 *   · the client is named four ways across her sources; this sheet uses the
 *     live page's naming (Myana, co-developed by Pitt researchers) and
 *     credits Sarah Burns and Tamar Krishnamurti by name (sq);
 *   · the method count: Q6 and v3 say 7 parents (2 think-alouds over Zoom +
 *     3 family + 2 friends); the live Overview says 5 interviews + 3
 *     think-alouds. The sheet follows Q6.
 */

export const birthstory = {
  /* Q15 + live Outcome, refined; the quote is the client's (live), set in
     italics (FS308). The close is her FS309 direction, “student project
     for real client concept pitch only at this stage”, made a sentence.
     No build claim (standing correction, BIRTHSTORY-copy-plan.md). */
  outcome:
    'The client had praise and almost no notes: *“I wish this could be real right now!”* Birth Story was a student project pitched to a real client, and at this stage it is a concept only.',

  /* THE COVER HERO (FS310): the case study's hero animation (the fan of
     screens, the Care Pod circle and the turning ring of dots) takes the
     photo pile's place. The pile's photographs live in the galleries. */
  hero: 'bs-hero',

  meta: [
    /* live Overview: Context */
    ['Context', '6-week graduate studio at Carnegie Mellon, Spring 2025, taught by the founders of Dezudio, Myana’s design partner'],
    /* content/projects/birthstory.md + sq, her line */
    ['Role', ['UX/UI Design, UX Research,', 'Copywriting, Brand Identity']],
    /* Q2 (Michael Juan) + live Overview: Client */
    ['Collaborators', ['Michael Juan, design partner;', 'Myana, a maternal-health platform co-developed by researchers at the University of Pittsburgh']],
    /* live colophon */
    ['Tools Used', 'Figma, Claude Code'],
    /* sq phases (one week each: Research I, Research II, Ideation,
       Interviews, Iteration, Presentation), grouped in twos to match the
       live page's week tags. The season (in Context) is from her deck's
       footer, “CMU IXD Studio Spring 2025”. */
    ['Timeline', ['Research: Weeks 1⁠–⁠2', 'Ideation and Interviews: Weeks 3⁠–⁠4', 'Iteration: Weeks 5⁠–⁠6']],
  ],

  frame: {
    /* sq Design Challenge + live Brief, verbatim, joined (the long form). */
    why: 'Birthing parents lack systems of support before, during, and after the experience of giving birth, which is often overshadowed by the needs of a newborn. The brief: pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
    /* Q6 method in a line, then her finding (live 01 statement, verbatim). */
    research: 'We interviewed seven parents and tested our wireframes in think-aloud walkthroughs. If we did not learn about the importance of the collective experience of the birth as well as the individual, we may have missed a crucial aspect of the ecosystem.',
    /* PROVISIONAL short versions for the three-column row (FS33's rule).
       why: v3's Overview sentence (“the part of the perinatal experience
       that goes unsupported once a newborn arrives”) + the live Brief.
       research: v3 02's finding (“They wanted recognition for doing
       something difficult”) + her live finding, verbatim. */
    short: {
      /* FS306, her wording: “helps parents with documentation, reflection,
         and sense-making”. */
      why: 'Giving birth is the part of the perinatal experience that goes unsupported once a newborn arrives. Birth Story is a concept for Myana’s companion app that helps parents with documentation, reflection, and sense-making.',
      /* FS307: what parents said they wanted, directly. Her list: “easy
         simple not overwhelming, validating language, inclusion of loved
         ones as well as private reflection, secure output”, made a
         sentence. Receipts: Q3 (little to no capacity), Q12 + the sister
         synthesis (validation; “reclaim” assumed trauma), Q4 + Q10 (the
         collective memory; journaling private), Q10 (the Book: “would not
         trust the app … no guarantee that the info would not be lost”). */
      research: 'Parents wanted it easy and never overwhelming, with language that validates instead of assuming, room for loved ones alongside private reflection, and a record secure enough to outlast the app.',
    },
  },

  /* THE ECOSYSTEM (FS311): the overview before the work. FS313: four key
     screens side by side with annotations (who each serves and when, from
     her thesis, 2026-08-03), drawn by the exhibit
     components/ProjectSheet/exhibits/BirthStoryEcosystem.jsx. The intro's
     first sentence is her thesis, trimmed; the second is PROVISIONAL,
     assembled from the same note (who each feature serves, and when). */
  system: {
    kicker: 'The Ecosystem',
    label: 'Individual and Shared',
    exhibit: 'bs-ecosystem',
    wide: true,  /* the words above, the four screens across the whole sheet */
    intro: 'Birth is both an individual and a shared experience, and the two are intertwined when it comes to processing, documenting, and reflecting on it. So the app meets different people at different moments: loved ones keep track during the birth, the parent reflects in private after it, and a book they curate carries it forward.',
  },

  /* THE FEATURES, in her order of weight (Q11: notes are the core, Care Pod
     the heart), then the two identity decisions. Bodies are her copy from
     the live case study; `notes` are the live page's paired annotations,
     verbatim. `mine` lines are PROVISIONAL: Q2 gives only the
     project-level split (“I led UX/UI, visual identity, user flows/
     architecture, mockup designs”; research shared with Michael Juan). */
  components: [
    {
      key: 'documentation',
      /* live ProductAct opener: statement + lede + note, trimmed */
      chapter: { kicker: 'Part one', title: 'The Product', line: 'Birth is unpredictable, so the app is deliberately simple. It opens into documenting and reaches everything else in a tap or two. Each feature opens on a working prototype I rebuilt from the wireframes.' },
      name: 'Documentation',
      /* live prose + v3's closing sentence */
      body: 'Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add. A note from the delivery room, a prescription, and a voice memo land on the same timeline, the moment they happen.',
      notes: [
        { label: 'One timeline', text: 'Medical, contextual, narrative, and feelings in one place, because a birth isn’t lived in separate files.' },
        { label: 'Calm by default', text: 'Entries stay closed until you open one, so a tired parent meets a surface, not a wall of clinical detail.' },
      ],
      mine: 'UX/UI, mockups, and the flow that opens straight into note-taking, a decision from the think-aloud tests co-facilitated with Michael Juan.',
      media: {
        stills: [
          { type: 'prototype', name: 'doc', alt: 'The working prototype: a medical entry opens on the timeline, an ibuprofen prescription with its pickup note and a voice memo.' },
          { key: 'bs-notes', alt: 'Note taking: suggested prompts, a button for a new entry, and a timeline of collapsible cards.' },
          { key: 'bs-final-timeline', alt: 'The home timeline fills itself from entries; each entry opens as a full card for content and tags.' },
          { key: 'bs-onboard-signup', alt: 'Onboarding: the splash, Get Started, and sign-up screens.' },
        ],
      },
    },
    {
      key: 'care-pod',
      name: 'Care Pod',
      body: 'The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod: one support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story.',
      notes: [
        /* live 01 proof line, verbatim */
        { label: 'From optional to a tab', text: 'The brief listed sharing and partner participation as two of five optional features. Care Pod shipped as one of five tabs.' },
        { label: 'You don’t carry it', text: 'One person you designate sends the updates, photos, and voice memos, not the laboring parent.' },
        { label: 'Nothing is lost', text: 'Loved ones reply, and it all saves into the story: the detail you’d have forgotten, kept.' },
      ],
      mine: 'UX/UI and mockups, and the rename from “Find strength & support,” which positioned the new mother in a negative light, to Care Pod.',
      media: {
        stills: [
          { type: 'prototype', name: 'carepod', alt: 'The working prototype: the Care Pod circle loads, Send Update opens the compose sheet, and replies land on the live message board.' },
          { key: 'bs-carepod-updates', alt: 'Care Pod: a circle of chosen people receives live updates and replies on a message board.' },
          { key: 'bs-carepod-stories', alt: 'A designated loved one sends updates; Care Pod members send their own stories of waiting for the news.' },
          { key: 'bs-mock-carepod', alt: 'The Care Pod circle, the live message board, and a story with photos, on three phones.' },
        ],
      },
    },
    {
      key: 'reflection',
      name: 'Reflection',
      body: 'Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.',
      notes: [
        { label: 'No blank page', text: 'The deck deals a prompt, because the parents who don’t already journal don’t know where to start.' },
        { label: 'Tag how it felt', text: 'So a memory can be found later by its emotion, not only its date.' },
      ],
      mine: 'UX/UI, mockups, and the reflection prompts, rewritten to be trauma-informed without assuming trauma.',
      media: {
        stills: [
          { type: 'prototype', name: 'journal', alt: 'The working prototype: the prompt deck shuffles and settles on “Letter to Past Self,” then the reflection writes itself in and the mood tags land.' },
          { key: 'bs-journal', alt: 'Journaling: shuffle through prompts, then tag the entry and add media.' },
          { key: 'bs-final-journal', alt: 'Journal cards deal guided prompts; a new journal entry mirrors the notes entry card.' },
        ],
      },
    },
    {
      key: 'search',
      name: 'Search',
      body: 'This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.',
      notes: [
        { label: 'A swipe from anywhere', text: 'Reachable over any screen, so brain fog never means digging through the app for one memory.' },
        { label: 'Filter by feeling', text: 'A parent recalls a memory by how it felt, not when it was logged.' },
      ],
      /* live: “Not required · my addition, for cognitive load” */
      mine: 'The feature itself, added beyond the brief for brain fog and overwhelm, plus its UX/UI and mockups.',
      media: {
        stills: [
          { type: 'prototype', name: 'search', alt: 'The working prototype: the search panel slides in over the home screen, with filters by emotion and category.' },
          { key: 'bs-onboard-search', alt: 'Search slides in from any screen and finds entries by tag.' },
          { key: 'bs-final-search', alt: 'Easy search, tagging by event and emotion, and search across media.' },
        ],
      },
    },
    {
      key: 'book',
      name: 'The Birth Story Book',
      /* live prose + Q10's “free PDF or a real book to order” */
      body: 'We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. It’s available as a free PDF or a real book to order.',
      notes: [
        /* v3: verbatim tester quote */
        { label: 'A parent said', text: '“It would be tragic to lose these moments if the app went away.”' },
        { label: 'Curated together', text: 'Built from what’s already there, open to the people who were part of it.' },
      ],
      mine: 'UX/UI and mockups for ordering, downloading, and curating the book.',
      media: {
        stills: [
          { type: 'prototype', name: 'book', alt: 'Order a printed keepsake or download a free PDF, and drag entries to curate the story together.' },
          { key: 'bs-book', alt: 'Export the story as a free PDF or a printed keepsake, and curate the entries and media that go in it.' },
          { key: 'bs-final-book', alt: 'Download or order the book, and drag entries to curate the story with collaborators.' },
        ],
      },
    },
    {
      key: 'research',
      /* PROVISIONAL chapter line */
      chapter: { kicker: 'Part two', title: 'How It Came Together', line: 'Six weeks of research, three rounds of wireframes, and the words and look that hold it together.' },
      name: 'Research',
      /* Q6, refined */
      body: 'We interviewed seven parents: two think-aloud walkthroughs of our wireframes over Zoom, with parents our client connected us with, and video interviews I ran with three family members and two friends. I also read birth forums and blogs.',
      notes: [
        /* live, verbatim */
        { label: 'One of my sisters said', text: '“None of our births went according to plan and they were traumatizing, and it doesn’t get discussed enough.”' },
        { label: 'Why it was personal', text: 'I come from a matriarchal family that has a history of complicated births. While interviewing my family, I understood for the first time how traumatic their experiences were.' },
        { label: 'My thinking', text: 'Rooted in those experiences, I took a trauma-informed approach, and left medical documentation optional so the design could center on events on a timeline.' },
      ],
      /* Q2 + Q6, PROVISIONAL */
      mine: 'Interviews and synthesis co-facilitated with Michael Juan, and the five family and friend interviews on my own.',
      media: {
        stills: [
          { key: 'bs-tap-figma', alt: 'A think-aloud walkthrough of the reflection wireframe over Zoom.' },
          { key: 'bs-tap-zoom', alt: 'A think-aloud session, the parent blurred for privacy.' },
          { key: 'bs-process', alt: 'The ask, the requirements, and our approach.' },
          { key: 'bs-v1-approach', alt: 'What the app had to do, and how it had to feel.' },
          { key: 'bs-v2-feedback', alt: 'What parents told us about Version 2, in four themes.' },
        ],
      },
    },
    {
      key: 'architecture',
      /* the live 02 aria (“the first answer · what it actually did · what
         shipped”), told in one paragraph; notes are v2's principles */
      name: 'Architecture',
      body: 'Our first attempt met the parent in the moment: an opening menu asked four questions about their phase and place, to pick the right feature. It did the opposite of what we intended. Meant to lower cognitive load, it gate-kept features, a form at the front desk while you’re still catching your breath. The final app asks nothing first and opens straight into notes on a timeline.',
      notes: [
        { label: 'Does not disorient', text: 'A parent recovering on little sleep can’t afford a maze.' },
        { label: 'Integrate facts and feelings', text: 'The brief split capture four ways, but a birth isn’t lived in parts, so one timeline holds them together.' },
      ],
      /* Q2: “I led … user flows/architecture” */
      mine: 'The user flows and information architecture, from research co-run with Michael Juan.',
      media: {
        stills: [
          { type: 'prototype', name: 'ia-v1', fallback: 'bs-v1-ia', alt: 'The first answer: a branching questionnaire, with four questions before the first entry.' },
          { type: 'prototype', name: 'ia-final', fallback: 'bs-ia-final', alt: 'What shipped: five tabs, one add button at the center, and nothing to answer first.' },
          { key: 'bs-onboard-ui', alt: 'Onboarding: a minimal interface walks the parent through the app, and the timeline builds itself from tags.' },
        ],
      },
    },
    {
      key: 'iteration',
      /* live SecIteration, condensed; tester quotes verbatim (v3) */
      name: 'Iteration',
      body: 'We took three versions through critique, a client check-in, and think-aloud testing with parents, and changed direction based on what we heard. Each round made the app simpler.',
      notes: [
        { label: 'Version 1 · Week 3', text: 'A tool for every situation, sub-menus inside menus. *“Onboarding is nice, but there are too many buttons and options.”*' },
        { label: 'Version 2 · Week 4', text: 'One filterable notes section and two actions, clearer but still too many options, and the copy drew a flag: *“Why ‘reclaim’? I’m not sure what it even means.”*' },
        { label: 'Version 3 · Week 5', text: 'Only the features parents came back to, with room to go deeper.' },
      ],
      /* Q3, PROVISIONAL */
      mine: 'Three rounds of wireframes, and the switch from image-heavy screens to color-block wireframes so feedback went to the flow.',
      media: {
        stills: [
          { key: 'bs-v1-reflect', alt: 'Version 1, week 3: a tool for every situation.' },
          { key: 'bs-v1-document', alt: 'Version 1 document: a step-by-step recall of who, what, when, and where.' },
          { key: 'bs-v1-addons', alt: 'Version 1 add-ons: labor mode, a checklist, a symptom tracker. Both trackers were cut.' },
          { key: 'bs-v2-timeline', alt: 'Version 2, week 4: one filterable notes section, simplified to color blocks.' },
          { key: 'bs-mock-timeline', alt: 'Version 3, week 5: only the features parents came back to.' },
          { key: 'bs-crit-wall', alt: 'Every screen printed and marked up, gradient and color block side by side.' },
          { key: 'bs-crit-zoom', alt: 'The client joins a studio critique over video.' },
          { key: 'bs-final-review', alt: 'The team and our client, Sarah Burns, at the final review.' },
        ],
      },
    },
    {
      key: 'ux-writing',
      name: 'UX Writing',
      /* live 04 statement + prose, condensed (Q12) */
      body: 'The copy is trauma-informed without assuming trauma. Because births can be traumatic, I wrote the first copy in a careful tone, and a parent I interviewed showed me I had gone too far: she didn’t connect with “reclaim.” I rewrote toward connection and left room for people to bring their own tone.',
      notes: [
        /* live TesterNote, verbatim */
        { label: 'A parent said', text: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.”' },
        /* live revisions panel */
        { label: 'Revised', text: '“Reclaim your narrative” became “A space to make sense of it, in your own words,” and “Find strength & support” became Care Pod.' },
      ],
      mine: 'The UX writing throughout, revised through testing.',
      media: {
        stills: [
          { key: 'bs-v2-onboarding', alt: 'Version 2 onboarding with the feedback: reconsider “reclaim,” compassionate copy may imply a negative experience.' },
          { key: 'bs-v1-onboarding', alt: 'Version 1 onboarding: compassionate copy and a menu of choices.' },
        ],
      },
    },
    {
      key: 'identity',
      name: 'Visual Identity',
      /* live 04 Visual Design: statement + prose (Q14) */
      body: 'Calm, emotionally intelligent, and deliberately non-clinical. Myana already used a gradient, so I built one here to tie the two together. Parents told me they’d mostly reach for this in the small hours between feedings, so everything had to read gently to someone exhausted in the middle of the night.',
      notes: [
        /* live Insight, verbatim */
        { label: 'My thinking', text: 'I chose a lighter pink into a darker teal because it let me hold two things at once: a gender spectrum, and the emotional range of the day itself.' },
      ],
      mine: 'The visual identity: the gradient, palette, type, and components.',
      media: {
        stills: [
          { key: 'bs-brand', alt: 'Brand colors from deep teal to blush and lavender, with Terfens for titles and Gotham for body.' },
          { key: 'bs-moodboard', alt: 'The moodboard: app references, textures, and soft gradients.' },
          { key: 'bs-buttons', alt: 'Button states, unselected and selected, across the palette.' },
          { key: 'bs-collage', alt: 'The final screens arranged around the gradient splash screen.' },
        ],
      },
    },
  ],

  /* REFLECTION: PROVISIONAL throughout. Every bullet is drawn from her
     words (source after each); the from-to shifts are Claude's, hers to
     rename. */
  reflection: [
    {
      id: 'sense', verb: 'Sense', title: 'What I learned',
      shift: ['Everything', 'The Heart'],  /* Q16 */
      list: [
        /* sq, verbatim */
        { head: 'Start Simple', text: 'If I could do this project again, I’d begin by simplifying. Identifying the core need early would have helped me stay focused.' },
        /* v2 “three moments” + her sister synthesis (select-one first,
           free-form later, the book in the end) */
        { head: 'Meet Three Moments', text: 'Capacity rises over time: select-one answers early in the fog, free-form journaling once it lifts, and a keepsake book in the end.' },
        /* the thesis, 2026-08-03 */
        { head: 'Birth Is Shared', text: 'Birth is both an individual and a shared experience, and the two are intertwined in how it is documented and remembered.' },
      ],
    },
    {
      id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
      shift: ['Image-Heavy', 'Flow-First'],  /* Q3 */
      list: [
        /* Q3 + sq */
        { head: 'Show Less', text: 'Only show what you want feedback on. Turning an image-heavy prototype into color blocks and simple icons pointed the feedback at the flow.' },
        /* v2 principle, verbatim */
        { head: 'Don’t Assume', text: 'My first copy assumed trauma; a parent showed me the words shouldn’t choose the tone.' },
        /* Q5 */
        { head: 'Design, Then Build', text: 'Since this course I’ve taught myself to build with AI, and I rebuilt these wireframes as the working prototypes playing above.' },
      ],
    },
    {
      id: 'shape', verb: 'Shape', title: 'What’s next',
      shift: ['Concept', 'Tested'],
      list: [
        /* live “what I couldn't test”, verbatim */
        { head: 'Prove the Return', text: 'A six-week studio can’t show whether parents come back weeks later, once the fog has lifted. That return is the whole promise of the product.' },
        /* Q12 */
        { head: 'Balance Prompts', text: 'The reflection questions should balance recalling joy with nurturing moments of distress.' },
        /* the thesis: Care Pod during birth, easy updates in the newborn phase */
        { head: 'Extend the Pod', text: 'Care Pod could carry past the birth, sending easy updates through the newborn phase.' },
      ],
    },
  ],

  /* BEHIND THE SCENES: none for BirthStory (FS311). Research and the
     three rounds are sections of their own, and the studio photographs
     (the crit wall, the client's critique, the final review) live in
     them, so a lone gallery would only repeat them. */

  /* CREDITS: one column each. Names from sq; consent from live. */
  credits: [
    ['Design Team', 'Lorin Anderberg, Michael Juan'],
    ['Client', 'Sarah Burns, MSW, LSW, and Tamar Krishnamurti, PhD, for Myana'],
    ['Studio', 'CMU MA in Design, Studio II: Introduction to IXD, taught by the founders of Dezudio'],
    ['Consent', 'Participant quotes appear with their consent; names are withheld.'],
  ],
}

export default birthstory
