var _ = require("underscore");
var util = require('util');
var http = require('http');


//使用对象来设hash的值
var redis = require('redis');
var client = redis.createClient();

client.on('error', function(err) {
    consnole.log("Error " + err);
});


/**
 * 根据 ip 获取获取地址信息
 */
var getIpInfo = function(ip, cb) {
  var sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
  var url = sina_server + ip;
  http.get(url, function(res) {
    var code = res.statusCode;
    if (code == 200) {
      res.on('data', function(data) {
        try {
          cb(null, JSON.parse(data));
        } catch (err) {
          cb(err);
        }
      });
    } else {
      cb({ code: code });
    }
  }).on('error', function(e) { cb(e); });
};


var dealLine = function(data) {
    var reg = /(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])/g;
    if( reg.test(data) ) {
        var sm = data.match(reg);
        console.log(sm[0]);
        return sm[0]
    } else {
        return false;
    }

}

/*
client.hget("ezhe","data:0:name" ,function(err, data) {

            console.log(data);

            client.end();
        });
*/

client.hkeys("ezhe", function(err, replies) {

    replies.forEach(function(reply, i) {
        console.log(reply !== "total");
        if( reply !== "total" ) {
            client.hget("ezhe", reply, function(err, data) {
                console.log(data);
            });
        }
    });

    //client.end();
});


Tail = require('tail').Tail;

tail = new Tail("./tmpDoc/www.ezhe.com.log-20150811");

tail.on("line", function(data) {
  //console.log(data);
  var idstr = dealLine(data);

  if( !idstr ) {
    console.log("error ip address!");
    return false;
  }

  getIpInfo(idstr, function(err, msg) {
        /*ipData.forEach(function(v) {
            if( msg.province == v.name ) {
                v.count++;
            }
        });*/
        console.log('msg: ' + util.inspect(msg, true, 8));

        var user = {
            username: 'johndoe',
            firstname:'john',
            lastname:'doe',
            email:'sundongzhi@gozap.com',
            website:'http://www.johndeo.com'
        };

        client.hset("date","time", user);

        client.hkeys("date", function(err, replies) {
            console.log("Results for user:");
            console.log(replies.length + " replies :");
            replies.forEach(function(reply, i) {
                console.log(i + ": " + reply);
            });

            client.end();
        });
      //console.log(ipData);

    })
});

tail.on("error", function(error) {
  console.log('ERROR: ', error);
});