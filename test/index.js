// run test server
var server = require('../test-server/server');
var port = server.config.port;

var expect = require('expect.js');
var ub = require('../src/index');
var request = require('request');

describe('Basic', function() {

  describe('test server up', function() {
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

  describe('load src index', function() {
    it('should exports version', function() {
      expect(ub.version).to.eql('1.0.0');
    });
  });

});
