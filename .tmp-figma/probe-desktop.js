const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('pageerror', e => errors.push('PAGEERROR: ' + String(e).slice(0, 300)));
  page.on('response', r => { if (r.status() >= 400) errors.push(`HTTP ${r.status()} ${r.url().slice(-60)}`); });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => ({
    asides: document.querySelectorAll('aside').length,
    heroExists: !!document.querySelector('#hero'),
    heroRect: document.querySelector('#hero')?.getBoundingClientRect().height,
    quickActions: document.querySelectorAll('[aria-label="Quick actions"]').length,
    whatsappImgs: [...document.querySelectorAll('img')].filter(i => (i.src||'').includes('whatsapp')).length,
    bodyText: document.body.innerText.slice(0, 120)
  }));
  console.log(JSON.stringify({ info, errors: errors.slice(0, 8) }, null, 1));
  await browser.close();
})();
