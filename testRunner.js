'use strict';
const assert = require('assert');
const { Builder, By, promise, until } = require('selenium-webdriver');
const chalk = require('chalk');
const config = require('./config.json');
const allTests = require('./sequences');
const { screenshot } = require('./lib/utils.js');

promise.USE_PROMISE_MANAGER = false;

console.log(chalk.black.bgGreen.bold(`     Running Sequence Tests     `))

describe( 'Test runner', () => {

  let driver;

  before(async () => {
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720)
  });

  after(async function() {
    await driver.quit();
  });

  afterEach(function() {
    if(this.currentTest.state === 'failed') {
      screenshot(this.currentTest, driver);
    }
  });

  Object.keys( allTests ).forEach( suite => {
    let testSuite = allTests[suite];
    describe( testSuite.describe, () => {
      testSuite.tests.forEach( test => {
        it( test.it, async () => {
          for ( let step of test.sequence ){
            await step( driver, { rootElement: testSuite.rootElement, name: testSuite.name });
          }

          for ( let assertion of test.asserts ){
            let result = await assertion( driver );
            assert.ok( result );
          }
        });
      });
    });
  });
});
