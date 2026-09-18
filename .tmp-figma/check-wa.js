const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const probe = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return { error: 'no aside' };
    const btn = aside.querySelector('button[aria-label="Chat on WhatsApp"]');
    const r = btn.getBoundingClientRect();
    const ar = aside.getBoundingClientRect();
    const imgs = [...btn.querySelectorAll('img')].map(i => {
      const cs = getComputedStyle(i);
      const ir = i.getBoundingClientRect();
      return { src: (i.getAttribute('src')||'').split('/').pop().split('?')[0], display: cs.display, w: Math.round(ir.width), h: Math.round(ir.height), complete: i.complete, naturalW: i.naturalWidth };
    });
    const btnCS = getComputedStyle(btn);
    return { asideRect: { y: Math.round(ar.y), h: Math.round(ar.height), x: Math.round(ar.x), w: Math.round(ar.width) },
      btnRect: { y: Math.round(r.y), h: Math.round(r.height), w: Math.round(r.width), x: Math.round(r.x) },
      btnDisplay: btnCS.display, btnOverflow: btnCS.overflow, imgs };
  });
  console.log(JSON.stringify(probe, null, 1));
  await page.screenshot({ path: '.tmp-figma/wa-desktop-now.png' });
  await browser.close();
})();
