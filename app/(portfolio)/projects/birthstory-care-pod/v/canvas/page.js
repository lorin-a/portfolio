import { Caveat } from 'next/font/google'
import VCanvas from '@/components/Birthstory/variants/VCanvas'

// Direction study H — the canvas: the draft's skeleton upgraded into 2026
// design-tool native (Figma/FigJam register). Caveat supplies the FigJam
// marker scribble, this study only.
const scrawl = Caveat({ subsets: ['latin'], weight: ['500', '600'], variable: '--font-scrawl' })

export const metadata = {
  title: 'Birth Story — direction H · The Canvas',
  robots: { index: false, follow: false, nocache: true },
}

export default function Page() {
  return (
    <div className={scrawl.variable}>
      <VCanvas />
    </div>
  )
}
