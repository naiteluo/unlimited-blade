// run test server
var server = require('../../../test-server/server');
var port = server.config.port;

var _ = require('underscore');

describe('测试接口', function () {
  describe('正常case', function () {

    it('/user 接口应该包含以下key: name 和 age.', function () {

      var requestConfig = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/user',
        params: {
          id: 1
        },
        timeout: 2000
      };
      var data = request(requestConfig);
      var error = data.error;
      var response = data.response;
      var output = data.output;

      expect(error).to.be(null);
      expect(response.statusCode).to.eql(200);

      expect(output).to.have.key('name', 'age');
      expect(output.age).to.be.a('number');

    });
    it('local test api should pass diff', function () {

      var requestConfigOnline = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/user',
        params: {
          id: 1
        },
        timeout: 2000
      };
      var requestConfigOffline = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port + '/userOffline',
        params: {
          id: 1
        },
        timeout: 2000
      };

      var dataOnline = request(requestConfigOnline);
      var outputOnline = dataOnline.output;

      var dataOffline = request(requestConfigOffline);
      var outputOffline = dataOffline.output;
    });

  });
});
