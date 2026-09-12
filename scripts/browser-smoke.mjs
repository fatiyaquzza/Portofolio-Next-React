import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const baseUrl = process.env.SMOKE_BASE_URL || "http://127.0.0.1:3000";
const executablePath = process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const browser = await chromium.launch({ executablePath, headless: true });
const failures = [];

try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 700 ? 844 : 900 },
      reducedMotion: "no-preference",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    const response = await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    assert.equal(response?.status(), 200, `homepage returned ${response?.status()} at ${width}px`);
    await page.waitForTimeout(2500);

    const dimensions = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    assert.ok(
      dimensions.scrollWidth <= dimensions.clientWidth + 1,
      `horizontal overflow at ${width}px: ${dimensions.scrollWidth}/${dimensions.clientWidth}`
    );
    assert.equal(await page.locator("main").count(), 1, `missing main landmark at ${width}px`);
    assert.ok(await page.locator("nav[aria-label='Primary navigation']").count(), `missing primary nav at ${width}px`);

    if (width < 768) {
      const menu = page.locator("button[aria-controls='mobile-navigation']");
      assert.equal(await menu.getAttribute("aria-label"), "Open navigation menu");
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"), "false");
    }

    const relevantErrors = errors.filter(
      (message) => !message.includes("favicon") && !message.includes("net::ERR_BLOCKED_BY_CLIENT")
    );
    if (relevantErrors.length) failures.push(`${width}px: ${relevantErrors.join(" | ")}`);
    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  assert.equal(await reducedPage.locator("main").count(), 1);
  await reducedContext.close();

  const noWebGlContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await noWebGlContext.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (String(type).includes("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  const noWebGlPage = await noWebGlContext.newPage();
  const noWebGlErrors = [];
  noWebGlPage.on("pageerror", (error) => noWebGlErrors.push(error.message));
  noWebGlPage.on("console", (message) => {
    if (message.type() === "error") noWebGlErrors.push(message.text());
  });
  await noWebGlPage.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await noWebGlPage.waitForTimeout(1000);
  assert.equal(
    await noWebGlPage.locator("main").count(),
    1,
    `page failed without WebGL: ${noWebGlErrors.join(" | ")}`
  );
  await noWebGlContext.close();

  const projectContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const projectPage = await projectContext.newPage();
  const featuredId = process.env.NEXT_PUBLIC_FEATURED_PROJECT_ID || "6mpEWLR9xt9QaDKq9fSW";
  const projectResponse = await projectPage.goto(`${baseUrl}/projects/${featuredId}`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(projectResponse?.status(), 200, "featured project detail did not return 200");
  assert.ok(await projectPage.getByRole("heading", { level: 1 }).count(), "project detail has no h1");
  const missingResponse = await projectPage.goto(`${baseUrl}/projects/definitely-missing-project`, {
    waitUntil: "domcontentloaded",
  });
  assert.equal(missingResponse?.status(), 404, "missing project did not return 404");
  await projectContext.close();

  assert.deepEqual(failures, [], failures.join("\n"));
  console.log("Browser smoke passed: responsive viewports, project detail/404, reduced motion, and WebGL fallback.");
} finally {
  await browser.close();
}
