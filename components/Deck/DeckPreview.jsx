'use client'

import DeckStage from './DeckStage'
import StatementFrame from './frames/StatementFrame'
import SpecimenFrame from './frames/SpecimenFrame'
import DiagramFrame from './frames/DiagramFrame'
import VoiceFrame from './frames/VoiceFrame'

/* The four register frames, one draft slide each, on real Birth Story material.
   The engine + register demo — the frames are the thing to react to; slide copy
   stays Lorin's. (The content-driven Opportunity build lives at
   /opportunities/groundswell-ppl.) */
const slides = [
  {
    id: 'statement',
    register: 'Statement',
    beat: 'Cold open — the punchline',
    question: 'Q7 · what changed',
    steps: 2,
    render: (p) => (
      <StatementFrame
        {...p}
        eyebrow="Birth Story · the punchline"
        figure={{ from: '4', to: '0' }}
        caption="questions before the first entry"
      />
    ),
  },
  {
    id: 'specimen',
    register: 'Specimen',
    beat: 'Evidence → decision',
    question: 'Q5 · evidence',
    steps: 3,
    render: (p) => (
      <SpecimenFrame
        {...p}
        headline={<>The app opens straight into <em>note-taking</em>, the thing parents most wanted.</>}
        media={{ kind: 'phone', src: '/images/birthstory/bs-doc-note.png', alt: 'The documentation screen: a blank note open for capture, with no form to complete first.' }}
        annotations={[
          { label: 'No triage screen', text: 'Nothing to answer first. The blank note is the front door.' },
          { label: 'One capture, many kinds', text: 'Medical, contextual, narrative, and feelings all land on one timeline.' },
        ]}
      />
    ),
  },
  {
    id: 'diagram',
    register: 'Diagram',
    beat: 'The architecture decision',
    question: 'Q4 · why this approach',
    steps: 3,
    render: (p) => (
      <DiagramFrame
        {...p}
        headline={<>The app opens straight into documentation, with no home screen and <em>nothing to answer first</em>.</>}
        gateLabel="v1 · branching questionnaire"
        collapse
        items={[
          { n: 1, text: 'Where are you — before, during, or after?' },
          { n: 2, text: 'At home, or in the hospital?' },
          { n: 3, text: 'The parent, or a support person?' },
          { n: 4, text: 'New here, or returning to reflect?' },
        ]}
        turn={{ a: '4', b: '0', label: 'questions before the first entry' }}
        dest={{ label: 'New note', sub: 'Nothing to answer before beginning.' }}
      />
    ),
  },
  {
    id: 'voice',
    register: 'Voice',
    beat: 'A tester in their own words',
    question: 'Q5 · evidence',
    steps: 2,
    render: (p) => (
      <VoiceFrame
        {...p}
        chip="a tester said"
        quote="It would be tragic to lose these moments if the app went away."
        attribution="Parent tester · on the keepsake book"
      />
    ),
  },
]

export default function DeckPreview() {
  return <DeckStage slides={slides} caseLabel="Birth Story" />
}
