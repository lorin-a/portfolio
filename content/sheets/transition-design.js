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
 * SHAPE (FS347): the roadmap first (the overview), the 2050 story it
 * pictures, then The Process: the five Medium assignments as five steps,
 * each opening on her own takeaway line from the final presentation (M5).
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

  /* FS347: the project's own colors, sampled from her maps: sage,
     seafoam, terracotta, olive, deep green (tile 5 takes white ink). */
  band: 'linear-gradient(126deg, #e7efed 0%, #b2cac7 50%, #4f6b5a 100%)',
  tiles: ['#D4DACA', '#B2CAC7', '#D28F67', '#918F80', '#4F6B5A'],

  /* THE OVERVIEW (FS347): what it all built to, first. The Roots to
     Resilience ecosystem, the final exercise's deliverable, across the
     sheet; the process below walks back to how we got here. Intro: sq,
     verbatim, first sentence + the Max-Neef sentence trimmed. The zoom
     captions are M5's map walkthrough, compressed. */
  system: {
    kicker: 'The Roadmap',
    label: 'Roots to Resilience 2050',
    wide: true,
    intro: '“Roots to Resilience 2050” lays out a phased, system-wide roadmap for transforming Pittsburgh’s food landscape from one marked by scarcity and fragmentation into a regenerative, community-owned ecosystem. Each intervention intentionally maps to Max-Neef’s fundamental human needs.',
    media: {
      stills: [
        { key: 'td-roots', alt: 'The intervention ecosystem across scales, from the household to the planet, each intervention tagged with the human needs it meets.' },
        { key: 'td-zoom-commons', alt: 'At the heart: the Roots and Resilience Community Food Forest, which gives rise to the Pittsburgh Food Commons Trust.' },
        { key: 'td-zoom-steel', alt: 'An offshoot: the Steel to Sustenance Innovation Hub, former steel mill sites turned into centers of food production.' },
        { key: 'td-zoom-household', alt: 'At the household level: the HOME Harvest Basket and the Harvesting Pittsburgh App, connected to Farm to Institution Pennsylvania.' },
        { key: 'td-zoom-growback', alt: 'The Grow Back Credit evolves into the Urban-Rural Food Alliance model.' },
        { key: 'td-phases', alt: 'The interventions sorted into immediate and mid-to-long-term.' },
      ],
    },
  },

  /* THE VISION PICTURED, then THE PROCESS. Bodies are her words (M1–M5,
     sq), trimmed. Every source speaks as “we”; sq says roles were split
     equally, so “My Contribution” appears once, on her one stated claim
     (“I played a key role in the information design on our Miro board”). */
  components: [
    {
      key: 'morning-2050',
      name: 'A Morning in Pittsburgh, 2050',
      /* M5 opens the final presentation with a 2050 story narrated in
         turn; her section is in her first person (“I head to pick up
         Alisha”). The first sentence is a PROVISIONAL frame; the quote is
         her section, verbatim, trimmed. */
      body: 'The final presentation opened in 2050, a story we narrated in turn. My part: “I drive through morning-lit streets that blend Pittsburgh’s industrial past with its green future as I head to pick up Alisha for our Wisdom Circle meeting. The former steel mills that once stood abandoned now pulse with vertical gardens and aquaponic systems.”',
      /* M5, verbatim */
      notes: [
        { label: 'The app', text: '“What began as a simple coordination tool has become the nervous system of our local food network.”' },
        { label: 'The circle', text: '“Here, Pittsburgh’s past and future converge as we continue the story of how a hungry city learned to feed itself with dignity.”' },
      ],
      media: {
        /* the story's pictures in its order; captions are the words printed
           on each slide, verbatim; the AI-imagery disclosure on each */
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
    {
      key: 'wicked-problem',
      /* FS347: the five Medium assignments are the five steps; durations
         are each article's own “Timeline” line (sources conflict on the
         total; see OPEN). Takeaways are her lines, verbatim. Step 5 is the
         roadmap above. */
      chapter: {
        kicker: 'Five exercises · Spring 2025',
        title: 'The Process',
        line: 'Each Transition Design exercise built on the one before, from a map of the problem to the roadmap above.',
        steps: [
          { key: 'wicked-problem', when: '2 weeks', name: 'The Wicked Problem', outcome: 'Five categories of research, mapped for leverage points.' },
          { key: 'stakeholders', when: '2.5 weeks', name: 'Stakeholders', outcome: 'Power, mapped across three opposing stakeholders.' },
          { key: 'history', when: '2.5 weeks', name: 'History', outcome: 'Pittsburgh’s food story, 1900 to today.' },
          { key: 'transition', when: '2.5 weeks', name: 'Vision and Transition', outcome: 'A 2100 vision, backcast to milestones.' },
          { key: 'system', when: '2.5 weeks', name: 'Interventions', outcome: 'The Roots to Resilience roadmap.' },
        ],
      },
      step: 'Step 1 · 2 weeks',
      name: 'Mapping a Wicked Problem',
      /* M5, verbatim */
      takeaway: 'It was a classic example of a “wicked problem,” tangled in layers of historical, social, economic, and environmental factors.',
      /* M5 + sq, verbatim, trimmed */
      body: 'We dove into extensive secondary research and organized our insights into five overarching categories: Infrastructure, Technology and Science; Economics and Business; Policy and Legal; Social; and Environmental. By mapping these interdependent systems, we aimed to identify leverage points where long-term interventions could make a difference.',
      notes: [
        /* M1 “The Fight for Food Sovereignty”, verbatim */
        { label: 'What we found', text: 'Food insecurity is often framed as a problem of affordability or supply, but at its core, it is a systemic issue of power and control.' },
      ],
      /* sq, her one stated claim, recast without “I” */
      mine: 'Information design on the team’s Miro board.',
      layout: 'half',
      media: {
        photos: [
          { key: 'td-wicked-map', alt: 'The Wicked Problem Map: food insecurity at the center, its five categories, and other wicked problems at the edges.' },
          { key: 'td-wall-team-01', alt: 'We preferred an in-person brainstorming session, clustering our research on the wall to reveal subcategories for the map.' },
        ],
      },
    },
    {
      key: 'stakeholders',
      step: 'Step 2 · 2.5 weeks',
      name: 'Mapping Stakeholder Relations',
      /* M5, verbatim */
      takeaway: 'The challenge isn’t just ‘feed people,’ it’s broker trust where power is uneven and use that trust to turn shared hopes into quick pilots that prove systemic change is possible.',
      /* M5, verbatim, trimmed */
      body: 'In the stakeholder map, we see the single Black mother who feels every price bump at the checkout line, Giant Eagle’s executive team that decides which neighborhoods get a store, and the Pittsburgh Food Policy Council that sits somewhere in the middle, trying to translate community pain into policy language.',
      /* M5, verbatim, trimmed */
      notes: [
        { label: 'The quick win', text: 'The Food Policy Council and Giant Eagle want to spotlight local produce and polish their public image: a ‘Local‑First Aisle’ co‑branded by nonprofits and the grocer could launch tomorrow.' },
        { label: 'The hard knot', text: 'Giant Eagle’s fear of shrinking margins collides head‑on with the single mother’s fear of skyrocketing prices.' },
      ],
      media: {
        stills: [
          { key: 'td-stakeholders', alt: 'The stakeholder map: a Giant Eagle CEO, a food policy program manager, and a low-income single mother, with green lines for shared hopes and red for conflicts.' },
          { key: 'td-power-spectrum', alt: 'Mapping stakeholders on a power spectrum, from corporate food supply chains to the African American low-income minority.' },
          { key: 'td-power-cube', alt: 'The Power Cube: spaces, levels, and forms of power.' },
          { key: 'td-stakeholder-groups', alt: 'Stakeholders sorted into four groups, from those most affected to those who benefit from the status quo.' },
          { key: 'td-mother', alt: 'Detail: the low-income single mother’s fears and hopes.' },
        ],
      },
    },
    {
      key: 'history',
      step: 'Step 3 · 2.5 weeks',
      name: 'Mapping the Evolution',
      /* M5, verbatim */
      takeaway: 'The timeline isn’t a history lesson; it’s a strategic forecast.',
      /* M5, verbatim, trimmed */
      body: 'Using the Multi‑Level Perspective, we layered Pittsburgh’s food story from 1900 to today. Each era traded one form of dependency for another: Indigenous reciprocity for colonial rations, farm gardens for factory paychecks, corner markets for highways that bypassed them.',
      /* M5, verbatim */
      notes: [
        { label: 'Path dependency is real', text: 'The 1930s redlining map still predicts where the food deserts are. That tells us new grocery tech won’t stick unless zoning and transit change with it.' },
        { label: 'Windows of opportunity keep cycling', text: 'Every crisis births community innovation like soup kitchens in the ’30s, food banks in the ’80s, 412 Food Rescue post‑2015.' },
      ],
      media: {
        stills: [
          { key: 'td-timeline', alt: 'The timeline from the 1700s to the present, across landscape, regime, and niche.' },
          { key: 'td-era-1900', alt: 'Detail: 1900 to 1945.' },
          { key: 'td-era-1970', alt: 'Detail: 1970 to the present.' },
        ],
      },
    },
    {
      key: 'transition',
      step: 'Step 4 · 2.5 weeks',
      name: 'Designing a Transition',
      /* M5, verbatim, trimmed */
      takeaway: 'From this aspirational future, we worked backward to build the Roots to Resilience Roadmap.',
      /* M5, verbatim, trimmed */
      body: 'As a team, we first envisioned what Pittsburgh could look like in 2100 through our Living Land Vision: a future where food systems are rooted in mutual care, regenerative practices, and local abundance. We focused on what systems need to be dismantled and what needs to be maintained to get there.',
      /* M5, verbatim */
      notes: [
        { label: 'Dismantle and maintain', text: 'We explored dismantling the stigma around food assistance programs like SNAP and EBT, and maintaining food co-ops from the current system.' },
      ],
      media: {
        stills: [
          { key: 'td-vision', alt: 'The Living Land Vision map, rings from the household to the planet.' },
          { key: 'td-transition', alt: 'The transition map: what to dismantle, maintain, and innovate, set against near, mid, and long-term milestones.' },
          { key: 'td-household', alt: 'Detail: the household and the neighborhood.' },
          { key: 'td-backcast', alt: 'Detail: milestones from near casting to backcasting.' },
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

  /* FS347: no separate behind-the-scenes gallery; the working photos and
     process images now sit in the steps they belong to. */

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
