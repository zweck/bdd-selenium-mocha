/**
 * @module helper/locators
 */

require('dotenv').config();
const { until, Condition, WebDriver, By } = require('selenium-webdriver');

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

/**
 * Asserts that elements are present on the page, optionally scoped by a parent element
 * @param {object} parent Parent element or Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} msg Failure message
 * @throws an error if the element is not found
 * @example await elementsArePresent(driver, By.css('.draftName'), `Couldn't find empty plan name textbox`);
 * @example await elementsArePresent(parentElement, By.css('.draftName'), `Couldn't find empty plan name textbox`);
 */
async function elementsArePresent(parent, locator, msg) {
  if(parent instanceof WebDriver) {
    return await parent.wait(
      until.elementsLocated(locator),
      DEFAULT_WAIT_TIME,
      msg
    );
  } else {
    try {
      return await parent.findElements(locator);
    } catch (err) {
      throw new Error(msg);
    }
  }
}

/*
 * Asserts that a select element has the correct option selected
 * @param {object} parent Parent element or Selenium driver
 * @param {object} locator Selenium locator
 * @param {string} selection text of selection
 * @param {string} msg Failure message
 */
async function optionIsSelected(parent, locator, selection, msg) {
  const select = await elementIsPresent(parent, locator, msg);
  const input = await select.findElement(By.css('.Select-value'));
  const selected = await input.getText();
  if (selected !== selection) {
    throw new Error(msg);
  } else {
    return select;
  }
}

module.exports = {
  elementIsPresent,
  elementIsNotPresent,
  elementsArePresent,
  optionIsSelected,
};
