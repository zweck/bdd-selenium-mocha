const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  navigateToTsgDraftPage, navigateToTsgHomePage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  graphIsPresent,
  tableIsPresent,
} = require('../../lib/pageObjects/TsgHomepage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to homepage and identify the elements',
  tests: [
    {
      it: 'should show graph and Table are present on the TSG homepage',
      sequence: [
        logInAsAdminUser,
        navigateToTsgDraftPage, // need to navigate away from home page before being able to navigate back
        navigateToTsgHomePage,
      ],
      asserts: [
        graphIsPresent,
        tableIsPresent,
      ]
    },
  ]
};
