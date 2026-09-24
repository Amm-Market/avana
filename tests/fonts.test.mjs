import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const globalFont = await readFile("src/app/site-fonts.ts", "utf8");
const brandFont = await readFile("src/app/[locale]/brand/brand-fonts.ts", "utf8");
const legalFont = await readFile("src/app/legal-font.ts", "utf8");
const globalCss = await readFile("src/app/globals.css", "utf8");

test("global font uses a metric-matched fallback before the site font and suppresses synthetic styles", () => {
  assert.match(globalFont, /ABCDiatypeVariable-Site-Trial\.woff2/);
  assert.match(globalFont, /weight: "400 600"/);
  assert.match(globalFont, /display: "swap"/);
  assert.match(globalFont, /preload: false/);
  assert.match(globalCss, /font-synthesis-weight: none/);
  assert.match(globalCss, /font-synthesis-style: none/);
});

test("secondary font faces do not add a preload to legal or unrelated routes", () => {
  assert.match(brandFont, /preload: false/);
  assert.match(legalFont, /preload: false/);
});
