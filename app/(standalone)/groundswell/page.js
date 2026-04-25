import GroundswellContent from '@/components/Groundswell/GroundswellContent'

export const metadata = {
  title: 'Groundswell',
  description: 'A grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with UPMC Magee-Womens Hospital. Co-design, healthcare systems, and trauma-informed research.',
  openGraph: {
    title: 'Groundswell',
    description: 'A grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}

export default function StandaloneGroundswellPage() {
  return <GroundswellContent />
}
