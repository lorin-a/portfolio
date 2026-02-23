# lorin.work — Living Design Spec
### Last updated: February 23, 2026 (v2)

This is the single source of truth for the portfolio site. Every design and engineering decision lives here. When something changes, this file changes. When a new Claude Code session starts, this file is the first thing it reads.

**Decision tiers:**
- **DECIDED** — Locked. Use as-is. Only changes with explicit discussion.
- **DIRECTIONAL** — 80% confident. Will be validated during V2 homepage build.
- **GUIDELINE** — Best practice, not a hard rule. Use judgment. Override when the design genuinely calls for it.
- **TBD** — Open question. Don't guess — ask Lorin or flag it.

**Conflicts this spec resolves:**
The codebase previously had 7+ documents with overlapping and contradictory guidance (PORTFOLIO_ENGINEERING_STANDARDS.md referenced DM Sans and different color values; CLAUDE_PROJECT_PROMPT.md had different easing values; README copy.md was stale; globals.css contained two color palettes). This spec supersedes all of them. Those documents should be archived, not consulted.

---

## 1. THE THESIS [DECIDED]

> Structure and heart coexist. Not as opposites to balance, but as a unified way of seeing.

The site performs this — it doesn't state it. The grid feels warm. The data feels handmade. The methodology feels like compassion. Visitors cannot tell where the structure ends and the heart begins.

**Design implication:** Don't use layout or visual metaphor to argue that Lorin's analytical and emotional sides are separate or opposing (no "left brain / right brain" split-screen, no "head vs. heart" two-column compositions). However, functional comparison tools — before/after sliders, side-by-side evidence, lo-fi to hi-fi reveals — are encouraged when they serve the story.

**Audience:** Hiring managers with limited time. They need to know what Lorin has done, how she thinks, and what her process is. The site must work in a 90-second scan AND reward deeper exploration.

**North star quote:**
> "One of the most intentional portfolios I've seen. Clear attention to detail, care in every component, this person cares deeply and has range."

---

## 2. TYPOGRAPHY [DECIDED]

### Fonts
- **Heading:** Fraunces (variable) — via `next/font/google`
- **Body:** Open Sans — via `next/font/google`
- **CSS variables:** `--font-heading`, `--font-body`
- **Legacy aliases:** `--font-serif`, `--font-sans` (map to above; remove in V1 cleanup pass)

**NOTE:** PORTFOLIO_ENGINEERING_STANDARDS.md and README copy.md incorrectly reference DM Sans. The actual codebase uses Open Sans. This spec is correct; those docs are stale.

### Variable Font Axes (Fraunces)

Two active presets:

```
--font-soft:  'SOFT' 50, 'WONK' 0   → Site-wide default. All headings, body, labels, captions, pull quotes.
--font-wonky: 'SOFT' 50, 'WONK' 1   → Hero only. The playful, characterful voice for the main hero greeting.
```

**Retired:** `--font-sharp` (SOFT 0, WONK 0) is no longer in use. All text uses the soft axis for consistency. Any existing CSS referencing `--font-sharp` (currently on `.caption`, `.label`, `.section-label`, `.section-label-light` in globals.css) should be updated to `--font-soft` during migration.

### Weight Hierarchy
| Token | Value | Usage |
|-------|-------|-------|
| `--weight-hero` | 200 | Hero display text, greeting |
| `--weight-title` | 400 | All headings h1–h4, section titles |
| `--weight-body` | 400 | Body text |
| `--weight-quote` | 400 | Pull quotes, italic emphasis |
| `--weight-label` | 500 | Sans-serif UI: labels, badges, buttons |

### Type Scale
| Token | Desktop | Tablet (≤900) | Mobile (≤600) |
|-------|---------|---------------|---------------|
| `--text-h1` | 3rem (48px) | 2.25rem (36px) | 2rem (32px) |
| `--text-h2` | 2.25rem (36px) | 1.75rem (28px) | 1.5rem (24px) |
| `--text-h3` | 1.5rem (24px) | 1.375rem (22px) | 1.25rem (20px) |
| `--text-h4` | 1.25rem (20px) | — | 1.125rem (18px) |
| `--text-body` | 1rem (16px) | — | — |
| `--text-body-large` | 1.125rem (18px) | — | 1rem (16px) |
| `--text-body-small` | 0.875rem (14px) | — | — |
| `--text-pull-quote` | 1.5rem (24px) | 1.375rem (22px) | 1.25rem (20px) |
| `--text-caption` | 0.75rem (12px) | — | — |
| `--text-label` | 0.75rem (12px) | — | — |

