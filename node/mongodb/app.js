var express = require('express');
var mongodb = require('mongodb');

var server = new mongodb.Server('127.0.0.1', 27017);

var app = express();



app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret'}));
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views',__dirname + '/views');

app.get('/', function(req, res) {
    res.render('index', {authenticated: false});
});

app.get('/login', function(req, res) {
    res.render('login');
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

/*
new mongodb.Db('my-website', server).open(function(err, client) {
    if(err) {
        throw 'err';
    }

    console.log('\033[96m connected to mongodb');

    app.users = new mongodb.Collection(client, 'users');

    app.listen(3000, function() {
        console.log('\033[96m app listening on *:3000');
    });
});
*/

new mongodb.Db('test',server,{}).open(function(error,client){
    if(error) throw error;

    console.log('\033[96m connected to mongodb');

    var collection = new mongodb.Collection(client,'user');
    collection.find(function(error,cursor){
        cursor.each(function(error,doc){
            if(doc){
                console.log("name:"+doc.name+" age:"+doc.age);
            }
        });
    });
});

