/* eslint-env mocha */
const { Builder, promise } = require('selenium-webdriver');
const { screenshot } = require('../../../lib/utils.js');
const Proxy = require('../../../lib/proxy.js');
const { logInAsAdminUser } = require('../../../lib/helpers/userLogin');
const { pageHasLoadedWithPlan } = require('../../../lib/helpers/plans');
const { goToBusinessGoalDraft } = require('../../../lib/helpers/navigators');
const { expandConfigAndClickNewBlankDraft } = require('../../../lib/pageObjects/PlanConfigurationForm');
const { selectPlanYearOption } = require('../../../lib/helpers/plans');

promise.USE_PROMISE_MANAGER = false;

describe('Test plan helper functions', () => {

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

  describe('Test selectPlanYearOption action', () => {
    it('should select a plan year option', async () => {
      return await selectPlanYearOption( { driver, value: '2017' });
    });
  });
});
