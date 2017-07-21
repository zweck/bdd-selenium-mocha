'use strict';
const { By, until } = require('selenium-webdriver');
const driver = require('../lib/driver');
const config = require('../config.json');
const { hasLoaded } = require('../lib/helpers');
const { element, name, clickNewBlankDraft } = require('../PageObjects/PlanConfiguration');

describe('tests to ensure Clear Config button is displayed when a user clicks on a New Blank Draft or New Blank Config when a plan is loaded', () => {

  afterEach(() => {
    driver.quit();
  });

  it('should show the Clear Config button in TSG', () => {
   

    hasLoaded({ element, name });
    expect("foo").toEqual("");

  });

});
