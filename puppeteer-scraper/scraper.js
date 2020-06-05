//*** Web Scraper for books */

const puppeteer = require("puppeteer")
const { url } = require("./config")

;(async () => {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	page.setDefaultTimeout(10000)
	await page.setViewport({ width: 1200, height: 800 })

	await browser.close()
})().catch((err) => {
	console.log(err)
	process.exit(1)
})
