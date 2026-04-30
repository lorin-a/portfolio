import { cloudImg, cloudVideo, GS_IMAGES, GS_VIDEOS } from '@/lib/cloudinary'
import GreyboxScene, { StandIn, Placeholder } from './GreyboxScene'

export default function CinematicIntro() {
  return (
    <>
      <GreyboxScene
        id="scene-1-opening"
        bg="dark"
        kicker="Scene 1 — Visual Opening"
        heading={<><StandIn>opening line in Lorin&apos;s voice</StandIn></>}
        media={<Placeholder label="Blue Garden watercolor reveal — asset MISSING, needs spike" />}
        notes="Black bg → watercolor reveal → image rises → purple field → logo anchor → scroll arrow. Establishes motion grammar."
      >
        <p>
          <StandIn>1–2 sentence atmospheric opening</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-2-thesis"
        bg="cream"
        kicker="Scene 2 — Thesis"
        heading={<><StandIn>thesis sentence</StandIn></>}
        notes="Delicate text reveal: per-character duration scaling, power1.inOut, clip-path wipe with negative em insets."
      >
        <p>
          <StandIn>brief framing of the work in 1–2 sentences</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-3-quote"
        bg="cream"
        kicker="Scene 3 — UPMC Quote"
        heading={<em><StandIn>UPMC Magee pull quote</StandIn></em>}
        notes="Italic display type. Held quietly. Attribution line beneath in smaller weight."
      >
        <p style={{ opacity: 0.7, fontSize: '14px', letterSpacing: '0.04em' }}>
          — <StandIn>attribution: name, role, UPMC Magee-Womens Hospital</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-4-held-image"
        bg="paper"
        kicker="Scene 4 — Held Image"
        heading=""
        media={
          <img
            src={cloudImg(GS_IMAGES['gs-hero'], 1600)}
            alt="Groundswell installation at UPMC Magee-Womens Hospital"
          />
        }
        notes="Full-bleed crossfade from previous scene. No text. Image alone holds the beat."
      />

      <GreyboxScene
        id="scene-5-rolodex"
        bg="purple"
        kicker="Scene 5 — Rolodex of Voices"
        heading={<><StandIn>framing line for the voices</StandIn></>}
        notes="Vertical scroll through six voice fragments. Background #554d65. Light text. Each fragment held briefly, no overlap."
      >
        <p>
          <StandIn>fragment 1 — single sentence from a worker</StandIn>
        </p>
        <p>
          <StandIn>fragment 2</StandIn>
        </p>
        <p>
          <StandIn>fragment 3</StandIn>
        </p>
        <p>
          <StandIn>fragment 4</StandIn>
        </p>
        <p>
          <StandIn>fragment 5</StandIn>
        </p>
        <p>
          <StandIn>fragment 6</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-6-shape-of-work"
        bg="cream"
        kicker="Scene 6 — Shape of the Work"
        heading={<><StandIn>display question, e.g., &ldquo;Who is drawn to this work?&rdquo;</StandIn></>}
        notes="Atmospheric scroll. Held color field. Type-led. Generous whitespace. Display moment alone on the field."
      >
        <p>
          <StandIn>opening paragraph — what shape this work takes</StandIn>
        </p>
        <p>
          <StandIn>generational wisdom sentences — what these workers carry</StandIn>
        </p>
        <p>
          <StandIn>superhuman sentence — one image of what endurance looks like</StandIn>
        </p>
        <p>
          <StandIn>&ldquo;never lets go&rdquo; replacement for the corporate &ldquo;remains top of mind&rdquo; idiom</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-7-listening"
        bg="paper"
        kicker="Scene 7 — Listening"
        heading={<><StandIn>heading for listening section</StandIn></>}
        media={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <img src={cloudImg(GS_IMAGES['gs-workshop-flower-01'], 800)} alt="Workshop session — flower exercise" />
            <img src={cloudImg(GS_IMAGES['gs-workshop-coats-01'], 800)} alt="Workshop session — coats exercise" />
            <img src={cloudImg(GS_IMAGES['gs-workshop-grief-01'], 800)} alt="Workshop session — grief exercise" />
          </div>
        }
        notes="Same atmospheric register as Scene 6. Workshop photos as evidence of the listening method."
      >
        <p>
          <StandIn>Listening prose (full) — what was heard, how, from whom</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-8-cup-overflow"
        bg="cream"
        kicker="Scene 8 — Cup Overflow + 4 Pillars"
        heading={<><StandIn>heading framing the four pillars</StandIn></>}
        media={<Placeholder label="Cup overflow visual — NOT BUILT, needs design pass" />}
        notes="Cup metaphor: visual cup at center fills as 16 factors accumulate, then spills. Pillars named with weight; factors live beneath as evidence. After spill: one held beat of stillness."
      >
        <p>
          <strong>Recognition.</strong> <StandIn>1–2 sentences on this pillar</StandIn>
        </p>
        <p>
          <strong>Environment.</strong> <StandIn>1–2 sentences</StandIn>
        </p>
        <p>
          <strong>Culture.</strong> <StandIn>1–2 sentences</StandIn>
        </p>
        <p>
          <strong>System.</strong> <StandIn>1–2 sentences</StandIn>
        </p>
      </GreyboxScene>

      <GreyboxScene
        id="scene-9-pivot"
        bg="dark"
        kicker="Scene 9 — Pivot / Kicker"
        heading={<><StandIn>pivot sentence in Lorin&apos;s voice — &ldquo;this project is for them&rdquo; register</StandIn></>}
        notes="Moral pivot. Closes the cinematic. Quiet, declarative. Dark field for gravity."
      >
        <p>
          <StandIn>2–3 sentences — FOR the wisdom keepers, FROM their pain, designed to make change from within</StandIn>
        </p>
      </GreyboxScene>
    </>
  )
}
