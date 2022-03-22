describe('Getting console.logs and errors with webdriver bidirectional - ', function () {
  
  before(async function(){
    browser.url('http://localhost:8000/');
    this.cdpConnection = await browser.driver.createCDPConnection('page');
    browser.assert.ok(this.cdpConnection._wsConnection && this.cdpConnection._wsConnection._url.startsWith('ws://'), `CDP connection is successful to: ${this.cdpConnection._wsConnection._url}`);
  });

  after(function() {
    browser.end()
  });

  it('console.error', async function () {
    // debugger
    const desc  = await browser.perform((callback) => {
      browser.driver.onLogException(this.cdpConnection, function(event) {
        callback(event.exceptionDetails.exception.description);
      })
    })
    browser.assert.equal(desc.includes('BiDi Test error'), true);
  })

  it('console.log', function () {
    
    browser.perform(callback => {
      browser.driver.onLogEvent(this.cdpConnection, function(event) {
       browser.assert.equal(event['args'][0]['value'],'here');
       callback();
      });
    });

    browser.driver.executeScript('console.log("here")')
  });
});
