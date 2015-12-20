var r = require('request');
var deasync = require('deasync');

/**
 * runner uesed to emit event to reporter
 * @type {[type]}
 */
var runner = null;

/**
 * exposes function: request
 */
exports = module.exports = request;

exports.Request = Request;

function request (configs) {
  // TODO preprocess configs
  return (new Request(configs)).send();
}

function Request (configs) {
  this.configs = configs || {};
}

Request.prototype.send = function () {
  var done = false;
  var that = this;
  var data = {
    error: true,
    response: {},
    output: null
  };
  r({
    method: this.configs.method || 'GET',
    uri: this.configs.uri,
    qs: this.configs.params
  }, function (err, res, body) {
    data.error = err;
    data.response = res;
    data.output = body;
    // TODO auto check data type
    var contentType = res && (res.headers ? res.headers['content-type'] : '');


    if (contentType.indexOf('text/html') || contentType.indexOf('application/json')) {
      // try to parse as json
      try {
        data.output = JSON.parse(body);
      } catch (err) {
        data.output = body;
        done = true;
      }
    } else if (contentType === 'application/protobuf') {

    } else {

    }
    done = true;
  }).on('error', function (err) {
    throw err;
  });

  while(!done) {
    deasync.sleep(100);
  }
  return data;
}

/**
 * set runner
 * @param {[type]} r [description]
 */
request.setRunner = function (inputRunner) {
  runner = inputRunner;
};

request.get = function (option) {

};

request.post = function (options) {

};
