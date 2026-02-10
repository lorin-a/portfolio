# Groundswell Page Refactor

This refactor transforms the 1500+ line Groundswell page with inline styles into a clean, maintainable structure using the component library.

---

## Files to Add/Replace

| File | Location | Action |
|------|----------|--------|
| `page.js` | `app/projects/groundswell/page.js` | **Replace** existing file |
| `GroundswellContent.js` | `app/projects/groundswell/GroundswellContent.js` | **Add** new file |
| `project-module-additions.css` | (contents go into) `styles/project.module.css` | **Append** to existing file |

---

## Implementation Steps

### 1. Backup your current Groundswell page
```bash
cp app/projects/groundswell/page.js app/projects/groundswell/page.backup.js
```

### 2. Replace page.js
Copy the new `page.js` to `app/projects/groundswell/page.js`

This is now a **server component** with SEO metadata.

### 3. Add GroundswellContent.js
Copy `GroundswellContent.js` to `app/projects/groundswell/GroundswellContent.js`

This is the **client component** with all interactive content.

### 4. Update project.module.css
Open `styles/project.module.css` and **append** the contents of `project-module-additions.css` to the end of the file.

### 5. Test
```bash
npm run dev
```

Visit `http://localhost:3000/projects/groundswell`

---

## What Changed

### Before (1506 lines)
- Single massive client component
- No SEO metadata possible
- Hundreds of inline `style={{...}}` objects
- Hardcoded colors (`#554D65`, `rgba(85, 77, 101, 0.96)`)
- Custom gallery/lightbox code repeated 6+ times
- Touch targets below 44px minimum
- Hover effects without `@media (hover: hover)`

### After (~450 lines)
- Server component wrapper with full SEO metadata
- Clean client component using reusable components
- All styling via CSS modules
- CSS variables for colors
- Single `ImageCarousel`, `ImageGallery`, `CardDeck` components
- All touch targets meet 44px minimum
- Proper hover media queries

---

## Component Usage in New Page

| Old Code | New Component |
|----------|---------------|
| Inline sticky nav with 50+ style properties | `<TimelineNav />` |
| Inline hero with gradient overlay | `<ProjectHero />` |
| Inline phase dividers | `<PhaseDivider />` |
| Workshop gallery with scroll buttons | `<ImageCarousel />` |
| Component detail galleries | `<ImageGallery />` |
| Card flip with 200+ lines | `<CardDeck />` |
| Audio player cards | `<AudioCard />` |
| Various quote styles | `<QuoteBlock />` |

---

## SEO Improvements

The new `page.js` includes:

```js
export const metadata = {
  title: 'Groundswell | Lorin Anderberg',
  description: 'A grant-funded ecosystem of emotional support...',
  openGraph: {
    title: 'Groundswell | Lorin Anderberg',
    description: '...',
    images: ['/images/groundswell/gs-hero.jpg'],
  },
}
```

This was impossible before because the entire page was a client component.

---

## Troubleshooting

### "Module not found: Can't resolve '@/components'"
Make sure you added the `index.js` file to your `components/` folder.

### Styles not applying
Make sure you appended the CSS additions to `styles/project.module.css`, not replaced the file.

### Timeline nav not showing
The `TimelineNav` component needs elements with IDs matching the sections array:
- `id="context"`
- `id="process"`
- `id="synthesis"`
- `id="impact"`

These are set via the `<PhaseDivider id="..." />` components.

---

## File Size Comparison

| Metric | Before | After |
|--------|--------|-------|
| page.js lines | 1506 | ~20 |
| GroundswellContent.js lines | — | ~430 |
| Reusable components | 0 | 9 |
| Inline style objects | ~150 | 0 |
