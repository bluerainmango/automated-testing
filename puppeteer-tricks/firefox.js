//Just install firefox version and import
const puppeteer = require("puppeteer-firefox");

//! Test with firefox browser
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://pptr.dev");
  await page.waitForSelector("title");
  await page.waitFor(50000);
  await browser.close();
})();
