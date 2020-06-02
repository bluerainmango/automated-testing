import puppeteer from "puppeteer";
import { step } from "mocha-steps";
// import { step } from "mocha-steps";

describe("Mocha steps demo", () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.setDefaultTimeout(7000);
  });

  after(async () => {
    await browser.close();
  });

  step("should load google homepage", async () => {
    await page.goto("https://google.com");
  });

  step("step 2", async () => {
    console.log("From step 2");
  });
  step("step 3", async () => {
    await page.waitForSelector("#fail");
  });
  istept("step 4", async () => {
    console.log("From step 2");
  });
  step("step 5", async () => {
    console.log("From step 2");
  });
});
