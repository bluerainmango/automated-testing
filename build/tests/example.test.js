"use strict";

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _mochaSteps = require("mocha-steps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { step } from "mocha-steps";

describe("Mocha steps demo", function () {
  var browser = void 0;
  var page = void 0;

  before(async function () {
    browser = await _puppeteer2.default.launch({ headless: true });
    page = await browser.newPage();
    await page.setDefaultTimeout(7000);
  });

  after(async function () {
    await browser.close();
  });

  (0, _mochaSteps.step)("should load google homepage", async function () {
    await page.goto("https://google.com");
  });

  (0, _mochaSteps.step)("step 2", async function () {
    console.log("From step 2");
  });
  (0, _mochaSteps.step)("step 3", async function () {
    await page.waitForSelector("#fail");
  });
  istept("step 4", async function () {
    console.log("From step 2");
  });
  (0, _mochaSteps.step)("step 5", async function () {
    console.log("From step 2");
  });
});