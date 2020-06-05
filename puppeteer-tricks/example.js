const puppeteer = require("puppeteer");
// const devices = require("puppeteer/DeviceDescriptors");

// //! Full page screenshot
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //* waitUntil: "networkidle0" => wait till the page load is finished
  await page.goto("https://pptr.dev", { waitUntil: "networkidle0" });
  await page.screenshot({ path: "exmaple.png", fullPage: true });
  await browser.close();
})();

//! PDF
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://example.com/", { waitUntil: "networkidle0" });
  await page.pdf({ path: "example.pdf", format: "Letter" });
  await browser.close();
})();

//! Emulating devices
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(puppeteer.devices["iPhone X"]);
  await page.goto("https://pptr.dev");
  await page.waitFor(10000);
  await page.close();
})();
