const puppeteer = require("puppeteer");
// const devices = require("puppeteer/DeviceDescriptors");

//! Full page screenshot
// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   //* waitUntil: "networkidle0" => wait till the page load is finished
//   await page.goto("https://pptr.dev", { waitUntil: "networkidle0" });
//   await page.screenshot({ path: "exmaple.png", fullPage: true });
//   await browser.close();
// })();

//! PDF
// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();
//   await page.goto("https://example.com/", { waitUntil: "networkidle0" });
//   await page.pdf({ path: "example.pdf", format: "Letter" });
//   await browser.close();
// })();

//! Emulating devices
// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.emulate(puppeteer.devices["iPhone X"]);
//   await page.goto("https://pptr.dev");
//   await page.waitFor(10000);
//   await browser.close();
// })();

//! Incognito and Fake geolocation
// (async () => {
//   const browser = await puppeteer.launch({ headless: false });
//   // If regular browser, you can use below page from browser not from context
//   //   const page = await browser.newPage();

//   //* Set context for incognito and geo permission
//   const context = await browser.createIncognitoBrowserContext();
//   // if regualr browser, use below
//   //   const context = browser.defaultBrowserContext();
//   await context.overridePermissions(
//     "https://chercher.tech/practice/geo-location",
//     ["geolocation"]
//   );

//   const page = await context.newPage();

//   await page.goto("https://chercher.tech/practice/geo-location");
//   await page.waitForSelector("title");

//   //* Change geolocation to the north pole
//   await page.setGeolocation({ latitude: 90, longitude: 0 });

//   await page.waitFor(10000);
//   await browser.close();
// })();

//! Accessibility test
// (async () => {
//   const browser = await puppeteer.launch({ headless: true });
//   const page = await browser.newPage();

//   await page.goto("https://pptr.dev");
//   await page.waitForSelector("title");

//   const snapshot = await page.accessibility.snapshot();
//   console.log(snapshot.children[0]);

//   await browser.close();
// })();

//! Measuring performance
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://pptr.dev");
  //   await page.waitForSelector("title");

  //* Without stryingify() it cannot access to window.performance obj. Just return {}
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));
  console.log(JSON.parse(metrics));

  await browser.close();
})();
