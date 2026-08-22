import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const SHOT_DIR = path.resolve("artifacts/screenshots");
fs.mkdirSync(SHOT_DIR, { recursive: true });

const ALLOWED_STORAGE_KEYS = [
  "ai-leverage-field-guide:path:v1",
  "ai-leverage-field-guide:progress:v1",
];

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`FAIL: ${message}`);
}

function ok(message) {
  console.log(`PASS: ${message}`);
}

function assert(condition, message) {
  if (condition) {
    ok(message);
  } else {
    fail(message);
  }
}

async function storageKeys(context) {
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "load" });
  const keys = await page.evaluate(() => Object.keys(window.localStorage));
  await page.close();
  return keys;
}

/* ==================================================================== *
 * A. Path selection
 * ==================================================================== */

async function testPathSelection(browser) {
  console.log("\n=== A. Path selection ===");
  const context = await browser.newContext();
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  // 1-2. Select Manager, verify accessible selected state
  const managerButton = page.locator('[data-path-option="manager"]');
  await managerButton.click();
  assert(
    (await managerButton.getAttribute("aria-checked")) === "true",
    "Manager option exposes aria-checked=true when selected"
  );

  // 3. Recommendation content appears with guide link, outcome, next step
  const recommendation = page.locator("[data-path-recommendation]");
  assert(await recommendation.isVisible(), "Recommendation panel becomes visible");
  const linkHref = await page.locator("[data-rec-guide-link]").getAttribute("href");
  assert(linkHref === "leverage-loop.html", "Recommendation links to Leverage Loop");
  const outcomeText = await page.locator("[data-rec-outcome]").textContent();
  assert(outcomeText.includes("decision loop"), "Outcome text mentions decision loop");
  const nextStepText = await page.locator("[data-rec-next-step]").textContent();
  assert(nextStepText.length > 10, "Next step text present");

  // M1: selecting a path writes only the path key; progress storage stays
  // untouched until the user actually checks a curriculum milestone.
  const keysAfterSelect = await page.evaluate(() => Object.keys(window.localStorage));
  assert(
    keysAfterSelect.includes("ai-leverage-field-guide:path:v1"),
    "Path selection saves the path key"
  );
  assert(
    !keysAfterSelect.includes("ai-leverage-field-guide:progress:v1"),
    "Path selection does not write progress storage"
  );

  await page.screenshot({ path: path.join(SHOT_DIR, "interaction-path-selected.png"), fullPage: false });
  console.log("screenshot: artifacts/screenshots/interaction-path-selected.png");

  // 4. Reload → restore
  await page.reload({ waitUntil: "networkidle" });
  const restoredChecked = await page.locator('[data-path-option="manager"]').getAttribute("aria-checked");
  assert(restoredChecked === "true", "Manager selection restored after reload");
  assert(
    await page.locator("[data-path-recommendation]").isVisible(),
    "Recommendation restored after reload"
  );

  // M1: curriculum derives "Role track selected" from the path key at
  // display time without creating progress storage.
  await page.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });
  assert(
    await page.locator("#milestone-role-track-selected").isChecked(),
    "Curriculum shows role-track milestone derived from path selection"
  );
  const summaryWithPath = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(
    summaryWithPath === "1 of 8 complete (13%)",
    `Derived role-track milestone counts once (got: "${summaryWithPath}")`
  );
  const keysOnCurriculum = await page.evaluate(() => Object.keys(window.localStorage));
  assert(
    !keysOnCurriculum.includes("ai-leverage-field-guide:progress:v1"),
    "Derived display does not create progress storage"
  );

  // F2: a manual uncheck of the derived role-track box must snap back to
  // checked, keep the summary at 1 of 8, and never persist a role-track id.
  await page.locator("#milestone-role-track-selected").click();
  assert(
    await page.locator("#milestone-role-track-selected").isChecked(),
    "Manual uncheck of derived role-track snaps back to checked"
  );
  const summaryAfterUncheck = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(
    summaryAfterUncheck === "1 of 8 complete (13%)",
    `Summary stays 1 of 8 after uncheck attempt (got: "${summaryAfterUncheck}")`
  );
  const storageAfterUncheck = await page.evaluate(
    () => window.localStorage.getItem("ai-leverage-field-guide:progress:v1")
  );
  assert(
    storageAfterUncheck === null ||
      !JSON.parse(storageAfterUncheck).milestones["role-track-selected"],
    "No role-track entry persisted after uncheck attempt"
  );
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  // 5-6. Reset clears storage and visible state
  await page.locator("[data-path-reset]").click();
  assert(
    (await page.locator('[data-path-option="manager"]').getAttribute("aria-checked")) === "false",
    "Reset clears aria-checked"
  );
  assert(
    !(await page.locator("[data-path-recommendation]").isVisible()),
    "Reset hides recommendation panel"
  );
  const keysAfterReset = await page.evaluate(() => Object.keys(window.localStorage));
  assert(
    !keysAfterReset.includes("ai-leverage-field-guide:path:v1"),
    "Reset removes path key from localStorage"
  );

  // 5b. Focus returns into the picker (first path option), not a hidden element
  const focusedAfterReset = await page.evaluate(
    () => document.activeElement && document.activeElement.getAttribute("data-path-option")
  );
  assert(focusedAfterReset === "manager", "Reset returns keyboard focus to first path option");

  // M1: after clearing the path, the derived curriculum milestone clears too.
  await page.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });
  assert(
    !(await page.locator("#milestone-role-track-selected").isChecked()),
    "Clearing the path clears the derived role-track display"
  );
  const summaryAfterClear = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(
    summaryAfterClear === "0 of 8 complete (0%)",
    `Summary back to zero after path cleared (got: "${summaryAfterClear}")`
  );
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });

  // 7. Keyboard-only selection: the group exposes a single tab stop; arrow
  // keys move focus and selection together (radiogroup pattern).
  const writerButton = page.locator('[data-path-option="writer"]');
  await page.locator('[data-path-option="manager"]').focus();
  await page.keyboard.press("ArrowRight");
  assert(
    (await writerButton.getAttribute("aria-checked")) === "true",
    "Keyboard ArrowRight selects Writer path (selection follows focus)"
  );
  // m7: re-activating a selected radio must never deselect it — clearing is
  // owned by the explicit Clear control.
  await writerButton.click();
  assert(
    (await writerButton.getAttribute("aria-checked")) === "true",
    "Clicking the selected path again keeps it selected"
  );
  await page.keyboard.press("Enter");
  assert(
    (await writerButton.getAttribute("aria-checked")) === "true",
    "Enter on the selected path does not deselect it"
  );
  await page.locator("[data-path-reset]").click();
  assert(
    (await writerButton.getAttribute("aria-checked")) === "false",
    "The Clear control deselects explicitly"
  );

  // Switching paths updates recommendation (operator → stop conditions)
  await page.locator('[data-path-option="operator"]').click();
  const operatorHref = await page.locator("[data-rec-guide-link]").getAttribute("href");
  assert(operatorHref === "stop-conditions.html", "Operator path recommends Stop Conditions");

  await context.close();
}

