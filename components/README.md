# Portfolio Component Library

Reusable components for case study pages. Built to meet engineering standards for accessibility, responsiveness, and clean architecture.

---

## Installation

Copy the entire `components/` folder to your project's `components/` directory.

```
your-project/
├── components/
│   ├── Lightbox.js
│   ├── Lightbox.module.css
│   ├── ImageCarousel.js
│   ├── ImageCarousel.module.css
│   ├── ImageGallery.js
│   ├── ImageGallery.module.css
│   ├── CardDeck.js
│   ├── CardDeck.module.css
│   ├── AudioCard.js
│   ├── AudioCard.module.css
│   ├── TimelineNav.js
│   ├── TimelineNav.module.css
│   ├── ProjectHero.js
│   ├── ProjectHero.module.css
│   ├── PhaseDivider.js
│   ├── PhaseDivider.module.css
│   ├── QuoteBlock.js
│   ├── QuoteBlock.module.css
│   └── index.js
```

---

## Components Overview

| Component | Purpose |
|-----------|---------|
| `Lightbox` | Full-screen image viewer with keyboard nav |
| `ImageCarousel` | Horizontal scrolling gallery |
| `ImageGallery` | Single image with prev/next arrows |
| `CardDeck` | Flippable card stack |
| `AudioCard` | Audio player card |
| `TimelineNav` | Sticky progress navigation |
| `ProjectHero` | Hero section with background image |
| `PhaseDivider` | Chapter marker section |
| `QuoteBlock` | Styled quotes |

---

## Usage Examples

### ImageCarousel (Workshop Galleries)

```jsx
import { ImageCarousel } from '@/components'

const workshopImages = [
  { src: '/images/groundswell/gs-workshop-grief-01.jpg', alt: 'Grief workshop activity 1' },
  { src: '/images/groundswell/gs-workshop-grief-02.jpg', alt: 'Grief workshop activity 2' },
  { src: '/images/groundswell/gs-workshop-grief-03.jpg', alt: 'Grief workshop activity 3' },
]

<ImageCarousel 
  images={workshopImages}
  height={360}
  ariaLabel="Grief workshop photo gallery"
/>
```

### ImageGallery (Component Galleries)

```jsx
import { ImageGallery } from '@/components'

const podImages = [
  { src: '/images/groundswell/gs-pod-detail-01.jpg', alt: 'Restorative pod exterior' },
  { src: '/images/groundswell/gs-pod-detail-02.jpg', alt: 'Restorative pod interior' },
  { src: '/images/groundswell/gs-pod-detail-03.jpg', alt: 'Restorative pod detail' },
]

<ImageGallery 
  images={podImages}
  showDots={true}
  showCounter={true}
  ariaLabel="Groundswell pod gallery"
/>
```

### CardDeck (Reflection Cards)

```jsx
import { CardDeck } from '@/components'

const cards = [
  { id: 1, name: 'welcome' },
  { id: 2, name: 'embrace' },
  { id: 3, name: 'numb' },
  // ...
]

<CardDeck 
  cards={cards}
  imagePath="/images/groundswell/gs-card-"
/>
// Will load: /images/groundswell/gs-card-welcome-front.jpg
//            /images/groundswell/gs-card-welcome-back.jpg
```

### AudioCard

```jsx
import { AudioCard, AudioCardGrid } from '@/components'

<AudioCardGrid columns={2}>
  <AudioCard
    type="Guided Meditation"
    title="Coming Home to Yourself"
    artist="By Catherine Liggett"
    src="/audio/groundswell/gs-meditation-home.mp3"
    variant="dark"
  />
  <AudioCard
    type="Poem"
    title="Remember Your Heart"
    artist="Read by Catherine Liggett"
    src="/audio/groundswell/gs-poem-remember.mp3"
    variant="dark"
  />
</AudioCardGrid>
```

### TimelineNav

```jsx
import { TimelineNav } from '@/components'

const sections = [
  { id: 'context', label: 'Context' },
  { id: 'process', label: 'Process' },
  { id: 'synthesis', label: 'Synthesis' },
  { id: 'impact', label: 'Impact' },
]

<TimelineNav 
  sections={sections}
  heroId="hero"  // Nav appears after scrolling past this element
/>
```

### ProjectHero

```jsx
import { ProjectHero } from '@/components'

<ProjectHero
  title="Groundswell"
  subtitle="Making Space to Restore, Together"
  descriptor="A Design Ecology for Staff Well-Being"
  tags={['Co-Design', 'Healthcare', 'Systems']}
  backgroundImage="/images/groundswell/gs-hero.jpg"
  id="hero"
/>
```

### PhaseDivider

```jsx
import { PhaseDivider } from '@/components'

<PhaseDivider
  id="context"
  title="Context"
  intro="Gynecologic oncology staff face chronic compounded grief from repeated patient loss..."
/>
```

### QuoteBlock

```jsx
import { QuoteBlock, QuoteGrid } from '@/components'

// Single quote with border
<QuoteBlock
  quote="A special person can do this work forever, a good person can do it for a little while, most people couldn't do it for a day."
  attribution="Oncology Staff"
  variant="bordered"
  theme="light"
/>

// Large centered quote
<QuoteBlock
  quote="It's remarkable what 10 minutes can do..."
  variant="large"
  theme="dark"
/>

// Grid of participant quotes with interpretations
const participantQuotes = [
  { quote: "I feel trapped.", interpretation: "There is no way out..." },
  { quote: "What mental health?", interpretation: "There are zero benefits..." },
]

<QuoteGrid quotes={participantQuotes} />
```

---

## CSS Variables Required

These components expect these CSS variables to be defined (typically in `globals.css`):

```css
/* Project accent colors (set per-page) */
--project-accent: #554D65;
--project-accent-light: #F8EBE5;

/* Typography */
--font-serif: 'Ovo', Georgia, serif;
--font-sans: 'Open Sans', system-ui, sans-serif;

/* Spacing */
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;

/* Transitions */
--transition-gentle: 0.3s ease-out;

/* Text sizes */
--text-h2: clamp(1.75rem, 4vw, 2.25rem);
--text-h3: clamp(1.25rem, 3vw, 1.5rem);
--text-body-large: clamp(1rem, 1.5vw, 1.125rem);
--text-body: 1rem;
--text-body-small: 0.875rem;

/* Line heights */
--leading-normal: 1.6;
--leading-relaxed: 1.7;
```

---

## Accessibility Features

All components include:

- ✅ 44px minimum touch targets
- ✅ Keyboard navigation (arrows, Enter, Escape)
- ✅ Focus visible states
- ✅ ARIA labels and roles
- ✅ `prefers-reduced-motion` support
- ✅ Screen reader announcements (`aria-live`)
- ✅ `@media (hover: hover)` for touch devices

---

## Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| Desktop | > 900px |
| Tablet | ≤ 900px |
| Mobile | ≤ 600px |
| Small Mobile | ≤ 400px |

---

## Files Summary

| File | Purpose |
|------|---------|
| `Lightbox.js/css` | Full-screen image modal |
| `ImageCarousel.js/css` | Horizontal scroll gallery |
| `ImageGallery.js/css` | Single image with navigation |
| `CardDeck.js/css` | Flippable card stack |
| `AudioCard.js/css` | Audio player cards |
| `TimelineNav.js/css` | Sticky progress nav |
| `ProjectHero.js/css` | Hero with background image |
| `PhaseDivider.js/css` | Chapter markers |
| `QuoteBlock.js/css` | Quote styling |
| `index.js` | Export aggregator |
