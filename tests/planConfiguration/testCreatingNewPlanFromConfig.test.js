const { hasLoaded } = require('../../lib/helpers');
const { goToBusinessGoalDraft } = require('../../lib/navigators');
const { 
  element, 
  name, 
  clickNewBlankDraft, 
  completeConfigAtLevel, 
  configIsEmpty ,
  clearConfigButtonExists
} = require('../../PageObjects/PlanConfiguration');

module.exports = {
  name,
  element,
  describe: 'Creating a new draft from the config when a draft is loaded',
  tests: [{
    it: 'should clear the config when new blank draft is clicked',
    sequence: [
      goToBusinessGoalDraft,
      hasLoaded,
      clickNewBlankDraft,
    ],
    asserts: [
      configIsEmpty,
    ]
  },
  {
    it: 'should show the Clear Config button in TSG when New Blank Draft is clicked',
    sequence: [
      goToBusinessGoalDraft,
      hasLoaded,
      clickNewBlankDraft,
    ],
    asserts: [
      configIsEmpty,
      clearConfigButtonExists
    ]
  }]
}
