const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
    
    const result = await page.evaluate(() => {
      const section = document.getElementById('book-test-drive');
      if (!section) return 'Section not found';
      
      const flexParent = section.querySelector('.lg\\:flex-row');
      const leftCol = flexParent.children[0];
      const form = flexParent.querySelector('.bg-surface.p-8');
      
      const emailCard = leftCol.querySelectorAll('.bg-surface.p-5')[1];
      
      return {
        leftColHeight: leftCol.getBoundingClientRect().height,
        leftColBottom: leftCol.getBoundingClientRect().bottom,
        formHeight: form.getBoundingClientRect().height,
        formBottom: form.getBoundingClientRect().bottom,
        emailCardBottom: emailCard ? emailCard.getBoundingClientRect().bottom : 'not found'
      };
    });
    
    console.log("Measurements:", result);
    await browser.close();
  } catch(e) {
    console.log("Error:", e);
  }
})();
