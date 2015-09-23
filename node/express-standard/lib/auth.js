var User = require('../models/User');

var auth = require('basic-auth');


exports.baseAuth = function() {
    return function(req, res, next) {
        var credentials = auth(req);

        if( credentials ) {
            User.authenticate(credentials.name, credentials.pass, function(err, user) {
                if(err) return  next(err);
                if( !user ) {
                    res.json({msg:"无访问权限，请输入用户名密码访问！"})
                    return false;
                } else {
                    next();
                }
            });
        } else {
            next();
        }


    }
}

exports.auth = function() {
    return function(req, res, next) {
        //根据这个判断是否是远程登录用户
        console.log( req.headers.authorization )
        if( req.headers.authorization ) {

            var authorization= req.headers.authorization;
            var userPassBase64 = authorization.split(" ")[1];
            var userPassArr= new Buffer(userPassBase64, 'base64').toString();

            var userR = userPassArr.split(":")[0];
            var passR = userPassArr.split(":")[1];
            console.log(userR);
            console.log(passR);
            res.locals.user = req.remoteUser = userR;
        }
        var uid = req.session.uid;
        if(!uid) return next();
        User.get(uid, function(err, user) {
            if(err) return next(err);
            req.user = res.locals.user = user;
            next();
        })
    }
}

