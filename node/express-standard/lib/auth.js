var User = require('../models/User');

var auth = require('basic-auth');

// curl http://sdz001:123456@127.0.0.1:3030/api/user/1 -v

exports.baseAuth = function() {
    return function(req, res, next) {
        var credentials = auth(req);

        if( !credentials ) {
            next();
        }
        User.authenticate(credentials.name, credentials.pass, function(err, user) {
            if(err) return  next(err);
            if( !user ) {
                res.json({msg:"无访问权限，请输入用户名密码访问！"})
                return false;
            } else {
                next();
            }
        });
    }
}

exports.auth = function() {
    return function(req, res, next) {
        var credentials = auth(req);

        console.log(credentials);
        if( credentials&&credentials.name ) {
            res.locals.user = credentials.name;
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

