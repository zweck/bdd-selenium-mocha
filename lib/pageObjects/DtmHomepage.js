/**
 * Page object that represents the DTM Home page
 * @module pageObject/DtmHomePage
 */

const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');
const error = require('../error');

// Page Object Details
const rootElement ='detailed-plan-home';
const name = 'DtmHomepage';

/**
 * Checks that the Graph is present on the DTM HOMEPAGE
 * @param {object} context The context for this test
 * @return {(Error|boolean)} returns either an error is the plan name object has length or returns true
 */
async function graphIsPresent( { driver } ) {
  const graph = await elementIsPresent(driver, By.className("detailed-plan-home__graph"), "Couldn't find the graph");
  const headerTextGraph = await graph.findElement(By.xpath("//h2[text()='Forecast vs Actual']" , "Couldn't find any text Forecast vs Actual for Graph"));
  
  if(!headerTextGraph) {
    return error({ driver, message: `Couldn't find any text Forecast vs Actual for Graph` });
  } else {
    return true;
  }
}
async function tableIsPresent({ driver } ) {

  const table = await elementIsPresent(driver, By.className("detailed-plan-home__table"), "Couldn't find any table");
  const headerTextTable = await table.findElement(By.xpath("//h2[text()='Forecast vs Actual']", "Couldn't find any text Planned vs Actual for Table"));
  
  if( !headerTextTable ) {
    return error({ driver, message: `Couldn't find any text Forecast vs Actual for Graph` });
  }

  await table.findElement(By.xpath("//h3[text()='Managed Attrition']"));

  await table.findElement(By.xpath("//h3[text()='Unmanaged Attrition']"));

  await table.findElement(By.xpath("//h3[text()='Promotions Out']"));

  await table.findElement(By.xpath("//h3[text()='Joiners']"));

  return true;
}

module.exports = {
  rootElement,
  name,
  graphIsPresent,
  tableIsPresent
};
