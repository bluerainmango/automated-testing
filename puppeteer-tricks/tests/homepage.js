export default class Homepage {
  constructor(page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto("https://www.google.com");
  }
}
