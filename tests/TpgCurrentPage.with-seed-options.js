'use strict';
const { By, until } = require('selenium-webdriver');
const storybookTest = require('../storybook-test');
const testClearConfiguration = require('./testClearConfiguration');

module.exports = storybookTest('Page - TPG Current Page', 'with seed options', (driver) => {


  let checkRequired = (selectName, css) => {
    css = css || ``;
    // have all req fields been selected

    let noSelection = driver.findElements(By.css(`${css}.no-selection`));
    noSelection.then( (driver) => {
      if ( driver.length !== 0 ) {
        let errMessage = selectName ? `${selectName} is empty, perhaps the config data isn\'t loaded` : 'Some required fields haven\'t been completed';
        throw(errMessage);
      }
    });
  }

  driver.wait(until.elementLocated(By.css('.business-goals-current-form')), 5000, 'Couldn\'t find <CurrentForm> after 5000ms');
  driver.wait(until.elementLocated(By.css('.financial-year-select')), 5000, 'Couldn\'t find financial year select after 5000ms');
  driver.wait(until.elementLocated(By.css('.planning-level-select')), 5000, 'Couldn\'t find planning level select after 5000ms');
  driver.wait(until.elementLocated(By.css('.org-level-1-select')), 5000, 'Couldn\'t find org level 2 select after 5000ms');
  driver.wait(until.elementLocated(By.css('.deployed-gu-select')), 5000, 'Couldn\'t find deployed gu select after 5000ms');
  driver.wait(until.elementLocated(By.css('.career-track-select')), 5000, 'Couldn\'t find career track select after 5000ms');

  // financial year config
  driver.findElement(By.css('.financial-year-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.financial-year-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let fyOptions = driver.findElement(By.css('.financial-year-select .Select .Select-menu div'));
  fyOptions.click();
  checkRequired('Financial Year', '.financial-year-select');


  // planning level config
  driver.findElement(By.css('.planning-level-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.planning-level-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let planningLevel = driver.findElement(By.css('.planning-level-select .Select .Select-menu div'));
  planningLevel.click();
  checkRequired('Planning Level', '.planning-level-select');

  // Career Track
  driver.findElement(By.css('.career-track-select .Select')).click();
  driver.wait(until.elementLocated(By.css('.career-track-select .Select-option')), 5000, 'Clicking the select hasn\'t triggered the drop down');

  let careerTrack = driver.findElement(By.css('.career-track-select .Select .Select-menu div'));
  careerTrack.click();
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
  const heightOfPlanningConfigHeader = 48;
  driver.executeScript(`arguments[0].scrollIntoView(true); window.scrollBy(0, -${heightOfPlanningConfigHeader})`, talentActionTitle);
  talentActionTitle.click();
  driver.wait(until.elementLocated(By.css('.talent-action-planner')), 3000, 'Talent action accordion hasn\'t opened or TalentActionPlanner not present after opening');

  testClearConfiguration(driver);

  return driver;
});
