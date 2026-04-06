/**
 * Homepage project data — metadata and tile configurations
 * for the three card-based ProjectSection components.
 *
 * Used by: app/(portfolio)/page.js
 */
import { cloudVideo, HOME_VIDEOS } from '@/lib/cloudinary'

export const SOMEBUDDY = {
  num: '03',
  title: 'SomeBuddy',
  tagline: 'A therapy companion app',
  description:
    'Brand identity, UX, and animation for a therapy companion app. Full creative range.',
  comingSoon: true,
  contributions: [
    { label: 'Brand Identity' },
    { label: 'UX' },
    { label: 'Animation' },
  ],
}

export const SOMEBUDDY_TILES = [
  { src: cloudVideo(HOME_VIDEOS['somebuddy-default'], 680), alt: 'SomeBuddy app preview', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['somebuddy-hover'], 400), alt: 'SomeBuddy interaction', type: 'video', span: 1 },
]

export const TRANSITION_DESIGN = {
  num: '04',
  title: 'Transition Design',
  tagline: 'Systems-level design for food insecurity',
  description:
    'A systems-level design response to food insecurity in Pittsburgh. The lens widens.',
  comingSoon: true,
  contributions: [
    { label: 'Systems Mapping' },
    { label: 'Research Synthesis' },
  ],
}

export const TRANSITION_TILES = [
  { src: cloudVideo(HOME_VIDEOS['transition-design-default'], 680), alt: 'Transition design systems map', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['transition-design-hover'], 400), alt: 'Transition design detail', type: 'video', span: 1 },
]

export const BRIDGING = {
  num: '05',
  title: 'Bridging the G.A.P.',
  tagline: 'Trail rebrand and campaign',
  description:
    'A comprehensive rebranding proposal for the Great Allegheny Passage featuring a campaign for inexperienced riders, GPS app prototype, and environmental graphics.',
  comingSoon: true,
  contributions: [
    { label: 'UX Research' },
    { label: 'Brand Identity' },
    { label: 'Animation' },
  ],
}

export const BRIDGING_TILES = [
  { src: cloudVideo(HOME_VIDEOS['bridging-default'], 680), alt: 'Bridging the G.A.P. campaign', type: 'video', span: 2 },
  { src: cloudVideo(HOME_VIDEOS['bridging-hover'], 400), alt: 'Bridging the G.A.P. detail', type: 'video', span: 1 },
]
