var express = require("express");
var app = express();
console.log(__dirname);

app.use('/static', express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.set('view engine','jade');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});



app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3030);
