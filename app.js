'use strict';

// dependencies
var express = require('express');
var http = require('http');

// setup HTTP server
var app = express();
var server = http.createServer(app);

// middleware for static requests
app.use(express.static(__dirname + '/app'));

// catch-all for get requests
app.get('*', function(req, res) {
  res.sendfile(__dirname + '/app/core/index.html');
});

// start listening for requests
server.listen(process.env.PORT || 5555);
console.log('MEDSEEK Training UI, listening on port '+ server.address().port);