/* ==================================================================== *
 * B. Stop condition builder
 * ==================================================================== */

function trackNetwork(page) {
  const requests = [];
  page.on("request", (request) => {
    requests.push({ method: request.method(), url: request.url() });
  });
  return {
    requests,
    unexpected() {
      return requests.filter((r) => {
        if (r.url.startsWith(BASE_URL)) return r.method !== "GET";
        if (r.url.startsWith("data:") || r.url.startsWith("blob:")) return false;
        return true;
      });
    },
  };
}

async function fillBuilder(page, { malicious = false } = {}) {
  const evil = '<img src=x onerror="window.__pwned=1">';
  await page.selectOption("#sc-work-type", "Status update");
  await page.fill("#sc-outcome", malicious ? evil : "A status update my manager can forward unedited");
  await page.fill("#sc-evidence", malicious ? evil : "Every number traces to a ticket\nThe ask is explicit in line one");
  await page.fill("#sc-failure-condition", malicious ? evil : "Any number cannot be traced to its source ticket");
  await page.fill("#sc-real-risk", malicious ? evil : "An untraced number triggers a compliance review");
}

async function testStopConditionBuilder(browser) {
  console.log("\n=== B. Stop Condition Builder ===");
  const context = await browser.newContext({
    acceptDownloads: true,
    viewport: { width: 1280, height: 900 },
  });
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await context.newPage();
  const net = trackNetwork(page);

  await page.goto(`${BASE_URL}/stop-conditions.html`, { waitUntil: "networkidle" });

  // 1-3. Empty submit → validation, focus on first invalid field
  await page.click('#stop-condition-form button[type="submit"]');
  const workTypeError = page.locator("#sc-work-type-error");
  assert(await workTypeError.isVisible(), "Validation message shown for empty work type");
  const errorText = (await workTypeError.textContent()).trim();
  assert(errorText.length > 5 && errorText.toLowerCase().includes("required"), "Validation message is helpful text, not color-only");
  assert(errorText === "Work type is required.", `Validation message names the field (got: "${errorText}")`);

  // 1b. Every empty field names itself in its validation message.
  const FIELD_LABELS = {
    "#sc-work-type-error": "Work type",
    "#sc-outcome-error": "Intended outcome",
    "#sc-evidence-error": "Evidence required",
    "#sc-failure-condition-error": "Clear failure condition",
    "#sc-real-risk-error": "Real risk",
  };
  for (const [errorSel, expected] of Object.entries(FIELD_LABELS)) {
    const msg = (await page.locator(errorSel).textContent()).trim();
    assert(
      msg === expected + " is required.",
      `Empty submit names "${expected}" (got: "${msg}")`
    );
  }
  const focusedId = await page.evaluate(() => document.activeElement && document.activeElement.id);
  assert(focusedId === "sc-work-type", `Focus moved to first invalid field (got: ${focusedId})`);
  const describedBy = await page.locator("#sc-work-type").getAttribute("aria-describedby");
  assert(describedBy && describedBy.split(/\s+/).includes("sc-work-type-error"), "Error connected via aria-describedby");
  assert(
    (await page.locator("#sc-work-type").getAttribute("aria-invalid")) === "true",
    "aria-invalid set on invalid field"
  );

  // 11. Malicious-looking input stays text, never executes HTML injection
  await fillBuilder(page, { malicious: true });
  await page.click('#stop-condition-form button[type="submit"]');
  const evilOutput = await page.inputValue("#sc-output");
  assert(evilOutput.includes("<img src=x"), "Malicious markup rendered as literal text");
  const pwned = await page.evaluate(() => window.__pwned === undefined);
  assert(pwned, "No script execution from injected markup");

  // 4-7. Real values → output contains them + observable/falsifiable/risk language
  await fillBuilder(page, { malicious: false });
  await page.click('#stop-condition-form button[type="submit"]');
  const output = await page.inputValue("#sc-output");
  assert(output.includes("# Stop condition — Status update"), "Output includes work type heading");
  assert(output.includes("A status update my manager can forward unedited"), "Output includes intended outcome");
  assert(output.includes("Every number traces to a ticket"), "Output includes evidence line");
  assert(output.includes("Any number cannot be traced to its source ticket"), "Output includes failure condition");
  assert(output.includes("An untraced number triggers a compliance review"), "Output includes real risk");
  assert(/observable/i.test(output), "Output addresses observable criterion");
  assert(/falsifiable/i.test(output), "Output addresses falsifiable criterion");
  assert(/real risk/i.test(output), "Output addresses real risk criterion");

  // m10: generation moves keyboard focus onto the generated output so
  // keyboard/screen-reader users land on the result, not the Generate button.
  const focusedAfterGenerate = await page.evaluate(
    () => document.activeElement && document.activeElement.id
  );
  assert(
    focusedAfterGenerate === "sc-output",
    `Generation focuses the output textarea (got: ${focusedAfterGenerate})`
  );

  // m8: a leading Markdown metacharacter in free text is escaped so the
  // generated document cannot be reinterpreted as structure (a "#" must not
  // become a heading, a ">" must not become a blockquote).
  await page.fill("#sc-outcome", "#1 priority is clarity over length");
  await page.click('#stop-condition-form button[type="submit"]');
  const escapedOutput = await page.inputValue("#sc-output");
  assert(
    escapedOutput.includes("\\#1 priority is clarity over length"),
    "Leading '#' in outcome is escaped so it is not a Markdown heading"
  );
  assert(
    !/^#1 priority is clarity over length$/m.test(escapedOutput),
    "Escaped outcome is not emitted as a raw Markdown heading"
  );
  await page.fill("#sc-outcome", "A status update my manager can forward unedited");
  await page.click('#stop-condition-form button[type="submit"]');

  // m1: generation announces through exactly one live region (#sc-status),
  // so the shared transient region must stay silent.
  const sharedLiveText = await page.evaluate(() => {
    const region = document.getElementById("alfg-live-status");
    return region ? region.textContent : "";
  });
  assert(
    sharedLiveText.trim() === "",
    "Generate does not double-announce via the shared live region"
  );

  await page.screenshot({ path: path.join(SHOT_DIR, "interaction-builder-populated.png"), fullPage: true });
  console.log("screenshot: artifacts/screenshots/interaction-builder-populated.png");

  // 8. Copy Markdown
  await page.click("#sc-copy");
  await page.waitForTimeout(200);
  const clip = await page.evaluate(() => navigator.clipboard.readText());
  assert(clip.startsWith("# Stop condition — Status update"), "Copy Markdown puts generated markdown on clipboard");

  // 9. Download Markdown
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("#sc-download"),
  ]);
  const fileName = download.suggestedFilename();
  assert(/^stop-condition-status-update-\d{4}-\d{2}-\d{2}\.md$/.test(fileName), `Download filename safe/predictable: ${fileName}`);
  const dlPath = await download.path();
  const dlContent = fs.readFileSync(dlPath, "utf8");
  assert(dlContent.includes("Real risk"), "Downloaded file contains generated markdown");

  // 12. Output does not persist across reload (not designed to persist)
  await page.reload({ waitUntil: "networkidle" });
  assert(!(await page.locator("#sc-output-region").isVisible()), "Generated output intentionally cleared on reload");
  const storedKeys = await page.evaluate(() => Object.keys(window.localStorage));
  assert(!storedKeys.some((k) => k.includes("builder")), "Builder writes no localStorage keys");

  // Re-fill quickly for Clear test
  await fillBuilder(page);
  await page.click('#stop-condition-form button[type="submit"]');
  assert(
    await page
      .locator('#stop-condition-form button[type="submit"]')
      .evaluate((el) => el.classList.contains("is-generated")),
    "Generate styles the submit button as generated"
  );

  // 10. Clear resets fields and output
  await page.click('[data-action="clear-builder"]');
  assert((await page.inputValue("#sc-outcome")) === "", "Clear empties fields");
  assert(!(await page.locator("#sc-output-region").isVisible()), "Clear hides output region");
  // m5: Clear also removes the submit button's generated styling
  assert(
    await page
      .locator('#stop-condition-form button[type="submit"]')
      .evaluate((el) => !el.classList.contains("is-generated")),
    "Clear removes the submit button's generated styling"
  );

  // m9: Clear announces through exactly one live region (#sc-status), so the
  // shared transient region must stay silent and the builder's own channel
  // must carry the message.
  const scStatusText = await page.locator("#sc-status").textContent();
  assert(
    scStatusText.trim() === "Builder cleared.",
    `Clear announces via #sc-status single channel (got: "${scStatusText.trim()}")`
  );
  const sharedLiveAfterClear = await page.evaluate(() => {
    const region = document.getElementById("alfg-live-status");
    return region ? region.textContent : "";
  });
  assert(
    sharedLiveAfterClear.trim() === "",
    "Clear does not double-announce via the shared live region"
  );

  // 13. No unexpected network requests from the builder
  const unexpected = net.unexpected();
  assert(unexpected.length === 0, `No non-static network requests (found ${unexpected.length})`);

  await context.close();
}

