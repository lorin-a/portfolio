import HeroHeadingOptions from '@/components/Groundswell/HeroHeadingOptions'

// Gated under /projects/groundswell/* (privacy middleware covers it). A/B of the
// two hero-heading weight logics. Not indexed, not linked.
export const metadata = {
  title: 'Groundswell — Heading Weights',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellHeadingPage() {
  return <HeroHeadingOptions />
}
