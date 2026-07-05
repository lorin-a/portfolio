/* ============================================================================
   Birth Story — canonical content for the graphic-system direction studies
   (D · Print, E · Skin, F · Wall). One source so every study renders the SAME
   blessed copy and only the visual system changes.
   Body prose and quotes are verbatim from the live page (the copy source of
   truth). Anything a study invents on top (folio lines, UI labels) lives in
   that study's file and is marked provisional there.
   ============================================================================ */

export const OVERVIEW = {
  lead: 'Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
  meta: [
    ['Role', 'My partner Michael and I co-led research and information architecture. I led UX/UI, visual identity, and UX writing.'],
    ['Context', '6-week graduate studio at Carnegie Mellon, taught by the founders of Dezudio, Myana’s design partner'],
    ['Client', 'Myana, a maternal-health platform co-developed by researchers at the University of Pittsburgh'],
    ['Method', 'Dezudio’s five-strategy process: 5 parent interviews, 3 think-aloud protocols (TAP), 3 wireframe rounds'],
    ['Outcome', 'Strong client validation; sponsored to possibly inform future Myana versions'],
    ['Build', 'Concept. Wireframes in Figma, prototypes here built with Claude Code'],
  ],
}

export const BRIEF = {
  num: '01',
  title: 'Brief',
  lead: 'Pitch a concept for Myana’s companion micro-app that helps parents document and reflect on their birth experience.',
  prose: [
    'Myana already supports parents through pregnancy and postpartum. Its researchers saw that the birth itself still went undocumented and unprocessed, and brought that gap to our graduate studio to conceptualize.',
  ],
  connectionLabel: 'My connection',
  connection:
    'Supporting mothers is personal for me. I come from a matriarchal family that has a history of complicated births. While interviewing my family members, I understood for the first time how traumatic their experiences were. When I worked as a night nanny for an infant whose mother was in breast cancer treatment, I experienced sleep deprivation and sleep-training struggles firsthand, which deepened my understanding. This opportunity to support parents was deeply meaningful.',
  required: [
    ['Information gathering', 'Medical info, contextual info, the birth narrative, and feelings.'],
    ['Meaning making', 'Processing through positive retelling, without re-traumatizing.'],
    ['App administration', 'Profile and onboarding, plus nudges that prompt capture.'],
  ],
  provided: ['Baby Book', 'Trackers', 'Birth Plan', 'Sharing', 'Partner Participation'],
  stakes: [
    ['80%', 'of U.S. maternal deaths are preventable'],
    ['65%', 'happen after delivery'],
    ['3×', 'the risk for Black mothers'],
  ],
  stakesSource: 'Figures from the project brief.',
}

export const RESEARCH = {
  num: '02',
  title: 'Research',
  lead: 'This was a design sprint on a concept already built on extensive research, so our work focused on concept iteration.',
  prose: [
    'Before we built anything, I researched blogs and existing products and ran information interviews with family to get familiar with the subject: my three sisters, my mom, and my friend with a toddler. An app would be nice because “First couple of weeks you are up and on your phone every 2 hours while breastfeeding.”',
  ],
  wanted: [
    'Less medical documentation, more photos and a general outline of events to refer back to.',
    'Recognition for doing something amazing and hard.',
    'A safe space to reject the idea of a “normal” birth, with a forum of others’ stories and resources.',
  ],
  usage: [
    'Select-one answers in the exhausted early weeks.',
    'Free-form journaling later, once the fog lifts.',
    'A keepsake book of the story in the end.',
  ],
  quote: {
    text: '“None of our births went according to plan and they were traumatizing and it does not get discussed enough.”',
    who: 'Group call with my three sisters',
  },
  insight:
    'My thinking was rooted in my close family members’ traumatic experiences, which led me to a trauma-informed approach. I wanted the right balance between the individual feat of giving birth and the collective experience around it, with an interaction matched to a new parent’s capacity. So I left medical documentation optional and, by the final iteration, built the design around events on a timeline.',
  values: [
    ['Look & Feel', 'Calm, emotionally intelligent, non-clinical.'],
    ['Function', 'Hold the medical record and the emotional story in one place.'],
    ['Flow', 'Intuitive and easy to navigate.'],
    ['Voice', 'Empathetic and trauma-informed.'],
  ],
}

export const ARCHITECTURE = {
  num: '03',
  title: 'Information architecture',
  lead: 'The app opens straight into documentation, with no home screen and nothing to answer first.',
  prose1:
    'My first version opened by asking the parent where they were: before, during, or after the birth, at home or in the hospital.',
  insight:
    'I thought that was thorough, but in testing it read like a form at the front desk while you’re still catching your breath. It was too many questions before anything that mattered.',
  move: ['4 → 0', 'questions before the first entry'],
  capV1: 'ia-v1 · a branching questionnaire that asked conditional questions before any entry.',
  capFinal: 'ia-final · five tabs, a single add button at center, nothing to answer before beginning.',
  prose2:
    'So I cut the questions entirely. The app opens straight into note-taking, the thing parents most wanted, and onboarding introduces the rest, which stay in the nav bar the whole time.',
  prose3:
    'I also stopped splitting the data up. The brief asked for four kinds of capture, medical, contextual, narrative, and feelings, and instead of giving each its own corner I put them on one timeline you tag and filter, because earlier versions that separated them tested as fragmented and confusing.',
}

