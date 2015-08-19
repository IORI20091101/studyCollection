var express = require('express');
var router = express.Router();

var path = require("path");

var Photo = require("../models/Photo");

var formidable = require('formidable'),
    util = require('util');

/*
var photos = [];
photos.push({
    name: 'Node.js lOGO',
    path: "http://img.hb.aicdn.com/8f85f20926a917c311efc7197d84c0483054bf8e1924e-8DUmLB_fw658"
});
photos.push({
    name: 'Node22test',
    path: "http://h.hiphotos.baidu.com/image/pic/item/cf1b9d16fdfaaf512c871bb68e5494eef01f7a57.jpg"
})

/* GET users listing. */
router.get('/', function(req, res, next) {

    Photo.find(function(err, photos) {
        if( err ) {
            console.log(err);
        }

        res.render('photos', {
            title: "photos",
            photos: photos
        })
    });

});

router.get('/upload', function(req, res, next) {
    res.render('upload',{title: "photo upload images"});
})

router.post('/doUpload', function(req, res, next) {
    //express >4.0 不支持req.files  req.body

    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';

    form.uploadDir = "/Users/toshiba/Documents/git-workspace/gitHub/studyCollection/node/express-standard/tmp/photos";
    form.maxFieldsSize = 2 * 1024 * 1024;

    form.parse(req, function(err, fields, files) {
        console.log(files);
      //res.writeHead(200, {'content-type': 'text/plain'});
      //res.write('received upload:\n\n');
      //res.end(util.inspect({fields: fields, files: files}));

      console.log(files.image.path);
        Photo.create({
            name: fields.name,
            path : "http://localhost:3030/tmp" + files.image.path.split('tmp')[1]
        });

        res.redirect("/photos");
    });
    form.on('progress', function(bytesReceived, bytesExpected) {
        console.log(bytesReceived);
        console.log(bytesExpected);
    });
    /*form.on('field', function(name, value) {
        console.log(name);
        console.log(value);
    });

    form.on('file', function(name, file) {
        console.log(name);
        console.log(file);
    });*/

    form.on('end', function() {
        console.log("end")
    });

    form.on('error', function(err) {
        console.log(err);
    });

})

module.exports = router;