/* ==================================================================== *
 * C. Progress tracking
 * ==================================================================== */

async function testProgressTracking(browser) {
  console.log("\n=== C. Progress tracking ===");
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });

  // 1-2. Toggle two milestones, verify count + percentage
  await page.locator('label[for="milestone-leverage-map"]').click();
  await page.locator('label[for="milestone-first-recurring-prompt"]').click();
  let summary = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(summary === "2 of 8 complete (25%)", `Summary shows 2 of 8 (25%): got "${summary}"`);
  const progressValue = await page.locator("[data-progress-bar]").getAttribute("value");
  assert(progressValue === "2", "Native progress element reflects value 2");

  await page.screenshot({ path: path.join(SHOT_DIR, "interaction-progress-partial.png"), fullPage: false });
  console.log("screenshot: artifacts/screenshots/interaction-progress-partial.png");

  // 3. Reload → restore
  await page.reload({ waitUntil: "networkidle" });
  assert(
    await page.locator("#milestone-leverage-map").isChecked(),
    "Leverage map checkbox restored after reload"
  );
  summary = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(summary === "2 of 8 complete (25%)", "Summary restored after reload");

  // 4. Export JSON
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("#progress-export"),
  ]);
  assert(
    /^ai-leverage-field-guide-progress-\d{4}-\d{2}-\d{2}\.json$/.test(download.suggestedFilename()),
    "Export filename predictable"
  );
  const exported = JSON.parse(fs.readFileSync(await download.path(), "utf8"));
  assert(exported.schemaVersion === 1, "Export includes schemaVersion 1");
  const leverageMapEntry = exported.milestones.find((m) => m.id === "leverage-map");
  assert(leverageMapEntry && leverageMapEntry.complete === true, "Export marks leverage-map complete");

  // 10 (part 1). Reset requires confirmation — dismissing leaves state intact
  let dialogHandled = { shown: false, accepted: false };
  page.once("dialog", async (dialog) => {
    dialogHandled.shown = true;
    await dialog.dismiss();
  });
  await page.click("#progress-reset");
  assert(dialogHandled.shown, "Reset shows confirmation dialog");
  assert(await page.locator("#milestone-leverage-map").isChecked(), "Dismissing reset keeps progress");

  // 5. Reset with confirmation
  page.once("dialog", async (dialog) => {
    dialogHandled.accepted = true;
    await dialog.accept();
  });
  await page.click("#progress-reset");
  assert(dialogHandled.accepted, "Reset confirmation accepted");
  summary = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(summary === "0 of 8 complete (0%)", "Reset zeroes the summary");
  const keysAfterReset = await page.evaluate(() => Object.keys(window.localStorage));
  assert(!keysAfterReset.includes("ai-leverage-field-guide:progress:v1"), "Reset removes progress key");

  // 6-7. Import valid JSON restores state
  const importPayload = JSON.stringify(
    {
      schemaVersion: 1,
      app: "ai-leverage-field-guide",
      milestones: [
        { id: "leverage-map", label: "Leverage map completed", complete: true },
        { id: "maker-checker-review", label: "Maker-Checker review completed", complete: true },
        { id: "loop-three-runs", label: "Leverage Loop run three times", complete: false },
      ],
    },
    null,
    2
  );
  const tmpValid = "/tmp/alfg-valid-import.json";
  fs.writeFileSync(tmpValid, importPayload);
  await page.setInputFiles("#progress-import", tmpValid);
  await page.waitForTimeout(300);
  assert(await page.locator("#milestone-leverage-map").isChecked(), "Import checks leverage-map");
  assert(await page.locator("#milestone-maker-checker-review").isChecked(), "Import checks maker-checker-review");
  assert(!(await page.locator("#milestone-loop-three-runs").isChecked()), "Import respects incomplete milestone");
  summary = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(summary === "2 of 8 complete (25%)", "Summary reflects imported state");

  // 7b. Compact format ({ id: true }) imports cleanly too
  const tmpCompact = "/tmp/alfg-compact-import.json";
  fs.writeFileSync(
    tmpCompact,
    JSON.stringify({
      schemaVersion: 1,
      milestones: { "leverage-map": true, "loop-three-runs": true },
    })
  );
  await page.setInputFiles("#progress-import", tmpCompact);
  await page.waitForTimeout(300);
  assert(await page.locator("#milestone-leverage-map").isChecked(), "Compact import checks leverage-map");
  assert(await page.locator("#milestone-loop-three-runs").isChecked(), "Compact import checks loop-three-runs");
  assert(
    !(await page.locator("#milestone-maker-checker-review").isChecked()),
    "Compact import replaces prior state"
  );
  summary = (await page.locator("[data-progress-summary]").textContent()).trim();
  assert(summary === "2 of 8 complete (25%)", `Summary reflects compact import (got: "${summary}")`);

  // 7c. Unknown ids inside a compact file are still rejected
  const tmpCompactUnknown = "/tmp/alfg-compact-unknown.json";
  fs.writeFileSync(
    tmpCompactUnknown,
    JSON.stringify({ schemaVersion: 1, milestones: { "made-up-milestone": true } })
  );
  await page.setInputFiles("#progress-import", tmpCompactUnknown);
  await page.waitForTimeout(300);
  const compactUnknownMessage = (await page.locator("#progress-message").textContent()).trim();
  assert(
    compactUnknownMessage.includes("unrecognized milestone"),
    `Compact unknown milestone rejected: "${compactUnknownMessage}"`
  );
  assert(
    await page.locator("#milestone-leverage-map").isChecked() &&
      await page.locator("#milestone-loop-three-runs").isChecked(),
    "State unchanged after failed compact import"
  );

  // 8. Malformed JSON rejected, state unchanged
  const tmpMalformed = "/tmp/alfg-malformed.json";
  fs.writeFileSync(tmpMalformed, "{ this is not json ");
  await page.setInputFiles("#progress-import", tmpMalformed);
  await page.waitForTimeout(300);
  const errorMessage = (await page.locator("#progress-message").textContent()).trim();
  assert(errorMessage.toLowerCase().includes("import failed"), `Readable error shown: "${errorMessage}"`);
  assert(await page.locator("#milestone-leverage-map").isChecked(), "State unchanged after malformed import");

  // 9. Unsupported schema version rejected
  const tmpV99 = "/tmp/alfg-v99.json";
  fs.writeFileSync(
    tmpV99,
    JSON.stringify({ schemaVersion: 99, milestones: [{ id: "leverage-map", complete: true }] })
  );
  await page.setInputFiles("#progress-import", tmpV99);
  await page.waitForTimeout(300);
  const v99Message = (await page.locator("#progress-message").textContent()).trim();
  assert(v99Message.includes("unsupported format version"), `Unsupported version rejected: "${v99Message}"`);
  assert(await page.locator("#milestone-leverage-map").isChecked(), "State unchanged after unsupported version import");

  // 9b. Non-numeric string versions are still rejected (strict elsewhere)
  const tmpBadVersion = "/tmp/alfg-bad-version.json";
  fs.writeFileSync(
    tmpBadVersion,
    JSON.stringify({ schemaVersion: "two", milestones: [{ id: "leverage-map", complete: true }] })
  );
  await page.setInputFiles("#progress-import", tmpBadVersion);
  await page.waitForTimeout(300);
  const badVersionMessage = (await page.locator("#progress-message").textContent()).trim();
  assert(
    badVersionMessage.includes("unsupported format version"),
    `Non-numeric string version rejected: "${badVersionMessage}"`
  );

  // 9c. Numeric-equivalent string version ("1") is accepted (C1)
  const tmpStrVersion = "/tmp/alfg-string-version.json";
  fs.writeFileSync(
    tmpStrVersion,
    JSON.stringify({
      schemaVersion: "1",
      milestones: [{ id: "loop-three-runs", label: "Leverage Loop run three times", complete: true }],
    })
  );
  await page.setInputFiles("#progress-import", tmpStrVersion);
  await page.waitForTimeout(300);
  assert(
    await page.locator("#milestone-loop-three-runs").isChecked(),
    "Import with schemaVersion \"1\" (string) applies milestones"
  );

  // 9d. A derived milestone inside an import never lands in progress
  // storage and is never displayed without a path selection (compact form)
  const tmpDerivedCompact = "/tmp/alfg-derived-compact.json";
  fs.writeFileSync(
    tmpDerivedCompact,
    JSON.stringify({
      schemaVersion: 1,
      milestones: { "leverage-map": true, "role-track-selected": true },
    })
  );
  await page.setInputFiles("#progress-import", tmpDerivedCompact);
  await page.waitForTimeout(300);
  assert(
    await page.locator("#milestone-leverage-map").isChecked(),
    "Compact import applies normal milestones alongside a derived id"
  );
  assert(
    !(await page.locator("#milestone-role-track-selected").isChecked()),
    "Derived role-track id not displayed from compact import without a path"
  );
  let derivedProgress = await page.evaluate(() =>
    JSON.parse(window.localStorage.getItem("ai-leverage-field-guide:progress:v1"))
  );
  assert(
    derivedProgress.milestones["leverage-map"] === true &&
      derivedProgress.milestones["role-track-selected"] === undefined,
    "Compact import persists no role-track entry"
  );

  // 9e. Same invariant for the array export format
  const tmpDerivedArray = "/tmp/alfg-derived-array.json";
  fs.writeFileSync(
    tmpDerivedArray,
    JSON.stringify({
      schemaVersion: 1,
      milestones: [
        { id: "loop-three-runs", label: "Leverage Loop run three times", complete: true },
        { id: "role-track-selected", label: "Role track selected", complete: true },
      ],
    })
  );
  await page.setInputFiles("#progress-import", tmpDerivedArray);
  await page.waitForTimeout(300);
  assert(
    await page.locator("#milestone-loop-three-runs").isChecked(),
    "Array import applies normal milestones alongside a derived id"
  );
  assert(
    !(await page.locator("#milestone-role-track-selected").isChecked()),
    "Derived role-track id not displayed from array import without a path"
  );
  derivedProgress = await page.evaluate(() =>
    JSON.parse(window.localStorage.getItem("ai-leverage-field-guide:progress:v1"))
  );
  assert(
    derivedProgress.milestones["loop-three-runs"] === true &&
      derivedProgress.milestones["role-track-selected"] === undefined,
    "Array import persists no role-track entry"
  );

  // Unknown milestone id rejected too
  const tmpUnknown = "/tmp/alfg-unknown.json";
  fs.writeFileSync(
    tmpUnknown,
    JSON.stringify({ schemaVersion: 1, milestones: [{ id: "made-up-milestone", complete: true }] })
  );
  await page.setInputFiles("#progress-import", tmpUnknown);
  await page.waitForTimeout(300);
  const unknownMessage = (await page.locator("#progress-message").textContent()).trim();
  assert(unknownMessage.includes("unrecognized milestone"), `Unknown milestone rejected: "${unknownMessage}"`);

  await context.close();
}