export const ITERATION = {
  title: 'Iteration',
  lead: 'Each round made the app simpler.',
  intro:
    'I took three versions through critique, a client check-in, and one round of think-aloud testing (TAP) with parents our client connected us with, and changed direction based on what I heard.',
  rounds: [
    {
      label: 'Version 1 · Week 3',
      change: 'The first version tried to do everything, with a tool for every situation and sub-menus inside menus. It was disorienting.',
      feedback: 'Too many menus, too many buttons; the first build tried to do everything.',
      feedbackKind: 'summary',
      shots: [['v1-3', 'V1: reflect / document / connect, the build that did too much']],
    },
    {
      label: 'Version 2 · Week 4',
      change:
        'For the second version I consolidated everything into one filterable notes section and narrowed the flow to two actions, document and reflect, one at a time. It was clearer, but still too many options, and the copy drew a flag too.',
      feedback: 'The word ‘reclaim’ made the app feel braced for trauma: it pre-framed birth as something to recover from, not the feat and the memory it also is.',
      feedbackKind: 'summary',
      shots: [['v2-1', 'V2 splash'], ['v2-2', 'V2 welcome'], ['v2-3', 'one menu']],
    },
    {
      label: 'Version 3 · Week 5',
      change: 'By the third version I kept only the features parents came back to, and left room to go deeper.',
      friction:
        'A six-week studio can’t show whether parents come back weeks later, once the fog has lifted. That return is the whole promise of the product, so it’s the part I most wish I had been able to test.',
      shots: [['v3-2', 'final home'], ['v3-4', 'Birth Story Book'], ['v3-5', 'search']],
    },
  ],
}

export const FEATURES = {
  num: '04',
  title: 'The product',
  lead: 'Birth is unpredictable, so the app is deliberately simple.',
  intro:
    'It opens into documenting and reaches everything else in a tap or two. None of the screens below are flat mockups: I rebuilt the wireframes as working prototypes, so what you’re seeing is the real interaction.',
  prioProse:
    'The brief gave us three required areas, information gathering, meaning-making, and onboarding, plus five optional features. I kept two, sharing and a keepsake book, added one that wasn’t on the list, search, because every parent described the same brain fog, and cut the other two, trackers and a birth plan, the kind of extra the research kept telling me to leave out.',
  prio: [
    ['2', 'kept', 'sharing · keepsake book'],
    ['1', 'added', 'search'],
    ['2', 'cut', 'trackers · birth plan'],
  ],
  deepdives: [
    {
      name: 'Documentation',
      role: 'The core feature · all information-gathering, unified',
      prose:
        'Parents told me they wanted to land on the main task, so that’s what the app does. Even if nothing else gets used, there’s a timeline of whatever they or a loved one managed to add, and a note from the delivery room, a prescription, and a voice memo when your hands are full all land on it together, the moment they happen.',
      flow: [
        ['/images/birthstory/bs-doc-note.png', 'A new note being added to the documentation timeline.'],
        ['/images/birthstory/bs-doc-medical.png', 'A medical entry open on the timeline, the detail a tap away.'],
      ],
      note: ['One timeline', 'Medical, contextual, narrative, and feelings, tagged and filtered in one place.'],
    },
    {
      name: 'Care Pod',
      role: 'The heart of the concept · the optional sharing and partner-participation features',
      prose:
        'The idea came out of a single interview. A parent told me someone in her circle remembered a detail about her child’s birth that she had lost, and wished she’d asked everyone around her to add what they remembered while it was fresh. That became Care Pod: one support person sends out updates, photos, and voice memos, loved ones reply with messages and voice notes, and all of it saves into the Birth Story, so the whole story of who was there and how loved that child was stays in one place.',
      flow: [
        ['/images/birthstory/bs-carepod-compose.png', 'Composing a Care Pod update.'],
        ['/images/birthstory/bs-carepod-update.png', 'The update goes out to the pod.'],
        ['/images/birthstory/bs-carepod-stories.png', 'Loved ones’ replies collect into the story.'],
      ],
      note: ['One action', 'One support person sends out; loved ones reply; all of it saves into the Birth Story.'],
    },
    {
      name: 'Reflection',
      role: 'The processing and nudge requirements',
      prose:
        'Every parent wanted to reflect, whether their birth was traumatic or not, but the ones who don’t already journal often don’t know where to start. So instead of a blank page, the journal hands them gentle prompts: a letter to a past self, the needs that are hard to name, the senses worth keeping.',
      flow: [
        ['/images/birthstory/bs-reflect-card.png', 'The deck deals a gentle prompt.'],
        ['/images/birthstory/bs-reflect-entry.png', 'You write, and tag how it felt.'],
      ],
      note: ['No blank page', 'The deck deals a prompt; you write, and tag how it felt.'],
    },
    {
      name: 'Search',
      role: 'Not required · my addition, for cognitive load',
      prose:
        'This is the one feature nobody asked for. As the entries pile up, I didn’t want anyone digging through the whole app to find one memory, so search is a swipe away from anywhere and filters by emotion, category, or keyword.',
      flow: [
        ['/images/birthstory/bs-search.png', 'Search slides in over whatever screen you’re on.'],
        ['/images/birthstory/bs-search-panel.png', 'Filter by emotion, category, or keyword.'],
      ],
      note: ['A swipe from anywhere', 'The drawer slides in over whatever screen you’re on.'],
    },
    {
      name: 'The Book',
      role: 'The optional baby book',
      prose:
        'We took the book seriously the moment a parent told me she wouldn’t trust an app with something this precious unless she knew it couldn’t disappear. So the whole record can leave the app, as a printed book or a free PDF, curated from what’s already there and open to the people who were part of it.',
      quote: { text: '“It would be tragic to lose these moments if the app went away.”', who: 'Parent tester' },
      flow: [
        ['/images/birthstory/bs-book-order.png', 'Order a printed keepsake or download a free PDF.'],
        ['/images/birthstory/bs-book-curate.png', 'Curate the story from what’s already there, together.'],
      ],
      note: ['It can leave the app', 'The whole record, as a printed book or a free PDF.'],
    },
  ],
}

