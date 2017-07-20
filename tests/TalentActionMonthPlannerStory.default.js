'use strict';
const { By, until, ActionSequence } = require('selenium-webdriver');
const storybookTest = require('../storybook-test');

module.exports = storybookTest('Component - TalentActionMonthPlanner', 'single line', (driver) => {
  driver.wait(until.elementLocated(By.css('.horizontal-scroll-control')), 100, 'Couldn\'t find <HorizontalScrollControl> after 100ms');
  driver.wait(until.elementLocated(By.css('.horizontal-scroll-control button.right-arrow')), 100, 'Couldn\'t find <HorizontalScrollControl> right arrow button after 100ms');

  let rightArrow = driver.findElement(By.css('.horizontal-scroll-control button.right-arrow'));
  let leftArrow = driver.findElement(By.css('.horizontal-scroll-control button.left-arrow'));
  rightArrow.click();

  let hasMovedFromLeftZero = driver.findElements(By.css(`.left-position-0`));
  hasMovedFromLeftZero.then( (driver) => {
    if ( driver.length !== 0 ) {
      throw('The right scroll button didn\'t scroll the element');
    }
  });

  leftArrow.click();

  hasMovedFromLeftZero.then( (driver) => {
    if ( driver.length === 1 ) {
      throw('The left scroll button didn\'t scroll the element');
    }
  });

  new ActionSequence(driver).mouseMove(rightArrow).mouseDown().perform();
  driver.wait(until.elementLocated(By.css('.right-scroll-end')), 10000, 'Didn\'t scroll all the way to the right after 10s');
  new ActionSequence(driver).mouseMove(rightArrow).mouseUp().perform();

  return driver;
});
