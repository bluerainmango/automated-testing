"use strict";

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Loads URLs", function () {
  it("should work", async function () {
    var browser = await _puppeteer2.default.launch({ headless: false });
    var page = await browser.newPage();
    await page.goto("http://zero.webappsecurity.com/");
    await page.waitFor(5000);
    await browser.close();
  });
}); // const puppeteer = require('puppeteer')
//! Used import of ES6 syntax that puppeteer cannot recognize for Babel test