const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  const h1 = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('collapsed h:', h1);
  await page.locator('aside button[aria-expanded]').click();
  await page.waitForTimeout(800);
  const h2 = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('expanded h:', h2);
  const tally = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('aside img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||'').split('/').pop().split('?')[0]);
    const t = {}; for (const s of imgs) t[s] = (t[s]||0)+1;
    const labels = [...document.querySelectorAll('aside ~ * span, div span')].filter(s => s.offsetParent !== null && s.childElementCount === 0 && /^(Savings|Download|1800|Book)/.test(s.textContent)).map(s => s.textContent.trim());
    return { t, labels: [...new Set(labels)] };
  });
  console.log('tally:', JSON.stringify(tally));
  await page.screenshot({ path: '.tmp-figma/f-mobile-expanded.png', clip: { x: 40, y: 350, width: 350, height: 494 } });
  await browser.close();
})();
