const { By } = require('selenium-webdriver');
const { goToBusinessGoalHome } = require('../helpers/navigators');
const { elementIsPresent } = require('../helpers/locators');
const error = require('../error');


async function logInAsAdminUser({ proxy, driver }) {
  proxy.user = process.env.ADMIN_USER;
  await goToBusinessGoalHome({ driver });
  const userBadge = await elementIsPresent(driver, By.className("user-badge"), "Couldn't find the text Logged in as: admin");
  const badgeText = await userBadge.getText();

  if( badgeText != "Logged in as: admin" ) {
    return error({ driver, message: `UserBadge not present` });
  }
  return true;
}

module.exports = { 
  logInAsAdminUser
};
