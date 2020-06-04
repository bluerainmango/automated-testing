//! Used: puppeteer, jest, @percy/puppeteer
const puppeteer = require('puppeteer')
const { percySnapshot } = require('@percy/puppeteer')

describe('Percy Visual Test', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})
	afterAll(async function () {
		browser.close()
	})
	test('Full Page Percy Snapshot', async function () {
		await page.goto('https://example.com')
		await page.waitFor(10000)
		await page.evaluate(() => {
			;(document.querySelectorAll('h1') || []).forEach(el => el.remove())
		})
		await percySnapshot(page, 'Example Page')
	})
})
