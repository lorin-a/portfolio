# Lorin Anderberg — Design Research Portfolio

Portfolio for a social impact design researcher, showcasing case studies in healthcare, education, and community wellbeing.

**Live:** [lorin.work](https://lorin.work)

## Tech Stack

- Next.js 14 (App Router)
- React 18
- CSS Modules
- GSAP + ScrollTrigger (animation)
- Cloudinary (media optimization)
- Markdown content (gray-matter + react-markdown)
- Deployed on Vercel

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

For production preview:
```bash
npm run build && npm run start
```

## Project Structure

```
app/
├── (portfolio)/              # Pages with Nav + Footer
│   ├── page.js               # Homepage
│   ├── about/                # About page
│   ├── projects/
│   │   ├── [slug]/           # Dynamic case study pages
│   │   └── groundswell/     # Custom Groundswell case study
│   ├── design-system/        # Internal design reference
│   └── layout.js             # Shared Nav + Footer layout
├── (standalone)/             # Immersive pages — no site chrome
│   ├── groundswell/          # Stakeholder documentation site
│   └── layout.js
└── globals.css               # Design tokens and base styles

components/
├── index.js                  # Barrel exports
├── Nav/                      # Site navigation
├── Footer/                   # Site footer
├── Hero/                     # Homepage hero
├── AnimatedElement/          # Scroll-triggered fade-in wrapper
├── Squiggle/                 # Decorative wave divider
├── Groundswell/              # Components for standalone Groundswell site
├── _archive/                 # Inactive components (pending review)
└── [Component]/              # Each component in its own folder

lib/
├── cloudinary.js             # Cloudinary helpers + public ID mappings
├── projectThemes.js          # Per-project card color themes
├── projects.js               # Project data utilities
└── fonts.js                  # Font configuration

content/
└── projects/                 # Project markdown files

docs/
└── archive/                  # Superseded documentation
```

## Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Auto-read instructions for Claude Code sessions |
| `DESIGN_SPEC.md` | Design tokens, decisions, accessibility, motion system |
| `ENGINEERING_STANDARDS.md` | Code craft, architecture, CSS/JS conventions |
| `PORTFOLIO_STRATEGY_SUMMARY_v2.md` | Creative direction and content strategy |
| `WORKING_WITH_LORIN.md` | Collaboration guide |

## Environment Variables

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dc17mvdyv
```

## Deployment

Push to `main` triggers automatic deployment on Vercel.

## License

All rights reserved.
