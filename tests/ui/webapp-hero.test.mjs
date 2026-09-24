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

const heroSelector = 'picture img[alt="Avana Express homepage hero interface"]';
const isHeroRequest = (url) => /avana-phone-hero|Avana%2520Express/.test(url);
const assetFor = (width) => width < 640 ? "avana-phone-hero" : "Avana%2520Express";

for (const [from, to] of [[390, 1440], [1440, 390]]) {
  test(`homepage hero switches from ${from}px to ${to}px without showing the old image`, async () => {
    const page = await browser.newPage();
    let heldRequest;
    let hold = false;
    const requests = [];
    try {
      await page.setCacheEnabled(false);
      await page.setViewport({ width: from, height: 1000 });
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (isHeroRequest(request.url())) {
          requests.push(request.url());
          if (hold) {
            heldRequest = request;
            return;
          }
        }
        void request.continue();
      });
      await page.goto(`${base}/en`, { waitUntil: "networkidle0", timeout: 60000 });
      assert.equal(requests.length, 1, "initial load must download only the matching hero");
      assert.ok(requests[0].includes(assetFor(from)));
      hold = true;
      await page.setViewport({ width: to, height: 1000 });
      // Leave the new image pending to reproduce a slow connection deterministically.
      const deadline = Date.now() + 10000;
      while (!heldRequest && Date.now() < deadline) {
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      assert.ok(heldRequest, "resizing must request the new hero");
      const pending = await page.$$eval(heroSelector, (images) => images
        .filter((img) => img.getBoundingClientRect().width > 0)
        .map((img) => ({ src: img.currentSrc, height: img.parentElement.parentElement.clientHeight })));
      assert.equal(pending.length, 1);
      assert.ok(!pending[0].src.includes(assetFor(from)), "old image must be hidden even while the new image is pending");
      assert.ok(pending[0].height > 0, "reserve the hero space while loading");
      hold = false;
      await heldRequest.continue();
      heldRequest = undefined;
      await page.waitForFunction((selector, asset) => [...document.querySelectorAll(selector)].some(
        (img) => img.getBoundingClientRect().width > 0 && img.currentSrc.includes(asset) && img.complete && img.naturalWidth > 0,
      ), {}, heroSelector, assetFor(to));
      await page.setViewport({ width: from, height: 1000 });
      await page.waitForFunction((selector, asset) => [...document.querySelectorAll(selector)].some(
        (img) => img.getBoundingClientRect().width > 0 && img.currentSrc.includes(asset) && img.complete && img.naturalWidth > 0,
      ), {}, heroSelector, assetFor(from));
    } finally {
      if (heldRequest) await heldRequest.abort();
      await page.close();
    }
  });
}
