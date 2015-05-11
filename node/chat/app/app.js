var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3030);


var path = require('path');
console.info(__dirname);
app.use('/static', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'public/views'));

app.set('view engine', 'jade');


app.get('/', function (req, res) {
  //res.redirect('/static/index.html');
  res.sendfile(__dirname+'/public/views/index.html');
  /*var view = 'index';
  res.render(view, {

  });*/
});



io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('anotherNews', function (data) {
    console.log(data);
  });
});

