const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const { navigateToTsgPlanPage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  planPageElementIsPresent ,
  
} = require('../../lib/pageObjects/TsgPlanpage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to Plan page and verify the elements on the page ',
  tests: [
    {
      it: 'Should verify the elements on the page',
      sequence: [
        logInAsAdminUser,
        navigateToTsgPlanPage,
      ],
      asserts: [
        planPageElementIsPresent,
      ]
    },
  ]
};
