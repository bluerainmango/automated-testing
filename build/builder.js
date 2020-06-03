"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _puppeteer = require("puppeteer");

var _puppeteer2 = _interopRequireDefault(_puppeteer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//! Builder Pattern using static func
// 보통은 따로 page build 생성자(original 생성자)를 만들어서 아래 Builder 생성자안에서 new original()로 instance를 만들어 준 뒤 활용하는데, 여기서는 별도의 생성자 대신 static 함수로 만들어서 활용함. 보통의 패턴은 내 노트 확인할 것(Mocha + puppeteer).
var Builder = function () {
  _createClass(Builder, null, [{
    key: "build",

    //* 1. Static func
    value: async function build(viewport) {
      var launchOptions = {
        headless: false,
        slowMo: 10,
        args: ["--no-sandbox", "--disable-setui-sandbox", "--disable-web-security"]
      };

      var browser = await _puppeteer2.default.launch(launchOptions);
      var page = await browser.newPage();

      //! Extend page by creating Builder's instance
      // 단순히 page 객체였던 것을 아래 waitAndClick 등의 custom 메소드를 가진 page 객체로 extend
      var extendedPage = new Builder(page);
      page.setDefaultTimeout(10000);

      switch (viewport) {
        case "Mobile":
          var mobileViewport = _puppeteer2.default.devices["iPhone X"];
          await page.emulate(mobileViewport);
          break;
        case "Tablet":
          var tabletViewport = _puppeteer2.default.devices["iPad landscape"];
          await page.emulate(tabletViewport);
          break;
        case "Desktop":
          await page.setViewport({ width: 800, height: 600 });
          break;
        default:
          throw new Error("supported devices are only Mobile | Tablet | Desktop");
      }

      //! New Proxy(target, handler)
      //* Return page,extentedPage,browser's property(method) whenever it's called.
      // 프록시란 실제 객체를 대신하는 객체.
      // 인자로 target: hidden original obj, handler: new behavior를 추가.
      // 해당 프록시 객체 역할: instance.property 형식으로 부르면, extendedPage, browswer, page에서 해당 property를 찾아 return 해라.
      // 즉, Builder.build().waitAndClick 하면 아래 메소드가 출력되는 것.
      return new Proxy(extendedPage, {
        get: function get(_target, property) {
          return extendedPage[property] || browser[property] || page[property];
        }
      });
    }
  }]);

  function Builder(page) {
    _classCallCheck(this, Builder);

    this.page = page;
  }

  _createClass(Builder, [{
    key: "waitAndClick",
    value: async function waitAndClick(selector) {
      await this.page.waitForSelector(selector);
      await this.page.click(selector);
    }
  }, {
    key: "waitAndType",
    value: async function waitAndType(selector, text) {
      await this.page.waitForSelector(selector);
      await this.page.type(selector, text);
    }
  }, {
    key: "getText",
    value: async function getText(selector) {
      await this.page.waitForSelector(selector);
      var text = await this.page.$eval(selector, function (el) {
        return el.innerHTML;
      });
      return text;
    }
  }, {
    key: "getCount",
    value: async function getCount(selector) {
      await this.page.waitForSelector(selector);
      var count = await this.page.$$eval(selector, function (arr) {
        return arr.length;
      });
      return count;
    }
  }, {
    key: "waitForXPathAndClick",
    value: async function waitForXPathAndClick(xpath) {
      await this.page.waitForXPath(xpath);
      var elements = await this.page.$x(xpath);
      if (elements.length > 1) {
        console.warn("waitForXPathAndClick returned more than one result");
      }
      await elements[0].click();
    }
  }, {
    key: "isElementVisible",
    value: async function isElementVisible(selector) {
      var visible = true;
      await this.page.waitForSelector(selector, { visible: true, timeout: 3000 }).catch(function () {
        return visible = false;
      });

      return visible;
    }
  }, {
    key: "isXPathVisible",
    value: async function isXPathVisible(selector) {
      var visible = true;
      await this.page.waitForXPath(selector, { visible: true, timeout: 3000 }).catch(function () {
        return visible = false;
      });

      return visible;
    }
  }]);

  return Builder;
}();

exports.default = Builder;