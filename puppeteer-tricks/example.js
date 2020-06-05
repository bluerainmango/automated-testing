const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://example.com/", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "exmaple.png", fullPage: true });
  await browser.close();
})();
