/* FS393: the 17 old-site projects with Claude's tier picks, for Lorin to
   choose what goes in the Playground. `line` is her own words, verbatim from
   the scraped pages (docs/case-study-editorial/sources/squarespace-full);
   `why` and `flag` are Claude's notes. Years: stated where her page states
   one, otherwise the program, so nothing is guessed. */

export const TIERS = [
  {
    id: 'a',
    name: 'A · Put it in',
    note: 'Recent, made by your hands, and each one widens the read on you in a direction the five case studies don’t already cover: data, motion, interaction, print, photography.',
  },
  {
    id: 'b',
    name: 'B · Your call',
    note: 'Real work with a real reason to include it, and one reason to hesitate. Each would be a light sheet, never a full case study.',
  },
  {
    id: 'c',
    name: 'C · Leave out, or fold into one tile',
    note: 'Earlier media and marketing work. Six separate tiles would tilt the page toward your pre-design career. The alternative: one “Before design school” tile that tells the storytelling-to-research arc in a single bento.',
  },
]

export const ITEMS = [
  // A
  {
    slug: 'days100', tier: 'a', title: '100 Days of Grad School Emotions',
    kind: 'Data visualization', when: 'CMU · Visual Communications Studio · Fall 2024',
    url: '/projects/100daysoffeelings',
    line: 'Track my emotions every day for 100 days and create an abstract watercolor illustration that geometrically represents the data.',
    why: 'The strongest playground piece on the old site. Handmade data, on your core subject (feeling), with a process you can show in one bento: spreadsheet, pencil, watercolor, the full grid of 100.',
    flag: 'The screen recording is on the LaCie (_100 Days_Project_1).',
  },
  {
    slug: 'animation', tier: 'a', title: 'United Nations Animation (Rewiring America)',
    kind: 'Animation', when: 'CMU · Visual Communications Studio · 2024',
    url: '/projects/rewiring-america-animation',
    line: 'With sound as my guiding force, I aimed to engage the viewer’s body and emotions.',
    why: 'The only finished animation with a story arc. Bridging proved motion is one of your strongest skills; this lets it stand on its own. The tile can play muted; the sheet plays with sound.',
    flag: 'Its three videos are Squarespace blobs: the original export is needed (LaCie or YouTube).',
  },
  {
    slug: 'selfcare', tier: 'a', title: 'Self-Care Mode',
    kind: 'Interaction design', when: 'CMU · 2025',
    url: '/projects/selfcare',
    line: 'A configurable notification control that gently encourages spending time away from screens by locking you out of apps that are distracting and addictive.',
    why: 'Small, finished, and charming: the heart you color in to unlock a break. It shows interaction craft (affordances, signifiers) that the research-heavy case studies don’t get room for.',
    flag: 'Two prototype videos are Squarespace blobs; the Figma prototype can be re-recorded.',
  },
  {
    slug: 'poster', tier: 'a', title: 'Amnesty International',
    kind: 'Poster series', when: 'CMU · Visual Communications Studio · 2024',
    url: '/projects/poster',
    line: 'Design a series of three posters communicating Amnesty International’s mission and core issue areas to inspire public engagement.',
    why: 'Pure visual design, and it reads in two seconds. The three finals as a triptych, with the sketches behind them, is a complete tile.',
    flag: 'Final PDFs and sketches are on the LaCie (_Poster_Project_2), so the tiles can be crisp.',
  },
  {
    slug: 'photography', tier: 'a', title: 'HUMANS/NATURE',
    kind: 'Photography', when: 'Ongoing, solo',
    url: '/projects/photography',
    line: 'This collection of my photography showcases how I use photography as a medium for meditation.',
    why: 'Your eye, outside of any brief, and tied to mindfulness, so it isn’t off-topic. 155 photos is far too many: a tight edit of about twelve.',
    flag: 'You choose the twelve. That’s an editing call only you can make.',
  },
  {
    slug: 'zine', tier: 'a', title: 'Seeds of Transformation',
    kind: 'Zine · print', when: 'CMU · Design Minds Seminar · 2025',
    url: '/case-studies/zine',
    line: 'An Interactive Zine Exploring My Design Principles, Inspired by Community Wisdom',
    why: 'A made object, and it states your design principles. It earns a tile here and a link from About; the flip-through could reuse the GAP Guide pamphlet viewer.',
    flag: null,
  },

  // B
  {
    slug: 'mindfulnest', tier: 'b', title: 'MindfulNest',
    kind: 'UX research · design', when: 'CMU CREATE Lab, Robotics Institute · 2025',
    url: '/case-studies/mindfulnest',
    line: 'I contributed wireframes to improve the back-end teacher experience of the MindfulNest app’s dashboard.',
    why: 'Real lab, real client, educator feedback workshops: it backs up your research credentials more than any studio project. The hesitation is that it’s wireframes for someone else’s app.',
    flag: 'Confirm the CREATE Lab is fine with the screens being public. Figma file + feedback PDFs are on the LaCie.',
  },
  {
    slug: 'heirloom', tier: 'b', title: 'Heirloom',
    kind: 'Design sprint concept', when: 'LUMA Institute certification · before CMU',
    url: '/case-studies/heirloom',
    line: 'A Design Sprint Concept for an Empathetic Tool to Support End-of-Life Logistics',
    why: 'Your first design project, and it’s about end-of-life care: the seed of Mortality Commons. As an origin story it’s meaningful; as craft it’s your earliest work.',
    flag: 'Worth it only if the tile says “where this started.” Otherwise it reads as junior.',
  },
  {
    slug: 'untangle', tier: 'b', title: 'Untangling Anxiety',
    kind: 'Game concept', when: 'Power Point Party · 2025', fit: 'contain',
    url: '/projects/untangle',
    line: 'This is the early stage concept of a game that I am iterating on to help untangle overwhelm.',
    why: 'Deeply on-thesis (IFS, somatic practice, your mom’s list). It would be an A, except for the art.',
    flag: 'Your page credits the art as “Pinterest (unknown).” Unlicensed art can’t go on the new site; it needs your own illustrations or placeholder cards first.',
  },
  {
    slug: 'homi', tier: 'b', title: 'Homi',
    kind: 'App concept', when: 'CMU · Intro to Prototyping',
    url: '/case-studies/homi',
    line: 'A Concept for a Social App Designed to Connect Future Roommates Over Shared Values',
    why: 'Solid team work, but it overlaps SomeBuddy almost exactly: same teammates (Yaezi, Rui), same student-life app shape. A second one dilutes the first.',
    flag: 'Screen recordings are on the LaCie if you want it.',
  },
  {
    slug: 'lamp', tier: 'b', title: 'Lamp Design',
    kind: 'Physical prototyping', when: 'CMU · Intro to Prototyping',
    url: '/projects/lamp',
    line: 'Make a lamp from scratch using one soft and one hard material.',
    why: 'The only physical, fabricated object on the site. As a single tile it says “I make things,” which a playground should. It doesn’t need a sheet: a tile that opens to the bento is enough.',
    flag: null,
  },

  // C
  {
    slug: 'cuba', tier: 'c', title: 'Cuba Creatives',
    kind: 'Interactive iPad publication', when: 'University of Oregon · 2015',
    url: '/case-studies/cuba',
    line: 'As co-lead designer on University of Oregon SOJC’s inaugural immersive journalism study abroad trip, I helped launch a student-led creative agency that produced this interactive iPad publication.',
    why: 'The best of the early work (co-lead, press coverage). If anything from before CMU appears, this is the lead image of the “Before design school” tile.',
    flag: null,
  },
  {
    slug: 'ormag', tier: 'c', title: 'OR Magazine',
    kind: 'Interactive journalism', when: 'University of Oregon · 2015',
    url: '/projects/ormag',
    line: 'Guided by the principles of solutions journalism, students act as a self-governed interactive news publication.',
    why: 'The same story as Cuba Creatives, told less fully. Fold it in.',
    flag: null,
  },
  {
    slug: 'nyartists', tier: 'c', title: 'Artists of New York',
    kind: 'Videography', when: 'NYC, pre-grad',
    url: '/projects/nyartists',
    line: 'A series of collaborations with New York artists where I offered my videography, editing, and art direction skills to help them achieve a goal.',
    why: 'Interstice (the hand-gesture interviews) is genuinely research-like. The rest is client video. Fold Interstice in; leave the others.',
    flag: 'Its videos are on Vimeo, so they survive the old site.',
  },
  {
    slug: 'wtbd', tier: 'c', title: 'Where There Be Dragons',
    kind: 'Content marketing', when: 'Professional, pre-grad',
    url: '/projects/wtbd',
    line: 'My challenge was to humanize the brand and create an approachable, Gen Z–friendly digital presence.',
    why: 'Professional marketing work. It answers “what did you do before?” but that’s a résumé and About question, not a playground one.',
    flag: null,
  },
  {
    slug: 'fgd', tier: 'c', title: 'Field Guide Designs',
    kind: 'Content marketing', when: 'Professional, pre-grad',
    url: '/projects/fgd',
    line: 'As a marketing assistant, I coordinated social media, blogs, and newsletters.',
    why: 'Same as Dragons: résumé, not playground.',
    flag: null,
  },
  {
    slug: 'o2', tier: 'c', title: 'O2 Magazine',
    kind: 'Print layout', when: 'University of Oregon · 2016',
    url: '/projects/o2',
    line: 'A student-run University of Oregon outdoor magazine',
    why: 'Four images of student layouts. The thinnest item on the old site.',
    flag: null,
  },
]
