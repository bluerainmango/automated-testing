//! Used: puppeteer, mocha
const puppeteer = require('puppeteer')

describe('Login Test', () => {
	let browser
	let page

	before(async function () {
		browser = await puppeteer.launch({
			headless: true,
			slowMo: 0,
			devtools: false,
		})
		page = await browser.newPage()
		page.setDefaultTimeout(10000)
		page.setDefaultNavigationTimeout(20000)
	})

	after(async function () {
		await browser.close()
	})

	it('Login Test - invalid credentials', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')
		await page.waitForSelector('#login_form')
		await page.type('#user_login', 'invalid username')
		await page.type('#user_password', 'invalid password')
		await page.click('#user_remember_me')
		await page.click('input[type="submit"]')
		await page.waitForSelector('.alert-error')
	})
	it('Login Test - valid credentials', async function () {
		await page.goto('http://zero.webappsecurity.com/index.html')
		await page.waitForSelector('#signin_button')
		await page.click('#signin_button')
		await page.waitForSelector('#login_form')
		await page.type('#user_login', 'username')
		await page.type('#user_password', 'password')
		await page.click('#user_remember_me')
		await page.click('input[type="submit"]')
		await page.waitForSelector('#settingsBox')
	})
})
