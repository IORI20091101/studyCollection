var express = require('express');
var app = express();

var server = require('http').createServer(app);

var io = require('socket.io').listen(server);

//app.use('/static', express.static('/public'));

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});



io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('anotherNews', function (data) {
    console.log(data);
  });
});

server.listen(3030);

