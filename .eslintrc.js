module.exports = {
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "arrowFunctions": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "experimentalObjectRestSpread": true,
      "forOf": true,
      "modules": true,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": true,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "restParams": true,
      "spread": true,
      "templateStrings": true
    }
  },
  // Use recommend ESLint config
  "extends": [
    "eslint:recommended",
  ],
  // Add some rules of our own
  "rules": {
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": off }], // Two spaces for indent
    "curly": ["error", "multi-line"], // All require curly brace for multi line bodies
    "no-template-curly-in-string": "error", // Guard against accidentally using quotes instead of backticks when writing template strings
    "array-callback-return": "error", // Enforce returning from array functions (map, filter, etc)
    "no-eval": "error",
    "max-params": ["error", 3],
    "max-statements-per-line": ["error", { "max": 1 }],
    "no-param-reassign": "error", // Don't allow reassigning function param variables
    "semi": ["error", "always"],
    "strict": ["error", "global"], // Enforce 'use strict' statements. Use global because browserify/webpack will wrap each module in a function anyway
    "eol-last": ["error", "always"], // Enforce empty last line. See http://stackoverflow.com/a/729795/4887407
    "object-curly-spacing": ["error", "always", { "objectsInObjects": false }],
    "array-bracket-spacing": ["error", "always", { "arraysInArrays": false }],
    "no-console": "off",
  },
  // Add some environments
  "env": {
    "es6": true,
    "browser": false,
    "node": true,
  }
}
