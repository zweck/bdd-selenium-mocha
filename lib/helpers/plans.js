/**
 * @module helper/plans
 */

const { By } = require('selenium-webdriver');
const { elementIsPresent, elementIsNotPresent } = require('../helpers/locators');
const { selectOption } = require('../helpers/actions');

const FINANCIAL_YEAR_SELECT_CLASS = '.financial-year-select';
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

/**
 * Action to select plan configuration year option
 * @param {object} context for current test including Selenium driver and select value
 * @param {string} year text of selection
 * @example selectPlanYearOption({ driver, value: '2017' })
 */
async function selectPlanYearOption({ driver, value }) {
  return await selectOption(
    driver,
    By.css(FINANCIAL_YEAR_SELECT_CLASS),
    value,
    `Couldn't select year ${value}`
  );
}

module.exports = { 
  pageHasLoadedWithPlan,
  selectPlanYearOption,
};
