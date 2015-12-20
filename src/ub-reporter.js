module.exports = UbReporter;

/**
 * a demo reporter
 * @param {[type]} runner [description]
 */
function UbReporter(runner) {
  var passes = 0;
  var failures = 0;

  runner.on('pass', function(test){
    passes++;
    console.log('pass: %s', test.fullTitle());
  });

  runner.on('fail', function(test, err){
    failures++;
    console.log('fail: %s -- error: %s', test.fullTitle(), err.message);
    console.log(err);
  });

  runner.on('end', function(){
    console.log('end: %d/%d', passes, passes + failures);
    // TODO comment this to show test report in it's test
    process.exit(failures);
  });

}
