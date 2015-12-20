/**
 * API description
 * @type {Object}
 */
var config = {
  url: '/user'
};

// run test server
var server = require('../../../test-server/server');
var port = server.config.port;

describe('case0', function () {
  describe('normal', function () {
    it('should be able to access test server', function() {
      var requestConfig = {
        type: 'POST',
        uri: 'http://127.0.0.1:' + port,
        timeout: 2000
      };
      var data = request(requestConfig);

      expect(data.response.statusCode).to.eql(200);
      expect(data.output).to.eql('Hello World!');

    });
  });
});
