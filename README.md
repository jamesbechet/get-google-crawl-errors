# Get Google Crawl Errors [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/jamesbechet/get-google-crawl-errors/master.svg
[travis-url]: https://travis-ci.org/jamesbechet/get-google-crawl-errors
[npm-image]: https://img.shields.io/npm/v/get-google-crawl-errors.svg
[npm-url]: https://npmjs.org/package/get-google-crawl-errors
[downloads-image]: https://img.shields.io/npm/dm/get-google-crawl-errors.svg
[downloads-url]: https://npmjs.org/package/get-google-crawl-errors

## A JavaScript library that allows you to get a list of urls and their error codes from the Google's webmasters crawl errors tool.

### Why?
This tool is useful if you're trying to fix 404s errors on your website using Google Search Console Tools.
Instead of individually fixing each url, you could automate your redirect system using this script.
Navigate to the [Google Search Console Tools](https://search.google.com/u/1/search-console/index) -> Indexing -> Pages -> Choose "Soft 404" for example -> then run (copy/paste) the script.

### Install

```bash
npm install --save get-google-crawl-errors
```

### Usage

```js
var getGoogleCrawlErrors = require('get-google-crawl-errors')

/**
 * A list of error urls.
 * @type {String[]}
 */
var errorUrls = getGoogleCrawlErrors.get()
```

### License
MIT. Copyright (C) [James Bechet](https://jamesbechet.github.io/jamesbechet/)
