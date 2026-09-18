const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  const res = await page.evaluate(() => {
    const section = document.querySelector('#technology');
    const btns = [...section.querySelectorAll('button')].map(b => {
      const r = b.getBoundingClientRect();
      const cs = getComputedStyle(b);
      return { text: b.textContent.trim().slice(0, 30), display: cs.display, visible: r.width > 0 && cs.display !== 'none', y: Math.round(r.y) };
    });
    const cards = section.querySelectorAll('article').length;
    return { btns, cards };
  });
  console.log(JSON.stringify(res, null, 1));
  await page.locator('#technology').scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.locator('#technology').screenshot({ path: '.tmp-figma/tech-mobile.png' });
  await browser.close();
})();
