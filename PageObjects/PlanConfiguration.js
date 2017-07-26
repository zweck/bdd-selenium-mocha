const { By, until } = require('selenium-webdriver');
const { DEFAULT_WAIT_TIME } = require('../config');
const error = require('../lib/error');

// Page Object Details
const element ='section.plan-configuration';
const name = 'PlanConfiguration'

// elements
const NEW_BLANK_DRAFT_BUTTON = 'h3 .new-draft';
const NEW_DRAFT_WITH_CONFIG_BUTTON = 'h3 .new-draft-config';
const EMPTY_YEAR_SELECT = '.financial-year-select .Select-placeholder';
const EMPTY_CONTRACT_BASED = '.contract-basis-select .Select-placeholder';
const EMPTY_ORG_LEVEL_0 = '.org-level-0-select .Select-placeholder';
const EMPTY_UNIT = '.deployed-gu-select .Select-placeholder';
const EXPAND_CONFIG = 'form.configuration .expand';
const PLAN_NAME = '#draftName';
const CLEAR_CONFIG_BUTTON = 'button.clear-config';

// Actions
async function clickNewBlankDraft(driver){
  const newBlankDraftWithConfigButton = await driver.wait(until.elementLocated(By.css(NEW_DRAFT_WITH_CONFIG_BUTTON)), DEFAULT_WAIT_TIME, 'No new draft with config button found');
  const newBlankDraftButton = await driver.wait(until.elementLocated(By.css(NEW_BLANK_DRAFT_BUTTON)), DEFAULT_WAIT_TIME, 'No new draft button found');
  const expandConfig = await driver.wait(until.elementLocated(By.css(EXPAND_CONFIG)), DEFAULT_WAIT_TIME, 'No expand config found');
  expandConfig.click();
  newBlankDraftButton.click();
}

async function configIsEmpty(driver){

  let emptyYearSelect = await driver.wait(until.elementLocated(By.css(EMPTY_YEAR_SELECT)), DEFAULT_WAIT_TIME, `Couldn't find empty year select`);
  let contractBasedSelect = await driver.wait(until.elementLocated(By.css(EMPTY_CONTRACT_BASED)), DEFAULT_WAIT_TIME, `Couldn't find contract based select`);
  let emptyOrgLevel0 = await driver.wait(until.elementLocated(By.css(EMPTY_ORG_LEVEL_0)), DEFAULT_WAIT_TIME, `Couldn't find empty org level 0 select`);
  let emptyUnit = await driver.wait(until.elementLocated(By.css(EMPTY_UNIT)), DEFAULT_WAIT_TIME, `Couldn't find empty unti select`);
  let planName = await driver.wait(until.elementLocated(By.css(PLAN_NAME)), DEFAULT_WAIT_TIME, `Couldn't find empty plan name textbox`);

  if( planName.getText().length ) {
    return error({ driver, message: `plan name isn't empty` });
  } else {
    return true;
  }

}

async function clearConfigButtonExists(driver){
  let clearConfigButton = await driver.wait(until.elementLocated(By.css(CLEAR_CONFIG_BUTTON)), DEFAULT_WAIT_TIME, `Couldn't find clear config button`);
  return true;
}

function clickNewBlankDraftWithConfig(driver){
  const newBlankDraftWithConfigButton = driver.wait(until.elementLocated(By.css(NEW_DRAFT_WITH_CONFIG_BUTTON)), DEFAULT_WAIT_TIME);
  if( !newBlankDraftWithConfigButton ) return error({ driver, message: 'No config header buttons found' });
  newBlankDraftWithConfigButton.click();
}

function completeConfigAtLevel({ low=true, medium=false, high=false }){
  // TODO: This should fill in the config at the chosen level of depth
}

module.exports = { 
  element,
  name,
  clickNewBlankDraft,
  completeConfigAtLevel,
  configIsEmpty,
  clearConfigButtonExists
}
