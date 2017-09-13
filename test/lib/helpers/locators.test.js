/* eslint-env mocha */
const { Builder, promise, By } = require('selenium-webdriver');
const { screenshot } = require('../../../lib/utils.js');
const Proxy = require('../../../lib/proxy.js');
const { logInAsAdminUser } = require('../../../lib/helpers/userLogin');
const { pageHasLoadedWithPlan } = require('../../../lib/helpers/plans');
const { goToBusinessGoalDraft } = require('../../../lib/helpers/navigators');
const { expandConfig } = require('../../../lib/pageObjects/PlanConfigurationForm');
const { optionIsSelected } = require('../../../lib/helpers/locators');

promise.USE_PROMISE_MANAGER = false;

describe('Test helper locators', () => {

  let driver;
  let proxy = new Proxy();

  before(async () => {
    await proxy.start();
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720);
  });

  after(async () => {
    await driver.quit();
    await proxy.stop();
  });

  afterEach(function() {
    if(this.currentTest.state === 'failed') {
      screenshot(this.currentTest, driver);
    }
  });

  describe('Test optionIsSelected locator', () => {
    it('should locate a selected option', async () => {
      await logInAsAdminUser({ driver, proxy });
      await goToBusinessGoalDraft({ driver });
      await pageHasLoadedWithPlan({ driver });
      await expandConfig({ driver });

      return await optionIsSelected(
        driver, 
        By.css('.financial-year-select'),
        'FY 2017',
        `Couldn't find year selected with FY 2017`
      );
    });
  });
});
