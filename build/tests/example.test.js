"use strict";

var _mochaSteps = require("mocha-steps");

var _builder = require("../builder");

var _builder2 = _interopRequireDefault(_builder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import puppeteer from "puppeteer";
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

  (0, _mochaSteps.step)("should load google homepage", async function () {
    await page.goto("http://zero.webappsecurity.com/index.html");
    await page.waitAndClick("#onlineBankingMenu");
    await page.waitFor(5000);
  });
});