import puppeteer from "puppeteer";

//! Builder Pattern
// 보통은 따로 page build 생성자(original 생성자)를 만들어서 아래 Builder 생성자안에서 new original()로 instance를 만들어 준 뒤 활용하는데, 여기서는 static 함수로 만들어서 활용함. 보통의 패턴은 내 노트 확인할 것(Mocha + puppeteer).
export default class Builder {
  static async build(viewport) {
    const launchOptions = {
      headless: true,
      slowMo: 0,
      args: [
        "--no-sandbox",
        "--disable-setui-sandbox",
        "--disable-web-security",
      ],
    };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    //! extend page by creating Builder's instance
    // 단순히 page 객체였던 것을 아래 waitAndClick 등의 custom 메소드를 가진 page 객체로 extend
    const extendedPage = new Builder(page);
    page.setDefaultTimeout(10000);

    switch (viewport) {
      case "Mobile":
        const mobileViewport = puppeteer.devices["iPhone X"];
        await page.emulate(mobileViewport);
        break;
      case "Tablet":
        const tabletViewport = puppeteer.devices["iPad landscape"];
        await page.emulate(tabletViewport);
        break;
      case "Desktop":
        await page.setViewport({ width: 800, height: 600 });
        break;
      default:
        throw new Error("supported devices are only Mobile | Tablet | Desktop");
    }

    //! new Proxy(target, handler)
    // 프록시란 실제 객체를 대신하는 객체.
    // 인자로 target: hidden original obj, handler: new behavior를 추가.
    // 해당 프록시 객체 역할: instance.property 형식으로 부르면, extendedPage, browswer, page에서 해당 property를 찾아 return 해라.
    // 즉, Builder.build().waitAndClick 하면 아래 메소드가 출력되는 것.
    //: just return target's property(method)
    return new Proxy(extendedPage, {
      get: function (_target, property) {
        return extendedPage[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async waitAndClick(selector) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
  async waitAndType(selector, text) {
    await this.page.waitForSelector(selector);
    await this.page.type(selector, text);
  }
  async getText(selector) {
    await this.page.waitForSelector(selector);
    const text = await this.page.$eval(selector, (el) => el.innerHTML);
    return text;
  }
  async getCount(selector) {
    await this.page.waitForSelector(selector);
    const count = await this.page.$$eval(selector, (arr) => arr.length);
    return count;
  }
  async waitForXPathAndClick(xpath) {
    await this.page.waitForXPath(xpath);
    const elements = await this.page.$x(xpath);
    if (elements.length > 1) {
      console.warn("waitForXPathAndClick returned more than one result");
    }
    await elements[0].click();
  }

  async isElementVisible(selector) {
    let visible = true;
    await this.page
      .waitForSelector(selector, { visible: true, timeout: 3000 })
      .catch(() => (visible = false));

    return visible;
  }
  async isXPathVisible(selector) {
    let visible = true;
    await this.page
      .waitForXPath(selector, { visible: true, timeout: 3000 })
      .catch(() => (visible = false));

    return visible;
  }
}
