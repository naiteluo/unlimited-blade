var assert = require('assert');
var ub = require('../src/index');
describe('Basic', function() {
  describe('load src index', function () {
    it('should exports version', function () {
      assert.equal(ub.version, '1.0.0');
    });
  });
});
