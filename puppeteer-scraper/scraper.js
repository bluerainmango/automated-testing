//*** Web Scraper for books */

const puppeteer = require("puppeteer")
const random_useragent = require("random-useragent")
const fs = require("fs")
const { url } = require("./config")

;(async () => {
	const browser = await puppeteer.launch({ headless: true })
	const page = await browser.newPage()

	page.setDefaultTimeout(10000)
	await page.setViewport({ width: 1200, height: 800 })

	//! Set browser user's agent info with random info
	await page.setUserAgent(random_useragent.getRandom())

	//! Scrape data from page
	const name_selector = ".product_main > h1"
	const price_selector = ".price_color"
	await page.goto(url)
	await page.waitForSelector(name_selector)
	await page.waitForSelector(price_selector)
	const name = await page.$eval(name_selector, (el) => el.textContent)
	const price = await page.$eval(price_selector, (el) => el.textContent)

	const nameTrim = name.trim()
	const priceTrim = price.trim()

	console.log(`Name: ${nameTrim}, Price: ${priceTrim}`)

	//! Get current date and time
	const date = new Date()
	const day = date.getDate()
	const month = date.getMonth() + 1
	const year = date.getFullYear()
	const fullDate = `${day}/${month}/${year}`

	console.log(fullDate)

	//! Save data to the textfile
	const logger = fs.createWriteStream("log.txt", { flags: "a" })
	logger.write(`${fullDate} - ${nameTrim} - ${priceTrim}\n`)
	logger.close()

	await browser.close()
})().catch((err) => {
	console.log(err)
	process.exit(1)
})
