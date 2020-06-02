// import puppeteer from "puppeteer";
import { step } from "mocha-steps";

import Page from "../builder";

describe("Mocha steps demo", () => {
  //   let browser;
  let page;
  let mobile;

  before(async () => {
    //! code before using builder
    // browser = await puppeteer.launch({ headless: true });
    // page = await browser.newPage();
    // await page.setDefaultTimeout(7000);

    //! instances using builder
    page = await Page.build("Desktop");
    mobile = await Page.build("Mobile");
  });

  after(async () => {
    // await browser.close();
    await page.close();
    await mobile.close();
  });

  step("should load google homepage", async () => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.waitAndClick("#onlineBankingMenu");
    await page.waitFor(5000);
  });
});
