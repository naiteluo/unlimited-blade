var expect = require('./ub-expect');
var request = require('./ub-request');

/**
 * expose methods to Mocha case enviroment
 * @param  {[type]} Ub [description]
 * @return {[type]}    [description]
 */
function expose (Ub) {
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
      context.request = request;
    });
  };
}

exports.expose = expose;
