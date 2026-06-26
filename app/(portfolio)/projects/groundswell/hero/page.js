import fs from 'fs'
import path from 'path'
import GroundswellHero from '@/components/Groundswell/GroundswellHero'
import GroundswellSpine from '@/components/Groundswell/GroundswellSpine'

// Gated under /projects/groundswell/* (privacy middleware). The consolidated case
// study: the cinematic documentary hook (art-wall → shrink-into-circle → her
// connector map → labelled discs) followed by the light process spine (her copy +
// interactions). Connector SVG is read server-side. Documentary artwork is credited
// inline (Carolyn Gavin); no new uses of the art.
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
      <GroundswellHero connectorsSvg={connectorsSvg} />
      <GroundswellSpine />
    </>
  )
}
