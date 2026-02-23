# Frontend Engineering Standards

> If a developer cannot change a font, color, or spacing value in ONE place
> and have it update everywhere, the architecture is broken. Fix it before building more.

---

## The One Rule

**Every visual property that appears more than once must be defined as a variable.**
Fonts, colors, spacing, border radii, shadows, transition timing —
all of it lives in ONE file as CSS custom properties. Components reference variables, never raw values.

If you find yourself typing a hex code, a font name, or a spacing value directly
into a component stylesheet and that same value exists elsewhere, stop.
Reference the token.

### One-offs Are Fine. Undocumented One-offs Are Not.

Not every value needs to be a token. A decorative pull quote with a unique size,
a page-specific accent color, a chart with 12 data colors — these are legitimate
one-offs. The rule is: **if it's custom, comment why.**
```css
/* One-off: oversized pull quote unique to this case study hero */
font-size: 2.4rem;
```

If you find yourself commenting the same "one-off" in three files, it's not
a one-off anymore. Promote it to a token.

---

## 1. Design Token Architecture

All shared tokens live in `globals.css` under `:root`. Organized by category.
```css
:root {
  /* === COLORS === */
  --color-primary: #5C6B1F;
  --color-secondary: #B85C38;
  --color-accent: #7B5B7B;
  --color-bg: #F8F6F0;
  --color-bg-alt: #F5F4F1;
  --color-text: #2C2C2C;
  --color-text-light: #5A5A5A;
  --color-border: #E0DDD8;

  /* === TYPOGRAPHY === */
  --font-serif: 'Fraunces', serif;
  --font-sans: 'DM Sans', sans-serif;
  --font-serif-soft: 'SOFT' 50, 'WONK' 0;
  --font-serif-sharp: 'SOFT' 0, 'WONK' 0;

  --text-h1: clamp(2rem, 5vw, 3.2rem);
  --text-h2: 1.75rem;
  --text-h3: 1.35rem;
  --text-h4: 1.1rem;
  --text-body: 1.05rem;
  --text-small: 0.85rem;
  --text-label: 0.7rem;

  --weight-bold: 700;
  --weight-semi: 600;
  --weight-medium: 500;
  --weight-regular: 400;

  --leading-tight: 1.2;
  --leading-normal: 1.65;
  --leading-loose: 1.8;

  /* === SPACING === */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;

  /* === LAYOUT === */
  --max-width: 1200px;
  --content-width: 900px;
  --container-padding: 2rem;

  /* === MOTION === */
  --ease-default: cubic-bezier(0.42, 0, 0.58, 1);
  --ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);
  --motion-fast: 300ms;
  --motion-medium: 600ms;
  --motion-slow: 900ms;

  /* === BREAKPOINTS (reference — can't use vars in media queries) === */
  /* Desktop: default styles */
  /* Tablet: max-width: 900px */
  /* Mobile: max-width: 600px */
  /* Small: max-width: 400px */

  /* === SURFACES === */
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-pill: 9999px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.10);
}
```

### What Gets Tokenized vs. What Doesn't

| Tokenize (global `:root`) | Don't tokenize |
|---|---|
| Brand colors, text colors, backgrounds | Data viz / chart-specific colors |
| Font families and standard size scale | One-off decorative sizes |
| Spacing scale used across components | Third-party embed overrides |
| Shared motion values | Page-unique accent colors (use page-level vars instead) |

### Page-Level Custom Properties

When a page or case study needs its own accent colors, define them scoped to that page — not in the global `:root`.
```css
/* At the top of a page's module.css */
.page {
  --page-accent: #B85C38;
  --page-accent-light: #F5EDE8;
}

/* Components on this page reference --page-accent */
.heading {
  color: var(--page-accent);
}
```

This keeps the global token system clean while giving individual pages their own identity.

---

## 2. File Structure

### Components With Styles Get Folders
```
ComponentName/
├── ComponentName.js
└── ComponentName.module.css
```

### Utility Components Live Together

Small, style-free utility components (under ~15 lines, no CSS) don't need individual folders. Group them:
```
components/
├── index.js              <- barrel file for clean imports
├── Nav/
│   ├── Nav.js
│   └── Nav.module.css
├── CardDeck/
│   ├── CardDeck.js
│   └── CardDeck.module.css
├── utils/                <- style-free utilities
│   ├── VisuallyHidden.js
│   ├── SkipLink.js
│   └── ConditionalWrap.js
```

