'use strict';
const { Builder } = require('selenium-webdriver');
const tests = require('./tests');

const chromeDriver = new Builder()
  .forBrowser('chrome')
  .build();

const testNames = Object.keys(tests);
for(let test of testNames) {
  tests[test](chromeDriver);
}

chromeDriver.quit();
