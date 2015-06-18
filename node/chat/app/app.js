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



var users = [];
io.on('connection', function (socket) {
  sendServerNews(socket,{isConnect: true});

  socket.on('login', function (data) {

    var isUserExist = _.indexOf(users, data.user) >= 0? true:false;
    if( !data.user ) {
      console.log("请输入合法的用户名，“” or underfined or null 不被允许！");
      return false;
    }
    if( !isUserExist ) {
      users.push(data.user);
      socket.userIndex = users.length;
      console.log(data.user + " 加入聊天室！");

      //console.log("users:" + users);
      //sendServerEmitNews(socket,{isAdd: true, user: data.user, users: users});
      io.sockets.emit('broadNews', {isAdd: true, user: data.user, users: users});
    } else {
      sendServerNews(socket,{hasExist: true, user: data.user});
    }

  });

  socket.on("webNews", function(data) {
    sendServerEmitNews(socket, data);
  });

  socket.on("img", function(data) {
    socket.broadcast.emit('newImg', data);
  });

  socket.on('disconnect', function() {
      if( !users[socket.userIndex - 1] ) {
        return false;
      }

      //将断开连接的用户从users中删除
      users.splice((socket.userIndex-1), 1);

      console.log(users[socket.userIndex - 1] + " 离开聊天室！");
       //通知除自己以外的所有人
      sendServerEmitNews(socket,{logOut: true,user: users[socket.userIndex - 1], users: users});
      //console.log("users:" + users);
  });

});


//向某个链接用户发送消息
function sendServerNews(socket,opts) {
  socket.emit('serverNews', opts);
}

//向所有用户发送消息
function sendServerEmitNews(socket,opts) {
  socket.broadcast.emit('broadNews', opts);
}



