var express = require('express');
var expressMongoose = require('express-mongoose');
var app = express();

var mongoose = require('mongoose');

var models = require('./models');

var photoModels = require('./photoModel');
var photos = require('./routes/photos')

var Member = models.Member;

//mongoose.connect('mongodb://127.0.0.1:27017/mydb', {mongos: true});
mongoose.connect('mongodb://localhost/mydb');

app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({secret:'my secret'}));
app.use('/static', express.static(__dirname + '/public'));

app.set('view engine', 'jade');
app.set('views',__dirname + '/views');




app.listen(3030, function() {
        console.log('\033[96m app listening on *:3030');
});



app.get('/', function(req, res) {
    res.render('index');
});

//基于model实例的save
app.get('/save', function(req, res) {
     var member = new Member({
        email : 'sdz003@qq.com',
        name : 'sdz003'
    });
    member.save();
    res.send('Data saved');
});

//基于model的save
app.get('/save2', function(req, res) {
    var doc = {
        email : 'sdz002@qq.com',
        name : 'sdz002'
    };

    Member.create(doc, function(err) {
        if( err ) console.log(err);
        res.send('Data saved');
    })

});


app.get('/update', function(req, res) {
    var conditions = {name : 'sdz003'};
    var update     = {$set : {name:'sdz002', email:'sdz002@qq.com'}};
    var options    = {upsert : true};
    Member.update(conditions, update, options, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send("update ok");
        }
    });
});


//根据实例方法查询
app.get('/findByName', function(req, res) {
    var member = new Member({});
    member.findByName('sdz001', function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//根据静态方法查询
app.get('/findByEmail', function(req, res) {

    Member.findByEmail('sdz001@qq.com', function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});


//find查询
app.get('/find', function(req, res) {
    var conditions = {name : 'dongzhi'};//查询条件
    var fields     = {name:1, email:1}; //待返回的字段
    var options    = {};
    Member.find(conditions,fields,options, function(err, result) {
        if(err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//删除记录
app.get('/del', function(req, res) {
    var conditions = {name : 'sdz002'};//查询条件
    Member.remove(conditions, function(err) {
        if(err) {
            console.log(err);
        } else {
            res.send('delete ok!');
        }
    })
});



//使用express-mongoose的话不需要传回调直接使用user.find自带返回值
//这两种结果是一样的
app.get('/members2', function(req, res) {
    res.send(Member.find());
});


app.get('/members', function(req, res) {
    Member.find(function(err, doc) {
        res.json(doc);
    })
})

