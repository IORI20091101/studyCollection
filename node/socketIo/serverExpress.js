var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3030);

app.use('/static', express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.redirect('/static/index.html');
  //res.sendfile(__dirname+'/public/index.html');
});



io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('anotherNews', function (data) {
    console.log(data);
  });
});

