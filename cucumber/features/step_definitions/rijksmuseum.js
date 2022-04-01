const {Given, Then, When} = require('@cucumber/cucumber')

Given('I open the Rijksmuseum page', function() {
  return browser.navigateTo('https://www.rijksmuseum.nl/en')
})

Given('I dismiss the cookie dialog', function() {
  const cookieDialogVisible = browser.isVisible({
    selector: '.cookie-consent-bar-wrap',
    suppressNotFoundErrors: true
  })

  if (cookieDialogVisible) {
    return browser.click('.cookie-consent-bar-wrap button.link')
  }
})

When('I search {string}', function(searchTerm) {
  browser.pause(1000).click('a[aria-label="Search"]')

  return browser.waitForElementVisible('#rijksmuseum-app')
    .setValue('input.search-bar-input[type=text]', [searchTerm, browser.Keys.ENTER])
    .pause(1000)
})

Then('the title is {string}', function(title) {
  return browser.assert.titleEquals(title)
})

Then('Body contains {string}', function(contains) {
  return browser.assert.textContains('.search-results', contains)
})
