/**
 * Bridging the G.A.P. — folder sheet copy (FS300), built from the template.
 *
 * SOURCES, so every line has a receipt:
 *   · "md" = her Medium article, verbatim
 *     (docs/case-study-editorial/sources/bridging-the-gap/medium.md).
 *   · "sq" = her old Squarespace page (same folder, squarespace.md).
 *   · "cp" = content/projects/bridging-the-gap.md.
 *   · "deck" = the team's presentation slides in Cloudinary (BTG_*).
 * No interview or hiring-manager answers exist for this project.
 *
 * Copy is hers, selected and trimmed under the standing copy rule (her
 * draft is the source; Claude refines it). Typos fixed silently: “milage”
 * → mileage, “is sold is” → sold in, “mock ups” → mockups, “Kamoot” →
 * Komoot, “FarOur” → FarOut. Lines marked PROVISIONAL are assembled from
 * her sources for this sheet and are hers to rewrite.
 *
 * Media keys: BG_IMAGES in content/sheets/media/bridging-the-gap.js; the
 * videos use the existing HOME_VIDEOS keys. The app screens are cropped
 * live from her deck slides (crop() below), nothing new uploaded.
 *
 * THE SHAPE (FS347, the BirthStory/SomeBuddy bar): the deliverables map
 * as the overview; the five deliverables, the app as four annotated
 * screens with HER deck annotations verbatim (BTG_47–50); then The
 * Process: Field Research (words left, photos right), Synthesis, and
 * Iteration and Feedback. Behind-the-scenes gallery folded into the steps.
 *
 * SETTLED 2026-10-04 (FS370 decision queue): 5 weeks, Fall 2024 (D23);
 *   the logo animations are hers (D24); signage, mural, and apparel were
 *   collaborative, so no individual line (D25); she took the guide and app
 *   photos (D26); no What's next card (D27).
 */

/* one phone's display, cut from a deck slide just inside the slide's own
   silver frame and bezel (FS356, measured per slide; the slides differ in
   size), so the sheet's iPhone is the only frame */
const crop = (id, x, y, w, h) => `https://res.cloudinary.com/dc17mvdyv/image/upload/c_crop,x_${x},y_${y},w_${w},h_${h}/f_auto,q_auto,w_600/${id}`

