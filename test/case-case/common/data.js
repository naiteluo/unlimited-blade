var _ = require('underscore');

var userLoginDataList = {
  'naiteluo': {
    BDUSS: '2RGUTlieFQ5NzZhSFVBWWhzN3FrblJWd3ctTE5YYXA0bVlrekJXR2wwOEx5NDFXQVFBQUFBJCQAAAAAAAAAAAEAAAAqxdULbmFpdGVsdW8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAs-ZlYLPmZWT'
  }
};

var defaultParams = {
  _client_type: "2",
  _client_version: "99.9.9",
  ka: "open",
  m_api: "%2Fc%2Fs%2Fmsg",
  m_size_d: "471",
  m_size_u: "1194",
  net_type: "3",
  pn: "1",
  q_type: "100",
  rn: "90",
  rn_need: "30",
  scr_h: "960",
  scr_w: "640",
  sign: "123456tbclient654321",
  with_group: "1"
};

var defaultRequestConfig = {
  method: 'POST',
  timeout: 2000
};

function createCookieStr (cookie) {
  var arr = [];
  var str = '';
  for (var key in cookie) {
    if (cookie.hasOwnProperty(key)) {
      arr.push(key + '=' + cookie[key]);
    }
  }
  return arr.join('; ');
}

function getConfig (options) {
  var cookieObj = {};
  if (options.userName) {
    _.extend(cookieObj, userLoginDataList[options.userName]);
  }
  if (options.pubEnv !== undefined) {
    cookieObj.pub_env = options.pubEnv;
  }
  var params = _.clone(defaultParams);
  if (options.params) {
    _.extend(params, options.params);
  }
  var config = _.clone(defaultRequestConfig);
  // TODO 这里refer先写死吧，headers配置的灵活性要求好像暂时不那么高
  config.headers = {
    Referer: 'tieba.baidu.com',
    cookie: createCookieStr(cookieObj)
  };
  config.params = params;
  if (options.config) {
    _.extend(config, options.config);
  }
  return config;
}

exports.getConfig = getConfig;
