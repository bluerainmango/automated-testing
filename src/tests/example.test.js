// import puppeteer from "puppeteer";
import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import LoginPage from "../pages/LoginPage";

describe("Mocha steps demo", () => {
  //   let browser;
  let page;
  let loginPage;
  // let mobile;

  before(async () => {
    //! code before using builder
    // browser = await puppeteer.launch({ headless: true });
    // page = await browser.newPage();
    // await page.setDefaultTimeout(7000);

    //! instances using builder
    page = await Page.build("Desktop");
    loginPage = new LoginPage(page);
    // mobile = await Page.build("Mobile");
  });

  after(async () => {
    // await browser.close();
    await page.close();
    // await mobile.close();
  });

  step("should signin button is visible", async () => {
    await page.goto("http://zero.webappsecurity.com/index.html");
    expect(await page.isElementVisible("#signin_button")).to.be.true;
  });

  step("should display login form", async () => {
    await page.waitAndClick("#signin_button");
    expect(await page.isElementVisible("#login_form")).to.be.true;
    expect(await page.isElementVisible("#signin_button")).to.be.false;
  });

  step("should login to app", async () => {
    //! Before using LoginPage class
    // await page.waitAndType("#user_login", "username");
    // await page.waitAndType("#user_password", "password");
    // await page.waitAndClick(".btn-primary");

    //* After using LoginPage class
    await loginPage.login("username", "password");

    expect(await page.isElementVisible(".nav-tabs")).to.be.true;
  });

  step("should have 6 navbar links", async () => {
    expect(await page.getCount(".nav-tabs li")).to.equal(6);
  });
});
