/* eslint-disable no-unused-vars */
/** @module PageObjects/PlanConfiguration */

const { By, until } = require('selenium-webdriver');
const { DEFAULT_WAIT_TIME } = require('../config');
const error = require('../lib/error');

// Page Object Details
const rootElement ='section.plan-configuration';
const name = 'PlanConfiguration';

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
 * @param {function} driver The driver instance for that test
 */
async function clickNewBlankDraft( driver ){
  const newBlankDraftWithConfigButton = await driver.wait(until.elementLocated(
<<<<<<< HEAD
    By.xpath("//*[contains(text(), 'New Draft With Config')]")),
    DEFAULT_WAIT_TIME, 'No new draft with config button found');
    
  const newBlankDraftButton = await driver.wait(until.elementLocated(
    By.xpath("//*[contains(text(), 'New Blank Draft')]")),
    DEFAULT_WAIT_TIME, 'No new draft button found');

  const expandConfig = await driver.wait(until.elementLocated(
    By.css(EXPAND_CONFIG)),
    DEFAULT_WAIT_TIME, 'No expand config found');

=======
    By.xpath("//*[contains(text(), 'New Draft With Config')]")
  ), DEFAULT_WAIT_TIME, 'No new draft with config button found');

  const newBlankDraftButton = await driver.wait(until.elementLocated(
    By.xpath("//*[contains(text(), 'New Blank Draft')]")
  ), DEFAULT_WAIT_TIME, 'No new draft button found');

  const expandConfig = await driver.wait(until.elementLocated(
    By.css(EXPAND_CONFIG)
  ), DEFAULT_WAIT_TIME, 'No expand config found');
>>>>>>> develop
  expandConfig.click();
  newBlankDraftButton.click();
}

// Assertions

/**
 * Checks that the config is empty
 * @param {function} driver The driver instance for that test
 * @return {(Error|boolean)} returns either an error is the plan name object has length or returns true
 */
async function configIsEmpty( driver ){
  const emptyYearSelect = await driver.wait(until.elementLocated(
    By.css(EMPTY_YEAR_SELECT)),
    DEFAULT_WAIT_TIME, `Couldn't find empty year select`);

  const contractBasedSelect = await driver.wait(until.elementLocated(
    By.css(EMPTY_CONTRACT_BASED)),
    DEFAULT_WAIT_TIME, `Couldn't find contract based select`);

  const emptyOrgLevel0 = await driver.wait(until.elementLocated(
    By.css(EMPTY_ORG_LEVEL_0)),
    DEFAULT_WAIT_TIME, `Couldn't find empty org level 0 select`);

  const emptyUnit = await driver.wait(until.elementLocated(
    By.css(EMPTY_UNIT)), 
    DEFAULT_WAIT_TIME, `Couldn't find empty unti select`);

  const planName = await driver.wait(until.elementLocated(
    By.css(PLAN_NAME)), 
    DEFAULT_WAIT_TIME, `Couldn't find empty plan name textbox`);

  if( planName.getText().length ) {
    return error({ driver, message: `plan name isn't empty` });
  } else {
    return true;
  }
}

/**
 * Checks that the config is empty
 * @param {function} driver The driver instance for that test
 * @return {boolean} returns true if no error is thrown
 */
async function clearConfigButtonExists( driver ){
  const clearConfigButton = await driver.wait(until.elementLocated(
    By.xpath("//*[contains(text(), 'Clear Config')]")), 
    DEFAULT_WAIT_TIME, `Couldn't find clear config button`);
  return true;
}

/** export the PageObjects methods */
module.exports = { 
  rootElement,
  name,
  clickNewBlankDraft,
  configIsEmpty,
  clearConfigButtonExists
};