/* ==================================================================== *
 * D. Copy fallback (no navigator.clipboard)
 * ==================================================================== */

async function testCopyFallback(browser) {
  console.log("\n=== D. Copy fallback ===");

  // Normal flow on the correction-prompt template
  const normalContext = await browser.newContext();
  await normalContext.grantPermissions(["clipboard-read", "clipboard-write"]);
  const normalPage = await normalContext.newPage();
  await normalPage.goto(`${BASE_URL}/leverage-loop.html`, { waitUntil: "networkidle" });
  await normalPage.click('[data-copy-target="#correction-prompt-template"]');
  const clip = await normalPage.evaluate(() => navigator.clipboard.readText());
  assert(clip.includes("Fix these things:"), "Correction prompt copied via clipboard API");
  const buttonLabel = await normalPage.locator('[data-copy-target="#correction-prompt-template"]').textContent();
  assert(buttonLabel.includes("Copied"), "Copy button confirms visually");
  await normalContext.close();

  // Fallback flow: remove navigator.clipboard entirely and record what
  // document.execCommand("copy") actually copies, so success is verified
  // by content rather than by feedback text alone.
  const fallbackContext = await browser.newContext();
  await fallbackContext.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", { get: () => undefined });
    const nativeExecCommand = Document.prototype.execCommand;
    window.__execCopiedText = null;
    Document.prototype.execCommand = function (command) {
      if (command === "copy") {
        const active = document.activeElement;
        if (active && (active.tagName === "TEXTAREA" || active.tagName === "INPUT")) {
          window.__execCopiedText = String(active.value).slice(
            active.selectionStart || 0,
            active.selectionEnd || active.value.length
          );
        }
      }
      return nativeExecCommand.apply(this, arguments);
    };
  });
  const fallbackPage = await fallbackContext.newPage();
  await fallbackPage.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });
  await fallbackPage.click('[data-copy-target="#retrospective-template"]');
  await fallbackPage.waitForTimeout(200);
  // With clipboard unavailable, execCommand fallback should succeed silently;
  // at minimum the page must not throw and feedback must be understandable.
  // The curriculum page routes copy announcements through its single live
  // region (#progress-message) — never a second #alfg-live-status region.
  const feedbackText = await fallbackPage.evaluate(() => {
    const region = document.getElementById("progress-message");
    return region ? region.textContent : "(missing)";
  });
  assert(
    feedbackText.includes("copied") && !feedbackText.includes("Copy failed"),
    `Fallback copy reports success: "${feedbackText}"`
  );
  const execCopied = await fallbackPage.evaluate(() => window.__execCopiedText);
  assert(
    typeof execCopied === "string" && execCopied.includes("Track Retrospective"),
    "execCommand fallback placed real template content on the clipboard"
  );
  assert(
    execCopied.includes("What changes in my workflow next week?"),
    "Fallback copy content is complete, not truncated"
  );
  await fallbackContext.close();
}

