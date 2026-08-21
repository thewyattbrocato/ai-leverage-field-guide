import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const SHOT_DIR = path.resolve("artifacts/screenshots");

const PAGES = [
  "/",
  "/index.html",
  "/leverage-loop.html",
  "/curriculum.html",
  "/stop-conditions.html",
];

const VIEWPORTS = [
  { name: "320x800", width: 320, height: 800 },
  { name: "375x812", width: 375, height: 812 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "1024x900", width: 1024, height: 900 },
  { name: "1440x1000", width: 1440, height: 1000 },
];

fs.mkdirSync(SHOT_DIR, { recursive: true });

const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`FAIL: ${message}`);
}

const browser = await chromium.launch();

for (const viewport of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(`pageerror: ${err.message}`));

  for (const route of PAGES) {
    const label = `${route === "/" ? "index-root" : route.replace(/^\//, "").replace(/\.html$/, "")}--${viewport.name}`;
    console.log(`\n=== ${route} @ ${viewport.name} ===`);

    try {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: "networkidle" });
    } catch (err) {
      fail(`${label}: page failed to load — ${err.message}`);
      continue;
    }

    // Console / page errors
    if (consoleErrors.length > 0) {
      for (const err of consoleErrors) {
        fail(`${label}: console error — ${err}`);
      }
    }

    // Visible h1, nav, main
    for (const selector of ["h1", "nav", "main"]) {
      const visible = await page
        .locator(selector)
        .first()
        .isVisible()
        .catch(() => false);
      if (!visible) fail(`${label}: <${selector}> is missing or not visible`);
    }

    // Exactly one h1
    const h1Count = await page.locator("h1").count();
    if (h1Count !== 1) {
      fail(`${label}: expected exactly one h1, found ${h1Count}`);
    }

    // Active nav uses aria-current="page"
    const currentPath = route === "/" ? "/index.html" : route;
    const activeNav = page.locator(
      `nav a[href="${currentPath.replace(/^\//, "")}"][aria-current="page"]`
    );
    const activeCount = await activeNav.count();
    if (activeCount !== 1) {
      fail(
        `${label}: active nav item must use aria-current="page" exactly once (found ${activeCount})`
      );
    }

    // Skip link present
    const skipLink = await page.locator("a.skip-link").count();
    if (skipLink !== 1) {
      fail(`${label}: skip link missing`);
    }

    // Images loaded (naturalWidth > 0)
    const brokenImages = await page.$$eval("img", (imgs) =>
      imgs
        .filter((img) => !img.complete || img.naturalWidth === 0)
        .map((img) => img.getAttribute("src"))
    );
    if (brokenImages.length > 0) {
      for (const src of brokenImages) {
        fail(`${label}: broken image — ${src}`);
      }
    }

    // Horizontal overflow detection + identify offenders
    const overflow = await page.evaluate(() => {
      const docWidth = document.documentElement.scrollWidth;
      const viewportWidth = window.innerWidth;
      const offenders = [];
      if (docWidth > viewportWidth) {
        for (const el of document.querySelectorAll("*")) {
          const rect = el.getBoundingClientRect();
          if (
            rect.width > 0 &&
            (rect.right > viewportWidth + 1 || rect.left < -1)
          ) {
            const inScrollable =
              el.closest(".table-wrapper, .code-block") !== null &&
              el.scrollWidth <= el.clientWidth + 1;
            const style = getComputedStyle(el);
            if (
              !inScrollable &&
              style.display !== "none" &&
              style.visibility !== "hidden"
            ) {
              offenders.push(
                `${el.tagName.toLowerCase()}${
                  el.className && typeof el.className === "string"
                    ? `.${el.className.trim().split(/\s+/).join(".")}`
                    : ""
                } right=${Math.round(rect.right)} left=${Math.round(rect.left)}`
              );
            }
          }
          if (offenders.length >= 10) break;
        }
      }
      return { docWidth, viewportWidth, offenders };
    });

    if (overflow.docWidth > overflow.viewportWidth) {
      fail(
        `${label}: horizontal overflow — scrollWidth ${overflow.docWidth}px > viewport ${overflow.viewportWidth}px; offenders: ${overflow.offenders.join("; ") || "(none identified)"}`
      );
    }

    // Axe scan (serious/critical gate only on first and mobile widths to keep runtime sane)
    if (["320x800", "768x1024"].includes(viewport.name)) {
      try {
        const axeResults = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
          .analyze();
        const bad = axeResults.violations.filter((v) =>
          ["serious", "critical"].includes(v.impact)
        );
        for (const v of bad) {
          fail(
            `${label}: axe ${v.impact} violation "${v.id}" (${v.nodes.length} nodes): ${v.help}`
          );
        }
      } catch (err) {
        fail(`${label}: axe analysis failed — ${err.message}`);
      }
    }

    // Screenshot
    await page.screenshot({
      path: path.join(SHOT_DIR, `${label}.png`),
      fullPage: true,
    });
    console.log(`screenshot: artifacts/screenshots/${label}.png`);
  }

  await context.close();
}

await browser.close();

console.log("\n========================================");
if (failures.length > 0) {
  console.error(`${failures.length} failure(s). Exiting non-zero.`);
  process.exit(1);
}
console.log("All visual tests passed.");
