const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // mobile — collapsed
  let page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.tmp-figma/widget-mobile-collapsed.png' });
  // expand via chevron toggle
  const toggle = page.locator('aside[aria-label="Quick actions"] button[aria-expanded]').first();
  if (await toggle.count()) { await toggle.click(); await page.waitForTimeout(500); }
  await page.screenshot({ path: '.tmp-figma/widget-mobile-expanded.png' });
  await page.close();
  // desktop
  page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: '.tmp-figma/widget-desktop.png' });
  await browser.close();
})();
