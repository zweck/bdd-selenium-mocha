const chalk = require('chalk');
const { By, until, Condition } = require('selenium-webdriver');
const { DEFAULT_WAIT_TIME } = require('../config.json');

async function hasLoaded(driver, { element, name }){
  await driver.wait(elementIsNotPresent(driver, By.css('.loading-indicator')), DEFAULT_WAIT_TIME, `Couldn\'t find ${name} after ${DEFAULT_WAIT_TIME}ms`);
  console.log(chalk.black.bgGreen.bold(`     ${name} LOADED     `))
  return await driver.wait(until.elementLocated(By.css(element)), DEFAULT_WAIT_TIME, `Couldn\'t find ${name} after ${DEFAULT_WAIT_TIME}ms`);
}

function elementIsNotPresent(driver, locator) {
  return new Condition('for no element to be located ' + locator, driver => {
    return driver.findElements(locator).then( elements => {
      return elements.length === 0;
    });
  });
};

module.exports = { hasLoaded };
