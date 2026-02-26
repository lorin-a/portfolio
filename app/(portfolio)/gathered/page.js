import GatheredContent from '@/components/Gathered/GatheredContent'

export const metadata = {
  title: 'Gathered | Lorin Anderberg',
  description:
    'A curated collection of objects, books, and influences that shape how I think about design. Updated seasonally.',
  openGraph: {
    title: 'Gathered | Lorin Anderberg',
    description:
      'A curated collection of objects, books, and influences that shape how I think about design.',
  },
}

export default function GatheredPage() {
  return <GatheredContent />
}
