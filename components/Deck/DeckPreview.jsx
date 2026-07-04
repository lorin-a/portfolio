'use client'

import DeckStage from './DeckStage'
import StatementFrame from './frames/StatementFrame'
import SpecimenFrame from './frames/SpecimenFrame'
import DiagramFrame from './frames/DiagramFrame'
import VoiceFrame from './frames/VoiceFrame'

/* The four register frames, one draft slide each, on real Birth Story material.
   This is the engine + register demo — the copy and beat order are placeholders
   for the slide-copy pass; the frames are the thing to react to. */
const slides = [
  {
    id: 'statement',
    register: 'Statement',
    beat: 'Cold open — the punchline',
    question: 'Q7 · what changed',
    steps: 2,
    render: (p) => <StatementFrame {...p} />,
  },
  {
    id: 'specimen',
    register: 'Specimen',
    beat: 'Evidence → decision',
    question: 'Q5 · evidence',
    steps: 3,
    render: (p) => <SpecimenFrame {...p} />,
  },
  {
    id: 'diagram',
    register: 'Diagram',
    beat: 'The architecture decision',
    question: 'Q4 · why this approach',
    steps: 3,
    render: (p) => <DiagramFrame {...p} />,
  },
  {
    id: 'voice',
    register: 'Voice',
    beat: 'A tester in their own words',
    question: 'Q5 · evidence',
    steps: 2,
    render: (p) => <VoiceFrame {...p} />,
  },
]

export default function DeckPreview() {
  return <DeckStage slides={slides} caseLabel="Birth Story" />
}
