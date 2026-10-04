/**
 * SomeBuddy — folder sheet copy (FS300), built from the template.
 *
 * SOURCES, so every line has a receipt:
 *   · "sq"  = her old Squarespace page, verbatim in
 *     docs/case-study-editorial/sources/somebuddy/squarespace.md. The
 *     fullest written source, in the team's “we”.
 *   · "med" = her Medium article (sources/somebuddy/medium.md), the same
 *     story with the deck slides.
 *   · "md"  = content/projects/somebuddy.md (front matter only).
 * No interview or hiring-manager answers exist for SomeBuddy, and no
 * first-person contribution anywhere (the “MY PART.docx” that held one is
 * not on this machine). So every `mine` line and most of the reflection are
 * [LORIN TO WRITE], never invented.
 *
 * Copy is hers, trimmed under the standing copy rule (her draft is the
 * source; Claude refines it). PROVISIONAL marks lines assembled for this
 * sheet; they are hers to rewrite.
 *
 * THE SHAPE (FS346, brought to the BirthStory bar): the cover plays the
 * concept video's kinetic opening; the ecosystem overview shows four key
 * app screens with her lines; the features follow in the order a student
 * meets them; then The Process in four steps (Research, Synthesis,
 * Testing, Brand Identity). Single app screens are cropped on the fly
 * from her deck slides (Cloudinary c_crop), so no new uploads.
 * Her deck slides carry no annotations (titles only), so every annotation
 * is her Medium/Squarespace wording, trimmed. “My Contribution” is
 * dropped everywhere: no source says what was hers per section, and six
 * [LORIN TO WRITE] boxes read as unfinished. Ask her once instead.
 *
 * MEDIA: content/sheets/media/somebuddy.js. The research slides (ecosystem
 * map, personas, user flows, principles) came from her Medium article and
 * were uploaded to Cloudinary on 2026-10-02 under their keys.
 *
 * OPEN, hers to settle:
 *   · THE CLIENT. md lists “client: CMU Department of Student Affairs”, but
 *     sq says Student Affairs only “expressed interest” after the final
 *     presentation. It was a studio project, not client work, so the sheet
 *     names no client and says “expressed interest” / “sincere interest”.
 *   · Animation is one of the homepage's three contributions (with Brand
 *     Identity and UX), but her role line (md, sq) leaves it out. The Role
 *     fact below keeps her line; add Animation if it was hers.
 *   · The full 2:55 concept video is on YouTube (pdlaitoGycA); the sheet can
 *     only show the Cloudinary clips from it.
 */

/* one phone screen, cropped from a 1920 × 1080 deck slide */
/* a square print, cut from a deck slide */
const square = (id, x, y, s) => `https://res.cloudinary.com/dc17mvdyv/image/upload/c_crop,x_${x},y_${y},w_${s},h_${s}/f_auto,q_auto,w_1000/${id}`
const crop = (id, x) => `https://res.cloudinary.com/dc17mvdyv/image/upload/c_crop,x_${x},y_274,w_336,h_744/f_auto,q_auto,w_600/${id}`

