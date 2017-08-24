const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');
const { clickButtonOrLink } = require('../helpers/actions');
const error = require('../error');

// Page Object Details
const rootElement ='section.business-goals-drafts';
const name = 'TsgDraftpage';

// Actions

/**
 * Action to click on Draft nav link and verify the elements'
 * @param {object} context The context for this test
 */
async function clickDraftlink( { driver } ) {
  await clickButtonOrLink(driver, By.linkText("Drafts"), 'Not able to find Drafts link');
  return true;
}

// Assertions

/**
 * Checks that the Table is present on the DraftPage
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns true if the table is present, else false
 */
async function draftTableIsPresent( { driver } ) {
  await elementIsPresent(driver, By.className("draft-list-table" ), "No Draft table found ");
  const title = await elementIsPresent(driver, By.className("draft-title") , "Draft Title not found").getText();
  if( title != "Drafts" ) {
    return error({ driver, message: `Couldn't find any Draft title` });
  }
  await elementIsPresent(driver, By.className("fixedDataTableRowLayout_rowWrapper"), "couldn't find any header").getText();
  return true;
}

async function editIconPresent ({ driver } ){
  const row = await elementIsPresent(driver, By.css(".fixedDataTableRowLayout_rowWrapper:nth-child(1)"), "Couldn't find any 1st row in the draft table");
  await row.findElement(By.css(".ion-edit"));
  return true;
}

async function deleteIconPresent ({ driver } ){
  const row = await elementIsPresent(driver, By.css(".fixedDataTableRowLayout_rowWrapper:nth-child(1)"), "Couldn't find any 1st row in the draft table");
  await row.findElement(By.css(".public_fixedDataTableCell_cellContent"));
  return true;
}

async function copydraftIconPresent ({ driver } ){
  const row = await elementIsPresent(driver, By.css(".fixedDataTableRowLayout_rowWrapper:nth-child(1)"), "Couldn't find any 1st row in the draft table");
  await row.findElement(By.className("icon ion-ios-copy copy-icon"));
  return true;

}

/** export the PageObjects methods */
module.exports = {
  rootElement,
  name,
  draftTableIsPresent,
  clickDraftlink,
  editIconPresent,
  deleteIconPresent,
  copydraftIconPresent,
};
