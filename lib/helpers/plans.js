/**
 * @module helper/plans
 */

const { By } = require('selenium-webdriver');
const { elementIsPresent, elementIsNotPresent } = require('../helpers/locators');

/**
 * Asserts that the page has loaded with a plan by testing that the Planning Level Button
 * is present on the page and that loading indicator has disappeared.
 * @param {object} context for current test
 */
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
