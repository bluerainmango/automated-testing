"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

var _LoginPage = require("../pages/LoginPage");

var _LoginPage2 = _interopRequireDefault(_LoginPage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import puppeteer from "puppeteer";
describe("Mocha steps demo", function () {
  //   let browser;
  var page = void 0;
  var loginPage = void 0;
  // let mobile;

  before(async function () {
    //! code before using builder
    // browser = await puppeteer.launch({ headless: true });
    // page = await browser.newPage();
    // await page.setDefaultTimeout(7000);

    //! instances using builder
    page = await _builder2.default.build("Desktop");
    loginPage = new _LoginPage2.default(page);
    // mobile = await Page.build("Mobile");
  });

  after(async function () {
    // await browser.close();
    await page.close();
    // await mobile.close();
  });

  (0, _mochaSteps.step)("should signin button is visible", async function () {
    await page.goto("http://zero.webappsecurity.com/index.html");
    (0, _chai.expect)((await page.isElementVisible("#signin_button"))).to.be.true;
  });

  (0, _mochaSteps.step)("should display login form", async function () {
    await page.waitAndClick("#signin_button");
    (0, _chai.expect)((await page.isElementVisible("#login_form"))).to.be.true;
    (0, _chai.expect)((await page.isElementVisible("#signin_button"))).to.be.false;
  });

  (0, _mochaSteps.step)("should login to app", async function () {
    //! Before using LoginPage class
    // await page.waitAndType("#user_login", "username");
    // await page.waitAndType("#user_password", "password");
    // await page.waitAndClick(".btn-primary");

    //* After using LoginPage class
    await loginPage.login("username", "password");

    (0, _chai.expect)((await page.isElementVisible(".nav-tabs"))).to.be.true;
  });

  (0, _mochaSteps.step)("should have 6 navbar links", async function () {
    (0, _chai.expect)((await page.getCount(".nav-tabs li"))).to.equal(6);
  });
});