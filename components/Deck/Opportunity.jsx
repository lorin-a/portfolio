'use client'

import { useState } from 'react'
import DeckStage from './DeckStage'
import { buildCut } from './renderBeat'

/* An Opportunity = one case study's beat pool, seen through one lens, at a
   chosen length. The time dial re-times the whole cut live (5 / 20 / 45) — the
   same pool, different selection, nothing rewritten. This is the elastic-time
   capability on real content. */
export default function Opportunity({ pool, caseLabel, badge, defaultTier = '20' }) {
  const [tier, setTier] = useState(defaultTier)
  const cut = buildCut(pool, tier)

  return (
    <DeckStage
      slides={cut}
      caseLabel={caseLabel}
      badge={badge}
      timeDial={{
        value: tier,
        options: [
          { label: '5 min', value: '5' },
          { label: '20 min', value: '20' },
          { label: '45 min', value: '45' },
        ],
        onChange: setTier,
      }}
    />
  )
}
