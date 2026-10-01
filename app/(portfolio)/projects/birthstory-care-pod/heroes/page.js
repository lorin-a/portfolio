import BirthStoryHeroFan from '@/components/Birthstory/BirthStoryHeroFan'

// Birth Story hero — fan-blossom reveal (deck was the seed, not the spec).
// Not indexed; calibration route while the hero is finalized.
export const metadata = {
  title: 'Birth Story — hero',
  robots: { index: false, follow: false, nocache: true },
}

export default function BirthStoryHeroPage() {
  return <BirthStoryHeroFan />
}
