/**
 * @module helper/locators
 */

require('dotenv').config();
const { until, Condition, WebDriver } = require('selenium-webdriver');

const DEFAULT_WAIT_TIME = parseInt(process.env.DEFAULT_WAIT_TIME);

function _notPresentCondition(driver, locator) {
  return new Condition(`for no element to be located ${locator}`, driver => {
    return driver.findElements(locator).then( elements => {
      return elements.length === 0;
    });
  });
}

/**
 * Asserts that an element is not present on the page
 * @param {object} driver Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @throws an error if the element is not found
 * @example await elementIsNotPresent(driver, By.css('.loading-indicator'), `Loading indicator didn't disappear`);
 */
async function elementIsNotPresent(driver, locator, msg) {
  return await driver.wait(
    _notPresentCondition(driver, locator),
    DEFAULT_WAIT_TIME,
    msg
  );
}

/**
 * Asserts that an element is present on the page, optionally scoped by a parent element
 * @param {object} parent Parent element or Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @throws an error if the element is not found
 * @example await elementIsPresent(driver, By.css('.draftName'), `Couldn't find empty plan name textbox`);
 * @example await elementIsPresent(parentElement, By.css('.draftName'), `Couldn't find empty plan name textbox`);
 */
async function elementIsPresent(parent, locator, msg) {
  if(parent instanceof WebDriver) {
    return await parent.wait(
      until.elementLocated(locator),
      DEFAULT_WAIT_TIME,
      msg
    );
  } else {
    try {
      return await parent.findElement(locator);
    } catch (err) {
      throw new Error(msg);
    }
  }
}


module.exports = {
  elementIsPresent,
  elementIsNotPresent,
};
