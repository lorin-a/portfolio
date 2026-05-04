import BleedAsset from './BleedAsset'

/* Hero corner accents — Lorin's accents.svg. Decorative flourishes
   that frame the hero composition. Sits behind the wordmark and
   alongside the cursive flourish for layered hand-drawn presence. */
export default function HeroAccents() {
  return (
    <BleedAsset
      src="/marks/whelm/accents.svg"
      opacity={0.55}
    />
  )
}
