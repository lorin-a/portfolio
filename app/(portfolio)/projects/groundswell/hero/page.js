import fs from 'fs'
import path from 'path'
import GroundswellSpine from '@/components/Groundswell/GroundswellSpine'

// Gated under /projects/groundswell/* (privacy middleware). The consolidated
// case study: the approved spine (structure + her copy + interactions) with the
// dark cinematic hook running her real connector map (connectors.svg), art-free.
// Connector SVG is read server-side and passed in (works behind the basic-auth gate).
export const metadata = {
  title: 'Groundswell — Case Study',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellCaseStudyPage() {
  const connectorsSvg = fs.readFileSync(
    path.join(process.cwd(), 'public/images/groundswell/connectors.svg'),
    'utf8'
  )
  return <GroundswellSpine connectorsSvg={connectorsSvg} />
}
