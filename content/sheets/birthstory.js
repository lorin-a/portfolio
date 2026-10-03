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
 * THE SHAPE (FS310–FS314): the cover plays the case study's hero
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
     screens side by side, annotated (her “exactly right”), drawn by
     components/ProjectSheet/SheetScreens.jsx. Who each serves and when,
     and each line, from her thesis (BIRTHSTORY-interview.md, 2026-08-03),
     trimmed: “The documentation is a great tool for a partner or loved one
     to keep track of events and details leading up to, during, and just
     after the birth … the care pod a central feature DURING birth and
     perhaps for sending easy updates in the newborn phase … The reflection
     questions are useful AFTER the birth and center on the birth parent's
     experience in a private safe space … the ultimate outcome is a book
     they can curate to mark this moment and what they choose to carry
     forward.” Search is left out: a utility, and her least favorite (Q11).
     The intro's first sentence is her thesis, trimmed; the second is
     PROVISIONAL, assembled from the same note. */
  system: {
    kicker: 'The Ecosystem',
    label: 'Individual and Shared',
    wide: true,  /* the words above, the four screens across the whole sheet */
    /* FS315: the ecosystem and product copy, combined. FS316: the product
       sentence made explicit from Q7 (“have the app open into … note
       taking, with an onboarding flow that showed the other optional
       features that are also easily accessible via the nav bar at all
       times”); the prototype line removed. */
    intro: 'Birth is both an individual and a shared experience, and the two are intertwined when it comes to processing, documenting, and reflecting on it. So the app meets different people at different moments: loved ones keep track during the birth, the parent reflects in private after it, and a book they curate carries it forward. Because birth is unpredictable, the app is deliberately simple: it opens straight into note-taking, and the other features are always in the navigation bar.',
    /* FS321: her own annotations, verbatim from her deck slides (bs-9,
       bs-45, bs-43/44, bs-47; CMU IXD Studio Spring 2025), not new copy. */
    screens: [
      { name: 'Home Timeline', text: 'Home page is the collective timeline that is auto populated by entries.',
        src: '/images/birthstory/bs-doc-medical.png', alt: 'The notes timeline with a medical entry opened: an ibuprofen prescription and a voice memo.' },
      { name: 'Care Pod Updates', text: 'Easy messaging with pre-selected care pod members for live labor communication.',
        src: '/images/birthstory/bs-carepod.png', alt: 'The Care Pod: loved ones in a circle around the parent, with a Send Update button.' },
      { name: 'Journal Prompts', text: 'Shuffle through thoughtful journal prompts.',
        src: '/images/birthstory/bs-reflect-card.png', alt: 'A reflection prompt card dealt in the journal, above a new entry.' },
      { name: 'Export Your Story', text: 'Download and share a free PDF or order a physical booklet as a keepsake.',
        src: '/images/birthstory/bs-book-order.png', alt: 'The Birth Story Book: order a printed keepsake or download a free PDF.' },
    ],
  },

  /* THE SECTIONS (FS314): every one shows its real artifact, annotated,
     where the words used to sit in the rail beside a deck slide.

     Part one, the features: each prototype large on the gradient band
     with its two annotations either side (`media.annotated`, rendered by
     SheetAnnotated). Bodies are her copy from the live case study; the
     annotations are the live page's paired notes, verbatim.

     Part two, how it came together: Research (her sister's words and what
     parents asked for), Architecture (4 → 0 in one view), Iteration (one
     screen per version), UX Writing (struck and rewritten), Visual
     Identity (the system drawn live).

     `mine` lines are PROVISIONAL: Q2 gives only the project-level split
     (“I led UX/UI, visual identity, user flows/architecture, mockup
     designs”; research shared with Michael Juan). */
  components: [
    {
      key: 'documentation',
      name: 'Documentation',
      /* live prose + v3's closing sentence */
      body: 'Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add. A note from the delivery room, a prescription, and a voice memo land on the same timeline, the moment they happen.',
      mine: 'UX/UI, mockups, and the flow that opens straight into note-taking, a decision from the think-aloud tests co-facilitated with Michael Juan.',
      media: {
        annotated: {
          prototype: 'doc',
          alt: 'The working prototype: a medical entry opens on the timeline, an ibuprofen prescription with its pickup note and a voice memo.',
          /* FS321: her deck annotations, verbatim (bs-43 Note Taking) */
          left: [
            { label: 'Home', text: 'Suggested prompts for ease of use + toggle menu between Notes and Journal.' },
            { label: 'New Entry', text: 'Button for easy access to pop-up window.' },
          ],
          right: [{ label: 'Timeline', text: 'Collapsible cards self organize + can be edited as needed.' }],
        },
      },
    },
    {
      key: 'care-pod',
      name: 'Care Pod',
      body: 'The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod.',
      notes: [
        /* live 01 proof line, verbatim */
        { label: 'From optional to a tab', text: 'The brief listed sharing and partner participation as two of five optional features. Care Pod shipped as one of five tabs.' },
      ],
      mine: 'UX/UI and mockups, and the rename from “Find strength & support,” which positioned the new mother in a negative light, to Care Pod.',
      media: {
        annotated: {
          prototype: 'carepod',
          alt: 'The working prototype: the Care Pod circle loads, Send Update opens the compose sheet, and replies land on the live message board.',
          /* FS321: her deck annotations, verbatim (bs-45, bs-46) */
          left: [
            { label: 'Updates', text: 'Easy messaging with pre-selected care pod members for live labor communication.' },
            { label: 'Pod Updates', text: 'Designate a loved one to send updates on your behalf with easy multimedia UI.' },
          ],
          right: [
            { label: 'Message Board', text: 'Receive real time support messages from Care Pod members, allow others to communicate on your behalf.' },
            { label: 'Care Pod Stories', text: 'Invite Care Pod members to send their own updates of their experience waiting for you to give birth + add these to the final book for a holistic narrative.' },
          ],
        },
      },
    },
    {
      key: 'reflection',
      name: 'Reflection',
      body: 'Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.',
      mine: 'UX/UI, mockups, and the reflection prompts, rewritten to be trauma-informed without assuming trauma.',
      media: {
        annotated: {
          prototype: 'journal',
          alt: 'The working prototype: the prompt deck shuffles and settles on “Letter to Past Self,” then the reflection writes itself in and the mood tags land.',
          /* FS321: her deck annotations, verbatim (bs-44 Journaling) */
          left: [{ label: 'Prompts', text: 'Shuffle through thoughtful journal prompts.' }],
          right: [{ label: 'Tags', text: 'Option to tag entries and add media.' }],
        },
      },
    },
    {
      key: 'search',
      name: 'Search',
      body: 'This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.',
      /* live: “Not required · my addition, for cognitive load” */
      mine: 'The feature itself, added beyond the brief for brain fog and overwhelm, plus its UX/UI and mockups.',
      media: {
        annotated: {
          prototype: 'search',
          alt: 'The working prototype: the search panel slides in over the home screen, with filters by emotion and category.',
          /* FS321: her deck annotations, verbatim (bs-42 Onboarding) */
          left: [{ label: 'Discoverable', text: 'Swipe or tap to view search window.' }],
          right: [{ label: 'Search', text: 'Search via tags.' }],
        },
      },
    },
    {
      key: 'book',
      name: 'The Birth Story Book',
      /* live prose + Q10's “free PDF or a real book to order” */
      body: 'We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. It’s available as a free PDF or a real book to order.',
      mine: 'UX/UI and mockups for ordering, downloading, and curating the book.',
      media: {
        annotated: {
          prototype: 'book',
          alt: 'Order a printed keepsake or download a free PDF, and drag entries to curate the story together.',
          /* v3: verbatim tester quote */
          /* FS321: her deck annotations, verbatim (bs-47 Birth Story Book) */
          left: [{ label: 'Export Your Story', text: 'Download and share a free PDF or order a physical booklet as a keepsake.' }],
          right: [{ label: 'Curate Your Story', text: 'Easily organize entries and media for your book.' }],
        },
      },
    },
    {
      key: 'research',
      /* FS317: the chapter says plainly what it is and maps its five
         steps. Weeks from the live case study's section tags; each
         outcome is that step's takeaway, shortened. */
      chapter: {
        kicker: 'Six weeks · Spring 2025',
        title: 'The Process',
        line: 'Five steps, from the first interviews to the final screens.',
        steps: [
          { key: 'research', when: 'Weeks 1–2', name: 'Research', outcome: 'Seven parent interviews and two think-aloud tests.' },
          { key: 'architecture', when: 'Week 3', name: 'Architecture', outcome: 'Removed the home menu and the intake questions.' },
          { key: 'iteration', when: 'Weeks 3–5', name: 'Iteration', outcome: 'Three wireframe rounds, each with fewer options.' },
          { key: 'ux-writing', when: 'Week 5', name: 'UX Writing', outcome: 'Rewrote copy that assumed a traumatic birth.' },
          { key: 'identity', when: 'Week 5', name: 'Visual Identity', outcome: 'A gradient, palette, and type paired with Myana.' },
        ],
      },
      step: 'Step 1 · Weeks 1–2',
      /* v3 02 lead, verbatim */
      takeaway: 'Seven parent interviews reframed the project from comprehensive logging to deliberate simplicity.',
      name: 'Research',
      /* Q6, refined */
      body: 'We interviewed seven parents: two think-aloud walkthroughs of our wireframes over Zoom, with parents our client connected us with, and video interviews I ran with three family members and two friends. I also read birth forums and blogs.',
      notes: [
        /* live, verbatim */
        { label: 'Why it was personal', text: 'I come from a matriarchal family that has a history of complicated births. While interviewing my family, I understood for the first time how traumatic their experiences were.' },
      ],
      /* Q2 + Q6, PROVISIONAL */
      mine: 'Interviews and synthesis co-facilitated with Michael Juan, and the five family and friend interviews on my own.',
      /* FS319: half and half; the voice and the asks join the copy
         (live, verbatim), the think-aloud session whole on the right */
      layout: 'half',
      pull: { quote: '“None of our births went according to plan and they were traumatizing, and it doesn’t get discussed enough.”', cite: 'One of my sisters' },
      list: {
        label: 'What parents asked for',
        items: [
          'Less medical documentation. More photos, and an outline of what actually happened.',
          'Recognition for doing something this amazing and this hard.',
          'A space that doesn’t assume a “normal” birth: other people’s stories, resources.',
        ],
      },
      media: {
        /* FS322: both think-aloud sessions, stacked, so the images run
           longer than the copy */
        photos: [
          { key: 'bs-tap-figma', alt: 'A think-aloud walkthrough over Zoom: a parent talks through the reflection wireframe.' },
          { key: 'bs-tap-zoom', alt: 'A second think-aloud session over Zoom, the parent blurred for privacy.' },
        ],
      },
    },
    {
      key: 'architecture',
      step: 'Step 2 · Week 3',
      name: 'Architecture',
      /* v3 03 lead, verbatim */
      takeaway: 'The app opens directly into documentation. There is no home screen, and nothing to answer before you begin.',
      /* the live 02 aria, condensed */
      body: 'Our first attempt met the parent in the moment: an opening menu asked four questions about their phase and place, to pick the right feature. Meant to lower cognitive load, it gate-kept features instead, a form at the front desk while you’re still catching your breath.',
      notes: [
        /* v2 principles, verbatim */
        { label: 'Does not disorient', text: 'A parent recovering on little sleep can’t afford a maze.' },
        { label: 'Integrate facts and feelings', text: 'The brief split capture four ways, but a birth isn’t lived in parts, so one timeline holds them together.' },
      ],
      /* Q2: “I led … user flows/architecture” */
      mine: 'The user flows and information architecture, from research co-run with Michael Juan.',
      media: {
        exhibit: 'bs-4to0',
        data: {
          /* live IaAria labels, verbatim */
          before: { label: 'The first answer', alt: 'Version 1 architecture: a branching questionnaire.', text: 'A branching questionnaire: four questions before the first entry.' },
          after: { label: 'What shipped', alt: 'The final main navigation: five tabs.', text: 'Five tabs, one add button at the center, and the app opens straight into notes on a timeline.' },
        },
      },
    },
    {
      key: 'iteration',
      /* live SecIteration, condensed; tester quotes verbatim (v3) */
      step: 'Step 3 · Weeks 3–5',
      name: 'Iteration',
      /* v3 04 lead, verbatim */
      takeaway: 'Each round removed options the previous one had added.',
      body: 'We took three versions through critique, a client check-in, and think-aloud testing with parents, and changed direction based on what we heard.',
      /* Q3, PROVISIONAL */
      mine: 'Three rounds of wireframes, and the switch from image-heavy screens to color-block wireframes so feedback went to the flow.',
      /* FS320: a gallery of the features that changed most, one per
         slide, V1 · V2 · V3 side by side in the sheet's glass frame.
         Screens are her wireframes (public/images/birthstory/evolution)
         and her final screens. Copy, by receipt: Q7 (no home menu; opens
         into note-taking; onboarding shows the other features, always in
         the nav bar), Q9 (V1 too many decisions, sub-menus; isolated
         medical documentation and memories; one notes section filterable
         by topic), Q12 (“reclaim”; “Find strength & support” positioned
         the new mother negatively), the live SecIteration round lines,
         and the v3 tester quotes, verbatim. */
      media: {
        compare: [
          {
            title: 'Entry point.',
            line: 'Versions 1 and 2 opened on a menu. Version 3 opens on the notes timeline.',
            versions: [
              { tag: 'Version 1 · Week 3', src: '/images/birthstory/evolution/screens/v1-3.png', alt: 'Version 1 home: three doors, Reflect, Document, and Connect.',
                text: 'Home menu with three options: Reflect, Document, Connect.', quote: '“Onboarding is nice, but there are too many buttons and options.”' },
              { tag: 'Version 2 · Week 4', src: '/images/birthstory/evolution/screens/v2-3.png', alt: 'Version 2 menu: Reflect & Reclaim, Document the Details, Find Strength & Support, View Collections.',
                text: 'Home menu with four options.', quote: '“Why ‘reclaim’? I’m not sure what it even means.”' },
              { tag: 'Version 3 · Week 5', src: '/images/birthstory/evolution/screens/v3-2.png', alt: 'Version 3: the notes timeline, with prompts for memorable events, the experience, and medical events.',
                text: 'No home menu. Opens on the notes timeline; the other features are in the navigation bar.' },
            ],
          },
          {
            title: 'Documentation.',
            line: 'Separate tools became one timeline organized by tags.',
            versions: [
              { tag: 'Version 1', src: '/images/birthstory/evolution/screens/v1-4.png', alt: 'Version 1 reflect: voice note, notes, photos, and timeline, each its own tool.',
                text: 'Separate tools for voice notes, notes, photos, and the timeline.' },
              { tag: 'Version 2', src: '/images/birthstory/evolution/reflect-v2.png', alt: 'Version 2 notes: an entry open above a list of timed entries.',
                text: 'One notes section, filterable by topic.' },
              { tag: 'Version 3', src: '/images/birthstory/bs-doc-medical.png', alt: 'Version 3: a medical entry opened on the timeline, with tags and a voice memo.',
                text: 'Notes, medical events, and media on one timeline, organized by tags.' },
            ],
          },
          {
            title: 'Onboarding.',
            line: 'A tour before use became tips on the live screens.',
            versions: [
              { tag: 'Version 1', src: '/images/birthstory/evolution/screens/v1-1.png', alt: 'Version 1 welcome: speech bubbles explaining the app before the first entry.',
                text: 'Text welcome screens before the first entry.' },
              { tag: 'Version 2', src: '/images/birthstory/evolution/screens/v2-4.png', alt: 'Version 2 tour: Reflect, highlighted in a swipe-through menu.',
                text: 'Swipe-through tour, one feature per screen.' },
              { tag: 'Version 3', src: '/images/birthstory/evolution/screens/v3-3.png', alt: 'Version 3: a tip pointing to the Care Pod tab in the navigation bar.',
                text: 'Tips over the live screens point to each feature in the navigation bar.' },
            ],
          },
          {
            title: 'Sharing.',
            line: 'Connect became the Care Pod, one of five tabs.',
            versions: [
              { tag: 'Version 1', src: '/images/birthstory/evolution/v1-hub.png', alt: 'Version 1 home, with Connect as one of three doors.',
                text: 'Connect, one of three home options.' },
              { tag: 'Version 2', src: '/images/birthstory/evolution/screens/v2-6.png', alt: 'Version 2 tour with Find Strength & Support highlighted.',
                text: 'Find Strength & Support, renamed after testing because it positioned the new mother in a negative light.' },
              { tag: 'Version 3', src: '/images/birthstory/bs-carepod.png', alt: 'Version 3: the Care Pod, loved ones in a circle around the parent.',
                text: 'Care Pod: a tab for live updates between the parent and chosen loved ones.' },
            ],
          },
        ],
      },
    },
    {
      key: 'ux-writing',
      step: 'Step 4 · Week 5',
      name: 'UX Writing',
      /* live 04 statement (takeaway) + prose, condensed (Q12) */
      takeaway: 'The copy is trauma-informed without assuming trauma.',
      body: 'Because births can be traumatic, I wrote the first copy in a careful tone, and a parent I interviewed showed me I had gone too far. I rewrote toward connection and left room for people to bring their own tone.',
      mine: 'The UX writing throughout, revised through testing.',
      media: {
        exhibit: 'bs-revisions',
        data: {
          screen: { src: '/images/birthstory/evolution/v2-hub.png', alt: 'Version 2’s menu, with Reflect & Reclaim and Find Strength & Support.', caption: 'Version 2, the copy before.' },
          /* live TesterNote + revisions panel, verbatim */
          saidLabel: 'A parent said',
          said: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.”',
          rows: [
            ['Reclaim your narrative', 'A space to make sense of it, in your own words'],
            ['Find strength & support', 'Care Pod'],
          ],
        },
      },
    },
    {
      key: 'identity',
      step: 'Step 5 · Week 5',
      name: 'Visual Identity',
      /* live 04 Visual Design: statement (takeaway) + prose (Q14) */
      takeaway: 'Calm, emotionally intelligent, and deliberately non-clinical.',
      body: 'Myana already used a gradient, so I built one here to tie the two together. Parents told me they’d mostly reach for this in the small hours between feedings, so everything had to read gently to someone exhausted in the middle of the night.',
      notes: [
        /* live Insight, verbatim */
        { label: 'My thinking', text: 'I chose a lighter pink into a darker teal because it let me hold two things at once: a gender spectrum, and the emotional range of the day itself.' },
      ],
      mine: 'The visual identity: the gradient, palette, type, and components.',
      media: {
        exhibit: 'bs-identity',
        data: {
          /* live SecBrand: the gradient note, palette, type, moodboard */
          gradientNote: 'Blush → periwinkle → teal: the gradient that ties Birth Story to Myana',
          palette: [
            ['#1A434D', 'teal'], ['#3E5E6A', 'slate'], ['#6D8F99', 'sage'], ['#B1C1F4', 'peri'], ['#DBADAD', 'blush'],
            ['#9DA3BF', 'dusk'], ['#BFC0D4', 'mist'], ['#E6E5FD', 'lilac'], ['#DBE6FA', 'sky'], ['#FFFCFA', 'paper'],
          ],
          type: [['Terfens', 'titles'], ['Gotham', 'everything else']],
          moodboard: {
            alt: 'The Birth Story moodboard: Georgia O’Keeffe florals, lunar and gradient imagery, and wellness apps with orbiting members and keepsake books.',
            caption: 'O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod.',
          },
        },
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
