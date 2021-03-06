var expect = require('./ub-expect');
var request = require('./ub-request');
var diff = require('./ub-diff');
var ubUtil = require('./ub-util');

/**
 * expose methods to Mocha case enviroment
 * @param  {[type]} Ub [description]
 * @return {[type]}    [description]
 */
function expose (Ub) {

  /**
   * new run method to pass runner to request;
   * @param  {Function} fn [description]
   * @return {[type]}      [description]
   */
  Ub.prototype.ubRun = function (fn) {
    var runner = this.run(fn);
    request.setRunner(runner);
    expect.setRunner(runner);
    return runner;
  };

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
      context.diff = diff;
      context.ubTools = ubUtil.ubTools;
      // expose underscore to context for user
      context._ = ubUtil.underscore;
    });
  };

}

exports.expose = expose;
