/* FS170 DRAFTS (2026-10-01). Every line is compressed from Lorin's own
   words under her standing copyedit permission; each carries its receipt.
   R = docs/deck-system/rehearsal/groundswell-answers.md (her verbatim
   answers). CS = content/projects/groundswell.md (her case-study copy).
   Nothing here is on the sheet until she approves it. */

/* Why an ecosystem (Q4: what was rejected). R, Q2: “We had many ideas when
   it came time for midterm review but they all felt independent and not
   interconnected… ROI calculator… A parking pass that becomes a reward…
   Volunteers… Games: card decks… Kristin guided us to find a way to
   ‘string the pearls’… That’s when we realized it could be an ecosystem
   solution and not one standalone.” */
export const ECOSYSTEM = {
  label: 'Why an ecosystem',
  line: 'At midterm, the best ideas stood alone: an ROI calculator, a parking-pass reward, staff volunteers, card games. Kristin pushed us to “string the pearls,” and the five components became one\u00a0ecosystem.',
}

/* What shaped each component (Q5: evidence → decisions). */
export const SHAPED = [
  {
    name: 'Groundswell Garden Community Art Wall',
    bullets: [
      /* R, Q2: “emotional outlet for feedback (art wall)” and “Annonymous
         art wall for emotional expression and feedback that is public
         facing.” */
      'Began in rapid ideation as an anonymous, public outlet for emotional expression and\u00a0feedback',
      /* R, Q2: “Recognition for roles became a core aspect of the public
         installation’s language, the poem, and the workshop…” */
      'Research surfaced recognition as a core need, so the installation’s public language recognizes every\u00a0role',
    ],
  },
  {
    name: 'Groundswell Restorative Pod',
    bullets: [
      /* R, Q2: “that 10-15 minute gap of time for yourself to reset became
         foundational to the pod and language around use.” */
      'Ideation kept returning to a 10–15 minute reset, so the pod is built and worded around\u00a0one',
      /* R, Q3 follow-up: “shortening the table to make it more comfortable
         for bigger bodies… the best configuration for the table’s
         centerpiece (center for cross table interaction)… music makes all
         the difference so instructions start with music.” Her open ask:
         better phrasing for “bigger bodies”. */
      'Playtests changed the build: a shorter table for larger bodies, a centered centerpiece for conversation, and instructions that start with\u00a0music',
      /* R, Q6: “admin told us we needed doors on the pod or the install would
         be a no-go… Playtesters confrimed this was a benefit and the arcylic
         made it not feel too disconnected or clostrophobic.” */
      'When admin required doors late in production, we redesigned in acrylic: private, without feeling closed\u00a0off',
    ],
  },
  {
    name: 'Groundswell Mindfulness Library',
    bullets: [
      /* R, Q3: “switching the tagline from grief to restoration becaues the
         work is so much more than the grief which really informed how we
         held the complexity of grief, exhaustion, joy, gratitude all at
         once.” */
      'Copy feedback moved the tagline from grief to restoration, so the cards hold grief, exhaustion, joy, and gratitude\u00a0together',
      /* R, Q2: “Games: card decks to facilitate conversations at work” →
         “Reflection cards create interactive opportunity to discuss workload
         and practice self care around grief and burnout.” */
      'The cards began as a midterm idea for decks that open conversations at\u00a0work',
    ],
  },
  {
    name: 'Ceased to Breathe (CTB) Email Template',
    bullets: [
      /* CS:207: “integrating a low-effort change to an Outlook email
         template… without over-burdening staff with administrative
         overhead.” + R, Q6: “manageable and maintainable amid roles that are
         already drowning.” */
      'A low-effort change to the existing Outlook template, so it adds no work to roles already\u00a0stretched',
      /* CS:207: from “the system has let you down” to “you have already
         created a beautiful culture of care.” */
      'Reframed from “the system has let you down” to “you have already created a beautiful culture of\u00a0care”',
    ],
  },
  {
    name: 'The data dashboard',
    bullets: [
      /* R, Q1 addendum: “as the design team in the study we took ownership of
         usage data: pod sensor, art wall, counting CBT emails sent, and
         YouTube meditations” + Q7: “these are design data not IRB survey
         data.” */
      'The design team’s usage data (pod sensor, art wall, CTB emails, listens) kept separate from the clinicians’ survey\u00a0data',
      /* FS140 (verified in the dashboard repo): the Density audit showed the
         Sessions API dropping real visits. */
      'An audit with Density’s team showed their API was dropping real pod\u00a0visits',
      /* FS140, her notes: “co-designed the visual of the study results with
         clinical staff.” */
      'The results visual was co-designed with clinical staff in\u00a0playtests',
    ],
  },
]
