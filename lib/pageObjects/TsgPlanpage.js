const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');
const { elementsArePresent } = require('../helpers/locators');
const { clickButtonOrLink } = require('../helpers/actions');


// Page Object Details
const rootElement ='section.business-goals-plan';
const name = 'TsgPlanpage';

// Actions

/**
 * Action to click on Create plan button after specifying the intersections'
 * @param {object} context The context for this test
 */

async function clickCreatePlanButton( { driver } ) {
  return await clickButtonOrLink(driver, By.name("default"), 'Not able to find Create Plan button');
}


// Assertions

/**
 * Checks if plan page has got the elements 
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns true if the elements are present on the page
 */
async function planPageElementIsPresent( { driver } ) {  
  
  const selectLabels = [ 
    'Financial Year :', 
    'Planning Level :', 
    'Contract Type :', 
    'Career Track :', 
    'Org Level 0 :', 
    'Org Level 1 :',
    'Org Level 2 :',
    'Org Level 3 :',
    'Org Level 4 :',
    'Org Level 5 :',
    'Org Level 6 :',
    'Deployed Geographic Unit :',
    'Deployed Country :',
    'Deployed Region :' ];
  const selectWrappers = await elementsArePresent(driver, By.css(".select-wrapper"), "Couldn't find any elements with select-wrapper css");
  if(selectWrappers.length != selectLabels.length)
  {
    throw new Error("Some dropdown elements are missing");
  }
  for(let i in selectWrappers){
    //check for dropdown
    await elementIsPresent(selectWrappers[i], By.css(".Select-control"), "Couldn't find dropdown");

    // //check for label
    const labelElem = await elementIsPresent(selectWrappers[i], By.xpath("label/span"), "Couldn't find label");
    const labelText = await labelElem.getText();
    if(selectLabels.indexOf(labelText) < 0)
    {
      throw new Error("Mising element with label" + labelText );
    }
  }


  //check for draft name textbox
  await elementIsPresent(driver, By.id("draftName"), "Couldn't find draft name field");

  return true;
}


/** export the PageObjects methods */
module.exports = { 
  rootElement,
  name,
  planPageElementIsPresent,
  clickCreatePlanButton
};
