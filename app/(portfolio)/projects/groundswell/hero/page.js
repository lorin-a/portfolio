import GroundswellHero from '@/components/Groundswell/GroundswellHero'

// Gated under /projects/groundswell/* (privacy middleware covers it). The locked
// case-study hero (Editorial direction). Not indexed, not linked.
export const metadata = {
  title: 'Groundswell — Hero',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellHeroPage() {
  return <GroundswellHero />
}
