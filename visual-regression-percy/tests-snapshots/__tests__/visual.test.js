//! Used: puppeteer, jest, jest-image-snapshot
const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')

// Extend Jest's expect class with jest-image-snapshot's toMatchImageSnapshot method
expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
	let browser
	let page

	beforeAll(async function () {
		browser = await puppeteer.launch({ headless: true })
		page = await browser.newPage()
	})
	afterAll(async function () {
		await browser.close()
	})

	test('Full Page Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')

		const image = await page.screenshot()
		//! 500px or above difference will return failure
		expect(image).toMatchImageSnapshot({
			failureTresholdType: 'pixel',
			failureTreshold: 500,
		})
	})

	test('Single Element Snapshot', async function () {
		await page.goto('https://www.example.com')
		//! screenshot specific element
		const h1 = await page.waitForSelector('h1')
		const image = await h1.screenshot()
		//! 1% of difference will return failure
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	test('Mobile Snapshot', async function () {
		await page.goto('https://www.example.com')
		await page.waitForSelector('h1')
		await page.emulate(puppeteer.devices['iPhone X'])
		const image = await page.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	test('Tablet Snapshot', async function () {
		await page.goto('https://www.example.com')
		const h1 = await page.waitForSelector('h1')
		await page.emulate(puppeteer.devices['iPad landscape'])
		const image = await h1.screenshot()
		expect(image).toMatchImageSnapshot({
			failureThresholdType: 'percent',
			failureThreshold: 0.01,
		})
	})

	//! test.only: test only this block
	// removing element is useful for snapshot when hiding ad banner etc.
	test.only('Remove Element Before Snapshot', async function () {
		await page.goto('https://www.example.com')

		// evaluate(): allow to use browser JS API methods but not Node.js inside of call back
		await page.evaluate(() => {
			;(document.querySelectorAll('h1') || []).forEach(el => el.remove())
		})
		await page.waitFor(3000)
	})
})
