/**
 * @module helper/actions
 */
const { By, Key } = require('selenium-webdriver');
const { elementIsPresent } = require('./locators');

/**
 * Action to click on a button or a link
 * @param {object} driver Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @example clickButtonOrLink(driver, By.xpath("//*[contains(text(), 'New Blank Draft')]"), 'New draft button not found');
 */
async function clickButtonOrLink(driver, locator, msg) {
  const buttonOrLink = await elementIsPresent(driver, locator, msg);
  return await buttonOrLink.click();
}

/**
 * Action to select an option on a select element
 * @param {object} driver Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} selection text of selection
 * @param {string} msg Failure message
 * @example selectOption(driver, By.css('.financial-year-select'), '2017', `Couldn't select FY2017`)
 */
async function selectOption(driver, locator, selection, msg) {
  const select = await elementIsPresent(driver, locator, msg);
  select.click();
  const input = await select.findElement(By.xpath('//input'));
  return await input.sendKeys(selection, Key.ENTER);
}

module.exports = {
  clickButtonOrLink,
  selectOption
};
