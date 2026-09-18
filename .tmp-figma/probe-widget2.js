const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const info = await page.evaluate(() => {
    const asides = [...document.querySelectorAll('aside')].map(a => ({
      label: a.getAttribute('aria-label'),
      cls: a.className.slice(0, 80),
      rect: JSON.stringify((r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(a.getBoundingClientRect())),
      buttons: a.querySelectorAll('button').length,
      visibleImgs: [...a.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => i.getAttribute('src'))
    }));
    const hero = document.querySelector('#hero');
    return { asideCount: asides.length, asides, heroH: hero ? hero.getBoundingClientRect().height : null, errors: null };
  });
  console.log(JSON.stringify({ info, errors }, null, 1));
  await browser.close();
})();
