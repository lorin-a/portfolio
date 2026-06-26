import GroundswellSpine from '@/components/Groundswell/GroundswellSpine'

// Gated under /projects/groundswell/* (privacy middleware). Greyscale, art-free
// spine wireframe of the trimmed case-study (CASE_STUDY_PLAYBOOK.md → THE SPEC).
// Flow-first: no real images, statement-heading skim layer + ❗→⭐ + expand-to-depth.
export const metadata = {
  title: 'Groundswell — Spine Wireframe',
  robots: { index: false, follow: false, nocache: true },
}

export default function GroundswellSpinePage() {
  return <GroundswellSpine />
}
