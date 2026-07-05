import { Caveat } from 'next/font/google'
import VBoard from '@/components/Birthstory/variants/VBoard'

// Direction study G — diverge/converge: editorial home voice, the grid breaks
// only in Research (the board), then the layout straightens as the project
// does. Caveat supplies the red-pen scrawl register, this study only.
const scrawl = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-scrawl' })

export const metadata = {
  title: 'Birth Story — direction G · Diverge/Converge',
  robots: { index: false, follow: false, nocache: true },
}

export default function Page() {
  return (
    <div className={scrawl.variable}>
      <VBoard />
    </div>
  )
}
