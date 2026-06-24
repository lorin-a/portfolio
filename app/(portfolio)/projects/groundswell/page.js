import GroundswellContent from '@/components/Groundswell/GroundswellContent'
import StandaloneNav from '@/components/StandaloneNav/StandaloneNav'

export const metadata = {
  title: 'Groundswell | Lorin Anderberg',
  description: 'A grant-funded ecosystem of emotional support for healthcare workers, developed in collaboration with UPMC Magee-Womens Hospital. Co-design, healthcare systems, and trauma-informed research.',
  // Privacy hold (2026-06-24): this case study reproduces Carolyn Gavin's
  // "Blue Garden" artwork, which the Schedule A license restricts to physical
  // Groundswell uses only. Deindexed and unlinked until a compliant version
  // ships (and/or portfolio permission is granted). Do not re-expose.
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: 'Groundswell | Lorin Anderberg',
    description: 'A grant-funded ecosystem of emotional support for healthcare workers at UPMC Magee-Womens Hospital.',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}

// Five-chapter progress through the case study. Each chapter spans the
// section ids it covers; StandaloneNav fills each segment based on how
// far the viewport has advanced through that range.
const chapters = [
  { label: 'Ecosystem',  sectionIds: ['vision', 'ecosystem', 'artwall', 'pod', 'ctb', 'cards'] },
  { label: 'Outcomes',   sectionIds: ['outcomes'] },
  { label: 'Research',   sectionIds: ['context', 'research', 'workshops', 'synthesis', 'the-void'] },
  { label: 'Production', sectionIds: ['making', 'playtesting', 'playtest-feedback'] },
  { label: 'Reflection', sectionIds: ['reflection', 'acknowledgements'] },
]

export default function GroundswellPage() {
  return (
    <>
      <StandaloneNav
        backHref="/"
        backLabel="All work"
        revealAfter="#vision"
        chapters={chapters}
      />
      <GroundswellContent />
    </>
  )
}