var express = require('express');
var expressMongoose = require('express-mongoose');
var app = express();
var nodemailer = require('nodemailer');

var config = {
    mail: require('./config/mail')
}

var mongoose = require('mongoose');
var path = require('path');
var Account = require('./models/Account')(config, mongoose, nodemailer);


app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '/views'));
    app.use('/static', express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());

    app.use(express.session({secret:'Social secret key', store: newMemoryStore()}));
    mongoose.connect('mongodb://localhost/mydb');


});






app.listen(3030, function() {
        console.log('\033[96m app listening on *:3030');
});



app.get('/', function(req, res) {
    res.render('index');
});

//验证是否登录
app.get('/account/authenticated', function(req, res) {
    if( req.session.loggedIn ) {
        res.send(200);
    } else {
        res.send(401);
    }
});
//注册请求处理
app.post('/register', function(req, res) {
    var firstName = req.param('firstName', '');
    var lastName = req.param('lastName', '');
    var email = req.param('email', null);
    var password = req.param('password', null);

    if( null != email || null == password ) {
        res.send(400);
        return;
    }

    Account.register(email, password, firstName, lastName);

    res.send(200);

});

//登录请求处理
app.post('/login', function(req, res) {
    console.log("login request");
    var email = req.param("email", null);
    var password = req.param("password", null);
    if( null == email || email.length < 1 || null == password || password.length < 1) {
        res.send(400);
        return;
    }

    Account.login(email, password, function(success) {
        if( !success ) {
            res.send(401);
            return;
        }
        console.log('Login was successful!');
        res.send(200);
    });
});

//ajax忘记密码请求处理
app.post('/forgotpasword', function(req, res) {
    var hostname = req.headers.host;
    var resetPasswordUrl = 'http://' + hostname + '/resetPassword';

    var email = req.param('email', null);
    if( null == email || email.length < 1 ) {
        res.send(400);
        return;
    }
    Account.forgetPassord(email, resetPasswordUrl, function(success) {
        if( success ) {
            res.send(200);
        } else {
            res.send(404);
        }
    });
});

//忘记密码同步跳转
app.get('/resetPassword', function(req, res) {
    var accountId = req.param('account', null);
    res.render('resetPassword', {locals:{accountId: accountId}});
});

app.post('/resetPassword', function(req, res) {
    var accountId = req.param('account', null);
    var password = req.param('password', null);
    if( null == accountId && null != password ) {
        Account.changePassword(accountId, password);
    }
    res.render('resetPasswordSuccess',{});
})


app.get('/accounts/:id', function(req, res) {
    var accountId = req.params.id=='me'?req.session.accountId:req.params.id;
    Account.findOne({_id:accountId}, function(account) {
        res.send(account);
    })
})