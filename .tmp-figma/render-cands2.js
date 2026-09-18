const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 400, height: 70 } });
  const icons = ['icon-calculator', 'icon-download', 'icon-call', 'icon-whatsapp', 'icon-test-drive'];
  const imgs = icons.map(n => `<img id="${n}" src="../public/assets/widget/${n}.svg" width="60" height="60">`).join('');
  await page.setContent(`<body style="margin:0;background:transparent;display:flex">${imgs}</body>`);
  await page.waitForTimeout(400);
  for (const n of icons) {
    await page.locator('#' + n).screenshot({ path: `.tmp-figma/ic-${n}.png`, omitBackground: true });
  }
  await browser.close();
})();
