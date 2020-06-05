"use strict";

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _homepage = require("./homepage");

var _homepage2 = _interopRequireDefault(_homepage);

var _mochaSteps = require("mocha-steps");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Tests", function () {
  var browser = void 0;
  var page = void 0;

  before(async function () {
    browser = await _puppeteer2.default.launch({ headless: false });
    page = await browser.newPage();
    page.setDefaultTimeout(7000);
  });

  after(async function () {
    await browser.close();
  });

  (0, _mochaSteps.step)("step 1: should load homepage", async function () {
    // await page.goto("http://zero.webappsecurity.com/");
    var homepage = new _homepage2.default(page);
    await homepage.visit();
  });

  (0, _mochaSteps.step)("step2", async function () {
    await page.waitForSelector("#fail");
  });
  (0, _mochaSteps.step)("step3", async function () {
    await page.waitForSelector("#fail");
  });
  (0, _mochaSteps.step)("step4", async function () {
    await page.waitForSelector("#fail");
  });
}); // const puppeteer = require('puppeteer')
//! Used import of ES6 syntax that puppeteer cannot recognize for Babel test