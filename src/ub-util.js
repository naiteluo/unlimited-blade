var underscore = require('underscore');

underscore.deepObjectExtend = function(target, source) {
  for (var prop in source)
    if (prop in target)
      _.deepObjectExtend(target[prop], source[prop]);
    else
      target[prop] = source[prop];
  return target;
}

var ubTools = {};

ubTools.extend = function (target, source) {
  target = underscore.clone(target);
  return underscore.deepObjectExtend(target, source);
};

exports.underscore = underscore;
exports.ubTools = ubTools;
