const { By } = require('selenium-webdriver');
const { elementIsPresent, elementIsNotPresent } = require('../helpers/locators');

async function pageHasLoadedWithPlan({ driver }) {
  await elementIsPresent(
    driver,
    By.css('.plan-header header .plan-header__view-planning-level'), 
    `Couldn't find Planning Level Button in Header`
  );

  await elementIsNotPresent(
    driver,
    By.css('.loading-indicator'),
    `Loading indicator didn't disappear`
  );
  return true;
}

module.exports = { 
  pageHasLoadedWithPlan
};
