// const puppeteer = require('puppeteer')
//! Used import of ES6 syntax that puppeteer cannot recognize for Babel test
import puppeteer from "puppeteer";
import Homepage from "./homepage";

describe("Loads URLs", () => {
  it("should work", async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // await page.goto("http://zero.webappsecurity.com/");
    const homepage = new Homepage(page);
    await homepage.visit();
    await page.waitFor(5000);
    await browser.close();
  });
});
