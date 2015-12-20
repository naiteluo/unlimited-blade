var expect = require('expect.js');

var runner = null;

/**
 * exposes function: espect
 */
exports = module.exports = expect;

// extend expect here

expect.setRunner = function (inputRunner) {
  runner = inputRunner;
};
