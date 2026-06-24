import GroundswellArchive from '@/components/Groundswell/GroundswellArchive'
import StandaloneNav from '@/components/StandaloneNav/StandaloneNav'

// PRIVATE ARCHIVE of the full Groundswell case study (reproduces Carolyn
// Gavin's "Blue Garden" artwork). Sealed behind the privacy gate in
// middleware.js and never linked from the public site. Restore to the main
// route only if portfolio permission is granted.
export const metadata = {
  title: 'Groundswell — Archive',
  robots: { index: false, follow: false, nocache: true },
}

const chapters = [
  { label: 'Ecosystem',  sectionIds: ['vision', 'ecosystem', 'artwall', 'pod', 'ctb', 'cards'] },
  { label: 'Outcomes',   sectionIds: ['outcomes'] },
  { label: 'Research',   sectionIds: ['context', 'research', 'workshops', 'synthesis', 'the-void'] },
  { label: 'Production', sectionIds: ['making', 'playtesting', 'playtest-feedback'] },
  { label: 'Reflection', sectionIds: ['reflection', 'acknowledgements'] },
]

export default function GroundswellArchivePage() {
  return (
    <>
      <StandaloneNav
        backHref="/"
        backLabel="All work"
        revealAfter="#vision"
        chapters={chapters}
      />
      <GroundswellArchive />
    </>
  )
}
