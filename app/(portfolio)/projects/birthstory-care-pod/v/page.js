import Link from 'next/link'

// Index for the three Birth Story direction studies (2026-07-05).
// Same blessed content three ways; review-only, never linked from the site.
export const metadata = {
  title: 'Birth Story — direction studies',
  robots: { index: false, follow: false, nocache: true },
}

const GRAPHIC_STUDIES = [
  {
    slug: 'print',
    name: 'D · The Print Issue',
    thesis: 'The case study as a designed magazine feature. Hierarchy lives entirely in the type system: folio marks, standfirsts, two-column body text, pull quotes. Photography runs duotone; screens are numbered plates; iteration is a contact sheet; the copy rewrites are set as an errata block.',
    reads: 'Reads: typographic craft, art direction. Ink + one spot color.',
  },
  {
    slug: 'skin',
    name: 'E · The Product Skin',
    thesis: 'The case study told in Birth Story’s own design system, with information rendered as interface: optional features as chips whose state carries the prioritization, iteration as a tappable V1/V2/V3 control, each feature playing its real screens as a flow, the client’s verdict arriving as a push notification.',
    reads: 'Reads: product design + system fluency. The full palette, deployed.',
  },
  {
    slug: 'wall',
    name: 'F · The Studio Wall',
    thesis: 'The process as material: photos pinned, screens taped up as printouts, tester quotes on index cards, the thinking on sticky notes, cuts and corrections in red pen. The real crit-wall photo sits at the center as the artifact the whole language quotes.',
    reads: 'Reads: research authenticity. Material, not skeuomorphic kitsch.',
  },
]

const STUDIES = [
  {
    slug: 'ledger',
    name: 'A · The Ledger',
    thesis: 'The argument, not the chronology. Every call entered as a numbered decision — the claim, what forced it, what it bought — with the liabilities carried honestly in their own column. Read the claims alone and you have the whole case in 90 seconds.',
    reads: 'Reads: strategy brain. Typography carries everything.',
  },
  {
    slug: 'artifact',
    name: 'B · One Artifact',
    thesis: 'One pinned phone narrates the entire story. Every chapter changes what is on its screen — handed over as a name, filled with parents’ words, opened wrong, reframed, simplified round by round, rewritten, painted, handed back. The reader watches the app get designed.',
    reads: 'Reads: product craft + build. One object, zero decoration.',
  },
  {
    slug: 'atlas',
    name: 'C · The Atlas',
    thesis: 'The whole project as one synthesis map, complete in the first viewport — that view is the 90-second read. Then a camera walks the same map region by region while a minimap keeps you oriented. Overview first, detail on demand.',
    reads: 'Reads: research synthesis. Spatial memory over linear scroll.',
  },
]

export default function Page() {
  return (
    <main style={{ maxWidth: '44rem', margin: '0 auto', padding: 'clamp(3rem, 10vh, 6rem) 1.5rem 6rem' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#466F7B', margin: 0 }}>
        Birth Story · direction studies
      </p>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontVariationSettings: "'SOFT' 60, 'WONK' 0", fontWeight: 380, fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, margin: '0.75rem 0 1rem', textWrap: 'balance' }}>
        Same content, three structures.
      </h1>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.98rem', lineHeight: 1.65, color: '#555', margin: '0 0 3rem', textWrap: 'pretty' }}>
        Each study keeps every strategic beat of the blessed case study and changes only how a reader is
        guided into it. None replaces the current draft; they are answers to the question of what shape
        the story wants.
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#466F7B', margin: '0 0 0.5rem' }}>
        Graphic-system studies · same skeleton, different visual language
      </p>
      {GRAPHIC_STUDIES.map((v) => (
        <Link key={v.slug} href={`/projects/birthstory-care-pod/v/${v.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderTop: '1px solid rgba(26,67,77,0.3)', padding: '1.75rem 0' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontVariationSettings: "'SOFT' 60, 'WONK' 0", fontWeight: 420, fontSize: '1.5rem', margin: '0 0 0.6rem', color: '#1A434D' }}>{v.name} →</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.6, color: '#444', margin: '0 0 0.5rem', textWrap: 'pretty' }}>{v.thesis}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: '#466F7B', margin: 0 }}>{v.reads}</p>
        </Link>
      ))}
      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#466F7B', margin: '3rem 0 0.5rem' }}>
        Structure studies · different skeletons entirely
      </p>
      {STUDIES.map((v) => (
        <Link key={v.slug} href={`/projects/birthstory-care-pod/v/${v.slug}`} style={{ display: 'block', textDecoration: 'none', color: 'inherit', borderTop: '1px solid rgba(26,67,77,0.3)', padding: '1.75rem 0' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontVariationSettings: "'SOFT' 60, 'WONK' 0", fontWeight: 420, fontSize: '1.5rem', margin: '0 0 0.6rem', color: '#1A434D' }}>{v.name} →</h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', lineHeight: 1.6, color: '#444', margin: '0 0 0.5rem', textWrap: 'pretty' }}>{v.thesis}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, color: '#466F7B', margin: 0 }}>{v.reads}</p>
        </Link>
      ))}
    </main>
  )
}
