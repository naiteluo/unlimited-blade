var config = require('../config/common').testServer;
var express = require('express');
var app = express();

var data = {
  '1': {
    name: 'abc',
    age: 12
  },
  '2': {
    name: 'test',
    age: 233
  }
};

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/user', function(req, res) {
  var userId = req.query.id;
  var userData = data[userId];

  res.json(userData);
});

app.get('/userOffline', function(req, res) {
  var userId = req.query.id;
  var userData = data[userId];
  userData.name = 'bbbbbbbb';

  res.json(userData);
});

var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log();
  console.log('Test Server Up, Port: %s', port);
  console.log();
});

exports.config = config;
exports.app = app;
