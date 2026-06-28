import BirthStoryHero from '@/components/Birthstory/BirthStoryHero'
import BirthStoryBody from '@/components/Birthstory/BirthStoryBody'

// Birth Story — full case study draft (Mode B gather hero + the templated body).
// Calibration/preview route while copy is blessed and real device media lands.
export const metadata = {
  title: 'Birth Story — case study (draft)',
  robots: { index: false, follow: false, nocache: true },
}

export default function BirthStoryPage() {
  return (
    <>
      <BirthStoryHero />
      <BirthStoryBody />
    </>
  )
}
