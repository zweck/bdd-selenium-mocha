async function error({ driver, message='A test failed' }) {
  if( !driver ) await driver.quit();
  throw new Error( message );
}

module.exports = error;