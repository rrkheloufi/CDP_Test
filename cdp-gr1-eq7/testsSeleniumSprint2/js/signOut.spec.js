// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('signOut', function() {
  this.timeout(30000)
  let driver
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('signOut', async function() {
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.css(".btn-outline-danger")).click()
  })
})