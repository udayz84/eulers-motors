const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // mobile collapsed
  let page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.tmp-figma/w-mobile-collapsed.png' });
  const state1 = await page.evaluate(() => document.querySelector('aside button[aria-expanded]')?.getAttribute('aria-label'));
  // expand
  await page.locator('aside button[aria-expanded]').click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: '.tmp-figma/w-mobile-expanded.png' });
  const probe = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const r = aside.getBoundingClientRect();
    const vis = [...aside.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||'').split('/').pop());
    const labels = [...aside.parentElement.querySelectorAll('span')].filter(s => s.childElementCount === 0 && s.textContent.trim().length > 3 && s.offsetParent !== null).map(s => s.textContent.trim());
    return { rail: { y: Math.round(r.y), h: Math.round(r.height), x: Math.round(r.x), w: Math.round(r.width) }, vis, labels, open: document.querySelector('aside button[aria-expanded]').getAttribute('aria-expanded') };
  });
  console.log('before click:', state1);
  console.log('expanded probe:', JSON.stringify(probe, null, 1));
  await page.close();
  // desktop
  page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: '.tmp-figma/w-desktop.png' });
  const dprobe = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const r = aside.getBoundingClientRect();
    const vis = [...aside.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => (i.getAttribute('src')||'').split('/').pop());
    const chevronVisible = [...aside.querySelectorAll('button')].filter(b => b.getAttribute('aria-expanded') !== null).every(b => b.offsetParent === null);
    return { rail: { y: Math.round(r.y), h: Math.round(r.height), x: Math.round(r.x), w: Math.round(r.width) }, vis, chevronHidden: chevronVisible };
  });
  console.log('desktop probe:', JSON.stringify(dprobe, null, 1));
  await browser.close();
})();
