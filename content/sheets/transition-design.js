/**
 * Transition Design — folder sheet copy (FS300), built from the template.
 *
 * SOURCES, so every line has a receipt:
 *   · "Mn"  = her Medium articles, assignment n of 5 (sources/
 *     transition-design/medium.md, verbatim). The publication's own
 *     description: “Disclaimer: Theoretical w/ AI-Assisted Writing &
 *     Research + Imagery.”
 *   · "sq"  = her old Squarespace page (sources/transition-design/
 *     squarespace.md).
 *   · "md"  = content/projects/transition-design.md.
 *
 * Copy is hers, selected and trimmed under the standing copy rule (her
 * draft is the source; Claude refines it). Lines marked PROVISIONAL are
 * assembled from her sources for this sheet and are hers to rewrite.
 * Nothing exists for her per-exercise contribution or a reflection, so
 * those are [LORIN TO WRITE].
 *
 * WRITTEN AS A TEAM. Every source speaks as “we” (Team Autopoiesis), and sq
 * says roles were split “equally and independently before doing group
 * analysis,” with one claim of hers: “I played a key role in the
 * information design on our Miro board.” The sheet keeps “we” throughout.
 *
 * MEDIA: media/transition-design.js (TD_IMAGES): the six maps, plus the
 * deck's slides, the affinity wall, and the AI-generated intervention
 * pictures, uploaded from her local folder on 2026-10-02. FS303 added the
 * team at the wall, the stakeholder process images, the ecosystem-map
 * zooms, and the 2050 story's pictures. Intervention captions are the
 * words printed on each slide, verbatim.
 *
 * OPEN, hers to settle (also in STATUS):
 *   · the homepage CTA points to the Medium publication's front page,
 *     which shows no stories; it should point to the five articles (URLs at
 *     the top of sources/transition-design/medium.md);
 *   · the timeline: md says a 15-week sprint; sq says six exercises of 3
 *     weeks each (18); Medium says 2 weeks (M1) and 2.5 weeks (M2, M3, M5).
 *     The sheet lists the exercises and leaves out durations;
 *   · the vision's year: M4/M5 and sq say 2100 (“75 years ahead”); the
 *     vision map is titled “for 2075.” The sheet follows her prose (2100);
 *   · the team name: the map files say “Autopoesis,” the deck and Medium
 *     say “Autopoiesis.” The sheet uses Autopoiesis;
 *   · five AI-generated slides have garbled text baked into the picture and
 *     are left out until fixed: TD_5 Local Harvest Basket (“BASRET”), TD_6
 *     Our Local Produce (“Consciious”), TD_7 Food Is Freedom (“ACCESSS”),
 *     TD_8 Root Cause Food Justice (“JUSTUCE”), TD_16 Cooperative Economy
 *     (“Inititative” in its caption strip). TD_4 The People’s Table is in,
 *     though a T-shirt in the background carries AI gibberish;
 *   · M5 embeds the full final presentation on YouTube
 *     (https://www.youtube.com/watch?v=qObw2qPiEmM); the sheet has no video
 *     embed, so it isn't on the sheet yet.
 */

