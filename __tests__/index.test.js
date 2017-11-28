it('gets the errors on the current page', () => {
  
  const nextPageButtonDisabled = {
    disabled: true,
    click: jest.fn()
  }
  const paginationTable = {
    getElementsByTagName: jest.fn().mockReturnValueOnce([
      null, nextPageButtonDisabled
    ]),
  }
  global.document.getElementsByTagName = jest.fn().mockReturnValueOnce([
    paginationTable,
    null,
    null,
  ])

  // Init
  const getGoogleCrawlErrors = require('../')
  const url                  = 'https://www.test.com'
  const code                 = 404
  const elements             = [{
    innerText : url,
    nextSibling : {
      innerText : code,
    }
  }]
  const getElementsByClassNameSpy = jest.spyOn(
    global.document, 'getElementsByClassName'
  )
  .mockReturnValueOnce(elements)

  // Call the unit being tested
  const errors = getGoogleCrawlErrors.get()

  // Assert the errors got returned
  expect(getElementsByClassNameSpy).toBeCalledWith('row-action-cell')
  expect(getElementsByClassNameSpy.mock.calls.length).toBe(1)
  expect(errors).toEqual([{
    url,
    code,
  }])
  expect(nextPageButtonDisabled.click.mock.calls.length).toBe(0)

  // Cleanup
  getElementsByClassNameSpy.mockReset()
  getElementsByClassNameSpy.mockRestore()

})

it('gets the errors on the current page then navigates to the next one', () => {
  
  // Init
  const nextPageButtonDisabled = {
    disabled: true,
    click: jest.fn()
  }
  const nextPageButtonEnabled = {
    disabled: false,
    click: jest.fn()
  }
  const paginationTable = {
    getElementsByTagName: jest.fn()
      .mockReturnValueOnce([
        null, nextPageButtonEnabled
      ])
      .mockReturnValueOnce([
        null, nextPageButtonDisabled
      ]),
  }
  global.document.getElementsByTagName = jest.fn().mockReturnValue([
    paginationTable,
    null,
    null,
  ])
  const getGoogleCrawlErrors = require('../')
  const url                  = 'https://www.test.com'
  const code                 = 404
  const elements             = [{
    innerText : url,
    nextSibling : {
      innerText : code,
    }
  }]
  const getElementsByClassNameSpy = jest.spyOn(
    global.document, 'getElementsByClassName'
  )
  .mockReturnValue(elements)

  // Call the unit being tested
  const errors = getGoogleCrawlErrors.get()

  // Assert it navigated to the nexts page
  expect(nextPageButtonEnabled.click).toBeCalled()
  expect(nextPageButtonDisabled.click.mock.calls.length).toBe(0)
  
  // Assert the errors got returned
  expect(getElementsByClassNameSpy).toBeCalledWith('row-action-cell')
  expect(getElementsByClassNameSpy.mock.calls.length).toBe(2)
  expect(errors).toEqual([{ url, code }, { url, code }])

  // Cleanup
  getElementsByClassNameSpy.mockReset()
  getElementsByClassNameSpy.mockRestore()

})