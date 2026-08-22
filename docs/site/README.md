# AI Leverage Field Guide — Static Site

This directory contains the responsive HTML guides for the AI Leverage Field Guide, plus progressive-enhancement interactions in a single plain-JavaScript file (`script.js`).

## Pages

- `index.html` — Landing page with overview, role-based path picker, tracks, and library
- `leverage-loop.html` — The core engine: Capture → Structure → Judgment → Re-run → Repeat (copy-ready correction prompt)
- `curriculum.html` — 10-week curriculum with 4 modules, 4 tracks, retrospective template, and local progress tracking
- `stop-conditions.html` — Observable, falsifiable, targets real risk — with an interactive Stop Condition Builder
- `script.js` — All interactions: path picker, builder, copy buttons, progress tracking
- `styles.css` — Shared stylesheet (dark GitHub-style theme, print + reduced-motion support)

## Interactive features

| Feature | Page | Storage key |
|---------|------|-------------|
| Choose Your Path picker | Home | `ai-leverage-field-guide:path:v1` |
| Stop Condition Builder | Stop Conditions | none (output is not persisted) |
| Copy-to-clipboard buttons | Loop / Stop Conditions / Curriculum | none |
| Curriculum progress tracker | Curriculum | `ai-leverage-field-guide:progress:v1` |

All features are progressive enhancement: every page is fully readable with JavaScript disabled. Interactions add convenience, never core content.

## Local preview

```bash
cd docs/site
python3 -m http.server 4173
# Open http://127.0.0.1:4173
```

## Browser storage (local only)

The site stores two keys in your browser's `localStorage`:

- `ai-leverage-field-guide:path:v1` — `{ "schemaVersion": 1, "selectedPath": "manager", "savedAt": "…" }`
- `ai-leverage-field-guide:progress:v1` — `{ "schemaVersion": 1, "milestones": { "leverage-map": true, … } }`

**Privacy:** Selections and progress remain in the current browser and are not transmitted. There is no backend, no account, no analytics, no tracking, and no network requests from any interaction.

**Reset:** Use the *Reset progress* button on the curriculum page (asks for confirmation), or clear site data in your browser devtools.

**Export format** (`ai-leverage-field-guide-progress-YYYY-MM-DD.json`):

```json
{
  "schemaVersion": 1,
  "app": "ai-leverage-field-guide",
  "exportedAt": "2026-01-01T00:00:00.000Z",
  "milestones": [
    { "id": "leverage-map", "label": "Leverage map completed", "complete": true }
  ]
}
```

**Import:** Choose a JSON file with `schemaVersion: 1` and known milestone ids. Malformed files, unknown versions, or unrecognized milestones are rejected with a readable error and no state change.

## Tests

From the repository root:

```bash
node --check docs/site/script.js                       # syntax
node tools/visual-tests/check-local-links.mjs          # internal links
python3 -m http.server 4173 --directory docs/site &    # static server
TEST_BASE_URL=http://127.0.0.1:4173 \
  node tools/visual-tests/visual-test.mjs              # overflow/axe/console/screenshots
TEST_BASE_URL=http://127.0.0.1:4173 \
  node tools/visual-tests/interaction-test.mjs         # interactions incl. JS-disabled
```

Dependencies live in `tools/visual-tests` (`npm install`, then `npx playwright install chromium`).

## Deployment (GitHub Pages)

Deployed via GitHub Actions from this directory on pushes to `main` affecting `docs/site/**` (`.github/workflows/pages.yml`). The owner must set **Settings → Pages → Source: GitHub Actions** once.

### No-backend architecture

Everything runs client-side: static HTML/CSS/JS only. No build step, no framework, no remote fonts or scripts. The only external requests are optional user-activated links to GitHub and third-party resources listed as content.
