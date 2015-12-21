var diff = require('diff');
var rDiff = require('recursive-diff');
var _ = require('underscore');

var ubDiff = {};

exports = module.exports = ubDiff;

ubDiff.diff = diff;
ubDiff.rDiff = rDiff;

ubDiff.diffJson = function (a, b, options) {
  var result = rDiff.getDiff.apply(this, [a, b]);
  if (_.isArray(options.ignore)) {
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        var keyArr = key.split('/');
        if (_.intersection(options.ignore, keyArr).length > 0) {
          delete result[key];
        }
      }
    }
  }

  return result;
};
