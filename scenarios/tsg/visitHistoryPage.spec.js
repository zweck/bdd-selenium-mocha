const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  navigateToTsgHistoryPage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  historyPageIsPresent,
  historyTableIsPresent,
  clickFilterButton,
  checkForHistoryFilters,
} = require('../../lib/pageObjects/TsgHistorypage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to History page and identify the elements on the page -- ',
  tests: [
    {
      it: 'should show the dropdown elements with a filter button',
      sequence: [
        logInAsAdminUser,
        navigateToTsgHistoryPage,
      ],

      asserts: [
        historyPageIsPresent,
      ]
    },
    {
      it: 'Clicking on filter button should show Published versions created by the user',
      sequence: [
        logInAsAdminUser,
        navigateToTsgHistoryPage,
        clickFilterButton
      ],

      asserts: [  
        historyTableIsPresent,
      ],

    },
    {
      it: 'Check the dropdowns are present on history page',
      sequence: [
        logInAsAdminUser,
        navigateToTsgHistoryPage, 
      ],
      asserts: [  
        checkForHistoryFilters,
      ],

    },
  ]
};


