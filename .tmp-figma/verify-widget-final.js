const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // desktop
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const dp = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const r = aside.getBoundingClientRect();
    const vis = [...aside.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||'').split('/').pop().split('?')[0]);
    return { rail: { y: Math.round(r.y), h: Math.round(r.height), w: Math.round(r.width) }, vis };
  });
  console.log('DESKTOP:', JSON.stringify(dp));
  const el = page.locator('aside');
  await el.screenshot({ path: '.tmp-figma/f-desktop-rail.png' });
  await page.close();
  // mobile collapsed + expanded
  page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  let h = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('MOBILE collapsed h:', h);
  await page.screenshot({ path: '.tmp-figma/f-mobile-collapsed.png', clip: { x: 200, y: 500, width: 190, height: 344 } });
  await page.locator('aside button[aria-expanded]').click();
  await page.waitForTimeout(700);
  h = await page.evaluate(() => document.querySelector('aside').getBoundingClientRect().height);
  console.log('MOBILE expanded h:', h);
  await page.screenshot({ path: '.tmp-figma/f-mobile-expanded.png', clip: { x: 60, y: 380, width: 330, height: 456 } });
  const tally = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('aside img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||'').split('/').pop().split('?')[0]);
    const t = {}; for (const s of imgs) t[s] = (t[s]||0)+1;
    return t;
  });
  console.log('icon tally:', JSON.stringify(tally));
  await browser.close();
})();
