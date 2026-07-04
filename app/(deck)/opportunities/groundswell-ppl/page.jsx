import DeckEditor from '@/components/Deck/DeckEditor'
import { groundswellPPL } from '@/components/Deck/beats/groundswell-ppl'

export const metadata = {
  title: 'Groundswell → Public Policy Lab — draft deck',
  robots: { index: false, follow: false },
}

export default function GroundswellPPLPage() {
  return (
    <DeckEditor
      pool={groundswellPPL}
      caseLabel="Groundswell → Public Policy Lab"
      badge="Draft · PPL lens"
    />
  )
}
