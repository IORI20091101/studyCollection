var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var url = "mongodb://127.0.0.1:27017/mydb";

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


app.get('/login/:signupEmail', function(req, res) {
    res.render('login', {signupEmail: req.params.signupEmail});
});

app.get('/signup', function(req, res) {
    res.render('signup');
});

app.post('/login', function(req, res, next) {
    console.log(req.body.user.email);
    console.log(req.body.user.password);
    var logDoc = app.users.findOne({email: req.body.user.email,password: req.body.user.passord});
    if(!logDoc) {
        return res.send('<p>User not found, Go back and try again</p>');
    }
    console.log(logDoc);
    //req.session.loggedIn = doc._id.toString();
    res.redirect('/');
});

app.post('/signup', function(req, res, next) {
    var user = req.body.user;
    app.users.insert(user, function(err, doc) {
        if(err) return next(err);
        console.log("注册请求， 向表中插入新注册的user");
        res.redirect('/login/' + doc.ops[0].email);
    })
});



MongoClient.connect(url, function(err, db) {
    if(err) throw err;
    app.users = db.collection('users');
    console.log("Connected correctly to server");
    assert.equal(null, err);

    app.users.ensureIndex('users', 'email', function(err) {
        if(err) throw err;
        app.users.ensureIndex('users', 'password', function(err) {
            console.log('\033[96m + \033[39mensured indexes');
        });
    })

    /*
    app.users.find({},{_id:0}).toArray(function(err, results) {
        console.dir(results);
    })

    collection.insert({my: 'document'}, function(err, docs) {
        collection.count(function(err, count) {
            console.log(count);
        });

        collection.find().toArray(function(err, results) {
            console.dir(results);
            db.close();
        });
    })
    db.close();*/
});


app.listen(3030, function() {
        console.log('\033[96m app listening on *:3030');
    });

/*
//old version
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