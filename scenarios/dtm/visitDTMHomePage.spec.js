const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  navigateToDtmDraftPage, navigateToDtmHomePage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  graphIsPresent,
  tableIsPresent,
} = require('../../lib/pageObjects/DtmHomepage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to DTM homepage and identify the elements',
  tests: [
    {
      it: 'should show graph and Table are present on the DTM homepage',
      sequence: [
        logInAsAdminUser,
        navigateToDtmDraftPage, // need to navigate away from home page before being able to navigate back
        navigateToDtmHomePage,
      ],
      asserts: [
        graphIsPresent,
        tableIsPresent,
      ]
    },
  ]
};
