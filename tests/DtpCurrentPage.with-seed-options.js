'use strict';
const { By, until } = require('selenium-webdriver');
const storybookTest = require('../storybook-test');
const testClearConfiguration = require('./testClearConfiguration');

module.exports = storybookTest('Page - DTP Current Page', 'with seed options', (driver) => {


  let checkRequired = (selectName, css='') => {
    // have all req fields been selected
    let noSelection = driver.findElements(By.css(`${css}.no-selection`));
    noSelection.then( (driver) => {
      if ( driver.length !== 0 ) {
        let errMessage = selectName ? `${selectName} is empty, perhaps the config data isn\'t loaded` : 'Some required fields haven\'t been completed';
        throw(errMessage);
      }
    });
  }


  driver.wait(until.elementLocated(By.css('.detailed-plan-current-form')), 100, 'Couldn\'t find <DetailedPlanCurrentForm> after 100ms');
  driver.wait(until.elementLocated(By.css('.financial-year-select')), 100, 'Couldn\'t find financial year select after 100ms');
  driver.wait(until.elementLocated(By.css('.planning-level-select')), 100, 'Couldn\'t find planning level select after 100ms');
  driver.wait(until.elementLocated(By.css('.career-track-select')), 100, 'Couldn\'t find career track select after 100ms');
  driver.wait(until.elementLocated(By.css('.org-level-1-select')), 100, 'Couldn\'t find org level 2 select after 100ms');
  driver.wait(until.elementLocated(By.css('.deployed-gu-select')), 100, 'Couldn\'t deployed gu select after 100ms');


  // financial year config
  driver.findElement(By.css('.financial-year-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.financial-year-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let fyOptions = driver.findElement(By.css('.financial-year-select .Select .Select-menu div'));
  fyOptions.click();
  checkRequired('Financial Year', '.financial-year-select');


  // planning level config
  driver.findElement(By.css('.planning-level-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.planning-level-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let planningLevel = driver.findElement(By.css('.planning-level-select .Select .Select-menu #react-select-3--option-2'));
  planningLevel.click();
  checkRequired('Planning Level', '.planning-level-select');


  // career track config
  driver.findElement(By.css('.career-track-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.career-track-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let ctOptions = driver.findElement(By.css('.career-track-select .Select .Select-menu div'));
  ctOptions.click();
  checkRequired('Career Track', '.career-track-select');

  // Contract Type
  driver.findElement(By.css('.contract-basis-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.contract-basis-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let contractBasis = driver.findElement(By.css('.contract-basis-select .Select .Select-menu div'));
  contractBasis.click();
  checkRequired('Contract Type', '.contract-basis-select');

  // Org Level
  driver.findElement(By.css('.org-level-0-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.org-level-0-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let orgLevel = driver.findElement(By.css('.org-level-0-select .Select .Select-menu div'));
  orgLevel.click();
  checkRequired('Org Level', '.org-level-0-select');


  // Deployed GU
  driver.findElement(By.css('.deployed-gu-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.deployed-gu-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let deployedGu = driver.findElement(By.css('.deployed-gu-select .Select .Select-menu div'));
  deployedGu.click();
  checkRequired('Org Level', '.deployed-gu-select');


  // load plan
  driver.findElement(By.css('.configuration button[type=submit]')).click();

  let planElem = driver.findElements(By.css('.plan'));
  planElem.then( (driver) => {
    if ( driver.length === 0 ) {
      throw('The plan hasn\'t been displayed');
    }
  });

  // open first talent action
  const talentActionTitle = driver.findElement(By.css('.accordion-item__title'));
  driver.executeScript('arguments[0].scrollIntoView(true)', talentActionTitle);
  talentActionTitle.click();
  driver.wait(until.elementLocated(By.css('.talent-action-input-table')), 3000, 'Talent action accordion hasn\'t opened or talent action input tabel not present after opening');

  // test promotions out
  const promotionsOutLastLevelFirstInput = driver.findElement(By.css('.fixedDataTableLayout_rowsContainer .fixedDataTableRowLayout_rowWrapper + div > .fixedDataTableRowLayout_rowWrapper:last-child input'));
  const promotionsOutTotalInput = driver.findElement(By.css('.public_fixedDataTableCell_wrap3 .delta'));
  promotionsOutLastLevelFirstInput.clear();
  promotionsOutLastLevelFirstInput.sendKeys('0');

  promotionsOutTotalInput.getText().then( previousRowTotal => {
    promotionsOutLastLevelFirstInput.clear();
    driver.sleep(1000);
    promotionsOutLastLevelFirstInput.sendKeys('100');
    const expected = (parseFloat(previousRowTotal) + 100).toString();
    driver.wait(until.elementTextIs(promotionsOutTotalInput, expected), 5000, 'The promotion value didn\'t increase the row total');
  });

  testClearConfiguration(driver);

  return driver;
});
