var express = require('express');
var router = express.Router();

var User = require('../models/User');

var validate = require('../lib/validate');

var Entry = require('../models/Entry');

var page = require('../lib/page');


//curl http://sdz001:123456@127.0.0.1:3030/api/user/1 -v
//curl -d  "title=sundongzhi&body=swuosdowef" http://sdz001:123456@127.0.0.1:3030/api/entry -v
//curl http://sdz001:123456@127.0.0.1:3030/api/entries/1 -v

router.get('/user/:id', function(req, res, next) {
    var id = req.params.id;
    User.get(id, function(err, user) {
        if(err) return next(err);
        if( !user.id ) return res.send(404);
        res.json(user.toJSON());
    });
})

router.get('/entries/:page',function(req, res, next) {
        var page  = req.params.page;
        console.log(page);
        req.query.page = page;
        console.log(req.query);
        next();
    }, page(2),
    function(req, res, next) {

        Entry.getRange(req.page.from, req.page.to, function(err, entries) {
            if(err) return next(err);
            res.json(entries);
        })
})


router.post('/entry',
    validate.required('title'),
    validate.lengthAbove('title', 2),
    function(req, res, next) {
        var data = req.body;
        var entry = new Entry({
            "username":res.locals.user.name,
            "title": data.title,
            "body" : data.body
        });
        console.log(entry);

        entry.save(function(err) {
            if(err) return next(err);


            if( req.remoteUser ) {
                res.json("entry add success!");
            } else {
                res.redirect('/');
            }
        })
    })

module.exports = router;
