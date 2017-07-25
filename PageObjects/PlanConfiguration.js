const { By, until } = require('selenium-webdriver');
const { DEFAULT_WAIT_TIME } = require('../config');
const error = require('../lib/error');

// Page Object Details
const element ='section.plan-configuration';
const name = 'PlanConfiguration'

// elements
const NEW_BLANK_DRAFT_BUTTON = 'h3 .new-draft';
const NEW_DRAFT_WITH_CONFIG_BUTTON = 'h3 .new-draft-config';
const YEAR_SELECT = '.financial-year-select .Select-value-label';
const EXPAND_CONFIG = 'form.configuration .expand';

// Actions
async function clickNewBlankDraft(driver){
  const newBlankDraftWithConfigButton = await driver.wait(until.elementLocated(By.css(NEW_DRAFT_WITH_CONFIG_BUTTON)), DEFAULT_WAIT_TIME, 'No new draft with config button found');
  const newBlankDraftButton = await driver.wait(until.elementLocated(By.css(NEW_BLANK_DRAFT_BUTTON)), DEFAULT_WAIT_TIME, 'No new draft button found');
  const expandConfig = await driver.wait(until.elementLocated(By.css(EXPAND_CONFIG)), DEFAULT_WAIT_TIME, 'No expand config found');
  expandConfig.click();
  newBlankDraftButton.click();
}

async function configIsEmpty(driver){
  const yearSelect = await driver.wait(until.elementLocated(By.css(YEAR_SELECT)), DEFAULT_WAIT_TIME, `Couldn't find year select`);
  const selectedYear = await yearSelect.getText();
  if( selectedYear.length ) error({ driver, message: `Year select isn't empty` });
  return true
}

function clickNewBlankDraftWithConfig(driver){
  const newBlankDraftWithConfigButton = driver.wait(until.elementLocated(By.css(NEW_DRAFT_WITH_CONFIG_BUTTON)), DEFAULT_WAIT_TIME);
  if( !newBlankDraftWithConfigButton ) error({ driver, message: 'No config header buttons found' });
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
  configIsEmpty
}
