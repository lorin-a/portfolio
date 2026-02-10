# Portfolio Fixes - January 31, 2026

## Summary of Changes

These files fix four issues identified in the engineering standards audit:

1. **Character encoding corruption** - Fixed garbled UTF-8 characters
2. **Touch target accessibility** - Increased to 44px minimum
3. **Hover state accessibility** - Wrapped in `@media (hover: hover)`

---

## File Placement

| Fixed File | Replace This File |
|------------|-------------------|
| `Footer.js` | `components/Footer.js` |
| `about-page.js` | `app/about/page.js` |
| `Nav.module.css` | `components/Nav.module.css` |
| `ProjectGallery.module.css` | `components/ProjectGallery.module.css` |
| `groundswell.md` | `content/groundswell.md` (or wherever markdown lives) |

---

## What Was Fixed

### Footer.js
- `Â·` → `·` (middle dot separator)
- `Â©` → `©` (copyright symbol)

### about-page.js (was page.js in app/)
- `healthâ€"spaces` → `health—spaces`
- `ourselvesâ€"how` → `ourselves—how`
- `wholeâ€¦The` → `whole…The`
- All em dashes now render correctly

### Nav.module.css
- Wrapped `.navLink:hover::after` in `@media (hover: hover)`
- Wrapped `.socialLink:hover` in `@media (hover: hover)`
- Prevents "sticky hover" on touch devices

### ProjectGallery.module.css
- Mobile gallery arrows: `36px` → `44px` (meets touch target minimum)
- Mobile lightbox arrows: `40px` → `44px`
- Added `@media (hover: hover)` to `.imageButton:hover`
- Added `@media (hover: hover)` to `.arrow:hover`
- Added `@media (hover: hover)` to `.lightboxClose:hover`
- Added `@media (hover: hover)` to `.lightboxArrow:hover`

### groundswell.md
- Fixed em dash encoding in quote: `physicians—everyone`
- Fixed em dash encoding: `resonance—the degree`

---

## After Replacing Files

1. Run `npm run dev`
2. Test on mobile device or Chrome DevTools mobile emulator
3. Verify no "sticky" hover states on touch
4. Verify arrows/buttons are easily tappable

---

## Verification Checklist

- [ ] Footer shows `·` and `©` correctly
- [ ] About page shows proper em dashes (—) not garbled text
- [ ] Groundswell quotes render correctly
- [ ] Gallery arrows don't stay highlighted after tap on mobile
- [ ] Nav links don't stay underlined after tap on mobile
- [ ] All buttons feel easy to tap on phone
