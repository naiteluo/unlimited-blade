var util = require('util');
var Mocha = require('mocha');
var expect = require('./ub-expect');

/**
 * expose Ub
 * @type {[type]}
 */
exports = module.exports = Ub = Mocha;

exports.version = '1.0.0';

/**
 * add
 * @param  {[type]} suite [description]
 * @return {[type]}       [description]
 */
Ub.interfaces['ub-expect'] = function(suite) {

  // use bdd
  Ub.interfaces['bdd'].call(this, suite);

  // expose expect to case code
  suite.on('pre-require', function(context, file, mocha) {
    context.expect = expect;
  });
};
