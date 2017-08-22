/* eslint-env mocha */
const path = require('path');
const assert = require( 'assert' );
const { Builder, promise, } = require( 'selenium-webdriver' );
const chalk = require( 'chalk' );
const allTests = require( './scenarios' );
const { screenshot } = require('./lib/utils.js');
const Proxy = require('./lib/proxy.js');

promise.USE_PROMISE_MANAGER = false;

describe( 'Scenario test runner', () => {

  let driver;
  let proxy = new Proxy();

  before(async () => {
    await proxy.start();
    driver = await new Builder()
      .forBrowser( 'chrome' )
      .build();
    driver.manage().window().setSize(1280, 720);
  });

  after(async function() {
    await driver.quit();
    await proxy.stop();
  });

  afterEach(function() {
    if(this.currentTest.state === 'failed') {
      screenshot(this.currentTest, driver);
    }
  });

  const runTestSuite = (testSuite) => {
    describe( testSuite.describe, () => {
      testSuite.tests.forEach( test => {
        it( test.it, async () => {
          for ( let step of test.sequence ) {
            await step({
              driver,
              proxy,
              locator: { rootElement: testSuite.rootElement, name: testSuite.name }
            });
          }

          for ( let assertion of test.asserts ) {
            let result = await assertion( { driver } );
            assert.ok( result );
          }
        });
      });
    });
  };
  
  const runAllTests = () => Object.keys( allTests ).forEach(suite => {
    let testSuite = allTests[suite];
    runTestSuite(testSuite);
  });

  // check if we have been passed a single scenario to run. Mocja opts are passed in as args, so
  // check the last arg. If it is not the name of this file, then assume it is a scenario
  const singleTest = process.argv[process.argv.length -1];
  const thisFile = path.basename(__filename);

  if (singleTest !== thisFile) {
    console.log(chalk.black.bgGreen.bold(`     Running Single Scenario     `));
    const testSuite = allTests[singleTest];
    if(testSuite) {
      runTestSuite(testSuite);
    }
    else {
      console.log(chalk.red(`Could not find spec file with name ${singleTest}`));
    }
  }
  else {
    console.log(chalk.black.bgGreen.bold(`     Running All Scenario Tests     `));
    runAllTests();
  }
});
