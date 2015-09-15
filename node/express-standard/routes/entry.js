var express = require('express');
var router = express.Router();

var validate = require('../lib/validate');

var Entry = require('../models/Entry');
/* GET users listing. */
router.get('/list', function(req, res, next) {
    Entry.getRange(0,-1, function(err, entries) {
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
    validate.lengthAbove('title', 4),
    function(req, res, next) {
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


        entry.save(function(err) {
            if(err) return next(err);
            res.redirect('/');
        })
})



module.exports = router;