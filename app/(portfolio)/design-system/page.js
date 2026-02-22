import styles from './page.module.css'

export const metadata = {
  title: 'Design System — Private Preview',
  robots: { index: false, follow: false },
}

/* ============================================================
   COLOR DATA
   ============================================================ */
const colorFamilies = [
  {
    name: 'Olive (Primary Brand)',
    swatches: [
      { name: 'olive-light', value: '#D8DBA0', var: '--olive-light' },
      { name: 'olive', value: '#898B27', var: '--olive' },
      { name: 'olive-dark', value: '#6F6D1F', var: '--olive-dark' },
    ],
  },
  {
    name: 'Lavender',
    swatches: [
      { name: 'lavender-light', value: '#E8E4F0', var: '--lavender-light' },
      { name: 'lavender', value: '#C4BCE0', var: '--lavender' },
      { name: 'lavender-dark', value: '#8B7EB8', var: '--lavender-dark' },
    ],
  },
  {
    name: 'Sky',
    swatches: [
      { name: 'sky-light', value: '#E4EBF0', var: '--sky-light' },
      { name: 'sky', value: '#B8CCD9', var: '--sky' },
      { name: 'sky-dark', value: '#7A9DB8', var: '--sky-dark' },
    ],
  },
  {
    name: 'Adobe / Terracotta',
    swatches: [
      { name: 'adobe-light', value: '#F5D4C8', var: '--adobe-light' },
      { name: 'adobe', value: '#E69A7B', var: '--adobe' },
      { name: 'adobe-dark', value: '#D67A5A', var: '--adobe-dark' },
    ],
  },
  {
    name: 'Dusty Rose',
    swatches: [
      { name: 'rose-light', value: '#F0E4E8', var: '--rose-light' },
      { name: 'rose', value: '#D4A5B0', var: '--rose' },
      { name: 'rose-dark', value: '#B87A8B', var: '--rose-dark' },
    ],
  },
  {
    name: 'Hero Accents',
    swatches: [
      { name: 'cream', value: '#FAF7F0', var: '--cream' },
      { name: 'plum', value: '#8B5E83', var: '--plum' },
      { name: 'terracotta', value: '#B5654A', var: '--terracotta' },
      { name: 'sage', value: '#A8B5A0', var: '--sage' },
    ],
  },
  {
    name: 'Neutrals',
    swatches: [
      { name: 'text-heading', value: '#2C2C28', var: '--text-heading' },
      { name: 'text-body', value: '#4A4A46', var: '--text-body' },
      { name: 'border', value: '#E8E4D8', var: '--border' },
      { name: 'surface', value: '#FBF9F4', var: '--surface' },
      { name: 'background', value: '#FBF9F4', var: '--background' },
    ],
  },
]

const projectColors = [
  {
    name: 'Default (Homepage)',
    accent: '#6F6D1F',
    accentLight: '#D8DBA0',
    accentText: '#6F6D1F',
    accentPale: '#E4E0EB',
    bg: '#FBF9F4',
  },
  {
    name: 'Project Pages (Plum)',
    accent: '#554D65',
    accentLight: '#F8EBE5',
    accentText: '#554D65',
    accentPale: '#E4E0EB',
    bg: '#FBF9F4',
  },
]

/* ============================================================
   PAGE
   ============================================================ */
