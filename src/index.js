/**!
 * Get Crawl Errors.
 * A JavaScript library that allows you to get a list of urls and their
 * error codes from the Google's webmasters crawl errors tool.
 * Useful if you're trying to improve your SEO and automate url redirects.
 * Navigate to this link and run the script.
 * @see {@link https://www.google.com/webmasters/tools/crawl-errors}
 * @author  James Bechet <jamesbechet@gmail.com>
 * @license MIT
 */

(function getGoogleCrawlErrorsModule(factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory)
  }
  else if (typeof module != 'undefined' && typeof module.exports != 'undefined') {
    module.exports = factory()
  }
  else {
    window['getGoogleCrawlErrors'] = factory()
  }
})(function getGoogleCrawlErrorsFactory() {

  if (typeof window === 'undefined' || !window.document) {
    console.error('getGoogleCrawlErrors requires the window and document.')
  }

  /**
   * Gets errors of the current page.
   * @return {Object[]} - The list of errors.
   */
  function getErrors() {

    var collection = document.getElementsByClassName('row-action-cell')
    var elements   = Array.prototype.slice.call(collection)

		return elements.reduce(function (errors, element) {
			var url  = element.innerText
			var code = element.nextSibling.innerText
			errors.push({
				code : parseInt(code.replace('\n', ''), 10),
				url  : url.replace('\n', ''),
			})
			return errors
		}, [])

  }

  /**
   * Navigates to the next page.
   * @private
   * @return {Boolean} - Whether or not there is another page.
   */
	function navigateToNextPage() {

    var tables  = document.getElementsByTagName('table')
    var table   = tables[tables.length - 3]
    var buttons = table.getElementsByTagName('button')
    var button  = buttons[buttons.length - 1]

		// If there are no more errors, no-op
		if (button.disabled) {
			return false
		}

		button.click()
		return true

	}

  /**
   * Returns all the crawl error in the choosen tab.
   * Tabs can be: 'Server Eror', 'Not Found'...
   * Each tab is paginated to a certain number of rows that can be modified
   * by the user.
   * It navigates through all the pages and get all the urls.
   * @return {Object[]} - The total list of errors.
   */
  function get() {

  	var errors = getErrors()
		if (!navigateToNextPage()) {
			return errors
		}
		return errors.concat(get())

  }

  /**
   * The library object.
   * Navigate to this link and run the script.
   * @see {@link https://www.google.com/webmasters/tools/crawl-errors}
   * @property {Function} get   - Function called to get the errors.
   * @property {String} version - The library's version.
   * @type {Object}
   */
	var getGoogleCrawlErrors     = {}
	getGoogleCrawlErrors.get     = get
	getGoogleCrawlErrors.version = '1.0.2'

  return getGoogleCrawlErrors

})