/* ==================================================================== *
 * E. JavaScript disabled
 * ==================================================================== */

async function testJavaScriptDisabled(browser) {
  console.log("\n=== E. JavaScript disabled ===");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  const expectations = [
    {
      route: "/index.html",
      contains: ["Choose Your Path", "Manager", "Writer", "Operator", "Knowledge Worker", "Generalist", "The Complete Journey"],
    },
    {
      route: "/leverage-loop.html",
      contains: ["The Five Steps", "Judgment", "Correction Prompt Template"],
    },
    {
      route: "/curriculum.html",
      contains: ["Module Overview", "Weekly Sequence", "Track Your Progress"],
    },
    {
      route: "/stop-conditions.html",
      contains: ["The Three Criteria", "Final Checklist", "Stop Condition Builder"],
    },
  ];

  for (const expectation of expectations) {
    await page.goto(`${BASE_URL}${expectation.route}`, { waitUntil: "load" });
    const body = await page.locator("body").innerText();
    for (const needle of expectation.contains) {
      assert(body.includes(needle), `${expectation.route}: contains "${needle}" without JS`);
    }
    const mainVisible = await page.locator("main").isVisible();
    assert(mainVisible, `${expectation.route}: main content region visible without JS`);
  }

  // Track cards remain available without JS
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "load" });
  const trackCards = await page.locator(".track-card").count();
  assert(trackCards >= 4, `Static track cards remain (${trackCards})`);

  // m3: without JS the picker buttons are visibly inert, not fake-active
  const managerDisabled = await page.locator('[data-path-option="manager"]').isDisabled();
  assert(managerDisabled, "Path options render disabled without JavaScript");

  await page.screenshot({ path: path.join(SHOT_DIR, "interaction-js-disabled-home.png"), fullPage: false });

  // Manual stop-condition instructions visible without JS
  await page.goto(`${BASE_URL}/stop-conditions.html`, { waitUntil: "load" });
  const noJsBody = await page.locator("body").innerText();
  assert(
    noJsBody.includes("builder needs JavaScript"),
    "Stop-condition noscript note explains manual alternative"
  );
  // m4: without JS the builder form can neither submit nor reload
  const submitDisabled = await page
    .locator('#stop-condition-form button[type="submit"]')
    .isDisabled();
  assert(submitDisabled, "Builder submit is disabled without JavaScript");
  const clearDisabled = await page
    .locator('#stop-condition-form [data-action="clear-builder"]')
    .isDisabled();
  assert(clearDisabled, "Builder clear is disabled without JavaScript");
  await page.screenshot({ path: path.join(SHOT_DIR, "interaction-js-disabled-stop-conditions.png"), fullPage: false });
  console.log("screenshots: artifacts/screenshots/interaction-js-disabled-*.png");

  // Navigation works without JS
  await page.click('nav a[href="curriculum.html"]');
  await page.waitForLoadState("load");
  assert(
    page.url().endsWith("/curriculum.html"),
    "Navigation to curriculum works without JS"
  );

  await context.close();
}

