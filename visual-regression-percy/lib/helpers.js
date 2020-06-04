module.exports = {
	click: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			await page.click(selector)
		} catch (err) {
			throw new Error(`Could not click on selector: ${selector}`)
		}
	},
	getText: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$eval(selector, element => element.innerHTML)
		} catch (err) {
			throw new Error(`Cannot get text from selector: ${selector}`)
		}
	},
	getCount: async function (page, selector) {
		try {
			await page.waitForSelector(selector)
			return await page.$$eval(selector, array => array.length)
		} catch (err) {
			throw new Error(`Cannot get count of selector: ${selector}`)
		}
	},
	typeText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.type(selector, text)
		} catch (err) {
			throw new Error(`Could not type into selector: ${selector}`)
		}
	},
	waitForText: async function (page, selector, text) {
		try {
			await page.waitForSelector(selector)
			await page.waitForFunction(
				(selector, text) => {
					return document.querySelector(selector).innerText.includes(text)
				},
				{},
				selector,
				text
			)
		} catch (err) {
			throw new Error(
				`Text: ${text} now found for selector: ${selector} ${err}`
			)
		}
	},
	shouldNotExist: async function (page, selector) {
		try {
			await page.waitForSelector(selector, { hidden: true })
		} catch (err) {
			throw new Error(`Selector: ${selector} is visible, but should not be.`)
		}
	},
}
