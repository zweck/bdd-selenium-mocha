'use strict';
const assert = require('assert');
const { Builder, By, promise, until } = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const config = require('../../config.json');
const { hasLoaded } = require('../../lib/helpers');
const { element, name, clickNewBlankDraft, completeConfigAtLevel } = require('../../PageObjects/PlanConfiguration');
const { goToBusinessGoalDraft } = require('../../lib/navigators');

promise.USE_PROMISE_MANAGER = false;

const { PROXY_PORT } = config;

describe('Creating new plan from config', () => {

  let driver;

  // We use this to tear down chrome 
  // at the end of every test
  beforeEach(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .build();
  });

  afterEach(() => {
    driver.quit();
  });

  describe('Creating a new draft from the config when a draft is loaded', () => {

    it('should show the Clear Config button in TSG when New Blank Draft is clicked', async () => {

      await goToBusinessGoalDraft(driver);
      await hasLoaded(driver, { element, name });
      // clickNewBlankDraft(driver);
      assert.equal("", 'https://www.google.com/#q=webdriver');

    });

  });

});
