# Lorin Anderberg Portfolio

Design portfolio for a social impact designer, showcasing case studies in healthcare, education, and community wellbeing.

## Tech Stack

- Next.js 14 (App Router)
- React 18
- CSS Modules
- Markdown content (gray-matter + react-markdown)

## Local Development

```bash
npm install
npm run build
npm run start
```

Visit `http://localhost:3000`

**Note:** Use `npm run build && npm run start` for previewing. The dev server has CSS Module hot-reload issues in this Next.js version.

## Project Structure

```
app/
├── layout.js              # Root layout with Nav/Footer
├── page.js                # Homepage
├── globals.css            # Design tokens and base styles
├── about/                 # About page
└── projects/
    ├── [slug]/            # Dynamic project pages (from markdown)
    └── groundswell/       # Custom Groundswell case study

components/
├── index.js               # Barrel file for imports
├── Nav/                   # Site navigation
├── Footer/                # Site footer
├── Hero/                  # Homepage hero with interactive dial
├── InteractiveDial/       # Animated photo dial component
└── [Component]/           # Each component in its own folder

content/
└── projects/              # Project markdown files

docs/                      # Development documentation

public/
├── images/                # Project and site images
├── audio/                 # Audio files
└── video/                 # Video files
```

## Deployment

Deployed on Vercel. Push to `main` triggers automatic deployment.

## License

All rights reserved.
