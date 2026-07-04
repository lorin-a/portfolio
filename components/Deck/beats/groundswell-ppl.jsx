/* Groundswell → Public Policy Lab lens — the first Opportunity's beat pool.

   The PPL lens (research/social pole): lead with the human problem, foreground
   named methods + co-design, hold craft as evidence not headline, scope impact
   honestly, judged as a writing sample. Beats are ordered in that lens; the time
   dial selects which appear at 5 / 20 / 45.

   COPY: plain strings so they're editable in the cockpit; *asterisks* mark the
   accent-italic emphasis. Lorin's verbatim lines are used where they exist (the
   research question, the role line, "a system that holds them"). Structural copy
   is draft. Voice beats (a participant quote, the hard part, what she'd do
   differently) are marked to-write, never invented. Institution + counts from the
   live Groundswell site; confirm at the copy pass. */

const T = { all: ['5', '20', '45'], mid: ['20', '45'], long: ['45'] }

export const groundswellPPL = [
  {
    id: 'question',
    register: 'statement',
    beat: 'The question',
    question: 'Q1 · why it mattered',
    tiers: T.all,
    steps: 1,
    content: {
      eyebrow: 'Groundswell',
      headline: 'How might we create supportive environments where staff feel *nurtured, recognized, and celebrated?*',
    },
  },
  {
    id: 'stakes',
    register: 'statement',
    beat: 'The stakes',
    question: 'Q1 · who asked',
    tiers: T.mid,
    steps: 2,
    content: {
      eyebrow: 'the stakes',
      headline: 'A grant-funded quality-improvement study inside a *working hospital*.',
      caption: 'UPMC Magee-Womens Hospital · a live pilot with the staff it serves.',
    },
  },
  {
    id: 'role',
    register: 'statement',
    beat: 'My role',
    question: 'Q3 · what was mine',
    tiers: T.all,
    steps: 1,
    content: {
      eyebrow: 'my role',
      headline: 'I helped design Groundswell *with the people it serves.*',
    },
  },
  {
    id: 'structure',
    register: 'diagram',
    beat: 'How the work was structured',
    question: 'Q2 · the approach',
    tiers: T.mid,
    steps: 2,
    content: {
      headline: 'The work moved from listening, to synthesis, to *co-designing the response.*',
      gateLabel: 'the arc',
      items: [
        { label: 'Sense', text: 'listening with staff, in their own spaces' },
        { label: 'Weave', text: 'making meaning of what they carried' },
        { label: 'Shape', text: 'co-designing the response, together' },
      ],
      dest: { label: 'Grounded', sub: 'Every move traceable to staff experience.' },
    },
  },
  {
    id: 'heard',
    register: 'voice',
    beat: 'What we heard',
    question: 'Q5 · the evidence',
    tiers: T.mid,
    steps: 1,
    content: {
      chip: 'a participant said',
      placeholder: true,
      quote: 'a staff participant’s words go here — pulled from your co-design notes.',
    },
  },
  {
    id: 'ecosystem',
    register: 'diagram',
    beat: 'The response, as a system',
    question: 'Q4 · why this approach',
    tiers: T.all,
    steps: 2,
    content: {
      headline: 'Not one fix, but an *ecosystem* — four interventions across the day.',
      gateLabel: 'what we built, with staff',
      items: [
        { text: 'Community Art Wall' },
        { text: 'Restorative Pod' },
        { text: 'Reflection Cards' },
        { text: 'Close-the-Board email' },
      ],
      dest: { label: 'One system', sub: 'Scattered support becomes a system that holds them.' },
    },
  },
  {
    id: 'intervention',
    register: 'specimen',
    beat: 'One intervention, up close',
    question: 'Q4 · craft as evidence',
    tiers: T.mid,
    steps: 2,
    content: {
      headline: 'The *Community Art Wall*: a shared surface, made by staff, not for them.',
      media: { kind: 'image', src: '/images/groundswell/Groundswell_Install-05.jpg', alt: 'The installed Community Art Wall in a hospital corridor.' },
      annotations: [
        { label: 'Made with staff', text: 'Co-designed and staff-contributed, not decorated for them.' },
      ],
    },
  },
  {
    id: 'hardpart',
    register: 'statement',
    beat: 'The hard part',
    question: 'Q6 · what was hardest',
    tiers: T.mid,
    steps: 1,
    content: {
      eyebrow: 'the hard part',
      headline: '[ the hardest part of co-designing with people under strain — *Lorin to write* ]',
    },
  },
  {
    id: 'outcome',
    register: 'statement',
    beat: 'Outcome, scoped honestly',
    question: 'Q7 · what changed',
    tiers: T.all,
    steps: 2,
    content: {
      eyebrow: 'the outcome',
      headline: 'A funded pilot with ~30 staff — *a path, not a victory lap.*',
      caption: 'A live, grant-funded quality-improvement study, still running.',
    },
  },
  {
    id: 'different',
    register: 'statement',
    beat: 'What I’d do differently',
    question: 'Q8 · self-awareness',
    tiers: T.mid,
    steps: 1,
    content: {
      eyebrow: 'what I’d do differently',
      headline: '[ the honest what-I’d-change answer — *Lorin to write* ]',
    },
  },
  {
    id: 'method',
    register: 'diagram',
    beat: 'Appendix · method + sample',
    question: 'Q2 · on demand in Q&A',
    tiers: T.long,
    steps: 1,
    content: {
      headline: 'Method and sample, *on demand.*',
      gateLabel: 'appendix',
      items: [
        { text: 'Recruitment + consent — [ Lorin to confirm ]' },
        { text: 'Methods used — [ Lorin to confirm ]' },
        { text: '~30 staff participants' },
      ],
    },
  },
]
