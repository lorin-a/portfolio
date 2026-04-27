import GroundswellCaseStudy from '@/components/Groundswell/GroundswellCaseStudy'

/* Preview route for the Lorin-focused Groundswell case study (V2).
   Lives at /projects/groundswell/preview while V1 stays at /projects/groundswell.
   Swap routes once the case study is content-complete. */
export const metadata = {
  title: 'Groundswell (preview) | Lorin Anderberg',
  robots: { index: false, follow: false },
}

export default function GroundswellCaseStudyPreview() {
  return <GroundswellCaseStudy />
}
