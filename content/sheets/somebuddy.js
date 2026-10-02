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

export const somebuddy = {
  /* sq “Outcomes”, trimmed; the honest wording (no build or adoption). */
  outcome:
    'We presented the full vision to CMU’s Department of Student Affairs, and it was met with sincere interest, especially around bringing SomeBuddy into Fall 2025 orientation. No next steps have been taken yet.',

  /* Four prints for range: the brand, the orientation, the badges, the app.
     Captions and alts are furniture, hers to rewrite. */
  prints: [
    { key: 'sb-title', caption: 'The Brand', alt: 'The SomeBuddy wordmark, with a smiling speech bubble for the D.' },
    { key: 'sb-orientation', caption: 'Orientation Bingo', alt: 'Orientation banners, a hand holding the bingo card, and the BINGO booth.' },
    { key: 'sb-badges', caption: 'The Badges', alt: 'Six embroidered SomeBuddy badges and a backpack wearing them.' },
    { key: 'sb-app-match', caption: 'The App', alt: 'Posting an activity, filtering nearby buddies, and the map and list views.' },
  ],

  meta: [
    /* med “About”, verbatim */
    ['Context', 'Final project for the Carnegie Mellon School of Design MA Interaction Design Studio II, Spring 2025'],
    /* md + sq, her line */
    ['Role', ['UX/UI Design, UX Research,', 'Copywriting, Brand Identity']],
    /* med “Team” and “Class” */
    ['Collaborators', ['Yaezi Lee and Rui Ying, design team;', 'Ashley Deal and Raelynn O’Leary, instructors']],
    /* md + sq */
    ['Tools Used', 'Figma, After Effects, Adobe Illustrator'],
    /* sq “Timeline + Process”: five phases, one week each (Ideation,
       Research/Synthesis, Concept, Refinement, Presentation), grouped. */
    ['Timeline', ['Ideation and Research: Weeks 1⁠–⁠2', 'Concept and Refinement: Weeks 3⁠–⁠4', 'Presentation: Week 5']],
  ],

  frame: {
    /* sq “Design Challenge”, verbatim but for a comma before “which”. */
    why: 'Grad students seek connection but struggle to make plans due to hectic schedules, which can lead to feelings of isolation. How can we create easy, low-pressure ways for grad students to connect through simple activities, especially when it’s something they don’t want to do alone?',
    /* sq “Research”: the two interview findings, compressed. */
    research: 'Eight interviews with grad students showed that the connection they want depends on the activity: for errands or studying, almost anyone will do; for something personal like hiking, they want to know more first. Packed schedules make short, spontaneous meetups more appealing than long-term commitments.',
  },

  /* THE SYNTHESIS: sq's “this revealed a need…” paragraph is the bridge
     from research to ecosystem, and its “social-ish” is her name for the
     movement. The slides are from her Medium article. */
  system: {
    kicker: 'Synthesis',
    label: 'Social-ish',
    /* sq, verbatim but for “collectibles” (sq: “collectables”) */
    intro: 'The research revealed a need for opt-in, opt-out, low-stakes, and lightweight opportunities for connection that give the user autonomy to express their desired level of engagement. Our ecosystem involves a social app, branding, pop-up events, and collectibles that create a movement called “social-ish.”',
    media: {
      stills: [
        { key: 'sb-ecosystem-map', alt: 'The ecosystem map of social isolation at CMU, beside our assumptions about it.' },
        { key: 'sb-what-we-heard', alt: 'Three things grad students told us, from busy schedules to fragmented clubs.' },
        { key: 'sb-design-principles', alt: 'Five design principles: support spontaneity, low-effort coordination, low-pressure interactions, accommodate exhaustion, avoid awkwardness.' },
        { key: 'sb-persona-taskmate', alt: 'Persona: the Logistical Task Mate, who wants spontaneous help getting things done.' },
        { key: 'sb-persona-connector', alt: 'Persona: the Casual Connector, who wants low-effort company amid a busy schedule.' },
        { key: 'sb-persona-seeker', alt: 'Persona: the Friendship Seeker, who wants depth but struggles to find the time.' },
        { key: 'sb-user-flow-1', alt: 'The user flow from discovering the app at orientation to completing bingo with others.' },
        { key: 'sb-user-flow-2', alt: 'The user flow for sustained use: badges, partnered events, and re-engagement.' },
      ],
    },
  },

  /* THE ECOSYSTEM, in the order a student meets it (sq “The Ecosystem”:
     “from orientation to ongoing campus life through a layered social
     system of tasks, badges, and bingo”). Bodies are her copy, trimmed. */
  components: [
    {
      key: 'orientation',
      name: 'Orientation Bingo',
      /* sq, verbatim but for a comma after “orientation” */
      body: 'Students discover the SomeBuddy brand and app at CMU’s grad student orientation, where they play a game of bingo to get to know their new peers and add them as buddies within the app for future connection.',
      mine: '[LORIN TO WRITE: your part in the orientation touchpoints: the bingo card, banners, booth, and QR code]',
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
      /* sq, condensed from four paragraphs; wording hers. */
      body: 'Finding someone to do something with is fast and low-pressure. Instead of filling out a bunch of forms, students pick an activity, choose a general time and location, and post. The app surfaces nearby matches, filtered by distance, age, gender, and shared interests. They can send a request from a pre-filled template or chat first with conversation starters, and replies are simple accept or decline buttons.',
      mine: '[LORIN TO WRITE: your part in the app: flows, screens, the message templates]',
      media: {
        stills: [
          { key: 'sb-app-match', alt: 'Posting an activity, filtering potential buddies, and results in map and list views.' },
          { key: 'sb-app-chat', alt: 'A request sent from a template, a chat with conversation starters, and accept or decline.' },
        ],
      },
    },
    {
      key: 'badges',
      name: 'Badges and Patches',
      /* sq, two passages joined and lightly condensed. */
      body: 'Earning a first badge at orientation bingo introduces students to the physical patch element of the ecosystem and inspires a collection throughout the year. Each badge, earned by doing something together with another SomeBuddy, can be customized in color, text, shape, and type color, and the “My badge collection” page holds them all.',
      mine: '[LORIN TO WRITE: your part in the badges: the illustrations, the patches, the customization flow]',
      media: {
        stills: [
          { key: 'sb-badges', alt: 'Six embroidered badges and a backpack wearing them.' },
          { type: 'video', key: 'sb-customize-motion', alt: 'Customizing a badge’s color, font, and shape in the app.' },
          { key: 'sb-app-customize', alt: 'Badge customization: color, font, shape, and type color.' },
          { key: 'sb-badge-art', alt: 'The badge illustrations, with CMU references like the Scottie dog.' },
        ],
      },
    },
    {
      key: 'bingo',
      name: 'Bingo Cards',
      /* sq, verbatim but for typos (“or and”, “the own”, “social moment”). */
      body: 'The bingo card started as our Orientation Bingo Card, and students can keep the fun going by joining new cards organized by theme, like outdoor, thrifting, or food. They can create their own custom card, set their own challenges, and share it with others. It’s a light, playful way to turn everyday activities into social moments, and discover more SomeBuddies along the way.',
      mine: '[LORIN TO WRITE: your part in the bingo cards]',
      media: {
        stills: [
          { type: 'video', key: 'sb-bingo-motion', alt: 'A bingo card filling in, then shuffling into a new card.' },
          { key: 'sb-app-bingo', alt: 'The badge collection, a bingo card, a shuffled card, and themes to create a new one.' },
        ],
      },
    },
    {
      key: 'brand',
      name: 'Brand Identity',
      /* med + sq, three passages joined, wording hers. */
      body: 'We wanted the brand to feel bright, soft, and welcoming. The logo is simple and metaphorical, playing with language and shapes to convey that SomeBuddy helps you find and message fellow students; the smile lets you know it is safe and friendly. The Quicksand typeface is playful and eye-catching but also softens the intensity of the color palette.',
      mine: '[LORIN TO WRITE: your part in the brand: logo, type and color, illustrations]',
      media: {
        stills: [
          { type: 'video', key: 'sb-logo-motion', alt: 'The SomeBuddy logo animation: the speech-bubble D drops in and smiles.' },
          { key: 'sb-brand', alt: 'Logo lockups, flower marks, the palette, and the BINGO bar.' },
          { key: 'sb-type-color', alt: 'Quicksand for display, SF Pro for body, and four color ramps.' },
        ],
      },
    },
    {
      key: 'video',
      name: 'The Concept Video',
      /* No prose source: sq lists only “Video Script/Story Board” (week 4)
         and “Animation, Video Editing” (week 5). */
      body: '[LORIN TO WRITE: what the concept video shows and how it was made, in two or three sentences]',
      mine: '[LORIN TO WRITE: your part in the video: script, storyboard, animation, editing]',
      media: {
        stills: [
          { type: 'video', key: 'sb-social-solo', alt: '“Social” and “solo” in kinetic type, then “Spontaneous. Simple. Social.”' },
          { type: 'video', key: 'sb-campus-collage', alt: 'Students cut out in brand colors over the campus and the Pittsburgh skyline.' },
          { type: 'video', key: 'sb-backpack-collage', alt: 'A backpack gains a SomeBuddy patch, then a crowd of students in brand colors.' },
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

  /* BEHIND THE SCENES: research, then brand exploration. Most slides are
     from her Medium article. Deck slides, so kept whole. */
  processTitle: 'Behind the scenes',
  process: [
    {
      title: 'Research and Feedback',
      fit: 'contain',
      images: [
        { key: 'sb-research-question', alt: 'The research question.' },
        { key: 'sb-research-objectives', alt: 'Four research objectives, from activity types to companion levels.' },
        { key: 'sb-feedback-photos', alt: 'Speed-dating the concept with classmates.' },
        { key: 'sb-feedback-asks', alt: 'What classmates asked: how trust fits in, and what if you don’t wear patches?' },
      ],
    },
    {
      title: 'Brand Exploration',
      fit: 'contain',
      images: [
        { key: 'sb-moodboard', alt: 'The mood board.' },
        { key: 'sb-color-theory', alt: 'Color and logo explorations, from CMU-adjacent to bright.' },
        { key: 'sb-brand-feedback', alt: 'Crit notes: the CMU brand may not feel inviting enough; try brighter colors; refine the logo.' },
        { key: 'sb-badge-art', alt: 'The badge illustrations.' },
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
