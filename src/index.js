var util = require('util');
var Mocha = require('mocha');
var ubInterface = require('./ub-interface');

/**
 * expose Ub
 * @type {[type]}
 */
exports = module.exports = Ub = Mocha;

exports.version = '1.0.0';

ubInterface.expose(Ub);
