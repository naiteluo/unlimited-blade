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

request.debug = function (flag) {
  r.debug = !!flag;
};

Request.prototype.send = function () {
  var done = false;
  var that = this;
  var data = {
    error: true,
    response: {},
    output: null
  };

  var requestConfig = {
    method: this.configs.method || 'GET'
  };
  if (this.configs.url) {
    requestConfig.url = this.configs.url;
  }
  if (this.configs.uri) {
    requestConfig.uri = this.configs.uri;
  }
  if (this.configs.params) {
    requestConfig.qs = this.configs.params;
  }
  if (this.configs.headers) {
    requestConfig.headers = this.configs.headers;
  }

  // TODO 文档上使用的是这种cookie的设置方法，但是设置完并没有带上登录状态，why
  // if (_.isObject(this.configs.cookie)) {
  //   var j = r.jar();
  //   var cookieUrl = this.configs.url || this.configs.uri;
  //   var cookie = this.configs.cookie
  //   for (var key in cookie) {
  //     if (cookie.hasOwnProperty(key)) {
  //       j.setCookie(r.cookie(key + '=' + cookie[key]));
  //     }
  //   }
  //   requestConfig.jar = j;
  // }

  r(requestConfig, function (err, res, body) {
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

request.createCookie = function (cookie) {
  var arr = [];
  var str = '';
  for (var key in cookie) {
    if (cookie.hasOwnProperty(key)) {
      arr.push(key + '=' + cookie[key]);
    }
  }
  return arr.join('; ');
}
