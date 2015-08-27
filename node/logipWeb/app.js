var express = require("express");
var app = express();
var readline = require('readline');
var _ = require("underscore");
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//使用对象来设hash的值
var redis = require('redis');
var client = redis.createClient();
var client2 = redis.createClient();
client.auth("123456");
client2.auth("123456");



var server = require('http').Server(app);

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.on('news', function(res) {
        console.log(res);
    })

  socket.emit("news", {"hello":"world"})

});

server.listen(3030);


var ipData = [
    {
        count: 0,
        id: 1,
        name:"甘肃"
    },
    {
        count: 0,
        id: 2,
        name:"青海"
    },
    {
        count: 0,
        id: 3,
        name:"广西"
    },
    {
        count: 0,
        id: 4,
        name:"贵州"
    },
    {
        count: 0,
        id: 5,
        name:"重庆"
    },
    {
        count: 0,
        id: 6,
        name:"北京"
    },
    {
        count: 0,
        id: 7,
        name:"福建"
    },
    {
        count: 0,
        id: 8,
        name:"安徽"
    },
    {
        count:0,
        id: 9,
        name:"广东"
    },
    {
        count: 0,
        id: 10,
        name:"西藏"
    },
    {
        count: 0,
        id: 11,
        name:"新疆"
    },
    {
        count: 0,
        id: 12,
        name:"海南"
    },
    {
        count: 0,
        id: 13,
        name:"宁夏"
    },
    {
        count: 0,
        id: 14,
        name:"陕西"
    },
    {
        count: 0,
        id: 15,
        name:"山西"
    },
    {
        count: 0,
        id: 16,
        name:"湖北"
    },
    {
        count: 0,
        id: 17,
        name:"湖南"
    },
    {
        count: 0,
        id: 18,
        name:"四川"
    },
    {
        count: 0,
        id: 19,
        name:"云南"
    },
    {
        count: 0,
        id: 20,
        name:"河北"
    },
    {
        count: 0,
        id: 21,
        name:"河南"
    },
    {
        count: 0,
        id: 22,
        name:"辽宁"
    },
    {
        count: 0,
        id: 23,
        name:"山东"
    },
    {
        count: 0,
        id: 24,
        name:"天津"
    },
    {
        count: 0,
        id: 25,
        name:"江西"
    },
    {
        count: 0,
        id: 26,
        name:"江苏"
    },
    {
        count: 0,
        id: 27,
        name:"上海"
    },
    {
        count: 0,
        id: 28,
        name:"浙江"
    },
    {
        count: 0,
        id: 29,
        name:"吉林"
    },
    {
        count: 0,
        id: 30,
        name:"内蒙古"
    },
    {
        count: 0,
        id: 31,
        name:"黑龙江"
    },
    {
        count: 0,
        id: 32,
        name:"香港"
    },
    {
        count: 0,
        id: 33,
        name:"澳门"
    },
    {
        count: 0,
        id: 34,
        name:"台湾"
    }
];



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));


app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('view options',{layout: false});




app.get('/', function(req, res) {
    res.sendFile(__dirname +"/public/html/chinaMap.html");
});


app.get('/getJsonData', function(req, res) {
    var data = {};
    client2.hkeys("ezheLogTotal", function(err, results) {
        if(err) {
            console.log(err);
            return false;
        }
        var len = results.length;
        results.forEach(function(result, i) {
            client2.hget("ezheLogTotal", result, function(err,val) {
                if(err) {
                    console.log(err);
                    return false;
                }
                if( result == "totalCount" ) {
                    data.totalCount = val;
                } else {
                    data[result.split("_")[1]] = val;
                }

                if( i == (len -1) ) {
                    res.status(200).json({ data:data  })
                }
            })
        })
    })

});



app.get('/china.json', function(req, res) {
    res.sendFile(__dirname +"/china.json");
});



client.on("subscribe", function (channel, count) {
    console.log("client1 channel " + channel + ": " + count);

});


client.on("message", function (channel, message) {
    console.log("client1 channel " + channel + ": " + message);
    //io.sockets.emit("getNewIp", {code: 200});
    io.sockets.emit('getNewIp',{code: 200});

});

client.subscribe("ezhelog");

client.on('error', function(err) {
    console.log("Error " + err);
});

