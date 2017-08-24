const { logInAsAdminUser } = require('../../lib/helpers/userLogin');
const {  goToBusinessGoalDrafts } = require('../../lib/helpers/navigators');
const {
  rootElement,
  name,
  draftTableIsPresent,
  editIconPresent,
  deleteIconPresent,
  copydraftIconPresent,
} = require('../../lib/pageObjects/TsgDraftpage');

module.exports = {
  name,
  rootElement,
  describe: 'Go to Draft page and identify the headers in the table',
  tests: [
    {
      it: 'should show Drafts table with relevant headers',
      sequence: [
        logInAsAdminUser,
        goToBusinessGoalDrafts,
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
