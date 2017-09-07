const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const { pageHasLoadedWithPlan } = require('../../lib/helpers/plans');
const { goToBusinessGoalDraft } = require('../../lib/helpers/navigators');
const { 
  rootElement, 
  name, 
  expandConfigAndClickNewBlankDraft,
  configIsEmpty ,
  clearConfigButtonExists
} = require('../../lib/pageObjects/PlanConfigurationForm');

module.exports = {
  name,
  rootElement,
  describe: 'Creating a new draft TSG from the config when a draft is loaded',
  tests: [
    {
      it: 'should clear the config when new blank draft is clicked',
      sequence: [
        logInAsAdminUser,
        goToBusinessGoalDraft,
        pageHasLoadedWithPlan,
        expandConfigAndClickNewBlankDraft,
      ],
      asserts: [
        configIsEmpty,
      ]
    },
    {
      it: 'C273601 should show the Clear Config button in TSG when New Blank Draft is clicked',
      sequence: [
        logInAsAdminUser,
        goToBusinessGoalDraft,
        pageHasLoadedWithPlan,
        expandConfigAndClickNewBlankDraft,
      ],
      asserts: [
        configIsEmpty,
        clearConfigButtonExists,
      ]
    }
  ]
};
