// const puppeteer = require('puppeteer')
//! Used import of ES6 syntax that puppeteer cannot recognize for Babel test
import puppeteer from "puppeteer";
import Homepage from "./homepage";
import { step } from "mocha-steps";

describe("Tests", () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    page.setDefaultTimeout(7000);
  });

  after(async () => {
    await browser.close();
  });

  step("step 1: should load homepage", async () => {
    // await page.goto("http://zero.webappsecurity.com/");
    const homepage = new Homepage(page);
    await homepage.visit();
  });

  step("step2", async () => {
    await page.waitForSelector("#fail");
  });
  step("step3", async () => {
    await page.waitForSelector("#fail");
  });
  step("step4", async () => {
    await page.waitForSelector("#fail");
  });
});