export default function DesignSystemPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>Design System</h1>
      <p className={styles.pageSubtitle}>
        Private preview — Fraunces + DM Sans, full token inventory
      </p>

      {/* ===================== COLORS ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Colors</h2>
        <p className={styles.sectionDescription}>
          Global palette defined in globals.css :root. Each family has light, base, and dark variants.
        </p>

        {colorFamilies.map((family) => (
          <div key={family.name} className={styles.colorFamily}>
            <div className={styles.colorFamilyName}>{family.name}</div>
            <div className={styles.swatchRow}>
              {family.swatches.map((s) => (
                <div key={s.var} className={styles.swatch}>
                  <div
                    className={styles.swatchColor}
                    style={{ backgroundColor: s.value }}
                  />
                  <div className={styles.swatchName}>{s.name}</div>
                  <div className={styles.swatchValue}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ============= PROJECT ACCENT OVERRIDES ============= */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Project Accent Colors</h2>
        <p className={styles.sectionDescription}>
          Each project page overrides --project-accent-* variables. These control headings, borders, labels, and the &ldquo;purple box&rdquo; pattern.
        </p>

        {projectColors.map((proj) => (
          <div key={proj.name} className={styles.projectColorSection}>
            <h3 className={styles.projectColorTitle} style={{ color: proj.accentText }}>
              {proj.name}
            </h3>
            <div className={styles.swatchRow}>
              <div className={styles.swatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: proj.accent }} />
                <div className={styles.swatchName}>accent</div>
                <div className={styles.swatchValue}>{proj.accent}</div>
              </div>
              <div className={styles.swatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: proj.accentLight }} />
                <div className={styles.swatchName}>accent-light</div>
                <div className={styles.swatchValue}>{proj.accentLight}</div>
              </div>
              <div className={styles.swatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: proj.accentPale }} />
                <div className={styles.swatchName}>accent-pale</div>
                <div className={styles.swatchValue}>{proj.accentPale}</div>
              </div>
              <div className={styles.swatch}>
                <div className={styles.swatchColor} style={{ backgroundColor: proj.bg }} />
                <div className={styles.swatchName}>bg</div>
                <div className={styles.swatchValue}>{proj.bg}</div>
              </div>
            </div>

            {/* Box pattern demo */}
            <div style={{
              backgroundColor: proj.accentPale,
              borderLeft: `3px solid ${proj.accent}`,
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              marginTop: '12px',
            }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, color: proj.accentText, marginBottom: 4 }}>
                Purple Box Pattern
              </div>
              <div style={{ fontSize: '14px', color: 'var(--text-body)' }}>
                Used for acknowledgement cards, callouts, and highlights on light backgrounds.
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ===================== TYPOGRAPHY ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Typography</h2>
        <p className={styles.sectionDescription}>
          Fraunces (variable serif) for headings &amp; emphasis. DM Sans for body text. Fraunces uses SOFT and WONK axes.
        </p>

        {/* Font variation comparison */}
        <h3 className={styles.subsectionTitle}>Fraunces Variable Axes</h3>
        <div className={styles.variationRow}>
          <div className={styles.variationBox}>
            <div className={styles.variationSample} style={{ fontVariationSettings: "'SOFT' 50, 'WONK' 1" }}>
              Soft &amp; Wonky
            </div>
            <div className={styles.label}>--font-soft: SOFT 50, WONK 1</div>
            <div className={styles.specimenCaption}>Default for body, headings, italic emphasis</div>
          </div>
          <div className={styles.variationBox}>
            <div className={styles.variationSample} style={{ fontVariationSettings: "'SOFT' 0, 'WONK' 0" }}>
              Sharp &amp; Straight
            </div>
            <div className={styles.label}>--font-sharp: SOFT 0, WONK 0</div>
            <div className={styles.specimenCaption}>Captions, labels, section labels, small UI text</div>
          </div>
        </div>

        {/* Heading hierarchy */}
        <h3 className={styles.subsectionTitle}>Heading Hierarchy</h3>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenH1}>Hero Headline — Fraunces ExtraLight 200</div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>h1 / intro</span>
            <span className={styles.typeTag}>3rem / 48px</span>
            <span className={styles.typeTag}>weight: 200</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenH2}>Section Title — Fraunces Regular 400</div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>h2</span>
            <span className={styles.typeTag}>2.25rem / 36px</span>
            <span className={styles.typeTag}>weight: 400</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenH3}>Card Title / Subsection — Fraunces Regular 400</div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>h3</span>
            <span className={styles.typeTag}>1.5rem / 24px</span>
            <span className={styles.typeTag}>weight: 400</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenH4}>Minor Heading — Fraunces Regular 400</div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>h4</span>
            <span className={styles.typeTag}>1.25rem / 20px</span>
            <span className={styles.typeTag}>weight: 400</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        {/* Body text */}
        <h3 className={styles.subsectionTitle}>Body Text</h3>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenBodyLarge}>
            Body Large — I uncover human stories and insights that transform how people navigate healthcare, education, and complex systems.
          </div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>DM Sans</span>
            <span className={styles.typeTag}>1.125rem / 18px</span>
            <span className={styles.typeTag}>weight: 400</span>
          </div>
        </div>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenBody}>
            Body — Named for water that rises naturally from deep within the earth, Groundswell emerges directly from the efforts and voices of healthcare workers themselves while introducing approachable resources that acknowledge the emotional complexities of oncology care.
          </div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>DM Sans</span>
            <span className={styles.typeTag}>1rem / 16px</span>
            <span className={styles.typeTag}>weight: 400</span>
          </div>
        </div>

        {/* Italic & emphasis */}
        <h3 className={styles.subsectionTitle}>Italic &amp; Emphasis</h3>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenItalic}>
            I translate complex human experiences into design that holds space for vulnerability.
          </div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>Fraunces Italic</span>
            <span className={styles.typeTag}>1.5rem / 24px</span>
            <span className={styles.typeTag}>weight: 400</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        <div className={styles.typeSpecimen}>
          <div className={styles.specimenPullQuote}>
            &ldquo;The staff here carry so much — and they carry it quietly.&rdquo;
          </div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>Pull Quote</span>
            <span className={styles.typeTag}>1.5rem / 24px</span>
            <span className={styles.typeTag}>weight: 400, italic</span>
            <span className={styles.typeTag}>--font-soft</span>
          </div>
        </div>

        {/* On dark background */}
        <div className={styles.typeSpecimenDark}>
          <div className={styles.specimenH2} style={{ color: '#FAF7F0', marginBottom: 12 }}>
            Heading on Dark Background
          </div>
          <div className={styles.specimenBody} style={{ color: 'rgba(250, 247, 240, 0.8)' }}>
            Body text on dark background with 0.8 opacity minimum for accessibility.
          </div>
          <div className={styles.specimenPullQuote} style={{ color: '#F8EBE5', marginTop: 12 }}>
            &ldquo;Italic emphasis on dark&rdquo;
          </div>
          <div className={styles.typeMetaDark}>
            <span className={styles.typeTagDark}>Dark variant</span>
            <span className={styles.typeTagDark}>min opacity: 0.8</span>
          </div>
        </div>

        {/* Small text */}
        <h3 className={styles.subsectionTitle}>Small Text &amp; Labels</h3>

        <div className={styles.typeSpecimen}>
          <div style={{ marginBottom: 16 }}>
            <div className={styles.specimenSectionLabel}>Section Label</div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div className={styles.specimenLabel}>TOOL BADGE LABEL</div>
          </div>
          <div>
            <div className={styles.specimenCaption}>Caption text — 12px minimum for accessibility. Used for image captions and metadata.</div>
          </div>
          <div className={styles.typeMeta}>
            <span className={styles.typeTag}>--font-sharp</span>
            <span className={styles.typeTag}>12px minimum</span>
            <span className={styles.typeTag}>uppercase for labels</span>
          </div>
        </div>
      </section>

      {/* ===================== SPACING ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Spacing Scale</h2>

        {[
          { name: '--space-xs', value: '0.5rem (8px)', width: 32 },
          { name: '--space-sm', value: '1rem (16px)', width: 64 },
          { name: '--space-md', value: '2rem (32px)', width: 128 },
          { name: '--space-lg', value: '4rem (64px)', width: 256 },
          { name: '--space-xl', value: '6rem (96px)', width: 384 },
        ].map((s) => (
          <div key={s.name} className={styles.spacingRow}>
            <div className={styles.spacingLabel}>{s.name} — {s.value}</div>
            <div className={styles.spacingBar} style={{ width: s.width }} />
          </div>
        ))}
      </section>

      {/* ===================== RADIUS ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Radius</h2>
        <div className={styles.radiusRow}>
          {[
            { name: 'sm', value: '4px', radius: 4 },
            { name: 'md', value: '8px', radius: 8 },
            { name: 'lg', value: '12px', radius: 12 },
            { name: 'pill', value: '9999px', radius: 9999 },
          ].map((r) => (
            <div key={r.name}>
              <div className={styles.radiusBox} style={{ borderRadius: r.radius }}>
                <div className={styles.radiusLabel}>{r.name}<br />{r.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== BUTTONS ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buttons &amp; Controls</h2>

        <h3 className={styles.subsectionTitle}>Primary Actions</h3>
        <div className={styles.buttonRow}>
          <button className={styles.btnPrimary}>Primary CTA</button>
          <button className={styles.btnOutline}>Outline</button>
          <button className={styles.btnCircle} aria-label="Arrow">&larr;</button>
          <button className={styles.btnCircle} aria-label="Arrow">&rarr;</button>
        </div>

        <h3 className={styles.subsectionTitle}>Tabs / Filters</h3>
        <div className={styles.tabRow}>
          <button className={`${styles.tab} ${styles.tabActive}`}>Active Tab</button>
          <button className={styles.tab}>Inactive</button>
          <button className={styles.tab}>Another</button>
        </div>
      </section>

      {/* ===================== BADGES / PILLS / TAGS ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Badges, Pills &amp; Tags</h2>

        <h3 className={styles.subsectionTitle}>Status Badges</h3>
        <div className={styles.badgeRow}>
          <span className={`${styles.statusBadge} ${styles.statusLive}`}>Live</span>
          <span className={`${styles.statusBadge} ${styles.statusComingSoon}`}>Coming Soon</span>
        </div>

        <h3 className={styles.subsectionTitle}>Tags &amp; Tool Badges</h3>
        <div className={styles.badgeRow}>
          <span className={styles.tag}>Co-Design</span>
          <span className={styles.tag}>Healthcare</span>
          <span className={styles.tag}>Systems</span>
          <span className={styles.toolBadge}>Figma</span>
          <span className={styles.toolBadge}>Miro</span>
          <span className={styles.toolBadge}>Google Suite</span>
        </div>

        <h3 className={styles.subsectionTitle}>Soft Pills (Fraunces Italic)</h3>
        <div className={styles.badgeRow}>
          <span className={`${styles.pill} ${styles.pillTerracotta}`}>warmth &amp; boundaries</span>
          <span className={`${styles.pill} ${styles.pillPlum}`}>structure &amp; flow</span>
          <span className={`${styles.pill} ${styles.pillOlive}`}>care &amp; resilience</span>
        </div>
      </section>

      {/* ===================== CARDS ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Cards</h2>

        <h3 className={styles.subsectionTitle}>Standard Card</h3>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Card Title</div>
            <div className={styles.cardText}>
              Standard card with rounded corners, subtle border, and hover lift. Used for project previews and content blocks.
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardTitle}>Another Card</div>
            <div className={styles.cardText}>
              Hover to see the translateY + shadow animation. Cards use --radius-lg (12px) corners.
            </div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Value Card (Lavender Border)</h3>
        <div className={styles.cardGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueCardTitle}>Empathy-Led</div>
            <div className={styles.valueCardText}>
              Research grounded in human stories, not just metrics. Hover for the tilt + lift animation.
            </div>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueCardTitle}>Systems Thinking</div>
            <div className={styles.valueCardText}>
              Understanding how pieces connect across complex ecosystems of care and education.
            </div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Acknowledgement Card (Purple Box)</h3>
        <div className={styles.cardGrid}>
          <div className={styles.ackCard}>
            <div className={styles.ackCardTitle}>Dr. Sarah Chen</div>
            <div className={styles.ackCardText}>Faculty Advisor — Carnegie Mellon University</div>
          </div>
          <div className={styles.ackCard}>
            <div className={styles.ackCardTitle}>Kristin Hughes</div>
            <div className={styles.ackCardText}>Professor of Design — School of Design</div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Dark Card Variant</h3>
        <div className={styles.darkSection}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            <div className={styles.cardDark}>
              <div className={styles.cardDarkTitle}>Dark Background Card</div>
              <div className={styles.cardDarkText}>
                Used in immersive project sections. Translucent background with subtle border.
              </div>
            </div>
            <div className={styles.cardDark}>
              <div className={styles.cardDarkTitle}>Another Dark Card</div>
              <div className={styles.cardDarkText}>
                Text uses rgba(250, 247, 240, 0.7) for secondary content, full white for titles.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MOTION ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Motion &amp; Animation</h2>
        <p className={styles.sectionDescription}>
          Hover each box to preview. All animations pair opacity with scale or translate — no fade-only.
        </p>

        <div className={styles.motionGrid}>
          <div className={styles.motionBox}>
            <div className={`${styles.motionTarget} ${styles.motionTargetGrow}`} />
            <div className={styles.motionLabel}>Grow In</div>
            <div className={styles.motionDetail}>--ease-bounce, 300ms</div>
          </div>
          <div className={styles.motionBox}>
            <div className={`${styles.motionTarget} ${styles.motionTargetSlide}`} style={{ opacity: 0.6 }} />
            <div className={styles.motionLabel}>Soft Appear</div>
            <div className={styles.motionDetail}>--ease-default, 300ms</div>
          </div>
          <div className={styles.motionBox}>
            <div className={`${styles.motionTarget} ${styles.motionTargetPulse}`} style={{ borderRadius: '50%' }} />
            <div className={styles.motionLabel}>Gentle Pulse</div>
            <div className={styles.motionDetail}>--ease-pulse, 1.2s loop</div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Timing Tokens</h3>
        <div className={styles.typeSpecimen}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div className={styles.specimenH3}>300ms</div>
              <div className={styles.specimenCaption}>--motion-fast</div>
              <div className={styles.specimenCaption}>Micro-interactions</div>
            </div>
            <div>
              <div className={styles.specimenH3}>600ms</div>
              <div className={styles.specimenCaption}>--motion-medium</div>
              <div className={styles.specimenCaption}>Standard animations</div>
            </div>
            <div>
              <div className={styles.specimenH3}>900ms</div>
              <div className={styles.specimenCaption}>--motion-slow</div>
              <div className={styles.specimenCaption}>Dramatic reveals</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ACCESSIBILITY ===================== */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Accessibility</h2>

        <div className={styles.typeSpecimen}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className={styles.specimenH3}>44px</div>
              <div className={styles.specimenCaption}>--min-touch-target</div>
              <div className={styles.specimenCaption}>Minimum touch target for all interactive elements</div>
            </div>
            <div>
              <div className={styles.specimenH3}>12px</div>
              <div className={styles.specimenCaption}>Minimum font size</div>
              <div className={styles.specimenCaption}>Never use sizes below --text-caption</div>
            </div>
            <div>
              <div className={styles.specimenH3}>0.8</div>
              <div className={styles.specimenCaption}>Minimum text opacity</div>
              <div className={styles.specimenCaption}>Never use 0.5-0.7 for readable text</div>
            </div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Focus States</h3>
        <div className={styles.buttonRow}>
          <button className={styles.btnPrimary} style={{ outline: '2px solid var(--olive)', outlineOffset: '2px' }}>
            :focus-visible example
          </button>
        </div>
      </section>

      {/* ===================== LAYOUT TOKENS ===================== */}
      <section className={styles.section} style={{ borderBottom: 'none' }}>
        <h2 className={styles.sectionTitle}>Layout</h2>

        <div className={styles.typeSpecimen}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div>
              <div className={styles.specimenH4}>1200px</div>
              <div className={styles.specimenCaption}>--max-width</div>
            </div>
            <div>
              <div className={styles.specimenH4}>900px</div>
              <div className={styles.specimenCaption}>--content-width</div>
            </div>
            <div>
              <div className={styles.specimenH4}>2rem</div>
              <div className={styles.specimenCaption}>--container-padding</div>
            </div>
          </div>
        </div>

        <h3 className={styles.subsectionTitle}>Breakpoints</h3>
        <div className={styles.typeSpecimen}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center' }}>
            <div>
              <div className={styles.specimenH4}>900px</div>
              <div className={styles.specimenCaption}>Tablet</div>
            </div>
            <div>
              <div className={styles.specimenH4}>600px</div>
              <div className={styles.specimenCaption}>Mobile</div>
            </div>
            <div>
              <div className={styles.specimenH4}>400px</div>
              <div className={styles.specimenCaption}>Small Mobile</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
