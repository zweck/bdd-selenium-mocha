require('dotenv').config();
const { until, Condition } = require('selenium-webdriver');
const DEFAULT_WAIT_TIME = parseInt(process.env.DEFAULT_WAIT_TIME);

function notPresentCondition(driver, locator) {
  return new Condition(`for no element to be located ${locator}`, driver => {
    return driver.findElements(locator).then( elements => {
      return elements.length === 0;
    });
  });
}

function elementIsNotPresent(driver, locator, msg) {
  return driver.wait(
    notPresentCondition(driver, locator),
    DEFAULT_WAIT_TIME,
    msg
  );
}

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
