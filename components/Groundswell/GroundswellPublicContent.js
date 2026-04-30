'use client'

import GroundswellContent from './GroundswellContent'

/**
 * Public-facing Groundswell site content (rendered at /groundswell).
 *
 * Currently a thin wrapper around GroundswellContent so the route stays
 * visually identical while the component split is established. As the
 * public-site redesign progresses, sections will be replaced inline:
 *   - Hero (kept, lightly polished later)
 *   - <CinematicIntro /> slot (watercolor + poem — new)
 *   - Vision, Ecosystem, ArtWall, Pod, CtB, Cards (kept, public-tone copy later)
 *   - Outcomes, Context (kept, public-tone copy later)
 *   - Research / Workshops / Synthesis / Void / Making / Playtesting (DROP — designer-process, belongs in case study only)
 *
 * The portfolio case study at /projects/groundswell continues to use
 * <GroundswellContent /> directly. The two surfaces evolve independently.
 */
export default function GroundswellPublicContent() {
  return <GroundswellContent />
}
