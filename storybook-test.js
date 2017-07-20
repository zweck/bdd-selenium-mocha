'use strict';
const chalk = require('chalk');
/**
 * @param {String}   component  Name of component to test
 * @param {String}   story      Story to run
 * @param {Function} rest       Function which will run the content of the test; takes driver as its only argument 
 */
module.exports = (component, story, rest) => {
  return (driver) => {
    driver.get(`http://localhost:6006/?selectedKind=${component}&selectedStory=${story}&down=1&left=1&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel`);
    driver.switchTo().frame("storybook-preview-iframe");
    if (!rest) throw 'No test body passed!';
    rest(driver)
    .then(() => console.log(chalk.green(`${component} -> ${story} OK`))); 
  }
};
