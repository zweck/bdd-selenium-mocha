/**
 * Page object that represents the Plan Configuration form
 * @module pageObject/PlanConfigurationForm
 */

const { By } = require('selenium-webdriver');
const error = require('../error');
const { elementIsPresent } = require('../helpers/locators');
const { clickButtonOrLink } = require('../helpers/actions');

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

// Actions

/**
 * Action to click a button in the PlanConfiguration header with the label 'New Blank Draft'
 * @param {object} context The context for this test
 * @ return {Error} returns an error if the button is not clicked, else true
 */
async function expandConfigAndClickNewBlankDraft( { driver } ) {
  clickButtonOrLink(driver, By.css(EXPAND_CONFIG), 'Expand config not found');
  clickButtonOrLink(driver, By.xpath("//*[contains(text(), 'New Blank Draft')]"), 'New draft button not found');
}

// Assertions

/**
 * Checks that the config is empty
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns an error if the plan config form fields are not blank, else true
 */
async function configIsEmpty( { driver } ) {

  await elementIsPresent(
    driver, By.css(EMPTY_YEAR_SELECT), `Couldn't find empty year select`
  );

  await elementIsPresent(
    driver, By.css(EMPTY_CONTRACT_BASED), `Couldn't find contract based select`
  );

  await elementIsPresent(
    driver, By.css(EMPTY_ORG_LEVEL_0), `Couldn't find empty org level 0 select`
  );

  await elementIsPresent(
    driver, By.css(EMPTY_UNIT), `Couldn't find empty unit select`
  );

  const planName = await elementIsPresent(
    driver, By.css(PLAN_NAME), `Couldn't find empty plan name textbox`
  );

  if( planName.getText().length ) {
    return error({ driver, message: `plan name field isn't empty` });
  } else {
    return true;
  }
}

/**
 * Checks that the clear config button is present.
 * @param {object} context The context for this test
 * @return {boolean} returns true if presnet, else false
 */
async function clearConfigButtonExists( { driver } ) {
  
  await elementIsPresent(
    driver, By.xpath("//*[contains(text(), 'Clear Config')]"), `Couldn't find clear config button`
  );
  return true;
}

module.exports = { 
  rootElement,
  name,
  expandConfigAndClickNewBlankDraft,
  configIsEmpty,
  clearConfigButtonExists
};