The test: does this component have its own CSS module? If yes, it gets a folder. If no, it lives in `utils/`.

### Full Project Structure
```
app/
├── globals.css           <- tokens ONLY, no component styles
├── layout.js
├── page.js
├── page.module.css
├── [route]/
│   └── page.js
components/
├── index.js              <- barrel exports
├── ComponentName/
│   ├── ComponentName.js
│   └── ComponentName.module.css
├── utils/
content/                  <- markdown, data files
lib/                      <- utilities, helpers, constants
public/
├── images/
│   ├── site/             <- logo, favicon, shared assets
│   └── [project-name]/   <- grouped by project
```

### Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase folder + file | `CardDeck/CardDeck.js` |
| CSS Modules | Match component name | `CardDeck/CardDeck.module.css` |
| CSS classes | camelCase | `.heroTitle` |
| Routes/pages | kebab-case | `app/case-study/page.js` |
| Images | kebab-case with project prefix | `gs-workshop-01.jpg` |
| Constants | UPPER_SNAKE | `MAX_CAROUSEL_ITEMS` |

---

## 3. CSS Rules

### Single Source of Truth

Every selector defined ONCE. Never append a second copy further down the file.

### Components Reference Tokens
```css
/* CORRECT */
.heading {
  font-family: var(--font-serif);
  font-size: var(--text-h2);
  font-weight: var(--weight-semi);
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

/* WRONG — hardcoded values that exist as tokens */
.heading {
  font-family: 'Fraunces', serif;
  font-size: 1.75rem;
  font-weight: 600;
  color: #2C2C2C;
  margin-bottom: 1rem;
}
```

### Responsive Styles: Depends on File Size

**In shared/page-level stylesheets (100+ lines):** consolidate media queries at the bottom. Prevents scattershot breakpoints across a long file.
```css
/* page.module.css — consolidate at bottom */
.hero { ... }
.card { ... }
.grid { ... }

@media (max-width: 900px) {
  .hero { ... }
  .card { ... }
}

@media (max-width: 600px) {
  .hero { ... }
  .card { ... }
}
```

**In component CSS modules (under ~100 lines):** co-locate media queries with their selectors. Keeps related styles together where the file is short enough to hold in your head.
```css
/* CardDeck.module.css — co-locate is fine */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
    gap: var(--space-sm);
  }
}
```

### No `!important`

If you need `!important`, the specificity is wrong. Fix the selector hierarchy.

**One exception:** the `prefers-reduced-motion` global override, where `!important` is the correct approach to ensure animations are truly disabled.

### CSS Module Classes Only

No global class names in component files. Every class comes through the module.

---

## 4. JavaScript / React Rules

### Component Documentation

Every component gets a top comment explaining what it does, where it's used, and what it accepts.
```jsx
/**
 * QuoteBlock — Styled pull quote with optional attribution.
 * Used in: Case study pages, about page.
 *
 * @param {string} quote - The quote text
 * @param {string} [attribution] - Who said it
 * @param {string} [as='blockquote'] - HTML element to render as
 */
```

### Client vs. Server

`'use client'` only on components that actually use hooks, event handlers, or browser APIs. Don't blanket every file with it.

### Inline Styles

**Use inline styles when:** the value is calculated at runtime from JS state, props, or user interaction. Grid column counts from data, scroll-position-based transforms, dynamically sized elements.

**Don't use inline styles when:** the value could live in a stylesheet. If it's a static color, font, or spacing value, it belongs in CSS.

The test: *"Does this value change based on data, state, or user interaction?"* If yes, inline style. If no, stylesheet.

### Semantic HTML

Use the right element, not a styled div.

- `<main>` — one per page
- `<section>` — thematic groupings
- `<article>` — self-contained content
- `<nav>` — navigation
- `<header>` / `<footer>` — page or section boundaries
- `<button>` for actions, `<a>` for navigation

### Heading Levels and Reusable Components

Strict h1->h2->h3 hierarchy must be maintained in the final rendered DOM. But reusable components should be flexible about which heading level they render. Use an `as` prop:
```jsx
<SectionTitle as="h2">Research Approach</SectionTitle>
<SectionTitle as="h3">Key Findings</SectionTitle>
```

