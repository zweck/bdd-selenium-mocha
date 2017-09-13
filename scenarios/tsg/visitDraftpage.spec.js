const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  navigateToTsgDraftPage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  draftTableIsPresent,
  editIconPresent,
  deleteIconPresent,
  copydraftIconPresent,
} = require('../../lib/pageObjects/tsgDraftpage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to Draft page and identify the headers in the table',
  tests: [
    {
      it: 'should show Drafts table with relevant headers',
      sequence: [
        logInAsAdminUser,
        navigateToTsgDraftPage,
      ],
      asserts: [
        draftTableIsPresent,
        editIconPresent,
        deleteIconPresent,
        copydraftIconPresent,
      ]
    },
  ]
};
