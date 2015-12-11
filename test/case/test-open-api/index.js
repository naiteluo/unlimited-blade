
// run test server
var server = require('../../../test-server/server');
var port = server.config.port;

var ub = require('../../../src/index');
var request = require('request');

describe('open api /user', function () {
  describe('normal', function () {
    it('should contain keys: name and age.', function(done) {
      request('http://127.0.0.1:' + port + '/user?id=1', function (err, response, body) {
        if (err) {
            done(err);
        }
        var data = JSON.parse(body);
        expect(response.statusCode).to.eql(200);
        expect(data).to.have.key('name', 'age');
        expect(data.age).to.be.a('number');
        done();
      });
    });
  });
});
