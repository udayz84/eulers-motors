const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ width: 390, height: 844, name: 'MOBILE' }, { width: 1440, height: 900, name: 'DESKTOP' }]) {
    const page = await browser.newPage({ viewport: vp });
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2500);
    const res = await page.evaluate(() => {
      const out = {};
      for (const id of ['technology', 'insights']) {
        const sec = document.querySelector(`[aria-label="${id === 'technology' ? 'Technology' : 'Insights'}"]`) || document.querySelector('#technology');
      }
      const check = (label) => {
        const sec = document.querySelector(`section[aria-label="${label}"]`);
        const cards = sec.querySelectorAll('article');
        const cardTop = cards.length ? cards[0].getBoundingClientRect().y : -1;
        const btns = [...sec.querySelectorAll('button')].map(b => {
          const r = b.getBoundingClientRect();
          const cs = getComputedStyle(b);
          const vis = cs.display !== 'none' && r.width > 0;
          return { text: b.textContent.trim().slice(0, 25), visible: vis, belowCards: r.y > cardTop };
        }).filter(b => /how it works|all articles/i.test(b.text));
        return btns;
      };
      return { Technology: check('Technology'), Insights: check('Insights') };
    });
    console.log(`--- ${vp.name} ---`);
    console.log(JSON.stringify(res));
    await page.close();
  }
  await browser.close();
})();
