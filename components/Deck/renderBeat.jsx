'use client'

import StatementFrame from './frames/StatementFrame'
import SpecimenFrame from './frames/SpecimenFrame'
import DiagramFrame from './frames/DiagramFrame'
import VoiceFrame from './frames/VoiceFrame'

const FRAMES = {
  statement: StatementFrame,
  specimen: SpecimenFrame,
  diagram: DiagramFrame,
  voice: VoiceFrame,
}

/* A beat is content; a slide is what DeckStage renders. This adapter picks the
   frame by register and feeds it the beat's content. Keeping beats as data (not
   JSX) is what lets a lens select/reorder them and lets new case studies pour
   in without hand-writing slides. */
export function beatToSlide(beat) {
  const Frame = FRAMES[beat.register]
  return {
    id: beat.id,
    register: beat.register.charAt(0).toUpperCase() + beat.register.slice(1),
    beat: beat.beat,
    question: beat.question,
    steps: beat.steps ?? 1,
    render: ({ active, step }) => <Frame active={active} step={step} {...beat.content} />,
  }
}

/* buildCut — the lens as it exists today: select the beats a target length
   includes, in the pool's authored (lens) order. The lens never edits content;
   it only chooses which true beats appear and where. */
export function buildCut(pool, tier) {
  return pool.filter((b) => b.tiers.includes(tier)).map(beatToSlide)
}
