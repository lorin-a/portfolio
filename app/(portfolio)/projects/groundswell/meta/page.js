import MetaVariants from '@/components/Groundswell/MetaVariants'

// Gated under /projects/groundswell/* (privacy middleware covers it). Review page:
// 2–3 alternative metadata treatments for the hero. Not indexed, not linked.
export const metadata = {
  title: 'Groundswell — Meta Options',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellMetaPage() {
  return <MetaVariants />
}
