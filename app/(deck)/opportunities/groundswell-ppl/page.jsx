import Opportunity from '@/components/Deck/Opportunity'
import { groundswellPPL } from '@/components/Deck/beats/groundswell-ppl'

export const metadata = {
  title: 'Groundswell → Public Policy Lab — draft deck',
  robots: { index: false, follow: false },
}

export default function GroundswellPPLPage() {
  return (
    <Opportunity
      pool={groundswellPPL}
      caseLabel="Groundswell → Public Policy Lab"
      badge="Draft · PPL lens"
      defaultTier="20"
    />
  )
}
