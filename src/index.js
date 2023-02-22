/**!
 * Get Crawl Errors.
 * A JavaScript library that allows you to get a list of urls
 * from the Google Search Console Tools’ Indexing Pages section.
 * Useful if you're trying to improve your SEO and automate url redirects.
 * Navigate to this link and run the script.
 * @see {@link https://search.google.com/u/1/search-console/index}
 * @author  James Bechet <jamesbechet@gmail.com>
 * @license MIT
 */

(
  function getGoogleCrawlErrorsModule (factory) {
    if (typeof define === 'function' && define.amd) {
      define(factory)
    } else if (
      typeof module != 'undefined' &&
      typeof module.exports != 'undefined'
    ) {
      module.exports = factory()
    } else {
      window['getGoogleCrawlErrors'] = factory()
    }
  }
)(function getGoogleCrawlErrorsFactory () {
  if (typeof window === 'undefined' || !window.document) {
    console.error('getGoogleCrawlErrors requires the window and document.')
  }

  /**
   * Returns all the crawl error in the chosen page reason tab.
   * A page reason could be "Soft 404" or "Server error (5xx)"
   * @return {String[]} - The total list of errors.
   */
  function get () {
    const errorUrls = []
    document.querySelectorAll('td')
      .forEach(element => {
        const div = element.querySelector('span[title] > div')
        if (!div) {
          return
        }
        const urlNode = div.childNodes[0]
        if (!urlNode) {
          console.debug('[getGoogleCrawlErrors][noop] no url')
          return
        }
        errorUrls.push(urlNode.data)
      })

    return errorUrls
  }

  /**
   * The library object.
   * Navigate to this link and run the script.
   * @see {@link https://www.google.com/webmasters/tools/crawl-errors}
   * @property {Function} get   - Function called to get the errors.
   * @property {String} version - The library's version.
   * @type {Object}
   */
  var getGoogleCrawlErrors = {}
  getGoogleCrawlErrors.get = get
  getGoogleCrawlErrors.version = '1.1.0'

  return getGoogleCrawlErrors
})
