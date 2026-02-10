import GroundswellContent from './GroundswellContentV3'

export const metadata = {
  title: 'Groundswell | Lorin Anderberg',
  description: 'A grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with UPMC Magee-Womens Hospital. Co-design, healthcare systems, and trauma-informed research.',
  openGraph: {
    title: 'Groundswell | Lorin Anderberg',
    description: 'A grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}

export default function GroundswellPage() {
  return <GroundswellContent />
}