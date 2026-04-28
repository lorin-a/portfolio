import GroundswellCaseStudyTrim from '@/components/Groundswell/GroundswellCaseStudyTrim'

export const metadata = {
  title: 'Groundswell — Case Study | Lorin Anderberg',
  description: 'A first-person case study of Groundswell — co-design, healthcare, and the practice of resonance. The full project page lives at /projects/groundswell.',
  openGraph: {
    title: 'Groundswell — Case Study | Lorin Anderberg',
    description: 'A first-person case study of Groundswell, the grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}

export default function GroundswellCaseStudyPage() {
  return <GroundswellCaseStudyTrim />
}
