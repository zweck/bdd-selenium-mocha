'use strict';
const assert = require('assert');
const { Builder, By, promise, until } = require('selenium-webdriver');
const { screenshot } = require('../lib/utils.js');

promise.USE_PROMISE_MANAGER = false;

describe( 'Test runner', () => {

  let driver;

  before(async () => {
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720)
  });

  after(() => {
    driver.quit();
  });

  afterEach(async function() {
    await screenshot(this.currentTest, driver);
  });

  describe( 'example test', () => {
    it( 'should pass this example test for fun', () => {
      assert.ok(true);
    });
  });

});
