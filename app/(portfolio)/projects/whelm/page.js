import WhelmStory from './WhelmStory.client'

export const metadata = {
  title: 'Whelm — Lorin Anderberg',
  description:
    'Whelm — Find Your Way to Feeling. A scrollytelling case study tracing the design of a ritual for moving through overwhelm.',
  robots: { index: false, follow: false },
}

export default function WhelmPage() {
  return (
    <div data-theme="whelm">
      <WhelmStory />
    </div>
  )
}