/* ==================================================================== *
 * E2. Single live region per page
 * Each page must expose exactly one live region. The builder owns
 * #sc-status, the curriculum owns #progress-message, and the remaining
 * pages fall back to a single shared #alfg-live-status element. A second
 * region would make screen readers speak the same message twice.
 * ==================================================================== */

async function countLiveRegions(page) {
  return page.evaluate(
    () => document.querySelectorAll('[role="status"], [aria-live]').length
  );
}

async function testSingleLiveRegion(browser) {
  console.log("\n=== E2. Single live region per page ===");
  const context = await browser.newContext();
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const page = await context.newPage();

  // index.html: selecting a path announces via #alfg-live-status (single region)
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
  await page.locator('[data-path-option="manager"]').click();
  await page.waitForTimeout(120);
  assert(
    (await countLiveRegions(page)) === 1,
    "index.html exposes exactly one live region after path select"
  );
  assert(
    await page.locator("#alfg-live-status").count() === 1 &&
      (await page.locator("#sc-status").count()) === 0 &&
      (await page.locator("#progress-message").count()) === 0,
    "index.html uses the shared #alfg-live-status region only"
  );
  await page.locator("[data-path-reset]").click();

  // leverage-loop.html: template copy announces via #alfg-live-status (single region)
  await page.goto(`${BASE_URL}/leverage-loop.html`, { waitUntil: "networkidle" });
  await page.click('[data-copy-target="#correction-prompt-template"]');
  await page.waitForTimeout(120);
  assert(
    (await countLiveRegions(page)) === 1,
    "leverage-loop.html exposes exactly one live region after copy"
  );

  // curriculum.html: copy must route through #progress-message, never spawn #alfg-live-status
  await page.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });
  await page.click('[data-copy-target="#retrospective-template"]');
  await page.waitForTimeout(120);
  assert(
    (await countLiveRegions(page)) === 1,
    "curriculum.html keeps exactly one live region after copy"
  );
  assert(
    (await page.locator("#alfg-live-status").count()) === 0,
    "curriculum.html does not spawn a second #alfg-live-status region"
  );
  const curriculumLive = (await page.locator("#progress-message").textContent()).trim();
  assert(
    curriculumLive.toLowerCase().includes("copied"),
    `curriculum.html announces copy via #progress-message (got: "${curriculumLive}")`
  );

  // stop-conditions.html: template copy must route through #sc-status, never spawn #alfg-live-status
  await page.goto(`${BASE_URL}/stop-conditions.html`, { waitUntil: "networkidle" });
  await page.click('[data-copy-target="#stop-condition-template"]');
  await page.waitForTimeout(120);
  assert(
    (await countLiveRegions(page)) === 1,
    "stop-conditions.html keeps exactly one live region after copy"
  );
  assert(
    (await page.locator("#alfg-live-status").count()) === 0,
    "stop-conditions.html does not spawn a second #alfg-live-status region"
  );
  const builderLive = (await page.locator("#sc-status").textContent()).trim();
  assert(
    builderLive.toLowerCase().includes("copied"),
    `stop-conditions.html announces copy via #sc-status (got: "${builderLive}")`
  );

  await context.close();
}

