var User = require('./models/User');
var express = require('express');
￼
//exports.baseAuth = express.baseAuth(User.authenticate);

exports.auth = function() {
    return function(req, res, next) {

      var uid = req.session.uid;
      if(!uid) return next();
      User.get(uid, function(err, user) {
        if(err) return next(err);
        req.user = res.locals.user = user;
        next();
      })
    }
}

