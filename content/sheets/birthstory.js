/**
 * BirthStory — folder sheet copy (FS299), built from the template.
 *
 * SOURCES, so every line has a receipt:
 *   · "live" = components/Birthstory/* (the live case study at
 *     /projects/birthstory-care-pod), the copy she blessed after
 *     2026-06-30; BirthStoryBody.jsx and productFeatures.jsx.
 *   · "Qn"   = docs/case-study-editorial/BIRTHSTORY-interview.md, her
 *     verbatim interview answers (also in sources/birthstory/answers.md).
 *   · "sq"   = her old Squarespace page (sources/birthstory/squarespace.md).
 *
 * Copy is hers, selected and trimmed under the standing copy rule (her
 * draft is the source; Claude refines it). Lines marked PROVISIONAL are
 * assembled from her sources for this sheet and are hers to rewrite.
 *
 * WHAT THE SHEET LEAVES OUT ON PURPOSE: the live case study's interactive
 * prototypes (DocReveal, CarePodFlow…) and the IA animation are code, not
 * media; the sheet shows the deck slides and photographs instead. Michael
 * Juan's data-visualization screens appear only in the Version 1 gallery,
 * captioned as cut (Q2: they "did not ultimately get featured").
 *
 * OPEN, hers to settle (also in STATUS):
 *   · the client is named four ways across her sources; this sheet uses the
 *     live page's naming (Myana, co-developed by Pitt researchers) and
 *     credits Sarah Burns and Tamar Krishnamurti by name (sq);
 *   · the method count: Q6 says 7 parents (2 think-alouds over Zoom + 3
 *     family + 2 friends); the live page says 5 interviews + 3 think-alouds.
 *     The sheet follows Q6.
 */

