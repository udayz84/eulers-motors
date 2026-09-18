const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // mobile
  let page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  let el = page.locator('section[aria-label="Euler Prime"]');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await el.screenshot({ path: '.tmp-figma/prime-fixed-mobile.png' });
  await page.close();
  // desktop
  page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  el = page.locator('section[aria-label="Euler Prime"]');
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await el.screenshot({ path: '.tmp-figma/prime-fixed-desktop.png' });
  await browser.close();
})();
