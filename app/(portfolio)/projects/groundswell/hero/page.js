import fs from 'fs'
import path from 'path'
import GroundswellHero from '@/components/Groundswell/GroundswellHero'
import GroundswellSpine from '@/components/Groundswell/GroundswellSpine'

// Gated under /projects/groundswell/* (privacy middleware). The consolidated case
// study: a tight cinematic hook (thesis question → art-wall grows to full-bleed →
// the promise) followed by the light process spine, where her real connector map
// pays off in context as the Weave SystemMap. Connector SVG is read server-side and
// passed to the spine. Documentary artwork is credited inline (Carolyn Gavin).
export const metadata = {
  title: 'Groundswell — Case Study',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellCaseStudyPage() {
  const connectorsSvg = fs.readFileSync(
    path.join(process.cwd(), 'public/images/groundswell/connectors.svg'),
    'utf8'
  )
  return (
    <>
      <GroundswellHero />
      <GroundswellSpine connectorsSvg={connectorsSvg} />
    </>
  )
}
