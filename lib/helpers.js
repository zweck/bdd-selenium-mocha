const { until } = require('selenium-webdriver');
const driver = require('./driver');
const { DEFAULT_WAIT_TIME } = require('../config.json');

function hasLoaded({ element, name }){
  driver.wait(until.elementLocated(element), DEFAULT_WAIT_TIME, `Couldn\'t find ${name} after ${DEFAULT_WAIT_TIME}ms`);
}

module.exports = { hasLoaded };