'use client'

import { SheetStage, slidesFor } from '@/components/ProjectSheet/SheetMedia'
import { groundswell } from '@/content/sheets/groundswell'

/* FS238 mockup: the synthesis map as the first slide of the research gallery */
export default function ResearchStage() {
  return (
    <SheetStage label="Research gallery" fit="contain" slides={[
      { key: 'synthesis-void-map', type: 'image', src: '/images/groundswell/synthesis-void-map.jpg',
        alt: 'Research synthesis map: Recognition, Environment, Culture, and Systemic Issues around The Void, with the staff quotes behind each theme.' },
      ...slidesFor({ stills: groundswell.process[0].images }),
    ]} />
  )
}
