const { elementIsPresent } = require('./locators');

async function clickButton(driver, locator, msg) {
  const btn = await elementIsPresent(
    driver, locator, msg
  );

  btn.click();
}

module.exports = {
  clickButton
};


