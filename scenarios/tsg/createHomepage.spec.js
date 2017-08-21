const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  goToBusinessGoalHome } = require('../../lib/helpers/navigators');
const { 
  rootElement, 
  name, 
  graphIsPresent,
  tableIsPresent,
} = require('../../lib/pageObjects/tsgHomepage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to homepage and identify the elements',
  tests: [
    {
      it: 'should show graph and Table are present on the homepage',
      sequence: [
        logInAsAdminUser,
        goToBusinessGoalHome,
      ],
      asserts: [
        graphIsPresent,
        tableIsPresent,
      ]
    },
  ]
};