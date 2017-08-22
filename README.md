# Selenium end-to-end test framework
The project provides a framework for running end-to-end Selenium web driver test

# Setup
Ensure you have Node v8.3 or above installed as we use `async`/`await`. The current version used by the project can be found in the `.nvmrc` file. If you are using `nvm` simply type:

`nvm use` 

You may need to type `nvm install` if the version found in `.nvmrc` is not currently installed).

Now install all required node modules:

`npm install`

## Environment Variables
The tests require a number of Environment Variables to have been set. The simplest way to set these is to create a
.env file in the root of the project, based on the example one (`.env.sample`). Any variables in this file will automatically be set.


# Test layout and structure
There are 2 directories for tests to live in: `scenarios/` and `tests/`.

`scenarios/` represent a sequence of basic interactions exposed through [Page Objects](https://github.com/SeleniumHQ/selenium/wiki/PageObjects) defined in `lib/pageObjects`.

`tests/` is for more in-depth, complex tests that require a developer to write some JS. 

Tests that reside within `scenarios/` export a JS object which is automatically indentified by `testRunner.js`.

## Page Objects
All Page Objects should `export`:

- `rootElement` - The PageObject wrapper element
- `name` - A pretty name for the PageObject

## Test failure screenshots
If a test fails, a screenshot is saved to the `screenshots` directory within the project.

# Running tests
To run the full suite of tests, type:

`npm test`

To run just the scenarios, type:

`npm run scenarios`

To run just the complex tests, type:

`npm run complex-tests`.

# Generating JS Docs
The developer docs can be generated locally any time by typing:

`npm generate-docs`.

This will produce a set of web pages describing the API in thr `docs/` directory.

Developers should ensure that [JS Doc](http://usejsdoc.org/index.html) annotations are kept up tp date within the code library.