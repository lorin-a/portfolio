import fs from 'fs'
import path from 'path'
import GroundswellHero from '@/components/Groundswell/GroundswellHero'
import GroundswellProcess from '@/components/Groundswell/GroundswellProcess'

// Gated under /projects/groundswell/* (privacy middleware covers it). The locked
// case-study opening (mega-hero). Connector SVG is read server-side and passed in
// (no client fetch — works behind the basic-auth preview). Not indexed.
export const metadata = {
  title: 'Groundswell — Opening',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellHeroPage() {
  const connectorsSvg = fs.readFileSync(
    path.join(process.cwd(), 'public/images/groundswell/connectors.svg'),
    'utf8'
  )
  return (
    <>
      <GroundswellHero connectorsSvg={connectorsSvg} />
      <GroundswellProcess />
    </>
  )
}
