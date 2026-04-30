import CinematicIntro from '@/components/CinematicIntro/CinematicIntro'

// Phase 2 sandbox: full CinematicIntro in isolation, with a stub #vision
// section beneath so the "Skip to vision" link has somewhere to land.
// Delete before Phase 3 wires this into GroundswellPublicContent.
export default function CinematicTestPage() {
  return (
    <main>
      {/* Sandbox only: hide StandaloneNav so the watercolor goes full bleed.
          Production /groundswell will keep the nav (transparent over hero,
          opaque after scroll) -- handled in Phase 6. */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            'header, nav { display: none !important; } body > a.skip-link { display: none !important; }',
        }}
      />
      <CinematicIntro />

      <section
        id="vision"
        style={{
          minHeight: '100vh',
          padding: '120px 32px',
          background: '#FBF9F6',
          color: '#2C2C28',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-fraunces), Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 56px)',
            fontWeight: 200,
            maxWidth: '24ch',
            margin: '0 auto',
          }}
        >
          [#vision section — landing target stub]
        </p>
      </section>
    </main>
  )
}
