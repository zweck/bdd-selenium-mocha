/**
 * Page object that represents the TSG Home page
 * @module pageObject/TsgHomePage
 */

const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');
const { clickButtonOrLink } = require('../helpers/actions');
const error = require('../error');

// Page Object Details
const rootElement ='section.business-goals-home';
const name = 'tsgHomepage';

// Actions

/**
 * Action to click on Home nav link
 * @param {object} context The context for this test
 * * @ return {Error} returns an error if the link is not clicked, else true
 */
async function clickHomelink( { driver } ) {
  await clickButtonOrLink(driver, By.linkText("HOME"), 'Not able to find Home link');
}

  
// Assertions

/**
 * Checks that the Graph and Table are present on the HOMEPAGE
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns either an error is the plan name object has length or returns true
 */
async function graphIsPresent( { driver } ) {
  const graph = await elementIsPresent(driver, By.className("business-goals-home__graph"), "Couldn't find the graph");
  const headerTextGraph = await graph.findElement(By.xpath("//h2[text()='Planned vs Actual']" , "Couldn't find any text Planned vs Actual for Graph"));
  const graphText = await headerTextGraph.getText();

  if( graphText != "Planned vs Actual" ) {
    return error({ driver, message: `Couldn't find any text Planned vs Actual for Graph` });
  } else {
    return true;
  }
}
async function tableIsPresent({ driver } ) {
  
  const table = await elementIsPresent(driver, By.className("business-goals-home__table"), "Couldn't find any table");
  const headerTextTable = await table.findElement(By.xpath("//h2[text()='Planned vs Actual']", "Couldn't find any text Planned vs Actual for Table"));
  const tableText = await headerTextTable.getText();
  if( tableText != "Planned vs Actual" ) {
    return error({ driver, message: `Couldn't find any text Planned vs Actual for Graph` });
  } 
  
  await table.findElement(By.xpath("//h3[text()='Promotions Out']"));
  
  await table.findElement(By.xpath("//h3[text()='Managed Attrition']"));
 
  await table.findElement(By.xpath("//h3[text()='Unmanaged Attrition']"));

  await table.findElement(By.xpath("//h3[text()='Total Attrition']"));
  
  await table.findElement(By.xpath("//h3[text()='Pyramid']"));

  await table.findElement(By.xpath("//h3[text()='Overall Growth']"));
 
  await table.findElement(By.xpath("//h3[text()='Chargeability']")); 

  return true;
}

module.exports = { 
  rootElement,
  name,
  graphIsPresent,
  tableIsPresent,
  clickHomelink, 
};
