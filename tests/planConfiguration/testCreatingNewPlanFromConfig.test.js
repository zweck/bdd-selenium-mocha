const { hasLoaded } = require('../../lib/helpers');
const { goToBusinessGoalDraft } = require('../../lib/navigators');
const { 
  element, 
  name, 
  clickNewBlankDraft, 
  completeConfigAtLevel, 
  configIsEmpty 
} = require('../../PageObjects/PlanConfiguration');

module.exports = {
  name,
  element,
  describe: 'Creating a new draft from the config when a draft is loaded',
  tests: [{
    it: 'should show the Clear Config button in TSG when New Blank Draft is clicked',
    sequence: [
      goToBusinessGoalDraft,
      hasLoaded,
      clickNewBlankDraft,
    ],
    asserts: [
      configIsEmpty,
    ]
  }]
}
