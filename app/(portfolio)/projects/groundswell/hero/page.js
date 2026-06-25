import GroundswellHero from '@/components/Groundswell/GroundswellHero'
import GroundswellSystemReveal from '@/components/Groundswell/GroundswellSystemReveal'

// Gated under /projects/groundswell/* (privacy middleware covers it). The locked
// case-study hero (Editorial direction) followed by the system-reveal transition
// prototype (art-wall image morphs into the four-part ecosystem). Not indexed.
export const metadata = {
  title: 'Groundswell — Hero',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellHeroPage() {
  return (
    <>
      <GroundswellHero />
      <GroundswellSystemReveal />
    </>
  )
}
