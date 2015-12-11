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
var request = require('request');

describe('case0', function () {
  describe('normal', function () {
    it('should be able to access test server', function(done) {
      request('http://127.0.0.1:' + port, function (err, response, body) {
        if (err) {
            done(err);
        }
        expect(response.statusCode).to.eql(200);
        expect(body).to.eql(body, 'Hello Wo2d!');
        done();
      });
    });
  });
});
