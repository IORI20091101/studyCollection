var express = require('express');
var router = express.Router();

router.get('/register', function(req, res, next) {
    res.render('register', {title: 'Register'});
});

router.post('/register', function(req, res, next) {
    User.getByName(data.name, function(er, user) {
        if(err) return next(err);

        if(user.id) {
            res.error("Username already taken!");
            res.redirect("back");
        } else {
            user = new User({
                name: data.name,
                pass: data.pass
            });

            user.save(function(err) {
                if(err) return next(err);
                req.session.uid = user.id;
                res.redirect('/');
            });
        }
    })
});

router.get('/login', function(req, res, next) {
    res.render("login", {title:'Login'});
});

router.post('/login', function(req, res, next) {
    var data = req.body.user;

    User.authenticate(data.name, data.pass, function(err, user) {
        if(err) return next(err);
        if(user) {
            req.session.uid = user.id;
            res.redirect('/');
        } else {
            res.error("Sorry! invalid credentials.");
            res.redirect('back');
        }
    });
})

router.post('/logout', function(req, res, next){
    req.session.destroy(function(err) {
        if(err) throw err;
        res.redirect('/');

    });
});