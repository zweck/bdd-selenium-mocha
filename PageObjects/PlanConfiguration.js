const { By } = require('selenium-webdriver');

// Page Object Details
const element = By.css('section.plan-configuration');
const name = 'PlanConfiguration'

// Actions
function clickNewBlankDraft(){
  
}

module.exports = { 
  element,
  name,
  clickNewBlankDraft
}
