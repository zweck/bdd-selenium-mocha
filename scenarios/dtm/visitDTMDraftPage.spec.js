const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  navigateToDtmDraftPage } = require('../../lib/pageObjects/Navigation');
const { 
  rootElement, 
  name, 
  draftTableIsPresent,
  editIconPresent,
  deleteIconPresent,
  copydraftIconPresent,
} = require('../../lib/pageObjects/DtmDraftpage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to DTM Draft page and identify the headers in the table',
  tests: [
    {
      it: 'should show Drafts table in DTM with relevant headers',
      sequence: [
        logInAsAdminUser,
        navigateToDtmDraftPage ],
      asserts: [
        draftTableIsPresent,
        editIconPresent,
        deleteIconPresent,
        copydraftIconPresent,
      ]
    },
  ]
};
