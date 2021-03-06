// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('removeTask', function() {
  this.timeout(30000)
  let driver
  beforeEach(async function() {
    driver = await new Builder().forBrowser('firefox').build()
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('removeTask', async function() {
    await driver.get("http://localhost:3000/")
    await driver.findElement(By.linkText("Manage Projects")).click()
    await driver.findElement(By.linkText("Details")).click()
    await driver.findElement(By.linkText("Tasks")).click()
    await driver.findElement(By.css("#tasks_done > .list-group-item:nth-child(4)")).click()
    {
      const element = await driver.findElement(By.css("#tasks_done > .list-group-item:nth-child(4)"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.css("#modalInfos53 form > .btn")).click()
    assert(await driver.switchTo().alert().getText() == "Voulez-vous vraiment supprimer cette tâche ?")
    await driver.switchTo().alert().accept()
  })
})
