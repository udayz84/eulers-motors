const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ width: 390, height: 844, name: 'mobile' }, { width: 1440, height: 900, name: 'desktop' }]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => {
      const aside = document.querySelector('aside[aria-label="Quick actions"]');
      if (!aside) return null;
      const btns = [...aside.querySelectorAll('button')].map(b => {
        const r = b.getBoundingClientRect();
        const cs = getComputedStyle(b);
        const imgs = [...b.querySelectorAll('img')].map(i => `${i.getAttribute('src')} vis=${getComputedStyle(i).display !== 'none' && i.offsetParent !== null}`);
        return { label: b.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top), display: cs.display, imgs };
      });
      const r = aside.getBoundingClientRect();
      return { asideRect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, btns };
    });
    console.log(`--- ${vp.name} ---`);
    console.log(JSON.stringify(info, null, 1));
    await page.close();
  }
  await browser.close();
})();
