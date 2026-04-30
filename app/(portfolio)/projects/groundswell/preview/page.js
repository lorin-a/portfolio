import CinematicIntro from '@/components/CaseStudy/Cinematic/CinematicIntro'
import MetaStrip from '@/components/CaseStudy/MetaStrip'
import GroundswellContent from '@/components/Groundswell/GroundswellContent'

export const metadata = {
  title: 'Groundswell (preview) | Lorin Anderberg',
  description: 'Cinematic case study preview — work in progress.',
  robots: { index: false, follow: false },
}

export default function GroundswellPreviewPage() {
  return (
    <>
      <CinematicIntro />
      <MetaStrip />
      <GroundswellContent />
    </>
  )
}
