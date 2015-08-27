var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', function(req, res, next) {

})