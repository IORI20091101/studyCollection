module.exports = function(app, models) {

    //验证是否登录
    app.get('/account/authenticated', function(req, res) {
        if( req.session && req.session.loggedIn  ) {
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
            res.send(account._id);
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

}