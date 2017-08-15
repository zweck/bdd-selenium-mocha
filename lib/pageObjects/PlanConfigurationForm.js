/* eslint-disable no-unused-vars */
/** @module pageObjects/PlanConfigurationForm */

const { By, until } = require('selenium-webdriver');
const error = require('../error');
const { elementIsPresent } = require('../helpers/locators');
const { clickButton } = require('../helpers/buttons');
require('dotenv').config();

const DEFAULT_WAIT_TIME = parseInt(process.env.DEFAULT_WAIT_TIME);

// Page Object Details
const rootElement ='section.plan-configuration';
const name = 'PlanConfigurationForm';

// elements
const EMPTY_YEAR_SELECT = '.financial-year-select .Select-placeholder';
const EMPTY_CONTRACT_BASED = '.contract-basis-select .Select-placeholder';
const EMPTY_ORG_LEVEL_0 = '.org-level-0-select .Select-placeholder';
const EMPTY_UNIT = '.deployed-gu-select .Select-placeholder';
const EXPAND_CONFIG = 'form.configuration .expand';
const PLAN_NAME = '#draftName';
const CLEAR_CONFIG_BUTTON = 'button.clear-config';

// Actions

/**
 * Action to click a button in the PlanConfiguration header with the label 'New Blank Draft'
 * @param {object} context The context for this test
 */
async function expandConfigAndClickNewBlankDraft( { driver } ) {
  clickButton(driver, By.css(EXPAND_CONFIG), 'Expand config not found');
  clickButton(driver, By.xpath("//*[contains(text(), 'New Blank Draft')]"), 'New draft button not found');

}

// Assertions

/**
 * Checks that the config is empty
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns either an error is the plan name object has length or returns true
 */
async function configIsEmpty( { driver } ) {

  const emptyYearSelect = await elementIsPresent(
    driver, By.css(EMPTY_YEAR_SELECT), `Couldn't find empty year select`
  );

  const contractBasedSelect = await elementIsPresent(
    driver, By.css(EMPTY_CONTRACT_BASED), `Couldn't find contract based select`
  );

  const emptyOrgLevel0 = await elementIsPresent(
    driver, By.css(EMPTY_ORG_LEVEL_0), `Couldn't find empty org level 0 select`
  );

  const emptyUnit = await elementIsPresent(
    driver, By.css(EMPTY_UNIT), `Couldn't find empty unit select`
  );

  const planName = await elementIsPresent(
    driver, By.css(PLAN_NAME), `Couldn't find empty plan name textbox`
  );

  if( planName.getText().length ) {
    return error({ driver, message: `plan name isn't empty` });
  } else {
    return true;
  }
}

/**
 * Checks that the config is empty
 * @param {object} context The context for this test
 * @return {boolean} returns true if no error is thrown
 */
async function clearConfigButtonExists( { driver } ) {
  
  const clearConfigButton = await elementIsPresent(
    driver, By.xpath("//*[contains(text(), 'Clear Config')]"), `Couldn't find clear config button`
  );
  return true;
}

/** export the PageObjects methods */
module.exports = { 
  rootElement,
  name,
  expandConfigAndClickNewBlankDraft,
  configIsEmpty,
  clearConfigButtonExists
};
