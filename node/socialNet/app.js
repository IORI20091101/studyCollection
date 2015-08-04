var express = require('express');
var expressMongoose = require('express-mongoose');
var app = express();
var nodemailer = require('nodemailer');
var MemoryStore = require('connect').session.MemoryStore;
var dbPath = 'mongodb://localhost/nodebackbone';

var config = {
    mail: require('./config/mail')
}

var mongoose = require('mongoose');
var path = require('path');

var models = {
    Account: require('./models/Account')(config, mongoose, nodemailer)
}


app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, '/views'));
    app.use('/static', express.static(__dirname + '/public'));
    app.use(express.limit('1mb'));
    app.use(express.bodyParser());
    app.use(express.cookieParser());

    app.use(express.session({secret:'Social secret key', store: new MemoryStore()}));
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

    if( null == email || email.length < 1 || null == password || password.length < 1 ) {
        res.send(400);
        return;
    }

    models.Account.register(email, password, firstName, lastName);

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

    models.Account.login(email, password, function(success) {
        if( !success ) {
            res.send(401);
            return;
        }
        console.log('Login was successful!');
        req.session.loggedIn = true;
        req.session.accountId = success._id;
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
    models.Account.forgetPassord(email, resetPasswordUrl, function(success) {
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
        models.Account.changePassword(accountId, password);
    }
    res.render('resetPasswordSuccess',{});
})


app.get('/accounts/:id', function(req, res) {
    var accountId = req.params.id=='me'?req.session.accountId:req.params.id;
    models.Account.findById(accountId, function(account) {
        if( accountId == 'me' || models.Account.hasContact(account, req.session.accountId) ) {
            account.isFrend = true;
        }
        res.send(account);
    })
})

//获取状态列表
app.get('/accounts/:id/status', function(req, res) {
    var accountId = req.params.id == 'me'
                        ?req.session.accountId
                        :req.params.id;

    models.Account.findById(accountId, function(account) {
        res.send(account.status);
    });
});

//设置状态列表
app.post('/accounts/:id/status', function(req, res) {
    var accountId = req.params.id == 'me'
                        ?req.session.accountId
                        :req.params.id;
    models.Account.findById(accountId, function(account) {
        status = {
            name: account.name,
            status: req.param('status')
        }
        account.status.push(status);

        account.activity.push(status);

        account.save(function( err ) {
            if( err ) {
                console.log('Error saving account:' + err);
            }
        });
    });

    res.send(200);
})

//获取活动列表
app.get('/accounts/:id/activity', function(req, res) {
    var accountId = req.params.id == 'me'
                        ?req.session.accountId
                        :req.params.id;
    models.Account.findById(accountId, function(account) {
        res.send(account.activity);
    });
});

app.get('/accounts/:id/contacts', function(req, res) {
    var accountId = req.params.id == 'me'
                        ? req.session.accountId
                        :req.params.id;
    models.Account.findById(accountId, function(account) {
        res.send(account.contacts);
    })
})

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

app.post('/accounts/:id/contact', function(req, res) {
    var accountId = req.params.id == 'me'
                        ?req.session.accountId
                        :req.params.id;

    var contactId = req.param('contactId', null);

    if( null == contactId ) {
        res.send(400);
        return;
    }

    models.Account.findById(accountId, function(account) {
        if( account ) {
            models.Account.findById(contactId, function(contact) {
                models.Account.addContact(account, contact);

                models.Account.addContact(contact, account);
                account.save();
            })
        }
        res.send(200);
    })
});


app.delete('/accounts/:id/contact', function(req, res) {
    var accountId = req.params.id=='me'
                        ?req.session.accountId
                        :req.params.id;
    var contactId = req.param('contactId', null);
    if( null == contactId ) {
        res.send(400);
        return;
    }
    models.Account.findById(accountId, function(account) {
        if( !account ) return;

        models.Account.findById(contactId, function(contact, err) {
            if( !contact ) return;
            models.Account.removeContact(account, contactId);

            models.Account.removeContact(contact, accountId);
        })

        res.send(200);
    });
})