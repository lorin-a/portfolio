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
 * OPEN, hers to settle (also in STATUS):
 *   · DURATION: Medium says 4 weeks; cp and Squarespace say 5 (and the
 *     Squarespace timeline lists five one-week phases). The sheet follows
 *     Medium, as asked, and lists the phases without week numbers.
 *   · Season and year are in none of the sources.
 *   · Who photographed the guide (the GAP_Pamphlet series) and the app
 *     shoot? No credit on file; the app-shoot files are named
 *     “Zo_Lorin_Anderberg”, which may name a photographer.
 *   · Her part in the Guide, Signage, and Apparel is not stated anywhere:
 *     Medium credits Michael with the pamphlet illustrations, icons, and
 *     signage, and Rui with the app; her stated parts are the brand
 *     identity, the first sticker badges, and the app's selfie slides.
 *   · Role says Animation, but no source says which animations are hers
 *     (the logo animations are assumed, not confirmed).
 */

/* one phone screen, cut from a deck slide (6182 × 3477) */
const crop = (id, x, y, w, h) => `https://res.cloudinary.com/dc17mvdyv/image/upload/c_crop,x_${x},y_${y},w_${w},h_${h}/f_auto,q_auto,w_600/${id}`

export const bridgingTheGap = {
  /* FS347: the brand's own colors (mint, blue, navy) for the bands, and
     mint, sun, coral for the step tiles (from the style guide, BTG_29) */
  band: 'linear-gradient(126deg, #a8ecd0 0%, #9dbcf7 50%, #1c2f6e 100%)',
  tiles: ['#7FE0B5', '#F6DD77', '#F48B6E'],

  /* sq, verbatim. The only stated outcome; there is no client (a class
     brief), and the GAP association conversation was research, not a
     commission. */
  outcome:
    'We received feedback that this was one of the best projects this professor had seen for this assignment, as well as positive impressions from our audience.',

  /* FS349: the cover pile is the four deliverables, one print each, in
     the order a rider meets them (the brand shows on every one; the logo
     animation opens Brand Identity). Captions and alts are furniture,
     hers to rewrite. */
  prints: [
    { key: 'bg-guide-reading', caption: 'The GAP Guide', alt: 'A rider holds the GAP Guide open to its gear guide and itineraries.' },
    { key: 'bg-trail-art-park', caption: 'Signage', alt: 'A branded trail sign and a painted mileage line on a park path.' },
    { key: 'bg-merch-bottle-lake', caption: 'Apparel', alt: 'A Great Allegheny Passage bottle held up over the water.' },
    { key: 'bg-app-selfies', caption: 'The App', alt: 'In-app selfies along the trail, on three phones.' },
  ],

  meta: [
    /* sq opening + md Approach, joined. PROVISIONAL assembly, her words. */
    ['Context', 'Final project for a graduate visual communications studio at Carnegie Mellon: a rebranding proposal for the Great Allegheny Passage, a 150-mile trail from Pittsburgh to Cumberland, MD.'],
    /* cp + sq, her line */
    ['Role', 'UX Research, Brand Identity, Animation'],
    /* md Team */
    ['Collaborators', 'Michael Juan, Rui Ying'],
    /* cp */
    ['Tools Used', 'Figma, Adobe Illustrator, After Effects'],
    /* md Duration; phases from sq (Ideation, Research/Synthesis, Concept,
       Refinement, Presentation). See the duration conflict above. */
    ['Timeline', ['4 weeks', 'Ideation, Research and Synthesis, Concept, Refinement, Presentation']],
  ],

  frame: {
    /* cp Tension + HMW (also sq Design Challenge), verbatim. */
    why: 'Pittsburgh has a large transient student population, and most residents are unaware of the GAP trail or experience barriers to experiencing this historic nature trail. How might we rebrand the GAP trail to feel accessible and inviting to people with minimal experience in nature?',
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
      name: 'Brand Identity',
      /* sq Concept (first sentence) + md brand paragraph, verbatim. */
      body: 'The campaign is called “Bridging the GAP,” referring to the knowledge gap between Pittsburgh residents and the Great Allegheny Passage Trail Association. I started crafting logo ideas that would incorporate movement and biking. We chose the National Park typeface, and I manually manipulated the letters to get a rounded shape with additional features. I also explored bridge and river shapes to bring home the metaphor.',
      /* md The Work (“I started drafting the brand identity”) + the brand
         paragraph. PROVISIONAL: the animation clause assumes the logo
         animations are hers (Role: Animation); hers to confirm. */
      /* FS303 notes: md, verbatim */
      notes: [
        { label: 'The tone', text: 'We gathered mood board inspiration of the playful, colorful, and inviting tone that we wanted Bridging the Gap to have.' },
        { label: 'Color research', text: 'We did some user research on colors that people associate with the outdoors.' },
      ],
      mine: 'The brand identity: logo concepts, hand-shaped lettering from the National Park typeface, the bridge and river forms, and the logo animations.',
      media: {
        stills: [
          { type: 'video', key: 'bridging-default', alt: 'The Bridging the GAP logo animating in, the river wave drawing through the letters.' },
          { key: 'bg-style-guide', alt: 'The style guide: logos, merch, colors, fonts, and graphics.' },
          { type: 'video', key: 'bridging-gap-logo', alt: 'The GAP logo drawing itself, each letter ending in an arrow.' },
          { type: 'video', key: 'bridging-logos-2', alt: 'The Bridging the GAP lockup animating in.' },
          { key: 'bg-gap-vertical', alt: 'G, A, and P stacked, each letter shaped like a trail arrow.' },
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
      notes: [
        { label: 'Its job', text: 'Trip planner, tool, education, and community.' },
        { label: 'Market research', text: 'We assessed pros and cons of their user experience and decided to focus our efforts on playful design and customizable trip planning with strong imagery.' },
      ],
      mine: 'The selfie slides, and collaboration on the features. Rui Ying owned the app and its prototypes.',
      /* FS347: four screens, each named with her annotation from the
         deck (BTG_47–50), verbatim; the line under each is md's feature
         list, verbatim but for typos. */
      media: {
        screens: [
          { name: 'Customized trip planner', text: 'Addresses questions about distance, elevation, difficulty level, and lets users choose routes that feature attractions they are interested in.',
            src: crop('BTG_47', 1805, 736, 1156, 2448), alt: 'The trip planner: duration, distance, elevation gain, difficulty, attractions, and sleeping type.' },
          { name: 'Motivational messages', text: 'GPS with highlighted attractions, alerts for local riders, and an optional historical audio tour.',
            src: crop('BTG_48', 1261, 705, 1125, 2426), alt: 'On the ride: “3 miles to next stop, Keep Going!” over the trail map.' },
          { name: 'In-app selfies', text: 'In-app selfies encouraged throughout your trip + compiled at the end.',
            src: crop('BTG_49', 1289, 550, 1119, 2374), alt: 'A rider’s selfie in a playful GAP frame.' },
          { name: 'Mileage earns you merch!', text: 'Apparel can be won by trail users who use the GAP Map App to log miles on the trail.',
            src: crop('BTG_50', 4664, 695, 1156, 2451), alt: '32.6 miles: keep going, 27.4 miles to the gift, with the merch to claim.' },
        ],
      },
    },
    {
      key: 'guide',
      name: 'The GAP Guide',
      /* md Challenges paragraph + its features list, and the deck's
         contents slide (BTG_37), trimmed. */
      body: 'The GAP Guide serves as an informative overview of the trail, inviting beginners to explore the GAP Map App and learn about bike touring, with recommended itineraries, an overview of trail attractions, a visual packing list, and an FAQ about bike touring.',
      /* md caption: “My first iteration of a series of sticker badges
         featuring trail attractions to be added to the Gap Guide Pamphlet
         as a passport-style checklist.” PROVISIONAL: the badges may not be
         in the final guide; hers to replace with her actual part. */
      /* FS303 notes: md deliverables list + md image 44 caption, verbatim
         but for “Gap” → GAP. */
      notes: [
        { label: 'Its job', text: 'Awareness, education, and initiation.' },
      ],
      /* md image 44 caption, her words, recast without “I” */
      mine: 'The first iteration of the sticker badges: trail attractions as a passport-style checklist.',
      /* FS303: the photo, then the flat panels one by one (her artwork,
         legible at last), then the badges. */
      media: {
        stills: [
          { key: 'bg-guide-reading', alt: 'A rider holds the guide open to the gear guide and itineraries.' },
          { key: 'bg-guide-panel-cover', alt: 'The cover panel: “Discover the Joy of Bike Touring the Great Allegheny Passage!”' },
          { key: 'bg-guide-panel-route', alt: 'A stretch of the route map, with tunnels, bridges, and falls along the way.' },
          { key: 'bg-guide-panel-2days', alt: 'A two-day itinerary, Connellsville to Cumberland, with its climb and mileage.' },
          { key: 'bg-guide-panel-gear', alt: 'The illustrated gear guide: what to wear and pack for a bike tour.' },
          { key: 'bg-guide-panel-faq', alt: 'The FAQ: what the GAP is, whether you can tour with no experience, and what the GAP Map App does.' },
          ],
      },
    },
    {
      key: 'signage',
      name: 'Signage and Trail Mural',
      /* md signage paragraph, trimmed; “milage” → mileage. */
      body: 'We explored physical signage and asphalt murals as branded wayfinding, to build awareness of trail attractions and educate trail users in Pittsburgh, Maryland, D.C., and the trail towns along the path, with arrows and mileage for upcoming attractions and resources.',
      /* FS303 notes: md deliverables list + md signage paragraph,
         verbatim but for “MD” → Maryland as in the body. */
      notes: [
        { label: 'Its job', text: 'Awareness and wayfinding.' },
        { label: 'Steel history', text: 'Michael’s talented sketches showcase some metal trail art that would pay homage to Pittsburgh’s steel history.' },
      ],
      /* FS303: what the trail has now (her field photo), then the proposal. */
      media: {
        stills: [
          { key: 'bg-field-mile-post', alt: 'What is there now: the existing mileage post at Smithton, photographed on the field research trip.' },
          { key: 'bg-trail-art-park', alt: 'The proposal: a branded trail sign and a painted mileage line on a park path.' },
          { key: 'bg-trail-art-forest', alt: 'Painted mileage lines and the GAP star on a forest stretch of trail.' },
          { key: 'bg-mural', alt: 'Asphalt mural mockups counting the miles to the campground, the waterfall, and the tunnel.' },
          { key: 'bg-graphics', alt: 'The icon set and the badges for trail attractions.' },
        ],
      },
    },
    {
      key: 'apparel',
      name: 'Apparel',
      /* md apparel paragraph, verbatim but for typos. */
      body: 'We applied our series of logos to apparel mockups and found a good use for the playful “GAP” road-shaped logo. This apparel can be won by trail users who use the GAP Map App to log miles on the trail, and is sold in trail towns.',
      /* FS303 notes: md deliverables list + md Iterations and Feedback,
         verbatim. */
      notes: [
        { label: 'Its job', text: 'Awareness and nostalgia.' },
        { label: 'A backup plan', text: 'We decided to incorporate apparel in case our signage or mural idea didn’t pan out.' },
      ],
      media: {
        stills: [
          { key: 'bg-apparel', alt: 'A tote, caps, a tee, and socks in the Bridging the GAP colors.' },
          { key: 'bg-merch-tote', alt: 'The Bridging the GAP tote.' },
          { key: 'bg-merch-cap', alt: 'A Great Allegheny Passage cap.' },
          { key: 'bg-merch-socks', alt: 'Socks patterned with the trail’s dashed road line.' },
          { key: 'bg-merch-bottle-lake', alt: 'A GAP sport bottle held up over the water.' },
          { key: 'bg-apparel-bottles', alt: 'A tote, water bottles, and tees, and a bottle held up at the river.' },
        ],
      },
    },
    {
      key: 'field-research',
      /* FS347: the process. Week labels: Medium gives 4 weeks with no
         per-phase dates, so steps are labeled by phase, not by week. */
      chapter: {
        kicker: 'Four weeks',
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
      /* md Iterations and Feedback, verbatim */
      takeaway: 'The main feedback was to get our style aligned and go for a line-art approach, and to make sure everything felt cohesive.',
      body: 'Each of us had a different illustration style and skill set. Line art kept every deliverable in line with the logo, our true north, and Michael’s icons filled in the gaps and tied everything together.',
      media: {
        stills: [
          /* md captions, verbatim */
          { key: 'bg-logo-iterations', alt: 'Early iterations of the logo.' },
          { key: 'bg-guide-layout', alt: 'Exploring the layout.' },
          { key: 'bg-sticker-badges', alt: 'My first iteration of a series of sticker badges featuring trail attractions, as a passport-style checklist.' },
          { key: 'bg-app-sketches', alt: 'Early sketches of web/app UX.' },
          { key: 'bg-graphics', alt: 'Final icons.' },
        ],
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
    {
      id: 'shape', verb: 'Shape', title: 'What’s next',
      shift: ['Proposal', 'Real World'],
      list: [
        /* md Reflection */
        { head: 'Real Results', text: 'The GAP association told us they had explored an app in the past, and we felt an enormous amount of potential for real world results.' },
        /* md Finale: “there is more work to do and many edits that could make
           it even better”, with nothing named */
        { head: '[Next Step]', text: '[LORIN TO WRITE: what it would take to bring this to the GAP association.]' },
      ],
    },
  ],

  /* BEHIND THE SCENES: folded into the process steps (FS347). */

  /* CREDITS: one column each. md Team + Class; sq Credits and thanks. */
  credits: [
    ['Design Team', 'Lorin Anderberg, Michael Juan, Rui Ying'],
    ['Studio', 'CMU MA in Design, Visual Communications Studio I, taught by Brett Yasko'],
    /* sq “Big props to my teammates”, trimmed */
    ['With Thanks', 'To Michael, who hand illustrated the icon system and did a ton of work to align our illustration styles, and Rui, a Figma wizard who owned our app prototype.'],
    ['Resources', 'Unsplash images, Figma Community templates, Mr Mockup'],
  ],
}

export default bridgingTheGap
