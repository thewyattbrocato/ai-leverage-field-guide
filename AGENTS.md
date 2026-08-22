# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Local tests (no network, no accounts)

Run from the repo root. Dependencies live in `tools/visual-tests` (`npm install`, then `npx playwright install chromium` once).

```bash
node --check docs/site/script.js                       # syntax
node tools/visual-tests/check-local-links.mjs          # internal links (must run from repo root)
python3 -m http.server 4173 --directory docs/site &    # static server
TEST_BASE_URL=http://127.0.0.1:4173 \
  node tools/visual-tests/visual-test.mjs              # overflow/Axe/console/screenshots
TEST_BASE_URL=http://127.0.0.1:4173 \
  node tools/visual-tests/interaction-test.mjs         # interactions incl. JS-disabled + clipboard
```

## Architecture / sharp edges

- All interactive features live in one plain-JS file `docs/site/script.js` (no deps, no build, no framework). Each initializer is guarded (exits if its root element is missing) and wrapped in try/catch so one failure never breaks the page.
- State is local-only: exactly two `localStorage` keys, namespaced and versioned — `ai-leverage-field-guide:path:v1` and `ai-leverage-field-guide:progress:v1`. The Stop Condition Builder intentionally writes no storage.
- No backend, no AI API, no accounts, no analytics, no tracking, no remote fonts or runtime JS. The only external links are static content links (e.g. book/tools references).
- Progressive enhancement: every page is fully readable with JavaScript disabled; interactions only add convenience.
- Stop Condition Builder validation derives a friendly field name via `getFieldLabel()` (explicit `data-label`, else `<label for>` text with required markers stripped) so each error names its field.
- Path-picker reset returns focus to the first path option (`focusStart`) so keyboard users are not stranded on a hidden button.
- The removed "Your First Win" section must stay absent from README and the site.
