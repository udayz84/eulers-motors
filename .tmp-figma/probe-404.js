const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const failed = [];
  page.on('response', r => { if (r.status() === 404) failed.push(r.url()); });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  // expand the rail
  const toggle = page.locator('aside button[aria-expanded]').first();
  await toggle.click();
  await page.waitForTimeout(600);
  const info = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    return {
      rect: JSON.stringify((r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(aside.getBoundingClientRect())),
      visibleBtns: [...aside.querySelectorAll('button')].filter(b => b.offsetParent !== null).map(b => b.getAttribute('aria-label')),
      visibleImgs: [...aside.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => i.getAttribute('src')),
      labels: [...document.querySelectorAll('body *')].filter(e => e.childElementCount === 0 && /Savings Calculator|Brochure|1800/.test(e.textContent || '')).map(e => e.textContent.trim()).filter(t => t.length < 40)
    };
  });
  console.log('404s:', JSON.stringify(failed, null, 1));
  console.log('expanded mobile:', JSON.stringify(info, null, 1));
  await page.screenshot({ path: '.tmp-figma/widget-mobile-expanded2.png' });
  await browser.close();
})();
