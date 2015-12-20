var diff = require('diff');
var rDiff = require('recursive-diff');

var ubDiff = {};

exports = module.exports = ubDiff;

ubDiff.diff = diff;
ubDiff.rDiff = rDiff;

ubDiff.diffJson = rDiff.getDiff;