export const VOICE = {
  num: '05',
  title: 'UX writing',
  lead: 'The copy is trauma-informed without assuming trauma.',
  prose: [
    'Because I knew births could be traumatic, I wrote the first copy in a careful, trauma-informed tone, and a parent I interviewed showed me I had gone too far. She didn’t connect with the word “reclaim,” and it made me realize I was leaning on the hard parts, missing how much a birth can also be about connection. I didn’t want the words to decide the experience for anyone.',
    'So I rewrote toward connection and left room for people to bring their own tone. Same for “Find strength & support” as a feature name: it positioned the new mother in a negative light, when in fact most are empowered by doing an amazing and hard thing. It became the Care Pod.',
    'The next thing I’d do is balance the reflection prompts so they reach for joy as readily as they make room for distress.',
  ],
  quote: {
    text: '“Assuming there’s a trauma, you shouldn’t call it that. I appreciate the acknowledgement, but it feels like an implied negative.”',
    who: 'Parent interview',
  },
  rewrites: [
    ['“Reclaim your narrative.”', '“A space to make sense of it, in your own words.”'],
    ['“Find strength & support”', '“Care Pod”'],
  ],
}

export const BRAND = {
  title: 'Visual design',
  lead: 'Calm, emotionally intelligent, and deliberately non-clinical.',
  prose:
    'Myana already used a gradient, so I built one here to tie the two together. Parents told me they’d mostly reach for this in the small hours between feedings, so everything had to read gently to someone exhausted in the middle of the night.',
  insight:
    'I chose a lighter pink into a darker teal because it let me hold two things at once: a gender spectrum, and the emotional range of the day itself.',
  gradientNote: 'blush → periwinkle → teal · the gradient that ties Birth Story to Myana',
  palette: [
    ['#1A434D', 'teal'], ['#3E5E6A', 'slate'], ['#6D8F99', 'sage'], ['#B1C1F4', 'peri'], ['#DBADAD', 'blush'],
    ['#9DA3BF', 'dusk'], ['#BFC0D4', 'mist'], ['#E6E5FD', 'lilac'], ['#DBE6FA', 'sky'], ['#FFFCFA', 'paper'],
  ],
  type: [
    ['Terfens', 'titles'],
    ['Gotham', 'everything else'],
  ],
  moodboardCap: 'O’Keeffe’s organic forms, lunar calm, and the orbiting-circle apps that became the Care Pod.',
}

export const OUTCOME = {
  num: '06',
  title: 'Outcome',
  lead: 'The client loved it, and it still isn’t getting built.',
  prose:
    'When we presented, the client had almost nothing to change. There’s no real signal the app will get built: Myana sponsored the project because it might inform future versions of their product, and the pitch was probably as much for us as for them, but it gave the concept a real starting point.',
  quote: { text: '“I wish this could be real right now!”', who: 'Sarah Burns, MSW, LSW · client' },
}

export const CLOSE = {
  line: 'I’m a big dreamer. I try to do everything first, then narrow and narrow until I get to the heart of it.',
  sub: 'Designing something and then being able to build it myself is the direction I’m headed. The working prototypes on this page are that proof.',
  email: 'mailto:lorinanderberg1@gmail.com',
}
