/* eslint-env mocha */
const { Builder, promise, By } = require('selenium-webdriver');
const { screenshot } = require('../../../lib/utils.js');
const Proxy = require('../../../lib/proxy.js');
const { logInAsAdminUser } = require('../../../lib/helpers/userLogin');
const { pageHasLoadedWithPlan } = require('../../../lib/helpers/plans');
const { goToBusinessGoalDraft } = require('../../../lib/helpers/navigators');
const { expandConfigAndClickNewBlankDraft } = require('../../../lib/pageObjects/PlanConfigurationForm');
const { selectOption } = require('../../../lib/helpers/actions');

promise.USE_PROMISE_MANAGER = false;

describe('Test helper actions', () => {

  let driver;
  let proxy = new Proxy();

  before(async () => {
    await proxy.start();
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720);

    await logInAsAdminUser({ driver, proxy });
  });

  after(async () => {
    await driver.quit();
    await proxy.stop();
  });

  beforeEach(async function() {
    await goToBusinessGoalDraft({ driver });
    await pageHasLoadedWithPlan({ driver });
    await expandConfigAndClickNewBlankDraft({ driver });
  });

  afterEach(function() {
    if(this.currentTest.state === 'failed') {
      screenshot(this.currentTest, driver);
    }
  });

  describe('Test selectOption action', () => {
    it('should select an option', async () => {
      return await selectOption(
        driver, By.css('.financial-year-select'), '2017', `Couldn't select FY 2017`
      );
    });
  });
});
