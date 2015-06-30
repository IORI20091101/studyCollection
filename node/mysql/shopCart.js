var express = require('express');
var app = express();

var mysql = require('mysql');
var conn = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123456',
  database:'nodejs',
  port: 3306
});

conn.connect();


var insertSQL = 'insert into t_user(name) values("conan"), ("fens.me")';
var selectSQL = 'select * from t_user limit 10';
var deleteSQL = 'delete from t_user';
var updateSQL = 'update t_user set name="conan update" where name = "conan"';

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret'}));
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views',__dirname + '/views');



app.listen(3030, function() {
  console.log('');
  console.log('');
  console.log('-----------启动应用---------------');
  console.log('-----------\033[96m @author toshiba---------------');
  console.log('\033[96m app listening on *:3030');
});



app.get('/', function(req, res) {
  res.send("index page ~~~");
})




