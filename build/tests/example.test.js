"use strict";

var _mochaSteps = require("mocha-steps");

var _chai = require("chai");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Mocha steps demo", function () {
  //   let browser;
  var page = void 0;
  var mobile = void 0;

  before(async function () {
    //! code before using builder
    // browser = await puppeteer.launch({ headless: true });
    // page = await browser.newPage();
    // await page.setDefaultTimeout(7000);

    //! instances using builder
    page = await _builder2.default.build("Desktop");
    mobile = await _builder2.default.build("Mobile");
  });

  after(async function () {
    // await browser.close();
    await page.close();
    await mobile.close();
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
    await page.waitAndType("#user_login", "username");
    await page.waitAndType("#user_password", "password");
    await page.waitAndClick(".btn-primary");
    (0, _chai.expect)((await page.isElementVisible(".nav-tabs"))).to.be.true;
  });
}); // import puppeteer from "puppeteer";