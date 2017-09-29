const { By } = require('selenium-webdriver');
const { elementIsPresent, elementsArePresent } = require('../helpers/locators');
const error = require('../error');

// Page Object Details
const rootElement ='section.business-goals-drafts';
const name = 'DtmDraftpage';

/**
 * Checks that the Table is present on the DTM  DraftPage
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns true if the table is present, else false
 */
async function draftTableIsPresent( { driver } ) {
  await elementIsPresent(driver, By.className("draft-list-table" ), "No Draft table found ");
  const title = await elementIsPresent(driver, By.className("draft-title") , "Draft Title not found");
  const text = await title.getText();
  if( text != "Drafts" ) {
    return error({ driver, message: `Couldn't find any Draft title` });
  }
  return await elementIsPresent(driver, By.className("public_fixedDataTable_header"), "couldn't find any header");
}

async function getDraftTableFirstRow( { driver } ) 
{
  return elementIsPresent(driver, By.css(".fixedDataTableRowLayout_rowWrapper:nth-child(1)"), "Couldn't find any 1st row in the draft table");
}
async function editIconPresent ({ driver } ){
  const row = await getDraftTableFirstRow( driver );
  return await row.findElement(By.css(".ion-edit"));
}

async function deleteIconPresent ({ driver } ){
  const row = await getDraftTableFirstRow( driver );
  const rowElems = await elementsArePresent(row, By.css(".public_fixedDataTableCell_cellContent"), "Couldn't find row elements");
  let found = false;
  for(let i in rowElems){
    let text = await rowElems[i].getText();    
    if(text === '✖' || text === 'x' || text === 'X'){
      found = true;
    }
  }
  if(!found)
  {
    error({ driver, message: `Couldn't find any DELETE icons` });
  }
  return true;
}

async function copydraftIconPresent ({ driver } ){
  const row = await getDraftTableFirstRow( driver );
  return await row.findElement(By.className("icon ion-ios-copy copy-icon"));
}

/** export the PageObjects methods */
module.exports = {
  rootElement,
  name,
  draftTableIsPresent,
  getDraftTableFirstRow,
  editIconPresent,
  deleteIconPresent,
  copydraftIconPresent,
};
