const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 340, height: 120 }, deviceScaleFactor: 1 });
  await page.goto('file:///C:/Users/Admin/OneDrive/Desktop/internship/eulers-motors/.tmp-figma/render-cands.html');
  await page.waitForTimeout(400);
  for (const id of ['wa', 'td', 'av']) {
    await page.locator('#' + id).screenshot({ path: `.tmp-figma/cand-${id}.png`, omitBackground: true });
  }
  await browser.close();
})();
