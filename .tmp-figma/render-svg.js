const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 700, height: 240 } });
  await page.goto('file:///C:/Users/Admin/OneDrive/Desktop/internship/eulers-motors/.tmp-figma/render-svg.html');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '.tmp-figma/svg-compare.png' });
  await browser.close();
})();