/* ==================================================================== *
 * F. Storage privacy
 * ==================================================================== */

async function testStoragePrivacy(browser) {
  console.log("\n=== F. Storage privacy ===");
  const context = await browser.newContext();

  // Exercise every feature in one session and watch the key set.
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/index.html`, { waitUntil: "networkidle" });
  await page.locator('[data-path-option="manager"]').click();

  // M1: path selection writes exactly the path key, nothing else.
  let keys = await page.evaluate(() => Object.keys(window.localStorage));
  assert(
    JSON.stringify(keys) === JSON.stringify(["ai-leverage-field-guide:path:v1"]),
    "Path selection writes exactly one key: path:v1"
  );

  // Visiting the curriculum derives the role-track display but stores nothing.
  await page.goto(`${BASE_URL}/curriculum.html`, { waitUntil: "networkidle" });
  assert(
    await page.locator("#milestone-role-track-selected").isChecked(),
    "Role-track milestone displayed via derivation"
  );
  keys = await page.evaluate(() => Object.keys(window.localStorage));
  assert(
    !keys.includes("ai-leverage-field-guide:progress:v1"),
    "Derived role-track display writes no progress key"
  );

  await page.locator('label[for="milestone-stop-conditions-three"]').click();
  const progressData = await page.evaluate(
    () => JSON.parse(window.localStorage.getItem("ai-leverage-field-guide:progress:v1"))
  );
  assert(
    progressData && progressData.milestones["stop-conditions-three"] === true,
    "Explicit milestone click creates progress storage with that milestone"
  );

  await page.goto(`${BASE_URL}/stop-conditions.html`, { waitUntil: "networkidle" });
  await fillBuilder(page);
  await page.click('#stop-condition-form button[type="submit"]');

  keys = await page.evaluate(() => Object.keys(window.localStorage));
  const unexpectedKeys = keys.filter((key) => !ALLOWED_STORAGE_KEYS.includes(key));
  assert(unexpectedKeys.length === 0, `Only documented keys written (found extra: ${unexpectedKeys.join(", ") || "none"})`);
  assert(
    ALLOWED_STORAGE_KEYS.every((allowed) => keys.includes(allowed)),
    "Both documented keys present after full interaction pass"
  );

  await context.close();
  const cleanKeys = await storageKeys(browser);
  // A fresh context starts empty; this guards the helper itself.
  assert(Array.isArray(cleanKeys), "Fresh browser context exposes localStorage API");
}

/* ==================================================================== *
 * Run
 * ==================================================================== */

const browser = await chromium.launch();

try {
  await testPathSelection(browser);
  await testStopConditionBuilder(browser);
  await testProgressTracking(browser);
  await testCopyFallback(browser);
  await testJavaScriptDisabled(browser);
  await testSingleLiveRegion(browser);
  await testStoragePrivacy(browser);
} finally {
  await browser.close();
}

console.log("\n========================================");
if (failures.length > 0) {
  console.error(`${failures.length} failure(s). Exiting non-zero.`);
  process.exit(1);
}
console.log("All interaction tests passed.");
