var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3030);


var _ = require('underscore');

var path = require('path');


app.use('/', express.static(__dirname + '/dest'));

app.set('views', path.join(__dirname, 'dest/views'));

app.set('view engine', 'jade');


app.get('/', function (req, res) {
  //res.redirect('/static/views/html/index.html');
  res.sendfile(__dirname+'/dest/views/html/index.html');
});





