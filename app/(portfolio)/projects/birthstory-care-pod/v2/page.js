import BirthStoryHeroFan from '@/components/Birthstory/BirthStoryHeroFan'
import BirthStoryV2 from '@/components/Birthstory/v2/BirthStoryV2'

// Birth Story V2 — the from-scratch rebuild (F13, review-only, parallel to the
// V1 draft at the parent route). Storyboard: BIRTHSTORY-VISUAL-SYSTEM.md §7.
export const metadata = {
  title: 'Birth Story — V2 (from-scratch rebuild)',
  robots: { index: false, follow: false, nocache: true },
}

export default function BirthStoryV2Page() {
  return (
    <>
      <BirthStoryHeroFan />
      <BirthStoryV2 />
    </>
  )
}
