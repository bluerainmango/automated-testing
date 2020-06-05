describe("Google Homepage", () => {
  // In Jest, beforeAll instead of before
  beforeAll(async () => {
    // In Jest, jest is used instead of page for setTimeout()
    jest.setTimeout(15000);
    // In Jest, browser & page are auto initiated in the behindscene so no need to init here
    await page.goto("https://google.com");
  });

  it("should load google homepage", async () => {
    await page.waitForSelector('input[name="q"]');
    // Jest's debugger
    await jestPuppeteer.debug();
    let title = await page.title();
    console.log("TITLE: " + title);
  });
});
