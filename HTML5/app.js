var express = require("express");
var app = express();

console.log(__dirname);

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.set('view engine','jade');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});



app.get('/', function(req, res){
  res.sendfile(__dirname +"/public/html/index.html");
});

app.get('/img2Code', function(req, res) {
    res.sendfile(__dirname +"/public/html/canvasToStr.html");
});

app.get('/canvas2img', function(req, res) {
    res.sendfile(__dirname +"/public/html/canvas2img.html");
})
app.listen(3030);
