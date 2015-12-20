var Ub = require('../../src/index'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Ub instance.
var ub = new Ub({
  ui: 'ub-expect',
  // reporter: 'src/ub-reporter'
  reporter: 'mochawesome'
});

ub.addFile('test/case-case/case0');
ub.addFile('test/case-case/test-open-api');
// Run the tests.
ub.ubRun(function(failures){
  process.on('exit', function (failures) {
    process.exit(failures);
  });
});
