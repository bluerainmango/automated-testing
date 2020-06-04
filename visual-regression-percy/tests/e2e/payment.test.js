//! Used: puppeteer, mocha
const puppeteer = require('puppeteer')

describe('Payment Test', () => {
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

		//* Login
		await page.goto('http://zero.webappsecurity.com/login.html')
		await page.waitForSelector('#login_form')
		await page.type('#user_login', 'username')
		await page.type('#user_password', 'password')
		await page.click('#user_remember_me')
		await page.click('input[type="submit"]')
	})

	after(async function () {
		await browser.close()
	})

	it('Display Payment Form', async function () {
		await page.waitForSelector('.nav-tabs')
		await page.click('#pay_bills_tab')
		await page.waitForSelector('.board')
	})
	it('Make Payment', async function () {
		await page.select('#sp_payee', 'Apple')
		await page.select('#sp_account', 'Credit Card')
		await page.type('#sp_amount', '500')
		await page.type('#sp_date', '2020-05-30')
		await page.keyboard.press('Enter')
		await page.type('#sp_description', 'Payment for rent.')
		await page.click('#pay_saved_payees')
		await page.waitForSelector('#alert_content')
	})
})
