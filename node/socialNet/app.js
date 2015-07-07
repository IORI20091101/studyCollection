var express = require('express');
var expressMongoose = require('express-mongoose');
var app = express();


var mongoose = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://localhost/mydb');
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret'}));


app.set('views',__dirname + '/views');


app.use('/static', express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');




app.listen(3030, function() {
        console.log('\033[96m app listening on *:3030');
});



app.get('/', function(req, res) {
    res.render('index');
});