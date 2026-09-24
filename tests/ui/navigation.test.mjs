import { before, after, test } from "node:test";
import assert from "node:assert/strict";
import { launch } from "chrome-launcher";
import puppeteer from "puppeteer-core";

const base = process.env.AUDIT_BASE_URL;
if (!base) throw new Error("Set AUDIT_BASE_URL to a production test server");
let chrome;
let browser;
before(async () => {
  chrome = await launch({ chromeFlags: ["--headless", "--no-sandbox"] });
  browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${chrome.port}` });
});
after(async () => {
  browser?.disconnect();
  await chrome?.kill();
});

async function visit(width, fn) {
  const page = await browser.newPage();
  page.setDefaultTimeout(4000);
  try {
    await page.setViewport({ width, height: 900 });
    await page.goto(base, { waitUntil: "domcontentloaded", timeout: 15000 });
    await page.waitForSelector("main", { visible: true });
    await fn(page);
  } finally { await page.close(); }
}

test("mobile menu moves focus inside and Escape restores the trigger", async () => {
  await visit(390, async page => {
    const trigger = 'button[aria-controls="mobile-site-nav"]';
    await page.click(trigger);
    await page.waitForSelector('[role="dialog"][aria-hidden="false"], dialog[open]', { visible: true });
    await page.waitForFunction(() => Boolean(document.activeElement?.closest('[role="dialog"],dialog')));
    for (let i = 0; i < 16; i++) {
      await page.keyboard.press("Tab");
      assert.equal(
        await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"],dialog'))),
        true,
        "Tab escaped the modal",
      );
    }
    await page.keyboard.press("Escape");
    await page.waitForFunction(sel => document.querySelector(sel)?.getAttribute("aria-expanded") === "false", {}, trigger);
    assert.equal(await page.$eval(trigger, el => el === document.activeElement), true);
  });
});

test("closed mobile menu has no reachable links", async () => {
  await visit(390, async page => {
    const trigger = 'button[aria-controls="mobile-site-nav"]';
    await page.click(trigger);
    await page.waitForSelector('[role="dialog"][aria-hidden="false"], dialog[open]', { visible: true });
    await page.keyboard.press("Escape");
    await page.waitForFunction(sel => document.querySelector(sel)?.getAttribute("aria-expanded") === "false", {}, trigger);
    await page.waitForFunction(() => document.querySelector('[role="dialog"]')?.getAttribute("aria-hidden") === "true");
    for (let i = 0; i < 18; i++) {
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => Boolean(document.activeElement?.closest("#mobile-site-nav"))), false);
    }
  });
});

test("language menu supports arrow keys and Escape", async () => {
  await visit(390, async page => {
    const trigger = '[data-framer-name="Navigation Mobile"] button[aria-haspopup="menu"]';
    await page.focus(trigger);
    await page.keyboard.press("ArrowDown");
    await page.waitForSelector('[role="menuitem"]:focus');
    await page.keyboard.press("End");
    assert.equal(await page.evaluate(() => document.activeElement?.textContent), "עברית");
    await page.keyboard.press("Escape");
    assert.equal(await page.$eval(trigger, el => el === document.activeElement && el.getAttribute("aria-expanded") === "false"), true);
  });
});

test("desktop navigation opens by keyboard and closes on Escape", async () => {
  await visit(1440, async page => {
    const trigger = 'button[aria-controls="desktop-menu-products"]';
    await page.focus(trigger);
    await page.keyboard.press("ArrowDown");
    await page.waitForFunction(() => document.activeElement?.closest("#desktop-menu-products"));
    await page.keyboard.press("Escape");
    await page.waitForFunction(sel => document.querySelector(sel)?.getAttribute("aria-expanded") === "false", {}, trigger);
    assert.equal(await page.$eval(trigger, el => el === document.activeElement), true);
  });
});

test("CTA animation attaches its source when it is near the viewport", async () => {
  await visit(390, async page => {
    await page.$eval("video", el => el.scrollIntoView({ block: "center" }));
    await page.waitForFunction(() => document.querySelector("video")?.getAttribute("src") === "/Avana-Transparent.webm");
  });
});

test("Ask AI showcase stays static until it approaches the viewport", async () => {
  await visit(768, async page => {
    assert.ok(await page.$('[data-testid="ask-ai-showcase-preview"]'));
    assert.equal(
      await page.$(".ask-conversation"),
      null,
      "interactive preview loaded before it was near the viewport",
    );

    const showcase = await page.$('[data-testid="ask-ai-showcase-lazy-root"]');
    assert.ok(showcase);
    await showcase.evaluate(element => element.scrollIntoView({ block: "center" }));
    await page.waitForSelector(".ask-conversation", { visible: true });
  });
});

test("homepage content paints on a cold Slow 3G visit", async () => {
  const page = await browser.newPage();
  const cdp = await page.target().createCDPSession();

  try {
    await page.setViewport({ width: 390, height: 844 });
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await cdp.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: 400,
      downloadThroughput: 50_000,
      uploadThroughput: 50_000,
      connectionType: "cellular3g",
    });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto(`${base}/en`, { waitUntil: "domcontentloaded", timeout: 20_000 });
    await page.waitForSelector("main", { visible: true });

    const { heading, firstContentfulPaintMs } = await page.evaluate(() => ({
      heading: document.querySelector("h1")?.textContent?.trim() ?? "",
      firstContentfulPaintMs: performance.getEntriesByName("first-contentful-paint")[0]?.startTime ?? null,
    }));

    assert.match(heading, /Avana is the lending market/);
    assert.ok(
      firstContentfulPaintMs !== null && firstContentfulPaintMs < 5_000,
      `Slow 3G first contentful paint exceeded 5s: ${firstContentfulPaintMs}ms`,
    );
  } finally {
    await page.close();
  }
});
