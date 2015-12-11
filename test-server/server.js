var config = require('../config/common').testServer;
var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get('/user', function(req, res) {

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

  var userId = req.query.id;
  var userData = data[userId];

  res.json(userData);
});

var server = app.listen(config.port, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

exports.config = config;
exports.app = app;
