const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/services/ai-seo', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r=>setTimeout(r,3000));
  await page.screenshot({ path: '/tmp/service-page-top.png' });
  // about
  const a = await browser.newPage();
  await a.setViewport({ width: 1440, height: 900 });
  await a.goto('http://localhost:3000/about', { waitUntil: 'networkidle0', timeout: 60000 });
  await new Promise(r=>setTimeout(r,3000));
  await a.screenshot({ path: '/tmp/about-top.png' });
  await browser.close();
})();
