'use strict';
const assert = require('assert');
const { Builder, By, promise, until } = require('selenium-webdriver');
promise.USE_PROMISE_MANAGER = false;

describe( 'Test runner', () => {

  let driver;

  // We use this to tear down chrome 
  // at the end of every test
  beforeEach(async () => {
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720)
  });

  afterEach(() => {
    driver.quit();
  });

  describe( 'example test', () => {
    it( 'should pass this example test for fun', () => {
      assert.ok(true);
    });
  });

});
