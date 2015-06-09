var express = require('express');

var app = express();

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(3030);

//theme start--------------------
var colors = require('colors');
//theme start--------------------
var _ = require('underscore');

var path = require('path');
console.info(__dirname.rainbow);
app.use('/static', express.static(__dirname + '/public'));

app.set('views', path.join(__dirname, 'public/views'));

app.set('view engine', 'jade');


app.get('/', function (req, res) {
  //res.redirect('/static/index.html');
  //res.sendfile(__dirname+'/public/views/index.html');
  var view = 'index';
  res.render(view, {

  });
});


app.get('/test', function (req, res) {
  //res.redirect('/static/views/html/index.html');
  res.sendfile(__dirname+'/public/views/html/index.html');
});



var serverUserArr = [];
io.on('connection', function (socket) {
  sendServerNews(socket,{isConnect: true});

  socket.on('addUser', function (data) {

    var isUserExist = _.indexOf(serverUserArr, data.user) >= 0? true:false;
    if( !isUserExist ) {
      serverUserArr.push(data.user);
      sendServerNews(socket,{isAdd: true, user: data.user});
    } else {
      sendServerNews(socket,{hasExist: true, user: data.user});
    }

  });

  socket.on("webNews", function(data) {
    socket.broadcast.emit("broad news",data);
    //sendServerNews(socket,data)
  });

});


function sendServerNews(socket,opts) {
  socket.emit('serverNews', opts);
}

