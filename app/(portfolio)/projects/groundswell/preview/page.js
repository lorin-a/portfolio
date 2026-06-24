import GroundswellPreview from '@/components/Groundswell/GroundswellPreview'

// Gated template-prototype route (under /projects/groundswell/*, so the privacy
// middleware covers it). Not indexed, not linked. A working sketch of the
// reimagined dark-canvas "Field Notes" case-study template.
export const metadata = {
  title: 'Groundswell — Template Preview',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellPreviewPage() {
  return <GroundswellPreview />
}
