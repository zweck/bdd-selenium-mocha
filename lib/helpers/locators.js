/**
 * @module helper/locators
 */

require('dotenv').config();
const { until, Condition } = require('selenium-webdriver');
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
 * @example await elementIsNotPresent(driver, By.css('.loading-indicator'), `Loading indicator didn't disappear`);
 */
function elementIsNotPresent(driver, locator, msg) {
  return driver.wait(
    _notPresentCondition(driver, locator),
    DEFAULT_WAIT_TIME,
    msg
  );
}

/**
 * Asserts that an element is present on the page
 * @param {object} driver Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @example await elementIsPresent(driver, By.css('.draftName'), `Couldn't find empty plan name textbox`);
 */
function elementIsPresent(driver, locator, msg) {
  return driver.wait(
    until.elementLocated(locator),
    DEFAULT_WAIT_TIME,
    msg
  );
}

module.exports = {
  elementIsPresent,
  elementIsNotPresent
};
