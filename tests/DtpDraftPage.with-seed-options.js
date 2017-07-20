'use strict';
const { By, until } = require('selenium-webdriver');
const storybookTest = require('../storybook-test');

module.exports = storybookTest('Page - DTP Draft Page', 'with seed options', (driver) => {

  driver.wait(until.elementLocated(By.css('.detailed-plan-draft')), 5000, 'Couldn\'t find draft page select after 5000ms');
  driver.wait(until.elementLocated(By.css('.financial-year-select')), 5000, 'Couldn\'t find financial year select after 5000ms');
  driver.wait(until.elementLocated(By.css('.deployed-gu-select')), 5000, 'Couldn\'t find deployed gu select after 5000ms');
  driver.wait(until.elementLocated(By.css('.deployed-country-select')), 5000, 'Couldn\'t find deployed country select after 5000ms');
  driver.wait(until.elementLocated(By.css('.deployed-region-select')), 5000, 'Couldn\'t find deployed gu select after 5000ms');

  let listElem = driver.findElements(By.css('.draft-list-table'));
  listElem.then( (driver) => {
    if ( driver.length === 0 ) {
      throw('The list hasn\'t been displayed');
    }
  });

  // load form
  driver.wait(until.elementLocated(By.css('.clickable-cell')), 15000, 'Couldn\'t find a cell to click after 10000ms');
  driver.findElement(By.css('.clickable-cell')).click()

  driver.wait(until.elementLocated(By.css('.detailed-plan-current')), 15000, 'Not taken to the Detailed Plan Current page after 10000ms');

  return driver;
});
