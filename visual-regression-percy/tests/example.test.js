//! Used: puppeteer, mocha, chai
const puppeteer = require('puppeteer')
const expect = require('chai').expect

const {
	click,
	getText,
	getCount,
	waitForText,
	shouldNotExist,
} = require('../lib/helpers')

// describe('My First Puppeteer Test', () => {
// 	it('should launch the browser', async function () {
// 		// headless browser launch
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 30,
// 			devtools: false,
// 		})
// 		const page = await browser.newPage()
// 		await page.goto('http://example.com')
// 		await page.waitFor(3000)
// 		await page.reload()
// 		await page.waitForSelector('h1')
// 		await page.goto('https://dev.to')
// 		await page.waitForSelector('#top-bar')
// 		await page.goBack()
// 		await page.waitForSelector('h1')
// 		await page.goForward()
// 		await page.waitForSelector('#top-bar')
// 		await browser.close()
// 	})
// })

// describe('My Second Puppeteer Test', () => {
// 	it('should check the form', async function () {
// 		// headless browser launch
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			slowMo: 30,
// 			devtools: false,
// 		})
// 		const page = await browser.newPage()
// 		await page.goto('https://devexpress.github.io/testcafe/example/')
// 		await page.type('#developer-name', 'Mike', { delay: 500 })
// 		await page.waitFor(1000)
// 		await page.click('#tried-test-cafe', { clickCount: 1 })
// 		await page.waitFor(1000)
// 		await page.click('#tried-test-cafe', { button: 'right' })
// 		await page.waitFor(1000)
// 		await page.select('#preferred-interface', 'JavaScript API')
// 		await page.waitFor(1000)
// 		const message = `Let's type something here!`
// 		await page.type('#comments', message)
// 		await page.waitFor(1000)
// 		await browser.close()
// 	})
// })

describe('My Third Puppeteer Test', () => {
	it('should check page', async function () {
		//* headless browser launch
		const browser = await puppeteer.launch({
			headless: false,
			// slowMo: 10,
			devtools: false,
		})

		const page = await browser.newPage()

		await page.setDefaultTimeout(10000)
		await page.setDefaultNavigationTimeout(20000)

		await page.goto('http://example.com/')

		// await page.waitForSelector('h1')
		await page.waitForXPath('//h1') // XPath version

		const title = await page.title()
		const url = await page.url()

		//* helper func
		// const text = await page.$eval('h1', element => element.textContent)
		// const count = await page.$$eval('p', arr => arr.length)
		const text = await getText(page, 'h1')
		const count = await getCount(page, 'p')

		const innerText = await page.$$eval('p', arr => arr[0].innerText)

		//* Assertion
		expect(title).to.be.a('string', 'Example Domain')
		expect(url).to.include('example.com')
		expect(text).to.be.a('string', 'Example Domain')
		expect(count).to.equal(2)
		expect(innerText).to.include('this')

		//* Helper func
		await waitForText(page, 'h1', 'Example Domain')

		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#searchTerm')

		await page.type('#searchTerm', 'emily', { delay: 500 })
		await page.keyboard.press('Enter', { delay: 50 })
		await page.waitFor(2000)

		//* helper func
		// await page.waitForSelector('#signin_button')
		// await page.click('#signin_button')
		await click(page, '#signin_button')

		//* Check if el is hidden
		// 1. bad practice
		// await page.waitFor(() => !document.querySelector('#signin_button'))
		// 2. better practice
		// await page.waitForSelector('#signin_button', {
		// 	hidden: true,
		// 	timeout: 3000,
		// })
		await shouldNotExist(page, '#signin_button')

		await browser.close()
	})
})
