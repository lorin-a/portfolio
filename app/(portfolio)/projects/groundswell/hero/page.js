import GroundswellHero from '@/components/Groundswell/GroundswellHero'

// Gated under /projects/groundswell/* (privacy middleware covers it). The locked
// case-study opening: hero whose art-wall image morphs into the connected
// ecosystem gallery, then hands off to the process. Not indexed, not linked.
export const metadata = {
  title: 'Groundswell — Opening',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellHeroPage() {
  return <GroundswellHero />
}
