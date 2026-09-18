const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 70 } });
  await page.goto('file:///C:/Users/Admin/OneDrive/Desktop/internship/eulers-motors/.tmp-figma/cands2.html');
  await page.waitForTimeout(500);
  for (const n of ['icon-calculator','icon-download','icon-call','icon-whatsapp','icon-test-drive']) {
    await page.locator('#' + n).screenshot({ path: `.tmp-figma/ic-${n}.png`, omitBackground: true });
  }
  await browser.close();
})();
