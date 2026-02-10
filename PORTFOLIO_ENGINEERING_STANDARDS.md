# Portfolio Engineering Standards
## lorin.work

> Essential rules to keep our code clean, accessible, and consistent.

---

## 1. Cardinal Rules

1. **Audit before implementation** - check accessibility, responsiveness, typography
2. **Ask before building** - if it touches more than 2 files, discuss first
3. **CSS handles layout, JS handles state** - no viewport calculations in JavaScript

---

## 2. Design Tokens

All values come from `globals.css`. No hardcoded colors, spacing, or fonts.

### Colors
```css
--color-green-warm: #8B9A6B;
--color-green-sage: #7A9A8A;
--color-green-dark: #4A5A4A;
--color-gold: #96822F;

--color-bg: #FAF9F6;
--color-bg-alt: #F5F4F1;
--color-text: #2D2D2D;
--color-text-light: #5A5A5A;
--color-border: #E0DDD8;
```

### Typography
```css
--font-serif: 'Ovo', Georgia, serif;      /* Headings */
--font-sans: 'Open Sans', system-ui, sans-serif;  /* Body */
```

### Spacing
```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 2rem;     /* 32px */
--space-lg: 4rem;     /* 64px */
--space-xl: 6rem;     /* 96px */
```

### Transitions
```css
--transition-gentle: 0.3s ease-out;       /* Hover, micro-interactions */
--transition-smooth: 0.4s ease-in-out;    /* Page transitions, modals */
```

---

## 3. Typography & Rag

### Prevent Orphans and Bad Rag
```css
h1, h2, h3 {
  text-wrap: balance;  /* Distributes lines evenly */
}

p {
  text-wrap: pretty;   /* Prevents single-word last lines */
}
```

### Line Length
- Ideal: 45-75 characters per line
- Use `--content-width: 900px` for text containers
- Test at all breakpoints - a paragraph fine at desktop may orphan at mobile

### Manual Fixes (When Needed)
- `&nbsp;` keeps short phrases together: `10&nbsp;weeks`
- `<br />` forces a break at a natural phrase point in headings

---

## 4. Responsive Breakpoints

| Name | Width | Media Query |
|------|-------|-------------|
| Desktop | > 900px | Default styles |
| Tablet | <= 900px | `@media (max-width: 900px)` |
| Mobile | <= 600px | `@media (max-width: 600px)` |
| Small Mobile | <= 400px | `@media (max-width: 400px)` |

### Button Wrapping Pattern
```css
.buttonGroup {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

@media (max-width: 600px) {
  .buttonGroup {
    flex-direction: column;
  }
  
  .button {
    width: 100%;
  }
}
```

### Mobile Viewport Fix
```css
min-height: 100vh;
min-height: 100dvh;  /* Accounts for browser chrome */
```

---

## 5. Accessibility

### Touch Targets
**Minimum 44x44px** for all buttons and links.

### Focus States
```css
:focus-visible {
  outline: 2px solid var(--color-green-warm);
  outline-offset: 2px;
}
```

### Reduced Motion
Already in `globals.css` - don't remove:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Hover States
Only apply on devices that support hover:
```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-4px);
  }
}
```

---

## 6. Motion

### Allowed
| Duration | Easing | Use |
|----------|--------|-----|
| 300ms+ | `ease-in-out` | Major transitions |
| 150-300ms | `ease-out` | Hover, micro-interactions |

### Prohibited
`bounce`, `elastic`, `spring`, `linear`, `ease-in` alone

### The Test
> Is this motion *settling* or *traveling*?
> - Settling → `ease-out`
> - Traveling → `ease-in-out`

---

## 7. Quick Checks Before Delivery

- [ ] No orphans at 400px, 600px, 900px
- [ ] Buttons/links are 44px minimum
- [ ] Focus states visible
- [ ] Only using tokens from globals.css
- [ ] Motion feels calm, not jarring
- [ ] No horizontal scroll at any breakpoint

---

## 8. Common Fixes

| Problem | Solution |
|---------|----------|
| Orphan on mobile | Add `text-wrap: pretty`, test at 400px |
| Buttons won't wrap | Add `flex-wrap: wrap` to container |
| Hover stuck on mobile | Wrap in `@media (hover: hover)` |
| Motion feels mechanical | Change `linear` to `ease-out` |
| Content behind nav | Check padding matches nav height |

---

*Add rules as we hit problems. Keep it lean.*
