const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  let h = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('collapsed rail h:', h, '(design 116)');
  await page.locator('aside button[aria-expanded]').click();
  await page.waitForTimeout(700);
  h = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('expanded rail h:', h, '(design 332)');
  const counts = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('aside img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||''));
    const tally = {};
    for (const s of imgs) tally[s.split('/').pop().split('?')[0]] = (tally[s.split('/').pop().split('?')[0]] || 0) + 1;
    return tally;
  });
  console.log('visible icon tally (each must be 1):', JSON.stringify(counts));
  await browser.close();
})();
