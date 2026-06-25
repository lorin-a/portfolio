import GroundswellWireframe from '@/components/Groundswell/GroundswellWireframe'

// Gated under /projects/groundswell/* (privacy middleware covers it). Greyscale
// flow wireframe — lock the structure, rhythm, and hierarchy before any visual
// design. Not indexed, not linked.
export const metadata = {
  title: 'Groundswell — Flow Wireframe',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellWireframePage() {
  return <GroundswellWireframe />
}
