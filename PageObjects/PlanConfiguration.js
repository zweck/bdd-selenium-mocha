const { By } = require('selenium-webdriver');

// Page Object Details
const element = By.css('section.plan-configuration');
const name = 'PlanConfiguration'

// elements
const NEW_DRAFT_BUTTONS = 'h3 button';

// Actions
function clickNewBlankDraft(driver){
  const headerButtons = driver.findElement(By.css(NEW_DRAFT_BUTTONS))
  if( !headerButtons.length ) throw( 'No buttons found' );
  headerButtons[1].click();
}

function clickNewBlankDraftWithConfig(driver){
  const headerButtons = driver.findElement(By.css(NEW_DRAFT_BUTTONS))
  if( !headerButtons.length ) throw( 'No buttons found' );
  if( headerButtons.length !== 2 ) throw( 'There should only be 2 buttons' );
  headerButtons[0].click();
}

function completeConfigAtLevel({ low=true, medium=false, high=false }){
  
}

module.exports = { 
  element,
  name,
  clickNewBlankDraft,
  completeConfigAtLevel
}
