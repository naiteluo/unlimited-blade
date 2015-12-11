var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// Instantiate a Mocha instance.
var mocha = new Mocha();

mocha.addFile('test/index.js');
// Run the tests.
mocha.run(function(failures){
  console.log(failures);
  process.on('exit', function () {
    process.exit(failures);
  });
});
