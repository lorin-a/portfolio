import WhelmStory from './WhelmStory.client'

export const metadata = {
  title: 'Whelm — Lorin Anderberg',
  description:
    'A scrollytelling case study for Whelm, an emotion-sorting game. Foundation slice — work in progress.',
  robots: { index: false, follow: false },
}

export default function WhelmPage() {
  return <WhelmStory />
}