This lets the same component live at different depths in different page contexts without breaking the heading outline.

### Cleanup

- Remove all `console.log` before committing
- Remove all unused imports
- No dead code in production — see commented code rules below

---

## 5. Accessibility Baseline

These ship with every component. Not optional.

### Required

- All interactive elements: keyboard accessible
- All focus states: visibly styled
- Color contrast: WCAG AA minimum (4.5:1 body, 3:1 large text)
- Touch targets: minimum 44x44px
- Skip-to-content link on every page
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` respected for all animations

### Images and Alt Text

**Single content images:** descriptive alt text explaining what the image shows.

**Galleries and carousels:** the container gets a descriptive `aria-label` explaining the collection ("Workshop photos from session 3"). Individual images get brief alt text — no need for 12 poetic descriptions, which creates screen reader fatigue.

**Images with visible captions:** use `aria-describedby` pointing to the caption element. Don't duplicate the caption in the alt text.

**Decorative images:** `alt=""` and `aria-hidden="true"`.

### Headings

No skipped levels in the final rendered page. h1 -> h2 -> h3, never h1 -> h3. Use the `as` prop pattern on reusable components to maintain this across different contexts.

---

## 6. Motion Standards

All animations reference token values. No magic numbers in component files.

| Pattern | Easing | Duration | Use for |
|---------|--------|----------|---------|
| Grow in | `--ease-bounce` | `--motion-medium` | Images, containers |
| Write on | `--ease-default` | ~200ms/word | Headlines, sentences |
| Soft appear | `--ease-default` | `--motion-fast` | Body text, labels |
| Gentle pulse | `ease-in-out` | `--motion-slow` | Attention indicators |

### Rules

- CSS handles animations. JS triggers state changes that CSS responds to.
- Use `transform` and `opacity` for performance (GPU-accelerated).
- Every animation must have a `prefers-reduced-motion` alternative.
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Comments and Commented Code

### Good Comments Explain Why
```css
/* Offset accounts for sticky nav height */
scroll-margin-top: 4.5rem;
```
```jsx
/* Delay ring animation until type-on sequence completes —
   rings compete for attention if they start simultaneously */
```

### Remove

- Comments restating what the code does: `// set state to true`
- AI meta-comments: `// Added per user request`
- Generic labels: `// This is a component`

### Commented-Out Code

During **active development:** commented code is fine but must include a date and reason:
```jsx
/* REMOVED 2026-02-16: previous spring animation, keeping until
   new easing is verified on mobile */
```

**Before any handoff or release:** all commented code is removed. If you need it later, it's in git history.

**Any commented code older than 2 weeks** without a clear reason gets deleted.

---

## 8. Git Hygiene

### Conventional Commits
```
type: concise description under 72 chars
```

| Type | When |
|------|------|
| `feat` | New feature or component |
| `fix` | Bug fix |
| `refactor` | Code restructure, no behavior change |
| `style` | Visual/CSS changes only |
| `docs` | Documentation updates |
| `chore` | Config, dependencies, cleanup |

Body is optional. Use it for complex changes to explain reasoning.

### .gitignore
```
node_modules/
.next/
out/
.env
.env.local
.env*.local
.DS_Store
Thumbs.db
*.log
.vercel
```

### package.json

- Remove unused dependencies
- Scripts: `dev`, `build`, `start`, `lint` at minimum
- Include `engines` field specifying Node version

---

## 9. The Handoff Test

Before any page or component is considered done:

1. Can a developer change the primary font in ONE place and see it everywhere?
2. Can they change the primary color in ONE place?
3. Can they understand each component from its file name and top comment?
4. Can they run `npm install && npm run dev` and see a working site?
5. Is there a README with project structure and setup instructions?
6. Are there zero stale TODO comments or unexplained commented code?

If any answer is no, it's not ready for handoff.

---

## 10. Pre-Commit Checklist

- [ ] `npm run build` — zero errors
- [ ] `npm run lint` — passes
- [ ] No hardcoded values that duplicate existing tokens
- [ ] No console.log statements
- [ ] No unused imports
- [ ] All images have appropriate alt text
- [ ] Checked at desktop, tablet, and mobile widths
- [ ] New components have JSDoc comments
- [ ] Commit message uses conventional format
