const puppeteer = require('puppeteer')

//! Smoke test: checking the page is loaded
describe('Smoke Test', () => {
	it('should load website', async function () {
		let browser = await puppeteer.launch({ headless: true })
		let page = await browser.newPage()

		await page.goto('https://devexpress.github.io/testcafe/example/')
		await page.waitForSelector('#main-form')
		await browser.close()
	})
})
