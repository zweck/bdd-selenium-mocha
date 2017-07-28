### Selenium e2e tests

**This code was written by a human and could therefore be much better, please feel free to tear it appart, refactor and generally make it better in PR's**

This repo houses the end 2 end, integration, full stack selenium tests, ones that open the browser, does some stuff, and asserts some stuff.

It is a Node app, could of been a Python one but I don't know Python so I wrote it in Node, you are more than welcome to re-write it in whatever language you like if this offends you.

So the first step is to make sure you have Node installed, preferrably v7.10.0 or above as we use `async`/`await`. If you are using `nvm` simply type:

`nvm use`

To run:

1. `npm install`
2. `npm test`

There are 2 directories for tests to live in, we have `sequences/` and `tests/`. I have made this distinction to seperate simple tests that represent a sequence of basic interactions exposed through `PageObjects/`, and more indepth complex tests that require a developer to write some JS. 

`sequences/` tests export a JS object which is consumed by `testRunner.js`. Make sure that any sequence test is included in `sequences/index.js`. If it isn't in there, it will not be run.

The more complex tests live in `tests/`. Mocha points to that folder when you run `npm test`, so there is no need to list them in an `index`.


#### Page Objects

All Page Objects should `export`:

- `rootElement` - The PageObject wrapper element
- `name` - A pretty name for the PageObject

I have _tried_ to adhere to a POM selenium model, however classical inheritence and JS is not an especially good fit, even with `ES2015` classes. So I have opted for a more functional route, where our page object modules just export a bunch of functions which perform steps, these steps should not be programatically dependent on preceeding steps, although they semantically might be. 

A reference PageObject can be found at `PageObjects/PlanConfiguration.js` where we are exposing functions like `clickNewBlankDraft` and `configIsEmpty`. `testRunner.js` will pass these functions the particular `driver` instance for that `it` block, which gets re-initialised at the start of every test.

#### Test failures
If a test fails, a screenshot is saved to the `screenshots` directory within the project.