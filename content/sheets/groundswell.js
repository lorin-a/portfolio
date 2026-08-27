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
  outcome:
    'All scales aside from perceived support from leadership improved throughout the study, indicating a core problem around institutional trust and support from administration.',

  meta: [
    ['Role', 'Brand, copy, workshop facilitation, data visualization'],
    ['Team', 'Carnegie Mellon School of Design, with UPMC and Pitt partners'],
    ['Timeline', { todo: 'The 15-week CARES course, then the 9-month pilot. Dates?' }],
    ['Context', 'UPMC Magee-Womens Cancer Services'],
  ],

  frame: {
    /* Her copy 2026-08-27, verbatim. */
    why: 'Groundswell is a 9-month pilot program designed to support the emotional well-being of UPMC Magee-Womens Cancer Services staff by introducing resources that honor the emotional complexities of oncology care. Groundswell fosters a culture where grief is acknowledged, isolation transforms into belonging, and self-care is honored as essential to delivering excellent patient care.',

    /* Rehearsal Q1 + Q2 + Q3. The thesis is her verbatim phrasing; the
       permission/acknowledgement finding is the grief workshop's result. */
    research:
      'A lit review, shadowing with AEIOU and contextual inquiry, and interviews across roles from front desk to nurse manager to chemo nurse. Affinity mapping and tetrahedron analysis synthesized it into one thesis: care worker wellbeing is neglected from patient care standards. The grief workshop went further. It revealed core insights that staff need permission (from peers, who will cover their workload, and higher-ups, that there will not be repercussions) and acknowledgement (of the emotional toll of the work, that they did the best they could).',

    /* Rehearsal Q3, selected. The last line is the one that makes the rest
       credible; it is the answer to the disqualifier question. */
    role:
      'During the CARES course I was an equal participant in research but I did lead team structure and organization of files and documentation. When it came to developing the Groundswell brand, I led that research and copywriting. I found the name after doing a lot of research on nature metaphors and oncology symbolism. I drafted workshop scripts and led facilitation of the grief workshop, and specifically drafted it to be trauma-informed and responsive so as not to be extractive in collecting emotional data. During the pilot I was remote in NYC, so I led copy drafting and budget documentation, and I secured donations and partnerships. I applied my knowledge of somatic bodywork to draft the reflection cards. Once the study was running, I led data visualization of the collected data. We all participated in collective feedback, strategizing, prototyping, but I did not own any specific component.',

    /* Her copy 2026-08-27, verbatim. */
    partners:
      'A collaboration between Carnegie Mellon School of Design, the University of Pittsburgh Schools of Medicine and Nursing, and UPMC Magee-Womens Hospital Gynecologic Oncology with assistance from the UPP Department of OBGYN and Women’s Health.',
  },

  /* THE COMPONENTS. All her copy 2026-08-27, verbatim, with her own "Redo"
     applied to the art wall. `mine` is her contribution to that component,
     selected from rehearsal Q3 — role clarity where the evidence is, rather
     than as one generic claim up top. */
  components: [
    {
      key: 'garden',
      name: 'Groundswell Garden Community Art Wall',
      body: 'The Groundswell Garden is a community art wall where the emotional realities of oncology work can be witnessed, shared, and honored. Through guided prompts that explore the complex spectrum of grief, healthcare staff and the broader community anonymously contribute messages of support, creating a living tapestry of human stories at the heart of cancer care.',
      mine: 'I led the brand research and copywriting, including the guided prompts.',
    },
    {
      key: 'pod',
      name: 'Groundswell Restorative Pod',
      body: 'A dedicated space for staff to process emotions, decompress, and recognize restoration as essential to care work. Designed for ease and impact, it offers calming visuals, guided meditations, reflection cards, and hands-on mindfulness tools that turn even a brief break into meaningful support.',
      mine: 'I secured the donations and partnerships that built it: NookPod, finger labyrinths, wood working, Schlage locks, density sensor hardware and software, and a meditation teacher partner.',
    },
    {
      key: 'library',
      name: 'Groundswell Mindfulness Library',
      body: 'A digital library of mindfulness resources including guided meditations of varying lengths, the Groundswell poem, and calming instrumentals. Groundswell Reflection Cards are part of the library: a deck of guided reflection cards designed to help healthcare staff identify and process the complex emotions of caregiving work. Each card offers emotional validation, simple somatic exercises for nervous system regulation, and conversation starters for meaningful dialogue about well-being.',
      mine: 'I applied my knowledge of somatic bodywork to draft the reflection cards, and set up the recorded meditations and instrumentals.',
      /* Her build request, 2026-08-27: "I want to embed a player for the poem
         as an interactive component." Not built yet. */
      wants: 'An embedded player for the Groundswell poem.',
    },
    {
      key: 'ctb',
      name: 'Ceased to Breathe (CTB) Email Template',
      body: 'The updated Ceased to Breathe (CTB) email template builds upon the firm foundation of existing staff-led support initiatives for patient death notifications by softening the emotional tone of delivering devastating news. The addition of empathetic language and comforting visuals creates a communal space where the emotional realities of oncology work can be acknowledged, shared, and honored by recognizing both the professional and personal impact of patient loss.',
      mine: 'I led the copy drafting.',
    },
    {
      key: 'dashboard',
      name: 'The data dashboard',
      body: 'An interactive platform that translated the data collected from each component into an immersive storytelling experience that translated lived experience into actionable metrics. It combined qualitative and quantitative findings in one place, showcasing the importance of telling a well-rounded story.',
      mine: 'I led the data visualization of the collected data.',
      gated: true,
    },
  ],

  close: {
    /* Her copy 2026-08-27 for the measures; rehearsal Q7 part 2 for the
       qualitative half, which she bounded honestly herself. */
    outcomes:
      'Our clinical partners ran pre, mid, and post surveys measuring six validated scales on workplace culture and wellbeing: Burnout frequency, Exhaustion/Dread, Turnover Intention, Compassion fatigue, Workplace Wellbeing, and Perceived Support. All scales aside from perceived support from leadership improved throughout the study, indicating a core problem around institutional trust and support from administration.',

    qualitative:
      'There is significant documented usage and participation: commitment to offer donations to keep it running, tears shed at launch by senior staff who were originally skeptical, stories of people using it regularly, a moment Dr. Taylor witnessed a staff member in distress and others flock around them and encourage them to go use the pod. Interest from other departments.',

    /* Rehearsal Q6. The strongest thing in the corpus and the reason the
       project reads as credible rather than tidy. */
    takeaway:
      'A senior staff member broke down into tears during a content review and revealed that she felt deeply hurt by the language surrounding the Ceased to Breathe email. It had been framed to us as a cold clinical protocol that lacked human touch. Unbeknownst to us, it was indeed created by a human, the very person in the room who was reading it as a flaw. This was a thoughtful staff innovation, developed only as far as it could be to stay manageable amid roles that are already drowning. We had been framing the system as a problem and a common enemy. What we needed to do instead was to highlight the immense strength, innovation, and support that was keeping this system alive for decades.',
  },

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

export default groundswell
