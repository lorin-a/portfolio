import BleedAsset from './BleedAsset'

/* Hero cursive flourish — Lorin's exported SVG (cursivewhelm.svg).
   1920×1080 frame with a single gradient-filled cursive whelm mark.
   Renders full-bleed behind the hero wordmark. The orchestrator's
   intro timeline reveals it via clip-path wipe (left to right, mimicking
   handwriting flow) since the path is filled rather than stroked. */
export default function HeroFlourish() {
  return (
    <BleedAsset
      src="/marks/whelm/cursivewhelm.svg"
      opacity={0.35}
    />
  )
}
