const fs = require('fs');
const path = require("path");
const chalk = require('chalk');

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots/');

function slugify(text) {
    // https://gist.github.com/mathewbyrne/1280286
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '')             // Trim - from end of text
      .replace(/[\s_-]+/g, '-');
}

function date() {
  var now = new Date();
  return now.getFullYear() + '-' + 
    now.getMonth() + '-' + 
    now.getDay() + '.' + 
    now.getHours() + '.' + 
    now.getMinutes();
}

function screenshotFileName(test) {
  return date() + slugify(test.title);
}

function createScreenshotDir() {
  if (!fs.existsSync(SCREENSHOT_DIR)){
    fs.mkdirSync(SCREENSHOT_DIR);
  }
}

async function screenshot(test, driver) {
  createScreenshotDir();
  const filename = `${SCREENSHOT_DIR}${date()}-${slugify(test.title)}.png`;
  const img = await driver.takeScreenshot();
  fs.writeFileSync(filename, new Buffer(img, 'base64'));
  console.log(chalk.red(`Failure screenshot: ${filename}`));
}

module.exports = {
  screenshot
}
