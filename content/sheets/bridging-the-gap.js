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
 *   · Who photographed the guide (the GAP_Pamphlet series)? No credit on
 *     file.
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

  /* Four prints for range: the brand, the guide in hand, the app, the
     signage. Captions and alts are furniture, hers to rewrite. */
  prints: [
    { key: 'bg-btg-logo', caption: 'The Brand', alt: 'The Bridging the GAP wordmark, a river wave running through the letters.' },
    { key: 'bg-guide-reading', caption: 'The GAP Guide', alt: 'A rider holds the GAP Guide open to its gear guide and itineraries.' },
    { key: 'bg-app-selfies', caption: 'The App', alt: 'In-app selfies along the trail, on three phones.' },
    { key: 'bg-signage', caption: 'Trail Signage', alt: 'A branded trail sign and a painted mileage line on a park path.' },
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
      mine: 'The brand identity: logo concepts, hand-shaped lettering from the National Park typeface, the bridge and river forms, and the logo animations.',
      media: {
        stills: [
          { type: 'video', key: 'bridging-default', alt: 'The Bridging the GAP logo animating in, the river wave drawing through the letters.' },
          { key: 'bg-style-guide', alt: 'The style guide: logos, merch, colors, fonts, and graphics.' },
          { type: 'video', key: 'bridging-gap-logo', alt: 'The GAP logo drawing itself, each letter ending in an arrow.' },
          { key: 'bg-gap-wordmark', alt: 'The Great Allegheny Passage wordmark.' },
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
      mine: 'The selfie slides, and collaboration on the features. Rui Ying owned the app and its prototypes.',
      media: {
        stills: [
          { type: 'video', key: 'bridging-clip-1', alt: 'Planning a trip in the app at a desk covered in trail maps.' },
          { key: 'bg-app-planner', alt: 'A customized trip planner, a route’s details, and supportive reminders along the way.' },
          { key: 'bg-app-ride', alt: 'On the ride: data tracking, motivational messages, a historical audio tour, and alerts for upcoming attractions.' },
          { key: 'bg-app-selfies', alt: 'In-app selfies, encouraged along the trail and compiled at the end.' },
          { type: 'video', key: 'bridging-clip-2', alt: 'The trip recap appearing on a phone as a rider finishes the trail.' },
          { key: 'bg-app-recap', alt: 'The recap: attractions passed, trail memories, and miles that earn merch.' },
          { key: 'bg-app-ia', alt: 'The app’s information architecture and user flow.' },
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
      mine: '[LORIN TO WRITE: your part in the GAP Guide. On file: you drafted the first sticker badges of trail attractions, a passport-style checklist; Medium credits Michael Juan with the illustrations.]',
      media: {
        stills: [
          { key: 'bg-guide-reading', alt: 'A rider holds the guide open to the gear guide and itineraries.' },
          { key: 'bg-guide-route', alt: 'The route side unfolded: trail attractions along a winding path, and what to know before you go.' },
          { key: 'bg-guide-gear', alt: 'The other side: a gear guide, an FAQ, and itineraries for two to five days.' },
          { key: 'bg-guide-handlebars', alt: 'Reading the route over the handlebars.' },
          { key: 'bg-guide-mockup', alt: 'Both sides of the guide, laid flat.' },
        ],
      },
    },
    {
      key: 'signage',
      name: 'Signage and Trail Mural',
      /* md signage paragraph, trimmed; “milage” → mileage. */
      body: 'We explored physical signage and asphalt murals as branded wayfinding, to build awareness of trail attractions and educate trail users in Pittsburgh, Maryland, D.C., and the trail towns along the path, with arrows and mileage for upcoming attractions and resources.',
      mine: '[LORIN TO WRITE: your part in the signage and mural, if any. Medium credits Michael Juan with the signage and the icon system.]',
      media: {
        stills: [
          { key: 'bg-signage', alt: 'A branded trail sign and a painted mileage line on a park path.' },
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
      mine: '[LORIN TO WRITE: your part in the apparel. On file: the logos on it are yours.]',
      media: {
        stills: [
          { key: 'bg-apparel', alt: 'A tote, caps, a tee, and socks in the Bridging the GAP colors.' },
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
        { head: '[LORIN TO WRITE]', text: '[LORIN TO WRITE: one edit you would make next, if the project continued.]' },
        { head: '[LORIN TO WRITE]', text: '[LORIN TO WRITE: what it would take to bring this to the GAP association.]' },
      ],
    },
  ],

  /* BEHIND THE SCENES: the research slides, then the guide out in the
     world. Captions describe what each shows; hers to rewrite. */
  processTitle: 'Behind the scenes',
  process: [
    {
      title: 'Research',
      fit: 'contain',  /* deck slides: keep the text whole */
      images: [
        { key: 'bg-what-is-gap', alt: 'What is the GAP: a 150-mile trail from Pittsburgh to Cumberland, MD.' },
        { key: 'bg-team-outdoors', alt: 'The team outdoors: a shared love of nature started the project.' },
        { key: 'bg-what-would-help', alt: 'What would get people to go bike touring, from our interviews.' },
        { key: 'bg-problem', alt: 'The problem and the opportunity.' },
        { key: 'bg-moodboard', alt: 'The mood board: trail brands, signage, and maps.' },
        { key: 'bg-app-wireframes', alt: 'Early app wireframes.' },
      ],
    },
    {
      title: 'The Guide in the Field',
      images: [
        { key: 'bg-guide-pocket', alt: 'The guide in a cyclist’s pocket beside a red bike.' },
        { key: 'bg-guide-held', alt: 'The folded guide held up outdoors.' },
        { key: 'bg-guide-back', alt: 'The guide in a back pocket, bike at hand.' },
        { key: 'bg-guide-standing', alt: 'Folded guides standing on a ledge.' },
        { key: 'bg-guide-grass', alt: 'The route side unfolded on the grass.' },
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
