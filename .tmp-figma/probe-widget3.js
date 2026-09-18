const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ width: 390, height: 844, name: 'mobile' }, { width: 1440, height: 900, name: 'desktop' }]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const info = await page.evaluate(() => {
      const aside = document.querySelector('aside');
      if (!aside) return { aside: null };
      return {
        rect: JSON.stringify((r => ({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}))(aside.getBoundingClientRect())),
        btns: [...aside.querySelectorAll('button')].map(b => ({
          label: b.getAttribute('aria-label'), expanded: b.getAttribute('aria-expanded'),
          visible: b.offsetParent !== null, display: getComputedStyle(b).display
        })),
        visibleImgs: [...aside.querySelectorAll('img')].filter(i => i.offsetParent !== null).map(i => i.getAttribute('src'))
      };
    });
    console.log(`--- ${vp.name} ---`); console.log(JSON.stringify(info));
    await page.close();
  }
  await browser.close();
})();
