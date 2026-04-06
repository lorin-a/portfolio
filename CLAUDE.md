# CLAUDE.md — lorin.work Portfolio

## What This Project Is

A design research portfolio for lorin.work. The audience is hiring managers who need to quickly understand what Lorin has done, how she thinks, and what her process is. The site must make a strong impression in 90 seconds and reward deeper exploration. It is built with Next.js, CSS Modules, and GSAP — no Tailwind, no styled-components.

## Before Doing Any Work

Read these three files. They are the complete project context:

1. **`DESIGN_SPEC.md`** — All design tokens, engineering decisions, accessibility standards, motion system, case study structure. This is the source of truth. If something contradicts this file, this file wins.
2. **`docs/WORKING_WITH_LORIN.md`** — How Lorin thinks, her creative taste, her strengths, her growth edges, and how to collaborate with her effectively.
3. **`GSAP_PATTERNS.md`** — GSAP animation patterns, plugin usage, React integration, and conventions for this project. All animation code must follow these patterns.

Do not reference any files in `docs/archive/`. They contain outdated values from earlier project phases.

## Tech Stack

- **Framework:** Next.js 14, App Router
- **Styling:** CSS Modules + `globals.css` for tokens
- **Animation:** GSAP with ScrollTrigger
- **Media:** Cloudinary (`lib/cloudinary.js` for public ID mappings)
- **Content:** Markdown + gray-matter + react-markdown
- **Deployment:** Vercel → lorin.work

## Commands

```bash
npm run dev          # Development server (port 3000)
npm run build        # Production build — run before deploying
npm run lint         # ESLint
npm run lint:css     # Stylelint
```

## Route Structure

```
app/
├── (portfolio)/        → Nav + Footer (layout.js)
│   ├── page.js         → Homepage (V2 in progress)
│   ├── about/          → About page (V1, pending migration)
│   ├── projects/
│   │   ├── [slug]/     → Case study template (Sense → Weave → Shape)
│   │   └── groundswell/
│   └── not-found.js
├── (standalone)/       → No chrome — DO NOT MODIFY without discussion
│   └── groundswell/    → Stakeholder documentation site
└── globals.css
```

## What's Deprecated — Do Not Use

**Colors:** `--olive-*`, `--lavender-*`, `--sky-*`, `--adobe-*`, `--rose-*`, `--hero-*`, and all legacy aliases (`--color-green-*`, `--color-gold`, `--color-bg`, `--color-bg-alt`, `--color-text`, `--color-text-light`, `--color-border`)

**Typography:** `--font-sharp` — all text uses `--font-soft`. Only the hero uses `--font-wonky`.

**Easing:** `--ease-default`, `--ease-pulse`, `--ease-out-expo`, `--ease-out-quart`, `--transition-gentle`, `--transition-smooth`

Use V2 tokens from `DESIGN_SPEC.md` Section 5 (color) and Section 6 (motion) for all new work.

## Quick Reference — Active Tokens

### Easing (3 curves only)
```css
--ease-out:    cubic-bezier(0.22, 1, 0.36, 1);    /* Default: reveals, hovers */
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1);    /* Sustained: page transitions */
--ease-bounce: cubic-bezier(0.34, 1.4, 0.64, 1);  /* Sparingly: landing into place */
```

### Duration (anchors, not hard limits)
```css
--motion-fast:   300ms   /* Hover, micro-interactions */
--motion-medium: 600ms   /* Scroll reveals, transitions */
--motion-slow:   900ms   /* Hero, dramatic moments */
```

### Font Axes
```css
--font-soft:  'SOFT' 50, 'WONK' 0   /* Site-wide default */
--font-wonky: 'SOFT' 50, 'WONK' 1   /* Hero only */
```

## V1 → V2 Migration

The site is mid-build. V1 is deployed and must not break. V2 is being built on the homepage first, then applied to other pages.

- **Homepage:** Actively being rebuilt with V2 styles
- **About page:** V1 styles, incomplete — do not modify with V1 patterns
- **Case study template:** Not yet built — will use V2 + Sense/Weave/Shape structure
- **Standalone Groundswell:** Complete. Do not touch.

When V2 decisions are made during homepage work, update `DESIGN_SPEC.md` immediately.

## Common Gotchas

| Symptom | Cause |
|---------|-------|
| Using DM Sans references | Stale docs — actual font is Open Sans |
| V1 color tokens in new code | Check deprecated list above |
| `--font-sharp` in CSS | Retired — replace with `--font-soft` |
| Invisible content on reduced motion | Component missing explicit `opacity: 1; transform: none` |
| Hover stuck on mobile | Missing `@media (hover: hover)` wrapper |
| Orphaned words on mobile | Missing `text-wrap: pretty` or test at 400px |
| Inconsistent easing | Using old 6+ curve system — only 3 active curves now |
| Hardcoded spacing values | Should use tokens from `globals.css` unless one-off is justified |

## The Feeling Test

Before delivering anything, ask: would a hiring manager spend 90 seconds on this site and think —

*"This person is different. Not in a loud way — in a way I can feel but can't quite name. Everything here was chosen. She clearly cares at a level that would elevate our team. And she can actually build things. I want to meet her."*

If yes, ship it. If no, keep going.
