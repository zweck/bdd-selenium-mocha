const { until } = require('selenium-webdriver');
const { DEFAULT_WAIT_TIME } = require('../config.json');

function hasLoaded(driver, { element, name }){
  return driver.wait(until.elementLocated(element), DEFAULT_WAIT_TIME, `Couldn\'t find ${name} after ${DEFAULT_WAIT_TIME}ms`);
}

module.exports = { hasLoaded };
