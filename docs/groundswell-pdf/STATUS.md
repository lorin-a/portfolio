# Groundswell PDF — Status & Plan

Last updated: 2026-04-23

## Goal

Produce a downloadable PDF of the Groundswell case study, linkable from lorin.work/groundswell. Good enough for hiring-manager screen reading and home printing. Not press-ready.

## Source Material Inventory

- **Live page:** `app/(standalone)/groundswell/page.js` → `components/Groundswell/GroundswellContent.js` (component-driven, not markdown)
- **Markdown source:** `docs/groundswell.md` (~2,919 words, has frontmatter with client, team, role, duration, status)
- **Portfolio version:** `app/(portfolio)/projects/groundswell/` (separate, may differ in editorial cut)
- **Images:** `public/images/groundswell/` (352 files, includes raw .heic — needs curation)
- **Audio:** `public/audio/groundswell/` (out of scope for PDF)

## Phases

### Phase 1 — Foundations (current)
Status: in progress

- [x] Inventory source material
- [ ] Lock editorial scope (full vs condensed)
- [ ] Lock page format (Letter / A4 / custom)
- [ ] Lock visual treatment (web-aesthetic vs print-native)
- [ ] Lock tooling choice
- [ ] Decide content source path (re-use markdown, re-use components, or fresh extract)

### Phase 2 — Technical scaffold
Status: blocked on Phase 1

- [ ] Install rendering tooling
- [ ] Create print HTML/route skeleton
- [ ] Wire one render command (`npm run pdf:groundswell`) producing `public/groundswell-case-study.pdf`
- [ ] Verify pagination, page numbers, embedded fonts

### Phase 3 — Content & layout
Status: blocked on Phase 2

- [ ] Cover page
- [ ] TOC
- [ ] Section-by-section pour-in
- [ ] Image curation (~352 → ~12-20 hero figures)
- [ ] Captions
- [ ] Pull quotes / sidebars
- [ ] Final typographic pass

### Phase 4 — Integration
Status: blocked on Phase 3

- [ ] "Download PDF" affordance on lorin.work/groundswell
- [ ] Verify download UX on mobile + desktop
- [ ] Update site OG / metadata if needed

## Open Decisions (need Lorin)

| # | Decision | Options | My recommendation |
|---|----------|---------|-------------------|
| D1 | Editorial cut | Full (~20-30pp) / Executive (~6-10pp) / Both | Start with full. Easier to cut down later than expand up. |
| D2 | Page format | US Letter / A4 / Custom (square, landscape) | US Letter, portrait. Most universal for US hiring managers. |
| D3 | Visual treatment | Match website aesthetic / Print-native (more InDesign-feeling) | Print-native. Web layout doesn't survive translation; lean into the medium. |
| D4 | Tooling | Plain CSS @page + Playwright / Paged.js + Playwright | Plain CSS first. Add Paged.js only if we hit a wall on TOC or running headers. |
| D5 | Content source | Re-render existing components / Re-use `docs/groundswell.md` / Fresh extract | Re-use markdown as starting point. Edit a separate copy in `docs/groundswell-pdf/content.md` so the website source stays untouched. |
| D6 | Where the print HTML lives | New Next.js route (e.g., `/groundswell/print`) / Standalone HTML file outside Next.js | Standalone HTML in `scripts/pdf/`. Zero risk to the live site, no chrome to strip, easier to delete if abandoned. |

## Decisions Made

(none yet)

## Tooling Plan (provisional, pending D4/D6)

- **Author:** standalone HTML + CSS in `scripts/pdf/groundswell/`
- **Render:** Playwright as devDependency, one script `scripts/pdf/render.mjs`
- **Output:** `public/groundswell-case-study.pdf`
- **Run:** `npm run pdf:groundswell`

## Out of Scope (for now)

- Other case studies (Bridging the GAP, etc.) — defer until pattern is proven on Groundswell
- Press-ready print specs (CMYK, bleeds, crop marks)
- Interactive PDF features (form fields, embedded video)
- Auto-rebuild in CI — manual local render is fine
