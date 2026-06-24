import GroundswellPublicContent from '@/components/Groundswell/GroundswellPublicContent'

export const metadata = {
  title: 'Groundswell',
  description: 'A grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with UPMC Magee-Womens Hospital. Co-design, healthcare systems, and trauma-informed research.',
  // Privacy hold (2026-06-24): reproduces Carolyn Gavin's "Blue Garden"
  // artwork (incl. the watercolor derivative), which the Schedule A license
  // restricts to physical Groundswell uses only. Deindexed and unlinked until
  // resolved. Do not re-expose.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: 'Groundswell',
    description: 'A grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}

export default function StandaloneGroundswellPage() {
  return <GroundswellPublicContent />
}
