# AI Leverage Field Guide — Static Site

This directory contains the responsive HTML guides for the AI Leverage Field Guide.

## Pages

- `index.html` — Landing page with overview, tracks, and library
- `leverage-loop.html` — The core engine: Capture → Structure → Judgment → Re-run → Repeat
- `curriculum.html` — 10-week curriculum with 4 modules and 4 tracks
- `stop-conditions.html` — Observable, falsifiable, targets real risk

## Deployment (GitHub Pages)

This site is deployed via GitHub Pages from the `docs/site` directory.

### One-time Owner Action Required

After the first deployment workflow runs, the repository owner must enable GitHub Pages:

1. Go to **Repository Settings** → **Pages** → **Build and deployment**
2. Set **Source** to **GitHub Actions**
3. The workflow `.github/workflows/pages.yml` will handle deployment on pushes to `main` affecting `docs/site/**`

## Local Preview

```bash
cd docs/site
python3 -m http.server 4173
# Open http://127.0.0.1:4173
```

## Design Principles

- No framework, no build step, no remote dependencies
- Works without JavaScript (progressive enhancement only)
- System font stack, CSS custom properties
- Responsive: tested at 320px, 375px, 768px, 1024px, 1440px
- Accessible: semantic HTML, ARIA labels, focus-visible, reduced-motion
- Print styles included
- Dark color scheme (matches GitHub dark mode)

## License

CC-BY-4.0 — see root LICENSE file.
