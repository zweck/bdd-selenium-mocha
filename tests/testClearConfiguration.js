'use strict';
const { By, until } = require('selenium-webdriver');

const testClearConfiguration = (driver) => {
  const cancelButton = driver.findElement(By.css('button.clear-form'));
  cancelButton.click();
  let planElem = driver.wait(driver.findElements(By.css('.plan')), 200);
  planElem.then( (driver) => {
    if ( driver.length > 0 ) {
      throw('The plan hasn\'t been hidden');
    }
  });
}

module.exports = testClearConfiguration;