### Line Heights
```
--leading-tight:   1.2   → Headings
--leading-relaxed: 1.4   → Captions, labels, pull quotes
--leading-normal:  1.6   → Body text
```

### Typographic Quality
- `text-wrap: balance` on all headings and intro text
- `text-wrap: pretty` on all body text, lists, blockquotes, figcaptions
- Ideal line length: 45–75 characters (enforced by `--content-width: 900px`)
- Use `&nbsp;` for short phrases that must stay together
- Use `<br />` for intentional heading breaks at natural phrase points

---

## 3. SPACING [DECIDED]

```
--space-xxs: 0.25rem   (4px)
--space-xs:  0.5rem    (8px)
--space-sm:  1rem      (16px)
--space-content-gap: 1.5rem (24px)  → Cards, grid gaps, internal padding
--space-md:  2rem      (32px)
--space-lg:  4rem      (64px)  → Responsive: 3rem at 900px, 2.5rem at 600px, 2rem at 400px
--space-xl:  6rem      (96px)  → Responsive: 5rem at 900px, 4rem at 600px, 3rem at 400px
```

**Gutter:** `--gutter: clamp(24px, 5vw, 80px)` — fluid edge spacing.

**Guideline:** Prefer these tokens for consistency. One-off values are acceptable when a specific layout demands it — but if the same custom value appears in more than one place, promote it to a token.

---

## 4. LAYOUT [DECIDED]

```
--max-width: 1200px          → Outer container
--content-width: 900px       → Text/reading containers
--container-padding: var(--space-md)  → Responsive: var(--space-sm) at 600px
--min-touch-target: 44px     → Accessibility (WCAG 2.2 AAA level)
```

### Breakpoints
| Name | Width | Approach |
|------|-------|----------|
| Desktop | >900px | Default styles |
| Tablet | ≤900px | `@media (max-width: 900px)` |
| Mobile | ≤600px | `@media (max-width: 600px)` |
| Small mobile | ≤400px | `@media (max-width: 400px)` |

### Border Radius
```
--radius-xs:   2px
--radius-sm:   4px
--radius-md:   8px
--radius-lg:   12px
--radius-pill: 9999px
```

### Shadows
```
--shadow-sm: 0 1px 3px rgba(0,0,0,0.06)
--shadow-md: 0 2px 8px rgba(0,0,0,0.08)
--shadow-lg: 0 4px 16px rgba(0,0,0,0.10)
```

---

## 5. COLOR PALETTE [DIRECTIONAL]

**Status:** Lorin is moving toward the V2 palette but needs to validate accessibility (contrast ratios) before fully committing. The V1 palette (olive, lavender, sky, adobe, rose) and legacy aliases are deprecated — do not use them in new work.

### V2 Palette — Derived from Scanned Objects
These colors are sampled from Lorin's actual stones, flowers, and childhood paintings. They are not arbitrary.

**Backgrounds:**
```
--color-cream:      #FBF9F6    → Primary background
--color-cream-dark: #F0ECE4    → Alternate/section background
```

**Sage — "Sense" energy:**
```
--color-sage:       #5E6D52    → Primary
--color-sage-light: #7A8B6F
--color-sage-soft:  #A0A88A
--color-sage-muted: rgba(160, 168, 138, 0.10)
```

**Plum — "Weave" energy:**
```
--color-plum:       #7A6680    → Primary
--color-plum-light: #8A7690
--color-plum-soft:  #9B8A9E
--color-plum-muted: rgba(155, 138, 158, 0.08)
```

**Terracotta — "Shape" energy:**
```
--color-terracotta:       #956058    → Primary
--color-terracotta-light: #A87068
--color-terracotta-soft:  #C4908A
--color-terracotta-muted: rgba(196, 144, 138, 0.08)
```

