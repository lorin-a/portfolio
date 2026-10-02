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
 * videos use the existing HOME_VIDEOS keys.
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

export const bridgingTheGap = {
  /* sq, verbatim. The only stated outcome; there is no client (a class
     brief), and the GAP association conversation was research, not a
     commission. */
  outcome:
    'We received feedback that this was one of the best projects this professor had seen for this assignment, as well as positive impressions from our audience.',

  /* Four prints for range: the brand, the team in the field, the guide in
     hand, the app (FS303: the Ohiopyle selfie replaces the signage slide).
     Captions and alts are furniture, hers to rewrite. */
  prints: [
    { key: 'bg-btg-logo', caption: 'The Brand', alt: 'The Bridging the GAP wordmark, a river wave running through the letters.' },
    { key: 'bg-field-team', caption: 'Ohiopyle', alt: 'Lorin, Michael, and Rui at the Ohiopyle falls on their field research trip.' },
    { key: 'bg-guide-reading', caption: 'The GAP Guide', alt: 'A rider holds the GAP Guide open to its gear guide and itineraries.' },
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

  /* md User Research + Reflection: the synthesis that chose the four
     deliverables. Intro is md, verbatim but for “user’s” → users’. */
  system: {
    kicker: 'Synthesis',
    label: 'From Pain Points to Deliverables',
    intro: 'We developed personas and mapped out their journeys while planning a bike tour to identify key pain points and opportunities for our deliverables to be positive interventions. We translated the most important pain points into key deliverables that would serve our users’ needs at every stage of their journey.',
    media: {
      stills: [
        { key: 'bg-pain-points', alt: 'Three kinds of pain points: awareness, logistics, and knowledge.' },
        { key: 'bg-deliverables', alt: 'Each pain point mapped to the deliverables: apparel, signage, the GAP Guide, and the GAP Map App.' },
        { key: 'bg-personas', alt: 'Personas, each with a goal, a challenge, and a job to be done.' },
        { key: 'bg-journey', alt: 'Journey maps from planning a bike tour through the ride and after.' },
        { key: 'bg-market', alt: 'Market research: what AllTrails, Strava, and Gaia GPS do well.' },
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
          /* md caption, verbatim */
          { key: 'bg-logo-iterations', alt: 'Early iterations of the logo: the letters of GAP drawn as a bike.' },
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
      media: {
        stills: [
          { type: 'video', key: 'bridging-clip-1', alt: 'Planning a trip in the app at a desk covered in trail maps.' },
          { key: 'bg-app-planner', alt: 'A customized trip planner, a route’s details, and supportive reminders along the way.' },
          { key: 'bg-app-ride', alt: 'On the ride: data tracking, motivational messages, a historical audio tour, and alerts for upcoming attractions.' },
          { key: 'bg-app-selfies', alt: 'In-app selfies, encouraged along the trail and compiled at the end.' },
          { type: 'video', key: 'bridging-clip-2', alt: 'The trip recap appearing on a phone as a rider finishes the trail.' },
          { key: 'bg-app-recap', alt: 'The recap: attractions passed, trail memories, and miles that earn merch.' },
          /* md caption, verbatim */
          { key: 'bg-app-sketches', alt: 'Early sketches of web/app UX: a route by elevation, with attractions pinned along it.' },
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
        { label: 'Passport badges', text: 'My first iteration of a series of sticker badges featuring trail attractions to be added to the GAP Guide pamphlet as a passport-style checklist.' },
      ],
      mine: '[LORIN TO WRITE: your part in the GAP Guide. On file: you drafted the first sticker badges of trail attractions, a passport-style checklist; Medium credits Michael Juan with the illustrations.]',
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
          { key: 'bg-sticker-badges', alt: 'Her first sticker badges: trail attractions as a passport-style checklist.' },
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
      mine: '[LORIN TO WRITE: your part in the signage and mural, if any. Medium credits Michael Juan with the signage and the icon system.]',
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
      mine: '[LORIN TO WRITE: your part in the apparel. On file: the logos on it are yours.]',
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
        { head: '[Next Edit]', text: '[LORIN TO WRITE: one edit you would make next, if the project continued.]' },
        { head: '[Next Step]', text: '[LORIN TO WRITE: what it would take to bring this to the GAP association.]' },
      ],
    },
  ],

  /* BEHIND THE SCENES (FS303): the field research trip and the research
     slides, then the photo shoots for the guide and the app. Captions
     describe what each shows; hers to rewrite. */
  processTitle: 'Behind the scenes',
  process: [
    {
      title: 'Field Research',
      fit: 'contain',  /* phone photos and deck slides: keep both whole */
      images: [
        { key: 'bg-field-board', alt: 'At Ohiopyle: “What would get you to go bike touring?” on a board beside a loaded touring bike.' },
        { key: 'bg-field-bridge', alt: 'Riders crossing the trail bridge over the river at Ohiopyle.' },
        { key: 'bg-field-town-map', alt: 'Observing the existing signage: the Smithton town map and directory.' },
        { key: 'bg-field-local-board', alt: 'A trail-town bulletin board: “Support Local Business.”' },
        { key: 'bg-what-would-help', alt: 'What would get people to go bike touring, from our interviews.' },
        { key: 'bg-problem', alt: 'The problem and the opportunity.' },
        { key: 'bg-guide-layout', alt: 'Exploring the layout: whiteboard sketches of the guide.' },
      ],
    },
    {
      title: 'The Shoots',
      images: [
        { key: 'bg-app-shoot-maps', alt: 'Planning a tour at a table spread with paper trail maps.' },
        { key: 'bg-app-shoot-phone', alt: 'The app held over the maps, from above.' },
        { key: 'bg-guide-pocket', alt: 'The guide in a cyclist’s pocket beside a red bike.' },
        { key: 'bg-guide-handlebars', alt: 'Reading the route over the handlebars.' },
        { key: 'bg-guide-held', alt: 'The folded guide held up outdoors.' },
        { key: 'bg-guide-grass', alt: 'The route side unfolded on the grass.' },
        { key: 'bg-guide-standing', alt: 'Folded guides standing on a ledge.' },
      ],
    },
  ],

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
