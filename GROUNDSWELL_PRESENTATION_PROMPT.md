# Groundswell Interview Presentation — Build Prompt

## Concept
Create a dedicated route at `/projects/groundswell/presentation` that transforms the Groundswell case study into a scroll-based interview presentation. This page is designed to be narrated live during design interviews, functioning as a visual companion to the presenter's voice — not a standalone document.

## Why This Exists
Portfolio pages and interview presentations solve different problems:
- **Portfolio page** → hiring manager is alone, scanning, deciding "do I want to talk to this person?" Needs to stand on its own, be skimmable, make a fast impression.
- **Interview presentation** → presenter is in the room narrating. Screen is a companion to their voice. Needs less text, bigger visuals, deliberate pacing, and space for the presenter to talk.

## Content Philosophy
- Portfolio says "here's what we did." Presentation says "here's the problem I was staring at, here's what I noticed that others missed, here's the decision I made and why, here's what happened."
- One idea per "slide" — breathing room, not density.
- Portfolio shows breadth. Presentation shows depth of judgment.
- Portfolio is neutral/professional. Presentation is personal — "I believed...", "I pushed back on...", "I was wrong about..."
- Follow a storytelling arc that builds tension and reveals thinking, not just documents what happened.

## Narrative Arc (Draft)
1. **The Hook** — What is oncology work really like? Set the emotional stakes.
2. **The Brief** — What was I asked to do? What did the team look like?
3. **The Reframe** — What I noticed that shifted the entire approach. Why I pushed for participatory research over traditional methods.
4. **Getting Access** — The politics and trust-building required to enter a hospital unit. What I learned about navigating institutional gatekeepers.
5. **The Research** — Deep dive into methodology choices. Why each workshop was designed the way it was. What I was testing with each one.
6. **The Turning Point** — The insight that changed everything (The Void, the Ceased to Breathe discovery, staff-created protocols).
7. **The Design Response** — How research translated into the ecosystem. Why we amplified existing innovations instead of imposing new ones.
8. **The Impact** — Metrics, qualitative outcomes, what happened after.
9. **What I'd Do Differently** — Honest reflection. Shows growth and self-awareness.
10. **What This Taught Me** — Transferable principles about design, research, and working within complex systems.

## Technical Approach
- New Next.js route: `/projects/groundswell/presentation`
- Shares image assets, design tokens, fonts, and color system with main portfolio
- Full-viewport sections that scroll like slides
- Minimal text per section — large type, single statements, big images
- Optional: keyboard navigation (arrow keys to advance), progress indicator
- Optional: presenter notes toggle (small text that only the presenter sees)
- Responsive but optimized for laptop screen-share (most interviews are via Zoom/Meet)

## Design Constraints
- Same visual language as portfolio (fonts, colors, spacing) but more cinematic
- Dark sections for emotional moments, light for analytical ones
- No carousel or complex interactions — simplicity serves narration
- Large images, full-bleed where appropriate
- Typography-forward: big quotes, single-line statements, minimal body text

## Content to Develop
- Rewrite all section copy in first person, narrative voice
- Identify 8-12 key images that carry the most storytelling weight
- Write 2-3 "decision moment" sections that reveal design judgment
- Prepare honest "what I learned" and "what I'd change" content
- Consider which participant quotes are most powerful in a live narration context

## Reference
- Existing portfolio page: `/projects/groundswell`
- Source content: `GroundswellContentV3.js`
- Research papers: `DRS_Paper__Relationship_Clusters_Groundswell.pdf`, `DRS_Paper__Resonance_Groundswell_1.pdf`
- Original PRD: `Portfolio_ReDesign_PRD_Instructions_and_Content_Copy.pdf`
