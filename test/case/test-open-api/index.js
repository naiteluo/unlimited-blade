
// run test server
var server = require('../../../test-server/server');
var port = server.config.port;

var ub = require('../../../src/index');

describe('open api /user', function () {
  describe('normal', function () {
    it('should contain keys: name and age.', function(done) {
      request('http://127.0.0.1:' + port + '/user?id=1', function (err, response, body) {
        if (err) {
            done(err);
        }
        // TODO auto check type and parse response body
        var data = JSON.parse(body);
        // check response statusCode
        expect(response.statusCode).to.eql(200);
        // check keys
        expect(data).to.have.key('name', 'age');
        // check value type
        expect(data.age).to.be.a('number');
        expect(data.age).not.to.be.a('string');
        done();
      });
    });
  });
});
