var express = require('express');
var sio = require('socket.io');

var app = express();

app.use('/static', express.static('/public'));

app.get('/', function (req, res) {
  res.redirect('/static/public/index.html');
  //res.sendfile(__dirname+'/public/index.html');
});


app.listen(3030);

var io = sio.listen(app);


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('anotherNews', function (data) {
    console.log(data);
  });
});


