import fs from "node:fs";
import path from "node:path";

const siteRoot = path.resolve("docs/site");

if (!fs.existsSync(siteRoot)) {
  console.error(`Missing site directory: ${siteRoot}`);
  process.exit(1);
}

const htmlFiles = fs
  .readdirSync(siteRoot)
  .filter((name) => name.endsWith(".html"))
  .sort();

const failures = [];

function getAttributes(html, attribute) {
  const pattern = new RegExp(
    `${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`,
    "gi"
  );

  return [...html.matchAll(pattern)].map(
    (match) => match[1] ?? match[2] ?? ""
  );
}

for (const file of htmlFiles) {
  const filePath = path.join(siteRoot, file);
  const html = fs.readFileSync(filePath, "utf8");

  const values = [
    ...getAttributes(html, "href"),
    ...getAttributes(html, "src"),
  ];

  for (const rawValue of values) {
    const value = rawValue.trim();

    if (
      !value ||
      value.startsWith("#") ||
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("data:")
    ) {
      continue;
    }

    const withoutFragment = value.split("#")[0].split("?")[0];

    if (!withoutFragment) {
      continue;
    }

    const resolved = path.resolve(
      path.dirname(filePath),
      withoutFragment
    );

    if (!fs.existsSync(resolved)) {
      failures.push({
        file,
        value,
        resolved,
      });
    }
  }
}

if (failures.length > 0) {
  console.error("Broken local links:");

  for (const failure of failures) {
    console.error(
      `- ${failure.file}: ${failure.value} -> ${failure.resolved}`
    );
  }

  process.exit(1);
}

console.log(`Local links passed for ${htmlFiles.length} HTML files.`);
