it('gets the errors on the current page', () => {
  const urlNode = {
    data: 'https://www.example.com'
  }
  const errorRowElement = {
    querySelector: jest.fn().mockReturnValueOnce({
      childNodes: [urlNode]
    })
  }

  global.document.querySelectorAll = jest.fn().mockReturnValueOnce({
    forEach: jest.fn((callback) => {
      callback(errorRowElement)
    })
  })

  // Init
  const getGoogleCrawlErrors = require('../')

  // Call the unit being tested
  const errors = getGoogleCrawlErrors.get()

  // Assert the errors got returned
  expect(errors).toEqual([urlNode.data])
})
