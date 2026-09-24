const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    // Evaluate the boundary
    const result = await page.evaluate(() => {
      const hero = document.getElementById('hero');
      const stats = hero.nextElementSibling;
      const heroRect = hero.getBoundingClientRect();
      const statsRect = stats.getBoundingClientRect();
      
      const heroStyle = window.getComputedStyle(hero);
      const statsStyle = window.getComputedStyle(stats);
      
      return {
        heroBottom: heroRect.bottom,
        statsTop: statsRect.top,
        gap: statsRect.top - heroRect.bottom,
        heroBg: heroStyle.backgroundColor,
        statsBg: statsStyle.backgroundColor,
        statsBorderTop: statsStyle.borderTop,
      };
    });
    
    console.log("Result:", result);
    await browser.close();
  } catch(e) {
    console.log("Error:", e);
  }
})();
