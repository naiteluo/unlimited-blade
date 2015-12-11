var Ub = require('../src/index'),
    fs = require('fs'),
    path = require('path');

var expect = require('expect.js');

describe('basic test logic', function() {

  describe('load cases and pass', function() {

    it('should have no failures.', function(done) {
      // Instantiate a Ub instance.
      var ub = new Ub({
        ui: 'ub-expect',
        reporter: 'src/ub-reporter'
      });

      ub.addFile('test/case/case0');
      ub.addFile('test/case/test-open-api');
      // Run the tests.
      ub.run(function(failures){
        expect(failures).to.be.eql(0);
        done();
        process.on('exit', function (failures) {

          // process.exit(failures);
        });
      });
    });
  });

});
