var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3030);


var _ = require('underscore');

var path = require('path');


app.use('/', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'public/views'));

app.set('view engine', 'jade');


app.get('/', function (req, res) {
  //res.redirect('/static/views/html/index.html');
  res.sendfile(__dirname+'/public/views/index.html');
});







