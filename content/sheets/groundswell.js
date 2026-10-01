/**
 * Groundswell — folder sheet copy.
 *
 * SOURCES, so every line has a receipt:
 *   · "her copy 2026-08-27" = the copy batch Lorin wrote in session, verbatim.
 *   · "rehearsal Qn"        = docs/deck-system/rehearsal/groundswell-answers.md,
 *                             her verbatim answers, selected and compressed
 *                             under her standing copyedit permission
 *                             (DECISIONS.md). Never rephrased.
 *
 * Spelling normalised for the site (Mindfulness, labyrinths, repercussions,
 * well-rounded). Wording untouched. Anything genuinely absent is marked
 * `todo` and rendered as [LORIN TO WRITE] rather than invented.
 */

export const groundswell = {
  /* The punchline, in the masthead, so the outcome lands on the first screen
     rather than after the evidence. Her copy 2026-08-27, trimmed of its
     "The findings demonstrated that" wind-up. */
  /* FS116: no explicit study outcomes (she is protecting eligibility for
     paper submissions). The scale result AND the participation figures
     (collected as study data) are removed. This line is PROVISIONAL,
     assembled from her own words on how the program was received (close
     .qualitative, rehearsal Q7 part 2): not a study finding. Her FS108
     line, kept for the record: "Participation: 429 uses of the art wall,
     1423 minute spend inside the pod, 176 meditation listens, 117 survey
     responses. All scales aside from perceived support from leadership
     improved throughout the study, indicating a core problem around
     institutional trust and support from administration." */
  outcome:
    /* FS158 copy edit: “admin committed to keep” → administration committed to keeping. */
    'Staff used every component throughout the pilot. Senior staff who began as skeptics shed tears at launch, administration committed to keeping it running, coworkers walked a colleague in distress to the pod, and other departments expressed interest.',

  /* THE COVER'S PRINTS: four photographs in a loose pile beside the name
     (her notes FS57–FS67). Chosen for range across the project: the place,
     the wall in use, the pod in use, the cards in hand. Image choice and
     alt text, not copy; alts are hers to rewrite. */
  /* `caption`: the short label under a polaroid (lab, FS70), in title case
     (FS80: "cap sensitive"); furniture, hers to rewrite. */
  prints: [
    { key: 'gs-hero', caption: 'The Installation', alt: 'The Groundswell Garden and the Restorative Pod in the hallway.' },
    { key: 'gs-artwall-detail-01', caption: 'The Art Wall', alt: 'Writing a response to one of the guided prompts at the art wall.' },
    { key: 'gs-pod-detail-01', caption: 'The Pod', alt: 'Two staff members at the table inside the Restorative Pod.' },
    { key: 'gs-cards', caption: 'The Cards', zoom: 1.18, focus: '50% 30%',  /* crops off the table's edge (FS95) */ alt: 'Hands sorting the Groundswell Reflection Cards on a table.' },
  ],

  /* THE FACTS — her copy, 2026-09-30 (FS93), verbatim except:
       · names corrected to her own records (the Groundswell case study's
         credits, GroundswellContent.js): “Gerg” → Greg Baltus, “Sara” →
         Sarah Taylor, “Kendyl” → Kendyl Grant (she asked for this check);
       · “20205” → 2025 (typo); ranges set with en dashes;
       · Context: CUT from her longer paragraph to its first clause, as she
         asked (“shorten and maybe save some for the bottom reference”); the
         full paragraph already lives lower on the sheet (frame.why) and the
         partners line in the colophon (frame.partners).
     Her original, verbatim, for the record:
       Role: Generative research, content copywriting, project management,
       fundraising, data dashboard development & design, strategy
       Design Team: Kristin Hughes, Lorin Anderberg, Elijah Benzon, Gerg
       Baltus, Robertus Sucahyo, Kelly McDowell
       Clinical Team: Dr. Sara Taylor, Dr. Grace Campbell, Dr. Heidi
       Donovan, Kendyl
       Tools Used: Adobe Creative Suite, Figma, Claude Code
       Timeline: Research: Jan-May 2025 / Production: June-October 2025 /
       Study Period: October 20205-June 2026
     OPEN, hers: Su Hong & Mia Jeong (credited Research Assistants) are not
     in the team lines; Tools Used is marked unsure. An array value renders
     one item per ruled line. */
  /* FS99–FS100 (2026-09-30): Role becomes her TITLES (her claims, turned
     into titles with her permission: “experience designer, copywriter,
     project management, donor relations, data visualization (rephrase
     however makes sense for role)”). The duties line above lives on as
     “My role, in full” near the close and in each “What I did”. The named
     teams move to the colophon (`credits` below); the hero lists the
     collaborating groups in her teammate's register. */
  meta: [
    /* first on the sheet (FS125) */
    /* Context: her copy FS114, with edits (added “to” and “the”, fixed
       “imrpove”). Original: "A pilot program designed imrpove hospital
       culture and support emotional well-being of Cancer Services staff." */
    ['Context', 'A pilot program designed to improve hospital culture and support the emotional well-being of Cancer Services staff.'],
    ['Role', ['Experience\u00a0Designer, Copywriter, Project\u00a0Coordinator,', 'Donor\u00a0Relations, Data\u00a0Visualization\u00a0Designer']],  /* her line break (FS110); each title kept whole */  /* “Project Coordinator”, her correction FS101 */
    ['Collaborators', ['Designers, Fabricators\u00a0&\u00a0Engineers,', 'Hospital\u00a0Staff, Hospital\u00a0Administration, Subject\u00a0Matter\u00a0Experts, Donors']],  /* her line break (FS110); each group kept whole */
    ['Tools Used', 'Adobe Creative Suite, Figma, Claude Code'],
    ['Timeline', ['Research: Jan\u2060–\u2060May\u00a02025', 'Production: June\u2060–\u2060October\u00a02025', 'Study Period: October\u00a02025\u2060–\u2060June\u00a02026']],  /* ranges kept whole (word joiners) */
  ],

  /* The named credits, at the foot of the sheet (FS99): her team lines from
     FS93, names checked against her case-study credits. */
  credits: [
    ['Design Team', 'Kristin Hughes, Lorin Anderberg, Elijah Benzon, Greg Baltus, Robertus Sucahyo, Kelly McDowell'],
    ['Clinical Team', 'Dr.\u00a0Sarah Taylor, Dr.\u00a0Grace Campbell, Dr.\u00a0Heidi Donovan, Kendyl Grant'],
    /* FS128, assembled from her own project records, not new wording:
       docs/groundswell.md “Funding” (“Extended gratitude to the College of
       Fine Arts at CMU; the UPMC Magee-Womens Hospital Medical Staff Fund;
       and the Paul D. Schurgot Foundation for generous support.”), the
       same doc's “over $30,000 in material donations”, and the case
       study's “NookPod donated the restorative pod structure ($13,000
       value)”. Hers to rewrite. */
    ['Funding', 'The College of Fine Arts at CMU, the UPMC Magee-Womens Hospital Medical Staff Fund, and the Paul D. Schurgot Foundation, with over $30,000 in material donations, including the restorative pod structure from NookPod ($13,000 value).'],
  ],

  frame: {
    /* Her copy 2026-08-27, verbatim. */
    why: 'Groundswell is a 9-month pilot program designed to support the emotional well-being of UPMC Magee-Womens Cancer Services staff by introducing resources that honor the emotional complexities of oncology care. Groundswell fosters a culture where grief is acknowledged, isolation transforms into belonging, and self-care is honored as essential to delivering excellent patient care.',

    /* Rehearsal Q1 + Q2 + Q3. The thesis is her verbatim phrasing; the
       permission/acknowledgement finding is the grief workshop's result. */
    research:
      'A lit review, shadowing with AEIOU and contextual inquiry, and interviews across roles from front desk to nurse manager to chemo nurse. Affinity mapping and tetrahedron analysis synthesized it into one thesis: care worker wellbeing is neglected from patient care standards. The grief workshop went further. It revealed core insights that staff need permission (from peers, who will cover their workload, and higher-ups, that there will not be repercussions) and acknowledgement (of the emotional toll of the work, that they did the best they could).',

    /* Her role, 2026-08-27, in her words and authoritative. The closing line
       is rehearsal Q3 and it is kept deliberately: she owned FUNCTIONS, not
       COMPONENTS, and saying so is what makes the list above credible rather
       than a claim over a team's work. The two statements are not in tension
       once the distinction is named. */
    role:
      /* FS158 copy edit (tense and structure; “fundraising … $30k” untouched,
       still hers to settle). Before: "…I found the Groundswell name after
       doing a lot of research on nature metaphors and oncology symbolism. I
       drafted workshop scripts and led facilitation of the grief workshop,
       and specifically drafted it to be trauma-informed and responsive so as
       not to be extractive in collecting emotional data. I applied my
       knowledge of somatic bodywork to draft the reflection cards. We all
       participated in collective feedback, strategizing, prototyping, but I
       did not own any specific component. The exception is the data
       dashboard, which I led: production and design." */
      'Generative research, content copywriting, project management, fundraising (securing over $30k in donations), and the production and design of the data dashboard. I found the Groundswell name through research into nature metaphors and oncology symbolism. I drafted the workshop scripts and led the grief workshop, designing it to be trauma-informed and responsive so it would not be extractive in collecting emotional data. I applied my knowledge of somatic bodywork to draft the reflection cards. We all took part in feedback, strategy, and prototyping, and I did not own any one component. The exception was the data dashboard, whose production and design I led.',

    /* SHORT VERSIONS for the three-column row (her note FS33, 2026-09-30:
       "shorten text to all match (lorin will edit later)"). PROVISIONAL.
       Cut and compressed from her own sentences above; no new wording.
       The full `why` and `research` stay above, untouched, as the source
       for her edit. The outcome (23 words) is the length target. */
    short: {
      /* Her copy 2026-09-30 (FS107), verbatim. */
      why:
        /* FS158: “is a” → began as a (the pilot has ended; Groundswell keeps running) */
        'Groundswell began as a 9-month pilot program and quality improvement study designed to support the well-being of UPMC Magee-Womens Cancer Services staff by introducing resources that honor the emotional complexities of oncology care.',
      /* Her copy 2026-09-30 (FS104). Copy edits, hers to reverse: “self care”
         → self-care; “wellbeing” → well-being (the site's spelling);
         “neglected from” → neglected in; a serial comma before the last
         item. FS106 removed “This is a culture change problem:”. Her original, verbatim:
         "Interviews and generative workshops with staff across roles
         revealed the core thesis: care worker wellbeing is neglected from
         patient care standards. This is a culture change problem: Staff
         need tangible and emotional support, permission to perform self
         care and acknowledgement of the difficulty of the work." */
      research:
        /* FS113 trim to match the project column's line count: “with staff” →
         cut; “to perform” → for; “of the difficulty of the work” → of the
         work’s difficulty. */
        'Interviews and generative workshops across roles revealed the core thesis: care worker well-being is neglected in patient care standards. Staff need tangible and emotional support, permission for self-care, and acknowledgement of the work’s difficulty.',  /* FS158: kept in the present, a standing finding like “is neglected”; “needed” pushed this column a line past its pair */
    },

    /* FS141, PROVISIONAL: the dashboard, expanded, in her first person to
       match the paragraph above; every term verified in the dashboard repo
       (see the dashboard component's FS140 note). Hers to edit. */
    roleMore:
      'For the data dashboard, I designed and built a full-stack site with Claude Code: a Next.js front end with Three.js watercolor views, a Neon PostgreSQL database, and three pipelines that normalize research assistants’ transcriptions of the handwritten art wall responses, pull live sessions from the pod’s Density occupancy sensor, and sync listening data from the YouTube Analytics API. I built a password-protected admin hub for uploads and review, audited the pod data with Density’s team after finding that their API dropped real visits, ran an accessibility audit, and wrote the methodology documentation.',

    /* Her copy 2026-08-27, verbatim. */
    partners:
      'A collaboration between Carnegie Mellon School of Design, the University of Pittsburgh Schools of Medicine and Nursing, and UPMC Magee-Womens Hospital Gynecologic Oncology, with assistance from the UPP Department of OBGYN and Women’s Health.',
  },

  /* THE COMPONENTS. All her copy 2026-08-27, verbatim, with her own "Redo"
     applied to the art wall. `mine` is her contribution to that component,
     selected from rehearsal Q3 — role clarity where the evidence is, rather
     than as one generic claim up top. */
  components: [
    {
      key: 'garden',
      /* Motion IS the content: a wall fills up over months. A still can
         show the object but not the accumulation. */
      media: {
        /* FS120: 'gs-intro-artwall' was the DASHBOARD's intro screen, not the
           wall, and was mislabeled here; it moved to the dashboard. */
        stills:  [
          { key: 'gs-artwall',           alt: 'A staff member adds a contribution to the Groundswell Garden wall.' },
          { key: 'gs-artwall-detail-01', alt: 'Writing a response to one of the guided prompts at the wall.' },
          { key: 'gs-artwall-detail-02', alt: 'Close detail of the painted flowers and pinned contributions.' },
          { key: 'gs-artwall-detail-03', alt: 'A staff member points to a contribution on the wall.' },
          /* FS121: this component's own view in the data dashboard, lightly
             blurred (FS120) so the design reads and the numbers do not. */
          { type: 'video', key: 'gs-display-view', blur: 5, alt: 'The art wall in the data dashboard: each emotion as a painted bubble, sized by how often it was chosen.' },
        ],
      },
      name: 'Groundswell Garden Community Art Wall',
      body: 'The Groundswell Garden is a community art wall where the emotional realities of oncology work can be witnessed, shared, and honored. Through guided prompts that explore the complex spectrum of grief, healthcare staff and the broader community anonymously contribute messages of support, creating a living tapestry of human stories at the heart of cancer care.',
      /* Her copy 2026-09-30 (FS134). Copy edits: a comma before “although”;
         “hand-written” → handwritten. Original: "I led brand copywriting
         although the language came from the research and collaborations. I
         worked with Claude Code to translate hand-written data collected by
         research assistants into the interactive dashboard." */
      /* FS139: her FS134 line, recast without “I” */
      /* FS158: one series, no nested commas. Before: "Brand copywriting, with language drawn from the research and collaborations, and translation of handwritten data collected by research assistants into the interactive dashboard, built with Claude Code." */
      mine: 'Brand copywriting drawn from the research and collaborations, and translation of research assistants’ handwritten data into the interactive dashboard, built with Claude Code.',
    },
    {
      key: 'pod',
      /* Spatial: you have to move through it. Walkthrough leads, then the
         object and its details, plus the facade she had to redesign when
         admin required doors. */
      media: {
        /* FS148: leads with the pod photo, then the walkthrough. */
        stills:  [
          { key: 'gs-pod',             alt: 'The Groundswell Restorative Pod in the hallway.' },
          { type: 'video', key: 'gs-walkthrough-video', alt: 'Walkthrough of the Groundswell Restorative Pod.' },
          { key: 'gs-pod-detail-01',   alt: 'Two staff members at the table inside the pod.' },
          { key: 'gs-pod-detail-02',   alt: 'Reflection cards and the pod’s invitation to set down what you carry.' },
          { key: 'gs-pod-detail-03',   alt: 'Opening the mindfulness library on a phone inside the pod.' },
          { key: 'gs-making-facade',   alt: 'The pod’s painted facade, redesigned when doors were required.' },
          { type: 'video', key: 'gs-pod-data', blur: true, alt: 'The pod in the data dashboard: minutes of use by month.' },
        ],
      },
      name: 'Groundswell Restorative Pod',
      body: 'A dedicated space for staff to process emotions, decompress, and recognize restoration as essential to care work. Designed for ease and impact, it offers calming visuals, guided meditations, reflection cards, and hands-on mindfulness tools that turn even a brief break into meaningful support.',
      /* Her copy 2026-09-30 (FS136). Copy edits: “wood working” →
         woodworking; “density” → Density (the company, as in her credits).
         Original: "I secured over $40k value in donations and partnerships
         that built the pod: the pod structure, finger labyrinths, wood
         working, Schlage locks, density sensor hardware and software, and a
         meditation teacher to co-write and record the custom meditations." */
      /* FS138: “over $40k value in donations” → material and service
         donations (no money changed hands). */
      /* FS139: her FS136/FS138 line, recast without “I” */
      /* FS158: noun-led like the other four. Before: "Securing the material and service donations and partnerships that built the pod: the pod structure, …" */
      mine: 'Material and service donations and partnerships secured to build the pod: its structure, finger labyrinths, woodworking, Schlage locks, Density sensor hardware and software, and a meditation teacher to co-write and record the custom meditations.',
    },
    {
      key: 'library',
      /* The medium is SOUND, so the lead is a player, not a picture. The
         AudioPlayer + useSharedAudio already exist and coordinate pausing
         across players - this is her poem request, already built.
         The reflection cards show as a contrasting row (her notes
         2026-09-06: full section width; three if two reads too big): the
         deck's poles plus its most workaday state between them, at the
         cards' true proportions. Any other set is a one-line swap here. */
      /* Round FS47 (2026-09-30): four things to show, presented as three.
         THE GALLERY: photographs of the cards in use, beside the rail like
         every other component. THE PHONE: the real iPhone recording of the
         digital library, auto-playing. THE POEM: it is an item inside that
         library, so it plays inside the phone (the screen turns to its
         words) instead of taking a card of its own. THE CARDS: the flip
         deck, in one row with the phone. The dashboard's meditation view
         that used to lead this gallery moved to the dashboard, where it
         belongs. */
      media: {
        stills:   [
          { key: 'gs-cards',      alt: 'Hands sorting the Groundswell Reflection Cards on a table.' },
          { key: 'gs-mockups-43', alt: 'Reading the back of the exhausted card.' },
          { key: 'gs-mockups-50', alt: 'The reflection card deck spread across a table.' },
          { type: 'video', key: 'gs-new-meditations', blur: true, alt: 'The mindfulness library in the data dashboard: listens for each meditation.' },
        ],
        phone:    { key: 'gs-qr-library', alt: 'Scrolling the Groundswell digital library on a phone.' },
        /* FS144: the two recordings, as plain players in the text column
           (no longer inside the phone, which showed more than staff saw). */
        listen:   [
          { key: 'gs-poem-remember',   title: 'Remember',                kind: 'The Groundswell poem' },
        ],
        /* Her note FS50: the two most-used cards, grateful and exhausted,
           show the dichotomy. They flank the phone: the library holds
           both ends of the feeling. */
        gallery:  { kind: 'cards', faces: 'front-and-back',
                    /* FS144: four cards, the lighter emotions left of the
                       phone and the heavier right, so the row reads as a
                       spectrum; grateful and exhausted (the most used) sit
                       nearest the phone. */
                    emotions: ['joyful', 'grateful', 'exhausted', 'heartbroken'],
                    /* FS149: the card frame browses the full set of emotion
                       cards, opening on the two most used. */
                    /* FS152: four cards, two contradicting pairs, alternating
                       so each next card answers the last. */
                    deck: ['grateful', 'exhausted', 'joyful', 'heartbroken'],
                    note: 'Four of the nine reflection cards. Turn one over for its somatic exercise.' },
      },
      name: 'Groundswell Mindfulness Library',
      body: /* FS158: a comma before “including”; “The” before the cards; the repeated “reflection cards” cut. */
      'A digital library of mindfulness resources, including guided meditations of varying lengths, the Groundswell poem, and calming instrumentals. The Groundswell Reflection Cards are part of the library: a guided deck designed to help healthcare staff identify and process the complex emotions of caregiving work. Each card offers emotional validation, simple somatic exercises for nervous system regulation, and conversation starters for meaningful dialogue about well-being.',
      /* Her copy 2026-09-30 (FS137). Copy edits: typos (“fpr”, “preprared”);
         “micro-site” → microsite; “the” before YouTube channel; a closing
         period. Original: "I applied my knowledge of somatic bodywork to
         draft the reflection cards and copy fpr the poem and custom
         meditation, coordinated with meditation teachers to write and
         record additional custom meditations, selected the featured
         instrumentals, designed the micro-site and preprared YouTube
         channel" */
      /* FS139: her FS137 line, recast without “I” */
      /* FS158. Before: "…coordination with meditation teachers to write and record additional custom meditations; selection of the featured instrumentals; and design of the microsite and YouTube channel." */
      mine: 'Copy for the reflection cards, poem, and custom meditation, grounded in somatic bodywork; coordination of meditation teachers who wrote and recorded more custom meditations; curation of the instrumentals; and design of the microsite and YouTube channel.',
      /* Her build request, 2026-08-27: "I want to embed a player for the poem
         as an interactive component." Not built yet. */
      wants: 'An embedded player for the Groundswell poem.',
    },
    {
      key: 'ctb',
      /* A document. Motion adds nothing; the copy is the artifact. */
      media: {
        lead:    { type: 'image', key: 'gs-ctb-email', alt: 'The redesigned Ceased to Breathe email template.' },
        stills:  [
          { key: 'gs-ctb-detail-01',     alt: 'The redesigned email template in a browser window.' },
          { key: 'gs-ctb-detail-02',     alt: 'The email template open on a laptop.' },
          { key: 'gs-ctb-detail-03',     alt: 'Typing into the email template.' },
          { key: 'groundswell-ctb-docs', alt: 'The email template open at a workstation in the office.' },
        ],
      },
      name: 'Ceased to Breathe (CTB) Email Template',
      body: /* FS158 copy edit, tightened. Before: "The updated Ceased to Breathe
         (CTB) email template builds upon the firm foundation of existing
         staff-led support initiatives for patient death notifications by
         softening the emotional tone of delivering devastating news. The
         addition of empathetic language and comforting visuals creates a
         communal space where the emotional realities of oncology work can be
         acknowledged, shared, and honored by recognizing both the
         professional and personal impact of patient loss." */
      'The updated Ceased to Breathe (CTB) email template builds on the firm foundation of an existing staff-led practice for patient death notifications, softening the tone of devastating news. Empathetic language and comforting visuals make it a communal space where the emotional realities of oncology work can be acknowledged, shared, and honored, recognizing both the professional and personal impact of patient loss.',
      /* FS139: her copy, verbatim (FS139) */
      /* FS158: her FS139 line, “creation of” cut and the last item tightened. Before: "Copy and template drafting, creation of onboarding materials for staff, and coordination and troubleshooting with key stakeholders in the hospital." */
      mine: 'Copy and template drafting, onboarding materials for staff, and coordination and troubleshooting with key hospital stakeholders.',
    },
    {
      key: 'dashboard',
      /* Interactive, so video is the honest way to show it. Gated: real
         patient care data behind the blur (GatedOverlay). */
      media: {
        lead:    { type: 'video', key: 'gs-intro-artwall', blur: true, alt: 'The data dashboard’s opening screen.' },
        also:    [
          { type: 'video', key: 'gs-display-view', blur: 5, alt: 'The art wall view: each emotion as a painted bubble, sized by how often it was chosen.' },
          { type: 'video', key: 'gs-pod-data', blur: true, alt: 'The pod view: minutes of use by month.' },
          { type: 'video', key: 'gs-new-meditations', blur: true, alt: 'The mindfulness library view: listens for each meditation.' },
        ],
      },
      name: 'The data dashboard',
      body: /* FS158: present tense like the other four components; the doubled “translated” fixed. Before: "An interactive platform that translated the data collected from each component into an immersive storytelling experience that translated lived experience into actionable metrics. It combined qualitative and quantitative findings in one place, showcasing the importance of telling a well-rounded story." */
      'An interactive platform that turns the data collected from each component into an immersive story, translating lived experience into actionable metrics. It brings qualitative and quantitative findings together in one place to tell a well\u2011rounded story.',  /* non-breaking hyphen: the compound never splits across the last line */
      /* FS140, PROVISIONAL: her notes, phrased from the dashboard repo
         (~/Desktop/groundswell-digital-wall-with-admin, 226 commits,
         2026-01-21 → 2026-07-22). Verified terms: Next.js/React on Vercel,
         Neon serverless PostgreSQL, three pipelines (transcribed art-wall
         spreadsheets normalised per response; Density Sessions API v3;
         YouTube Analytics API via Google OAuth), a password-gated admin hub
         with de-duplicating uploads, Three.js (React Three Fiber) watercolor
         views. Density: the 2026-04-25 outage fix and the audit showing the
         Sessions API drops real visits (103 active days → 66). Also in the
         record, not in this line: a 31-finding accessibility audit, a
         methodology PDF with an AI disclosure, a stakeholder summary page,
         a staff surveys view, CSV export. */
      /* FS141: concise; the detail moved to “My role, in full” (roleMore). */
      /* FS158: the same X, Y, and Z series as the other four. Before: "Full-stack design and development with Claude Code: three live data pipelines, a PostgreSQL backend, and an admin hub; a data audit with Density’s engineers; playtests and co-design of the results visual with clinical staff." */
      mine: 'Full-stack design and development with Claude Code (three live data pipelines, a PostgreSQL backend, and an admin hub), a data audit with Density’s engineers, and playtests and co-design of the results visual with clinical staff.',
      gated: true,
    },
  ],

  /* FS161–FS163 (2026-10-01): her image edits. Research + flower-04, coats-01,
     coats-03; Production + build-01, playtest-01; removed context-03 and
     flower-02 (still used by the older case-study pages, untouched). New
     alts are described from the photos, hers to rewrite. */
  /* BEHIND THE SCENES, in two phases (FS131): research, then production.
     Photos chosen and sorted by what each shows; captions are furniture
     (described from the photos), hers to rewrite. */
  process: [
    {
      title: 'Research',
      images: [
        { key: 'gs-sense-affinity-01', alt: 'Affinity mapping interview findings on the wall.' },
        { key: 'gs-sense-affinity-02', alt: 'The team talking through the synthesis wall.' },
        { key: 'gs-sense-affinity-03', alt: 'Mapping the tetrahedron analysis.' },
        { key: 'gs-workshop-grief-01', alt: 'The grief workshop with oncology staff.' },
        { key: 'gs-workshop-grief-02', alt: 'Staff working through prompts at the grief workshop.' },
        { key: 'gs-workshop-flower-01', alt: 'The flower workshop at the table.' },
        { key: 'gs-workshop-flower-04', alt: 'Staff coloring “Nourishing the Flower” worksheets at the flower workshop.' },
        { key: 'gs-workshop-coats-01',  focus: '50% 15%',  /* portrait: keep the faces in the cover crop */ alt: 'Two team members with a basket of paper orchids beside an orchid prompt poster.' },
        { key: 'gs-workshop-coats-03',  alt: 'Paper orchids and “Thank you” cards inviting staff to share their experience.' },
      ],
    },
    {
      title: 'Production',
      images: [
        { key: 'gs-making-prototype-01', alt: 'Early prototypes of the finger labyrinths and reflection cards.' },
        { key: 'gs-making-mockup-01',    alt: 'Design options for the pod’s painted facade.' },
        { key: 'gs-making-figma-01',     alt: 'Laying out the art wall’s pieces and signage in Figma.' },
        { key: 'gs-making-build-01',     alt: 'A thumbs-up beside the nearly finished pod in the studio.' },
        { key: 'gs-making-build-04',     alt: 'Laying out a printed mural panel.' },
        { key: 'gs-making-build-05',     alt: 'Fitting the facade panels.' },
        { key: 'gs-making-build-02',     alt: 'Assembling the pod’s interior.' },
        { key: 'gs-making-install-01',   alt: 'Installing the pod in the hallway.' },
        { key: 'gs-playtest-01',         alt: 'Setting out reflection cards beside the Groundswell signage for a playtest.' },
        { key: 'gs-playtest-03',         alt: 'Playtesting the pod with staff.' },
        { key: 'gs-finale',              alt: 'A hug in front of the art wall at the finale.' },
      ],
    },
  ],
  processTitle: 'Behind the scenes',


  /* Her note 2026-09-06: "We need to credit Kevin Lorenzi photography."
     Rendered at the foot of the close, beside the partners line. Exact
     wording hers to adjust. */
  credit: 'Photography by Kevin Lorenzi.',

  close: {
    /* Her copy 2026-08-27 for the measures; rehearsal Q7 part 2 for the
       qualitative half, which she bounded honestly herself. */
    /* FS116: the result sentence removed (no explicit study outcomes);
       the method stays. */
    outcomes:
      /* FS158: scale names in one case; “well-being” in the prose. Before: "Our clinical partners ran pre, mid, and post surveys measuring six validated scales on workplace culture and wellbeing: Burnout frequency, Exhaustion/Dread, Turnover Intention, Compassion fatigue, Workplace Wellbeing, and Perceived Support." */
      'Our clinical partners ran pre-, mid-, and post-pilot surveys on six validated scales of workplace culture and well-being: Burnout Frequency, Exhaustion/Dread, Turnover Intention, Compassion Fatigue, Workplace Wellbeing, and Perceived Support.',

    qualitative:
      /* FS158: one tense (past), the closing fragment made a sentence. Before: "There is significant documented usage and participation: commitment to offer donations to keep it running, tears shed at launch by senior staff who were originally skeptical, stories of people using it regularly, a moment Dr. Taylor witnessed a staff member in distress and others flock around them and encourage them to go use the pod. Interest from other departments." */
      'Usage and participation were significant and documented: a commitment of donations to keep it running, tears at launch from senior staff who had been skeptical, stories of people using it regularly, and a moment when Dr. Taylor saw coworkers gather around a staff member in distress and encourage them to go to the pod. Other departments expressed interest.',

    /* Rehearsal Q6. The strongest thing in the corpus and the reason the
       project reads as credible rather than tidy. */
    takeaway:
      /* FS158: one tense (past); “who was reading it as a flaw” clarified
       to what happened in the content review (hers to check). Before: "A
       senior staff member broke down into tears during a content review and
       revealed that she felt deeply hurt by the language surrounding the
       Ceased to Breathe email. It had been framed to us as a cold clinical
       protocol that lacked human touch. Unbeknownst to us, it was indeed
       created by a human, the very person in the room who was reading it as
       a flaw. This was a thoughtful staff innovation, developed only as far
       as it could be to stay manageable amid roles that are already
       drowning. We had been framing the system as a problem and a common
       enemy. What we needed to do instead was to highlight the immense
       strength, innovation, and support that was keeping this system alive
       for decades." */
      'A senior staff member broke down in tears during a content review and revealed that she felt deeply hurt by the language surrounding the Ceased to Breathe email. It had been framed to us as a cold clinical protocol that lacked human touch. Unbeknownst to us, a person had created it: the very person in the room, reading our description of her work as a flaw. It was a thoughtful staff innovation, developed only as far as it could go while staying manageable in roles that were already drowning. We had been framing the system as a problem and a common enemy. What we needed instead was to highlight the immense strength, innovation, and support that had kept this system alive for decades.',
  },

  /* ACKNOWLEDGEMENTS (FS187, 2026-10-01): replaces the three-column team
     area. Source: the hidden Groundswell page's "In gratitude" section,
     components/Groundswell/GroundswellContent.js:967 (her words, kept there
     verbatim), revised to be concise at her request. Kendyl Grant added
     from her FS93 clinical team. Dollar values left out while $30k vs $40k
     is open. The `credits` above stay as the record. */
  acknowledgements: {
    /* FS188: shortened to hold one line beside the partners line */
    intro: 'Shaped by the voices of Magee’s oncology staff.',
    /* FS188: tightened to sit beside the one-line lead */
    partners: 'With Carnegie Mellon’s School of Design, Pitt’s Schools of Medicine and Nursing, and UPMC Magee-Womens Gynecologic Oncology.',
    columns: [
      {
        title: 'Leadership',
        people: [
          ['Kristin Hughes, MFA', 'Project Lead and Principal Investigator, CMU'],
          ['Sarah E. Taylor, MD, PhD', 'Principal Investigator, UPMC Hillman Cancer Center'],
          ['Grace Campbell, PhD, MSW, RN', 'Supervising Faculty, Duquesne University'],
          ['Heidi Donovan, PhD, RN', 'Supervising Faculty, Pitt School of Nursing'],
          ['Kendyl Grant', 'Director of Operations, Gynecologic Oncology, UPMC'],
        ],
      },
      {
        title: 'Design & Production',
        people: [
          ['Lorin Anderberg, MA', 'Design, development, research, production, coordination, donor outreach'],
          ['Elijah Benzon, MA', 'Design, development, research, production'],
          ['Kelly McDowell', 'Design, development, research'],
          ['Robertus Sucahyo, MBA', 'Development, research'],
          ['Greg Baltus, Hardware Assembly', 'Design, engineering, fabrication'],
          ['Su Hong & Mia Jeong', 'Research assistants'],
          ['Kevin Lorenzi', 'Photography'],
        ],
      },
      {
        title: 'Art, Donors & Funding',
        people: [
          ['Carolyn Gavin', 'Artwork, the visual thread through every component'],
          ['Catherine Liggett & Mark Staley', 'Custom guided meditations and poetry'],
          ['NookPod', 'The restorative pod structure'],
          ['Ryan Thompson', 'Walnut tabletop, from wood donated by Eleanor Mackie Pigma'],
        ],
        note: 'With Fox Woodworks, Schlage, Density, Dixie&Grace, Z9 Machinings, EHC Industries, Deborah Linhart, Pamela Meadowcroft, Marge Petruska, and Mark Baskinger. Funded by the College of Fine Arts at CMU, the UPMC Magee-Womens Hospital Medical Staff Fund, and the Paul D. Schurgot Foundation.',
      },
    ],
    /* FS188: the closing thank-you removed at her request. */
  },

  /* THE REFLECTION (FS164–FS186, 2026-10-01): replaces the old close
     cards on the sheet. Built in the lab (/projects/groundswell/close-lab),
     her pick C. Every card: mark · label · a from → to shift · three
     bullets, each led by her own two-word head (FS181). Sources: her
     freestyle (FS174, verbatim in close-lab/page.js) and her rehearsal
     answers (R). The old `close` fields above stay as the record. */
  reflection: [
  {
    id: 'sense', verb: 'Sense', title: 'What I learned',
    /* FS182: arrows. Her “Start With What’s Working”, as a shift. Not her
       “Designer Innovations → Community Wisdom”: it would say the same
       thing as Shape’s Designer-Led → Community-Led. */
    shift: ['What’s Broken', 'What’s Working'],
    list: [
      { head: 'Build Trust', text: 'With subject matter this emotional, the work had to speak to staff experience and earn trust across hierarchy before it could solve\u00a0anything.' },
      { head: 'Be Relational', text: 'Pre-existing relationships opened the door, and a transdisciplinary team of designers, clinicians, makers, artists, and donors kept it\u00a0moving.' },
      { head: 'Bridge Gaps', text: 'We couldn’t change what matters most, like pay, time off, and staffing, but respected doctors and administrative fellows carried staff realities to\u00a0leadership.' },
    ],
  },
  {
    id: 'weave', verb: 'Weave', title: 'What I’ll carry forward',
    shift: ['Theoretical', 'Tangible'],  /* hers, FS182 */
    list: [
      /* R Q3: “I specifically drafted the workshop to be trauma-informed and
         responsive by providing a worksheet for mindfulness and wellbeing
         with journal prompts and somatic exercises so as to not be
         extractive in collecting emotional data.” */
      { head: 'Practice Reciprocity', text: 'In the grief workshop I led, staff left with a worksheet of journal prompts and somatic exercises, so we gave back as much as we\u00a0asked.' },
      /* R Q6: doors required late; redesigned; playtesters confirmed. */
      { head: 'Embrace Constraints', text: 'When admin required doors late in production, we redesigned in acrylic, and playtesters found the pod private without feeling closed\u00a0off.' },
      /* R Q3: the dashboard she led; freestyle: voices to administrators. */
      { head: 'Innovate Intentionally', text: 'I designed and built the data dashboard, the one component I led, so what staff told us reached the administrators who could act on\u00a0it.' },
    ],
  },
  {
    id: 'shape', verb: 'Shape', title: 'What’s next',
    shift: ['Designer-Led', 'Community-Led'],  /* hers, FS182 */
    list: [
      { head: 'Build Capacity', text: 'With enough respite to stop drowning, staff could start the conversations their days rarely allowed and innovate together on\u00a0solutions.' },
      { head: 'Expand Engagement', text: 'Creative expression workshops drew strong turnout throughout the pilot, so programming will grow beyond the\u00a0installation.' },
      /* R Q8: “staff-led and structurally supported beyond the components” */
      { head: 'Community Ownership', text: 'The next iteration involves more staff in shaping it, so Groundswell becomes staff-led and continues beyond the\u00a0pilot.' },
    ],
  },
],

  /* OPEN, and hers to settle. Logged here so none of it gets lost.
     1. She wrote "4 core components" and then named five (Garden, Pod,
        Library, CTB, dashboard). Which is the canonical count, and is the
        dashboard a component or the reporting layer above them?
     2. Reflection Cards: inside the Library, or a component of their own?
        Her copy puts them inside; the earlier build treated them as one of
        four interventions.
     3. Timeline dates for the metadata row.
     4. Publishability: her own flag from rehearsal Q7, "not sure what numbers
        I can give or data that can be public.. these are design data not IRB
        survey data." The six-scale results are survey data. CONFIRM WITH
        UPMC PARTNERS BEFORE THIS GOES PUBLIC. */
}

/* No orphans (FS158): text-wrap: pretty does not guarantee it, so every
   paragraph's last two words are tied with a no-break space. */
const tie = (t) => (typeof t === 'string' ? t.replace(/ (\S+)$/, '\u00a0$1') : t)
groundswell.outcome = tie(groundswell.outcome)
for (const k of ['why', 'research', 'role', 'roleMore', 'partners']) groundswell.frame[k] = tie(groundswell.frame[k])
for (const k of ['why', 'research']) groundswell.frame.short[k] = tie(groundswell.frame.short[k])
for (const c of groundswell.components) { c.body = tie(c.body); c.mine = tie(c.mine) }
for (const k of ['outcomes', 'qualitative', 'takeaway']) groundswell.close[k] = tie(groundswell.close[k])
groundswell.credits = groundswell.credits.map(([label, text]) => [label, tie(text)])

export default groundswell
