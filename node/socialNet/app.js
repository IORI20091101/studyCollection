var express = require('express');
var expressMongoose = require('express-mongoose');
var http = require('http');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = express.session.MemoryStore;
var dbPath = 'mongodb://localhost/nodebackbone';
var fs = require('fs');
var events = require('events');

var mongoose = require('mongoose');
var path = require('path');


app.server  = http.Server(app);

var eventDispatcher = new events.EventEmitter();

app.addEventListener = function(eventName, callback) {
    eventDispatcher.on(eventName, callback);
}

app.removeEventListener = function(eventName, callback) {
    eventDispatcher.remove(eventName, eventOptions);
}


app.triggerEvent = function(eventName, eventOptions) {
    eventDispatcher.emit(eventName, eventOptions);
}

app.sessionStore = new MemoryStore();

var config = {
    mail: require('./config/mail')
}


var models = {
    Account: require('./models/Account')(config, mongoose, nodemailer)
}


app.configure(function() {
    app.sessionSecret = 'Social secret key';
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '/views'));
    app.use('/', express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());

    app.use(express.session({secret:app.sessionSecret, store: app.sessionStore}));
    mongoose.connect(dbPath, function onMessageError(err) {
        if( err ) {
            throw err;
        }
    });
});



app.listen(3030, function() {
        console.log('\033[96m app listening on *:3030');
});



app.get('/', function(req, res) {
    res.render('index');
});


app.post('/contacts/find', function(req, res) {
    var searchStr = req.param('searchStr', null);
    if( null == searchStr ) {
        res.send(400);
        return;
    }

    models.Account.findByString(searchStr, function onSearchDone(err, accounts) {
        if( err || accounts.lenvgth == 0 ) {
            res.send(404);
        } else {
            res.send(accounts);
        }
    })
});


fs.readdirSync('./routers').forEach(function(file) {
    if( file[0] == '.' ) {
        return;
    }
    var routeName = file.substr(0, file.indexOf('.'));
    require('./routers/' + routeName)(app, models);
})