export const birthstory = {
  /* Q15 + live Outcome, refined; the quote is the client's (live). No build
     claim (standing correction, BIRTHSTORY-copy-plan.md). */
  outcome:
    'The client had praise and almost no notes: “I wish this could be real right now!” There’s no real signal the app will get built, but it gave the concept a real starting point.',

  /* Four prints for range: the product, the research, the critique, the
     review. Captions and alts are furniture, hers to rewrite. */
  prints: [
    { key: 'bs-collage', caption: 'The App', alt: 'The final Birth Story screens arranged around the gradient splash screen.' },
    { key: 'bs-mock-carepod', caption: 'Care Pod', alt: 'The Care Pod circle, the live message board, and a story with photos, on three phones.' },
    { key: 'bs-crit-wall', caption: 'The Crit Wall', alt: 'Printed screens taped to a whiteboard and marked up in red.' },
    { key: 'bs-final-review', caption: 'Final Review', alt: 'The studio team in front of the projector, with the client on the video call behind them.' },
  ],

  meta: [
    /* live Overview: Context */
    ['Context', '6-week graduate studio at Carnegie Mellon, Spring 2025, taught by the founders of Dezudio, Myana’s design partner'],
    /* content/projects/birthstory.md + sq, her line */
    ['Role', ['UX/UI Design, UX Research,', 'Copywriting, Brand Identity']],
    /* Q2 (Michael Juan) + live Overview: Client */
    ['Collaborators', ['Michael Juan, design partner;', 'Myana, a maternal-health platform co-developed by researchers at the University of Pittsburgh']],
    /* live colophon */
    ['Tools Used', 'Figma, Claude Code'],
    /* sq phases (one week each: Research I, Research II, Ideation,
       Interviews, Iteration, Presentation), grouped in twos to match the
       live page's week tags. The season (in Context) is from her deck's
       footer, “CMU IXD Studio Spring 2025”. */
    ['Timeline', ['Research: Weeks 1⁠–⁠2', 'Ideation and Interviews: Weeks 3⁠–⁠4', 'Iteration: Weeks 5⁠–⁠6']],
  ],

  frame: {
    /* sq Design Challenge + live Brief, verbatim, joined. */
    why: 'Birthing parents lack systems of support before, during, and after the experience of giving birth, which is often overshadowed by the needs of a newborn. The brief: pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
    /* Q6 method in a line, then her finding (live 01 statement, verbatim). */
    /* PROVISIONAL short version for the three-column row, matched to the
       other two columns (FS33's rule); cut from `why`, new wording only
       in “We pitched…”. */
    short: {
      why: 'Birthing parents lack systems of support before, during, and after giving birth, an experience often overshadowed by the needs of a newborn. We pitched a micro-app to help them document and reflect.',
    },
    research: 'We interviewed seven parents and tested our wireframes in think-aloud walkthroughs. If we did not learn about the importance of the collective experience of the birth as well as the individual, we may have missed a crucial aspect of the ecosystem.',
  },

  /* The architecture, as the system section: the first answer against
     what shipped. Intro: live 02 statement + Q9's unifying move, refined. */
  system: {
    kicker: 'Architecture',
    label: 'From Two Homes to One Timeline',
    intro: 'New parents recovering from birth have limited capacity, which made the onboarding and user flow make-or-break. The first version split medical documentation and memories into separate homes. The final version houses them in one timeline, filtered by tags, and opens straight into note-taking.',
    media: {
      stills: [
        { key: 'bs-v1-ia', alt: 'Version 1 architecture: separate Document and Reflect homes, each branching into its own menus.' },
        { key: 'bs-ia-final', alt: 'The final main navigation: five tabs for Notes, Care Pod, New Note, Book, and Search.' },
        { key: 'bs-onboard-ui', alt: 'Onboarding: a minimal interface walks the parent through the app, and the timeline builds itself from tags.' },
      ],
    },
  },

  /* THE FIVE FEATURES, in her order of weight (Q11: notes are the core,
     Care Pod the heart). Bodies are her copy, verbatim, from
     productFeatures.jsx. `mine` lines are PROVISIONAL: Q2 gives only the
     project-level split (“I led UX/UI, visual identity, user flows/
     architecture, mockup designs”; research shared with Michael Juan), so
     each line applies that split to the feature, adding only facts she
     stated about it. */
  components: [
    {
      key: 'documentation',
      name: 'Documentation',
      body: 'Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add.',
      mine: 'UX/UI, mockups, and the flow that opens straight into note-taking, a decision from the think-aloud tests co-facilitated with Michael Juan.',
      media: {
        stills: [
          { key: 'bs-notes', alt: 'Note taking: suggested prompts, a button for a new entry, and a timeline of collapsible cards.' },
          { key: 'bs-mock-timeline', alt: 'The timeline, the Birth Story Book, and curating entries, on three phones.' },
          { key: 'bs-final-timeline', alt: 'The home timeline fills itself from entries; each entry opens as a full card for content and tags.' },
          { key: 'bs-onboard-signup', alt: 'Onboarding: the splash, Get Started, and sign-up screens.' },
        ],
      },
    },
    {
      key: 'care-pod',
      name: 'Care Pod',
      body: 'The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod: one support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story.',
      mine: 'UX/UI and mockups, and the rename from “Find strength & support,” which positioned the new mother in a negative light, to Care Pod.',
      media: {
        stills: [
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
      mine: 'UX/UI, mockups, and the reflection prompts, rewritten to be trauma-informed without assuming trauma.',
      media: {
        stills: [
          { key: 'bs-journal', alt: 'Journaling: shuffle through prompts, then tag the entry and add media.' },
          { key: 'bs-final-journal', alt: 'Journal cards deal guided prompts; a new journal entry mirrors the notes entry card.' },
        ],
      },
    },
    {
      key: 'search',
      name: 'Search',
      body: 'This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory.',
      /* live: “Not required · my addition, for cognitive load” */
      mine: 'The feature itself, added beyond the brief for brain fog and overwhelm, plus its UX/UI and mockups.',
      media: {
        stills: [
          { key: 'bs-onboard-search', alt: 'Search slides in from any screen and finds entries by tag.' },
          { key: 'bs-final-search', alt: 'Easy search, tagging by event and emotion, and search across media.' },
          { key: 'bs-mock-search', alt: 'Search over the timeline, on three phones.' },
        ],
      },
    },
    {
      key: 'book',
      name: 'The Birth Story Book',
      /* productFeatures.jsx prose + Q10's “free PDF or a real book to order” */
      body: 'We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. It’s available as a free PDF or a real book to order.',
      mine: 'UX/UI and mockups for ordering, downloading, and curating the book.',
      media: {
        stills: [
          { key: 'bs-book', alt: 'Export the story as a free PDF or a printed keepsake, and curate the entries and media that go in it.' },
          { key: 'bs-mock-book', alt: 'The timeline, the book, and curating the story, on three phones.' },
          { key: 'bs-final-book', alt: 'Download or order the book, and drag entries to curate the story with collaborators.' },
        ],
      },
    },
    {
      key: 'identity',
      name: 'Voice and Visual Identity',
      /* live Voice statement + Q14, refined; the “reclaim” story is Q12. */
      body: 'The copy is trauma-informed without assuming trauma. When a parent didn’t connect with “reclaim,” I rewrote toward connection. The look is calm, emotionally intelligent, and deliberately non-clinical: a gradient that pairs with Myana’s, lighter pink to darker teal, for someone exhausted in the middle of the night.',
      mine: 'Visual identity, UX writing, and the gradient, color, and type system.',
      media: {
        stills: [
          { key: 'bs-v2-onboarding', alt: 'Version 2 onboarding with the feedback: reconsider “reclaim,” compassionate copy may imply a negative experience.' },
          { key: 'bs-moodboard', alt: 'The moodboard: app references, textures, and soft gradients.' },
          { key: 'bs-brand', alt: 'Brand colors from deep teal to blush and lavender, with Terfens for titles and Gotham for body.' },
          { key: 'bs-buttons', alt: 'Button states, unselected and selected, across the palette.' },
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
        { head: 'Start Simple', text: 'If I could do this project again, I’d begin by simplifying. Identifying the core need early would have helped me stay focused.' },
        /* Q3 + Q14 */
        { head: 'Match Capacity', text: 'A parent giving birth, or their partner, has little to no capacity, likely using the app between feedings in the middle of the night.' },
        /* the thesis, 2026-08-03 */
        { head: 'Birth Is Shared', text: 'Birth is both an individual and a shared experience, and the two are intertwined in how it is documented and remembered.' },
      ],
    },
    {
      id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
      shift: ['Image-Heavy', 'Flow-First'],  /* Q3 */
      list: [
        /* Q3 + sq */
        { head: 'Show Less', text: 'Only show what you want feedback on. Turning an image-heavy prototype into color blocks and simple icons pointed the feedback at the flow.' },
        /* Q12 */
        { head: 'Don’t Assume', text: 'A birth can be traumatic and miraculous at once, so the words shouldn’t decide the experience for anyone.' },
        /* Q5 */
        { head: 'Design, Then Build', text: 'Since this course I’ve taught myself to build with AI, and I rebuilt these wireframes as working prototypes for the case study.' },
      ],
    },
    {
      id: 'shape', verb: 'Shape', title: 'What’s next',
      shift: ['Concept', 'Tested'],
      list: [
        /* Q12 */
        { head: 'Balance Prompts', text: 'The reflection questions should balance recalling joy with nurturing moments of distress.' },
        /* Q3: “we were not able to show an A/B to the parents we interviewed” */
        { head: 'Test With Parents', text: 'Our client saw all three iterations, but the parents we interviewed never saw the final one side by side.' },
        /* the thesis: Care Pod during birth, easy updates in the newborn phase */
        { head: 'Extend the Pod', text: 'Care Pod could carry past the birth, sending easy updates through the newborn phase.' },
      ],
    },
  ],

  /* BEHIND THE SCENES: the research, then the two rejected versions.
     Captions describe what each shows; hers to rewrite. */
  processTitle: 'Behind the scenes',
  process: [
    {
      title: 'Research and Critique',
      fit: 'contain',
      images: [
        { key: 'bs-crit-wall', alt: 'Every screen printed and marked up, gradient and color block side by side.' },
        { key: 'bs-tap-figma', alt: 'A think-aloud walkthrough of the reflection wireframe over Zoom.' },
        { key: 'bs-process', alt: 'The ask, the requirements, and our approach.' },
        { key: 'bs-v2-feedback', alt: 'Feedback on Version 2, in four themes.' },
        { key: 'bs-crit-zoom', alt: 'The client joins a studio critique over video.' },
        { key: 'bs-final-review', alt: 'The team and our client, Sarah Burns, at the final review.' },
      ],
    },
    {
      title: 'Versions 1 and 2',
      fit: 'contain',  /* deck slides: annotations run to the edges */
      images: [
        { key: 'bs-v1-approach', alt: 'Version 1’s approach: function and feel.' },
        { key: 'bs-v1-onboarding', alt: 'Version 1 onboarding: compassionate copy and a menu of choices.' },
        { key: 'bs-v1-reflect', alt: 'Version 1 reflect: voice notes, journal, and photo upload.' },
        { key: 'bs-v1-document', alt: 'Version 1 document: a step-by-step recall of who, what, when, and where.' },
        { key: 'bs-v1-dataviz', alt: 'Version 1 data visualization, cut from the final design.' },
        { key: 'bs-v1-addons', alt: 'Version 1 add-ons: labor mode, a checklist, a symptom tracker.' },
        { key: 'bs-v2-timeline', alt: 'Version 2: the timeline and tags, with feedback.' },
      ],
    },
  ],

  /* CREDITS: one column each. Names from sq; consent from live. */
  credits: [
    ['Design Team', 'Lorin Anderberg, Michael Juan'],
    ['Client', 'Sarah Burns, MSW, LSW, and Tamar Krishnamurti, PhD, for Myana'],
    ['Studio', 'CMU MA in Design, Studio II: Introduction to IXD, taught by the founders of Dezudio'],
    ['Consent', 'Participant quotes appear with their consent; names are withheld.'],
  ],
}

export default birthstory
