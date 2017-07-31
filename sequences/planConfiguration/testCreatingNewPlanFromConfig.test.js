const { pageHasLoadedWithPlan } = require('../../lib/helpers');
const { goToBusinessGoalDraft } = require('../../lib/navigators');
const { 
  rootElement, 
  name, 
  clickNewBlankDraft, 
  configIsEmpty ,
  clearConfigButtonExists
} = require('../../PageObjects/PlanConfiguration');

module.exports = {
  name,
  rootElement,
  describe: 'Creating a new draft TSG from the config when a draft is loaded',
  tests: [
    {
      it: 'should clear the config when new blank draft is clicked',
      sequence: [
        goToBusinessGoalDraft,
        pageHasLoadedWithPlan,
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
        pageHasLoadedWithPlan,
        clickNewBlankDraft,
      ],
      asserts: [
        configIsEmpty,
        clearConfigButtonExists
      ]
    }
  ]
};
