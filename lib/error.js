/**
 * Error handlers for the test framework
 * @module error
 */
/**
 * Generic error handler
 * @param {object} context object for current test
 * @example return error({ driver, message: `plan name field isn't empty` });
 */
async function error({ driver, message='A test failed' }) {
  if( !driver ) await driver.quit();
  throw new Error( message );
}

module.exports = error;