**Chalcedony — Accent (named for the blue-grey translucent stone in Lorin's collection):**
```
--color-chalcedony:       #6E8FAE    → Primary
--color-chalcedony-soft:  #8BAABE
--color-chalcedony-muted: rgba(110, 143, 174, 0.10)
```

**Ink — Neutrals:**
```
--color-ink:       #2C2C2C    → Headings, primary text
--color-ink-light: #5A5550    → Body text
--color-ink-faint: #7A7570    → Secondary/muted text
```

### Accessibility Validation Needed Before Locking
- [ ] `--color-ink` (#2C2C2C) on `--color-cream` (#FBF9F6) — heading text
- [ ] `--color-ink-light` (#5A5550) on `--color-cream` — body text
- [ ] `--color-ink-faint` (#7A7570) on `--color-cream` — muted text (highest risk)
- [ ] Each primary color (sage, plum, terracotta, chalcedony) as text on cream
- [ ] Light text (#FBF9F6) on each primary color (for dark-background sections)
- [ ] Pill/tag system contrast in both light and dark contexts
- [ ] All combinations validated in night mode variant (see Section 9)

### 60/30/10 Rule [GUIDELINE]
- **60%** — Cream backgrounds, ink text (the quiet foundation)
- **30%** — Sage, plum, terracotta as section accents, headings, interactive elements
- **10%** — Chalcedony as a rare highlight; project identity colors as bursts

### Project Card Colors [TBD]
A theme system exists in `lib/projectThemes.js` with per-project hardcoded hex values (Groundswell purple, BirthStory periwinkle, etc.). The V2 homepage may not use custom card colors at all. Project-specific colors may appear in individual case study pages. This will be decided as the homepage and case study template evolve. The theme system should be preserved but not assumed as the default approach.

---

## 6. MOTION [DIRECTIONAL]

### Philosophy
All motion is smooth, organic, natural, calm-paced. Never jarring, shocking, or too fast. Animation does storytelling work or it doesn't exist. Every moving element should earn its motion.

**The test:** Is this motion *settling* or *traveling*?
- Settling → ease-out
- Traveling → ease-in-out

### Easing Curves (Consolidated from 6+ to 3)

```css
/* The workhorse. Most transitions, scroll reveals, hover states. */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);

/* Sustained movement. Page transitions, scroll-driven animation. */
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);

/* Soft arrival with slight overshoot. Elements landing into place. Use sparingly. */
--ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);
```

**Retired (avoid in new work):**
- `--ease-default` → replaced by `--ease-in-out`
- `--ease-pulse` → use `--ease-in-out` for looping animations
- `--ease-out-expo`, `--ease-out-quart` → replaced by `--ease-out`
- `--transition-gentle`, `--transition-smooth` → use duration + curve separately

### Duration Scale [GUIDELINE]
```css
--motion-fast:   300ms    → Hover states, micro-interactions, UI feedback
--motion-medium: 600ms    → Scroll reveals, section transitions, content appearing
--motion-slow:   900ms    → Hero animations, page-level transitions, dramatic moments
```
These are anchors, not hard limits. Values between them (e.g. 450ms) are fine when the animation feels right.

### Easing Guidance [GUIDELINE]
Avoid `bounce`, `elastic`, `spring`, `linear` (except continuous rotation), and `ease-in` alone. But if a specific interaction genuinely calls for an unconventional curve and you've considered it carefully, that's a design decision — document why.

### Animation Primitives — Reusable Patterns

**1. Scroll Reveal (the default entrance)**
```css
.element {
  opacity: 0;
  transform: translateY(16px);
}
.element.visible {
  animation: scrollReveal var(--motion-medium) var(--ease-out) forwards;
}
@keyframes scrollReveal {
  to { opacity: 1; transform: translateY(0); }
}
```
Trigger via IntersectionObserver or GSAP ScrollTrigger. The `AnimatedElement` component wraps this pattern — use it rather than reimplementing.

**2. Stagger Reveal (groups of elements)**
```css
.parent.visible .child {
  animation: scrollReveal var(--motion-medium) var(--ease-out) forwards;
  animation-delay: var(--delay, 0s);
}
/* Set --delay inline: style={{ '--delay': '0.1s' }} */
```

**3. Breathe (ambient, looping)**
```css
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
.element { animation: breathe 3.5s ease-in-out infinite; }
```

**4. GSAP ScrollTrigger (complex, scroll-driven)**
For pinned sections, progress-based animation, parallax, before/after reveals, and anything needing precise scroll position mapping. GSAP is the tool for complex motion — CSS animations handle simpler interactions.

### Reduced Motion
Global override in `globals.css` kills all animation/transition duration. Individual component CSS must also include explicit reduced-motion blocks setting `opacity: 1; transform: none;` to prevent invisible content. See Section 9 for full requirements.

### Hover States
Only on devices that support hover:
```css
@media (hover: hover) {
  .element:hover { /* hover styles */ }
}
```

---

## 7. CONTENT & CASE STUDY STRUCTURE [DECIDED]

### Content Hierarchy for Hiring Managers (Priority Order)
1. What you do and what domain — immediately clear
2. Evidence of impact — case study outcomes visible fast
3. How you think — process revealed through decisions, not artifacts
4. Who you are — discovered through voice, details, care — not declared

### Case Study Framework: Sense → Weave → Shape

All projects follow Lorin's core methodology, which mirrors her hero identity on the homepage:

**SENSE** — Listening, research, immersion. What did Lorin hear, observe, and uncover? How did she create the conditions for honest participation? What patterns emerged?

**WEAVE** — Synthesis, connection, meaning-making. How did Lorin bring together disparate findings? What tensions or contradictions did she hold? How did the research become insight?

**SHAPE** — Making, prototyping, delivering. What form did the work take? What decisions did Lorin make during creation? What was the impact?

Each phase should foreground Lorin's specific contributions, decisions, and thinking — not just what the team produced. The reader should understand what would have been different without Lorin in the room.

### Case Study Page Structure
1. **Hero:** Project title, Lorin's role, 2–3 tags, one compelling image or deliverable
2. **Overview:** What is it, what did it achieve (outcomes first, context second)
3. **Sense:** Research phase — methods, participant voices, what was discovered
4. **Weave:** Synthesis — pattern recognition, insight development, framework building
5. **Shape:** Making — design decisions, prototypes, iteration, final deliverables
6. **Impact:** Measurable results, reflections, what Lorin would do differently

### Media per Case Study [GUIDELINE]
Start with 8–12 images as an editing target. If a project genuinely needs more to tell its story — GIFs showing interaction, video walkthroughs, animation sequences, before/after comparisons — include them. Each piece of media must earn its place. The question: does this do work that no other asset in the set already does?

### Voice Rules
- Participant quotes: large italic, quotation marks, their actual words (never paraphrase)
- Trauma-informed language when relevant ("if it feels safe and comfortable")
- Written the way Lorin actually talks — specific, warm, a little poetic, grounded in real details
- **Never paraphrase Lorin's writing.** Use her actual words or flag for her to rewrite.

---

## 8. ARCHITECTURE [DECIDED]

### Stack
- **Framework:** Next.js 14, App Router
- **Styling:** CSS Modules (no Tailwind, no styled-components)
- **Animation:** GSAP with ScrollTrigger plugin
- **Media:** Cloudinary (auto-format, auto-quality, width transforms)
- **Content:** Markdown with gray-matter frontmatter
- **Rendering:** react-markdown
- **Deployment:** Vercel → lorin.work
- **Version control:** GitHub

### Route Structure
```
app/
├── (portfolio)/          → Has Nav + Footer via layout.js
│   ├── page.js           → Homepage
│   ├── about/            → About page
│   ├── projects/
│   │   ├── [slug]/       → Dynamic case study template (Sense → Weave → Shape)
│   │   └── groundswell/  → Custom Groundswell case study (portfolio version)
│   ├── design-system/    → Internal reference
│   └── not-found.js
├── (standalone)/         → No Nav/Footer — immersive layouts
│   ├── groundswell/      → Full stakeholder documentation site (DO NOT MODIFY)
│   └── layout.js
└── globals.css           → Design tokens, reset, base typography
```

### Component Organization
Every component lives in its own folder: `ComponentName/ComponentName.js` + `ComponentName.module.css`. Barrel exports via `components/index.js`.

The `components/Groundswell/` folder contains custom components built for the standalone Groundswell documentation site (CardCarousel, ScrollVideo, ProgressNav, etc.). These are purpose-built and live correctly where they are.

### File Conventions
- CSS class names: camelCase
- Component files: PascalCase
- CSS Modules: `component.module.css` (never `_module.css`)
- Page metadata: exported from server component `page.js`
- Client interactivity: separated into `[Name]Content.js` with `'use client'`

### Media Strategy (Cloudinary)
```javascript
cloudImg(publicId, width)    → Images with auto-format, auto-quality
cloudVideo(publicId)         → Video with auto-format
cloudAudio(publicId)         → Audio (no format transform)
```
Public ID mappings centralized in `lib/cloudinary.js` grouped by context.

---

## 9. ACCESSIBILITY [DECIDED]

### Governing Standard
WCAG 2.2 Level AA compliance as the minimum. Level AAA where achievable without compromising design vision. The site should be usable by everyone — this is non-negotiable and aligns with Lorin's social impact values.

### Perceivable

**Text & Color:**
- Color contrast: 4.5:1 minimum for normal text, 3:1 for large text (AA)
- Color is never the sole means of conveying information (pair with text, icon, or pattern)
- All text/background combinations validated including in night mode

**Images & Media:**
- Content images: descriptive `alt` text
- Decorative images: `alt=""`
- Complex images (data visualizations, diagrams): `aria-describedby` linking to text description
- Videos: captions or transcript available
- Audio content: transcript available
- No auto-playing media — click-to-activate for all video and audio
- No content that flashes more than 3 times per second

**Responsive Text:**
- Text resizable up to 200% without loss of content or function
- No text in images (except within project screenshots/deliverables)
- Minimum body font size: 16px (1rem)

### Operable

**Keyboard:**
- All interactive elements reachable and operable via keyboard
- Visible focus indicators: `outline: 2px solid [accent]; outline-offset: 2px` via `:focus-visible`
- Focus order follows logical reading order
- No keyboard traps — user can always navigate away
- Focus not obscured: indicators never hidden behind sticky headers, overlays, or fixed elements (WCAG 2.2)
- Skip-to-content link in layout (present and implemented)
- Escape key closes modals, lightboxes, and overlays

**Touch & Pointer:**
- Minimum touch target: 44×44px (WCAG 2.2 enhanced level)
- Minimum 8px gap between adjacent touch targets on mobile
- All functionality available without complex gestures (no multi-finger or path-based gestures as sole input)
- Draggable interfaces (before/after sliders) also operable via click/tap or keyboard

**Timing & Motion:**
- No time limits on content
- Reduced motion: global CSS override + per-component explicit handling
- `prefers-reduced-motion: reduce` kills all animation and transition durations
- Components must set `opacity: 1; transform: none;` explicitly so content is never invisible
- Auto-advancing carousels (if used) must have pause/stop controls
- Parallax and scroll-driven animations degrade gracefully to static states

**Navigation:**
- Consistent navigation across pages
- Link text is descriptive — no "click here" or "read more" without context
- Current page indicated in navigation
- Multiple ways to find content (nav + direct links at minimum)

### Understandable

**Content:**
- `lang="en"` on `<html>` element (present)
- Language changes within content marked with appropriate `lang` attribute
- Abbreviations expanded on first use
- Reading level appropriate for general audience

**Interaction:**
- Form inputs have visible labels (when contact section is built)
- Error messages identify the field and describe the problem
- Suggestions provided for correcting errors
- No unexpected context changes on focus or input

**Consistency:**
- Consistent identification of UI components across pages
- Consistent navigation patterns

### Robust

**Semantic HTML:**
- `<main>`, `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` used correctly
- Heading hierarchy: no skipped levels (h1 → h2 → h3, never h1 → h3)
- Lists use `<ul>`, `<ol>`, `<dl>` — not styled divs
- ARIA labels on icon-only buttons and non-obvious interactive elements
- ARIA live regions for dynamically updated content (loading states, filtered results, toggle confirmations)
- Validated HTML — no duplicate IDs, proper nesting

**Browser & Device:**
- Viewport: `min-height: 100dvh` with `100vh` fallback
- No horizontal scroll at any breakpoint
- Screen reader testing: at least one pass with VoiceOver (Mac/iOS) before deployment

### Accessibility Feature Toggles [DIRECTIONAL]

These features go beyond baseline WCAG compliance and demonstrate Lorin's commitment to inclusive design. They live in a site settings panel accessible from the nav or footer.

**Night Mode / Dark Theme:**
Reduces eye strain in low-light environments. Benefits users with light sensitivity, migraine conditions, and some forms of dyslexia. Implementation: swap cream backgrounds with dark neutrals, swap ink text with light text. Respect `prefers-color-scheme: dark` as system default with manual override. All V2 palette colors need contrast validation in both schemes. Store preference in `localStorage`.

**Reduced Motion Toggle:**
The site respects `prefers-reduced-motion` at the OS level. An on-site toggle gives users who don't know about the OS setting (or use shared computers) the same control. When active: all animations resolve to end state instantly, scroll effects become static, parallax disabled, auto-advancing content stops.

**High Contrast Mode:**
For users with low vision. Respects `prefers-contrast: more` at OS level. On-site toggle increases all contrast ratios to AAA (7:1 normal, 4.5:1 large), adds visible borders to all interactive elements, removes decorative textures (noise overlay, gradient washes, muted color backgrounds).

**Text Size Controls:**
Allows users to increase base font size (Default / Large / Extra Large). Supplements browser zoom with targeted text scaling that avoids reflow issues. All layouts must accommodate a 150% text size increase without breaking.

**Implementation notes for all toggles:**
- Store preference in `localStorage`, persist across sessions
- Toggles themselves must be keyboard accessible and screen-reader announced
- ARIA live region confirms toggle state change ("Night mode enabled")
- Simple icon cluster in footer or accessible settings panel in nav
- Each toggle should work independently (user can enable night mode + large text simultaneously)

---

## 10. SITE PROPERTIES [DECIDED]

### Two Separate Properties
1. **lorin.work** — Personal portfolio. Case-study-driven. Audience: hiring managers.
2. **Groundswell standalone** — Public-facing project documentation. Audience: funders, healthcare administrators, participants. Lives at `(standalone)/groundswell`. Contains purpose-built components. **Do not modify without explicit discussion.**

The portfolio case study links OUT to the standalone site for depth. This solves the tension between "tell me about the project" and "tell me about YOU."

---

## 11. VISUAL LANGUAGE [DIRECTIONAL]

### Confirmed Direction
- Typography-forward: type IS the design
- Organic textures, natural materials, patina quality
- Restrained palette with richness from texture and scale contrast
- Polished foundation with experimental moments
- Calm surface with surprises underneath for those who look closely

### The Scanned Objects [TBD — Not Yet Implemented]
Lorin's flatbed scanner scans of personal objects (stones, dried flowers, altar cloth, childhood paintings, earrings, embroidered textiles) are the raw material for the visual identity. The V2 color palette is derived from these objects.

**Standing idea:** A personal history timeline interaction on the homepage or about page, showcasing Lorin's creative journey — from childhood finger painting to journalism photography to poster design to animation to CMU. The scanned objects would serve as landmarks and visual texture.

**Potential future applications (not yet built):**
- Background textures from linen, stone, embroidery
- CSS `mix-blend-mode` interactions with colored backgrounds
- CSS `mask-image` reveals (text or shapes filled with scanned texture)
- Cutouts with transparent backgrounds on cream
- Parallax floating objects at different scroll speeds
- Dark-field full-bleed section breaks between case studies
- Color sampling from childhood paintings for generative gradients

### Noise Overlay
`body::after` applies fractal noise at `opacity: 0.022` — subtle paper/grain quality. Keep unless performance testing shows issues. Disabled in high contrast mode.

### Open Visual Decisions
- [ ] How literally vs. abstractly do scans appear on the site?
- [ ] Dark-field sections as full-bleed breaks between content?
- [ ] Role label that shifts contextually in the nav?
- [ ] Tarot card reveal mechanic for about page?
- [ ] Poster work as a mini case study ("From Concept to Clarity")?
- [ ] Personal history timeline: homepage or about page?

---

## 12. V1 → V2 MIGRATION [DIRECTIONAL]

### Current State
- Homepage: actively being rebuilt with V2 styles
- About page: V1 styles, incomplete, uses deprecated color tokens and `--font-sharp`
- Case study template: not yet built for V2
- Standalone Groundswell: complete, keep as-is (not part of migration)
- Project card theme system: exists in `lib/projectThemes.js`, usage in V2 is TBD

### Migration Strategy
1. **Do not break the deployed V1.** V2 work happens alongside until a page is ready to replace.
2. **V2 decisions made on the homepage get documented here immediately.**
3. **When homepage V2 is approved,** apply patterns to about page and case study template.
4. **Once all pages are V2,** remove deprecated tokens in a single cleanup pass.

### Deprecated — Do Not Use in New Work
**Colors:** `--olive-*`, `--lavender-*`, `--sky-*`, `--adobe-*`, `--rose-*`, `--hero-*`, and all legacy aliases (`--color-green-*`, `--color-gold`, `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-light`, `--color-border`)

**Typography:** `--font-sharp` — update all existing references to `--font-soft`

**Easing:** `--ease-default`, `--ease-pulse`, `--ease-out-expo`, `--ease-out-quart`, `--transition-gentle`, `--transition-smooth`

---

## 13. QUALITY CHECKLISTS

### Before Every Commit [GUIDELINE]
- [ ] No hardcoded colors, spacing, or font values without good reason
- [ ] No duplicate CSS selectors
- [ ] Responsive at 400, 600, 900px — no orphans, no horizontal scroll
- [ ] Touch targets ≥ 44px
- [ ] Focus states visible on all interactive elements
- [ ] `prefers-reduced-motion` handled (content visible, animation disabled)
- [ ] Images have appropriate alt text
- [ ] No `console.log`, no unused imports
- [ ] Motion feels calm, not jarring

### Before Deploying a Page
- [ ] `npm run build` completes with zero errors
- [ ] `npm run lint` passes
- [ ] Lighthouse accessibility score ≥ 95
- [ ] Tested on actual mobile device (not just browser resize)
- [ ] Screen reader pass with VoiceOver
- [ ] Content reads well at every breakpoint
- [ ] Animations enhance understanding, don't distract
- [ ] All interactive elements keyboard accessible
- [ ] Color contrast validated for all text/background combinations

---

## 14. DOCUMENTS THIS SPEC SUPERSEDES

| Document | Status |
|----------|--------|
| `PORTFOLIO_ENGINEERING_STANDARDS.md` | **Archive.** Wrong font, old colors, different easing. |
| `CLAUDE_PROJECT_PROMPT.md` | **Archive.** Duplicates this spec; some values outdated. |
| `CLAUDE_WORKFLOW.md` | **Archive.** Workflow mechanics useful; token values stale. |
| `README copy.md` | **Archive.** Wrong font, wrong transition values. |
| `CLAUDE_CODE_AUDIT_PROMPT.md.txt` | **Archive.** Historical audit scope doc. |

### Keep Active Alongside This Spec
These three documents together are the complete context for any new session:

1. **`DESIGN_SPEC.md`** (this file) — All design and engineering decisions
2. **`PORTFOLIO_STRATEGY_SUMMARY_v2.md`** — Creative direction, conceptual framework, content strategy, interaction philosophy
3. **`WORKING_WITH_LORIN.md`** — Collaboration guide, creative taste, strengths, growth edges

---

*When a decision moves from DIRECTIONAL to DECIDED, update the tier label. When a TBD is resolved, move it to the appropriate section. When guidance proves too rigid or too loose, adjust it. This document grows with the work.*
