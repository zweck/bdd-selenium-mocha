'use strict';
const { Builder } = require('selenium-webdriver');

const chromeDriver = new Builder()
  .forBrowser('chrome')
  .build();

module.exports = chromeDriver;