export const somebuddy = {
  /* sq “Outcomes”, trimmed; the honest wording (no build or adoption). */
  outcome:
    'We presented the full vision to CMU’s Department of Student Affairs, and it was met with sincere interest, especially around bringing SomeBuddy into Fall 2025 orientation. No next steps have been taken yet.',

  /* FS349: the cover is the polaroid pile again, one print per part of
     the ecosystem (sq: “a social app, branding, pop-up events, and
     collectibles”). Square crops of her deck slides, below the title bar.
     The concept video's opening lives on in The Concept Video. */
  prints: [
    { key: 'sb-print-brand', caption: 'The Brand', src: square('1', 500, 40, 920),
      alt: 'The SomeBuddy wordmark, the D a smiling speech bubble.' },
    { key: 'sb-print-orientation', caption: 'Orientation', src: square('26', 770, 225, 855),
      alt: 'A hand holding the orientation bingo card beside the BINGO booth.' },
    { key: 'sb-print-badges', caption: 'Badges', src: square('27', 1028, 225, 855),
      alt: 'A backpack wearing embroidered SomeBuddy badges.' },
    { key: 'sb-print-app', caption: 'The App', src: square('31', 830, 225, 855),
      alt: 'Bingo in the app: a shuffled card and themes to start a new one.' },
  ],

  /* FS346: SomeBuddy's own band (lime → lavender → brand blue, washed on
     the bands) and step-tile colors, from its palette */
  band: 'linear-gradient(126deg, #d4f25a 0%, #c4c2ff 48%, #4747dc 100%)',
  tiles: ['#D4F25A', '#F6A6E8', '#C4C2FF', '#9D9AF7'],

  meta: [
    /* med “About”, verbatim */
    ['Context', 'Final project for the Carnegie Mellon School of Design MA Interaction Design Studio II, Spring 2025'],
    /* md + sq, her line */
    ['Role', ['UX/UI Design, UX Research,', 'Copywriting, Brand Identity']],
    /* med “Team” and “Class” */
    ['Collaborators', ['Yaezi Lee and Rui Ying, design team;', 'Ashley Deal and Raelynn O’Leary, instructors']],
    /* md + sq */
    ['Tools Used', 'Figma, After Effects, Adobe Illustrator'],
    /* sq “Duration: 5 Weeks” and its five one-week phases */
    ['Timeline', ['5 weeks: Ideation, Research and Synthesis,', 'Concept, Refinement, Presentation']],
  ],

  frame: {
    /* sq “Design Challenge”, verbatim but for a comma before “which”. */
    why: 'Grad students seek connection but struggle to make plans due to hectic schedules, which can lead to feelings of isolation. How can we create easy, low-pressure ways for grad students to connect through simple activities, especially when it’s something they don’t want to do alone?',
    /* sq “Research”: the two interview findings, compressed. */
    research: 'Eight interviews with grad students showed that the connection they want depends on the activity: for errands or studying, almost anyone will do; for something personal like hiking, they want to know more first. Packed schedules make short, spontaneous meetups more appealing than long-term commitments.',
  },

  /* THE ECOSYSTEM: the overview before the work, four key app screens
     with her lines (sq/med, trimmed). Intro: sq “The Ecosystem” line +
     the social-ish passage, verbatim but for “collectibles”. */
  system: {
    kicker: 'The Ecosystem',
    label: 'Social-ish',
    wide: true,
    intro: 'The research revealed a need for opt-in, opt-out, low-stakes, and lightweight opportunities for connection that give the user autonomy to express their desired level of engagement. Our ecosystem involves a social app, branding, pop-up events, and collectibles that create a movement called “social-ish,” connecting students from orientation to ongoing campus life through tasks, badges, and bingo.',
    screens: [
      { name: 'Post an Activity', text: 'Pick an activity or task, choose a general time and location, and post to the community.',
        src: crop('28', 354), alt: 'Find your somebuddy: an activity, a time, and a place on a map, then Find Somebuddy.' },
      { name: 'Find a Buddy', text: 'Filter potential buddies by distance, age, gender, and shared interests, in map and list views.',
        src: crop('28', 1230), alt: 'Nearby buddies in a list, filtered to coffee and casual chat, each with Send request and Chat.' },
      { name: 'Collect Badges', text: 'A badge for each task completed together with another SomeBuddy, customizable and collected.',
        src: crop('31', 132), alt: 'My badge collection: six earned badges with the dates they were earned.' },
      { name: 'Play Bingo', text: 'Join bingo cards by theme, or create a custom card and share it with others.',
        src: crop('31', 573), alt: 'A SomeBuddy bingo card, four of sixteen squares completed.' },
    ],
  },

  /* THE FEATURES, in the order a student meets them (sq “The Ecosystem”). */
  components: [
    {
      key: 'orientation',
      name: 'Orientation Bingo',
      /* sq, verbatim but for a comma after “orientation” */
      body: 'Students discover the SomeBuddy brand and app at CMU’s grad student orientation, where they play a game of bingo to get to know their new peers and add them as buddies within the app for future connection.',
      media: {
        stills: [
          { type: 'video', key: 'sb-orientation-reel', alt: 'The orientation bingo card, banners, and booth, set on campus.' },
          { key: 'sb-orientation', alt: 'Orientation banners, a hand holding the bingo card, a QR code, and the BINGO booth.' },
        ],
      },
    },
    {
      key: 'app',
      name: 'The SomeBuddy App',
      /* sq, condensed; wording hers */
      body: 'Finding someone to do something with is fast and low-pressure. Instead of filling out a bunch of forms, students post an activity, find nearby matches, and reach out in two ways: send a request, or chat first.',
      notes: [
        /* med, verbatim */
        { label: 'The goal', text: 'Make the experience fast, effortless, and low-pressure.' },
        /* med, lightly trimmed */
        { label: 'A second layer', text: 'Filters change with the activity, so if you’re looking for someone craving espresso or a casual chat over coffee, you can narrow it down even more.' },
      ],
      media: {
        /* sq/med lines for the request flow, trimmed */
        screens: [
          { name: 'Send a Request', text: 'A pre-filled message template that only requires a quick time adjustment.',
            src: crop('29', 354), alt: 'A request card: Hi, shall we get coffee together at 3 pm today, with Send.' },
          { name: 'Accept or Decline', text: 'Simple accept or decline buttons avoid the need for long replies.',
            src: crop('29', 792), alt: 'A chat with the request, and Accept or Decline buttons.' },
          { name: 'Plan Made', text: 'An accepted invitation goes straight to the calendar.',
            src: crop('29', 1230), alt: 'Jessica accepted your invitation, 3 pm today, with Add to calendar.' },
        ],
      },
    },
    {
      key: 'badges',
      name: 'Badges and Patches',
      /* sq, two passages joined and lightly condensed. */
      body: 'Earning a first badge at orientation bingo introduces students to the physical patch element of the ecosystem and inspires a collection throughout the year. Each badge, earned by doing something together with another SomeBuddy, can be customized in color, text, shape, and type color.',
      media: {
        stills: [
          { type: 'video', key: 'sb-customize-motion', alt: 'Customizing a badge’s color, font, and shape in the app.' },
          { key: 'sb-badges', alt: 'Six embroidered badges and a backpack wearing them.' },
          { key: 'sb-app-customize', alt: 'Badge customization: color, font, shape, and type color.' },
        ],
      },
    },
    {
      key: 'bingo',
      name: 'Bingo Cards',
      /* sq, verbatim but for typos (“or and”, “the own”, “social moment”). */
      body: 'The bingo card started as our Orientation Bingo Card, and students can keep the fun going by joining new cards organized by theme, like outdoor, thrifting, or food. They can create their own custom card, set their own challenges, and share it with others. It’s a light, playful way to turn everyday activities into social moments.',
      media: {
        stills: [
          { type: 'video', key: 'sb-bingo-motion', alt: 'A bingo card filling in, then shuffling into a new card.' },
          { key: 'sb-app-bingo', alt: 'The badge collection, a bingo card, a shuffled card, and themes to create a new one.' },
        ],
      },
    },
    {
      key: 'video',
      name: 'The Concept Video',
      /* PROVISIONAL, from sq's timeline (week 4: “Video Script/Story
         Board”; week 5: “Animation, Video Editing”) and med (the full
         2:55 video on YouTube). Hers to rewrite. */
      body: 'We scripted and storyboarded the concept video in week four, then animated and edited it for the final presentation. The full video runs 2:55.',
      media: {
        stills: [
          { type: 'video', key: 'sb-social-solo', alt: '“Social” and “solo” in kinetic type, then “Spontaneous. Simple. Social.”' },
          { type: 'video', key: 'sb-campus-collage', alt: 'Students cut out in brand colors over the campus and the Pittsburgh skyline.' },
          { type: 'video', key: 'sb-backpack-collage', alt: 'A backpack gains a SomeBuddy patch, then a crowd of students in brand colors.' },
        ],
      },
    },
    {
      key: 'research',
      /* FS346: the process chapter, steps from sq's five one-week phases */
      chapter: {
        kicker: 'Five weeks · Spring 2025',
        title: 'The Process',
        line: 'Four steps, from the first interviews to the final brand.',
        steps: [
          { key: 'research', when: 'Weeks 1–2', name: 'Research', outcome: 'Eight interviews and five design principles.' },
          { key: 'synthesis', when: 'Week 2', name: 'Synthesis', outcome: 'Three personas and two user flows.' },
          { key: 'testing', when: 'Week 4', name: 'Testing', outcome: 'Speed dating the concept with classmates.' },
          { key: 'brand', when: 'Weeks 3–4', name: 'Brand Identity', outcome: 'A bright, soft, welcoming brand.' },
        ],
      },
      step: 'Step 1 · Weeks 1–2',
      name: 'Research',
      /* sq “Concept”, trimmed: the pivot the research forced */
      takeaway: 'Research changed the concept: what grad students want varies greatly with their schedule, workload, and interests.',
      /* sq “Research”, condensed */
      body: 'We began with a service design approach, mapped the ecosystem of social isolation at CMU to surface our own assumptions, and conducted eight interviews with grad students.',
      layout: 'half',
      list: {
        /* sq, verbatim */
        label: 'Design principles',
        items: [
          'Support Spontaneity: Enable last-minute plans with minimal friction.',
          'Simplify Coordination: Make scheduling and connecting feel effortless.',
          'Normalize Low-Stakes Interaction: Encourage casual, drop-in-style meetups.',
          'Accommodate Exhaustion: Make participation time-efficient for busy students.',
          'Avoid Awkwardness: Set clear expectations to reduce social pressure.',
        ],
      },
      media: {
        photos: [
          { key: 'sb-ecosystem-map', alt: 'The ecosystem map of social isolation at CMU, beside our assumptions about it.' },
          { key: 'sb-what-we-heard', alt: 'Three things grad students told us, from busy schedules to fragmented clubs.' },
        ],
      },
    },
    {
      key: 'synthesis',
      step: 'Step 2 · Week 2',
      name: 'Synthesis',
      /* sq, trimmed */
      takeaway: 'Three personas, and one stance: a flexible solution simple enough to work for all of them.',
      body: 'We combined what we heard into three user categories: the Logistical Taskmate, the Casual Connector, and the Friendship Seeker. Our professors encouraged us to take a strong stance rooted in research, which meant simplifying a flexible solution that worked for very different users. Then we mapped how a student would discover the app, get onboarded, and keep using it.',
      media: {
        stills: [
          { key: 'sb-persona-taskmate', alt: 'Persona: the Logistical Taskmate, who wants spontaneous help getting things done.' },
          { key: 'sb-persona-connector', alt: 'Persona: the Casual Connector, who wants low-effort company amid a busy schedule.' },
          { key: 'sb-persona-seeker', alt: 'Persona: the Friendship Seeker, who wants depth but struggles to find the time.' },
          { key: 'sb-user-flow-1', alt: 'The user flow from discovering the app at orientation to completing bingo with others.' },
          { key: 'sb-user-flow-2', alt: 'The user flow for sustained use: badges, partnered events, and re-engagement.' },
        ],
      },
    },
    {
      key: 'testing',
      step: 'Step 3 · Week 4',
      name: 'Testing',
      /* med, trimmed */
      takeaway: 'Speed dating showed what was working and where to expand: trust, connection, and adaptability.',
      body: 'We tested the ecosystem through storyboards and speed dating with classmates. Classmates asked how trust fits in, how to learn about people before meeting, and what happens if you don’t wear patches.',
      layout: 'half',
      media: {
        photos: [
          { key: 'sb-feedback-photos', alt: 'Speed-dating the concept with classmates.' },
          { key: 'sb-feedback-asks', alt: 'What classmates asked: how trust fits in, and what if you don’t wear patches?' },
        ],
      },
    },
    {
      key: 'brand',
      step: 'Step 4 · Weeks 3–4',
      name: 'Brand Identity',
      /* med + sq, wording hers */
      takeaway: 'Class feedback confirmed that a bright, exciting, soft, and welcoming brand fit best.',
      body: 'Users told us trust and CMU verification mattered, so we first tried colors adjacent to the CMU brand, alongside palettes that could feel inviting but also academic. The logo plays with language and shapes to convey that SomeBuddy helps you find and message fellow students, and the Quicksand typeface softens the intensity of the color palette.',
      notes: [
        /* med, verbatim */
        { label: 'The logo', text: 'The smile lets you know it is safe and friendly, while the shapes draw you in from afar.' },
        /* med, lightly trimmed */
        { label: 'CMU references', text: 'The badge illustrations tie in CMU references through a straightforward and approachable illustrative style.' },
      ],
      media: {
        stills: [
          { type: 'video', key: 'sb-logo-motion', alt: 'The SomeBuddy logo animation: the speech-bubble D drops in and smiles.' },
          { key: 'sb-color-theory', alt: 'Color and logo explorations, from CMU-adjacent to bright.' },
          { key: 'sb-brand-feedback', alt: 'Crit notes: the CMU brand may not feel inviting enough; try brighter colors; refine the logo.' },
          { key: 'sb-brand', alt: 'The final brand: logo lockups, flower marks, the palette, and the BINGO bar.' },
          { key: 'sb-type-color', alt: 'Quicksand for display, SF Pro for body, and four color ramps.' },
          { key: 'sb-badge-art', alt: 'The badge illustrations, with CMU references like the Scottie dog.' },
        ],
      },
    },
  ],

  /* REFLECTION. Sense is PROVISIONAL, from the team's own lessons in sq and
     med; Weave has no source at all; Shape is sq's “if we had more time”. */
  reflection: [
    {
      id: 'sense', verb: 'Sense', title: 'What I learned',
      shift: ['Open Mind', 'Strong Stance'],  /* PROVISIONAL, from the two sq lines below */
      list: [
        /* sq “Timeline + Process” */
        { head: 'Let Research Lead', text: 'Our professors encouraged us to keep our minds open and let the solution come directly from the research.' },
        /* sq, after the personas */
        { head: 'Take a Stance', text: 'A strong stance rooted in research meant simplifying a flexible solution that worked for very different users.' },
        /* med, after speed dating */
        { head: 'Build In Trust', text: 'Speed dating with classmates showed where to expand: trust, connection, and adaptability.' },
      ],
    },
    {
      id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
      shift: ['[From]', '[To]'],
      list: [
        { head: '[Two Words]', text: '[LORIN TO WRITE: what you took from SomeBuddy into later work]' },
      ],
    },
    {
      id: 'shape', verb: 'Shape', title: 'What’s next',
      shift: ['Concept', 'Prototype'],  /* PROVISIONAL */
      list: [
        /* sq “Outcomes”, the one sentence, split three ways */
        { head: 'Co-Design More', text: 'Host more co-design workshops and conduct more interviews with grad students.' },
        { head: 'Test Activities', text: 'Test the activities themselves, so the bingo cards and meetups prove out in practice.' },
        { head: 'Build It', text: 'Collaborate with developers to prototype the app.' },
      ],
    },
  ],

  /* CREDITS: one column each (med, sq). */
  credits: [
    ['Design Team', 'Lorin Anderberg, Yaezi Lee, Rui Ying'],
    ['Instructors', 'Ashley Deal and Raelynn O’Leary, CMU MA in Design, Studio II: Introduction to IXD'],
    ['Image Credits', 'Icons from SVG Repo; images from Unsplash and CMU'],
  ],
}

export default somebuddy
