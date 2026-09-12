import assert from 'node:assert/strict';
import fs from 'node:fs';
import { chromium } from 'playwright-core';

const base = process.env.SMOKE_BASE_URL || 'http://127.0.0.1:3000';
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
fs.mkdirSync('test-results/themes', { recursive: true });
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: 'light' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    const lightButton = page.getByRole('button', { name: 'Switch to light mode' });
    await lightButton.waitFor();
    assert.ok(await page.locator('html').evaluate(el => el.classList.contains('dark')), 'First visit must be dark even on a light OS');
    await page.waitForTimeout(1500);
    const canvas = await page.locator('#home canvas').last().elementHandle();
    for (const theme of ['light', 'dark']) {
      const before = await page.evaluate(() => window.scrollY);
      await page.getByRole('button', { name: `Switch to ${theme} mode` }).click();
      await page.waitForFunction(theme => document.documentElement.classList.contains(theme), theme);
      assert.equal(await page.evaluate(() => window.scrollY), before, 'Toggle must preserve scroll');
      assert.equal(await page.evaluate(() => localStorage.getItem('theme')), theme);
      assert.ok(await canvas.evaluate(el => el.isConnected), 'Toggle must not remount canvas');
      const dimensions = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
      assert.ok(dimensions[0] <= dimensions[1] + 1, `Overflow at ${width}px ${theme}`);
      await page.screenshot({ path: `test-results/themes/${width}-${theme}-hero.png` });
    }
    await lightButton.click();
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.getByRole('button', { name: 'Switch to dark mode' }).waitFor();
    assert.ok(await page.locator('html').evaluate(el => el.classList.contains('light')));
    if (width === 390 || width === 1440) {
      await page.evaluate(() => document.getElementById('project').scrollIntoView({ behavior: 'instant' }));
      await page.waitForTimeout(1600);
      await page.screenshot({ path: `test-results/themes/${width}-light-projects.png` });
      const card = page.locator('.project-card').first();
      if (await card.count()) {
        await card.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
        await page.waitForTimeout(800);
        await page.screenshot({ path: `test-results/themes/${width}-light-cards.png` });
      }
      await page.evaluate(() => document.getElementById('contact').scrollIntoView({ behavior: 'instant' }));
      await page.screenshot({ path: `test-results/themes/${width}-light-contact.png` });
    }
    assert.deepEqual(errors, [], `Runtime errors at ${width}px`);
    if (width === 390) {
      for (const route of ['/projects/6mpEWLR9xt9QaDKq9fSW', '/login', '/dashboard', '/dashboard/projects', '/dashboard/experiences']) {
        await page.goto(base + route, { waitUntil: 'domcontentloaded' });
        await page.getByRole('button', { name: 'Switch to dark mode' }).waitFor();
        assert.ok(await page.locator('html').evaluate(el => el.classList.contains('light')), `Theme lost at ${route}`);
      }
      await page.screenshot({ path: 'test-results/themes/login-light.png' });
    }
    await context.close();
    console.log(`Theme checks passed at ${width}px`);
  }
  const reducedContext = await browser.newContext({ viewport: { width: 768, height: 900 }, reducedMotion: 'reduce' });
  const reducedPage = await reducedContext.newPage();
  await reducedPage.goto(base);
  await reducedPage.getByRole('button', { name: 'Switch to light mode' }).focus();
  await reducedPage.keyboard.press('Enter');
  await reducedPage.getByRole('button', { name: 'Switch to dark mode' }).waitFor();
  await reducedPage.evaluate(() => { document.body.style.zoom = '2'; });
  assert.ok(await reducedPage.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), 'Overflow at 200% zoom');
  await reducedPage.screenshot({ path: 'test-results/themes/light-zoom-200.png' });
  await reducedContext.close();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(base);
  assert.ok(await page.locator('html').evaluate(el => el.classList.contains('dark')));
  await context.close();
} finally { await browser.close(); }
