// run test server
var server = require('../test-server/server');
var port = server.config.port;

var assert = require('assert');
var ub = require('../src/index');
var request = require('request');

describe('Basic', function() {

  describe('test server up', function() {
    it('should be able to access test server', function(done) {
      request('http://127.0.0.1:' + port, function (err, response, body) {
          if (err) {
              done(err);
          }
          assert.equal(response.statusCode, 200);
          assert.equal(body, 'Hello World!');
          done();
      });
    });
  });

  describe('load src index', function() {
    it('should exports version', function() {
      assert.equal(ub.version, '1.0.0');
    });
  });
  
});
