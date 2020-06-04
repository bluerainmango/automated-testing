//! Used: puppeteer, mocha
const puppeteer = require('puppeteer')

describe('Hook Test', () => {
	// 1. set variables
	let browser
	let page

	// 2. before hook: browser, page configuration
	before(async function () {
		browser = await puppeteer.launch({
			headless: false,
			slowMo: 10,
			devtools: false,
		})
		page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	// 3. after hook: closing the browser
	after(async function () {
		await browser.close()
	})

	// Runs before each test step
	beforeEach(async function () {})
	// Runs after each test step
	afterEach(async function () {})

	it('should test the page', async function () {
		await page.goto('http://example.com')
		await page.waitForSelector('h1')
	})
})
