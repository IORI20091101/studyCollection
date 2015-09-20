var express = require('express');
var router = express.Router();

var validate = require('../lib/validate');

var Entry = require('../models/Entry');

var page = require('../lib/page');

/* GET users listing. */
router.get('/list',
    page(2),
    function(req, res, next) {
        console.log(req.page);
        Entry.getRange(req.page.from, req.page.to, function(err, entries) {
            if(err) return next(err);
            res.render('entries', {
                title: 'Entries',
                entries: entries
            })
        })

});

router.get('/post', function(req, res) {
    res.render('post', { title: 'Post' })
});

router.post('/post',
    validate.required('title'),
    validate.lengthAbove('title', 2),
    function(req, res, next) {
        console.log(123456);
        var data = req.body;
        /*if( !data.title ) {
            res.error('Title is required.');
            res.redirect('back');
            return;
        }

        if(data.title.length < 4 ) {
            res.error('Title must be longer than 4 characters.');
            res.redirect('back');
            return;
        }*/

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