const chalk = require('chalk');
const { By, until, Condition } = require('selenium-webdriver');
require('dotenv').config();

const DEFAULT_WAIT_TIME = parseInt(process.env.DEFAULT_WAIT_TIME);

async function pageHasLoadedWithPlan(driver){
  await driver.wait(until.elementLocated(
    By.css('.plan-header header .plan-header__view-planning-level')
  ),
  DEFAULT_WAIT_TIME, `Couldn't find Planning Level Button in Header after ${DEFAULT_WAIT_TIME}ms`);

  await driver.wait(elementIsNotPresent(driver, 
    By.css('.loading-indicator')
  ),
  DEFAULT_WAIT_TIME, `Loading indicator didn't disappear after ${DEFAULT_WAIT_TIME}ms`);

  console.log(chalk.green(`     PLAN LOADED     `));
  return true;
}

function elementIsNotPresent(driver, locator) {
  return new Condition('for no element to be located ' + locator, driver => {
    return driver.findElements(locator).then( elements => {
      return elements.length === 0;
    });
  });
}

module.exports = { pageHasLoadedWithPlan };
