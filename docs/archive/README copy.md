# Portfolio Component Library

Reusable components for the portfolio site. Built with accessibility, responsiveness, and clean architecture in mind.

## Folder Structure

Every component lives in its own folder with its JavaScript and CSS Module:

```
components/
├── index.js                    # Barrel file for clean imports
├── AnimatedElement/
│   ├── AnimatedElement.js
│   └── AnimatedElement.module.css
├── CardCarousel/
│   ├── CardCarousel.js
│   └── CardCarousel.module.css
├── Footer/
│   ├── Footer.js
│   └── Footer.module.css
├── Hero/
│   ├── Hero.js
│   └── Hero.module.css
├── InteractiveDial/
│   ├── InteractiveDial.js
│   ├── InteractiveDial.module.css
│   └── dialConfig.js
├── Lightbox/
│   ├── Lightbox.js
│   └── Lightbox.module.css
├── Nav/
│   ├── Nav.js
│   └── Nav.module.css
├── ProgressNav/
│   ├── ProgressNav.js
│   └── ProgressNav.module.css
├── ProjectNav/
│   ├── ProjectNav.js
│   └── ProjectNav.module.css
├── ScrollVideo/
│   ├── ScrollVideo.js
│   └── ScrollVideo.module.css
├── Squiggle/
│   ├── Squiggle.js
│   └── Squiggle.module.css
└── _archive/                   # Unused components (pending review)
```

## Usage

### Direct imports (recommended)
```jsx
import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
```

### Barrel imports
```jsx
import { Nav, Footer, Hero } from '@/components'
```

## Active Components

| Component | Purpose | Used In |
|-----------|---------|---------|
| `Nav` | Site navigation header | layout.js |
| `Footer` | Site footer with contact | layout.js |
| `Hero` | Homepage hero with dial | page.js |
| `InteractiveDial` | Animated photo dial | Hero |
| `Squiggle` | Decorative wave divider | page.js, Footer, Groundswell |
| `ProjectNav` | Side navigation for projects | [slug]/page.js |
| `CardCarousel` | Flippable card deck | Groundswell |
| `ScrollVideo` | Video with scroll-triggered play | Groundswell |
| `AnimatedElement` | Fade-in on scroll wrapper | Groundswell |
| `ProgressNav` | Scroll progress indicator | Groundswell |
| `Lightbox` | Full-screen image viewer | Groundswell |

## CSS Variables Required

Components use these CSS variables from `globals.css`:

```css
/* Typography */
--font-heading: var(--font-fraunces), Georgia, serif;
--font-body: var(--font-dm-sans), -apple-system, sans-serif;

/* Spacing */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 6rem;

/* Transitions */
--transition-gentle: 0.3s ease-out;
```

## Archived Components

The `_archive/` folder contains components that were built but are not currently in use. These may be activated for future projects:

- AudioCard
- CardDeck
- FilterTabs
- HeroProject
- ImageCarousel
- ImageGallery
- PhaseDivider
- ProjectCard
- ProjectGallery
- ProjectHero
- QuoteBlock
- TimelineNav
- ToolBadge

## Accessibility

All active components include:
- Minimum 44px touch targets
- Keyboard navigation
- Focus visible states
- ARIA labels where needed
- `prefers-reduced-motion` support