export const transitionDesign = {
  /* md:58 + sq, her claim; the roadmap's name and year from M5 and the
     deck cover (“A Food Secure Pittsburgh in 2050”). PROVISIONAL join. */
  outcome:
    'Recognized as the “best outcome yet” by the founders of CMU’s Transition Design Institute: Roots to Resilience, a phased roadmap toward a food-secure Pittsburgh in 2050.',

  /* Range: the wall, the first map, the vision, the future pictured.
     Captions and alts are furniture, hers to rewrite. */
  prints: [
    { key: 'td-wall-team-01', caption: 'At the Wall', alt: 'Two teammates adding sticky notes to the affinity clusters on the whiteboard.' },
    { key: 'td-wicked-map', caption: 'The Wicked Problem', alt: 'The Wicked Problem Map: food insecurity at the center, linked to five categories and their factors.' },
    { key: 'td-roots', caption: 'Roots to Resilience', alt: 'The intervention ecosystem across scales, from the household to the planet.' },
    { key: 'td-vision-2050', caption: 'Pittsburgh 2050', alt: 'AI-generated imagery: a woman on a balcony looking over a green Pittsburgh in 2050.' },
  ],

  meta: [
    /* M1/M5 header (course, founders) + the publication's disclaimer,
       lightly refined. The disclosure is required on this sheet. */
    ['Context', ['Transition Design Seminar at Carnegie Mellon, Spring 2025, taught by Terry Irwin and Gideon Kossoff, founders of the Transition Design Institute.', 'Theoretical, with AI-assisted writing, research, and imagery.']],
    /* md:8 + sq, her line */
    ['Role', ['Research, Copywriting,', 'Information Design, Data Visualization']],
    /* M1 Team line; the team name from the deck and Medium */
    ['Collaborators', 'Team Autopoiesis: Diane Hu, Shama Patwardhan, Alisha Saxena'],
    /* sq Tools + Credits */
    ['Tools Used', 'Miro, Figma Slides, Google Docs, Canva, Midjourney'],
    /* sq's six exercises, paired; durations left out (see OPEN) */
    ['Timeline', ['Mapping: STEEP and Stakeholders', 'History: Multi-Level Perspective', 'Futures: Vision and Transition', 'Interventions: Roots to Resilience']],
  ],

  frame: {
    /* md:18 + md:24, verbatim, joined. */
    why: 'Food insecurity affects approximately 12.5% of Pittsburgh’s population, disproportionately impacting vulnerable groups including low-income individuals, elderly residents, single parents, children, and marginalized communities who face the systemic inequalities of “food apartheid.” This seminar project examines Pittsburgh’s food insecurity through multiple transition design perspectives, proposing a hyper-local integrated intervention plan to dismantle systemic barriers to food security.',
    /* M1 “The Fight for Food Sovereignty”, verbatim, after the method. */
    research: 'Six Transition Design exercises, from a map of the wicked problem to a vision 75 years ahead. Food insecurity is often framed as a problem of affordability or supply, but at its core, it is a systemic issue of power and control.',
    /* PROVISIONAL short version for the three-column row (FS33's rule),
       cut from `why`; “We examined” and “and proposed” are the only joins. */
    short: {
      why: 'Food insecurity affects about 12.5% of Pittsburgh’s population, hardest among the communities facing the systemic inequalities of “food apartheid.” We examined it through Transition Design and proposed a hyper-local plan to dismantle its barriers.',
    },
  },

  /* The first exercise, as the system section: the map everything after
     it builds on. Intro: sq STEEP passage, verbatim, trimmed. */
  system: {
    kicker: 'Synthesis',
    label: 'Mapping a Wicked Problem',
    intro: 'We quickly recognized that this wasn’t a problem with a simple solution. It was a classic example of a “wicked problem,” tangled in layers of historical, social, economic, and environmental factors. We organized our research into five categories (Infrastructure, Technology and Science; Economics and Business; Policy and Legal; Social; and Environmental) and mapped the interconnections to find leverage points.',
    media: {
      stills: [
        { key: 'td-wicked-map', alt: 'The Wicked Problem Map: food insecurity at the center, its five categories, and other wicked problems at the edges.' },
        { key: 'td-affinity-wall', alt: 'We preferred an in-person brainstorming session, to make affinity clusters of our research that would reveal subcategories for our map.' },
        { key: 'td-map-detail', alt: 'Detail: food insecurity linked to legal, social, environmental, and economic factors.' },
        { key: 'td-map-thread', alt: 'Detail: one thread, from corporate consolidation to inflation.' },
      ],
    },
  },

  /* THE EXERCISES, after the first: each is one artifact. Bodies are her
     words (sq / Medium), trimmed. `mine` is [LORIN TO WRITE] throughout:
     no source gives her part in any single exercise. */
  components: [
    {
      key: 'stakeholders',
      name: 'Mapping Stakeholder Relations',
      /* sq, verbatim, two sentences */
      body: 'Key stakeholders were selected to represent different ends of the power spectrum and analyzed using the Power Cube Framework to identify opposing needs, values, and power dynamics that exacerbate food insecurity. Despite being most affected by food insecurity, the single Black mother has the least power to influence change.',
      /* M2, verbatim */
      notes: [
        { label: 'Four groups', text: 'Those most affected, those in positions of power, those with the ability to create change, and those who benefit from maintaining the status quo.' },
        { label: 'The Power Cube', text: 'This analysis examines the visible, hidden, and invisible forms of power exercised by each stakeholder.' },
      ],
      mine: '[LORIN TO WRITE: your part in the stakeholder map: which stakeholder you researched, and whether you laid out the map]',
      media: {
        stills: [
          { key: 'td-stakeholders', alt: 'The stakeholder map: a Giant Eagle CEO, a food policy program manager, and a low-income single mother, each with fears and hopes.' },
          { key: 'td-power-spectrum', alt: 'Mapping stakeholders on a power spectrum, from corporate food supply chains to the African American low-income minority.' },
          { key: 'td-power-cube', alt: 'The Power Cube: spaces, levels, and forms of power.' },
          { key: 'td-mother', alt: 'Detail: the low-income single mother’s fears and hopes.' },
          { key: 'td-ceo', alt: 'Detail: the Giant Eagle CEO’s fears and hopes.' },
        ],
      },
    },
    {
      key: 'history',
      name: 'Mapping the Evolution',
      /* sq MLP sentence + M5 “Path dependency is real.”, verbatim */
      body: 'The Multi-Level Perspective framework maps Pittsburgh’s food insecurity across landscape, regime, and niche. Path dependency is real. The 1930s redlining map still predicts where the food deserts are. That tells us new grocery tech won’t stick unless zoning and transit change with it.',
      mine: '[LORIN TO WRITE: your part in the historical timeline: research eras, the visualization, or both]',
      media: {
        stills: [
          { key: 'td-timeline', alt: 'The timeline from the 1700s to the present, across landscape, regime, and niche.' },
          { key: 'td-era-1900', alt: 'Detail: 1900 to 1945.' },
          { key: 'td-era-1970', alt: 'Detail: 1970 to the present.' },
        ],
      },
    },
    {
      key: 'vision',
      name: 'The Living Land Vision',
      /* M5, verbatim, and its levels paragraph compressed */
      body: 'As a team, we first envisioned what Pittsburgh could look like in 2100 through our Living Land Vision: a future where food systems are rooted in mutual care, regenerative practices, and local abundance. The vision works at the household, neighborhood, city, and planetary levels.',
      mine: '[LORIN TO WRITE: your part in the vision: writing, mapping, or the imagery]',
      media: {
        stills: [
          { key: 'td-vision', alt: 'The Living Land Vision map, rings from the household to the planet.' },
          { key: 'td-household', alt: 'Detail: the household and the neighborhood.' },
          { key: 'td-planet', alt: 'Detail: the city, the region, and the planet.' },
        ],
      },
    },
    {
      key: 'transition',
      name: 'Designing a Transition',
      /* M5 “From this aspirational future…” + sq dismantle / sustain /
         innovate sentence, verbatim */
      body: 'From this aspirational future, we worked backward, identifying tangible interventions and milestones across decades. The roadmap dismantles harmful structures (like distant corporate grocery stores and discriminatory policies), sustains what works (community co-ops, urban agriculture, safety net programs), and innovates new solutions.',
      mine: '[LORIN TO WRITE: your part in the transition map]',
      media: {
        stills: [
          { key: 'td-transition', alt: 'The transition map: what to dismantle, maintain, and innovate, set against near, mid, and long-term milestones.' },
          { key: 'td-backcast', alt: 'Detail: milestones from near casting to backcasting.' },
        ],
      },
    },
    {
      key: 'roots',
      name: 'Roots to Resilience 2050',
      /* sq, verbatim, first sentence + the Max-Neef sentence trimmed */
      body: '“Roots to Resilience 2050” lays out a phased, system-wide roadmap for transforming Pittsburgh’s food landscape from one marked by scarcity and fragmentation into a regenerative, community-owned ecosystem. Each intervention intentionally maps to Max-Neef’s fundamental human needs.',
      /* M5, verbatim */
      notes: [
        { label: 'At the heart', text: 'The Roots and Resilience Community Food Forest, a place where cultural and nutritional justice take root through community-driven, perennial food systems.' },
        { label: 'Human needs', text: 'Every aspect of our ecosystem touches upon at least two of Max Neef’s Fundamental Human Needs and follows key themes of education, distribution, cultivation, and consumption.' },
      ],
      mine: '[LORIN TO WRITE: your part in the interventions: which ones you developed, and the ecosystem map’s information design]',
      media: {
        stills: [
          { key: 'td-roots', alt: 'The intervention ecosystem across scales, each intervention tagged with the human needs it meets.' },
          { key: 'td-zoom-commons', alt: 'At the heart: the Roots and Resilience Community Food Forest, which gives rise to the Pittsburgh Food Commons Trust.' },
          { key: 'td-zoom-steel', alt: 'An offshoot: the Steel to Sustenance Innovation Hub, former steel mill sites turned into centers of food production.' },
          { key: 'td-zoom-household', alt: 'At the household level: the HOME Harvest Basket and the Harvesting Pittsburgh App, connected to Farm to Institution Pennsylvania.' },
          { key: 'td-zoom-growback', alt: 'The Grow Back Credit evolves into the Urban-Rural Food Alliance model.' },
          { key: 'td-phases', alt: 'The interventions sorted into immediate and mid-to-long-term.' },
        ],
      },
    },
    {
      key: 'morning-2050',
      name: 'A Morning in Pittsburgh, 2050',
      /* M5 opens the final presentation with a 2050 story narrated in
         turn: Alisha first (“Lorin’s picking me up soon”), then the
         driving section in Lorin's first person (“I head to pick up
         Alisha”). The first sentence is a PROVISIONAL frame; the rest is
         her section, verbatim, trimmed. */
      body: 'The final presentation opened in 2050, a story we narrated in turn. My part: “I drive through morning-lit streets that blend Pittsburgh’s industrial past with its green future as I head to pick up Alisha for our Wisdom Circle meeting. The former steel mills that once stood abandoned now pulse with vertical gardens and aquaponic systems.”',
      notes: [
        { label: 'The app', text: '“What began as a simple coordination tool has become the nervous system of our local food network.”' },
        { label: 'The circle', text: '“Here, Pittsburgh’s past and future converge as we continue the story of how a hungry city learned to feed itself with dignity.”' },
      ],
      mine: '[LORIN TO WRITE: confirm you wrote and narrated the driving section of the 2050 story, and anything else you made for it]',
      media: {
        /* the story's pictures in its order; captions are the words printed
           on each slide, verbatim */
        stills: [
          { key: 'td-vision-2050', alt: 'AI-generated imagery. Vision Pittsburgh 2050: a thriving green city where community, culture, and nature grow side by side.' },
          { key: 'td-peoples-table', alt: 'AI-generated imagery. The People’s Table: a community-powered learning network that teaches how to grow and cook culturally relevant foods.' },
          { key: 'td-food-forest', alt: 'AI-generated imagery. Roots & Resilience: community-led food forests in Pittsburgh providing free, culturally relevant food and fostering education and connection.' },
          { key: 'td-drive-2050', alt: 'AI-generated imagery. Vision Pittsburgh 2050: the drive past the old mills.' },
          { key: 'td-steel', alt: 'AI-generated imagery. Steel to Sustenance: transform former steel mills into indoor farming facilities.' },
          { key: 'td-commons-trust', alt: 'AI-generated imagery. Pittsburgh Food Commons Trust: protects and transforms vacant urban properties into community food production hubs.' },
          { key: 'td-app', alt: 'AI-generated imagery. Harvesting Pittsburgh App: links growers, pantries, and communities to share surplus food and resources.' },
          { key: 'td-urban-rural', alt: 'AI-generated imagery. Urban Rural Food Alliance: a nationwide network linking urban communities with nearby rural farms.' },
          { key: 'td-home-harvest', alt: 'AI-generated imagery. Home Harvest Initiative: micro-grants to families in food deserts to establish home gardens.' },
          { key: 'td-farm-institution', alt: 'Farm to Institution Pennsylvania: a program that mandates local institutions source 40% local food from regional farms.' },
          { key: 'td-wisdom-circle', alt: 'AI-generated imagery. Food Sovereignty Wisdom Circle: cross-disciplinary local food councils with Indigenous leadership shape inclusive, sustainable food plans.' },
        ],
      },
    },
  ],

  /* REFLECTION: no source holds her learning on this project (inventory:
     Sense / Weave / Shape all MISSING). Placeholders only. */
  reflection: [
    {
      id: 'sense', verb: 'Sense', title: 'What I learned',
      shift: ['[LORIN TO WRITE: from]', '[to]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE: what Transition Design changed in how you see a problem]' }],
    },
    {
      id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
      shift: ['[LORIN TO WRITE: from]', '[to]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE: a method from the seminar you still use]' }],
    },
    {
      id: 'shape', verb: 'Shape', title: 'What’s next',
      shift: ['[LORIN TO WRITE: from]', '[to]'],
      list: [{ head: '[Two Words]', text: '[LORIN TO WRITE: what working with AI-assisted research taught you, or what you would test with real communities]' }],
    },
  ],

  /* BEHIND THE SCENES: the working sessions (photos and process images
     from Medium M1 and M2), then the final presentation's deck slides. */
  processTitle: 'Behind the scenes',
  process: [
    {
      title: 'Working Sessions',
      images: [
        { key: 'td-wall-team-01', focus: '50% 35%', alt: 'Two teammates adding sticky notes to the affinity clusters.' },
        { key: 'td-wall-team-02', focus: '50% 30%', alt: 'Standing on a chair to reach the top of the wall.' },
        { key: 'td-affinity-wall', alt: 'The finished wall: research clustered into STEEP categories and subcategories.' },
        { key: 'td-stakeholder-groups', alt: 'Stakeholders sorted into four groups, from those most affected to those who benefit from the status quo.' },
        { key: 'td-mindsets', alt: 'The mindset characteristics of each stakeholder group.' },
        { key: 'td-relations-draft', alt: 'A first draft of the stakeholder relations: the food council, the corporate supply chains, and the low-income community.' },
      ],
    },
    {
      title: 'The Final Presentation',
      fit: 'contain',  /* deck slides: keep them whole */
      images: [
        { key: 'td-cover', alt: 'The deck cover: Roots to Resilience, a food-secure Pittsburgh in 2050.' },
        { key: 'td-ch-land', alt: 'Chapter one: The Lay of the Land, mapping the terrain through STEEP analysis.' },
        { key: 'td-ch-ecosystem', alt: 'Chapter two: Nurturing the Ecosystem, mapping relationships through stakeholder analysis.' },
        { key: 'td-ch-roots', alt: 'Chapter three: Digging Into the Roots, revealing patterns through historical analysis.' },
        { key: 'td-ch-possibilities', alt: 'Chapter four: Sowing New Possibilities, envisioning the future through imagination.' },
        { key: 'td-ch-change', alt: 'Chapter five: Cultivating Change, designing the intervention ecosystem.' },
      ],
    },
  ],

  /* CREDITS: names from M1; the method note is M1/M5's own disclaimer,
     verbatim. */
  credits: [
    ['Design Team', 'Lorin Anderberg, Diane Hu, Shama Patwardhan, Alisha Saxena (Team Autopoiesis)'],
    ['Instructors', 'Terry Irwin and Gideon Kossoff, founders of the Transition Design Institute'],
    ['Imagery', 'Made with Canva and Midjourney; photography from Pexels'],
    ['A Note on Method', 'The entirety of this project is done through speculation and internet research with AI-assistance and does not claim to truly and deeply understand the experience of anyone who is represented.'],
  ],
}

export default transitionDesign