export const bridgingTheGap = {
  /* FS347: the brand's own colors (mint, blue, navy) for the bands, and
     mint, sun, coral for the step tiles (from the style guide, BTG_29) */
  band: 'linear-gradient(126deg, #a8ecd0 0%, #9dbcf7 50%, #1c2f6e 100%)',
  tiles: ['#7FE0B5', '#F6DD77', '#F48B6E'],
  /* FS356: the app's phones on the deck's own navy, not the washed band */
  screenBand: 'linear-gradient(126deg, #24397f 0%, #1c2f6e 50%, #15235a 100%)',

  /* sq, verbatim. The only stated outcome; there is no client (a class
     brief), and the GAP association conversation was research, not a
     commission. */
  outcome:
    'We received feedback that this was one of the best projects this professor had seen for this assignment, as well as positive impressions from our audience.',

  /* FS380/FS381 (2026-10-04): the brand first, animating (her strongest
     work), then the guide as a product shot, the signage, and the app's
     GPS, not the selfie frames (“a minor function”). */
  prints: [
    { key: 'bridging-default', type: 'video', caption: 'The Brand', alt: 'The Bridging the GAP logo animating in, the river wave drawing through the letters.' },
    { key: 'bg-guide-product', caption: 'The GAP Guide', alt: 'The folded GAP Guides standing on a ledge.' },
    { key: 'bg-sign-trail', caption: 'Signage', alt: 'The trail sign and a painted mileage line on a park path.' },
    { key: 'bg-print-gps', caption: 'The App', src: 'https://res.cloudinary.com/dc17mvdyv/image/upload/c_crop,x_1500,y_830,w_3120,h_3120/f_auto,q_auto,w_1000/BTG_48',
      alt: 'The app’s GPS on the ride: three miles to the next stop, and the trip so far.' },
  ],

  meta: [
    /* sq opening + md Approach, joined. PROVISIONAL assembly, her words. */
    /* FS382: the professor is Brett Yasko */
    ['Context', ['Visual Communications Studio at', 'Carnegie Mellon, taught by Brett Yasko:', 'a rebrand proposal for the Great', 'Allegheny Passage, a 150-mile trail', 'from Pittsburgh to Cumberland, MD.']],
    /* cp + sq, her line */
    ['Role', 'UX Research, Brand Identity, Animation'],
    /* md Team */
    /* FS385: who made what */
    ['Collaborators', ['Michael Juan: guide illustrations, icons;', 'Rui Ying: app UX/UI']],
    /* cp */
    ['Tools Used', 'Figma, Adobe Illustrator, After Effects'],
    /* md Duration; phases from sq (Ideation, Research/Synthesis, Concept,
       Refinement, Presentation). See the duration conflict above. */
    /* D23, her pick (2026-10-04): 5 weeks, Fall 2024 (her old site, three
       times; file dates Nov 2024) */
    ['Timeline', ['5 weeks, Fall 2024', 'Ideation, Research and Synthesis, Concept, Refinement, Presentation']],
  ],

  frame: {
    /* cp Tension + HMW (also sq Design Challenge), verbatim. */
    /* FS383: copy-edited for a clean rag (“experience barriers to
       experiencing” → face barriers to enjoying it) */
    why: 'Pittsburgh has a large, transient student population, and most residents don’t know the GAP trail or face barriers to enjoying it. How might we rebrand the trail to feel accessible and inviting to people with little experience in nature?',
    /* md Field Research, trimmed. */
    research: 'We drove out to Ohiopyle, the trail’s most popular trail town, to observe signage and talk to people on the trail, and spoke to 30 friends, family members, and CMU students about bike touring. Only one said they were not interested at all.',
  },

  /* THE OVERVIEW (FS347): what the research said each deliverable had to
     do, as her own map (BTG_17). Intro: md Reflection's deliverables list,
     verbatim in substance, set as one sentence. */
  system: {
    kicker: 'The System',
    label: 'Four Deliverables, One Journey',
    intro: 'Our research led us to four main deliverables, each with a job along a rider’s journey: apparel for awareness and nostalgia; signage and a trail mural for awareness and wayfinding; the GAP Guide pamphlet for awareness, education, and initiation; and the GAP Map App as trip planner, tool, education, and community.',
    media: {
      stills: [
        { key: 'bg-deliverables', alt: 'Each pain point mapped to the deliverables: apparel, signage, the GAP Guide, and the GAP Map App.' },
        { key: 'bg-pain-points', alt: 'Three kinds of pain points: awareness, logistics, and knowledge.' },
      ],
    },
  },

  /* THE WORK. Ordered by sq: “we focused our attention on the most
     important assets, the brand and the app”, then the supporting pieces.
     Bodies are md, trimmed; `mine` is sourced where she said what she did,
     and [LORIN TO WRITE] where no source does. */
  components: [
    {
      key: 'brand',
      name: 'The Brand',
      /* FS384: her strongest work, shown whole: every logo animating at
         once, with the style guide, instead of one at a time behind arrows.
         Body: sq Concept + md brand paragraph, verbatim. */
      body: 'The campaign is called “Bridging the GAP,” referring to the knowledge gap between Pittsburgh residents and the Great Allegheny Passage Trail Association. I started crafting logo ideas that would incorporate movement and biking. We chose the National Park typeface, and I manually manipulated the letters to get a rounded shape with additional features. I also explored bridge and river shapes to bring home the metaphor.',
      mine: 'The brand identity and every logo animation: the concepts, the hand-shaped lettering from the National Park typeface, and the bridge and river forms.',
      wide: true,
      media: {
        cols: 4,
        bento: [
          { type: 'video', key: 'bridging-default', span: 'big', fit: 'contain', ground: '#152b5c', label: 'Primary lockup', alt: 'The Bridging the GAP logo animating in, the river wave drawing through the letters.' },
          { type: 'video', key: 'bridging-gap-logo', span: 'wide', fit: 'contain', ground: '#152b5c', label: 'The GAP mark', alt: 'The GAP mark drawing itself, each letter ending in an arrow.' },
          { type: 'video', key: 'bridging-logos-2', fit: 'contain', ground: '#152b5c', label: 'Stacked lockup', alt: 'The stacked Bridging the GAP lockup animating in.' },
          { type: 'video', key: 'bg-logos-4', fit: 'contain', ground: '#ffffff', label: 'On light', alt: 'The Great Allegheny Passage wordmark animating on white.' },
          { type: 'video', key: 'bridging-logos-3', span: 'wide', fit: 'contain', ground: '#152b5c', label: 'Wordmark', alt: 'The Great Allegheny Passage wordmark, its G, A, and P as trail arrows.' },
          { key: 'bg-style-guide', span: 'wide', fit: 'contain', ground: '#ffffff', label: 'Style guide', alt: 'The style guide: logos, merch, colors, fonts, and graphics.' },
        ],
      },
    },
    {
      key: 'app',
      name: 'GAP Map App',
      /* md app paragraph + its feature list, trimmed into one sentence. */
      body: 'The GAP Map App is an all-in-one trip planner, GPS map, and playful interactive experience that makes enjoying the GAP trail easier for everyone: a customizable trip planner, GPS with highlighted attractions and an optional historical audio tour, packing lists and suggested itineraries, and a selfie feature that compiles photos from the trip.',
      /* md, verbatim but for the “I”: “Rui did an amazing job owning this
         deliverable and making beautiful prototypes. I designed the selfie
         slides and collaborated on the features.” */
      /* FS303 notes: md deliverables list (“Gap Map App (trip planner,
         tool, education, community)”) and md Market Research, verbatim
         but for “All Trails” → AllTrails and the typos noted above. */
      mine: 'The selfie slides, and collaboration on the features.',
      /* FS385 */
      credit: 'App UX/UI design by Rui Ying.',
      /* FS347: four screens, each named with her annotation from the
         deck (BTG_47–50), verbatim; the line under each is md's feature
         list, verbatim but for typos. */
      media: {
        screens: [
          { name: 'Customized trip planner', text: 'Addresses questions about distance, elevation, difficulty level, and lets users choose routes that feature attractions they are interested in.',
            src: crop('BTG_47', 1825, 750, 1118, 2420), alt: 'The trip planner: duration, distance, elevation gain, difficulty, attractions, and sleeping type.' },
          { name: 'Motivational messages', text: 'GPS with highlighted attractions, alerts for local riders, and an optional historical audio tour.',
            src: crop('BTG_48', 1579, 891, 1379, 2985), alt: 'On the ride: “3 miles to next stop, Keep Going!” over the trail map.' },
          { name: 'In-app selfies', text: 'In-app selfies encouraged throughout your trip + compiled at the end.',
            src: crop('BTG_49', 1090, 469, 908, 1963), alt: 'A rider’s selfie in a playful GAP frame.' },
          { name: 'Mileage earns you merch!', text: 'Apparel can be won by trail users who use the GAP Map App to log miles on the trail.',
            src: crop('BTG_50', 5814, 891, 1398, 3020), alt: '32.6 miles: keep going, 27.4 miles to the gift, with the merch to claim.' },
        ],
      },
    },
    {
      key: 'guide',
      name: 'The GAP Guide',
      /* md Challenges paragraph + its features list, and the deck's
         contents slide (BTG_37), trimmed. */
      body: 'The GAP Guide serves as an informative overview of the trail, inviting beginners to explore the GAP Map App and learn about bike touring, with recommended itineraries, an overview of trail attractions, a visual packing list, and an FAQ about bike touring.',
      /* md image 44 caption, her words, recast without “I” */
      mine: 'The first iteration of the sticker badges: trail attractions as a passport-style checklist.',
      /* FS385 */
      credit: 'Bike gear illustrations and icons by Michael Juan.',
      wide: true,
      /* FS386: the guide itself, foldable and flippable, built from the
         fourteen final panels (Figma frames, her LaCie). Names and alts
         are what each panel says. */
      media: {
        exhibit: 'pamphlet',
        data: {
          gearLabel: 'Gear side',
          routeLabel: 'Route side',
          gear: [
            { key: 'bg-pam-gear-1', name: 'Gear Guide', alt: 'Gear Guide: an illustrated packing list, from helmet to sleeping bag.' },
            { key: 'bg-pam-gear-2', name: 'FAQ', alt: 'FAQ: what the GAP is, whether you can tour with no experience, and what the GAP Map App does.' },
            { key: 'bg-pam-gear-3', name: '2 Days', alt: '2 Days: Connellsville to Cumberland, 88 miles, 3,000 feet of climb.' },
            { key: 'bg-pam-gear-4', name: '3 Days', alt: '3 Days: Confluence to West Newton, 53 miles, 1,000 feet of climb.' },
            { key: 'bg-pam-gear-5', name: '4 Days', alt: '4 Days: Paw Paw to Shepherdstown, 73 miles, 350 feet of climb.' },
            { key: 'bg-pam-gear-6', name: '5 Days', alt: '5 Days: Pittsburgh to Cumberland, 150 miles, 4,000 feet of climb.' },
            { key: 'bg-pam-gear-7', name: 'Cover', alt: 'The cover: the stacked Bridging the GAP logo on navy.' },
          ],
          route: [
            { key: 'bg-pam-route-1', name: 'Discover', alt: 'Bridging the GAP: Discover the Joy of Bike Touring the Great Allegheny Passage!' },
            { key: 'bg-pam-route-2', name: 'GAP Trail Guide', alt: 'GAP Trail Guide: tailor the ride to your taste, and download the GAP Map App.' },
            { key: 'bg-pam-route-3', name: 'Pittsburgh to Homestead', alt: 'The route from Pittsburgh: Hot Metal Bridge, Borden Tunnel, Carrie Furnace.' },
            { key: 'bg-pam-route-4', name: 'West Newton', alt: 'The route past McKeesport and West Newton: Ferncliff Peninsula, Cucumber Falls, Falling Water.' },
            { key: 'bg-pam-route-5', name: 'Rockwood', alt: 'The route through Rockwood: Pinkerton Tunnel, Gateway Arch, Bollman Bridge.' },
            { key: 'bg-pam-route-6', name: 'To Cumberland', alt: 'The route to Cumberland: Red Falls, the river, Mason and Dixon Lane.' },
            { key: 'bg-pam-route-7', name: 'Know Before You Go', alt: 'Know Before You Go: learn, prepare, ride, joy.' },
          ],
        },
      },
    },
    {
      key: 'signage',
      name: 'Signage and Trail Mural',
      /* md signage paragraph, trimmed; “milage” → mileage. */
      body: 'We explored physical signage and asphalt murals as branded wayfinding, to build awareness of trail attractions and educate trail users in Pittsburgh, Maryland, D.C., and the trail towns along the path, with arrows and mileage for upcoming attractions and resources.',
      wide: true,
      /* FS387: the work first, in its setting, all at once; what the trail
         has now comes last, as context, not as the lead */
      media: {
        cols: 4,
        bento: [
          { key: 'bg-sign-trail', span: 'big', label: 'On the trail', alt: 'The trail sign and a painted mileage line on a park path.' },
          { key: 'bg-sign-render', span: 'tall', label: 'The sign', fit: 'contain', ground: '#f4f4f2', alt: 'The trail sign: campground, tunnel, and waterfall, each with its mileage.' },
          { key: 'bg-mural-overhead', span: 'tall', label: 'Asphalt mural', alt: 'The asphalt mural from above: waterfalls, trail towns, a historic landmark, and the tunnel ahead.' },
          { key: 'bg-trail-art-forest', span: 'wide', label: 'Forest stretch', alt: 'Painted mileage lines and the GAP star on a forest stretch of trail.' },
          { key: 'bg-field-mile-post', span: 'wide', focus: '50% 40%', label: 'What’s there now', alt: 'Context: the existing mileage post at Smithton, from our field research trip.' },
        ],
      },
    },
    {
      key: 'apparel',
      name: 'Apparel',
      /* md apparel paragraph, verbatim but for typos. */
      body: 'We applied our series of logos to apparel mockups and found a good use for the playful “GAP” road-shaped logo. This apparel can be won by trail users who use the GAP Map App to log miles on the trail, and is sold in trail towns.',
      wide: true,
      /* FS389: the set together, as a collection, not one piece at a time */
      media: {
        cols: 4,
        bento: [
          { key: 'bg-merch-bottle-lake', span: 'tall', label: 'On the trail', alt: 'A GAP sport bottle held up over the water.' },
          { key: 'bg-cut-tote', fit: 'contain', ground: '#7fe0b5', label: 'Tote', alt: 'The Bridging the GAP tote.' },
          { key: 'bg-cut-shirt', fit: 'contain', ground: '#f6dd77', label: 'Tee', alt: 'The white tee with the GAP road logo.' },
          { key: 'bg-cut-hat', fit: 'contain', ground: '#f48b6e', label: 'Cap', alt: 'A Great Allegheny Passage cap.' },
          { key: 'bg-cut-socks', fit: 'contain', ground: '#9dbcf7', label: 'Socks', alt: 'Socks patterned with the trail’s dashed road line.' },
          { key: 'bg-cut-bottle', fit: 'contain', ground: '#152b5c', label: 'Sport bottle', alt: 'The GAP sport bottle.' },
          { key: 'bg-cut-bottles', fit: 'contain', ground: '#eef3fb', label: 'Bottles', alt: 'GAP water bottles in the brand colors.' },
        ],
      },
    },
    {
      key: 'field-research',
      /* FS347: the process. Week labels: Medium gives 4 weeks with no
         per-phase dates, so steps are labeled by phase, not by week. */
      chapter: {
        kicker: 'Five weeks · Fall 2024',
        title: 'The Process',
        line: 'From the trail to the four deliverables, and the feedback that pulled them into one system.',
        steps: [
          { key: 'field-research', when: 'Step 1', name: 'Field Research', outcome: 'Ohiopyle, and 30 conversations about bike touring.' },
          { key: 'synthesis', when: 'Step 2', name: 'Synthesis', outcome: 'Personas and journeys, pain points to deliverables.' },
          { key: 'iteration', when: 'Step 3', name: 'Iteration and Feedback', outcome: 'One line-art style across every deliverable.' },
        ],
      },
      step: 'Step 1 · Research',
      name: 'Field Research',
      /* md Field Research, verbatim in substance */
      takeaway: 'Of 30 people we spoke to about bike touring the GAP, only one said they were not interested at all.',
      body: 'We drove out to Ohiopyle, the trail’s most popular trail town, to observe signage and speak to folks on the trail about bike touring. We also spoke to 30 friends, family members, and CMU students. This confirmed the potential that these solutions would be useful to our target users.',
      notes: [
        /* md Approach, trimmed */
        { label: 'The focus', text: 'The existing website and brand are good, so we narrowed our focus to bike touring the trail as a beginner.' },
      ],
      layout: 'half',
      media: {
        photos: [
          { key: 'bg-field-board', alt: 'At Ohiopyle: “What would get you to go bike touring?” on a board beside a loaded touring bike.' },
          { key: 'bg-field-bridge', alt: 'Riders crossing the trail bridge over the river at Ohiopyle.' },
          { key: 'bg-field-town-map', alt: 'Observing the existing signage: the Smithton town map and directory.' },
        ],
      },
    },
    {
      key: 'synthesis',
      step: 'Step 2 · Synthesis',
      name: 'Synthesis',
      /* md User Research, verbatim but for “user’s” */
      takeaway: 'We translated the most important pain points into key deliverables that would serve our users’ needs at every stage of their journey.',
      body: 'We developed personas and mapped out their journeys while planning a bike tour, to identify key pain points and opportunities for our deliverables to be positive interventions.',
      notes: [
        /* md Market Research, trimmed; names corrected */
        { label: 'Market research', text: 'We looked at AllTrails, Strava, Komoot, Trailforks, FarOut, and Gaia GPS, and decided to focus our efforts on playful design and customizable trip planning with strong imagery.' },
      ],
      media: {
        stills: [
          { key: 'bg-personas', alt: 'Personas, each with a goal, a challenge, and a job to be done.' },
          { key: 'bg-journey', alt: 'Journey maps from planning a bike tour through the ride and after.' },
          { key: 'bg-market', alt: 'Market research: what AllTrails, Strava, and Gaia GPS do well.' },
          { key: 'bg-what-would-help', alt: 'What would get people to go bike touring, from our interviews.' },
        ],
      },
    },
    {
      key: 'iteration',
      step: 'Step 3 · Refinement',
      name: 'Iteration and Feedback',
      /* FS391, her words */
      takeaway: 'One of the biggest challenges was finding a universal illustration style that worked for us as a team and for the product.',
      /* md Iterations and Feedback, verbatim */
      body: 'Each of us had a different illustration style and skill set. The main feedback was to get our style aligned and go for a line-art approach, and to make sure everything felt cohesive. Line art kept every deliverable in line with the logo, our true north.',
      /* FS390: “I did the brand iteration” */
      mine: 'The brand iteration, from hand-drawn lettering to lockup and wordmark explorations to the final logo system.',
      wide: true,
      /* FS390: her brand iteration first (hand lettering, then the digital
         explorations), then the team's: Rui's lo-fi wireframes, Michael's
         icon iterations, and her own unused stickers. The earlier
         iteration photos are retired. */
      media: {
        cols: 4,
        bento: [
          { key: 'bg-sketch-8', span: 'wide', label: 'Hand lettering', fit: 'contain', ground: '#fff', alt: 'Her hand-drawn lettering: the river running through BRIDGING THE GAP.' },
          { key: 'bg-sketch-7', span: 'wide', label: 'Hand lettering', fit: 'contain', ground: '#fff', alt: 'Her hand-drawn lettering: Bridging the GAP along a route line.' },
          { key: 'bg-lockups-explore', span: 'big', label: 'Lockup explorations', fit: 'contain', ground: '#fff', alt: 'Six Bridging the GAP lockups, exploring the river, the arrow, and color.' },
          { key: 'bg-wordmark-explore', span: 'tall', label: 'Wordmarks', fit: 'contain', ground: '#fff', alt: 'GAP and Great Allegheny Passage wordmark explorations.' },
          { key: 'bg-sketch-9', span: 'tall', label: 'The arrow letters', fit: 'contain', ground: '#fff', alt: 'Her hand-drawn GAP, each letter ending in an arrow.' },
        ],
        plus: {
          cols: 4,
          bento: [
            { key: 'bg-app-wireframes', span: 'wide', label: 'Rui’s lo-fi wireframes', fit: 'contain', ground: '#fff', alt: 'Rui Ying’s lo-fi wireframes for the GAP Map App.' },
            { key: 'bg-icons-3', label: 'Michael’s icons, early', fit: 'contain', ground: '#fff', alt: 'An early set of Michael Juan’s packing-list icons.' },
            { key: 'bg-icons-1', label: 'Michael’s icons, later', fit: 'contain', ground: '#fff', alt: 'A later, line-art set of Michael Juan’s packing-list icons.' },
            { key: 'bg-sticker-bike', span: 'wide', label: 'My unused stickers', fit: 'contain', ground: '#fff', alt: 'Her unused sticker: a bike with landscape wheels.' },
            { key: 'bg-sticker-bridge', fit: 'contain', ground: '#fff', alt: 'Her unused sticker: the trail bridge in an arch.' },
            { key: 'bg-sticker-river', fit: 'contain', ground: '#fff', alt: 'Her unused sticker: a waterfall in an arch.' },
          ],
        },
      },
    },
  ],

  /* REFLECTION: PROVISIONAL throughout. Every bullet is drawn from her
     words (source after each) except the two marked [LORIN TO WRITE]; the
     from-to shifts are Claude's, hers to rename. */
  reflection: [
    {
      id: 'sense', verb: 'Sense', title: 'What I learned',
      shift: ['Separate Styles', 'One System'],
      list: [
        /* sq + md Iterations and Feedback */
        { head: 'Unify the System', text: 'Our biggest takeaway was to unify our brand system. The main feedback was to align our styles and go for a line-art approach so everything felt cohesive.' },
        /* sq, verbatim */
        { head: 'Iterate Casually', text: 'If I could do it again, I would try to iterate more casually. I tend to need high-fidelity iterations to know if I like them or not.' },
        /* md Challenges */
        { head: 'Scope Down', text: 'We dropped the website’s trip planner to focus on the app, which was the right choice: our deliverables were robust enough as they were.' },
      ],
    },
    {
      id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
      shift: ['High Fidelity', 'Lo-Fi First'],
      list: [
        /* sq, verbatim */
        { head: 'Lo-Fi First', text: 'It would serve the process better if I could iterate in a quicker and more lo-fidelity way.' },
        /* md caption */
        { head: 'A True North', text: 'Line art kept every deliverable in line with the logo, which became our true north.' },
        /* md The Work + sq thanks */
        { head: 'Split by Strength', text: 'We split up the work to suit our skill sets, and our diverse skills and shared interests made for a stellar team.' },
      ],
    },
    /* D27 (2026-10-04, “Lets not mention anything”): no What's next card */
  ],

  /* BEHIND THE SCENES: folded into the process steps (FS347). */

  /* CREDITS: one column each. md Team + Class; sq Credits and thanks. */
  credits: [
    ['Design Team', 'Lorin Anderberg, Michael Juan, Rui Ying'],
    /* FS385 */
    ['Guide Illustrations and Icons', 'Michael Juan', 'join'],
    ['App UX/UI Design', 'Rui Ying', 'join'],
    ['Studio', 'CMU MA in Design, Visual Communications Studio I, taught by Brett Yasko'],
    /* sq “Big props to my teammates”, trimmed */
    ['With Thanks', 'To Michael, who hand illustrated the icon system and did a ton of work to align our illustration styles, and Rui, a Figma wizard who owned our app prototype.'],
    ['Resources', 'Unsplash images, Figma Community templates, Mr Mockup'],
  ],
}

export default bridgingTheGap
