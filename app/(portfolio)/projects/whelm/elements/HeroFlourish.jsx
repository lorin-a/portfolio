import CursiveWhelm from './CursiveWhelm'

/* Hero cursive flourish — slide 255:355.
   Renders the inline CursiveWhelm SVG so the orchestrator can animate
   stroke-dashoffset along the path itself. The path traces along its
   own drawing direction (point-to-point) rather than getting wiped
   across by a clip-path rectangle. */
export default function HeroFlourish() {
  return <CursiveWhelm />
}
