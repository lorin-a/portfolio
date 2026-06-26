import GroundswellLook from '@/components/Groundswell/GroundswellLook'

// Gated under /projects/groundswell/* (privacy middleware). "I propose, you pick"
// — three hero look directions for the cinematic system-diagram opening. Art-free.
export const metadata = {
  title: 'Groundswell — Hero Looks',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellLookPage() {
  return <GroundswellLook />
}
