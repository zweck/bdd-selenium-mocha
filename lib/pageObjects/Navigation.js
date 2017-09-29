/**
* Page object that represents the page navigation
* @module pageObject/Navigation
*/
const { By } = require('selenium-webdriver');
const { elementIsPresent } = require('../helpers/locators');

// Page Object Details
const rootElement ='.main-nav';
const name = 'navigation';

const _tsgNavContainer = (driver) => {
  return elementIsPresent(driver, By.xpath('//div[contains(.//span, "Talent Strategy Guidelines")]'));
};

const _dtmNavContainer = (driver) => {
  return elementIsPresent(driver, By.xpath('//div[contains(.//span, "Detailed Talent Modelling")]'));
};

async function _draftPageHasLoaded(driver) {
  return await elementIsPresent(
    driver, By.css(".fixedDataTableLayout_main"), `Couldn't find Drafts table on page`
  );
}

/**
 * Action to click on TSG Home nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToTsgHomePage( { driver } ) {
  const tsgNav = await _tsgNavContainer(driver);
  const link = await elementIsPresent(tsgNav, By.xpath("//a[text()='Home']"), 'Coud not find TSG Home link');
  return await link.click();
}

/**
 * Action to click on TSG Draft nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToTsgDraftPage( { driver } ) {
  const tsgNav = await _tsgNavContainer(driver);
  const link = await elementIsPresent(tsgNav, By.xpath("//a[text()='Drafts']"), 'Could not find TSG Drafts link');
  await link.click();
  return await _draftPageHasLoaded(driver);
}

/**
 * Action to click on TSG Plan nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToTsgPlanPage( { driver } ) {
  const tsgNav = await _tsgNavContainer(driver);
  const link = await elementIsPresent(tsgNav, By.xpath("//a[text()='Plan']"), 'Could not find TSG Plan link');
  return await link.click();
}

/**
 * Action to click on TSG History nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToTsgHistoryPage( { driver } ) {
  const tsgNav = await _tsgNavContainer(driver);
  const link = await elementIsPresent(tsgNav, By.xpath("//a[text()='History']"), 'Could not find TSG History link');
  return await link.click();
}

/**
 * Action to click on DTM Home nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToDtmHomePage( { driver } ) {
  const dtmNav = await _dtmNavContainer(driver);
  const link = await elementIsPresent(dtmNav, By.css("a[href='/detailed-plan']"), 'Could not find DTM Home link');
  return await link.click();
}

/**
 * Action to click on DTM Draft nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToDtmDraftPage( { driver } ) {
  const dtmNav = await _dtmNavContainer(driver);
  const link = await elementIsPresent(dtmNav, By.css("a[href='/detailed-plan/drafts']"), 'Could not find DTM Drafts link');
  await link.click();
  return await _draftPageHasLoaded(driver);
}

/**
 * Action to click on DTM Plan nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToDtmPlanPage( { driver } ) {
  const dtmNav = await _dtmNavContainer(driver);
  const link = await elementIsPresent(dtmNav, By.xpath("//a[text()='Plan']"), 'Could not find DTM Plan link');
  return await link.click();
}

/**
 * Action to click on DTM History nav link
 * @param {object} context The context for this test
 * @throws an error if the element is not found or clickable
 */
async function navigateToDtmHistoryPage( { driver } ) {
  const dtmNav = await _dtmNavContainer(driver);
  const link = await elementIsPresent(dtmNav, By.xpath("//a[text()='History']"), 'Could not find DTM History link');
  return await link.click();
}

module.exports = { 
  rootElement,
  name,
  navigateToTsgHomePage,
  navigateToTsgDraftPage,
  navigateToTsgPlanPage,
  navigateToTsgHistoryPage,
  navigateToDtmHomePage,
  navigateToDtmDraftPage,
  navigateToDtmPlanPage,
  navigateToDtmHistoryPage,
};
