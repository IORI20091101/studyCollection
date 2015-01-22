var express = require("express");
var app = express();


var wsio = require('websocket.io');

var ws = wsio.attach(app);

app.use('/static', express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.set('view engine','jade');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});



app.get('/', function(req, res){
  res.send('hello world');
});



ws.on('connection', function(socket) {
    socket.on('message',function(msg) {
        console.log('\033[90m got:\033[39m' + msg);

        socket.send('pong');
    });
});


app.listen(3030);