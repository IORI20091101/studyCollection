var express = require('express');
var router = express.Router();

var User = require('../models/User');

router.get('/user/:id', function(req, res, next) {
    var id = req.params.id;
    User.get(id, function(err, user) {
        if(err) return next(err);
        if( !user.id ) return res.send(404);
        res.json(user.toJSON());
    });
})

router.get('/entries:page', function(req, res, next) {

})

router.post('/entry', function(req, res, next) {

})

module.exports = router;
