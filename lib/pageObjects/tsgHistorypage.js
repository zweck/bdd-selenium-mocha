const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');
const { clickButtonOrLink } = require('../helpers/actions');
const error = require('../error');

// Page Object Details
const rootElement ='section.business-goals-history';
const name = 'TsgHistorypage';

// Actions

/**
 * Action to click on filters button to dispaly published versions'
 * @param {object} context The context for this test
 */

async function clickFilterButton( { driver } ) {
  return await clickButtonOrLink(driver, By.xpath("//button[text()='Filter']"), 'Not able to find Filter button');
}


// Assertions

/**
 * Checks that the Table is present on the History Page
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns true if the table is present, else false
 */
async function historyPageIsPresent( { driver } ) {
  var versionElem = await elementIsPresent(driver, By.className("draft-list-table" ), "No Versions Found");
  if(!versionElem)
  {
    return error({ driver, message: `Couldn't find draft-list-table` });
  }

  const titleDiv = await elementIsPresent(driver, By.className("draft-title") , "Draft Title not found");
  const title = await titleDiv.getText();
  if( title != "History" ) {
    return error({ driver, message: `Couldn't find any Draft title` });
  } 
  return title;
}

async function historyTableIsPresent ({ driver } ){
  return await elementIsPresent(driver, By.css(".fixedDataTableLayout_rowsContainer"), "Couldn't find history table");
  
}

async function checkForHistoryFilters({ driver } ){
  var financialYearWrapperElem = await elementIsPresent(driver, By.css(".financial-year-select.select-wrapper"), "Couldn't find financial year dropdown");
  await financialYearWrapperElem.findElement(By.css(".Select.Select--single.is-clearable.is-searchable"));
  
  var deployedGuWrapperElem = await elementIsPresent(driver, By.css(".deployed-gu-select.select-wrapper"), "Couldn't find deployed geographic unit dropdown");
  await deployedGuWrapperElem.findElement(By.css(".Select.Select--single.is-clearable.is-searchable"));
  
  var deployedCountryWrapperElem = await elementIsPresent(driver, By.css(".deployed-country-select.select-wrapper"), "Couldn't find deployed country dropdown");
  await deployedCountryWrapperElem.findElement(By.css(".Select.Select--single.is-clearable.is-searchable"));
  
  var deployedRegionWrapperElem = await elementIsPresent(driver, By.css(".deployed-region-select.select-wrapper"), "Couldn't find deployed region dropdown");
  return await deployedRegionWrapperElem.findElement(By.css(".Select.Select--single.is-clearable.is-searchable"));
}

/**
 * Checks that the No versions text is present on the History page
 * @param {object} context The context for this test
 * @return {(Error)} if the text is not present
 */
async function noVersionsTextIsPresent( { driver } ) {
  return await elementIsPresent(driver, By.className("draft-list-table" ), "No Versions Found");
}

/** export the PageObjects methods */
module.exports = { 
  rootElement,
  name,
  clickFilterButton,
  historyTableIsPresent,
  historyPageIsPresent,
  checkForHistoryFilters,
  noVersionsTextIsPresent,
};
