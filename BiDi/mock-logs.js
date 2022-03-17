describe('Getting console.logs and errors with webdriver bidirectional - ', function () {
  beforeEach(async function(browser){
    await browser.url('http://localhost:8000/');
  })

  it('console.error', async function (browser) {
    const cdpConnection = await browser.driver.createCDPConnection('page')
    browser.assert.ok(cdpConnection._wsConnection && cdpConnection._wsConnection._url.startsWith('ws://'), `CDP connection is successful to: ${cdpConnection._wsConnection._url}`);

    // debugger
    await browser.driver.onLogException(cdpConnection, function (event) {
      browser.assert.equal(event.exceptionDetails.exception.description.includes('BiDi Test error'), true)
    })
  })

  it('console.log', async function (browser) {
    const cdpConnection = await browser.driver.createCDPConnection('page')
    browser.assert.ok(cdpConnection._wsConnection && cdpConnection._wsConnection._url.startsWith('ws://'), `CDP connection is successful to: ${cdpConnection._wsConnection._url}`);

    await browser.driver.onLogEvent(cdpConnection, function (event) {
      browser.assert.equal(event['args'][0]['value'], 'here')
    })

    await browser.driver.executeScript('console.log("here")')
  });
});
