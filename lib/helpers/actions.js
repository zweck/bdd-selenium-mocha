/**
 * @module helper/actions
 */
const { elementIsPresent } = require('./locators');

/**
 * Action to click on a button or a link
 * @param {object} driver Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @example clickButtonOrLink(driver, By.xpath("//*[contains(text(), 'New Blank Draft')]"), 'New draft button not found');
 */
async function clickButtonOrLink(driver, locator, msg) {
  const buttonOrLink = await elementIsPresent(
    driver, locator, msg
  );

  buttonOrLink.click();
}

module.exports = {
  clickButtonOrLink
};
